namespace GraphTableSVG {
    
    /**
    グラフを表します。
    */
    export class Graph {
        public static idCounter: number = 0;
        public static readonly defaultVertexClass: string = "--default-vertex-class";
        public static readonly defaultEdgeClass: string = "--default-edge-class";        
        public static readonly vertexXIntervalName: string = "--vertex-x-interval";
        public static readonly vertexYIntervalName: string = "--vertex-y-interval";        

        public static readonly objectIDName: string = "data-objectID";
        public static readonly typeName: string = "data-type";

        protected _vertices: Vertex[] = new Array(0);
        protected _edges: Edge[] = new Array(0);
        protected _svgGroup: SVGGElement;
        protected _roots: Vertex[] = [];
        constructor(box: HTMLElement, option : {graphClassName?: string} = {}) {
            if(option.graphClassName ==undefined) option.graphClassName = null;
            this._svgGroup = GraphTableSVG.SVG.createGroup(option.graphClassName);
            box.appendChild(this.svgGroup);

            this._svgGroup.setAttribute(Graph.typeName, "graph");

        }
        private updateVertices(): void {
            this._vertices.forEach(function (x) { x.update() });
        }
        private updateEdges(): void {
            this._edges.forEach(function (x) { x.update() });
        }

        public update(): void {
            this.updateVertices();
            this.updateEdges();
        }

        public get x() : number {
            return this.svgGroup.getX();
        }
        public set x(value :number) {
            this.svgGroup.setX(value);
        }
        public get y() : number {
            return this.svgGroup.getY();
        }
        public set y(value :number) {
            this.svgGroup.setY(value);
        }

        public get vertexXInterval(): number | null {
            const v = this.svgGroup.getPropertyStyleValue(Graph.vertexXIntervalName);
            if (v == null) {
                return null;
            } else {
                return parseInt(v);
            }
        }
        public set vertexXInterval(value: number | null) {
            this.svgGroup.setPropertyStyleValue(Graph.vertexXIntervalName, value == null ? null : value.toString());
        }
        public get vertexYInterval(): number | null {
            const v = this.svgGroup.getPropertyStyleValue(Graph.vertexYIntervalName);
            if (v == null) {
                return null;
            } else {
                return parseInt(v);
            }
        }
        public set vertexYInterval(value: number | null) {
            this.svgGroup.setPropertyStyleValue(Graph.vertexYIntervalName, value == null ? null : value.toString());
        }

        /**
        Vertexインスタンスの生成時、この値がインスタンスのクラス名にセットされます。
        */
        get defaultVertexClass(): string | null {
            return this.svgGroup.getPropertyStyleValue(Graph.defaultVertexClass);
        }
        /**
        Vertexインスタンスの生成時のクラス名を設定します。
        */
        set defaultVertexClass(value: string | null) {
            this.svgGroup.setPropertyStyleValue(Graph.defaultVertexClass, value);
        }

        /**
        Edgeインスタンスの生成時、この値がインスタンスのクラス名にセットされます。
        */
        get defaultEdgeClass(): string | null {
            return this.svgGroup.getPropertyStyleValue(Graph.defaultEdgeClass);
        }
        /**
        Edgeインスタンスの生成時のクラス名を設定します。
        */
        set defaultEdgeClass(value: string | null) {
            this.svgGroup.setPropertyStyleValue(Graph.defaultEdgeClass, value);
        }
        /**
        根を返します。
        */
        get rootVertex(): Vertex | null {
            if (this.roots.length == 0) {
                return null;
            } else {
                return this.roots[0];
            }
        }
        /**
        根を設定します。
        */
        set rootVertex(value: Vertex | null) {
            this._roots = [];
            if (value != null) {
                this.roots.push(value);
            }
        }
        /**
        根の配列を返します。
        */
        get roots(): Vertex[] {
            return this._roots;
        }
        /**
        グラフを表すSVGGElementを返します。
        */
        get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        /**
        グラフの頂点を全て返します。
        */
        get vertices(): Vertex[] {
            return this._vertices;
        }
        /**
        グラフの辺を全て返します。
        */
        get edges(): Edge[] {
            return this._edges;
        }
        
