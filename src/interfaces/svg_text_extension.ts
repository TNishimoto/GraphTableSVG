import { Size, Rectangle } from "../common/vline";
//import { CommonFunctions } from "../common/common_functions";
//import { HTMLFunctions } from "./html_functions";
import { HorizontalAnchor, VerticalAnchor, AutoSizeShapeToFitText } from "../common/enums";
import * as SVGTextBox from "./svg_textbox"
//import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"
import * as ElementExtension from "./element_extension"


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

    const b2 = SVGTextBox.getSize(<any>text, true);

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
