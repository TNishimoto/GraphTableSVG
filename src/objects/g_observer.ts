
export type GraphAllocateFunction = (graph: object) => void
import { Debugger } from "../common/debugger";
import { nearlyEqual, round100 } from "../common/vline";


export const timerInterval = 100;
export const unstableCounterDefault = 10;
export const unstableCounterName = "data-unstable-counter";

let updateSVGSVGTimerCounter = 0;
const timerDic: Map<string, Date> = new Map();

export const svgTextBBoxWidthName = "data-bbox-width";
export const svgTextBBoxHeightName = "data-bbox-height";
export const svgTextBBoxStableName = "data-bbox-stable";


export function updateText(svgText: SVGTextElement) {
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

    const stableFlag = svgText.getAttribute(svgTextBBoxStableName);
    if (b) {
        if (stableFlag != "false") {
            svgText.setAttribute(svgTextBBoxStableName, "false");
        }
    } else {
        if (stableFlag == "false") {
            svgText.setAttribute(svgTextBBoxStableName, "true");
        }
    }
}
export function textObserveTimer(svgsvg: SVGSVGElement) {
    const obj = (<any>svgsvg)._gobjects;
    if (obj instanceof Map) {
        obj.forEach((value, key) => {
            const svgText = value.svgText;
            if(svgText instanceof SVGTextElement){
                updateText(svgText);
            }
        })

    }

    //AAAAAAAAAAAAAAAAAAAA
}

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
        /*
        const descendants = HTMLFunctions.getDescendants(value.svgGroup);
        descendants.forEach((v) => {
            if (v.hasAttribute(unstableCounterName)) {
                v.removeAttribute(unstableCounterName);
            }
        })
        */
    } else {
        value.svgGroup.setAttribute(unstableCounterName, (value.unstableCounter - 1).toString());
    }
}



export function registerGObject(svgsvg: SVGSVGElement, obj: Object, objectID: string) {
    if ((<any>svgsvg)._gobjects === undefined) {
        (<any>svgsvg)._gobjects = new Map<string, Object>();

        setTimeout(updateSVGSVGTimer, timerInterval, svgsvg);

    }

    const map: Map<string, Object> = (<any>svgsvg)._gobjects;
    if (map instanceof Map) {
        map.set(objectID, obj);

    }

}

export function updateSVGSVGTimer(svgsvg: SVGSVGElement) {
    updateSVGSVGTimerCounter++;
    textObserveTimer(svgsvg);
    //console.log(`updateSVGSVGTimerCounter: ${updateSVGSVGTimerCounter}`)
    const obj = (<any>svgsvg)._gobjects;
    if (obj instanceof Map) {
        obj.forEach((value, key) => {
            const objectID: string = value.objectID;

            if (value.unstableCounter != null) {
                const oldTimex1 = new Date();
                const b = value.getUpdateFlag();
                const oldTimex2 = new Date();
                const diffx = oldTimex2.getTime() - oldTimex1.getTime();
                console.log(`X ObjectID = ${objectID}: UpdateTime = ${Math.abs(diffx) / 1000}s`);

                if (b) {
                    if (Debugger.getStopWatchFlag()) {
                        const oldTime = timerDic.get(objectID);
                        if (oldTime == undefined) {
                            console.log(`ObjectID = ${objectID}: Update Start`);
                            timerDic.set(objectID, new Date());
                        }
                    }

                    Debugger.updateFlagLog(value, updateSVGSVGTimer, `${value.type} ${key}, ${value.unstableCounter} ${b}`)

                    value.update();
                    Debugger.updateFlagLog(value, updateSVGSVGTimer, `Update`)


                    const counter = value.svgGroup.getAttribute(unstableCounterName);
                    if (counter == null) {
                        value.svgGroup.setAttribute(unstableCounterName, (unstableCounterDefault).toString());

                    } else {
                        const counterNumber = Number.parseInt(counter);
                        if (Debugger.getDebugMode() == "ObserveUpdateFlag") {
                            if (counterNumber > unstableCounterDefault + 10) {
                                throw new Error("Infinite Update Error")
                            } else {
                                value.svgGroup.setAttribute(unstableCounterName, (counterNumber + 1).toString());
                            }


                        } else {
                            value.svgGroup.setAttribute(unstableCounterName, (unstableCounterDefault).toString());
                        }
                        //const newCounter = Number.parseInt(counter) + 5;
                    }

                } else {
                    decrementUnstableCounter(value);

                }

            }
        })
    }

    setTimeout(updateSVGSVGTimer, timerInterval, svgsvg);
}
