﻿module GraphTableSVG {

    export module GraphArrangement {

        export function leaveBasedArrangement(forest: OrderedForest, edgeLength: number): void {
            var leafCounter = 0;
            forest.getOrderedNodes(NodeOrder.Postorder).forEach((v) => {
                var x = 0;
                var y = 0;
                if (v.isLeaf) {
                    x = leafCounter * edgeLength;
                    leafCounter++;
                } else {
                    v.children.forEach((w) => {
                        x += w.endNode.x;
                        if (y < w.endNode.y) y = w.endNode.y;
                    });
                    x = x / v.children.length;
                    y += edgeLength;
                }
                v.x = x;
                v.y = y;
            });
        }
        export function reverse(graph: Graph, isX: boolean, isY: boolean) {
            if (graph.nodes.length > 0) {
                if (isY) {
                    var midY = middle(graph.nodes.map((v) => v.y));
                    graph.nodes.forEach((v) => {
                        if (v.y < midY) {
                            v.y += 2 * (midY - v.y);
                        } else {
                            v.y -= 2 * (v.y - midY);
                        }
                    });
                }

                if (isX) {
                    var midX = middle(graph.nodes.map((v) => v.x));
                    graph.nodes.forEach((v) => {
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


        export function standardTreeArrangement(graph: OrderedTree, edgeLength: number): void {
            if (graph.rootVertex != null) {
                var rootTree = graph.tree;
                var [x, y] = [rootTree.root.x, rootTree.root.y];
                standardTreeArrangementSub(rootTree, edgeLength);
                rootTree.setRootLocation(x, y);

                graph.update();
            }

        }

        function standardTreeArrangementSub(tree: VirtualTree, edgeLength: number): void {
            tree.root.x = 0;
            tree.root.y = 0;

            var leaves = 0;
            var edges = tree.getChildren();

            var leaveSize = tree.getLeaves().length;
            var leaveSizeWidthHalf = (leaveSize * edgeLength) / 2;
            
            var __x = -leaveSizeWidthHalf;

            for (var i = 0; i < edges.length; i++) {
                standardTreeArrangementSub(edges[i], edgeLength);
                var w = (edges[i].getLeaves().length * edgeLength) / 2;
                edges[i].setRootLocation(__x + w, edgeLength);
                __x += edges[i].getLeaves().length * edgeLength;                
            }
        }

        
    }
}