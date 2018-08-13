namespace GraphTableSVG {

    export class PPTextBox extends PPObject {
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

                if (p.attributeName == "transform") {
                    this.dispatchConnectPositionChangedEvent();
                }
            }
            if (b) this.update();
        };
        
        static constructAttributes(e: SVGElement,
            removeAttributes: boolean = false, output: TextBoxShapeAttributes = {}): TextBoxShapeAttributes {
            if(e.hasAttribute("class"))output.class = <string>e.getAttribute("class")
            output.cx = e.gtGetAttributeNumberWithoutNull("cx", 0);
            output.cy = e.gtGetAttributeNumberWithoutNull("cy", 0);
            if(e.hasAttribute("text"))output.text = <string>e.getAttribute("text");
            output.width = e.gtGetAttributeNumberWithoutNull("width", 100);
            output.height = e.gtGetAttributeNumberWithoutNull("height", 100);

            output.isAutoSizeShapeToFitText = e.getPropertyStyleValueWithDefault(CustomAttributeNames.autoSizeShapeToFitTextName, "false") == "true";

            if (removeAttributes) {
                e.removeAttribute("cx");
                e.removeAttribute("cy");
                e.removeAttribute("class");
                e.removeAttribute("text");
                e.removeAttribute("width");
                e.removeAttribute("height");
                e.style.removeProperty(CustomAttributeNames.autoSizeShapeToFitTextName);
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
                if (PPTextBox.updateTextAttributes.some((v) => v == p.attributeName)) {
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
                event.initEvent(PPTextBox.ConnectPositionChangedEventName, true, true)
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
            return this.svgGroup.getPropertyStyleValueWithDefault(CustomAttributeNames.autoSizeShapeToFitTextName, "false") == "true";
        }
        set isAutoSizeShapeToFitText(value: boolean) {
            this.svgGroup.setPropertyStyleValue(CustomAttributeNames.autoSizeShapeToFitTextName, value ? "true" : "false");
        }
        private _isUpdating: boolean = false;
        protected update() {
            this._isUpdating = true;
            if (this.isAutoSizeShapeToFitText) this.updateToFitText();
            this.updateSurface();
            ObsoleteGraph.setXY2(this.svgText, this.innerRectangle, this.verticalAnchor, this.horizontalAnchor, this.isAutoSizeShapeToFitText);
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


}