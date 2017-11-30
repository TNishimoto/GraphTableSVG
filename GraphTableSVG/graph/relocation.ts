module GraphTableSVG {

    export module relocation {

        /*
        export function relocate(graph: OrderedOutcomingEdgesGraph, root: Vertex, width: number, height: number) {

        }
        function getSubtreeSize(graph: OrderedOutcomingEdgesGraph, subtreeRoot: Vertex): number {
            var children = graph.outcomingEdgesDic[subtreeRoot.id];
            if (children.length == 0) {
                return 1;
            } else {
                var width = 0;
                children.forEach(function (x, i, arr) {
                    width += getSubtreeSize(graph, x.endNode);
                });
                return width;
            }
        }

        

        function locate(graph: OrderedOutcomingEdgesGraph, root: Vertex, width: number, height: number) {

        }
        */
        /*
        export function standardLocateSub(tree: VirtualTree, y: number = 0, edgeLength: number): void {
            tree.root.x = 0;
            tree.root.y = y;
            var leaves = 0;
            var edges = tree.getChildren();

            var centerIndex = Math.floor(edges.length / 2) - 1;
            var IsEven = edges.length % 2 == 0;
            for (var i = 0; i < edges.length; i++) {
                var next = edges[i];
                if (next != null) {
                    standardLocateSub(next, tree.root.y + edgeLength, edgeLength);
                    next.addOffset(leaves * edgeLength, 0);
                    var rect = next.getTreeRegion();
                    leaves += rect.width;
                    if (IsEven && i == centerIndex) {
                        leaves += 1;
                    }
                }
            }
            tree.root.x = Math.floor(leaves * edgeLength / 2);
            console.log(tree.root.id + "/" + tree.root.x);

        }
        */

        export function standardLocateSub2(tree: VirtualTree, edgeLength: number): void {
            tree.root.x = 0;
            tree.root.y = 0;

            var leaves = 0;
            var edges = tree.getChildren();

            var leaveSize = tree.getLeaves().length;
            var leaveSizeWidthHalf = (leaveSize * edgeLength) / 2;
            
            var __x = -leaveSizeWidthHalf;

            for (var i = 0; i < edges.length; i++) {
                standardLocateSub2(edges[i], edgeLength);
                var w = (edges[i].getLeaves().length * edgeLength) / 2;
                edges[i].setLocation2(__x + w, edgeLength);
                __x += edges[i].getLeaves().length * edgeLength;                
            }
        }

        
    }
}