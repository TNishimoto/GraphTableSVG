/// <reference path="g_object.ts"/>
namespace GraphTableSVG {

    export class GTextBox extends GObject {        
        private _svgText: SVGTextElement;
        private isFixTextSize : boolean = false;
        protected surfaceAttributes: string[] = [];
        private _textObserver: MutationObserver;
        private static updateTextAttributes = ["style"]

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

            this._svgText = GTextBox.createSVGText(_option.textClass, _option.textStyle);
            this.svgGroup.appendChild(this.svgText);
            this._textObserver = new MutationObserver(this.textObserverFunc);
            const option2: MutationObserverInit = { childList: true, attributes: true, subtree: true };
            this._textObserver.observe(this.svgText, option2);

            if(typeof _option.text == "string"){
                this.svgText.setTextContent(_option.text);
            }else if(Array.isArray(_option.text)){
                GraphTableSVG.SVGTextBox.constructSVGTextByHTMLElements(this.svgText, _option.text, false);   
            }else{

            }

            const b = this.svgGroup.gtGetStyleBooleanWithUndefined(CustomAttributeNames.Style.autoSizeShapeToFitText);
            if(b === undefined && _option.isAutoSizeShapeToFitText !== undefined){
                this.isAutoSizeShapeToFitText = _option.isAutoSizeShapeToFitText;  
            }

            //if(_option.x !== undefined) this.x = _option.x;
            //if(_option.y !== undefined) this.y = _option.y;
        }
        
        initializeOption(option: GObjectAttributes): GObjectAttributes {
            let b= false;
            if(option.width !== undefined || option.height !== undefined){
                b = true;
            }

            const _option = <GTextBoxAttributes>super.initializeOption(option);
            if(b && _option.isAutoSizeShapeToFitText === undefined)_option.isAutoSizeShapeToFitText = false;
            if (_option.isAutoSizeShapeToFitText === undefined) _option.isAutoSizeShapeToFitText = true;
            if(_option.verticalAnchor === undefined) _option.verticalAnchor = VerticalAnchor.Middle;
            if(_option.horizontalAnchor === undefined) _option.horizontalAnchor = HorizontalAnchor.Center;
            if(_option.textClass === undefined) _option.textClass = this.svgGroup.gtGetAttributeStringWithUndefined(CustomAttributeNames.Style.defaultTextClass);

            
            return _option;
        }
        /**
                 * SVGTextElementを生成します。
                 * @param className 生成するSVG要素のクラス属性名
                 * @returns 生成されたSVGTextElement
                 */
        private static createSVGText(className: string | undefined, style : string | undefined): SVGTextElement {
            const _svgText: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

            _svgText.setAttribute(CustomAttributeNames.objectIDName, (GraphTableSVG.SVG.idCounter++).toString());
            if(style !== undefined) _svgText.setAttribute("style", style);
            
            //_svgText.style.textAnchor = "middle";
            if (className == null) {
                if(_svgText.style.fill == null || _svgText.style.fill == "")_svgText.style.fill = "black";
                if(_svgText.style.fontSize == null || _svgText.style.fontSize == "")_svgText.style.fontSize = "14px";
                if(_svgText.style.fontWeight == null || _svgText.style.fontWeight == "")_svgText.style.fontWeight = "bold";
                if(_svgText.style.fontFamily == null || _svgText.style.fontFamily == "")_svgText.style.fontFamily = 'Times New Roman';
                if(_svgText.style.getPropertyValue(CustomAttributeNames.Style.marginLeft) == "") _svgText.setMarginLeft(10);
                if(_svgText.style.getPropertyValue(CustomAttributeNames.Style.marginRight) == "")_svgText.setMarginRight(10);
                if(_svgText.style.getPropertyValue(CustomAttributeNames.Style.marginTop) == "")_svgText.setMarginTop(10);
                if(_svgText.style.getPropertyValue(CustomAttributeNames.Style.marginBottom) == "")_svgText.setMarginBottom(10);
            } else {
                _svgText.setAttribute("class", className);
                //_svgText.className = className;
            }
            return _svgText;
        }

