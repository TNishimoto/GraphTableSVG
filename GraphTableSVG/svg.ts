
namespace GraphTableSVG {
    export namespace SVG {
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
        export const msoDashStyleName = "--stroke-style";
        /**
             * SVGPathElementを生成します。
             * @param x
             * @param y
             * @param x2
             * @param y2
             * @param className
             */
        export function createPath(parent : SVGElement | HTMLElement, x: number, y: number, x2: number, y2: number, className: string | null = null): SVGPathElement {
            const line1 = <SVGPathElement>document.createElementNS('http://www.w3.org/2000/svg', 'path');
            parent.appendChild(line1);
            line1.setAttribute("d", `M ${x} ${y} M ${x2} ${y2}`);
            if (className != null) {
                line1.setAttribute("class", className)
                const dashStyle = line1.getPropertyStyleValue(msoDashStyleName);
                if(dashStyle != null){
                    msoDashStyle.setStyle(line1, dashStyle);
                }
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
        export function createText(className: string | null = null): SVGTextElement {
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
        export function createRectangle(parent : SVGElement, className: string | null = null): SVGRectElement {
            const rect = <SVGRectElement>document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            parent.appendChild(rect);
            rect.width.baseVal.value = 30;
            rect.height.baseVal.value = 30;
            if (className == null) {
                rect.style.fill = "#ffffff";
                rect.style.stroke = "#000000";
            } else {
                rect.setAttribute("class", className);
                const dashStyle = rect.getPropertyStyleValue(GraphTableSVG.SVG.msoDashStyleName);
                if(dashStyle != null) msoDashStyle.setStyle(rect, dashStyle);

                const width = rect.getPropertyStyleNumberValue(SVG.defaultWidthName);
                if(width != null){
                    rect.width.baseVal.value = width;
                }
                const height = rect.getPropertyStyleNumberValue(SVG.defaultHeightName);
                if(height != null){
                    rect.height.baseVal.value = height;
                }

            }
            return rect;
        }


        /**
         * SVGGElementを生成します。
         * @param className
         */
        export function createGroup(className: string | null = null): SVGGElement {
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
        export const defaultRadiusName = "--default-radius";
        export const defaultWidthName = "--default-width";
        export const defaultHeightName = "--default-height";
        export let defaultCircleRadius = 30;

        /**
         * SVGCircleElementを生成します。
         * @param className
         */
        export function createCircle(parent : SVGElement, className: string | null = null): SVGCircleElement {
            const circle = <SVGCircleElement>document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            parent.appendChild(circle);
            circle.r.baseVal.value = defaultCircleRadius;
            if (className == null) {
                circle.style.stroke = "black";
                circle.style.strokeWidth = "1pt";
                circle.style.fill = "#ffffff";
            } else {
                circle.setAttribute("class", className);
                const radius = circle.getPropertyStyleNumberValue(SVG.defaultRadiusName);
                if(radius != null){
                    circle.r.baseVal.value = radius;
                }

                const dashStyle = circle.getPropertyStyleValue(GraphTableSVG.SVG.msoDashStyleName);
                if(dashStyle != null) msoDashStyle.setStyle(circle, dashStyle);
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
        export function createMarker(className: string | null = null): SVGMarkerElement {
            const marker = <SVGMarkerElement>document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            const poly = <SVGPolygonElement>document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            poly.setAttribute("points", "0,0 0,10 10,5");
            poly.setAttribute("fill", "red");
            marker.setAttribute("markerUnits", "userSpaceOnUse");
            marker.setAttribute("markerHeight", "15");
            marker.setAttribute("markerWidth", "15");
            marker.refX.baseVal.value = 10;
            marker.refY.baseVal.value = 5;

            marker.setAttribute("preserveAspectRatio", "none");
            marker.setAttribute("orient", "auto-start-reverse");
            marker.setAttribute("viewBox", "0 0 10 10")
            marker.appendChild(poly);

            if (className != null) {
                marker.setAttribute("class", className);
            }
            return marker;

        }
        export function createTextPath(className: string | null = null): [SVGTextElement, SVGTextPathElement] {
            const text: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');;
            const path = <SVGTextPathElement>document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
            text.appendChild(path);

            if(className == null){
            path.style.fill = "black";
            path.style.fontSize = "14px";
            path.style.fontWeight = "bold";
            path.style.fontFamily = "Yu Gothic";
            }else{
                path.setAttribute("class", className);
            }
            return [text, path];
        }
        function createTextSpans(str: string, className: string | null = null, fontsize: number = 12, fstdx: number | null = null, fstdy: number | null = null): SVGTSpanElement[] {
            let r: SVGTSpanElement[] = [];
            str += "_";
            //const p: SVGTextElement = this;
            //p.textContent = "";
            //const h = parseInt(p.getPropertyStyleValueWithDefault("font-size", "12"));
            let isFst = true;
            let mode = "";
            let tmp = "";
            const char_dy = (1 * fontsize) / 3;
            let lastMode: string = "none";
            const smallFontSize = (2 * fontsize) / 3;
            for (let i = 0; i < str.length; i++) {
                const c = str[i];
                if (c == "_" || c == "{" || c == "^" || c == "}") {
                    mode += c;
                    if (mode == "_{}") {
                        const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        tspan.textContent = tmp;
                        tspan.setAttribute("dy", `${char_dy}`);
                        tspan.setAttribute("data-script", "subscript");
                        tspan.style.fontSize = `${smallFontSize}pt`;
                        r.push(tspan)
                        lastMode = "down";
                        mode = "";
                        tmp = "";
                    } else if (mode == "^{}") {
                        const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        tspan.textContent = tmp;
                        tspan.setAttribute("dy", `-${char_dy}`);
                        tspan.style.fontSize = `${smallFontSize}pt`;
                        tspan.setAttribute("data-script", "superscript");
                        r.push(tspan)
                        lastMode = "up";
                        mode = "";
                        tmp = "";
                    } else if (mode == "_" || mode == "^") {
                        const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        tspan.textContent = tmp;
                        const normaldy = lastMode == "up" ? char_dy : lastMode == "down" ? -char_dy : 0;
                        if (isFst) {
                            if (fstdx != null) tspan.setAttribute("dx", `${fstdx}`);
                            if (fstdy != null) tspan.setAttribute("dy", `${fstdy}`);

                        } else {
                            tspan.setAttribute("dy", `${normaldy}`);
                        }
                        r.push(tspan)
                        lastMode = "none";
                        tmp = "";
                        isFst = false;
                    }
                }
                else {
                    tmp += c;
                }
            }
            return r;
        }
        function createSingleTextSpan(str: string, className: string | null = null): SVGTSpanElement {
            const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.textContent = str;

            return tspan;
        }

        export function setTextToTextPath(path: SVGTextPathElement, str: string, isLatexMode: boolean) {
            path.textContent = "";
            const fontSize = path.getPropertyStyleValueWithDefault("font-size", "12");
            if (isLatexMode) {
                createTextSpans(str, null, parseInt(fontSize)).forEach((v) => path.appendChild(v));
            } else {
                path.appendChild(createSingleTextSpan(str, null));
            }
        }
        export function setTextToSVGText(path: SVGTextElement, str: string, isLatexMode: boolean) {
            path.textContent = "";
            const fontSize = path.getPropertyStyleValueWithDefault("font-size", "12");
            const fs = parseInt(fontSize);
            let dx = 0;

            str.split("\n").forEach((w) => {
                let dy = fs;
                let width = 0;
                if (isLatexMode) {
                    createTextSpans(w, null, fs, dx, dy).forEach((v) => {
                        path.appendChild(v)
                        const rect = v.getBoundingClientRect();
                        dx = 0;
                        dy = 0;
                        width += rect.width;
                    });

                    dy += fs;
                } else {
                    path.appendChild(createSingleTextSpan(w, null));
                }
                dx = -width;
            }
            );


        }

        /*
        export function setDefaultValue(item: SVGCircleElement | SVGRectElement, style: CSSStyleDeclaration | null = null) {
            const className = item.getAttribute("class");
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
            } else {
                
                if (className != null) {
                    const cssStyle = getStyleSheet(className);

                    if (cssStyle != null) {
                        setDefaultValue(item, cssStyle)
                    } else {
                        const computedStyle = getComputedStyle(item);
                        setDefaultValue(item, computedStyle);
                    }
                }
                
            }

            
        }
        */

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
            else {

                setCSSToStyle(item);
                for (let i = 0; i < item.children.length; i++) {
                    const child = <HTMLElement>item.children.item(i);
                    if (child != null) {
                        setCSSToAllElementStyles(child);
                    }
                }
            }
        }
        const cssPropertyNames: string[] = ["font-size", "fill", "stroke", "font-family"];

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
        /*
        export function setStyleForPNG(svg: SVGElement) {
            const style = getComputedStyle(svg);
            svg.style.fill = style.fill;
            svg.style.stroke = style.stroke;
            svg.style.strokeWidth = style.stroke;
        }
        */
    }
}
