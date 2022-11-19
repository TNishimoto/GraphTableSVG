/// <reference path="z_object.ts"/>
import * as SVG from "../interfaces/svg"
import * as CSS from "../html/css"
import { VBATranslateFunctions } from "../common/vba_functions"

import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"
import * as DefaultClassNames from "../common/default_class_names"
import { ShapeObjectType, msoDashStyle, HorizontalAnchor, VerticalAnchor, DataName } from "../common/enums";
import { Rectangle, PositionType, round100, nearlyEqual } from "../common/vline"
import * as HTMLFunctions from "../html/html_functions"
import * as SVGTextBox from "../interfaces/svg_textbox"
import { ZObject } from "./z_object"
import { ZVertex } from "./z_vertex"

import * as GOptions from "./z_options"
import { AutoSizeShapeToFitText } from "../common/enums"
import { updateAppropriateDashArray, getUpdateFlagAppropriateDashArray } from "../html/enum_extension";

import * as ElementExtension from "../interfaces/element_extension"
import * as SVGElementExtension from "../interfaces/svg_element_extension"
import * as SVGTextExtension from "../interfaces/svg_text_extension"
import { UndefinedError } from "../common/exceptions"
import { getVirtualRegion } from "../interfaces/virtual_text"
import { createSVGText } from "./element_builder"
import { Debug } from ".."
import { Debugger } from "../common/debugger"

//namespace GraphTableSVG {




export class ZTextBox extends ZVertex {
    private _svgText: SVGTextElement;
    //private isFixTextSize: boolean = false;
    protected surfaceAttributes: string[] = [];
    private _textObserver: MutationObserver;
    private static updateTextAttributes = ["style"]

    //protected _isSpecialTextBox: boolean = false;

    protected _minimumWidth: number = 10;
    protected _minimumHeight: number = 10;

    public constructor(svgbox: SVGElement | string) {
        super(svgbox)

        this._svgText = createSVGText(undefined, undefined, DataName.Text);
        this.svgGroup.appendChild(this.svgText);
        this._textObserver = new MutationObserver(this.textObserverFunc);
        const option2: MutationObserverInit = { childList: true, attributes: true, subtree: true };
        this._textObserver.observe(this.svgText, option2);


        if (this.type == ShapeObjectType.Object) this.firstFunctionAfterInitialized();
        /*
        this.svgText!.onclick = (e) => {
            const textRect = this.getVirtualRegion();

            this.svgText!.style.border = "black"

        }
        */
    }
    /*
    protected setBasicOption(option: GOptions.ZTextBoxAttributes) {
        super.setBasicOption(option)
        const textClass = CSS.createCSSClass(option.textClass);
        const styleClass = CSS.createCSSClass(option.textStyle);
        GOptions.setClassAndStyle(this.svgText, textClass, styleClass);

        if (typeof option.text == "string") {
            SVGTextExtension.setTextContent(this.svgText, option.text);
        } else if (Array.isArray(option.text)) {
            SVGTextBox.constructSVGTextByHTMLElements(this.svgText, option.text, false);
            SVGTextBox.sortText(this.svgText, this.horizontalAnchor, false);


        } else {

        }

        const b = ElementExtension.getPropertyStyleValue(this.svgGroup, StyleNames.autoSizeShapeToFitText);
        if (b === undefined && typeof (option.style) == "object") {
            const style: GOptions.ZTextBoxCSS = option.style;
            if (style.autoSizeShapeToFitText !== undefined) {
                this.isAutoSizeShapeToFitText = style.autoSizeShapeToFitText;
            }
        }

    }

    public setOption(option: GOptions.ZTextBoxAttributes) {
        super.setOption(option);
        //this.setBasicOption(option);
    }
    */
    public initializeSetBasicOption(source : SVGElement) {
        super.initializeSetBasicOption(source);

        if (source.children.length > 0) {
            const tNodes = HTMLFunctions.getTNodes(source);
            if (tNodes != null) {
                tNodes.forEach((v) => v.remove())

                SVGTextBox.constructSVGTextByHTMLElements(this.svgText, tNodes, false);
                SVGTextBox.sortText(this.svgText, this.horizontalAnchor, false);
                }
        } else if (source.innerHTML.length > 0) {
            SVGTextExtension.setTextContent(this.svgText, source.innerHTML);
            source.innerHTML = "";
        }

        if(this.svgText != null){
            const text = this.svgText;
            const objName = text.getAttribute(AttributeNames.dataNameAttribute);
            if(objName != null){
                const map = HTMLFunctions.getSubAttributeFromAncestors(source, objName);
                map.forEach((value, key) =>{
                    text.setAttribute(key, value);
                })
            }
        }

    }


