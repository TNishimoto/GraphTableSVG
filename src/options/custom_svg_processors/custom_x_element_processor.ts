
import * as AttributeNames from "../../common/attribute_names"
import { ShapeObjectType } from "../../common/enums";
import * as HTMLFunctions from "../../html/html_functions"
import * as HTMLTable from "../html_table"
import * as GUIObserver from "../../html/gui_observer"

import { GObject } from "../../objects/z_object"
import { GCallout } from "../../objects/z_callout"
import { GArrowCallout } from "../../objects/z_arrow_callout"
import { GEllipse } from "../../objects/z_ellipse"
import { GRect } from "../../objects/z_rect"
import { GEdge } from "../../objects/z_edge"
import { GTable, GTableOption } from "../../objects/z_table"
import { GGraph } from "../../objects/z_graph"
import { GRectButton } from "../../objects/z_rect_button"
import { GCircle } from "../../objects/z_circle";
import * as ElementExtension from "../../interfaces/element_extension"
import { LogicTable } from "../../logics";
import { NullError } from "../../common/exceptions";
import { appendVBAButton } from "../vba_macro_modal";
import { GForeignButton } from "../../objects/z_foreign_button";
import { convertAttributesIntoTableOption, TableOptionReteral } from "../../logics/gobject_reterals";


/**
 * CustomGElementかどうか判定します。
 * @param element 
 * @returns 
 */
export function isElementWithCustomElementAttribute(element: SVGElement): boolean {
    const gObjectTypeAttr = element.getAttribute(AttributeNames.customElement);

    if (gObjectTypeAttr != null) {
        const gObjectType = ShapeObjectType.toShapeObjectType(gObjectTypeAttr);
        return gObjectType != null;
    } else {
        return false;
    }

}
/**
 * GObjectタグをCustomGElementに変換します。
 * @param element 
 * @returns 
 */
export function convertFromElementToSVGGElementWithCustomElementAttribute(e: Element) {
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
            const table = new GTable(parent);

            if(logicTable != null){
                //logicTable.option = convertAttributesIntoTableOption(node);
                table.buildFromLogicTable(logicTable);
            }else{
                const option = convertAttributesIntoTableOption(node);
                table.assignOption(option);
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
