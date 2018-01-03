namespace GraphTableSVG {

    export namespace GraphArrangement {

        export function leaveBasedArrangement(forest: Graph, xInterval: number, yInterval: number): void {
            var leafCounter = 0;
            forest.getOrderedVertices(NodeOrder.Postorder).forEach((v) => {
                var x = 0;
                var y = 0;
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
                    var midY = middle(graph.vertices.map((v) => v.y));
                    graph.vertices.forEach((v) => {
                        if (v.y < midY) {
                            v.y += 2 * (midY - v.y);
                        } else {
                            v.y -= 2 * (v.y - midY);
                        }
                    });
                }

                if (isX) {
                    var midX = middle(graph.vertices.map((v) => v.x));
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
                var y = 0;
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
                var min = items[0];
                var max = items[0];
                items.forEach((w) => {
                    if (min > w) min = w;
                    if (max < w) max = w;
                });
                return (min + max)/2;
            } else {
                throw new Error();
            }
        }

        
        export function standardTreeArrangement(graph: GraphTableSVG.Graph): void {
            var xInterval = graph.vertexXInterval;
            var yInterval = graph.vertexYInterval;
            if (xInterval != null && yInterval != null) {

                if (graph.rootVertex != null) {
                    var rootTree = graph.rootVertex.tree;
                    var [x, y] = [rootTree.subTreeRoot.x, rootTree.subTreeRoot.y];
                    standardTreeArrangementSub(rootTree, xInterval, yInterval);
                    rootTree.setRootLocation(x, y);

                    //graph.update();
                }
            } else {
                throw new Error();
            }

        }

        function standardTreeArrangementSub(tree: VirtualSubTree, xInterval: number, yInterval: number): void {
            tree.subTreeRoot.x = 0;
            tree.subTreeRoot.y = 0;
            var leaves = 0;
            var children = tree.children;

            var leaveSizeWidthHalf = (tree.leaves.length * xInterval) / 2;
            
            var x = -leaveSizeWidthHalf;

            
            for (var i = 0; i < children.length; i++) {
                standardTreeArrangementSub(children[i].tree, xInterval, yInterval);
                var w = (children[i].tree.leaves.length * xInterval) / 2;
                children[i].tree.setRootLocation(x + w, yInterval);
                x += children[i].tree.leaves.length * xInterval;
            }
            
        }
        
        
    }
}