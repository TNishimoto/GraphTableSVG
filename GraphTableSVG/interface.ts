
interface SVGGElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}

SVGGElement.prototype.getX = function () {
    const p: SVGGElement = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    return p.transform.baseVal.getItem(0).matrix.e;
};
SVGGElement.prototype.setX = function (value: number) {
    const p: SVGGElement = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    const a = this.transform.baseVal.getItem(0).matrix.a;
    const b = this.transform.baseVal.getItem(0).matrix.b;
    const c = this.transform.baseVal.getItem(0).matrix.c;
    const d = this.transform.baseVal.getItem(0).matrix.d;
    const e = value;
    const f = this.transform.baseVal.getItem(0).matrix.f;
    p.setAttribute('transform', `matrix(${a} ${b} ${c} ${d} ${e} ${f})`);


    //p.transform.baseVal.getItem(0).matrix.e = value;
};
SVGGElement.prototype.getY = function () {
    const p: SVGGElement = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }

    return this.transform.baseVal.getItem(0).matrix.f;
};
SVGGElement.prototype.setY = function (value: number) {
    const p: SVGGElement = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    const a = this.transform.baseVal.getItem(0).matrix.a;
    const b = this.transform.baseVal.getItem(0).matrix.b;
    const c = this.transform.baseVal.getItem(0).matrix.c;
    const d = this.transform.baseVal.getItem(0).matrix.d;
    const e = this.transform.baseVal.getItem(0).matrix.e;
    const f = value;
    p.setAttribute('transform', `matrix(${a} ${b} ${c} ${d} ${e} ${f})`);



    //this.transform.baseVal.getItem(0).matrix.f = value;
};

interface CSSStyleDeclaration {
    tryGetPropertyValue(name: string): string | null;
}
CSSStyleDeclaration.prototype.tryGetPropertyValue = function (name: string) {
    const p: CSSStyleDeclaration = this;
    const r = p.getPropertyValue(name).trim();
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
    const p: SVGElement = this;
    const r = p.getAttribute("class");
    if (r == null) {
        return p.style;
    } else {
        return getComputedStyle(p);
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

            let css = GraphTableSVG.getStyleSheet(r);
            if (css == null) css = getComputedStyle(item);
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
SVGElement.prototype.setPropertyStyleValue = function (name: string, value: string | null) {
    const item: SVGElement = this;

    item.style.setProperty(name, value);
}

interface SVGTextElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
    setLatexTextContent(str: string): void;
}
interface SVGTextPathElement {
    setLatexTextContent(str: string): void;
}
SVGTextPathElement.prototype.setLatexTextContent = function (str: string) {
    GraphTableSVG.setTextToTextPath(this, str);
};

SVGTextElement.prototype.setLatexTextContent = function (str: string) {
    str += "_";
    const p: SVGTextElement = this;
    p.textContent = "";
    const h = parseInt(p.getPropertyStyleValueWithDefault("font-size", "12"));

    let mode = "";
    let tmp = "";
    const dy = (1 * h) / 3;
    let lastMode: string = "none";
    const smallFontSize = (2 * h) / 3;
    for (let i = 0; i < str.length; i++) {
        const c = str[i];
        if (c == "_" || c == "{" || c == "^" || c == "}") {
            mode += c;
            if (mode == "_{}") {
                const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.textContent = tmp;
                tspan.setAttribute("dy", `${dy}`);
                tspan.setAttribute("data-script", "subscript");
                tspan.style.fontSize = `${smallFontSize}pt`;
                p.appendChild(tspan);
                lastMode = "down";
                mode = "";
                tmp = "";
            } else if (mode == "^{}") {
                const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.textContent = tmp;
                tspan.setAttribute("dy", `-${dy}`);
                tspan.style.fontSize = `${smallFontSize}pt`;
                tspan.setAttribute("data-script", "superscript");
                p.appendChild(tspan);
                lastMode = "up";
                mode = "";
                tmp = "";
            } else if (mode == "_" || mode == "^") {
                const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.textContent = tmp;
                const normaldy = lastMode == "up" ? dy : lastMode == "down" ? -dy : 0;
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
    const p: SVGTextElement = this;
    if (p.x.baseVal.numberOfItems == 0) {
        p.setAttribute('x', "0");
    }
    return p.x.baseVal.getItem(0).value;
};
SVGTextElement.prototype.setX = function (value: number) {
    const p: SVGTextElement = this;
    if (p.x.baseVal.numberOfItems == 0) {
        p.setAttribute('x', "0");
    }
    //p.setAttribute('x', value.toString());


    p.x.baseVal.getItem(0).value = value;
};
SVGTextElement.prototype.getY = function () {
    const p: SVGTextElement = this;
    if (p.y.baseVal.numberOfItems == 0) {
        p.setAttribute('y', "0");
    }
    return p.y.baseVal.getItem(0).value;
};
SVGTextElement.prototype.setY = function (value: number) {
    const p: SVGTextElement = this;
    if (p.y.baseVal.numberOfItems == 0) {
        p.setAttribute('y', "0");
    }
    p.y.baseVal.getItem(0).value = value;
};

