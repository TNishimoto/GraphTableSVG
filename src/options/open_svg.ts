
import * as AttributeNames from "../common/attribute_names"
import { ShapeObjectType, VBAAttributeName } from "../common/enums";
import * as HTMLFunctions from "../html/html_functions"
import * as HTMLTable from "./html_table"
import * as GUIObserver from "../html/gui_observer"

import { ZObject } from "../objects/z_object"
import { NullError } from "../common/exceptions";
import { appendVBAButton } from "./vba_macro_modal";

import { convertFromZTagToIntermediateSVGGTag, processIntermediateSVGGElements } from "./custom_tag_processors/intermediate_g_tag_preprocessor";
import { processMacroTag } from "./custom_tag_processors/macro_tag_preprocessor";

//export namespace openSVGFunctions {

//}
let timerInterval = 100;

function getGObjectsSub(item: Element): ZObject[] {
    const arr: ZObject[] = new Array();
    const opr = (<any>item).operator;
    if (opr != undefined && opr instanceof ZObject) {
        arr.push(opr);
    } else {
        for (let i = 0; i < item.children.length; i++) {
            const child = item.children.item(i);
            if (child != null) {
                getGObjectsSub(child).forEach((v) => { arr.push(v) });
            }
        }
    }
    return arr;
}

export function getGObjects(elementID: string): ZObject[] {
    const svg = document.getElementById(elementID);
    if (svg == null) {
        throw new NullError();
    } else {
        return getGObjectsSub(svg);
    }
}


export function lazyOpenSVG() {
    const p = document.getElementsByTagName("svg");
    const svgElements: SVGSVGElement[] = [];
    for (let i = 0; i < p.length; i++) {
        const svgNode = p.item(i);
        if (svgNode instanceof SVGSVGElement) svgElements.push(svgNode);
    }
    svgElements.forEach((svgsvg) => lazyElementDic.push(svgsvg));
    if (lazyElementDic.length > 0) setTimeout(observelazyElementTimer, timerInterval);

}
let lazyElementDic: SVGSVGElement[] = [];
function observelazyElementTimer() {
    for (let i = 0; i < lazyElementDic.length; i++) {
        const element = lazyElementDic[i];

        if (HTMLFunctions.isInsideElement(element)) {
            openSVG(element);
            lazyElementDic.splice(i, 1);
            i = -1;

        }

    }
    if (lazyElementDic.length > 0) setTimeout(observelazyElementTimer, timerInterval);
}

export function clearSVG(id: string) {
    const box = document.getElementById(id)!;
    box.innerHTML = "";
}

export function openSVG(id: string, output?: ZObject[]): ZObject[];
export function openSVG(element: Element, output?: ZObject[]): ZObject[];
export function openSVG(empty: null, output?: ZObject[]): ZObject[];
export function openSVG(svgsvg: SVGSVGElement, output?: ZObject[]): ZObject[];
export function openSVG(inputItem: string | Element | null = null, output: ZObject[] = []): ZObject[] {
    if (typeof inputItem == "string") {
        const item = document.getElementById(inputItem);
        if (item != null && item instanceof SVGSVGElement) {
            return openSVG(item, output);
        } else {
            return [];
        }
    } else if (inputItem === null) {
        const p = document.getElementsByTagName("svg");
        const svgElements: SVGSVGElement[] = [];
        for (let i = 0; i < p.length; i++) {
            const svgNode = p.item(i);
            if (svgNode instanceof SVGSVGElement) svgElements.push(svgNode);
        }
        svgElements.forEach((svgsvg) => openSVG(svgsvg, output));
        return output;
    } else if (inputItem instanceof SVGSVGElement) {
        const svgsvg: SVGSVGElement = inputItem;

        processMacroTag(svgsvg);

        const vbaAttr = inputItem.getAttribute(VBAAttributeName);
        if (vbaAttr != null && vbaAttr == "true") {
            appendVBAButton(svgsvg);
        }

        convertFromZTagToIntermediateSVGGTag(svgsvg);

        const startTime = performance.now();

        processIntermediateSVGGElements(svgsvg, output)

        const endTime = performance.now();
        const time = endTime - startTime;

        GUIObserver.observeSVGSVG(svgsvg);
    } else {
        throw Error("errror");
    }
    return output;

}

function toDivElement(e: Element): HTMLElement | null {

    //const type = e.nodeName == "G-TABLE" ? "g-table" : e.nodeName == "ROW" ? "row" : e.nodeName == "CELL" ? "cell" : e.nodeName == "T" ? "t" : null;
    const type = e.nodeName.toLowerCase() == ShapeObjectType.Table ? ShapeObjectType.Table : e.nodeName.toLowerCase() == "row" ? "row" : e.nodeName.toLowerCase() == "cell" ? "cell" : null;

    if (type == null) {
        return null;
    } else {
        const ns = document.createElement("div");
        ns.setAttribute(AttributeNames.customElement, type);
        for (let i = 0; i < e.attributes.length; i++) {
            const attr = e.attributes.item(i);
            ns.setAttribute(attr!.name, attr!.value);
        }
        ns.innerHTML = e.innerHTML;
        //HTMLFunctions.getChildren(e).forEach((v)=>ns.appendChild(v));
        const p = e.parentElement;
        if (p != null) {
            p.insertBefore(ns, e);
            e.remove();
        }
        const children = HTMLFunctions.getChildren(ns);
        children.forEach((v) => toDivElement(v));
        return ns;
    }
}

function isSVGElement(e: Element): boolean {
    if (e.parentElement == null) {
        return false;
    } else {
        if (e.parentElement instanceof SVGSVGElement) {
            return true;
        } else {
            return isSVGElement(e.parentElement);
        }
    }
}

export function openHTML(id: string | HTMLElement | null = null) {
    if (id == null) {
        const p = document.getElementsByTagName(ShapeObjectType.Table);
        const svgElements: HTMLElement[] = [];
        for (let i = 0; i < p.length; i++) {
            const svgNode = p.item(i);
            if (svgNode != null) {
                if (!isSVGElement(svgNode) && svgNode instanceof HTMLElement) svgElements.push(svgNode);
            }
        }
        svgElements.forEach((e) => openHTML(e));
    }
    else if (typeof (id) == "string") {
        const e = document.getElementById(id);
        if (e instanceof HTMLElement) {
            openHTML(e);
        }
    }
    else {
        const newE = toDivElement(id);
        if (newE != null) {
            const table = HTMLTable.createHTMLTable(newE);
            newE.insertAdjacentElement('beforebegin', table);
            newE.remove();
        }
    }
}
