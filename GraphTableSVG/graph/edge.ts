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
        public static readonly controlPointName: string = "data-control-point";
        public static readonly markerStartName: string = "--marker-start";
        public static readonly markerEndName: string = "--marker-end";
        
        /*
        get svgBezier(): SVGPathElement {
            return <SVGPathElement>this._surface;
        }
        */
        protected _svgTextPath: SVGTextPathElement;
        public get svgTextPath(): SVGTextPathElement {
            return this._svgTextPath;
        }
        public tag: any;

        private _observer: MutationObserver;
        private observerFunc: MutationCallback = (x: MutationRecord[]) => {
            let b = false;
            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                b = true;
            }
            if (b) this.update();

        };
        /**
         * 開始位置の矢印オブジェクトを返します。
         */
        public get markerStart(): SVGMarkerElement | null {
            if (this.svgPath != null) {
                var p = this.svgPath.getAttribute("marker-start");
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
            if (this.svgPath != null) {
                if (value == null) {
                    this.svgPath.removeAttribute("marker-start");
                } else {

                    this.svgGroup.appendChild(value);
                    this.svgPath.setAttribute("marker-start", `url(#${value.id})`);
                }
            }
        } 
        /**
         * 終了位置の矢印オブジェクトを返します。
         */
        public get markerEnd(): SVGMarkerElement | null {
            if (this.svgPath != null) {
                var p = this.svgPath.getAttribute("marker-end");
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
            if (this.svgPath != null) {
                if (value == null) {
                    this.svgPath.removeAttribute("marker-end");
                } else {
                    this.svgGroup.appendChild(value);
                    this.svgPath.setAttribute("marker-end", `url(#${value.id})`);
                }
            }
        }
        /**
         * 辺の制御点を返します。
         */
        public get controlPoint(): [number, number][] {

            const str = this.svgPath.getAttribute(Edge.controlPointName);
            if (str != null) {
                const p: [number, number][]= JSON.parse(str);
                return p;
            } else {
                this.controlPoint = [];
                return [];
            }
        }        
        public set controlPoint(value: [number, number][]) {
            const str = JSON.stringify(value);
            this.svgPath.setAttribute(Edge.controlPointName, str);
        }

        /**
         * svgPathのstyle:stroke-dasharrayを返します。
         */
        public get strokeDasharray(): string | null{
            if (this.svgPath != null) {
                var s = this.svgPath.getPropertyStyleValue("stroke-dasharray");
                return s;
            } else {
                return null;
            }
        }
        public set strokeDasharray(value: string | null) {
            if (this.svgPath != null) {
                if (value != null) {
                    this.svgPath.setPropertyStyleValue("stroke-dasharray", value);
                } else {
                    this.svgPath.removeAttribute("stroke-dasharray");
                }
            }
        }
        /**
         * svgPathのstyle:strokeを返します。
         */
        public get lineColor(): string | null {
            if (this.svgPath != null) {
                return this.svgPath.getPropertyStyleValueWithDefault("stroke", "black");
            } else {
                return null;
            }
        }
        private _beginVertex: Vertex | null = null;
        private _endVertex: Vertex | null = null;
        private _graph: Graph | null = null;
        private _svgGroup: SVGGElement;
        /**
         * この辺をまとめているSVGGElementを返します。
         */
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        protected _svgPath : SVGPathElement;        
        /**
         * この辺のSVGPathElementを返します。
         */
        public get svgPath(): SVGPathElement {
            return this._svgPath;
        }
        
        protected _svgText: SVGTextElement;
        /**
         * この辺のSVGTextElementを返します。
         */
        public get svgText(): SVGTextElement {
            return this._svgText;
        }
        
        /*
        protected _text: EdgeText | null = null;
        public get text(): EdgeText | null {
            return this._text;
        }

        public set text(value: EdgeText | null) {
            this._text = value;
        }
        */
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

            const p = this.svgGroup.getPropertyStyleValue(Edge.defaultLineClass);
            this._svgPath = SVG.createPath(this.svgGroup, 0, 0, 0, 0, p);
            //this.svgGroup.appendChild(this.svgPath);
            this._svgPath.id = `path-${this.objectID}`;

            const textClass = this.svgGroup.getPropertyStyleValue(Edge.defaultTextClass);
            [this._svgText, this._svgTextPath] = SVG.createTextPath(textClass);
            this.svgGroup.appendChild(this._svgText);
            this._svgText.appendChild(this._svgTextPath);
            this._svgTextPath.href.baseVal = `#${this._svgPath.id}`

            const markerStartName = this.svgGroup.getPropertyStyleValue(Edge.markerStartName);
            const markerEndName = this.svgGroup.getPropertyStyleValue(Edge.markerEndName);

            if(markerStartName == "true") this.markerStart = GraphTableSVG.Edge.createMark();
            if(markerEndName == "true") this.markerEnd = GraphTableSVG.Edge.createMark();


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
                return <ConnectorPosition>p;
            }
        }
        /**
        開始接点の接続位置を設定します。
        */
        set beginConnectorType(value: ConnectorPosition) {
            this.svgGroup.setPropertyStyleValue(Edge.beginConnectorTypeName, value)
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
                return <ConnectorPosition>p;
            }
        }
        /**
        終了接点の接続位置を設定します。
        */
        set endConnectorType(value: ConnectorPosition) {
            this.svgGroup.setPropertyStyleValue(Edge.endConnectorTypeName, value)
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
            if (this.markerEnd != null) {
                var node = <SVGPolygonElement>this.markerEnd.firstChild;
                if (this.lineColor != null) {
                    node.setAttribute("fill", this.lineColor);
                }
            }

            if (this.beginVertex != null && this.endVertex != null) {
                //const [x, y] = [this.svgText.getX(), this.svgText.getY()];

                const points: [number, number][] = this.controlPoint;
                let path = "";
                if (points.length == 0) {
                    path = `M ${this.x1} ${this.y1} L ${this.x2} ${this.y2}`
                } else if (points.length == 1) {
                    const [cx1, cy1] = points[0];
                    path = `M ${this.x1} ${this.y1} Q ${cx1} ${cy1} ${this.x2} ${this.y2}`
                } else {

                }

                const prevPath = this.svgPath.getAttribute("d");
                if (prevPath == null || path != prevPath) {
                    this.svgPath.setAttribute("d", path);
                }

                if (this.pathTextAlignment == pathTextAlighnment.regularInterval) {
                    const pathLen = this.svgPath.getTotalLength();
                    const strLen = this.svgText.textContent == null ? 0 : this.svgText.textContent.length;
                    if (strLen > 0) {
                        const startPos = pathLen / (strLen + 1);
                        let textPathLen = pathLen - (startPos * 2);
                        if (textPathLen <= 0) textPathLen = 5;
                        this.svgTextPath.startOffset.baseVal.value = startPos;
                        this.svgText.textLength.baseVal.value = textPathLen;
                    }

                }
                else if(this.pathTextAlignment == pathTextAlighnment.end){
                    if(this.svgText.hasAttribute("textLength"))this.svgText.removeAttribute("textLength");
                    const box = this.svgText.getBBox();
                    const pathLen = this.svgPath.getTotalLength();
                    this.svgTextPath.startOffset.baseVal.value = pathLen - box.width;  
                } 
                else if(this.pathTextAlignment == pathTextAlighnment.center){
                    if(this.svgText.hasAttribute("textLength"))this.svgText.removeAttribute("textLength");
                    const box = this.svgText.getBBox();
                    const pathLen = this.svgPath.getTotalLength();
                    this.svgTextPath.startOffset.baseVal.value = (pathLen - box.width)/2;                    

                }
                else {
                    if(this.svgText.hasAttribute("textLength"))this.svgText.removeAttribute("textLength");
                    //this.svgText.textLength.baseVal.value = 0;
                }
                const strokeWidth = this.svgPath.getPropertyStyleValue("stroke-width");
                if(strokeWidth != null){
                    this.svgText.setAttribute("dy", `-${strokeWidth}`);                  
                }else{
                    this.svgText.setAttribute("dy", "0");                  
                }

                /*
                if (this.text != null) {
                    this.text.update();
                }
                */
            }

            return false;
        }
        /**
         * この辺のテキストがパスに沿って均等に描画される状態ならばTrueを返します。
         */
        public get pathTextAlignment(): pathTextAlighnment {
            const value = this.svgTextPath.getPropertyStyleValueWithDefault(GraphTableSVG.PathTextAlignmentName, "none");
            return pathTextAlighnment.toPathTextAlighnment(value);             
        }
        public set pathTextAlignment(value: pathTextAlighnment) {
            this.svgTextPath.setPropertyStyleValue(GraphTableSVG.PathTextAlignmentName, value);
            /*
            const prev = this.svgTextPath.getPropertyStyleValueWithDefault(GraphTableSVG.PathTextAlighnmentName, "none");
            const str : string = value;
            const prevV = prev == str;
            if (prevV) {
                this.svgTextPath.setPropertyStyleValue(GraphTableSVG.PathTextAlighnmentName, value);
            }
            */
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
        public save() {
        }
        /**
         * Edgeを作成します。
         * @param graph 辺を追加するグラフ
         * @param option.beginVertex 開始節
         * @param option.endVertex 終了節
         * @param option 接続オプション
         * @param option.incomingInsertIndex endVertexのincomingEdgeの配列に今回の辺をどの位置に挿入するか
         * @param option.outcomingInsertIndex beginVertexのoutcomingEdgeの配列に今回の辺をどの位置に挿入するか
         * @param option.beginConnectorType beginVertexの接続位置
         * @param option.endConnectorType endVertexの接続位置
         * @param option.className EdgeのsvgGroupのクラス属性名
         * @param option.surfaceType 未使用
         * @param option.text Edgeのテキスト
         */
        public static create(graph: Graph, option : {className?: string, surfaceType?: string, 
            beginVertex? : Vertex, endVertex? : Vertex, beginConnectorType?: ConnectorPosition, endConnectorType?: ConnectorPosition, 
            incomingInsertIndex?: number, outcomingInsertIndex?: number, text? : string, pathTextAlignment? : pathTextAlighnment } = {}): GraphTableSVG.Edge {
            if(option.className == undefined) option.className = graph.defaultEdgeClass;
            if(option.surfaceType == undefined) option.surfaceType = null;
            option.className = option.className != null ? option.className : graph.defaultVertexClass;
            const g = SVG.createGroup(option.className);
            graph.svgGroup.appendChild(g);

            /*
            const type1 = g.getPropertyStyleValue(Vertex.defaultSurfaceType);
            const type = params.surfaceType != null ? params.surfaceType :
                type1 != null ? type1 : "line";
                */

            const r = new Edge(graph, g);
            if(option.beginVertex != undefined && option.endVertex != undefined){
                graph.connect(option.beginVertex, r, option.endVertex, option);
            }
            if(option.text != undefined)r.svgTextPath.setTextContent(option.text);
            if(option.pathTextAlignment == undefined) option.pathTextAlignment = pathTextAlighnment.center;
            r.pathTextAlignment = option.pathTextAlignment;
            return r;
        }
        /**
         * VBAコードを作成します。
         * @param main 
         * @param sub 
         * @param indexDic 
         */
        public createVBACode(main: string[], sub: string[][], indexDic: { [key: string]: number; }): void {
            if (this.graph != null) {
                const subline  : string[]= [];
                const i = indexDic[this.objectID];
                if (this.controlPoint.length == 0) {
                    subline.push(` Set edges(${i}) = shapes_.AddConnector(msoConnectorStraight, 0, 0, 0, 0)`);
                } else if (this.controlPoint.length > 0) {
                    subline.push(` Set edges(${i}) = shapes_.AddConnector(msoConnectorCurve, 0, 0, 0, 0)`);
                    
                }
                    
                if (this.beginVertex != null && this.endVertex != null) {
                    if (this.markerStart != null) {
                        subline.push(` edges(${i}).Line.BeginArrowheadLength = msoArrowheadLong`);
                        subline.push(` edges(${i}).Line.BeginArrowheadStyle = msoArrowheadTriangle`);
                        subline.push(` edges(${i}).Line.BeginArrowheadWidth = msoArrowheadWide`);
                    }
                    if (this.markerEnd != null) {
                        subline.push(` edges(${i}).Line.EndArrowheadLength = msoArrowheadLong`);
                        subline.push(` edges(${i}).Line.EndArrowheadStyle = msoArrowheadTriangle`);
                        subline.push(` edges(${i}).Line.EndArrowheadWidth = msoArrowheadWide`);
                    }

                    const beg = indexDic[this.beginVertex.objectID];
                    const end = indexDic[this.endVertex.objectID];
                    const begType: number = GraphTableSVG.ToVBAConnectorPosition(this.beginVertex.shapeType, this.beginVertex.getConnectorType(this.beginConnectorType, this.endVertex.x, this.endVertex.y));
                    const endType: number = GraphTableSVG.ToVBAConnectorPosition(this.beginVertex.shapeType, this.endVertex.getConnectorType(this.endConnectorType, this.beginVertex.x, this.beginVertex.y));
                    subline.push(` Call EditConnector(edges(${i}).ConnectorFormat, nodes(${beg}), nodes(${end}), ${begType}, ${endType})`)
                }
                const lineColor = VBATranslateFunctions.colorToVBA(this.svgPath.getPropertyStyleValueWithDefault("stroke", "gray"));
                const strokeWidth = parseInt(this.svgPath.getPropertyStyleValueWithDefault("stroke-width", "4"));
                const visible = this.svgPath.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                subline.push(` Call EditLine(edges(${i}).Line, ${lineColor}, msoLineSolid, ${0}, ${strokeWidth}, ${visible})`);
                if (this.controlPoint.length > 0) {
                    subline.push(` edges(${i}).Adjustments(1) = ${this.svgPath.getTotalLength() / 2}`);
                }


                subline.forEach((v) => sub.push([v]));

                this.createVBACodeOfText("shapes_", sub);
                
            }
        }
        /**
         * VBAコードを作成します。
         * @param shapes 
         * @param result 
         */
        public createVBACodeOfText(shapes: string, result: string[][]): void {
            if (this.svgTextPath.textContent != null && this.graph != null) {
                const fontSize = parseInt(this.svgText.getPropertyStyleValueWithDefault("font-size", "12"));
                const fontFamily = VBATranslateFunctions.ToVBAFont(this.svgText.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
                const fontBold = VBATranslateFunctions.ToFontBold(this.svgText.getPropertyStyleValueWithDefault("font-weight", "none"));

                for (let i = 0; i < this.svgTextPath.textContent.length; i++) {
                    const s: string[] = new Array(0);
                    const p1 = this.svgTextPath.getStartPositionOfChar(i);
                    const p2 = this.svgTextPath.getEndPositionOfChar(i);
                    const width = Math.abs(p2.x - p1.x);
                    const height = Math.abs(p2.y - p1.y);

                    const left = this.graph.svgGroup.getX() + p1.x;
                    const top = this.graph.svgGroup.getY() + p1.y - (fontSize / 2);
                    s.push(`With ${shapes}.AddTextBox(msoTextOrientationHorizontal, ${left}, ${top},${width},${fontSize})`);
                    s.push(`.TextFrame.TextRange.Text = "${this.svgTextPath.textContent[i]}"`);
                    s.push(`.TextFrame.marginLeft = 0`);
                    s.push(`.TextFrame.marginRight = 0`);
                    s.push(`.TextFrame.marginTop = 0`);
                    s.push(`.TextFrame.marginBottom = 0`);
                    s.push(`.TextFrame.TextRange.Font.Size = ${fontSize}`);
                    s.push(`.TextFrame.TextRange.Font.name = "${fontFamily}"`);
                    s.push(`.TextFrame.TextRange.Font.Bold = ${fontBold}`);
                    s.push(`.IncrementRotation(${this.svgTextPath.getRotationOfChar(i)})`);
                    //s.push(`.IncrementRotation(${this.svgText.transform.baseVal.getItem(0).angle})`);
                    s.push(`End With`);

                    result.push(s);
                }
            }
            /*
            const s: string[] = new Array(0);
            if (this.graph != null) {
                const region = this.svgText.getBBox();

                const fontSize = parseInt(this.svgText.getPropertyStyleValueWithDefault("font-size", "12"));
                const fontFamily = VBATranslateFunctions.ToVBAFont(this.svgText.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
                const fontBold = VBATranslateFunctions.ToFontBold(this.svgText.getPropertyStyleValueWithDefault("font-weight", "none"));
                const left = this.edge.graph.svgGroup.getX() + this.svgText.getX();
                let top = this.edge.graph.svgGroup.getY() + this.svgText.getY() - (fontSize / 2);
                s.push(`With ${shapes}.AddTextBox(msoTextOrientationHorizontal, ${left}, ${top},${region.width},${fontSize})`);
                s.push(`.TextFrame.TextRange.Text = "${this.svgText.textContent}"`);
                s.push(`.TextFrame.marginLeft = 0`);
                s.push(`.TextFrame.marginRight = 0`);
                s.push(`.TextFrame.marginTop = 0`);
                s.push(`.TextFrame.marginBottom = 0`);
                s.push(`.TextFrame.TextRange.Font.Size = ${fontSize}`);
                s.push(`.TextFrame.TextRange.Font.name = "${fontFamily}"`);
                s.push(`.TextFrame.TextRange.Font.Bold = ${fontBold}`);
                s.push(`.IncrementRotation(${this.svgText.transform.baseVal.getItem(0).angle})`);
                s.push(`End With`);

            }
            result.push(s);
            */
        }


        private static markerCounter: number = 0;
        /**
         * 矢印オブジェクトを作成します。
         */
        public static createMark(): SVGMarkerElement {
            var marker = GraphTableSVG.SVG.createMarker();
            marker.id = `marker-${Edge.markerCounter++}`;
            return marker;
        }
        /*
        public setStyleForPNG() {
            SVG.setStyleForPNG(this.svgPath);
            SVG.setStyleForPNG(this.svgText);
            SVG.setStyleForPNG(this.svgTextPath);

        }
        */
    }
    
}