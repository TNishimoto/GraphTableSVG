
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
import * as ElementExtension from "../../interfaces/element_extension"
import { LogicTable } from "../../logics";
import { ZForeignButton } from "../../objects/z_foreign_button";
import { convertAttributesIntoTableOption, TableOptionReteral } from "../../logics/gobject_reterals";

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
        console.log(shapeType);
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
 function convertFromIntermediateGElementToZObject(intermediateSVGGElement: SVGElement, type: ShapeObjectType): ZObject | null {
    const parent = intermediateSVGGElement.parentElement;
    if (parent instanceof SVGElement) {
        let r: ZObject;

        intermediateSVGGElement.removeAttribute(AttributeNames.customElement);
        if (type == ShapeObjectType.Callout) {
            const option = ZCallout.constructAttributes(intermediateSVGGElement, true);
            r = new ZCallout(parent);
            r.setOption(option);
        } else if (type == ShapeObjectType.ArrowCallout) {
            const option = ZArrowCallout.constructAttributes(intermediateSVGGElement, true);
            r = new ZArrowCallout(parent);
            r.setOption(option);
        } else if (type == ShapeObjectType.Ellipse) {
            const option = ZEllipse.constructAttributes(intermediateSVGGElement, true);
            r = new ZEllipse(parent);
            r.setOption(option);
        } else if (type == ShapeObjectType.Circle) {
            const option = ZCircle.constructAttributes(intermediateSVGGElement, true);
            r = new ZCircle(parent);
            r.setOption(option);
        }
        else if (type == ShapeObjectType.Rect) {
            const option = ZRect.constructAttributes(intermediateSVGGElement, true);
            r = new ZRect(parent);
            r.setOption(option);



        } else if (type == ShapeObjectType.Edge) {
            const option = ZEdge.constructAttributes(intermediateSVGGElement, true);
            r = new ZEdge(parent);
            r.setOption(option);
        } else if (type == ShapeObjectType.Graph) {
            const option = ZGraph.constructAttributes(intermediateSVGGElement, true, {}, "center");
            r = new ZGraph(parent);
            r.setOption(option);
            //(<ZGraph>r).relocate();
        } else if (type == ShapeObjectType.Table) {
            const logicTable = LogicTable.constructLogicTable(intermediateSVGGElement);
            const table = new ZTable(parent);

            if(logicTable != null){
                //logicTable.option = convertAttributesIntoTableOption(node);
                table.buildFromLogicTable(logicTable);
            }else{
                const option = convertAttributesIntoTableOption(intermediateSVGGElement);
                table.assignOption(option);
            }


            r = table;

        }
        else if (type == ShapeObjectType.RectButton) {
            const option = ZRectButton.constructAttributes(intermediateSVGGElement, true);
            r = new ZRectButton(parent);
            r.setOption(option);
        }
        else if (type == ShapeObjectType.ForeignButton) {
            const option = ZRectButton.constructAttributes(intermediateSVGGElement, true);
            r = new ZForeignButton(parent);
            r.setOption(option);
        }

        else {
            return null;
        }

        //属性の移動と元オブジェクトの削除
        const attrs = ElementExtension.gtGetAttributes(intermediateSVGGElement);
        HTMLFunctions.getChildren(intermediateSVGGElement).forEach((v) => r.svgGroup.appendChild(v));
        intermediateSVGGElement.remove();
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

        if (r instanceof ZGraph) {
            r.relocate();
        }

        return r;
    } else {
        throw Error("error!");
    }
}

export function processIntermediateSVGGElements(svgsvg: SVGSVGElement, output : ZObject[] | null) {
    HTMLFunctions.getDescendantsByPostorder(svgsvg).forEach((v) => {
        if (v instanceof SVGElement) {
            if ( isIntermediateSVGGElement(v)) {
                const p = convertFromIntermediateSVGGElementToZObject(v);
                if (p != null && output != null) {
                    output.push(p);
                }
            }

        }
    })

}


function convertFromIntermediateSVGGElementToZObject(id: string | SVGElement): ZObject | null {

    if (typeof id == "string") {
        const item = document.getElementById(id);
        if (item instanceof SVGElement) {
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
