
import * as AttributeNames from "../common/attribute_names"
//import * as StyleNames from "../common/style_names"
import { ShapeObjectType } from "../common/enums";
import * as HTMLFunctions from "../html/html_functions"
import * as HTMLTable from "./html_table"
import * as GUIObserver from "../html/gui_observer"

import { GObject } from "../objects/g_object"
import { GCallout } from "../objects/g_callout"
import { GArrowCallout } from "../objects/g_arrow_callout"
import { GEllipse } from "../objects/g_ellipse"
import { GRect } from "../objects/g_rect"
//import { GVertex } from "../object/g_vertex"

import { GTextBox } from "../objects/g_textbox"
import { GEdge } from "../objects/g_edge"
import { GTable, GTableOption } from "../objects/g_table"
import { GGraph } from "../objects/g_graph"
import { GRectButton } from "../objects/g_rect_button"
import { GCircle } from "../objects/g_circle";
import * as GOptions from "../objects/g_options"
import * as ElementExtension from "../interfaces/element_extension"
import { LogicTable } from "../logics";

//export namespace openSVGFunctions {
    
//}
function isGCustomElement(element: SVGElement): boolean {
    const gObjectTypeAttr = element.getAttribute(AttributeNames.customElement);

    if (gObjectTypeAttr != null) {
        const gObjectType = ShapeObjectType.toShapeObjectType(gObjectTypeAttr);
        return gObjectType != null;
    } else {
        return false;
    }

}
export function openCustomElement(id: string | SVGElement): GObject | null {

    if (typeof id == "string") {
        const item = document.getElementById(id);
        if (item instanceof SVGElement) {
            return openCustomElement(item);
        } else {
            return null;
        }
    } else {
        const element = id;
        //const shapeType = GraphTableSVG.ShapeObjectType.toShapeObjectType(element.nodeName);
        const gObjectTypeAttr = element.getAttribute(AttributeNames.customElement);
        if (gObjectTypeAttr != null) {
            const gObjectType = ShapeObjectType.toShapeObjectType(gObjectTypeAttr);
            if (gObjectType != null) {
                return createCustomElement(element, gObjectType);
            } else {
                return null;
            }
        } else {
            const type = ShapeObjectType.toShapeObjectType(element.nodeName);

            if (type != null) {
                return createCustomElement(element, type);
            } else {
                return null;
            }

        }
    }
}
function createCustomElement(e: Element, type: ShapeObjectType): GObject | null {
    const parent = e.parentElement;
    if (parent instanceof SVGElement) {
        let r: GObject;

        e.removeAttribute(AttributeNames.customElement);
        if (type == ShapeObjectType.Callout) {
            const option = GCallout.constructAttributes(e, true);
            r = new GCallout(parent);
            r.setOption(option);
        } else if (type == ShapeObjectType.ArrowCallout) {
            const option = GArrowCallout.constructAttributes(e, true);
            r = new GArrowCallout(parent);
            r.setOption(option);
        } else if (type == ShapeObjectType.Ellipse) {
            const option = GEllipse.constructAttributes(e, true);
            r = new GEllipse(parent);
            r.setOption(option);
        } else if (type == ShapeObjectType.Circle) {
            const option = GCircle.constructAttributes(e, true);
            r = new GCircle(parent);
            r.setOption(option);
        } 
        else if (type == ShapeObjectType.Rect) {
            const option = GRect.constructAttributes(e, true);
            r = new GRect(parent, option);
            r.setOption(option);
            //throw Error("error");


        } else if (type == ShapeObjectType.Edge) {
            const option = GEdge.constructAttributes(e, true);
            r = new GEdge(parent, option);
            r.setOption(option);
        } else if (type == ShapeObjectType.Graph) {
            const option = GGraph.constructAttributes(e, true);
            r = new GGraph(parent);
            r.setOption(option);
            //(<GGraph>r).relocate();
        } else if (type == ShapeObjectType.Table) {
            const logicTable = LogicTable.constructLogicTable(e);
            const option = GTable.constructAttributes(e, true);

            const table =  new GTable(parent);
            table.setOption(option);
            
            if(logicTable !== null){
                table.buildFromLogicTable(logicTable);
            }
            r = table;

        }
        else if (type == ShapeObjectType.RectButton) {
            const option = GRectButton.constructAttributes(e, true);
            r = new GRectButton(parent, option);
            r.setOption(option);
        }
        else {
            return null;
        }

        //属性の移動と元オブジェクトの削除
        const attrs = ElementExtension.gtGetAttributes(e);
        HTMLFunctions.getChildren(e).forEach((v) => r.svgGroup.appendChild(v));
        e.remove();
        attrs.forEach((v) => {
            var items = v.name.split(":");
            if (items.length == 2 && items[0] == "surface") {
                if (r.svgSurface != null) {
                    r.svgSurface.setAttribute(items[1], v.value);
                }
            } else {
                r.svgGroup.setAttribute(v.name, v.value)
            }
        }
        );

        if (r instanceof GGraph) {
            r.relocate();
        }

        return r;
    } else {
        throw Error("error!");
    }
}
let timerInterval = 100;
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

