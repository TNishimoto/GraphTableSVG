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