namespace GraphTableSVG {
    export class PPPathTextBox extends PPVertexBase {
        private _svgPath: SVGPathElement;
        public get svgPath(): SVGPathElement {
            return this._svgPath;
        }
        public constructor(svgbox: SVGSVGElement, option: TextBoxShapeAttributes = {}) {
            super(svgbox, option);            


            //this.update();
        }
        protected createSurface(svgbox : SVGElement, option : TextBoxShapeAttributes = {}) : void {
            this._svgPath = GraphTableSVG.SVG.createPath(this.svgGroup, 0, 0, 0, 0, this.svgGroup.getPropertyStyleValue(SVG.defaulSurfaceClass));
            this.svgGroup.insertBefore(this.svgPath, this.svgText);
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
                rect.width = this.width - this.marginPaddingLeft;
                rect.height = this.height - this.marginPaddingTop;
                rect.x = (-this.width / 2) + this.marginPaddingLeft;
                rect.y = (-this.height / 2) + this.marginPaddingTop;
            }
            return rect;
        }
        protected get shape(): string {
            return "NONE";
        }
        public get surface() : SVGElement {
            return this.svgPath;
        }
        private getVBAEditLine(id: number): string {
            const lineColor = VBATranslateFunctions.colorToVBA(this.svgPath.getPropertyStyleValueWithDefault("stroke", "gray"));
            const lineType = GraphTableSVG.msoDashStyle.getLineType(this.svgPath);
            const strokeWidth = parseInt(this.svgPath.getPropertyStyleValueWithDefault("stroke-width", "4"));
            const visible = this.svgPath.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
            return ` Call EditLine(obj${id}.Line, ${lineColor}, ${lineType}, ${0}, ${strokeWidth}, ${visible})`;
        }
        /**
         * 
         * @param id 
         */
        public createVBACode(id: number): string[] {
            const lines: string[] = [];
            const backColor = VBATranslateFunctions.colorToVBA(this.svgPath.getPropertyStyleValueWithDefault("fill", "gray"));
            const visible = this.svgPath.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";

            const vAnchor = VBATranslateFunctions.ToVerticalAnchor(this.verticalAnchor);
            const hAnchor = VBATranslateFunctions.ToHorizontalAnchor(this.horizontalAnchor);



            lines.push(`Sub create${id}(createdSlide As slide)`);
            lines.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
            lines.push(` Dim obj${id} As Shape`);
            lines.push(` Set obj${id} = shapes_.AddShape(${this.shape}, ${this.x}, ${this.y}, ${this.width}, ${this.height})`);
            lines.push(` Call EditTextFrame(obj${id}.TextFrame, ${this.marginPaddingTop}, ${this.marginPaddingBottom}, ${this.marginPaddingLeft}, ${this.marginPaddingRight}, false, ppAutoSizeNone)`);
            lines.push(` Call EditAnchor(obj${id}.TextFrame, ${vAnchor}, ${hAnchor})`);

            VBATranslateFunctions.TranslateSVGTextElement2(this.svgText, `obj${id}.TextFrame.TextRange`).forEach((v) => lines.push(v));
            //const adjustments = this.VBAAdjustments;
            lines.push(this.getVBAEditLine(id));

            lines.push(` Call EditCallOut(obj${id}, "${id}", ${visible}, ${backColor})`)
            this.VBAAdjustments.forEach((v, i) => {
                lines.push(` obj${id}.Adjustments.Item(${i + 1}) = ${v}`);
            })
            lines.push(`End Sub`);
            //sub.push([` Call EditTextEffect(nodes(${i}).TextEffect, ${fontSize}, "${fontFamily}")`]);
            return lines;
        }
        /**
         * VBAコードでのこの図形を表すShape図形のVBAAdjustmentsプロパティを表します。
         */
        protected get VBAAdjustments(): number[] {
            return [];
        }
        public get type(): string {
            return "PPPathTextBox";
        }

    }
}