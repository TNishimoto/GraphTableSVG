//import {LogicCell} from "./logic_cell"
import { LogicTable } from "./logic_table"
import * as GOptions from "../g_options"
import { LogicCell } from "./logic_cell";

export type LogicCellLine = LogicCell[];

//export type LogicTableDetailLine = LogicCell[]; 

function setCell(cell: LogicCell, value: number | string | LogicCell, cellClass?: string | GOptions.GTextBoxCSS) {
    if (value instanceof LogicCell) {
        cell.copy(value);
    } else {
        cell.text.textContent = value.toString()
    }
    if (cellClass !== undefined) {
        cell.cellClass = cellClass;
    }

}
/*
export type LogicTableLine = { name: string, values: (number | string | LogicCell)[], cellClass?: string | GOptions.GTextBoxCSS }
function setRow(table: LogicTable, ithRow: number, line: LogicTableLine) {
    table.cells[ithRow][0].text.textContent = line.name;
    line.values.forEach((v, i) => {
        setCell(table.cells[ithRow][i + 1], v, line.cellClass);
    })
}
function setColumn(table: LogicTable, ithColumn: number, line: LogicTableLine) {
    table.cells[0][ithColumn].text.textContent = line.name;
    line.values.forEach((v, i) => {
        setCell(table.cells[i + 1][ithColumn], v, line.cellClass);
    })
}
export function createLogicTable(lines: LogicTableLine[] | LogicTableLine,
    option?: { isRowLines?: boolean }): LogicTable {
    if (option == undefined) option = {};
    if (option.isRowLines == undefined) option.isRowLines = true;
    //if (option.withIndex == undefined) option.withIndex = false;

    if (lines instanceof Array) {


        let maximalLineLength = 0;
        lines.forEach((v) => {
            if (maximalLineLength < v.values.length) {
                maximalLineLength = v.values.length
            }
        }
        )
        const rowCount = option.isRowLines ? lines.length : maximalLineLength + 1;
        const columnCount = option.isRowLines ? maximalLineLength + 1 : lines.length;
        const table: LogicTable = new LogicTable({ rowCount: rowCount, columnCount: columnCount });

        if (option.isRowLines) {
            lines.forEach((v, i) => {
                setRow(table, i, v);
            })
        } else {
            lines.forEach((v, i) => {
                setColumn(table, i, v);
            })

        }
        return table;
    } else {
        return createLogicTable([lines], option);
    }
}
*/

export function getIndexArray(length: number, zeroBased: boolean = true): number[] {
    return Array.from(Array(length).keys()).map((i) => zeroBased ? i : (i + 1));
}
export function getIndexArrayTableLine(length: number, zeroBased: boolean = true): LogicCellLine {
    const arr = getIndexArray(length, zeroBased);
    const name = "Index"
    const r = { name: name, values: arr };
    return toLogicCellLine(r.name, r.values);
}



function setRow2(table: LogicTable, ithRow: number, line: LogicCellLine) {
    //table.cells[ithRow][0].text.textContent = line.name;
    line.forEach((v, i) => {
        setCell(table.cells[ithRow][i], v);
    })
}
function setColumn2(table: LogicTable, ithColumn: number, line: LogicCellLine) {
    line.forEach((v, i) => {
        setCell(table.cells[i][ithColumn], v);
    })
}
export function toLogicCellLine( name: string, values: (number | string)[], cellClass?: string | GOptions.GTextBoxCSS) : LogicCellLine{
    const titleCell = new LogicCell();
    titleCell.text.textContent = name;
    if(cellClass !== undefined){
        titleCell.cellClass = cellClass;
    }
    const cells = values.map((v) =>{
        const cell = new LogicCell();
        cell.text.textContent = v.toString();
        if(cellClass !== undefined){
            cell.cellClass = cellClass;
        }
        return cell;
    })

    return [titleCell].concat(cells);
}

export function buildLogicTable(lines: LogicCellLine[], option?: { isRowLines?: boolean }): LogicTable {
    if (option == undefined) option = {};
    if (option.isRowLines == undefined) option.isRowLines = true;
    //if (option.withIndex == undefined) option.withIndex = false;
    let maximalLineLength = 0;
    lines.forEach((v) => {
        if (maximalLineLength < v.length) {
            maximalLineLength = v.length
        }
    }
    )
    const rowCount = option.isRowLines ? lines.length : maximalLineLength ;
    const columnCount = option.isRowLines ? maximalLineLength : lines.length;
    const table: LogicTable = new LogicTable({ rowCount: rowCount, columnCount: columnCount });

    if (option.isRowLines) {
        lines.forEach((v, i) => {
            setRow2(table, i, v);
        })
    } else {
        lines.forEach((v, i) => {
            setColumn2(table, i, v);
        })

    }
    return table;
}