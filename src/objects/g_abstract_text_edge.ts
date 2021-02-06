import * as DefaultClassNames from "../common/default_class_names"
import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"
import { PathTextAlighnment} from "../common/enums";
import * as HTMLFunctions from "../html/html_functions";
import * as SVG from "../interfaces/svg"
import { getVirtualRegion} from "../interfaces/virtual_text"
import { GAbstractEdge } from "./g_abstract_edge";
import * as CommonFunctions from "../common/common_functions"
import * as ElementExtension from "../interfaces/element_extension"
import * as CSS from "../html/css"
import * as GOptions from "./g_options"
import * as Extensions from "../interfaces/extensions"
import { createSVGText } from "./element_builder";
import * as SVGTextBox from "../interfaces/svg_textbox"

export class GAbstractTextEdge extends GAbstractEdge {
    private static updateTextAttributes = ["style"]
    protected _svgTextPath: SVGTextPathElement;
    private _svgText: SVGTextElement;
    private _textObserver: MutationObserver;
    protected _isSpecialTextBox: boolean = false;

    protected createSurface(svgbox: SVGElement, option: GOptions.GObjectAttributes = {}): void {
        super.createSurface(svgbox, option);
        this.svgGroup.insertBefore(this.svgPath, this.svgText);
    }
    constructor(svgbox: SVGElement | string) {
        super(svgbox);

        this._svgText = createSVGText(DefaultClassNames.defaultTextClass, undefined);
        this.svgGroup.appendChild(this.svgText);
        this._textObserver = new MutationObserver(this.textObserverFunc);
        const option2: MutationObserverInit = { childList: true, attributes: true, subtree: true };
        this._textObserver.observe(this.svgText, option2);
        this._isSpecialTextBox = true;

        this.svgText.textContent = "";

        this._svgTextPath = SVG.createTextPath2(undefined);

        this.svgText.appendChild(this._svgTextPath);
        this._svgTextPath.href.baseVal = `#${this.svgPath.id}`


        //if (this.type == ShapeObjectType.Edge) this.firstFunctionAfterInitialized();

        //this.setAppropriateText();
    }
    public get svgText(): SVGTextElement {
        return this._svgText;
    }
    public get svgTextPath(): SVGTextPathElement {
        return this._svgTextPath;
    }

    protected setBasicOption(option: GOptions.GAbstractTextEdgeAttributes) {

        super.setBasicOption(option);
        const textClass = CSS.createCSSClass(option.textClass);
        const styleClass = CSS.createCSSClass(option.textStyle);
        GOptions.setClassAndStyle(this.svgText, textClass, styleClass);
        if (option.textClass === undefined) option.textClass = DefaultClassNames.defaultTextClass;

        if (typeof option.text == "string") {
            Extensions.setTextContent(this.svgTextPath, option.text);
        } else if (Array.isArray(option.text)) {
            SVGTextBox.constructSVGTextByHTMLElements(this.svgTextPath, option.text, false);

        } else {

        }

    }
    static constructAttributes(e: Element, removeAttributes: boolean = false, output: GOptions.GAbstractTextEdgeAttributes = {}): GOptions.GAbstractTextEdgeAttributes {
        GAbstractEdge.constructAttributes(e, removeAttributes, output);
        //output.isAutoSizeShapeToFitText = e.gtGetStyleBooleanWithUndefined(AttributeNames.Style.autoSizeShapeToFitText);
        //const textChild = HTMLFunctions.getChildByNodeName(e, AttributeNames.textStyle);
        output.textClass = ElementExtension.gtGetInheritedAttributeString(e, AttributeNames.textClass);
        output.textStyle = ElementExtension.gtGetInheritedAttributeString(e, AttributeNames.textStyle);


        /*
        if (e.hasAttribute(AttributeNames.text)) {
            output.text = <string>e.getAttribute(AttributeNames.text);
        } else
        */ 
        if (e.children.length > 0) {
            const tNodes = HTMLFunctions.getTNodes(e);
            if (tNodes != null) {
                tNodes.forEach((v) => v.remove())
                output.text = tNodes;
            }
        }else if (e.innerHTML.length > 0) {
            output.text = e.innerHTML;
        }


        if (removeAttributes) {
            //e.removeAttribute(AttributeNames.text);
            e.removeAttribute(AttributeNames.textClass);
            e.removeAttribute(AttributeNames.textStyle);

            (<any>e).style.removeProperty(StyleNames.autoSizeShapeToFitText);
        }
        return output;
    }
    private set startOffset(value : number){
        ElementExtension.setAttributeNumber(this.svgTextPath, "startOffset", value);
    }
    protected textObserverFunc: MutationCallback = (x: MutationRecord[]) => {
        if(! this.isShown) return;
        if (!this.isLocated) return;
        let b = false;

        for (let i = 0; i < x.length; i++) {
            const p = x[i];
            if (GAbstractTextEdge.updateTextAttributes.some((v) => v == p.attributeName)) {
                b = true;
            }
            if (p.attributeName == null) {
                b = true;
            }
        }
        if (b) this.update();
    };
    public get isShown(): boolean {
        const b1 = super.isShown;
        const b2 = true;
        const b3 = HTMLFunctions.isShow(this.svgText);
        return b1 && b2 && b3;
    }


