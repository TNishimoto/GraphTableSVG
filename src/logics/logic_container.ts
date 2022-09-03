import { LogicTable } from "./logic_table";
import { LogicTree } from "./logic_tree";
import { LogicGraph } from "./logic_graph";




export class LogicContainer {
    public items : (LogicGraph | LogicTree | LogicTable)[] = new Array(0);
    constructor() {
        
    }
}
