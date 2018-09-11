interface SVGElement {
    getActiveStyle(): CSSStyleDeclaration;
    getPropertyStyleValue(name: string): string | null;
    getPropertyStyleNumberValue(name: string, defaultValue: number | null): number | null;

    getPropertyStyleValueWithDefault(name: string, defaultValue: string): string;
    setPropertyStyleValue(name: string, value: string | null): void;
    gtGetAttributeNumber(name: string, defaultValue: number | null): number | null;
    gtGetAttributeNumberWithoutNull(name: string, defaultValue: number): number;

    gtGetAttributeNumberWithUndefined(name: string): number | undefined;
    gtGetAttributeStringWithUndefined(name: string): string | undefined;
    gtGetAttributeBooleanWithUndefined(name: string): boolean | undefined;
    gtGetStyleBooleanWithUndefined(name: string): boolean | undefined;
    
    gtGetAttribute(name: string, defaultValue: string | null): string | null;

    gtGetAttributes() : {name : string, value : string}[];

    /*
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
    */
}
SVGElement.prototype.gtGetAttribute = function(name: string, defaultValue: string | null = null): string | null{
    const item: SVGElement = this;

    const value = item.getAttribute(name);
    if (value != null) {
        return value;
    } else {
        return defaultValue;
    }
}

SVGElement.prototype.gtGetAttributes = function () {
    const p: SVGElement = this;
    const r: {name : string, value : string}[] = [];
    for(let i=0;i<p.attributes.length;i++){
        const item = p.attributes.item(i);
        if(item != null){
            r.push({name : item.name, value : item.value});
        }
    }
    return r;
}
SVGElement.prototype.getActiveStyle = function () {
    const p: SVGElement = this;
    const r = p.getAttribute("class");
    if (r == null) {
        return p.style;
    } else {
        return getComputedStyle(p);
    }
}
SVGElement.prototype.gtGetAttributeNumber = function(name: string, defaultValue: number | null = null): number | null{
    const item: SVGElement = this;

    const value = item.getAttribute(name);
    if (value != null) {
        return Number(value);
    } else {
        return defaultValue;
    }
}
SVGElement.prototype.gtGetAttributeNumberWithUndefined = function(name: string): number | undefined{
    const item: SVGElement = this;

    const value = item.getAttribute(name);
    if (value != null) {
        return Number(value);
    } else {
        return undefined;
    }
}
SVGElement.prototype.gtGetAttributeStringWithUndefined = function(name: string): string | undefined{
    const item: SVGElement = this;

    const value = item.getAttribute(name);
    if (value != null) {
        return value;
    } else {
        return undefined;
    }
}
SVGElement.prototype.gtGetAttributeBooleanWithUndefined = function(name: string): boolean | undefined{
    const item: SVGElement = this;

    const value = item.getAttribute(name);
    if (value != null) {
        return value == "true";
    } else {
        return undefined;
    }
}
SVGElement.prototype.gtGetStyleBooleanWithUndefined = function(name: string): boolean | undefined{
    const item: SVGElement = this;

    const value = item.getPropertyStyleValue(name);
    if (value != null) {
        return value == "true";
    } else {
        return undefined;
    }
}

SVGElement.prototype.gtGetAttributeNumberWithoutNull = function(name: string, defaultValue: number = 0): number{
    const item: SVGElement = this;

    const value = item.getAttribute(name);
    if (value != null) {
        return Number(value);
    } else {
        return defaultValue;
    }
}

SVGElement.prototype.getPropertyStyleValueWithDefault = function (name: string, defaultValue: string): string {
    const item: SVGElement = this;

    const p = item.getPropertyStyleValue(name);
    if (p == null) {
        return defaultValue;
    } else {
        return p;
    }
}
SVGElement.prototype.getPropertyStyleValue = function (name: string): string | null {
    const item: SVGElement = this;
    const p = item.style.getPropertyValue(name).trim();
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
SVGElement.prototype.getPropertyStyleNumberValue = function (name: string, defaultValue: number | null = null): number | null {
    const item: SVGElement = this;
    const p = item.getPropertyStyleValue(name);
    if (p != null) {
        return GraphTableSVG.Common.toPX(p);
    } else {
        return defaultValue;
    }
}
SVGElement.prototype.setPropertyStyleValue = function (name: string, value: string | null) {
    const item: SVGElement = this;

    item.style.setProperty(name, value);
}
