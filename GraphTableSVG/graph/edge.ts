module GraphTableSVG {
    export class Edge {
        private _beginNode: Vertex;
        //_beginConnecterType: ConnectorPosition = ConnectorPosition.Top;
        private _endNode: Vertex;
        //_endConnecterType: ConnectorPosition = ConnectorPosition.Bottom;

        get beginConnectorType(): ConnectorPosition {
            var p = this.group.getAttribute("beginConnectorType");
            if (p == null) {
                return ConnectorPosition.Auto;
            } else {
                return GraphTableSVG.ToConnectorPosition(p);
            }
        }
        set beginConnectorType(value: ConnectorPosition) {
            this.group.setAttribute("beginConnectorType", GraphTableSVG.ToStrFromConnectorPosition(value));
        }
        get endConnectorType(): ConnectorPosition {
            var p = this.group.getAttribute("endConnectorType");
            if (p == null) {
                return ConnectorPosition.Auto;
            } else {
                return GraphTableSVG.ToConnectorPosition(p);
            }
        }
        set endConnectorType(value: ConnectorPosition) {
            this.group.setAttribute("endConnectorType", GraphTableSVG.ToStrFromConnectorPosition(value));
        }

        private _graph: Graph | null = null;
        public group: SVGGElement;
        text: EdgeText | null = null;

        get beginNode(): Vertex {
            return this._beginNode;
        }
        set beginNode(value: Vertex) {
            this._beginNode = value;
            this.group.setAttribute("beginNode", value.objectID);

            if (this.graph != null) {
                this.graph.update();
            }
        }
        get endNode(): Vertex {
            return this._endNode;
        }
        set endNode(value: Vertex) {
            this._endNode = value;
            this.group.setAttribute("endNode", value.objectID);

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
            this.group = createGroup(className);
            this.group.setAttribute("objectID", (Graph.id++).toString());

            var left = this.group.getActiveStyle().getPropertyValue("--default-begin-connector-position").trim();
            var right = this.group.getActiveStyle().getPropertyValue("--default-end-connector-position").trim();
            console.log(left + "/" + right);
            this.beginConnectorType = ToConnectorPosition(this.group.getActiveStyle().getPropertyValue("--default-begin-connector-position").trim());
            this.endConnectorType = ToConnectorPosition(this.group.getActiveStyle().getPropertyValue("--default-end-connector-position").trim());


            //this._parent = graph;
            /*
            this._beginNode = _beginNode;
            this._endNode = _endNode;
            */
        }

        public get x1(): number {
            var [x1, y1] = this._beginNode.getLocation(this.beginConnectorType);

            return x1;
        }
        public get y1(): number {
            var [x1, y1] = this._beginNode.getLocation(this.beginConnectorType);
            return y1;
        }
        public get x2(): number {
            var [x2, y2] = this._endNode.getLocation(this.endConnectorType);
            return x2;
        }
        public get y2(): number {
            var [x2, y2] = this._endNode.getLocation(this.endConnectorType);
            return y2;
        }


        public update(): boolean {
            return false;
        }

        public get objectID(): number | null {
            var r = this.group.getAttribute("objectID");
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
        private _svg: SVGLineElement;
        //svgText: SVGTextElement;

        get svg(): SVGLineElement {
            return this._svg;
        }
        public setGraph(value: Graph)
        {
            super.setGraph(value);
            if (this.graph != null) {
                this.graph.svgGroup.appendChild(this.group);
            }
        }


        constructor(className: string | null = null) {
            super(className);
            var p = this.group.getActiveStyle().getPropertyValue("--default-line-class").trim();
            this._svg = createLine(0, 0, 0, 0, p.length > 0 ? p : null);
            this.group.appendChild(this._svg);
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