namespace GraphTableSVG {
    export class EdgeText {

        private _svgText: SVGTextElement;
        /**
        テキスト要素を返します。
        */
        public get svgText(): SVGTextElement {
            return this._svgText;
        }
        private _edge: Edge;
        /**
        所属している辺を返します。
        */
        public get edge(): Edge {
            return this._edge;
        }
        constructor(graph: Graph, edge: Edge, text: string) {
            this._svgText = createText();
            this.svgText.textContent = text;
            edge.svgGroup.appendChild(this.svgText);
            this._edge = edge;
            edge.text = this;
        }

        //private isReverse: boolean = false;
        /**
        テキストのX座標を返します。
        */
        get x(): number {
            return this.svgText.getX();
        }
        /**
        テキストのY座標を返します。
        */
        get y(): number {
            return this.svgText.getY();
        }
        private getCenterPosition(): [number, number] {
            let x = (this.edge.x1 + this.edge.x2) / 2;
            let y = (this.edge.y1 + this.edge.y2) / 2;
            return [x, y];
        }

        /*
        public static create(graph: Graph, edge: Edge, text: string): EdgeText {
            let p = new EdgeText();
            p._svgText = createText();
            p.svgText.textContent = text;
            edge.svgGroup.appendChild(p.svgText);
            p.parentEdge = edge;
            edge.text = p;
            return p;
        }
        */

        /**
         * 再描画します。
         */
        public update() {
            const [x, y] = this.getCenterPosition();
            this.svgText.setX(x);
            this.svgText.setY(y);

            const [x1, y1] = [this.edge.x1, this.edge.y1];
            const [x2, y2] = [this.edge.x2, this.edge.y2];
            
            const rad = Math.atan2(y2 - y1, x2 - x1);
            let rar = rad * (180 / Math.PI);
            
            if (rar > 90) {
                rar = rar - 180;
                if (this.svgText.textContent != null) {
                    this.svgText.textContent = EdgeText.reverse(this.svgText.textContent);
                }
            }
            this.svgText.setAttribute('transform', `rotate(${rar}, ${this.svgText.getX()}, ${this.svgText.getY()})`);
            
        }
        public get fontSize(): number {
            return parseInt(this.svgText.getPropertyStyleValueWithDefault("font-size", "12"));
        }
        
        private static reverse(str: string): string {
            const rv: string[] = [];
            for (let i = 0, n = str.length; i < n; i++) {
                rv[i] = str.charAt(n - i - 1);
            }
            return rv.join("");
        }
        public createVBACode(shapes : string, result : string[][]) : void {
            const s : string[] = new Array(0);
            if (this.edge.graph != null) {
                const region = this.svgText.getBBox();
                
                
                const fontFamily = VBATranslateFunctions.ToVBAFont(this.svgText.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
                const fontBold = VBATranslateFunctions.ToFontBold(this.svgText.getPropertyStyleValueWithDefault("font-weight", "none"));
                const left = this.edge.graph.svgGroup.getX() + this.svgText.getX();
                let top = this.edge.graph.svgGroup.getY() + this.svgText.getY() - (this.fontSize/2);
                s.push(`With ${shapes}.AddTextBox(msoTextOrientationHorizontal, ${left}, ${top},${region.width},${this.fontSize})`);
                s.push(`.TextFrame.TextRange.Text = "${this.svgText.textContent}"`);
                s.push(`.TextFrame.marginLeft = 0`);
                s.push(`.TextFrame.marginRight = 0`);
                s.push(`.TextFrame.marginTop = 0`);
                s.push(`.TextFrame.marginBottom = 0`);
                s.push(`.TextFrame.TextRange.Font.Size = ${this.fontSize}`);
                s.push(`.TextFrame.TextRange.Font.name = "${fontFamily}"`);
                s.push(`.TextFrame.TextRange.Font.Bold = ${fontBold}`);
                s.push(`.IncrementRotation(${this.svgText.transform.baseVal.getItem(0).angle})`);
                s.push(`End With`);

            }
            result.push(s);
        }
    }
}