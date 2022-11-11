import * as CommonFunctions from "../common/common_functions";
import * as HTMLFunctions from "../html/html_functions";
import { Size, Rectangle, round100 } from "../common/vline";

//type CharInfo = { char: number, fontSize: number, fontFamily: string }
type CharInfo = { char: number, fontSize: number, fontFamily: string }

type VirtualTSpan = { textContent : string, fontSize: string, fontFamily: string, fontWeight: string, type : "span", dx : string | null, dy : string | null }
type virtualTText = { children : VirtualTSpan[] , type : "text" };

function createTSpanElement(text : VirtualTSpan) : SVGTSpanElement {
    const tspanElement: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspanElement.textContent = text.textContent;
    tspanElement.style.fontFamily = text.fontFamily;
    tspanElement.style.fontSize = text.fontSize;
    //CommonFunctions.toPX(style.fontSize!);
    tspanElement.style.fontWeight = text.fontWeight;
    if(text.dx != null){
        tspanElement.setAttribute("dx", text.dx);
    }
    if(text.dy != null){
        tspanElement.setAttribute("dy", text.dy);
    }


    return tspanElement;
}

let baseX = 30;
let baseY = 30;

function createTextElement(text : virtualTText) : SVGTextElement {
    const svgText: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.children.forEach((v) =>{
        svgText.appendChild(createTSpanElement(v));
    })
    /*
    svgText.textContent = text;
    svgText.style.fontFamily = fontFamily;
    svgText.style.fontSize = fontSize.toString() + "px";
    svgText.style.fontWeight = fontWeight;
    */

    svgText.setAttribute("x", baseX.toString());
    svgText.setAttribute("y", baseY.toString());
    return svgText;
}
function createVirtualTSpan(tspan : SVGTSpanElement) : VirtualTSpan{
    const textContent = tspan.textContent!;
    const style = window.getComputedStyle(tspan);
    const dx = tspan.getAttribute("dx");
    const dy = tspan.getAttribute("dy");
    
    return { textContent: textContent, fontSize : style.fontSize, fontFamily : style.fontFamily, fontWeight : style.fontWeight, type: "span", dx : dx, dy : dy }
}
function createVirtualText(svgText : SVGTextElement) : virtualTText{
    const tpathItems = <SVGTSpanElement[]>HTMLFunctions.getChildren(svgText).filter((v) => v.nodeName == "textPath");
    let tspans : SVGTSpanElement[] = new Array();
    if(tpathItems.length == 1){
        const tpath = tpathItems[0];
        tspans = <SVGTSpanElement[]>HTMLFunctions.getChildren(tpath).filter((v) => v.nodeName.toLowerCase() == "tspan");
    }else{
        tspans = <SVGTSpanElement[]>HTMLFunctions.getChildren(svgText).filter((v) => v.nodeName.toLowerCase() == "tspan");    
    }
    const r : VirtualTSpan[] = new Array();
    tspans.forEach((v) =>{
        r.push(createVirtualTSpan(v));
    })
    return { type : "text", children : r};


    
}

function superComputeRegion(text: virtualTText | VirtualTSpan): Rectangle {
    var div = document.createElement('div');

    var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    document.body.appendChild(div);
    div.appendChild(canvas);


    canvas.setAttribute("width", "300px");
    canvas.setAttribute("height", "300px");

    canvas.setAttribute("viewBox", "0 0 300 300");

    const obj = text.type == "text" ? createTextElement(text) : createTSpanElement(text);
    //const svgText = createTextElement(obj);
    canvas.appendChild(obj);

    const box = obj.getBBox();
    document.body.removeChild(div);
    const x = round100(box.x) - round100(baseX);
    const y = round100(box.y) - round100(baseY);
    return new Rectangle(x, y, round100(box.width), round100(box.height));


}


const CharInfoMap: Map<CharInfo, number> = new Map();
function superComputeTextWidth(text: string, fontSize: number, fontFamily: string, fontWeight: string): number {
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

function computeTextWidth(text: string | number, fontSize: number, fontFamily: string): number {
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
/*
export function getVirtualTextLineLength(text: SVGTextElement | SVGTSpanElement | SVGTextPathElement): number {

    if (text instanceof SVGTSpanElement) {
        const style = getComputedStyle(text);
        const fontSize = CommonFunctions.toPX(style.fontSize!);
        const fontFamily = style.fontFamily!;
        const fontWeight = style.fontWeight!;

        return superComputeTextWidth(text.textContent!, fontSize, fontFamily, fontWeight);
    } else {

        const tspans = <SVGTSpanElement[]>HTMLFunctions.getChildren(text).filter((v) => v.nodeName == "tspan");
        let len = 0;
        tspans.forEach((v) => { len += getVirtualTextLineLength(v) });
        return len;
    }
}
*/
export function getVirtualRegion(text: SVGTextElement | SVGTSpanElement): Rectangle {

    if(text instanceof SVGTextElement){
        const vtext = createVirtualText(text);
        const rect = superComputeRegion(vtext);
        return rect;
        //return superComputeRegion(vtext);
    }
    else{
        const vtext = createVirtualTSpan(text);
        const rect = superComputeRegion(vtext);
        return rect;

    }
    /*
    else{
        return new Rectangle();

    }
    */
    /*
    if (text instanceof SVGTSpanElement) {
        const width = getVirtualTextLineLength(text);
        const style = getComputedStyle(text);
        const fontSize = CommonFunctions.toPX(style.fontSize!);
        return new Rectangle(0, 0, width, fontSize);

    } else {
        const r = new Rectangle();
        const line = new Rectangle();

        const tspans = <SVGTSpanElement[]>HTMLFunctions.getChildren(text).filter((v) => v.nodeName == "tspan");
        tspans.forEach((v) =>{
            const region = getVirtualRegion(v);
            line.width += region.width;
            if(line.height > region.height) region.height = line.height;
            if(v.hasAttribute("newline")){
                r.height += line.height;
                if()
            }
        })
        let len = 0;
        tspans.forEach((v) => { len += getVirtualTextLineLength(v) });
        return len;
    }
    */
}