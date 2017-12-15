
module SLP {
    /*
    export function translate(text: string, graph: GraphTableSVG.OrderedForest, table: GraphTableSVG.SVGTable) {
        console.log(text);
        
        var test = new Clicker(text, graph, table);

        graph.update();
    }
    */

    interface NoncharVariable { type : "nonchar", value: number, left: number, right: number };
    /*
    class NoncharVariable {
        constructor(public value: number, public left: number, public right: number) {
        }
    }
    */
    interface CharVariable { type: "char", value: number, child: string };
    /*
    class CharVariable {
        constructor(public value: number, public child: string) {
        }

    }
    */
    
    class SLPManager {
        slpNodes: (NoncharVariable | CharVariable)[] = [];
        //private _outcomingEdgesDic: { [key: number]: Edge[]; } = [];
        public addVariable(left: number, right: number): number {
            var result = this.getVariable(left, right);
            if (result == null) {
                var newNumber = this.slpNodes.length + 1;
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
                var newNumber = this.slpNodes.length + 1;
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
    }
    

    export class Clicker {
        text: string;
        graph: GraphTableSVG.OrderedForest;
        table: GraphTableSVG.SVGTable;
        slp: SLPManager;
        nodeClass: string | null = null;
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
        private _firstSelectedNode: GraphTableSVG.Vertex | null = null;

        get firstSelectedNode(): GraphTableSVG.Vertex | null {
            return this._firstSelectedNode;
        }
        set firstSelectedNode(value: GraphTableSVG.Vertex | null) {
            if (this.firstSelectedNode != null) {
                if (this.firstSelectedNode.surface != null) {
                    this.firstSelectedNode.surface.setAttribute("class", "slpnode");
                }
            }
            this._firstSelectedNode = value;
            if (this._firstSelectedNode != null) {
                var surface = this._firstSelectedNode.surface;
                if (this._firstSelectedNode.surface != null) {
                    this.firstSelectedNode.surface.setAttribute("class", "slpnode_choice");
                }
            }
        }

        private _idVariableDic: { [key: number]: number; } = [];

        constructor(text: string, svg: HTMLElement, r: number = 30, tableClass : string | null = null, nodeClass : string | null = null) {
            this.r = r;
            this.graph = new GraphTableSVG.OrderedForest();
            svg.appendChild(this.graph.svgGroup);
            this.table = new GraphTableSVG.SVGTable(1, 1, tableClass);
            svg.appendChild(this.table.group);
            this.nodeClass = nodeClass;
            this.text = text;
            this.slp = new SLPManager();
            this.create();
            this.locate();
            this.graph.update();
        }
        private create() {
            for (var i = 0; i < this.text.length; i++) {
                var c = this.text[i];
                //var charNode = GraphTableSVG.CircleVertex.create(this.graph, 0, 0, this.r, "slpnode_noroot");
                var charNode = GraphTableSVG.CircleVertex.create(this.graph, 0, 0, this.r, this.nodeClass);
                charNode.surface.setAttribute("class", "slpnode_noroot");
                charNode.svgText.textContent = c;

                var b = this.slp.getChar(c) == null;
                var variable = this.slp.addChar(c);

                if (b) {
                    if (this.table.height < this.slp.slpNodes.length) {
                        this.table.appendRow();
                    }
                    this.table.cells[this.slp.slpNodes.length - 1][0].svgText.textContent = `X${variable}->${c}`;
                }

                var variableNode = GraphTableSVG.CircleVertex.create(this.graph, 0, 0, this.r, this.nodeClass);
                variableNode.surface.setAttribute("class", "slpnode");
                variableNode.svgText.textContent = `X${variable}`;
                this._idVariableDic[variableNode.id] = variable;

                variableNode.svgGroup.onclick = this.Click;
                this.graph.roots.push(variableNode);

                var newEdge = GraphTableSVG.LineEdge.create();
                this.graph.connect(variableNode, newEdge, charNode);

                /*
                this.graph.outcomingEdgesDic[variableNode.id] = [];
                this.graph.outcomingEdgesDic[variableNode.id].push(newEdge);
                */
            }
            
        }
        private locate() {

            GraphTableSVG.GraphArrangement.leaveBasedArrangement(this.graph, this.nodeXInterval, this.nodeYInterval);
            GraphTableSVG.GraphArrangement.reverse(this.graph, false, true);
            this.graph.svgGroup.setY(180);
            this.graph.svgGroup.setX(30);
            var rect = this.graph.getRegion();
            this.table.group.setX(rect.right + 50);

        }

        
        private isNeighbor(node1: GraphTableSVG.Vertex, node2: GraphTableSVG.Vertex): boolean {
            if (node1.isRoot && node2.isRoot) {
                var rank1 = node1.index;
                var rank2 = node2.index;
                return rank2 - rank1 == 1;
            } else {
                return false;
            }
        }
        private connect(node1: GraphTableSVG.Vertex, node2: GraphTableSVG.Vertex) {
            if (this.isNeighbor(node1, node2)) {
                var insertIndex = node1.index;
                this.firstSelectedNode = null;

                var variable1 = this._idVariableDic[node1.id];
                var variable2 = this._idVariableDic[node2.id];
                var b = this.slp.getVariable(variable1, variable2) == null;
                var variable3 = this.slp.addVariable(variable1, variable2);

                if (b) {
                    if (this.table.height < this.slp.slpNodes.length) {
                        this.table.appendRow();
                    }
                    this.table.cells[this.slp.slpNodes.length - 1][0].svgText.textContent = `X${variable3} -> X${variable1}X${variable2}`;
                }

                //var x = (node1.x + node2.x) / 2;
                //var y = Math.min(node1.y, node2.y) - 50;
                var newNode = GraphTableSVG.CircleVertex.create(this.graph, 0, 0, this.r, this.nodeClass);
                newNode.surface.setAttribute("class", "slpnode");

                newNode.svgGroup.onclick = this.Click;
                newNode.svgText.textContent = `X${variable3}`;
                this._idVariableDic[newNode.id] = variable3;

                var newEdge1 = GraphTableSVG.LineEdge.create();
                var newEdge2 = GraphTableSVG.LineEdge.create();

                this.graph.connect(newNode, newEdge1, node1, 0);
                this.graph.connect(newNode, newEdge2, node2, 1);
                

                node1.surface.setAttribute("class", "slpnode_noroot");
                node2.surface.setAttribute("class", "slpnode_noroot");
                
                //this.graph.roots.splice(insertIndex, 2);
                //this.graph.roots.splice(insertIndex, 0, newNode);
                this.locate();
                this.graph.update();

                

            }
        }


        public Click = (x: MouseEvent) => {
            var svg: HTMLElement = <HTMLElement>x.target;
            var id = svg.id;

            var node = this.graph.getObjectBySVGID(id);
            if (node instanceof GraphTableSVG.Vertex) {
                if (node.isRoot) {
                    if (this.firstSelectedNode != null) {
                        if (this.firstSelectedNode == node) {
                            this.firstSelectedNode = null;
                        } else {
                            if (this.isNeighbor(this.firstSelectedNode, node)) {
                                this.connect(this.firstSelectedNode, node);

                            } else if (this.isNeighbor(node, this.firstSelectedNode)) {
                                this.connect(node, this.firstSelectedNode);
                            } else {
                                this.firstSelectedNode = node;
                            }
                        }
                    } else {
                        this.firstSelectedNode = node;
                    }
                }
            }
            

        }
    }
    
    
}