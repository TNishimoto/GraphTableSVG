module GraphTableSVG {
    


    export class Graph {
        public static id: number = 0;

        protected _vertices: Vertex[] = new Array(0);
        protected _edges: Edge[] = new Array(0);
        protected _svgGroup: SVGGElement;
        protected _roots: Vertex[] = [];

        get defaultVertexClass(): string | null {
            return this.svgGroup.getAttribute("default-vertex-class");            
        }
        set defaultVertexClass(value: string | null) {
            if (value == null) {
                this.svgGroup.removeAttribute("default-vertex-class");
            } else {
                this.svgGroup.setAttribute("default-vertex-class", value);
            }
        }
        get defaultEdgeClass(): string | null {
            return this.svgGroup.getAttribute("default-edge-class");
        }
        set defaultEdgeClass(value: string | null) {
            if (value == null) {
                this.svgGroup.removeAttribute("default-edge-class");
            } else {
                this.svgGroup.setAttribute("default-edge-class", value);
            }
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
        

        public addVertex(vertex: Vertex) {
            this.svgGroup.appendChild(vertex.svgGroup);
            vertex.setGraph(this);
            this._vertices.push(vertex);
        }

        public addEdge(edge: Edge) {
            edge.setGraph(this);
            var i = this._edges.indexOf(edge);
            if (i == -1) {
                this._edges.push(edge);
            }
        }
        

        constructor(className : string | null = null) {
            this._svgGroup = GraphTableSVG.createGroup();
            this._svgGroup.setAttribute("type", "graph");

            if(className != null){
                this._svgGroup.setAttribute("class", className);
                var nodeClass = this._svgGroup.getActiveStyle().getPropertyValue("--default-vertex-class").trim();
                if (nodeClass.length > 0) {
                    this.defaultVertexClass = nodeClass;
                }

                var edgeClass = this._svgGroup.getActiveStyle().getPropertyValue("--default-edge-class").trim();
                if (edgeClass.length > 0) {
                    this.defaultEdgeClass = edgeClass;
                }
            }
            //svg.appendChild(this._svgGroup);
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

        update(): void {
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

        private _connect(node1: Vertex, edge: Edge, node2: Vertex) {
            edge.beginVertex = node1;
            edge.endVertex = node2;
            //edge.beginConnectorType = _beginConnectType;
            //edge.endConnectorType = _endConnectType;
            this.addEdge(edge);
        }
        public connect(node1: Vertex, edge: Edge, node2: Vertex, insertIndex: number = 0) {
            this._connect(node1, edge, node2);
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
            node1.outcomingEdges.splice(insertIndex, 0, edge);
            node2.incomingEdges.push(edge);
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