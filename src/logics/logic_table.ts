import * as AttributeNames from "../common/attribute_names"
import * as HTMLFunctions from "../html/html_functions"
import { LogicCell } from "./logic_cell"
import * as ElementExtension from "../interfaces/element_extension"
import { TableReteral, RowReteral, TableOptionReteral, deepCopy, convertAttributesIntoCellOption, convertAttributesIntoTableOption } from "./gobject_reterals"
import { recoverFromEscapeCharacter } from "../common/character"





//import { Cell } from "../object/table_helpers/cell"
//import * as GOptions from "../object/x_options"


/**
 * 表を表現するクラスです。
 */
export class LogicTable {
    public cells: LogicCell[][];
    public option: TableOptionReteral;
    private className: "LogicTable" = "LogicTable";

    public get rowCount(): number {
        return this.cells.length;
    }
    public get columnCount(): number {
        if (this.cells.length == 0) {
            return 0;
        } else {
            return this.cells[0].length;
        }
    }


    public buildFromObject(obj: any): void {
        /*
        if(obj["position"] !== undefined){
            this.position = obj["position"];
        }
        this.tableClassName = obj["tableClassName"];
        */
        this.option = obj["option"];

        //this.rowHeights = obj["rowHeights"];
        //this.columnWidths = obj["columnWidths"];
        const cells: any[][] = obj["cells"];
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

    public constructor(option: { columnCount: number, rowCount: number, table_option?: TableOptionReteral } = { columnCount: 3, rowCount: 3 }) {
        //if (option.columnCount == undefined) option.columnCount = 3;
        //if (option.rowCount == undefined) option.rowCount = 3;
        this.option = <any>new Object();
        //this.option.x = 0;
        //this.option.y = 0;
        if (option.table_option !== undefined) {
            this.option = <any>deepCopy(option.table_option);
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
    public static create(str: string[][], option?: TableOptionReteral): LogicTable {
        const table = new LogicTable({ columnCount: str[0].length, rowCount: str.length, table_option: option });

        for (let y = 0; y < str.length; y++) {
            for (let x = 0; x < str[y].length; x++) {
                const p = str[y][x].split("%%%");
                table.cells[y][x].text.textContent = p[0];
                if (p.length == 3) {
                    table.cells[y][x].option.w = Number(p[1]);
                    table.cells[y][x].option.h = Number(p[2]);
                }
            }
        }
        return table;
    }
    
    /*
    private static constructHTMLLogicCells(attributeElement: Element, cells: LogicCell[]): void {
        const backGroundClassName = ElementExtension.gtGetInheritedAttributeString(attributeElement, AttributeNames.backgroundClassName);
        const backGroundStyle = ElementExtension.gtGetInheritedAttributeString(attributeElement, AttributeNames.backgroundStyle);

        const textClassName = ElementExtension.gtGetInheritedAttributeString(attributeElement, AttributeNames.textClass);
        const textStyle = ElementExtension.gtGetInheritedAttributeString(attributeElement, AttributeNames.textStyle);

        const topBorderClassName = ElementExtension.gtGetInheritedAttributeString(attributeElement,AttributeNames.topBorderClassName);
        const topBorderStyle = ElementExtension.gtGetInheritedAttributeString(attributeElement,AttributeNames.topBorderStyle);

        const leftBorderClassName = ElementExtension.gtGetInheritedAttributeString(attributeElement,AttributeNames.leftBorderClassName);
        const leftBorderStyle = ElementExtension.gtGetInheritedAttributeString(attributeElement,AttributeNames.leftBorderStyle);

        const rightBorderClassName = ElementExtension.gtGetInheritedAttributeString(attributeElement,AttributeNames.rightBorderClassName);
        const rightBorderStyle = ElementExtension.gtGetInheritedAttributeString(attributeElement,AttributeNames.rightBorderStyle);

        const bottomBorderClassName = ElementExtension.gtGetInheritedAttributeString(attributeElement,AttributeNames.bottomBorderClassName);
        const bottomBorderStyle = ElementExtension.gtGetInheritedAttributeString(attributeElement,AttributeNames.bottomBorderStyle);

        cells.forEach((outputCell) => {
            if (backGroundClassName != null) {
                outputCell.backgroundOption.class = backGroundClassName;
            }
            if (backGroundStyle != null) {
                outputCell.backgroundOption.style = backGroundStyle;
            }
            if (textClassName != null) {
                outputCell.text.class = textClassName;
            }
            if (textStyle != null) {
                outputCell.text.style = textStyle;
            }
            if (topBorderClassName != null) {
                outputCell.topBorderOption.class = topBorderClassName;
            }
            if (topBorderStyle != null) {
                outputCell.topBorderOption.style = topBorderStyle;
            }

            if (leftBorderClassName != null) {
                outputCell.leftBorderOption.class = leftBorderClassName;
            }
            if (leftBorderStyle != null) {
                outputCell.leftBorderOption.style = leftBorderStyle;
            }
            if (rightBorderClassName != null) {
                outputCell.rightBorderOption.class = rightBorderClassName;
            }
            if (rightBorderStyle != null) {
                outputCell.rightBorderOption.style = rightBorderStyle;
            }
            if (bottomBorderClassName != null) {
                outputCell.bottomBorderOption.class = bottomBorderClassName;
            }
            if (bottomBorderStyle != null) {
                outputCell.bottomBorderOption.style = bottomBorderStyle;
            }
        })


    }
    */

    /*
    public static convertAttributesIntoLogicTableOption(e: Element) : TableOptionReteral{
            const output : TableOptionReteral = <any> new Object();
            
            return output;
    }
    */

    private static constructHTMLLogicCell(cellElement: Element, outputCell: LogicCell): void {
        outputCell.option = convertAttributesIntoCellOption(cellElement);


        outputCell.text.textContent = recoverFromEscapeCharacter(cellElement.innerHTML);

        //outputCell.text.class = outputCell.option.

        const tNodes = HTMLFunctions.getTNodes(cellElement);
        if (tNodes != null) outputCell.tTexts = tNodes;

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
        const logicTable = new LogicTable({ columnCount: columnSize, rowCount: rows.length });;

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
                this.constructHTMLLogicCell(cells[y][x], logicTable.cells[y][x]);
                /*
                const backGroundClassName = cells[y][x].getAttribute(AttributeNames.backgroundClassName);
                const backGroundStyle = cells[y][x].getAttribute(AttributeNames.backgroundStyle);
                const textClassName = cells[y][x].getAttribute(AttributeNames.textClass);
                const textStyle = cells[y][x].getAttribute(AttributeNames.textStyle);

                if(backGroundClassName != null){
                    logicTable.cells[y][x].backgroundOption.class = backGroundClassName;
                }
                if(backGroundStyle != null){
                    logicTable.cells[y][x].backgroundOption.style = backGroundStyle;
                }
                if(textClassName != null){
                    logicTable.cells[y][x].text.class = textClassName;
                }
                if(textStyle != null){
                    logicTable.cells[y][x].text.style = textStyle;
                }


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
                */

            }
        }
        return logicTable;
    }

    public toReteral(): TableReteral {
        const obj: TableReteral = <any>deepCopy(this.option);
        obj.tag = "g-table"
        obj.children = new Array();
        for (let i = 0; i < this.rowCount; i++) {
            const row: RowReteral = <any>new Object();
            row.tag = "row";
            row.children = new Array();
            this.getRow(i).forEach((v) => {
                const cell = v.toReteral();
                row.children.push(cell);
            }
            )
            obj.children.push(row);
        }
        return obj;
    }
    public static constructLogicTable(e: Element): LogicTable | null {
        const rows = HTMLFunctions.getChildren(e).filter((v) => v.getAttribute(AttributeNames.customElement) == "row").map((v) => <HTMLElement>v);
        //const widthsStr = ElementExtension.getPropertyStyleValue(e, "--widths");
        if (rows.length == 0) return null;

        const cells: Element[][] = new Array(rows.length);
        let columnSize = 0;
        rows.forEach((v, i) => {
            const cellArray = HTMLFunctions.getChildren(v).filter((v) => v.getAttribute(AttributeNames.customElement) == "cell");
            cellArray.forEach((v) => v.removeAttribute(AttributeNames.customElement));
            cells[i] = cellArray;
            if (columnSize < cellArray.length) columnSize = cellArray.length;
        });
        const logicTable = new LogicTable({ columnCount: columnSize, rowCount: rows.length });

        logicTable.option = convertAttributesIntoTableOption(e);
                
    
        for (let y = 0; y < cells.length; y++) {

            for (let x = 0; x < cells[y].length; x++) {
                this.constructHTMLLogicCell(cells[y][x], logicTable.cells[y][x]);
            }
        }
        return logicTable;
    }
}

