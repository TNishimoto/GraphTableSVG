
//import * as CSS from "../basic/svghtml/css"
//import * as AttributeNames from "../basic/common/custtome_attributes"
import { HorizontalAnchor, VerticalAnchor, ConnectorPosition, PathTextAlighnment, AutoSizeShapeToFitText } from "../basic/common/enums";

//export namespace GOptions{
    export type textClassCSS = {
        fill? : string,
        fontSize? : string,
        fontFamily? : string,
    }
    export type surfaceClassCSS = {
        stroke? : string,
        strokeWidth? : string,
        fill? : string,
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

    export type _GObjectAttributes = {
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
    export type _SVGGroupStyleInfo = {
        class?: string | object,
        style?: string | object,
    }
    
    
    export type GObjectAttributes = _GObjectAttributes & _SVGGroupStyleInfo;

    export type _GTextBoxAttribute = {
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
        class? : string | GTextBoxCSS
        style? : string | GTextBoxCSS 
    }
    export type GTextBoxAttributesWithoutGroup = _GObjectAttributes & _GTextBoxAttribute

    export type GTextBoxAttributes = GTextBoxAttributesWithoutGroup & _GTextBoxSVGGroupInfo

//}