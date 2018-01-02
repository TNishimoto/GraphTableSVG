
namespace GraphTableSVG {
    
    /**
    テーブルを表します。
    */
    export class Table {
        private static readonly defaultCellClass: string = "--default-cell-class";
        private static readonly defaultBorderClass: string = "--default-border-class";
        private _svgGroup: SVGGElement;
        private _cells: Cell[][] = [];
        private _isDrawing: boolean = false;
        public get isDrawing(): boolean {
            return this._isDrawing;
        }
        private _isAutoResized: boolean = false;
        public get isAutoResized(): boolean {
            return this._isAutoResized;
        }
        public set isAutoResized(value: boolean) {
            this._isAutoResized = value;
            if (value) {
                this.update();
            }
        }

        private _cellTextObserver: MutationObserver;
        public get cellTextObserver(): MutationObserver {
            return this._cellTextObserver;
        }
        private _cellTextObserverFunc: MutationCallback = (x: MutationRecord[]) => {            
            var b = false;
            for (var i = 0; i < x.length; i++) {
                var p = x[i];
                if (p.type == "childList") {
                    b = true;
                }
                for (var j = 0; j < p.addedNodes.length; j++) {
                    var item = p.addedNodes.item(j);

                    if (item.nodeName == "#text") {
                        b = true;
                    }
                }
            }
            if (b) this.update();
        };

        constructor(svgbox: HTMLElement, width: number, height: number, _tableClassName: string | null = null) {

            this._svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgbox.appendChild(this.svgGroup);

            this._cellTextObserver = new MutationObserver(this._cellTextObserverFunc);
            //this.svgLineGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            //this.svgGroup.appendChild(this.svgLineGroup);

            if (_tableClassName != null) this.svgGroup.setAttribute("class", _tableClassName);
            for (var y = 0; y < height; y++) {
                this.insertRowFunction(y, width);
            }



        }

        
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
        private createCell(): Cell {
            return new Cell(this, 0, 0, this.defaultCellClass, this.defaultBorderClass);
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
        //private _textClassName: string | null = "table_text";
        /**
        セルのインスタント生成時にこの値がインスタントのクラス名にセットされます。
        */
        get defaultCellClass(): string | null {
            return this.svgGroup.getPropertyStyleValue(Table.defaultCellClass);            
        }
        /**
        ボーダーのインスタント生成時にこの値がインスタントのクラス名にセットされます。
        */
        get defaultBorderClass(): string | null {
            return this.svgGroup.getPropertyStyleValue(Table.defaultBorderClass);            
        }

        /**
        各セルを格納している二次元ジャグ配列を返します。
        */
        get cells(): Cell[][] {
            return this._cells;
        }

        /**
        テーブルを表現しているSVGGElementを返します。
        */
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        /**
        テーブルの行方向の単位セルの数を返します。
        */
        get width(): number {
            if (this.cells.length == 0) {
                return 0;
            } else {
                return this.cells[0].length;
            }
        }
        /**
        テーブルの列方向の単位セルの数を返します。
        */
        get height(): number {
            return this.cells.length;
        }
        /**
        各行を表す配列を返します。読み取り専用です。
        */
        get rows(): Row[] {
            var arr = new Array(0);
            for (var y = 0; y < this.height; y++) {
                arr.push(new Row(this, y));
            }
            return arr;
        }
        /**
        各列を表す配列を返します。読み取り専用です。
        */
        get columns(): Column[] {
            var arr = new Array(0);
            for (var x = 0; x < this.width; x++) {
                arr.push(new Column(this, x));
            }
            return arr;
        }
        /**
        各セルを表す配列を返します。テーブルの左上のセルから右に向かってインデックスが割り当てられ、
        テーブル右下のセルが配列の最後の値となります。読み取り専用です。
        */
        get cellArray(): Cell[] {
            var arr = new Array(0);
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    arr.push(this.cells[y][x]);
                }
            }
            return arr;

        }
        /**
        各ボーダーを表す配列を返します。
        ボーダーの順番は未定義です。
        読み取り専用です。
        */
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
        /**
        新しい行をi番目の行に挿入します
        */
        public insertRow(i: number) {
            this.insertRowFunction(i, this.width == 0 ? 1 : this.width);
        }
        /**
        新しい行を行の最後に追加します。
        */
        public appendRow() {
            this.insertRow(this.height);
        }
        /**
        新しい列をi番目の列に挿入します。
        */
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
        /**
        新しい列を最後の列に追加します。
        */
        public appendColumn() {
            this.insertColumn(this.width);
        }
        /**
        各セルのサイズを再計算します。
        */
        public update() {
            this._isDrawing = true;
            var rows = this.rows;
            var columns = this.columns;
            rows.forEach(function (x, i, arr) { x.resize(); });
            columns.forEach(function (x, i, arr) { x.resize(); });
            var height = 0;
            rows.forEach(function (x, i, arr) {
                x.setY(height);
                height += x.height;
            });
            var width = 0;
            columns.forEach(function (x, i, arr) {
                x.setX(width);

                width += x.width;
            });
            this.cellArray.forEach(function (x, i, arr) { x.relocation(); });

            this._isDrawing = false;
            
        }
        /**
        所属しているSVGタグ上でのテーブルの領域を表すRectangleクラスを返します。        
        */
        public getRegion(): Rectangle {
            var regions = this.cellArray.map((v) => v.region);
            var rect = Rectangle.merge(regions);
            rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
            return rect;            
        }
        /*
        private getCellFromID(id: number): Cell {
            var y = Math.floor(id / this.height);
            var x = id % this.width;
            return this.cells[y][x];
        }
        */
        

