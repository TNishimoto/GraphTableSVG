

import { Rectangle, Point } from "../common/vline";
import * as  HTMLFunctions from "../html/html_functions";
//import * as CSS from "./css";

import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"
import * as ElementExtension from "./element_extension"
import * as SVGGExtension from "./svg_g_extension"
import { pseudoRandomBytes } from "crypto";


//export namespace SVG {
let idCounter: number = 0;

export function getNewID(): number {
    return idCounter++;
}

/**
 * SVGLineElementを生成します。
 * @param x 開始位置のX座標
 * @param y 開始位置のY座標
 * @param x2 終了位置のX座標
 * @param y2 終了位置のY座標
 * @param className SVGLineElementのクラス属性名
 * @returns 生成されたSVGLineElement
 */
export function createLine(x: number, y: number, x2: number, y2: number, className: string): SVGLineElement {
    const line1 = <SVGLineElement>document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.x1.baseVal.value = x;
    line1.x2.baseVal.value = x2;
    line1.y1.baseVal.value = y;
    line1.y2.baseVal.value = y2;
    //line1.style.color = "black";
    line1.setAttribute("class", className)
    /*
    if (className != null) {
    } else {
        line1.style.stroke = "black";
    }
    */

    //line1.style.visibility = "hidden";
    //line1.style.strokeWidth = `${5}`
    //line1.setAttribute('stroke', 'black');
    return line1;
}




/**
 * SVGTextElementを生成します。
 * @param className 生成するSVG要素のクラス属性名
 * @returns 生成されたSVGTextElement
 */
export function createText(className: string): SVGTextElement {
    const _svgText: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    _svgText.setAttribute(AttributeNames.objectIDName, (idCounter++).toString());
    //_svgText.style.textAnchor = "middle";
    _svgText.setAttribute("class", className);
    /*
    if (className == null) {
        
    } else {
    }
    */
    return _svgText;
}

/**
 * SVGRectElementを生成します。
 * @param parent 生成したSVG要素を子に追加する要素
 * @param className 生成するSVG要素のクラス属性名
 * @returns 生成されたSVGRectElement
 */
export function createRectangle(parent: SVGElement, className: string | null = null): SVGRectElement {
    const rect = <SVGRectElement>document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    parent.appendChild(rect);
    rect.width.baseVal.value = 30;
    rect.height.baseVal.value = 30;
    if (className == null) {
        rect.style.fill = "white";
        rect.style.stroke = "black";
        rect.style.strokeWidth = "1pt";
    } else {
        rect.setAttribute("class", className);
        //const dashStyle = rect.getPropertyStyleValue(GraphTableSVG.AttributeNames.Style.msoDashStyleName);
        //if (dashStyle != null) msoDashStyle.setStyle(rect, dashStyle);

        const width = ElementExtension.getPropertyStyleNumberValue(rect, StyleNames.defaultWidth, null);
        if (width != null) {
            rect.width.baseVal.value = width;
        }
        const height = ElementExtension.getPropertyStyleNumberValue(rect, StyleNames.defaultHeight, null);
        if (height != null) {
            rect.height.baseVal.value = height;
        }

    }
    return rect;
}
/**
 * SVGRectElementを生成します。
 * @param parent 生成したSVG要素を子に追加する要素
 * @param className 生成するSVG要素のクラス属性名
 * @returns 生成されたSVGRectElement
 */
export function createCellRectangle(parent: SVGElement, className: string | null = null): SVGRectElement {
    const rect = <SVGRectElement>document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.width.baseVal.value = 0;
    parent.appendChild(rect);
    if (className != null) {
        rect.setAttribute("class", className);
    }
    return rect;
}


/**
 * SVGGElementを生成します。
 * @param className 生成するSVG要素のクラス属性名
 * @returns 生成されたSVGGElement
 */
export function createGroup(parent: HTMLElement | SVGElement | null): SVGGElement {
    const g = <SVGGElement>document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute(AttributeNames.objectIDName, (idCounter++).toString());
    /*
    if (className != null) {
        g.setAttribute("class", className);
    }
    */
    if (parent != null) parent.appendChild(g);
    return g;
}
/**
 * Styleの設定を消去します。
 * @param style 消去するStyle
 */
