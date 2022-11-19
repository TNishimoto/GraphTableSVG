import { ZVertex } from "./z_vertex"
import { ZTextBox } from "./z_textbox"
import { ZCalloutAttributes } from "./z_callout"
import { ShapeObjectType, ConnectorType, msoDashStyle, VBAShapeType, DataName } from "../common/enums";
import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"
import { Rectangle, VLine, round100 } from "../common/vline"
import * as CSS from "../html/css"
import * as GOptions from "./z_options"
import { updateAppropriateDashArray } from "../html/enum_extension";
import * as ElementExtension from "../interfaces/element_extension"
import * as DefaultClassNames from "../common/default_class_names"


/**
 * ZRectです。
 * <template data-path="sutoring.Factorizations" data-module="LZ78"></template>
*/
export class ZRect extends ZTextBox {
    public get svgRectangle(): SVGRectElement {
        return <SVGRectElement>this._svgSurface;
    }

    public constructor(svgbox: SVGElement | string, option : GOptions.ZTextBoxAttributes | null = null) {
        super(svgbox);
        this.updateAttributes.push("width");
        this.updateAttributes.push("height");
        //throw Error("error2");
        //this.update();
        if (this.type == ShapeObjectType.Rect) this.firstFunctionAfterInitialized();
    }
    protected createSurface(svgbox: SVGElement): void {
        this._svgSurface = ZRect.createRectangle(this.svgGroup, DefaultClassNames.defaultSurfaceClass, undefined);
        this.svgGroup.insertBefore(this.svgRectangle, this.svgText);
    }
    /**
     * SVGRectElementを生成します。
     * @param parent 生成したSVG要素を子に追加する要素
     * @param className 生成するSVG要素のクラス属性名
     * @returns 生成されたSVGRectElement
     */
    private static createRectangle(parent: SVGElement, className: string | GOptions.surfaceClassCSS | undefined, style: string | undefined | GOptions.surfaceClassCSS): SVGRectElement {
        const rect = <SVGRectElement>document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute(AttributeNames.dataNameAttribute, DataName.Surface);
        parent.appendChild(rect);
        rect.width.baseVal.value = 30;
        rect.height.baseVal.value = 30;
        if (style !== undefined) {
            if (typeof (style) == "string") {
                rect.setAttribute("style", style);
            } else {
                rect.setAttribute("style", CSS.buildClassNameFromSurfaceClassCSS(style));
            }

        }
        //if(style !== undefined) rect.setAttribute("style", style);

        if (className == null) {
            if (rect.style.stroke == null || rect.style.stroke == "") rect.style.stroke = "black";
            if (rect.style.fill == null || rect.style.fill == "") rect.style.fill = "white";
            if (rect.style.strokeWidth == null || rect.style.strokeWidth == "") rect.style.strokeWidth = "1pt";
        } else {
            if (typeof (className) == "string") {
                rect.setAttribute("class", className);
            } else {
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

    static constructAttributes(e: Element, removeAttributes: boolean = false, output: GOptions.ZTextBoxAttributes = {}): GOptions.ZTextBoxAttributes {
        ZTextBox.constructAttributes(e, removeAttributes, output);

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
        return round100(this.svgRectangle.width.baseVal.value);
    }
    set width(value: number) {
        //const value100 = round100(value);
        //if (this.width != value100) this.svgRectangle.setAttribute("width", value100.toString());
        this.setWidthWithoutUpdate(value);
        //this.update();
    }
    protected setWidthWithoutUpdate(value: number) {
        const value100 = round100(value);
        if (this.width != value100) {
            this.svgRectangle.setAttribute("width", value100.toString());
        }

    }
    /**
    頂点の高さを返します。
    */
    get height(): number {
        return round100(this.svgRectangle.height.baseVal.value);
    }
    set height(value: number) {
        this.setHeightWithoutUpdate(value);
        
        //this.update();
    }
    protected setHeightWithoutUpdate(value: number) {
        const value100 = round100(value);
        if (this.height != value100) this.svgRectangle.setAttribute("height", value100.toString());
    }

    public get surfaceRegion(): Rectangle {
        const x = this.svgRectangle.x.baseVal.value;
        const y = this.svgRectangle.y.baseVal.value;
        const w = this.width;
        const h = this.height
        return new Rectangle(x, y, w, h);
    }

    protected updateSurfaceLocation() {
        const virtualRegion = this.getVirtualRegion();
        this.svgRectangle.x.baseVal.value = -virtualRegion.width / 2;
        this.svgRectangle.y.baseVal.value = -virtualRegion.height / 2;
        return false;
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

    public get shape(): VBAShapeType {
        return VBAShapeType.Rectangle;
    }

}
//}