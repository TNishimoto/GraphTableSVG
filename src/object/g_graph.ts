//namespace GraphTableSVG {
    import {GObject} from "./g_object"
    import {GTextBoxAttributes} from "./g_textbox"
    import {GVertex} from "./g_vertex"
    import {GEdge} from "./g_edge"
    import {Rectangle} from "../basic/common/vline"
    //import {  ConnectorPosition, msoDashStyle} from "../common/enums";    
    import {HTMLFunctions} from "../basic/svghtml/html_functions"
    import {SVG} from "../basic/svghtml/svg"
    import { CustomAttributeNames } from "../basic/common/custtome_attributes"
    import { ShapeObjectType, VertexOrder, PathTextAlighnment, ConnectorPosition } from "../basic/common/enums";
    import { createShape, createVertex } from "../options/open_svg";
    import { SVGTextBox } from "../basic/svghtml/svg_textbox";
    
    //import {GObjectAttributes, GTextBoxAttributes, ConnectOption} from "../options/attributes_option"
    import {LogicTree, LogicGraph} from "../options/logic_tree"
import { GraphArrangement } from "./graph_arrangement"

    export type ConnectOption = {
        outcomingInsertIndex?: number,
        incomingInsertIndex?: number,
        beginConnectorType?: ConnectorPosition,
        endConnectorType?: ConnectorPosition
    }

    /**
    グラフを表します。
    */
    export class GGraph extends GObject {

        constructor(box: SVGElement | string, option: GTextBoxAttributes = {}) {
            super(box, option)
            if (this.type == ShapeObjectType.Graph) this.firstFunctionAfterInitialized();
            //this.svgGroup.addEventListener(CustomAttributeNames.objectCreatedEventName, this.objectCreatedFunction);
        }

        public get vertices(): GVertex[] {
            const r: GVertex[] = [];
            HTMLFunctions.getChildren(this.svgGroup).filter((v) => v.hasAttribute(CustomAttributeNames.objectIDName)).forEach((v) => {
                const item = GObject.getObjectFromObjectID(v.getAttribute(CustomAttributeNames.objectIDName)!)
                if (item instanceof GVertex) {
                    r.push(item);
                }
            })
            return r;
        }
        public get edges(): GEdge[] {
            const r: GEdge[] = [];
            HTMLFunctions.getChildren(this.svgGroup).filter((v) => v.hasAttribute(CustomAttributeNames.objectIDName)).forEach((v) => {
                const item = GObject.getObjectFromObjectID(v.getAttribute(CustomAttributeNames.objectIDName)!)
                if (item instanceof GEdge) {
                    r.push(item);
                }
            })
            return r;
        }
        public get roots(): GVertex[] {
            return this.vertices.filter((v) => v.incomingEdges.length == 0);
        }

        protected _roots: GVertex[] = [];
        public get vertexXInterval(): number | null {
            const v = this.svgGroup.getPropertyStyleValue(CustomAttributeNames.Style.vertexXInterval);
            if (v == null) {
                return null;
            } else {
                return parseInt(v);
            }
        }
        public set vertexXInterval(value: number | null) {
            this.svgGroup.setPropertyStyleValue(CustomAttributeNames.Style.vertexXInterval, value == null ? null : value.toString());
        }
        public get vertexYInterval(): number | null {
            const v = this.svgGroup.getPropertyStyleValue(CustomAttributeNames.Style.vertexYInterval);
            if (v == null) {
                return null;
            } else {
                return parseInt(v);
            }
        }
        public set vertexYInterval(value: number | null) {
            this.svgGroup.setPropertyStyleValue(CustomAttributeNames.Style.vertexYInterval, value == null ? null : value.toString());
        }
        /*
        get defaultVertexClass(): string | null {
            return this.svgGroup.getPropertyStyleValue(CustomAttributeNames.Style.defaultVertexClass);
        }
        set defaultVertexClass(value: string | null) {
            this.svgGroup.setPropertyStyleValue(CustomAttributeNames.Style.defaultVertexClass, value);
        }
        */

        /*
         get defaultEdgeClass(): string | null {
             return this.svgGroup.getPropertyStyleValue(CustomAttributeNames.Style.defaultEdgeClass);
         }
         */
        /*
         set defaultEdgeClass(value: string | null) {
             this.svgGroup.setPropertyStyleValue(CustomAttributeNames.Style.defaultEdgeClass, value);
         }
         */
        /**
        根を返します。
        */
        get rootVertex(): GVertex | null {
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
        public add(item: GVertex | GEdge): void {
            if (item instanceof GVertex) {
                this.svgGroup.insertBefore(item.svgGroup, this.svgGroup.firstChild);
            } else {
                this.svgGroup.appendChild(item.svgGroup);
            }
        }
        /**
         * 頂点もしくは辺を削除します。
         * @param item
         */
        public remove(item: GVertex | GEdge): void {
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
        public connect(beginVertex: GVertex, edge: GEdge, endVertex: GVertex, option: ConnectOption = {}) {

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
        public getOrderedVertices(order: VertexOrder, node: GVertex | null = null): GVertex[] {
            const r: GVertex[] = [];
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

        /**
         * 親ノードに子ノードを追加します。
         * @param parent 
         * @param child 
         * @param option 
         */
        public appendChild(parent: GVertex, child: GVertex | null, option: { insertIndex?: number } = {}) {
            const _child = child == null ? createVertex(this) : child;
            const edge: GEdge = <any>createShape(this, 'g-edge');
            this.connect(parent, edge, _child, { beginConnectorType: "bottom", endConnectorType: "top" });
            //this.createdNodeCallback(child);
            this.relocate();

        }
        public get relocateStyle(): string | null {
            return this.svgGroup.getPropertyStyleValue(CustomAttributeNames.Style.relocateName)
        }
        public set relocateStyle(value: string | null) {
            this.svgGroup.setPropertyStyleValue(CustomAttributeNames.Style.relocateName, value);
        }


        public relocate() {
            const value = this.relocateStyle;
            if (value != null) {
                if(value == "standard"){
                    GraphArrangement.standardTreeWidthArrangement(this);
                }else{
                    const p = Function("v", `return ${value}(v)`);
                    const f = <any>Function("graph", `${value}(graph)`);
                    f(this);    
                }
            }
            //this.relocate();
            //this.moveInCanvas();


        }
        get width(): number {
            return this.Noderegion().width;
        }

        get height(): number {
            return this.Noderegion().height;
        }
        set width(value: number) {
        }
        set height(value: number) {
        }
        public Noderegion(): Rectangle {
            const _x = this.svgGroup.getX();
            const _y = this.svgGroup.getY();
            let left = _x;
            let right = _y;
            let top = _x;
            let bottom = _y;
            this.vertices.forEach((v) => {
                const x = v.x + _x;
                const y = v.y + _y;
                if (x < left) left = x;
                if (right < (x + v.width)) right = x + v.width;
                if (y < top) top = y;
                if (bottom < (y + v.height)) bottom = y + v.height;

            })
            return new Rectangle(left, top, right - left, bottom - top);
        }

        public moveInCanvas() {

            const rect = this.Noderegion();
            if (rect.x < 0) {
                this.x = this.x - (rect.x);
            }
            if (rect.y < 0) {
                this.y = this.y - (rect.y);
            }
        }

        public build(graph: LogicGraph | LogicTree, option: { x?: number, y?: number, isLatexMode?: boolean, relocateStyle? : string } = {}) {
            if (option.isLatexMode == undefined) option.isLatexMode = false;
            this.clear();
            const svgsvg = SVG.getSVGSVG(this.svgGroup);


            if (graph instanceof LogicGraph) {
                const dic: Map<number, GVertex> = new Map();

                graph.nodes.forEach((v, i) => {
                    const node = createShape(svgsvg, "g-ellipse")
                    node.svgText.textContent = v.text;
                    this.add(node);
                    dic.set(i, node);
                })
                graph.nodes.forEach((v, i) => {
                    v.outputEdges.forEach((e, j) => {
                        const edge = createShape(svgsvg, "g-edge")
                        if (e.text != undefined) {
                            const b = option.isLatexMode == undefined ? false : option.isLatexMode;
                            edge.svgTextPath.setTextContent(e.text, b);

                        }
                        this.add(edge);
                        const beginNode = dic.get(i);
                        const endNode = dic.get(e.endNodeIndex);
                        if (beginNode == undefined || endNode == undefined) throw Error("error");
                        this.connect(beginNode, edge, endNode);
                    })
                })
            } else {
                const dic: Map<LogicTree, GVertex> = new Map();

                graph.getOrderedNodes(VertexOrder.Preorder).forEach((v, i) => {
                    const node = createShape(svgsvg, "g-ellipse")
                    node.svgText.textContent = v.vertexText;
                    this.add(node);
                    dic.set(v, node);
                })
                graph.getOrderedNodes(VertexOrder.Preorder).forEach((v, i) => {
                        v.children.forEach((e, j) => {
                            if(e != null){
                                const edge = createShape(svgsvg, "g-edge")
                                if (e.parentEdgeText != null) {
                                    const b = option.isLatexMode == undefined ? false : option.isLatexMode;
                                    edge.svgTextPath.setTextContent(e.parentEdgeText, b);
                                    edge.isAppropriatelyReverseMode =  true;
                                    //edge.setAppropriateText();
        
                                }
                                this.add(edge);
                                const beginNode = dic.get(v);
                                const endNode = dic.get(e);
                                if (beginNode == undefined || endNode == undefined) throw Error("error");
                                this.connect(beginNode, edge, endNode);
                            }
                        
                    })
                })
            }
            if(option.relocateStyle !== undefined){
                this.relocateStyle = option.relocateStyle;
            }else{
                this.relocateStyle = "standard"
            }

            //this.x = 200;
            //this.y = 200;

            if (option.x != undefined) this.svgGroup.setX(option.x);
            if (option.y != undefined) this.svgGroup.setY(option.y);

        }

        /**
        * LogicTreeから木を構築します。
        * @param roots 
        * @param isLatexMode 
        */
        public constructFromLogicTree(roots: LogicTree[] | LogicTree, option: { x?: number, y?: number, isLatexMode?: boolean } = {}) {
            if (option.isLatexMode == undefined) option.isLatexMode = false;
            if (roots instanceof Array) {
                this.clear();
                roots.forEach((v) => {
                    if (v != null) {
                        this.createChildFromLogicTree(null, v, option);
                    }
                });
                this.relocate();

            } else {
                this.constructFromLogicTree([roots], option);
            }
            if (option.x != undefined) this.svgGroup.setX(option.x);
            if (option.y != undefined) this.svgGroup.setY(option.y);

            //this.roots = roots;
        }
        removeGraph(svg: SVGElement) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        }
        /**
         * グラフの領域を表すRectangleを返します。位置の基準はグラフが追加されているNodeです。
         */
        public getRegion(): Rectangle {
            const rects = this.vertices.map((v) => v.region);
            const rect = Rectangle.merge(rects);
            rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
            return rect;
        }
        /**
         * 入力のVertexを親として、入力のLogicTreeを子とした部分木を作成します。
         * @param parent 親にするVertex
         * @param logicVertex 子にするLogicTree
         * @param option 作成オプション
         * @returns logicVertexを表すVertex
         */
        private createChildFromLogicTree<T>(parent: GVertex | null = null, logicVertex: LogicTree, option: { isLatexMode?: boolean } = {}): GVertex {
            if (option.isLatexMode == undefined) option.isLatexMode = false;

            const node: GVertex = <any>createVertex(this, { class: logicVertex.vertexClass == null ? undefined : logicVertex.vertexClass });
            if (logicVertex.vertexText != null) SVGTextBox.setTextToSVGText(node.svgText, logicVertex.vertexText, option.isLatexMode);
            if (parent != null) {
                const edge: GEdge = createShape(this, 'g-edge', { class: logicVertex.parentEdgeClass! });
                if (logicVertex.parentEdgeText != null) {
                    edge.svgTextPath.setTextContent(logicVertex.parentEdgeText, option.isLatexMode);
                    edge.pathTextAlignment = PathTextAlighnment.regularInterval;
                    //edge.svgText.setTextContent(tree.edgeLabel, isLatexMode);
                }
                this.connect(parent, edge, node, { beginConnectorType: "bottom", endConnectorType: "top" });
            } else {
                this.roots.push(node);
            }
            logicVertex.children.forEach((v) => {
                if (v != null) this.createChildFromLogicTree(node, v, option);
            });
            //this.createdNodeCallback(node);
            return node;
        }

        public createVBACode(id: number): string[] {
            const r: string[] = [];
            this.vertices.forEach((v) => v.createVBACode(id++).forEach((w) => r.push(w)));
            this.edges.forEach((v) => v.createVBACode(id++).forEach((w) => r.push(w)));
            return r;
        }

        public get VBAObjectNum(): number {
            return this.vertices.length + this.edges.length;
        }

        public getStyleValue(className: string, valueName: string): string | null {

            if (this.svgGroup.hasAttribute("class")) {
                const oldClass = this.svgGroup.getAttribute("class")!;
                this.svgGroup.setAttribute("class", className);
                const r = this.svgGroup.getPropertyStyleValue(valueName);
                this.svgGroup.setAttribute("class", oldClass);
                return r;
            } else {
                this.svgGroup.setAttribute("class", className);
                const r = this.svgGroup.getPropertyStyleValue(valueName);
                this.svgGroup.removeAttribute("class");
                return r;
            }
        }
        protected dispatchVertexCreatedEvent(vertex: GVertex): void {
            var event = document.createEvent("HTMLEvents");
            event.initEvent(CustomAttributeNames.vertexCreatedEventName, true, true);
            vertex.svgGroup.dispatchEvent(event);

        }
        private objectCreatedFunction = (e: Event) => {
            const obj = GObject.getObjectFromObjectID(<SVGElement>e.target);
            if (obj instanceof GVertex) {
                this.dispatchVertexCreatedEvent(obj);
            } else if (obj instanceof GEdge) {

            } else {

            }
        }
        public setRootIndex(vertex: GVertex, rootIndex: number) {
            if (vertex.graph == this) {
                if (rootIndex < this.roots.length) {
                    this.svgGroup.insertBefore(vertex.svgGroup, this.roots[rootIndex].svgGroup);
                } else {
                    if (this.roots.length == 0) {
                        if (this.svgGroup.firstChild == null) {
                            this.svgGroup.appendChild(vertex.svgGroup);
                        } else {
                            this.svgGroup.insertBefore(vertex.svgGroup, this.svgGroup.firstChild);
                        }
                    } else {
                        if (this.roots[this.roots.length - 1].svgGroup.nextSibling == null) {
                            this.svgGroup.appendChild(vertex.svgGroup);
                        } else {
                            this.svgGroup.insertBefore(vertex.svgGroup, this.roots[this.roots.length - 1].svgGroup.nextSibling);
                        }
                    }
                }
            } else {
                throw Error("error!");
            }
        }
        protected observerFunction(x: MutationRecord[]) {
            super.observerFunction(x);
            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                if (p.attributeName == "style") {
                    this.relocate();
                }
            }
        }

        public get type(): ShapeObjectType {
            return ShapeObjectType.Graph;
        }
        protected resizeUpdate() {
            this.relocate();
        }
        /*
        public update() {
            super.update();
            
        }
        */

    }





//}