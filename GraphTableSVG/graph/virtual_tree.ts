namespace GraphTableSVG {
    export class ObsoleteVirtualSubTree {
        subTreeRoot: ObsoleteVertex;

        constructor(_root: ObsoleteVertex) {
            this.subTreeRoot = _root;
        }
        /**
         * 根の子ノードの配列を返します。
         */
        get children(): ObsoleteVertex[] {
            const p = this;
            return this.subTreeRoot.children.map(function (x, i, arr) {
                return x;
            });
        }
        
        /**
         * 根の親との間の辺を返します。
         */
        get parentEdge(): ObsoleteEdge | null {
            return this.subTreeRoot.parentEdge;
        }
        
        /**
         * この木の中の全てのVertexを返します。
         * @param result 
         */
        public getSubtree(result: ObsoleteVertex[] = []): ObsoleteVertex[] {
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
        /*
        public getLeaves(): Vertex[] {
            const p = this;
            return this.getSubtree().filter(function (x, i, arr) {
                return x.outcomingEdges.length == 0;
            });
        }
        */
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
        /**
         * この木を内包する最小の四角形を返します。
         */
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
        /**
         * 一番左の葉を返します。
         */
        public get mostLeftLeave(): ObsoleteVertex {
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
        /**
         * 根を入力位置に移動させます。木も同様に移動します。
         * @param _x 
         * @param _y 
         */
        public setRootLocation(_x: number, _y: number) {
            const x = this.subTreeRoot.x;
            const y = this.subTreeRoot.y;
            const diffX = _x - x;
            const diffY = _y - y;
            this.addOffset(diffX, diffY);
            //this.graph.updateEdges();
        }
        /**
         * 葉の配列を返します。
         */
        get leaves(): ObsoleteVertex[] {
            const p = this;
            return this.getSubtree().filter(function (x, i, arr) {
                return x.outcomingEdges.length == 0;
            });
        }

        
    }

}