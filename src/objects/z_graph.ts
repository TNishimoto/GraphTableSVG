//namespace GraphTableSVG {
import { ZObject } from "./z_object"
import { ZVertex } from "./z_vertex"
import { ZEdge } from "./z_edge"
import { ZRect } from "./z_rect"
import { ZRectButton } from "./z_rect_button"

import { ZCallout } from "./z_callout"
import { ZArrowCallout } from "./z_arrow_callout"
import { ZEllipse } from "./z_ellipse"
import { ZCircle } from "./z_circle"
import * as DefaultClassNames from "../common/default_class_names"

import { Rectangle } from "../common/vline"
import * as HTMLFunctions from "../html/html_functions"
import * as SVG from "../interfaces/svg"
import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"
import * as GOptions from "./z_options"

import { ShapeObjectType, VertexObjectType, VertexOrder, PathTextAlighnment, ConnectorType, Direction } from "../common/enums";

import { LogicTree, LogicTreeNode, LogicBasicShape } from "../logics/logic_tree"
import { LogicGraph } from "../logics/logic_graph";

import { GraphArrangement } from "./graph_helpers/graph_arrangement"
import * as ElementExtension from "../interfaces/element_extension"
import * as Extensions from "../interfaces/extensions"
import * as SVGGExtension from "../interfaces/svg_g_extension"
import { ZPathTextBox } from "."
import { LogicTable } from "../logics/logic_table"
import { ZTable } from "./z_table"
import { ArgumentOutOfRangeError } from "../common/exceptions"
import { Exceptions } from "../common"
import { Debugger } from "../common/debugger"




/**
グラフを表します。
*/
export class ZGraph extends ZObject {

    constructor(box: SVGElement | string) {
        super(box)
        if (this.type == ShapeObjectType.Graph) this.firstFunctionAfterInitialized();
        //this.setOptionInGObject(option)
        //this.svgGroup.addEventListener(AttributeNames.objectCreatedEventName, this.objectCreatedFunction);
    }
    protected setBasicOption(option: GOptions.ZGraphAttributes){
        super.setBasicOption(option);
        if (option.isLatexMode == undefined) option.isLatexMode = false;
        if (option.direction !== undefined) {
            this.direction = option.direction;
        }

        if (option.relocateStyle !== undefined) {
            this.relocateStyle = option.relocateStyle;
        } else {
            //this.relocateStyle = "standard"
        }
    }
    
    
    public setOption(option: GOptions.ZGraphAttributes){
        super.setOption(option);
    }
    public get graphAllocateFunction() : GOptions.GraphAllocateFunction | undefined{
        const svg = this.svgGroup;
        const f : any = (<any>svg).__graph_allocate_function;
        return f;
    }
    public set graphAllocateFunction(value : GOptions.GraphAllocateFunction | undefined){
        (<any>this.svgGroup).__graph_allocate_function = value;
    }
    public get isCenterBased() {
        return false;
    }
    public get vertices(): ZVertex[] {
        const r: ZVertex[] = [];
        HTMLFunctions.getChildren(this.svgGroup).filter((v) => v.hasAttribute(AttributeNames.objectIDName)).forEach((v) => {
            const item = ZObject.getObjectFromObjectID(v.getAttribute(AttributeNames.objectIDName)!)
            if (item instanceof ZVertex) {
                r.push(item);
            }
        })
        return r;
    }
    public get edges(): ZEdge[] {
        const r: ZEdge[] = [];
        HTMLFunctions.getChildren(this.svgGroup).filter((v) => v.hasAttribute(AttributeNames.objectIDName)).forEach((v) => {
            const item = ZObject.getObjectFromObjectID(v.getAttribute(AttributeNames.objectIDName)!)
            if (item instanceof ZEdge) {
                r.push(item);
            }
        })
        return r;
    }
    public get roots(): ZVertex[] {
        return this.vertices.filter((v) => v.incomingEdges.length == 0);
    }

