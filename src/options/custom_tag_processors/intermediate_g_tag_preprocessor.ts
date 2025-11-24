
import * as AttributeNames from "../../common/attribute_names"
import { ShapeObjectType } from "../../common/enums";
import * as HTMLFunctions from "../../html/html_functions"

import { ZObject } from "../../objects/z_object"
import { ZCallout } from "../../objects/z_callout"
import { ZArrowCallout } from "../../objects/z_arrow_callout"
import { ZEllipse } from "../../objects/z_ellipse"
import { ZRect } from "../../objects/z_rect"
import { ZEdge } from "../../objects/z_edge"
import { ZTable, ZTableOption } from "../../objects/z_table"
import { ZGraph } from "../../objects/z_graph"
import { ZRectButton } from "../../objects/z_rect_button"
import { ZCircle } from "../../objects/z_circle";
import { ZForeignButton } from "../../objects/z_foreign_button";

/**
 * ZObjectタグをCustomGElementに変換します。
 * @param element 
 * @returns 
 */
function convertFromZTagToIntermediateSVGGTagSub(e: Element) {
    const type = ShapeObjectType.toShapeObjectTypeOrCustomTag(e.nodeName.toLowerCase());

    if (type == null) {

    } else {
        const ns = document.createElementNS('http://www.w3.org/2000/svg', "g");
        ns.setAttribute(AttributeNames.customElement, e.nodeName.toLowerCase());
        HTMLFunctions.copyAttributes(e, ns);
        ns.innerHTML = e.innerHTML;
        //HTMLFunctions.getChildren(e).forEach((v)=>ns.appendChild(v));
        const p = e.parentElement;
        if (p != null) {
            p.insertBefore(ns, e);
            e.remove();
        }
        const children = HTMLFunctions.getChildren(ns);
        children.forEach((v) => convertFromZTagToIntermediateSVGGTagSub(v));
    }
}
export function convertFromZTagToIntermediateSVGGTag(svgsvg: SVGSVGElement): void {
    HTMLFunctions.getDescendants(svgsvg).forEach(v => {
        const shapeType = ShapeObjectType.toShapeObjectType(v.nodeName.toLowerCase());
        if (shapeType != null) {
            convertFromZTagToIntermediateSVGGTagSub(v);
        }
    })

}


/**
 * CustomGElementかどうか判定します。
 * @param element 
 * @returns 
 */
function isIntermediateSVGGElement(element: SVGElement): boolean {
    const gObjectTypeAttr = element.getAttribute(AttributeNames.customElement);

    if (gObjectTypeAttr != null) {
        const gObjectType = ShapeObjectType.toShapeObjectType(gObjectTypeAttr);
        return gObjectType != null;
    } else {
        return false;
    }

}



/**
 * g-rectなどのカスタムタグをGObjectに変換します。
 * @param intermediateSVGGElement カスタムタグのElement
 * @param type 
 * @returns 
 */
function convertFromIntermediateGElementToZObject(intermediateSVGGElement: SVGGElement, type: ShapeObjectType): ZObject | null {
    const parent = intermediateSVGGElement.parentElement;
    if (parent instanceof SVGElement) {
        let r: ZObject;
        if (type == ShapeObjectType.Callout) {
            r = new ZCallout(parent, intermediateSVGGElement);
            //r.initialize(intermediateSVGGElement)
        } else if (type == ShapeObjectType.ArrowCallout) {
            r = new ZArrowCallout(parent, intermediateSVGGElement);
            //r.initialize(intermediateSVGGElement)
        } else if (type == ShapeObjectType.Ellipse) {
            r = new ZEllipse(parent, intermediateSVGGElement);
            //r.initialize(intermediateSVGGElement)
        } else if (type == ShapeObjectType.Circle) {
            r = new ZCircle(parent, intermediateSVGGElement);
            //r.initialize(intermediateSVGGElement)
        }
        else if (type == ShapeObjectType.Rect) {
            r = new ZRect(parent, intermediateSVGGElement);
            //r.initialize(intermediateSVGGElement)
        } else if (type == ShapeObjectType.Edge) {
            r = new ZEdge(parent, intermediateSVGGElement);
            //r.initialize(intermediateSVGGElement)

            //r.setOption(option);
        } else if (type == ShapeObjectType.Graph) {
            r = new ZGraph(parent, intermediateSVGGElement);
            //r.initialize(intermediateSVGGElement)
        } else if (type == ShapeObjectType.Table) {
            const table = new ZTable(parent, intermediateSVGGElement);
            //table.initialize(intermediateSVGGElement);


            r = table;

        }
        else if (type == ShapeObjectType.RectButton) {
            r = new ZRectButton(parent, intermediateSVGGElement);
            //r.initialize(intermediateSVGGElement)
        }
        else if (type == ShapeObjectType.ForeignButton) {
            r = new ZForeignButton(parent, intermediateSVGGElement);
            //r.initialize(intermediateSVGGElement)
        }
        else {
            return null;
        }


        return r;
    } else {
        throw Error("error!");
    }
}

export function processIntermediateSVGGElements(svgsvg: SVGSVGElement, output: ZObject[] | null) {
    HTMLFunctions.getDescendantsByPostorder(svgsvg).forEach((v) => {
        if (v instanceof SVGGElement) {
            if (isIntermediateSVGGElement(v)) {
                const p = convertFromIntermediateSVGGElementToZObject(v);
                if (p != null && output != null) {
                    output.push(p);
                }
            }

        }
    })

}


function convertFromIntermediateSVGGElementToZObject(id: string | SVGGElement): ZObject | null {

    if (typeof id == "string") {
        const item = document.getElementById(id);
        if (item instanceof SVGGElement) {
            return convertFromIntermediateSVGGElementToZObject(item);
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
                return convertFromIntermediateGElementToZObject(element, gObjectType);
            } else {
                return null;
            }
        } else {
            const type = ShapeObjectType.toShapeObjectType(element.nodeName.toLowerCase());

            if (type != null) {
                return convertFromIntermediateGElementToZObject(element, type);
            } else {
                return null;
            }

        }
    }
}
