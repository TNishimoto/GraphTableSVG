
export type GraphAllocateFunction = (graph: object) => void
import { objectIDName, ObjectStableFlagName, svgPathLenName, svgTextBBoxWidthName, svgTextBBoxHeightName } from "../common/attribute_names";
import { nearlyEqual, round100 } from "../common/vline";



export const timerInterval = 100;
//export const unstableCounterDefault = 10;
//export const unstableCounterName = "data-unstable-counter";

const timerDic: Map<string, Date> = new Map();



function bubbleFalse(obj : SVGElement){
    const objectID = obj.getAttribute(objectIDName);
    if(objectID != null){
        const attr = obj.getAttribute(ObjectStableFlagName);
        if(attr != "false"){
            obj.setAttribute(ObjectStableFlagName, "false");
        }
    }

    const parent = obj.parentElement;
    if(parent instanceof SVGElement){
        if(!(parent instanceof SVGSVGElement)){
            bubbleFalse(parent);
        }
    }
}

export function updatePathByTimer(svgPath: SVGPathElement) : boolean {
    const pathLen = round100(svgPath.getTotalLength());

    let b = false;
    let prevPathLen = 0;

    if (svgPath.hasAttribute(svgPathLenName)) {
        prevPathLen = Number.parseFloat(svgPath.getAttribute(svgPathLenName)!)
        if (!nearlyEqual(prevPathLen, pathLen)) {
            svgPath.setAttribute(svgPathLenName, pathLen.toString());
            b = true;
        }

    } else {
        svgPath.setAttribute(svgPathLenName, pathLen.toString());
        b = true;
    }


    const stableFlag = svgPath.getAttribute(ObjectStableFlagName);
    if (b) {
        bubbleFalse(svgPath);
    } else {
        if (stableFlag == "false") {
            svgPath.setAttribute(ObjectStableFlagName, "true");
        }
    }
    return b;
}


export function updateTextByTimer(svgText: SVGTextElement) {
    const bbox = svgText.getBBox();
    const width = round100(bbox.width);
    const height = round100(bbox.height);
    
    let b = false;
    let prevWidth = 0;
    let prevHeight = 0;

    


    if (svgText.hasAttribute(svgTextBBoxWidthName)) {
        prevWidth = Number.parseFloat(svgText.getAttribute(svgTextBBoxWidthName)!)
        if (!nearlyEqual(prevWidth, width)) {
            svgText.setAttribute(svgTextBBoxWidthName, width.toString());
            b = true;
        }

    } else {
        svgText.setAttribute(svgTextBBoxWidthName, width.toString());
        b = true;
    }

    if (svgText.hasAttribute(svgTextBBoxHeightName)) {
        prevHeight = Number.parseFloat(svgText.getAttribute(svgTextBBoxHeightName)!)
        if (!nearlyEqual(prevHeight, height)) {
            svgText.setAttribute(svgTextBBoxHeightName, height.toString());
            b = true;
        }

    } else {
        svgText.setAttribute(svgTextBBoxHeightName, height.toString());
        b = true;
    }

    const stableFlag = svgText.getAttribute(ObjectStableFlagName);
    if (b) {
        bubbleFalse(svgText);
    } else {
        if (stableFlag == "false") {
            svgText.setAttribute(ObjectStableFlagName, "true");
        }
    }
}



