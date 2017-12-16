
module Grammar {

    interface NoncharVariable { type : "nonchar", value: number, left: number, right: number };
    interface CharVariable { type: "char", value: number, child: string };
    
    export class SLPDictionary {
        slpNodes: (NoncharVariable | CharVariable)[] = [];
        startVariables: number[] = [];
        //private _outcomingEdgesDic: { [key: number]: Edge[]; } = [];
        public addVariable(left: number, right: number): number {
            var result = this.getVariable(left, right);
            if (result == null) {
                var newNumber = this.slpNodes.length;
                var node: NoncharVariable = { type: "nonchar", value: newNumber, left: left, right: right };
                this.slpNodes.push(node);
                return node.value;
            } else {
                return result.value;
            }

        }
        public addChar(char: string): number {
            var result = this.getChar(char);
            if (result == null) {
                var newNumber = this.slpNodes.length;
                var node: CharVariable = { type: "char", value: newNumber, child: char };
                this.slpNodes.push(node);
                return node.value;
            } else {
                return result.value;
            }
        }

        public getVariable(left: number, right: number): NoncharVariable | null {
            for (var i = 0; i < this.slpNodes.length; i++) {
                var p = this.slpNodes[i];
                if (p.type == "nonchar") {
                    if (p.left == left && p.right == right) {
                        return p;
                    }
                }
            }
            return null;
        }
        public getChar(child : string): CharVariable | null {
            for (var i = 0; i < this.slpNodes.length; i++) {
                var p = this.slpNodes[i];
                if (p.type == "char") {
                    if (p.child == child) {
                        return p;
                    }
                }
            }
            return null;
        }
        public getTextCharvariables(variable: number | null = null): CharVariable[] {
            if (variable != null) {
                var p = this.slpNodes[variable];
                if (p.type == "char") {
                    return [p];
                } else {
                    var left = this.getTextCharvariables(p.left);
                    var right = this.getTextCharvariables(p.right);
                    right.forEach((v) => left.push(v));
                    return left;
                }
            } else {
                var r: CharVariable[] = [];
                var roots = this.startVariables.map((v) => this.getTextCharvariables(v)).forEach((v) => {
                    v.forEach((w) => {
                        r.push(w);
                    })
                });
                return r;
            }
        }
        get text() : string {
            var r: string = "";
            this.getTextCharvariables().forEach((v) => { r += v.child });
            return r;
        }
        public copy(): SLPDictionary {
            var r = new SLPDictionary();
            this.slpNodes.forEach((v) => { r.slpNodes.push(v) });
            this.startVariables.forEach((v) => { r.startVariables.push(v) });
            return r;
            
        }
    }
    


    export class SLPViewer {
        graph: GraphTableSVG.Graph;
        table: GraphTableSVG.SVGTable;
        slp: SLPDictionary;
        //nodeClass: string | null = null;
        r: number;
        private _nodeXInterval: number = 50;
        private _nodeYInterval: number = 50;

        get nodeXInterval(): number {
            return this._nodeXInterval;
        }
        set nodeXInterval(value: number) {
            this._nodeXInterval = value;
            this.locate();
        }
        get nodeYInterval(): number {
            return this._nodeYInterval;
        }
        set nodeYInterval(value: number) {
            this._nodeYInterval = value;
            this.locate();
        }
        
        //private _idVariableDic: { [key: number]: number; } = [];

        constructor(slp: SLPDictionary, svg: HTMLElement, r: number = 30, tableClass: string | null = null, graphClass: string | null = null) {
            this.r = r;
            this.graph = new GraphTableSVG.Graph(graphClass);
            svg.appendChild(this.graph.svgGroup);
            this.table = new GraphTableSVG.SVGTable(1, 1, tableClass);
            svg.appendChild(this.table.group);
            //this.nodeClass = nodeClass;
            this.slp = slp;
            this.create();
            this.locate();
            this.graph.update();
        }
        
