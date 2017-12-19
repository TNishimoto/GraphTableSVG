module GraphTableSVG {
    export class Edge {
        private _beginVertex: Vertex;
        //_beginConnecterType: ConnectorPosition = ConnectorPosition.Top;
        private _endVertex: Vertex;
        //_endConnecterType: ConnectorPosition = ConnectorPosition.Bottom;

        get beginConnectorType(): ConnectorPosition {
            var p = this.svgGroup.getAttribute("beginConnectorType");
            if (p == null) {
                return ConnectorPosition.Auto;
            } else {
                return GraphTableSVG.ToConnectorPosition(p);
            }
        }
        set beginConnectorType(value: ConnectorPosition) {
            this.svgGroup.setAttribute("beginConnectorType", GraphTableSVG.ToStrFromConnectorPosition(value));
        }
        get endConnectorType(): ConnectorPosition {
            var p = this.svgGroup.getAttribute("endConnectorType");
            if (p == null) {
                return ConnectorPosition.Auto;
            } else {
                return GraphTableSVG.ToConnectorPosition(p);
            }
        }
        set endConnectorType(value: ConnectorPosition) {
            this.svgGroup.setAttribute("endConnectorType", GraphTableSVG.ToStrFromConnectorPosition(value));
        }

        private _graph: Graph | null = null;
        public svgGroup: SVGGElement;
        text: EdgeText | null = null;

        get beginVertex(): Vertex {
            return this._beginVertex;
        }
        set beginVertex(value: Vertex) {
            this._beginVertex = value;
            this.svgGroup.setAttribute("beginNode", value.objectID);

            if (this.graph != null) {
                this.graph.update();
            }
        }
        get endVertex(): Vertex {
            return this._endVertex;
        }
        set endVertex(value: Vertex) {
            this._endVertex = value;
            this.svgGroup.setAttribute("endNode", value.objectID);

            if (this.graph != null) {
                this.graph.update();
            }
        }

        get graph(): Graph | null {
            return this._graph;
        }
        public setGraph(value: Graph) {
            this._graph = value;
        }


        constructor(className: string | null = null) {
            this.svgGroup = createGroup(className);
            this.svgGroup.setAttribute("objectID", (Graph.id++).toString());
            this.svgGroup.setAttribute("type", "edge");


            var left = this.svgGroup.getActiveStyle().getPropertyValue("--default-begin-connector-position").trim();
            var right = this.svgGroup.getActiveStyle().getPropertyValue("--default-end-connector-position").trim();
            this.beginConnectorType = ToConnectorPosition(this.svgGroup.getActiveStyle().getPropertyValue("--default-begin-connector-position").trim());
            this.endConnectorType = ToConnectorPosition(this.svgGroup.getActiveStyle().getPropertyValue("--default-end-connector-position").trim());


            //this._parent = graph;
            /*
            this._beginNode = _beginNode;
            this._endNode = _endNode;
            */
        }

        public get x1(): number {
            var [x1, y1] = this._beginVertex.getLocation(this.beginConnectorType, this.endVertex.x, this.endVertex.y);
            return x1;
        }
        public get y1(): number {
            var [x1, y1] = this._beginVertex.getLocation(this.beginConnectorType, this.endVertex.x, this.endVertex.y);
            return y1;
        }
        public get x2(): number {
            var [x2, y2] = this._endVertex.getLocation(this.endConnectorType, this.beginVertex.x, this.beginVertex.y);
            return x2;
        }
        public get y2(): number {
            var [x2, y2] = this._endVertex.getLocation(this.endConnectorType, this.beginVertex.x, this.beginVertex.y);
            return y2;
        }


        public update(): boolean {
            return false;
        }

        public get objectID(): number | null {
            var r = this.svgGroup.getAttribute("objectID");
            if (r == null) {
                return null;
            } else {
                return Number(r);
            }
        }
        /*
        public set objectID(value: number | null) {
            if (value == null) {
                this.group.setAttribute("objectID", "");
            } else {
                this.group.setAttribute("objectID", value.toString());
            }
        }
        */
        public save() {
        }
    }

    export class LineEdge extends Edge {
        private _svgLine: SVGLineElement;
        //svgText: SVGTextElement;

        get svg(): SVGLineElement {
            return this._svgLine;
        }
        public setGraph(value: Graph)
        {
            super.setGraph(value);
            if (this.graph != null) {
                this.graph.svgGroup.appendChild(this.svgGroup);
            }
        }


        constructor(className: string | null = null) {
            super(className);
            var p = this.svgGroup.getActiveStyle().getPropertyValue("--default-line-class").trim();
            this._svgLine = createLine(0, 0, 0, 0, p.length > 0 ? p : null);
            this.svgGroup.appendChild(this._svgLine);
            //this.graph.svgGroup.appendChild(this._svg);

        }

        public static create(className: string | null = null): LineEdge {
            var line = new LineEdge(className);
            /*
            var line = new LineEdge(_begin, _end, svg);
            line.beginConnecterType = _beginConnectType;
            line.endConnecterType = _endConnectType;
            _parent.addEdge(line);
            */

            /*
            p.svgText = GraphTableSVG.createText();
            p.svgText.textContent = "hogehoge";
            p.parent.svgGroup.appendChild(p.svgText);
            */

            return line;
        }
        public update(): boolean {
            this._svgLine.x1.baseVal.value = this.x1;
            this._svgLine.y1.baseVal.value = this.y1;

            this._svgLine.x2.baseVal.value = this.x2;
            this._svgLine.y2.baseVal.value = this.y2;

            if (this.text != null) {
                this.text.update();
            }

            

            return false;
        }
        
    }
    
}