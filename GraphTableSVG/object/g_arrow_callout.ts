/// <reference path="g_path_textbox.ts"/>
namespace GraphTableSVG {
    export class GArrowCallout extends GPathTextBox {

        public constructor(svgbox: SVGElement | string, option: GShapeArrowCalloutAttributes = {}) {
            super(svgbox, option);
            if (option.height == undefined) this.height = 100;
            if (option.width == undefined) this.width = 100;
            this.arrowNeckWidth = option.arrowNeckWidth == undefined ? 10 : option.arrowNeckWidth;
            this.arrowNeckHeight = option.arrowNeckHeight == undefined ? 10 : option.arrowNeckHeight;
            this.arrowHeadWidth = option.arrowHeadWidth == undefined ? 20 : option.arrowHeadWidth;
            this.arrowHeadHeight = option.arrowHeadHeight == undefined ? 20 : option.arrowHeadHeight;
            this.svgGroup.setAttribute("data-direction", option.direction == undefined ? "down" : option.direction);

            this.updateAttributes.push("data-direction");
        }
        static constructAttributes(e : Element, removeAttributes : boolean = false, output : GShapeArrowCalloutAttributes = {}) : GShapeArrowCalloutAttributes {        
            GTextBox.constructAttributes(e, removeAttributes, output);
            output.arrowNeckWidth = e.gtGetAttributeNumberWithoutNull("arrow-neck-width", 10);
            output.arrowNeckHeight = e.gtGetAttributeNumberWithoutNull("arrow-neck-height", 10);
            output.arrowHeadWidth = e.gtGetAttributeNumberWithoutNull("arrow-head-width", 20);
            output.arrowHeadHeight = e.gtGetAttributeNumberWithoutNull("arrow-head-height", 20);
            const p = <string>e.gtGetAttribute("direction", "");
            output.direction = Direction.toDirection(p);

            if(removeAttributes){
                e.removeAttribute("arrow-neck-width");
                e.removeAttribute("arrow-neck-height");
                e.removeAttribute("arrow-head-width");
                e.removeAttribute("arrow-head-height");
                e.removeAttribute("direction");
            }

            return output;
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
            return this.svgGroup.gtGetAttributeNumberWithoutNull("data-arrow-neck-width", 0);
        }
        set arrowNeckWidth(value: number) {
            if (this.arrowNeckWidth != value) this.svgGroup.setAttribute("data-arrow-neck-width", value.toString());

        }
        get arrowNeckHeight(): number {
            return this.svgGroup.gtGetAttributeNumberWithoutNull("data-arrow-neck-height", 0);
        }
        set arrowNeckHeight(value: number) {
            if (this.arrowNeckHeight != value) this.svgGroup.setAttribute("data-arrow-neck-height", value.toString());

        }
        get arrowHeadWidth(): number {
            return this.svgGroup.gtGetAttributeNumberWithoutNull("data-arrow-head-width", 0);
        }
        set arrowHeadWidth(value: number) {
            if (this.arrowHeadWidth != value) this.svgGroup.setAttribute("data-arrow-head-width", value.toString());

        }
        get arrowHeadHeight(): number {
            return this.svgGroup.gtGetAttributeNumberWithoutNull("data-arrow-head-height", 0);
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
                rect.width = this.boxWidth - this.marginPaddingLeft;
                rect.height = this.boxHeight - this.marginPaddingTop;
                rect.x = (-this.width / 2) + this.marginPaddingLeft;
                rect.y = (-this.height / 2) + this.marginPaddingTop;
            }
            if (this.direction == "up") rect.y += this.arrowNeckHeight + this.arrowHeadHeight;
            if (this.direction == "left") rect.x += this.arrowNeckHeight + this.arrowHeadHeight;
            return rect;
        }
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

