
module GraphTableSVG {
    

    export class Table {
        private static defaultCellClass: string = "--default-cell-class";
        private static defaultBorderClass: string = "--default-border-class";

        private _cells: Cell[][] = [];
        //private _textClassName: string | null = "table_text";
        get defaultCellClass(): string | null {
            return this.svgGroup.getPropertyStyleValue(Table.defaultCellClass);            
        }
        get defaultBorderClass(): string | null {
            return this.svgGroup.getPropertyStyleValue(Table.defaultBorderClass);            
        }

        
        get cells(): Cell[][] {
            return this._cells;
        }
        //public svgLineGroup: SVGGElement;
        public svgGroup: SVGGElement;
        get width(): number {
            if (this.cells.length == 0) {
                return 0;
            } else {
                return this.cells[0].length;
            }
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
        private _observer: MutationObserver;
        private observerFunc: MutationCallback = (x: MutationRecord[]) => {
            for (var i = 0; i < x.length; i++) {
                var p = x[i];
                //console.log(p.attributeName);
            }
        };

        private insertRowFunction(i: number, width: number = this.width) {
            var cell: Cell[] = [];
            for (var x = 0; x < width; x++) {
                cell[x] = this.createCell();
            }
            if (i < this.height) {
                for (var x = 0; x < width; x++) {
                    this.cells[i][x].upLine = createLine(0, 0, 0, 0);
                    this.svgGroup.appendChild(this.cells[i][x].upLine);
                }
            }
            this.cells.splice(i, 0, cell);
            this.renumbering();
            for (var x = 0; x < width; x++) {
                this.updateBorder(this.cells[i][x]);
            }
        }
        public insertRow(i: number) {
            this.insertRowFunction(i, this.width == 0 ? 1 : this.width);
        }
        public appendRow() {
            this.insertRow(this.height);
        }
        private createCell(): Cell {
            return new Cell(this, 0, 0, this.defaultCellClass, this.defaultBorderClass);
        }

        public insertColumn(i: number) {
            if (this.height > 0) {
                for (var y = 0; y < this.height; y++) {
                    var cell = this.createCell();
                    this.cells[y].splice(i, 0, cell);
                }
                if (i < this.height) {
                    for (var y = 0; y < this.height; y++) {
                        this.cells[y][i].leftLine = createLine(0, 0, 0, 0);
                        this.svgGroup.appendChild(this.cells[y][i].leftLine);
                    }
                }
                this.renumbering();
                for (var y = 0; y < this.height; y++) {
                    this.updateBorder(this.cells[y][i]);
                }
            } else {
                this.insertRow(0);
            }
        }
        public appendColumn() {
            this.insertColumn(this.width);
        }
        private updateBorder(cell: Cell) {
            if (cell.leftCell != null && cell.leftCell.rightLine != cell.leftLine) {
                this.svgGroup.removeChild(cell.leftLine);
                cell.leftLine = cell.leftCell.rightLine;
            }

            if (cell.upCell != null && cell.upCell.bottomLine != cell.upLine) {
                this.svgGroup.removeChild(cell.upLine);
                cell.upLine = cell.upCell.bottomLine;
            }

            if (cell.rightCell != null && cell.rightCell.leftLine != cell.rightLine) {
                this.svgGroup.removeChild(cell.rightCell.leftLine);
                cell.rightCell.leftLine = cell.rightLine;
            }

            if (cell.bottomCell != null && cell.bottomCell.upLine != cell.bottomLine) {
                this.svgGroup.removeChild(cell.bottomCell.upLine);
                cell.bottomCell.upLine = cell.bottomLine;
            }            
        }
        private renumbering() {
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    this.cells[y][x].cellX = x;
                    this.cells[y][x].cellY = y;

                }
            }
            this.borders.forEach((v, i) => { v.setAttribute("borderID", i.toString()) });

            /*
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    this.setLine(this.cells[y][x]);
                }
            }
            */
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
        public getRegion(): Rectangle {
            var regions = this.cellArray.map((v) => v.region);
            var rect = Rectangle.merge(regions);
            rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
            return rect;            
        }