    //protected _roots: ZVertex[] = [];
    public get vertexXInterval(): number | null {
        const v = ElementExtension.getPropertyStyleValue(this.svgGroup, StyleNames.vertexXInterval);
        if (v == null) {
            return null;
        } else {
            return parseInt(v);
        }
    }
    public set vertexXInterval(value: number | null) {
        ElementExtension.setPropertyStyleValue(this.svgGroup,StyleNames.vertexXInterval, value == null ? null : value.toString());
    }
    public get vertexYInterval(): number | null {
        const v = ElementExtension.getPropertyStyleValue(this.svgGroup, StyleNames.vertexYInterval);
        if (v == null) {
            return null;
        } else {
            return parseInt(v);
        }
    }
    public get direction(): Direction | null {
        const v = ElementExtension.getPropertyStyleValue(this.svgGroup, StyleNames.graphDirection);
        if (v == null) {
            return null;
        } else {
            if (v == "up") {
                return "up";
            } else if (v == "left") {
                return "left";
            } else if (v == "right") {
                return "right";
            } else {
                return "down";
            }
        }
    }
    public set direction(value: Direction | null) {
        ElementExtension.setPropertyStyleValue(this.svgGroup,StyleNames.graphDirection, value == null ? null : value.toString());
    }



    public set vertexYInterval(value: number | null) {
        ElementExtension.setPropertyStyleValue(this.svgGroup,StyleNames.vertexYInterval, value == null ? null : value.toString());
    }
    /*
    get defaultVertexClass(): string | null {
        return this.svgGroup.getPropertyStyleValue(AttributeNames.Style.defaultVertexClass);
    }
    set defaultVertexClass(value: string | null) {
        this.svgGroup.setPropertyStyleValue(AttributeNames.Style.defaultVertexClass, value);
    }
    */

