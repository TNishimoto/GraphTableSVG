
module GraphTableSVG {

    /**
     * SVGLineElementを生成します。
     * @param x
     * @param y
     * @param x2
     * @param y2
     * @param className
     */
    export function createLine(x: number, y: number, x2: number, y2: number, className: string | null = null): SVGLineElement {
        var line1 = <SVGLineElement>document.createElementNS('http://www.w3.org/2000/svg', 'line');
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
    /**
     * SVGTextElementを生成します。
     * @param className
     */
    export function createText(className : string | null = null): SVGTextElement {
        var _svgText: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

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
        var rect = <SVGRectElement>document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.width.baseVal.value = 30;
        rect.height.baseVal.value = 30;
        if (className == null) {
            rect.style.fill = "#ffffff";
            rect.style.stroke = "#000000";
        } else {
            rect.setAttribute("class", className);

            var s1 = rect.getActiveStyle().getPropertyValue(defaultWidthName).trim();
            if (s1.length > 0) {
                rect.width.baseVal.value = Number(s1);
            }

            var s2 = rect.getActiveStyle().getPropertyValue(defaultHeightName).trim();
            if (s2.length > 0) {
                rect.height.baseVal.value = Number(s2);
            }


        }
        return rect;
    }
    

    /**
     * SVGGElementを生成します。
     * @param className
     */
    export function createGroup(className : string | null = null): SVGGElement {
        var g = <SVGGElement>document.createElementNS('http://www.w3.org/2000/svg', 'g');
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
    var defaultRadiusName = "--default-radius";
    var defaultWidthName = "--default-width";
    var defaultHeightName = "--default-height";

    /**
     * SVGCircleElementを生成します。
     * @param className
     */
    export function createCircle(className : string | null = null): SVGCircleElement {
        var circle = <SVGCircleElement>document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.r.baseVal.value = 30;
        if (className == null) {
            circle.style.stroke = "black";
            circle.style.strokeWidth = "1pt";
            circle.style.fill = "#ffffff";
        } else {
            circle.setAttribute("class", className);
            var s = circle.getActiveStyle().getPropertyValue(defaultRadiusName).trim();
            circle.r.baseVal.value = Number(s);
            //circle.className = className
            //console.log("d : " + circle.setAttribute("class", className));
        }
        //circle.style.fill = "#ffffff";
        circle.cx.baseVal.value = 0;
        circle.cy.baseVal.value = 0;
        //circle.r.baseVal.value = r;
        

        return circle;
    }

    export function setClass(svg: SVGElement, className: string | null = null) {
        if (className == null) {
            svg.removeAttribute("class");
        } else {
            resetStyle(svg.style);
            svg.setAttribute("class", className);
        }
    }

    
    
}
