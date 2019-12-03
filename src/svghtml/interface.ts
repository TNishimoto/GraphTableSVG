/*
interface PPTextboxShape {
    width : number;
    height : number;
    readonly svgText : SVGTextElement;
    readonly svgGroup : SVGGElement;
    cx : number;
    cy : number;
    x : number;
    y : number;
}
*/

import { Common } from "../common/common";
import { SVGTextBox } from "./svg_textbox"
import { Cell } from "../object/table/cell"

//import { } from "./svg_interface"

declare global {
    export interface CSSStyleDeclaration {
        tryGetPropertyValue(name: string): string | null;
    }

    export interface SVGTextPathElement {
        /**
         * SVGTextElementのテキストを設定します。
         * @param text 設定するテキスト
         * @param isLatexMode TrueのときLatex表記を使用します。
         */
        setTextContent(text: string, isLatexMode: boolean): void;
        setTextContent(text: string): void;
    }
    export interface SVGLineElement {
        /**
         * SVGLineElementを強調するかどうかを設定します。
         * @param b Trueなら強調。Falseなら強調しません。
         */
        setEmphasis(b: boolean): void;
        /**
         * SVGLineElementが強調されているときにかぎりTrueを返します。
         */
        getEmphasis(): boolean;

    }

    export interface SVGPathElement {
        /**
         * SVGPathElementの位置を設定します。
         * @param points 
         */
        setPathLocations(points: [number, number][]): void;
        /**
         * SVGPathElementの位置を取得します。
         */
        getPathLocations(): [number, number][];

    }
}
SVGTextPathElement.prototype.setTextContent = function (text: string, isLatexMode: boolean = false) {
    SVGTextBox.setTextToTextPath(this, text, isLatexMode);
};
CSSStyleDeclaration.prototype.tryGetPropertyValue = function (name: string) {
    const p: CSSStyleDeclaration = this;
    const r = p.getPropertyValue(name).trim();
    if (r.length == 0) {
        return null;
    } else {
        return r;
    }
}







SVGLineElement.prototype.getEmphasis = function () {
    const p: SVGLineElement = this;

    const emp = p.getAttribute("class");
    if (emp != null) {
        return emp == Cell.emphasisBorderClass;
    } else {
        return false;
    }
};
SVGLineElement.prototype.setEmphasis = function (value: boolean) {
    Common.setGraphTableCSS();

    const p: SVGLineElement = this;
    if (p.getEmphasis() && !value) {
        const tmp = p.getAttribute(Cell.temporaryBorderClass);
        if (tmp != null) {
            p.setAttribute("class", tmp);
            p.removeAttribute(Cell.temporaryBorderClass);

        } else {
            p.removeAttribute("class");

            p.removeAttribute(Cell.temporaryBorderClass);

        }

    }
    else if (!p.getEmphasis() && value) {
        const lineClass = p.getAttribute("class");
        p.setAttribute("class", Cell.emphasisBorderClass);
        if (lineClass != null) {
            p.setAttribute(Cell.temporaryBorderClass, lineClass);
        }
    }
};

SVGPathElement.prototype.setPathLocations = function (points: [number, number][]) {

    const p: SVGPathElement = this;
    let s = "";
    for (let i = 0; i < points.length; i++) {
        s += `${i == 0 ? "M" : "L"} ${points[i][0]} ${points[i][1]} `;
    }
    //points.forEach((x, y) => s += `M ${x} ${y} `);
    p.setAttribute("d", s);
};
SVGPathElement.prototype.getPathLocations = function () {

    const p: SVGPathElement = this;
    const info = p.getAttribute("d");
    if (info == null) return [];

    const r: [number, number][] = [];
    let pos: [number, number] = [0, 0];
    let pathType = "";
    info.split(" ").forEach((v, i) => {
        if (i % 3 == 0) {
            pathType = v;
        } else if (i % 3 == 1) {

            pos[0] = parseInt(v);
        } else {
            pos[1] = parseInt(v);
            r.push(pos);
            pos = [0, 0];
        }
    });

    return r;
};


