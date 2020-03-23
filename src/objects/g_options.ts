
import * as CSS from "../html/css"
//import * as AttributeNames from "../common/custtome_attributes"
import { HorizontalAnchor, VerticalAnchor, ConnectorPosition, PathTextAlighnment, AutoSizeShapeToFitText, Direction } from "../common/enums";
//import * as CSS from "../basic/html/css"
//import * as SVG from "../basic/interface/svg"
export type GraphAllocateFunction = (graph: object) => void


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
export type GEdgeStyleCSS = {
    beginConnectorType?: ConnectorPosition,
    endConnectorType?: ConnectorPosition,
    pathTextAlignment?: PathTextAlighnment
} & GTextBoxCSS
export type CellAttributes = {
    class?: string | GTextBoxCSS | null;
    style?: string | GTextBoxCSS | null;
}



type _GObjectAttributes = {
    //class?: string,
    cx?: number,
    cy?: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    id?: string,

    surfaceClass?: string | surfaceClassCSS,
    surfaceStyle?: string | surfaceClassCSS

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
export type DrawingFunctionOnURL = { url : string | null, functionName : string | null, drawingFunction : object | null }

type _GGraphAttributes = {
    allocate? : GraphAllocateFunction;
    isLatexMode?: boolean
    relocateStyle?: string
    direction?: Direction | null;
    drawingFunction? : DrawingFunctionOnURL
}
export type GGraphAttributes = _GGraphAttributes & GTextBoxAttributes; 


type _GEdgeAttributes = {
    x1?: number,
    x2?: number,
    x3?: number,

    y1?: number,
    y2?: number,
    y3?: number,

    //beginConnectorType?: ConnectorPosition,
    //endConnectorType?: ConnectorPosition,
    startMarker?: boolean,
    endMarker?: boolean,
    beginVertex?: object | string,
    endVertex?: object | string,
    //pathTextAlignment?: PathTextAlighnment
}
type _GEdgeSVGGroupInfo = {
    class?: string | GEdgeStyleCSS
    style?: string | GEdgeStyleCSS
}
export type GEdgeAttributes = GTextBoxAttributesWithoutGroup & _GEdgeAttributes & _GEdgeSVGGroupInfo
export type ConnectOption = {
    outcomingInsertIndex?: number,
    incomingInsertIndex?: number,
    beginConnectorType?: ConnectorPosition,
    endConnectorType?: ConnectorPosition
}


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
        console.log(cssString);
        svg.setAttribute("style", cssString === undefined ? "" : cssString );
    }

}

//}