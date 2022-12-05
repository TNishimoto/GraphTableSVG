//namespace GraphTableSVG {    
import { Cell, CellOption } from "./cell"
import * as SVG from "../../interfaces/svg"
import { ZTable } from "../z_table"
import { Rectangle, Size, round100, nearlyEqual } from "../../common/vline";
import { setAttributeNumber } from "../../interfaces/element_extension";
import { Debugger } from "../../common/debugger";
import { GOptions } from "..";
import * as GObserver from "../z_observer";
import * as AttributeNames from "../../common/attribute_names"
import { getSVGSVGAncestor } from "../../html/html_functions";
import { IObject } from "../i_object"
import { GlobalZObjectManager } from "../global_gobject_manager";

/**
 * 表の行を表現するクラスです。
 */
export class CellRow implements IObject {
    private readonly table: ZTable;
    //private readonly _cellY: number;
    private _svgGroup: SVGGElement;
    public static readonly heightAttributeName = "data-height";
    public static readonly minimumHeightAttributeName = "data-minimum-height";

    public static readonly defaultHeight = 20;
    constructor(_table: ZTable, _y: number, _height: number = CellRow.defaultHeight) {
        this.table = _table;
        this._svgGroup = SVG.createGroup(this.table.svgGroup);
        this.svgGroup.setAttribute("name", "cell_row");
        this.stableFlag = false;
        this.table.svgGroup.insertBefore(this.svgGroup, this.table.svgRowBorderGroup);

        this.cellY = _y;
        this._svgGroup.setAttribute(CellRow.heightAttributeName, `${_height}`);
        //this.unstableCounter = GObserver.unstableCounterDefault;

        const svgsvgAncestor = getSVGSVGAncestor(this.svgGroup);
        if (svgsvgAncestor != null) {
            const xb = GlobalZObjectManager.tryRegisterSVGSVGElement(svgsvgAncestor);
            xb.registerObject(this);
        }


        /*
        for(let i=0;i<cellCount;i++){
            this._cells.push(this.createCell(i, _y));
        }
        */
        //this.height = this.getMaxHeight();

    }
    get minimumHeight() : number {
        const attr = this.svgGroup.getAttribute(CellRow.minimumHeightAttributeName);
        if(attr != null){
            return Number.parseInt(attr);
        }else{
            return CellRow.defaultHeight;
        }
    }
    set minimumHeight(value : number) {
        this.svgGroup.setAttribute(CellRow.minimumHeightAttributeName, value.toString());
    }

    /*
    public get unstableCounter(): number | null {
        const p = this.svgGroup.getAttribute(GObserver.unstableCounterName);
        if (p == null) {
            return null;
        } else {
            const num = Number(p);
            return num;
        }
    }
    private set unstableCounter(value: number | null) {
        if (value == null) {
            this.svgGroup.removeAttribute(GObserver.unstableCounterName)
        } else {
            this.svgGroup.setAttribute(GObserver.unstableCounterName, value.toString());
 
        }
    }
    public resetUnstableCounter(): void {
        this.unstableCounter = GObserver.unstableCounterDefault;
    }
    */
    public get childrenStableFlag(): boolean {
        let b = true;
        for (let i = 0; i < this._cells.length; i++) {
            if (!this._cells[i].stableFlag) {
                b = false;
                break;
            }
        }
        return b;

    }
    public updateSurfaceWithoutSVGText(): boolean {
        if (this.childrenStableFlag) {
            return true;

        } else {
            return false;
        }
    }


    private createCell(cellX: number, cellY: number, cellMap: Map<string, Cell>): Cell {
        const cellClass = undefined; //this.table.defaultCellClass == null ? undefined : this.table.defaultCellClass;
        const borderClass = undefined
        //this.table.defaultBorderClass == null ? undefined : this.table.defaultBorderClass;

        const option: CellOption = { cellClass: cellClass, borderClass: borderClass };
        return new Cell(this.table, cellX, cellY, cellMap, option);
    }
    public _insertCell(i: number, cellMap: Map<string, Cell>) {
        const cell = this.createCell(i, this.cellY, cellMap);
        this.cells.splice(i, 0, cell);
    }
    public _appendCell(cellMap: Map<string, Cell>, num: number = 1) {
        for (let i = 0; i < num; i++) {
            const cell = this.createCell(this.cells.length, this.cellY, cellMap);
            this.cells.push(cell);
        }
    }

    /*
    public removeCell(i: number) {
        this.cells[i].removeFromTable(false);
        //this.cells.forEach((v) => v.removeFromTable(false));
        this.cells.splice(i, 1);
    }

    */
    private _cells: Cell[] = [];
    public get cells(): Cell[] {
        return this._cells;
    }
    public get length() {
        return this.cells.length;
    }

