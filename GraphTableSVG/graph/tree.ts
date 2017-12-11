module GraphTableSVG {
    export class OrderedOutcomingEdgesGraph extends Graph {
        private _outcomingEdgesDic: { [key: number]: Edge[]; } = [];
        //parentEdgeDic: { [key: number]: Edge; } = [];

        get outcomingEdgesDic(): { [key: number]: Edge[]; } {
            return this._outcomingEdgesDic;
        }

        constructor() {
            super();
        }


    }
    export class OrderedForest extends OrderedOutcomingEdgesGraph {
        protected _roots: Vertex[] = [];

        get roots(): Vertex[] {
            return this._roots;
        }
        public addVertex(vertex: Vertex) {
            super.addVertex(vertex);
            this.outcomingEdgesDic[vertex.id] = [];
        }
        constructor() {
            super();
            //this.arrangementFunction = GraphArrangement.createStandardTreeArrangementFunction(50);
        }

        public connect(node1: Vertex, edge: Edge, node2: Vertex, insertIndex: number = 0,
            _beginConnectType: ConnecterPosition = ConnecterPosition.Bottom, _endConnectType: ConnecterPosition = ConnecterPosition.Top) {
            super.connect(node1, edge, node2, _beginConnectType, _endConnectType);
            var i = this.roots.indexOf(node1);
            var j = this.roots.indexOf(node2);
            if (j != -1) {
                if (i == -1) {
                    this.roots[j] = node1;
                } else {
                    this.roots.splice(j, 1);
                }
            }

            if (!(node1.id in this.outcomingEdgesDic)) {
                this.outcomingEdgesDic[node1.id] = [];
            }
            this.outcomingEdgesDic[node1.id].splice(insertIndex,0, edge);

        }

        public getOrderedNodes(order: NodeOrder, node: Vertex | null = null): Vertex[] {
            var r: Vertex[] = [];
            if (node == null) {
                this.roots.forEach((v) => {
                    this.getOrderedNodes(order, v).forEach((w) => {
                        r.push(w);
                    });
                });
            } else {
                var edges = this.outcomingEdgesDic[node.id];
                if (order == NodeOrder.Preorder) {
                    r.push(node);
                    edges.forEach((v) => {
                        this.getOrderedNodes(order, v.endNode).forEach((w) => {
                            r.push(w);
                        });
                    });

                } else if (order == NodeOrder.Postorder) {
                    edges.forEach((v) => {
                        this.getOrderedNodes(order, v.endNode).forEach((w) => {
                            r.push(w);
                        });
                    });
                    r.push(node);
                }
            }
            return r;            
        }
        
        
    }
    export class OrderedTree extends OrderedForest {
        _rootVertex: Vertex | null = null;

        get rootVertex(): Vertex | null {
            if (this.roots.length == 0) {
                return null;
            } else {
                return this.roots[0];
            }
        }
        set rootVertex(value: Vertex | null) {
            this._roots = [];
            if (value != null) {
                this.roots.push(value);
            }
        }

        constructor() {
            super();
            //this.arrangementFunction = GraphArrangement.createStandardTreeArrangementFunction(50);
        }
        get tree(): VirtualTree {
            if (this.rootVertex == null) {
                throw new Error();
            } else {
                return new VirtualTree(this, this.rootVertex);
            }
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