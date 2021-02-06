/// <reference path="g_vertex.ts"/>

//namespace GraphTableSVG {
    import {Rectangle, VLine} from "../common/vline"
    import {GTextBox} from "./g_textbox"
    import { ShapeObjectType, ConnectorType, msoDashStyle, AutoSizeShapeToFitText } from "../common/enums";
    import * as DefaultClassNames from "../common/default_class_names"

    import * as GOptions  from "./g_options"

    export class GPathTextBox extends GTextBox {
        //private _svgPath: SVGPathElement;
        public get svgPath(): SVGPathElement {
            return <SVGPathElement>this.svgSurface;
        }
        public constructor(svgbox: SVGElement | string) {
            super(svgbox);
            if(this.type == ShapeObjectType.PathTextBox) this.firstFunctionAfterInitialized();
        }
        protected createSurface(svgbox: SVGElement): void {
            this._svgSurface = GPathTextBox.createSurfacePath(this.svgGroup, 0, 0, 0, 0, DefaultClassNames.defaultTextboxPathClass, undefined);
            this.svgGroup.insertBefore(this.svgPath, this.svgText);
        }
        private static createSurfacePath(parent: SVGElement | HTMLElement, x: number, y: number, x2: number, y2: number, 
            className: string | GOptions.surfaceClassCSS, style : string | undefined | GOptions.surfaceClassCSS): SVGPathElement {
            const path = <SVGPathElement>document.createElementNS('http://www.w3.org/2000/svg', 'path');
            parent.appendChild(path);
            path.setAttribute("d", `M ${x} ${y} L ${x2} ${y2}`);
            
            GOptions.setClassAndStyle(path, className, style);
            return path;
        }
        
        public get type(): ShapeObjectType {
            return "g-path-textbox";
        }
        /**
        * 接続部分の座標を返します。
        * @param type
        * @param x
        * @param y
        */
        public getContactPosition(type: ConnectorType, x: number, y: number): [number, number] {
            const wr = this.width / 2;
            const hr = this.height / 2;


            switch (type) {
                case ConnectorType.Top:
                    return [this.cx, this.cy - hr];
                case ConnectorType.TopRight:
                case ConnectorType.Right:
                case ConnectorType.BottomRight:
                    return [this.cx + wr, this.cy];
                case ConnectorType.Bottom:
                    return [this.cx, this.cy + hr];
                case ConnectorType.BottomLeft:
                case ConnectorType.Left:
                case ConnectorType.TopLeft:
                    return [this.cx - wr, this.cy];
                default:
                    const autoType = this.getContactAutoPosition(x, y);
                    return this.getContactPosition(autoType, x, y);
            }
        }
        public getContactAutoPosition(x: number, y: number): ConnectorType {
            const wr = this.width / 2;
            const hr = this.height / 2;

            const line1 = new VLine(this.cx, this.cy, this.cx + wr, this.cy + hr);
            const line2 = new VLine(this.cx, this.cy, this.cx + wr, this.cy - hr);

            const b1 = line1.contains(x, y);
            const b2 = line2.contains(x, y);

            if (b1) {
                if (b2) {
                    return ConnectorType.Top;
                } else {
                    return ConnectorType.Right;
                }
            } else {
                if (b2) {
                    return ConnectorType.Left;
                } else {
                    return ConnectorType.Bottom;
                }
            }

        }

    }
//}