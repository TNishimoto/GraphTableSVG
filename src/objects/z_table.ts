import * as Color from "../common/color";
import { ZObject } from "./z_object";
import * as CommonFunctions from "../common/common_functions"
//import {GTableOption} from "../options/attributes_option"
import { ShapeObjectType, ConnectorType, msoDashStyle, VBAShapeType } from "../common/enums";

import { LogicTable } from "../logics/logic_table"
import { createTextElementFromLogicCell } from "../logics/gobject_functions"

import { CellRow } from "./table_helpers/row"
import { CellColumn } from "./table_helpers/column"
import { BorderRow } from "./table_helpers/border_row"
import { BorderColumn } from "./table_helpers/border_column"

import { Cell } from "./table_helpers/cell"
import { Rectangle, VLine } from "../common/vline"
import { VBATranslateFunctions, parseInteger, styleVisible } from "../common/vba_functions"

import * as CSS from "../html/css"
import * as HTMLFunctions from "../html/html_functions"
import * as GOptions from "./z_options"
import * as ElementExtension from "../interfaces/element_extension"
import * as SVGGExtension from "../interfaces/svg_g_extension"
import * as SVGTextExtension from "../interfaces/svg_text_extension"
import { ZVertex } from "./z_vertex";
import { CenterPosition, UpperLeftPosition } from "../common/vline"
import { UndefinedError } from "../common/exceptions";
import { Debugger } from "../common/debugger";
import { UpdateTable } from "./table_helpers/update_table";
import { TableOptionReteral } from "../logics/gobject_reterals";

//namespace GraphTableSVG {


export type _GTableOption = {
    rowCount?: number,
    columnCount?: number,
    rowHeight?: number,
    columnWidth?: number,
    //table?: LogicTable

    columnWidths?: (number | null)[];
    rowHeights?: (number | null)[];
    position?: CenterPosition | UpperLeftPosition;

}
export type ZTableOption = GOptions.ZObjectAttributes & _GTableOption;
/**
テーブルを表します。
*/
export class ZTable extends ZVertex {


    /**
     * コンストラクタです。
     */
    constructor(svgbox: SVGElement) {

        super(svgbox)
        CSS.setGraphTableCSS();
        this._svgHiddenGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this._svgRowBorderGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this._svgRowBorderGroup.setAttribute("name", "rowBorderGroup");
        this._svgColumnBorderGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this._svgColumnBorderGroup.setAttribute("name", "columnBorderGroup");

        this._svgColumnInfo = document.createElementNS('http://www.w3.org/2000/svg', 'metadata');
        this._svgColumnInfo.setAttribute("name", "columnInfo");


        this._svgHiddenGroup.style.visibility = "hidden";
        this._svgHiddenGroup.setAttribute("name", "hidden");
        this.svgGroup.appendChild(this.svgRowBorderGroup);
        this.svgGroup.appendChild(this.svgColumnBorderGroup);
        this.svgGroup.appendChild(this.svgHiddenGroup);
        this.svgGroup.appendChild(this.svgColumnInfo);

        this._cellTextObserver = new MutationObserver(this._cellTextObserverFunc);
        this.updateAttributes = [];
        this.isConstructing = true;
        this.firstSetSize();
        this.setSize(1, 1)

        /*
        if (option.table === undefined) {

            //this.update();

        } else {

            this.svgGroup.style.display = "none"
            this._isNoneMode = true;

            this.buildFromLogicTable(option.table);

            this._isNoneMode = false;

            this.svgGroup.style.removeProperty("display");
            this.isTextObserved = true;

        }
        */
        //if (option.cx !== undefined) this.cx = option.cx;
        //if (option.cy !== undefined) this.cy = option.cy;
        //this.setOptionInGTable(option)
        this.isConstructing = false;

        //this.update();
        if (this.type == ShapeObjectType.Table) this.firstFunctionAfterInitialized();

    }
    private _cellMap: Map<string, Cell> = new Map();
    public getCellFromObjectID(id: string): Cell | null {
        const cell = this._cellMap.get(id);
        if (cell == undefined) {
            return null;
        } else {
            return cell;
        }
    }

    protected setBasicOption(option: ZTableOption): void {
        super.setBasicOption(option);
        const columnCount = option.columnCount !== undefined ? option.columnCount : 5;
        const rowCount = option.rowCount !== undefined ? option.rowCount : 5;
        this.setSize(columnCount, rowCount);

    }
    protected setOptionalSize(option: ZTableOption) {
        super.setOptionalSize(option);
        if (option.rowHeight !== undefined) {
            this.rows.forEach((v) => v.height = <number>option.rowHeight);
        }
        if (option.columnWidth !== undefined) {
            this.columns.forEach((v) => v.width = <number>option.columnWidth);
        }

    }
    public setOption(option: ZTableOption) {
        super.setOption(option);
    }
    public assignOption(option : TableOptionReteral){
        super.assignOption(option);
        const columnCount = (<any>option).columnCount ?? 5;
        const rowCount = (<any>option).rowCount ?? 5;
        this.setSize(columnCount, rowCount);

        console.log(`XXX ${option.rowHeight}`)

        if (option.rowHeight !== undefined) {
            this.rows.forEach((v) => v.height = <number>option.rowHeight);
        }
        if (option.columnWidth !== undefined) {
            this.columns.forEach((v) => v.width = <number>option.columnWidth);
        }

    }

    private _isNoneMode: boolean = false;
    get isNoneMode(): boolean {
        return this._isNoneMode;
    }

    public get isCenterBased() {
        return false;
    }

