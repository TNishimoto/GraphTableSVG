namespace GraphTableSVG {
    export class Row {
        private readonly table: Table;
        private readonly _cellY: number;
        /**
        列の単位セルのY座標を返します。
        */
        public get cellY(): number {
            return this._cellY;
        }
        constructor(_table: Table, _y: number) {
            this.table = _table;
            this._cellY = _y;
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
            for (let x = 0; x < this.table.width; x++) {
                const cell = this.table.cells[this.cellY][x];
                cell.y = posY;
            }
        }
        private getMaxHeight(): number {
            let height = 0;
            for (let x = 0; x < this.table.width; x++) {
                const cell = this.table.cells[this.cellY][x];
                if (height < cell.calculatedHeight) height = cell.calculatedHeight;
                if (height < cell.height) height = cell.height;
            }
            return height;
        }
        /**
        行の高さを返します。
        */
        get height(): number {
            return this.getMaxHeight();
        }
        /**
        行の高さを設定します。
        */
        set height(value: number) {
            let b = false;
            for (let x = 0; x < this.table.width; x++) {
                const cell = this.table.cells[this.cellY][x];
                if (cell.height != value) {
                    cell.height = value;
                    b = true;
                }
            }
            if (b && !this.table.isDrawing && this.table.isAutoResized) this.table.update();
        }
    }
    export class Column {
        private readonly table: Table;
        private readonly _cellX: number;
        /**
        列の単位セルのX座標を返します。
        */
        public get cellX(): number {
            return this._cellX;
        }
        public get cells(): Cell[] {
            const items: Cell[] = [];
            for (let i = 0; i < this.table.height; i++) {
                items.push(this.table.cells[i][this.cellX]);
            }
            return items;
        }

        constructor(_table: Table, _x: number) {
            this.table = _table;
            this._cellX = _x;
        }

        private getMaxWidth(): number {
            let width = 0;
            for (let y = 0; y < this.table.height; y++) {
                const cell = this.table.cells[y][this.cellX];
                if (width < cell.calculatedWidth) width = cell.calculatedWidth;
                if (width < cell.width) width = cell.width;
            }
            return width;
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
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.cellX];
                cell.x = posX;
            }

        }
        /**
        列の幅を返します。
        */
        get width(): number {
            return this.getMaxWidth();
        }
        /**
        列の幅を設定します。
        */
        set width(value: number) {
            var b = false;
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.cellX];
                if (cell.width != value) {
                    cell.width = value;
                    b = true;
                }
            }

            if (b && !this.table.isDrawing && this.table.isAutoResized) this.table.update();
        }

        public get leftBorders(): SVGLineElement[] {
            var r: SVGLineElement[] = [];
            this.cells.forEach((v) => {
                if (r.length == 0) {
                    r.push(v.leftBorder);
                } else {
                    var last = r[r.length - 1];
                    if (last != v.leftBorder) r.push(v.leftBorder);
                }
            });
            return r;
        }
        public get rightBorders(): SVGLineElement[] {
            var r: SVGLineElement[] = [];
            this.cells.forEach((v) => {
                if (r.length == 0) {
                    r.push(v.rightBorder);
                } else {
                    var last = r[r.length - 1];
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
    }
}