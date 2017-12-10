
module SLP {
    export function translate(text: string, graph: GraphTableSVG.OrderedForest) {
        console.log(text);
        
        var test = new Clicker(text, graph);

        graph.update();
    }

    class NoncharVariable {
        constructor(public value: number, public left: number, public right: number) {
        }
    }
    class CharVariable {
        constructor(public value: number, public child: string) {
        }

    }
    
    class SLPManager {
        slpNodes: (NoncharVariable | CharVariable)[] = [];
        //private _outcomingEdgesDic: { [key: number]: Edge[]; } = [];
        public addVariable(left: number, right: number): number {
            var result = this.getVariable(left, right);
            if (result == null) {
                var newNumber = this.slpNodes.length + 1;
                var node = new NoncharVariable(newNumber, left, right);
                this.slpNodes.push(node);
                console.log(`${newNumber}/${left}/${right}`);
                return node.value;
            } else {
                return result.value;
            }

        }
        public addChar(char: string): number {
            var result = this.getChar(char);
            if (result == null) {
                var newNumber = this.slpNodes.length + 1;
                var node = new CharVariable(newNumber, char);
                this.slpNodes.push(node);
                return node.value;
            } else {
                return result.value;
            }
        }

        public getVariable(left: number, right: number): NoncharVariable | null {
            for (var i = 0; i < this.slpNodes.length; i++) {
                var p = this.slpNodes[i];
                if (p instanceof NoncharVariable) {
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
                if (p instanceof CharVariable) {
                    if (p.child == child) {
                        return p;
                    }
                }
            }
            return null;
        }
    }
    

    class Clicker {
        text: string;
        graph: GraphTableSVG.OrderedForest;
        slp: SLPManager;
        private _idVariableDic: { [key: number]: number; } = [];

        constructor(text : string, _graph: GraphTableSVG.OrderedForest) {
            this.graph = _graph;
            this.text = text;
            this.slp = new SLPManager();
            this.create();
            
        }
        private create() {
            for (var i = 0; i < this.text.length; i++) {
                var c = this.text[i];
                var charNode = GraphTableSVG.CircleVertex.create(this.graph, i * 100, 300, 30, "slpnode");
                charNode.svgText.textContent = c;

                var variable = this.slp.addChar(c);
                var variableNode = GraphTableSVG.CircleVertex.create(this.graph, i * 100, 250, 30, "slpnode");
                variableNode.svgText.textContent = `X${variable}`;
                this._idVariableDic[variableNode.id] = variable;

                variableNode.svgGroup.onclick = this.Click;
                this.graph.roots.push(variableNode);

                var newEdge = GraphTableSVG.LineEdge.create(this.graph, variableNode, charNode, GraphTableSVG.ConnecterPosition.Bottom, GraphTableSVG.ConnecterPosition.Top);


                this.graph.outcomingEdgesDic[variableNode.id] = [];
                this.graph.outcomingEdgesDic[variableNode.id].push(newEdge);
            }
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
        private isNeighbor(node1: GraphTableSVG.Vertex, node2: GraphTableSVG.Vertex): boolean {
            if (node1.isRoot && node2.isRoot) {
                console.log(`${node1.index}/${node2.index}`);
                console.log(this.graph.roots);
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


                var x = (node1.x + node2.x) / 2;
                var y = Math.min(node1.y, node2.y) - 50;
                var newNode = GraphTableSVG.CircleVertex.create(this.graph, x, y, 30, "slpnode");

                var variable1 = this._idVariableDic[node1.id];
                var variable2 = this._idVariableDic[node2.id];
                var variable3 = this.slp.addVariable(variable1, variable2);
                newNode.svgText.textContent = `X${variable3}`;
                this._idVariableDic[newNode.id] = variable3;

                var newEdge1 = GraphTableSVG.LineEdge.create(this.graph, newNode, node1, GraphTableSVG.ConnecterPosition.Bottom, GraphTableSVG.ConnecterPosition.Top);
                var newEdge2 = GraphTableSVG.LineEdge.create(this.graph, newNode, node2, GraphTableSVG.ConnecterPosition.Bottom, GraphTableSVG.ConnecterPosition.Top);
                newNode.surface.onclick = this.Click;

                this.graph.outcomingEdgesDic[newNode.id] = [];
                this.graph.outcomingEdgesDic[newNode.id].push(newEdge1);
                this.graph.outcomingEdgesDic[newNode.id].push(newEdge2);

                node1.surface.setAttribute("class", "slpnode_noroot");
                node2.surface.setAttribute("class", "slpnode_noroot");
                
                this.graph.roots.splice(insertIndex, 2);
                this.graph.roots.splice(insertIndex, 0, newNode);
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