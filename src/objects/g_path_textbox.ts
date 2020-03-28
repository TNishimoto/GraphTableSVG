/// <reference path="g_vertex.ts"/>

//namespace GraphTableSVG {
    import {Rectangle, VLine} from "../common/vline"
    import {GTextBox} from "./g_textbox"
    import { ShapeObjectType, ConnectorPosition, msoDashStyle, AutoSizeShapeToFitText } from "../common/enums";
    import * as AttributeNames from "../common/attribute_names"
    import * as DefaultClassNames from "../common/default_class_names"
    import * as SVGTextBox from "../interfaces/svg_textbox"
    import * as SVGTextExtension from "../interfaces/svg_text_extension"

    import * as CSS from "../html/css"
    import * as GOptions  from "./g_options"

    export class GPathTextBox extends GTextBox {
        //private _svgPath: SVGPathElement;
        public get svgPath(): SVGPathElement {
            return <SVGPathElement>this.svgSurface;
        }
        public constructor(svgbox: SVGElement | string, option: GOptions.GTextBoxAttributes = {}) {
            super(svgbox, option);

            /*
            if(this.surface!.className == null && this.surface!.getPropertyStyleValue("fill") == null){
                this.surface!.setPropertyStyleValue("fill", "white");
            }
            */

            //this.update();
            if(this.type == ShapeObjectType.PathTextBox) this.firstFunctionAfterInitialized();
        }
        protected createSurface(svgbox: SVGElement, option: GOptions.GObjectAttributes = {}): void {

            if(option.surfaceClass === undefined) option.surfaceClass = DefaultClassNames.defaultTextboxPathClass;
            //const _className = this.svgGroup.getPropertyStyleValue(AttributeNames.Style.defaultPathClass);
            //if(_className != null) option.surfaceClass = _className;

            this._svgSurface = GPathTextBox.createSurfacePath(this.svgGroup, 0, 0, 0, 0, option.surfaceClass, option.surfaceStyle);
            this.svgGroup.insertBefore(this.svgPath, this.svgText);
        }
        private static createSurfacePath(parent: SVGElement | HTMLElement, x: number, y: number, x2: number, y2: number, 
            className: string | GOptions.surfaceClassCSS, style : string | undefined | GOptions.surfaceClassCSS): SVGPathElement {
            const path = <SVGPathElement>document.createElementNS('http://www.w3.org/2000/svg', 'path');
            parent.appendChild(path);
            path.setAttribute("d", `M ${x} ${y} L ${x2} ${y2}`);
            
            GOptions.setClassAndStyle(path, className, style);
            /*
            if(style !== undefined){
                if(typeof(style) == "string"){
                    path.setAttribute("style", style);
                }else{
                    path.setAttribute("style", CSS.buildClassNameFromSurfaceClassCSS(style));
                }
    
            }
            //if(style !== undefined) path.setAttribute("style", style);

            if(typeof(className) == "string"){
                path.setAttribute("class", className);
            }else{
                path.setAttribute("class", CSS.buildClassNameFromSurfaceClassCSS(className));
            }
            */
            //path.setAttribute("class", className)
                /*
            if (className != null) {
                const dashStyle = path.getPropertyStyleValue(GraphTableSVG.AttributeNames.Style.msoDashStyleName);
            } else {
                if(path.style.stroke == null || path.style.stroke == "")path.style.stroke = "black";
                if(path.style.fill == null || path.style.fill == "")path.style.fill = "white";
                if(path.style.strokeWidth == null || path.style.strokeWidth == "")path.style.strokeWidth = "1pt";
            }
            */
            return path;
        }
        initializeOption(option: GOptions.GObjectAttributes) : GOptions.GObjectAttributes {
            const _option = super.initializeOption(option);
            return _option;
        }

        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
            if (this.isAutoSizeShapeToFitText == AutoSizeShapeToFitText.Auto) {
                const textRect = SVGTextExtension.getSize(this.svgText);
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
//}