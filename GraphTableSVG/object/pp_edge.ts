namespace GraphTableSVG {
    /**
     * 辺をSVGで表現するためのクラスです。
     */
    export class PPEdge extends PPTextBoxShapeBase {
        private _svgPath: SVGPathElement;
        public get svgPath(): SVGPathElement {
            return this._svgPath;
        }
        protected _svgTextPath: SVGTextPathElement;
        public get svgTextPath(): SVGTextPathElement {
            return this._svgTextPath;
        }
        protected createSurface(svgbox : SVGElement, option : TextBoxShapeAttributes = {}) : void {
            this._svgPath = GraphTableSVG.SVG.createPath(this.svgGroup, 0, 0, 0, 0, this.svgGroup.getPropertyStyleValue(SVG.defaulSurfaceClass));
            this.svgGroup.insertBefore(this.svgPath, this.svgText);
        }
        protected get shape(): string {
            return "NONE";
        }
        public get type(): string {
            return "PPEdge";
        }
        public get surface() : SVGElement {
            return this.svgPath;
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
                const p: [number, number][] = JSON.parse(str);
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
        /*
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
        */
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
        //private _beginVertex: Vertex | null = null;
        //private _endVertex: Vertex | null = null;
        //protected _svgPath : SVGPathElement;        

        /*
        protected createSurface(svgbox : SVGElement, option : TextBoxShapeAttributes = {}) : void {
            this._svgPath = SVG.createPath(this.svgGroup, 30, 30, 100, 100);
        }
        */
        static constructAttributes(e: SVGElement, removeAttributes: boolean = false, output: PPEdgeAttributes = {}): PPEdgeAttributes {
            PPTextBoxShapeBase.constructAttributes(e, removeAttributes, output);
            output.x1 = e.gtGetAttributeNumber("x1", 0);
            output.x2 = e.gtGetAttributeNumber("x2", 300);
            output.y1 = e.gtGetAttributeNumber("y1", 0);
            output.y2 = e.gtGetAttributeNumber("y2", 300);
            output.beginVertexID = e.getAttribute("begin-vertex");
            output.endVertexID = e.getAttribute("end-vertex");
            output.beginConnectorType = ConnectorPosition.ToConnectorPosition(e.gtGetAttribute("begin-connector", "auto"));
            output.endConnectorType = ConnectorPosition.ToConnectorPosition(e.gtGetAttribute("end-connector", "auto"));

            output.startMarker = e.gtGetAttribute("start-marker", "false") == "true";
            output.endMarker = e.gtGetAttribute("end-marker", "false") == "true";

            if (removeAttributes) {
                e.removeAttribute("x1");
                e.removeAttribute("x2");
                e.removeAttribute("y1");
                e.removeAttribute("y2");
                e.removeAttribute("start-marker");
                e.removeAttribute("end-marker");
                e.removeAttribute("begin-vertex");
                e.removeAttribute("end-vertex");
                e.removeAttribute("begin-connector");
                e.removeAttribute("end-connector");

            }

            return output;
        }
        constructor(svgbox: SVGElement, option: PPEdgeAttributes = {}) {
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
            */

            //if(option.x1 != undefined) this.x1 = option.x1;
            //const markerStartName = this.svgGroup.getPropertyStyleValue(Edge.markerStartName);
            //const markerEndName = this.svgGroup.getPropertyStyleValue(Edge.markerEndName);

            const edgeColor = this.svgPath.getPropertyStyleValue("stroke");
            const strokeWidth = this.svgPath.getPropertyStyleValue("stroke-width");

            if (option.startMarker) this.markerStart = GraphTableSVG.Edge.createStartMarker({ color: edgeColor, strokeWidth: strokeWidth });
            if (option.endMarker) this.markerEnd = GraphTableSVG.Edge.createEndMarker({ color: edgeColor, strokeWidth: strokeWidth });

            const x1 = option.x1 == undefined ? 0 : option.x1;
            const y1 = option.y1 == undefined ? 0 : option.y1;
            const x2 = option.x2 == undefined ? 300 : option.x2;
            const y2 = option.y2 == undefined ? 300 : option.y2;
            this.pathPoints = [[x1, y1], [x2, y2]];


            if(option.beginVertexID != null){
                const obj = PPTextBoxShapeBase.getObjectFromID(option.beginVertexID);

                if(obj instanceof PPVertexBase){
                this.beginVertex = obj;
                }
            }
            if(option.endVertexID != null){
                const obj = PPTextBoxShapeBase.getObjectFromID(option.endVertexID);
                if(obj instanceof PPVertexBase){
                this.endVertex = obj;
                }
            }
            this.beginConnectorType = option.beginConnectorType == undefined ? ConnectorPosition.Auto : option.beginConnectorType;
            this.endConnectorType = option.endConnectorType == undefined ? ConnectorPosition.Auto : option.endConnectorType;

            this.update();

        }
        /**
        開始接点の接続位置を返します。
        */
        get beginConnectorType(): ConnectorPosition {
            const p = this.svgGroup.getPropertyStyleValue(Edge.beginConnectorTypeName);
            return ConnectorPosition.ToConnectorPosition(p);
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
            return ConnectorPosition.ToConnectorPosition(p);
        }
        /**
        終了接点の接続位置を設定します。
        */
        set endConnectorType(value: ConnectorPosition) {
            this.svgGroup.setPropertyStyleValue(Edge.endConnectorTypeName, value)
        }

        private get beginVertexID(): string | null {
            return this.svgGroup.getAttribute(Edge.beginNodeName);
        }
        private set beginVertexID(v: string | null) {
            this.svgGroup.setAttribute(Edge.beginNodeName, v);
        }

        private get endVertexID(): string | null {
            return this.svgGroup.getAttribute(Edge.endNodeName);
        }
        private set endVertexID(v: string | null) {
            this.svgGroup.setAttribute(Edge.endNodeName, v == null ? null : v);
        }

        private removeVertexEvent(vertex : PPTextBoxShapeBase){
            vertex.svgGroup.removeEventListener(PPTextBoxShapeBase.ConnectPositionChangedEventName, this.pUpdateFunc);
        }
        private addVertexEvent(vertex : PPTextBoxShapeBase){
            vertex.svgGroup.addEventListener(PPTextBoxShapeBase.ConnectPositionChangedEventName, this.pUpdateFunc);
        }
        private pUpdateFunc = () => this.update();

        /**
        開始接点を返します。
        */
        get beginVertex(): PPVertexBase | null {
            if (this.beginVertexID == null) {
                return null;
            } else {
                return <PPVertexBase>PPTextBoxShapeBase.getObjectFromObjectID(this.beginVertexID);
            }
        }
        /**
        開始接点を設定します。
        */
        set beginVertex(value: PPVertexBase | null) {
            if(this.beginVertex != null){
                 this.removeVertexEvent(this.beginVertex);
                 if(this.beginVertex.outcomingEdges.indexOf(this) != -1){
                     this.beginVertex.removeOutcomingEdge(this);
                 }
            }

            if (value == null) {
                this.beginVertexID = null;
            } else {
                this.beginVertexID = value.objectID;
                this.addVertexEvent(this.beginVertex);
                if(this.beginVertex.outcomingEdges.indexOf(this) == -1){
                    this.beginVertex.insertOutcomingEdge(this);
                }

            }

            this.update();

        }
        /**
        終了接点を返します。
        */
        get endVertex(): PPVertexBase | null {
            if (this.endVertexID == null) {
                return null;
            } else {
                return <PPVertexBase>PPTextBoxShapeBase.getObjectFromObjectID(this.endVertexID);
            }
        }
        /**
        終了接点を設定します。
        */
        set endVertex(value: PPVertexBase | null) {
            if(this.endVertex != null){
                this.removeVertexEvent(this.endVertex);
                if(this.endVertex.incomingEdges.indexOf(this) != -1){
                    this.endVertex.removeIncomingEdge(this);
                }
           }


            if (value == null) {
                this.endVertexID = null;
            } else {
                this.endVertexID = value.objectID;
                this.addVertexEvent(this.endVertex);
                if(this.endVertex.incomingEdges.indexOf(this) == -1){
                    this.endVertex.insertIncomingEdge(this);
                }

            }

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
            return this.pathPoints[0][0];
        }
        public set x1(value: number) {
            const p = this.pathPoints;
            p[0][0] = value;
            this.pathPoints = p;
        }
        /**
        開始位置のY座標を返します。
        */
        public get y1(): number {
            return this.pathPoints[0][1];
        }
        public set y1(value: number) {
            const p = this.pathPoints;
            p[0][1] = value;
            this.pathPoints = p;
        }

        /**
        終了位置のX座標を返します。
        */
        public get x2(): number {
            const d = this.pathPoints;
            return d[d.length - 1][0];
        }
        public set x2(value: number) {
            const p = this.pathPoints;
            p[p.length - 1][0] = value;
            this.pathPoints = p;
        }

        /**
        終了位置のY座標を返します。
        */
        public get y2(): number {
            const d = this.pathPoints;
            return d[d.length - 1][1];
        }
        public set y2(value: number) {
            const p = this.pathPoints;
            p[p.length - 1][1] = value;
            this.pathPoints = p;
        }

        private removeTextLengthAttribute(): void {
            if (this.svgText.hasAttribute("textLength")) this.svgText.removeAttribute("textLength");
            if (this.svgTextPath.hasAttribute("textLength")) this.svgTextPath.removeAttribute("textLength");
            if (this.svgText.hasAttribute("letter-spacing")) this.svgText.removeAttribute("letter-spacing");
        }
        private setRegularInterval(value: number): void {
            this.removeTextLengthAttribute();
            const box = this.svgText.getBBox();
            const diff = value - box.width;
            const number = this.svgText.textContent.length;
            if (number >= 2) {
                const w = diff / (number - 1)
                this.svgText.setAttribute("letter-spacing", `${w}`);
            }
            this.svgText.setAttribute("textLength", `${value}`);
            this.svgTextPath.setAttribute("textLength", `${value}`);

        }
        private get pathPoints(): [number, number][] {
            const d = this.svgPath.getAttribute("d").split(" ");
            let i = 0;
            const r: [number, number][] = [];

            while (i < d.length) {
                if (d[i] == "M") {
                    r.push([Number(d[i + 1]), Number(d[i + 2])]);
                    i += 3;
                }else if(d[i] == "L"){
                    r.push([Number(d[i + 1]), Number(d[i + 2])]);
                    i += 3;
                } else if (d[i] == "Q") {
                    r.push([Number(d[i + 1]), Number(d[i + 2])]);
                    r.push([Number(d[i + 3]), Number(d[i + 4])]);
                    i += 5;
                } else {

                    throw Error("path points parse error");
                }
            }
            /*
            if(r.length == 0){
                r.push([0, 0]);
                r.push([0, 0]);
            }
            */

            return r;
        }
        private set pathPoints(points: [number, number][]) {
            let path = "";
            if (points.length == 2) {
                const [x1, y1] = points[0];
                const [x2, y2] = points[1];

                path = `M ${x1} ${y1} L ${x2} ${y2}`
            } else if (points.length == 3) {
                const [x1, y1] = points[0];
                const [x2, y2] = points[2];
                const [cx1, cy1] = points[1];
                path = `M ${x1} ${y1} Q ${cx1} ${cy1} ${x2} ${y2}`
            } else if(points.length == 1){
                throw Error("path points ivnalid error");
            }
             else {
                path = `M ${0} ${0} L ${0} ${0}`
            }

            const prevPath = this.svgPath.getAttribute("d");
            if (prevPath == null || path != prevPath) {
                this.svgPath.setAttribute("d", path);
            }
        }
        /**
         * 再描画します。
         */
        public update(): boolean {
            const [cx1, cy1] = this.beginVertex != null ? [this.beginVertex.cx, this.beginVertex.cy] : [this.x1, this.y1];
            const [cx2, cy2] = this.endVertex != null ? [this.endVertex.cx, this.endVertex.cy] : [this.x2, this.y2];

            const [x1, y1] = this.beginVertex != null ? this.beginVertex.getLocation(this.beginConnectorType, cx2, cy2) : [cx1,cy1];
            const [x2, y2] = this.endVertex != null ? this.endVertex.getLocation(this.endConnectorType, cx1, cy1) : [cx2, cy2];
            /*
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            */
            const points: [number, number][] = this.pathPoints;

            points[0] = [x1, y1];
            points[points.length -1] = [x2, y2];
            this.pathPoints = points;
            /*
            let path = "";
            if (points.length == 0) {
                path = `M ${x1} ${y1} L ${x2} ${y2}`
            } else if (points.length == 1) {
                const [cx1, cy1] = points[0];
                path = `M ${x1} ${y1} Q ${cx1} ${cy1} ${x2} ${y2}`
            } else {

            }
                        const prevPath = this.svgPath.getAttribute("d");
            if (prevPath == null || path != prevPath) {
                this.svgPath.setAttribute("d", path);
            }

            */



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

            /*
            if (this.beginVertex != null && this.endVertex != null) {
                //const [x, y] = [this.svgText.getX(), this.svgText.getY()];




                if (this.pathTextAlignment == pathTextAlighnment.regularInterval) {
                    const pathLen = this.svgPath.getTotalLength();
                    const strLen = this.svgTextPath.textContent == null ? 0 : this.svgTextPath.textContent.length;
                    if (strLen > 0) {
                        const startPos = pathLen / (strLen + 1);
                        let textPathLen = pathLen - (startPos * 2);
                        if (textPathLen <= 0) textPathLen = 5;
                        this.svgTextPath.setAttribute("startOffset", `${startPos}`);
                        this.setRegularInterval(textPathLen);
                    }

                }
                else if (this.pathTextAlignment == pathTextAlighnment.end) {
                    this.removeTextLengthAttribute();
                    const box = this.svgText.getBBox();
                    const pathLen = this.svgPath.getTotalLength();
                    this.svgTextPath.setAttribute("startOffset", `${pathLen - box.width}`);
                }
                else if (this.pathTextAlignment == pathTextAlighnment.center) {
                    this.removeTextLengthAttribute();
                    const box = this.svgText.getBBox();
                    const pathLen = this.svgPath.getTotalLength();
                    const offset = (pathLen - box.width) / 2;
                    this.svgTextPath.setAttribute("startOffset", `${offset}`);
                    //こっちだとEdgeではおかしくなる
                    //this.svgTextPath.startOffset.baseVal.value = (pathLen - box.width)/2;                    

                }
                else {
                    this.removeTextLengthAttribute();
                    //this.svgText.textLength.baseVal.value = 0;
                }
                const strokeWidth = this.svgPath.getPropertyStyleValue("stroke-width");
                if (strokeWidth != null) {
                    this.svgText.setAttribute("dy", `-${strokeWidth}`);
                } else {
                    this.svgText.setAttribute("dy", "0");
                }

            }
            */
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
        public static create(graph: Graph, option: {
            className?: string, surfaceType?: string,
            beginVertex?: Vertex, endVertex?: Vertex, beginConnectorType?: ConnectorPosition, endConnectorType?: ConnectorPosition,
            incomingInsertIndex?: number, outcomingInsertIndex?: number, text?: string, pathTextAlignment?: pathTextAlighnment
        } = {}): GraphTableSVG.Edge {
            if (option.className == undefined) option.className = graph.defaultEdgeClass;
            if (option.surfaceType == undefined) option.surfaceType = null;
            option.className = option.className != null ? option.className : graph.defaultVertexClass;
            const g = SVG.createGroup(graph.svgGroup, option.className);
            //graph.svgGroup.appendChild(g);

            /*
            const type1 = g.getPropertyStyleValue(Vertex.defaultSurfaceType);
            const type = params.surfaceType != null ? params.surfaceType :
                type1 != null ? type1 : "line";
                */

            const edge = new Edge(graph, g);
            if (option.beginVertex != undefined && option.endVertex != undefined) {
                graph.connect(option.beginVertex, edge, option.endVertex, option);
            }
            if (option.text != undefined) edge.svgTextPath.setTextContent(option.text);
            if (option.pathTextAlignment == undefined) option.pathTextAlignment = pathTextAlighnment.center;
            edge.pathTextAlignment = option.pathTextAlignment;
            return edge;
        }
        public setIndexDictionaryForVBA(vertexDic: { [key: string]: number; }, edgeDic: { [key: string]: number; }) {
            if (this.controlPoint.length == 0) {
                edgeDic[this.objectID] = Object.keys(edgeDic).length;
            } else if (this.controlPoint.length > 0) {
                //edgeDic[this.objectID] = Object.keys(edgeDic).length;
                for (let i = 0; i < this.VBAConnectorNumber; i++) {
                    vertexDic[`${this.objectID}_${i}`] = Object.keys(vertexDic).length;
                }
                for (let i = 0; i <= this.VBAConnectorNumber; i++) {
                    edgeDic[`${this.objectID}_${i}`] = Object.keys(edgeDic).length;
                }

            }

        }
        public VBAConnectorNumber = 1;


        private static markerCounter: number = 0;
        /**
         * 矢印オブジェクトを作成します。
         */
        private static createMark(option: { className?: string, strokeWidth?: string, color?: string, isEnd?: boolean } = {}): SVGMarkerElement {
            var [marker, path] = GraphTableSVG.SVG.createMarker(option);
            if (option.isEnd != undefined && option.isEnd) {
                path.setAttribute("transform", "rotate(180,5,5)");
                marker.setAttribute("refX", "0");
            }
            marker.id = `marker-${PPEdge.markerCounter++}`;
            return marker;
        }
        public static createStartMarker(option: { className?: string, strokeWidth?: string, color?: string } = {}): SVGMarkerElement {
            const option2 = { className: option.className, strokeWidth: option.strokeWidth, color: option.color, isEnd: true };
            return this.createMark(option2);

        }
        public static createEndMarker(option: { className?: string, strokeWidth?: string, color?: string } = {}): SVGMarkerElement {
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