    static constructAttributes(e: Element,
        removeAttributes: boolean = false, output: GOptions.ZTextBoxAttributes = {}): GOptions.ZTextBoxAttributes {

        ZObject.constructAttributes(e, removeAttributes, output, "center");
        //output.isAutoSizeShapeToFitText = e.gtGetStyleBooleanWithUndefined(AttributeNames.Style.autoSizeShapeToFitText);
        //const textChild = HTMLFunctions.getChildByNodeName(e, AttributeNames.text);
        output.textClass = ElementExtension.gtGetInheritedAttributeString(e, AttributeNames.textClass);
        output.textStyle = ElementExtension.gtGetInheritedAttributeString(e, AttributeNames.textStyle);

        /*
        if (e.hasAttribute(AttributeNames.text)) {
            output.text = <string>e.getAttribute(AttributeNames.text);
        }
        */
        if (e.children.length > 0) {
            const tNodes = HTMLFunctions.getTNodes(e);
            if (tNodes != null) {
                tNodes.forEach((v) => v.remove())
                output.text = tNodes;
            }
        } else if (e.innerHTML.length > 0) {
            output.text = e.innerHTML;
        }


        if (removeAttributes) {
            //e.removeAttribute(AttributeNames.text);
            e.removeAttribute(AttributeNames.className);
            e.removeAttribute(AttributeNames.textStyle);

            (<any>e).style.removeProperty(StyleNames.autoSizeShapeToFitText);
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
            if (ZTextBox.updateTextAttributes.some((v) => v == p.attributeName)) {
                b = true;
            }
            if (p.attributeName == null) {
                b = true;
            }
        }
        if (b){
            //this.resetUnstableCounter();
            //this.update();

        }

    };







    get horizontalAnchor(): HorizontalAnchor {
        const b = ElementExtension.getPropertyStyleValueWithDefault(this.svgGroup, StyleNames.horizontalAnchor, "center");
        return HorizontalAnchor.toHorizontalAnchor(b);
    }
    /**
    テキストの水平方向の配置設定を設定します。
    */
    set horizontalAnchor(value: HorizontalAnchor) {
        if (this.horizontalAnchor != value) ElementExtension.setPropertyStyleValue(this.svgGroup, StyleNames.horizontalAnchor, value);
    }
    /**
    テキストの垂直方向の配置設定を返します。
    */
    get verticalAnchor(): VerticalAnchor {
        const b = ElementExtension.getPropertyStyleValueWithDefault(this.svgGroup, StyleNames.verticalAnchor, "middle");
        return VerticalAnchor.toVerticalAnchor(b);
    }
    /**
    テキストの垂直方向の配置設定を設定します。
    */
    set verticalAnchor(value: VerticalAnchor) {
        if (this.verticalAnchor != value) ElementExtension.setPropertyStyleValue(this.svgGroup, StyleNames.verticalAnchor, value);
    }

    /**
     * このVertexがテキストに合わせてサイズを変える場合Trueを返します。
     */
    get isAutoSizeShapeToFitText(): AutoSizeShapeToFitText {
        const b = ElementExtension.getPropertyStyleValueWithDefault(this.svgGroup, StyleNames.autoSizeShapeToFitText, "semi-auto");
        if (b == "auto") {
            return "auto";
        } else if (b == "semi-auto") {
            return "semi-auto";
        } else {
            return "none";
        }
        /*
        if (b == undefined) {
            return false;
        } else {
            return b;
        }
        */
    }
    set isAutoSizeShapeToFitText(value: AutoSizeShapeToFitText) {
        ElementExtension.setPropertyStyleValue(this.svgGroup, StyleNames.autoSizeShapeToFitText, value);
        //this.svgGroup.setPropertyStyleValue(AttributeNames.Style.autoSizeShapeToFitText, value ? "true" : "false");
    }

