module GraphTableSVG {
    /**
     * 輪郭が円の頂点です。
     */
    export class CircleVertex extends GraphTableSVG.Vertex {
        private _svgCircle: SVGCircleElement;
        public get svgCircle(): SVGCircleElement {
            return this._svgCircle;
        }
        /**
         * 
         * @param ___graph
         * @param className
         * @param text
         */
        constructor(__graph: Graph, className: string | null = null, text: string = "") {
            super(__graph, className, text);
            this._svgCircle = createCircle(this.svgGroup.getActiveStyle().tryGetPropertyValue(Vertex.defaultSurfaceClass));
            this.svgGroup.insertBefore(this.svgCircle, this.svgText);
        }
        /**
        頂点の幅を返します。
        */
        get width(): number {
            return this.svgCircle.r.baseVal.value * 2;
        }
        /**
        頂点の高さを返します。
        */
        get height(): number {
            return this.svgCircle.r.baseVal.value * 2;
        }
        /**
        テキストの領域を返します。
        */
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
        /**
        頂点の半径を返します。
        */
        public get radius(): number {
            return this.svgCircle.r.baseVal.value;
        }
        /**
         * 接続部分の座標を返します。
         * @param type
         * @param x
         * @param y
         */
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
        /**
        頂点の輪郭を返します。
        */
        public get surface(): SVGElement | null {
            return this.svgCircle;
        }

        private getRadian(x: number, y: number): ConnectorPosition {
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
        private getAutoPosition(x: number, y: number): ConnectorPosition {
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
    /**
     * 輪郭が四角形の頂点です。
     */
    export class RectangleVertex extends GraphTableSVG.Vertex {
        private _svgRectangle: SVGRectElement;
        public get svgRectangle(): SVGRectElement {
            return this._svgRectangle;
        }


        constructor(__graph: Graph, className: string | null = null, text: string = "") {
            super(__graph, className, text);
            this._svgRectangle = createRectangle(this.svgGroup.getActiveStyle().tryGetPropertyValue(Vertex.defaultSurfaceClass));
            this.svgGroup.insertBefore(this.svgRectangle, this.svgText);

            this.svgRectangle.x.baseVal.value = -this.width / 2;
            this.svgRectangle.y.baseVal.value = -this.height / 2;

        }
        /**
        頂点の幅を返します。
        */
        get width(): number {
            return this.svgRectangle.width.baseVal.value;
        }
        /**
        頂点の高さを返します。
        */
        get height(): number {
            return this.svgRectangle.height.baseVal.value;
        }
        /**
        テキストの領域を返します。
        */
        get innerRectangle(): Rectangle {
            var rect = new Rectangle();
            rect.width = this.width;
            rect.height = this.height;
            rect.x = -this.width / 2;
            rect.y = -this.height / 2;;
            return rect;
            //setXY(this.svgText, rect, VerticalAnchor.Middle, HorizontalAnchor.Center);
        }
        /**
         * 接続部分の座標を返します。
         * @param type
         * @param x
         * @param y
         */
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
        private getAutoPosition(x: number, y: number): ConnectorPosition {
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