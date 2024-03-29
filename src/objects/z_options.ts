
import * as CSS from "../html/css"
//import * as AttributeNames from "../common/custtome_attributes"
import { HorizontalAnchor, VerticalAnchor, ConnectorType, PathTextAlighnment, AutoSizeShapeToFitText, Direction, EdgeType } from "../common/enums";
//import * as CSS from "../basic/html/css"
//import * as SVG from "../basic/interface/svg"
export type GraphAllocateFunction = (graph: object) => void
import {CenterPosition, UpperLeftPosition} from "../common/vline"
import * as HTMLFunctions from "../html/html_functions"
import { Debugger } from "../common/debugger";



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

export type ZTextBoxCSS = {
    autoSizeShapeToFitText?: AutoSizeShapeToFitText,
    verticalAnchor?: VerticalAnchor,
    horizontalAnchor?: HorizontalAnchor
}

type _ZTextBoxAttribute = {
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
    class?: string | ZTextBoxCSS
    style?: string | ZTextBoxCSS
}
export type ZTextBoxAttributesWithoutGroup = _ZObjectAttributes & _ZTextBoxAttribute

export type ZTextBoxAttributes = ZTextBoxAttributesWithoutGroup & _GTextBoxSVGGroupInfo

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



type _ZObjectAttributes = {
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



export type ZObjectAttributes = _ZObjectAttributes & _SVGGroupStyleInfo;


export type DrawingFunctionOnURL = { url : string | null, functionName : string | null, drawingFunction : object | null }

type _ZGraphAttributes = {
    allocate? : GraphAllocateFunction;
    isLatexMode?: boolean
    relocateStyle?: string
    direction?: Direction | null;
    drawingFunction? : DrawingFunctionOnURL
}
export type ZGraphAttributes = _ZGraphAttributes & ZTextBoxAttributes; 



//// EDGE
export type ZEdgeStyleCSS = {
    startMarker?: boolean,
    endMarker?: boolean,

    beginConnectorType?: ConnectorType,
    endConnectorType?: ConnectorType,
    pathTextAlignment?: PathTextAlighnment,
    edgeType? : EdgeType 
} & ZTextBoxCSS

type _ZAbstractEdgeAttributes = {
    x1?: number,
    x2?: number,

    y1?: number,
    y2?: number,
    beginVertex?: object | string,
    endVertex?: object | string,


}

type _ZEdgeAttributes = {
    x3?: number,
    y3?: number,
}
export type ConnecterOption = {
    outcomingInsertIndex?: number,
    incomingInsertIndex?: number,
    beginConnectorType?: ConnectorType,
    endConnectorType?: ConnectorType
}


type _ZEdgeSVGGroupInfo = {
    class?: string | ZEdgeStyleCSS
    style?: string | ZEdgeStyleCSS
}

export type ZAbstractEdgeAttributes = _ZAbstractEdgeAttributes & _ZEdgeSVGGroupInfo
export type ZAbstractTextEdgeAttributes = _ZTextBoxAttribute & ZAbstractEdgeAttributes;
export type ZEdgeAttributes = ZAbstractTextEdgeAttributes & _ZEdgeAttributes 


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