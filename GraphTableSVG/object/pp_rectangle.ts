namespace GraphTableSVG {
    export class PPRectangle extends PPVertexBase  {
        private _svgRectangle: SVGRectElement;
        public get svgRectangle(): SVGRectElement {
            return this._svgRectangle;
        }
        public get surface() : SVGElement {
            return this.svgRectangle;
        }

        public constructor(svgbox: SVGElement, option: TextBoxShapeAttributes = {}) {
            super(svgbox, option);
            this.updateAttributes.push("width");
            this.updateAttributes.push("height");

            this.update();
        }
        protected createSurface(svgbox : SVGElement, option : TextBoxShapeAttributes = {}) : void {
            this._svgRectangle = SVG.createRectangle(this.svgGroup, this.svgGroup.getPropertyStyleValue(SVG.defaulSurfaceClass));
            this.svgGroup.insertBefore(this.svgRectangle, this.svgText);
        }

        static constructAttributes(e: SVGElement, removeAttributes: boolean = false, output: TextBoxShapeAttributes = {}): CalloutAttributes {
            PPTextBoxShapeBase.constructAttributes(e, removeAttributes, output);


            return output;
        }
        /**
        テキストの領域を返します。
        */
        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
            rect.width = this.width;
            rect.height = this.height;
            rect.x = -this.width/2;
            rect.y = -this.height/2;
            return rect;
        }
        /**
        頂点の幅を返します。
        */
        get width(): number {
            return this.svgRectangle.width.baseVal.value;
        }
        set width(value: number) {
            if (this.width != value) this.svgRectangle.setAttribute("width", value.toString());

        }
        /**
        頂点の高さを返します。
        */
        get height(): number {
            return this.svgRectangle.height.baseVal.value;
        }
        set height(value: number) {
            if (this.height != value) this.svgRectangle.setAttribute("height", value.toString());
        }

        protected updateSurface(){
            this.svgRectangle.x.baseVal.value = -this.width/2;
            this.svgRectangle.y.baseVal.value = -this.height/2;

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

    }
}