    protected updateStyleWithUpdateFlag(updateFlag: boolean) : boolean{
        let b = false;
        const dashStyle = this.msoDashStyle;
        if (dashStyle != null && this.svgSurface != null) {

            if (updateFlag) {
                this.hasConnectedObserverFunction = false;                
                b = updateAppropriateDashArray(this.svgSurface);
                this.hasConnectedObserverFunction = true;
            }else{
                b = getUpdateFlagAppropriateDashArray(this.svgSurface);
            }

        }
        return b;

    }
    /*
    protected getUpdateFlagOfStyle(): boolean {
        return this.updateStyleWithUpdateFlag(false);
    }
    protected updateStyle() : boolean {
        return this.updateStyleWithUpdateFlag(true);
    }
    */
    protected updateSurfaceSizeWithUpdateFlag(withUpdate : boolean){
        const region = this.getVirtualRegion();

        let b = false;
        const widthRound100 = round100(region.width);

        if (!nearlyEqual(this.width, widthRound100)) {
            if(withUpdate){
                this.width = widthRound100;

            }
            b = true;
        }

        const heightRound100 = round100(region.height);

        if (!nearlyEqual(this.height, heightRound100)) {
            if(withUpdate){
                this.height = heightRound100;
            }
            //this.height = region.height;        
            b = true;
        }
        return b;

    }

    /*
    protected updateTextLocationOrGetUpdateFlag(executeUpdate : boolean): boolean {
        return SVGTextExtension.up(this.svgText, this.getVirtualTextLocationRegion(), this.verticalAnchor, this.horizontalAnchor, this.isAutoSizeShapeToFitText);
    }
    */

    
    protected updateTextLocation(): boolean {
        return SVGTextExtension.updateLocation(this.svgText, this.getVirtualTextLocationRegion(), this.verticalAnchor, this.horizontalAnchor, this.isAutoSizeShapeToFitText);
    }
    protected getUpdateFlagOfTextLocation() : boolean {
        return SVGTextExtension.getUpdateFlagOfLocation(this.svgText, this.getVirtualTextLocationRegion(), this.verticalAnchor, this.horizontalAnchor, this.isAutoSizeShapeToFitText);
    }
    protected updateSurfaceLocation(): boolean {
        return false;
    }
    protected getUpdateFlagOfSurfaceLocation(): boolean {
        return false;
    }

    op: number = 0;

    public getUpdateFlag() : boolean{
        const b1 = super.getUpdateFlag();
        if(b1){
            Debugger.updateFlagLog(this, this.getUpdateFlag, `${super.getUpdateFlag.name}`)
            return b1;
        }

        if (!this.isShown) return b1;


        if (this.svgText == null) {
            throw new TypeError("svgText is null");
        }

        const b2: boolean = this.updateStyleWithUpdateFlag(false);
        if(b2){
            Debugger.updateFlagLog(this, this.getUpdateFlag, `${this.updateStyleWithUpdateFlag.name}`)
            return b2;
        }

        const b3: boolean = this.getUpdateFlagOfTextLocation();
        if(b3){
            Debugger.updateFlagLog(this, this.getUpdateFlag, `${this.getUpdateFlagOfTextLocation.name}`)
            return b3;
        }


        const b4: boolean = this.updateSurfaceSizeWithUpdateFlag(false);
        if(b4){
            Debugger.updateFlagLog(this, this.getUpdateFlag, `${this.updateSurfaceSizeWithUpdateFlag.name}`)
            return b3;
        }

        const b5: boolean = this.getUpdateFlagOfSurfaceLocation();
        if(b4){
            Debugger.updateFlagLog(this, this.getUpdateFlag, `${this.getUpdateFlagOfSurfaceLocation.name}`)
            return b3;
        }


        
        const b = b1 || b2 || b3 || b4 || b5;

        return b;

    }
    private updateSub() : void {
        super.update();
        this._isUpdating = true;
        if (!this.isShown) return;
        //this._observer.disconnect();
        this.hasConnectedObserverFunction = false;

        if (this.svgText == null) {
            throw new TypeError("svgText is null");
        }
        this.updateStyleWithUpdateFlag(true);
        this.updateTextLocation();
        this.updateSurfaceSizeWithUpdateFlag(true);
        this.updateSurfaceLocation();
        this.updateObjectLocation();
        //this.joint();
        this._isUpdating = false;
        this.hasConnectedObserverFunction = true;

        
    }
    public update() {

        //let counter = 1;
        this.updateSub();
        /*
        while(this.getUpdateFlag()){
            if(counter > 10){
                throw new Error("Update-Loop Error!");
            }
            counter++;
        }
        */
        //return counter > 1;
    }
    /*
    protected updateToFitText(isWidth: boolean) {
        //this.isFixTextSize = true;
        //const box = this.svgText.getBBox();
        const textRect = SVGTextExtension.getSize(this.svgText);

        const textWidth = textRect.width < this._minimumWidth ? this._minimumWidth : textRect.width;
        const textHeight = textRect.height < this._minimumHeight ? this._minimumHeight : textRect.height;

        if (isWidth) {
            this.width = textWidth + this.marginPaddingLeft + this.marginPaddingRight;
        } else {
            this.height = textHeight + this.marginPaddingTop + this.marginPaddingBottom;
        }
    }
    */
    get marginPaddingTop() {
        return SVGTextExtension.getMarginTop(this.svgText) + SVGElementExtension.getPaddingTop(this.svgGroup);
    }
    get marginPaddingLeft() {
        return SVGTextExtension.getMarginLeft(this.svgText) + SVGElementExtension.getPaddingLeft(this.svgGroup);
    }
    get marginPaddingRight() {
        return SVGTextExtension.getMarginRight(this.svgText) + SVGElementExtension.getPaddingRight(this.svgGroup);
    }
    get marginPaddingBottom() {
        return SVGTextExtension.getMarginBottom(this.svgText) + SVGElementExtension.getPaddingBottom(this.svgGroup);
    }

