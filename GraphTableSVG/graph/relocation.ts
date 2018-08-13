namespace GraphTableSVG {

    export namespace GraphArrangement {   
    }

    export namespace ObsoleteTreeArrangement {
        /**
         * 葉が一列に並ぶようにVertexを整列します。
         * @param forest 
         * @param xInterval 
         * @param yInterval 
         */
        export function alignVerticeByLeaveSub(forest: ObsoleteGraph, xInterval: number, yInterval: number): void {
            let leafCounter = 0;
            forest.getOrderedVertices(VertexOrder.Postorder).forEach((v) => {
                let x = 0;
                let y = 0;
                if (v.isLeaf) {
                    x = leafCounter * xInterval;
                    leafCounter++;
                } else {
                    v.children.forEach((w) => {
                        x += w.x;
                        if (y < w.y) y = w.y;

                    });
                    x = x / v.children.length;
                    y += yInterval;
                }

                v.x = x;
                v.y = y;
            });
        }
        export function reverse(graph: ObsoleteGraph, isX: boolean, isY: boolean) {
            if (graph.vertices.length > 0) {
                if (isY) {
                    const midY = middle(graph.vertices.map((v) => v.y));
                    graph.vertices.forEach((v) => {
                        if (v.y < midY) {
                            v.y += 2 * (midY - v.y);
                        } else {
                            v.y -= 2 * (v.y - midY);
                        }
                    });
                }

                if (isX) {
                    const midX = middle(graph.vertices.map((v) => v.x));
                    graph.vertices.forEach((v) => {
                        if (v.x < midX) {
                            v.x += 2 * (midX - v.x);
                        } else {
                            v.x -= 2 * (v.x - midX);
                        }
                    });

                }
            }
        }


        function average(items: number[]): number {
            if (items.length > 0) {
                let y = 0;
                items.forEach((v) => {
                    y += v;
                });
                return y / items.length;
            } else {
                throw new Error();
            }
        }
        function middle(items: number[]): number {
            if (items.length > 0) {
                let min = items[0];
                let max = items[0];
                items.forEach((w) => {
                    if (min > w) min = w;
                    if (max < w) max = w;
                });
                return (min + max) / 2;
            } else {
                throw new Error();
            }
        }

        /**
         * 子Vertexが一列に並ぶようにグラフ内のVertexを整列します。
         * @param graph 
         */
        export function alignVerticeByChildren(graph: GraphTableSVG.ObsoleteGraph): void {
            const [xi, yi] = getXYIntervals(graph);

            if (graph.rootVertex != null) {
                const rootTree = graph.rootVertex.tree;
                const [x, y] = [rootTree.subTreeRoot.x, rootTree.subTreeRoot.y];
                alignVerticeByChildrenSub(rootTree, xi, yi);
                rootTree.setRootLocation(x, y);

                //graph.update();
            }
            alignTrees(graph);
        }
        /**
         * 子Vertexが一列に並ぶようにグラフ内のVertexを整列します。
         * @param tree 
         * @param xInterval 
         * @param yInterval 
         */
        function alignVerticeByChildrenSub(tree: ObsoleteVirtualSubTree, xInterval: number, yInterval: number): void {
            tree.subTreeRoot.x = 0;
            tree.subTreeRoot.y = 0;
            let leaves = 0;
            const children = tree.children;

            const leaveSizeWidthHalf = (tree.leaves.length * xInterval) / 2;

            let x = -leaveSizeWidthHalf;


            for (let i = 0; i < children.length; i++) {
                alignVerticeByChildrenSub(children[i].tree, xInterval, yInterval);
                const w = (children[i].tree.leaves.length * xInterval) / 2;
                children[i].tree.setRootLocation(x + w, yInterval);
                x += children[i].tree.leaves.length * xInterval;
            }

        }

        export function standardTreeWidthArrangement(graph: GraphTableSVG.ObsoleteGraph): void {
            //const xInterval = graph.vertexXInterval;
            //const yInterval = graph.vertexYInterval;
            const [xi, yi] = getXYIntervals(graph);

            if (graph.rootVertex != null) {
                const rootTree = graph.rootVertex.tree;
                const [x, y] = [rootTree.subTreeRoot.x, rootTree.subTreeRoot.y];
                standardTreeWidthArrangementSub(rootTree, xi, yi);
                rootTree.setRootLocation(x, y);

                //graph.update();
            }

        }
        /**
         * グラフ内のVertexからVertex間の水平間隔と垂直間隔を自動で算出します。
         * @param graph 
         */
        function computeAutoXYIntervals(graph : GraphTableSVG.ObsoleteGraph) : [number, number]{
            let yMaximalInterval = 30;
            let xMaximalInterval = 30;
            graph.vertices.forEach((v)=>{
                if(v.width > xMaximalInterval) xMaximalInterval = v.width;
                if(v.height > yMaximalInterval) yMaximalInterval = v.height;
            })
            return [xMaximalInterval * 2, yMaximalInterval * 2];
        }
        /**
         * グラフに設定されているVertex間の水平間隔と垂直間隔を算出します。
         * @param graph 
         */
        function getXYIntervals(graph : GraphTableSVG.ObsoleteGraph) : [number, number]{
            const [xMaximalInterval, yMaximalInterval] = computeAutoXYIntervals(graph);
            const xi = graph.vertexXInterval != null ? graph.vertexXInterval : xMaximalInterval;
            const yi = graph.vertexYInterval != null ? graph.vertexYInterval : yMaximalInterval;
            return [xi, yi];
        }
        /**
         * グラフ内の森を並べます。最初の木が内接する四角形の左上の座標は[0,0]です。
         * @param graph 
         */
        function alignTrees(graph: GraphTableSVG.ObsoleteGraph){
            let x = 0;
            graph.roots.forEach((v)=>{
                const region = v.tree.region();
                v.tree.setRectangleLocation(x, 0);
                x += region.width;
            });
        }
        /**
         * 葉が一列に並ぶようにVertexを整列します。
         * @param graph 
         */
        export function alignVerticeByLeave(graph: GraphTableSVG.ObsoleteGraph): void {
            graph.vertices.forEach((v) => { v.x = 0; v.y = 0 });
            const [xi, yi] = getXYIntervals(graph);
            GraphTableSVG.ObsoleteTreeArrangement.alignVerticeByLeaveSub(graph, xi, yi);
            GraphTableSVG.ObsoleteTreeArrangement.reverse(this, false, true);
            alignTrees(graph);
        }


        function standardTreeWidthArrangementSub(tree: ObsoleteVirtualSubTree, xInterval: number, yInterval: number): void {
            tree.subTreeRoot.x = 0;
            tree.subTreeRoot.y = 0;
            let centerX = 0;
            const children = tree.children;

            let x = 0;

            if (children.length == 1) {
                tree.subTreeRoot.x = children[0].x;
                standardTreeWidthArrangementSub(children[0].tree, xInterval, yInterval);

                children[0].tree.setRootLocation(children[0].x, yInterval);
            } else if (children.length == 0) {
            } else {
                for (let i = 0; i < children.length; i++) {
                    standardTreeWidthArrangementSub(children[i].tree, xInterval, yInterval);
                    const rect = children[i].tree.region();
                    const diffX = children[i].x - rect.x;

                    children[i].tree.setRootLocation(x + diffX, yInterval);
                    x += rect.width + xInterval;
                    if (i < children.length - 1) {
                        centerX += x - (xInterval / 2);
                    }
                }

                centerX = centerX / (children.length - 1);

                tree.subTreeRoot.x = centerX;
            }


        }
    }
}