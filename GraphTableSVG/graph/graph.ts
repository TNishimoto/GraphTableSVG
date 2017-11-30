module GraphTableSVG {
    export class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    export enum ConnecterPositionType {
        Top = 1,
        LeftUp = 2,
        Left = 3,
        LeftDown = 4,
        Bottom = 5,
        RightDown = 6,
        Right = 7,
        RightUp = 8
    }
    export class Graph {
        nodes: Vertex[] = new Array(0);
        edges: Edge[] = new Array(0);
        svgGroup: SVGGElement = null;

        relocation(): void {
            this.edges.forEach(function (x, i, arr) { x.update() });
        }
        resize() : void {

        }
        update(): void {
            this.resize();
            this.relocation();
        }

        public static create(svg: HTMLElement): Graph {
            var g = GraphTableSVG.createGroup();
            var graph = new Graph();
            graph.svgGroup = g;
            svg.appendChild(graph.svgGroup);
            return graph;
        }
    }
    export class OrderedOutcomingEdgesGraph extends Graph {
        outcomingEdgesDic: { [key: number]: Edge[]; } = [];
        //parentEdgeDic: { [key: number]: Edge; } = [];

        public getRoot(): Vertex {
            var p = this;
            var r = this.nodes.filter(function(x) {
                return p.getParentEdge(x) == null;
            });
            return r[0];
        }

        public getParentEdge(node: Vertex): Edge | null{
            for (var i = 0; i < this.edges.length; i++) {
                if (this.edges[i].endNode.id == node.id) {
                    return this.edges[i];
                }
            }
            return null;
        }
        public getTree(node: Vertex): VirtualTree {
            return new VirtualTree(this, node);
        }

        public static create(svg: HTMLElement): OrderedOutcomingEdgesGraph {
            var g = GraphTableSVG.createGroup();
            var graph = new OrderedOutcomingEdgesGraph();
            graph.svgGroup = g;
            svg.appendChild(graph.svgGroup);
            return graph;
        }

        public relocation() {
            var root = this.getRoot();
            var tree = this.getTree(root);
            relocation.standardLocateSub2(tree, 300, 350, 50);
            super.relocation();
        }
    }





    export class TextPath {
        parent: Edge;
        svgText: SVGTextElement;

        public update(): boolean {
            return false;
        }
    }

}