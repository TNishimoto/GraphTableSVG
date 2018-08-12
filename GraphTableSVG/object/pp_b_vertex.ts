namespace GraphTableSVG {

    export class PPVertex extends PPTextBox {
        protected setClassNameOfSVGGroup() {
            const parent = this.svgGroup.parentElement;
            if (parent instanceof SVGElement) {
                const className = parent.getPropertyStyleValue(GraphTableSVG.PPGraph.defaultVertexClass);
                if (className != null) {
                    this.svgGroup.setAttribute("class", className);
                }
            }
        }

        /**
        * 接続部分のXY座標を返します。
        * @param type
        * @param x
        * @param y
        */
        public getLocation(type: ConnectorPosition, x: number, y: number): [number, number] {
            return [this.cx, this.cy];
        }

        /**
         * 与えられた位置から伸びた辺に対応する接続位置を返します。
         * @param type 
         * @param x 
         * @param y 
         */
        public getConnectorType(type: ConnectorPosition, x: number, y: number): ConnectorPosition {
            if (type == ConnectorPosition.Auto) {
                return this.getAutoPosition(x, y);
            } else {
                return type;
            }
        }
        /**
         * 与えられた位置から伸びた辺に対応する接続位置がAutoだったときの実際の接続位置を返します。
         * @param x 
         * @param y 
         */
        protected getAutoPosition(x: number, y: number): ConnectorPosition {
            return ConnectorPosition.Top;

        }

        /**
        入辺配列を返します。
        */
        get outcomingEdges(): PPEdge[] {
            const p = <number[]>JSON.parse(this.svgGroup.gtGetAttribute("outcoming-edges", "[]"));
            const p2 = p.map((v) => PPObject.getObjectFromObjectID(v.toString()));
            return <PPEdge[]>p2;
        }

        /*
        set outcomingEdges(edges : PPEdge[]) {
            const mes = edges.map((v)=>v.objectID).join(",");
            this.svgGroup.setAttribute("outcoming-edges", mes);
        }
        */

        /**
        出辺配列を返します。
        */
        get incomingEdges(): PPEdge[] {
            const p = <number[]>JSON.parse(this.svgGroup.gtGetAttribute("incoming-edges", "[]"));
            const p2 = p.map((v) => PPObject.getObjectFromObjectID(v.toString()));
            return <PPEdge[]>p2;

        }
        /*
        set incomingEdges(edges : PPEdge[]) {
            const mes = edges.map((v)=>v.objectID).join(",");
            this.svgGroup.setAttribute("incoming-edges", mes);
        }
        */

        /**
         * 出辺を挿入します。
         * @param edge
         * @param insertIndex
         */
        public insertOutcomingEdge(edge: PPEdge, insertIndex: number = this.outcomingEdges.length) {
            const p = this.outcomingEdges.indexOf(edge);
            if (p != -1) {
                throw new Error();
            } else {
                const edges = this.outcomingEdges;
                edges.splice(insertIndex, 0, edge);
                const newEdges = JSON.stringify(edges.map((v) => Number(v.objectID)));
                this.svgGroup.setAttribute("outcoming-edges", newEdges);

                if (edge.beginVertex != this) {
                    edge.beginVertex = this;
                }
            }

        }
        /**
         * 出辺を削除します。
         * @param edge
         */
        public removeOutcomingEdge(edge: PPEdge) {
            const p = this.outcomingEdges.indexOf(edge);
            if (p != null) {
                const edges = this.outcomingEdges;
                edges.splice(p, 1);
                const newEdges = JSON.stringify(edges.map((v) => Number(v.objectID)));
                this.svgGroup.setAttribute("outcoming-edges", newEdges);


                if (edge.beginVertex == this) {
                    edge.beginVertex = null;
                }
            }
        }
        /**
        * 入辺を挿入します。
        * @param edge
        * @param insertIndex
        */
        public insertIncomingEdge(edge: PPEdge, insertIndex: number = this.incomingEdges.length) {
            const p = this.incomingEdges.indexOf(edge);
            if (p != -1) {
                throw new Error();
            } else {
                const edges = this.incomingEdges;
                edges.splice(insertIndex, 0, edge);
                const newEdges = JSON.stringify(edges.map((v) => Number(v.objectID)));

                this.svgGroup.setAttribute("incoming-edges", newEdges);
                if (edge.endVertex != this) {
                    edge.endVertex = this;
                }
            }
        }
        /**
         * 入辺を削除します。
         * @param edge
         */
        public removeIncomingEdge(edge: PPEdge) {
            const p = this.incomingEdges.indexOf(edge);
            if (p != null) {
                const edges = this.incomingEdges;
                edges.splice(p, 1);
                const newEdges = JSON.stringify(edges.map((v) => Number(v.objectID)));
                this.svgGroup.setAttribute("incoming-edges", newEdges);


                if (edge.endVertex == this) {
                    edge.endVertex = null;
                }
            }
        }
        public dispose() {
            while (this.incomingEdges.length > 0) {
                this.removeIncomingEdge(this.incomingEdges[0]);
            }

            while (this.outcomingEdges.length > 0) {
                this.removeOutcomingEdge(this.outcomingEdges[0]);
            }

        }
        /**
        * 親Vertex配列を返します。
        */
        public getParents(): PPVertex[] {
            return this.incomingEdges.filter((v) => v.beginVertex != null).map((v) => <PPVertex>v.beginVertex);
        }
        /**
        親との間の辺を返します。
        */
        get parentEdge(): PPEdge | null {
            if (this.incomingEdges.length == 0) {
                return null;
            } else {
                return this.incomingEdges[0];
            }
        }
        /**
        このVertexの親を返します。
        */
        get parent(): PPVertex | null {
            if (this.parentEdge == null) {
                return null;
            } else {
                return this.parentEdge.beginVertex;
            }
        }
        /**
        このVertexに親がいないときTrueを返します。
        */
        get isNoParent(): boolean {
            return this.parent == null;
        }

        /**
        出辺配列を返します。
        */
        public get children(): PPVertex[] {
            return this.outcomingEdges.filter((v) => v.endVertex != null).map((v) => <PPVertex>v.endVertex);
        }

        /**
        このVertexが葉のときTrueを返します。
        */
        get isLeaf(): boolean {
            return this.outcomingEdges.length == 0;
        }
        /**
         * このVertexを頂点とする仮想部分木を作成します。
         */
        get tree(): PPVirtualSubTree {
            return new PPVirtualSubTree(this);
        }
        /**
        このVertexの領域を返します。
        */
        get region(): Rectangle {
            const p = new Rectangle();
            p.x = this.cx - (this.width / 2);
            p.y = this.cy - (this.height / 2);
            p.width = this.width;
            p.height = this.height;
            return p;
        }
    }

}