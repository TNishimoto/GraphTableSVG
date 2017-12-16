module GraphTableSVG {
    export class Vertex {
        public symbol: symbol = Symbol();

        private static id_counter: number = 0;
        svgGroup: SVGGElement;
        private _graph: Graph | null;

        protected _outcomingEdges: Edge[] = [];
        get outcomingEdges(): Edge[] {
            return this._outcomingEdges;
        }
        protected _incomingEdges: Edge[] = [];
        get incomingEdges(): Edge[] {
            return this._incomingEdges;
        }

        private _observer: MutationObserver;
        private observerFunc: MutationCallback = (x: MutationRecord[]) => {
            for (var i = 0; i < x.length; i++) {
                var p = x[i];
                if (p.attributeName == "transform") {
                    if (this.graph != null) {
                        this.graph.update();
                    }
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
            var r = this.svgGroup.getAttribute("objectID");
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
        

        constructor(className: string | null = null) {
            this.svgGroup = GraphTableSVG.createGroup(className);
            this.svgGroup.setAttribute("objectID", (Graph.id++).toString());
            
            
            this._observer = new MutationObserver(this.observerFunc);
            var option: MutationObserverInit = { attributes: true };
            this._observer.observe(this.svgGroup, option);
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


        public getLocation(type: ConnecterPosition): [number, number] {
            return [this.x, this.y];
        }

        public update(): boolean {
            return false;
        }

        get region(): Rectangle {
            var p = new Rectangle();
            p.x = this.x - (this.width / 2);
            p.y = this.y - (this.height / 2);
            p.width = this.width;
            p.height = this.height;
            return p;
        }

        public static getRegion(vertexes: Vertex[]): Rectangle {
            //var p = this.getSubtree();
            if (vertexes.length > 0) {
                var fstVertex = vertexes[0];
                var minX = fstVertex.x;
                var maxX = fstVertex.x;
                var minY = fstVertex.y;
                var maxY = fstVertex.y;
                vertexes.forEach(function (x, i, arr) {
                    var rect = x.region;
                    if (minX > rect.x) minX = rect.x;
                    if (maxX < rect.right) maxX = rect.right;
                    if (minY > rect.y) minY = rect.y;
                    if (maxY < rect.bottom) maxY = rect.bottom;
                });
                var result = new Rectangle();
                result.x = minX;
                result.y = minY;
                result.width = maxX - minX;
                result.height = maxY - minY;
                return result;
            } else {
                return new Rectangle();
            }
        }
        public containsSVGID(id: string): boolean {
            return this.svgGroup.getAttribute("objectID") == id;
        }
        public get surface(): SVGElement | null {
            return null;
        }
        public getParents(): Vertex[] {
            if (this.graph == null) {
                throw new Error();
            } else {
                return this.graph.edges.filter((v) => v.endNode == this).map((v) => v.beginNode);
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
                return this.parentEdge.beginNode;
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
    }
    export class CircleVertex extends Vertex {
        svgCircle: SVGCircleElement;
        svgText: SVGTextElement;

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
        

        public setGraph(value: Graph) {
            super.setGraph(value);

            /*
            if (this.graph != null) {
                this.svgCircle.id = `${this.graph.name}_${this.id}_circle`;
                this.svgText.id = `${this.graph.name}_${this.id}_text`;

            }
            */
        }
        constructor(className: string | null = null, r: number = 10, text : string = "") {
            super(className);
            this.svgCircle = createCircle(r, this.svgGroup.getActiveStyle().tryGetPropertyValue("--default-surface-class"));
            this.svgText = createText(this.svgGroup.getActiveStyle().tryGetPropertyValue("--default-text-class"));
            this.svgText.textContent = text;

            this.svgGroup.appendChild(this.svgCircle);
            this.svgGroup.appendChild(this.svgText);

            //this.svgCircle.setAttribute("objectID", this.objectID);
            //this.svgText.setAttribute("objectID", this.objectID);


            this._textObserver = new MutationObserver(this.textObserverFunc);
            var option: MutationObserverInit = { childList : true };
            this._textObserver.observe(this.svgText, option);

        }
        get width(): number {
            return this.svgCircle.r.baseVal.value * 2;
        }
        get height(): number {
            return this.svgCircle.r.baseVal.value * 2;
        }
        

        get innerRectangle(): Rectangle {
            var r = this.svgCircle.r.baseVal.value;
            var rect = new Rectangle();
            rect.width = r * 2;
            rect.height = r * 2;
            rect.x = -r;
            rect.y = -r;
            return rect;
            //setXY(this.svgText, rect, VerticalAnchor.Middle, HorizontalAnchor.Center);
        }

        public static create(_parent: Graph, x: number = 0, y: number = 0, r: number = 20, nodeClassName: string | null = null): CircleVertex {
            //var circle = createCircle(r, circleClassName);

            /*
            var text = GraphTableSVG.createText();
            var group = GraphTableSVG.createGroup();
            */

            var p = new CircleVertex(nodeClassName, r, "");
            p.x = x;
            p.y = y;
            _parent.addVertex(p);

            return p;
        }
        public get radius(): number {
            return this.svgCircle.r.baseVal.value;
        }
        public getLocation(type: ConnecterPosition): [number, number] {
            var r = (Math.sqrt(2) / 2) * this.radius;


            switch (type) {
                case ConnecterPosition.Top:
                    return [this.x, this.y - this.radius];
                case ConnecterPosition.RightUp:
                    return [this.x + r, this.y - r];
                case ConnecterPosition.Right:
                    return [this.x + this.radius, this.y];
                case ConnecterPosition.RightDown:
                    return [this.x + r, this.y + r];
                case ConnecterPosition.Bottom:
                    return [this.x, this.y + this.radius];
                case ConnecterPosition.LeftDown:
                    return [this.x - r, this.y + r];
                case ConnecterPosition.Left:
                    return [this.x - this.radius, this.y];
                case ConnecterPosition.LeftUp:
                    return [this.x - r, this.y - r];
                default:
                    return [this.x, this.y];
            }
        }
        public get surface(): SVGElement | null {
            return this.svgCircle;
        }
        /*
        public containsSVGID(id: string): boolean {
            var b = this.svgCircle.id == id || this.svgText.id == id;
            return super.containsSVGID(id) || b;
        }
        */
        
    }
}