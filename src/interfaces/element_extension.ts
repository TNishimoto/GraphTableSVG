import * as CommonFunctions from "../common/common_functions";
import { round100 } from "../common/vline";

export function getPropertyStyleValue(item : Element ,name: string): string | null{
    const p = (<any>item).style.getPropertyValue(name).trim();
    if (p.length == 0) {
        const r = item.getAttribute("class");
        if (r == null) {
            return null;
        } else {
            const css = getComputedStyle(item);
            //let css = GraphTableSVG.SVG.getStyleSheet(r);
            //if (css == null) css = getComputedStyle(item);
            const p2 = css.getPropertyValue(name).trim();
            if (p2.length == 0) {
                return null;
            } else {
                return p2;
            }
        }
    } else {
        return p;
    }

}

export function gtGetStyleBooleanWithUndefined(item : Element ,name: string): boolean | undefined{
    const value = getPropertyStyleValue(item, name);
    if (value != null) {
        return value == "true";
    } else {
        return undefined;
    }

}
export function getPropertyStyleValueWithDefault(item : Element, name: string, defaultValue: string): string{
    const p = getPropertyStyleValue(item, name);
    if (p == null) {
        return defaultValue;
    } else {
        return p;
    }

}
export  function getPropertyStyleNumberValue(item:Element, name: string, defaultValue: number | null): number | null{
    const p = getPropertyStyleValue(item, name);
    if (p != null) {
        return CommonFunctions.toPX(p);
    } else {
        return defaultValue;
    }
}

export  function getActiveStyle(item:Element): CSSStyleDeclaration{
    //const p: Element = this;
    const r = item.getAttribute("class");
    if (r == null) {
        return (<any>item).style;
    } else {
        return getComputedStyle(item);
    }
}
export function setPropertyStyleValue(item:Element, name: string, value: string | null): void{
    (<any>item).style.setProperty(name, value);
}
export function setPropertyStyleValue2(item:Element, name: string, value: string | null): boolean{
    const style = getComputedStyle(item);
    
    const oldValue = style.getPropertyValue(name);  
    if(oldValue == value){
        return false;
    }else{
        (<any>item).style.setProperty(name, value);
        return true;
    }

}


export function gtGetAttributeNumber(item:Element,name: string, defaultValue: number | null): number | null{
    const value = item.getAttribute(name);
    if (value != null) {
        return Number(value);
    } else {
        return defaultValue;
    }

}
export function gtGetAttributeNumberWithoutNull(item:Element,name: string, defaultValue: number): number{
    const value = item.getAttribute(name);
    if (value != null) {
        return Number(value);
    } else {
        return defaultValue;
    }

}
export function gtGetAttributeNumberWithUndefined(item:Element,name: string): number | undefined{
    const value = item.getAttribute(name);
    if (value != null) {
        return Number(value);
    } else {
        return undefined;
    }

}
export function gtGetAttributeStringWithUndefined(item:Element,name: string): string | undefined{
    const value = item.getAttribute(name);
    if (value != null) {
        return value;
    } else {
        return undefined;
    }

}
export function gtGetAttributeBooleanWithUndefined(item:Element,name: string): boolean | undefined{
    const value = item.getAttribute(name);
    if (value != null) {
        return value == "true";
    } else {
        return undefined;
    }
}

export function gtGetAttribute(item:Element,name: string, defaultValue: string | null): string | null{
    const value = item.getAttribute(name);
    if (value != null) {
        return value;
    } else {
        return defaultValue;
    }
}
export function setAttributeNumber(item:Element, name: string, value: number){
    item.setAttribute(name, round100(value).toString());
}


export function  gtGetAttributes(item:Element): { name: string, value: string }[]{
    //const p: Element = this;
    const r: { name: string, value: string }[] = [];
    for (let i = 0; i < item.attributes.length; i++) {
        const subitem = item.attributes.item(i);
        if (subitem != null) {
            r.push({ name: subitem.name, value: subitem.value });
        }
    }
    return r;

}
export function getIsLoaded(item:Element) : boolean | undefined{
    const item2 = <any>item;

    if(item2.__isLoaded === undefined){
        return undefined;
    }else{
        return item2.__isLoaded;
    }

}
export function setIsLoaded(item:Element, b : boolean) : void{
    const item2 = <any>item;
    item2.__isLoaded = b;

}
export function hasStyleAttribute(item:Element,name: string): boolean{
    const p = getPropertyStyleValue(item ,name);
    return p !== null;

}
