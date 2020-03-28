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

/*
export type LogicTreeOption = {
    x?: number,
    y?: number,
    isLatexMode?: boolean
    relocateStyle?: string
    direction?: Direction | null;
}
*/

export function Test(obj : any) : void {
    console.log(obj);
    console.log("test");
}

export class  LogicBasicShape {
    public option: GOptions.GTextBoxAttributes = {};
    public shape : VertexObjectType = "g-circle"
    private className : "LogicBasicShape" = "LogicBasicShape";

    public item: any = null;

    public get textContent(): string {
        if (typeof (this.option.text) == "string") {
            return this.option.text!;
        } else if (this.option.text === undefined) {
            return "";
        } else {
            return "";
        }
    }
    public set textContent(value: string) {
        this.option.text = value;
    }
    public buildFromObject(obj : any){        
        this.option = obj["option"];
        this.shape = obj["shape"]
        this.item = obj["item"];
    }
    constructor(constructorOption : {text? : string, shape? : VertexObjectType, option? : GOptions.GTextBoxAttributes } = {}){
        if(constructorOption.shape !== undefined){
            this.shape = constructorOption.shape;
        }
        if(constructorOption.option !== undefined){
            this.option = constructorOption.option;
        }
        if(constructorOption.text !== undefined){
            this.textContent = constructorOption.text;
        }
    }



}


/**
 * 木構造を表現するクラスです。
 */

export class  LogicTreeNode {
    constructor(constructorOption : {vertexText? : string, edgeText? : string, vertexShape? : VertexObjectType } = {}){
        if(constructorOption.vertexShape === "g-table"){
            this.shapeObject = new LogicTable();            
        }
        if(constructorOption.edgeText !== undefined){
            this.edgeTextContent = constructorOption.edgeText;            
        }
        if(constructorOption.vertexText !== undefined){
            if(this.shapeObject instanceof LogicTable){
                throw Error("You cannot use vertexText if you use LogicTable as the shapeObject property in LogicTreeNode")
            }else{
                this.shapeObject.textContent = constructorOption.vertexText;            
            }
        }

    }
    public edgeOption: GOptions.GEdgeAttributes = { class: { pathTextAlignment: PathTextAlighnment.regularInterval } };
    public children: (LogicTreeNode | null)[] = [];
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
    public shapeObject : LogicBasicShape | LogicTable = new LogicBasicShape();
    public buildFromObject(obj : any){        
        this.edgeOption = obj["edgeOption"];
        const className = obj["shapeObject"]["className"];
        if(className == "LogicTable"){
            this.shapeObject = new LogicTable();
        }else{
            this.shapeObject = new LogicBasicShape();
        }
        this.shapeObject.buildFromObject(obj["shapeObject"])


        const children : any[] = obj["children"];
        this.children = children.map((v) =>{
            if(v == null){
                return null;
            }else{
                const w = new LogicTreeNode();
                w.buildFromObject(v);
                return w;
            }
        })
        

    }
    
    public getOrderedNodes(order: VertexOrder = VertexOrder.Preorder): LogicTreeNode[] {
        const r: LogicTreeNode[] = [];
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
    
}
export class LogicTree {
    public graphOption: GOptions.GGraphAttributes = { relocateStyle: "standard", direction: "down" };
    public root : LogicTreeNode | null = null;
    private className : "LogicTree" = "LogicTree";

    public buildFromObject(obj : any){        
        this.graphOption = obj["graphOption"];
        if(obj["root"] != null){
            this.root = new LogicTreeNode();
            this.root.buildFromObject(obj["root"]);
        }        
    
    }
}


/**
 * 二分木を表現するクラスです。
 */
/*
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
}
*/

