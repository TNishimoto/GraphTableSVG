namespace GraphTableSVG {
    export class VirtualSubTree {
        subTreeRoot: Vertex;

        constructor(_root: Vertex) {
            this.subTreeRoot = _root;
        }
        get children(): Vertex[] {
            const p = this;
            return this.subTreeRoot.children.map(function (x, i, arr) {
                return x;
            });
        }
        
        get parentEdge(): Edge | null {
            return this.subTreeRoot.parentEdge;
        }
        

        public getSubtree(result: Vertex[] = []): Vertex[] {
            result.push(this.subTreeRoot);

            const children = this.children;
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
            const p = this;
            return this.getSubtree().filter(function (x, i, arr) {
                return x.outcomingEdges.length == 0;
            });
        }
        public getHeight(): number {
            const children = this.children;
            if (children.length == 0) {
                return 1;
            } else {
                let max = 0;
                children.forEach(function (x, i, arr) {
                    if (max < x.tree.getHeight()) max = x.tree.getHeight();
                })
                return max + 1;
            }
        }
        public region(): Rectangle {
            const p = this.getSubtree();
            let minX = this.subTreeRoot.x;
            let maxX = this.subTreeRoot.x;
            let minY = this.subTreeRoot.y;
            let maxY = this.subTreeRoot.y;
            p.forEach(function (x, i, arr) {
                const rect = x.region;
                if (minX > rect.x) minX = rect.x;
                if (maxX < rect.right) maxX = rect.right;
                if (minY > rect.y) minY = rect.y;
                if (maxY < rect.bottom) maxY = rect.bottom;
            });
            const result = new Rectangle();
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
            const x = this.mostLeftLeave.region.x;
            const y = this.subTreeRoot.region.y;
            const diffX = _x - x;
            const diffY = _y - y;
            this.addOffset(diffX, diffY);
            //this.graph.updateEdges();
        }
        public setRootLocation(_x: number, _y: number) {
            const x = this.subTreeRoot.x;
            const y = this.subTreeRoot.y;
            const diffX = _x - x;
            const diffY = _y - y;
            this.addOffset(diffX, diffY);
            //this.graph.updateEdges();
        }
        get leaves(): Vertex[] {
            const p = this;
            return this.getSubtree().filter(function (x, i, arr) {
                return x.outcomingEdges.length == 0;
            });
        }

        
    }

}