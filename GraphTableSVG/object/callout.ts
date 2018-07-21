namespace GraphTableSVG {
    export class CallOut {
        private _svgPath: SVGPathElement;
        public get svgPath(): SVGPathElement {
            return this._svgPath;
        }
        private _svgGroup: SVGGElement;
        /**
        セルを表しているSVGGElementを返します。
        */
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }


        public constructor(svgbox: HTMLElement, option: { className?: string, cx? :number, cy? : number } = {}) {
            this._svgGroup = SVG.createGroup();
            svgbox.appendChild(this._svgGroup);
            this._svgPath = GraphTableSVG.SVG.createPath(this._svgGroup, 0, 0, 0, 0);
            this.width = 100;
            this.height = 100;
            if(option.cx != undefined) this.cx = option.cx;
            if(option.cy != undefined) this.cy = option.cy;

            this.update();
        }
        private update() {
            const _x = - (this.width/2);
            const _y = - (this.height/2);

            this.svgPath.setAttribute("d", `M ${_x} ${_y} H ${_x + this.width} V ${_y + this.height} H ${_x} V ${_y} z`);
        }
        public get x(): number {
            return this.cx - (this.width/2);
        }
        public get y(): number {
            return this.cy - (this.height/2);
        }

        /**
        このVertexのX座標を返します。
        */
        public get cx(): number {
            return this.svgGroup.getX();
        }
        public set cx(value: number) {
            if (this.svgGroup.getX() != value) {
                this.svgGroup.setX(value);
            }
        }
        /**
        このVertexのY座標を返します。
        */
        public get cy(): number {
            return this.svgGroup.getY();
        }
        public set cy(value: number) {
            if (this.svgGroup.getY() != value) {
                this.svgGroup.setY(value);
            }
        }

        /**
        頂点の幅を返します。
        */
        get width(): number {
            return this.svgGroup.getAttributeNumber("data-width", 0);
        }
        set width(value: number) {
            this.svgGroup.setAttribute("data-width", value.toString());

        }
        /**
        頂点の高さを返します。
        */
        get height(): number {
            return this.svgGroup.getAttributeNumber("data-height", 0);
        }
        set height(value: number) {
            this.svgGroup.setAttribute("data-height", value.toString());
        }
    }
}