        static constructAttributes(e: Element,
            removeAttributes: boolean = false, output: GTextBoxAttributes = {}): GTextBoxAttributes {

            GObject.constructAttributes(e, removeAttributes, output);
            output.isAutoSizeShapeToFitText = e.gtGetStyleBooleanWithUndefined(CustomAttributeNames.Style.autoSizeShapeToFitText);
            const textChild = HTMLFunctions.getChildByNodeName(e, "text");
            output.textClass = e.gtGetAttributeStringWithUndefined("text:class");
            output.textStyle = e.gtGetAttributeStringWithUndefined("text:style");

            if (e.hasAttribute("text")) {
                output.text = <string>e.getAttribute("text");
            } else if(e.children.length > 0){
                const tNodes = openSVGFunctions.getTNodes(e);
                if(tNodes != null){
                    tNodes.forEach((v)=> v.remove())
                    output.text = tNodes;
                }  
            } 
            else if (textChild != null) {

            } else if (e.innerHTML.length > 0) {
                output.text = e.innerHTML;
            }


            if (removeAttributes) {
                e.removeAttribute("text");
                e.removeAttribute("text:class");
                e.removeAttribute("text:style");

                (<any>e).style.removeProperty(CustomAttributeNames.Style.autoSizeShapeToFitText);
            }
            return output;
        }
        public get svgText(): SVGTextElement {
            return this._svgText;
        }




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
            const b = this.svgGroup.gtGetStyleBooleanWithUndefined(CustomAttributeNames.Style.autoSizeShapeToFitText);
            if(b == undefined){
                return false;
            }else{
                return b;
            }
        }
        set isAutoSizeShapeToFitText(value: boolean) {
            this.svgGroup.setPropertyStyleValue(CustomAttributeNames.Style.autoSizeShapeToFitText, value ? "true" : "false");

        }
        protected update() {
            this._isUpdating = true;
            if(!this.isShow) return;
            this._observer.disconnect();


            SVGTextBox.sortText(this.svgText, this.horizontalAnchor, false);

            if (this.isAutoSizeShapeToFitText) this.updateToFitText();
            this.updateSurface();

            
            if(this.fixedX != null && Math.abs(this.x - this.fixedX) > 20 ){
                this.x = this.fixedX;
            }
            if(this.fixedY != null && Math.abs(this.y - this.fixedY) > 20 ){
                this.y = this.fixedY;
            }
            
            /*
            if(this.fixedY != null){
                this.y = this.fixedY;
            }
            */


            this.svgText.gtSetXY(this.innerRectangleWithoutMargin, this.verticalAnchor, this.horizontalAnchor, this.isAutoSizeShapeToFitText);

            //Graph.setXY(this.svgText, this.innerRectangle, vAnchor, hAnchor);
            this._isUpdating = false;
            this._observer.observe(this.svgGroup, this.groupObserverOption);

        }

        protected updateSurface() {

            this._observer.disconnect();
            const dashStyle = this.msoDashStyle;
            if (dashStyle != null && this.svgSurface != null) {
                msoDashStyle.setCpmoutedDashArray(this.svgSurface);
            }
            this._observer.observe(this.svgGroup, this._observerOption);
        }
        protected updateToFitText() {
            this.isFixTextSize = true;
            //const box = this.svgText.getBBox();
            const textRect = GraphTableSVG.SVGTextBox.getSize(this.svgText);
            
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

        get paddingTop() : number{
            return this.svgGroup.getPaddingTop();
        }
        set paddingTop(value : number){
            this.svgGroup.setPaddingTop(value);
        }
        get paddingLeft() : number{
            return this.svgGroup.getPaddingLeft();
        }
        set paddingLeft(value : number){
            this.svgGroup.setPaddingLeft(value);
        }
        get paddingRight() : number{
            return this.svgGroup.getPaddingRight();
        }
        set paddingRight(value : number){
            this.svgGroup.setPaddingRight(value);
        }
        get paddingBottom() : number{
            return this.svgGroup.getPaddingBottom();
        }
        set paddingBottom(value : number){
            this.svgGroup.setPaddingBottom(value);
        }

        get marginTop() : number{
            return this.svgText.getMarginTop();
        }
        set marginTop(value : number){
            this.svgText.setMarginTop(value);
        }

        get marginLeft() : number{
            return this.svgText.getMarginLeft();
        }
        set marginLeft(value : number){
            this.svgText.setMarginLeft(value);
        }
        get marginRight() : number{
            return this.svgText.getMarginRight();
        }
        set marginRight(value : number){
            this.svgText.setMarginRight(value);
        }
        get marginBottom() : number{
            return this.svgText.getMarginBottom();
        }
        set marginBottom(value : number){
            this.svgText.setMarginBottom(value);
        }



        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
            rect.width = 0;
            rect.height = 0;
            rect.x = 0;
            rect.y = 0;
            return rect;
        }
        private get innerRectangleWithoutMargin() : Rectangle {
            const rect = this.innerRectangle;
            rect.width = rect.width - this.marginPaddingLeft - this.marginPaddingRight;
            rect.height = rect.height  - this.marginPaddingTop - this.marginPaddingBottom;
            rect.x = rect.x + this.marginPaddingLeft;
            rect.y = rect.y + this.marginPaddingTop;
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

        public get msoDashStyle() : msoDashStyle | null {
            if(this.svgSurface != null){
                const dashStyle = this.svgSurface.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.msoDashStyleName);
                if(dashStyle != null){
                    return msoDashStyle.toMSODashStyle(dashStyle);
                }else{
                    return null;
                }
            }else{
                return null;
            }
        }
        public set msoDashStyle(value : msoDashStyle | null){
            if(this.svgSurface != null){
                if(msoDashStyle == null){
                    this.svgSurface.style.removeProperty(CustomAttributeNames.Style.msoDashStyleName);
                }else{
                    this.svgSurface.setPropertyStyleValue(CustomAttributeNames.Style.msoDashStyleName, value);
                }
            }            
        }

    }


}