namespace GraphTableSVG {
    export class GPathTextBox extends GVertex {
        //private _svgPath: SVGPathElement;
        public get svgPath(): SVGPathElement {
            return <SVGPathElement>this.surface;
        }
        public constructor(svgbox: SVGElement | string, option: TextBoxShapeAttributes = {}) {
            super(svgbox, option);


            //this.update();
        }
        protected createSurface(svgbox: SVGElement, option: TextBoxShapeAttributes = {}): void {
            this._surface = GraphTableSVG.SVG.createPath(this.svgGroup, 0, 0, 0, 0, this.svgGroup.getPropertyStyleValue(SVG.defaulSurfaceClass));
            this.svgGroup.insertBefore(this.svgPath, this.svgText);
        }

        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
            if (this.isAutoSizeShapeToFitText) {
                const b = this.svgText.getBBox();
                rect.width = b.width;
                rect.height = b.height;
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
        protected get shape(): string {
            return "NONE";
        }
        private getVBAEditLine(id: number): string {
            const lineColor = VBATranslateFunctions.colorToVBA(this.svgPath.getPropertyStyleValueWithDefault("stroke", "gray"));
            const lineType = GraphTableSVG.msoDashStyle.getLineType(this.svgPath);
            const strokeWidth = parseInt(this.svgPath.getPropertyStyleValueWithDefault("stroke-width", "4"));
            const visible = this.svgPath.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
            return ` Call EditLine(obj${id}.Line, ${lineColor}, ${lineType}, ${0}, ${strokeWidth}, ${visible})`;
        }
        /**
         * 
         * @param id 
         */
        public createVBACode(id: number): string[] {
            const lines: string[] = [];
            const backColor = VBATranslateFunctions.colorToVBA(this.svgPath.getPropertyStyleValueWithDefault("fill", "gray"));
            const visible = this.svgPath.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";

            const vAnchor = VBATranslateFunctions.ToVerticalAnchor(this.verticalAnchor);
            const hAnchor = VBATranslateFunctions.ToHorizontalAnchor(this.horizontalAnchor);



            lines.push(`Sub create${id}(createdSlide As slide)`);
            lines.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
            lines.push(` Dim obj${id} As Shape`);
            lines.push(` Set obj${id} = shapes_.AddShape(${this.shape}, ${this.x}, ${this.y}, ${this.width}, ${this.height})`);
            lines.push(` Call EditTextFrame(obj${id}.TextFrame, ${this.marginPaddingTop}, ${this.marginPaddingBottom}, ${this.marginPaddingLeft}, ${this.marginPaddingRight}, false, ppAutoSizeNone)`);
            lines.push(` Call EditAnchor(obj${id}.TextFrame, ${vAnchor}, ${hAnchor})`);

            VBATranslateFunctions.TranslateSVGTextElement2(this.svgText, `obj${id}.TextFrame.TextRange`).forEach((v) => lines.push(v));
            //const adjustments = this.VBAAdjustments;
            lines.push(this.getVBAEditLine(id));

            lines.push(` Call EditCallOut(obj${id}, "${id}", ${visible}, ${backColor})`)
            this.VBAAdjustments.forEach((v, i) => {
                lines.push(` obj${id}.Adjustments.Item(${i + 1}) = ${v}`);
            })
            lines.push(`End Sub`);
            //sub.push([` Call EditTextEffect(nodes(${i}).TextEffect, ${fontSize}, "${fontFamily}")`]);
            return lines;
        }
        /**
         * VBAコードでのこの図形を表すShape図形のVBAAdjustmentsプロパティを表します。
         */
        protected get VBAAdjustments(): number[] {
            return [];
        }
        public get type(): string {
            return "PPPathTextBox";
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