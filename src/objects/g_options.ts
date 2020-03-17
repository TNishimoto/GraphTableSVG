
//import * as CSS from "../basic/svghtml/css"
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

type _GGraphAttributes = {
    allocate? : GraphAllocateFunction;
    isLatexMode?: boolean
    relocateStyle?: string
    direction?: Direction | null;
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
//}