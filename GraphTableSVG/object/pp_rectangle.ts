namespace GraphTableSVG {
    export class PPRectangle extends PPVertexBase  {
        private _svgRectangle: SVGRectElement;
        public get svgRectangle(): SVGRectElement {
            return this._svgRectangle;
        }
        public get surface() : SVGElement {
            return this.svgRectangle;
        }

        public constructor(svgbox: SVGElement, option: TextBoxShapeAttributes = {}) {
            super(svgbox, option);
            this.updateAttributes.push("width");
            this.updateAttributes.push("height");

            this.update();
        }
        protected createSurface(svgbox : SVGElement, option : TextBoxShapeAttributes = {}) : void {
            this._svgRectangle = SVG.createRectangle(this.svgGroup, this.svgGroup.getPropertyStyleValue(SVG.defaulSurfaceClass));
            this.svgGroup.insertBefore(this.svgRectangle, this.svgText);
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
            rect.width = this.width;
            rect.height = this.height;
            rect.x = -this.width/2;
            rect.y = -this.height/2;
            return rect;
        }
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

        protected updateSurface(){
            this.svgRectangle.x.baseVal.value = -this.width/2;
            this.svgRectangle.y.baseVal.value = -this.height/2;

        }


    }
}