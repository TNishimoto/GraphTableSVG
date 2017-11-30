module GraphTableSVG {
    export class VirtualTree {
        graph: OrderedOutcomingEdgesGraph;
        root: Vertex;

        constructor(_graph: OrderedOutcomingEdgesGraph, _root: Vertex) {
            this.graph = _graph;
            this.root = _root;
        }
        getChildren(): VirtualTree[] {
            var p = this;
            return this.graph.outcomingEdgesDic[this.root.id].map(function (x, i, arr) {
                return new VirtualTree(p.graph, x.endNode);
            });
        }
        get parentEdge(): Edge | null {
            return this.graph.getParentEdge(this.root);
        }

        public getSubtree(result: Vertex[] = []): Vertex[] {
            var p = this;
            result.push(this.root);
            var children = this.getChildren();
            if (children.length == 0) {
                return result;
            } else {
                var width = 0;
                children.forEach(function (x, i, arr) {
                    x.getSubtree(result);
                });
                return result;
            }
        }
        public getLeaves(): Vertex[] {
            var p = this;
            return this.getSubtree().filter(function (x, i, arr) {
                return p.graph.outcomingEdgesDic[x.id].length == 0;
            });
        }
        public getHeight(): number {
            var children = this.getChildren();
            if (children.length == 0) {
                return 1;
            } else {
                var max = 0;
                children.forEach(function (x, i, arr) {
                    if (max < x.getHeight()) max = x.getHeight();
                })
                return max + 1;
            }
        }
        public getTreeRegion(): Rectangle {
            var p = this.getSubtree();
            var minX = this.root.x;
            var maxX = this.root.x;
            var minY = this.root.y;
            var maxY = this.root.y;
            p.forEach(function (x, i, arr) {
                if (minX > x.x) minX = x.x;
                if (maxX < x.x) maxX = x.x;
                if (minY > x.y) minY = x.y;
                if (maxY < x.y) maxY = x.y;
            });
            var result = new Rectangle();
            result.x = minX;
            result.y = minY;
            result.width = maxX - minX;
            result.height = maxY - minY;
            return result;
        }
        public getMostLeftLeave(): VirtualTree {
            var children = this.getChildren();
            if (children.length == 0) {
                return this;
            } else {
                return children[0].getMostLeftLeave();
            }
        }

        public addOffset(_x: number, _y: number) {
            this.getSubtree().forEach(function (x, i, arr) {
                x.x += _x;
                x.y += _y;
            });
        }
        public setLocation(_x: number, _y: number) {
            var x = this.getMostLeftLeave().root.x;
            var y = this.root.y;
            var diffX = _x - x;
            var diffY = _y - y;
            this.addOffset(diffX, diffY);
        }
    }

}