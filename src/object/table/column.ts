//namespace GraphTableSVG {
    import {Cell} from "./cell"
    //import {BorderRow} from "./border_row"
    
    import {CellOption} from "../../options/attributes_option"
    import {SVG} from "../../svghtml/svg"    
    import {GTable} from "../g_table"

    /**
     * 表の列を表現するクラスです。
     */
    export class CellColumn {
        private readonly table: GTable;
        //private readonly _cellX: number;
        public static readonly rowWidthName = "data-width";
        private _svgGroup: SVGGElement;

        /**
        列の単位セルのX座標を返します。
        */
        public get cellX(): number {
            return Number(this._svgGroup.getAttribute(Cell.cellXName));
        }
        public set cellX(v: number) {
            this._svgGroup.setAttribute(Cell.cellXName, `${v}`);
            this.cells.forEach((w) => w.cellX = v);
        }

        //public defaultWidth : number | null = null;

        /**
        列の幅を返します。
        */
        get width(): number {
            return Number(this._svgGroup.getAttribute(CellColumn.rowWidthName));
        }
        /**
        列の幅を設定します。
        */
        set width(value: number) {
            this._svgGroup.setAttribute(CellColumn.rowWidthName, `${value}`);
            this.setWidthToCells();
            /*
            let b = false;
            for (let y = 0; y < this.table.rowCount; y++) {
                const cell = this.table.cells[y][this.cellX];
                if (cell.isColumnSingleCell && cell.width != value) {
                    cell.width = value;
                    b = true;
                }
            }
            for (let y = 0; y < this.table.rowCount; y++) {
                const cell = this.table.cells[y][this.cellX];
                if (!cell.isColumnSingleCell) {
                    cell.update();
                    //cell.resize();
                    b = true;
                }
            }
            if (b && !this.table.isDrawing && this.table.isAutoResized) this.table.update();
            */
        }
        private setWidthToCells(){
            //const width = this.defaultWidth == null ? this.width : this.defaultWidth;

            const width = this.width;
            
            let b = false;
            for (let y = 0; y < this.table.rowCount; y++) {
                const cell = this.table.cells[y][this.cellX];
                if (cell.isMasterCellOfColumnCountOne && cell.width != width) {
                    cell.width = width;
                    b = true;
                }
            }
            for (let y = 0; y < this.table.rowCount; y++) {
                const cell = this.table.cells[y][this.cellX];
                if (!cell.isMasterCellOfColumnCountOne) {
                    cell.update();
                    //cell.resize();
                    b = true;
                }
            }
            // TODO : implement the event of the below code.
            //if (b && !this.table.isDrawing && this.table.isAutoResized) this.table.update();
            
        }
        /**
         * この列のセルの配列を返します。
         */
        public get cells(): Cell[] {
            const items: Cell[] = [];
            for (let i = 0; i < this.table.rowCount; i++) {
                //if(this.table.rows[i].cells.length <= this.cellX) throw new Error("error");
                items.push(this.table.rows[i].cells[this.cellX]);
            }
            return items;
        }
        public get length(){
            return this.cells.length;
        }

        constructor(_table: GTable, _x: number, _width : number = 30) {
            this.table = _table;
            this._svgGroup = SVG.createGroup(this.table.svgGroup);
            this._svgGroup.setAttribute("name", "cell_column");


            //this.table.svgGroup.appendChild(this._svgGroup);
            this.cellX = _x;
            this._svgGroup.setAttribute(CellColumn.rowWidthName, `${_width}`);
            //this.width = this.getMaxWidth();



        }
        /**
         * この列に属しているセルの中で最大の横幅を返します。
         */
        private getMaxWidth(): number {
            let width = 0;

            for (let y = 0; y < this.table.rowCount; y++) {
                const cell = this.table.cells[y][this.cellX];
                if (cell.isMasterCellOfColumnCountOne) {
                    if (width < cell.calculatedWidthUsingText) width = cell.calculatedWidthUsingText;
                    if (width < cell.width) width = cell.width;
                }
            }

            return width;
        }
        /**
         * この列を更新します。
         */
        /*
         public update() {
            this.setWidthToCells();
            //this.width = this.getMaxWidth();
        }
        */
        /**
         * 列内のセルのサイズを再計算します。
         */
        public resize() {
            
            this.cells.forEach((v)=>v.update());
            
            this.setWidthToCells();
            //this.width = (this.getMaxWidth());
        }
        /**
         * セルの元々のサイズに合わせて列のサイズを調整します。
         * @param allowShrink 現在の列の幅より短くなることを許す
         */
        public fitWidthToOriginalCell(allowShrink : boolean){
            if(allowShrink){
                this.width = this.getMaxWidth();
            }else{
                this.width = Math.max(this.width, this.getMaxWidth());
            }
        }

        /**
         * 列のX座標を設定します。
         * @param posX
         */
        public setX(posX: number) {
            for (let y = 0; y < this.table.rowCount; y++) {
                const cell = this.table.cells[y][this.cellX];
                cell.x = posX;
            }

        }

        /**
         * この列の左の枠を配列で返します。
         */
        public get leftBorders(): SVGLineElement[] {
            const r: SVGLineElement[] = [];
            this.cells.forEach((v) => {
                if (r.length == 0) {
                    r.push(v.svgLeftBorder);
                } else {
                    const last = r[r.length - 1];
                    if (last != v.svgLeftBorder) r.push(v.svgLeftBorder);
                }
            });
            return r;
        }
        /**
         * この列の右の枠を配列で返します。
         */
        public get rightBorders(): SVGLineElement[] {
            const r: SVGLineElement[] = [];
            this.cells.forEach((v) => {
                if (r.length == 0) {
                    r.push(v.svgRightBorder);
                } else {
                    const last = r[r.length - 1];
                    if (last != v.svgRightBorder) r.push(v.svgRightBorder);
                }
            });
            return r;
        }
        /**
         * この列の上の枠を返します。
         */
        public get topBorder(): SVGLineElement {
            return this.cells[0].svgTopBorder;
        }
        /**
         * この列の下の枠を返します。
         */
        public get bottomBorder(): SVGLineElement {
            const cells = this.cells;
            return cells[cells.length - 1].svgBottomBorder;
        }
        private get selfx() : number{
            for(let i=0;i<this.table.columnCount;i++){
                if(this.table.columns[i] == this){
                    return i;
                }
            }
            throw new Error("error");
        }

        /**
         * この列を取り除きます。
         * @param isUnit 
         */
        public _dispose() {
            /*
            while (this.length > 0){
                const x = this.length - 1;
                this.cells[x].removeFromTable(false);
                this.cells.splice(x, 1);
            } 
            */
            const x = this.selfx;
            this.table.rows.forEach((v, i) => v._removeCell(x));
            this._svgGroup.remove();
            /*
            if (isUnit) {
                if (this.table.columns.length > 1) {
                    this.table.columns[this.cellX].cells.forEach((v) => {
                        v.removeFromTable(true);
                        this.table.cells[v.cellY].splice(this.cellX, 1);
                    });


                    this.table.columns.splice(this.cellX, 1);
                    this.table.columns.forEach((v, i) => v.cellX = i);
                    this.table.svgGroup.removeChild(this._svgGroup);
                    this.table.update();
                } else if (this.table.columns.length == 1) {
                    while (this.table.rows.length > 0) {
                        this.table.rows[this.table.rows.length - 1].remove(true);
                    }
                    if (this.table.columns.length == 1) this.table.columns.splice(0, 1);
                } else {
                    throw Error("error");
                }
            } else {
                const [b, e] = this.groupColumnRange;
                for (let x = e; x >= b; x--) {
                    this.table.columns[x].remove(true);
                }
            }
            */
        }
        /**
         * この列のセルの位置を再計算します。
         */
        public relocation() {
            this.cells.forEach((v) => v.relocation());
        }
        /**
         * この列に属しているグループセルによって関係している列の範囲を返します。
         */
        public get groupColumnRange(): [number, number] {
            let range: [number, number] | null = this.cells[0].groupColumnRange;
            this.cells.forEach((v) => {
                if (range != null) {
                    range = Cell.computeDisjunction(range, v.groupColumnRange);
                }
            })
            if (range == null) {
                throw Error("error");
            } else {
                return range;
            }
        }

    }
//}