    public updateSurfaceWithoutSVGText(): boolean {
        const withUpdate = true;

        this.hasConnectedObserverFunction = false;
        const xb = HTMLFunctions.isShow(this.svgGroup);
        if (!xb) {
            return false;
        }

        this._isDrawing = true;

        const b1 = UpdateTable.tryUpdateRowHeightAndColumnWidthWithUpdateFlag(this.rows, this.columns, true, withUpdate);
        const b2 = UpdateTable.updateCellSizeAfterUpdatingRowsAndColumns(this.rows, this.columns, withUpdate);
        const b3 = UpdateTable.relocateCellsAfterUpdatingCellSize(this.rows, this.columns, withUpdate);
        const b4 = UpdateTable.tryUpdateBorders(this.createCellArray(), withUpdate);


        this._isDrawing = false;
        this.hasConnectedObserverFunction = true;
        return b1 || b2 || b3 || b4;



        //this.prevShow = false;


        //b = this.tryResizeWithUpdateFlag(withUpdate) || b;

    }
    static constructAttributes(e: Element,
        removeAttributes: boolean = false, output: ZTableOption = {}): ZTableOption {
        //const widthsStr = e.getPropertyStyleValue("--widths");

        //const table = LogicTable.constructLogicTable(e);
        ZObject.constructAttributes(e, removeAttributes, output, "upper-left");
        /*
        if (table != null) {
            output.table = table;
        }
        */

        //if (output.x !== undefined) output.table!.x = output.x;
        //if (output.y !== undefined) output.table!.y = output.y;
        /*
        if (output.class !== undefined) {
            if (typeof (output.class) == "string") {
                output.table!.tableClassName = output.class;
            } else {
                const newClassName = CSS.getOrCreateClassName(output.class);
                output.table!.tableClassName = newClassName;

            }
        }
        */
        while (e.childNodes.length > 0) e.removeChild(e.childNodes.item(0));

        return output;
    }
    // #region field
    private _svgHiddenGroup: SVGGElement;
    private _svgColumnInfo: SVGMetadataElement;

    private _svgRowBorderGroup: SVGGElement;
    private _svgColumnBorderGroup: SVGGElement;
    public get svgRowBorderGroup() {
        return this._svgRowBorderGroup;
    }
    public get svgColumnBorderGroup() {
        return this._svgColumnBorderGroup;
    }
    public get svgColumnInfo() {
        return this._svgColumnInfo;
    }

    /**
    各行を表す配列を返します。読み取り専用です。
    */
    private _rows: CellRow[] = new Array(0);
    /**
    各列を表す配列を返します。読み取り専用です。
    */
    private _columns: CellColumn[] = new Array(0);

    private _borderRows: BorderRow[] = new Array(0);
    private _borderColumns: BorderColumn[] = new Array(0);

    public get borderRows(): BorderRow[] {
        return this._borderRows;
    }
    public get borderColumns(): BorderColumn[] {
        return this._borderColumns;
    }
    public get shape(): VBAShapeType {
        return VBAShapeType.Table;
    }

    //private _cells: Cell[][] = [];

    private isConstructing = false;
    get width(): number {
        if (this.columns === undefined) {
            return 0;
        } else {
            let width = 0;
            this.columns.forEach((v) => width += v.width);
            return width;
        }
    }
    set width(value: number) {
    }
    get height(): number {
        if (this.rows === undefined) {
            return 0;
        } else {
            let height = 0;
            this.rows.forEach((v) => height += v.height);
            return height;
        }

    }
    set height(value: number) {
    }

    /**
     * mergeによって見えなくなったBorderなどを格納している特別なSVGGElementです。
     */
    public get svgHiddenGroup(): SVGGElement {
        return this._svgHiddenGroup;
    }
    public get type(): ShapeObjectType {
        return ShapeObjectType.Table;
    }

    /**
    各行を表す配列を返します。読み取り専用です。
    */
    get rows(): CellRow[] {
        return this._rows;
    }
    /**
    各列を表す配列を返します。読み取り専用です。
    */
    get columns(): CellColumn[] {
        return this._columns;
    }
    /**
    各セルを格納している二次元ジャグ配列を返します。
    */

    get cells(): Cell[][] {
        return this.rows.map((v) => v.cells);
    }


    private _isDrawing: boolean = false;
    public get isDrawing(): boolean {
        return this._isDrawing;
    }
    private _isAutoResized: boolean = false;
    public get isAutoResized(): boolean {
        return this._isAutoResized;
    }
    public set isAutoResized(value: boolean) {
        this._isAutoResized = value;
        if (value) {
            //this.resetUnstableCounter();
            //this.update();
        }
    }

    private _cellTextObserver: MutationObserver;
    public get cellTextObserver(): MutationObserver {
        return this._cellTextObserver;
    }
    private _cellTextObserverFunc: MutationCallback = (x: MutationRecord[]) => {
        let b = false;
        let b2 = false;
        for (let i = 0; i < x.length; i++) {
            const p: MutationRecord = x[i];
            if (p.type == "childList") {
                b = true;
                b2 = true;
            }
            for (let j = 0; j < p.addedNodes.length; j++) {
                const item = p.addedNodes.item(j);

                if (item != null && item.nodeName == "#text") {
                    b = true;
                    b2 = true;
                }
            }
        }
        if (b2 && !this.isConstructing) {
            //if(this.cellArray.some((v)=>v.isErrorCell)) throw new Error("err!");
            //this.fitSizeToOriginalCells(false);
            //this.fitSizeToOriginalCells(true);

        }
        if (b) {
            //this.resetUnstableCounter();
            //this.update();

        }
    };
    /**
    * テーブルの行方向の単位セルの数を返します。
    * @returns 表の列数 
    */
    get columnCount(): number {
        if (this.cells.length == 0) {
            return 0;
        } else {
            if (this.rows.length > 2 && (this.rows[0].length != this.rows[1].length)) throw new Error("Invalid length error");
            return this.rows[0].length;
        }
    }
    /**
    * テーブルの列方向の単位セルの数を返します。
    * @returns 表の行数
    */
    get rowCount(): number {

        return this.cells.length;
    }

    // #endregion

    // #region property

