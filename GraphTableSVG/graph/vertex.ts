module GraphTableSVG {
    export class Vertex {
        private static id_counter: number = 0;
        svgGroup: SVGGElement;
        private _graph: Graph | null;
        private _observer: MutationObserver;
        private createObserveFunction: MutationCallback = (x: MutationRecord[]) => {
            for (var i = 0; i < x.length; i++) {
                var p = x[i];
                if (p.attributeName == "transform") {

                    if (this.graph != null) {
                        this.graph.update();
                    }
                }
            }
            /*
            var th = this;
            var ret = function (x: MutationRecord[]) {
                for (var i = 0; i < x.length; i++) {
                    var p = x[i];
                    if (p.attributeName == "transform") {

                        if (th.graph != null) {
                            th.graph.update();
                        }
                    }
                }
            }
            return ret;
            */
        };

        get graph(): Graph | null {
            return this._graph;
        }
        public setGraph(value: Graph) {
            if (value == null && this._graph != null) {
                this._graph.svgGroup.removeChild(this.svgGroup);
            }
            this._graph = value;
            if (this.graph != null) {
                this.svgGroup.id = `${this.graph.name}_${this.id}_group`;
            }
        }


        private _id: number = Vertex.id_counter++;
        public get id(): number {
            return this._id;
        }

        constructor(group: SVGGElement) {
            this.svgGroup = group;

            
            
            this._observer = new MutationObserver(this.createObserveFunction);
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
            return this.svgGroup.id == id;
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
        getParent(): Vertex | null {
            var r = this.getParents();
            if (r.length == 0) {
                return null;
            } else {
                return r[0];
            }
        }
        get isRoot(): boolean {
            return this.getParent() == null;
        }
        get children(): Edge[] {
            if (this.graph instanceof OrderedOutcomingEdgesGraph) {
                return this.graph.outcomingEdgesDic[this.id];
            } else {
                return [];
            }
        }
        get isLeaf(): boolean {
            if (this.graph instanceof OrderedOutcomingEdgesGraph) {
                return this.graph.outcomingEdgesDic[this.id].length == 0;
            } else {
                return false;
            }
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
            var parent = p.getParent();
            while (parent != null) {
                p = parent;
                parent = p.getParent();
            }
            return p;
        }
        get index(): number {
            if (this.graph instanceof OrderedForest) {
                if (this.isRoot) {
                    return this.graph.roots.indexOf(this);
                } else {
                    return -1;
                }
            }
            return -1;
        }
    }
    export class CircleVertex extends Vertex {
        svgCircle: SVGCircleElement;
        svgText: SVGTextElement;
        public setGraph(value: Graph) {
            super.setGraph(value);

            if (this.graph != null) {
                this.svgCircle.id = `${this.graph.name}_${this.id}_circle`;
                this.svgText.id = `${this.graph.name}_${this.id}_text`;

            }
        }
        constructor(group: SVGGElement, circle: SVGCircleElement, text: SVGTextElement) {
            super(group);
            this.svgCircle = circle;
            this.svgText = text;


            this.svgGroup.appendChild(this.svgCircle);
            this.svgGroup.appendChild(this.svgText);

        }
        get width(): number {
            return this.svgCircle.r.baseVal.value * 2;
        }
        get height(): number {
            return this.svgCircle.r.baseVal.value * 2;
        }
        public static create(_parent: Graph, x: number = 0, y: number = 0, r: number = 20, circleClassName: string | null = null): CircleVertex {
            var circle = createCircle(r, circleClassName);

            var text = GraphTableSVG.createText();

            var group = GraphTableSVG.createGroup();

            var p = new CircleVertex(group, circle, text);
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

        public containsSVGID(id: string): boolean {
            var b = this.svgCircle.id == id || this.svgText.id == id;
            return super.containsSVGID(id) || b;
        }
        
    }
}