/// <reference path="z_path_textbox.ts"/>
//namespace GraphTableSVG {
import { ZPathTextBox } from "./z_path_textbox"
import { ShapeObjectType, ConnectorType, Direction, VBAShapeType } from "../common/enums";
import * as AttributeNames from "../common/attribute_names"
import { VLine, escapeWithRound100 } from "../common/vline"
import * as GOptions from "./z_options"

import * as ElementExtension from "../interfaces/element_extension"



export type _ZShapeArrowCalloutAttributes = {
    arrowHeadWidth?: number,
    arrowHeadHeight?: number,
    arrowNeckWidth?: number,
    arrowNeckHeight?: number,
    direction?: Direction
}
export type ZShapeArrowCalloutAttributes = GOptions.ZTextBoxAttributes & _ZShapeArrowCalloutAttributes

export class ZArrowCallout extends ZPathTextBox {

    public constructor(svgbox: SVGElement | string) {
        super(svgbox);
        console.log(this.svgGroup);

        //this.height = 100;
        //this.width = 100;
        /*
        this.arrowNeckWidth = 10;
        this.arrowNeckHeight = 10;
        this.arrowHeadWidth = 20;
        this.arrowHeadHeight = 20;
        this.svgGroup.setAttribute("data-direction", "down");
        */


        //this.updateAttributes.push("data-direction");
        if (this.type == ShapeObjectType.ArrowCallout) this.firstFunctionAfterInitialized();
    }
    /*
    static constructAttributes(e: Element, removeAttributes: boolean = false, output: ZShapeArrowCalloutAttributes = {}): ZShapeArrowCalloutAttributes {
        ZTextBox.constructAttributes(e, removeAttributes, output);
        output.arrowNeckWidth = ElementExtension.gtGetAttributeNumberWithUndefined(e, AttributeNames.arrowNeckWidth);
        output.arrowNeckHeight = ElementExtension.gtGetAttributeNumberWithUndefined(e, AttributeNames.arrowNeckHeight);
        output.arrowHeadWidth = ElementExtension.gtGetAttributeNumberWithUndefined(e, AttributeNames.arrowHeadWidth);
        output.arrowHeadHeight = ElementExtension.gtGetAttributeNumberWithUndefined(e, AttributeNames.arrowNeckHeight);
        const p = <string>ElementExtension.gtGetAttributeStringWithUndefined(e, AttributeNames.direction);
        if (p !== undefined) {
            output.direction = Direction.toDirection(p);
        }

        if (removeAttributes) {
            e.removeAttribute(AttributeNames.arrowNeckWidth);
            e.removeAttribute(AttributeNames.arrowNeckHeight);
            e.removeAttribute(AttributeNames.arrowHeadWidth);
            e.removeAttribute(AttributeNames.arrowHeadHeight);
            e.removeAttribute(AttributeNames.direction);
        }

        return output;
    }
    */
    public initializeSetBasicOption(source : SVGElement) {
        super.initializeSetBasicOption(source);
        /*
        const _arrowNeckWidth = ElementExtension._getAttributeNumber(source, AttributeNames.arrowNeckWidth, true);
        const _arrowNeckHeight = ElementExtension._getAttributeNumber(source, AttributeNames.arrowNeckHeight, true);
        const _arrowHeadWidth = ElementExtension._getAttributeNumber(source, AttributeNames.arrowHeadWidth, true);
        const _arrowHeadHeight = ElementExtension._getAttributeNumber(source, AttributeNames.arrowNeckHeight, true);
        const _direction = <string>ElementExtension._getAttribute(source, AttributeNames.direction, true);
        this.arrowNeckWidth = _arrowNeckWidth !== null ? _arrowNeckWidth : this.arrowNeckWidth;
        this.arrowNeckHeight = _arrowNeckHeight !== null ? _arrowNeckHeight : this.arrowNeckHeight;
        this.arrowHeadWidth = _arrowHeadWidth !== null ? _arrowHeadWidth : this.arrowHeadWidth;
        this.arrowHeadHeight = _arrowHeadHeight !== null ? _arrowHeadHeight : this.arrowHeadHeight;
        this.direction = _direction !== null ? Direction.toDirection(_direction) : this.direction;

        */




    }

