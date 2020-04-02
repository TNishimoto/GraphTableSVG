//namespace GraphTableSVG {
    import {GRect} from "./g_rect"
    //import {GTextBoxAttributes, GObjectAttributes} from "../options/attributes_option"
    import { ShapeObjectType } from "../common/enums";

    export class GRectButton extends GRect {
        public constructor(svgbox: SVGElement | string) {
            super(svgbox);


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