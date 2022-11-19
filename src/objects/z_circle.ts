import { ZVertex } from "./z_vertex"
import { ZTextBox } from "./z_textbox"
import { ZCalloutAttributes } from "./z_callout"
import { ShapeObjectType, ConnectorType, msoDashStyle, VBAShapeType, DataName } from "../common/enums";
import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"
import * as DefaultClassNames from "../common/default_class_names"

import { Rectangle, VLine } from "../common/vline"
import { ZEllipse, ZAbstractEllipseCircle } from "./z_ellipse"
import * as CSS from "../html/css"
import * as GOptions from "./z_options"
import * as ElementExtension from "../interfaces/element_extension"

export class ZCircle extends ZAbstractEllipseCircle {
    public get svgCircle(): SVGCircleElement {
        return <SVGCircleElement>this._svgSurface;
    }

    public constructor(svgbox: SVGElement | string) {
        super(svgbox);
        if (this.type == ShapeObjectType.Circle) this.firstFunctionAfterInitialized();
    }
    protected createSurface(svgbox: SVGElement): void {
        //if(option.surfaceClass === undefined) option.surfaceClass = DefaultClassNames.defaultSurfaceClass;
        this._svgSurface = ZCircle.createCircle(this.svgGroup, DefaultClassNames.defaultSurfaceClass, undefined);
        this.svgGroup.insertBefore(this.svgCircle, this.svgText);
    }
    private static createCircle(parent: SVGElement, className: string | GOptions.surfaceClassCSS, style: string | undefined | GOptions.surfaceClassCSS): SVGCircleElement {
        const circle = <SVGCircleElement>document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute(AttributeNames.dataNameAttribute, DataName.Surface);
        parent.appendChild(circle);

        GOptions.setClassAndStyle(circle, className, style);
        /*
        if(style !== undefined){
            if(typeof(style) == "string"){
                circle.setAttribute("style", style);
            }else{
                circle.setAttribute("style", CSS.buildClassNameFromSurfaceClassCSS(style));
            }

        }
        */
        //if(style !== undefined) circle.setAttribute("style", style);


        circle.r.baseVal.value = AttributeNames.defaultCircleRadius;

        //circle.setAttribute("class", className);
        /*
        if(typeof(className) == "string"){
            circle.setAttribute("class", className);
        }else{
            circle.setAttribute("class", CSS.buildClassNameFromSurfaceClassCSS(className));
        }
        */
        const radius = ElementExtension.getPropertyStyleNumberValue(circle, StyleNames.defaultRadius, null);
        if (radius != null) {
            circle.r.baseVal.value = radius;
        }
        circle.cx.baseVal.value = 0;
        circle.cy.baseVal.value = 0;

        return circle;
    }

    get rx(): number {
        return this.svgCircle.r.baseVal.value;
    }
    get ry(): number {
        return this.svgCircle.r.baseVal.value;
    }
    set width(value: number) {
        const _rx = value / 2;

        if (this.width != value) this.svgCircle.setAttribute("r", _rx.toString());

    }

    set height(value: number) {

        const _ry = value / 2;
        if (this.height != value) this.svgCircle.setAttribute("r", _ry.toString());
    }

    get width(): number {
        return this.svgCircle.r.baseVal.value * 2;
    }
    get height(): number {
        return this.svgCircle.r.baseVal.value * 2;
    }





    public get type(): ShapeObjectType {
        return ShapeObjectType.Circle;
    }

    public get shape(): VBAShapeType {
        return VBAShapeType.Oval;
    }

}