

import { DefaultClassNames } from "../../common";
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

let _id_count = 1;
function getNewID(e : Element) : string {
    while(true){
        const id = `__${e.nodeName.toLowerCase()}_${_id_count++}`;
        if(document.getElementById(id) == null){
            return id;
        }
    }
}
function isMacroVertex(e : Element) : MacroTagNames | null {
    if(e.nodeName.toLowerCase() == MacroTagNames.Circle){
        return MacroTagNames.Circle;
    }else if(e.nodeName.toLowerCase() == MacroTagNames.Ellipse){
        return MacroTagNames.Ellipse;
    }else if(e.nodeName.toLowerCase() == MacroTagNames.Rect){
        return MacroTagNames.Rect;
    }else{
        return null;
    }
}
function createUnknownElement(e : Element) : HTMLUnknownElement | null {
    if(e.nodeName.toLowerCase() == MacroTagNames.Circle){
        return document.createElement(ShapeObjectType.Circle);
    }else if(e.nodeName.toLowerCase() == MacroTagNames.Ellipse){
        return document.createElement(ShapeObjectType.Ellipse)
    }else if(e.nodeName.toLowerCase() == MacroTagNames.Rect){
        return document.createElement(ShapeObjectType.Rect)
    }else{
        return null;
    }
}

function processMacroNodeTag(e: Element, parent : HTMLUnknownElement | null, depth: number, outputVertexes: HTMLUnknownElement[], outputEdges: HTMLUnknownElement[]): void {
    const newNode : HTMLUnknownElement = <HTMLUnknownElement>createUnknownElement(e);
    //newNode.setAttribute(AttributeNames.customElement, ShapeObjectType.Ellipse);
    HTMLFunctions.copyAttributes(e, newNode);
    outputVertexes.push(newNode);    
    newNode.setAttribute("data-depth", depth.toString());
    newNode.setAttribute("data-x", outputVertexes.length.toString());
    newNode.setAttribute("cy", ((depth + 1) * 50).toString() );
    newNode.setAttribute("id", getNewID(newNode));

    if(parent != null){
        const newEdge : HTMLUnknownElement = document.createElement(ShapeObjectType.Edge)
        outputEdges.push(newEdge);
        newEdge.setAttribute("id", getNewID(newEdge));
        newEdge.setAttribute(AttributeNames.beginVertex, parent.getAttribute("id")!);
        newEdge.setAttribute(AttributeNames.endVertex, newNode.getAttribute("id")!);


    }


    while (e.children.length > 0) {
        const child = e.children.item(0);
        if (child != null) {
            if (isMacroVertex(child) != null ) {
                processMacroNodeTag(child, newNode, depth + 1, outputVertexes, outputEdges);
            } else {
                newNode.appendChild(child);
            }
        }

    }
    e.remove();
}


function processMacroTreeTag(e: Element): HTMLUnknownElement {
    const graphTag : HTMLUnknownElement = document.createElement(ShapeObjectType.Graph)
    graphTag.setAttribute(AttributeNames.customElement, ShapeObjectType.Graph);
    HTMLFunctions.copyAttributes(e, graphTag);
    if(graphTag.getAttribute("class") == null){
        graphTag.setAttribute("class", DefaultClassNames.defaultTreeClass);
    }

    const outputVertexes: HTMLUnknownElement[] = new Array();
    const outputEdges: HTMLUnknownElement[] = new Array();
    while (e.children.length > 0) {
        const child = e.children.item(0);
        if (child != null) {
            if (isMacroVertex(child)) {
                processMacroNodeTag(child, null, 0, outputVertexes, outputEdges);
            } else {
                child.remove();
            }
        }
    }
    outputVertexes.forEach((v) => {
        graphTag.appendChild(v);
    })
    outputEdges.forEach((v) => {
        graphTag.appendChild(v);
    })

    return graphTag;

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
