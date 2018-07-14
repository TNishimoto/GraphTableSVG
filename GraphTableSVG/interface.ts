
interface SVGGElement {
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
    getPropertyStyleNumberValue(name: string): number | null;
    
    getPropertyStyleValueWithDefault(name: string, defaultValue: string): string;
    setPropertyStyleValue(name: string, value: string | null): void;

    /*
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
    */
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
SVGElement.prototype.getPropertyStyleNumberValue = function (name: string): number | null {
    const item: SVGElement = this;
    const p = item.getPropertyStyleValue(name);
    if(p != null){
        return GraphTableSVG.Common.toPX(p);
    }else{
        return null;
    }
}
SVGElement.prototype.setPropertyStyleValue = function (name: string, value: string | null) {
    const item: SVGElement = this;

    item.style.setProperty(name, value);
}

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
interface SVGTextPathElement {
    /**
     * SVGTextElementのテキストを設定します。
     * @param text 設定するテキスト
     * @param isLatexMode TrueのときLatex表記を使用します。
     */
    setTextContent(text: string, isLatexMode: boolean): void;
    setTextContent(text: string): void;
}
SVGTextPathElement.prototype.setTextContent = function (text: string, isLatexMode: boolean = false) {
    GraphTableSVG.SVG.setTextToTextPath(this, text, isLatexMode);
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

interface SVGLineElement {
    /**
     * SVGLineElementを強調するかどうかを設定します。
     * @param b Trueなら強調。Falseなら強調しません。
     */
    setEmphasis(b: boolean) : void;
    /**
     * SVGLineElementが強調されているときにかぎりTrueを返します。
     */
    getEmphasis(): boolean;

}

SVGLineElement.prototype.getEmphasis = function (){
    const p: SVGLineElement = this;
    
    const emp = p.getAttribute("class");
    if (emp != null) {
        return emp == GraphTableSVG.Cell.emphasisBorderClass;
    } else {
        return false;
    }
};
SVGLineElement.prototype.setEmphasis = function (value: boolean){
    if (GraphTableSVG.Common.getGraphTableCSS() == null) GraphTableSVG.Common.setGraphTableCSS("yellow", "red");

    const p: SVGLineElement = this;
    if (p.getEmphasis() && !value) {
        const tmp = p.getAttribute(GraphTableSVG.Cell.temporaryBorderClass);
        if (tmp != null) {
            p.setAttribute("class", tmp);
            p.removeAttribute(GraphTableSVG.Cell.temporaryBorderClass);

        } else {
            p.removeAttribute("class");

            p.removeAttribute(GraphTableSVG.Cell.temporaryBorderClass);

        }

    }
    else if (!p.getEmphasis() && value) {
        const lineClass = p.getAttribute("class");
        p.setAttribute("class", GraphTableSVG.Cell.emphasisBorderClass);
        if (lineClass != null) {
            p.setAttribute(GraphTableSVG.Cell.temporaryBorderClass, lineClass);
        }
    }
};

interface SVGPathElement {
    /**
     * SVGPathElementの位置を設定します。
     * @param points 
     */
    setPathLocations(points: [number, number][]) : void;
    /**
     * SVGPathElementの位置を取得します。
     */
    getPathLocations(): [number, number][];

}
SVGPathElement.prototype.setPathLocations = function (points: [number, number][]) {

    const p: SVGPathElement = this;
    let s = "";
    for (let i = 0; i < points.length; i++) {
        s += `${i == 0 ? "M" : "L"} ${points[i][0]} ${points[i][1]} `;
    }
    //points.forEach((x, y) => s += `M ${x} ${y} `);
    p.setAttribute("d", s);
};
SVGPathElement.prototype.getPathLocations = function () {

    const p: SVGPathElement = this;
    const info = p.getAttribute("d");
    if (info == null) return [];

    const r: [number, number][] = [];
    let pos: [number, number] = [0, 0];
    let pathType = "";
    console.log(info.split(" "));
    info.split(" ").forEach((v, i) => {
        if (i % 3 == 0) {
            pathType = v;
        } else if (i % 3 == 1) {
            
            pos[0] = parseInt(v);
        } else {
            pos[1] = parseInt(v);
            r.push(pos);
            pos = [0, 0];
        }
    });
    
    return r;
};



/*
SVGElement.prototype.getX = function () {
    const p: SVGElement = this;
    
    if (p.x.baseVal.numberOfItems == 0) {
        p.setAttribute('x', "0");
    }
    return p.x.baseVal.getItem(0).value;
};
SVGElement.prototype.setX = function (value: number) {
    const p: SVGElement = this;
    if (p.x.baseVal.numberOfItems == 0) {
        p.setAttribute('x', "0");
    }
    //p.setAttribute('x', value.toString());


    if (p.x.baseVal.getItem(0).value != value) p.x.baseVal.getItem(0).value = value;
};
SVGElement.prototype.getY = function () {
    const p: SVGElement = this;
    if (p.y.baseVal.numberOfItems == 0) {
        p.setAttribute('y', "0");
    }
    return p.y.baseVal.getItem(0).value;
};
SVGElement.prototype.setY = function (value: number) {
    const p: SVGElement = this;
    if (p.y.baseVal.numberOfItems == 0) {
        p.setAttribute('y', "0");
    }
    if (p.y.baseVal.getItem(0).value != value)p.y.baseVal.getItem(0).value = value;
};
*/

