﻿module GraphTableSVG {
    export class Vertex {
        private static id_counter: number = 0;
        svgGroup: SVGGElement;
        private _graph: Graph | null;
        private _observer: MutationObserver;
        private createObserveFunction(): MutationCallback {
            var th = this;
            var ret = function (x: MutationRecord[]) {
                for (var i = 0; i < x.length; i++) {
                    var p = x[i];
                    if (p.attributeName == "transform") {

                        if (th.graph != null) {
                            th.graph.update();
                        }
                    }
                }
            }
            return ret;
        };

        get graph(): Graph {
            return this._graph;
        }
        public setGraph(value: Graph) {
            if (value == null) {
                this._graph.svgGroup.removeChild(this.svgGroup);
            }
            this._graph = value;
            
        }


        private _id: number = Vertex.id_counter++;
        public get id(): number {
            return this._id;
        }

        constructor(group: SVGGElement) {
            this.svgGroup = group;

            
            this._observer = new MutationObserver(this.createObserveFunction());
            var option: MutationObserverInit = { attributes: true };
            this._observer.observe(this.svgGroup, option);
            /*
            this.parent = parent;

            this.parent.svgGroup.appendChild(this.svgGroup);
            */
        }

        public get x(): number {
            return this.svgGroup.getX();
        }
        public set x(value: number) {
            if (this.svgGroup.getX() != value) {
                this.svgGroup.setX(value);
            }
            /*
            if (this.graph != null) {
                this.graph.update();
            }
            */
        }

        public get y(): number {
            return this.svgGroup.getY();
        }
        public set y(value: number) {
            if (this.svgGroup.getY() != value) {
                this.svgGroup.setY(value);
            }
            /*
            if (this.graph != null) {
                this.graph.update();
            }
            */

        }

        get width(): number {
            return 0;
        }
        get height(): number {
            return 0;
        }


        public getLocation(type: ConnecterPosition): [number, number] {
            return [this.x, this.y];
        }

        public update(): boolean {
            return false;
        }

        get region(): Rectangle {
            var p = new Rectangle();
            p.x = this.x - (this.width / 2);
            p.y = this.y - (this.height / 2);
            p.width = this.width;
            p.height = this.height;
            return p;
        }

        public static getRegion(vertexes: Vertex[]): Rectangle {
            //var p = this.getSubtree();
            if (vertexes.length > 0) {
                var fstVertex = vertexes[0];
                var minX = fstVertex.x;
                var maxX = fstVertex.x;
                var minY = fstVertex.y;
                var maxY = fstVertex.y;
                vertexes.forEach(function (x, i, arr) {
                    var rect = x.region;
                    if (minX > rect.x) minX = rect.x;
                    if (maxX < rect.right) maxX = rect.right;
                    if (minY > rect.y) minY = rect.y;
                    if (maxY < rect.bottom) maxY = rect.bottom;
                });
                var result = new Rectangle();
                result.x = minX;
                result.y = minY;
                result.width = maxX - minX;
                result.height = maxY - minY;
                return result;
            } else {
                return new Rectangle();
            }
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
        get width(): number {
            return this.svgCircle.r.baseVal.value * 2;
        }
        get height(): number {
            return this.svgCircle.r.baseVal.value * 2;
        }
        public static create(_parent: Graph, x: number = 0, y: number = 0): CircleVertex {
            var circle = <SVGCircleElement>document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.style.stroke = "black";
            circle.style.strokeWidth = "5pt";
            circle.style.fill = "#ffffff";
            circle.cx.baseVal.value = 0;
            circle.cy.baseVal.value = 0;
            circle.r.baseVal.value = 20;

            var text = GraphTableSVG.createText();

            var group = GraphTableSVG.createGroup();

            var p = new CircleVertex(group, circle, text);
            p.x = x;
            p.y = y;
            _parent.addVertex(p);

            return p;
        }
        public get radius(): number {
            return this.svgCircle.r.baseVal.value;
        }
        public getLocation(type: ConnecterPosition): [number, number] {
            var r = (Math.sqrt(2) / 2) * this.radius;


            switch (type) {
                case ConnecterPosition.Top:
                    return [this.x, this.y - this.radius];
                case ConnecterPosition.RightUp:
                    return [this.x + r, this.y - r];
                case ConnecterPosition.Right:
                    return [this.x + this.radius, this.y];
                case ConnecterPosition.RightDown:
                    return [this.x + r, this.y + r];
                case ConnecterPosition.Bottom:
                    return [this.x, this.y + this.radius];
                case ConnecterPosition.LeftDown:
                    return [this.x - r, this.y + r];
                case ConnecterPosition.Left:
                    return [this.x - this.radius, this.y];
                case ConnecterPosition.LeftUp:
                    return [this.x - r, this.y - r];
                default:
                    return [this.x, this.y];
            }
        }

    }
}