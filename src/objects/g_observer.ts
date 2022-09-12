
export type GraphAllocateFunction = (graph: object) => void
import { objectIDName } from "../common/attribute_names";
import { Debugger } from "../common/debugger";
import { nearlyEqual, round100 } from "../common/vline";
import {IObject, ITextBox} from "./i_object"


export const timerInterval = 100;
//export const unstableCounterDefault = 10;
//export const unstableCounterName = "data-unstable-counter";

const timerDic: Map<string, Date> = new Map();

export const svgTextBBoxWidthName = "data-bbox-width";
export const svgTextBBoxHeightName = "data-bbox-height";
export const svgPathLenName = "data-path-length";

export const ObjectStableFlagName = "data-stable-flag";


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
/*
export function decrementUnstableCounter(value: any) {
    const objectID: string | undefined = value.objectID;
    if (value.unstableCounter == 0) {
        value.svgGroup.removeAttribute(unstableCounterName)
        if (Debugger.getStopWatchFlag()) {
            console.log(`ObjectID = ${objectID}: Update END`);

            const nowDate = new Date();
            if (objectID != undefined) {
                const oldDate = timerDic.get(objectID);
                if (oldDate != undefined) {
                    timerDic.delete(objectID);
                    const diff = nowDate.getTime() - oldDate.getTime();
                    console.log(`ObjectID = ${objectID}: UpdateTime = ${Math.abs(diff) / 1000}s`);
                }
            }
        }
        
        const descendants = HTMLFunctions.getDescendants(value.svgGroup);
        descendants.forEach((v) => {
            if (v.hasAttribute(unstableCounterName)) {
                v.removeAttribute(unstableCounterName);
            }
        })
        
    } else {
        value.svgGroup.setAttribute(unstableCounterName, (value.unstableCounter - 1).toString());
    }
}
*/




