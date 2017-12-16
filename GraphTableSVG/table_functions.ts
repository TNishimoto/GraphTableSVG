





module GraphTableSVG {
    export class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;

        get right(): number {
            return this.x + this.width;
        }
        get bottom(): number {
            return this.y + this.height;
        }
    }
    export enum NodeOrder {
        Preorder, Postorder
    }
    export enum ConnectorPosition {
        Top = 1,
        LeftUp = 2,
        Left = 3,
        LeftDown = 4,
        Bottom = 5,
        RightDown = 6,
        Right = 7,
        RightUp = 8,
        Auto = 9
    }
    export function ToConnectorPosition(str: string): ConnectorPosition {
        switch (str) {
            case "top": return ConnectorPosition.Top;
            case "leftup": return ConnectorPosition.LeftUp;
            case "left": return ConnectorPosition.Left;
            case "leftdown": return ConnectorPosition.LeftDown;
            case "bottom": return ConnectorPosition.Bottom;
            case "rightdown": return ConnectorPosition.RightDown;
            case "right": return ConnectorPosition.Right;
            case "rightup": return ConnectorPosition.RightUp;
            case "auto": return ConnectorPosition.Auto;
            default: return ConnectorPosition.Auto;
        }
    }
    export function ToStrFromConnectorPosition(position: ConnectorPosition): string {
        switch (position) {
            case ConnectorPosition.Top: return "top";
            case ConnectorPosition.LeftUp: return "leftup";
            case ConnectorPosition.Left: return "left";
            case ConnectorPosition.LeftDown: return "leftdown";
            case ConnectorPosition.Bottom: return "bottom";
            case ConnectorPosition.RightUp: return "rightup";
            case ConnectorPosition.Right: return "right";
            case ConnectorPosition.RightDown: return "rightdown";
            case ConnectorPosition.Auto: return "auto";
            default: return "auto";
        }
    }

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
    export function createText(className : string | null = null): SVGTextElement {
        var _svgText: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

        //_svgText.style.textAnchor = "middle";
        if (className == null) {
            _svgText.style.fill = "black";
            _svgText.style.fontSize = "14px";
            _svgText.style.fontWeight = "bold";
        } else {
            _svgText.setAttribute("class", className);
            //_svgText.className = className;
        }
        return _svgText;
    }
    export function resetStyle(item: SVGTextElement) {
        item.style.fill = null;
        item.style.fontSize = null;
        item.style.fontWeight = null;
    }

    export function createRectangle(width: number = 0, height: number = 0, className: string | null = null): SVGRectElement {
        var rect = <SVGRectElement>document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.width.baseVal.value = width;
        rect.height.baseVal.value = height;
        if (className == null) {
            rect.style.fill = "#ffffff";
        } else {
            rect.setAttribute("class", className);
        }
        return rect;
    }
    export function createGroup(className : string | null = null): SVGGElement {
        var g = <SVGGElement>document.createElementNS('http://www.w3.org/2000/svg', 'g');
        if (className != null) {
            g.setAttribute("class", className);
        }
        return g;
    }
    export function createCircle(r: number = 20, className : string | null = null): SVGCircleElement {
        var circle = <SVGCircleElement>document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        if (className == null) {
            circle.style.stroke = "black";
            circle.style.strokeWidth = "1pt";
            circle.style.fill = "#ffffff";

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
