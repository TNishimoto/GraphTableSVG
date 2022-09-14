import { AttributeNames } from "../common";
import { CenterPosition, PositionType, UpperLeftPosition } from "../common/vline";
import * as ElementExtension from "../interfaces/element_extension"

export type SVGOptionReteral = { id?: string, class?: string, style?: string }
export type SVGReteral = { tag?: string } & SVGOptionReteral


export type BorderOptionReteral = {} & SVGOptionReteral;

export type SVGSVGOptionReteral = { width?: number | string, height?: number | string, g_vba?: boolean, g_shrink?: boolean } & SVGOptionReteral;

export type SVGSVGReteral = { xmlns: string, children: SVGReteral[] } & SVGReteral & SVGSVGOptionReteral

export type TextReteral = { textContent?: string } & SVGReteral;

export type SurfaceOptionReteral = {} & SVGOptionReteral;
export type TextOptionReteral = {} & SVGOptionReteral;

export type GVertexOptionReteral = { x?: number, y?: number, cx?: number, cy?: number, positionType : PositionType, 
    width?: number, height?: number, 
    surfaceOption: SurfaceOptionReteral, textOption: TextOptionReteral } & SVGOptionReteral

export type GVertexReteral = {} & GVertexOptionReteral & SVGReteral

export type CellOptionReteral = {
    w?: number, h?: number,
    backgroundOption: SurfaceOptionReteral, textOption: TextOptionReteral,
    topBorderOption: BorderOptionReteral, leftBorderOption: BorderOptionReteral, rightBorderOption: BorderOptionReteral, bottomBorderOption: BorderOptionReteral
} & SVGOptionReteral;

export type CellReteral = { children: TextReteral[] } & SVGReteral & CellOptionReteral;
export type RowReteral = { children: CellReteral[], backgroundOption: SurfaceOptionReteral, textOption: TextOptionReteral } & SVGReteral;

//export type TextType = "string" | "SVGText"
export type TableOptionReteral = { rowHeight?: number, columnWidth?: number } & GVertexOptionReteral;

export type TableReteral = { children: RowReteral[] } & TableOptionReteral & GVertexReteral;

/*
export type _GTableOption = {
    rowCount?: number,
    columnCount?: number,
    rowHeight?: number,
    columnWidth?: number,
    //table?: LogicTable
    
    columnWidths?: (number | null)[];
    rowHeights?: (number | null)[];
    position? : CenterPosition | UpperLeftPosition;

}
*/


function getAndRemoveAttribute(item:Element,name: string): string | undefined{
    const p = ElementExtension.gtGetAttributeStringWithUndefined(item, name);
    item.removeAttribute(name);
    return p;
}
function getAndRemoveNumberAttribute(item:Element,name: string): number | undefined{
    const p = ElementExtension.gtGetAttributeNumberWithUndefined(item, name);
    item.removeAttribute(name);
    return p;
}

function getAndRemoveInheritedAttribute(item:Element,name: string): string | undefined{
    const p = ElementExtension.gtGetInheritedAttributeString(item, name);
    item.removeAttribute(name);
    return p;
}

export function convertAttributesIntoVertexOption(e: Element) : GVertexOptionReteral {
    const output : GVertexOptionReteral = <any> new Object();
    output.class = getAndRemoveAttribute(e, AttributeNames.className) ?? output.class;
    output.style = getAndRemoveAttribute(e, AttributeNames.style) ?? output.style;

    output.surfaceOption = new Object();
    output.surfaceOption.class = getAndRemoveInheritedAttribute(e, AttributeNames.surfaceClassName) ?? output.surfaceOption.class;
    output.surfaceOption.style = getAndRemoveInheritedAttribute(e, AttributeNames.surfaceStyle) ?? output.surfaceOption.style;

    output.width = getAndRemoveNumberAttribute(e, AttributeNames.width);
    output.height = getAndRemoveNumberAttribute(e, AttributeNames.height);

    output.cx = getAndRemoveNumberAttribute(e, AttributeNames.cx) ?? output.cx;
    output.cy = getAndRemoveNumberAttribute(e, AttributeNames.cy) ?? output.cy;
    output.x = getAndRemoveNumberAttribute(e, AttributeNames.x) ?? output.x;
    output.y = getAndRemoveNumberAttribute(e, AttributeNames.y) ?? output.y;
    if(output.cx !== undefined || output.cy !== undefined){
        output.positionType = "center";
    }else if(output.x !== undefined || output.y !== undefined){
        output.positionType = "upper-left";
    }
    return output;

}   
export function convertAttributesIntoTableOption(e: Element) : TableOptionReteral {
    const output : TableOptionReteral = <any> convertAttributesIntoVertexOption(e);
    output.rowHeight = getAndRemoveNumberAttribute(e, AttributeNames.rowHeight) ?? output.rowHeight;
    output.columnWidth = getAndRemoveNumberAttribute(e, AttributeNames.columnWidth) ?? output.columnWidth;

    return output;

}



