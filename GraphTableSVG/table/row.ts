namespace GraphTableSVG {
    /**
     * 表の行を表現するクラスです。
     */
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
            this.cells.forEach((w) => w.cellY = v);
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

        constructor(_table: Table, _y: number, _height: number = 30) {
            this._svgGroup = SVG.createGroup();

            this.table = _table;
            this.table.svgGroup.appendChild(this._svgGroup);

            this.cellY = _y;
            this._svgGroup.setAttribute(Row.columnHeightName, `${_height}`);
            //this.height = this.getMaxHeight();

        }
        /**
         * この行のセル配列を返します。
         */
        public get cells(): Cell[] {
            return this.table.cells[this.cellY];
        }
        /**
         * この行のセルの上にある枠の配列を返します。
         */
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
        /**
         * この行のセルの下にある枠の配列を返します。
         */
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
        /**
         * この行のセルの左にある枠を返します。
         */
        public get leftBorder(): SVGLineElement {
            return this.cells[0].leftBorder;
        }
        /**
         * この行のセルの右にある枠を返します。
         */
        public get rightBorder(): SVGLineElement {
            const cells = this.cells;
            return cells[cells.length - 1].rightBorder;
        }

        public setHeightToCells() {
            const height = this.height;
            let b = false;
            for (let x = 0; x < this.table.columnCount; x++) {
                const cell = this.table.cells[this.cellY][x];
                if (cell.isRowSingleCell && cell.height != height) {
                    cell.height = height;
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
        /**
         * この行を更新します。
         */
        public update() {
            this.setHeightToCells();
            //this.height = this.getMaxHeight();
        }
        /**
         * 行内のセルのサイズを再計算します。
         */
        public resize() {
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
                if (cell.isRowSingleCell) {
                    if (height < cell.calculatedHeightUsingText) height = cell.calculatedHeightUsingText;
                    if (height < cell.height) height = cell.height;
                }
            }
            return height;
        }
        /**
         * この行を取り除きます。
         * @param isUnit 
         */
        public remove(isUnit: boolean = false) {
            if (isUnit) {
                if (this.table.rows.length > 1 || (this.table.rows.length == 1 && this.table.columns.length == 1)) {
                    this.cells.forEach((v) => v.removeFromTable(false));
                    this.table.cells.splice(this.cellY, 1);


                    this.table.rows.splice(this.cellY, 1);

                    this.table.rows.forEach((v, i) => v.cellY = i);
                    this.table.svgGroup.removeChild(this._svgGroup);
                    this.table.update();
                } else if (this.table.rows.length == 1) {
                    while (this.table.columns.length > 1) {
                        this.table.columns[this.table.columns.length - 1].remove(true);
                    }
                    this.table.rows[0].remove(true);
                } else {
                    throw Error("Error");
                }
            } else {
                const [b, e] = this.groupRowRange;
                for (let y = e; y >= b; y--) {
                    this.table.rows[y].remove(true);
                }
            }
        }
        /*
        public updateBorders() {
            this.cells.forEach((v) => v.updateBorder());
        }
        */
        /**
         * この行の各セルを再配置します。
         */
        public relocation() {
            this.cells.forEach((v) => v.relocation());
        }
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