    /*
     get defaultCellClass(): string | null {
         return this.svgGroup.getPropertyStyleValue(AttributeNames.Style.defaultCellClass);
     }
     */
    /*
     get defaultBorderClass(): string | null {
         return this.svgGroup.getPropertyStyleValue(AttributeNames.Style.defaultBorderClass);
     }
     */
    /**
    各セルを表す配列を返します。テーブルの左上のセルから右に向かってインデックスが割り当てられ、
    テーブル右下のセルが配列の最後の値となります。読み取り専用です。
    */
    createCellArray(): Cell[] {
        const arr = new Array(0);
        for (let y = 0; y < this.rowCount; y++) {
            for (let x = 0; x < this.columnCount; x++) {
                arr.push(this.cells[y][x]);
            }
        }
        return arr;

    }
    /**
    各ボーダーを表す配列を返します。
    ボーダーの順番は未定義です。
    読み取り専用です。
    */
    get borders(): SVGLineElement[] {
        const arr = new Array(0);
        for (let y = 0; y < this.rowCount; y++) {
            for (let x = 0; x < this.columnCount; x++) {
                if (arr.indexOf(this.cells[y][x].svgTopBorder) == -1) {
                    arr.push(this.cells[y][x].svgTopBorder);
                }
                if (arr.indexOf(this.cells[y][x].svgLeftBorder) == -1) {
                    arr.push(this.cells[y][x].svgLeftBorder);
                }
                if (arr.indexOf(this.cells[y][x].svgRightBorder) == -1) {
                    arr.push(this.cells[y][x].svgRightBorder);
                }
                if (arr.indexOf(this.cells[y][x].svgBottomBorder) == -1) {
                    arr.push(this.cells[y][x].svgBottomBorder);
                }
            }
        }
        return arr;
    }
    // #endregion

    /*
    public fitSizeToOriginalCellsWithUpdateFlag(allowShrink: boolean, withUpdate : boolean) : boolean {
        let b = false;
        for(let i = 0;i<this.rows.length;i++){
            b = this.rows[i].tryUpdateHeightWithUpdateFlag(allowShrink, withUpdate) || b;
            if(!withUpdate && b){
                return b;
            }
        }
        for(let i = 0;i<this.columns.length;i++){
            b = this.columns[i].tryUpdateWidthWithUpdateFlag(allowShrink, withUpdate) || b;
            if(!withUpdate && b){
                return b;
            }
        }
        return b;
    }
    */


    // #region method
    /**
     * セルの元々のサイズに合わせて表のサイズを調整します。
     * @param allowShrink 各行と各列が現在の幅より短くなることを許す
     */
    // public fitSizeToOriginalCells(allowShrink: boolean) {
    //    this.fitSizeToOriginalCellsWithUpdateFlag(allowShrink, true);
    //}


    /**
     * 指定したセル座標のセルを返します。そのようなセルが存在しない場合nullを返します。
     * @param x セルの列番号
     * @param y セルの行番号
     */
    public getTryCell(x: number, y: number): Cell | null {
        if (x < 0 || x >= this.columnCount || y < 0 || y >= this.rowCount) {
            return null;
        } else {
            return this.cells[y][x];
        }
    }
    /**
     * 指定したセル座標範囲の二次元セル配列を返します。
     * @param x 範囲の左上を示す列番号
     * @param y 範囲の左上を示す行番号
     * @param width 範囲に含まれる列数
     * @param height 範囲に含まれる行数
     */
    public getRangeCells(x: number, y: number, width: number, height: number): Cell[][] {
        let cells: Cell[][] = new Array(height);
        for (let i = 0; i < cells.length; i++) {
            cells[i] = new Array(0);
            for (let j = 0; j < width; j++) {
                cells[i].push(this.cells[y + i][x + j]);
            }
        }
        return cells;
    }
    /**
     * 指定したセル座標範囲のセルを配列でかえします。
     * @param x 範囲の左上を示す列番号
     * @param y 範囲の左上を示す行番号
     * @param width 範囲に含まれる列数
     * @param height 範囲に含まれる行数
     */
    public getRangeCellArray(x: number, y: number, width: number, height: number): Cell[] {
        let cells: Cell[] = new Array();
        this.getRangeCells(x, y, width, height).forEach((v) => { v.forEach((w) => { cells.push(w) }) });
        return cells;
    }




    /**
    所属しているSVGタグ上でのテーブルの領域を表すRectangleクラスを返します。        
    */
    public getRegion(): Rectangle {
        let rect = new Rectangle();
        rect.x = SVGGExtension.getX(this.svgGroup);
        rect.y = SVGGExtension.getY(this.svgGroup);
        rect.width = this.width;
        rect.height = this.height;
        return rect;
        /*
        const regions = this.cellArray.map((v) => v.region);
        const rect = Rectangle.merge(regions);
        rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
        return rect;
        */
    }
    /**
    * 強調セルを全て返します。
    */
    public getEmphasizedCells(): Cell[] {
        return this.createCellArray().filter((v) => v.isEmphasized);
    }
    /**
    * 表を文字列に変換した結果を返します。
    */
    public toPlainText(): string {
        const plainTable = this.cells.map((v) => v.map((w) => w.toPlainText()));

        const widtharr: number[] = new Array(this.columnCount);
        for (let x = 0; x < this.columnCount; x++) {
            widtharr[x] = 0;
        }


        for (let y = 0; y < this.rowCount; y++) {
            for (let x = 0; x < this.columnCount; x++) {
                const width = plainTable[y][x].length;
                if (widtharr[x] < width) widtharr[x] = width;
            }
        }
        for (let y = 0; y < this.rowCount; y++) {
            for (let x = 0; x < this.columnCount; x++) {
                plainTable[y][x] = CommonFunctions.paddingLeft(plainTable[y][x], widtharr[x], " ");
            }
        }

        return plainTable.map((v) => v.join(",")).join("\n");
    }
    // #endregion

    private _isTextObserved: boolean = false;
    public get isTextObserved(): boolean {
        return this._isTextObserved;
    }
    public set isTextObserved(b: boolean) {
        if (this._isTextObserved != b) {
            if (this._isTextObserved) {
                this.cellTextObserver.disconnect();
            } else {
                const option1: MutationObserverInit = { childList: true, subtree: true };
                this.createCellArray().forEach((v) => {
                    this.cellTextObserver.observe(v.svgText, option1);
                })
            }
        }
    }


