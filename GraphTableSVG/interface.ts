
interface SVGGElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}

SVGGElement.prototype.getX = function () {
    var p: SVGGElement = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    return p.transform.baseVal.getItem(0).matrix.e;
};
SVGGElement.prototype.setX = function (value: number) {
    var p: SVGGElement = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    var a = this.transform.baseVal.getItem(0).matrix.a;
    var b = this.transform.baseVal.getItem(0).matrix.b;
    var c = this.transform.baseVal.getItem(0).matrix.c;
    var d = this.transform.baseVal.getItem(0).matrix.d;
    var e = value;
    var f = this.transform.baseVal.getItem(0).matrix.f;
    p.setAttribute('transform', `matrix(${a} ${b} ${c} ${d} ${e} ${f})`);


    //p.transform.baseVal.getItem(0).matrix.e = value;
};
SVGGElement.prototype.getY = function () {
    var p: SVGGElement = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }

    return this.transform.baseVal.getItem(0).matrix.f;
};
SVGGElement.prototype.setY = function (value: number) {
    var p: SVGGElement = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    var a = this.transform.baseVal.getItem(0).matrix.a;
    var b = this.transform.baseVal.getItem(0).matrix.b;
    var c = this.transform.baseVal.getItem(0).matrix.c;
    var d = this.transform.baseVal.getItem(0).matrix.d;
    var e = this.transform.baseVal.getItem(0).matrix.e;
    var f = value;
    p.setAttribute('transform', `matrix(${a} ${b} ${c} ${d} ${e} ${f})`);



    //this.transform.baseVal.getItem(0).matrix.f = value;
};

interface CSSStyleDeclaration {
    tryGetPropertyValue(name: string): string | null;
}
CSSStyleDeclaration.prototype.tryGetPropertyValue = function (name: string) {
    var p: CSSStyleDeclaration = this;
    var r = p.getPropertyValue(name).trim();
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
SVGElement.prototype.getActiveStyle = function () {
    var p: SVGElement = this;
    var r = p.getAttribute("class");
    if (r == null) {
        return p.style;
    } else {
        return getComputedStyle(p);
    }
}
SVGElement.prototype.getPropertyStyleValueWithDefault = function (name: string, defaultValue: string): string {
    var item: SVGElement = this;

    var p = item.getPropertyStyleValue(name);
    if (p == null) {
        return defaultValue;
    } else {
        return p;
    }
}
SVGElement.prototype.getPropertyStyleValue = function (name: string): string | null {
    var item: SVGElement = this;
    var p = item.style.getPropertyValue(name).trim();
    if (p.length == 0) {
        var r = item.getAttribute("class");
        if (r == null) {
            return null;
        } else {

            var css = GraphTableSVG.getStyleSheet(r);
            if (css == null) css = getComputedStyle(item);
            var p2 = css.getPropertyValue(name).trim();
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
SVGElement.prototype.setPropertyStyleValue = function (name: string, value: string | null) {
    var item: SVGElement = this;

    item.style.setProperty(name, value);
}

interface SVGTextElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
    setLatexTextContent(str: string): void;
}
SVGTextElement.prototype.setLatexTextContent = function (str: string) {
    str += "_";
    var p: SVGTextElement = this;
    p.textContent = "";
    var h = parseInt(p.getPropertyStyleValueWithDefault("font-size", "12"));

    var mode = "";
    var tmp = "";
    var dy = (1 * h) / 3;
    var lastMode: string = "none";
    var smallFontSize = (2 * h) / 3;
    for (var i = 0; i < str.length; i++) {
        var c = str[i];
        if (c == "_" || c == "{" || c == "^" || c == "}") {
            mode += c;
            if (mode == "_{}") {
                var tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.textContent = tmp;
                tspan.setAttribute("dy", `${dy}`);
                tspan.setAttribute("data-script", "subscript");
                tspan.style.fontSize = `${smallFontSize}pt`;
                p.appendChild(tspan);
                lastMode = "down";
                mode = "";
                tmp = "";
            } else if (mode == "^{}") {
                var tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.textContent = tmp;
                tspan.setAttribute("dy", `-${dy}`);
                tspan.style.fontSize = `${smallFontSize}pt`;
                tspan.setAttribute("data-script", "superscript");
                p.appendChild(tspan);
                lastMode = "up";
                mode = "";
                tmp = "";
            } else if (mode == "_" || mode == "^") {
                var tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.textContent = tmp;
                var normaldy = lastMode == "up" ? dy : lastMode == "down" ? -dy : 0;
                tspan.setAttribute("dy", `${normaldy}`);
                p.appendChild(tspan);

                lastMode = "none";
                tmp = "";
            }
        } else {
            tmp += c;
        }
    }
};

SVGTextElement.prototype.getX = function () {
    var p: SVGTextElement = this;
    if (p.x.baseVal.numberOfItems == 0) {
        p.setAttribute('x', "0");
    }
    return p.x.baseVal.getItem(0).value;
};
SVGTextElement.prototype.setX = function (value: number) {
    var p: SVGTextElement = this;
    if (p.x.baseVal.numberOfItems == 0) {
        p.setAttribute('x', "0");
    }
    //p.setAttribute('x', value.toString());


    p.x.baseVal.getItem(0).value = value;
};
SVGTextElement.prototype.getY = function () {
    var p: SVGTextElement = this;
    if (p.y.baseVal.numberOfItems == 0) {
        p.setAttribute('y', "0");
    }
    return p.y.baseVal.getItem(0).value;
};
SVGTextElement.prototype.setY = function (value: number) {
    var p: SVGTextElement = this;
    if (p.y.baseVal.numberOfItems == 0) {
        p.setAttribute('y', "0");
    }
    p.y.baseVal.getItem(0).value = value;
};

