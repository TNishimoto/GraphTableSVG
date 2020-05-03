import { LogicTable } from "./logic_table";
import { LogicTree } from "./logic_tree";
import { LogicGraph } from "./logic_graph";

import {CenterPosition, UpperLeftPosition} from "../common/vline"
import {UndefinedError} from "../common/exceptions"

type LogicType = "LogicTree" | "LogicTable" | "LogicGraph" | "LogicGroup";


export class LogicGroup {
    public items : (LogicGraph | LogicTree | LogicTable | LogicGroup)[] = new Array(0);
    public className : "LogicGroup" = "LogicGroup";
    public itemOrder : "row" | "column" = "row"
    public itemInterval : number = 50;
    public position? : UpperLeftPosition;
    constructor() {
        
    }
    public static build(itmes : (LogicGraph | LogicTree | LogicTable | LogicGroup)[]){
        const p = new LogicGroup();
        itmes.forEach((v) => { p.items.push(v)})
        return p;
    }
    public buildFromObject(item : any){
        const temp = item["items"];
        if(temp !== undefined && temp instanceof Array){
            temp.forEach((v, i) =>{
                this.items.push(LogicGroup.buildLogicObjectFromObject(v));
            })
        }

        this.position = item["position"];
        this.itemOrder = item["itemOrder"]
        this.itemInterval = item["itemInterval"]

    }

    public static buildLogicObjectFromObject(obj : any) : LogicTree | LogicTable | LogicGraph | LogicGroup{
        const type : LogicType = obj["className"];
        //const type : LogicType = obj[LogicGroup.buildLogicObjectFromObject.toString()];

        if(type === undefined) throw new UndefinedError();
    
        if(type == "LogicTree"){
            const w = new LogicTree();
            w.buildFromObject(obj);
            return w;
        }else if(type == "LogicTable"){
            const w = new LogicTable();
            w.buildFromObject(obj);
            return w;
        } else if(type == "LogicGroup"){
            const w = new LogicGroup();
            w.buildFromObject(obj);
            return w;
        }
        else{
            const w = new LogicGraph();
            //w.buildFromObject(obj);
            return w;
    
        }
    }
}

export function buildLogicObjectFromJSON(data : string) : LogicTree | LogicTable | LogicGraph | LogicGroup{
    const obj = JSON.parse(data);
    return LogicGroup.buildLogicObjectFromObject(obj);
}

export function getAdditionalLibraryPathList(data : LogicGraph | LogicTree | LogicTable | LogicGroup) : Set<string> {
    const r = new Set<string>();
    if(data instanceof LogicGroup){
        data.items.forEach((v) =>{
            const sub = getAdditionalLibraryPathList(v);
            Array.from(sub.values()).forEach((w) =>{
                r.add(w);
            })
        })

    }else if(data instanceof LogicGraph){

    }else if(data instanceof LogicTree){
        if(data.option.drawingFunction !== undefined && data.option.drawingFunction.url != null){
            r.add(data.option.drawingFunction.url);
        }
    }else{
    }
    return r;
}