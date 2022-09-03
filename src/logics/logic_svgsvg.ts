import { LogicTable } from "./logic_table";
import { LogicTree } from "./logic_tree";
import { LogicGraph } from "./logic_graph";
import { SVGReteral, SVGSVGOptionReteral, SVGSVGReteral } from "./gobject_reterals";




export class LogicSVGSVG {
    public items : (LogicGraph | LogicTree | LogicTable)[] = new Array(0);
    public option : SVGSVGOptionReteral;
    constructor(_option : SVGSVGOptionReteral = <any> new Object()) {
        this.option = {..._option};
    }
    public toReteral(): SVGSVGReteral {
        const obj: SVGSVGReteral = <any>{...this.option};
        obj.xmlns = "http://www.w3.org/2000/svg"
        obj.tag = "svg";
        obj.children = new Array();
        this.items.forEach((v) =>{ 
            if(v instanceof LogicTable){
                obj.children.push(v.toReteral());
            }
        } )
        return obj;

    }
}
