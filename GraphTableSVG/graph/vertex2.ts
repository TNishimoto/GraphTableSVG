namespace GraphTableSVG {
    /**
     * 輪郭が円の頂点です。
     */
    export class ObsoleteCircleVertex extends GraphTableSVG.ObsoleteVertex {
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
        constructor(graph: ObsoleteGraph, params: {className?: string, text? : string, x?: number, y?: number, radius? : number} ) {
            super(graph, params);
            this._svgCircle = SVG.createCircle(this.svgGroup, this.svgGroup.getPropertyStyleValue(ObsoleteVertex.defaultSurfaceClass));
            if(params.radius != undefined) this._svgCircle.r.baseVal.value = params.radius;
            this.svgGroup.insertBefore(this.svgCircle, this.svgText);
            //SVG.setDefaultValue(this.svgCircle);
            
        }
        /**
        頂点の幅を返します。
        */
        get width(): number {
            return this.svgCircle.r.baseVal.value * 2;
        }
        set width(value: number) {
            this.svgCircle.r.baseVal.value = value / 2;
        }
        /**
        頂点の高さを返します。
        */
        get height(): number {
            return this.svgCircle.r.baseVal.value * 2;
        }
        set height(value: number) {
            this.svgCircle.r.baseVal.value = value / 2;

        }
        /**
        テキストの領域を返します。
        */
        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
            const r = this.svgCircle.r.baseVal.value;
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
            const r = (Math.sqrt(2) / 2) * this.radius;


            switch (type) {
                case ConnectorPosition.Top:
                    return [this.x, this.y - this.radius];
                case ConnectorPosition.TopRight:
                    return [this.x + r, this.y - r];
                case ConnectorPosition.Right:
                    return [this.x + this.radius, this.y];
                case ConnectorPosition.BottomRight:
                    return [this.x + r, this.y + r];
                case ConnectorPosition.Bottom:
                    return [this.x, this.y + this.radius];
                case ConnectorPosition.BottomLeft:
                    return [this.x - r, this.y + r];
                case ConnectorPosition.Left:
                    return [this.x - this.radius, this.y];
                case ConnectorPosition.TopLeft:
                    return [this.x - r, this.y - r];
                default:
                    const autoType = this.getAutoPosition(x, y);
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
            const [x2, y2] = [x - this.x, y - this.y];

            if (x2 < 0) {
                if (y2 < 0) {
                    return ConnectorPosition.TopLeft;
                } else if (y2 > 0) {
                    return ConnectorPosition.BottomLeft;
                } else {
                    return ConnectorPosition.Left;
                }
            } else if (x2 > 0) {
                if (y2 < 0) {
                    return ConnectorPosition.TopRight;
                } else if (y2 > 0) {
                    return ConnectorPosition.BottomRight;
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

        protected getAutoPosition(x: number, y: number): ConnectorPosition {
            const r = (Math.sqrt(2) / 2) * this.radius;
            const line1 = new VLine(this.x, this.y, this.x + r, this.y + r);
            const line2 = new VLine(this.x, this.y, this.x + r, this.y - r);

            const b1 = line1.contains(x, y);
            const b2 = line2.contains(x, y);

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
    export class ObsoleteRectangleVertex extends GraphTableSVG.ObsoleteVertex {
        private _svgRectangle: SVGRectElement;
        public get svgRectangle(): SVGRectElement {
            return this._svgRectangle;
        }
        
        public get shapeType(): string {
            return "rectangle";
        }

        constructor(graph: ObsoleteGraph, params : { className?: string, text?: string, x?: number, y?: number, width?:number, height? :number } = {} ) {
            super(graph, params);
            this._svgRectangle = SVG.createRectangle(this.svgGroup, this.svgGroup.getPropertyStyleValue(ObsoleteVertex.defaultSurfaceClass));
            if(params.width != undefined) this.width = params.width;
            if(params.height != undefined) this.height = params.height;
            
            this.svgGroup.insertBefore(this.svgRectangle, this.svgText);

            //SVG.setDefaultValue(this.svgRectangle);

            this.svgRectangle.x.baseVal.value = -this.width / 2;
            this.svgRectangle.y.baseVal.value = -this.height / 2;

        }
        protected localUpdate() {
            this.svgRectangle.x.baseVal.value = -this.width / 2;
            this.svgRectangle.y.baseVal.value = -this.height / 2;
            super.localUpdate();
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
        set width(value: number) {
            this.svgRectangle.width.baseVal.value = value;
        }
        set height(value: number) {
            this.svgRectangle.height.baseVal.value = value;
        }

        /**
        テキストの領域を返します。
        */
        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
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
            const wr = this.width / 2;
            const hr = this.height / 2;


            switch (type) {
                case ConnectorPosition.Top:
                    return [this.x, this.y - hr];
                case ConnectorPosition.TopRight:
                case ConnectorPosition.Right:
                case ConnectorPosition.BottomRight:
                    return [this.x + wr, this.y];
                case ConnectorPosition.Bottom:
                    return [this.x, this.y + hr];
                case ConnectorPosition.BottomLeft:
                case ConnectorPosition.Left:
                case ConnectorPosition.TopLeft:
                    return [this.x - wr, this.y];
                default:
                    const autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        }
        protected getAutoPosition(x: number, y: number): ConnectorPosition {
            const wr = this.width / 2;
            const hr = this.height / 2;

            const line1 = new VLine(this.x, this.y, this.x + wr, this.y + hr);
            const line2 = new VLine(this.x, this.y, this.x + wr, this.y - hr);

            const b1 = line1.contains(x, y);
            const b2 = line2.contains(x, y);

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
        /**
        頂点の輪郭を返します。
        */
        public get surface(): SVGElement | null {
            return this.svgRectangle;
        }
    }

}