import { TableDictionary } from "./table_dictionary"
import { LogicTree } from "../logics/logic_tree"
import { LogicGraph, LogicGraphNode } from "../logics/logic_graph"

import { LogicTable } from "../logics/logic_table"
import { LogicGroup, getAdditionalLibraryPathList } from "../logics/logic_group";
import { toHTML } from "../logics/gobject_reterals";
import { LogicSVGSVG } from "../logics/logic_svgsvg";
import { Debugger } from "../common/debugger";
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
import { ZTable } from "../object/g_table";
import { ZGraph } from "../object/g_graph";
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
    const yyyymmdd = new Intl.DateTimeFormat(
        undefined,
        {
          year:   'numeric',
          month:  '2-digit',
          day:    '2-digit',
          hour:   '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }
      )
    const date : string = yyyymmdd.format( new Date()).replace(/\//g, "_").replace(/\:/g, "_").replace(/ /g, "_");
    //const tmpdir = env.DEBUG == "TRUE" ? `D:/github/GraphTableSVG/temp`: os.tmpdir();
    const tmpdir = env.GTS_DEBUG == "TRUE" && env.GTS_DIR !== undefined ? env.GTS_DIR: os.tmpdir();
    
    
    //const rand : string = (Math.floor( Math.random() * 100000000 )).toString();
    const filepath = `${tmpdir}/graph_table_svg_table_${date}.html`;
    return filepath;
}
function getMainLibPath() : string {
    const env = process.env
    if(env.GTS_DEBUG == "TRUE" && env.GTS_PATH === undefined){
        throw Error("DEBUG ERROR");
    }
    let path = "https://cdn.jsdelivr.net/npm/graph-table-svg/docs/scripts/graph_table_svg.js";
    if(Debugger.getNodePathFlag()){
        path = "file:///D:/github/GraphTableSVG/docs/scripts/graph_table_svg.js"
    }

    //const path = env.GTS_DEBUG == "TRUE" && env.GTS_PATH !== undefined ? env.GTS_PATH : "https://cdn.jsdelivr.net/npm/graph-table-svg/docs/scripts/graph_table_svg.js";
    
    return path;
}

function addIndent(lines : string[], indent : string) : string {
    return lines.map((v) => indent + v ).join("\n")
}

function save(data : string, path : string, title : string,type : "table" | "graph" | "tree" | "group", graphTableSVGPath : string ,additionalLibraryPathList : string[] = new Array(0)){
    const env = process.env

    //const scriptPath = env.DEBUG == "TRUE" ? `../docs/scripts/graph_table_svg.js` : "https://cdn.jsdelivr.net/npm/graph-table-svg/docs/scripts/graph_table_svg.js"

    const pathListLines = additionalLibraryPathList.length == 0 ? "" : additionalLibraryPathList.map((v) => `<script src="${v}"></script>`).join("\n");

    const ptext =`
    <!DOCTYPE html>
    <html>    
    <head>
        <meta charset="utf-8" />
        <title>View</title>
        <script src="${graphTableSVGPath}"></script>
        ${pathListLines}
        <script>
            window.onload = () => {
                const logicData = \`${data}\`                
                const obj = GraphTableSVG.Logics.buildLogicObjectFromJSON(logicData);
                GraphTableSVG.Console.view(obj, "${title}");
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
function save2(svgHTML : string[], path : string, title : string, graphTableSVGPath : string ,additionalLibraryPathList : string[] = new Array(0)){
    const env = process.env

    //const scriptPath = env.DEBUG == "TRUE" ? `../docs/scripts/graph_table_svg.js` : "https://cdn.jsdelivr.net/npm/graph-table-svg/docs/scripts/graph_table_svg.js"

    const pathListLines = additionalLibraryPathList.length == 0 ? "" : additionalLibraryPathList.map((v) => `<script src="${v}"></script>`).join("\n");

    const ptext =`
    <!DOCTYPE html>
    <html>    
    <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        <script src="${graphTableSVGPath}"></script>
        ${pathListLines}
        <script>
            window.onload = () => {
                GraphTableSVG.Options.openSVG();
            };
        </script>
    </head>
    
    <body>
${addIndent(svgHTML, "        ")}
    </body>
    
    </html>
    `
    try {
        fs.writeFileSync(path, ptext);
    } catch (e) {
    }

}
export function view(item: LogicTree | LogicGraph | LogicGroup | LogicTable | LogicSVGSVG | (LogicTree | LogicGraph | LogicGroup | LogicTable)[], title: string = "", option : { filepath? : string, libraryPath? : string[] } = { }){
    if(item instanceof Array){
        const group = LogicGroup.build(item);
        view(group, title, option);
    }else{
        const tempLibraryPathList : string[] = option.libraryPath === undefined ? new Array(0) : option.libraryPath;
        const collectedLibraryPathList = getAdditionalLibraryPathList(item);
        tempLibraryPathList.forEach((v) => collectedLibraryPathList.add(v));
        const libraryPathList = Array.from(collectedLibraryPathList.values());
    
        if(item instanceof LogicTree || item instanceof LogicGraph){
            const data = JSON.stringify(item);
            //const debug = option.debug ? option.debug : false;
            const filepath = option.filepath ? option.filepath : getSavePath();
            if(item instanceof LogicTree){
                const libraryPath = item.option.drawingFunction === undefined ? null : item.option.drawingFunction.url;
                const additonalFunction = item.option.drawingFunction === undefined ? null : item.option.drawingFunction.functionName;
                save(data, filepath, title, "tree", getMainLibPath(), libraryPathList);
            }else{
                save(data, filepath, title, "tree", getMainLibPath(), libraryPathList);
            }
            opener(filepath);
    
        }else if(item instanceof LogicTable){
            const data = JSON.stringify(item);
            const filepath = option.filepath ? option.filepath : getSavePath();
            save(data, filepath, title, "table", getMainLibPath(), libraryPathList);
            opener(filepath);
        }
        else if(item instanceof LogicSVGSVG){
            const sx = item.toReteral();
            const htmlLines = toHTML(sx, "    ");
            const filepath = option.filepath ? option.filepath : getSavePath();
            save2(htmlLines, filepath, title, getMainLibPath(), libraryPathList);
            opener(filepath);
        }
        else{
            const data = JSON.stringify(item);
            const filepath = option.filepath ? option.filepath : getSavePath();
            save(data, filepath, title, "group", getMainLibPath(), libraryPathList);
            opener(filepath);
    
        }
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