        public createVBACode(id: number, slide: string): string[] {
            var lines = new Array(0);
            lines.push(`Sub create${id}(createdSlide As slide)`);
            
            var [main, sub] = this.createVBAMainCode("createdSlide", id);

            lines.push(main);
            lines.push(`End Sub`);
            lines.push(sub);

            return lines;
        }
        /**
         * 現在のテーブルを表すVBAコードを返します。
         */
        private createVBAMainCode(slideName: string, id: number): [string, string] {
            var fstLines: string[] = [];
            var lines = new Array(0);

            fstLines.push(` Dim tableS As shape`);
            fstLines.push(` Dim table_ As table`);
            //lines.push(` Set tableS = CreateTable(createdSlide, ${table.height}, ${table.width})`);
            fstLines.push(` Set tableS = ${slideName}.Shapes.AddTable(${this.height}, ${this.width})`)
            fstLines.push(` tableS.Left = ${this.svgGroup.getX()}`);
            fstLines.push(` tableS.Top = ${this.svgGroup.getY()}`);

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
                    let color = Color.translateRGBCodeFromColorName2(cell.svgBackground.getPropertyStyleValueWithDefault("fill", "gray"));
                    //var style = cell.svgBackground.style.fill != null ? VBATranslateFunctions.colorToVBA(cell.svgBackground.style.fill) : "";
                    VBATranslateFunctions.TranslateSVGTextElement(lines, this.cells[y][x].svgText, `${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame.TextRange`);
                    lines.push(`${tableName}.cell(${y + 1},${x + 1}).Shape.Fill.ForeColor.RGB = RGB(CInt(${color.r}), CInt(${color.g}), CInt(${color.b}))`);
                    //lines.push(` Call EditCell(${tableName}.cell(${y + 1},${x + 1}), "${cell.svgText.textContent}", ${color})`);
                }
            }

            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    var fontSize = parseInt(cell.svgText.getPropertyStyleValueWithDefault("font-size", "12pt"));
                    var color = VBATranslateFunctions.colorToVBA(cell.svgText.getPropertyStyleValueWithDefault("fill", "gray"));
                    var fontFamily = VBATranslateFunctions.ToVBAFont(cell.svgText.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
                    var fontBold = VBATranslateFunctions.ToFontBold(cell.svgText.getPropertyStyleValueWithDefault("font-weight", "none"));
                    lines.push(` Call EditCellFont(${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame, ${fontSize}, "${fontFamily}", ${color}, ${fontBold})`);
                }
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    var vAnchor = VBATranslateFunctions.ToVerticalAnchor(cell.verticalAnchor == null ? "" : cell.verticalAnchor);
                    var hAnchor = VBATranslateFunctions.ToHorizontalAnchor(cell.horizontalAnchor == null ? "" : cell.horizontalAnchor);
                    lines.push(` Call EditCellTextFrame(${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame, ${cell.paddingTop}, ${cell.paddingBottom}, ${cell.paddingLeft}, ${cell.paddingRight}, ${vAnchor}, ${hAnchor})`);
                }
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    var upLineStyle = VBATranslateFunctions.colorToVBA(cell.upLine.getPropertyStyleValueWithDefault("stroke", "gray"));
                    var upLineStrokeWidth = cell.upLine.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.upLine.style.strokeWidth) : "";
                    var upLineVisibility = cell.upLine.style.visibility != null ? GraphTableSVG.visible(cell.upLine.style.visibility) : ""; 

                    lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderTop), ${upLineStyle}, ${upLineStrokeWidth}, ${upLineVisibility})`);

                    var leftLineStyle = VBATranslateFunctions.colorToVBA(cell.leftLine.getPropertyStyleValueWithDefault("stroke", "gray"));
                    var leftLineStrokeWidth = cell.leftLine.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.leftLine.style.strokeWidth) : "";
                    var leftLineVisibility = cell.leftLine.style.visibility != null ? GraphTableSVG.visible(cell.leftLine.style.visibility) : ""; 

                    lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderLeft), ${leftLineStyle}, ${leftLineStrokeWidth}, ${leftLineVisibility})`);
                    if (x + 1 == this.width) {

                        var rightLineStyle = VBATranslateFunctions.colorToVBA(cell.rightLine.getPropertyStyleValueWithDefault("stroke", "gray"));
                        var rightLineStrokeWidth = cell.rightLine.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.rightLine.style.strokeWidth) : "";
                        var rightLineVisibility = cell.rightLine.style.visibility != null ? GraphTableSVG.visible(cell.rightLine.style.visibility) : ""; 

                        lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderRight), ${rightLineStyle}, ${rightLineStrokeWidth}, ${rightLineVisibility})`);
                    }

                    if (y + 1 == this.height) {
                        var bottomLineStyle = VBATranslateFunctions.colorToVBA(cell.bottomLine.getPropertyStyleValueWithDefault("stroke", "gray"));
                        var bottomLineStrokeWidth = cell.bottomLine.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.bottomLine.style.strokeWidth) : "";
                        var bottomLineVisibility = cell.bottomLine.style.visibility != null ? GraphTableSVG.visible(cell.bottomLine.style.visibility) : ""; 

                        lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderBottom), ${bottomLineStyle}, ${bottomLineStrokeWidth}, ${bottomLineVisibility})`);
                    }

                }
            }
            var x0 = VBATranslateFunctions.joinLines(fstLines);
            var [x1, y1] = VBATranslateFunctions.splitCode(lines, `${tableName} as Table`, `${tableName}`, id);
            return [VBATranslateFunctions.joinLines([x0, x1]), y1];
        }
        /*
        private splitCode(tableName: string, codes: string[], id: number): [string, string] {
            var functions: string[] = [];

            var p = VBATranslateFunctions.grouping80(codes);
            p.forEach(function (x, i, arr) {
                functions.push(`Call SubFunction${id}_${i}(${tableName})`);
                var begin = `Sub SubFunction${id}_${i}(${tableName} As Table)`;
                var end = `End Sub`;
                p[i] = VBATranslateFunctions.joinLines([begin, x, end]);
            });
            return [VBATranslateFunctions.joinLines(functions), VBATranslateFunctions.joinLines(p)];
        }
        */
        
        public removeTable(svg: HTMLElement) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        }

    }
}