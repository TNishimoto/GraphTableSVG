namespace GraphTableSVG {
    export class GEllipse extends GVertex {
        public get svgEllipse(): SVGEllipseElement {
            return <SVGEllipseElement>this._surface;
        }

        public constructor(svgbox: SVGElement | string, option: GTextBoxAttributes = {}) {
            super(svgbox, option);
            //this.update();
        }
        protected createSurface(svgbox : SVGElement, option :GObjectAttributes = {}) : void {
            this._surface = SVG.createEllipse(this.svgGroup, this.svgGroup.getPropertyStyleValue(CustomAttributeNames.Style.defaulSurfaceClass));
            this.svgGroup.insertBefore(this.svgEllipse, this.svgText);
        }

        static constructAttributes(e: SVGElement, removeAttributes: boolean = false, output: GTextBoxAttributes = {}): GCalloutAttributes {
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
        public get type(): ShapeObjectType {
            return ShapeObjectType.Ellipse;
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
        
        public get shape(): string {
            return "msoShapeOval";
        }
        /*
        public createVBACode(id: number): string[] {
            const r: string[] = [];
            const left = this.cx - (this.width / 2);
            const top = this.cy - (this.height / 2);
            
            const surface = this.surface;
            const shape = surface instanceof SVGRectElement ? "msoShapeRectangle" : "msoShapeOval";
            r.push(`Sub create${id}(createdSlide As slide)`);
            r.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
            r.push(` Dim obj As Shape`);
            r.push(` Set obj = shapes_.AddShape(${shape}, ${left}, ${top}, ${this.width}, ${this.height})`);
            
            const backColor = VBATranslateFunctions.colorToVBA(surface.getPropertyStyleValueWithDefault("fill", "gray"));
            const lineColor = VBATranslateFunctions.colorToVBA(surface.getPropertyStyleValueWithDefault("stroke", "gray"));
            const lineType = GraphTableSVG.msoDashStyle.getLineType(surface);
            const strokeWidth = parseInt(surface.getPropertyStyleValueWithDefault("stroke-width", "4"));
            const visible = surface.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
            r.push(` Call EditVertexShape(obj, "${this.objectID}", ${visible}, ${backColor})`);
            r.push(` Call EditLine(obj.Line, ${lineColor}, ${lineType}, ${0}, ${strokeWidth}, ${visible})`);
        
            const fontSize = parseInt(this.svgText.getPropertyStyleValueWithDefault("font-size", "24"));
            const fontFamily = VBATranslateFunctions.ToVBAFont(this.svgText.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
            const fontBold = VBATranslateFunctions.ToFontBold(this.svgText.getPropertyStyleValueWithDefault("font-weight", "none"));
            r.push(` Call EditTextFrame(obj.TextFrame, ${0}, ${0}, ${0}, ${0}, false, ppAutoSizeNone)`);
            VBATranslateFunctions.TranslateSVGTextElement2(this.svgText, `obj.TextFrame.TextRange`).forEach((v)=>r.push(v));
            //sub.push(` Call EditTextRange(nodes(${i}).TextFrame.TextRange, ${VBATranslateFunctions.createStringFunction(text)}, ${0}, ${0}, ${VBATranslateFunctions.colorToVBA(color)})`);
            r.push(` Call EditTextEffect(obj.TextEffect, ${fontSize}, "${fontFamily}")`);
            
            r.push(`End Sub`);
            return r;
        }
        */
    }

    /*
    export type EllipseAttributes = TextBoxShapeAttributes & {
        speakerX? : number,
        speakerY? : number,
    }
    */
}