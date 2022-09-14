
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

//export namespace openSVGFunctions {

//}
let timerInterval = 100;

function isElementWithCustomElementAttribute(element: SVGElement): boolean {
    const gObjectTypeAttr = element.getAttribute(AttributeNames.customElement);

    if (gObjectTypeAttr != null) {
        const gObjectType = ShapeObjectType.toShapeObjectType(gObjectTypeAttr);
        return gObjectType != null;
    } else {
        return false;
    }

}
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
export function convertFromElementWithCustomElementAttributeToGObject(id: string | SVGElement): GObject | null {

    if (typeof id == "string") {
        const item = document.getElementById(id);
        if (item instanceof SVGElement) {
            return convertFromElementWithCustomElementAttributeToGObject(item);
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
                return convertFromElementToGObject(element, gObjectType);
            } else {
                return null;
            }
        } else {
            const type = ShapeObjectType.toShapeObjectType(element.nodeName);

            if (type != null) {
                return convertFromElementToGObject(element, type);
            } else {
                return null;
            }

        }
    }
}

/**
 * g-rectなどのカスタムタグをGObjectに変換します。
 * @param node カスタムタグのElement
 * @param type 
 * @returns 
 */
function convertFromElementToGObject(node: SVGElement, type: ShapeObjectType): GObject | null {
    const parent = node.parentElement;
    if (parent instanceof SVGElement) {
        let r: GObject;

        node.removeAttribute(AttributeNames.customElement);
        if (type == ShapeObjectType.Callout) {
            const option = GCallout.constructAttributes(node, true);
            r = new GCallout(parent);
            r.setOption(option);
        } else if (type == ShapeObjectType.ArrowCallout) {
            const option = GArrowCallout.constructAttributes(node, true);
            r = new GArrowCallout(parent);
            r.setOption(option);
        } else if (type == ShapeObjectType.Ellipse) {
            const option = GEllipse.constructAttributes(node, true);
            r = new GEllipse(parent);
            r.setOption(option);
        } else if (type == ShapeObjectType.Circle) {
            const option = GCircle.constructAttributes(node, true);
            r = new GCircle(parent);
            r.setOption(option);
        }
        else if (type == ShapeObjectType.Rect) {
            const option = GRect.constructAttributes(node, true);
            r = new GRect(parent);
            r.setOption(option);



        } else if (type == ShapeObjectType.Edge) {
            const option = GEdge.constructAttributes(node, true);
            r = new GEdge(parent);
            r.setOption(option);
        } else if (type == ShapeObjectType.Graph) {
            const option = GGraph.constructAttributes(node, true, {}, "center");
            r = new GGraph(parent);
            r.setOption(option);
            //(<GGraph>r).relocate();
        } else if (type == ShapeObjectType.Table) {
            const logicTable = LogicTable.constructLogicTable(node);
            const option : GTableOption = GTable.constructAttributes(node, true);
            if(logicTable != null){
                option.rowCount = logicTable.rowCount;
                option.columnCount = logicTable.columnCount

            }

            const table = new GTable(parent);
            table.setOption(option);
            if (logicTable !== null) {
                table.buildFromLogicTable(logicTable);
            }


            r = table;

        }
        else if (type == ShapeObjectType.RectButton) {
            const option = GRectButton.constructAttributes(node, true);
            r = new GRectButton(parent);
            r.setOption(option);
        }
        else if (type == ShapeObjectType.ForeignButton) {
            const option = GRectButton.constructAttributes(node, true);
            r = new GForeignButton(parent);
            r.setOption(option);
        }

        else {
            return null;
        }

        //属性の移動と元オブジェクトの削除
        const attrs = ElementExtension.gtGetAttributes(node);
        HTMLFunctions.getChildren(node).forEach((v) => r.svgGroup.appendChild(v));
        node.remove();
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
                if (isElementWithCustomElementAttribute(v)) {
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
function convertFromElementToSVGGElementWithCustomElementAttribute(e: Element) {
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
        children.forEach((v) => convertFromElementToSVGGElementWithCustomElementAttribute(v));
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
