module GraphTableSVG {
    
    /**
    グラフを表します。
    */
    export class Graph {
        public static idCounter: number = 0;
        public static defaultVertexClass: string = "--default-vertex-class";
        public static defaultEdgeClass: string = "--default-edge-class";
        //public static defaultVertexClassName: string = "data-default-vertex-class";
        //public static defaultEdgeClassName: string = "data-default-edge-class";

        public static objectIDName: string = "data-objectID";
        public static typeName: string = "data-type";

        protected _vertices: Vertex[] = new Array(0);
        protected _edges: Edge[] = new Array(0);
        protected _svgGroup: SVGGElement;
        protected _roots: Vertex[] = [];

        /**
        Vertexインスタンスの生成時、この値がインスタンスのクラス名にセットされます。
        */
        get defaultVertexClass(): string | null {
            return this.svgGroup.getPropertyStyleValue(Graph.defaultVertexClass);
        }
        set defaultVertexClass(value: string | null) {
            this.svgGroup.setPropertyStyleValue(Graph.defaultVertexClass, value);
        }

        /**
        Edgeインスタンスの生成時、この値がインスタンスのクラス名にセットされます。
        */
        get defaultEdgeClass(): string | null {
            return this.svgGroup.getPropertyStyleValue(Graph.defaultEdgeClass);
        }
        set defaultEdgeClass(value: string | null) {
            this.svgGroup.setPropertyStyleValue(Graph.defaultEdgeClass, value);
        }

        //public arrangementFunction: (Graph) => void | null = null;
        get roots(): Vertex[] {
            return this._roots;
        }
        get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        
        get vertices(): Vertex[] {
            return this._vertices;
        }
        get edges(): Edge[] {
            return this._edges;
        }
        

        public add(item: Vertex | Edge) : void {
            if (item instanceof Vertex) {
                var i = this._vertices.indexOf(item);
                if (i == -1 && item.graph == this) {
                    this._vertices.push(item);
                    this.svgGroup.appendChild(item.svgGroup);
                } else {
                    throw Error();
                }

            } else {
                
                var i = this._edges.indexOf(item);
                if (i == -1 && item.graph == this) {
                    this._edges.push(item);
                    this.svgGroup.insertBefore(item.svgGroup, this.svgGroup.firstChild);
                } else {
                    throw Error();
                }
            }
        }
        public remove(item: Vertex | Edge): void {
            if (item instanceof Vertex) {
                var p = this.vertices.indexOf(item);
                if (p != -1) {
                    this._vertices.splice(p, 1);
                    this.svgGroup.removeChild(item.svgGroup);
                    item.dispose();
                }
            } else {
                var p = this.edges.indexOf(item);
                if (p != -1) {
                    this._vertices.splice(p, 1);
                    this.svgGroup.removeChild(item.svgGroup);
                    item.dispose();
                }
            }
        }
        
        

        constructor(box: HTMLElement, className: string | null = null) {
            this._svgGroup = GraphTableSVG.createGroup(className);
            box.appendChild(this.svgGroup);

            this._svgGroup.setAttribute(Graph.typeName, "graph");
            
        }

        /*
        relocation(): void {
            this.arrangementFunction(this);
        }
        resize() : void {

        }
        */

        updateVertices(): void {
            this._vertices.forEach(function (x) { x.update() });
        }
        updateEdges() : void {
            this._edges.forEach(function (x) { x.update() });
        }

        private update(): void {
            this.updateVertices();
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
            var rects = this.vertices.map((v) => v.region);
            var rect = GraphTableSVG.Rectangle.merge(rects);
            rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
            //rect.x += this.svgGroup.getX();
            //rect.y += this.svgGroup.getY();
            return rect;
        }

        public getObjectBySVGID(id: string): Vertex | Edge | null {
            for (var i = 0; i < this.vertices.length; i++) {
                if (this.vertices[i].containsSVGID(id)) {
                    return this.vertices[i];
                }
            }
            return null;
        }
        /*
        private _connect(node1: Vertex, edge: Edge, node2: Vertex) {
            edge.beginVertex = node1;
            edge.endVertex = node2;
            this.add(edge);
        }
        */
        public connect(node1: Vertex, edge: Edge, node2: Vertex,
            outcomingInsertIndex: number = node1.outcomingEdges.length, incomingInsertIndex: number = node2.incomingEdges.length) {
            //this._connect(node1, edge, node2);

            node1.insertOutcomingEdge(edge, outcomingInsertIndex);
            node2.insertIncomingEdge(edge, incomingInsertIndex);

            var i = this.roots.indexOf(node1);
            var j = this.roots.indexOf(node2);
            if (j != -1) {
                if (i == -1) {
                    this.roots[j] = node1;
                } else {
                    this.roots.splice(j, 1);
                }
            }
            /*
            if (!(node1.id in this.outcomingEdgesDic)) {
                this.outcomingEdgesDic[node1.id] = [];
            }
            */
            //node1.outcomingEdges.splice(insertIndex, 0, edge);
            //node2.incomingEdges.push(edge);
        }
        public getOrderedVertices(order: NodeOrder, node: Vertex | null = null): Vertex[] {
            var r: Vertex[] = [];
            if (node == null) {
                this.roots.forEach((v) => {
                    this.getOrderedVertices(order, v).forEach((w) => {
                        r.push(w);
                    });
                });
            } else {
                var edges = node.outcomingEdges;
                if (order == NodeOrder.Preorder) {
                    r.push(node);
                    edges.forEach((v) => {
                        this.getOrderedVertices(order, v.endVertex).forEach((w) => {
                            r.push(w);
                        });
                    });

                } else if (order == NodeOrder.Postorder) {
                    edges.forEach((v) => {
                        this.getOrderedVertices(order, v.endVertex).forEach((w) => {
                            r.push(w);
                        });
                    });
                    r.push(node);
                }
            }
            return r;
        }
        get rootVertex(): Vertex | null {
            if (this.roots.length == 0) {
                return null;
            } else {
                return this.roots[0];
            }
        }
        set rootVertex(value: Vertex | null) {
            this._roots = [];
            if (value != null) {
                this.roots.push(value);
            }
        }
        public save() {
            var id = 0;
            //this.nodes.forEach((v) => v.objectID = id++);
            //this.edges.forEach((v) => v.objectID = id++);
            var ids = this.vertices.map((v) => v.objectID);
            this.svgGroup.setAttribute("node", JSON.stringify(ids));
        }
    }
    


    

}