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
            var x = (this.edge.x1 + this.edge.x2) / 2;
            var y = (this.edge.y1 + this.edge.y2) / 2;
            return [x, y];
        }

        /*
        public static create(graph: Graph, edge: Edge, text: string): EdgeText {
            var p = new EdgeText();
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
            var [x, y] = this.getCenterPosition();
            this.svgText.setX(x);
            this.svgText.setY(y);

            var [x1, y1] = [this.edge.x1, this.edge.y1];
            var [x2, y2] = [this.edge.x2, this.edge.y2];
            
            var rad = Math.atan2(y2 - y1, x2 - x1);
            var rar = rad * (180 / Math.PI);
            
            if (rar > 90) {
                rar = rar - 180;
                if (this.svgText.textContent != null) {
                    this.svgText.textContent = EdgeText.reverse(this.svgText.textContent);
                }
            }
            this.svgText.setAttribute('transform', `rotate(${rar}, ${this.svgText.getX()}, ${this.svgText.getY()})`);
            
        }
        
        private static reverse(str: string): string {
            var rv: string[] = [];
            for (var i = 0, n = str.length; i < n; i++) {
                rv[i] = str.charAt(n - i - 1);
            }
            return rv.join("");
        }
    }
}