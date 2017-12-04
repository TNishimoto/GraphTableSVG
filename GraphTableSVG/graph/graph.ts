module GraphTableSVG {
    export class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;

        get right(): number {
            return this.x + this.width;
        }
        get bottom(): number {
            return this.y + this.height;
        }
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

        //public arrangementFunction: (Graph) => void | null = null;

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

        /*
        relocation(): void {
            this.arrangementFunction(this);
        }
        resize() : void {

        }
        */

        updateNodes(): void {
            this._nodes.forEach(function (x) { x.update() });
        }
        updateEdges() : void {
            this._edges.forEach(function (x) { x.update() });
        }

        update(): void {
            this.updateNodes();
            this.updateEdges();
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

        public getRegion(): Rectangle {
            var rect = Vertex.getRegion(this._nodes);
            rect.x += this.svgGroup.getX();
            rect.y += this.svgGroup.getY();
            return rect;
        }
    }
    

    
    

}