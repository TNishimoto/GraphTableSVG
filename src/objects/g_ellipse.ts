//namespace GraphTableSVG {
    import {GVertex} from "./g_vertex"
    import {GTextBox} from "./g_textbox"
    import {GCalloutAttributes} from "./g_callout"
    import { ShapeObjectType, ConnectorPosition, msoDashStyle, VBAShapeType } from "../common/enums";
    import * as AttributeNames from "../common/attribute_names"
    import * as StyleNames from "../common/style_names"
    import * as DefaultClassNames from "../common/default_class_names"
    import {Rectangle, VLine, round100} from "../common/vline"
    import * as CSS from "../html/css"
    import * as GOptions  from "./g_options"
    import * as ElementExtension from "../interfaces/element_extension"
    import * as SVGTextExtension from "../interfaces/svg_text_extension"


    export class GAbstractEllipseCircle extends GTextBox {
        get rx(): number {
            return 5;
        }
        get ry(): number {
            return 5;
        }
        /**
        頂点の幅を返します。
        */
        get width(): number {
            return this.rx * 2;
        }
        /**
        頂点の高さを返します。
        */
        get height(): number {
            return this.ry * 2;
        }
        public constructor(svgbox: SVGElement | string) {
            super(svgbox);
        }
    
        /**
        テキストの領域を返します。
        */
       /*
        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
            const textRect = SVGTextExtension.getVirtualRegion(this.svgText);
    
            //const rect = new Rectangle();
            rect.width = this.width;
            rect.height = this.height;
            rect.x = -this.rx;
            rect.y = -this.ry;
            return rect;
        }
        */
    
        public getLocation(type: ConnectorPosition, x: number, y: number): [number, number] {
    
            const centerX = (Math.sqrt(2) / 2) * this.rx;
            const centerY = (Math.sqrt(2) / 2) * this.ry;
            

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
    
        public get surfaceRegion() : Rectangle{
            const x = -this.rx;
            const y = -this.ry;
            const w = this.width;
            const h = this.height
            return new Rectangle(x, y, w, h);
        }
    }
    export class GEllipse extends GAbstractEllipseCircle {
        public get svgEllipse(): SVGEllipseElement {
            return <SVGEllipseElement>this._svgSurface;
        }

        public constructor(svgbox: SVGElement | string) {
            super(svgbox);
            if(this.type == ShapeObjectType.Ellipse) this.firstFunctionAfterInitialized();
            //this.update();
        }
        protected createSurface(svgbox : SVGElement) : void {
            //if(option.surfaceClass === undefined) option.surfaceClass = DefaultClassNames.defaultSurfaceClass;
            this._svgSurface = GEllipse.createEllipse(this.svgGroup, DefaultClassNames.defaultSurfaceClass, undefined);
            this.svgGroup.insertBefore(this.svgEllipse, this.svgText);
        }
        private static createEllipse(parent: SVGElement, className: string | GOptions.surfaceClassCSS, style : string | GOptions.surfaceClassCSS |undefined): SVGEllipseElement {
            const circle = <SVGEllipseElement>document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            parent.appendChild(circle);
            GOptions.setClassAndStyle(circle, className, style);

            circle.rx.baseVal.value = AttributeNames.defaultCircleRadius;
            circle.ry.baseVal.value = AttributeNames.defaultCircleRadius;
            const radius = ElementExtension.getPropertyStyleNumberValue(circle,StyleNames.defaultRadius, null);
            if (radius != null) {
                circle.rx.baseVal.value = radius;
                circle.ry.baseVal.value = radius;
            }
            circle.cx.baseVal.value = 0;
            circle.cy.baseVal.value = 0;

            return circle;
        }

        public static constructAttributes(e: Element, removeAttributes: boolean = false, output: GOptions.GTextBoxAttributes = {}): GOptions.GTextBoxAttributes {
            GTextBox.constructAttributes(e, removeAttributes, output);


            return output;
        }
        
        get width(): number {
            return round100(this.svgEllipse.rx.baseVal.value * 2);
        }
        get height(): number {
            return round100(this.svgEllipse.ry.baseVal.value * 2);
        }
        


        set width(value: number) {
            const _rx = value/2;
            if (this.width != value) ElementExtension.setAttributeNumber(this.svgEllipse, "rx", _rx);

        }

        set height(value: number) {
            const _ry = value/2;
            if (this.height != value) ElementExtension.setAttributeNumber(this.svgEllipse, "ry", _ry);
            //this.svgEllipse.setAttribute("ry", _ry.toString());
        }

        get rx() : number{
            return round100(this.svgEllipse.rx.baseVal.value);
        }
        get ry() : number{
            return round100(this.svgEllipse.ry.baseVal.value);
        }
        public get type(): ShapeObjectType {
            return ShapeObjectType.Ellipse;
        }
        
        /*
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
        */
        public get shape(): VBAShapeType {
            return VBAShapeType.Oval;
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
//}