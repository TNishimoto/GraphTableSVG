import { LogicTree, LogicGraph } from "./logic_tree";
import { LogicTable } from "./logic_table";



type LogicType = "LogicTree" | "LogicTable" | "LogicGraph";

export function buildLogicObjectFromJSON(data : string) : LogicTree | LogicTable | LogicGraph{
    const obj = JSON.parse(data);
    const type : LogicType = obj["objectType"];
    
    if(type == "LogicTree"){
        const w = new LogicTree();
        w.buildFromObject(obj);
        return w;
    }else if(type == "LogicTable"){
        const w = new LogicTable();
        w.buildFromObject(obj);
        return w;
    }else{
        const w = new LogicGraph();
        //w.buildFromObject(obj);
        return w;

    }
}