export function resetStyle(style: CSSStyleDeclaration) {
    (<any>style).stroke = null;
    (<any>style).strokeWidth = null;
    (<any>style).fill = null;
    (<any>style).fontSize = null;
    (<any>style).fontWeight = null;
    (<any>style).fontFamily = null;
    /*
    style.removeProperty(AttributeNames.Style.paddingTop);
    style.removeProperty(AttributeNames.Style.paddingLeft);
    style.removeProperty(AttributeNames.Style.paddingRight);
    style.removeProperty(AttributeNames.Style.paddingBottom);
    */
}

/**
 * SVGCircleElementを生成します。
 * @param parent 生成したSVG要素を子に追加する要素
 * @param className 生成するSVG要素のクラス属性名
 * @returns 生成されたSVGCircleElement
 */
export function createCircle(parent: SVGElement, className: string | null = null): SVGCircleElement {
    const circle = <SVGCircleElement>document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    parent.appendChild(circle);
    circle.r.baseVal.value = AttributeNames.defaultCircleRadius;
    if (className == null) {
        circle.style.stroke = "black";
        circle.style.strokeWidth = "1pt";
        circle.style.fill = "white";
    } else {
        circle.setAttribute("class", className);
        const radius = ElementExtension.getPropertyStyleNumberValue(circle,StyleNames.defaultRadius, null);
        if (radius != null) {
            circle.r.baseVal.value = radius;
        }

        //const dashStyle = circle.getPropertyStyleValue(GraphTableSVG.AttributeNames.Style.msoDashStyleName);
        //if (dashStyle != null) msoDashStyle.setStyle(circle, dashStyle);
    }
    //circle.style.fill = "#ffffff";
    circle.cx.baseVal.value = 0;
    circle.cy.baseVal.value = 0;
    //circle.r.baseVal.value = r;

    return circle;
}



/**
 * Edgeの矢じりとして使うSVGMarkerElementを作成します。
 * @param className 生成するSVG要素のクラス属性名
 * @returns 生成されたSVGMarkerElement
 */
export function createMarker(option: { className?: string, strokeWidth?: string, color?: string } = {}): [SVGMarkerElement, SVGPathElement] {
    const marker = <SVGMarkerElement>document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    //const poly = <SVGPolygonElement>document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const poly = <SVGPathElement>document.createElementNS('http://www.w3.org/2000/svg', 'path');
    poly.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
    //poly.setAttribute("points", "0,0 0,10 10,5");

    if (option.color != undefined) {
        ElementExtension.setPropertyStyleValue(poly,"stroke", option.color);
        ElementExtension.setPropertyStyleValue(marker,"fill", option.color);

    } else {
        ElementExtension.setPropertyStyleValue(poly,"stroke", "black");
        ElementExtension.setPropertyStyleValue(marker,"fill", "black");

    }
    ElementExtension.setPropertyStyleValue(poly,"stroke-width", "1px");
    //poly.setAttribute("data-skip", "1");

    marker.setAttribute("markerUnits", "userSpaceOnUse");
    marker.setAttribute("markerHeight", "15");
    marker.setAttribute("markerWidth", "15");
    marker.setAttribute("refX", "10");
    marker.setAttribute("refY", "5");
    //marker.setAttribute("data-skip", "1");


    //marker.refX.baseVal.value = 10;
    //marker.refY.baseVal.value = 5;

    marker.setAttribute("preserveAspectRatio", "none");
    marker.setAttribute("orient", "auto");
    marker.setAttribute("viewBox", "0 0 10 10")
    //marker.setAttribute("stroke-width", "1px");
    marker.appendChild(poly);

    if (option.className != null) {
        //marker.setAttribute("class", option.className);
        //poly.setAttribute("class", className);
    } else {
    }

    return [marker, poly];

}
/**
 * SVGTextElementを子に持つSVGTextPathElementを作成します。
 * @param className 生成するSVGTextPathElementのクラス属性名
 * @returns 生成されたSVGTextElementとSVGTextPathElement
 */
export function createTextPath(className: string | null = null): [SVGTextElement, SVGTextPathElement] {
    const text: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');;
    const path = <SVGTextPathElement>document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
    text.appendChild(path);

    if (className == null) {
        path.style.fill = "black";
        path.style.fontSize = "14px";
        path.style.fontWeight = "bold";
        path.style.fontFamily = 'Times New Roman';
    } else {
        path.setAttribute("class", className);
    }
    return [text, path];
}

/**
* SVGTextElementを子に持つSVGTextPathElementを作成します。
* @param className 生成するSVGTextPathElementのクラス属性名
* @returns 生成されたSVGTextElementとSVGTextPathElement
*/
export function createTextPath2(className?: string): SVGTextPathElement {
    const path = <SVGTextPathElement>document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
    if (className !== undefined) {
        path.setAttribute("class", className);
    }
    return path;
}






