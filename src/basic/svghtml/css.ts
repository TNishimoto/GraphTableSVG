
import { CustomAttributeNames } from "../common/custtome_attributes"
import { HorizontalAnchor, VerticalAnchor } from "../common/enums";
export namespace Common {
    export function createCSS(): string {

        const r = `
            .${CustomAttributeNames.cellEmphasisCellClass}{
            fill : yellow !important;
            }
            .${CustomAttributeNames.cellEmphasisBorderClass}{
            stroke : red !important;
            }
            .${CustomAttributeNames.StyleValue.defaultCellClass}{
                ${CustomAttributeNames.Style.paddingTop} : 5px;
                ${CustomAttributeNames.Style.paddingLeft} : 5px;
                ${CustomAttributeNames.Style.paddingRight} : 5px;
                ${CustomAttributeNames.Style.paddingBottom} : 5px;
                ${CustomAttributeNames.Style.VerticalAnchor} : ${VerticalAnchor.Middle};
                ${CustomAttributeNames.Style.HorizontalAnchor} : ${HorizontalAnchor.Center};
            }
            .${CustomAttributeNames.StyleValue.defaultTextClass}{
                fill : black;
                font-size: 18px;
                font-family: "monospace";
            }
            .${CustomAttributeNames.StyleValue.defaultCellBackgroungClass}{
                fill : white;
            }
            .${CustomAttributeNames.StyleValue.defaultCellBorderClass}{
                stroke : black;
            }

            .${CustomAttributeNames.StyleValue.defaultSurfaceClass}{
                stroke: black;
                stroke-width: 1px;
                fill : white;
            }
            .${CustomAttributeNames.StyleValue.defaultPathSurfaceClass}{
                stroke: black;
                stroke-width: 1px;
                fill : transparent;
            }

            .${CustomAttributeNames.StyleValue.defaultEdgePathClass}{
                stroke: black;
                fill: none;
                stroke-width: 1px;
            }
            .${CustomAttributeNames.StyleValue.defaultTextboxPathClass}{
                stroke: black;
                fill: white;
                stroke-width: 1px;
            }

            .${CustomAttributeNames.StyleValue.defaultRectButtonSurfaceClass}{
                fill: #8EB8FF; 
                stroke: black;
            }
            .${CustomAttributeNames.StyleValue.defaultRectButtonSurfaceClass}[disabled]{
                fill: #aaaaaa; 
            }
            .${CustomAttributeNames.StyleValue.defaultRectButtonSurfaceClass}:not([disabled]):hover{
                fill:#A4C6FF; 
            }
            .${CustomAttributeNames.StyleValue.defaultRectButtonSurfaceClass}:not([disabled]):active{
                fill:#8EB8FF; 
            }

            .___column_title_cellaa{
                --default-text-class : table-text;
                --default-background-class : background;    
                --horizontal-anchor: center;
                --vertical-anchor: middle;
                --padding-top: 0px;
                --padding-left: 0px;
                --padding-right: 0px;
                --padding-bottom: 0px;
            }

            .${CustomAttributeNames.StyleValue.defaultConsoleColumnTitleCellTextClass} {
                fill : black;
                font-size: 18px;
                font-weight: bold;
            }
            .${CustomAttributeNames.StyleValue.defaultConsoleColumnTitleCellUndefinedTextClass} {
                fill : pink;
                font-size: 18px;
                font-style: italic;
            }

            .${CustomAttributeNames.StyleValue.defaultConsoleColumnTitleCellBackgroundClass}{
                fill: #8EB8FF; 
                stroke: black;
            }


            g[data-type="g-rect-button"] > rect {
                stroke-width: 1px;
                transition-duration: 0.2s;
            }

            g[data-type="g-rect-button"] > rect[disabled]{
                stroke-width: 1px;
            }
            g[data-type="g-rect-button"] > rect:not([disabled]):hover {
                stroke-width: 3px;
            }
            g[data-type="g-rect-button"] > rect:not([disabled]):active {
                stroke-width: 1px;
            }
            g[data-type="g-rect-button"] > text {
                pointer-events: none;
            }
    
            `
        return r;
    }
}
