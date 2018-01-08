namespace GraphTableSVG {
    export class Edge {
        //public static defaultBeginConnectorPosition: string = "--default-begin-connector-position";
        //public static defaultEndConnectorPosition: string = "--default-end-connector-position";
        public static readonly beginConnectorTypeName: string = "--begin-connector-type";
        public static readonly endConnectorTypeName: string = "--end-connector-type";
        public static readonly defaultLineClass: string = "--default-line-class";
        public static readonly beginNodeName: string = "data-begin-node";
        public static readonly endNodeName: string = "data-end-node";
        public static readonly defaultTextClass: string = "--default-text-class";

        private _beginVertex: Vertex | null = null;
        private _endVertex: Vertex | null = null;
        private _graph: Graph | null = null;
        private _svgGroup: SVGGElement;
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        protected _text: EdgeText | null = null;
        public get text(): EdgeText | null {
            return this._text;
        }
        public set text(value: EdgeText | null) {
            this._text = value;
        }
        constructor(__graph: Graph, className: string | null = null) {
            this._svgGroup = createGroup(className);
            this.svgGroup.setAttribute(Graph.objectIDName, (Graph.idCounter++).toString());
            this.svgGroup.setAttribute(Graph.typeName, "edge");

            const t1 = this.svgGroup.getPropertyStyleValue(Edge.beginConnectorTypeName);
            const t2 = this.svgGroup.getPropertyStyleValue(Edge.endConnectorTypeName);

            this.beginConnectorType = ToConnectorPosition(t1);
            this.endConnectorType = ToConnectorPosition(t2);

            this._graph = __graph;
            this._graph.add(this);

            //this._parent = graph;
            /*
            this._beginNode = _beginNode;
            this._endNode = _endNode;
            */
        }
        /**
        開始接点の接続位置を返します。
        */
        get beginConnectorType(): ConnectorPosition {
            const p = this.svgGroup.getPropertyStyleValue(Edge.beginConnectorTypeName);
            if (p == null) {
                return ConnectorPosition.Auto;
            } else {
                return GraphTableSVG.ToConnectorPosition(p);
            }
        }
        /**
        開始接点の接続位置を設定します。
        */
        set beginConnectorType(value: ConnectorPosition) {
            this.svgGroup.setPropertyStyleValue(Edge.beginConnectorTypeName, GraphTableSVG.ToStrFromConnectorPosition(value))
            //this.svgGroup.setAttribute(Edge.beginConnectorTypeName, GraphTableSVG.ToStrFromConnectorPosition(value));
        }
        /**
        終了接点の接続位置を返します。
        */
        get endConnectorType(): ConnectorPosition {
            const p = this.svgGroup.getPropertyStyleValue(Edge.endConnectorTypeName);
            if (p == null) {
                return ConnectorPosition.Auto;
            } else {
                return GraphTableSVG.ToConnectorPosition(p);
            }
        }
        /**
        終了接点の接続位置を設定します。
        */
        set endConnectorType(value: ConnectorPosition) {
            this.svgGroup.setPropertyStyleValue(Edge.endConnectorTypeName, GraphTableSVG.ToStrFromConnectorPosition(value))
        }

        /**
        開始接点を返します。
        */
        get beginVertex(): Vertex | null {
            return this._beginVertex;
        }
        /**
        開始接点を設定します。
        */
        set beginVertex(value: Vertex | null) {
            const prev = this._beginVertex;
            this._beginVertex = value;
            if (value != null) {
                this.svgGroup.setAttribute(Edge.beginNodeName, value.objectID);
            } else {
                this.svgGroup.removeAttribute(Edge.beginNodeName);
            }

            if (prev != null) {
                prev.removeOutcomingEdge(this);
            }

            this.update();
            
        }
        /**
        終了接点を返します。
        */
        get endVertex(): Vertex | null {
            return this._endVertex;
        }
        /**
        終了接点を設定します。
        */
        set endVertex(value: Vertex | null) {
            const prev = this._endVertex;

            this._endVertex = value;
            if (value != null) {
                this.svgGroup.setAttribute(Edge.endNodeName, value.objectID);
            } else {
                this.svgGroup.removeAttribute(Edge.endNodeName);
            }

            if (prev != null) {
                prev.removeIncomingEdge(this);
            }

            this.update();

        }
        /**
        所属しているグラフを返します。
        */
        get graph(): Graph | null {
            return this._graph;
        }
        /**
         * この辺を廃棄します。廃棄した辺はグラフから取り除かれます。
         */
        public dispose() {
            this.beginVertex = null;
            this.endVertex = null;
            const prev = this.graph;
            this._graph = null;

            if (prev != null) {
                prev.remove(this);
            }
        }
        /**
        この辺が廃棄されているときTrueを返します。
        */
        get isDisposed(): boolean {
            return this.graph == null;
        }

        
        /**
        開始位置のX座標を返します。
        */
        public get x1(): number {
            if (this.beginVertex != null && this.endVertex != null) {
                const [x1, y1] = this.beginVertex.getLocation(this.beginConnectorType, this.endVertex.x, this.endVertex.y);
                return x1;
            } else {
                return 0;
            }
        }
        /**
        開始位置のY座標を返します。
        */
        public get y1(): number {
            if (this.beginVertex != null && this.endVertex != null) {
                const [x1, y1] = this.beginVertex.getLocation(this.beginConnectorType, this.endVertex.x, this.endVertex.y);
                return y1;
            } else {
                return 0;
            }
        }
        /**
        終了位置のX座標を返します。
        */
        public get x2(): number {
            if (this.beginVertex != null && this.endVertex != null) {
                const [x2, y2] = this.endVertex.getLocation(this.endConnectorType, this.beginVertex.x, this.beginVertex.y);
                return x2;
            } else {
                return 0;
            }
        }
        /**
        終了位置のY座標を返します。
        */
        public get y2(): number {
            if (this.beginVertex != null && this.endVertex != null) {
                const [x2, y2] = this.endVertex.getLocation(this.endConnectorType, this.beginVertex.x, this.beginVertex.y);
                return y2;
            } else {
                return 0;
            }
        }

        /**
         * 再描画します。
         */
        public update(): boolean {
            return false;
        }
        /**
        ObjectIDを返します。
        */
        public get objectID(): string {
            const r = this.svgGroup.getAttribute(Graph.objectIDName);
            if (r == null) {
                throw new Error();
            } else {
                return r;
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
        /**
         * Edgeを作成します。
         * @param graph
         * @param className
         * @param lineType
         */
        public static create(graph: Graph, className: string | null = graph.defaultEdgeClass, lineType: string | null = null): GraphTableSVG.Edge {
            //var g = createGroup(className);
            //var textClass = g.getActiveStyle().getPropertyValue(Edge.defaultTextClass).trim();
            
            const line = new LineEdge(graph, className);
            return line;
        }
        public createVBACode(main: string[], sub: string[][], indexDic: { [key: string]: number; }): void {
            if (this.graph != null) {
                const subline  : string[]= [];
                const i = indexDic[this.objectID];
                subline.push(` Set edges(${i}) = shapes_.AddConnector(msoConnectorStraight, 0, 0, 0, 0)`);
                if (this.beginVertex != null && this.endVertex != null) {
                    const beg = indexDic[this.beginVertex.objectID];
                    const end = indexDic[this.endVertex.objectID];
                    const begType = this.beginVertex.getConnectorType(this.beginConnectorType, this.endVertex.x, this.endVertex.y);
                    const endType = this.endVertex.getConnectorType(this.endConnectorType, this.beginVertex.x, this.beginVertex.y);
                    subline.push(` Call EditConnector(edges(${i}).ConnectorFormat, nodes(${beg}), nodes(${end}), ${begType}, ${endType})`)
                }
                subline.forEach((v) => sub.push([v]));
                if (this.text != null) {
                    this.text.createVBACode("shapes_", sub);
                }
            }
        }
    }

    export class LineEdge extends Edge {
        private _svgLine: SVGLineElement;
        //svgText: SVGTextElement;

        get svgLine(): SVGLineElement {
            return this._svgLine;
        }
        /*
        public setGraph(value: Graph)
        {
            super.setGraph(value);
            if (this.graph != null) {
                this.graph.svgGroup.appendChild(this.svgGroup);
            }
        }
        */


        constructor(__graph: Graph, className: string | null = null) {
            super(__graph, className);
            const p = this.svgGroup.getPropertyStyleValue(Edge.defaultLineClass);
            this._svgLine = createLine(0, 0, 0, 0, p);
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
            if (this.beginVertex != null && this.endVertex != null) {
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
        public createVBACode(main: string[], sub: string[][], indexDic: { [key: string]: number; }): void {
            super.createVBACode(main, sub, indexDic);
            if (this.graph != null) {
                const i = indexDic[this.objectID];
                const lineColor = VBATranslateFunctions.colorToVBA(this._svgLine.getPropertyStyleValueWithDefault("stroke", "gray"));
                const strokeWidth = parseInt(this._svgLine.getPropertyStyleValueWithDefault("stroke-width", "4"));
                const visible = this._svgLine.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                sub.push([` Call EditLine(edges(${i}).Line, ${lineColor}, msoLineSolid, ${0}, ${strokeWidth}, ${visible})`]);
            }
        }
        
    }
    
}