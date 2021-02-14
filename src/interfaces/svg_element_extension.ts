

import * as StyleNames from "../common/style_names"
import * as ElementExtension from "./element_extension"
import { NotSupportedError } from "../common/exceptions";

export function getPaddingLeft(item: SVGElement): number{
    return ElementExtension.getPropertyStyleNumberValue(item, StyleNames.paddingLeft, 0)!;
}
export function getPaddingTop(item: SVGElement): number{
    return ElementExtension.getPropertyStyleNumberValue(item, StyleNames.paddingTop, 0)!;
}
export function getPaddingRight(item: SVGElement): number{
    return ElementExtension.getPropertyStyleNumberValue(item, StyleNames.paddingRight, 0)!;

}
export function getPaddingBottom(item: SVGElement): number{
    return ElementExtension.getPropertyStyleNumberValue(item, StyleNames.paddingBottom, 0)!;

}


export function setPaddingLeft(item: SVGElement, value: number): void{
    ElementExtension.setPropertyStyleValue(item, StyleNames.paddingLeft, value.toString());

}
export function setPaddingTop(item: SVGElement, value: number): void{
    ElementExtension.setPropertyStyleValue(item, StyleNames.paddingTop, value.toString());

}
export function setPaddingRight(item: SVGElement, value: number): void{
    ElementExtension.setPropertyStyleValue(item, StyleNames.paddingRight, value.toString());

}
export function setPaddingBottom(item: SVGElement, value: number): void{
    ElementExtension.setPropertyStyleValue(item, StyleNames.paddingBottom, value.toString());

}
export function getX(item : SVGElement) : number {
    if(item instanceof SVGElement){
        return Number.parseInt(item.getAttribute("x")!);
    }else{
        throw new NotSupportedError();
    }
}
export function getY(item : SVGElement) : number {
    if(item instanceof SVGElement){
        return Number.parseInt(item.getAttribute("y")!);
    }else{
        throw new NotSupportedError();
    }
}
export function getBackgroundColor(obj: SVGRectElement | SVGCircleElement | SVGEllipseElement | SVGPolygonElement | SVGPathElement) : string {
    const attr = obj.getAttribute("fill");
    if(attr != null){
        return attr;
    }else{
        const color = ElementExtension.getPropertyStyleValueWithDefault(obj, "fill", "gray");
        return color;
    }
}
export function getStrokeWidth(obj: SVGRectElement | SVGCircleElement | SVGPathElement | SVGEllipseElement | SVGLineElement| SVGPolylineElement) : number {
    const attr = obj.getAttribute("stroke-width");

    if(attr != null){
        return parseInt(attr);
    }else{
        const strokeWidth : string | null = ElementExtension.getPropertyStyleValue(obj, "stroke-width");
        if(strokeWidth == null){
            const css = getComputedStyle(obj);
            return parseInt(css.strokeWidth);        
        }else{
            return parseInt(strokeWidth);
        }
    }
}
export function getStrokeColor(obj: SVGRectElement | SVGCircleElement | SVGPathElement | SVGEllipseElement | SVGLineElement | SVGPolylineElement) : string {
    const attr = obj.getAttribute("stroke");
    if(attr != null){
        return attr;
    }else{
        const color = ElementExtension.getPropertyStyleValueWithDefault(obj, "stroke", "NoColor");
        if(color == "NoColor"){
            const css = getComputedStyle(obj);
            return css.stroke;        

        }else{
            return color;
        }
    }
}
export function getBackgroundVisible(obj: SVGElement) : boolean {
    const backGroundvisible = ElementExtension.getPropertyStyleValue(obj, "visibility");
    if(backGroundvisible != null){
        return backGroundvisible == "visible";

    }else{
        const attr = obj.getAttribute("fill");
        if(attr != null){
            return !(attr == "none");
        }else{
            return true;
        }
    
    }

}
