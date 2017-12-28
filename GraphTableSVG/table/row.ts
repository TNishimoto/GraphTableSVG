module GraphTableSVG {
    export class Row {
        private table: Table;
        private _cellY: number;
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
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.cellY][x];
                cell.y = posY;
            }
        }
        private getMaxHeight(): number {
            var height = 0;
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.cellY][x];
                if (height < cell.textBoxHeight) height = cell.textBoxHeight;
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
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.cellY][x];
                cell.height = value;
            }

        }
    }
    export class Column {
        private table: Table;
        private _cellX: number;
        /**
        列の単位セルのX座標を返します。
        */
        public get cellX(): number {
            return this._cellX;
        }

        constructor(_table: Table, _x: number) {
            this.table = _table;
            this._cellX = _x;
        }

        private getMaxWidth(): number {
            var width = 0;
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.cellX];
                if (width < cell.textBoxWidth) width = cell.textBoxWidth;
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
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.cellX];
                cell.width = value;
            }

        }
    }
}