        /**
         * 頂点もしくは辺をグラフに追加します。
         * @param item
         */
        public add(item: Vertex | Edge) : void {
            if (item instanceof Vertex) {
                const i = this._vertices.indexOf(item);
                if (i == -1 && item.graph == this) {
                    this._vertices.push(item);
                    this.svgGroup.insertBefore(item.svgGroup, this.svgGroup.firstChild);
                } else {
                    throw Error();
                }

            } else {
                
                const i = this._edges.indexOf(item);
                if (i == -1 && item.graph == this) {
                    this._edges.push(item);
                    this.svgGroup.appendChild(item.svgGroup);
                } else {
                    throw Error();
                }
            }
        }
        /**
         * 頂点もしくは辺を削除します。
         * @param item
         */
        public remove(item: Vertex | Edge): void {
            if (item instanceof Vertex) {
                const p = this.vertices.indexOf(item);
                if (p != -1) {
                    this._vertices.splice(p, 1);
                    this.svgGroup.removeChild(item.svgGroup);
                    item.dispose();
                }
            } else {
                const p = this.edges.indexOf(item);
                if (p != -1) {
                    this._edges.splice(p, 1);
                    this.svgGroup.removeChild(item.svgGroup);
                    item.dispose();
                }
            }
        }
        
        
        public clear() {
            while (this.edges.length > 0) {
                this.remove(this.edges[0]);
            }
            while (this.vertices.length > 0) {
                this.remove(this.vertices[0]);
            }
            this._roots = [];
        }
        
        removeGraph(svg: HTMLElement) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        }
        /**
         * グラフの領域を表すRectangleを返します。位置の基準はグラフが追加されているNodeです。
         */
        public getRegion(): Rectangle {
            const rects = this.vertices.map((v) => v.region);
            const rect = GraphTableSVG.Rectangle.merge(rects);
            rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
            return rect;
        }
        public getObject(child: HTMLElement | SVGElement): Vertex | Edge | null {
            const id = child.getAttribute(GraphTableSVG.Graph.objectIDName);
            if (id != null) {
                return this.getObjectByObjectID(id);
            } else {
                if (child.parentElement != null) {
                    return this.getObject(child.parentElement);
                } else {
                    return null;
                }
            }
            
        }

        /**
         * ObjectIDから頂点もしくは辺を返します。
         * @param id
         */
        public getObjectByObjectID(id: string): Vertex | Edge | null {
            for (let i = 0; i < this.vertices.length; i++) {
                if (this.vertices[i].containsObjectID(id)) {
                    return this.vertices[i];
                }
            }
            return null;
        }
        /**
         * 与えられた二つの頂点と辺を接続します。
         * @param beginVertex 開始節
         * @param edge 接続する辺
         * @param endVertex 終了節
         * @param option 接続オプション
         * @param option.incomingInsertIndex endVertexのincomingEdgeの配列に今回の辺をどの位置に挿入するか
         * @param option.outcomingInsertIndex beginVertexのoutcomingEdgeの配列に今回の辺をどの位置に挿入するか
         * @param option.beginConnectorType beginVertexの接続位置
         * @param option.endConnectorType endVertexの接続位置
         */
        public connect(beginVertex: Vertex, edge: Edge, endVertex: Vertex, 
            option : {outcomingInsertIndex?: number, incomingInsertIndex?: number,
                beginConnectorType?: GraphTableSVG.ConnectorPosition, endConnectorType?: GraphTableSVG.ConnectorPosition} = {}) {
            const oIndex = option.outcomingInsertIndex == undefined ? beginVertex.outcomingEdges.length : option.outcomingInsertIndex;
            const iIndex = option.incomingInsertIndex == undefined ? endVertex.incomingEdges.length : option.incomingInsertIndex;
            //this._connect(node1, edge, node2);

            beginVertex.insertOutcomingEdge(edge, oIndex);
            endVertex.insertIncomingEdge(edge, iIndex);

            const i = this.roots.indexOf(beginVertex);
            const j = this.roots.indexOf(endVertex);
            if (j != -1) {
                if (i == -1) {
                    this.roots[j] = beginVertex;
                } else {
                    this.roots.splice(j, 1);
                }
            }
            if (option.beginConnectorType != undefined) edge.beginConnectorType = option.beginConnectorType;
            if (option.endConnectorType != undefined)edge.endConnectorType = option.endConnectorType;
            /*
            if (!(node1.id in this.outcomingEdgesDic)) {
                this.outcomingEdgesDic[node1.id] = [];
            }
            */
            //node1.outcomingEdges.splice(insertIndex, 0, edge);
            //node2.incomingEdges.push(edge);
        }
        /**
         * 与えられたNodeOrderに従って与えられた頂点を根とした部分木の整列された頂点配列を返します。
         * @param order
         * @param node
         */
        public getOrderedVertices(order: NodeOrder, node: Vertex | null = null): Vertex[] {
            const r: Vertex[] = [];
            if (node == null) {
                this.roots.forEach((v) => {
                    this.getOrderedVertices(order, v).forEach((w) => {
                        r.push(w);
                    });
                });
            } else {
                const edges = node.outcomingEdges;
                if (order == NodeOrder.Preorder) {
                    r.push(node);
                    edges.forEach((v) => {
                        this.getOrderedVertices(order, v.endVertex).forEach((w) => {
                            r.push(w);
                        });
                    });

                } else if (order == NodeOrder.Postorder) {
                    edges.forEach((v) => {
                        this.getOrderedVertices(order, v.endVertex).forEach((w) => {
                            r.push(w);
                        });
                    });
                    r.push(node);
                }
            }
            return r;
        }