    public get svgGroup(): SVGGElement {
        return this._svgGroup;
    }
    public get stableFlag(): boolean {
        return this.svgGroup.getAttribute(GObserver.ObjectStableFlagName) == "true";
    }
    private set stableFlag(b: boolean) {
        this.svgGroup.setAttribute(GObserver.ObjectStableFlagName, b ? "true" : "false");
    }

    /**
    列の単位セルのY座標を返します。
    */
    public get cellY(): number {
        return Number(this._svgGroup.getAttribute(Cell.cellYName));
    }
    public set cellY(v: number) {
        this._svgGroup.setAttribute(Cell.cellYName, `${v}`);
        this.cells.forEach((w) => w.cellY = v);
    }
    /**
    行の高さを返します。
    */
    get height(): number {
        return Number(this._svgGroup.getAttribute(CellRow.heightAttributeName));
    }
    /**
    行の高さを設定します。
    */
    set height(value: number) {
        setAttributeNumber(this._svgGroup, CellRow.heightAttributeName, round100(value))
        //this._svgGroup.setAttribute(CellRow.columnHeightName, `${value}`);
        //this.setHeightToCells();
        /*
        let b = false;
        for (let x = 0; x < this.table.columnCount; x++) {
            const cell = this.table.cells[this.cellY][x];
            if (cell.isRowSingleCell && cell.height != value) {
                cell.height = value;
                b = true;
            }
        }
        for (let x = 0; x < this.table.columnCount; x++) {
            const cell = this.table.cells[this.cellY][x];
            if (!cell.isRowSingleCell) {
                cell.update();
                //cell.resize();
                b = true;
            }
        }
        if (b && !this.table.isDrawing && this.table.isAutoResized) this.table.update();
        */
    }
    getVirtualSize(): Size {
        let height = 0;
        let width = 0;
        for (let x = 0; x < this.table.columnCount; x++) {
            const cell = this.table.cells[this.cellY][x];
            const rect = cell.getVirtualRegion();
            if (cell.isMasterCellOfRowCountOne) {
                if (height < rect.height) height = rect.height;

            }
            width += cell.master.getVirtualRegion().width;
        }
        return new Size(round100(width), round100(height));

    }


    /**
     * この行のセル配列を返します。
     */
    /*
     public get cells(): Cell[] {
        return this.table.cells[this.cellY];
    }
    */
    /**
     * この行のセルの上にある枠の配列を返します。
     */
    public get topBorders(): SVGLineElement[] {
        const r: SVGLineElement[] = [];
        this.cells.forEach((v) => {
            if (r.length == 0) {
                r.push(v.svgTopBorder);
            } else {
                const last = r[r.length - 1];
                if (last != v.svgTopBorder) r.push(v.svgTopBorder);
            }
        });
        return r;
    }
    /**
     * この行のセルの下にある枠の配列を返します。
     */
    public get bottomBorders(): SVGLineElement[] {
        const r: SVGLineElement[] = [];
        this.cells.forEach((v) => {
            if (r.length == 0) {
                r.push(v.svgBottomBorder);
            } else {
                const last = r[r.length - 1];
                if (last != v.svgBottomBorder) r.push(v.svgBottomBorder);
            }
        });
        return r;
    }
    /**
     * この行のセルの左にある枠を返します。
     */
    public get leftBorder(): SVGLineElement {
        return this.cells[0].svgLeftBorder;
    }
    /**
     * この行のセルの右にある枠を返します。
     */
    public get rightBorder(): SVGLineElement {
        const cells = this.cells;
        return cells[cells.length - 1].svgRightBorder;
    }
    /*
    public setHeightToCellsWithUpdateFlag(withUpdate : boolean) : boolean {
        let b = false;
        const height = Math.max(this.height, CellRow.defaultHeight);
        for (let x = 0; x < this.table.columnCount; x++) {
            const cell = this.table.cells[this.cellY][x];
            if (cell.isMasterCellOfRowCountOne && !nearlyEqual(cell.height, height)) {
                b = true;
                if(withUpdate){
                    cell.height = height;
                }
                if(!withUpdate && b){
                    Debugger.updateFlagLog(this, this.setHeightToCellsWithUpdateFlag, `${cell.height} != ${height}`)

                    return b;
                }
            }
        }
        for (let x = 0; x < this.table.columnCount; x++) {
            const cell = this.table.cells[this.cellY][x];
            if (!cell.isMasterCellOfRowCountOne) {
                b = cell.tryUpdateWithUpdateFlag(withUpdate)  || b;

                if(!withUpdate && b){
                    Debugger.updateFlagLog(this, this.setHeightToCellsWithUpdateFlag, `${cell.tryUpdateWithUpdateFlag.name} x = ${x}`)
                    return b;
                }
            }
        }
        return b;

    }
    */

    //public setHeightToCells() {
    //this.setHeightToCellsWithUpdateFlag(true);
    // TODO : implement the event of the below code.
    //if (b && !this.table.isDrawing && this.table.isAutoResized) this.table.update();
    //}
    /**
     * この行を更新します。
     */
    /*
     public update() {
        this.setHeightToCells();
        //this.height = this.getMaxHeight();
    }
    */

