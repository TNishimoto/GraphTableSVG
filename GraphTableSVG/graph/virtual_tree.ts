namespace GraphTableSVG {
    export class VirtualSubTree {
        subTreeRoot: Vertex;

        constructor(_root: Vertex) {
            this.subTreeRoot = _root;
        }
        get children(): Vertex[] {
            var p = this;
            return this.subTreeRoot.children.map(function (x, i, arr) {
                return x;
            });
        }
        
        get parentEdge(): Edge | null {
            return this.subTreeRoot.parentEdge;
        }
        

        public getSubtree(result: Vertex[] = []): Vertex[] {
            result.push(this.subTreeRoot);

            var children = this.children;
            if (children.length == 0) {
                return result;
            } else {
                children.forEach(function (x, i, arr) {
                    x.tree.getSubtree(result);
                });
                return result;
            }
        }
        public getLeaves(): Vertex[] {
            var p = this;
            return this.getSubtree().filter(function (x, i, arr) {
                return x.outcomingEdges.length == 0;
            });
        }
        public getHeight(): number {
            var children = this.children;
            if (children.length == 0) {
                return 1;
            } else {
                var max = 0;
                children.forEach(function (x, i, arr) {
                    if (max < x.tree.getHeight()) max = x.tree.getHeight();
                })
                return max + 1;
            }
        }
        public region(): Rectangle {
            var p = this.getSubtree();
            var minX = this.subTreeRoot.x;
            var maxX = this.subTreeRoot.x;
            var minY = this.subTreeRoot.y;
            var maxY = this.subTreeRoot.y;
            p.forEach(function (x, i, arr) {
                var rect = x.region;
                if (minX > rect.x) minX = rect.x;
                if (maxX < rect.right) maxX = rect.right;
                if (minY > rect.y) minY = rect.y;
                if (maxY < rect.bottom) maxY = rect.bottom;
            });
            var result = new Rectangle();
            result.x = minX;
            result.y = minY;
            result.width = maxX - minX;
            result.height = maxY - minY;
            return result;
        }
        public get mostLeftLeave(): Vertex {
            return this.leaves[0];
        }

        public addOffset(_x: number, _y: number) {
            this.getSubtree().forEach(function (x, i, arr) {
                x.x += _x;
                x.y += _y;
            });
        }
        public setRectangleLocation(_x: number, _y: number) {
            var x = this.mostLeftLeave.region.x;
            var y = this.subTreeRoot.region.y;
            var diffX = _x - x;
            var diffY = _y - y;
            this.addOffset(diffX, diffY);
            //this.graph.updateEdges();
        }
        public setRootLocation(_x: number, _y: number) {
            var x = this.subTreeRoot.x;
            var y = this.subTreeRoot.y;
            var diffX = _x - x;
            var diffY = _y - y;
            this.addOffset(diffX, diffY);
            //this.graph.updateEdges();
        }
        get leaves(): Vertex[] {
            var p = this;
            return this.getSubtree().filter(function (x, i, arr) {
                return x.outcomingEdges.length == 0;
            });
        }

        
    }

}