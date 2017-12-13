module GraphTableSVG {
    export class Row {
        table: SVGTable;
        y: number;
        constructor(_table: SVGTable, _y: number) {
            this.table = _table;
            this.y = _y;
        }
        getMaxHeight(): number {
            var height = 0;
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                if (height < cell.textBoxHeight) height = cell.textBoxHeight;
                if (height < cell.height) height = cell.height;
            }
            return height;
        }
        private setHeight(height: number) {
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                cell.height = height;
            }
        }
        resize() {
            this.setHeight(this.getMaxHeight());
        }
        setY(posY: number) {
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                cell.y = posY;
            }
        }
        get height(): number {
            return this.getMaxHeight();
        }
        set height(value: number) {
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                cell.height = value;
            }

        }
    }
    export class Column {
        table: SVGTable;
        x: number;

        constructor(_table: SVGTable, _x: number) {
            this.table = _table;
            this.x = _x;
        }

        getMaxWidth(): number {
            var width = 0;
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.x];
                if (width < cell.textBoxWidth) width = cell.textBoxWidth;
                if (width < cell.width) width = cell.width;
            }
            return width;
        }
        private setWidth(width: number) {
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.x];
                cell.width = width;
            }

        }
        resize() {
            this.setWidth(this.getMaxWidth());
        }
        setX(posX: number) {
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.x];
                cell.x = posX;
            }

        }
        get width(): number {
            return this.getMaxWidth();
        }
        set width(value: number) {
            this.setWidth(value);

        }
    }
}