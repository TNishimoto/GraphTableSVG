namespace GraphTableSVG {

    export namespace GraphArrangement {

        

        
        
        
    }

    export namespace TreeArrangement {
        export function leaveBasedArrangement(forest: Graph, xInterval: number, yInterval: number): void {
            let leafCounter = 0;
            forest.getOrderedVertices(NodeOrder.Postorder).forEach((v) => {
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
        export function reverse(graph: Graph, isX: boolean, isY: boolean) {
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


        export function average(items: number[]): number {
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
        export function middle(items: number[]): number {
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


        export function standardTreeArrangement(graph: GraphTableSVG.Graph): void {
            const xInterval = graph.vertexXInterval;
            const yInterval = graph.vertexYInterval;
            if (xInterval != null && yInterval != null) {

                if (graph.rootVertex != null) {
                    const rootTree = graph.rootVertex.tree;
                    const [x, y] = [rootTree.subTreeRoot.x, rootTree.subTreeRoot.y];
                    standardTreeArrangementSub(rootTree, xInterval, yInterval);
                    rootTree.setRootLocation(x, y);

                    //graph.update();
                }
            } else {
                throw new Error("The Graph.VertexInterval is not defined.");
            }

        }

        function standardTreeArrangementSub(tree: VirtualSubTree, xInterval: number, yInterval: number): void {
            tree.subTreeRoot.x = 0;
            tree.subTreeRoot.y = 0;
            let leaves = 0;
            const children = tree.children;

            const leaveSizeWidthHalf = (tree.leaves.length * xInterval) / 2;

            let x = -leaveSizeWidthHalf;


            for (let i = 0; i < children.length; i++) {
                standardTreeArrangementSub(children[i].tree, xInterval, yInterval);
                const w = (children[i].tree.leaves.length * xInterval) / 2;
                children[i].tree.setRootLocation(x + w, yInterval);
                x += children[i].tree.leaves.length * xInterval;
            }

        }

        export function standardTreeWidthArrangement(graph: GraphTableSVG.Graph): void {
            const xInterval = graph.vertexXInterval;
            const yInterval = graph.vertexYInterval;
            if (xInterval != null && yInterval != null) {

                if (graph.rootVertex != null) {
                    const rootTree = graph.rootVertex.tree;
                    const [x, y] = [rootTree.subTreeRoot.x, rootTree.subTreeRoot.y];
                    standardTreeWidthArrangementSub(rootTree, xInterval, yInterval);
                    rootTree.setRootLocation(x, y);

                    //graph.update();
                }
            } else {
                throw new Error("The Graph.VertexInterval is not defined.");
            }

        }
        export function Arrangement1(graph: GraphTableSVG.Graph): void {
            graph.vertices.forEach((v) => { v.x = 0; v.y = 0 });
            const xi = graph.vertexXInterval != null ? graph.vertexXInterval : 30;
            const yi = graph.vertexYInterval != null ? graph.vertexYInterval : 30;
            GraphTableSVG.TreeArrangement.leaveBasedArrangement(graph, xi, yi);
            GraphTableSVG.TreeArrangement.reverse(this, false, true);
            const region = graph.getRegion();
            if (region.x < 0) graph.svgGroup.setX(-region.x);
            if (region.y < 0) graph.svgGroup.setY(-region.y);
            //this.svgGroup.setY(180);
            //this.svgGroup.setX(30);

        }


        function standardTreeWidthArrangementSub(tree: VirtualSubTree, xInterval: number, yInterval: number): void {
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