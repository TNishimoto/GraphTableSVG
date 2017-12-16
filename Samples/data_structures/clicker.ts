module SLP {

    export class Clicker extends SLPViewer {
        
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
        
        constructor(text: string, svg: HTMLElement, r: number = 30, tableClass: string | null = null, nodeClass: string | null = null) {
            super(Clicker.createSLP(text), svg, r, tableClass, nodeClass);

            this.graph.nodes.forEach((v) => {
                v.svgGroup.onclick = this.Click;
                v.surface.setAttribute("class", v.isRoot ? "slpnode" : "slpnode_noroot");
            })
        }
        private static createSLP(text: string): SLPManager {
            var slp = new SLPManager();
            for (var i = 0; i < text.length; i++) {
                var c = slp.addChar(text[i]);
                slp.startVariables.push(c);
            }
            return slp;
        }
        
        /*
        private isNeighbor(node1: GraphTableSVG.Vertex, node2: GraphTableSVG.Vertex): boolean {
            if (node1.isRoot && node2.isRoot) {
                var rank1 = node1.index;
                var rank2 = node2.index;
                return rank2 - rank1 == 1;
            } else {
                return false;
            }
        }
        */

        public Click = (x: MouseEvent) => {
            
            var svg: HTMLElement = <HTMLElement>x.currentTarget;
            var id = svg.getAttribute("objectID");

            var node = this.graph.getObjectBySVGID(id);
            if (node instanceof GraphTableSVG.Vertex) {
                if (node.isRoot) {
                    var rootIndex = this.graph.roots.indexOf(node);
                    if (this.firstSelectedNode != null) {
                        if (this.firstSelectedNode == node) {
                            this.firstSelectedNode = null;
                        } else {
                            var fstRootIndex = this.graph.roots.indexOf(this.firstSelectedNode);
                            var newNode: GraphTableSVG.Vertex | null = null;
                            if (rootIndex + 1 == fstRootIndex) {
                                newNode = this.connect(rootIndex);
                            } else if (fstRootIndex + 1 == rootIndex) {
                                newNode = this.connect(fstRootIndex);
                            } else {
                                this.firstSelectedNode = node;
                            }

                            if (newNode != null) {
                                this.firstSelectedNode = null;
                                newNode.surface.setAttribute("class", "slpnode");
                                var node1 = newNode.outcomingEdges[0].endNode;
                                var node2 = newNode.outcomingEdges[1].endNode;

                                node1.surface.setAttribute("class", "slpnode_noroot");
                                node2.surface.setAttribute("class", "slpnode_noroot");
                                newNode.svgGroup.onclick = this.Click;
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