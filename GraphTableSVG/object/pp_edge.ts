namespace GraphTableSVG {
    /**
     * 辺をSVGで表現するためのクラスです。
     */
    export class PPEdge extends PPTextBoxShapeBase {        
        protected _svgTextPath: SVGTextPathElement;
        public get svgTextPath(): SVGTextPathElement {
            return this._svgTextPath;
        }
        public tag: any;
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
        /**
         * 開始位置の矢印オブジェクトを設定します。
         * @param value 代入するSVGMarkerElementもしくはNull
         */
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
        protected _svgPath : SVGPathElement;        
        /**
         * この辺のSVGPathElementを返します。
         */
        public get svgPath(): SVGPathElement {
            return this._svgPath;
        }
        
        
        protected createSurface(svgbox : SVGElement, option : TextBoxShapeAttributes = {}) : void {
            this._svgPath = SVG.createPath(this.svgGroup, 30, 30, 100, 100);
        }

        constructor(svgbox: SVGElement, option : TextBoxShapeAttributes = {}) {
            super(svgbox, option);
            //this._svgGroup = SVG.createGroup(svgbox);


            
            /*
            const t1 = this.svgGroup.getPropertyStyleValue(Edge.beginConnectorTypeName);
            const t2 = this.svgGroup.getPropertyStyleValue(Edge.endConnectorTypeName);

            this.beginConnectorType = ToConnectorPosition(t1);
            this.endConnectorType = ToConnectorPosition(t2);

            this._observer = new MutationObserver(this.observerFunc);
            const option1: MutationObserverInit = { attributes: true };
            this._observer.observe(this.svgGroup, option1);

            const lineClass = this.svgGroup.getPropertyStyleValue(Edge.defaultLineClass);
            this._svgPath = SVG.createPath(this.svgGroup, 0, 0, 0, 0, lineClass);
            //this.svgGroup.appendChild(this.svgPath);
            this._svgPath.id = `path-${this.objectID}`;

            const textClass = this.svgGroup.getPropertyStyleValue(SVG.defaultTextClass);
            [this._svgText, this._svgTextPath] = SVG.createTextPath(textClass);
            this.svgGroup.appendChild(this._svgText);
            this._svgText.appendChild(this._svgTextPath);
            this._svgTextPath.href.baseVal = `#${this._svgPath.id}`

            const markerStartName = this.svgGroup.getPropertyStyleValue(Edge.markerStartName);
            const markerEndName = this.svgGroup.getPropertyStyleValue(Edge.markerEndName);

            const edgeColor = this.svgPath.getPropertyStyleValue("stroke");
            const strokeWidth = this.svgPath.getPropertyStyleValue("stroke-width");
            
            if(markerStartName == "true") this.markerStart = GraphTableSVG.Edge.createStartMarker({color : edgeColor, strokeWidth : strokeWidth});
            if(markerEndName == "true") this.markerEnd = GraphTableSVG.Edge.createEndMarker({color : edgeColor, strokeWidth : strokeWidth});
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
            /*
            if (prev != null) {
                prev.removeOutcomingEdge(this);
            }
            */

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

            /*
            if (prev != null) {
                prev.removeIncomingEdge(this);
            }
            */
            this.update();

        }
        /**
         * この辺を廃棄します。廃棄した辺はグラフから取り除かれます。
         */
        public dispose() {
            this.beginVertex = null;
            this.endVertex = null;
        }
        /**
        この辺が廃棄されているときTrueを返します。
        */
       /*
        get isDisposed(): boolean {
            return this.graph == null;
        }
        */

        
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
        private removeTextLengthAttribute() : void {
            if(this.svgText.hasAttribute("textLength")) this.svgText.removeAttribute("textLength");
            if(this.svgTextPath.hasAttribute("textLength")) this.svgTextPath.removeAttribute("textLength");
            if(this.svgText.hasAttribute("letter-spacing")) this.svgText.removeAttribute("letter-spacing");
        }
        private setRegularInterval(value : number) : void {
            this.removeTextLengthAttribute();
            const box = this.svgText.getBBox();
            const diff = value - box.width;
            const number = this.svgText.textContent.length;
            if(number >= 2){
                const w = diff / (number - 1)
                this.svgText.setAttribute("letter-spacing", `${w}`);
            }
            this.svgText.setAttribute("textLength", `${value}`);
            this.svgTextPath.setAttribute("textLength", `${value}`);
            
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
                    const strLen = this.svgTextPath.textContent == null ? 0 : this.svgTextPath.textContent.length;
                    if (strLen > 0) {
                        const startPos = pathLen / (strLen + 1);
                        let textPathLen = pathLen - (startPos * 2);
                        if (textPathLen <= 0) textPathLen = 5;
                        this.svgTextPath.setAttribute("startOffset", `${startPos}`);
                        this.setRegularInterval(textPathLen);
                        //this.svgText.textLength.baseVal.value = textPathLen;
                        
                        //this.svgTextPath.textLength.baseVal.value = textPathLen;

                        //this.svgTextPath.setAttribute("lengthAdjust", "spacing");
                        //this.svgText.setAttribute("lengthAdjust", "spacing");

                        //this.svgText.textLength.baseVal.value = textPathLen;
                    }

                }
                else if(this.pathTextAlignment == pathTextAlighnment.end){
                    this.removeTextLengthAttribute();
                    const box = this.svgText.getBBox();
                    const pathLen = this.svgPath.getTotalLength();
                    this.svgTextPath.setAttribute("startOffset", `${pathLen - box.width}`);
                } 
                else if(this.pathTextAlignment == pathTextAlighnment.center){
                    this.removeTextLengthAttribute();
                    const box = this.svgText.getBBox();
                    const pathLen = this.svgPath.getTotalLength();
                    const offset = (pathLen - box.width)/2;
                    this.svgTextPath.setAttribute("startOffset", `${offset}`);
                    //こっちだとEdgeではおかしくなる
                    //this.svgTextPath.startOffset.baseVal.value = (pathLen - box.width)/2;                    

                }
                else {
                    this.removeTextLengthAttribute();
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
            const r = this.svgGroup.getAttribute(GraphTableSVG.SVG.objectIDName);
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
            const g = SVG.createGroup(graph.svgGroup, option.className);
            //graph.svgGroup.appendChild(g);

            /*
            const type1 = g.getPropertyStyleValue(Vertex.defaultSurfaceType);
            const type = params.surfaceType != null ? params.surfaceType :
                type1 != null ? type1 : "line";
                */

            const edge = new Edge(graph, g);
            if(option.beginVertex != undefined && option.endVertex != undefined){
                graph.connect(option.beginVertex, edge, option.endVertex, option);
            }
            if(option.text != undefined)edge.svgTextPath.setTextContent(option.text);
            if(option.pathTextAlignment == undefined) option.pathTextAlignment = pathTextAlighnment.center;
            edge.pathTextAlignment = option.pathTextAlignment;
            return edge;
        }
        public setIndexDictionaryForVBA(vertexDic: { [key: string]: number; }, edgeDic: { [key: string]: number; }){
            if (this.controlPoint.length == 0) {
                edgeDic[this.objectID] = Object.keys(edgeDic).length;
            } else if (this.controlPoint.length > 0) {                
                //edgeDic[this.objectID] = Object.keys(edgeDic).length;
                for(let i=0;i<this.VBAConnectorNumber;i++){
                    vertexDic[`${this.objectID}_${i}`] = Object.keys(vertexDic).length;    
                }
                for(let i=0;i<=this.VBAConnectorNumber;i++){
                    edgeDic[`${this.objectID}_${i}`] = Object.keys(edgeDic).length;
                }

            }
            
        }
        public VBAConnectorNumber = 1;


        private static markerCounter: number = 0;
        /**
         * 矢印オブジェクトを作成します。
         */
        private static createMark(option : {className?: string, strokeWidth? : string, color? : string, isEnd?:boolean} = {}): SVGMarkerElement {
            var [marker, path] = GraphTableSVG.SVG.createMarker(option);
            if(option.isEnd != undefined && option.isEnd){
                path.setAttribute("transform", "rotate(180,5,5)");
                marker.setAttribute("refX", "0");
            }
            marker.id = `marker-${PPEdge.markerCounter++}`;
            return marker;
        }
        public static createStartMarker(option : {className?: string, strokeWidth? : string, color? : string} = {}): SVGMarkerElement {
            const option2 = {className: option.className, strokeWidth : option.strokeWidth, color : option.color, isEnd : true};
            return this.createMark(option2);

        }
        public static createEndMarker(option : {className?: string, strokeWidth? : string, color? : string} = {}): SVGMarkerElement {
            return this.createMark(option);
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