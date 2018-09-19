/// <reference path="g_vertex.ts"/>

namespace GraphTableSVG {
    export class GPathTextBox extends GVertex {
        //private _svgPath: SVGPathElement;
        public get svgPath(): SVGPathElement {
            return <SVGPathElement>this.svgSurface;
        }
        public constructor(svgbox: SVGElement | string, option: GTextBoxAttributes = {}) {
            super(svgbox, option);

            /*
            if(this.surface!.className == null && this.surface!.getPropertyStyleValue("fill") == null){
                this.surface!.setPropertyStyleValue("fill", "white");
            }
            */

            //this.update();
        }
        protected createSurface(svgbox: SVGElement, option: GObjectAttributes = {}): void {
            this._svgSurface = GraphTableSVG.SVG.createSurfacePath(this.svgGroup, 0, 0, 0, 0, this.svgGroup.getPropertyStyleValue(CustomAttributeNames.Style.defaulSurfaceClass));
            this.svgGroup.insertBefore(this.svgPath, this.svgText);
        }
        initializeOption(option: GObjectAttributes) : GObjectAttributes {
            const _option = super.initializeOption(option);
            return _option;
        }

        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
            if (this.isAutoSizeShapeToFitText) {
                const textRect = SVGTextBox.getSize(this.svgText);
                //const b = this.svgText.getBBox();
                rect.width = textRect.width;
                rect.height = textRect.height;
                rect.x = (-this.width / 2) + this.marginPaddingLeft;
                rect.y = (-this.height / 2) + this.marginPaddingTop;
            } else {
                rect.width = this.width - this.marginPaddingLeft;
                rect.height = this.height - this.marginPaddingTop;
                rect.x = (-this.width / 2) + this.marginPaddingLeft;
                rect.y = (-this.height / 2) + this.marginPaddingTop;
            }
            return rect;
        }
        /*
        private getVBAEditLine(id: number): string {
            const lineColor = VBATranslateFunctions.colorToVBA(this.svgPath.getPropertyStyleValueWithDefault("stroke", "gray"));
            const lineType = GraphTableSVG.msoDashStyle.getLineType(this.svgPath);
            const strokeWidth = parseInt(this.svgPath.getPropertyStyleValueWithDefault("stroke-width", "4"));
            const visible = this.svgPath.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
            return ` Call EditLine(obj${id}.Line, ${lineColor}, ${lineType}, ${0}, ${strokeWidth}, ${visible})`;
        }
        */
        
        public get type(): ShapeObjectType {
            return "g-path-textbox";
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
                    return [this.cx, this.cy - hr];
                case ConnectorPosition.TopRight:
                case ConnectorPosition.Right:
                case ConnectorPosition.BottomRight:
                    return [this.cx + wr, this.cy];
                case ConnectorPosition.Bottom:
                    return [this.cx, this.cy + hr];
                case ConnectorPosition.BottomLeft:
                case ConnectorPosition.Left:
                case ConnectorPosition.TopLeft:
                    return [this.cx - wr, this.cy];
                default:
                    const autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        }
        protected getAutoPosition(x: number, y: number): ConnectorPosition {
            const wr = this.width / 2;
            const hr = this.height / 2;

            const line1 = new VLine(this.cx, this.cy, this.cx + wr, this.cy + hr);
            const line2 = new VLine(this.cx, this.cy, this.cx + wr, this.cy - hr);

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