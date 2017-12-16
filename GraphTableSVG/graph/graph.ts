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
        public static id: number = 0;

        protected _nodes: Vertex[] = new Array(0);
        protected _edges: Edge[] = new Array(0);
        protected _svgGroup: SVGGElement;
        public name: string = (Graph.id++).toString();
        protected _roots: Vertex[] = [];

        get defaultNodeClass(): string | null {
            return this.svgGroup.getAttribute("default-node-class");            
        }
        set defaultNodeClass(value: string | null) {
            if (value == null) {
                this.svgGroup.removeAttribute("default-node-class");
            } else {
                this.svgGroup.setAttribute("default-node-class", value);
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
        

        constructor(className : string | null = null) {
            this._svgGroup = GraphTableSVG.createGroup();
            if(className != null){
                this._svgGroup.setAttribute("class", className);
                var nodeClass = this._svgGroup.getActiveStyle().getPropertyValue("--default-node-class").trim();
                console.log("NodeClass :" + nodeClass);
                if (nodeClass.length > 0) {
                    this.defaultNodeClass = nodeClass;
                }

                var edgeClass = this._svgGroup.getActiveStyle().getPropertyValue("--default-edge-class").trim();
                if (edgeClass.length > 0) {
                    this.defaultEdgeClass = nodeClass;
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

        private _connect(node1: Vertex, edge: Edge, node2: Vertex,
            _beginConnectType: ConnecterPosition = ConnecterPosition.Bottom, _endConnectType: ConnecterPosition = ConnecterPosition.Top) {
            edge.beginNode = node1;
            edge.endNode = node2;
            edge.beginConnecterType = _beginConnectType;
            edge.endConnecterType = _endConnectType;
            this.addEdge(edge);
        }
        public connect(node1: Vertex, edge: Edge, node2: Vertex, insertIndex: number = 0,
            _beginConnectType: ConnecterPosition = ConnecterPosition.Bottom, _endConnectType: ConnecterPosition = ConnecterPosition.Top) {
            this._connect(node1, edge, node2, _beginConnectType, _endConnectType);
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
        public getOrderedNodes(order: NodeOrder, node: Vertex | null = null): Vertex[] {
            var r: Vertex[] = [];
            if (node == null) {
                this.roots.forEach((v) => {
                    this.getOrderedNodes(order, v).forEach((w) => {
                        r.push(w);
                    });
                });
            } else {
                var edges = node.outcomingEdges;
                if (order == NodeOrder.Preorder) {
                    r.push(node);
                    edges.forEach((v) => {
                        this.getOrderedNodes(order, v.endNode).forEach((w) => {
                            r.push(w);
                        });
                    });

                } else if (order == NodeOrder.Postorder) {
                    edges.forEach((v) => {
                        this.getOrderedNodes(order, v.endNode).forEach((w) => {
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
            var ids = this.nodes.map((v) => v.objectID);
            this.svgGroup.setAttribute("node", JSON.stringify(ids));
        }
    }
    

    
    

}