        private locate() {
            GraphTableSVG.GraphArrangement.leaveBasedArrangement(this.graph, this.nodeXInterval, this.nodeYInterval);
            GraphTableSVG.GraphArrangement.reverse(this.graph, false, true);
            this.graph.svgGroup.setY(180);
            this.graph.svgGroup.setX(30);
            var rect = this.graph.getRegion();
            this.table.group.setX(rect.right + 50);
        }
        public create() {
            this.slp.startVariables.forEach((v) => {
                this.createVariable(v, null);
            });

            this.slp.slpNodes.forEach((v) => {
                this.appendInfo(v.value);
            })
        }
        private appendInfo(variable : number) {
            this.table.appendRow();
            var str = "";
            var c = this.slp.slpNodes[variable];
            
            if(c.type == 'nonchar'){
                str = `X${c.value + 1} -> X${c.left + 1}X${c.right + 1}`;
            }else{
                str = `X${c.value + 1} -> ${c.child}`;
            }
            this.table.cells[this.table.height-1][0].svgText.textContent = str;

        }
        /*
        private createCharVariable(variable: CharVariable) {
            var variableNode = GraphTableSVG.CircleVertex.create(this.graph, 0, 0, this.r, this.nodeClass);
            variableNode.svgText.textContent = `X${variable.value - 1}`;
            var charNode = GraphTableSVG.CircleVertex.create(this.graph, 0, 0, this.r, this.nodeClass);
            charNode.svgText.textContent = `${variable.child}`;
            var edge2 = GraphTableSVG.LineEdge.create();
            this.graph.connect(variableNode, edge2, charNode, 0, GraphTableSVG.ConnectorPosition.Bottom, GraphTableSVG.ConnectorPosition.Top);

            this.graph.roots.push(variableNode);
        }
        */
        private createNode(variable: number | string): GraphTableSVG.Vertex{
            var variableNode = GraphTableSVG.CircleVertex.create(this.graph, 0, 0, this.r, this.graph.defaultNodeClass);
            if(typeof(variable) == "string"){
                variableNode.svgGroup.setAttribute("variable", variable);            
            }else{
                variableNode.svgGroup.setAttribute("variable", variable.toString());
                variableNode.svgText.textContent = `X${variable + 1}`;
            }
            return variableNode;
        }
        public createVariable(variable: number, parent: GraphTableSVG.Vertex | null, insertIndex: number = 0) {
            var v = this.slp.slpNodes[variable];

            var variableNode = this.createNode(variable);
            if (parent != null) {
                var edge = GraphTableSVG.LineEdge.create();
                this.graph.connect(parent, edge, variableNode, insertIndex, GraphTableSVG.ConnectorPosition.Bottom, GraphTableSVG.ConnectorPosition.Top);
            } else {
                this.graph.roots.push(variableNode);
            }

            if (v.type == "nonchar") {
                this.createVariable(v.left, variableNode, 0);
                this.createVariable(v.right, variableNode, 1);
            } else {
                var charNode = GraphTableSVG.CircleVertex.create(this.graph, 0, 0, this.r, this.graph.defaultNodeClass);
                charNode.svgText.textContent = `${v.child}`;
                var edge2 = GraphTableSVG.LineEdge.create();
                this.graph.connect(variableNode, edge2, charNode, 0, GraphTableSVG.ConnectorPosition.Bottom, GraphTableSVG.ConnectorPosition.Top);

            }
        }
        public connect(i: number): GraphTableSVG.Vertex {
            var node1 = this.graph.roots[i];
            var node2 = this.graph.roots[i+1];

            var variable1 = Number(node1.svgGroup.getAttribute("variable"));
            var variable2 = Number(node2.svgGroup.getAttribute("variable"));


            var b = this.slp.getVariable(variable1, variable2) == null;
            var variable3 = this.slp.addVariable(variable1, variable2);

            if (b) {
                this.appendInfo(variable3);
            }



            var newNode = this.createNode(variable3);
            //this._idVariableDic[newNode.symbol] = variable3;

            var newEdge1 = GraphTableSVG.LineEdge.create();
            var newEdge2 = GraphTableSVG.LineEdge.create();

            this.graph.connect(newNode, newEdge1, node1, 0);
            this.graph.connect(newNode, newEdge2, node2, 1);

            this.locate();
            this.graph.update();
            return newNode;
        }

        
    }

    
}