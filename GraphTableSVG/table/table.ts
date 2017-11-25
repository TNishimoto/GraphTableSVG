
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
                if (height < cell.svgBackground.height.baseVal.value) height = cell.svgBackground.height.baseVal.value;
            }
            return height;
        }
        private setHeight(height: number) {
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                cell.svgBackground.height.baseVal.value = height;
            }
        }
        resize() {
            this.setHeight(this.getMaxHeight());
        }
        setY(posY: number) {
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                cell.svgBackground.y.baseVal.value = posY;
            }
        }
        get height(): number {
            return this.getMaxHeight();
        }
        set height(value: number) {
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                cell.svgBackground.height.baseVal.value = value;
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
                console.log(cell.textBoxWidth);
                if (width < cell.svgBackground.width.baseVal.value) width = cell.svgBackground.width.baseVal.value;
            }
            return width;
        }
        private setWidth(width: number) {
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.x];
                cell.svgBackground.width.baseVal.value = width;
            }

        }
        resize() {
            this.setWidth(this.getMaxWidth());
        }
        setX(posX: number) {
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.x];
                cell.svgBackground.x.baseVal.value = posX;
            }

        }
        get width(): number {
            return this.getMaxWidth();
        }
        set width(value: number) {
            this.setWidth(value);

        }
    }

    export class SVGTable {
        //verticalLines: CellLines[];
        //horizontalLines: CellLines[];
        public cells: Cell[][];
        private svg: HTMLElement;
        public group: SVGGElement;
        get width(): number {
            return this.cells[0].length;
        }
        get height(): number {
            return this.cells.length;
        }
        get rows(): Row[] {
            var arr = new Array(0);
            for (var y = 0; y < this.height; y++) {
                arr.push(new Row(this, y));
            }
            return arr;
        }
        get columns(): Column[] {
            var arr = new Array(0);
            for (var x = 0; x < this.width; x++) {
                arr.push(new Column(this, x));
            }
            return arr;
        }
        get cellArray(): Cell[] {
            var arr = new Array(0);
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    arr.push(this.cells[y][x]);
                }
            }
            return arr;

        }
        get borders(): SVGLineElement[] {
            var arr = new Array(0);
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    if (arr.indexOf(this.cells[y][x].upLine) == -1) {
                        arr.push(this.cells[y][x].upLine);
                    }
                    if (arr.indexOf(this.cells[y][x].leftLine) == -1) {
                        arr.push(this.cells[y][x].leftLine);
                    }
                    if (arr.indexOf(this.cells[y][x].rightLine) == -1) {
                        arr.push(this.cells[y][x].rightLine);
                    }
                    if (arr.indexOf(this.cells[y][x].bottomLine) == -1) {
                        arr.push(this.cells[y][x].bottomLine);
                    }
                }
            }
            return arr;
        }

        public resize() {
            var rows = this.rows;
            var columns = this.columns;
            rows.forEach(function (x, i, arr) { x.resize(); });
            columns.forEach(function (x, i, arr) { x.resize(); });
            var height = 0;
            rows.forEach(function (x, i, arr) {
                x.setY(height);
                height += x.getMaxHeight();
            });
            var width = 0;
            columns.forEach(function (x, i, arr) {
                x.setX(width);

                width += x.getMaxWidth();
            });
            this.cellArray.forEach(function (x, i, arr) { x.relocation(); });

        }

        getCellFromID(id: number): Cell {
            var y = Math.floor(id / this.height);
            var x = id % this.width;
            return this.cells[y][x];
        }

        private setLine(cell: Cell) {
            if (cell.leftCell != null) {
                cell.leftLine = cell.leftCell.rightLine;
            } else {
                cell.leftLine = GraphTableSVG.createLine(cell.x, cell.y, cell.x, cell.y + cell.height);
                this.group.appendChild(cell.leftLine);
            }

            if (cell.upCell != null) {
                cell.upLine = cell.upCell.bottomLine;
            } else {
                cell.upLine = GraphTableSVG.createLine(cell.x, cell.y, cell.x + cell.width, cell.y);
                this.group.appendChild(cell.upLine);

            }

            cell.rightLine = GraphTableSVG.createLine(cell.x + cell.width, cell.y, cell.x + cell.width, cell.y + cell.height);
            this.group.appendChild(cell.rightLine);
            cell.bottomLine = GraphTableSVG.createLine(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height);
            this.group.appendChild(cell.bottomLine);


        }

        constructor(_svg: HTMLElement, width: number, height: number) {
            this.svg = _svg;
            this.cells = new Array(height);


            var svgGroup: SVGGElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            this.group = svgGroup;
            svgGroup.setAttributeNS(null, 'transform', "translate(160,0)");

            this.svg.appendChild(this.group);

            //this.verticalLines = new Array(width + 1);
            //this.horizontalLines = new Array(height + 1);
            for (var y = 0; y < height; y++) {
                this.cells[y] = new Array(width);
                for (var x = 0; x < width; x++) {
                    this.cells[y][x] = new Cell(this, x, y, GraphTableSVG.createRectangle(), GraphTableSVG.createText());
                }
            }

            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    this.setLine(this.cells[y][x]);
                }
            }

            this.resize();

        }

    }
}