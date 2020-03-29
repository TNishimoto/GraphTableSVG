import { Size, Rectangle } from "../common/vline";
//import { CommonFunctions } from "../common/common_functions";
//import { HTMLFunctions } from "./html_functions";
import { HorizontalAnchor, VerticalAnchor, AutoSizeShapeToFitText } from "../common/enums";
import * as SVGTextBox from "./svg_textbox"
//import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"
import * as ElementExtension from "./element_extension"
import * as CommonFunctions from "../common/common_functions";
import * as HTMLFunctions from "../html/html_functions";


/**
 * X座標を取得します。
 */
export function getX(item: SVGTextElement): number {

    if (item.x.baseVal.numberOfItems == 0) {
        item.setAttribute('x', "0");
    }
    return item.x.baseVal.getItem(0).value;

}
/**
 * X座標を設定します。
 */
export function setX(item: SVGTextElement, value: number): void {
    if (item.x.baseVal.numberOfItems == 0) {
        item.setAttribute('x', "0");
    }
    //p.setAttribute('x', value.toString());


    item.x.baseVal.getItem(0).value = value;

}
/**
 * Y座標を取得します。
 */
export function getY(item: SVGTextElement): number {

    if (item.y.baseVal.numberOfItems == 0) {
        item.setAttribute('y', "0");
    }
    return item.y.baseVal.getItem(0).value;

}
/**
 * Y座標を設定します。
 */
export function setY(item: SVGTextElement, value: number): void {

    if (item.y.baseVal.numberOfItems == 0) {
        item.setAttribute('y', "0");
    }
    item.y.baseVal.getItem(0).value = value;

}
        /**
 * SVGTextElementのテキストを設定します。
 * @param text 設定するテキスト
 * @param isLatexMode TrueのときLatex表記を使用します。
 */

export function setTextContent(item: SVGTextElement, text: string, isLatexMode: boolean = false): void{
    SVGTextBox.setTextToSVGText(item, text, isLatexMode);
}
//setTextContent(text: string): void;

export function getMarginLeft(item: SVGTextElement): number{
    return ElementExtension.getPropertyStyleNumberValue(item, StyleNames.marginLeft, 0)!;
}
export function setMarginLeft(item: SVGTextElement,value: number): void{
    ElementExtension.setPropertyStyleValue(item, StyleNames.marginLeft, value.toString());

}
export function getMarginTop(item: SVGTextElement): number{
    return ElementExtension.getPropertyStyleNumberValue(item, StyleNames.marginTop, 0)!;

}
export function setMarginTop(item: SVGTextElement,value: number): void{
    ElementExtension.setPropertyStyleValue(item, StyleNames.marginTop, value.toString());

}
export function getMarginRight(item: SVGTextElement): number{
    return ElementExtension.getPropertyStyleNumberValue(item, StyleNames.marginRight, 0)!;

}
export function setMarginRight(item: SVGTextElement,value: number): void{
    ElementExtension.setPropertyStyleValue(item, StyleNames.marginRight, value.toString());

}
export function getMarginBottom(item: SVGTextElement): number{
    return ElementExtension.getPropertyStyleNumberValue(item, StyleNames.marginBottom, 0)!;

}
export function setMarginBottom(item: SVGTextElement,value: number): void{
    ElementExtension.setPropertyStyleValue(item, StyleNames.marginBottom, value.toString());

}
export function gtSetXY(text: SVGTextElement, rect: Rectangle, vAnchor: VerticalAnchor | null, hAnchor: HorizontalAnchor | null, isAutoSizeShapeToFitText: AutoSizeShapeToFitText): void{

    let x = rect.x;
    let y = rect.y;
    (<any>text).setAttribute('x', x.toString());
    (<any>text).setAttribute('y', y.toString());

    const b2 = getSize(<any>text, true);

    const dy = b2.y - y;
    const dx = b2.x - x;

    y -= dy;
    x -= dx;
    if (vAnchor == VerticalAnchor.Middle) {
        y += (rect.height - b2.height) / 2
    } else if (vAnchor == VerticalAnchor.Bottom) {
        y += rect.height - b2.height;
    }

    if (hAnchor == HorizontalAnchor.Center) {
        x += (rect.width - b2.width) / 2;
    } else if (hAnchor == HorizontalAnchor.Right) {
        x += rect.width - b2.width;
    }

    (<any>text).setAttribute('y', y.toString());
    (<any>text).setAttribute('x', x.toString());
}


//type CharInfo = { char: number, fontSize: number, fontFamily: string }
type CharInfo = { char: number, fontSize: number, fontFamily: string }

