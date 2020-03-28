import * as AttributeNames from "../common/attribute_names"

import * as HTMLFunctions from "../html/html_functions"
//import * as Console from "../../options/console"
import {LogicCell} from "./logic_cell"
import * as ElementExtension from "../interfaces/element_extension"
import { ShapeObjectType } from "../common/enums"
import { GTableOption } from "../objects/g_table"





//import { Cell } from "../object/table_helpers/cell"
//import * as GOptions from "../object/g_options"


/**
 * 表を表現するクラスです。
 */
export class LogicTable {
    public cells: LogicCell[][];
    //public columnWidths: (number | null)[];
    //public rowHeights: (number | null)[];
    
    //public tableClassName: string | null = null;
    public option : GTableOption = {};
    private className : "LogicTable" = "LogicTable";

    public get rowCount(): number {
        return this.cells.length;
    }
    public get columnCount(): number {
        if(this.cells.length == 0){
            return 0;
        }else{
            return this.cells[0].length;
        }
    }


    public buildFromObject(obj : any) : void{
        /*
        if(obj["position"] !== undefined){
            this.position = obj["position"];
        }
        this.tableClassName = obj["tableClassName"];
        */
        this.option = obj["option"];

        //this.rowHeights = obj["rowHeights"];
        //this.columnWidths = obj["columnWidths"];
        const cells : any[][] = obj["cells"];
        const rowCount = cells.length;
        const columnCount = rowCount == 0 ? 0 : cells[0].length;

        this.cells = new Array(rowCount);
        for (let y = 0; y < rowCount; y++) {
            this.cells[y] = new Array(columnCount);
            for (let x = 0; x < columnCount; x++) {
                this.cells[y][x] = new LogicCell();
                this.cells[y][x].buildFromObject(cells[y][x]);
            }
        }
        
    }

    public constructor(option: {columnCount: number, rowCount: number, option? : GTableOption} = { columnCount : 3, rowCount : 3, option : {}} ) {
        //if (option.columnCount == undefined) option.columnCount = 3;
        //if (option.rowCount == undefined) option.rowCount = 3;
        if(option !== undefined){
            this.option = option;
        }

        //this.position = option.position;

        //if(option.tableClassName == undefined) option.tableClassName = null;

        //this.tableClassName = option.tableClassName == undefined ? null : option.tableClassName;
        this.cells = new Array(option.rowCount);
        for (let y = 0; y < option.rowCount; y++) {
            this.cells[y] = new Array(option.columnCount);
            for (let x = 0; x < option.columnCount; x++) {
                this.cells[y][x] = new LogicCell();
            }
        }
        /*
        this.rowHeights = new Array(option.rowCount);
        for (let y = 0; y < option.rowCount; y++) {
            this.rowHeights[y] = null;
        }
        this.columnWidths = new Array(option.columnCount);
        for (let x = 0; x < option.columnCount; x++) {
            this.columnWidths[x] = null;
        }
        */

    }
    public get cellArray(): LogicCell[] {
        const r: LogicCell[] = new Array();
        for (let y = 0; y < this.rowCount; y++) {
            for (let x = 0; x < this.columnCount; x++) {
                r.push(this.cells[y][x]);
            }
        }
        return r;
    }
    public getColumn(i: number): LogicCell[] {
        const r: LogicCell[] = new Array();
        for (let y = 0; y < this.rowCount; y++) {
            r.push(this.cells[y][i]);
        }
        return r;
    }
    public getRow(i: number): LogicCell[] {
        const r: LogicCell[] = new Array();
        for (let x = 0; x < this.columnCount; x++) {
            r.push(this.cells[i][x]);
        }
        return r;
    }
    /*
    public checkTable(): boolean {

    }
    */

