import { CenterPosition, UpperLeftPosition } from "../common/vline";

export type SVGOptionReteral = { id?: string, class?: string, style?: string }
export type SVGReteral = { tag?: string } & SVGOptionReteral


export type BorderOptionReteral = {} & SVGOptionReteral;

export type SVGSVGOptionReteral = { width?: number | string, height?: number | string, vba?: boolean, shrink?: boolean } & SVGOptionReteral;

export type SVGSVGReteral = { xmlns: string, children: SVGReteral[] } & SVGReteral & SVGSVGOptionReteral

export type TextReteral = { textContent?: string } & SVGReteral;

export type BackgroundOptionReteral = {} & SVGOptionReteral;
export type TextOptionReteral = {} & SVGOptionReteral;

export type GVertexOptionReteral = { x?: number, y?: number, backgroundOption: BackgroundOptionReteral, textOption: TextOptionReteral } & SVGOptionReteral

export type GVertexReteral = {} & GVertexOptionReteral & SVGReteral

export type CellOptionReteral = {
    w?: number, h?: number,
    backgroundOption: BackgroundOptionReteral, textOption: TextOptionReteral,
    topBorderOption: BorderOptionReteral, leftBorderOption: BorderOptionReteral, rightBorderOption: BorderOptionReteral, bottomBorderOption: BorderOptionReteral
} & SVGOptionReteral;

export type CellReteral = { children: TextReteral[] } & SVGReteral & CellOptionReteral;
export type RowReteral = { children: CellReteral[], backgroundOption: BackgroundOptionReteral, textOption: TextOptionReteral } & SVGReteral;

//export type TextType = "string" | "SVGText"
export type TableOptionReteral = { rowHeight?: number, columnWidth?: number, positionType?: CenterPosition | UpperLeftPosition } & GVertexOptionReteral;

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
    if (tag != undefined) {
        let fstLine = `<${tag}`
        console.log(obj);
        for (const key in obj) {
            if (key == "tag") {

            } else if (key == "children") {

            } else {
                const value = (<any>obj)[key]
                if (typeof value == "string" || typeof value == "number") {
                    fstLine += ` ${key.toLowerCase()}="${value}"`;
                } else if (value instanceof Object) {
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
        //console.log(`tag = ${tag}, children: ${children}`)
        //console.log(children);
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
        console.log(`No tag: ${obj}`)
        const textContent = (<any>obj)["textContent"];
        if (typeof textContent == "string") {
            return [`${textContent}`];
        } else {
            return [];
        }

    }
    return r;
}
