/// <reference path="g_object.ts"/>
namespace GraphTableSVG {

    export class GTextBox extends GObject {
        public constructor(svgbox: SVGElement | string, option: GTextBoxAttributes = {}) {
            super(svgbox, option)

            /*
            this._svgText = GTextBox.createSVGText(this.svgGroup.getPropertyStyleValue(CustomAttributeNames.Style.defaultTextClass));
            this.svgGroup.appendChild(this.svgText);
            this._textObserver = new MutationObserver(this.textObserverFunc);
            const option2: MutationObserverInit = { childList: true, attributes: true, subtree: true };
            this._textObserver.observe(this.svgText, option2);
            */

            const _option = <GTextBoxAttributes>this.initializeOption(option);

            this._svgText = GTextBox.createSVGText(this.svgGroup.getPropertyStyleValue(CustomAttributeNames.Style.defaultTextClass));
            this.svgGroup.appendChild(this.svgText);
            this._textObserver = new MutationObserver(this.textObserverFunc);
            const option2: MutationObserverInit = { childList: true, attributes: true, subtree: true };
            this._textObserver.observe(this.svgText, option2);
            if (_option.text !== undefined) this.svgText.setTextContent(_option.text);
            if (_option.isAutoSizeShapeToFitText !== undefined) this.isAutoSizeShapeToFitText = _option.isAutoSizeShapeToFitText;            

        }
        private isFixTextSize : boolean = false;
        
        initializeOption(option: GObjectAttributes): GObjectAttributes {
            const _option = <GTextBoxAttributes>super.initializeOption(option);
            if (_option.isAutoSizeShapeToFitText === undefined) _option.isAutoSizeShapeToFitText = true;
            if(_option.verticalAnchor === undefined) _option.verticalAnchor = VerticalAnchor.Middle;
            if(_option.horizontalAnchor === undefined) _option.horizontalAnchor = HorizontalAnchor.Center;

            return _option;
        }
        /**
                 * SVGTextElementを生成します。
                 * @param className 生成するSVG要素のクラス属性名
                 * @returns 生成されたSVGTextElement
                 */
        private static createSVGText(className: string | null = null): SVGTextElement {
            const _svgText: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

            _svgText.setAttribute(CustomAttributeNames.objectIDName, (GraphTableSVG.SVG.idCounter++).toString());
            //_svgText.style.textAnchor = "middle";
            if (className == null) {
                _svgText.style.fill = "black";
                _svgText.style.fontSize = "14px";
                _svgText.style.fontWeight = "bold";
                _svgText.style.fontFamily = 'Times New Roman';
                _svgText.setMarginLeft(10);
                _svgText.setMarginRight(10);
                _svgText.setMarginTop(10);
                _svgText.setMarginBottom(10);
            } else {
                _svgText.setAttribute("class", className);
                //_svgText.className = className;
            }
            return _svgText;
        }

        static constructAttributes(e: Element,
            removeAttributes: boolean = false, output: GTextBoxAttributes = {}): GTextBoxAttributes {

            GObject.constructAttributes(e, removeAttributes, output);
            output.isAutoSizeShapeToFitText = e.gtGetStyleBooleanWithUndefined(CustomAttributeNames.Style.autoSizeShapeToFitTextName);
            const textChild = HTMLFunctions.getChildByNodeName(e, "text");

            if (e.hasAttribute("text")) {
                output.text = <string>e.getAttribute("text");
            } else if (textChild != null) {

            } else if (e.innerHTML.length > 0) {
                output.text = e.innerHTML;
            }


            if (removeAttributes) {
                e.removeAttribute("text");
                (<any>e).style.removeProperty(CustomAttributeNames.Style.autoSizeShapeToFitTextName);
            }
            return output;
        }
        private _svgText: SVGTextElement;
        public get svgText(): SVGTextElement {
            return this._svgText;
        }




        protected surfaceAttributes: string[] = [];

        private _textObserver: MutationObserver;
        protected textObserverFunc: MutationCallback = (x: MutationRecord[]) => {
            if (!this.isLocated) return;
            let b = false;

            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                if (GTextBox.updateTextAttributes.some((v) => v == p.attributeName)) {
                    b = true;
                }
                if (p.attributeName == null) {
                    b = true;
                }
            }
            if (b) this.update();

        };
        private static updateTextAttributes = ["style"]







        get horizontalAnchor(): HorizontalAnchor {
            const b = this.svgGroup.getPropertyStyleValueWithDefault(CustomAttributeNames.Style.HorizontalAnchor, "center");
            return HorizontalAnchor.toHorizontalAnchor(b);
        }
        /**
        テキストの水平方向の配置設定を設定します。
        */
        set horizontalAnchor(value: HorizontalAnchor) {
            if (this.horizontalAnchor != value) this.svgGroup.setPropertyStyleValue(CustomAttributeNames.Style.HorizontalAnchor, value);
        }
        /**
        テキストの垂直方向の配置設定を返します。
        */
        get verticalAnchor(): VerticalAnchor {
            const b = this.svgGroup.getPropertyStyleValueWithDefault(CustomAttributeNames.Style.VerticalAnchor, "middle");
            return VerticalAnchor.toVerticalAnchor(b);
        }
        /**
        テキストの垂直方向の配置設定を設定します。
        */
        set verticalAnchor(value: VerticalAnchor) {
            if (this.verticalAnchor != value) this.svgGroup.setPropertyStyleValue(CustomAttributeNames.Style.VerticalAnchor, value);
        }

        /**
         * このVertexがテキストに合わせてサイズを変える場合Trueを返します。
         */
        get isAutoSizeShapeToFitText(): boolean {
            return this.svgGroup.getPropertyStyleValueWithDefault(CustomAttributeNames.Style.autoSizeShapeToFitTextName, "false") == "true";
        }
        set isAutoSizeShapeToFitText(value: boolean) {
            this.svgGroup.setPropertyStyleValue(CustomAttributeNames.Style.autoSizeShapeToFitTextName, value ? "true" : "false");
        }
        protected update() {
            this._isUpdating = true;
            this._observer.disconnect();

            if (this.isAutoSizeShapeToFitText) this.updateToFitText();
            this.updateSurface();
            this.svgText.gtSetXY(this.innerRectangle, this.verticalAnchor, this.horizontalAnchor, this.isAutoSizeShapeToFitText);
            //Graph.setXY(this.svgText, this.innerRectangle, vAnchor, hAnchor);
            this._isUpdating = false;
            this._observer.observe(this.svgGroup, this.groupObserverOption);
        }

        protected updateSurface() {

        }
        protected updateToFitText() {
            this.isFixTextSize = true;
            //console.log("c")
            //console.log(this.svgText.getBoundingClientRect());
            //console.log(this.svgText.getBBox());

            //const box = this.svgText.getBBox();
            const textRect = SVGTextBox.getSize(this.svgText);
            
            this.width = textRect.width + this.marginPaddingLeft + this.marginPaddingRight;
            this.height = textRect.height + this.marginPaddingTop + this.marginPaddingBottom;
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
        public get svgElements(): SVGElement[] {
            const r: SVGElement[] = [];
            r.push(this.svgGroup);
            r.push(this.svgText);
            return r;
        }
        public hasDescendant(obj: SVGElement): boolean {
            const ids = this.svgElements.map((v) => v.getAttribute(CustomAttributeNames.objectIDName)).filter((v) => v != null);
            const id = obj.getAttribute(CustomAttributeNames.objectIDName);
            return ids.some((v) => v == id);
        }

        public get hasSize(): boolean {
            return true;
        }

    }


}