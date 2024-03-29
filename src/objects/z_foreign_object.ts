import * as CSS from "../html/css"
import { ShapeObjectType, msoDashStyle, HorizontalAnchor, VerticalAnchor } from "../common/enums";
import { ZVertex } from "./z_vertex"

import * as GOptions from "./z_options"

export class ZForeignObject extends ZVertex {
    private _foreignObject: SVGForeignObjectElement;
    //private static updateTextAttributes = ["style"]

    public get foreignObject() : SVGForeignObjectElement{
        return this._foreignObject;
    }

    public constructor(svgbox: SVGElement | string) {
        super(svgbox)

        this._foreignObject = ZForeignObject.createForeignObject(this.svgGroup, undefined, undefined);


        if (this.type == ShapeObjectType.Object) this.firstFunctionAfterInitialized();
    }
    private static createForeignObject(parent: SVGElement, className: string | GOptions.surfaceClassCSS | undefined, style: string | undefined | GOptions.surfaceClassCSS): SVGForeignObjectElement {
        const obj = <SVGRectElement>document.createElementNS('http://www.w3.org/2000/svg',  'foreignObject');
        parent.appendChild(obj);
        obj.width.baseVal.value = 30;
        obj.height.baseVal.value = 30;
        if (style !== undefined) {
            if (typeof (style) == "string") {
                obj.setAttribute("style", style);
            } else {
                obj.setAttribute("style", CSS.buildClassNameFromSurfaceClassCSS(style));
            }

        }
        //if(style !== undefined) rect.setAttribute("style", style);

        return obj;
    }

    public get type(): ShapeObjectType {
        return ShapeObjectType.ForeignObject;
    }
}
