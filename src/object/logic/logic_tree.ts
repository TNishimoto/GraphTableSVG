﻿/*
export class BaseLogicTree {
    public edgeLabel: string | null = null;
    public nodeText: string | null = null;
}
*/
//import * as Console from "../../options/console"
import { VertexOrder, Direction, PathTextAlighnment } from "../../basic/common/enums"
//import { GTextBoxAttributes } from "../object/g_textbox";
import * as GOptions from "../g_options"

/*
export type LogicTreeOption = {
    x?: number,
    y?: number,
    isLatexMode?: boolean
    relocateStyle?: string
    direction?: Direction | null;
}
*/
export class LogicGraphEdge {
    public text: string | null = null;
    public endNodeIndex: number = -1;
}


export class LogicGraphNode {
    public text: string | null = null;
    public outputEdges: LogicGraphEdge[] = [];

    public addEdge(e: LogicGraphEdge) {
        this.outputEdges.push(e);
    }
}
export class LogicGraph {
    public nodes: LogicGraphNode[] = [];
    public edges: LogicGraphEdge[] = [];
    public graphOption: GOptions.GGraphAttributes = { relocateStyle: "standard", direction: "down" };

    construct(iten: any) {

    }
    addNode(): LogicGraphNode {
        const node = new LogicGraphNode();
        this.nodes.push(node);
        return node;
    }
    createEdge(): LogicGraphEdge {
        const edge = new LogicGraphEdge();
        this.edges.push(edge);
        return edge;
    }
    getIndex(node: LogicGraphNode) {
        return this.nodes.indexOf(node);
    }
}
/**
 * 木構造を表現するクラスです。
 */
export class LogicTree {
    //public vertexText: string | null = null
    //public parentEdgeText: string | null = null
    //public vertexClass: string | null = null
    //public parentEdgeClass: string | null = null
    public children: (LogicTree | null)[] = [];
    public vertexOption: GOptions.GTextBoxAttributes = {};
    public edgeOption: GOptions.GEdgeAttributes = { class: { pathTextAlignment: PathTextAlighnment.regularInterval } };
    public graphOption: GOptions.GGraphAttributes = { relocateStyle: "standard", direction: "down" };

    public item: any = null;
    constructor(option: {
        item?: any, children?: (LogicTree | null)[],
        vertexText?: string, parentEdgeText?: string
    } = {}) {
        if (option.item != undefined) this.item = option.item;
        //if(option.vertexText != undefined) this.vertexText = option.vertexText;
        //if(option.parentEdgeText != undefined) this.parentEdgeText = option.parentEdgeText;
        if (option.children != undefined) this.children = option.children;
    }
    public getOrderedNodes(order: VertexOrder = VertexOrder.Preorder): LogicTree[] {
        const r: LogicTree[] = [];
        const edges = this.children;
        if (order == VertexOrder.Preorder) {
            r.push(this);
            edges.forEach((v) => {
                if (v != null) {
                    v.getOrderedNodes(order).forEach((w) => {
                        r.push(w);
                    });
                }
            });

        } else if (order == VertexOrder.Postorder) {
            edges.forEach((v) => {
                if (v != null) {
                    v.getOrderedNodes(order).forEach((w) => {
                        r.push(w);
                    });
                }
            });
            r.push(this);
        }
        return r;
    }
    public get textContent(): string {
        if (typeof (this.edgeOption.text) == "string") {
            return this.edgeOption.text!;
        } else if (this.edgeOption.text === undefined) {
            return "";
        } else {
            return "";
        }
    }
    public set textContent(value: string) {
        this.edgeOption.text = value;
    }
    /*
    public view(canvasID: string | null = null ) {
        Console.graph(this, canvasID);
    }
    */


}
/**
 * 二分木を表現するクラスです。
 */
export class BinaryLogicTree extends LogicTree {
    public get left(): BinaryLogicTree | null {
        const left = this.children[0];
        if (left == null) {
            return null;
        } else {
            return <BinaryLogicTree>left;
        }
    }
    public set left(value: BinaryLogicTree | null) {
        this.children[0] = value;
    }
    public get right(): BinaryLogicTree | null {
        const right = this.children[1];
        if (right == null) {
            return null;
        } else {
            return <BinaryLogicTree>right;
        }

    }
    public set right(value: BinaryLogicTree | null) {
        this.children[1] = value;
    }
    constructor(public item: any = null, left: BinaryLogicTree | null = null, right: BinaryLogicTree | null = null, nodeText: string | null = null, edgeLabel: string | null = null) {
        super({ item: item == null ? undefined : item, children: [left, right], vertexText: nodeText == null ? undefined : nodeText, parentEdgeText: edgeLabel == null ? undefined : edgeLabel });
    }
    /*
    public toLogicTree(): LogicTree<T> {
        var r = new LogicTree<T>(this.item);
        if (this.left != null) {
            r.children.push(this.left.toLogicTree());
        }
        if (this.right != null) {
            r.children.push(this.right.toLogicTree());
        }
        return r;
    }
    */
}