    // #region construct2
    private updateCellByLogicCell(logicTable: LogicTable | null, x: number, y: number) {
        const cell = this.cells[y][x];
        //const isShow = HTMLFunctions.(this.svgGroup);
        if (logicTable != null) {
            const cellInfo = logicTable.cells[y][x];
            if (cellInfo != null) {
                //CSS.setCSSClass(cell.svgGroup, cellInfo.cellClass);
                GOptions.setClassAndStyle(cell.svgGroup, cellInfo.option.class, cellInfo.option.style);
                GOptions.setClassAndStyle(cell.svgBackground, cellInfo.backgroundOption.class, cellInfo.backgroundOption.style);

                createTextElementFromLogicCell(cellInfo, cell.svgText);
                GOptions.setClassAndStyle(cell.svgTopBorder, cellInfo.topBorderOption.class, cellInfo.topBorderOption.style);
                GOptions.setClassAndStyle(cell.svgLeftBorder, cellInfo.leftBorderOption.class, cellInfo.leftBorderOption.style);
                GOptions.setClassAndStyle(cell.svgRightBorder, cellInfo.rightBorderOption.class, cellInfo.rightBorderOption.style);
                GOptions.setClassAndStyle(cell.svgBottomBorder, cellInfo.bottomBorderOption.class, cellInfo.bottomBorderOption.style);

            }
        }
    }
    /**
     * LogicTableからTableを構築します。
     * @param logicTable 入力LogicTable
     */
    public buildFromLogicTable(logicTable: LogicTable) {

        //if (table.tableClassName != null) this.svgGroup.setAttribute("class", table.tableClassName);
        //logicTable.option.columnCount = logicTable.columnCount;
        //logicTable.option.rowCount = logicTable.rowCount;
        //this.setSize(logicTable.columnCount, logicTable.rowCount);
        const option : TableOptionReteral = { ...logicTable.option };
        (<any>option).rowCount = logicTable.rowCount;
        (<any>option).columnCount = logicTable.columnCount;

        console.log(option)

        this.assignOption(option);

        //GOptions.setClassAndStyle(this.svgGroup, logicTable.option.class, logicTable.option.style);
        /*
        if(logicTable.option.position !== undefined){
            if(logicTable.option.position.type == "center"){
                this.cx = logicTable.option.position.x;
                this.cy = logicTable.option.position.y;
            }else{
                this.x = logicTable.option.position.x;
                this.y = logicTable.option.position.y;
            }
        }
        */

        //if (table.x != null) this.cx = table.x;
        //if (table.y != null) this.cy = table.y;

        for (let y = 0; y < this.rowCount; y++) {
            for (let x = 0; x < this.columnCount; x++) {
                this.updateCellByLogicCell(logicTable, x, y);
            }

        }

        //this.fitSizeToOriginalCells();
        /*
        if(logicTable.option.rowHeights !== undefined){
            for (let y = 0; y < this.rowCount; y++) {
                const h = logicTable.option.rowHeights[y];
                if (h != null) this.rows[y].height = h;
            }
    
        }
        if(logicTable.option.columnWidths !== undefined){
            for (let x = 0; x < this.columnCount; x++) {
                const w = logicTable.option.columnWidths[x];
                //this.columns[x].defaultWidth = w;
                if (w != null) this.columns[x].width = w;
            }
    
        }
        */

        for (let y = 0; y < this.rowCount; y++) {
            for (let x = 0; x < this.columnCount; x++) {
                const cell = this.cells[y][x];
                const logicCell = logicTable.cells[y][x];
                if (logicCell.connectedColumnCount > 1 || logicCell.connectedRowCount > 1) {
                    if (cell.canMerge(logicCell.connectedColumnCount, logicCell.connectedRowCount)) {
                        cell.merge(logicCell.connectedColumnCount, logicCell.connectedRowCount);
                    }
                }
            }
        }

        //this.updateNodeRelations();
        if (this.isInitialized) {
            //this.resetUnstableCounter();
            //this.update();
        }


    }

