namespace GraphTableSVG {
    /**
     * 頂点をSVGで表現するためのクラスです。
     */
    export class Vertex {
        //public symbol: symbol = Symbol();
        public static readonly defaultSurfaceType: string = "--default-surface-type";
        //public static readonly defaultTextClass: string = "--default-text-class";
        public static readonly defaultSurfaceClass: string = "--default-surface-class";
        public static readonly autoSizeShapeToFitTextName: string = "--autosize-shape-to-fit-text"

        private static readonly id_counter: number = 0;



        private _graph: Graph | null = null;
        protected _outcomingEdges: Edge[] = [];
        protected _incomingEdges: Edge[] = [];
        public tag: any;

        private _svgGroup: SVGGElement;
        private _observer: MutationObserver;
        private observerFunc: MutationCallback = (x: MutationRecord[]) => {
            let b = false;
            if (!this.isLocated) return;
            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                if (p.attributeName == "transform") {
                    b = true;
                }
            }
            if (b) this.localUpdate();

        };
        public get shapeType(): string {
            return "circle";
        }

        private _textObserver: MutationObserver;
        protected textObserverFunc: MutationCallback = (x: MutationRecord[]) => {
            if (!this.isLocated) return;
            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                this.localUpdate();

            }
        };

        constructor(graph: Graph, params: { className?: string, text?: string, x?: number, y?: number } = {}) {
            if (params.className == undefined) {
                params.className = graph.defaultVertexClass;
            }
            if (params.text == undefined) params.text = "";
            if (params.x == undefined) params.x = 0;
            if (params.y == undefined) params.y = 0;

            const g = SVG.createGroup(graph.svgGroup, params.className);

            this._svgGroup = g
            //this._svgGroup = GraphTableSVG.createGroup(className);
            this.svgGroup.setAttribute(Graph.objectIDName, (Graph.idCounter++).toString());
            this.svgGroup.setAttribute(Graph.typeName, "vertex");
            this._graph = graph;
            graph.add(this);


            this._svgText = SVG.createText(this.svgGroup.getPropertyStyleValue(SVG.defaultTextClass));
            this.svgText.textContent = params.text;
            this.svgGroup.appendChild(this.svgText);


            this._observer = new MutationObserver(this.observerFunc);
            const option1: MutationObserverInit = { attributes: true };

            this._observer.observe(this.svgGroup, option1);

            this._textObserver = new MutationObserver(this.textObserverFunc);
            const option2: MutationObserverInit = { childList: true };
            this._textObserver.observe(this.svgText, option2);


            this.x = params.x;
            this.y = params.y;


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
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        private _svgText: SVGTextElement;
        /**
        このVertexのテキストを返します。
        */
        public get svgText(): SVGTextElement {
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
            return GraphTableSVG.Common.IsDescendantOfBody(this.svgGroup);
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
        set width(value: number) {
        }
        /**
        このVertexの高さを返します。
        */
        get height(): number {
            return 0;
        }
        set height(value: number) {

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
        /**
         * 与えられた位置から伸びた辺に対応する接続位置を返します。
         * @param type 
         * @param x 
         * @param y 
         */
        public getConnectorType(type: ConnectorPosition, x: number, y: number): ConnectorPosition {
            if (type == ConnectorPosition.Auto) {
                return this.getAutoPosition(x, y);
            } else {
                return type;
            }
        }
        /**
         * 与えられた位置から伸びた辺に対応する接続位置がAutoだったときの実際の接続位置を返します。
         * @param x 
         * @param y 
         */
        protected getAutoPosition(x: number, y: number): ConnectorPosition {
            return ConnectorPosition.Top;

        }

        /**
        再描画します。
        */
        public update(): boolean {
            this.localUpdate();
            return false;
        }
        /**
         * このVertexを再描画します。
         */
        protected localUpdate() {
            let vAnchor = this.svgGroup.getPropertyStyleValue(VerticalAnchorPropertyName);
            if (vAnchor == null) vAnchor = VerticalAnchor.Middle;
            let hAnchor = this.svgGroup.getPropertyStyleValue(HorizontalAnchorPropertyName);
            if (hAnchor == null) hAnchor = HorizontalAnchor.Center;
            if (this.isAutoSizeShapeToFitText) {
                const box = this.svgText.getBBox();
                if (this.surface instanceof SVGCircleElement) {
                    this.width = Math.max(box.width, box.height);
                } else {
                    this.width = box.width;
                    this.height = box.height;
                }

            }
            Graph.setXY(this.svgText, this.innerRectangle, vAnchor, hAnchor);
            /*
            if (this.surface != null) {
                this.surface.setX(-this.width / 2);
                this.surface.setY(-this.height / 2);


                console.log(`${this.surface.getX()} ${this.surface.getY()}`);
            }
            */
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
         * このVertexがテキストに合わせてサイズを変える場合Trueを返します。
         */
        get isAutoSizeShapeToFitText(): boolean {
            if (this.surface != null) {
                var v = this.surface.getPropertyStyleValueWithDefault(Vertex.autoSizeShapeToFitTextName, "false");
                return v == "true";
            } else {
                return false;
            }
        }
        set isAutoSizeShapeToFitText(value: boolean) {
            if (this.surface != null) {
                this.surface.setPropertyStyleValue(Vertex.autoSizeShapeToFitTextName, value ? "true" : "false");
                /*
                if (this.isAutoSizeShapeToFitText != value) {
                    throw new Error("Value Error");
                }
                */
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
        /**
         * このVertexを頂点とする仮想部分木を作成します。
         */
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
         * @param graph 作成したVertexを追加するグラフ
         * @param option 作成するVertexのオプション
         * @param option.className Vertex.svgGroupのクラス属性名
         * @param option.surfaceType Vertexの形 <br/> "circle"ならばSVGCircleElement <br/> "rectangle"ならばSVGRectangleElement
         * @param option.x Vertexの中心のx座標
         * @param option.y Vertexの中心のy座標
         * @param option.text Vertex.svgTextのテキスト
         * @param option.radius VertexがCircleだったときの半径
         * @param option.width VertexがRectangleだったときの横幅
         * @param option.height VertexがRectangleだったときの縦幅
         */
        public static create(graph: Graph, option: {
            className?: string,
            surfaceType?: string, x?: number, y?: number, text?: string,
            radius?: number, width?: number, height?: number, isRoot?: boolean
        } = {}): GraphTableSVG.Vertex {
            //public static create(graph: Graph, {className: string | null = null, defaultSurfaceType: string | null = null, x: number = 0, y: number = 0}): GraphTableSVG.Vertex {

            if (option.className == undefined) option.className = graph.defaultVertexClass;
            const g = SVG.createGroup(graph.svgGroup, option.className);
            //graph.svgGroup.appendChild(g);

            const gSurfaceType = g.getPropertyStyleValue(Vertex.defaultSurfaceType);
            if (option.surfaceType == undefined) option.surfaceType = gSurfaceType != null ? gSurfaceType : "circle";
            //graph.svgGroup.removeChild(g);

            if (option.x == undefined) option.x = 0;
            if (option.y == undefined) option.y = 0;
            if (option.text == undefined) option.text = "";
            let p: Vertex;
            if (option.surfaceType == "circle") {
                p = new CircleVertex(graph, option);
            } else if (option.surfaceType == "rectangle") {
                p = new RectangleVertex(graph, option);
            } else {
                p = new Vertex(graph, option);
            }

            if (option.isRoot) {
                graph.roots.push(p);
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
        /*
        public setStyleForPNG() {
            if (this.surface != null) SVG.setStyleForPNG(this.surface);
            SVG.setStyleForPNG(this.svgText);
        }
        */
        public setIndexDictionaryForVBA(vertexDic: { [key: string]: number; }, edgeDic: { [key: string]: number; }) {
            vertexDic[this.objectID] = Object.keys(vertexDic).length;

        }

        /**
         * VBAコードを作成します。
         * @param main 
         * @param sub 
         * @param indexDic 
         */
        public createVBACode(main: string[], sub: string[][], vertexDic: { [key: string]: number; }, edgeDic: { [key: string]: number; }): void {
            if (this.graph != null) {
                //const subline: string[] = [];
                const i = vertexDic[this.objectID];
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
                    const lineType = GraphTableSVG.msoDashStyle.getLineType(surface);
                    const strokeWidth = parseInt(surface.getPropertyStyleValueWithDefault("stroke-width", "4"));
                    const visible = surface.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                    sub.push([` Call EditVertexShape(nodes(${i}), "${this.objectID}", ${visible}, ${backColor})`]);
                    sub.push([` Call EditLine(nodes(${i}).Line, ${lineColor}, ${lineType}, ${0}, ${strokeWidth}, ${visible})`]);

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