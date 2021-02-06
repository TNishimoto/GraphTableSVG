//namespace GraphTableSVG {
import { HTMLFunctions } from "../html";
import * as Color from "./color"
import * as CommonFunctions from "./common_functions";


export function parseInteger(value: string): number {
    if (value == "") {
        return 1;
    } else {
        return parseInt(value);
    }
}
/*
export function visible(value: string): number {
    if (value == "hidden") {
        return 1.0;
    } else {
        return 0;
    }
}
*/
export function styleVisible(value: CSSStyleDeclaration): number {
    if (value.visibility == "hidden") {
        return 1.0;
    } else if (value.stroke == "transparent") {
        return 1.0;
    } else {
        return 0;
    }
}


export class VBATranslateFunctions {
    public static grouping80(codes: string[][]): string[] {
        let r: string[] = [];
        const result: string[] = [];
        codes.forEach(function (x, i, arr) {
            if (r.length + x.length >= 80) {
                result.push(VBATranslateFunctions.joinLines(r));
                r = [];
            }
            x.forEach((v) => r.push(v));
        });
        if (r.length > 0) {
            result.push(VBATranslateFunctions.joinLines(r));
            r = [];
        }
        return result;
    }
    public static splitCode(codes: string[][], subArg: string, callArg: string, id: number): [string, string] {
        const functions: string[] = [];

        const p = VBATranslateFunctions.grouping80(codes);
        p.forEach(function (x, i, arr) {
            functions.push(`Call SubFunction${id}_${i}(${callArg})`);
            const begin = `Sub SubFunction${id}_${i}(${subArg})`;
            const end = `End Sub`;
            p[i] = VBATranslateFunctions.joinLines([begin, x, end]);
        });
        return [VBATranslateFunctions.joinLines(functions), VBATranslateFunctions.joinLines(p)];
    }

    public static ToFontBold(bold: string): string {
        if (bold == "bold") {
            return "msotrue";
        } else {
            return "msofalse";
        }
    }
    public static ToVerticalAnchor(value: string): string {
        switch (value) {
            case "top": return "msoAnchorTop";
            case "middle": return "msoAnchorMiddle";
            case "bottom": return "msoAnchorBottom";
            default: return "msoAnchorTop";
        }
    }
    public static ToHorizontalAnchor(value: string): string {
        switch (value) {
            case "left": return "ppAlignLeft";
            case "center": return "ppAlignCenter";
            case "right": return "ppAlignRight";
            default: return "ppAlignLeft";
        }
    }

    static createStringFunction(item: string) {
        return item.length == 0 ? `""` : `"` + item + `"`;
    }

    static createArrayFunction(items: any[]) {
        let s = ``;

        for (let i = 0; i < items.length; i++) {
            s += items[i];
            if (i + 1 != items.length) {
                s += `, `;
            }
        }
        return `Array(${s})`;
    }
    static createStringArrayFunction(items: string[]) {
        let s = ``;
        for (let i = 0; i < items.length; i++) {
            s += `"${items[i]}"`;
            if (i + 1 != items.length) {
                s += `, `;
            }
        }
        return `Array(${s})`;
    }
    static createJagArrayFunction(items: any[][]) {
        let s = ``;
        for (let i = 0; i < items.length; i++) {
            s += VBATranslateFunctions.createArrayFunction(items[i]);
            if (i + 1 != items.length) s += `, `;
        }
        return `Array(${s})`;
    }
    static joinLines(lines: string[]) {
        let s = ``;
        for (let i = 0; i < lines.length; i++) {
            s += lines[i];
            if (i + 1 != lines.length) s += `\n`;
        }
        return s;
    }

