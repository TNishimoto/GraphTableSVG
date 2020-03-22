

import * as StyleNames from "../common/style_names"
import * as ElementExtension from "./element_extension"

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