export function clearSVG(id : string){
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
        HTMLFunctions.getDescendants(svgsvg).forEach(v => {
            const shapeType = ShapeObjectType.toShapeObjectType(v.nodeName);
            if (shapeType != null) {
                toSVGUnknownElement(v);
            }
        })
        const startTime = performance.now();

        HTMLFunctions.getDescendantsByPostorder(svgsvg).forEach((v) => {
            if (v instanceof SVGElement) {
                if (isGCustomElement(v)) {
                    const p = openCustomElement(v);
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
export function createShape(parent: SVGElement | string | GObject, type: "g-rect-button", option?: GOptions.GTextBoxAttributes): GRectButton
export function createShape(parent: SVGElement | string | GObject, type: "g-rect", option?: GOptions.GTextBoxAttributes): GRect
export function createShape(parent: SVGElement | string | GObject, type: "g-edge", option?: GOptions.GEdgeAttributes): GEdge
export function createShape(parent: SVGElement | string | GObject, type: "g-ellipse", option?: GOptions.GTextBoxAttributes): GEllipse
export function createShape(parent: SVGElement | string | GObject, type: "g-callout", option?: GOptions.GTextBoxAttributes): GCallout
export function createShape(parent: SVGElement | string | GObject, type: "g-circle", option?: GOptions.GTextBoxAttributes): GCircle
export function createShape(parent: SVGElement | string | GObject, type: "g-arrow-callout", option?: GOptions.GTextBoxAttributes): GArrowCallout
export function createShape(parent: SVGElement | string | GObject, type: "g-graph", option?: GOptions.GTextBoxAttributes): GGraph
export function createShape(parent: SVGElement | string | GObject, type: "g-table", option?: GTableOption): GTable
export function createShape(parent: SVGElement | string | GObject, type: "g-object", option?: GTableOption): GObject
export function createShape(parent: SVGElement | string | GObject, type: ShapeObjectType, option: any = {}): GObject {
    let _parent: SVGElement;
    if (parent instanceof GObject) {
        _parent = parent.svgGroup;
    } else if (parent instanceof SVGElement) {
        _parent = parent;
    } else {
        _parent = <any>document.getElementById(parent);
    }

    switch (type) {
        case ShapeObjectType.Callout: return new GCallout(_parent);
        case ShapeObjectType.ArrowCallout: return new GArrowCallout(_parent);
        case ShapeObjectType.Ellipse: return new GEllipse(_parent);
        case ShapeObjectType.Rect: return new GRect(_parent, option);
        case ShapeObjectType.Edge: return new GEdge(_parent, option);
        case ShapeObjectType.Graph: return new GGraph(_parent);
        case ShapeObjectType.Table: return new GTable(_parent);
        case ShapeObjectType.RectButton: return new GRectButton(_parent, option);
        case ShapeObjectType.Circle: return new GCircle(_parent);
        case ShapeObjectType.Object: return new GObject(_parent);
    }
    throw Error("error");
}

function toSVGUnknownElement(e: Element) {
    const type = ShapeObjectType.toShapeObjectTypeOrCustomTag(e.nodeName);

    if (type == null) {

    } else {
        const ns = document.createElementNS('http://www.w3.org/2000/svg', "g");
        ns.setAttribute(AttributeNames.customElement, e.nodeName);
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
        children.forEach((v) => toSVGUnknownElement(v));
    }
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
