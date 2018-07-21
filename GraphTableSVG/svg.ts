
namespace GraphTableSVG {
    export namespace SVG {
        /**
         * SVGLineElementを生成します。
         * @param x 開始位置のX座標
         * @param y 開始位置のY座標
         * @param x2 終了位置のX座標
         * @param y2 終了位置のY座標
         * @param className SVGLineElementのクラス属性名
         * @returns 生成されたSVGLineElement
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
             * @param parent 生成したSVGPathElementを子に追加する要素
             * @param x 開始位置のX座標
             * @param y 開始位置のY座標
             * @param x2 終了位置のX座標
             * @param y2 終了位置のY座標
             * @param className SVGPathElementのクラス属性名
             * @returns 生成されたSVGPathElement
             */
        export function createPath(parent: SVGElement | HTMLElement, x: number, y: number, x2: number, y2: number, className: string | null = null): SVGPathElement {
            const line1 = <SVGPathElement>document.createElementNS('http://www.w3.org/2000/svg', 'path');
            parent.appendChild(line1);
            line1.setAttribute("d", `M ${x} ${y} M ${x2} ${y2}`);
            if (className != null) {
                line1.setAttribute("class", className)
                const dashStyle = line1.getPropertyStyleValue(msoDashStyleName);
                if (dashStyle != null) {
                    msoDashStyle.setStyle(line1, dashStyle);
                }
            } else {
                line1.style.stroke = "black";
                line1.style.fill = "none";
                line1.style.strokeWidth = "1pt";
            }
            return line1;
        }


        /**
         * SVGTextElementを生成します。
         * @param className 生成するSVG要素のクラス属性名
         * @returns 生成されたSVGTextElement
         */
        export function createText(className: string | null = null): SVGTextElement {
            const _svgText: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

            //_svgText.style.textAnchor = "middle";
            if (className == null) {
                _svgText.style.fill = "black";
                _svgText.style.fontSize = "14px";
                _svgText.style.fontWeight = "bold";
                _svgText.style.fontFamily = 'Times New Roman';
            } else {
                _svgText.setAttribute("class", className);
                //_svgText.className = className;
            }
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
                rect.style.fill = "#ffffff";
                rect.style.stroke = "#000000";
                rect.style.strokeWidth = "1pt";
            } else {
                rect.setAttribute("class", className);
                const dashStyle = rect.getPropertyStyleValue(GraphTableSVG.SVG.msoDashStyleName);
                if (dashStyle != null) msoDashStyle.setStyle(rect, dashStyle);

                const width = rect.getPropertyStyleNumberValue(SVG.defaultWidthName, null);
                if (width != null) {
                    rect.width.baseVal.value = width;
                }
                const height = rect.getPropertyStyleNumberValue(SVG.defaultHeightName, null);
                if (height != null) {
                    rect.height.baseVal.value = height;
                }

            }
            return rect;
        }


