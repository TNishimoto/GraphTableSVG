interface SVGElement {
    
    getPaddingLeft() : number;
    getPaddingTop() : number;
    getPaddingRight() : number;
    getPaddingBottom() : number;

    
    setPaddingLeft(value : number) : void;
    setPaddingTop(value : number) : void;
    setPaddingRight(value : number) : void;
    setPaddingBottom(value : number) : void;

}
SVGElement.prototype.getPaddingTop = function () {
    const p: SVGElement = this;
    return p.getPropertyStyleNumberValue(GraphTableSVG.CustomAttributeNames.Style.paddingTop, 0)!;
};
SVGElement.prototype.getPaddingLeft = function () {
    const p: SVGElement = this;
    return p.getPropertyStyleNumberValue(GraphTableSVG.CustomAttributeNames.Style.paddingLeft, 0)!;
};
SVGElement.prototype.getPaddingRight = function () {
    const p: SVGElement = this;
    return p.getPropertyStyleNumberValue(GraphTableSVG.CustomAttributeNames.Style.paddingRight, 0)!;
};
SVGElement.prototype.getPaddingBottom = function () {
    const p: SVGElement = this;
    return p.getPropertyStyleNumberValue(GraphTableSVG.CustomAttributeNames.Style.paddingBottom, 0)!;
};

SVGElement.prototype.setPaddingLeft = function (value: number) {
    const p: SVGElement = this;    
    p.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.paddingLeft, value.toString());
};
SVGElement.prototype.setPaddingTop = function (value: number) {
    const p: SVGElement = this;    
    p.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.paddingTop, value.toString());
};
SVGElement.prototype.setPaddingRight = function (value: number) {
    const p: SVGElement = this;    
    p.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.paddingRight, value.toString());
};
SVGElement.prototype.setPaddingBottom = function (value: number) {
    const p: SVGElement = this;    
    p.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.paddingBottom, value.toString());
};


interface SVGTextElement {
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
    /**
     * SVGTextElementのテキストを設定します。
     * @param text 設定するテキスト
     * @param isLatexMode TrueのときLatex表記を使用します。
     */
    setTextContent(text: string, isLatexMode: boolean): void;
    setTextContent(text: string): void;

    getMarginLeft() : number;
    setMarginLeft(value : number) : void;
    getMarginTop() : number;
    setMarginTop(value : number) : void;
    getMarginRight() : number;
    setMarginRight(value : number) : void;
    getMarginBottom() : number;
    setMarginBottom(value : number) : void;
    gtSetXY(rect: GraphTableSVG.Rectangle, vAnchor: string | null, hAnchor: string | null, isAutoSizeShapeToFitText: boolean) : void;


}
SVGTextElement.prototype.gtSetXY = function (rect: GraphTableSVG.Rectangle, vAnchor: string | null, hAnchor: string | null, isAutoSizeShapeToFitText: boolean) {
    const text : SVGTextElement = this;
    let x = rect.x;
    let y = rect.y;
    text.setAttribute('x', x.toString());
    text.setAttribute('y', y.toString());

    const b2 = text.getBBox();

    const dy = b2.y - y;
    const dx = b2.x - x;

    y -= dy;
    x -= dx;
    if (vAnchor == GraphTableSVG.VerticalAnchor.Middle) {
        y += (rect.height - b2.height) / 2
    } else if (vAnchor == GraphTableSVG.VerticalAnchor.Bottom) {
        y += rect.height - b2.height;
    }

    if (hAnchor == GraphTableSVG.HorizontalAnchor.Center) {
        x += (rect.width - b2.width) / 2;
    } else if (hAnchor == GraphTableSVG.HorizontalAnchor.Right) {
        x += rect.width - b2.width;
    }

    text.setAttribute('y', y.toString());
    text.setAttribute('x', x.toString());
}



SVGTextElement.prototype.getMarginLeft = function () {
    const p: SVGTextElement = this;
    return p.getPropertyStyleNumberValue(GraphTableSVG.CustomAttributeNames.Style.marginLeft, 0)!;
};
SVGTextElement.prototype.setMarginLeft = function (value: number) {
    const p: SVGTextElement = this;    
    p.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.marginLeft, value.toString());
};
SVGTextElement.prototype.getMarginTop = function () {
    const p: SVGTextElement = this;
    return p.getPropertyStyleNumberValue(GraphTableSVG.CustomAttributeNames.Style.marginTop, 0)!;
};
SVGTextElement.prototype.setMarginTop = function (value: number) {
    const p: SVGTextElement = this;    
    p.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.marginTop, value.toString());
};
SVGTextElement.prototype.getMarginRight = function () {
    const p: SVGTextElement = this;
    return p.getPropertyStyleNumberValue(GraphTableSVG.CustomAttributeNames.Style.marginRight, 0)!;
};
SVGTextElement.prototype.setMarginRight = function (value: number) {
    const p: SVGTextElement = this;    
    p.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.marginRight, value.toString());
};
SVGTextElement.prototype.getMarginBottom = function () {
    const p: SVGTextElement = this;
    return p.getPropertyStyleNumberValue(GraphTableSVG.CustomAttributeNames.Style.marginBottom, 0)!;
};
SVGTextElement.prototype.setMarginBottom = function (value: number) {
    const p: SVGTextElement = this;    
    p.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.marginBottom, value.toString());
};


SVGTextElement.prototype.setTextContent = function (text: string, isLatexMode: boolean = false) {
    GraphTableSVG.SVG.setTextToSVGText(this, text, isLatexMode);
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