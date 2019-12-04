

import { HorizontalAnchor, VerticalAnchor, ConnectorPosition, Direction, PathTextAlighnment} from "../basic/common/enums";
import { LogicTable } from "../options/logic_table"

import { GVertex } from "../object/g_vertex"
    export type GObjectAttributes = {
        //class?: string,
        cx?: number,
        cy?: number,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        id?: string,
        class?: string,
        surfaceClass?: string,
        style?: string,
        surfaceStyle?: string

    }
    export type GObjectMaps = {
        groupAttributes?: Map<string, string>;
        surfaceAttributes?: Map<string, string>;
        textAttributes?: Map<string, string>;
    }

    export type _GTextBoxAttribute = {
        text?: string | HTMLElement[],
        isAutoSizeShapeToFitText?: boolean,
        verticalAnchor?: VerticalAnchor,
        horizontalAnchor?: HorizontalAnchor
        textClass?: string
        textStyle?: string
    }
    export type GTextBoxAttributes = GObjectAttributes & _GTextBoxAttribute

    export type _GShapeArrowCalloutAttributes = {
        arrowHeadWidth?: number,
        arrowHeadHeight?: number,
        arrowNeckWidth?: number,
        arrowNeckHeight?: number,
        direction?: Direction
    }

    export type GShapeArrowCalloutAttributes = GTextBoxAttributes & _GShapeArrowCalloutAttributes
    export type GCalloutAttributes = GTextBoxAttributes & {
        speakerX?: number,
        speakerY?: number,
    }
    export type _GEdgeAttributes = {
        startMarker?: boolean,
        endMarker?: boolean,
        x1?: number,
        x2?: number,
        x3?: number,

        y1?: number,
        y2?: number,
        y3?: number,

        beginConnectorType?: ConnectorPosition,
        endConnectorType?: ConnectorPosition,
        beginVertex?: GVertex | string,
        endVertex?: GVertex | string,
        pathTextAlignment?: PathTextAlighnment
    }
    export type GEdgeAttributes = GTextBoxAttributes & _GEdgeAttributes
    export type CellOption = {
        cellClass?: string,
        borderClass?: string
    }

    export type ConnectOption = {
        outcomingInsertIndex?: number,
        incomingInsertIndex?: number,
        beginConnectorType?: ConnectorPosition,
        endConnectorType?: ConnectorPosition
    }
    export type _GTableOption = {
        rowCount?: number,
        columnCount?: number,
        rowHeight?: number,
        columnWidth?: number,
        table?: LogicTable
    }
    export type GTableOption = GObjectAttributes & _GTableOption;

    /*
    export namespace ShapeAttributes{
        export function constructTextBoxShapeAttributes(e : SVGElement, 
            removeAttributes : boolean = false, output : TextBoxShapeAttributes = {}) : TextBoxShapeAttributes {        
            output.className = e.getAttribute("class")
            output.cx = e.gtGetAttributeNumber("cx", 0);
            output.cy = e.gtGetAttributeNumber("cy", 0);
            output.text = e.getAttribute("text");
            output.width = e.gtGetAttributeNumber("width", 100);
            output.height = e.gtGetAttributeNumber("height", 100);
    
            output.isAutoSizeShapeToFitText = e.getPropertyStyleValueWithDefault(Vertex.autoSizeShapeToFitTextName, "false") == "true";
    
            if(removeAttributes){
                e.removeAttribute("cx");
                e.removeAttribute("cy");
                e.removeAttribute("class");
                e.removeAttribute("text");
                e.removeAttribute("width");
                e.removeAttribute("height");
                e.style.removeProperty(Vertex.autoSizeShapeToFitTextName);
            }
            return output;
        }
        
    }
    */

