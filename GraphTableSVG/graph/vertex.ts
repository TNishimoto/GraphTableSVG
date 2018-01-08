namespace GraphTableSVG {
    export class Vertex {
        //public symbol: symbol = Symbol();
        public static readonly defaultSurfaceType: string = "--default-surface-type";
        public static readonly defaultTextClass: string = "--default-text-class";
        public static readonly defaultSurfaceClass: string = "--default-surface-class";

        private static readonly id_counter: number = 0;



        private _graph: Graph | null = null;
        protected _outcomingEdges: Edge[] = [];
        protected _incomingEdges: Edge[] = [];

        private _svgGroup: SVGGElement;
        private _observer: MutationObserver;
        private observerFunc: MutationCallback = (x: MutationRecord[]) => {
            let b = false;
            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                if (p.attributeName == "transform") {
                    b = true;
                }
            }
            if(b)this.localUpdate();

        };

        private _textObserver: MutationObserver;
        protected textObserverFunc: MutationCallback = (x: MutationRecord[]) => {
            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                if (this.isLocated) {

                    let vAnchor = this.svgGroup.getPropertyStyleValue(VerticalAnchorPropertyName);
                    if (vAnchor == null) vAnchor = VerticalAnchor.Middle;
                    let hAnchor = this.svgGroup.getPropertyStyleValue(HorizontalAnchorPropertyName);
                    if (hAnchor == null) hAnchor = HorizontalAnchor.Center;
                    Graph.setXY(this.svgText, this.innerRectangle, vAnchor, hAnchor);

                }
            }
        };

        constructor(__graph: Graph, className: string | null = null, text: string) {
            this._svgGroup = GraphTableSVG.createGroup(className);
            this.svgGroup.setAttribute(Graph.objectIDName, (Graph.idCounter++).toString());
            this.svgGroup.setAttribute(Graph.typeName, "vertex");
            this._graph = __graph;
            __graph.add(this);


            this._svgText = createText(this.svgGroup.getPropertyStyleValue(Vertex.defaultTextClass));
            this.svgText.textContent = text;
            this.svgGroup.appendChild(this.svgText);


            this._observer = new MutationObserver(this.observerFunc);
            const option1: MutationObserverInit = { attributes: true };
            
            this._observer.observe(this.svgGroup, option1);

            this._textObserver = new MutationObserver(this.textObserverFunc);
            const option2: MutationObserverInit = { childList: true };
            this._textObserver.observe(this.svgText, option2);


            this.x = 0;
            this.y = 0;


            /*
            this.parent = parent;

            this.parent.svgGroup.appendChild(this.svgGroup);
            */
        }

        /**
        所属しているグラフを返します。
        */
        get graph(): Graph | null {
            return this._graph;
        }

        /**
        このVertexのグループを返します。
        */
        public get svgGroup(): SVGGElement{
            return this._svgGroup;
        }
        private _svgText: SVGTextElement;
        /**
        このVertexのテキストを返します。
        */
        public get svgText(): SVGTextElement{
            return this._svgText;
        }


        /**
        入辺配列を返します。
        */
        get outcomingEdges(): Edge[] {
            return this._outcomingEdges;
        }
        /**
        出辺配列を返します。
        */
        get incomingEdges(): Edge[] {
            return this._incomingEdges;
        }

        /**
        テキストの取るべき領域を返します。
        */
        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
            rect.width = 0;
            rect.height = 0;
            rect.x = 0;
            rect.y = 0;
            return rect;
            //setXY(this.svgText, rect, VerticalAnchor.Middle, HorizontalAnchor.Center);
        }

        /**
        このVertexがBodyの子孫であるとき、Trueを返します。
        */
        get isLocated(): boolean {
            return Graph.IsDescendantOfBody(this.svgGroup);
        }
        
        /**
        このVertexのObjectIDを返します。
        */
        public get objectID(): string {
            const r = this.svgGroup.getAttribute(Graph.objectIDName);
            if (r == null) {
                throw new Error();
            } else {
                return r;
            }
        }

        /**
        このVertexのX座標を返します。
        */
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
        /**
        このVertexのY座標を返します。
        */
        public get y(): number {
            return this.svgGroup.getY();
        }
        public set y(value: number) {
            if (this.svgGroup.getY() != value) {
                this.svgGroup.setY(value);
            }
        }

        /**
        このVertexの幅を返します。
        */
        get width(): number {
            return 0;
        }
        /**
        このVertexの高さを返します。
        */
        get height(): number {
            return 0;
        }

        /**
         * 接続部分のXY座標を返します。
         * @param type
         * @param x
         * @param y
         */
        public getLocation(type: ConnectorPosition, x: number, y: number): [number, number] {
            return [this.x, this.y];
        }
        public getConnectorType(type: ConnectorPosition, x: number, y: number): ConnectorPosition {
            if (type == ConnectorPosition.Auto) {
                return this.getAutoPosition(x, y);
            } else {
                return type;
            }
        }
        protected getAutoPosition(x: number, y: number): ConnectorPosition {
            return ConnectorPosition.Top;

        }

        /**
        再描画します。
        */
        public update(): boolean {
            return false;
        }

        private localUpdate() {
            this.incomingEdges.forEach((v) => v.update());
            this.outcomingEdges.forEach((v) => v.update());
        }
        /**
        このVertexの領域を返します。
        */
        get region(): Rectangle {
            const p = new Rectangle();
            p.x = this.x - (this.width / 2);
            p.y = this.y - (this.height / 2);
            p.width = this.width;
            p.height = this.height;
            return p;
        }
        /**
         * 与えられたObjectIDがこのVertexの中に含まれているときTrueを返します。
         * @param id
         */
        public containsObjectID(id: string): boolean {
            return this.svgGroup.getAttribute(Graph.objectIDName) == id;
        }
        /**
        Vertexの輪郭を象っているインスタンスを返します。
        */
        public get surface(): SVGElement | null {
            return null;
        }
        /**
         * 親Vertex配列を返します。
         */
        public getParents(): Vertex[] {
            return this.incomingEdges.filter((v) => v.beginVertex != null).map((v) => <Vertex>v.beginVertex);
        }
        /**
        親との間の辺を返します。
        */
        get parentEdge(): Edge | null {
            if (this.incomingEdges.length == 0) {
                return null;
            } else {
                return this.incomingEdges[0];
            }
        }

        /**
        このVertexの親を返します。
        */
        get parent(): Vertex | null {
            if (this.parentEdge == null) {
                return null;
            } else {
                return this.parentEdge.beginVertex;
            }
        }
        /**
        このVertexに親がいないときTrueを返します。
        */
        get isNoParent(): boolean {
            return this.parent == null;
        }

        /**
        出辺配列を返します。
        */
        public get children(): Vertex[] {
            return this.outcomingEdges.filter((v) => v.endVertex != null).map((v) => <Vertex>v.endVertex);
        }

        /**
        このVertexが葉のときTrueを返します。
        */
        get isLeaf(): boolean {
            return this.outcomingEdges.length == 0;
        }

        /**
        このVertexの根を返します。
        */
        get firstNoParent(): Vertex {
            let p: Vertex = this;
            let parent = p.parent;
            while (parent != null) {
                p = parent;
                parent = p.parent;
            }
            return p;
        }
        get tree(): VirtualSubTree {
            return new VirtualSubTree(this);
        }
        

        /*
        get index(): number {
            if (this.isNoParent && this.graph != null) {
                return this.graph.roots.indexOf(this);
            } else {
                return -1;
            }
        }
        */
        public save() {
            const p = this.outcomingEdges.map((v) => v.x1);
            const out = JSON.stringify(p);
            this.svgGroup.setAttribute("outcomingEdges", out);
        }
        /**
         * Vertexインスタンスを生成します。
         * @param graph
         * @param className
         * @param defaultSurfaceType
         *   "circle"ならばSVGCircleElement <br>
         *   "rectangle"ならばSVGRectangleElement
         */
        public static create(graph: Graph, className: string | null = null, defaultSurfaceType: string = "circle"): GraphTableSVG.Vertex {
            const g = createGroup(className);
            className = className != null ? className : graph.defaultVertexClass;
            const type1 = g.getPropertyStyleValue(Vertex.defaultSurfaceType);
            const type = type1 != null ? type1 : defaultSurfaceType;
            let p: Vertex;
            if (type == "circle") {
                p = new CircleVertex(graph, className, "");
            } else if (type == "rectangle") {
                p = new RectangleVertex(graph, className, "");
            } else {
                p = new Vertex(graph, className, "");
            }
            return p;
        }
        /**
         * 出辺を挿入します。
         * @param edge
         * @param insertIndex
         */
        public insertOutcomingEdge(edge: Edge, insertIndex: number) {
            const p = this.outcomingEdges.indexOf(edge);
            if (p != -1) {
                throw new Error();
            } else {
                this.outcomingEdges.splice(insertIndex, 0, edge);

                //const s = this.outcomingEdges.map((v) => v.objectID).join(', ')
                //this.svgGroup.setAttribute("data-outcoming-edge", s);

                edge.beginVertex = this;
            }

        }
        /**
         * 出辺を削除します。
         * @param edge
         */
        public removeOutcomingEdge(edge: Edge) {
            const p = this.outcomingEdges.indexOf(edge);
            if (p != null) {
                this.outcomingEdges.splice(p, 1);
                edge.beginVertex = null;
            }
        }
        /**
         * 入辺を挿入します。
         * @param edge
         * @param insertIndex
         */
        public insertIncomingEdge(edge: Edge, insertIndex: number) {
            const p = this.incomingEdges.indexOf(edge);
            if (p != -1) {
                throw new Error();
            } else {
                this.incomingEdges.splice(insertIndex, 0, edge);
                edge.endVertex = this;
            }
        }
        /**
         * 入辺を削除します。
         * @param edge
         */
        public removeIncomingEdge(edge: Edge) {
            const p = this.incomingEdges.indexOf(edge);
            if (p != null) {
                this.incomingEdges.splice(p, 1);
                edge.endVertex = null;
            }
        }
        /**
         * この頂点を廃棄します。廃棄された頂点はグラフから取り除かれます。
         */
        public dispose() {
            while (this.incomingEdges.length > 0) {
                this.removeIncomingEdge(this.incomingEdges[0]);
            }

            while (this.outcomingEdges.length > 0) {
                this.removeOutcomingEdge(this.outcomingEdges[0]);
            }


            const prev = this.graph;
            this._graph = null;
            if (prev != null) {
                prev.remove(this);
            }
        }
        /**
        この頂点が廃棄されていたらTrueを返します。
        */
        get isDisposed(): boolean {
            return this.graph == null;
        }

        public createVBACode(main: string[], sub: string[][], indexDic: { [key: string]: number; }): void{
            if (this.graph != null) {
                //const subline: string[] = [];
                const i = indexDic[this.objectID];
                const left = this.graph.svgGroup.getX() + this.x - (this.width / 2);
                const top = this.graph.svgGroup.getY() + this.y - (this.height / 2);

                const surface = this.surface;
                const shape = surface instanceof SVGRectElement ? "msoShapeRectangle" : "msoShapeOval";
                sub.push([` Set nodes(${i}) = shapes_.AddShape(${shape}, ${left}, ${top}, ${this.width}, ${this.height})`]);

                if (surface == null) {
                    const backColor = VBATranslateFunctions.colorToVBA("gray");
                    sub.push([` Call EditVertexShape(nodes(${i}), "${this.objectID}", msoFalse, ${backColor})`]);
                } else {
                    const backColor = VBATranslateFunctions.colorToVBA(surface.getPropertyStyleValueWithDefault("fill", "gray"));
                    const lineColor = VBATranslateFunctions.colorToVBA(surface.getPropertyStyleValueWithDefault("stroke", "gray"));
                    const strokeWidth = parseInt(surface.getPropertyStyleValueWithDefault("stroke-width", "4"));
                    const visible = surface.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                    sub.push([` Call EditVertexShape(nodes(${i}), "${this.objectID}", ${visible}, ${backColor})`]);
                    sub.push([` Call EditLine(nodes(${i}).Line, ${lineColor}, msoLineSolid, ${0}, ${strokeWidth}, ${visible})`]);

                }

                //const text = this.svgText.textContent == null ? "" : this.svgText.textContent;
                //const color = this.svgText.getPropertyStyleValueWithDefault("fill", "gray");
                const fontSize = parseInt(this.svgText.getPropertyStyleValueWithDefault("font-size", "24"));
                const fontFamily = VBATranslateFunctions.ToVBAFont(this.svgText.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
                const fontBold = VBATranslateFunctions.ToFontBold(this.svgText.getPropertyStyleValueWithDefault("font-weight", "none"));
                sub.push([` Call EditTextFrame(nodes(${i}).TextFrame, ${0}, ${0}, ${0}, ${0}, false, ppAutoSizeNone)`]);
                VBATranslateFunctions.TranslateSVGTextElement(sub, this.svgText, `nodes(${i}).TextFrame.TextRange`);
                //sub.push(` Call EditTextRange(nodes(${i}).TextFrame.TextRange, ${VBATranslateFunctions.createStringFunction(text)}, ${0}, ${0}, ${VBATranslateFunctions.colorToVBA(color)})`);
                sub.push([` Call EditTextEffect(nodes(${i}).TextEffect, ${fontSize}, "${fontFamily}")`]);

            }
        }
    }

}