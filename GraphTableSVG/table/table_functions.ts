





module GraphTableSVG {
    

    export function createLine(x: number, y: number, x2: number, y2: number): SVGLineElement {
        var line1 = <SVGLineElement>document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.x1.baseVal.value = x;
        line1.x2.baseVal.value = x2;
        line1.y1.baseVal.value = y;
        line1.y2.baseVal.value = y2;
        //line1.style.color = "black";
        line1.style.stroke = "black";
        //line1.style.visibility = "hidden";
        //line1.style.strokeWidth = `${5}`
        //line1.setAttribute('stroke', 'black');
        return line1;
    }
    export function createText(): SVGTextElement {
        var _svgText: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

        _svgText.style.fill = "black";
        _svgText.style.fontSize = "14px";
        _svgText.style.fontWeight = "bold";
        _svgText.style.textAnchor = "middle";

        

        return _svgText;
    }
    export function createRectangle(): SVGRectElement {
        var rect = <SVGRectElement>document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.width.baseVal.value = 30;
        rect.height.baseVal.value = 30;
        rect.style.fill = "#ffffff";
        return rect;
    }
    export function createGroup(): SVGGElement {
        var g = <SVGGElement>document.createElementNS('http://www.w3.org/2000/svg', 'g');
        return g;
    }
    export function createCircle(r: number = 20, className : string | null = null): SVGCircleElement {
        var circle = <SVGCircleElement>document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        if (className == null) {
            circle.style.stroke = "black";
            circle.style.strokeWidth = "1pt";
        } else {
            circle.setAttribute("class", className);
            //circle.className = className
            //console.log("d : " + circle.setAttribute("class", className));
        }
        //circle.style.fill = "#ffffff";
        circle.cx.baseVal.value = 0;
        circle.cy.baseVal.value = 0;
        circle.r.baseVal.value = r;
        

        return circle;
    }
}
