module GraphTableSVG {
    export class Vertex {
        public symbol: symbol = Symbol();
        public static defaultSurfaceType: string = "--default-surface-type";
        public static defaultTextClass: string = "--default-text-class";
        public static defaultSurfaceClass: string = "--default-surface-class";

        private static id_counter: number = 0;
        svgGroup: SVGGElement;
        svgText: SVGTextElement;

        private _graph: Graph | null;

        protected _outcomingEdges: Edge[] = [];
        get outcomingEdges(): Edge[] {
            return this._outcomingEdges;
        }
        protected _incomingEdges: Edge[] = [];
        get incomingEdges(): Edge[] {
            return this._incomingEdges;
        }

        get innerRectangle(): Rectangle {
            var rect = new Rectangle();
            rect.width = 0;
            rect.height = 0;
            rect.x = 0;
            rect.y = 0;
            return rect;
            //setXY(this.svgText, rect, VerticalAnchor.Middle, HorizontalAnchor.Center);
        }

        private _observer: MutationObserver;
        private observerFunc: MutationCallback = (x: MutationRecord[]) => {
            for (var i = 0; i < x.length; i++) {
                var p = x[i];
                if (p.attributeName == "transform") {
                    this.localUpdate();
                }
            }
        };

        private _textObserver: MutationObserver;
        protected textObserverFunc: MutationCallback = (x: MutationRecord[]) => {
            for (var i = 0; i < x.length; i++) {
                var p = x[i];
                if (this.isLocated) {
                    var vAnchor = this.svgGroup.getActiveStyle().getVerticalAnchor();
                    if (vAnchor == null) vAnchor = VerticalAnchor.Middle;
                    var hAnchor = this.svgGroup.getActiveStyle().getHorizontalAnchor();
                    if (hAnchor == null) hAnchor = HorizontalAnchor.Center;
                    setXY(this.svgText, this.innerRectangle, vAnchor, hAnchor);
                }
            }
        };

        get isLocated(): boolean {
            return IsDescendantOfBody(this.svgGroup);
        }
        get graph(): Graph | null {
            return this._graph;
        }
        public setGraph(value: Graph) {
            if (value == null && this._graph != null) {
                this._graph.svgGroup.removeChild(this.svgGroup);
            }
            this._graph = value;
            if (this.graph != null) {
                //this.svgGroup.id = `${this.graph.name}_${this.id}_group`;
            }
        }

        
        public get objectID(): string {
            var r = this.svgGroup.getAttribute(Graph.objectIDName);
            if (r == null) {
                throw new Error();
            } else {
                return r;
            }
        }
        /*
        public set objectID(value: number | null) {
            if (value == null) {
                this.svgGroup.setAttribute("objectID", "");
            } else {
                this.svgGroup.setAttribute("objectID", value.toString());
            }
        }
        */
        

        constructor(className: string | null = null, text : string) {
            this.svgGroup = GraphTableSVG.createGroup(className);
            this.svgGroup.setAttribute(Graph.objectIDName, (Graph.id++).toString());
            this.svgGroup.setAttribute(Graph.typeName, "vertex");


            this.svgText = createText(this.svgGroup.getActiveStyle().tryGetPropertyValue(Vertex.defaultTextClass));
            this.svgText.textContent = text;
            this.svgGroup.appendChild(this.svgText);

            
            this._observer = new MutationObserver(this.observerFunc);
            var option: MutationObserverInit = { attributes: true };
            this._observer.observe(this.svgGroup, option);

            this._textObserver = new MutationObserver(this.textObserverFunc);
            var option: MutationObserverInit = { childList: true };
            this._textObserver.observe(this.svgText, option);


            /*
            this.parent = parent;

            this.parent.svgGroup.appendChild(this.svgGroup);
            */
        }

        public get x(): number {
            return this.svgGroup.getX();
        }
        public set x(value: number) {
            if (this.svgGroup.getX() != value) {
                this.svgGroup.setX(value);
            }
            /*
            if (this.graph != null) {
                this.graph.update();
            }
            */
        }

        public get y(): number {
            return this.svgGroup.getY();
        }
        public set y(value: number) {
            if (this.svgGroup.getY() != value) {
                this.svgGroup.setY(value);
            }
            /*
            if (this.graph != null) {
                this.graph.update();
            }
            */

        }

        get width(): number {
            return 0;
        }
        get height(): number {
            return 0;
        }
        

        public getLocation(type: ConnectorPosition, x: number, y: number): [number, number] {
            return [this.x, this.y];
        }

        public update(): boolean {
            return false;
        }

        private localUpdate() {
            this.incomingEdges.forEach((v) => v.update());
            this.outcomingEdges.forEach((v) => v.update());
        }

        get region(): Rectangle {
            var p = new Rectangle();
            p.x = this.x - (this.width / 2);
            p.y = this.y - (this.height / 2);
            p.width = this.width;
            p.height = this.height;
            return p;
        }
        
        public containsSVGID(id: string): boolean {
            return this.svgGroup.getAttribute(Graph.objectIDName) == id;
        }
        public get surface(): SVGElement | null {
            return null;
        }
        public getParents(): Vertex[] {
            if (this.graph == null) {
                throw new Error();
            } else {
                return this.graph.edges.filter((v) => v.endVertex == this).map((v) => v.beginVertex);
            }
        }
        get parentEdge(): Edge | null {
            if (this.incomingEdges.length == 0) {
                return null;
            } else {
                return this.incomingEdges[0];
            }
        }
        get parent(): Vertex | null {
            if (this.parentEdge == null) {
                return null;
            } else {
                return this.parentEdge.beginVertex;
            }
        }
        get isRoot(): boolean {
            return this.parent == null;
        }
        get children(): Edge[] {
            return this.outcomingEdges;
        }
        get isLeaf(): boolean {
            return this.outcomingEdges.length == 0;
        }
        /*
        successor(order: NodeOrder): Vertex | null {
            if (order == NodeOrder.Preorder) {

            } else {
                return null;
            }
        }
        */
        get root(): Vertex {
            var p: Vertex = this;
            var parent = p.parent;
            while (parent != null) {
                p = parent;
                parent = p.parent;
            }
            return p;
        }
        get index(): number {
            if (this.isRoot && this.graph != null) {
                return this.graph.roots.indexOf(this);
            } else {
                return -1;
            }
        }
        public save() {
            var p = this.outcomingEdges.map((v) => v.x1);
            var out = JSON.stringify(p);
            this.svgGroup.setAttribute("outcomingEdges", out);
        }

        public static create(graph: Graph, className: string | null = null, defaultSurfaceType: string = "circle"): GraphTableSVG.Vertex {
            var g = createGroup(className);
            className = className != null ? className : graph.defaultVertexClass;
            var type1 = g.getPropertyValue(Vertex.defaultSurfaceType);
            var type = type1 != null ? type1 : defaultSurfaceType;
            var p: Vertex;
            if (type == "circle") {
                p = new CircleVertex(className, "");
            } else if (type == "rectangle") {
                p = new RectangleVertex(className, "");
            } else {
                p = new Vertex(className, "");
            }
            graph.addVertex(p);
            return p;
        }
        

    }

}