    /**
     * 二次元文字列配列から表を作成します。
     * @param table 各セルの文字列
     * @param option 表情報
     * @param option.x 表のx座標
     * @param option.y 表のy座標
     * @param option.rowHeight 各行の縦幅(px)
     * @param option.columnWidth 各列の横幅(px)
     * @param option.tableClassName 表(svgGroup)のクラス属性
     * @param option.isLatexMode Trueのときセルの文字列をLatex表記とみなして描画します。
     * 
     */
    public construct(table: string[][], option: { tableClassName?: string, x?: number, y?: number, rowHeight?: number, columnWidth?: number, isLatexMode?: boolean } = {}) {
        if (option.isLatexMode == undefined) option.isLatexMode = false;
        if (option.x == undefined) option.x = 0;
        if (option.y == undefined) option.y = 0;
        [this.cx, this.cy] = [option.x, option.y];


        this.clear();
        let width = 0;
        table.forEach((v) => { if (v.length > width) width = v.length });
        let height = table.length;
        this.setSize(width, height);

        table.forEach((v, y) => {
            v.forEach((str, x) => {

                SVGTextExtension.setTextContent(this.cells[y][x].svgText, str, <boolean>option.isLatexMode);
            })
        })
        if (option.rowHeight != undefined) {
            this.rows.forEach((v) => v.height = <number>option.rowHeight);
        }
        if (option.columnWidth != undefined) {
            this.columns.forEach((v) => v.width = <number>option.columnWidth);
        }

    }
    // #endregion
    // #region vba
    /**
     * 表からVBAコードを作成します。
     * @param id 
     * @param slide 
     */
    public createVBACode(id: number): string[] {
        const lines = new Array(0);
        lines.push(`Sub create${id}(createdSlide As slide)`);

        const [main, sub] = this.createVBAMainCode("createdSlide", id);

        lines.push(main);
        lines.push(`End Sub`);
        lines.push(sub);

        return lines;
    }
    /**
     * 現在のテーブルを表すVBAコードを返します。
     */
    private createVBAMainCode(slideName: string, id: number): [string, string] {
        const fstLines: string[] = [];
        const lines: string[][] = new Array(0);

        fstLines.push(` Dim tableS As shape`);
        fstLines.push(` Dim table_ As table`);
        //lines.push(` Set tableS = CreateTable(createdSlide, ${table.height}, ${table.width})`);
        fstLines.push(` Set tableS = ${slideName}.Shapes.AddTable(${this.rowCount}, ${this.columnCount})`)
        fstLines.push(` tableS.Left = ${SVGGExtension.getX(this.svgGroup)}`);
        fstLines.push(` tableS.Top = ${SVGGExtension.getY(this.svgGroup)}`);

        //const backColor = VBATranslateFunctions.colorToVBA(ElementExtension.getPropertyStyleValueWithDefault(this.svgSurface!, "fill", "gray"));
        //const visible = ElementExtension.getPropertyStyleValueWithDefault(this.svgSurface!, "visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";

        fstLines.push(` tableS.name = "${this.objectID}"`)

        //page.Shapes.AddTable(row_, column_)
        fstLines.push(` Set table_ = tableS.table`);

        const tableName = "table_";

        for (let y = 0; y < this.rowCount; y++) {
            lines.push([` Call EditRow(${tableName}.Rows(${y + 1}), ${this.rows[y].height})`]);
        }
        for (let x = 0; x < this.columnCount; x++) {
            lines.push([` Call EditColumn(${tableName}.Columns(${x + 1}), ${this.columns[x].width})`]);
        }

        for (let y = 0; y < this.rowCount; y++) {
            for (let x = 0; x < this.columnCount; x++) {
                const cell = this.cells[y][x];
                let color = Color.createRGBFromColorName(ElementExtension.getPropertyStyleValueWithDefault(cell.svgBackground, "fill", "gray"));
                //const style = cell.svgBackground.style.fill != null ? VBATranslateFunctions.colorToVBA(cell.svgBackground.style.fill) : "";
                VBATranslateFunctions.TranslateSVGTextElement(lines, this.cells[y][x].svgText, `${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame.TextRange`);
                lines.push([`${tableName}.cell(${y + 1},${x + 1}).Shape.Fill.ForeColor.RGB = RGB(CInt(${color.r}), CInt(${color.g}), CInt(${color.b}))`]);
                //lines.push(` Call EditCell(${tableName}.cell(${y + 1},${x + 1}), "${cell.svgText.textContent}", ${color})`);
            }
        }

        for (let y = 0; y < this.rowCount; y++) {
            for (let x = 0; x < this.columnCount; x++) {
                const cell = this.cells[y][x];
                const vAnchor = VBATranslateFunctions.ToVerticalAnchor(cell.verticalAnchor);
                const hAnchor = VBATranslateFunctions.ToHorizontalAnchor(cell.horizontalAnchor);
                lines.push([` Call EditCellTextFrame(${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame, ${cell.paddingTop}, ${cell.paddingBottom}, ${cell.paddingLeft}, ${cell.paddingRight}, ${vAnchor}, ${hAnchor})`]);
            }
        }
        for (let y = 0; y < this.rowCount; y++) {
            for (let x = 0; x < this.columnCount; x++) {
                const cell = this.cells[y][x];
                const upLineStyle = VBATranslateFunctions.colorToVBA(ElementExtension.getPropertyStyleValueWithDefault(cell.svgTopBorder, "stroke", "gray"));
                const upLineStrokeWidth = cell.svgTopBorder.style.strokeWidth != null ? parseInteger(cell.svgTopBorder.style.strokeWidth) : "";
                const upLineVisibility = cell.svgTopBorder.style.visibility != null ? styleVisible(cell.svgTopBorder.style) : "";

                lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderTop), ${upLineStyle}, ${upLineStrokeWidth}, ${upLineVisibility})`]);

                const leftLineStyle = VBATranslateFunctions.colorToVBA(ElementExtension.getPropertyStyleValueWithDefault(cell.svgLeftBorder, "stroke", "gray"));
                const leftLineStrokeWidth = cell.svgLeftBorder.style.strokeWidth != null ? parseInteger(cell.svgLeftBorder.style.strokeWidth) : "";
                const leftLineVisibility = cell.svgLeftBorder.style.visibility != null ? styleVisible(cell.svgLeftBorder.style) : "";

                lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderLeft), ${leftLineStyle}, ${leftLineStrokeWidth}, ${leftLineVisibility})`]);
                if (x + 1 == this.columnCount) {

                    const rightLineStyle = VBATranslateFunctions.colorToVBA(ElementExtension.getPropertyStyleValueWithDefault(cell.svgRightBorder, "stroke", "gray"));
                    const rightLineStrokeWidth = cell.svgRightBorder.style.strokeWidth != null ? parseInteger(cell.svgRightBorder.style.strokeWidth) : "";
                    const rightLineVisibility = cell.svgRightBorder.style.visibility != null ? styleVisible(cell.svgRightBorder.style) : "";

                    lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderRight), ${rightLineStyle}, ${rightLineStrokeWidth}, ${rightLineVisibility})`]);
                }

                if (y + 1 == this.rowCount) {
                    const bottomLineStyle = VBATranslateFunctions.colorToVBA(ElementExtension.getPropertyStyleValueWithDefault(cell.svgBottomBorder, "stroke", "gray"));
                    const bottomLineStrokeWidth = cell.svgBottomBorder.style.strokeWidth != null ? parseInteger(cell.svgBottomBorder.style.strokeWidth) : "";
                    const bottomLineVisibility = cell.svgBottomBorder.style.visibility != null ? styleVisible(cell.svgBottomBorder.style) : "";

                    lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderBottom), ${bottomLineStyle}, ${bottomLineStrokeWidth}, ${bottomLineVisibility})`]);
                }

            }
        }
        this.createCellArray().forEach((v) => {
            if (v.isMaster) {
                const cells = v.cellsInGroup;
                for (let y = 0; y < cells.length; y++) {
                    for (let x = 1; x < cells[y].length; x++) {
                        lines.push([` ${tableName}.Cell(${cells[y][0].cellY + 1}, ${cells[y][0].cellX + 1}).Merge MergeTo := ${tableName}.Cell(${cells[y][x].cellY + 1}, ${cells[y][x].cellX + 1})`]);
                    }
                }
                for (let y = 1; y < cells.length; y++) {
                    lines.push([` ${tableName}.Cell(${cells[0][0].cellY + 1}, ${cells[0][0].cellX + 1}).Merge MergeTo := ${tableName}.Cell(${cells[y][0].cellY + 1}, ${cells[y][0].cellX + 1})`]);
                }
            }
        });

        const x0 = VBATranslateFunctions.joinLines(fstLines);
        const [x1, y1] = VBATranslateFunctions.splitCode(lines, `${tableName} as Table`, `${tableName}`, id);
        return [VBATranslateFunctions.joinLines([x0, x1]), y1];
    }

    // #endregion


    //private _updateCounter = 0;


    // #region dynamic

    /**
     * 新しいセルを作成します。
     */
    /*
    private createCell(cellX: number, cellY: number): Cell {
        const cellClass = this.defaultCellClass == null ? undefined : this.defaultCellClass;
        const borderClass = this.defaultBorderClass == null ? undefined : this.defaultBorderClass;

        const option: CellOption = { cellClass: cellClass, borderClass: borderClass };
        return new Cell(this, cellX, cellY, option);
    }
    */
    /*
    Dynamic Method
    */

    /**
     * テーブルを削除します。
     * @param svg 表が格納されているSVG要素
     */
    public removeTable(svg: SVGElement) {
        if (svg.contains(this.svgGroup)) {
            svg.removeChild(this.svgGroup);
        }
    }

    private isSetSize = false;

    private firstSetSize() {
        this.createRowBorder(0, 1);
        this.createRowBorder(1, 1);
        this.createColumnBorder(0, 1);
        this.createColumnBorder(1, 1);
        this._rows.splice(0, 0, new CellRow(this, 0, undefined));
        this._rows[0]._appendCell(this._cellMap);
        this._columns.splice(0, 0, new CellColumn(this, 0));
    }

    private borderSizeCheck(_w: number, _h: number): void {
        const w = this.borderRows[0].borders.length;
        const h = this.borderColumns[0].borders.length;
        if (w != _w) throw Error(`error ${_w} ${_h} ${w} ${h}`);
        if (h != _h) throw Error(`error ${_w} ${_h} ${w} ${h}`);

        this.borderRows.forEach((v, i) => {
            if (w != v.borders.length) throw Error("border rows error");
        })
        this.borderColumns.forEach((v, i) => {
            if (h != v.borders.length) throw Error(`border column error ${h} ${v.borders.length} ${i}`);
        })

        //return [w, h];
    }
    /**
     * 表の列数と行数を変更します。
     * @param columnCount 列数 
     * @param rowCount 行数
     */
    public setSize(columnCount: number, rowCount: number) {

        this.clear();
        this.isSetSize = true;
        const borderRowCount = rowCount + 1;
        const borderColumnCount = columnCount + 1;
        if (this.rowCount == 0 || this.columnCount == 0) throw Error("Table Empty Error");

        /*
        while (this._borderRows.length < rowCount + 1) {
            const i = this._borderRows.length;
            this.createRowBorder(i);
            this.insertLineIntoColumns(i)
            //this.createRow(i-1);
        }
        */
        while (this.rowCount < rowCount) {
            this.primitiveInsertRow(this.rowCount, false);
        }
        while (this.columnCount < columnCount) {
            this.primitiveInsertColumn(this.columnCount, false);
        }
        /*
        this.borderSizeCheck(1, rowCount);
        while (this._borderColumns.length < columnCount + 1) {
            const i = this._borderColumns.length + 1;
            this.createColumnBorder(i);
            this.insertLineIntoRows(i);
        }
        this.borderSizeCheck(columnCount, rowCount);

        while (this.columnCount < columnCount) {
            this.createColumn(this.columnCount);
        }
        */

        /*
        while (this.rowCount < rowCount) {
            this.createRow(this.rowCount);
        }
        */





        this.updateNodeRelations();
        this.isSetSize = false;

        /*
        this.renumbering();
        this.update();
        */

    }
    private primitiveInsertRow(ithRow: number, insertTopBorders: boolean) {
        let ithRowBorder = insertTopBorders ? ithRow : ithRow + 1;
        if (ithRow < 0 || ithRow > this.rowCount) throw new Error("primitive insert row error");
        if (ithRow == 0) ithRowBorder = 0;
        if (ithRow == this.rowCount) ithRowBorder = this.borderRows.length;


        this.createRowBorder(ithRowBorder);
        this.insertYVerticalBorders(ithRow)
        this.createRow(ithRow);
    }
    private primitiveInsertColumn(ithColumn: number, insertLeftBorders: boolean) {
        let ithColumnBorder = insertLeftBorders ? ithColumn : ithColumn + 1;
        if (ithColumn < 0 || ithColumn > this.columnCount) throw new Error("primitive insert column error");
        if (ithColumn == 0) ithColumnBorder = 0;
        if (ithColumn == this.columnCount) ithColumnBorder = this.borderColumns.length;

        this.createColumnBorder(ithColumnBorder);
        this.insertXHorizontalBorders(ithColumn);
        this.createColumn(ithColumn);
    }

    public get borderColumnCount(): number {
        return this.columnCount + 1;
    }
    public get borderRowCount(): number {
        return this.rowCount + 1;
    }

    /**
     * rowCount = 0, columnCount = 0のテーブルを作成します。
     */
    public clear() {
        if (this.rowCount == 0 || this.columnCount == 0) throw Error("Table Empty Error");
        if (this.columnCount != this.columns.length) throw Error("clear error");

        while (this.rowCount > 1) {
            this.primitiveRemoveRow(1, false);
        }
        while (this.columnCount > 1) {
            this.primitiveRemoveColumn(1, false);
        }

        this.updateNodeRelations();

    }
    /*
    public removeCell(i: number) {
        this.cells[i].removeFromTable(false);
        //this.cells.forEach((v) => v.removeFromTable(false));
        this.cells.splice(i, 1);
    }
    */
    private removeCellRow(i: number) {
        this.rows[i]._dispose();
        this.rows.splice(i, 1);
    }
    private removeCellColumn(i: number) {
        this.columns[i]._dispose();
        this.columns.splice(i, 1);
    }

    private primitiveRemoveRow(ithRow: number, removeTopBorders: boolean) {
        const ithBorderRow = removeTopBorders ? ithRow : ithRow + 1;
        if (ithRow < 0 || ithRow >= this.rowCount) throw new Error("error");

        //this.removeRow(rowi);
        this.removeCellRow(ithRow);;
        this.removeRowBorder(ithBorderRow);
        this.deleteYVerticalBorders(ithRow);
    }

    private primitiveRemoveColumn(ithColumn: number, removeLeftBorders: boolean) {
        const ithborderColumn = removeLeftBorders ? ithColumn : ithColumn + 1;
        if (ithColumn < 0 || ithColumn >= this.columnCount) throw new Error("primitive insert column error");

        this.removeCellColumn(ithColumn);
        //this.columns[ithColumn].remove(true);
        //this.table.columns.splice(x, 1);


        this.removeColumnBorder(ithborderColumn);
        this.deleteXHorizontalBorders(ithColumn);

    }

    private removeColumnBorder(i: number) {
        //this._borderRows.forEach((v) => v.removeBorder(i));
        this._borderColumns[i].remove();
        this._borderColumns.splice(i, 1);
    }
    private removeRowBorder(i: number) {
        //this._borderColumns.forEach((v) => v.removeBorder(i));
        this._borderRows[i].remove();
        this._borderRows.splice(i, 1);
    }


    public removeRow(ithRow: number) {
        this.primitiveRemoveRow(ithRow, false);
        this.updateNodeRelations();
        //this.resetUnstableCounter();
        //this.update();
    }


    public removeColumn(ithColumn: number) {
        this.primitiveRemoveColumn(ithColumn, false);
        this.updateNodeRelations();
        //this.resetUnstableCounter();

        //this.update();
    }

    private deleteXHorizontalBorders(i: number) {
        this._borderRows.forEach((v) => {
            v.removeBorder(i);
        })
    }
    private deleteYVerticalBorders(i: number) {
        this._borderColumns.forEach((v) => {
            v.removeBorder(i);
        })
    }

    private createColumnBorder(i: number, borderRowCount: number = this.borderRows.length - 1) {
        const column = new BorderColumn(this, i, borderRowCount, undefined);
        this._borderColumns.splice(i, 0, column);
    }
    private createRowBorder(i: number, borderColumnCount: number = this.borderColumns.length - 1) {
        const row = new BorderRow(this, i, borderColumnCount, undefined);
        this._borderRows.splice(i, 0, row);
    }

    private createRow(i: number) {
        //const cell: Cell[] = [];
        //this.cells.splice(i, 0, cell);
        const columnCount = this.columnCount;
        const row = new CellRow(this, i, undefined);
        this._rows.splice(i, 0, row);
        row._appendCell(this._cellMap, columnCount);
        /*
        for (let x = 0; x < this.columnCount; x++) {
            cell[x] = this.createCell(x, i);
            if (this._columns.length <= x) this._columns.push(new Column(this, 0));
        }
        */
    }
    private createColumn(i: number) {
        for (let y = 0; y < this.rowCount; y++) {
            this.rows[y]._insertCell(i, this._cellMap);
            //const cell = this.createCell(i, y);
            //this.cells[y].splice(i, 0, cell);
        }
        this._columns.splice(i, 0, new CellColumn(this, i));
    }
    private insertXHorizontalBorders(i: number) {
        this._borderRows.forEach((v) => {
            v.insertBorder(i, undefined);
        })
    }
    private insertYVerticalBorders(i: number) {
        this._borderColumns.forEach((v) => {
            v.insertBorder(i, undefined);
        })
    }



    /**
    * 新しい行をi番目の行に挿入します
    * @param 挿入行の行番号
    */
    public insertRow(ithRow: number) {
        this.primitiveInsertRow(ithRow, false);
        this.updateNodeRelations();
        //this.resetUnstableCounter();
        //this.update();

    }
    /**
    * 新しい列をi番目の列に挿入します。
    * @param ithColumn 挿入列の列番号
    */
    public insertColumn(ithColumn: number) {
        this.primitiveInsertColumn(ithColumn, false)
        this.updateNodeRelations();
        //this.resetUnstableCounter();

        //this.update();
    }
    /**
     * 新しい行を作って挿入します。
     * @param i 挿入行の行番号
     * @param columnCount 挿入行の列数
     */
    /*
    private insertRowFunction(i: number, columnCount: number = this.columnCount) {
        const cell: Cell[] = [];

        this.cells.splice(i, 0, cell);
        this._rows.splice(i, 0, new Row(this, i));
        for (let x = 0; x < columnCount; x++) {
            cell[x] = this.createCell(x, i);
            if (this._columns.length <= x) this._columns.push(new Column(this, 0));
        }

    }
    */
    /**
    新しい列を最後の列に追加します。
    */
    public appendColumn() {
        //this.insertColumn(this.columnCount);
        this.primitiveInsertColumn(this.columnCount, false)
        this.updateNodeRelations();
        //this.resetUnstableCounter();
        //this.update();

    }

    /**
    新しい行を行の最後に追加します。
    */
    public appendRow() {
        //this.insertRow(this.rowCount);
        this.primitiveInsertRow(this.rowCount, false);
        this.updateNodeRelations();
        //this.resetUnstableCounter();

        //this.update();
        //this.update();
    }
    // #endregion

    // #region update
    //private prevShow: boolean = false;

    /*
    private tryUpdateWithUpdateFlag(withUpdate : boolean) : boolean{
        let b = super.getUpdateFlag();

        this.hasConnectedObserverFunction = false;


        const xb = HTMLFunctions.isShow(this.svgGroup);
        if (!xb) {
            return false;
        }

        this._isDrawing = true;


        const cells = this.cellArray;
        for(let i =0;i<cells.length;i++){
            b = cells[i].tryUpdateWithUpdateFlag(withUpdate) || b;
            if(!withUpdate && b){
                
                Debugger.updateFlagLog(this, this.tryUpdateWithUpdateFlag,`${cells[i].tryUpdateWithUpdateFlag.name}`);
                this._isDrawing = false;
                this.hasConnectedObserverFunction = true;        
                return b;
            }
        }


        b = this.fitSizeToOriginalCellsWithUpdateFlag(true, withUpdate) || b;
        if(!withUpdate && b){
            Debugger.updateFlagLog(this, this.tryUpdateWithUpdateFlag,`${this.fitSizeToOriginalCellsWithUpdateFlag.name}`);

            this._isDrawing = false;
            this.hasConnectedObserverFunction = true;    
            return b;
        }
    
        this.prevShow = false;


        b = this.tryResizeWithUpdateFlag(withUpdate) || b;

        if(!withUpdate && b){
            Debugger.updateFlagLog(this, this.tryUpdateWithUpdateFlag,this.tryResizeWithUpdateFlag.name);


            this._isDrawing = false;
            this.hasConnectedObserverFunction = true;    
            return b;
        }


        b = this.relocateWithUpdate(withUpdate) || b;

        if(!withUpdate && b){
            Debugger.updateFlagLog(this, this.tryUpdateWithUpdateFlag,this.relocateWithUpdate.name);

        }

        this._isDrawing = false;
        this.hasConnectedObserverFunction = true;
        return b;
    }
    /*

    public getUpdateFlag(): boolean {
        return this.tryUpdateWithUpdateFlag(false);
        
    }


    /**
    各セルのサイズを再計算します。
    */
    public update() {
        super.update();
        //this.tryUpdateWithUpdateFlag(true);

    }

    protected connectObserverFunction() {
        this._observer.observe(this.svgGroup, this.groupObserverOption);
    }

    /**
     * セル番号を振り直します。
     */
    /*
    private renumbering() {

        this.rows.forEach((v, i) => v.cellY = i);
        this.columns.forEach((v, i) => v.cellX = i);
        //this.cellArray.forEach((v) => v.updateBorderAttributes());

    }
    */

    private updateNodeRelations() {
        this.rows.forEach((v, i) => v.cellY = i);
        this.columns.forEach((v, i) => v.cellX = i);
        this.borderRows.forEach((v, i) => {
            if (v.borders.length != this.columnCount) {
                throw new Error(`error row ${i} ${v.borders.length} ${this.columnCount}`);
            }
        })
        this.borderColumns.forEach((v, i) => {
            if (v.borders.length != this.rowCount) {
                throw new Error(`error column ${i} ${v.borders.length} ${this.rowCount}`);

            }
        })

        this.createCellArray().forEach((v) => v.updateNodeRelations());

    }

    /*
    private tryResizeWithUpdateFlag(withUpdate : boolean) : boolean {
        let b = false;
        for(let i = 0;i<this.rows.length;i++){
            //b = this.rows[i].tryResizeWithUpdateFlag(withUpdate) || b;
            b = this.rows[i].setHeightToCellsWithUpdateFlag(withUpdate) || b;

            if(!withUpdate && b){
                return b;
            }
        }

        for(let i = 0;i<this.columns.length;i++){
            b = this.columns[i].setWidthToCellsWithUpdateFlag(withUpdate) || b;
            if(!withUpdate && b){
                return b;
            }
        }
        return b;

    }
    */
    /*
    private updateBorders() : boolean{
        const withUpdate = true;
        let b  = false;

        const date1 = new Date();
        (this.createCellArray()).forEach((v) =>{
            if(v.isMaster){
                b = UpdateBorder.tryUpdateBordersWithUpdateFlag(v, withUpdate) || b;
            }
        })
        const date2 = new Date();
        Debugger.showTime(date1, date2, `Table: ${this.objectID}`, "updateBorders")

        return b;
    }
    */


    /**
     * サイズを再計算します。
     */
    /*
    private resize() {
        this.tryResizeWithUpdateFlag(true);

    }
    */
    public get childrenStableFlag(): boolean {
        let b = true;
        for (let i = 0; i < this.rows.length; i++) {
            if (!this.rows[i].stableFlag) {
                b = false;
                break;
            }
        }
        return b;

    }
    /*
    private relocation() {
        this.relocateWithUpdate(true);
    }
    */
    // #endregion


    /*
    public deleteLastRow() {
        this.rows[this.rowCount - 1].remove(true);
    }
    public deleteLastColumn() {
        this.deleteColumn(this.columnCount - 1);
    }
    */
    /*
    public deleteColumn(i: number) {
        const [b,e] = this.columns[i].groupColumnRange;
        for (let x = e; x >= b; x--) {
            this.columns[x].remove();
        }
    }
    */
    /*
    public deleteRow(i: number) {
        
        const [b, e] = this.rows[i].groupRowRange;
        for (let y = e; y >= b; y--) {
            this.rows[y].remove();
        }
    }
    */
    /*
    private splitCode(tableName: string, codes: string[], id: number): [string, string] {
        const functions: string[] = [];

        const p = VBATranslateFunctions.grouping80(codes);
        p.forEach(function (x, i, arr) {
            functions.push(`Call SubFunction${id}_${i}(${tableName})`);
            const begin = `Sub SubFunction${id}_${i}(${tableName} As Table)`;
            const end = `End Sub`;
            p[i] = VBATranslateFunctions.joinLines([begin, x, end]);
        });
        return [VBATranslateFunctions.joinLines(functions), VBATranslateFunctions.joinLines(p)];
    }
    */
    /*
    public constructFromLogicCell(table: LogicCell[][], isLatexMode: boolean = false) {

    }
    */
    /*
    public get x() : number {
        return this.svgGroup.getX();
    }
    public set x(value :number) {
        this.svgGroup.setX(value);
    }
    public get y() : number {
        return this.svgGroup.getY();
    }
    public set y(value :number) {
        this.svgGroup.setY(value);
    }
    */

    /**
            * 接続部分の座標を返します。
            * @param type
            * @param x
            * @param y
            */
    public getContactPosition(type: ConnectorType, x: number, y: number): [number, number] {
        const wr = this.width / 2;
        const hr = this.height / 2;


        switch (type) {
            case ConnectorType.Top:
                return [this.cx, this.cy - hr];
            case ConnectorType.TopRight:
            case ConnectorType.Right:
            case ConnectorType.BottomRight:
                return [this.cx + wr, this.cy];
            case ConnectorType.Bottom:
                return [this.cx, this.cy + hr];
            case ConnectorType.BottomLeft:
            case ConnectorType.Left:
            case ConnectorType.TopLeft:
                return [this.cx - wr, this.cy];
            default:
                const autoType = this.getContactAutoPosition(x, y);
                return this.getContactPosition(autoType, x, y);
        }
    }
    public getContactAutoPosition(x: number, y: number): ConnectorType {
        const wr = this.width / 2;
        const hr = this.height / 2;

        const line1 = new VLine(this.cx, this.cy, this.cx + wr, this.cy + hr);
        const line2 = new VLine(this.cx, this.cy, this.cx + wr, this.cy - hr);

        const b1 = line1.contains(x, y);
        const b2 = line2.contains(x, y);

        if (b1) {
            if (b2) {
                return ConnectorType.Top;
            } else {
                return ConnectorType.Right;
            }
        } else {
            if (b2) {
                return ConnectorType.Left;
            } else {
                return ConnectorType.Bottom;
            }
        }

    }
    public getVirtualWidth(): number {
        return this.columns.reduce((w, v) => w + v.getVirtualSize().width, 0);
    }
    public getVirtualHeight(): number {
        return this.rows.reduce((w, v) => w + v.getVirtualSize().height, 0);
    }

}
//}