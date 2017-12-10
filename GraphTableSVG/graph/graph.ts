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
    export enum NodeOrder {
        Preorder, Postorder
    }
    export enum ConnecterPosition {
        Top = 1,
        LeftUp = 2,
        Left = 3,
        LeftDown = 4,
        Bottom = 5,
        RightDown = 6,
        Right = 7,
        RightUp = 8,
        Auto = 9
    }
    export class Graph {
        private static id: number = 0;

        protected _nodes: Vertex[] = new Array(0);
        protected _edges: Edge[] = new Array(0);
        protected _svgGroup: SVGGElement;
        public name: string = (Graph.id++).toString();

        //public arrangementFunction: (Graph) => void | null = null;

        get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        
        get nodes(): Vertex[] {
            return this._nodes;
        }
        get edges(): Edge[] {
            return this._edges;
        }
        

        public addVertex(vertex: Vertex) {
            this.svgGroup.appendChild(vertex.svgGroup);
            vertex.setGraph(this);
            this._nodes.push(vertex);
        }

        private addEdge(edge: Edge) {
            edge.setGraph(this);
            var i = this._edges.indexOf(edge);
            if (i == -1) {
                this._edges.push(edge);
            }
        }
        

        constructor() {
            this._svgGroup = GraphTableSVG.createGroup();
            //svg.appendChild(this._svgGroup);
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

        public getObjectBySVGID(id: string): Vertex | Edge | null {
            for (var i = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].containsSVGID(id)) {
                    return this.nodes[i];
                }
            }
            return null;
        }

        public connect(node1: Vertex, edge: Edge, node2: Vertex,
            _beginConnectType: ConnecterPosition = ConnecterPosition.Bottom, _endConnectType: ConnecterPosition = ConnecterPosition.Top) {
            edge.beginNode = node1;
            edge.endNode = node2;
            edge.beginConnecterType = _beginConnectType;
            edge.endConnecterType = _endConnectType;
            this.addEdge(edge);
        }


        
    }
    

    
    

}