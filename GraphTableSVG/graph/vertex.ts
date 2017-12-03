module GraphTableSVG {
    export class Vertex {
        private static id_counter: number = 0;
        svgGroup: SVGGElement;
        //parent: Graph;
        private _id: number = Vertex.id_counter++;
        public get id(): number {
            return this._id;
        }

        constructor(group: SVGGElement) {
            this.svgGroup = group;
            /*
            this.parent = parent;

            this.parent.svgGroup.appendChild(this.svgGroup);
            */
        }

        public get x(): number {
            return this.svgGroup.getX();
        }
        public set x(value: number) {
            this.svgGroup.setX(value);
        }

        public get y(): number {
            return this.svgGroup.getY();
        }
        public set y(value: number) {
            this.svgGroup.setY(value);
        }

        public getLocation(type: ConnecterPositionType): [number, number] {
            return [this.x, this.y];
        }

        public update(): boolean {
            return false;
        }
    }
    export class CircleVertex extends Vertex {
        svgCircle: SVGCircleElement;
        svgText: SVGTextElement;

        constructor(group: SVGGElement, circle: SVGCircleElement, text: SVGTextElement) {
            super(group);
            this.svgCircle = circle;
            this.svgText = text;

            this.svgGroup.appendChild(this.svgCircle);
            this.svgGroup.appendChild(this.svgText);

        }

        public static create(_parent: Graph): CircleVertex {
            var circle = <SVGCircleElement>document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.style.stroke = "black";
            circle.style.strokeWidth = "5pt";
            circle.cx.baseVal.value = 0;
            circle.cy.baseVal.value = 0;
            circle.r.baseVal.value = 20;

            var text = GraphTableSVG.createText();
            text.textContent = "hogehoge";

            var group = GraphTableSVG.createGroup();

            var p = new CircleVertex(group, circle, text);

            _parent.addVertex(p);

            return p;
        }
        public get radius(): number {
            return this.svgCircle.r.baseVal.value;
        }
        public getLocation(type: ConnecterPositionType): [number, number] {
            var r = (Math.sqrt(2) / 2) * this.radius;


            switch (type) {
                case ConnecterPositionType.Top:
                    return [this.x, this.y - this.radius];
                case ConnecterPositionType.RightUp:
                    return [this.x + r, this.y - r];
                case ConnecterPositionType.Right:
                    return [this.x + this.radius, this.y];
                case ConnecterPositionType.RightDown:
                    return [this.x + r, this.y + r];
                case ConnecterPositionType.Bottom:
                    return [this.x, this.y + this.radius];
                case ConnecterPositionType.LeftDown:
                    return [this.x - r, this.y + r];
                case ConnecterPositionType.Left:
                    return [this.x - this.radius, this.y];
                case ConnecterPositionType.LeftUp:
                    return [this.x - r, this.y - r];
                default:
                    return [this.x, this.y];
            }
        }

    }
}