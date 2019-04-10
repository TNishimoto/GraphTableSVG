namespace GraphTableSVG {
    /**
     * 表の行を表現するクラスです。
     */
    export class CellRow {
        private readonly table: GTable;
        //private readonly _cellY: number;
        private _svgGroup: SVGGElement;
        public static readonly columnHeightName = "data-height";
        constructor(_table: GTable, _y: number, _height: number = 30) {
            this.table = _table;
            this._svgGroup = SVG.createGroup(this.table.svgGroup);
            this.svgGroup.setAttribute("name", "cell_row");
            this.table.svgGroup.insertBefore(this.svgGroup, this.table.svgRowBorderGroup);

            this.cellY = _y;
            this._svgGroup.setAttribute(CellRow.columnHeightName, `${_height}`);
            /*
            for(let i=0;i<cellCount;i++){
                this._cells.push(this.createCell(i, _y));
            }
            */
            //this.height = this.getMaxHeight();

        }
        private createCell(cellX: number, cellY: number): Cell {
            const cellClass = undefined; //this.table.defaultCellClass == null ? undefined : this.table.defaultCellClass;
            const borderClass = undefined
            //this.table.defaultBorderClass == null ? undefined : this.table.defaultBorderClass;

            const option: CellOption = { cellClass: cellClass, borderClass: borderClass };
            return new Cell(this.table, cellX, cellY, option);
        }
        public _insertCell(i: number) {
            const cell = this.createCell(i, this.cellY);
            this.cells.splice(i, 0, cell);
        }
        public _appendCell(num: number = 1) {
            for (let i = 0; i < num; i++) {
                const cell = this.createCell(this.cells.length, this.cellY);
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
        public get length(){
            return this.cells.length;
        }

        public get svgGroup(): SVGElement {
            return this._svgGroup;
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
            return Number(this._svgGroup.getAttribute(CellRow.columnHeightName));
        }
        /**
        行の高さを設定します。
        */
        set height(value: number) {
            this._svgGroup.setAttribute(CellRow.columnHeightName, `${value}`);
            this.setHeightToCells();
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

        public setHeightToCells() {
            const height = this.height;
            let b = false;
            for (let x = 0; x < this.table.columnCount; x++) {
                const cell = this.table.cells[this.cellY][x];
                if (cell.isMasterCellOfRowCountOne && cell.height != height) {
                    cell.height = height;
                    b = true;
                }
            }
            for (let x = 0; x < this.table.columnCount; x++) {
                const cell = this.table.cells[this.cellY][x];
                if (!cell.isMasterCellOfRowCountOne) {
                    cell.update();
                    //cell.resize();
                    b = true;
                }
            }
            // TODO : implement the event of the below code.
            //if (b && !this.table.isDrawing && this.table.isAutoResized) this.table.update();
        }
        /**
         * この行を更新します。
         */
        /*
         public update() {
            this.setHeightToCells();
            //this.height = this.getMaxHeight();
        }
        */
        /**
         * 行内のセルのサイズを再計算します。
         */
        public resize() {
            this.cells.forEach((v) => v.update());
            this.setHeightToCells();
            //this.height = this.getMaxHeight();
        }
        /**
         * セルの元々のサイズに合わせて行のサイズを調整します。
         * @param allowShrink 現在の行の幅より短くなることを許す
         */
        public fitHeightToOriginalCell(allowShrink: boolean) {
            if (allowShrink) {
                this.height = this.getMaxHeight();
            } else {
                this.height = Math.max(this.height, this.getMaxHeight());
            }
        }
        /**
         * 行内のセルのY座標を設定します。
         * 
         */
        public setY(posY: number) {
            for (let x = 0; x < this.table.columnCount; x++) {
                const cell = this.table.cells[this.cellY][x];
                cell.y = posY;
            }
        }
        /**
         * この行の最大の縦幅を持つセルの縦幅を返します。
         */
        private getMaxHeight(): number {
            let height = 0;
            for (let x = 0; x < this.table.columnCount; x++) {
                const cell = this.table.cells[this.cellY][x];
                if (cell.isMasterCellOfRowCountOne) {
                    if (height < cell.calculatedHeightUsingText) height = cell.calculatedHeightUsingText;
                    if (height < cell.height) height = cell.height;
                }
            }
            return height;
        }
        private get selfy(): number {
            for (let i = 0; i < this.table.rowCount; i++) {
                if (this.table.rows[i] == this) {
                    return i;
                }
            }
            throw new Error("error");
        }
        public _dispose(){
            while (this.length > 0){
                const x = this.length - 1;
                this._removeCell(x);
            } 
            this.svgGroup.remove();
            //this.rows.splice(this.rows[i].selfy, 1);
        }
        public _removeCell(i : number){
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
    }

}