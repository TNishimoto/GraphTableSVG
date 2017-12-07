
module SLP {
    export function translate(text: string, graph: GraphTableSVG.OrderedForest) {
        console.log(text);
        for (var i = 0; i < text.length; i++) {
            var c = text[i];
            var node = GraphTableSVG.CircleVertex.create(graph, i * 100, 300, 30, "slpnode");
            node.svgText.textContent = c;
            //node.svgCircle.style.stroke = "aqua";

            /*
            node.svgCircle.setAttribute("class", "slpnode");

            node.svgGroup.onclick = (x: MouseEvent) => {
                var svg: HTMLElement = <HTMLElement>x.target;
                var className = node.svgCircle.getAttribute("class");
                if (className == "slpnode") {
                    node.svgCircle.setAttribute("class", "slpnode_choice");
                } else {
                    node.svgCircle.setAttribute("class", "slpnode");

                }
            };
            */
            
        }
        var test = new Clicker(graph);

        graph.update();
    }

    class Clicker {
        graph: GraphTableSVG.OrderedForest;

        constructor(_graph: GraphTableSVG.OrderedForest) {
            this.graph = _graph;
            var p = this;
            this.graph.nodes.forEach((x) => {
                x.svgGroup.onclick = this.Click;
                this.graph.roots.push(x);
            });
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
                console.log("remove : " + node1.index + "/" + node2.index);
                this.firstSelectedNode = null;


                var x = (node1.x + node2.x) / 2;
                var y = Math.min(node1.y, node2.y) - 50;
                var newNode = GraphTableSVG.CircleVertex.create(this.graph, x, y, 30, "slpnode");
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