    private removeTextLengthAttribute(): void {
        if (this.svgText.hasAttribute("textLength")) this.svgText.removeAttribute("textLength");
        if (this.svgTextPath.hasAttribute("textLength")) this.svgTextPath.removeAttribute("textLength");
        if (this.svgText.hasAttribute("letter-spacing")) this.svgText.removeAttribute("letter-spacing");
    }
    private setRegularInterval(textPathLen: number, textWidth : number): void {
        this.removeTextLengthAttribute();
        ElementExtension.setAttributeNumber(this.svgText, "textLength", textPathLen);
        ElementExtension.setAttributeNumber(this.svgTextPath, "textLength", textPathLen);
    }
    public get isAppropriatelyReverseMode(): boolean {
        const p = this.svgGroup.getAttribute(AttributeNames.isAppropriatelyReverseTextMode);
        if (p == null) {
            return false;
        } else {
            return p == "true";
        }
        //return this.svgGroup.getAttribute(AttributeNames.appropriateEdgeText);
    }
    public set isAppropriatelyReverseMode(v: boolean) {
        this.svgGroup.setAttribute(AttributeNames.isAppropriatelyReverseTextMode, v.toString());

    }
    public get side(): string | null {
        return this.svgTextPath.getAttribute("side");
    }
    public set side(v: string | null) {
        if (v == null) {
            this.svgTextPath.removeAttribute("side");
        } else {
            this.svgTextPath.setAttribute("side", v);
        }
    }
    private revTextForApp() {
        if (this.side == "left" || this.side == null) {
            this.side = "right";
        } else {
            this.side = "left";
        }
        const tspans: SVGTSpanElement[] = new Array(0);
        this.svgTextPath.children.item;
        for (let i = this.svgTextPath.children.length; i >= 0; i--) {
            const tspan = this.svgTextPath.children.item(i);
            if (tspan instanceof SVGTSpanElement) {
                tspans.push(tspan);
            }
        }
        tspans.forEach((v) => v.remove());
        tspans.forEach((v) => {
            const text = v.textContent;
            if (text != null) {
                const revText = GAbstractTextEdge.getRevString(text);
                v.textContent = revText;
            }
            this.svgTextPath.appendChild(v);
        })

    }
    private static getRevString(text: string): string {
        let s = "";
        for (let i = text.length - 1; i >= 0; i--) {
            s += text[i];
        }
        return s;
    }
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
    public isDrawnText(): boolean {
        const text = this.svgTextPath.textContent;
        if (text == null || text.length == 0) {
            return true;
        } else {
            const len = this.svgTextPath.getComputedTextLength();
            return len != 0;
        }
    }

    protected updateTextPath(){
        const strokeWidth = ElementExtension.getPropertyStyleValue(this.svgPath, "stroke-width");
        if (strokeWidth != null) {
            const diffy = CommonFunctions.toPX(strokeWidth) + 3;
            this.svgText.setAttribute("dy", `-${diffy}`);
        } else {
            this.svgText.setAttribute("dy", "0");
        }



        if (this.isAppropriatelyReverseMode) {
            const degree = this.degree;
            if (degree < -90 || degree > 90) {
                //Rev
                if (this.side == "left" || this.side == null) {
                    this.revTextForApp();
                }
            } else {
                if (this.side == "right") {
                    this.revTextForApp();
                }
            }
        }

        if(!HTMLFunctions.isShow(this.svgTextPath)){
            throw new Error();
        }
        const region = getVirtualRegion(this.svgText);
        const strWidth = region.width; 
        const pathLen = this.svgPath.getTotalLength();
            

        if (this.pathTextAlignment == PathTextAlighnment.regularInterval) {
            const strLen = this.svgTextPath.textContent == null ? 0 : this.svgTextPath.textContent.length;
            if (strWidth > 0) {
                const paddingWidth = pathLen - strWidth;
                if(strLen != 0){
                    const paddingUnit = paddingWidth / (strLen + 1);
                    let textPathLen = pathLen - (paddingUnit * 2);
                    if (textPathLen <= 0) textPathLen = 5;
                    this.startOffset = paddingUnit;
                    this.setRegularInterval(textPathLen, strWidth);
    
                }
            }

        }
        else if (this.pathTextAlignment == PathTextAlighnment.end) {
            this.startOffset = 0;
            this.removeTextLengthAttribute();
            this.startOffset = this.side == "right" ? 0 : (pathLen - strWidth);

        }
        else if (this.pathTextAlignment == PathTextAlighnment.center) {
            this.removeTextLengthAttribute();
            const offset = (pathLen / 2) - (strWidth / 2);
            this.startOffset = offset;
            //こっちだとEdgeではおかしくなる
            //this.svgTextPath.startOffset.baseVal.value = (pathLen - box.width)/2;                    

        }
        else {
            this.startOffset = this.side == "right" ? (pathLen - strWidth) : 0;
            this.removeTextLengthAttribute();
        }
    }
}