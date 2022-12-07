/// <reference path="z_textbox.ts"/>
//namespace GraphTableSVG {
import { VBATranslateFunctions } from "../common/vba_functions"
import { Rectangle } from "../common/vline"
import * as AttributeNames from "../common/attribute_names"
import * as DefaultClassNames from "../common/default_class_names"
import { ConnectorType, msoDashStyle, VBAShapeType } from "../common/enums";
import { ZObject } from "./z_object"
//import { ZTextBox } from "./z_textbox"
import { ZEdge } from "./z_edge"
//import { ZGraph } from "./g_graph"
import { VirtualTree } from "./graph_helpers/virtual_tree"
import {getLineType} from "../html/enum_extension";
import * as ElementExtension from "../interfaces/element_extension"
import { getGraph } from "./graph_helpers/common_functions";
import { ZAbstractEdge } from "./z_abstract_edge";
import { HTMLFunctions } from "../html";
import { LocalZObjectManager } from "./global_gobject_manager";



export class ZVertex extends ZObject {
    /*
    protected setClassNameOfSVGGroup() {
        const parent = this.svgGroup.parentElement;
        if (parent instanceof SVGElement) {
            const className = GraphTableSVG.AttributeNames.StyleValue.defaultVertexClass;
            if (className != null && !this.svgGroup.hasAttribute("class") ) {
                this.svgGroup.setAttribute("class", className);
            }
        }
    }
    */

    public get defaultClassName(): string | undefined {
        return DefaultClassNames.defaultVertexClass;
    }
    /**
    * 接続部分のXY座標を返します。
    * @param type
    * @param x
    * @param y
    */
    public getContactPosition(type: ConnectorType, x: number, y: number): [number, number] {
        return [this.cx, this.cy];
    }

    /**
     * 与えられた位置から伸びた辺に対応する接続位置を返します。
     * @param type 
     * @param x 
     * @param y 
     */
    public getConnectorType(type: ConnectorType, x: number, y: number): ConnectorType {
        if (type == ConnectorType.Auto) {
            return this.getContactAutoPosition(x, y);
        } else {
            return type;
        }
    }
    /**
     * 与えられた位置から伸びた辺に対応する接続位置がAutoだったときの実際の接続位置を返します。
     * @param x 
     * @param y 
     */
    public getContactAutoPosition(x: number, y: number): ConnectorType {
        return ConnectorType.Top;

    }

    public tryGetSVGText(): SVGTextElement | null {
        return null;
    }

    public update() {
        /*
        if(this.getUpdateFlag()){
        }
        */
       /*
        this.incomingEdges.forEach((v) =>{
            v.resetUnstableCounter();
        })
        this.outcomingEdges.forEach((v) =>{
            v.resetUnstableCounter();
        })
        */
    


        super.update();
    }


