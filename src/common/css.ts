namespace GraphTableSVG {
    export namespace Common {
        export function createCSS(): string {

            const r = `
            .${Cell.emphasisCellClass}{
            fill : yellow !important;
            }
            .${Cell.emphasisBorderClass}{
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
                stroke-width: 1px;
                transition-duration: 0.2s;
            }

            .${CustomAttributeNames.StyleValue.defaultRectButtonSurfaceClass}[disabled]{
                fill: #aaaaaa; 
                stroke: black;
                stroke-width: 1px;
            }
            .${CustomAttributeNames.StyleValue.defaultRectButtonSurfaceClass}:not([disabled]):hover {
                fill:#A4C6FF; 
                stroke-width: 3px;
            }
            .${CustomAttributeNames.StyleValue.defaultRectButtonSurfaceClass}:not([disabled]):active {
                fill:#8EB8FF; 
                stroke-width: 1px;
            }
    
            `
            return r;
        }
    }
}