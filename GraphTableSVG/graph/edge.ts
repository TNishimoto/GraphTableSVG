module GraphTableSVG {
    export class Edge {
        //public static defaultBeginConnectorPosition: string = "--default-begin-connector-position";
        //public static defaultEndConnectorPosition: string = "--default-end-connector-position";
        public static beginConnectorTypeName: string = "--begin-connector-type";
        public static endConnectorTypeName: string = "--end-connector-type";
        public static defaultLineClass: string = "--default-line-class";
        public static beginNodeName: string = "data-begin-node";
        public static endNodeName: string = "data-end-node";
        public static defaultTextClass: string = "--default-text-class";

        private _beginVertex: Vertex;
        private _endVertex: Vertex;

        get beginConnectorType(): ConnectorPosition {
            var p = this.svgGroup.getPropertyStyleValue(Edge.beginConnectorTypeName);
            if (p == null) {
                return ConnectorPosition.Auto;
            } else {
                return GraphTableSVG.ToConnectorPosition(p);
            }
        }
        set beginConnectorType(value: ConnectorPosition) {
            this.svgGroup.setPropertyStyleValue(Edge.beginConnectorTypeName, GraphTableSVG.ToStrFromConnectorPosition(value))
            //this.svgGroup.setAttribute(Edge.beginConnectorTypeName, GraphTableSVG.ToStrFromConnectorPosition(value));
        }
        get endConnectorType(): ConnectorPosition {
            var p = this.svgGroup.getPropertyStyleValue(Edge.endConnectorTypeName);
            if (p == null) {
                return ConnectorPosition.Auto;
            } else {
                return GraphTableSVG.ToConnectorPosition(p);
            }
        }
        set endConnectorType(value: ConnectorPosition) {
            this.svgGroup.setPropertyStyleValue(Edge.endConnectorTypeName, GraphTableSVG.ToStrFromConnectorPosition(value))
        }

        private _graph: Graph | null = null;
        public svgGroup: SVGGElement;
        text: EdgeText | null = null;

        get beginVertex(): Vertex {
            return this._beginVertex;
        }
        set beginVertex(value: Vertex) {
            this._beginVertex = value;
            this.svgGroup.setAttribute(Edge.beginNodeName, value.objectID);

            this.update();

            /*
            if (this.graph != null) {
                this.graph.update();
            }
            */
        }
        get endVertex(): Vertex {
            return this._endVertex;
        }
        set endVertex(value: Vertex) {
            this._endVertex = value;
            this.svgGroup.setAttribute(Edge.endNodeName, value.objectID);

            this.update();

        }

        get graph(): Graph | null {
            return this._graph;
        }
        public setGraph(value: Graph) {
            this._graph = value;
        }


        constructor(className: string | null = null) {
            this.svgGroup = createGroup(className);
            this.svgGroup.setAttribute(Graph.objectIDName, (Graph.id++).toString());
            this.svgGroup.setAttribute(Graph.typeName, "edge");

            var t1 = this.svgGroup.getPropertyStyleValue(Edge.beginConnectorTypeName);
            var t2 = this.svgGroup.getPropertyStyleValue(Edge.endConnectorTypeName);

            this.beginConnectorType = ToConnectorPosition(t1);
            this.endConnectorType = ToConnectorPosition(t2);


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
            var r = this.svgGroup.getAttribute(Graph.objectIDName);
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

        public static create(graph: Graph, className: string | null = null, lineType: string | null = null): GraphTableSVG.Edge {
            var g = createGroup(className);
            var textClass = g.getActiveStyle().getPropertyValue(Edge.defaultTextClass).trim();
            var line = new LineEdge(className);
            return line;
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
            var p = this.svgGroup.getActiveStyle().getPropertyValue(Edge.defaultLineClass).trim();
            this._svgLine = createLine(0, 0, 0, 0, p.length > 0 ? p : null);
            this.svgGroup.appendChild(this._svgLine);
            //this.graph.svgGroup.appendChild(this._svg);

        }
        /*
        public static create(className: string | null = null): LineEdge {
            var line = new LineEdge(className);
            
            return line;
        }
        */

        public update(): boolean {
            if (this.beginVertex != undefined && this.endVertex != undefined) {
                this._svgLine.x1.baseVal.value = this.x1;
                this._svgLine.y1.baseVal.value = this.y1;

                this._svgLine.x2.baseVal.value = this.x2;
                this._svgLine.y2.baseVal.value = this.y2;

                if (this.text != null) {
                    this.text.update();
                }
            }

            

            return false;
        }
        
    }
    
}