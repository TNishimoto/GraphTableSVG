
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
        private _cells: Cell[][];
        get cells(): Cell[][] {
            return this._cells;
        }
        /*
        private set cells(value: Cell[][]) {
            this._cells = value;
        }
        */
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
            this._cells = new Array(height);


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

        public createVBAMainCode(slideName: string): [string, string] {
            var fstLines: string[] = [];
            var lines = new Array(0);

            fstLines.push(` Dim tableS As shape`);
            fstLines.push(` Dim table_ As table`);
            //lines.push(` Set tableS = CreateTable(createdSlide, ${table.height}, ${table.width})`);
            fstLines.push(` Set tableS = ${slideName}.Shapes.AddTable(${this.height}, ${this.width})`)
            //page.Shapes.AddTable(row_, column_)
            fstLines.push(` Set table_ = tableS.table`);

            var tableName = "table_";
            
            for (var y = 0; y < this.height; y++) {
                lines.push(` Call EditRow(${tableName}.Rows(${y + 1}), ${this.rows[y].height})`);
            }
            for (var x = 0; x < this.width; x++) {
                lines.push(` Call EditColumn(${tableName}.Columns(${x + 1}), ${this.columns[x].width})`);
            }

            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    lines.push(` Call EditCell(${tableName}.cell(${y + 1},${x + 1}), "${cell.svgText.textContent}", ${VBATranslateFunctions.colorToVBA(cell.svgBackground.style.fill)})`);
                }
            }

            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    lines.push(` Call EditCellFont(${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame, ${parseInt(cell.svgText.style.fontSize)}, "${cell.svgText.style.fontFamily}", ${VBATranslateFunctions.colorToVBA(cell.svgText.style.fill)})`);
                }
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    lines.push(` Call EditCellTextFrame(${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame, ${cell.padding.top}, ${cell.padding.bottom}, ${cell.padding.left}, ${cell.padding.right})`);
                }
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderTop), ${VBATranslateFunctions.colorToVBA(cell.upLine.style.fill)}, ${GraphTableSVG.parseInteger(cell.upLine.style.strokeWidth)}, ${GraphTableSVG.visible(cell.upLine.style.visibility)})`);

                    lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderLeft), ${VBATranslateFunctions.colorToVBA(cell.leftLine.style.fill)}, ${GraphTableSVG.parseInteger(cell.leftLine.style.strokeWidth)}, ${GraphTableSVG.visible(cell.leftLine.style.visibility)})`);
                    if (x + 1 == this.width) {
                        lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderRight), ${VBATranslateFunctions.colorToVBA(cell.rightLine.style.fill)}, ${GraphTableSVG.parseInteger(cell.rightLine.style.strokeWidth)}, ${GraphTableSVG.visible(cell.rightLine.style.visibility)})`);
                    }

                    if (y + 1 == this.height) {
                        lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderBottom), ${VBATranslateFunctions.colorToVBA(cell.bottomLine.style.fill)}, ${GraphTableSVG.parseInteger(cell.bottomLine.style.strokeWidth)}, ${GraphTableSVG.visible(cell.bottomLine.style.visibility)})`);
                    }

                }
            }
            /*
            lines.push(`Call EditCellFonts(table_)`);
            lines.push(`Call EditCellTextFrames(table_)`);
            lines.push(`Call EditBorders(table_)`);
            */

            //lines.push(`End Sub`);

            /*
            lines.push(`Sub EditCellFonts(table_ As Table)`);
            
            lines.push(`End Sub`);

            lines.push(`Sub EditCellTextFrames(table_ As Table)`);
            
            lines.push(`End Sub`);


            lines.push(`Sub EditBorders(table_ As Table)`);
            */
            //return [VBATranslateFunctions.joinLines(lines),""];
            var x0 = VBATranslateFunctions.joinLines(fstLines);
            var [x1, y1] = this.splitCode(tableName, lines);
            return [VBATranslateFunctions.joinLines([x0, x1]), y1];
        }
        private splitCode(tableName: string, codes: string[]): [string, string] {
            var functions: string[] = [];

            var p = this.splitCode1(codes);
            p.forEach(function (x, i, arr) {
                functions.push(`Call SubFunction${i}(${tableName})`);
                var begin = `Sub SubFunction${i}(${tableName} As Table)`;
                var end = `End Sub`;
                p[i] = VBATranslateFunctions.joinLines([begin, x, end]);
            });
            return [VBATranslateFunctions.joinLines(functions), VBATranslateFunctions.joinLines(p)];
        }
        private splitCode1(codes: string[]): string[] {
            var r: string[] = [];
            var r1: string[] = [];
            codes.forEach(function (x, i, arr) {
                r.push(x);
                if (r.length == 80) {
                    r1.push(VBATranslateFunctions.joinLines(r));
                    r = [];
                }
            });
            if (r.length > 0) {
                r1.push(VBATranslateFunctions.joinLines(r));
                r = [];
            }
            return r1;
        }

    }
}