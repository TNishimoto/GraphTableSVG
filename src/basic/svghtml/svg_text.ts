

import { Size, Rectangle } from "../common/vline";
//import { CommonFunctions } from "../common/common_functions";
//import { HTMLFunctions } from "./html_functions";
import { HorizontalAnchor, VerticalAnchor, AutoSizeShapeToFitText } from "../common/enums";
import * as SVGTextBox from "./svg_textbox"
import {  } from "./svg_interface"
import * as CustomAttributeNames from "../common/custtome_attributes"

declare global {
    export interface SVGTextElement {
        /**
         * X座標を取得します。
         */
        getX(): number;
        /**
         * X座標を設定します。
         */
        setX(value: number): void;
        /**
         * Y座標を取得します。
         */
        getY(): number;
        /**
         * Y座標を設定します。
         */
        setY(value: number): void;
        /**
         * SVGTextElementのテキストを設定します。
         * @param text 設定するテキスト
         * @param isLatexMode TrueのときLatex表記を使用します。
         */
        setTextContent(text: string, isLatexMode: boolean): void;
        setTextContent(text: string): void;

        getMarginLeft(): number;
        setMarginLeft(value: number): void;
        getMarginTop(): number;
        setMarginTop(value: number): void;
        getMarginRight(): number;
        setMarginRight(value: number): void;
        getMarginBottom(): number;
        setMarginBottom(value: number): void;
        gtSetXY(rect: Rectangle, vAnchor: VerticalAnchor | null, hAnchor: HorizontalAnchor | null, isAutoSizeShapeToFitText: AutoSizeShapeToFitText): void;


    }
}

SVGTextElement.prototype.gtSetXY = function (rect: Rectangle, vAnchor: VerticalAnchor | null, hAnchor: HorizontalAnchor | null, isAutoSizeShapeToFitText: AutoSizeShapeToFitText) {
    
    const text: SVGTextElement = this;
    //const g : SVGGElement = this;

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

};



SVGTextElement.prototype.getMarginLeft = function () {
    const p: SVGTextElement = this;
    return p.getPropertyStyleNumberValue(CustomAttributeNames.Style.marginLeft, 5)!;
};
SVGTextElement.prototype.setMarginLeft = function (value: number) {
    const p: SVGTextElement = this;
    p.setPropertyStyleValue(CustomAttributeNames.Style.marginLeft, value.toString());
};

SVGTextElement.prototype.getMarginTop = function () {
    const p: SVGTextElement = this;
    return p.getPropertyStyleNumberValue(CustomAttributeNames.Style.marginTop, 5)!;
};
SVGTextElement.prototype.setMarginTop = function (value: number) {
    const p: SVGTextElement = this;
    p.setPropertyStyleValue(CustomAttributeNames.Style.marginTop, value.toString());
};
SVGTextElement.prototype.getMarginRight = function () {
    const p: SVGTextElement = this;
    return p.getPropertyStyleNumberValue(CustomAttributeNames.Style.marginRight, 5)!;
};
SVGTextElement.prototype.setMarginRight = function (value: number) {
    const p: SVGTextElement = this;
    p.setPropertyStyleValue(CustomAttributeNames.Style.marginRight, value.toString());
};
SVGTextElement.prototype.getMarginBottom = function () {
    const p: SVGTextElement = this;
    return p.getPropertyStyleNumberValue(CustomAttributeNames.Style.marginBottom, 5)!;
};
SVGTextElement.prototype.setMarginBottom = function (value: number) {
    const p: SVGTextElement = this;
    p.setPropertyStyleValue(CustomAttributeNames.Style.marginBottom, value.toString());
};


SVGTextElement.prototype.setTextContent = function (text: string, isLatexMode: boolean = false) {
    SVGTextBox.setTextToSVGText(this, text, isLatexMode);
};

SVGTextElement.prototype.getX = function () {
    //const p: SVGTextElement = this;
    const p: any = this;

    if (p.x.baseVal.numberOfItems == 0) {
        p.setAttribute('x', "0");
    }
    return p.x.baseVal.getItem(0).value;
};
SVGTextElement.prototype.setX = function (value: number) {
    //const p: SVGTextElement = this;
    const p: any = this;

    if (p.x.baseVal.numberOfItems == 0) {
        p.setAttribute('x', "0");
    }
    //p.setAttribute('x', value.toString());


    p.x.baseVal.getItem(0).value = value;
};
SVGTextElement.prototype.getY = function () {
    //const p: SVGTextElement = this;
    const p: any = this;

    if (p.y.baseVal.numberOfItems == 0) {
        p.setAttribute('y', "0");
    }
    return p.y.baseVal.getItem(0).value;
};
SVGTextElement.prototype.setY = function (value: number) {
    //const p: SVGTextElement = this;
    const p: any = this;

    if (p.y.baseVal.numberOfItems == 0) {
        p.setAttribute('y', "0");
    }
    p.y.baseVal.getItem(0).value = value;
};
