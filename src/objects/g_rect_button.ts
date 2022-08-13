//namespace GraphTableSVG {
    import {GRect} from "./g_rect"
    //import {GTextBoxAttributes, GObjectAttributes} from "../options/attributes_option"
    import { ShapeObjectType } from "../common/enums";
import { DefaultClassNames } from "../common";

    /**
     * GRectButtonです。
     */
    export class GRectButton extends GRect {
        public constructor(svgbox: SVGElement | string) {
            super(svgbox);
            this.svgGroup.setAttribute("class", DefaultClassNames.defaultRectButtonClass);

            this.svgGroup.setAttribute("cursor", "pointer");
            //this.update();
            if(this.type == ShapeObjectType.RectButton) this.firstFunctionAfterInitialized();
        }
        
        public get defaultClassName() : string | undefined {
            return undefined;
            //return GraphTableSVG.AttributeNames.StyleValue.defaultRectButtonClass;
        }
        public get type(): ShapeObjectType {
            return ShapeObjectType.RectButton;
        }
    }
//}