    /**
    入辺配列を返します。
    */
    get outgoingEdges(): ZAbstractEdge[] {
        const svgsvg = HTMLFunctions.getSVGSVGAncestor(this.svgGroup);
        if(svgsvg != null){
            const manager : LocalZObjectManager | undefined = (<any>svgsvg)._manager;
            if(manager != undefined){
                const arr = manager.getOutgoingEdges(this);
                if(arr == null){
                    return new Array(0);
                }else{
                    return arr.map((v) => <ZAbstractEdge>v);
                }
            }
        }
        return new Array(0);
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
    get incomingEdges(): ZAbstractEdge[] {
        const svgsvg = HTMLFunctions.getSVGSVGAncestor(this.svgGroup);
        if(svgsvg != null){
            const manager : LocalZObjectManager | undefined = (<any>svgsvg)._manager;
            if(manager != undefined){
                const arr = manager.getIncmoingEdges(this);
                if(arr == null){
                    return new Array(0);
                }else{
                    return arr.map((v) => <ZAbstractEdge>v);
                }
            }
        }
        return new Array(0);



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
    /*
    public insertOutcomingEdge(edge: ZAbstractEdge, insertIndex: number = this.outgoingEdges.length) {
        return new Array(0);
    }
    */
    public dispose() {
        
        /*
        while (this.incomingEdges.length > 0) {
            this.removeIncomingEdge(this.incomingEdges[0]);
        }

        while (this.outgoingEdges.length > 0) {
            this.removeOutcomingEdge(this.outgoingEdges[0]);
        }
        */

    }
    /**
    * 親Vertex配列を返します。
    */
    public getParents(): ZVertex[] {
        return this.incomingEdges.filter((v) => v.beginVertex != null).map((v) => <ZVertex>v.beginVertex);
    }
    /**
    親との間の辺を返します。
    */
    get parentEdge(): ZAbstractEdge | null {
        if (this.incomingEdges.length == 0) {
            return null;
        } else {
            return this.incomingEdges[0];
        }
    }
    /**
    このVertexの親を返します。
    */
    get parent(): ZVertex | null {
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
    public get children(): ZVertex[] {
        return this.outgoingEdges.filter((v) => v.endVertex != null).map((v) => <ZVertex>v.endVertex);
    }

    /**
    このVertexが葉のときTrueを返します。
    */
    get isLeaf(): boolean {
        return this.outgoingEdges.length == 0;
    }
    /**
     * このVertexを頂点とする仮想部分木を作成します。
     */
    //get tree(): VirtualTree {
    //    return new VirtualTree(this);
    //}

    createVirtualTree(excludedEdgeDic?: Set<ZAbstractEdge>): VirtualTree {
        return new VirtualTree(this, excludedEdgeDic);
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
    protected get globalX(): number {
        if(this.graph != null){
            return this.graph.x + this.x;
        }else{
            return this.x;
        }
    }
    protected get globalY(): number {
        if(this.graph != null){
            return this.graph.y + this.y;
        }else{
            return this.y;
        }
    }

    public get shape(): VBAShapeType {
        return VBAShapeType.None;
    }
    /**
             * 
             * @param id 
             */
    public createVBACode(id: number): string[] {
        const lines: string[] = [];
        
        const backColor = VBATranslateFunctions.colorToVBA(ElementExtension.getPropertyStyleValueWithDefault(this.svgSurface!, "fill", "gray"));
        const visible = ElementExtension.getPropertyStyleValueWithDefault(this.svgSurface!, "visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";

        lines.push(`Sub create${id}(createdSlide As slide)`);
        lines.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
        lines.push(` Dim obj As Shape`);
        lines.push(` Set obj = shapes_.AddShape(${this.shape}, ${this.globalX}, ${this.globalY}, ${this.width}, ${this.height})`);
        

        const svgText = this.tryGetSVGText();
        if(svgText != null)VBATranslateFunctions.TranslateSVGTextElement2(svgText, `obj.TextFrame.TextRange`).forEach((v) => lines.push(v));
        lines.push(this.getVBAEditLine());

        lines.push(` Call EditCallOut(obj, "${this.objectID}", ${visible}, ${backColor})`)
        this.VBAAdjustments.forEach((v, i) => {
            lines.push(` obj.Adjustments.Item(${i + 1}) = ${v}`);
        })
        lines.push(`End Sub`);
        
        return lines;
    }
    /**
     * VBAコードでのこの図形を表すShape図形のVBAAdjustmentsプロパティを表します。
     */
    protected get VBAAdjustments(): number[] {
        return [];
    }
    protected getVBAEditLine(): string {
        const lineColor = VBATranslateFunctions.colorToVBA(ElementExtension.getPropertyStyleValueWithDefault(this.svgSurface!, "stroke", "gray"));
        const lineType = getLineType(this.svgSurface!);
        const strokeWidth = parseInt(ElementExtension.getPropertyStyleValueWithDefault(this.svgSurface!, "stroke-width", "4"));
        const visible = ElementExtension.getPropertyStyleValueWithDefault(this.svgSurface!, "visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
        return ` Call EditLine(obj.Line, ${lineColor}, ${lineType}, ${0}, ${strokeWidth}, ${visible})`;
    }

    public get graph(): ZObject | null {
        return getGraph(this);
    }

    public updateSurfaceWithoutSVGText() : boolean{
        super.updateSurfaceWithoutSVGText();
        this.incomingEdges.forEach((e) =>{
            e.update();
        })
        this.outgoingEdges.forEach((e) =>{
            e.update();
        })
        return true;
    }

}

//}