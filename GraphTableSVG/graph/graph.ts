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
        protected _nodes: Vertex[] = new Array(0);
        protected _edges: Edge[] = new Array(0);
        protected _svgGroup: SVGGElement;

        get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        /*
        get nodes(): Vertex[] {
            return this._nodes;
        }
        get edges(): Edge[] {
            return this._edges;
        }
        */

        public addVertex(vertex: Vertex) {
            this.svgGroup.appendChild(vertex.svgGroup);
            vertex.setGraph(this);
            this._nodes.push(vertex);
        }
        public addEdge(edge: Edge) {
            edge.setGraph(this);
            this._edges.push(edge);
        }


        constructor(svg: HTMLElement) {
            this._svgGroup = GraphTableSVG.createGroup();
            svg.appendChild(this._svgGroup);
        }


        relocation(): void {
            this._edges.forEach(function (x, i, arr) { x.update() });            
        }
        resize() : void {

        }
        update(): void {
            this.resize();
            this.relocation();
        }
        /*
        clear(svg: HTMLElement) {
            this._nodes.forEach(function (x) { x.setGraph(null) });
            this._edges.forEach(function (x) { x.setGraph(null) });
            this._nodes = [];
            this._edges = [];
        }
        */
        removeGraph(svg: HTMLElement) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        }
        /*
        public static create(svg: HTMLElement): Graph {
            //var g = GraphTableSVG.createGroup();
            var graph = new Graph();
            //graph.svgGroup = g;
        }
        */
    }
    export class OrderedOutcomingEdgesGraph extends Graph {
        private _outcomingEdgesDic: { [key: number]: Edge[]; } = [];
        //parentEdgeDic: { [key: number]: Edge; } = [];

        get outcomingEdgesDic(): { [key: number]: Edge[]; } {
            return this._outcomingEdgesDic;
        }

        constructor(svg: HTMLElement) {
            super(svg);
        }

        public getRoot(): Vertex {
            var p = this;
            var r = this._nodes.filter(function(x) {
                return p.getParentEdge(x) == null;
            });
            return r[0];
        }

        public getParentEdge(node: Vertex): Edge | null{
            for (var i = 0; i < this._edges.length; i++) {
                if (this._edges[i].endNode.id == node.id) {
                    return this._edges[i];
                }
            }
            return null;
        }
        public getTree(node: Vertex): VirtualTree {
            return new VirtualTree(this, node);
        }

        /*
        public static create(svg: HTMLElement): OrderedOutcomingEdgesGraph {
            var g = GraphTableSVG.createGroup();
            var graph = new OrderedOutcomingEdgesGraph();
            graph.__svgGroup = g;
            svg.appendChild(graph.__svgGroup);
            return graph;
        }

        */
        public relocation() {
            var root = this.getRoot();
            var tree = this.getTree(root);
            relocation.standardLocateSub2(tree, 100);

            tree.setLocation(30, 30);
            super.relocation();
        }
    }




    /*
    export class TextPath {
        parent: Edge;
        svgText: SVGTextElement;

        public update(): boolean {
            return false;
        }
    }
    */
    

}