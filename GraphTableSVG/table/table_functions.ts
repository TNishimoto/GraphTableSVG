





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


        _svgText.setAttribute('x', "0");
        _svgText.setAttribute('y', "0");

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
}
