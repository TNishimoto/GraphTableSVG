module GraphTableSVG {
    export class EdgeText {
        svg: SVGTextElement;
        parentEdge: Edge;

        //private isReverse: boolean = false;

        get x(): number {
            return this.svg.getX();
        }

        get y(): number {
            return this.svg.getY();
        }
        private getCenterPosition(): [number, number] {
            var x = (this.parentEdge.x1 + this.parentEdge.x2) / 2;
            var y = (this.parentEdge.y1 + this.parentEdge.y2) / 2;
            return [x, y];
        }

        public static create(graph: Graph, edge: Edge, text: string): EdgeText {
            var p = new EdgeText();
            p.svg = createText();
            p.svg.textContent = text;
            graph.svgGroup.appendChild(p.svg);
            p.parentEdge = edge;
            edge.text = p;
            return p;
        }

        public update() {
            var [x, y] = this.getCenterPosition();
            this.svg.setX(x);
            this.svg.setY(y);

            var [x1, y1] = [this.parentEdge.x1, this.parentEdge.y1];
            var [x2, y2] = [this.parentEdge.x2, this.parentEdge.y2];
            
            var rad = Math.atan2(y2 - y1, x2 - x1);
            var rar = rad * (180 / Math.PI);
            
            if (rar > 90) {
                rar = rar - 180;
                this.svg.textContent = EdgeText.reverse(this.svg.textContent);
            }
            this.svg.setAttribute('transform', `rotate(${rar}, ${this.svg.getX()}, ${this.svg.getY()})`);
            
        }

        public static reverse(str: string): string {
            var rv: string[] = [];
            for (var i = 0, n = str.length; i < n; i++) {
                rv[i] = str.charAt(n - i - 1);
            }
            return rv.join("");
        }
    }
}