    get paddingTop(): number {
        return SVGElementExtension.getPaddingTop(this.svgGroup);
    }
    set paddingTop(value: number) {
        SVGElementExtension.setPaddingTop(this.svgGroup, value);
    }
    get paddingLeft(): number {
        return SVGElementExtension.getPaddingLeft(this.svgGroup);
    }
    set paddingLeft(value: number) {
        SVGElementExtension.setPaddingLeft(this.svgGroup, value);
    }
    get paddingRight(): number {
        return SVGElementExtension.getPaddingRight(this.svgGroup);
    }
    set paddingRight(value: number) {
        SVGElementExtension.setPaddingRight(this.svgGroup, value);
    }
    get paddingBottom(): number {
        return SVGElementExtension.getPaddingBottom(this.svgGroup);
    }
    set paddingBottom(value: number) {
        SVGElementExtension.setPaddingBottom(this.svgGroup, value);
    }

    get marginTop(): number {
        return SVGTextExtension.getMarginTop(this.svgText);
    }
    set marginTop(value: number) {
        SVGTextExtension.setMarginTop(this.svgText, value);
    }

    get marginLeft(): number {
        return SVGTextExtension.getMarginLeft(this.svgText);
    }
    set marginLeft(value: number) {
        SVGTextExtension.setMarginLeft(this.svgText, value);
    }
    get marginRight(): number {
        return SVGTextExtension.getMarginRight(this.svgText);
    }
    set marginRight(value: number) {
        SVGTextExtension.setMarginRight(this.svgText, value);
    }
    get marginBottom(): number {
        return SVGTextExtension.getMarginBottom(this.svgText);
    }
    set marginBottom(value: number) {
        SVGTextExtension.setMarginBottom(this.svgText, value);
    }




