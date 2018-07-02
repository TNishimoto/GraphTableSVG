namespace GraphTableSVG {
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
            this.cells.forEach((w) => w.cellX = v);
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
        public remove(isUnit: boolean = false) {
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
        }
        public relocation() {
            this.cells.forEach((v) => v.relocation());
        }
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
}