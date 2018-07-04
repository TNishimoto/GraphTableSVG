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
            const width = this.width;
            
            let b = false;
            for (let y = 0; y < this.table.rowCount; y++) {
                const cell = this.table.cells[y][this.cellX];
                if (cell.isColumnSingleCell && cell.width != width) {
                    cell.width = width;
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
        /**
         * この列のセルの配列を返します。
         */
        public get cells(): Cell[] {
            const items: Cell[] = [];
            for (let i = 0; i < this.table.rowCount; i++) {
                items.push(this.table.cells[i][this.cellX]);
            }
            return items;
        }

        constructor(_table: Table, _x: number, _width : number = 30) {
            this._svgGroup = SVG.createGroup();

            this.table = _table;

            this.table.svgGroup.appendChild(this._svgGroup);
            this.cellX = _x;
            this._svgGroup.setAttribute(Column.rowWidthName, `${_width}`);
            //this.width = this.getMaxWidth();



        }
        /**
         * この列に属しているセルの中で最大の横幅を返します。
         */
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
        /**
         * この列を更新します。
         */
        public update() {
            this.setWidthToCells();
            //this.width = this.getMaxWidth();
        }
        /**
         * 列内のセルのサイズを再計算します。
         */
        public resize() {
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
                    r.push(v.leftBorder);
                } else {
                    const last = r[r.length - 1];
                    if (last != v.leftBorder) r.push(v.leftBorder);
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
                    r.push(v.rightBorder);
                } else {
                    const last = r[r.length - 1];
                    if (last != v.rightBorder) r.push(v.rightBorder);
                }
            });
            return r;
        }
        /**
         * この列の上の枠を返します。
         */
        public get topBorder(): SVGLineElement {
            return this.cells[0].topBorder;
        }
        /**
         * この列の下の枠を返します。
         */
        public get bottomBorder(): SVGLineElement {
            const cells = this.cells;
            return cells[cells.length - 1].bottomBorder;
        }
        /**
         * この列を取り除きます。
         * @param isUnit 
         */
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
}