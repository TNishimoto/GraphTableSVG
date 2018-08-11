namespace GraphTableSVG {

    export class SVGGroupBase {
        private static objectDic: { [key: string]: SVGGroupBase; } = {};
        public static getObjectFromObjectID(id: string): SVGGroupBase {
            return this.objectDic[id];
        }
        public static setObjectFromObjectID(obj: SVGGroupBase) {
            const id = obj.svgGroup.getAttribute(GraphTableSVG.SVG.objectIDName);
            this.objectDic[id] = obj;
        }
        public static getObjectFromID(id: string): SVGGroupBase | null {


            for (let key in this.objectDic) {
                if (this.objectDic[key].svgGroup.id == id) {
                    return this.objectDic[key];
                }
            }
            return null;
        }
        private _svgGroup: SVGGElement;
        /**
        セルを表しているSVGGElementを返します。
        */
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        get isLocated(): boolean {
            return GraphTableSVG.Common.IsDescendantOfBody(this.svgGroup);
        }
        /**
    このVertexのX座標を返します。
    */
        public get cx(): number {
            return this.svgGroup.getX();
        }
        public set cx(value: number) {
            if (this.svgGroup.getX() != value) {
                this.svgGroup.setX(value);
            }
        }
        /**
        このVertexのY座標を返します。
        */
        public get cy(): number {
            return this.svgGroup.getY();
        }
        public set cy(value: number) {
            if (this.svgGroup.getY() != value) {
                this.svgGroup.setY(value);
            }
        }
        /**
頂点の幅を返します。
*/
        get width(): number {
            return this.svgGroup.gtGetAttributeNumber("data-width", 0);
        }
        set width(value: number) {
            if (this.width != value) this.svgGroup.setAttribute("data-width", value.toString());

        }
        /**
        頂点の高さを返します。
        */
        get height(): number {
            return this.svgGroup.gtGetAttributeNumber("data-height", 0);
        }
        set height(value: number) {
            if (this.height != value) this.svgGroup.setAttribute("data-height", value.toString());
        }
        public get x(): number {
            return this.cx - (this.width / 2);
        }
        public get y(): number {
            return this.cy - (this.height / 2);
        }
        public get type(): string {
            return "PPTextBoxShapeBase";
        }
        protected createSurface(svgbox: SVGElement, option: TextBoxShapeAttributes = {}): void {

        }
        public constructor(svgbox: SVGElement | string, option: TextBoxShapeAttributes = {}) {
            let parentElement : SVGElement = svgbox instanceof SVGElement ? svgbox : <any>document.getElementById(svgbox);

            this._svgGroup = SVG.createGroup(parentElement, option.className == undefined ? null : option.className);
            //const objID = PPTextBoxShapeBase.objectIDCounter++;
            //this.svgGroup.setAttribute("objectID", objID.toString());
            SVGGroupBase.setObjectFromObjectID(this);

            this.svgGroup.setAttribute("data-group-type", this.type);
            this.createSurface(parentElement, option);


            if (option.id != undefined) this.svgGroup.id = option.id;


            if (option.width != undefined) this.width = option.width;
            if (option.height != undefined) this.height = option.height;

            if (option.cx != undefined) this.cx = option.cx;
            if (option.cy != undefined) this.cy = option.cy;


        }
        /**
         * この頂点を廃棄します。廃棄された頂点はグラフから取り除かれます。
         */
        public dispose() {
        }
        /**
        この頂点が廃棄されていたらTrueを返します。
        */
        get isDisposed(): boolean {
            return false;
            //return this.graph == null;
        }
    }
    export class PPTextBoxShapeBase extends SVGGroupBase {
        private _svgText: SVGTextElement;
        public get svgText(): SVGTextElement {
            return this._svgText;
        }
        //private static objectIDCounter = 0;



        private _observer: MutationObserver;
        private observerFunc: MutationCallback = (x: MutationRecord[]) => {

            let b = false;
            if (!this.isLocated) return;
            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                if (this.updateAttributes.some((v) => v == p.attributeName)) {
                    b = true;
                }

                if (p.attributeName == "transform") {
                    this.dispatchConnectPositionChangedEvent();
                }
            }
            if (b) this.update();
        };
        public get surface(): SVGElement {
            return undefined;
        }
        /**
        このVertexのObjectIDを返します。
        */
        public get objectID(): string {
            const r = this.svgGroup.getAttribute(GraphTableSVG.SVG.objectIDName);
            if (r == null) {
                throw new Error();
            } else {
                return r;
            }
        }
        static constructAttributes(e: SVGElement,
            removeAttributes: boolean = false, output: TextBoxShapeAttributes = {}): TextBoxShapeAttributes {
            output.className = e.getAttribute("class")
            output.cx = e.gtGetAttributeNumber("cx", 0);
            output.cy = e.gtGetAttributeNumber("cy", 0);
            output.text = e.getAttribute("text");
            output.width = e.gtGetAttributeNumber("width", 100);
            output.height = e.gtGetAttributeNumber("height", 100);

            output.isAutoSizeShapeToFitText = e.getPropertyStyleValueWithDefault(Vertex.autoSizeShapeToFitTextName, "false") == "true";

            if (removeAttributes) {
                e.removeAttribute("cx");
                e.removeAttribute("cy");
                e.removeAttribute("class");
                e.removeAttribute("text");
                e.removeAttribute("width");
                e.removeAttribute("height");
                e.style.removeProperty(Vertex.autoSizeShapeToFitTextName);
            }
            return output;
        }

        protected updateAttributes = ["style", "transform", "data-speaker-x", "data-speaker-y",
            "data-width", "data-height", "data-arrow-neck-width", "data-arrow-neck-height",
            "data-arrow-head-width", "data-arrow-head-height"]

        protected surfaceAttributes: string[] = [];

        private _textObserver: MutationObserver;
        protected textObserverFunc: MutationCallback = (x: MutationRecord[]) => {
            if (!this.isLocated) return;
            let b = false;

            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                if (PPTextBoxShapeBase.updateTextAttributes.some((v) => v == p.attributeName)) {
                    b = true;
                }
                if (p.attributeName == null) {
                    b = true;
                }
            }
            if (b) this.update();

        };
        private static updateTextAttributes = ["style"]

        public static ConnectPositionChangedEventName = "connect_position_changed";
        protected dispatchConnectPositionChangedEvent(): void {
            if (this.surface != null) {
                var event = document.createEvent("HTMLEvents");
                event.initEvent(PPTextBoxShapeBase.ConnectPositionChangedEventName, true, true)
                this.surface.dispatchEvent(event);
            }
        }
        public constructor(svgbox: SVGElement | string, option: TextBoxShapeAttributes = {}) {
            super(svgbox, option)


            this._svgText = GraphTableSVG.SVG.createText(this.svgGroup.getPropertyStyleValue(SVG.defaultTextClass));
            this.svgGroup.appendChild(this.svgText);


            this._observer = new MutationObserver(this.observerFunc);
            const option1: MutationObserverInit = { attributes: true, childList: true, subtree: true };
            this._observer.observe(this.svgGroup, option1);

            this._textObserver = new MutationObserver(this.textObserverFunc);
            const option2: MutationObserverInit = { childList: true, attributes: true, subtree: true };
            this._textObserver.observe(this.svgText, option2);

            if (option.text != undefined) this.svgText.setTextContent(option.text);
            if (option.isAutoSizeShapeToFitText != undefined) this.isAutoSizeShapeToFitText = option.isAutoSizeShapeToFitText;



        }






        get horizontalAnchor(): HorizontalAnchor {
            const b = this.svgGroup.getPropertyStyleValueWithDefault(HorizontalAnchorPropertyName, "center");
            return HorizontalAnchor.toHorizontalAnchor(b);
        }
        /**
        テキストの水平方向の配置設定を設定します。
        */
        set horizontalAnchor(value: HorizontalAnchor) {
            if (this.horizontalAnchor != value) this.svgGroup.setPropertyStyleValue(HorizontalAnchorPropertyName, value);
        }
        /**
        テキストの垂直方向の配置設定を返します。
        */
        get verticalAnchor(): VerticalAnchor {
            const b = this.svgGroup.getPropertyStyleValueWithDefault(VerticalAnchorPropertyName, "middle");
            return VerticalAnchor.toVerticalAnchor(b);
        }
        /**
        テキストの垂直方向の配置設定を設定します。
        */
        set verticalAnchor(value: VerticalAnchor) {
            if (this.verticalAnchor != value) this.svgGroup.setPropertyStyleValue(VerticalAnchorPropertyName, value);
        }

        /**
         * このVertexがテキストに合わせてサイズを変える場合Trueを返します。
         */
        get isAutoSizeShapeToFitText(): boolean {
            return this.svgGroup.getPropertyStyleValueWithDefault(Vertex.autoSizeShapeToFitTextName, "false") == "true";
        }
        set isAutoSizeShapeToFitText(value: boolean) {
            this.svgGroup.setPropertyStyleValue(Vertex.autoSizeShapeToFitTextName, value ? "true" : "false");
        }
        private _isUpdating: boolean = false;
        protected update() {
            this._isUpdating = true;
            if (this.isAutoSizeShapeToFitText) this.updateToFitText();
            this.updateSurface();
            Graph.setXY2(this.svgText, this.innerRectangle, this.verticalAnchor, this.horizontalAnchor, this.isAutoSizeShapeToFitText);
            //Graph.setXY(this.svgText, this.innerRectangle, vAnchor, hAnchor);
            this._isUpdating = false;
        }

        protected updateSurface() {

        }
        protected updateToFitText() {
            const box = this.svgText.getBBox();
            this.width = box.width + this.marginPaddingLeft + this.marginPaddingRight;
            this.height = box.height + this.marginPaddingTop + this.marginPaddingBottom;
        }
        get marginPaddingTop() {
            return this.svgText.getMarginTop() + this.svgGroup.getPaddingTop();
        }
        get marginPaddingLeft() {
            return this.svgText.getMarginLeft() + this.svgGroup.getPaddingLeft();
        }
        get marginPaddingRight() {
            return this.svgText.getMarginRight() + this.svgGroup.getPaddingRight();
        }
        get marginPaddingBottom() {
            return this.svgText.getMarginBottom() + this.svgGroup.getPaddingBottom();
        }

        get innerRectangle(): Rectangle {


            const rect = new Rectangle();
            rect.width = 0;
            rect.height = 0;
            rect.x = 0;
            rect.y = 0;
            return rect;
        }

        /*
        get marginLeft(): number {
            return this.svgText.getPropertyStyleNumberValue("--margin-left", 0);
        }
        set marginLeft(value: number) {
            this.svgText.setPropertyStyleValue("--margin-left", value.toString());
        }
        get marginTop(): number {
            return this.svgText.getPropertyStyleNumberValue("--margin-top", 0);
        }
        set marginTop(value: number) {
            this.svgText.setPropertyStyleValue("--margin-top", value.toString());
        }
        */
        public createVBACode(id: number): string[] {
            return [];
        }
        public get svgElements(): SVGElement[] {
            const r: SVGElement[] = [];
            r.push(this.svgGroup);
            r.push(this.svgText);
            return r;
        }
        public hasDescendant(obj: SVGElement): boolean {
            const ids = this.svgElements.map((v) => v.getAttribute(GraphTableSVG.SVG.objectIDName)).filter((v) => v != null);
            const id = obj.getAttribute(GraphTableSVG.SVG.objectIDName);
            return ids.some((v) => v == id);
        }



    }

    export class PPVertexBase extends PPTextBoxShapeBase {
        /**
        * 接続部分のXY座標を返します。
        * @param type
        * @param x
        * @param y
        */
        public getLocation(type: ConnectorPosition, x: number, y: number): [number, number] {
            return [this.cx, this.cy];
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
        入辺配列を返します。
        */
        get outcomingEdges(): PPEdge[] {
            const p = <number[]>JSON.parse(this.svgGroup.gtGetAttribute("outcoming-edges", "[]"));
            const p2 = p.map((v) => SVGGroupBase.getObjectFromObjectID(v.toString()));
            return <PPEdge[]>p2;
        }

        /*
        set outcomingEdges(edges : PPEdge[]) {
            const mes = edges.map((v)=>v.objectID).join(",");
            this.svgGroup.setAttribute("outcoming-edges", mes);
        }
        */

        /**
        出辺配列を返します。
        */
        get incomingEdges(): PPEdge[] {
            const p = <number[]>JSON.parse(this.svgGroup.gtGetAttribute("incoming-edges", "[]"));
            const p2 = p.map((v) => SVGGroupBase.getObjectFromObjectID(v.toString()));
            return <PPEdge[]>p2;

        }
        /*
        set incomingEdges(edges : PPEdge[]) {
            const mes = edges.map((v)=>v.objectID).join(",");
            this.svgGroup.setAttribute("incoming-edges", mes);
        }
        */

        /**
         * 出辺を挿入します。
         * @param edge
         * @param insertIndex
         */
        public insertOutcomingEdge(edge: PPEdge, insertIndex: number = this.outcomingEdges.length) {
            const p = this.outcomingEdges.indexOf(edge);
            if (p != -1) {
                throw new Error();
            } else {
                const edges = this.outcomingEdges;
                edges.splice(insertIndex, 0, edge);
                const newEdges = JSON.stringify(edges.map((v)=> Number(v.objectID) ));
                console.log(`Incom ${edges.length} / ${newEdges}`)
                this.svgGroup.setAttribute("outcoming-edges", newEdges);

                if (edge.beginVertex != this) {
                    edge.beginVertex = this;
                }
            }

        }
        /**
         * 出辺を削除します。
         * @param edge
         */
        public removeOutcomingEdge(edge: PPEdge) {
            const p = this.outcomingEdges.indexOf(edge);
            if (p != null) {
                const edges = this.outcomingEdges;
                edges.splice(p, 1);
                const newEdges = JSON.stringify(edges.map((v)=>Number(v.objectID)));
                this.svgGroup.setAttribute("outcoming-edges", newEdges);


                if (edge.beginVertex == this) {
                    edge.beginVertex = null;
                }
            }
        }
        /**
        * 入辺を挿入します。
        * @param edge
        * @param insertIndex
        */
        public insertIncomingEdge(edge: PPEdge, insertIndex: number = this.incomingEdges.length) {
            const p = this.incomingEdges.indexOf(edge);
            if (p != -1) {
                throw new Error();
            } else {
                const edges = this.incomingEdges;
                edges.splice(insertIndex, 0, edge);
                const newEdges = JSON.stringify(edges.map((v)=>Number(v.objectID)));

                this.svgGroup.setAttribute("incoming-edges", newEdges);
                if (edge.endVertex != this) {
                    edge.endVertex = this;
                }
            }
        }
        /**
         * 入辺を削除します。
         * @param edge
         */
        public removeIncomingEdge(edge: PPEdge) {
            const p = this.incomingEdges.indexOf(edge);
            if (p != null) {
                const edges = this.incomingEdges;
                edges.splice(p, 1);
                const newEdges = JSON.stringify(edges.map((v)=>Number(v.objectID)));
                this.svgGroup.setAttribute("incoming-edges", newEdges);


                if (edge.endVertex == this) {
                    edge.endVertex = null;
                }
            }
        }
        public dispose() {
            while (this.incomingEdges.length > 0) {
                this.removeIncomingEdge(this.incomingEdges[0]);
            }

            while (this.outcomingEdges.length > 0) {
                this.removeOutcomingEdge(this.outcomingEdges[0]);
            }

        }

    }


}