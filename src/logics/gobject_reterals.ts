
export type SVGOptionReteral = { id : string | undefined, class : string | undefined, style: string | undefined }
export type SVGReteral = { tag : string | undefined  } & SVGOptionReteral

export type SVGSVGOptionReteral = { width : number | string | undefined, height : number | string | undefined, vba : boolean | undefined, shrink : boolean | undefined } & SVGOptionReteral;

export type SVGSVGReteral = { xmlns : string, children : SVGReteral[] } & SVGReteral & SVGSVGOptionReteral

export type TextReteral = { text : string | undefined } & SVGReteral;

export type SubBackgroundReteral = { background_style : string | undefined, background_class : string | undefined, background_id : string | undefined}
export type SubTextReteral = { text_style : string | undefined, text_class : string | undefined, text_id : string | undefined}

export type GVertexReteral = { x : number, y : number } & SVGReteral & SubBackgroundReteral & SubTextReteral

export type CellReteral = { w : number | undefined, h : number | undefined, children : TextReteral[]  } & SVGReteral & SubBackgroundReteral & SubTextReteral;
export type RowReteral = { children : CellReteral[] } & SVGReteral & SubBackgroundReteral & SubTextReteral;

//export type TextType = "string" | "SVGText"
export type TableReteral = { children : RowReteral[] } & GVertexReteral;



export function setSVGReteral(obj : SVGReteral, tag : string, id : string | undefined, _class : string | object | undefined | null, style : string | object | null | undefined){
    obj.tag = tag;
    if(id != undefined){
        obj.id = id;
    }
    if(_class != undefined){
        if(typeof _class == "string"){
            obj.class = _class;
        }
    }
    if(style != undefined){
        if(typeof style == "string"){
            obj.style = style;
        }
    }
    
}
export function toHTML(obj : SVGReteral, indent : string) : string[]{
    const r : string[] = new Array();
    const tag = (<any>obj)["tag"];
    if(tag != undefined){
        let fstLine = `<${tag}`
        for(const key in obj){
            if(key == "tag"){

            }else if(key == "children"){

            }else{
                const value = (<any>obj)[key]
                if(typeof value == "string"){
                    fstLine += ` ${key}="${value}"`;                    
                }else if(typeof value == "number"){
                    fstLine += ` ${key}="${value}"`;
                }
            }
        }
        fstLine += ">"
        r.push(fstLine);

        const children = (<any>obj)["children"];
        if(Array.isArray(children)){
            children.forEach((v) =>{
                const lines = toHTML(v, indent);
                lines.forEach((w) =>{
                    r.push(indent + w);
                })
            })
        }

        const lstLine = `</${tag}>`
        r.push(lstLine);
    
    }else{

    }
    return r;
}
