namespace GraphTableSVG {
    export class ShapeArrow extends PPPathTextBox {

        public constructor(svgbox: HTMLElement, option: { className?: string, cx?: number, cy?: number, text?: string, isAutoSizeShapeToFitText?: boolean } = {}) {
            super(svgbox, option);
            this.height = 100;
            this.width = 100;
            this.arrowHeadWidth = 20;
            this.arrowHeadHeight = 20;
            this.arrowNeckWidth = 10;
            this.arrowNeckHeight = 10;
            this.svgGroup.setAttribute("data-direction", "down");

            this.updateAttributes.push("data-direction");
        }
        public get type() : string{
            return "ShapeArrow";
        }
        get arrowNeckWidth(): number {
            return this.svgGroup.getAttributeNumber("data-arrow-neck-width", 0);
        }
        set arrowNeckWidth(value: number) {
            if (this.arrowNeckWidth != value) this.svgGroup.setAttribute("data-arrow-neck-width", value.toString());

        }
        get arrowNeckHeight(): number {
            return this.svgGroup.getAttributeNumber("data-arrow-neck-height", 0);
        }
        set arrowNeckHeight(value: number) {
            if (this.arrowNeckHeight != value) this.svgGroup.setAttribute("data-arrow-neck-height", value.toString());

        }
        get arrowHeadWidth(): number {
            return this.svgGroup.getAttributeNumber("data-arrow-head-width", 0);
        }
        set arrowHeadWidth(value: number) {
            if (this.arrowHeadWidth != value) this.svgGroup.setAttribute("data-arrow-head-width", value.toString());

        }
        get arrowHeadHeight(): number {
            return this.svgGroup.getAttributeNumber("data-arrow-head-height", 0);
        }
        set arrowHeadHeight(value: number) {
            if (this.arrowHeadHeight != value) this.svgGroup.setAttribute("data-arrow-head-height", value.toString());

        }
        get direction(): Direction {
            const r = this.svgGroup.getAttribute("data-direction");
            if (r == "up") {
                return "up";
            } else if (r == "left") {
                return "left";
            } else if (r == "right") {
                return "right";
            } else {
                return "down";
            }
        }
        set direction(value: Direction) {
            if (this.direction != value) {
                this.svgGroup.setAttribute("data-direction", value.toString());
            }
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

            const box = this.svgText.getBBox();
            if (this.direction == "up" || this.direction == "down") {
                this.width = box.width + this.marginPaddingLeft + this.marginPaddingRight;
                this.height = box.height + this.marginPaddingTop + this.marginPaddingBottom + this.arrowNeckHeight + this.arrowHeadHeight;
            } else {
                this.width = box.width + this.marginPaddingLeft + this.marginPaddingRight + this.arrowNeckHeight + this.arrowHeadHeight;
                this.height = box.height + this.marginPaddingTop + this.marginPaddingBottom;
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
    }
}