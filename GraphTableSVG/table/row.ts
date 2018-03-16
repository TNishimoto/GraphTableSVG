namespace GraphTableSVG {
    export class Row {
        private readonly table: Table;
        //private readonly _cellY: number;
        private _svgGroup: SVGGElement;
        public static readonly columnHeightName = "data-height";

        /**
        列の単位セルのY座標を返します。
        */
        public get cellY(): number {
            return Number(this._svgGroup.getAttribute(Cell.cellYName));
        }
        public set cellY(v: number) {
            this._svgGroup.setAttribute(Cell.cellYName, `${v}`);
        }
        /**
        行の高さを返します。
        */
        get height(): number {
            return Number(this._svgGroup.getAttribute(Row.columnHeightName));
        }
        /**
        行の高さを設定します。
        */
        set height(value: number) {
            this._svgGroup.setAttribute(Row.columnHeightName, `${value}`);

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
        }

        constructor(_table: Table, _y: number) {
            this._svgGroup = SVG.createGroup();

            this.table = _table;
            this.table.svgGroup.appendChild(this._svgGroup);

            this.cellY = _y;
            //this.height = this.getMaxHeight();

        }
        public get cells(): Cell[] {
            return this.table.cells[this.cellY];
        }

        public get topBorders(): SVGLineElement[] {
            const r: SVGLineElement[] = [];
            this.cells.forEach((v) => {
                if (r.length == 0) {
                    r.push(v.topBorder);
                } else {
                    const last = r[r.length - 1];
                    if (last != v.topBorder) r.push(v.topBorder);
                }
            });
            return r;
        }
        public get bottomBorders(): SVGLineElement[] {
            const r: SVGLineElement[] = [];
            this.cells.forEach((v) => {
                if (r.length == 0) {
                    r.push(v.bottomBorder);
                } else {
                    const last = r[r.length - 1];
                    if (last != v.bottomBorder) r.push(v.bottomBorder);
                }
            });
            return r;
        }
        public get leftBorder(): SVGLineElement {
            return this.cells[0].leftBorder;
        }
        public get rightBorder(): SVGLineElement {
            const cells = this.cells;
            return cells[cells.length - 1].rightBorder;
        }


        
        /**
         * 行内のセルのサイズを再計算します。
         */
        public resize() {
            this.height = this.getMaxHeight();
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
        private getMaxHeight(): number {
            let height = 0;
            for (let x = 0; x < this.table.columnCount; x++) {
                const cell = this.table.cells[this.cellY][x];
                if (cell.isRowSingleCell) {
                    if (height < cell.calculatedHeightUsingText) height = cell.calculatedHeightUsingText;
                    if (height < cell.height) height = cell.height;
                }
            }
            return height;
        }
        /*
        public remove() {
            const h = this.table.rowCount;
            if (this.table.rowCount == 1) throw Error("Error");
            const rowCells = this.cells.map((v) => v);
            for (let x = 0; x < this.table.columnCount; x++) {
                const cell = rowCells[x];
                this.table.svgGroup.removeChild(cell.svgGroup);
                this.table.svgGroup.removeChild(cell.leftBorder);
                if (cell.rightCell == null) this.table.svgGroup.removeChild(cell.rightBorder);
                if (cell.topCell == null) this.table.svgGroup.removeChild(cell.topBorder);
                if (cell.bottomCell == null) this.table.svgGroup.removeChild(cell.bottomBorder);

            }

            this.table.cells.splice(this.cellY, 1);
            this.table.renumbering();

            const p = this.cellY + 1 < this.table.rowCount ? this.cellY : this.cellY - 1;
            for (let x = 0; x < this.table.columnCount; x++) {
                this.table.updateBorder(this.cells[p][x]);
            }
        }
        */
        public update() {
            this.height = this.getMaxHeight();
        }

        public detouch() {
            this.table.rows.splice(this.cellY, 1);
            this.table.rows.forEach((v, i) => v.cellY = i);
            this.table.svgGroup.removeChild(this._svgGroup);            
        }
        /*
        public updateBorders() {
            this.cells.forEach((v) => v.updateBorder());
        }
        */
    }
    export class Column {
        private readonly table: Table;
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
        }
        /**
        列の幅を返します。
        */
        get width(): number {
            return Number(this._svgGroup.getAttribute(Column.rowWidthName));
        }
        /**
        列の幅を設定します。
        */
        set width(value: number) {
            this._svgGroup.setAttribute(Column.rowWidthName, `${value}`);

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
        }

        public get cells(): Cell[] {
            const items: Cell[] = [];
            for (let i = 0; i < this.table.rowCount; i++) {
                items.push(this.table.cells[i][this.cellX]);
            }
            return items;
        }

        constructor(_table: Table, _x: number) {
            this._svgGroup = SVG.createGroup();

            this.table = _table;

            this.table.svgGroup.appendChild(this._svgGroup);
            this.cellX = _x;
            //this.width = this.getMaxWidth();

            

        }

        private getMaxWidth(): number {
            let width = 0;
            for (let y = 0; y < this.table.rowCount; y++) {

                const cell = this.table.cells[y][this.cellX];
                if (cell.isColumnSingleCell) {
                    if (width < cell.calculatedWidthUsingText) width = cell.calculatedWidthUsingText;
                    if (width < cell.width) width = cell.width;
                }
            }
            return width;
        }
        public update() {
            this.width = this.getMaxWidth();
        }
        /**
         * 列内のセルのサイズを再計算します。
         */
        public resize() {
            this.width = (this.getMaxWidth());
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
        

        public get leftBorders(): SVGLineElement[] {
            const r: SVGLineElement[] = [];
            this.cells.forEach((v) => {
                if (r.length == 0) {
                    r.push(v.leftBorder);
                } else {
                    const last = r[r.length - 1];
                    if (last != v.leftBorder) r.push(v.leftBorder);
                }
            });
            return r;
        }
        public get rightBorders(): SVGLineElement[] {
            const r: SVGLineElement[] = [];
            this.cells.forEach((v) => {
                if (r.length == 0) {
                    r.push(v.rightBorder);
                } else {
                    const last = r[r.length - 1];
                    if (last != v.rightBorder) r.push(v.rightBorder);
                }
            });
            return r;
        }
        public get topBorder(): SVGLineElement {
            return this.cells[0].topBorder;
        }
        public get bottomBorder(): SVGLineElement {
            const cells = this.cells;
            return cells[cells.length - 1].bottomBorder;
        }
        public detouch() {
            this.table.columns.splice(this.cellX, 1);
            this.table.columns.forEach((v, i) => v.cellX = i);
            this.table.svgGroup.removeChild(this._svgGroup);
        }
    }
}