        /**
         * SVGGElementを生成します。
         * @param className 生成するSVG要素のクラス属性名
         * @returns 生成されたSVGGElement
         */
        export function createGroup(parent: HTMLElement | SVGElement | null, className: string | null = null): SVGGElement {
            const g = <SVGGElement>document.createElementNS('http://www.w3.org/2000/svg', 'g');
            if (className != null) {
                g.setAttribute("class", className);
            }
            if(parent != null)parent.appendChild(g);
            return g;
        }
        /**
         * Styleの設定を消去します。
         * @param style 消去するStyle
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
        export let defaultCircleRadius = 15;

        /**
         * SVGCircleElementを生成します。
         * @param parent 生成したSVG要素を子に追加する要素
         * @param className 生成するSVG要素のクラス属性名
         * @returns 生成されたSVGCircleElement
         */
        export function createCircle(parent: SVGElement, className: string | null = null): SVGCircleElement {
            const circle = <SVGCircleElement>document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            parent.appendChild(circle);
            circle.r.baseVal.value = defaultCircleRadius;
            if (className == null) {
                circle.style.stroke = "black";
                circle.style.strokeWidth = "1pt";
                circle.style.fill = "#ffffff";
            } else {
                circle.setAttribute("class", className);
                const radius = circle.getPropertyStyleNumberValue(SVG.defaultRadiusName, null);
                if (radius != null) {
                    circle.r.baseVal.value = radius;
                }

                const dashStyle = circle.getPropertyStyleValue(GraphTableSVG.SVG.msoDashStyleName);
                if (dashStyle != null) msoDashStyle.setStyle(circle, dashStyle);
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
                poly.setPropertyStyleValue("stroke", option.color);
                marker.setPropertyStyleValue("fill", option.color);

            } else {
                poly.setPropertyStyleValue("stroke", "black");
                marker.setPropertyStyleValue("fill", "black");

            }
            poly.setPropertyStyleValue("stroke-width", "1px");
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
         * 入力テキストをLatex表記でパースした結果をSVGTSpanElement配列で返します。
         * @param text Latex表記のテキスト
         * @param className 生成したSVGTSpanElementのクラス属性名
         * @param fontsize 生成したSVGTSpanElementのフォントサイズ
         * @param dxOfFirstElement 生成した最初のSVGTSpanElementのdx
         * @param dyOfFirstElement 生成した最初のSVGTSpanElementのdy
         * @returns 入力テキストをLatex表記でパースした結果をSVGTSpanElement配列
         */
        function createTextSpans(text: string, className: string | null = null,
            fontsize: number = 12, dxOfFirstElement: number | null = null, dyOfFirstElement: number | null = null): SVGTSpanElement[] {
            let r: SVGTSpanElement[] = [];
            text += "_";
            //const p: SVGTextElement = this;
            //p.textContent = "";
            //const h = parseInt(p.getPropertyStyleValueWithDefault("font-size", "12"));
            let isFst = true;
            let mode = "";
            let tmp = "";
            const char_dy = (1 * fontsize) / 3;
            let lastMode: string = "none";
            const smallFontSize = (2 * fontsize) / 3;
            for (let i = 0; i < text.length; i++) {
                const c = text[i];
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
                            if (dxOfFirstElement != null) tspan.setAttribute("dx", `${dxOfFirstElement}`);
                            if (dyOfFirstElement != null) tspan.setAttribute("dy", `${dyOfFirstElement}`);

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
        /**
         * 入力テキストからSVGTSpanElementを生成します。
         * @param text SVGTSpanElementのテキスト
         * @param className SVGTSpanElementのクラス属性名
         * @returns 生成されるSVGTSpanElement
         */
        function createSingleTextSpan(text: string, className: string | null = null): SVGTSpanElement {
            const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.textContent = text;

            if (className != null) {
                tspan.setAttribute("class", className)
            }
            return tspan;
        }

        /**
         * SVGTextPathElementにテキストをセットします。
         * @param path テキストをセットされるパス
         * @param text パスに適用するテキスト
         * @param isLatexMode Latex表記を使用するかどうか 
         */
        export function setTextToTextPath(path: SVGTextPathElement, text: string, isLatexMode: boolean) {
            path.textContent = "";
            const fontSize = path.getPropertyStyleValueWithDefault("font-size", "12");
            if (isLatexMode) {
                createTextSpans(text, null, parseInt(fontSize)).forEach((v) => path.appendChild(v));
            } else {
                path.appendChild(createSingleTextSpan(text, null));
            }
        }
        /**
         * SVGTextElementにテキストをセットします。
         * @param svgText テキストをセットされるSVG要素
         * @param text SVG要素に適用するテキスト
         * @param isLatexMode Latex表記を使用するかどうか 
         */
        export function setTextToSVGText(svgText: SVGTextElement, text: string, isLatexMode: boolean) {
            svgText.textContent = "";
            const fontSize = svgText.getPropertyStyleValueWithDefault("font-size", "12");
            const fs = parseInt(fontSize);
            let dx = 0;

            text.split("\n").forEach((w) => {
                let dy = fs;
                let width = 0;
                if (isLatexMode) {
                    createTextSpans(w, null, fs, dx, dy).forEach((v) => {
                        svgText.appendChild(v)
                        const rect = v.getBoundingClientRect();
                        dx = 0;
                        dy = 0;
                        width += rect.width;
                    });

                    dy += fs;
                } else {
                    svgText.appendChild(createSingleTextSpan(w, null));
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
         * SVG要素のクラス属性名からCSSStyleDeclarationを取得します。
         * @param svg 取得されるSVG要素
         */
        function getCSSStyle(svg: HTMLElement): CSSStyleDeclaration | null {
            if (svg.getAttribute("class") == null) {
                return null;
            } else {
                const css = getComputedStyle(svg);
                return css;
            }
        }
        const exceptionStyleNames = ["marker-start", "marker-mid", "marker-end"];
        /**
         * SVG要素のクラス属性名から取得できるCSSStyleDeclarationを要素のスタイル属性にセットします。
         * @param svg 適用されるSVG要素
         */
        export function setCSSToStyle(svg: HTMLElement, isComplete: boolean = true) {
            if (isComplete) {
                const css: CSSStyleDeclaration = getCSSStyle(svg);
                if (css != null) {
                    for (let i = 0; i < css.length; i++) {
                        const name = css.item(i);
                        const value = css.getPropertyValue(name);
                        if (value.length > 0) {
                            if(!exceptionStyleNames.some((v)=>v==name)){
                                svg.style.setProperty(name, value);
                            }
                        }
                    }
                }

            } else {
                cssPropertyNames.forEach((v) => {
                    const value = getPropertyStyleValue(svg, v);
                    if (value != null) {
                        svg.style.setProperty(v, value);
                    }
                });
            }

            /*
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
            */
        }
        function getPropertyStyleValue(item: HTMLElement, name: string): string | null {
            const p = item.style.getPropertyValue(name).trim();
            if (p.length == 0) {
                const r = item.getAttribute("class");
                if (r == null) {
                    return null;
                } else {
                    const css = getCSSStyle(item);
                    //const css = getComputedStyle(item);
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

        function getAllElementStyleMapSub(item: HTMLElement | string, output : { [key: number]: string | null; }, id : number) : number {
            if (typeof item == 'string') {
                const svgBox: HTMLElement | null = document.getElementById(item);
                if (svgBox != null) {
                    getAllElementStyleMapSub(svgBox, output, id);
                }
            }
            else {
                const style = item.getAttribute("style");
                output[id++] = style;
                for (let i = 0; i < item.children.length; i++) {
                    const child = <HTMLElement>item.children.item(i);
                    if (child != null) {
                      id = getAllElementStyleMapSub(child, output, id);
                    }
                }
            }
            return id;

        }

        export function getAllElementStyleMap(item: HTMLElement | string) : { [key: number]: string; } {
            const dic : { [key: number]: string; } = {}; 
            getAllElementStyleMapSub(item, dic, 0);
            return dic;
        }
        function setAllElementStyleMapSub(item: HTMLElement | string, output : { [key: number]: string | null; }, id : number) : number {
            if (typeof item == 'string') {
                const svgBox: HTMLElement | null = document.getElementById(item);
                if (svgBox != null) {
                    setAllElementStyleMapSub(svgBox, output, id);
                }
            }
            else {
                const style = output[id++];
                if(style == null){
                    item.removeAttribute("style");
                }else{
                    item.setAttribute("style", style);
                }
                for (let i = 0; i < item.children.length; i++) {
                    const child = <HTMLElement>item.children.item(i);
                    if (child != null) {
                      id = setAllElementStyleMapSub(child, output, id);
                    }
                }
            }
            return id;

        }

        export function setAllElementStyleMap(item: HTMLElement | string, dic : { [key: number]: string; }) {
            setAllElementStyleMapSub(item, dic, 0);
        }


        /**
         * 入力のSVG要素とその配下の要素全てにsetCSSToStyleを適用します。
         * @param item SVG要素もしくはそのid
         */
        export function setCSSToAllElementStyles(item: HTMLElement | string, isComplete: boolean = true) {
            if (typeof item == 'string') {
                const svgBox: HTMLElement | null = document.getElementById(item);
                if (svgBox != null) {
                    setCSSToAllElementStyles(svgBox, isComplete);
                }
            }
            else {
                if(!item.hasAttribute("data-skip")) setCSSToStyle(item, isComplete);
                for (let i = 0; i < item.children.length; i++) {
                    const child = <HTMLElement>item.children.item(i);
                    if (child != null) {
                        setCSSToAllElementStyles(child, isComplete);
                    }
                }
            }
        }
        const cssPropertyNames: string[] = ["font-size", "fill", "stroke",
            "font-family", "font-weight", "stroke-width", "background", "border", "background-color", "border-bottom-color", "border-bottom-style", "border-bottom-width",
            "border-left-color", "border-left-style", "border-left-width", "border-right-color", "border-right-style", "border-right-width", "border-top-color", "border-top-style", "border-top-width"];

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
