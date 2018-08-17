namespace GraphTableSVG {

    export class GVertex extends GTextBox {
        protected setClassNameOfSVGGroup() {
            const parent = this.svgGroup.parentElement;
            if (parent instanceof SVGElement) {
                const className = parent.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.defaultVertexClass);
                if (className != null && !this.svgGroup.hasAttribute("class") ) {
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
        get outcomingEdges(): GEdge[] {
            const p = <number[]>JSON.parse(<string>this.svgGroup.gtGetAttribute("outcoming-edges", "[]"));
            const p2 = p.map((v) => GObject.getObjectFromObjectID(v.toString()));
            return <GEdge[]>p2;
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
        get incomingEdges(): GEdge[] {
            const p = <number[]>JSON.parse(<string>this.svgGroup.gtGetAttribute("incoming-edges", "[]"));
            const p2 = p.map((v) => GObject.getObjectFromObjectID(v.toString()));
            return <GEdge[]>p2;

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
        public insertOutcomingEdge(edge: GEdge, insertIndex: number = this.outcomingEdges.length) {
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
        public removeOutcomingEdge(edge: GEdge) {
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
        public insertIncomingEdge(edge: GEdge, insertIndex: number = this.incomingEdges.length) {
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
        public removeIncomingEdge(edge: GEdge) {
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
        public getParents(): GVertex[] {
            return this.incomingEdges.filter((v) => v.beginVertex != null).map((v) => <GVertex>v.beginVertex);
        }
        /**
        親との間の辺を返します。
        */
        get parentEdge(): GEdge | null {
            if (this.incomingEdges.length == 0) {
                return null;
            } else {
                return this.incomingEdges[0];
            }
        }
        /**
        このVertexの親を返します。
        */
        get parent(): GVertex | null {
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
        public get children(): GVertex[] {
            return this.outcomingEdges.filter((v) => v.endVertex != null).map((v) => <GVertex>v.endVertex);
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
        get tree(): GVirtualSubTree {
            return new GVirtualSubTree(this);
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
        public get shape(): string {
            return "NONE";
        }
/**
         * 
         * @param id 
         */
        public createVBACode(id: number): string[] {
            const lines: string[] = [];
            const backColor = VBATranslateFunctions.colorToVBA(this.surface!.getPropertyStyleValueWithDefault("fill", "gray"));
            const visible = this.surface!.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";

            const vAnchor = VBATranslateFunctions.ToVerticalAnchor(this.verticalAnchor);
            const hAnchor = VBATranslateFunctions.ToHorizontalAnchor(this.horizontalAnchor);


            lines.push(`Sub create${id}(createdSlide As slide)`);
            lines.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
            lines.push(` Dim obj As Shape`);
            lines.push(` Set obj = shapes_.AddShape(${this.shape}, ${this.x}, ${this.y}, ${this.width}, ${this.height})`);
            lines.push(` Call EditTextFrame(obj.TextFrame, ${this.marginPaddingTop}, ${this.marginPaddingBottom}, ${this.marginPaddingLeft}, ${this.marginPaddingRight}, false, ppAutoSizeNone)`);
            lines.push(` Call EditAnchor(obj.TextFrame, ${vAnchor}, ${hAnchor})`);

            VBATranslateFunctions.TranslateSVGTextElement2(this.svgText, `obj.TextFrame.TextRange`).forEach((v) => lines.push(v));
            //const adjustments = this.VBAAdjustments;
            lines.push(this.getVBAEditLine());

            lines.push(` Call EditCallOut(obj, "${this.objectID}", ${visible}, ${backColor})`)
            this.VBAAdjustments.forEach((v, i) => {
                lines.push(` obj.Adjustments.Item(${i + 1}) = ${v}`);
            })
            lines.push(`End Sub`);
            //sub.push([` Call EditTextEffect(nodes(${i}).TextEffect, ${fontSize}, "${fontFamily}")`]);
            return lines;
        }
        /**
         * VBAコードでのこの図形を表すShape図形のVBAAdjustmentsプロパティを表します。
         */
        protected get VBAAdjustments(): number[] {
            return [];
        }
        private getVBAEditLine(): string {
            const lineColor = VBATranslateFunctions.colorToVBA(this.surface!.getPropertyStyleValueWithDefault("stroke", "gray"));
            const lineType = GraphTableSVG.msoDashStyle.getLineType(this.surface!);
            const strokeWidth = parseInt(this.surface!.getPropertyStyleValueWithDefault("stroke-width", "4"));
            const visible = this.surface!.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
            return ` Call EditLine(obj.Line, ${lineColor}, ${lineType}, ${0}, ${strokeWidth}, ${visible})`;
        }

        public get parentGraph() : GGraph | null{
            const v = this.svgGroup.parentElement;
            if(v != null && v instanceof SVGGElement && v.hasAttribute(CustomAttributeNames.objectIDName)){
                const id = v.getAttribute(CustomAttributeNames.objectIDName)!;
                const obj = GObject.getObjectFromObjectID(id);
                if(obj instanceof GGraph){
                    return obj;
                }
            }
            return null;
        }
    }

}