module GraphTableSVG {
    export class EdgeText {
        svg: SVGTextElement;
        parentEdge: Edge;

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

        public static create(edge: Edge, text: string): EdgeText {
            var p = new EdgeText();
            p.svg = createText();
            p.svg.textContent = text;
            edge.parent.svgGroup.appendChild(p.svg);
            p.parentEdge = edge;
            return p;
        }

        public update() {
            var [x, y] = this.getCenterPosition();
            this.svg.setX(x);
            this.svg.setY(y);
        }
    }
}