module GraphTableSVG {
    export enum ConnecterPositionType {
        Top = 1,
        LeftUp = 2,
        Left = 3,
        LeftDown = 4,
        Bottom = 5,
        RightDown = 6,
        Right = 7,
        RightUp = 8
    }
    export class Graph {
        nodes: Node[] = new Array(0);
        edges: Edge[] = new Array(0);
        svgGroup: SVGGElement = null;

        relocation(): void {
            this.edges.forEach(function (x, i, arr) { x.relocation() });
        }
        resize() : void {

        }
        update(): void {
            this.resize();
            this.relocation();
        }

        public static create(svg: HTMLElement): Graph {
            var g = GraphTableSVG.createGroup();
            var graph = new Graph();
            graph.svgGroup = g;
            svg.appendChild(graph.svgGroup);
            return graph;
        }
    }



    export class Node {
        svgGroup: SVGGElement;
        parent: Graph;
        
        public get x(): number {
            return this.svgGroup.getX();
        }
        public get y(): number {
            return this.svgGroup.getY();
        }

        public getLocation(type: ConnecterPositionType): [number, number] {
            return [this.x, this.y];
        }
    }
    export class CircleNode extends Node {
        svgCircle: SVGCircleElement;
        svgText: SVGTextElement;

        public static create(_parent: Graph): CircleNode {
            var p = new CircleNode();
            p.svgCircle = <SVGCircleElement>document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            p.svgCircle.style.stroke = "black";
            p.svgCircle.style.strokeWidth = "5pt";
            p.svgCircle.cx.baseVal.value = 0;
            p.svgCircle.cy.baseVal.value = 0;
            p.svgCircle.r.baseVal.value = 30;

            p.svgText = GraphTableSVG.createText();
            p.svgText.textContent = "hogehoge";

            p.svgGroup = GraphTableSVG.createGroup();
            p.svgGroup.appendChild(p.svgCircle);
            p.svgGroup.appendChild(p.svgText);
            p.parent = _parent;
            p.parent.svgGroup.appendChild(p.svgGroup);
            return p;
        }
        public get radius(): number{
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



    export class Edge {
        beginNode: Node;
        beginConnectType: ConnecterPositionType;
        endNode: Node;
        endConnectType: ConnecterPositionType;
        parent: Graph;

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


        public relocation() {
        }
    }
    export class LineEdge extends Edge {
        svgLine: SVGLineElement;
        svgText: SVGTextElement;
        public static create(_parent: Graph, _begin: Node, _end: Node): LineEdge {
            var p = new LineEdge();
            p.beginNode = _begin;
            p.endNode = _end;
            p.svgLine = createLine(0, 0, 100, 100);
            p.parent = _parent;
            p.parent.svgGroup.appendChild(p.svgLine);

            p.svgText = GraphTableSVG.createText();
            p.svgText.textContent = "hogehoge";
            p.parent.svgGroup.appendChild(p.svgText);

            return p;
        }
        public relocation() {
            this.svgLine.x1.baseVal.value = this.x1;
            this.svgLine.y1.baseVal.value = this.y1;

            this.svgLine.x2.baseVal.value = this.x2;
            this.svgLine.y2.baseVal.value = this.y2;

            this.svgText.setX((this.x1 + this.x2) / 2);
            this.svgText.setY((this.y1 + this.y2) / 2);

            var rad = Math.atan2(this.y2 - this.y1, this.x2 - this.x1);
            var rar = rad * (180 / Math.PI);

            this.svgText.setAttribute('transform', `rotate(${rar}, ${this.svgText.getX()}, ${this.svgText.getY()})`);

            /*
            this.svgText.setAttribute('x', "0");
            this.svgText.setAttribute('y', "0");
            console.log(this.svgText.x.baseVal.numberOfItems);
            console.log(this.svgText.x.baseVal.getItem(0));
            */
        }

    }
}