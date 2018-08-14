namespace GraphTableSVG {
    export class GEllipse extends GVertex {
        public get svgEllipse(): SVGEllipseElement {
            return <SVGEllipseElement>this._surface;
        }

        public constructor(svgbox: SVGElement | string, option: TextBoxShapeAttributes = {}) {
            super(svgbox, option);
            //this.update();
        }
        protected createSurface(svgbox : SVGElement, option : TextBoxShapeAttributes = {}) : void {
            this._surface = SVG.createEllipse(this.svgGroup, this.svgGroup.getPropertyStyleValue(SVG.defaulSurfaceClass));
            this.svgGroup.insertBefore(this.svgEllipse, this.svgText);
        }

        static constructAttributes(e: SVGElement, removeAttributes: boolean = false, output: TextBoxShapeAttributes = {}): CalloutAttributes {
            GTextBox.constructAttributes(e, removeAttributes, output);


            return output;
        }
        /**
        テキストの領域を返します。
        */
        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
            rect.width = this.svgEllipse.rx.baseVal.value * 2;
            rect.height = this.svgEllipse.ry.baseVal.value * 2;
            rect.x = -this.svgEllipse.rx.baseVal.value;
            rect.y = -this.svgEllipse.ry.baseVal.value;
            return rect;
        }
        /**
        頂点の幅を返します。
        */
        get width(): number {
            return this.svgEllipse.rx.baseVal.value * 2;
        }
        set width(value: number) {
            const _rx = value/2;
            if (this.width != value) this.svgEllipse.setAttribute("rx", _rx.toString());

        }
        /**
        頂点の高さを返します。
        */
        get height(): number {
            return this.svgEllipse.ry.baseVal.value * 2;
        }
        set height(value: number) {
            const _ry = value/2;
            if (this.height != value) this.svgEllipse.setAttribute("ry", _ry.toString());
        }
        get rx() : number{
            return this.svgEllipse.rx.baseVal.value;
        }
        get ry() : number{
            return this.svgEllipse.ry.baseVal.value;
        }

        public getLocation(type: ConnectorPosition, x: number, y: number): [number, number] {

            const centerX = (Math.sqrt(2) / 2) * this.svgEllipse.rx.baseVal.value;
            const centerY = (Math.sqrt(2) / 2) * this.svgEllipse.ry.baseVal.value;

            switch (type) {
                case ConnectorPosition.Top:
                    return [this.cx, this.cy - this.ry];
                case ConnectorPosition.TopRight:
                    return [this.cx + centerX, this.cy - centerY];
                case ConnectorPosition.Right:
                    return [this.cx + this.rx, this.cy];
                case ConnectorPosition.BottomRight:
                    return [this.cx + centerX, this.cy + centerY];
                case ConnectorPosition.Bottom:
                    return [this.cx, this.cy + this.ry];
                case ConnectorPosition.BottomLeft:
                    return [this.cx - centerX, this.cy + centerY];
                case ConnectorPosition.Left:
                    return [this.cx - this.rx, this.cy];
                case ConnectorPosition.TopLeft:
                    return [this.cx - centerX, this.cy - centerY];
                default:
                    const autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        }
        protected getAutoPosition(x: number, y: number): ConnectorPosition {
            const radius = this.rx;
            const r = (Math.sqrt(2) / 2) * radius;
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
    /*
    export type EllipseAttributes = TextBoxShapeAttributes & {
        speakerX? : number,
        speakerY? : number,
    }
    */
}