    public static parse(str: string, delimiter: string): string[][] {
        const lines = str.split("\n");
        const r: string[][] = new Array(lines.length);
        for (let y = 0; y < lines.length; y++) {
            const line = lines[y].split(delimiter);
            r[y] = new Array(line.length);
            for (let x = 0; x < line.length; x++) {
                r[y][x] = line[x];
            }
            if (y > 0) {
                if (r[y].length != r[y - 1].length) {
                    alert("Parse Error");
                    throw Error("Parse Error");
                }
            }
        }
        return r;
    }
    public static create(str: string[][], option? : GTableOption): LogicTable {
        const table = new LogicTable({columnCount : str[0].length, rowCount : str.length, option : option} );

        for (let y = 0; y < str.length; y++) {
            for (let x = 0; x < str[y].length; x++) {
                const p = str[y][x].split("%%%");
                table.cells[y][x].text.textContent = p[0];
                if (p.length == 3) {
                    table.cells[y][x].connectedColumnCount = Number(p[1]);
                    table.cells[y][x].connectedRowCount = Number(p[2]);
                }
            }
        }
        return table;
    }
    public static constructLogicTable(e: Element): LogicTable | null {
        const rows = HTMLFunctions.getChildren(e).filter((v) => v.getAttribute(AttributeNames.customElement) == "row").map((v) => <HTMLElement>v);
        const widthsStr = ElementExtension.getPropertyStyleValue(e, "--widths");
        if (rows.length == 0) return null;

        const cells: Element[][] = new Array(rows.length);
        let columnSize = 0;
        rows.forEach((v, i) => {
            const cellArray = HTMLFunctions.getChildren(v).filter((v) => v.getAttribute(AttributeNames.customElement) == "cell");
            cellArray.forEach((v) => v.removeAttribute(AttributeNames.customElement));
            cells[i] = cellArray;
            if (columnSize < cellArray.length) columnSize = cellArray.length;
        });
        const logicTable = new LogicTable({columnCount : columnSize, rowCount : rows.length});;

        //output.table = new LogicTable({ rowCount: rows.length, columnCount: columnSize });
        /*
        if (widthsStr != null) {
            const widths: (number | null)[] = JSON.parse(widthsStr);
            widths.forEach((v, i) => logicTable.columnWidths[i] = v);
        }
        */

        for (let y = 0; y < cells.length; y++) {
            const h = ElementExtension.getPropertyStyleNumberValue(rows[y], "--height", null);
            //logicTable.rowHeights[y] = h;

            for (let x = 0; x < cells[y].length; x++) {
                logicTable.cells[y][x].text.textContent = cells[y][x].innerHTML;
                if (cells[y][x].hasAttribute("w")) {
                    const w = Number(cells[y][x].getAttribute("w"));
                    logicTable.cells[y][x].connectedColumnCount = w;
                }
                if (cells[y][x].hasAttribute("h")) {
                    const h = Number(cells[y][x].getAttribute("h"));
                    logicTable.cells[y][x].connectedRowCount = h;
                }
                const tNodes = HTMLFunctions.getTNodes(cells[y][x]);
                if (tNodes != null) logicTable.cells[y][x].tTexts = tNodes;

            }
        }
        return logicTable;
    }
    public static constructHTMLLogicTable(e: Element): LogicTable | null {
        const rows = HTMLFunctions.getChildren(e).filter((v) => v.getAttribute(AttributeNames.customElement) == "row").map((v) => <HTMLElement>v);
        const widthsStr = ElementExtension.getPropertyStyleValue(e, "--widths");

        if (rows.length == 0) return null;

        const cells: Element[][] = new Array(rows.length);
        let columnSize = 0;
        rows.forEach((v, i) => {
            const cellArray = HTMLFunctions.getChildren(v).filter((v) => v.getAttribute(AttributeNames.customElement) == "cell");
            cellArray.forEach((v) => v.removeAttribute(AttributeNames.customElement));
            cells[i] = cellArray;
            if (columnSize < cellArray.length) columnSize = cellArray.length;
        });
        const logicTable = new LogicTable({columnCount : columnSize,rowCount : rows.length});;

        /*
        if (widthsStr != null) {
            const widths: (number | null)[] = JSON.parse(widthsStr);
            widths.forEach((v, i) => logicTable.columnWidths[i] = v);
        }
        */

        for (let y = 0; y < cells.length; y++) {
            const h = ElementExtension.getPropertyStyleNumberValue(rows[y], "--height", null);
            //logicTable.rowHeights[y] = h;

            for (let x = 0; x < cells[y].length; x++) {
                logicTable.cells[y][x].text.textContent = cells[y][x].innerHTML;
                if (cells[y][x].hasAttribute("w")) {
                    const w = Number(cells[y][x].getAttribute("w"));
                    logicTable.cells[y][x].connectedColumnCount = w;
                }
                if (cells[y][x].hasAttribute("h")) {
                    const h = Number(cells[y][x].getAttribute("h"));
                    logicTable.cells[y][x].connectedRowCount = h;
                }
                //const tNodes = openSVGFunctions.getTNodes(cells[y][x]);

                logicTable.cells[y][x].text.textContent = cells[y][x].innerHTML;

            }
        }
        return logicTable;
    }
    /*
    public view() {
        Console.table(this);
    }
    */
}

