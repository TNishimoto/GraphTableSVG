import { TableDictionary } from "./table_dictionary"
import { LogicGraph, LogicGraphNode, LogicTree } from "../object/logic/logic_tree"
import { LogicTable } from "../object/logic/logic_table"
//import { CommonFunctions } from "../basic/common/common_functions";
import { createShape } from "./open_svg";
import * as SVGTextBox from "../basic/interface/svg_textbox";
import * as DefaultClassNames from "../basic/common/default_class_names"
import * as SVG from "../basic/interface/svg";
import * as CSS from "../basic/html/css";
import * as VBAMacroModal from "./vba_macro_modal";
import { SVGToVBA } from "./svg_to_vba"
import { VBAObjectType } from "./vba_object"

import * as GUIObserver from "../basic/html/gui_observer"
import { GTable } from "../object/g_table";
import { GGraph } from "../object/g_graph";
const opener = require("opener")
var fs = require("fs");



export function log(message: string, title: string = "") {
    //console.log(p);

    try {
        fs.writeFileSync("テストoutput2.html", message);
        console.log('write end');
    } catch (e) {
        console.log(e);
    }

    opener("テストoutput2.html");
}
function save(data : string, path : string){
    const ptext =`
    <!DOCTYPE html>
    <html>    
    <head>
        <meta charset="utf-8" />
        <title>View</title>
        <script src="./docs/scripts/graph_table_svg.js"></script>
        <script>
            window.onload = () => {
                const logicData = \`${data}\`
                const parseData = JSON.parse(logicData);
                const table = new GraphTableSVG.LogicTable();
                table.parse(parseData);
                GraphTableSVG.Console.table(table, "aaa");
                console.log(parseData); 
            };
        </script>
    </head>
    
    <body>
    </body>
    
    </html>
    `
    try {
        fs.writeFileSync(path, ptext);
        //console.log('write end');
    } catch (e) {
        //console.log(e);
    }

}
export function table(item: any,  title: string = "", filepath : string = "text.html") {
    if (item instanceof LogicTable) {
        const data = JSON.stringify(item);
        save(data, filepath);
        opener(filepath);

    } else {

        const tableDic = new TableDictionary();
        tableDic.construct(item);
        const logicTable = tableDic.toLogicTable();
        table(logicTable, title);
    }
}