    /*
     get defaultEdgeClass(): string | null {
         return this.svgGroup.getPropertyStyleValue(AttributeNames.Style.defaultEdgeClass);
     }
     */
    /*
     set defaultEdgeClass(value: string | null) {
         this.svgGroup.setPropertyStyleValue(AttributeNames.Style.defaultEdgeClass, value);
     }
     */
    /**
    根を返します。
    */
    get rootVertex(): ZVertex | null {
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
    public add(item: ZVertex | ZEdge): void {
        if (item instanceof ZEdge) {
            this.svgGroup.appendChild(item.svgGroup);
        } else {
            this.svgGroup.insertBefore(item.svgGroup, this.svgGroup.firstChild);
        }
    }
    /**
     * 頂点もしくは辺を削除します。
     * @param item
     */
    public remove(item: ZVertex | ZEdge): void {
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
    public connect(beginVertex: ZVertex, edge: ZEdge, endVertex: ZVertex, option: GOptions.ConnecterOption = {}) {

        const oIndex = option.outcomingInsertIndex == undefined ? beginVertex.outgoingEdges.length : option.outcomingInsertIndex;
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
    public getOrderedVertices(order: VertexOrder, node: ZVertex | null = null): ZVertex[] {
        const r: ZVertex[] = [];
        if (node == null) {
            this.roots.forEach((v) => {
                this.getOrderedVertices(order, v).forEach((w) => {
                    r.push(w);
                });
            });
        } else {
            const edges = node.outgoingEdges;
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
    /*
    public appendChild(parent: ZVertex, child: ZVertex | null, option: { insertIndex?: number } = {}) {
        const _child = child == null ? ZGraph.createVertex2(this) : child;
        const edge: ZEdge = <any>GGraph.createEdge(this);
        this.connect(parent, edge, _child, { beginConnectorType: "bottom", endConnectorType: "top" });
        //this.createdNodeCallback(child);
        this.relocate();

    }
    */
    public get relocateStyle(): string | null {
        return ElementExtension.getPropertyStyleValue(this.svgGroup, StyleNames.relocateName)
    }
    public set relocateStyle(value: string | null) {
        ElementExtension.setPropertyStyleValue(this.svgGroup, StyleNames.relocateName, value);
    }


    public relocate() {
        //if(this.isDrawnText()){
        this.hasConnectedObserverFunction = false;
        const value = this.relocateStyle;
        if(this.graphAllocateFunction !== undefined){
            this.graphAllocateFunction(this);
        } else if (value != null) {
            if (value == "standard") {
                GraphArrangement.standardTreeWidthArrangement(this);

            } else {
                //const p = Function("v", `return ${value}(v)`);
                const f = <any>Function("graph", `${value}(graph)`);
                f(this);

            }
        }
        //this.relocate();
        //this.moveInCanvas();

        this.hasConnectedObserverFunction = true;

        // }

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
        const _x = SVGGExtension.getX(this.svgGroup);
        const _y = SVGGExtension.getY(this.svgGroup);
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

    public build(logicGraph: LogicGraph | LogicTree ) {
        const option = logicGraph.option;
        if(option ===undefined){
            throw new Exceptions.UndefinedError();
        }
        this.setOption(option);
        //if (option.isLatexMode == undefined) option.isLatexMode = false;
        this.clear();
        const svgsvg = SVG.getSVGSVG(this.svgGroup);
        //if (option.direction !== undefined) {
        //    this.direction = option.direction;
       // }

        

        if (logicGraph instanceof LogicGraph) {
            const dic: Map<number, ZVertex> = new Map();

            logicGraph.nodes.forEach((v, i) => {
                const node = ZGraph.createVertex(svgsvg, ShapeObjectType.Circle)
                const svgText = node.tryGetSVGText();
                if(svgText != null){
                    svgText.textContent = v.text;
                }
                this.add(node);
                dic.set(i, node);
            })
            logicGraph.nodes.forEach((v, i) => {
                v.outputEdges.forEach((e, j) => {
                    const edge = ZGraph.createEdge(svgsvg)
                    if (e.text != undefined) {
                        const b = option.isLatexMode == undefined ? false : option.isLatexMode;
                        Extensions.setTextContent(edge.svgTextPath, e.text, b);

                    }
                    this.add(edge);
                    const beginNode = dic.get(i);
                    const endNode = dic.get(e.endNodeIndex);
                    if (beginNode == undefined || endNode == undefined) throw Error("error");
                    this.connect(beginNode, edge, endNode);
                })
            })
        } else {
    
            const dic: Map<LogicTreeNode, ZVertex> = new Map();
            if(logicGraph.root != null){
                logicGraph.root.getOrderedNodes(VertexOrder.Preorder).forEach((v, i) => {
                    const node = v.shapeObject instanceof LogicTable ? ZGraph.createVertexTable(svgsvg, v.shapeObject) : ZGraph.createVertex(svgsvg, v.shapeObject.shape, v.shapeObject.option)
                    if(this.roots.length == 0) this.roots.push(node);
                    this.add(node);
                    dic.set(v, node);
                })
                logicGraph.root.getOrderedNodes(VertexOrder.Preorder).forEach((v, i) => {
                    v.children.forEach((e, j) => {
                        if (e != null) {
                            const edge = ZGraph.createEdge(svgsvg, e.edgeOption)
                            if (edge.svgTextPath.textContent != null) {    
                                edge.isAppropriatelyReverseMode = true;    
                            }
                            this.add(edge);
                            const beginNode = dic.get(v);
                            const endNode = dic.get(e);

                            if (beginNode == undefined || endNode == undefined) throw Error("error");
                            this.connect(beginNode, edge, endNode);
                        }
    
                    })
                })
    
            }else{
                throw Error("error")
            }
        }
        /*
        if (option.relocateStyle !== undefined) {
            this.relocateStyle = option.relocateStyle;
        } else {
            this.relocateStyle = "standard"
        }

        //this.x = 200;
        //this.y = 200;

        if (option.x != undefined) SVGGExtension.setX(this.svgGroup,option.x);
        if (option.y != undefined) SVGGExtension.setY(this.svgGroup,option.y);
        */

        this.relocate();

    }

   /*
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
    */
    removeGraph(svg: SVGElement) {
        if (svg.contains(this.svgGroup)) {
            svg.removeChild(this.svgGroup);
        }
    }
    /*
    public isDrawnText() :boolean{
        if(this.edges.length == 0){
            return true;
        }else{
            
            const b = this.edges.every((v) => v.isDrawnText());
            return b;
        }
    }
    */
    /**
     * グラフの領域を表すRectangleを返します。位置の基準はグラフが追加されているNodeです。
     */
    public getRegion(): Rectangle {
        const rects = this.vertices.map((v) => v.region);
        const rect = Rectangle.merge(rects);
        rect.addOffset(SVGGExtension.getX(this.svgGroup), SVGGExtension.getY(this.svgGroup));
        return rect;
    }
    /**
     * 入力のVertexを親として、入力のLogicTreeを子とした部分木を作成します。
     * @param parent 親にするVertex
     * @param logicVertex 子にするLogicTree
     * @param option 作成オプション
     * @returns logicVertexを表すVertex
     */
    /*
    private createChildFromLogicTree<T>(parent: ZVertex | null = null, logicVertex: LogicTreeGraph, option: { isLatexMode?: boolean } = {}): ZVertex {
        if (option.isLatexMode == undefined) option.isLatexMode = false;
        const node: ZVertex = <any>GGraph.createVertex2(this, logicVertex.vertexOption);

        if (parent != null) {
            const edge: ZEdge = ZGraph.createEdge(this, logicVertex.edgeOption);
            this.connect(parent, edge, node, { beginConnectorType: "bottom", endConnectorType: "top" });
        } else {
            this.roots.push(node);
        }
        logicVertex.children.forEach((v) => {
            if (v != null) this.createChildFromLogicTree(node, v, option);
        });
        return node;
    }
    */

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
            const r = ElementExtension.getPropertyStyleValue(this.svgGroup, valueName);
            this.svgGroup.setAttribute("class", oldClass);
            return r;
        } else {
            this.svgGroup.setAttribute("class", className);
            const r = ElementExtension.getPropertyStyleValue(this.svgGroup, valueName);
            this.svgGroup.removeAttribute("class");
            return r;
        }
    }
    protected dispatchVertexCreatedEvent(vertex: ZVertex): void {
        var event = document.createEvent("HTMLEvents");
        event.initEvent(AttributeNames.vertexCreatedEventName, true, true);
        vertex.svgGroup.dispatchEvent(event);

    }
    private objectCreatedFunction = (e: Event) => {
        const obj = ZObject.getObjectFromObjectID(<SVGElement>e.target);
        if (obj instanceof ZVertex) {
            this.dispatchVertexCreatedEvent(obj);
        } else if (obj instanceof ZEdge) {

        } else {

        }
    }
    public setRootIndex(vertex: ZVertex, rootIndex: number) {
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
    public update(){
        super.update();

        this.vertices.forEach((v) =>{
            v.update();
        })
        this.edges.forEach((v) =>{
            v.update();
        })

        this.relocate();

    }
    public getUpdateFlag() : boolean {
        const b0 = super.getUpdateFlag();
        const arr1 = this.vertices.map((v) => v.getUpdateFlag());
        const arr2 = this.edges.map((v) => v.getUpdateFlag());

        const b1 = arr1.reduce((x, y) => x  || y, false);
        const b2 = arr2.reduce((x, y) => x  || y, false);

        const b = b0 || b1 || b2;
        if(b){
            Debugger.updateFlagLog(this, this.getUpdateFlag, `getUpdateFlag Type = ${this.type} ID = ${this.objectID}: (b0 = ${b0}, b1 = ${b1}, b2 = ${b2})`)
        }
        return b0 || b1 || b2;


    }

    private static createVertex2(parent: ZGraph, option: GOptions.ZTextBoxAttributes = {}): ZVertex {
        let _parent = parent.svgGroup;
        if (option.class == undefined) option.class = DefaultClassNames.defaultVertexClass;
        const type = typeof (option.class) == "string" ? parent.getStyleValue(option.class, StyleNames.defaultSurfaceType) : null;
        if (type != null) {
            switch (type) {
                case ShapeObjectType.Callout: return new ZCallout(_parent);
                case ShapeObjectType.ArrowCallout: return new ZArrowCallout(_parent);
                case ShapeObjectType.Ellipse: return new ZEllipse(_parent);
                case ShapeObjectType.Circle: return new ZCircle(_parent);
                case ShapeObjectType.Rect: return new ZRect(_parent);
            }
        }
        return new ZEllipse(_parent);

    }
    /*
    public static createVertex(parent: SVGElement | string | ZObject, type: "z-rect-button", option?: GOptions.ZTextBoxAttributes): ZRectButton
    public static createVertex(parent: SVGElement | string | ZObject, type: "z-rect", option?: GOptions.ZTextBoxAttributes): ZRect
    public static createVertex(parent: SVGElement | string | ZObject, type: "z-path-textbox", option?: GOptions.ZTextBoxAttributes): ZPathTextBox
    public static createVertex(parent: SVGElement | string | ZObject, type: "z-ellipse", option?: GOptions.ZTextBoxAttributes): ZEllipse
    public static createVertex(parent: SVGElement | string | ZObject, type: "z-callout", option?: GOptions.ZTextBoxAttributes): ZCallout
    public static createVertex(parent: SVGElement | string | ZObject, type: "z-circle", option?: GOptions.ZTextBoxAttributes): ZCircle
    public static createVertex(parent: SVGElement | string | ZObject, type: "z-arrow-callout", option?: GOptions.ZTextBoxAttributes): ZArrowCallout
    */
    private static getParent(parent: SVGElement | string | ZObject) : SVGElement{
        let _parent: SVGElement;
        if (parent instanceof ZObject) {
            _parent = parent.svgGroup;
        } else if (parent instanceof SVGElement) {
            _parent = parent;
        } else {
            _parent = <any>document.getElementById(parent);
        }
        return _parent;

    }
    public static createVertex(parent: SVGElement | string | ZObject, type: VertexObjectType, option: any = {}): ZVertex {
        const _parent: SVGElement = ZGraph.getParent(parent);

        switch (type) {
            case ShapeObjectType.Callout:
                const call = new ZCallout(_parent);
                call.setOption(option);
                return call;
            case ShapeObjectType.ArrowCallout:
                const arr = new ZArrowCallout(_parent);
                arr.setOption(option);
            case ShapeObjectType.Ellipse:
                const ell = new ZEllipse(_parent);
                ell.setOption(option);
                return ell;
            case ShapeObjectType.Rect:
                const rect = new ZRect(_parent);
                rect.setOption(option);
                return rect;
            case ShapeObjectType.Table:
                const table = new ZTable(_parent);
                table.setOption(option);
                return table;
            case ShapeObjectType.RectButton:
                const rectb = new ZRectButton(_parent);
                rectb.setOption(option);
                return rectb;
            case ShapeObjectType.Circle:
                const circle = new ZCircle(_parent);
                circle.setOption(option);
                return circle;
        }
        throw new ArgumentOutOfRangeError();
    }
    public static createVertexTable(parent: SVGElement | string | ZObject, obj : LogicTable): ZVertex {
        const _parent: SVGElement = ZGraph.getParent(parent);

        const table = new ZTable(_parent);
        table.buildFromLogicTable(obj);
        return table;
    }

    public static createEdge(parent: SVGElement | string | ZObject, option: any = {}): ZEdge {
        const _parent: SVGElement = ZGraph.getParent(parent);
        const edge = new ZEdge(_parent);
        edge.setOption(option);
        return edge;

    }

    public updateSurfaceWithoutSVGText() : boolean{
        //super.updateSurfaceWithoutSVGText();
        
        /*
        this.vertices.forEach((v) =>{
            v.update();
        })
        */
       /*
        this.edges.forEach((v) =>{
            v.update();
        })
        */
        

        this.relocate();
        return true;
    }
}





//}