/**
 * SVG要素にクラス属性をセットします。
 * @param svg 適用されるSVG要素
 * @param className クラス属性名
 */
export function setClass(svg: SVGElement, className: string | null = null) {
    if (className == null) {
        svg.removeAttribute("class");
    } else {
        resetStyle(svg.style);
        svg.setAttribute("class", className);
    }
}








/**
 * 未使用。
 * @param name 
 */
export function getStyleSheet(name: string): CSSStyleDeclaration | null {
    const name2 = "." + name;
    for (let i = 0; i < document.styleSheets.length; i++) {
        const sheet = <CSSStyleSheet>document.styleSheets.item(i);
        const rules: CSSRuleList | null = sheet.cssRules || sheet.rules;
        if (rules != null) {
            for (let j = 0; j < rules.length; j++) {
                const rule = <CSSStyleRule>rules.item(j);
                if (rule.selectorText == name2) {
                    return rule.style;
                }
            }
        }
    }
    return null;
}


export function getRegion2(e: SVGElement): Rectangle {
    if (e instanceof SVGSVGElement) {
        const elements = <SVGElement[]>HTMLFunctions.getChildren(e).filter((v) => v instanceof SVGElement);
        const rectangles = elements.map((v) => getRegion2(v));

        const parentRect = e.getBoundingClientRect();
        const rect = Rectangle.merge(rectangles);
        let r = new Rectangle();
        r.x = 0;
        r.y = 0;

        r.width = rect.width + (rect.x - parentRect.left);
        r.height = rect.height + (rect.y - parentRect.top);

        return r;

    }
    else if (e instanceof SVGGElement) {
        /*
        const elements = <SVGElement[]>HTMLFunctions.getChildren(e).filter((v) => v instanceof SVGElement);
        const rectangles = elements.map((v) => getRegion2(v));
        const region = Rectangle.merge(rectangles);
                        
        return region;
        */
        const rect = e.getBoundingClientRect();
        let r = new Rectangle(rect.left, rect.top, rect.width, rect.height);
        return r;

    } else {
        const rect = e.getBoundingClientRect();
        let r = new Rectangle(rect.left, rect.top, rect.width, rect.height);
        return r;
    }
}

export function getSVGSVG(e: SVGElement): SVGSVGElement {
    if (e instanceof SVGSVGElement) {
        return e;
    } else {
        const parent = e.parentElement;
        if (parent instanceof SVGElement) {
            return getSVGSVG(parent);
        } else {
            throw Error("svgsvg");
        }

    }


}

export function getLeastContainer(e: SVGElement): SVGGElement | SVGSVGElement | null {
    const parent = e.parentElement;

    if (parent instanceof SVGSVGElement || parent instanceof SVGGElement) {
        return parent;
    } else if (parent == null) {
        return null;
    } else {
        if (parent instanceof SVGElement) {
            return getLeastContainer(parent);
        } else {
            return null;
        }

    }
}
export function getAbsolutePosition(g: SVGGElement | SVGSVGElement): Point {
    if (g instanceof SVGSVGElement) {
        const rect = g.getBoundingClientRect();
        return { x: rect.left, y: rect.top }
    } else {
        const parent = getLeastContainer(g);
        if (parent instanceof SVGSVGElement) {
            const rect = parent.getBoundingClientRect();
            const x = rect.left + SVGGExtension.getX(g);
            const y = rect.top + SVGGExtension.getY(g);
            return { x: x, y: y }
        } else if (parent instanceof SVGGElement) {
            const rect = getAbsolutePosition(parent);
            const x = rect.x + SVGGExtension.getX(g);
            const y = rect.y + SVGGExtension.getY(g);
            return { x: x, y: y }
        } else {
            throw Error("error");
        }

    }
}
export function isSVGSVGHidden(e: SVGElement): boolean {
    const svgsvg = getSVGSVG(e);
    return !HTMLFunctions.isShow(svgsvg);
}
export function isSVGHidden(e: SVGElement): boolean {
    if (e instanceof SVGSVGElement) {
        return false;
    } else {
        const p = getComputedStyle(e);
        const disp = p.display;
        const vis = p.visibility;

        if (disp == "none" || vis == "hidden") {
            return true;
        } else {
            const parent = e.parentElement;
            if (parent instanceof SVGElement) {
                return isSVGHidden(parent);
            } else {
                throw Error("svg");
            }
        }
    }
}



//}