    /*
    private get innerRectangleWithoutMargin(): Rectangle {
        const rect = this.innerRectangle;
        rect.width = rect.width - this.marginPaddingLeft - this.marginPaddingRight;
        rect.height = rect.height - this.marginPaddingTop - this.marginPaddingBottom;
        rect.x = rect.x + this.marginPaddingLeft;
        rect.y = rect.y + this.marginPaddingTop;
        return rect;
    }
    */

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
        const ids = this.svgElements.map((v) => v.getAttribute(AttributeNames.objectIDName)).filter((v) => v != null);
        const id = obj.getAttribute(AttributeNames.objectIDName);
        return ids.some((v) => v == id);
    }

    public get hasSize(): boolean {
        return true;
    }

    public get msoDashStyle(): msoDashStyle | null {

        if (this.svgSurface != null) {
            const dashStyle = ElementExtension.getPropertyStyleValue(this.svgSurface, StyleNames.msoDashStyleName);
            if (dashStyle != null) {
                return msoDashStyle.toMSODashStyle(dashStyle);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    public set msoDashStyle(value: msoDashStyle | null) {
        if (this.svgSurface != null) {
            if (msoDashStyle == null) {
                this.svgSurface.style.removeProperty(StyleNames.msoDashStyleName);
            } else {
                ElementExtension.setPropertyStyleValue(this.svgSurface, StyleNames.msoDashStyleName, value);
            }
        }
    }
    public createVBACode(id: number): string[] {
        const lines: string[] = [];

        const backColor = VBATranslateFunctions.colorToVBA(ElementExtension.getPropertyStyleValueWithDefault(this.svgSurface!, "fill", "gray"));
        const visible = ElementExtension.getPropertyStyleValueWithDefault(this.svgSurface!, "visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";

        const vAnchor = VBATranslateFunctions.ToVerticalAnchor(this.verticalAnchor);
        const hAnchor = VBATranslateFunctions.ToHorizontalAnchor(this.horizontalAnchor);


        lines.push(`Sub create${id}(createdSlide As slide)`);
        lines.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
        lines.push(` Dim obj As Shape`);
        lines.push(` Set obj = shapes_.AddShape(${this.shape}, ${this.globalX}, ${this.globalY}, ${this.width}, ${this.height})`);
        lines.push(` Call EditTextFrame(obj.TextFrame, ${this.marginPaddingTop}, ${this.marginPaddingBottom}, ${this.marginPaddingLeft}, ${this.marginPaddingRight}, false, ppAutoSizeNone)`);
        lines.push(` Call EditAnchor(obj.TextFrame, ${vAnchor}, ${hAnchor})`);

        VBATranslateFunctions.TranslateSVGTextElement2(this.svgText, `obj.TextFrame.TextRange`).forEach((v) => lines.push(v));
        lines.push(this.getVBAEditLine());

        lines.push(` Call EditCallOut(obj, "${this.objectID}", ${visible}, ${backColor})`)
        this.VBAAdjustments.forEach((v, i) => {
            lines.push(` obj.Adjustments.Item(${i + 1}) = ${v}`);
        })
        lines.push(`End Sub`);

        return lines;
    }

    public getVirtualWidth(): number {
        return this.getVirtualRegion().width;
    }
    public getVirtualHeight(): number {
        return this.getVirtualRegion().height;
    }

    getVirtualExtraRegion(): Rectangle {
        const textRect = getVirtualRegion(this.svgText);

        //const textRect = SVGTextExtension.getRegion(this.svgText);
        const w = textRect.width + this.leftExtraLength + this.rightExtraLength;
        const h = textRect.height + this.topExtraLength + this.bottomExtraLength;
        const x = -w / 2;
        const y = -h / 2;
        return new Rectangle(x, y, w, h);
    }
    getVirtualTextLocationRegion(): Rectangle {
        const rect = this.getVirtualRegion();
        rect.x += this.leftExtraLength;
        rect.y += this.topExtraLength;
        rect.width -= this.leftExtraLength + this.rightExtraLength;
        rect.height -= this.topExtraLength + this.bottomExtraLength;
        return rect;
        /*
        const rect = this.ExtraRegion;
        const w = rect.width - this.leftExtraLength - this.rightExtraLength;
        const h = rect.height - this.topExtraLength - this.bottomExtraLength;
        const x =rect.x + this.leftExtraLength;
        const y = rect.y + this.topExtraLength;
        return new Rectangle(x, y, w, h);
        */
    }

    public getVirtualRegion(): Rectangle {
        if (this.svgText === undefined) {
            throw new UndefinedError();
            //return new Rectangle(this.cx, this.cy, 0, 0);
        }
        const marginRect = this.getVirtualExtraRegion();

        if (this.isAutoSizeShapeToFitText == AutoSizeShapeToFitText.Auto) {
            return marginRect;
        } else if (this.isAutoSizeShapeToFitText == AutoSizeShapeToFitText.SemiAuto) {
            let [x, y] = [0, 0]
            let [newWidth, newHeight] = [0, 0]

            if (this.width < marginRect.width) {
                newWidth = marginRect.width;
                x = marginRect.x;
            } else {
                //const surface_x = this.svgSurface != null ? SVGElementExtension.getX(this.svgSurface) : 0;
                newWidth = this.width;
                x = -this.width / 2;
            }
            if (this.height < marginRect.height) {

                newHeight = marginRect.height;
                y = marginRect.y;
            } else {
                //const surface_y = this.svgSurface != null ? SVGElementExtension.getY(this.svgSurface) : 0;
                newHeight = this.height;
                y = -this.height / 2;
            }
            //const newWidth = this.width < width ? width : this.width;
            //const newHeigth = this.height < height ? height : this.height;
            return new Rectangle(round100(x), round100(y), round100(newWidth), round100(newHeight));
        } else {
            return new Rectangle(- (this.width / 2), - (this.height / 2), this.width, this.height);
            //return new Rectangle(this.x, this.y, this.width, this.height);
        }
    }

    get topExtraLength(): number {
        return this.marginPaddingTop;
    }
    get leftExtraLength(): number {
        return this.marginPaddingLeft;
    }
    get rightExtraLength(): number {
        return this.marginPaddingRight;
    }
    get bottomExtraLength(): number {
        return this.marginPaddingBottom;
    }
    /*
    public get upperHeight() : number{
        return this.topExtraLength - this.textRegion.y;
    }
    public get leftWidth() : number{
        return this.leftExtraLength - this.textRegion.x;
    }
    */



}


//}