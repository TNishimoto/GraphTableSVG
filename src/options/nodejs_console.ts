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
const fs = require("fs");
const os = require('os');



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
function save(data : string, path : string, debug : boolean){
    const scriptPath = debug ? "./docs/scripts/graph_table_svg.js" : "https://cdn.jsdelivr.net/npm/graph-table-svg@0.0.20/docs/scripts/graph_table_svg.js"
    const ptext =`
    <!DOCTYPE html>
    <html>    
    <head>
        <meta charset="utf-8" />
        <title>View</title>
        <script src="${scriptPath}"></script>
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
export function table(item: any,  title: string = "", option : { filepath? : string, debug? : boolean } = { }) {
    if (item instanceof LogicTable) {
        const data = JSON.stringify(item);
        const tmpdir = os.tmpdir();
        const rand : string = (Math.floor( Math.random() * 100000000 )).toString();

        const filepath = option.filepath ? option.filepath : `${tmpdir}/graph_table_svg_table_output_${rand}.html`;
        const debug = option.debug ? option.debug : false;
        save(data, filepath, debug);
        opener(filepath);

    } else {

        const tableDic = new TableDictionary();
        tableDic.construct(item);
        const logicTable = tableDic.toLogicTable();
        table(logicTable, title, option);
    }
}