        getCellFromID(id: number): Cell {
            var y = Math.floor(id / this.height);
            var x = id % this.width;
            return this.cells[y][x];
        }
        

        constructor(width: number, height: number, _tableClassName : string | null = null) {
            var svgGroup: SVGGElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            this.svgGroup = svgGroup;
            //this.svgLineGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            //this.svgGroup.appendChild(this.svgLineGroup);

            if (_tableClassName != null) this.svgGroup.setAttribute("class", _tableClassName);            
            for (var y = 0; y < height; y++) {
                this.insertRowFunction(y, width);
            }

            

            this._observer = new MutationObserver(this.observerFunc);
            var option: MutationObserverInit = { characterData : true, attributes: true, subtree: true };
            this._observer.observe(this.svgGroup, option);


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
                    var style = cell.svgBackground.style.fill != null ? VBATranslateFunctions.colorToVBA(cell.svgBackground.style.fill) : "";
                    lines.push(` Call EditCell(${tableName}.cell(${y + 1},${x + 1}), "${cell.svgText.textContent}", ${style})`);
                }
            }

            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    var fontSize = cell.svgText.style.fontSize != null ? parseInt(cell.svgText.style.fontSize) : "";
                    var color = cell.svgText.style.fill != null ? VBATranslateFunctions.colorToVBA(cell.svgText.style.fill) : "";
                    lines.push(` Call EditCellFont(${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame, ${fontSize}, "${cell.svgText.style.fontFamily}", ${color})`);
                }
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    lines.push(` Call EditCellTextFrame(${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame, ${cell.paddingTop}, ${cell.paddingBottom}, ${cell.paddingLeft}, ${cell.paddingRight})`);
                }
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    var upLineStyle = cell.upLine.style.fill != null ? VBATranslateFunctions.colorToVBA(cell.upLine.style.fill) : "";
                    var upLineStrokeWidth = cell.upLine.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.upLine.style.strokeWidth) : "";
                    var upLineVisibility = cell.upLine.style.visibility != null ? GraphTableSVG.visible(cell.upLine.style.visibility) : ""; 

                    lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderTop), ${upLineStyle}, ${upLineStrokeWidth}, ${upLineVisibility})`);
                    var leftLineStyle = cell.leftLine.style.fill != null ? VBATranslateFunctions.colorToVBA(cell.leftLine.style.fill) : "";
                    var leftLineStrokeWidth = cell.leftLine.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.leftLine.style.strokeWidth) : "";
                    var leftLineVisibility = cell.leftLine.style.visibility != null ? GraphTableSVG.visible(cell.leftLine.style.visibility) : ""; 

                    lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderLeft), ${leftLineStyle}, ${leftLineStrokeWidth}, ${leftLineVisibility})`);
                    if (x + 1 == this.width) {
                        
                        var rightLineStyle = cell.rightLine.style.fill != null ? VBATranslateFunctions.colorToVBA(cell.rightLine.style.fill) : "";
                        var rightLineStrokeWidth = cell.rightLine.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.rightLine.style.strokeWidth) : "";
                        var rightLineVisibility = cell.rightLine.style.visibility != null ? GraphTableSVG.visible(cell.rightLine.style.visibility) : ""; 

                        lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderRight), ${rightLineStyle}, ${rightLineStrokeWidth}, ${rightLineVisibility})`);
                    }

                    if (y + 1 == this.height) {
                        var bottomLineStyle = cell.bottomLine.style.fill != null ? VBATranslateFunctions.colorToVBA(cell.bottomLine.style.fill) : "";
                        var bottomLineStrokeWidth = cell.bottomLine.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.bottomLine.style.strokeWidth) : "";
                        var bottomLineVisibility = cell.bottomLine.style.visibility != null ? GraphTableSVG.visible(cell.bottomLine.style.visibility) : ""; 

                        lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderBottom), ${bottomLineStyle}, ${bottomLineStrokeWidth}, ${bottomLineVisibility})`);
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
        public removeTable(svg: HTMLElement) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        }

    }
}