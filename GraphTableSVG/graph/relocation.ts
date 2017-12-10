module GraphTableSVG {

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