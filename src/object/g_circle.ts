import {GObjectAttributes} from "./g_object"
import {GVertex} from "./g_vertex"
import {GTextBox, GTextBoxAttributes} from "./g_textbox"
import {GCalloutAttributes} from "./g_callout"
import { ShapeObjectType, ConnectorPosition, msoDashStyle } from "../basic/common/enums";
import { CustomAttributeNames } from "../basic/common/custtome_attributes"
import {Rectangle, VLine} from "../basic/common/vline"
import {GEllipse, GAbstractEllipseCircle} from "./g_ellipse"

export class GCircle extends GAbstractEllipseCircle  {
    public get svgCircle(): SVGCircleElement {
        return <SVGCircleElement>this._svgSurface;
    }

    public constructor(svgbox: SVGElement | string, option: GTextBoxAttributes = {}) {
        super(svgbox, option);
        if(this.type == ShapeObjectType.Circle) this.firstFunctionAfterInitialized();

        //this.update();
    }
    protected createSurface(svgbox : SVGElement, option :GObjectAttributes = {}) : void {
        if(option.surfaceClass === undefined) option.surfaceClass = CustomAttributeNames.StyleValue.defaultSurfaceClass;
        this._svgSurface = GCircle.createCircle(this.svgGroup, option.surfaceClass, option.surfaceStyle);
        this.svgGroup.insertBefore(this.svgCircle, this.svgText);
    }
    private static createCircle(parent: SVGElement, className: string, style : string | undefined): SVGCircleElement {
        const circle = <SVGCircleElement>document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        parent.appendChild(circle);
        if(style !== undefined) circle.setAttribute("style", style);


        circle.r.baseVal.value = CustomAttributeNames.defaultCircleRadius;

        circle.setAttribute("class", className);
        const radius = circle.getPropertyStyleNumberValue(CustomAttributeNames.Style.defaultRadius, null);
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

    public get shape(): string {
        return "msoShapeOval";
    }

}