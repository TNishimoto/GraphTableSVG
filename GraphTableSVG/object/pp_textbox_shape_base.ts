namespace GraphTableSVG {
    export class PPTextBoxShapeBase {
        private _svgGroup: SVGGElement;
        /**
        セルを表しているSVGGElementを返します。
        */
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        private _svgText: SVGTextElement;
        public get svgText(): SVGTextElement {
            return this._svgText;
        }
        private _observer: MutationObserver;
        private observerFunc: MutationCallback = (x: MutationRecord[]) => {

            let b = false;
            if (!this.isLocated) return;
            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                if (this.updateAttributes.some((v) => v == p.attributeName)) {
                    b = true;
                }
            }
            if (b) this.update();
        };
        protected updateAttributes = ["transform", "data-speaker-x", "data-speaker-y", 
        "data-width", "data-height", "data-arrow-neck-width", "data-arrow-neck-height", "data-arrow-head-width", "data-arrow-head-height"]
        get isLocated(): boolean {
            return GraphTableSVG.Common.IsDescendantOfBody(this.svgGroup);
        }
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

        public constructor(svgbox: HTMLElement, option: { className?: string, cx?: number, cy?: number, text?: string, isAutoSizeShapeToFitText?: boolean } = {}) {
            this._svgGroup = SVG.createGroup(svgbox, option.className == undefined ? null : option.className);
            this._svgText = GraphTableSVG.SVG.createText(this.svgGroup.getPropertyStyleValue(SVG.defaultTextClass));
            this.svgGroup.appendChild(this.svgText);
            if (option.text != undefined) this.svgText.setTextContent(option.text);
            if (option.isAutoSizeShapeToFitText != undefined) this.isAutoSizeShapeToFitText = option.isAutoSizeShapeToFitText;

            this._observer = new MutationObserver(this.observerFunc);
            const option1: MutationObserverInit = { attributes: true };

            this._observer.observe(this.svgGroup, option1);

            this._textObserver = new MutationObserver(this.textObserverFunc);
            const option2: MutationObserverInit = { childList: true, attributes: true, subtree : true };
            this._textObserver.observe(this.svgText, option2);

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
            return this.svgGroup.getAttributeNumber("data-width", 0);
        }
        set width(value: number) {
            if (this.width != value) this.svgGroup.setAttribute("data-width", value.toString());

        }
        /**
        頂点の高さを返します。
        */
        get height(): number {
            return this.svgGroup.getAttributeNumber("data-height", 0);
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
            let vAnchor = this.svgGroup.getPropertyStyleValue(VerticalAnchorPropertyName);
            if (vAnchor == null) vAnchor = VerticalAnchor.Middle;
            let hAnchor = this.svgGroup.getPropertyStyleValue(HorizontalAnchorPropertyName);
            if (hAnchor == null) hAnchor = HorizontalAnchor.Center;
            if(this.isAutoSizeShapeToFitText) this.updateToFitText();
            Graph.setXY2(this.svgText, this.innerRectangle, vAnchor, hAnchor, this.isAutoSizeShapeToFitText);
            //Graph.setXY(this.svgText, this.innerRectangle, vAnchor, hAnchor);
            this._isUpdating = false;

        }
        protected updateToFitText(){
            const box = this.svgText.getBBox();
            this.width = box.width + this.svgText.getMarginLeft() + this.svgText.getMarginRight();
            this.height = box.height + this.svgText.getMarginTop() + this.svgText.getMarginBottom();
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
        public get svgElements() : SVGElement[]{
            const r : SVGElement[] = [];
            r.push(this.svgGroup);
            r.push(this.svgText);
            return r;
        }
        public hasDescendant(obj: SVGElement): boolean {
            const ids = this.svgElements.map((v)=>v.getAttribute(GraphTableSVG.SVG.objectIDName)).filter((v)=>v != null);
            const id = obj.getAttribute(GraphTableSVG.SVG.objectIDName);
            return ids.some((v)=>v==id);
        }
    }
    
    export class PPPathTextBox extends PPTextBoxShapeBase {
        private _svgPath: SVGPathElement;
        public get svgPath(): SVGPathElement {
            return this._svgPath;
        }
        public constructor(svgbox: HTMLElement, option: { className?: string, cx?: number, cy?: number, text?: string, isAutoSizeShapeToFitText?: boolean } = {}) {
            super(svgbox, option);
            this._svgPath = GraphTableSVG.SVG.createPath(this.svgGroup, 0, 0, 0, 0, this.svgGroup.getPropertyStyleValue(SVG.defaultPathClass));
            this.svgGroup.insertBefore(this.svgPath, this.svgText);
            

            this.width = 100;
            this.height = 100;

            if (option.cx != undefined) this.cx = option.cx;
            if (option.cy != undefined) this.cy = option.cy;

            //this.update();
        }
        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
            if (this.isAutoSizeShapeToFitText) {
                const b = this.svgText.getBBox();
                rect.width = b.width;
                rect.height = b.height;
                rect.x = (-this.width / 2) + this.svgText.getMarginLeft();
                rect.y = (-this.height / 2) + this.svgText.getMarginTop();
            } else {
                rect.width = this.width - this.svgText.getMarginLeft();
                rect.height = this.height - this.svgText.getMarginTop();
                rect.x = (-this.width / 2) + this.svgText.getMarginLeft();
                rect.y = (-this.height / 2) + this.svgText.getMarginTop();
            }
            return rect;
        }
        protected get shape() : string{
            return "NONE";
        }
        private getVBAEditLine(id : number) : string {
            const lineColor = VBATranslateFunctions.colorToVBA(this.svgPath.getPropertyStyleValueWithDefault("stroke", "gray"));
            const lineType = GraphTableSVG.msoDashStyle.getLineType(this.svgPath);
            const strokeWidth = parseInt(this.svgPath.getPropertyStyleValueWithDefault("stroke-width", "4"));
            const visible = this.svgPath.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
            return ` Call EditLine(obj${id}.Line, ${lineColor}, ${lineType}, ${0}, ${strokeWidth}, ${visible})`;
        }
        public createVBACode(id: number): string[] {
            const lines : string[] = [];
            const backColor = VBATranslateFunctions.colorToVBA(this.svgPath.getPropertyStyleValueWithDefault("fill", "gray"));
            const visible = this.svgPath.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";


            lines.push(`Sub create${id}(createdSlide As slide)`);
            lines.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
            lines.push(` Dim obj${id} As Shape`);
            lines.push(` Set obj${id} = shapes_.AddShape(${this.shape}, ${this.x}, ${this.y}, ${this.width}, ${this.height})`);
            lines.push(` Call EditTextFrame(obj${id}.TextFrame, ${this.svgText.getMarginTop()}, ${this.svgText.getMarginBottom()}, ${this.svgText.getMarginLeft()}, ${this.svgText.getMarginRight()}, false, ppAutoSizeNone)`);
            VBATranslateFunctions.TranslateSVGTextElement2(this.svgText, `obj${id}.TextFrame.TextRange`).forEach((v)=>lines.push(v));
            const adjustments = this.VBAAdjustments;
            lines.push(this.getVBAEditLine(id));

            lines.push(` Call EditCallOut(obj${id}, "${id}", ${visible}, ${backColor})`)
            this.VBAAdjustments.forEach((v,i) => {
                lines.push(` obj${id}.Adjustments.Item(${i+1}) = ${v}`);
            })
            lines.push(`End Sub`);
            //sub.push([` Call EditTextEffect(nodes(${i}).TextEffect, ${fontSize}, "${fontFamily}")`]);
            return lines;
        }
        protected get VBAAdjustments() : number[] {
            return [];
        }
    }
}