
import * as AttributeNames from "../common/attribute_names"
import { ShapeObjectType } from "../common/enums";
import * as HTMLFunctions from "../html/html_functions"
import * as HTMLTable from "./html_table"
import * as GUIObserver from "../html/gui_observer"

import { GObject } from "../objects/g_object"
import { GCallout } from "../objects/g_callout"
import { GArrowCallout } from "../objects/g_arrow_callout"
import { GEllipse } from "../objects/g_ellipse"
import { GRect } from "../objects/g_rect"
import { GEdge } from "../objects/g_edge"
import { GTable, GTableOption } from "../objects/g_table"
import { GGraph } from "../objects/g_graph"
import { GRectButton } from "../objects/g_rect_button"
import { GCircle } from "../objects/g_circle";
import * as ElementExtension from "../interfaces/element_extension"
import { LogicTable } from "../logics";
import { NullError } from "../common/exceptions";
import { appendVBAButton } from "./vba_macro_modal";
import { GForeignButton } from "../objects/g_foreign_button";
import { convertAttributesIntoTableOption, TableOptionReteral } from "../logics/gobject_reterals";

import { convertFromElementWithCustomElementAttributeToGObject, isElementWithCustomElementAttribute, convertFromElementToSVGGElementWithCustomElementAttribute } from "./custom_svg_processors/custom_g_element_processor";

//export namespace openSVGFunctions {

//}
let timerInterval = 100;

function getGObjectsSub(item: Element): GObject[] {
    const arr: GObject[] = new Array();
    const opr = (<any>item).operator;
    if (opr != undefined && opr instanceof GObject) {
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

export function getGObjects(elementID: string): GObject[] {
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

export function openSVG(id: string, output?: GObject[]): GObject[];
export function openSVG(element: Element, output?: GObject[]): GObject[];
export function openSVG(empty: null, output?: GObject[]): GObject[];
export function openSVG(svgsvg: SVGSVGElement, output?: GObject[]): GObject[];
export function openSVG(inputItem: string | Element | null = null, output: GObject[] = []): GObject[] {
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

        const vbaAttr = inputItem.getAttribute("g-vba");
        if (vbaAttr != null && vbaAttr == "true") {
            appendVBAButton(svgsvg);
        }

        HTMLFunctions.getDescendants(svgsvg).forEach(v => {
            const shapeType = ShapeObjectType.toShapeObjectType(v.nodeName);
            if (shapeType != null) {
                convertFromElementToSVGGElementWithCustomElementAttribute(v);
            }
        })
        const startTime = performance.now();

        HTMLFunctions.getDescendantsByPostorder(svgsvg).forEach((v) => {
            if (v instanceof SVGElement) {
                if ( isElementWithCustomElementAttribute(v)) {
                    const p = convertFromElementWithCustomElementAttributeToGObject(v);
                    if (p != null) {
                        output.push(p);
                    }
                }

            }
        })
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
    const type = e.nodeName == "G-TABLE" ? "g-table" : e.nodeName == "ROW" ? "row" : e.nodeName == "CELL" ? "cell" : null;

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
        const p = document.getElementsByTagName("g-table");
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
