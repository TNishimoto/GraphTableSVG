//import {LogicCell} from "./logic_cell"
import { LogicTable } from "./logic_table"
import * as GOptions from "../objects/g_options"
import { LogicCell } from "./logic_cell";
import { defaultCellClass } from "../common/attribute_names";
import { CellOptionReteral, deepCopy } from "./gobject_reterals";

/**
 * LogicCellの配列
 */
export type LogicCellLine = LogicCell[];

//export type LogicTableDetailLine = LogicCell[]; 

function setCell(cell: LogicCell, value: number | string | LogicCell) {
    if (value instanceof LogicCell) {
        cell.copy(value);
    } else {
        cell.text.textContent = value.toString()
    }
    //if(cell.groupOption)
    //cell.groupOption = svgGroupOption;

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
    return buildLogicCellLine(r.name, r.values);
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

/**
 * 与えられた入力列を表すLogicCellLineを返します。
 * @param name 
 * @param values 
 * @param svgGroupOption 
 * @returns 
 */
export function buildLogicCellLine( name: string, values: (number | string)[], cellOption: CellOptionReteral | undefined = undefined) : LogicCellLine{
    const titleCell = new LogicCell();
    titleCell.text.textContent = name;
    if(cellOption != undefined){
        titleCell.option = <any>deepCopy(cellOption);
    }
    /*
    if(cellClass !== undefined){
        titleCell.cellClass = cellClass;
    }
    */
    const cells = values.map((v) =>{
        const cell = new LogicCell();
        cell.text.textContent = v.toString();
        if(cellOption != undefined){
            cell.option = <any>deepCopy(cellOption);
        }
        return cell;
    })

    return [titleCell].concat(cells);
}

/**
 * LogicCellLineの配列を表すLogicTableを構築します。
 * @param lines 
 * @param option 
 * @returns 
 */
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