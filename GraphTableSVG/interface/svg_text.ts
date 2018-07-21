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
}

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