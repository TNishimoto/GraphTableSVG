module GraphTableSVG {
    export class CircleVertex extends GraphTableSVG.Vertex {
        svgCircle: SVGCircleElement;

        constructor(__graph: Graph, className: string | null = null, text: string = "") {
            super(__graph, className, text);
            this.svgCircle = createCircle(this.svgGroup.getActiveStyle().tryGetPropertyValue(Vertex.defaultSurfaceClass));
            this.svgGroup.insertBefore(this.svgCircle, this.svgText);
        }
        get width(): number {
            return this.svgCircle.r.baseVal.value * 2;
        }
        get height(): number {
            return this.svgCircle.r.baseVal.value * 2;
        }

        get innerRectangle(): Rectangle {
            var r = this.svgCircle.r.baseVal.value;
            var rect = new Rectangle();
            rect.width = r * 2;
            rect.height = r * 2;
            rect.x = -r;
            rect.y = -r;
            return rect;
            //setXY(this.svgText, rect, VerticalAnchor.Middle, HorizontalAnchor.Center);
        }
        
        public get radius(): number {
            return this.svgCircle.r.baseVal.value;
        }
        public getLocation(type: ConnectorPosition, x: number, y: number): [number, number] {
            var r = (Math.sqrt(2) / 2) * this.radius;


            switch (type) {
                case ConnectorPosition.Top:
                    return [this.x, this.y - this.radius];
                case ConnectorPosition.RightUp:
                    return [this.x + r, this.y - r];
                case ConnectorPosition.Right:
                    return [this.x + this.radius, this.y];
                case ConnectorPosition.RightDown:
                    return [this.x + r, this.y + r];
                case ConnectorPosition.Bottom:
                    return [this.x, this.y + this.radius];
                case ConnectorPosition.LeftDown:
                    return [this.x - r, this.y + r];
                case ConnectorPosition.Left:
                    return [this.x - this.radius, this.y];
                case ConnectorPosition.LeftUp:
                    return [this.x - r, this.y - r];
                default:
                    var autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        }
        public get surface(): SVGElement | null {
            return this.svgCircle;
        }
        public getRadian(x: number, y: number): ConnectorPosition {
            var [x2, y2] = [x - this.x, y - this.y];

            if (x2 < 0) {
                if (y2 < 0) {
                    return ConnectorPosition.LeftUp;
                } else if (y2 > 0) {
                    return ConnectorPosition.LeftDown;
                } else {
                    return ConnectorPosition.Left;
                }
            } else if (x2 > 0) {
                if (y2 < 0) {
                    return ConnectorPosition.RightUp;
                } else if (y2 > 0) {
                    return ConnectorPosition.RightDown;
                } else {
                    return ConnectorPosition.Right;
                }
            } else {
                if (y2 < 0) {
                    return ConnectorPosition.Top;
                } else if (y2 > 0) {
                    return ConnectorPosition.Bottom;
                } else {
                    return ConnectorPosition.Top;
                }
            }
        }
        public getAutoPosition(x: number, y: number): ConnectorPosition {
            var r = (Math.sqrt(2) / 2) * this.radius;
            var line1 = new VLine(this.x, this.y, this.x + r, this.y + r);
            var line2 = new VLine(this.x, this.y, this.x + r, this.y - r);

            var b1 = line1.contains(x, y);
            var b2 = line2.contains(x, y);

            if (b1) {
                if (b2) {
                    return ConnectorPosition.Top;
                } else {
                    return ConnectorPosition.Right;
                }
            } else {
                if (b2) {
                    return ConnectorPosition.Left;
                } else {
                    return ConnectorPosition.Bottom;
                }
            }

        }
    }
    export class RectangleVertex extends GraphTableSVG.Vertex {
        svgRectangle: SVGRectElement;


        constructor(__graph: Graph, className: string | null = null, text: string = "") {
            super(__graph, className, text);
            this.svgRectangle = createRectangle(this.svgGroup.getActiveStyle().tryGetPropertyValue(Vertex.defaultSurfaceClass));
            this.svgGroup.insertBefore(this.svgRectangle, this.svgText);

            this.svgRectangle.x.baseVal.value = -this.width / 2;
            this.svgRectangle.y.baseVal.value = -this.height / 2;

        }
        get width(): number {
            return this.svgRectangle.width.baseVal.value;
        }
        get height(): number {
            return this.svgRectangle.height.baseVal.value;
        }

        get innerRectangle(): Rectangle {
            var rect = new Rectangle();
            rect.width = this.width;
            rect.height = this.height;
            rect.x = -this.width / 2;
            rect.y = -this.height / 2;;
            return rect;
            //setXY(this.svgText, rect, VerticalAnchor.Middle, HorizontalAnchor.Center);
        }
        public getLocation(type: ConnectorPosition, x: number, y: number): [number, number] {
            var wr = this.width / 2;
            var hr = this.height / 2;


            switch (type) {
                case ConnectorPosition.Top:
                    return [this.x, this.y - hr];
                case ConnectorPosition.RightUp:
                case ConnectorPosition.Right:
                case ConnectorPosition.RightDown:
                    return [this.x + wr, this.y];
                case ConnectorPosition.Bottom:
                    return [this.x, this.y + hr];
                case ConnectorPosition.LeftDown:
                case ConnectorPosition.Left:
                case ConnectorPosition.LeftUp:
                    return [this.x - wr, this.y];
                default:
                    var autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        }
        public getAutoPosition(x: number, y: number): ConnectorPosition {
            var wr = this.width / 2;
            var hr = this.height / 2;

            var line1 = new VLine(this.x, this.y, this.x + wr, this.y + hr);
            var line2 = new VLine(this.x, this.y, this.x + wr, this.y - hr);

            var b1 = line1.contains(x, y);
            var b2 = line2.contains(x, y);

            if (b1) {
                if (b2) {
                    return ConnectorPosition.Top;
                } else {
                    return ConnectorPosition.Right;
                }
            } else {
                if (b2) {
                    return ConnectorPosition.Left;
                } else {
                    return ConnectorPosition.Bottom;
                }
            }

        }
    }

}