

import * as AttributeNames from "../../common/attribute_names"
import { MacroTagNames, ShapeObjectType } from "../../common/enums";
import * as HTMLFunctions from "../../html/html_functions"



/**
 * CustomGElementかどうか判定します。
 * @param element 
 * @returns 
 */
/*
 export function isMacroTag(element: Element): MacroTagNames | null {
    const gObjectTypeAttr = element.getAttribute(AttributeNames.customElement);

    if (gObjectTypeAttr != null) {
        const gObjectType = ShapeObjectType.toShapeObjectType(gObjectTypeAttr);
        return gObjectType != null;
    } else {
        return false;
    }

}
*/

function processMacroNodeTag(e: Element, depth: number, output: HTMLUnknownElement[]): void {
    const newNode : HTMLUnknownElement = document.createElement(ShapeObjectType.Ellipse)
    //newNode.setAttribute(AttributeNames.customElement, ShapeObjectType.Ellipse);
    HTMLFunctions.copyAttributes(e, newNode);
    output.push(newNode);
    newNode.setAttribute("data-depth", depth.toString());
    newNode.setAttribute("data-x", output.length.toString());
    console.log(e);

    while (e.children.length > 0) {
        const child = e.children.item(0);
        if (child != null) {
            if (child.nodeName.toLowerCase() == MacroTagNames.Node) {
                processMacroNodeTag(child, depth + 1, output);
            } else {
                newNode.appendChild(child);
            }
        }

    }
    e.remove();
}


function processMacroTreeTag(e: Element): HTMLUnknownElement {
    const newNode : HTMLUnknownElement = document.createElement(ShapeObjectType.Graph)
    newNode.setAttribute(AttributeNames.customElement, ShapeObjectType.Graph);
    HTMLFunctions.copyAttributes(e, newNode);

    const output: HTMLUnknownElement[] = new Array();
    while (e.children.length > 0) {
        const child = e.children.item(0);
        if (child != null) {
            if (child.nodeName.toLowerCase() == MacroTagNames.Node) {
                processMacroNodeTag(child, 0, output);
            } else {
                child.remove();
            }
        }
    }
    output.forEach((v) => {
        newNode.appendChild(v);
    })
    return newNode;

}

export function processMacroTag(svgsvg: SVGSVGElement) {

    while (true) {
        const trees = svgsvg.getElementsByTagName(MacroTagNames.Tree);
        if (trees.length > 0) {
            const mtreeTag = trees.item(0);
            if (mtreeTag != null) {
                console.log(mtreeTag);

                const intermediateGElement = processMacroTreeTag(mtreeTag)
                svgsvg.insertBefore(intermediateGElement, mtreeTag);
                mtreeTag.remove();

            }


        } else {
            break;
        }



    }

}
