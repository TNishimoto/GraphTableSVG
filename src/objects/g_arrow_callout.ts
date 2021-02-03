/// <reference path="g_path_textbox.ts"/>
//namespace GraphTableSVG {
import { GPathTextBox } from "./g_path_textbox"
import { GTextBox } from "./g_textbox"
import { ShapeObjectType, ConnectorType, msoDashStyle, Direction, AutoSizeShapeToFitText, VBAShapeType } from "../common/enums";
//import {GTextBoxAttributes, GObjectAttributes, GCalloutAttributes, GShapeArrowCalloutAttributes} from "../options/attributes_option"
import * as AttributeNames from "../common/attribute_names"
import { Rectangle, VLine, escapeWithRound100 } from "../common/vline"
import * as SVGTextBox from "../interfaces/svg_textbox";
import * as GOptions from "./g_options"

import * as ElementExtension from "../interfaces/element_extension"
import * as SVGTextExtensions from "../interfaces/svg_text_extension"
import * as SVGTextExtension from "../interfaces/svg_text_extension"



export type _GShapeArrowCalloutAttributes = {
    arrowHeadWidth?: number,
    arrowHeadHeight?: number,
    arrowNeckWidth?: number,
    arrowNeckHeight?: number,
    direction?: Direction
}
export type GShapeArrowCalloutAttributes = GOptions.GTextBoxAttributes & _GShapeArrowCalloutAttributes

export class GArrowCallout extends GPathTextBox {

    public constructor(svgbox: SVGElement | string) {
        super(svgbox);

        //this.height = 100;
        //this.width = 100;
        this.arrowNeckWidth = 10;
        this.arrowNeckHeight = 10;
        this.arrowHeadWidth = 20;
        this.arrowHeadHeight = 20;
        this.svgGroup.setAttribute("data-direction", "down");


        this.updateAttributes.push("data-direction");
        if (this.type == ShapeObjectType.ArrowCallout) this.firstFunctionAfterInitialized();
    }
    static constructAttributes(e: Element, removeAttributes: boolean = false, output: GShapeArrowCalloutAttributes = {}): GShapeArrowCalloutAttributes {
        GTextBox.constructAttributes(e, removeAttributes, output);
        output.arrowNeckWidth = ElementExtension.gtGetAttributeNumberWithUndefined(e, "arrow-neck-width");
        output.arrowNeckHeight = ElementExtension.gtGetAttributeNumberWithUndefined(e, "arrow-neck-height");
        output.arrowHeadWidth = ElementExtension.gtGetAttributeNumberWithUndefined(e, "arrow-head-width");
        output.arrowHeadHeight = ElementExtension.gtGetAttributeNumberWithUndefined(e, "arrow-head-height");
        const p = <string>ElementExtension.gtGetAttributeStringWithUndefined(e, "direction");
        if (p !== undefined) {
            output.direction = Direction.toDirection(p);
        }

        if (removeAttributes) {
            e.removeAttribute("arrow-neck-width");
            e.removeAttribute("arrow-neck-height");
            e.removeAttribute("arrow-head-width");
            e.removeAttribute("arrow-head-height");
            e.removeAttribute("direction");
        }

        return output;
    }
    protected setBasicOption(option: GShapeArrowCalloutAttributes) {
        super.setBasicOption(option);
        this.arrowNeckWidth = option.arrowNeckWidth !== undefined ? option.arrowNeckWidth : this.arrowNeckWidth;
        this.arrowNeckHeight = option.arrowNeckHeight !== undefined ? option.arrowNeckHeight : this.arrowNeckHeight;
        this.arrowHeadWidth = option.arrowHeadWidth !== undefined ? option.arrowHeadWidth : this.arrowHeadWidth;
        this.arrowHeadHeight = option.arrowHeadHeight !== undefined ? option.arrowHeadHeight : this.arrowHeadHeight;
        this.direction = option.direction !== undefined ? option.direction : this.direction;
    }
    public setOption(option: GShapeArrowCalloutAttributes) {
        super.setOption(option)
    }
    /*
    static openCustomElement(e: SVGElement): ShapeArrowCallout {
        const parent = e.parentElement;
        if (parent instanceof SVGSVGElement) {
            const option = ShapeArrowCallout.constructAttributes(e, true);
            const attrs = e.gtGetAttributes();
            const r = new ShapeArrowCallout(parent, option);
            e.remove();
            attrs.forEach((v) => r.svgGroup.setAttribute(v.name, v.value));
            return r;
        } else {
            throw Error("error!");
        }
    }
    */
    public get type(): ShapeObjectType {
        return ShapeObjectType.ArrowCallout;
    }
    get arrowNeckWidth(): number {
        return ElementExtension.gtGetAttributeNumberWithoutNull(this.svgGroup, "data-arrow-neck-width", 0);
    }
    set arrowNeckWidth(value: number) {
        if (this.arrowNeckWidth != value) this.svgGroup.setAttribute("data-arrow-neck-width", value.toString());

    }
    get arrowNeckHeight(): number {
        return ElementExtension.gtGetAttributeNumberWithoutNull(this.svgGroup, "data-arrow-neck-height", 0);
    }
    set arrowNeckHeight(value: number) {
        if (this.arrowNeckHeight != value) this.svgGroup.setAttribute("data-arrow-neck-height", value.toString());

    }
    get arrowHeadWidth(): number {
        return ElementExtension.gtGetAttributeNumberWithoutNull(this.svgGroup, "data-arrow-head-width", 0);
    }
    set arrowHeadWidth(value: number) {
        if (this.arrowHeadWidth != value) this.svgGroup.setAttribute("data-arrow-head-width", value.toString());

    }
    get arrowHeadHeight(): number {
        return ElementExtension.gtGetAttributeNumberWithoutNull(this.svgGroup, "data-arrow-head-height", 0);
    }
    set arrowHeadHeight(value: number) {
        if (this.arrowHeadHeight != value) this.svgGroup.setAttribute("data-arrow-head-height", value.toString());

    }
    get direction(): Direction {
        const r = this.svgGroup.getAttribute("data-direction");
        return Direction.toDirection(r);
    }
    set direction(value: Direction) {
        if (this.direction != value) {
            this.svgGroup.setAttribute("data-direction", value.toString());
        }
    }
    get topExtraLength(): number {
        if (this.direction == "up") {
            return this.arrowHeadHeight + this.arrowNeckHeight + this.marginPaddingTop;
        } else {
            return this.marginPaddingTop;
        }
    }
    get leftExtraLength(): number {
        if (this.direction == "left") {
            return this.arrowHeadHeight + this.arrowNeckHeight + this.marginPaddingLeft;
        } else {
            return this.marginPaddingLeft;
        }

    }
    get rightExtraLength(): number {
        if (this.direction == "right") {
            return this.arrowHeadHeight + this.arrowNeckHeight + this.marginPaddingRight;
        } else {
            return this.marginPaddingRight;
        }

    }
    get bottomExtraLength(): number {
        if (this.direction == "down") {
            return this.arrowHeadHeight + this.arrowNeckHeight + this.marginPaddingBottom;
        } else {
            return this.marginPaddingBottom;
        }

    }

