interface SVGGElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}
SVGGElement.prototype.getX = function () {
    var p: SVGGElement = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "translate(0,0)");
    }
    return p.transform.baseVal.getItem(0).matrix.e;
};
SVGGElement.prototype.setX = function (value: number) {
    var p: SVGGElement = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "translate(0,0)");
    }

    return this.transform.baseVal.getItem(0).matrix.e = value;
};
SVGGElement.prototype.getY = function () {
    var p: SVGGElement = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "translate(0,0)");
    }

    return this.transform.baseVal.getItem(0).matrix.f;
};
SVGGElement.prototype.setY = function (value: number) {
    var p: SVGGElement = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "translate(0,0)");
    }

    return this.transform.baseVal.getItem(0).matrix.f = value;
};

interface CSSStyleDeclaration {
    getHorizontalAnchor(): GraphTableSVG.HorizontalAnchor | null;
    setHorizontalAnchor(value: GraphTableSVG.HorizontalAnchor | null): void;
    getVerticalAnchor(): GraphTableSVG.VerticalAnchor | null;
    setVerticalAnchor(value: GraphTableSVG.VerticalAnchor | null): void;
}
CSSStyleDeclaration.prototype.getHorizontalAnchor = function () {
    var p: CSSStyleDeclaration = this;
    var r = p.getPropertyValue("--horizontal-anchor").trim();
    if (r == "left") {
        return GraphTableSVG.HorizontalAnchor.Left;
    } else if (r == "right") {
        return GraphTableSVG.HorizontalAnchor.Right;

    } else if (r == "center") {
        return GraphTableSVG.HorizontalAnchor.Center;
    } else {
        return null;
    }
}
CSSStyleDeclaration.prototype.setHorizontalAnchor = function (value: GraphTableSVG.HorizontalAnchor | null) {
    var p: CSSStyleDeclaration = this;
    if (value == GraphTableSVG.HorizontalAnchor.Left) {
        p.setProperty("--horizontal-anchor", "left");
    } else if (value == GraphTableSVG.HorizontalAnchor.Right) {

        p.setProperty("--horizontal-anchor", "right");
    } else if (value == GraphTableSVG.HorizontalAnchor.Center) {

        p.setProperty("--horizontal-anchor", "center");
    } else {
        p.setProperty("--horizontal-anchor", null);
    }
}
CSSStyleDeclaration.prototype.getVerticalAnchor = function () {
    var p: CSSStyleDeclaration = this;
    var r = p.getPropertyValue("--vertical-anchor").trim();
    if (r == "bottom") {
        return GraphTableSVG.VerticalAnchor.Bottom;
    } else if (r == "middle") {
        return GraphTableSVG.VerticalAnchor.Middle;

    } else if (r == "top") {
        return GraphTableSVG.VerticalAnchor.Top;
    } else {
        return null;
    }
}
CSSStyleDeclaration.prototype.setVerticalAnchor = function (value: GraphTableSVG.VerticalAnchor | null) {
    var p: CSSStyleDeclaration = this;
    if (value == GraphTableSVG.VerticalAnchor.Bottom) {
        p.setProperty("--vertical-anchor", "bottom");
    } else if (value == GraphTableSVG.VerticalAnchor.Middle) {

        p.setProperty("--vertical-anchor", "middle");
    } else if (value == GraphTableSVG.VerticalAnchor.Top) {

        p.setProperty("--vertical-anchor", "top");
    } else {
        p.setProperty("--vertical-anchor", null);
    }
}
interface SVGElement {
    getActiveStyle(): CSSStyleDeclaration;
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

interface SVGTextElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}
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
    return p.x.baseVal.getItem(0).value = value;
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
    return p.y.baseVal.getItem(0).value = value;
};