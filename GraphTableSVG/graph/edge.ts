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
        private _observer: MutationObserver;
        private observerFunc: MutationCallback = (x: MutationRecord[]) => {
            let b = false;
            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                b = true;
            }
            if (b) this.update();

        };
        public get markerStart(): SVGMarkerElement | null {
            if (this.surface != null) {
                var p = this.surface.getAttribute("marker-start");
                if (p != null) {
                    const str = p.substring(5, p.length - 1);
                    const ele = <SVGMarkerElement><any>document.getElementById(str);
                    return ele;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        public set markerStart(value: SVGMarkerElement | null) {
            if (this.surface != null) {
                if (value == null) {
                    this.surface.removeAttribute("marker-start");
                } else {
                    this.svgGroup.appendChild(value);
                    this.surface.setAttribute("marker-start", `url(#${value.id})`);
                }
            }
        } 
        public get markerEnd(): SVGMarkerElement | null {
            if (this.surface != null) {
                var p = this.surface.getAttribute("marker-end");
                if (p != null) {
                    const str = p.substring(5, p.length - 1);
                    const ele = <SVGMarkerElement><any>document.getElementById(str);
                    return ele;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        public set markerEnd(value: SVGMarkerElement | null) {
            if (this.surface != null) {
                if (value == null) {
                    this.surface.removeAttribute("marker-end");
                } else {
                    this.svgGroup.appendChild(value);
                    this.surface.setAttribute("marker-end", `url(#${value.id})`);
                }
            }
        }
        public get strokeDasharray(): string | null{
            if (this.surface != null) {
                var s = this.surface.getPropertyStyleValue("stroke-dasharray");
                return s;
            } else {
                return null;
            }
        }
        public set strokeDasharray(value: string | null) {
            if (this.surface != null) {
                if (value != null) {
                    this.surface.setPropertyStyleValue("stroke-dasharray", value);
                } else {
                    this.surface.removeAttribute("stroke-dasharray");
                }
            }
        }

        public get lineColor(): string | null {
            if (this.surface != null) {
                return this.surface.getPropertyStyleValueWithDefault("stroke", "black");
            } else {
                return null;
            }
        }
        private _beginVertex: Vertex | null = null;
        private _endVertex: Vertex | null = null;
        private _graph: Graph | null = null;
        private _svgGroup: SVGGElement;
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        protected _surface: SVGElement | null = null;
        public get surface(): SVGElement | null {
            return this._surface;
        }


        protected _text: EdgeText | null = null;
        public get text(): EdgeText | null {
            return this._text;
        }
        public set text(value: EdgeText | null) {
            this._text = value;
        }
        constructor(__graph: Graph, g: SVGGElement) {
            this._svgGroup = g;
            this.svgGroup.setAttribute(Graph.objectIDName, (Graph.idCounter++).toString());
            this.svgGroup.setAttribute(Graph.typeName, "edge");

            const t1 = this.svgGroup.getPropertyStyleValue(Edge.beginConnectorTypeName);
            const t2 = this.svgGroup.getPropertyStyleValue(Edge.endConnectorTypeName);

            this.beginConnectorType = ToConnectorPosition(t1);
            this.endConnectorType = ToConnectorPosition(t2);

            this._graph = __graph;
            this._graph.add(this);


            this._observer = new MutationObserver(this.observerFunc);
            const option1: MutationObserverInit = { attributes: true };
            this._observer.observe(this.svgGroup, option1);


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
            if (this.markerStart != null) {
                var node = <SVGPolygonElement>this.markerStart.firstChild;
                if (this.lineColor != null) {
                    node.setAttribute("fill", this.lineColor);
                }
            }
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
        public static create(graph: Graph, className: string | null = graph.defaultEdgeClass, defaultSurfaceType: string | null = null): GraphTableSVG.Edge {
            className = className != null ? className : graph.defaultVertexClass;
            const g = createGroup(className);
            graph.svgGroup.appendChild(g);

            const type1 = g.getPropertyStyleValue(Vertex.defaultSurfaceType);
            const type = defaultSurfaceType != null ? defaultSurfaceType :
                type1 != null ? type1 : "line";
            
            if (type == "curve") {
                const line = new BezierEdge(graph, g);
                return line;
            } else {
                const line = new LineEdge(graph, g);
                return line;
            }
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

        public static createMark(id : string): SVGMarkerElement {

            var marker = GraphTableSVG.createMarker();
            marker.id = `marker-${id}`;
            return marker;
        }
    }

    export class LineEdge extends Edge {
        //private _svgLine: SVGLineElement;
        //svgText: SVGTextElement;

        get svgLine(): SVGLineElement {
            return <SVGLineElement>this.surface;
        }
        
        



        constructor(__graph: Graph, g: SVGGElement) {
            super(__graph, g);
            const p = this.svgGroup.getPropertyStyleValue(Edge.defaultLineClass);
            this._surface = createLine(0, 0, 0, 0, p);
            this.svgGroup.appendChild(this.svgLine);

            //this.update();
            //this.graph.svgGroup.appendChild(this._svg);

        }
        /*
        public static create(className: string | null = null): LineEdge {
            const line = new LineEdge(className);
            
            return line;
        }
        */

        public update(): boolean {
            super.update();

            if (this.beginVertex != null && this.endVertex != null) {
                this.svgLine.x1.baseVal.value = this.x1;
                this.svgLine.y1.baseVal.value = this.y1;

                this.svgLine.x2.baseVal.value = this.x2;
                this.svgLine.y2.baseVal.value = this.y2;

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
                const lineColor = VBATranslateFunctions.colorToVBA(this.svgLine.getPropertyStyleValueWithDefault("stroke", "gray"));
                const strokeWidth = parseInt(this.svgLine.getPropertyStyleValueWithDefault("stroke-width", "4"));
                const visible = this.svgLine.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                sub.push([` Call EditLine(edges(${i}).Line, ${lineColor}, msoLineSolid, ${0}, ${strokeWidth}, ${visible})`]);
            }
        }
        
    }
    export class BezierEdge extends Edge {
        public static readonly controlPointName: string = "data-control-point";

        //private _svgBezier: SVGPathElement;

        get svgBezier(): SVGPathElement {
            return <SVGPathElement>this.surface;
        }

        constructor(__graph: Graph, g: SVGGElement) {
            super(__graph, g);
            const p = this.svgGroup.getPropertyStyleValue(Edge.defaultLineClass);
            this._surface = createPath(0, 0, 0, 0, p);
            this.svgGroup.appendChild(this.svgBezier);            

        }
        public get controlPoint(): [number, number] {
            
            const str = this.svgBezier.getAttribute(BezierEdge.controlPointName);
            if (str != null) {
                const p: [number, number] = JSON.parse(str);
                return p; 
            } else {
                this.controlPoint = [0, 0];
                return [0, 0];
            }
        }
        public set controlPoint(value: [number, number]) {
            const str = JSON.stringify(value);
            this.svgBezier.setAttribute(BezierEdge.controlPointName, str);
        }

        public update(): boolean {
            super.update();
            if (this.beginVertex != null && this.endVertex != null) {
                var [cx1, cy1] = this.controlPoint;
                const path = `M ${this.x1} ${this.y1} Q ${cx1} ${cy1} ${this.x2} ${this.y2}`

                var prevPath = this.svgBezier.getAttribute("d");
                if (prevPath == null || path != prevPath) {
                    this.svgBezier.setAttribute("d", path);
                }


                if (this.text != null) {
                    this.text.update();
                }
            }



            return false;
        }
    }
}