//namespace GraphTableSVG {
import { ZRect } from "./z_rect"
//import {ZTextBoxAttributes, ZObjectAttributes} from "../options/attributes_option"
import { ShapeObjectType } from "../common/enums";
import { DefaultClassNames } from "../common";

/**
 * ZRectButtonです。
 */
export class ZRectButton extends ZRect {
    public constructor(svgbox: SVGElement | string) {
        super(svgbox);
        this.svgGroup.setAttribute("class", DefaultClassNames.defaultRectButtonClass);

        this.svgGroup.setAttribute("cursor", "pointer");
        //this.update();
        if (this.type == ShapeObjectType.RectButton) this.firstFunctionAfterInitialized();
    }

    public get defaultClassName(): string | undefined {
        return undefined;
        //return GraphTableSVG.AttributeNames.StyleValue.defaultRectButtonClass;
    }
    public get type(): ShapeObjectType {
        return ShapeObjectType.RectButton;
    }
}
//}