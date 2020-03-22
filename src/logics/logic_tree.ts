/*
export class BaseLogicTree {
    public edgeLabel: string | null = null;
    public nodeText: string | null = null;
}
*/
//import * as Console from "../../options/console"
import { VertexOrder, Direction, PathTextAlighnment, VertexObjectType, ShapeObjectType } from "../common/enums"
//import { GTextBoxAttributes } from "../object/g_textbox";
import * as GOptions from "../objects/g_options"
import { LogicTable } from "./logic_table";
export type DrawingFunctionOnURL = { url : string | null, functionName : string | null, drawingFunction : object | null }

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
export function Test(obj : LogicTree) : void {
    console.log(obj);
    console.log("test");
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
    public drawingFunction : DrawingFunctionOnURL | null = null;
    public vertexShape : VertexObjectType = "g-circle"
    public table : LogicTable | null = null;
    public item: any = null;

    private objectType : string = "LogicTree";

    public buildFromObject(item : any){        
        this.vertexOption = item["vertexOption"];
        this.edgeOption = item["edgeOption"];
        this.graphOption = item["graphOption"];
        this.vertexShape = item["vertexShape"]

        if(this.vertexShape == ShapeObjectType.Table){
            this.table = new LogicTable();
            this.table.buildFromObject(item["table"])
        }

        const children : any[] = item["children"];
        //this.children = new Array(0);
        this.children = children.map((v) =>{
            if(v == null){
                return null;
            }else{
                const w = new LogicTree();
                w.buildFromObject(v);
                return w;
            }
        })
        

    }

    constructor(option: {
        item?: any, children?: (LogicTree | null)[],
        vertexOption?: GOptions.GTextBoxAttributes, edgeOption?: GOptions.GGraphAttributes
    } = {}) {
        if (option.item != undefined) this.item = option.item;
        if(option.vertexOption !== undefined) this.vertexOption = option.vertexOption;
        if(option.edgeOption !== undefined) this.edgeOption = option.edgeOption;

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
    public get edgeTextContent(): string {
        if (typeof (this.edgeOption.text) == "string") {
            return this.edgeOption.text!;
        } else if (this.edgeOption.text === undefined) {
            return "";
        } else {
            return "";
        }
    }
    public set edgeTextContent(value: string) {
        this.edgeOption.text = value;
    }
    public get vertexTextContent(): string {
        if (typeof (this.vertexOption.text) == "string") {
            return this.vertexOption.text!;
        } else if (this.vertexOption.text === undefined) {
            return "";
        } else {
            return "";
        }
    }
    public set vertexTextContent(value: string) {
        this.vertexOption.text = value;
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
    constructor(public item: any = null, left: BinaryLogicTree | null = null, right: BinaryLogicTree | null = null, vertexOption?: GOptions.GTextBoxAttributes, edgeOption?: GOptions.GGraphAttributes) {
        super({ item: item == null ? undefined : item, children: [left, right], vertexOption: vertexOption, edgeOption : edgeOption });
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

