//namespace GraphTableSVG {
    import {GRect} from "./g_rect"
    //import {GTextBoxAttributes, GObjectAttributes} from "../options/attributes_option"
    import * as AttributeNames from "../basic/common/attribute_names"
    import * as DefaultClassNames from "../basic/common/default_class_names"
    import { ShapeObjectType } from "../basic/common/enums";
    import * as GOptions  from "./g_options"

    export class GRectButton extends GRect {
        public constructor(svgbox: SVGElement | string, option: GOptions.GTextBoxAttributes = {}) {
            super(svgbox, option);


            //this.update();
            if(this.type == ShapeObjectType.RectButton) this.firstFunctionAfterInitialized();
        }
        initializeOption(option: GOptions.GObjectAttributes): GOptions.GObjectAttributes {
            let b = false;
            if (option.width !== undefined || option.height !== undefined) {
                b = true;
            }
            
            
            if(option.surfaceClass === undefined){
                option.surfaceClass = DefaultClassNames.defaultRectButtonSurfaceClass;
            }
            
            

            const _option = <GOptions.GTextBoxAttributes>super.initializeOption(option);
            

            return _option;
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