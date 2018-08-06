namespace GraphTableSVG {
    export class PPEllipse extends PPTextBoxShapeBase {
        private _svgEllipse: SVGEllipseElement;
        public get svgEllipse(): SVGEllipseElement {
            return this._svgEllipse;
        }
        public constructor(svgbox: SVGSVGElement, option: TextBoxShapeAttributes = {}) {

            super(svgbox, option);
            this._svgEllipse = SVG.createEllipse(this.svgGroup, this.svgGroup.getPropertyStyleValue(Vertex.defaultSurfaceClass));
            this.svgGroup.insertBefore(this.svgEllipse, this.svgText);


            if (option.width != undefined) this.width = option.width;
            if (option.height != undefined) this.height = option.height;
            if (option.cx != undefined) this.cx = option.cx;
            if (option.cy != undefined) this.cy = option.cy;

        }
        static constructAttributes(e: SVGElement, removeAttributes: boolean = false, output: TextBoxShapeAttributes = {}): CalloutAttributes {
            PPTextBoxShapeBase.constructAttributes(e, removeAttributes, output);


            return output;
        }
        /**
        テキストの領域を返します。
        */
        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
            rect.width = this.svgEllipse.rx.baseVal.value * 2;
            rect.height = this.svgEllipse.ry.baseVal.value * 2;
            rect.x = -this.svgEllipse.rx.baseVal.value;
            rect.y = -this.svgEllipse.ry.baseVal.value;
            return rect;
        }
        /**
        頂点の幅を返します。
        */
        get width(): number {
            return this.svgEllipse.rx.baseVal.value * 2;
        }
        set width(value: number) {
            const _rx = value/2;
            if (this.width != value) this.svgEllipse.setAttribute("rx", _rx.toString());

        }
        /**
        頂点の高さを返します。
        */
        get height(): number {
            return this.svgEllipse.ry.baseVal.value * 2;
        }
        set height(value: number) {
            const _ry = value/2;
            if (this.height != value) this.svgEllipse.setAttribute("ry", _ry.toString());
        }
    }
    /*
    export type EllipseAttributes = TextBoxShapeAttributes & {
        speakerX? : number,
        speakerY? : number,
    }
    */
}