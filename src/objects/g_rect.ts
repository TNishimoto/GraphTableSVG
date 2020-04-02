//namespace GraphTableSVG {
//namespace GraphTableSVG {
    import {GVertex} from "./g_vertex"
    import { GTextBox} from "./g_textbox"
    import {GCalloutAttributes} from "./g_callout"
    import { ShapeObjectType, ConnectorPosition, msoDashStyle, VBAShapeType } from "../common/enums";
    import * as AttributeNames from "../common/attribute_names"
    import * as StyleNames from "../common/style_names"
    import {Rectangle, VLine} from "../common/vline"
    import * as CSS from "../html/css"
    import * as GOptions  from "./g_options"
    import {setComputedDashArray} from "../html/enum_extension";
    import * as ElementExtension from "../interfaces/element_extension"
    import * as DefaultClassNames from "../common/default_class_names"


    export class GRect extends GTextBox {
        public get svgRectangle(): SVGRectElement {
            return <SVGRectElement>this._svgSurface;
        }

        public constructor(svgbox: SVGElement | string) {
            super(svgbox);
            this.updateAttributes.push("width");
            this.updateAttributes.push("height");
            //throw Error("error2");
            //this.update();
            if(this.type == ShapeObjectType.Rect) this.firstFunctionAfterInitialized();
        }
        protected createSurface(svgbox: SVGElement): void {
            this._svgSurface = GRect.createRectangle(this.svgGroup, DefaultClassNames.defaultSurfaceClass, undefined);
            this.svgGroup.insertBefore(this.svgRectangle, this.svgText);
        }
        /**
         * SVGRectElementを生成します。
         * @param parent 生成したSVG要素を子に追加する要素
         * @param className 生成するSVG要素のクラス属性名
         * @returns 生成されたSVGRectElement
         */
        private static createRectangle(parent: SVGElement, className: string | GOptions.surfaceClassCSS |undefined, style : string | undefined | GOptions.surfaceClassCSS): SVGRectElement {
            const rect = <SVGRectElement>document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            parent.appendChild(rect);
            rect.width.baseVal.value = 30;
            rect.height.baseVal.value = 30;
            if(style !== undefined){
                if(typeof(style) == "string"){
                    rect.setAttribute("style", style);
                }else{
                    rect.setAttribute("style", CSS.buildClassNameFromSurfaceClassCSS(style));
                }
    
            }
            //if(style !== undefined) rect.setAttribute("style", style);

            if (className == null) {
                if(rect.style.stroke == null || rect.style.stroke == "")rect.style.stroke = "black";
                if(rect.style.fill == null || rect.style.fill == "")rect.style.fill = "white";
                if(rect.style.strokeWidth == null || rect.style.strokeWidth == "")rect.style.strokeWidth = "1pt";
            } else {
                if(typeof(className) == "string"){
                    rect.setAttribute("class", className);
                }else{
                    rect.setAttribute("class", CSS.buildClassNameFromSurfaceClassCSS(className));
                }
                //const dashStyle = rect.getPropertyStyleValue(GraphTableSVG.AttributeNames.Style.msoDashStyleName);
                //if (dashStyle != null) msoDashStyle.setStyle(rect, dashStyle);

                const width = ElementExtension.getPropertyStyleNumberValue(rect, StyleNames.defaultWidth, null);
                if (width != null) {
                    rect.width.baseVal.value = width;
                }
                const height = ElementExtension.getPropertyStyleNumberValue(rect, StyleNames.defaultHeight, null);
                if (height != null) {
                    rect.height.baseVal.value = height;
                }

            }
            return rect;
        }

        static constructAttributes(e: Element, removeAttributes: boolean = false, output: GOptions.GTextBoxAttributes = {}): GOptions.GTextBoxAttributes {
            GTextBox.constructAttributes(e, removeAttributes, output);

            return output;
        }
        public get type(): ShapeObjectType {
            return ShapeObjectType.Rect;
        }
       /*
        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
            rect.width = this.width;
            rect.height = this.height;
            rect.x = (-this.width / 2);
            rect.y = (-this.height / 2);

            return rect;
        }
        */
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
        public get surfaceRegion() : Rectangle{
            const x = this.svgRectangle.x.baseVal.value;
            const y = this.svgRectangle.y.baseVal.value;
            const w = this.width;
            const h = this.height
            return new Rectangle(x, y, w, h);
        }
    
        protected updateSurfaceLocation(){            
            const virtualRegion = this.getVirtualRegion();
            this.svgRectangle.x.baseVal.value = -virtualRegion.width / 2;
            this.svgRectangle.y.baseVal.value = -virtualRegion.height / 2;
        }
        /*
        protected updateSurface() {
            this.hasConnectedObserverFunction = false;
            const dashStyle = this.msoDashStyle;
            if (dashStyle != null) {
                setComputedDashArray(this.svgRectangle);
            }
            this.hasConnectedObserverFunction = true;
            //this._observer.observe(this.svgGroup, this._observerOption);
        }
        */
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

        public get shape(): VBAShapeType {
            return VBAShapeType.Rectangle;
        }
        
    }
//}