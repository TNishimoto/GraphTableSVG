import {GVertex} from "./g_vertex"
import {GTextBox} from "./g_textbox"
import {GCalloutAttributes} from "./g_callout"
import { ShapeObjectType, ConnectorPosition, msoDashStyle } from "../common/enums";
import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"
import * as DefaultClassNames from "../common/default_class_names"

import {Rectangle, VLine} from "../common/vline"
import {GEllipse, GAbstractEllipseCircle} from "./g_ellipse"
import * as CSS from "../html/css"
import * as GOptions  from "./g_options"
import * as ElementExtension from "../interfaces/element_extension"

export class GCircle extends GAbstractEllipseCircle  {
    public get svgCircle(): SVGCircleElement {
        return <SVGCircleElement>this._svgSurface;
    }

    public constructor(svgbox: SVGElement | string, option: GOptions.GTextBoxAttributes = {}) {
        super(svgbox, option);
        if(this.type == ShapeObjectType.Circle) this.firstFunctionAfterInitialized();

        //this.update();
    }
    initializeOption(option: GOptions.GObjectAttributes): GOptions.GObjectAttributes {
        const _option = { ...option };
        if (this.svgSurface != null && this.svgSurface.className != null) {
            const width = ElementExtension.getPropertyStyleNumberValue(this.svgSurface, StyleNames.defaultWidth, null);
            const height = ElementExtension.getPropertyStyleNumberValue(this.svgSurface, StyleNames.defaultHeight, null);
            if (width != null) _option.width = width;
            if (height != null) _option.height = height;
        }
        if(_option.width === undefined && _option.height === undefined){
            _option.width = 25;
        }
        //if (_option.width === undefined) _option.width = 25;
        //if (_option.height === undefined) _option.height = 25;
        if (_option.cx === undefined) _option.cx = 0;
        if (_option.cy === undefined) _option.cy = 0;
        if (_option.surfaceClass === undefined) _option.surfaceClass = DefaultClassNames.defaultSurfaceClass;
        return _option;
    }
    protected createSurface(svgbox : SVGElement, option :GOptions.GObjectAttributes = {}) : void {
        if(option.surfaceClass === undefined) option.surfaceClass = DefaultClassNames.defaultSurfaceClass;
        this._svgSurface = GCircle.createCircle(this.svgGroup, option.surfaceClass, option.surfaceStyle);
        this.svgGroup.insertBefore(this.svgCircle, this.svgText);
    }
    private static createCircle(parent: SVGElement, className: string | GOptions.surfaceClassCSS, style : string | undefined | GOptions.surfaceClassCSS): SVGCircleElement {
        const circle = <SVGCircleElement>document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        parent.appendChild(circle);
        if(style !== undefined){
            if(typeof(style) == "string"){
                circle.setAttribute("style", style);
            }else{
                circle.setAttribute("style", CSS.buildClassNameFromSurfaceClassCSS(style));
            }

        }
        //if(style !== undefined) circle.setAttribute("style", style);


        circle.r.baseVal.value = AttributeNames.defaultCircleRadius;

        //circle.setAttribute("class", className);
        
        if(typeof(className) == "string"){
            circle.setAttribute("class", className);
        }else{
            circle.setAttribute("class", CSS.buildClassNameFromSurfaceClassCSS(className));
        }
        const radius = ElementExtension.getPropertyStyleNumberValue(circle,StyleNames.defaultRadius, null);
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
        console.log("set/" +value)
        if(value == 40) throw Error("error")
        const _rx = value / 2;
        
        if (this.width != value) this.svgCircle.setAttribute("r", _rx.toString());
        console.log("set_end/" +this.width)

    }

    set height(value: number) {
        console.log("set_height/" +value)

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