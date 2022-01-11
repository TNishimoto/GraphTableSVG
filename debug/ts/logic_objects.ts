import * as GraphTableSVG from "../../dist/nodejs_index"
import { LogicGroup } from "../../dist/logics";

const name = "hoge";
const arr : string[] = new Array(0);
arr.push("aaa");
arr.push("bbb");
arr.push("ccc");
arr.push("dddd");

const line = GraphTableSVG.Logics.buildLogicCellLine(name, arr, {style : {verticalAnchor : "middle"}});
console.log(line[2].groupOption)
const table = GraphTableSVG.Logics.buildLogicTable([line]);
const table2 = GraphTableSVG.Logics.buildLogicTable([line]);
//const group = LogicGroup.build([table, table2]);

GraphTableSVG.Console.view([table, table2]);

console.log(table.cells[0][2].groupOption)

