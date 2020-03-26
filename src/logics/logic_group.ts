import { LogicTable } from "./logic_table";
import { LogicGraph, LogicTree } from "./logic_tree";
import {CenterPosition, UpperLeftPosition} from "../common/vline"
type LogicType = "LogicTree" | "LogicTable" | "LogicGraph" | "LogicGroup";


export class LogicGroup {
    public items : (LogicGraph | LogicTree | LogicTable | LogicGroup)[] = new Array(0);
    private objectType : string = "LogicGroup";
    public position? : UpperLeftPosition;
    constructor() {
        
    }
    public buildFromObject(item : any){
        const temp = item["items"];
        if(temp !== undefined && temp instanceof Array){
            temp.forEach((v, i) =>{
                this.items.push(LogicGroup.buildLogicObjectFromObject(v));
            })
        }
        this.position = item["position"];
    }

    public static buildLogicObjectFromObject(obj : any) : LogicTree | LogicTable | LogicGraph | LogicGroup{
        const type : LogicType = obj["objectType"];
    
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
        if(data.graphOption.drawingFunction !== undefined && data.graphOption.drawingFunction.url != null){
            r.add(data.graphOption.drawingFunction.url);
        }
    }else{
    }
    return r;
}