
interface SVGGElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}

SVGGElement.prototype.getX = () => {
    if (this.transform.baseVal.numberOfItems == 0) {
        this.setAttribute('transform', "translate(0,0)");
    }
    return this.transform.baseVal.getItem(0).matrix.e;
};
SVGGElement.prototype.setX = (value: number) => {
    if (this.transform.baseVal.numberOfItems == 0) {
        this.setAttribute('transform', "translate(0,0)");
    }
    var a = this.transform.baseVal.getItem(0).matrix.a;
    var b = this.transform.baseVal.getItem(0).matrix.b;
    var c = this.transform.baseVal.getItem(0).matrix.c;
    var d = this.transform.baseVal.getItem(0).matrix.d;
    var e = value;
    var f = this.transform.baseVal.getItem(0).matrix.f;
    this.setAttribute('transform', `matrix(${a} ${b} ${c} ${d} ${e} ${f})`);

};
SVGGElement.prototype.getY = () => {
    if (this.transform.baseVal.numberOfItems == 0) {
        this.setAttribute('transform', "translate(0,0)");
    }

    return this.transform.baseVal.getItem(0).matrix.f;
};
SVGGElement.prototype.setY = (value: number) => {
    if (this.transform.baseVal.numberOfItems == 0) {
        this.setAttribute('transform', "translate(0,0)");
    }
    var a = this.transform.baseVal.getItem(0).matrix.a;
    var b = this.transform.baseVal.getItem(0).matrix.b;
    var c = this.transform.baseVal.getItem(0).matrix.c;
    var d = this.transform.baseVal.getItem(0).matrix.d;
    var e = this.transform.baseVal.getItem(0).matrix.e;
    var f = value;
    this.setAttribute('transform', `matrix(${a} ${b} ${c} ${d} ${e} ${f})`);
};

interface CSSStyleDeclaration {
    tryGetPropertyValue(name: string): string | null;
}
CSSStyleDeclaration.prototype.tryGetPropertyValue = (name: string) => {
    var r = this.getPropertyValue(name).trim();
    if (r.length == 0) {
        return null;
    } else {
        return r;
    }
}
interface SVGElement {
    getActiveStyle(): CSSStyleDeclaration;
    getPropertyStyleValue(name: string): string | null;
    getPropertyStyleValueWithDefault(name: string, defaultValue: string): string;
    setPropertyStyleValue(name: string, value: string | null): void;
}
SVGElement.prototype.getActiveStyle = () => {
    //var p: SVGElement = this;
    var r = this.getAttribute("class");
    if (r == null) {
        return this.style;
    } else {
        return getComputedStyle(this);
    }
}
SVGElement.prototype.getPropertyStyleValueWithDefault = (name: string, defaultValue: string) => {    
    var p = this.getPropertyStyleValue(name);
    if (p == null) {
        return defaultValue;
    } else {
        return p;
    }
}
SVGElement.prototype.getPropertyStyleValue = (name: string) => {
    var p = this.style.getPropertyValue(name).trim();
    if (p.length == 0) {
        var r = this.getAttribute("class");
        if (r == null) {
            return null;
        } else {
            var p2 = getComputedStyle(this).getPropertyValue(name).trim();
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
SVGElement.prototype.setPropertyStyleValue = (name: string, value: string | null) => {
    this.style.setProperty(name, value);
}

interface SVGTextElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}
SVGTextElement.prototype.getX = () => {
    if (this.x.baseVal.numberOfItems == 0) {
        this.setAttribute('x', "0");
    }
    return this.x.baseVal.getItem(0).value;
};
SVGTextElement.prototype.setX = (value: number) => {
    if (this.x.baseVal.numberOfItems == 0) {
        this.setAttribute('x', "0");
    }
    //p.setAttribute('x', value.toString());


    this.x.baseVal.getItem(0).value = value;
};
SVGTextElement.prototype.getY = () => {
    if (this.y.baseVal.numberOfItems == 0) {
        this.setAttribute('y', "0");
    }
    return this.y.baseVal.getItem(0).value;
};
SVGTextElement.prototype.setY = (value: number) => {
    if (this.y.baseVal.numberOfItems == 0) {
        this.setAttribute('y', "0");
    }
    this.y.baseVal.getItem(0).value = value;
};

