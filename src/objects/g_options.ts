
import * as CSS from "../html/css"
//import * as AttributeNames from "../common/custtome_attributes"
import { HorizontalAnchor, VerticalAnchor, ConnectorType, PathTextAlighnment, AutoSizeShapeToFitText, Direction, EdgeType } from "../common/enums";
//import * as CSS from "../basic/html/css"
//import * as SVG from "../basic/interface/svg"
export type GraphAllocateFunction = (graph: object) => void
import {CenterPosition, UpperLeftPosition} from "../common/vline"
import * as HTMLFunctions from "../html/html_functions"
import { Debugger } from "../common/debugger";

export const timerInterval = 100;
export const unstableCounterDefault = 10;
export const unstableCounterName = "data-unstable-counter";

let updateSVGSVGTimerCounter = 0;
const timerDic : Map<string, Date> = new Map(); 
export function updateSVGSVGTimer(svgsvg: SVGSVGElement) {
    updateSVGSVGTimerCounter++;
    //console.log(`updateSVGSVGTimerCounter: ${updateSVGSVGTimerCounter}`)
    const obj = (<any>svgsvg)._gobjects;
    if (obj instanceof Map) {
        obj.forEach((value, key) => {
            const objectID : string = value.objectID;

            if (value.unstableCounter != null) {
                const oldTimex1 = new Date();
                const b = value.getUpdateFlag();
                const oldTimex2 = new Date();
                const diffx = oldTimex2.getTime() - oldTimex1.getTime();
                console.log(`X ObjectID = ${objectID}: UpdateTime = ${Math.abs(diffx) / 1000}s`);

                if (b) {
                    if(Debugger.getStopWatchFlag()){
                        const oldTime = timerDic.get(objectID);
                        if(oldTime == undefined){
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
                        if(Debugger.getDebugMode() == "ObserveUpdateFlag"){
                            if(counterNumber > unstableCounterDefault + 10){
                                throw new Error("Infinite Update Error")
                            }else{
                                value.svgGroup.setAttribute(unstableCounterName, (counterNumber + 1).toString());
                            }


                        }else{
                            value.svgGroup.setAttribute(unstableCounterName, (unstableCounterDefault).toString());
                        }
                        //const newCounter = Number.parseInt(counter) + 5;
                    }

                } else {

                    if (value.unstableCounter == 0) {
                        value.svgGroup.removeAttribute(unstableCounterName)
                        if(Debugger.getStopWatchFlag()){
                            console.log(`ObjectID = ${objectID}: Update END`);

                            const nowDate = new Date();
                            const oldDate = timerDic.get(objectID);
                            if(oldDate != undefined){
                                timerDic.delete(objectID);
                                const diff = nowDate.getTime() - oldDate.getTime();
                                console.log(`ObjectID = ${objectID}: UpdateTime = ${Math.abs(diff) / 1000}s`);
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

            }
        })
    }

    setTimeout(updateSVGSVGTimer, timerInterval, svgsvg);
}


//export namespace GOptions{
export type textClassCSS = {
    fill?: string,
    fontSize?: string,
    fontFamily?: string,
}
export type backgroundCSS = {
    fill?: string
}

export type surfaceClassCSS = {
    stroke?: string,
    strokeWidth?: string,
    fill?: string,
}
export type StrokeClassCSS = {
    stroke?: string,
    strokeWidth?: string,
}

export type GTextBoxCSS = {
    autoSizeShapeToFitText?: AutoSizeShapeToFitText,
    verticalAnchor?: VerticalAnchor,
    horizontalAnchor?: HorizontalAnchor
}

type _GTextBoxAttribute = {
    text?: string | HTMLElement[],
    /*
    isAutoSizeShapeToFitText?: boolean,
    verticalAnchor?: VerticalAnchor,
    horizontalAnchor?: HorizontalAnchor
    */
    textClass?: string | textClassCSS
    textStyle?: string | textClassCSS
}
export type _GTextBoxSVGGroupInfo = {
    class?: string | GTextBoxCSS
    style?: string | GTextBoxCSS
}
export type GTextBoxAttributesWithoutGroup = _GObjectAttributes & _GTextBoxAttribute

export type GTextBoxAttributes = GTextBoxAttributesWithoutGroup & _GTextBoxSVGGroupInfo

export type CellCSS = {
    autoSizeShapeToFitText?: AutoSizeShapeToFitText,
    verticalAnchor?: VerticalAnchor,
    horizontalAnchor?: HorizontalAnchor,
    paddingTop? : number,
    paddingLeft? : number,
    paddingRight? : number,
    paddingBottom? : number
    
    //minimumWidth? : number,
    //minimumHeight? : number,

}

export type CellAttributes = {
    class?: string | CellCSS | null;
    style?: string | CellCSS | null;
}



type _GObjectAttributes = {
    //class?: string,
    /*
    cx?: number,
    cy?: number,
    x?: number,
    y?: number,
    */
    
    position? : CenterPosition | UpperLeftPosition;
    width?: number,
    height?: number,
    id?: string,

    surfaceClass?: string | surfaceClassCSS,
    surfaceStyle?: string | surfaceClassCSS,
    attributes?: { [key: string]: string; }
    //surfaceAttributes? : { [key: string]: string; }

}
type _SVGGroupStyleInfo = {
    class?: string | object,
    style?: string | object,
}
export type BorderAttributes = {
    class?: string | StrokeClassCSS | null,
    style?: string | StrokeClassCSS | null
}
export type backgroundOption = {
    class?: string | backgroundCSS | null,
    style?: string | backgroundCSS | null    
}



export type GObjectAttributes = _GObjectAttributes & _SVGGroupStyleInfo;


export type DrawingFunctionOnURL = { url : string | null, functionName : string | null, drawingFunction : object | null }

type _GGraphAttributes = {
    allocate? : GraphAllocateFunction;
    isLatexMode?: boolean
    relocateStyle?: string
    direction?: Direction | null;
    drawingFunction? : DrawingFunctionOnURL
}
export type GGraphAttributes = _GGraphAttributes & GTextBoxAttributes; 



//// EDGE
export type GEdgeStyleCSS = {
    startMarker?: boolean,
    endMarker?: boolean,

    beginConnectorType?: ConnectorType,
    endConnectorType?: ConnectorType,
    pathTextAlignment?: PathTextAlighnment,
    edgeType? : EdgeType 
} & GTextBoxCSS

type _GAbstractEdgeAttributes = {
    x1?: number,
    x2?: number,

    y1?: number,
    y2?: number,
    beginVertex?: object | string,
    endVertex?: object | string,


}

type _GEdgeAttributes = {
    x3?: number,
    y3?: number,
}
export type ConnecterOption = {
    outcomingInsertIndex?: number,
    incomingInsertIndex?: number,
    beginConnectorType?: ConnectorType,
    endConnectorType?: ConnectorType
}


type _GEdgeSVGGroupInfo = {
    class?: string | GEdgeStyleCSS
    style?: string | GEdgeStyleCSS
}

export type GAbstractEdgeAttributes = _GAbstractEdgeAttributes & _GEdgeSVGGroupInfo
export type GAbstractTextEdgeAttributes = _GTextBoxAttribute & GAbstractEdgeAttributes;
export type GEdgeAttributes = GAbstractTextEdgeAttributes & _GEdgeAttributes 


export function setClassAndStyle(svg: SVGElement, className: string | object | undefined | null, style : string | object |undefined | null) {
    if(typeof(className) == "string"){
        svg.setAttribute("class", className);
    }else if(className === undefined){
    }else if(className === null){
        svg.removeAttribute("class")
    }else{
        svg.setAttribute("class", CSS.buildClassNameFromSurfaceClassCSS(className));
    }


    if(typeof(style) == "string"){
        svg.setAttribute("style", style);
    }else if(style === undefined){
    }else if(style === null){
        svg.removeAttribute("style")
    }else{
        const cssString = CSS.createCSSString(style);
        svg.setAttribute("style", cssString === undefined ? "" : cssString );
    }

    
}


//}