    /*
    get innerRectangle(): Rectangle {
        const rect = new Rectangle();
        if (this.isAutoSizeShapeToFitText == AutoSizeShapeToFitText.Auto) {
            
            const textRect = SVGTextExtensions.getSize(this.svgText);
            //const b = this.svgText.getBBox();
            rect.width = textRect.width;
            rect.height = textRect.height;
            rect.x = (-this.width / 2) + this.marginPaddingLeft;
            rect.y = (-this.height / 2) + this.marginPaddingTop;
        } else {
            rect.width = this.boxWidth - this.marginPaddingLeft;
            rect.height = this.boxHeight - this.marginPaddingTop;
            rect.x = (-this.width / 2) + this.marginPaddingLeft;
            rect.y = (-this.height / 2) + this.marginPaddingTop;
        }
        if (this.direction == "up") rect.y += this.arrowNeckHeight + this.arrowHeadHeight;
        if (this.direction == "left") rect.x += this.arrowNeckHeight + this.arrowHeadHeight;
        return rect;
    }
    */
    /**
     * 矢印部分を除いた図形の高さを表します。
     */
    protected get boxHeight() {
        if (this.direction == "up" || this.direction == "down") {
            return this.height - this.arrowNeckHeight - this.arrowHeadWidth;
        } else {
            return this.height;
        }
    }
    protected get boxWidth() {
        if (this.direction == "up" || this.direction == "down") {
            return this.width;
        } else {
            return this.width - this.arrowNeckHeight - this.arrowHeadWidth;
        }
    }
    /*
    protected updateToFitText() {

        const textRect = SVGTextExtensions.getSize(this.svgText);
        //const box = this.svgText.getBBox();
        if (this.direction == "up" || this.direction == "down") {
            this.width = textRect.width + this.marginPaddingLeft + this.marginPaddingRight;
            this.height = textRect.height + this.marginPaddingTop + this.marginPaddingBottom + this.arrowNeckHeight + this.arrowHeadHeight;
        } else {
            this.width = textRect.width + this.marginPaddingLeft + this.marginPaddingRight + this.arrowNeckHeight + this.arrowHeadHeight;
            this.height = textRect.height + this.marginPaddingTop + this.marginPaddingBottom;
        }
    }
    */
    /*
     public getVirtualRegion(): Rectangle {
         const textRect = SVGTextExtension.getVirtualRegion(this.svgText);
         let _w = 0;
         let _h = 0;
         if (this.direction == "up" || this.direction == "down") {
             _w = textRect.width + this.marginPaddingLeft + this.marginPaddingRight;
             _h = textRect.height + this.marginPaddingTop + this.marginPaddingBottom + this.arrowNeckHeight + this.arrowHeadHeight;
         } else {
             _w = textRect.width + this.marginPaddingLeft + this.marginPaddingRight + this.arrowNeckHeight + this.arrowHeadHeight;
             _h = textRect.height + this.marginPaddingTop + this.marginPaddingBottom;
         }

         if (this.isAutoSizeShapeToFitText == AutoSizeShapeToFitText.Auto) {
 

             const textWidth = _w < this._minimumWidth ? this._minimumWidth : _w;
             const textHeight = _h < this._minimumHeight ? this._minimumHeight : _h;
             const width = _w;
             const height = _h;
 
             return new Rectangle(this.cx - (width / 2), this.cy - (height / 2), width, height);
 
         } else if (this.isAutoSizeShapeToFitText == AutoSizeShapeToFitText.SemiAuto) {
             const newWidth = this.width < _w ? _w : this.width;
             const newHeigth = this.height < _h ? _h : this.height;
             return new Rectangle(this.cx - (newWidth / 2), this.cy - (newHeigth / 2), newWidth, newHeigth);
         } else {
 
             return new Rectangle(this.cx - (this.width / 2), this.cy - (this.height / 2), this.width, this.height);
 
             //return new Rectangle(this.x, this.y, this.width, this.height);
         }
     }
     */
    public update() {
        super.update();

        const region = this.getVirtualRegion();
        const x1 = region.x;
        const y1 = region.y;
        const x2 = region.right;
        const y2 = region.bottom;
        if (this.direction == "up") {

            const bx1 = x1;
            const by1 = y1 + this.arrowHeadHeight + this.arrowNeckHeight;
            const bx2 = x2;
            const by2 = y2;


            let nx1 = - (this.arrowNeckWidth / 2)
            let nx2 = (this.arrowNeckWidth / 2)
            let ny = by1 - this.arrowNeckHeight;
            let cx = 0;

            let hx1 = - (this.arrowHeadWidth / 2)
            let hx2 = (this.arrowHeadWidth / 2)
            let hy = y1;

            const mes = escapeWithRound100 `H ${nx1} V ${ny} H ${hx1} L ${cx} ${hy} L ${hx2} ${ny} H ${nx2} V ${by1}`;
            const top = escapeWithRound100 `M ${bx1} ${by1} ${mes} H ${bx2}`;

            const right = escapeWithRound100 `V ${by2}`;
            const bottom = escapeWithRound100 `H ${bx1}`;
            const left = escapeWithRound100 `V ${by1}`
            this.svgPath.setAttribute("d", escapeWithRound100 `${top} ${right} ${bottom} ${left} z`);

        } else if (this.direction == "left") {
            const bx1 = x1 + this.arrowHeadHeight + this.arrowNeckHeight;
            const by1 = y1;
            const bx2 = x2;
            const by2 = y2;


            let ny1 = 0 + (this.arrowNeckWidth / 2)
            let ny2 = 0 - (this.arrowNeckWidth / 2)
            let nx = bx1 - this.arrowNeckHeight;
            let cy = 0;

            let hy1 = 0 + (this.arrowHeadWidth / 2)
            let hy2 = 0 - (this.arrowHeadWidth / 2)
            let hx = x1;

            const top = escapeWithRound100 `M ${bx1} ${by1} H ${bx2}`;
            const right = escapeWithRound100 `V ${by2}`;
            const bottom = escapeWithRound100 `H ${bx1}`;
            const left = escapeWithRound100 `V ${ny1} H ${nx} V ${hy1} L ${hx} ${cy} L ${nx} ${hy2} V ${ny2} H ${bx1} V ${by1}`
            this.svgPath.setAttribute("d", escapeWithRound100 `${top} ${right} ${bottom} ${left} z`);


        } else if (this.direction == "right") {

            const bx1 = x1;
            const by1 = y1;
            const bx2 = x2 - this.arrowNeckHeight - this.arrowHeadHeight;
            const by2 = y2;


            let ny1 = 0 - (this.arrowNeckWidth / 2)
            let ny2 = 0 + (this.arrowNeckWidth / 2)
            let nx = bx2 + this.arrowNeckHeight;
            let cy = 0;

            let hy1 = 0 - (this.arrowHeadWidth / 2)
            let hy2 = 0 + (this.arrowHeadWidth / 2)
            let hx = x2;

            const top = escapeWithRound100 `M ${bx1} ${by1} H ${bx2}`;
            const right = escapeWithRound100 `V ${ny1} H ${nx} V ${hy1} L ${hx} ${cy} L ${nx} ${hy2} V ${ny2} H ${bx2} V ${by2}`;
            const bottom = escapeWithRound100 `H ${bx1}`;
            const left = escapeWithRound100 `V ${by1}`;
            this.svgPath.setAttribute("d", escapeWithRound100 `${top} ${right} ${bottom} ${left} z`);


        } else {



            const bx1 = x1;
            const by1 = y1;
            const bx2 = x2;
            const by2 = y2 - this.arrowHeadHeight - this.arrowNeckHeight;

            //const by = boxHeight + dy;

            let nx1 = - (this.arrowNeckWidth / 2)
            let nx2 = (this.arrowNeckWidth / 2)
            let ny = by2 + this.arrowNeckHeight;
            let cx = 0;

            let hx1 = - (this.arrowHeadWidth / 2)
            let hx2 = (this.arrowHeadWidth / 2)
            let hy = y2;
            const top = escapeWithRound100 `M ${bx1} ${by1} H ${bx2}`;
            const right = escapeWithRound100 `V ${by2}`;
            const bottom = escapeWithRound100 `H ${nx2} V ${ny} H ${hx2} L ${cx} ${hy} L ${hx1} ${ny} H ${nx1} V ${by2} H ${bx1}`;
            const left = escapeWithRound100 `V ${by1}`
            this.svgPath.setAttribute("d", escapeWithRound100 `${top} ${right} ${bottom} ${left} z`);
        }
    }
    public get shape(): VBAShapeType {
        switch (this.direction) {
            case "up": return VBAShapeType.UpArrowCallout;
            case "left": return VBAShapeType.LeftArrowCallout;
            case "right": return VBAShapeType.RightArrowCallout;
            case "down": return VBAShapeType.DownArrowCallout;
        }
        return VBAShapeType.DownArrowCallout;
    }
    /**
     * VBAコードでのこの図形を表すShape図形のVBAAdjustmentsプロパティを表します。
     * 第一要素は矢印の首の幅（）
     * 第二要素は矢印の頭の幅
     * @returns VBAAdjustments値の配列。
     */
    protected get VBAAdjustments(): number[] {
        if (this.direction == "up") {
            const neckWidthRatio = this.arrowNeckWidth / this.height;
            const headWidthRatio = this.arrowHeadWidth / (this.height * 2);
            const headHeightRatio = this.arrowHeadHeight / this.height;
            const boxHeightRatio = this.boxHeight / this.height;
            return [neckWidthRatio, headWidthRatio, headHeightRatio, boxHeightRatio];
        } else if (this.direction == "right") {
            const neckWidthRatio = this.arrowNeckWidth / this.height;
            const headWidthRatio = this.arrowHeadWidth / (this.height * 2);
            const headHeightRatio = this.arrowHeadHeight / this.height;
            const boxWidthRatio = this.boxWidth / this.width;
            return [neckWidthRatio, headWidthRatio, headHeightRatio, boxWidthRatio];
        } else if (this.direction == "left") {
            const neckWidthRatio = this.arrowNeckWidth / this.height;
            const headWidthRatio = this.arrowHeadWidth / (this.height * 2);
            const headHeightRatio = this.arrowHeadHeight / this.height;
            const boxWidthRatio = this.boxWidth / this.width;
            return [neckWidthRatio, headWidthRatio, headHeightRatio, boxWidthRatio];
        } else {
            const neckWidthRatio = this.arrowNeckWidth / this.height;
            const headWidthRatio = this.arrowHeadWidth / (this.height * 2);
            const headHeightRatio = this.arrowHeadHeight / this.height;
            const boxHeightRatio = this.boxHeight / this.height;
            return [neckWidthRatio, headWidthRatio, headHeightRatio, boxHeightRatio];
        }
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
                return [this.x, this.y - hr];
            case ConnectorType.TopRight:
            case ConnectorType.Right:
            case ConnectorType.BottomRight:
                return [this.x + wr, this.y];
            case ConnectorType.Bottom:
                return [this.x, this.y + hr];
            case ConnectorType.BottomLeft:
            case ConnectorType.Left:
            case ConnectorType.TopLeft:
                return [this.x - wr, this.y];
            default:
                const autoType = this.getContactAutoPosition(x, y);
                return this.getContactPosition(autoType, x, y);
        }
    }
    protected getContactAutoPosition(x: number, y: number): ConnectorType {
        const wr = this.width / 2;
        const hr = this.height / 2;

        const line1 = new VLine(this.x, this.y, this.x + wr, this.y + hr);
        const line2 = new VLine(this.x, this.y, this.x + wr, this.y - hr);

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