    /*
    protected setBasicOption(option: ZShapeArrowCalloutAttributes) {
        super.setBasicOption(option);
    }
    public setOption(option: ZShapeArrowCalloutAttributes) {
        super.setOption(option)
    }
    */
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
        return ElementExtension.gtGetAttributeNumberWithoutNull(this.svgGroup, AttributeNames.dataArrowNeckWidth, 10);
    }
    set arrowNeckWidth(value: number) {
        if (this.arrowNeckWidth != value) this.svgGroup.setAttribute(AttributeNames.dataArrowNeckWidth, value.toString());

    }
    get arrowNeckHeight(): number {
        return ElementExtension.gtGetAttributeNumberWithoutNull(this.svgGroup, AttributeNames.dataArrowNeckHeight, 10);
    }
    set arrowNeckHeight(value: number) {
        if (this.arrowNeckHeight != value) this.svgGroup.setAttribute(AttributeNames.dataArrowNeckHeight, value.toString());

    }
    get arrowHeadWidth(): number {
        return ElementExtension.gtGetAttributeNumberWithoutNull(this.svgGroup, AttributeNames.dataArrowHeadWidth, 20);
    }
    set arrowHeadWidth(value: number) {
        if (this.arrowHeadWidth != value) this.svgGroup.setAttribute(AttributeNames.dataArrowHeadWidth, value.toString());

    }
    get arrowHeadHeight(): number {
        return ElementExtension.gtGetAttributeNumberWithoutNull(this.svgGroup, AttributeNames.dataArrowHeadHeight, 20);
    }
    set arrowHeadHeight(value: number) {
        if (this.arrowHeadHeight != value) this.svgGroup.setAttribute(AttributeNames.dataArrowHeadHeight, value.toString());

    }
    get direction(): Direction {
        const r = this.svgGroup.getAttribute(AttributeNames.dataDirection);
        return Direction.toDirection(r);
    }
    set direction(value: Direction) {
        if (this.direction != value) {
            this.svgGroup.setAttribute(AttributeNames.dataDirection, value.toString());
        }
    }
    get topExtraLength(): number {
        if (this.direction == "up") {
            return this.arrowHeadHeight + this.arrowNeckHeight + this.marginTop;
        } else {
            return this.marginTop;
        }
    }
    get leftExtraLength(): number {
        if (this.direction == "left") {
            return this.arrowHeadHeight + this.arrowNeckHeight + this.marginLeft;
        } else {
            return this.marginLeft;
        }

    }
    get rightExtraLength(): number {
        if (this.direction == "right") {
            return this.arrowHeadHeight + this.arrowNeckHeight + this.marginRight;
        } else {
            return this.marginRight;
        }

    }
    get bottomExtraLength(): number {
        if (this.direction == "down") {
            return this.arrowHeadHeight + this.arrowNeckHeight + this.marginBottom;
        } else {
            return this.marginBottom;
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
            return this.getVirtualHeight() - this.arrowNeckHeight - this.arrowHeadWidth;
        } else {
            return this.getVirtualHeight();
        }
    }
    protected get boxWidth() {
        if (this.direction == "up" || this.direction == "down") {
            return this.getVirtualWidth();
        } else {
            return this.getVirtualWidth() - this.arrowNeckHeight - this.arrowHeadWidth;
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

     protected updateSurfaceLocation(): boolean {
        //const region = await this.getVirtualRegion();
        const x1 = this.getVirtualX();
        const y1 = this.getVirtualY();
        const x2 = this.getVirtualX() + this.getVirtualWidth();
        const y2 = this.getVirtualY() + this.getVirtualHeight();
        /*
        const bx1 = x1;
        const by1 = y1;
        const bx2 = x2;
        const by2 = y2;
        */

        let cx = this.getVirtualCX();
        let cy = this.getVirtualCY();
        console.log(cx, cy, this.direction);

        if (this.direction == "up") {



            let nx1 = cx - (this.arrowNeckWidth / 2)
            let nx2 = cx + (this.arrowNeckWidth / 2)
            let ny = y1 - this.arrowNeckHeight;
            //let cx = 0;

            let hx1 = cx - (this.arrowHeadWidth / 2)
            let hx2 = cx + (this.arrowHeadWidth / 2)
            let hy = ny - this.arrowHeadHeight;

            const mes = escapeWithRound100 `H ${nx1} V ${ny} H ${hx1} L ${cx} ${hy} L ${hx2} ${ny} H ${nx2} V ${y1}`;
            const top = escapeWithRound100 `M ${x1} ${y1} ${mes} H ${x2}`;

            const right = escapeWithRound100 `V ${y2}`;
            const bottom = escapeWithRound100 `H ${x1}`;
            const left = escapeWithRound100 `V ${y1}`
            this.svgPath.setAttribute("d", escapeWithRound100 `${top} ${right} ${bottom} ${left} z`);

        } else if (this.direction == "left") {


            let ny1 = cy + (this.arrowNeckWidth / 2)
            let ny2 = cy - (this.arrowNeckWidth / 2)
            let nx = x1 - this.arrowNeckHeight;
            //let cy = 0;

            let hy1 = cy + (this.arrowHeadWidth / 2)
            let hy2 = cy - (this.arrowHeadWidth / 2)
            let hx = nx - this.arrowHeadHeight;

            const top = escapeWithRound100 `M ${x1} ${y1} H ${x2}`;
            const right = escapeWithRound100 `V ${y2}`;
            const bottom = escapeWithRound100 `H ${x1}`;
            const left = escapeWithRound100 `V ${ny1} H ${nx} V ${hy1} L ${hx} ${cy} L ${nx} ${hy2} V ${ny2} H ${x1} V ${y1}`
            this.svgPath.setAttribute("d", escapeWithRound100 `${top} ${right} ${bottom} ${left} z`);


        } else if (this.direction == "right") {


            let ny1 = cy - (this.arrowNeckWidth / 2)
            let ny2 = cy + (this.arrowNeckWidth / 2)
            let nx = x2 + this.arrowNeckHeight;
            //let cy = 0;

            let hy1 = cy - (this.arrowHeadWidth / 2)
            let hy2 = cy + (this.arrowHeadWidth / 2)
            let hx = nx + this.arrowHeadHeight;

            const top = escapeWithRound100 `M ${x1} ${y1} H ${x2}`;
            const right = escapeWithRound100 `V ${ny1} H ${nx} V ${hy1} L ${hx} ${cy} L ${nx} ${hy2} V ${ny2} H ${x2} V ${y2}`;
            const bottom = escapeWithRound100 `H ${x1}`;
            const left = escapeWithRound100 `V ${y1}`;
            this.svgPath.setAttribute("d", escapeWithRound100 `${top} ${right} ${bottom} ${left} z`);


        } else {



            //const by2 = y2;

            //const by = boxHeight + dy;
            let nx1 = cx - (this.arrowNeckWidth / 2)
            let nx2 = cx + (this.arrowNeckWidth / 2)
            let ny = y2 + this.arrowNeckHeight;

            let hx1 = cx - (this.arrowHeadWidth / 2)
            let hx2 = cx + (this.arrowHeadWidth / 2)
            let hy = ny + this.arrowHeadHeight;
            const top = escapeWithRound100 `M ${x1} ${y1} H ${x2}`;
            const right = escapeWithRound100 `V ${y2}`;
            const bottom = escapeWithRound100 `H ${nx2} V ${ny} H ${hx2} L ${cx} ${hy} L ${hx1} ${ny} H ${nx1} V ${y2} H ${x1}`;
            const left = escapeWithRound100 `V ${y1}`
            this.svgPath.setAttribute("d", escapeWithRound100 `${top} ${right} ${bottom} ${left} z`);
        }
        return true;
     }

     public update() {
        super.update();        
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
    public getContactAutoPosition(x: number, y: number): ConnectorType {
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