const CharInfoMap: Map<CharInfo, number> = new Map();
export function superComputeTextWidth(text: string, fontSize: number, fontFamily: string, fontWeight : string): number {
    var div = document.createElement('div');
    /*
    div.style.position = 'absolute';
    div.style.height = 'auto';
    div.style.width = 'auto';
    div.style.whiteSpace = 'nowrap';
    */
    
    var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    document.body.appendChild(div);
    div.appendChild(canvas);


    canvas.setAttribute("width", "300px");
    canvas.setAttribute("height", "300px");
    
    canvas.setAttribute("viewBox", "0 0 300 300");



    const svgText: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    svgText.textContent = text;
    svgText.style.fontFamily = fontFamily;
    svgText.style.fontSize = fontSize.toString() + "px";
    svgText.style.fontWeight = fontWeight;

    svgText.setAttribute("x", "30");
    svgText.setAttribute("y", "30");

    canvas.appendChild(svgText);
    /*
    const b = HTMLFunctions.isShow(svgText);

    if (b) {
        const rect = svgText.getBBox();
        return rect.width;
    } else {
        return 0;
    }
    */
    
    const box = svgText.getBBox();
    document.body.removeChild(div);
    return box.width;
    

    /*
    div.style.fontFamily = fontFamily;
    div.style.fontSize = fontSize.toString() + "px"; // large enough for good resolution

    div.innerHTML = String.fromCharCode(text);
    document.body.appendChild(div);
    var clientWidth = div.clientWidth;
    CharInfoMap.set(info, clientWidth);

    document.body.removeChild(div);
    return clientWidth;
    */

}

export function computeTextWidth(text: string | number, fontSize: number, fontFamily: string): number {
    if (typeof text == "string") {
        let width = 0;
        for (let i = 0; i < text.length; i++) {
            const w = computeTextWidth(text.charCodeAt(i), fontSize, fontFamily);
            width += w;
        }

        return width;
    } else {
        const info: CharInfo = { char: text, fontSize: fontSize, fontFamily: fontFamily };
        if (CharInfoMap.has(info)) {
            return CharInfoMap.get(info)!;
        } else {

            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.height = 'auto';
            div.style.width = 'auto';
            div.style.whiteSpace = 'nowrap';
            div.style.fontFamily = fontFamily;
            div.style.fontSize = fontSize.toString() + "px"; // large enough for good resolution

            div.innerHTML = String.fromCharCode(text);
            document.body.appendChild(div);
            var clientWidth = div.clientWidth;
            CharInfoMap.set(info, clientWidth);

            document.body.removeChild(div);
            return clientWidth;
        }
    }
}
export function getVirtualHeight(text: SVGTSpanElement | SVGTextElement | SVGTextPathElement): number {    

    const b = HTMLFunctions.isShow(text);
    if(b){    
        return text.getBBox().height;    
    }else{
        throw Error("error!");
    }

}
export function getVirtualWidth(text: SVGTSpanElement | SVGTextElement | SVGTextPathElement): number {    

    const b = HTMLFunctions.isShow(text);
    if(b){    
        return text.getBBox().width;    
    }else{
        throw Error("error!");
        /*
        const style = getComputedStyle(text);
        const fontSize = CommonFunctions.toPX(style.fontSize!);
        const fontFamily = style.fontFamily!;
        */
    }

    /*
    if (text instanceof SVGTSpanElement) {
        const style = getComputedStyle(text);
        const fontSize = CommonFunctions.toPX(style.fontSize!);
        const fontFamily = style.fontFamily!;

        return text.getBBox().width;
        //return superComputeTextWidth(text.textContent!, fontSize, fontFamily, style.fontWeight);

        //return superComputeTextWidth(text.textContent!, fontSize, fontFamily);
        //return computeTextWidth(text.textContent!, fontSize, fontFamily);
    } else {

        const tspans = <SVGTSpanElement[]>HTMLFunctions.getChildren(text).filter((v) => v.nodeName == "tspan");
        let len = 0;
        tspans.forEach((v) => { len += getVirtualWidth(v) });
        return len;
    }
    */
    
}

export function getSize(svgText: SVGTextElement, showChecked: boolean = false): Rectangle {
    let r = new Rectangle();
    const b = showChecked ? true : HTMLFunctions.isShow(svgText);

    if (b) {
        const rect = svgText.getBBox();
        r.x = rect.x;
        r.y = rect.y;
        r.width = rect.width;
        r.height = rect.height;
        return r;
    } else {
        return new Rectangle();
    }

}

export function getVirtualRegion(svgText: SVGTextElement): Rectangle {

    const b = HTMLFunctions.isShow(svgText);
    let r = new Rectangle();
    r.x = getX(svgText);
    r.y = getY(svgText);

    if(b){    
        const box = svgText.getBBox();    
        r.width = box.width;
        r.height = box.height;
        return r;
    }else{
        throw Error("error!");
    }

    //const style = getComputedStyle(svgText);
    //const fontSize = CommonFunctions.toPX(style.fontSize!);

    /*
    let r = new Rectangle();
    r.x = getX(svgText);
    r.y = getY(svgText);
    r.width = getVirtualWidth(svgText);
    r.height = fontSize;
    */


    //const rect = svgText.getBBox();
    /*
    r.x = rect.x;
    r.y = rect.y;
    r.width = rect.width;
    r.height = rect.height;
    */
    return r;

}