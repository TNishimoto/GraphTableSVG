namespace GraphTableSVG {

    /**
    グラフを表します。
    */
    export class PPGraph extends PPObject {
        public static readonly defaultVertexClass: string = "--default-vertex-class";
        public static readonly defaultEdgeClass: string = "--default-edge-class";
        public static readonly vertexXIntervalName: string = "--vertex-x-interval";
        public static readonly vertexYIntervalName: string = "--vertex-y-interval";

        //public static readonly objectIDName: string = "data-objectID";
        public static readonly typeName: string = "data-type";


        public get vertices(): PPVertex[] {
            const r: PPVertex[] = [];
            HTMLFunctions.getChildren(this.svgGroup).filter((v) => v.hasAttribute(GraphTableSVG.SVG.objectIDName)).forEach((v) => {
                const item = PPObject.getObjectFromObjectID(v.getAttribute(GraphTableSVG.SVG.objectIDName))
                if (item instanceof PPVertex) {
                    r.push(item);
                }
            })
            return r;
        }
        public get edges(): PPEdge[] {
            const r: PPEdge[] = [];
            HTMLFunctions.getChildren(this.svgGroup).filter((v) => v.hasAttribute(GraphTableSVG.SVG.objectIDName)).forEach((v) => {
                const item = PPObject.getObjectFromObjectID(v.getAttribute(GraphTableSVG.SVG.objectIDName))
                if (item instanceof PPEdge) {
                    r.push(item);
                }
            })
            return r;
        }
        public get roots(): PPVertex[] {
            return this.vertices.filter((v) => v.incomingEdges.length == 0);
        }

        protected _roots: PPVertex[] = [];
        constructor(box: SVGElement | string, option: TextBoxShapeAttributes = {}) {
            super(box, option)

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
        get rootVertex(): PPVertex | null {
            if (this.roots.length == 0) {
                return null;
            } else {
                return this.roots[0];
            }
        }

        /**
         * 頂点もしくは辺をグラフに追加します。
         * @param item
         */
        public add(item: PPVertex | PPEdge): void {
            if (item instanceof PPVertex) {
                this.svgGroup.insertBefore(item.svgGroup, this.svgGroup.firstChild);
            } else {
                this.svgGroup.appendChild(item.svgGroup);
            }
        }
        /**
         * 頂点もしくは辺を削除します。
         * @param item
         */
        public remove(item: PPVertex | PPEdge): void {
            this.svgGroup.removeChild(item.svgGroup);
            item.dispose();
        }
        public clear() {
            while (this.edges.length > 0) {
                this.remove(this.edges[0]);
            }
            while (this.vertices.length > 0) {
                this.remove(this.vertices[0]);
            }
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
        public connect(beginVertex: PPVertex, edge: PPEdge, endVertex: PPVertex, option: ConnectOption = {}) {
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
            if (option.endConnectorType != undefined) edge.endConnectorType = option.endConnectorType;
        }
        public getOrderedVertices(order: VertexOrder, node: PPVertex | null = null): PPVertex[] {
            const r: PPVertex[] = [];
            if (node == null) {
                this.roots.forEach((v) => {
                    this.getOrderedVertices(order, v).forEach((w) => {
                        r.push(w);
                    });
                });
            } else {
                const edges = node.outcomingEdges;
                if (order == VertexOrder.Preorder) {
                    r.push(node);
                    edges.forEach((v) => {
                        this.getOrderedVertices(order, v.endVertex).forEach((w) => {
                            r.push(w);
                        });
                    });

                } else if (order == VertexOrder.Postorder) {
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
    }





}