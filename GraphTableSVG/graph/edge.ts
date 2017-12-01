module GraphTableSVG {
    export class Edge {
        beginNode: Vertex;
        beginConnectType: ConnecterPositionType = ConnecterPositionType.Top;
        endNode: Vertex;
        endConnectType: ConnecterPositionType = ConnecterPositionType.Top;
        parent: Graph;
        text: EdgeText | null = null;

        public get x1(): number {
            var [x1, y1] = this.beginNode.getLocation(this.beginConnectType);

            return x1;
        }
        public get y1(): number {
            var [x1, y1] = this.beginNode.getLocation(this.beginConnectType);
            return y1;
        }
        public get x2(): number {
            var [x2, y2] = this.endNode.getLocation(this.endConnectType);
            return x2;
        }
        public get y2(): number {
            var [x2, y2] = this.endNode.getLocation(this.endConnectType);
            return y2;
        }


        public update(): boolean {
            return false;
        }
    }

    export class LineEdge extends Edge {
        svg: SVGLineElement;
        //svgText: SVGTextElement;
        public static create(_parent: Graph, _begin: Vertex, _end: Vertex): LineEdge {
            var p = new LineEdge();
            p.beginNode = _begin;
            p.endNode = _end;
            p.svg = createLine(0, 0, 100, 100);
            p.parent = _parent;
            p.parent.svgGroup.appendChild(p.svg);

            /*
            p.svgText = GraphTableSVG.createText();
            p.svgText.textContent = "hogehoge";
            p.parent.svgGroup.appendChild(p.svgText);
            */

            return p;
        }
        public update(): boolean {
            this.svg.x1.baseVal.value = this.x1;
            this.svg.y1.baseVal.value = this.y1;

            this.svg.x2.baseVal.value = this.x2;
            this.svg.y2.baseVal.value = this.y2;

            if (this.text != null) {
                this.text.update();
            }

            /*
            this.svgText.setX((this.x1 + this.x2) / 2);
            this.svgText.setY((this.y1 + this.y2) / 2);
            var rad = Math.atan2(this.y2 - this.y1, this.x2 - this.x1);
            var rar = rad * (180 / Math.PI);
            this.svgText.setAttribute('transform', `rotate(${rar}, ${this.svgText.getX()}, ${this.svgText.getY()})`);
            */

            return false;
            /*
            this.svgText.setAttribute('x', "0");
            this.svgText.setAttribute('y', "0");
            console.log(this.svgText.x.baseVal.numberOfItems);
            console.log(this.svgText.x.baseVal.getItem(0));
            */
        }

    }
    
}