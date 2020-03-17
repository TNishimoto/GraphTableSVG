import * as SVGTextBox from "./svg_textbox"
import * as CSS from "../html/css";
import * as AttributeNames from "../common/attribute_names"

export function tryGetPropertyValue(item: CSSStyleDeclaration, name: string): string | null {
    //const p: CSSStyleDeclaration = this;
    const r = item.getPropertyValue(name).trim();
    if (r.length == 0) {
        return null;
    } else {
        return r;
    }

}

/**
 * SVGTextElementのテキストを設定します。
 * @param text 設定するテキスト
 * @param isLatexMode TrueのときLatex表記を使用します。
 */
export function setTextContent(item: SVGTextPathElement, text: string, isLatexMode: boolean = false): void {
    SVGTextBox.setTextToTextPath(item, text, isLatexMode);

}


/**
 * SVGLineElementを強調するかどうかを設定します。
 * @param b Trueなら強調。Falseなら強調しません。
 */
export function setEmphasis(item: SVGLineElement, value: boolean): void {

    CSS.setGraphTableCSS();

    if (getEmphasis(item) && !value) {
        const tmp = item.getAttribute(AttributeNames.cellTemporaryBorderClass);
        if (tmp != null) {
            item.setAttribute("class", tmp);
            item.removeAttribute(AttributeNames.cellTemporaryBorderClass);

        } else {
            item.removeAttribute("class");

            item.removeAttribute(AttributeNames.cellTemporaryBorderClass);

        }

    }
    else if (!getEmphasis(item) && value) {
        const lineClass = item.getAttribute("class");
        item.setAttribute("class", AttributeNames.cellTemporaryBorderClass);
        if (lineClass != null) {
            item.setAttribute(AttributeNames.cellTemporaryBorderClass, lineClass);
        }
    }

}
export function getEmphasis(item: SVGLineElement): boolean {

    const emp = item.getAttribute("class");
    if (emp != null) {
        return emp == AttributeNames.cellEmphasisBorderClass;
    } else {
        return false;
    }

}
/**
 * SVGPathElementの位置を設定します。
 * @param points 
 */
export function setPathLocations(item: SVGPathElement, points: [number, number][]): void {
    let s = "";
    for (let i = 0; i < points.length; i++) {
        s += `${i == 0 ? "M" : "L"} ${points[i][0]} ${points[i][1]} `;
    }
    //points.forEach((x, y) => s += `M ${x} ${y} `);
    item.setAttribute("d", s);

}
/**
 * SVGPathElementの位置を取得します。
 */
export function getPathLocations(item: SVGPathElement): [number, number][] {

    const info = item.getAttribute("d");
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
}