    /*
    public tryResizeWithUpdateFlag(withUpdate : boolean) : boolean {
        let b = false;
        const cells = this.cells;
        for(let i = 0;i<cells.length;i++){
            b = cells[i].tryUpdateWithUpdateFlag(withUpdate)  || b;
            if(!withUpdate && b){
                return b;
            }
        }
        b = this.setHeightToCellsWithUpdateFlag(withUpdate)  || b;
        return b;
    }
    */

    /**
     * 行内のセルのサイズを再計算します。
     */
    //public resize() {
    //this.setHeightToCellsWithUpdateFlag(true);
    //this.tryResizeWithUpdateFlag(true);
    //this.height = this.getMaxHeight();
    //}
    public tryUpdateHeightWithUpdateFlag(allowShrink: boolean, withUpdate: boolean): boolean {
        let b = false;
        const __height = allowShrink ? this.getVirtualSize().height : Math.max(this.height, this.getVirtualSize().height);
        const newHeight = Math.max(this.minimumHeight, round100(__height));

        if (!nearlyEqual(this.height, newHeight)) {
            b = true;
            if (withUpdate) {
                this.height = newHeight;
            } else {
                Debugger.updateFlagLog(this, this.tryUpdateHeightWithUpdateFlag, `Height: ${this.height} -> ${newHeight}`)
            }
        }
        return b;

    }

    /**
     * セルの元々のサイズに合わせて行のサイズを調整します。
     * @param allowShrink 現在の行の幅より短くなることを許す
     */
    public fitHeightToOriginalCell(allowShrink: boolean) {
        this.tryUpdateHeightWithUpdateFlag(allowShrink, true);
    }
    public setYWithUpdate(posY: number, withUpdate: boolean): boolean {
        const posY100 = round100(posY);
        let b = false;
        for (let x = 0; x < this.table.columnCount; x++) {
            const cell = this.table.cells[this.cellY][x];
            if (cell.y != posY100) {
                b = true;
                if (withUpdate) {
                    cell.y = posY100;
                }
                if (!withUpdate && b) {
                    return b;
                }
            }
        }
        return b;
    }

    /**
     * 行内のセルのY座標を設定します。
     * 
     */
    public setY(posY: number) {
        this.setYWithUpdate(posY, true);
    }
    /**
     * この行の最大の縦幅を持つセルの縦幅を返します。
     */
    /*
    private getMaxHeight(): number {
        let height = 0;
        for (let x = 0; x < this.table.columnCount; x++) {
            const cell = this.table.cells[this.cellY][x];
            const rect = cell.getVirtualRegion();
            if (cell.isMasterCellOfRowCountOne) {
                if (height < rect.height) height = rect.height;
                if (height < cell.height) height = cell.height;
            }
        }
        return height;
    }
    */
    private get selfy(): number {
        for (let i = 0; i < this.table.rowCount; i++) {
            if (this.table.rows[i] == this) {
                return i;
            }
        }
        throw new Error("error");
    }
    public _dispose() {
        while (this.length > 0) {
            const x = this.length - 1;
            this._removeCell(x);
        }
        this.svgGroup.remove();
        //this.rows.splice(this.rows[i].selfy, 1);
    }
    public _removeCell(i: number) {
        this.cells[i].removeFromTable(false);
        this.cells.splice(i, 1);

    }

    /**
     * この行を取り除きます。
     * @param isUnit 
     */
    /*
    public remove(isUnit: boolean = false) {
        while (this.cells.length > 0) this.removeCell(this.cells.length - 1);
        this.svgGroup.remove();
        this.table.rows.splice(this.selfy, 1);
    }
    */
    /*
    public updateBorders() {
        this.cells.forEach((v) => v.updateBorder());
    }
    */
    /**
     * この行の各セルを再配置します。
     */
    //public relocation() {
    //    this.cells.forEach((v) => v.relocation());
    //}

    /**
     * この行に属しているグループセルによって関係している行の範囲を返します。
     */
    public get groupRowRange(): [number, number] {
        let range: [number, number] | null = this.cells[0].groupRowRange;
        this.cells.forEach((v) => {
            if (range != null) {
                range = Cell.computeDisjunction(range, v.groupRowRange);
            }
        })
        if (range == null) {
            throw Error("error");
        } else {
            return range;
        }
    }

    /*
    public getBase1UpdateFlag(){
        const b = this.cells.every((v) => v.unstableCounter == null);
        return !b;
    }
    public base1Update(){
        this.cells.forEach((v) => {
            const b = v.tryUpdateWithUpdateFlag(true);
            if(b){
                v.resetUnstableCounter();
            }else{
                GObserver.decrementUnstableCounter(v);
            }
        })
    }
    */
    public get objectID(): string {
        return this.svgGroup.getAttribute(AttributeNames.objectIDName)!;
    }

}

//}