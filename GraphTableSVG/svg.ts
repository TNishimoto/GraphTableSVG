﻿
namespace GraphTableSVG {

    /**
     * SVGLineElementを生成します。
     * @param x
     * @param y
     * @param x2
     * @param y2
     * @param className
     */
    export function createLine(x: number, y: number, x2: number, y2: number, className: string | null = null): SVGLineElement {
        const line1 = <SVGLineElement>document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.x1.baseVal.value = x;
        line1.x2.baseVal.value = x2;
        line1.y1.baseVal.value = y;
        line1.y2.baseVal.value = y2;
        //line1.style.color = "black";
        if (className != null) {
            line1.setAttribute("class", className)
        } else {
            line1.style.stroke = "black";
        }

        //line1.style.visibility = "hidden";
        //line1.style.strokeWidth = `${5}`
        //line1.setAttribute('stroke', 'black');
        return line1;
    }
    export function createPath(x: number, y: number, x2: number, y2: number, className: string | null = null): SVGPathElement {
        const line1 = <SVGPathElement>document.createElementNS('http://www.w3.org/2000/svg', 'path');
        line1.setAttribute("d", `M ${x} ${y} M ${x2} ${y2}`);
        if (className != null) {
            line1.setAttribute("class", className)
        } else {
            line1.style.stroke = "black";
            line1.style.fill = "none";
        }
        return line1;
    }

    /**
     * SVGTextElementを生成します。
     * @param className
     */
    export function createText(className : string | null = null): SVGTextElement {
        const _svgText: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

        //_svgText.style.textAnchor = "middle";
        if (className == null) {
            _svgText.style.fill = "black";
            _svgText.style.fontSize = "14px";
            _svgText.style.fontWeight = "bold";
            _svgText.style.fontFamily = "Yu Gothic";
        } else {
            _svgText.setAttribute("class", className);
            //_svgText.className = className;
        }
        return _svgText;
    }
    
    /**
     * SVGRectElementを生成します。
     * @param className
     */
    export function createRectangle(className: string | null = null): SVGRectElement {
        const rect = <SVGRectElement>document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.width.baseVal.value = 30;
        rect.height.baseVal.value = 30;
        if (className == null) {
            rect.style.fill = "#ffffff";
            rect.style.stroke = "#000000";
        } else {
            rect.setAttribute("class", className);
            
        }
        return rect;
    }
    

    /**
     * SVGGElementを生成します。
     * @param className
     */
    export function createGroup(className : string | null = null): SVGGElement {
        const g = <SVGGElement>document.createElementNS('http://www.w3.org/2000/svg', 'g');
        if (className != null) {
            g.setAttribute("class", className);
        }
        return g;
    }
    /**
     * Styleの設定を消去します。
     * @param style
     */
    export function resetStyle(style: CSSStyleDeclaration) {
        style.stroke = null;
        style.strokeWidth = null;
        style.fill = null;
        style.fontSize = null;
        style.fontWeight = null;
        style.fontFamily = null;
    }
    const defaultRadiusName = "--default-radius";
    const defaultWidthName = "--default-width";
    const defaultHeightName = "--default-height";

    /**
     * SVGCircleElementを生成します。
     * @param className
     */
    export function createCircle(className : string | null = null): SVGCircleElement {
        const circle = <SVGCircleElement>document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.r.baseVal.value = 30;
        if (className == null) {
            circle.style.stroke = "black";
            circle.style.strokeWidth = "1pt";
            circle.style.fill = "#ffffff";
        } else {
            circle.setAttribute("class", className);
            //const s = circle.getActiveStyle().getPropertyValue(defaultRadiusName).trim();
            //circle.className = className
            //console.log("d : " + circle.setAttribute("class", className));
        }
        //circle.style.fill = "#ffffff";
        circle.cx.baseVal.value = 0;
        circle.cy.baseVal.value = 0;
        //circle.r.baseVal.value = r;
        
        return circle;
    }
    export function setDefaultValue(item: SVGCircleElement | SVGRectElement) {
        const className = item.getAttribute("class");
        if (className != null) {
            const style = getStyleSheet(className);
            if (style != null) {
                if (item instanceof SVGCircleElement) {
                    const s = style.getPropertyValue(defaultRadiusName).trim();
                    if (s.length > 0) {
                        item.r.baseVal.value = Number(s);
                    }
                } else {
                    const s1 = style.getPropertyValue(defaultWidthName).trim();
                    if (s1.length > 0) {
                        item.width.baseVal.value = Number(s1);
                    }

                    const s2 = style.getPropertyValue(defaultHeightName).trim();
                    if (s2.length > 0) {
                        item.height.baseVal.value = Number(s2);
                    }
                }
            }
        }
    }

    export function setClass(svg: SVGElement, className: string | null = null) {
        if (className == null) {
            svg.removeAttribute("class");
        } else {
            resetStyle(svg.style);
            svg.setAttribute("class", className);
        }
    }
    function getCSSStyle(svg: HTMLElement): CSSStyleDeclaration | null {
        if (svg.getAttribute("class") == null) {
            return null;
        } else {
            const css = getComputedStyle(svg);
            return css;
        }
    }
    export function setCSSToStyle(svg: HTMLElement) {
        const css = getCSSStyle(svg);
        if (css != null) {
            let css2: CSSStyleDeclaration = css;
            cssPropertyNames.forEach((v) => {
                const value = css2.getPropertyValue(v).trim();
                if (value.length > 0) {
                    svg.style.setProperty(v, value);
                }
            });
        }
    }
    export function setCSSToAllElementStyles(item: HTMLElement | string) {
        if (typeof item == 'string') {
            const svgBox: HTMLElement | null = document.getElementById(item);
            if (svgBox != null) {
                setCSSToAllElementStyles(svgBox);
            }
        }
        else{

            setCSSToStyle(item);
            for (let i = 0; i < item.children.length; i++) {
                const child = <HTMLElement>item.children.item(i);
                if (child != null) {
                    setCSSToAllElementStyles(child);
                }
            }
        }
    }
    const cssPropertyNames : string[] = ["font-size", "fill", "stroke"];

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
}