        protected updateToFitText() {

            const textRect = SVGTextBox.getSize(this.svgText);
            //const box = this.svgText.getBBox();
            if (this.direction == "up" || this.direction == "down") {
                this.width = textRect.width + this.marginPaddingLeft + this.marginPaddingRight;
                this.height = textRect.height + this.marginPaddingTop + this.marginPaddingBottom + this.arrowNeckHeight + this.arrowHeadHeight;
            } else {
                this.width = textRect.width + this.marginPaddingLeft + this.marginPaddingRight + this.arrowNeckHeight + this.arrowHeadHeight;
                this.height = textRect.height + this.marginPaddingTop + this.marginPaddingBottom;
            }
        }
        protected update() {
            super.update();


            if (this.direction == "up") {
                const x1 = - (this.width / 2);
                const y1 = - (this.height / 2);
                const x2 = (this.width / 2);
                const y2 = (this.height / 2);

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

                const mes = `H ${nx1} V ${ny} H ${hx1} L ${cx} ${hy} L ${hx2} ${ny} H ${nx2} V ${by1}`;
                const top = `M ${bx1} ${by1} ${mes} H ${bx2}`;

                const right = `V ${by2}`;
                const bottom = `H ${bx1}`;
                const left = `V ${by1}`
                this.svgPath.setAttribute("d", `${top} ${right} ${bottom} ${left} z`);

            } else if (this.direction == "left") {

                const x1 = - (this.width / 2);
                const y1 = - (this.height / 2);
                const x2 = (this.width / 2);
                const y2 = (this.height / 2);

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

                const top = `M ${bx1} ${by1} H ${bx2}`;
                const right = `V ${by2}`;
                const bottom = `H ${bx1}`;
                const left = `V ${ny1} H ${nx} V ${hy1} L ${hx} ${cy} L ${nx} ${hy2} V ${ny2} H ${bx1} V ${by1}`
                this.svgPath.setAttribute("d", `${top} ${right} ${bottom} ${left} z`);


            } else if (this.direction == "right") {
                const x1 = - (this.width / 2);
                const y1 = - (this.height / 2);
                const x2 = (this.width / 2);
                const y2 = (this.height / 2);

                const bx1 = x1;
                const by1 = y1;
                const bx2 = x2 - this.arrowHeadHeight - this.arrowNeckHeight;
                const by2 = y2;


                let ny1 = 0 - (this.arrowNeckWidth / 2)
                let ny2 = 0 + (this.arrowNeckWidth / 2)
                let nx = bx2 + this.arrowNeckHeight;
                let cy = 0;

                let hy1 = 0 - (this.arrowHeadWidth / 2)
                let hy2 = 0 + (this.arrowHeadWidth / 2)
                let hx = x2;

                const top = `M ${bx1} ${by1} H ${bx2}`;
                const right = `V ${ny1} H ${nx} V ${hy1} L ${hx} ${cy} L ${nx} ${hy2} V ${ny2} H ${bx2} V ${by2}`;
                const bottom = `H ${bx1}`;
                const left = `V ${by1}`;
                this.svgPath.setAttribute("d", `${top} ${right} ${bottom} ${left} z`);


            } else {

                const x1 = - (this.width / 2);
                const y1 = - (this.height / 2);
                const x2 = (this.width / 2);
                const y2 = (this.height / 2);

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
                const top = `M ${bx1} ${by1} H ${bx2}`;
                const right = `V ${by2}`;
                const bottom = `H ${nx2} V ${ny} H ${hx2} L ${cx} ${hy} L ${hx1} ${ny} H ${nx1} V ${by2} H ${bx1}`;
                const left = `V ${by1}`
                this.svgPath.setAttribute("d", `${top} ${right} ${bottom} ${left} z`);
            }
        }
        public get shape(): string {
            switch (this.direction) {
                case "up": return "msoShapeUpArrowCallout";
                case "left": return "msoShapeLeftArrowCallout";
                case "right": return "msoShapeRightArrowCallout";
                case "down": return "msoShapeDownArrowCallout";
            }
            return "msoShapeDownArrowCallout";
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
            }else{
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
        public getLocation(type: ConnectorPosition, x: number, y: number): [number, number] {
            const wr = this.width / 2;
            const hr = this.height / 2;


            switch (type) {
                case ConnectorPosition.Top:
                    return [this.x, this.y - hr];
                case ConnectorPosition.TopRight:
                case ConnectorPosition.Right:
                case ConnectorPosition.BottomRight:
                    return [this.x + wr, this.y];
                case ConnectorPosition.Bottom:
                    return [this.x, this.y + hr];
                case ConnectorPosition.BottomLeft:
                case ConnectorPosition.Left:
                case ConnectorPosition.TopLeft:
                    return [this.x - wr, this.y];
                default:
                    const autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        }
        protected getAutoPosition(x: number, y: number): ConnectorPosition {
            const wr = this.width / 2;
            const hr = this.height / 2;

            const line1 = new VLine(this.x, this.y, this.x + wr, this.y + hr);
            const line2 = new VLine(this.x, this.y, this.x + wr, this.y - hr);

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