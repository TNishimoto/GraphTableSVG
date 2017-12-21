
module GraphTableSVG {
    export module CSSFunctions {
        export function getPropertyValue(item: SVGElement, name: string): string | null {
            var p = item.style.getPropertyValue(name).trim();
            if (p.length == 0) {
                var r = item.getAttribute("class");
                if (r == null) {
                    return null;
                } else {
                    var p2 = getComputedStyle(item).getPropertyValue(name).trim();
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
        export function setPropertyValue(item: SVGElement, name: string, value: string | null) {
            item.style.setProperty(name, value);
        }
    }
    
    export class Rectangle {
        /*
        x: number = 0;
        y: number = 0;
        width: number = 0;
        height: number = 0;
        */
        constructor(public x: number = 0, public y: number = 0, public width: number = 0, public height: number = 0) {

        }

        get right(): number {
            return this.x + this.width;
        }
        get bottom(): number {
            return this.y + this.height;
        }
        public addOffset(x: number, y: number) {
            this.x += x;
            this.y += y;
        }
        public static merge(rects: Rectangle[]) {
            var x1 = rects[0].x;
            var y1 = rects[0].y;

            var x2 = rects[0].right;
            var y2 = rects[0].bottom;

            rects.forEach((v) => {
                if (x1 > v.x) x1 = v.x;
                if (y1 > v.y) y1 = v.y;
                if (x2 < v.right) x2 = v.right;
                if (y2 < v.bottom) y2 = v.bottom;
            })
            var rect = new Rectangle();
            rect.x = x1;
            rect.y = y1;
            rect.width = x2 - x1;
            rect.height = y2 - y1;
            return rect;
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
    
    export function ToConnectorPosition(str: string | null): ConnectorPosition {
        if (str == null) {
            return ConnectorPosition.Auto;
        } else {
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
    export function createGroup(className : string | null = null): SVGGElement {
        var g = <SVGGElement>document.createElementNS('http://www.w3.org/2000/svg', 'g');
        if (className != null) {
            g.setAttribute("class", className);
        }
        return g;
    }
    export function resetStyle(style: CSSStyleDeclaration) {
        style.stroke = null;
        style.strokeWidth = null;
        style.fill = null;
        style.fontSize = null;
        style.fontWeight = null;
    }
    var defaultRadiusName = "--default-radius";
    var defaultWidthName = "--default-width";
    var defaultHeightName = "--default-height";

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

    
    
}