    public static colorToVBA(color: string): string {
        color = Color.createRGBCodeFromColorName(color);
        if (color.indexOf("rgb") != -1) {
            return color.replace("rgb", "Array");
        } else {
            return "Array(0, 0, 0)";
        }

    }
    public static ToVBAFont(font: string): string {
        font = font.replace(/"/g, "");
        font = font.replace(/'/g, "");
        return font;
    }
    public static TranslateSVGTextElement(sub: string[][], item: SVGTextElement, range: string): void {

        const text = item.textContent == null ? "" : item.textContent;

        sub.push([`${range}.text = "${item.textContent}"`]);
        if (item.children.length > 0) {
            let pos = 1;
            for (let i = 0; i < item.children.length; i++) {
                const child = item.children.item(i);
                if (child != null && child.textContent != null && child.textContent.length > 0) {
                    const css = getComputedStyle(child);
                    const childColor = Color.createRGBFromColorName(css.fill == null ? "black" : css.fill);
                    const fontName = this.getFont(css);
                    const fontSize = CommonFunctions.toPX(css.fontSize == null ? "14pt" : css.fontSize);
                    const fontBold = Number(css.fontWeight) == 400 ? 0 : 1;
                    const len = child.textContent.length;

                    let f = child.getAttribute("data-script");
                    if (f == null) {
                        f = "";
                    }
                    sub.push([`Call EditTextRangeSub(${range},${pos}, ${len}, "${f}", Array(${childColor.r}, ${childColor.g}, ${childColor.b}), "${fontName}", ${fontSize}, ${fontBold} )`]);
                    pos += len;
                }

            }
        } else if (item.textContent != null && item.textContent.length > 0) {

            const css = getComputedStyle(item);
            if (css.fontSize == null) throw Error("error");
            if (css.fill == null) throw Error("error");


            const color = Color.createRGBFromColorName(css.fill);
            const fontName = this.getFont(css);
            const fontSize = CommonFunctions.toPX(css.fontSize);
            const fontBold = Number(css.fontWeight) == 400 ? 0 : 1;

            sub.push([`Call EditTextRangeSub(${range},${1}, ${item.textContent.length}, "", Array(${color.r}, ${color.g}, ${color.b}), "${fontName}", ${fontSize}, ${fontBold} )`]);
        }
    }
    private static getFont(css: CSSStyleDeclaration): string {
        if (css.fontFamily == null) throw Error("error");
        const arr = css.fontFamily.split(",");
        if (arr.length > 0) {
            let name = arr[0];
            name = name.replace(/\"/g, "");
            name = name.replace(/\'/g, "");
            return name;
        } else {
            return "";
        }

    }
    public static TranslateSVGTextElement2(item: SVGTextElement, range: string): string[] {

        const lines: string[] = [];
        //const text = item.textContent == null ? "" : item.textContent;

        if (item.children.length > 0) {
            let textCode = "";
            for (let i = 0; i < item.children.length; i++) {
                const child = item.children.item(i);
                if (child != null && child.textContent != null && child.textContent.length > 0) {
                    const newLine = child.getAttribute("newline");
                    if (newLine != null && newLine == "true") {
                        textCode += `& vbCrLf `;
                    }
                    const text = HTMLFunctions.removeInvisibleCharacters(child.textContent);
                    if (textCode.length > 0) {
                        textCode += `& "${text}"`;
                    } else {
                        textCode = `"${text}"`;
                    }

                }
            }

            lines.push(`${range}.text = ${textCode}`);

            let pos = 1;

            for (let i = 0; i < item.children.length; i++) {
                const child = item.children.item(i);
                
                if (child != null && child.textContent != null && child.textContent.length > 0) {                    
                    const newLine = child.getAttribute("newline");
                    if (newLine != null && newLine == "true") {
                        pos++;
                    }

                    for (let j = 0; j < child.childNodes.length; j++) {
                        const child2 = child.childNodes.item(j);
                        const node = child2 instanceof SVGTSpanElement ? child2 : child;
                        const textContent = HTMLFunctions.removeInvisibleCharacters(child2.textContent!); 
                        const css = getComputedStyle(node);
                        if (css.fontSize == null) throw Error("error");
                        if (css.fill == null) throw Error("error");

                        const childColor = Color.createRGBFromColorName(css.fill);
                        const fontName = this.getFont(css);
                        const fontSize = CommonFunctions.toPX(css.fontSize);
                        const fontBold = Number(css.fontWeight) == 400 ? 0 : 1;
                        const len = textContent.length;

                        let f = node.getAttribute("data-script");
                        if (f == null) {
                            f = "";
                        }
                        lines.push(`Call EditTextRangeSub(${range},${pos}, ${len}, "${f}", Array(${childColor.r}, ${childColor.g}, ${childColor.b}), "${fontName}", ${fontSize}, ${fontBold} )`);
                        pos += len;

                    }

                }

            }
        } else if (item.textContent != null && item.textContent.length > 0) {
            const vbaText = HTMLFunctions.removeInvisibleCharacters(item.textContent);
            lines.push(`${range}.text = "${vbaText}"`);

            const css = getComputedStyle(item);
            if (css.fontSize == null) throw Error("error");
            if (css.fill == null) throw Error("error");

            const color = Color.createRGBFromColorName(css.fill);
            const fontName = this.getFont(css);
            const fontSize = CommonFunctions.toPX(css.fontSize);
            const fontBold = Number(css.fontWeight) == 400 ? 0 : 1;

            lines.push(`Call EditTextRangeSub(${range},${1}, ${vbaText.length}, "", Array(${color.r}, ${color.g}, ${color.b}), "${fontName}", ${fontSize}, ${fontBold} )`);
        }
        return lines;
    }

    /*
    public static shapeToVBA(shape: ShapeStyle, item: string) {
        return ` Call EditNodeLine(${item}, ${VBATranslateFunctions.colorToVBA(shape.lineColor)}, ${shape.dashStyleCode}, ${shape.transparency}, ${shape.weight})`;
    }
    */
}