        public save() {
            //const id = 0;
            //this.nodes.forEach((v) => v.objectID = id++);
            //this.edges.forEach((v) => v.objectID = id++);
            const ids = this.vertices.map((v) => v.objectID);
            this.svgGroup.setAttribute("node", JSON.stringify(ids));
        }

        public static setXY(text: SVGTextElement, rect: GraphTableSVG.Rectangle, vAnchor: string | null, hAnchor: string | null) {

            let x = rect.x;
            let y = rect.y;
            text.setAttribute('x', x.toString());
            text.setAttribute('y', y.toString());

            const b2 = text.getBBox();

            const dy = b2.y - y;
            const dx = b2.x - x;

            y -= dy;

            if (vAnchor == GraphTableSVG.VerticalAnchor.Middle) {
                y += (rect.height - b2.height) / 2
            } else if (vAnchor == GraphTableSVG.VerticalAnchor.Bottom) {
                y += rect.height - b2.height;
            }

            x -= dx;
            if (hAnchor == GraphTableSVG.HorizontalAnchor.Center) {
                x += (rect.width - b2.width) / 2;
            } else if (hAnchor == GraphTableSVG.HorizontalAnchor.Right) {
                x += rect.width - b2.width;
            }


            text.setAttribute('y', y.toString());
            text.setAttribute('x', x.toString());
        }
        

        public createVBACode(id: number): string[] {
            const dic: { [key: string]: number; } = {};

            this.vertices.forEach((v, i) => dic[v.objectID] = i);
            this.edges.forEach((v, i) => dic[v.objectID] = i);
            const main: string[] = [];
            const sub: string[][] = [];

            const lines = new Array(0);
            lines.push(`Sub create${id}(createdSlide As slide)`);
            lines.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
            lines.push(` Dim nodes(${this.vertices.length}) As Shape`);
            lines.push(` Dim edges(${this.edges.length}) As Shape`);


            this.vertices.forEach((v, i) => v.createVBACode(main, sub, dic));
            this.edges.forEach((v, i) => v.createVBACode(main, sub, dic));
            const [x1, y1] = VBATranslateFunctions.splitCode(sub, `shapes_ As Shapes, nodes() As Shape, edges() As Shape`, `shapes_, nodes, edges`, id);
            lines.push(x1);
            lines.push(`End Sub`);
            lines.push(y1);

            return lines;
        }
        /*
        public setStyleForPNG() {
            this.vertices.forEach((v) => v.setStyleForPNG());
            this.edges.forEach((v) => v.setStyleForPNG());
        }
        */
    }
    


    

}