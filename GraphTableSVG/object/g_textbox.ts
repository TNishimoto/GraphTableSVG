/// <reference path="g_object.ts"/>
namespace GraphTableSVG {

    export class GTextBox extends GObject {
        public constructor(svgbox: SVGElement | string, option: TextBoxShapeAttributes = {}) {
            super(svgbox, option)

            this._svgText = GraphTableSVG.SVG.createText(this.svgGroup.getPropertyStyleValue(CustomAttributeNames.Style.defaultTextClass));
            this.svgGroup.appendChild(this.svgText);
            this._textObserver = new MutationObserver(this.textObserverFunc);
            const option2: MutationObserverInit = { childList: true, attributes: true, subtree: true };
            this._textObserver.observe(this.svgText, option2);

            //this.isAutoSizeShapeToFitText = false;            
            if (typeof option.text !== "undefined") this.svgText.setTextContent(option.text);
            if (typeof option.isAutoSizeShapeToFitText !== "undefined") this.isAutoSizeShapeToFitText = option.isAutoSizeShapeToFitText;
            
        }
        initializeOption(option: PPObjectAttributes) : PPObjectAttributes {
            const _option = <PPEdgeAttributes>super.initializeOption(option);
            return _option;
        }
        static constructAttributes(e: SVGElement,
            removeAttributes: boolean = false, output: TextBoxShapeAttributes = {}): TextBoxShapeAttributes {
            
            GObject.constructAttributes(e, removeAttributes, output);
            output.isAutoSizeShapeToFitText = e.gtGetStyleBooleanWithUndefined(CustomAttributeNames.Style.autoSizeShapeToFitTextName);            
            const textChild = HTMLFunctions.getChildByNodeName(e, "text");

            if(e.hasAttribute("text")){
                output.text = <string>e.getAttribute("text");
            }else if(textChild != null){

            }else if(e.innerHTML.length > 0){
                output.text = e.innerHTML;
            }


            if (removeAttributes) {
                e.removeAttribute("text");
                e.style.removeProperty(CustomAttributeNames.Style.autoSizeShapeToFitTextName);
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
            return this.svgGroup.getPropertyStyleValueWithDefault(CustomAttributeNames.Style.autoSizeShapeToFitTextName, "false") == "true";
        }
        set isAutoSizeShapeToFitText(value: boolean) {
            this.svgGroup.setPropertyStyleValue(CustomAttributeNames.Style.autoSizeShapeToFitTextName, value ? "true" : "false");
        }
        protected update() {
            this._isUpdating = true;
            if (this.isAutoSizeShapeToFitText) this.updateToFitText();
            this.updateSurface();
            this.svgText.gtSetXY(this.innerRectangle, this.verticalAnchor, this.horizontalAnchor, this.isAutoSizeShapeToFitText);
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

        public get hasSize() : boolean{
            return true;
        }


    }


}