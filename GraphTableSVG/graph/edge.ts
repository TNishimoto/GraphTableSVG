module GraphTableSVG {
    export class Edge {
        private _beginNode: Vertex;
        beginConnectType: ConnecterPositionType = ConnecterPositionType.Top;
        private _endNode: Vertex;
        endConnectType: ConnecterPositionType = ConnecterPositionType.Top;
        //private _parent: Graph;
        text: EdgeText | null = null;

        get beginNode(): Vertex {
            return this._beginNode;
        }
        set beginNode(value: Vertex) {
            this._beginNode = value;
        }
        get endNode(): Vertex {
            return this._endNode;
        }
        set endNode(value: Vertex) {
            this._endNode = value;
        }
        /*
        get graph(): Graph {
            return this._parent;
        }
        */


        constructor(_beginNode: Vertex, _endNode: Vertex) {
            //this._parent = graph;
            this._beginNode = _beginNode;
            this._endNode = _endNode;
        }

        public get x1(): number {
            var [x1, y1] = this._beginNode.getLocation(this.beginConnectType);

            return x1;
        }
        public get y1(): number {
            var [x1, y1] = this._beginNode.getLocation(this.beginConnectType);
            return y1;
        }
        public get x2(): number {
            var [x2, y2] = this._endNode.getLocation(this.endConnectType);
            return x2;
        }
        public get y2(): number {
            var [x2, y2] = this._endNode.getLocation(this.endConnectType);
            return y2;
        }


        public update(): boolean {
            return false;
        }
    }

    export class LineEdge extends Edge {
        private _svg: SVGLineElement;
        //svgText: SVGTextElement;

        get svg(): SVGLineElement {
            return this._svg;
        }


        constructor(_begin: Vertex, _end: Vertex, line: SVGLineElement) {
            super(_begin, _end);
            this._svg = line;
            //this.graph.svgGroup.appendChild(this._svg);

        }

        public static create(_parent: Graph,_begin: Vertex, _end: Vertex): LineEdge {
            var svg = createLine(0, 0, 100, 100);
            var line = new LineEdge(_begin, _end, svg);
            _parent.addEdge(line);

            /*
            p.svgText = GraphTableSVG.createText();
            p.svgText.textContent = "hogehoge";
            p.parent.svgGroup.appendChild(p.svgText);
            */

            return line;
        }
        public update(): boolean {
            this._svg.x1.baseVal.value = this.x1;
            this._svg.y1.baseVal.value = this.y1;

            this._svg.x2.baseVal.value = this.x2;
            this._svg.y2.baseVal.value = this.y2;

            if (this.text != null) {
                this.text.update();
            }

            

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