export function setSVGReteral(obj: SVGReteral, tag: string, id: string | undefined, _class: string | object | undefined | null, style: string | object | null | undefined) {
    obj.tag = tag;
    if (id != undefined) {
        obj.id = id;
    }
    if (_class != undefined) {
        if (typeof _class == "string") {
            obj.class = _class;
        }
    }
    if (style != undefined) {
        if (typeof style == "string") {
            obj.style = style;
        }
    }

}

export function deepCopy(obj: Object): Object {
    return JSON.parse(JSON.stringify(obj))
}

function toSpecialAttributes(obj: Object, prefixName: string): string[] {
    const r : string[] = new Array();
    for (const key in obj) {
        const value = (<any>obj)[key]
        if (typeof value == "string" || typeof value == "number") {
            const line = `${prefixName}:${key.toLowerCase()}="${value}"`
            r.push(line);
        } else if (value instanceof Object) {
            throw new Error("Error");
        }
    }
    return r;
}
export function toHTML(obj: SVGReteral, indent: string): string[] {
    const r: string[] = new Array();
    const tag = (<any>obj)["tag"];

    const replaceDic : Map<string, string> = new Map();
    //replaceDic.set("shrink", "g-shrink")

    if (tag != undefined) {
        let fstLine = `<${tag}`
        for (const key in obj) {
            if (key == "tag") {

            } else if (key == "children") {

            } else {
                const newKey = key.toLowerCase().replace("_", "-");
                const value = (<any>obj)[key]
                if (typeof value == "string" || typeof value == "number") {
                    fstLine += ` ${newKey}="${value}"`;
                } 
                else if(typeof value == "boolean"){
                    fstLine += ` ${newKey}="${value ? "true" : "false"}"`;
                }
                else if (value instanceof Object) {
                    const ind = key.indexOf("Option");
                    if (ind != -1 && ind == key.length - 6) {
                        const prefixName = key.substring(0, key.length - 6).toLowerCase();
                        toSpecialAttributes(value, prefixName).forEach((v) =>{
                            fstLine += ` ${v}`;
                        })
                    } else {

                    }
                }
            }
        }
        //r.push(fstLine);
        const centerLines: string[] = new Array();

        const children = (<any>obj)["children"];
        if (Array.isArray(children)) {
            children.forEach((v) => {
                const lines = toHTML(v, indent);
                lines.forEach((w) => {
                    centerLines.push(indent + w);
                })
            })
        }

        const lstLine = `</${tag}>`

        if (centerLines.length == 0) {
            fstLine += "/>"
            r.push(`${fstLine}`)
        } else if (centerLines.length == 1) {
            fstLine += ">"
            r.push(`${fstLine}${centerLines[0].substring(indent.length)}${lstLine}`)
        } else {
            fstLine += ">"
            r.push(fstLine)
            centerLines.forEach((v) => {
                r.push(v);
            })
            r.push(lstLine);
        }

        //r.push(lstLine);

    } else {
        const textContent = (<any>obj)["textContent"];
        if (typeof textContent == "string") {
            return [`${textContent}`];
        } else {
            return [];
        }

    }
    return r;
}
