import { TableDictionary } from "./table_dictionary"
import { LogicGraph, LogicGraphNode, LogicTree } from "../logics/logic_tree"
import { LogicTable } from "../logics/logic_table"
import { LogicGroup } from "../logics/logic_group";
//import { CommonFunctions } from "../common/common_functions";
/*
import { createShape } from "./open_svg";
import * as SVGTextBox from "../basic/interface/svg_textbox";
import * as DefaultClassNames from "../common/default_class_names"
import * as SVG from "../basic/interface/svg";
import * as CSS from "../basic/html/css";
import * as VBAMacroModal from "./vba_macro_modal";
import { SVGToVBA } from "./svg_to_vba"
import { VBAObjectType } from "./vba_object"

import * as GUIObserver from "../basic/html/gui_observer"
import { GTable } from "../object/g_table";
import { GGraph } from "../object/g_graph";
*/
const opener = require("opener")
const fs = require("fs");
const os = require('os');


/*
export function log(message: string, title: string = "") {
}
*/
function getSavePath() : string {
    const env = process.env
    if(env.GTS_DEBUG == "TRUE" && env.GTS_DIR === undefined){
        throw Error("DEBUG ERROR");
    }

    //const tmpdir = env.DEBUG == "TRUE" ? `D:/github/GraphTableSVG/temp`: os.tmpdir();
    const tmpdir = env.GTS_DEBUG == "TRUE" && env.GTS_DIR !== undefined ? env.GTS_DIR: os.tmpdir();
    
    const rand : string = (Math.floor( Math.random() * 100000000 )).toString();
    const filepath = `${tmpdir}/graph_table_svg_table_${rand}.html`;
    return filepath;
}
function getMainLibPath() : string {
    const env = process.env
    if(env.GTS_DEBUG == "TRUE" && env.GTS_PATH === undefined){
        throw Error("DEBUG ERROR");
    }

    const path = env.GTS_DEBUG == "TRUE" && env.GTS_PATH !== undefined ? env.GTS_PATH : "https://cdn.jsdelivr.net/npm/graph-table-svg/docs/scripts/graph_table_svg.js";
    
    return path;
}

function save(data : string, path : string, title : string,type : "table" | "graph" | "tree" | "group", graphTableSVGPath : string ,libraryPath : string | null = null, additonalFunction : string | null){
    const env = process.env

    //const scriptPath = env.DEBUG == "TRUE" ? `../docs/scripts/graph_table_svg.js` : "https://cdn.jsdelivr.net/npm/graph-table-svg/docs/scripts/graph_table_svg.js"
    const ptext =`
    <!DOCTYPE html>
    <html>    
    <head>
        <meta charset="utf-8" />
        <title>View</title>
        <script src="${graphTableSVGPath}"></script>
        ${libraryPath != null ? "<script src=\"" + libraryPath + "\"></script>" : ""}
        <script>
            window.onload = () => {
                const logicData = \`${data}\`
                const obj = GraphTableSVG.Logics.buildLogicObjectFromJSON(logicData);
                GraphTableSVG.Console.viewUsingObject(obj, "${title}");
                //if(obj instanceof GraphTableSVG.Logics.LogicTable){
                //    GraphTableSVG.Console.table(obj, "${title}");    
                //}else if(obj instanceof GraphTableSVG.Logics.LogicTree){
                //    const graphResult = GraphTableSVG.Console.graph(obj, "${title}");    
                //    ${additonalFunction != null ? additonalFunction + "(graphResult[0])" : ""}
                //}else if(obj instanceof GraphTableSVG.Logics.LogicGraph){
                //}
            };
        </script>
    </head>
    
    <body>
    </body>
    
    </html>
    `
    try {
        fs.writeFileSync(path, ptext);
    } catch (e) {
    }

}
export function view(item: LogicTree | LogicGraph | LogicGroup | LogicTable, title: string = "", option : { filepath? : string } = { }){
    if(item instanceof LogicTree || item instanceof LogicGraph){
        const data = JSON.stringify(item);
        //const debug = option.debug ? option.debug : false;
        const filepath = option.filepath ? option.filepath : getSavePath();
        if(item instanceof LogicTree){
            const libraryPath = item.graphOption.drawingFunction === undefined ? null : item.graphOption.drawingFunction.url;
            const additonalFunction = item.graphOption.drawingFunction === undefined ? null : item.graphOption.drawingFunction.functionName;
            save(data, filepath, title, "tree", getMainLibPath(),libraryPath, additonalFunction);
        }else{
            save(data, filepath, title, "tree", getMainLibPath(), null, null);
        }
        opener(filepath);

    }else if(item instanceof LogicTable){
        const data = JSON.stringify(item);
        const filepath = option.filepath ? option.filepath : getSavePath();
        save(data, filepath, title, "table", getMainLibPath(), null, null);
        opener(filepath);
    }else{
        const data = JSON.stringify(item);
        const filepath = option.filepath ? option.filepath : getSavePath();
        save(data, filepath, title, "group", getMainLibPath(), null, null);
        opener(filepath);

    }
}
export function table(item: any,  title: string = "", option : { filepath? : string } = { }) {
    if (item instanceof LogicTable) {
        view(item, title, option);
    } else {

        const tableDic = new TableDictionary();
        tableDic.construct(item);
        const logicTable = tableDic.toLogicTable();
        table(logicTable, title, option);
    }
}
export function graph(item: any | LogicTree | LogicGraph, title: string = "", option : { filepath? : string } = { }) {

    if (item instanceof LogicTree || item instanceof LogicGraph) {
        view(item, title, option);
    } else {
        const tableDic = new TableDictionary();
        tableDic.construct(item);
        const logicGraph = tableDic.toLogicGraph();
        graph(logicGraph, title, option);
    }
}


