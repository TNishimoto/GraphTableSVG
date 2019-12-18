
import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"

declare global {
    export interface SVGGElement {
        /**
         * X座標を取得します。
         */
        getX(): number;
        /**
         * X座標を設定します。
         */
        setX(value: number): void;
        /**
         * Y座標を取得します。
         */
        getY(): number;
        /**
         * Y座標を設定します。
         */
        setY(value: number): void;
    }
    export interface SVGElement {

        getPaddingLeft(): number;
        getPaddingTop(): number;
        getPaddingRight(): number;
        getPaddingBottom(): number;
    
    
        setPaddingLeft(value: number): void;
        setPaddingTop(value: number): void;
        setPaddingRight(value: number): void;
        setPaddingBottom(value: number): void;
    
    }
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

SVGElement.prototype.getPaddingTop = function () {
    const p: SVGElement = this;
    return p.getPropertyStyleNumberValue(StyleNames.paddingTop, 5)!;
};
SVGElement.prototype.getPaddingLeft = function () {
    const p: SVGElement = this;
    return p.getPropertyStyleNumberValue(StyleNames.paddingLeft, 5)!;
};
SVGElement.prototype.getPaddingRight = function () {
    const p: SVGElement = this;
    return p.getPropertyStyleNumberValue(StyleNames.paddingRight, 5)!;
};
SVGElement.prototype.getPaddingBottom = function () {
    const p: SVGElement = this;
    return p.getPropertyStyleNumberValue(StyleNames.paddingBottom, 5)!;
};

SVGElement.prototype.setPaddingLeft = function (value: number) {
    const p: SVGElement = this;
    p.setPropertyStyleValue(StyleNames.paddingLeft, value.toString());
};
SVGElement.prototype.setPaddingTop = function (value: number) {
    const p: SVGElement = this;
    p.setPropertyStyleValue(StyleNames.paddingTop, value.toString());
};
SVGElement.prototype.setPaddingRight = function (value: number) {
    const p: SVGElement = this;
    p.setPropertyStyleValue(StyleNames.paddingRight, value.toString());
};
SVGElement.prototype.setPaddingBottom = function (value: number) {
    const p: SVGElement = this;
    p.setPropertyStyleValue(StyleNames.paddingBottom, value.toString());
};