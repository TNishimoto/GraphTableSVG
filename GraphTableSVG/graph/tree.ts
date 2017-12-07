module GraphTableSVG {
    export class OrderedOutcomingEdgesGraph extends Graph {
        private _outcomingEdgesDic: { [key: number]: Edge[]; } = [];
        //parentEdgeDic: { [key: number]: Edge; } = [];

        get outcomingEdgesDic(): { [key: number]: Edge[]; } {
            return this._outcomingEdgesDic;
        }

        constructor(svg: HTMLElement) {
            super(svg);
        }


    }
    export class OrderedForest extends OrderedOutcomingEdgesGraph {
        roots: Vertex[] = [];
        constructor(svg: HTMLElement) {
            super(svg);
            //this.arrangementFunction = GraphArrangement.createStandardTreeArrangementFunction(50);
        }

        
    }
    export class OrderedTree extends OrderedOutcomingEdgesGraph {
        rootVertex: Vertex | null = null;

        constructor(svg: HTMLElement) {
            super(svg);
            //this.arrangementFunction = GraphArrangement.createStandardTreeArrangementFunction(50);
        }
        get tree(): VirtualTree {
            return new VirtualTree(this, this.rootVertex);
        }

        public getFirstNoParentVertex(): Vertex {
            var p = this;
            var r = this.nodes.filter(function (x) {
                return p.getParentEdge(x) == null;
            });
            return r[0];
        }

        public getParentEdge(node: Vertex): Edge | null {
            for (var i = 0; i < this.edges.length; i++) {
                if (this.edges[i].endNode.id == node.id) {
                    return this.edges[i];
                }
            }
            return null;
        }
        public getSubTree(node: Vertex): VirtualTree {
            return new VirtualTree(this, node);
        }
    }
}