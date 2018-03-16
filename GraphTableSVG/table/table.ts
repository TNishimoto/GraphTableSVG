
namespace GraphTableSVG {
    
    /**
    テーブルを表します。
    */
    export class Table {
        private static readonly defaultCellClass: string = "--default-cell-class";
        private static readonly defaultBorderClass: string = "--default-border-class";
        
        /*
        field
        */
        private _svgGroup: SVGGElement;
        /**
        テーブルを表現しているSVGGElementを返します。
        */
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        private _svgHiddenGroup: SVGGElement;
        public get svgHiddenGroup(): SVGGElement {
            return this._svgHiddenGroup;
        }

        /**
        各行を表す配列を返します。読み取り専用です。
        */
        private _rows: Row[] = new Array(0);
        get rows(): Row[] {
            return this._rows;
        }
        /**
        各列を表す配列を返します。読み取り専用です。
        */
        private _columns: Column[] = new Array(0);
        get columns(): Column[] {
            return this._columns;
        }
        private _cells: Cell[][] = [];
        /**
        各セルを格納している二次元ジャグ配列を返します。
        */
        get cells(): Cell[][] {
            return this._cells;
        }

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
            let b = false;
            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                if (p.type == "childList") {
                    b = true;
                }
                for (let j = 0; j < p.addedNodes.length; j++) {
                    const item = p.addedNodes.item(j);

                    if (item.nodeName == "#text") {
                        b = true;
                    }
                }
            }
            if (b) this.update();
        };


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
        テーブルの行方向の単位セルの数を返します。
        */
        get columnCount(): number {
            if (this.cells.length == 0) {
                return 0;
            } else {
                return this.cells[0].length;
            }
        }
        /**
        テーブルの列方向の単位セルの数を返します。
        */
        get rowCount(): number {
            return this.cells.length;
        }
        public getTryCell(x: number, y: number): Cell | null {
            if (x < 0 || x >= this.columnCount || y < 0 || y >= this.rowCount) {
                return null;
            } else {
                return this.cells[y][x];
            }
        }
        public getRangeCells(x: number, y: number, width: number, height: number): Cell[][] {
            let cells: Cell[][] = new Array(height);
            for (let i = 0; i < cells.length; i++) {
                cells[i] = new Array(0);
                for (let j = 0; j < width; j++) {
                    cells[i].push(this.cells[y + i][x + j]);
                }
            }
            return cells;
        }
        public getRangeCellArray(x: number, y: number, width: number, height: number): Cell[] {
            let cells: Cell[] = new Array();
            this.getRangeCells(x, y, width, height).forEach((v) => { v.forEach((w) => { cells.push(w) }) });
            return cells;
        }

        /**
        各セルを表す配列を返します。テーブルの左上のセルから右に向かってインデックスが割り当てられ、
        テーブル右下のセルが配列の最後の値となります。読み取り専用です。
        */
        get cellArray(): Cell[] {
            const arr = new Array(0);
            for (let y = 0; y < this.rowCount; y++) {
                for (let x = 0; x < this.columnCount; x++) {
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
            const arr = new Array(0);
            for (let y = 0; y < this.rowCount; y++) {
                for (let x = 0; x < this.columnCount; x++) {
                    if (arr.indexOf(this.cells[y][x].topBorder) == -1) {
                        arr.push(this.cells[y][x].topBorder);
                    }
                    if (arr.indexOf(this.cells[y][x].leftBorder) == -1) {
                        arr.push(this.cells[y][x].leftBorder);
                    }
                    if (arr.indexOf(this.cells[y][x].rightBorder) == -1) {
                        arr.push(this.cells[y][x].rightBorder);
                    }
                    if (arr.indexOf(this.cells[y][x].bottomBorder) == -1) {
                        arr.push(this.cells[y][x].bottomBorder);
                    }
                }
            }
            return arr;
        }


        /**
        所属しているSVGタグ上でのテーブルの領域を表すRectangleクラスを返します。        
        */
        public getRegion(): Rectangle {
            const regions = this.cellArray.map((v) => v.region);
            const rect = Rectangle.merge(regions);
            rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
            return rect;
        }

        /*
         constructor
        */
        constructor(svgbox: HTMLElement, _tableClassName: string | null = null) {

            this._svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgbox.appendChild(this.svgGroup);

            this._svgHiddenGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            this._svgHiddenGroup.style.visibility = "hidden";
            svgbox.appendChild(this.svgHiddenGroup);


            this._cellTextObserver = new MutationObserver(this._cellTextObserverFunc);
            //this.svgLineGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            //this.svgGroup.appendChild(this.svgLineGroup);

            if (_tableClassName != null) this.svgGroup.setAttribute("class", _tableClassName);
            this.setSize(5, 5);

        }
        public constructFromLogicTable(table: LogicTable) {

            if (table.tableClassName != null) this.svgGroup.setAttribute("class", table.tableClassName);
            this.setSize(table.columnWidths.length, table.rowHeights.length);

            for (let y = 0; y < this.rowCount; y++) {
                const h = table.rowHeights[y];
                if (h != null) this.rows[y].height = h;
            }
            for (let x = 0; x < this.columnCount; x++) {
                const w = table.columnWidths[x];
                if (w != null) this.columns[x].width = w;
            }

            for (let y = 0; y < this.rowCount; y++) {
                for (let x = 0; x < this.columnCount; x++) {
                    const cellInfo = table.cells[y][x];
                    if (cellInfo != null) {
                        const cell = this.cells[y][x];
                        if (cellInfo.cellClass != null) {
                            GraphTableSVG.SVG.resetStyle(cell.svgGroup.style);
                            cell.svgGroup.setAttribute("class", cellInfo.cellClass);
                        }
                        if (cellInfo.backgroundClass != null) {
                            GraphTableSVG.SVG.resetStyle(cell.svgBackground.style);
                            cell.svgBackground.setAttribute("class", cellInfo.backgroundClass);
                        }
                        if (cellInfo.textClass != null) {
                            GraphTableSVG.SVG.resetStyle(cell.svgText.style);
                            cell.svgText.setAttribute("class", cellInfo.textClass);
                        }
                        if (cellInfo.text != null) {
                            cell.svgText.setTextContent(cellInfo.text, cellInfo.isLatexMode);
                        }
                        if (cellInfo.topBorderClass != null) {
                            const topCellInfo = y > 0 ? table.cells[y - 1][x] : null;
                            if (topCellInfo != null && topCellInfo.bottomBorderClass != null && cellInfo.topBorderClass != null) {
                                throw Error(`Forbidden table[${y}][${x}].topBorderClass != null && table[${y-1}][${x}].bottomBorderClass`);
                            }

                            GraphTableSVG.SVG.resetStyle(cell.topBorder.style);
                            cell.topBorder.setAttribute("class", cellInfo.topBorderClass);
                        }
                        if (cellInfo.leftBorderClass != null) {
                            const leftCellInfo = x > 0 ? table.cells[y][x - 1] : null;
                            if (leftCellInfo != null && leftCellInfo.rightBorderClass != null && cellInfo.leftBorderClass != null) {
                                throw Error(`Forbidden table[${y}][${x}].leftBorderClass != null && table[${y}][${x-1}].rightBorderClass`);
                            }

                            GraphTableSVG.SVG.resetStyle(cell.leftBorder.style);
                            cell.leftBorder.setAttribute("class", cellInfo.leftBorderClass);
                        }
                        if (cellInfo.rightBorderClass != null) {
                            const rightCellInfo = x + 1 < table.columnCount ? table.cells[y][x + 1] : null;
                            if (rightCellInfo != null && rightCellInfo.leftBorderClass != null && cellInfo.rightBorderClass != null) {
                                throw Error(`Forbidden table[${y}][${x}].rightBorderClass != null && table[${y}][${x + 1}].leftBorderClass`);
                            }
                            GraphTableSVG.SVG.resetStyle(cell.rightBorder.style);
                            cell.rightBorder.setAttribute("class", cellInfo.rightBorderClass);
                        }
                        if (cellInfo.bottomBorderClass != null) {
                            const bottomCellInfo = y + 1 < table.rowCount ? table.cells[y + 1][x] : null;
                            if (bottomCellInfo != null && bottomCellInfo.topBorderClass != null && cellInfo.bottomBorderClass != null) {
                                throw Error(`Forbidden table[${y}][${x}].bottomBorderClass != null && table[${y+1}][${x}].topBorderClass`);
                            }
                            GraphTableSVG.SVG.resetStyle(cell.bottomBorder.style);
                            cell.bottomBorder.setAttribute("class", cellInfo.bottomBorderClass);
                        }

                    }
                }
            }

            

            this.update();
            for (let y = 0; y < this.rowCount; y++) {
                for (let x = 0; x < this.columnCount; x++) {
                    const cell = this.cells[y][x];
                    const logicCell = table.cells[y][x];
                    if (logicCell.connectedColumnCount > 1 || logicCell.connectedRowCount > 1) {
                        if (cell.canMerge(logicCell.connectedColumnCount, logicCell.connectedRowCount)) {
                            cell.Merge(logicCell.connectedColumnCount, logicCell.connectedRowCount);
                        }
                    }
                }
            }

        }
        public construct(table: string[][], isLatexMode: boolean = false) {
            this.clear();
            let width = 0;
            table.forEach((v) => { if (v.length > width) width = v.length });
            let height = table.length;
            this.setSize(width, height);

            table.forEach((v, y) => {
                v.forEach((str, x) => {
                    this.cells[y][x].svgText.setTextContent(str, isLatexMode);
                })
            })
        }
        public constructFromLogicCell(table: LogicCell[][], isLatexMode: boolean = false) {

        }


        


        
        

        

        
        /*
        VBA Code
        */
        public createVBACode(id: number, slide: string): string[] {
            const lines = new Array(0);
            lines.push(`Sub create${id}(createdSlide As slide)`);
            
            const [main, sub] = this.createVBAMainCode("createdSlide", id);

            lines.push(main);
            lines.push(`End Sub`);
            lines.push(sub);

            return lines;
        }
        /**
         * 現在のテーブルを表すVBAコードを返します。
         */
        private createVBAMainCode(slideName: string, id: number): [string, string] {
            const fstLines: string[] = [];
            const lines : string[][] = new Array(0);

            fstLines.push(` Dim tableS As shape`);
            fstLines.push(` Dim table_ As table`);
            //lines.push(` Set tableS = CreateTable(createdSlide, ${table.height}, ${table.width})`);
            fstLines.push(` Set tableS = ${slideName}.Shapes.AddTable(${this.rowCount}, ${this.columnCount})`)
            fstLines.push(` tableS.Left = ${this.svgGroup.getX()}`);
            fstLines.push(` tableS.Top = ${this.svgGroup.getY()}`);

            //page.Shapes.AddTable(row_, column_)
            fstLines.push(` Set table_ = tableS.table`);

            const tableName = "table_";
            
            for (let y = 0; y < this.rowCount; y++) {
                lines.push([` Call EditRow(${tableName}.Rows(${y + 1}), ${this.rows[y].height})`]);
            }
            for (let x = 0; x < this.columnCount; x++) {
                lines.push([` Call EditColumn(${tableName}.Columns(${x + 1}), ${this.columns[x].width})`]);
            }

            for (let y = 0; y < this.rowCount; y++) {
                for (let x = 0; x < this.columnCount; x++) {
                    const cell = this.cells[y][x];
                    let color = Color.translateRGBCodeFromColorName2(cell.svgBackground.getPropertyStyleValueWithDefault("fill", "gray"));
                    //const style = cell.svgBackground.style.fill != null ? VBATranslateFunctions.colorToVBA(cell.svgBackground.style.fill) : "";
                    VBATranslateFunctions.TranslateSVGTextElement(lines, this.cells[y][x].svgText, `${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame.TextRange`);
                    lines.push([`${tableName}.cell(${y + 1},${x + 1}).Shape.Fill.ForeColor.RGB = RGB(CInt(${color.r}), CInt(${color.g}), CInt(${color.b}))`]);
                    //lines.push(` Call EditCell(${tableName}.cell(${y + 1},${x + 1}), "${cell.svgText.textContent}", ${color})`);
                }
            }

            for (let y = 0; y < this.rowCount; y++) {
                for (let x = 0; x < this.columnCount; x++) {
                    const cell = this.cells[y][x];
                    const fontSize = parseInt(cell.svgText.getPropertyStyleValueWithDefault("font-size", "12pt"));
                    const color = VBATranslateFunctions.colorToVBA(cell.svgText.getPropertyStyleValueWithDefault("fill", "gray"));
                    const fontFamily = VBATranslateFunctions.ToVBAFont(cell.svgText.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
                    const fontBold = VBATranslateFunctions.ToFontBold(cell.svgText.getPropertyStyleValueWithDefault("font-weight", "none"));
                    lines.push([` Call EditCellFont(${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame, ${fontSize}, "${fontFamily}", ${color}, ${fontBold})`]);
                }
            }
            for (let y = 0; y < this.rowCount; y++) {
                for (let x = 0; x < this.columnCount; x++) {
                    const cell = this.cells[y][x];
                    const vAnchor = VBATranslateFunctions.ToVerticalAnchor(cell.verticalAnchor == null ? "" : cell.verticalAnchor);
                    const hAnchor = VBATranslateFunctions.ToHorizontalAnchor(cell.horizontalAnchor == null ? "" : cell.horizontalAnchor);
                    lines.push([` Call EditCellTextFrame(${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame, ${cell.paddingTop}, ${cell.paddingBottom}, ${cell.paddingLeft}, ${cell.paddingRight}, ${vAnchor}, ${hAnchor})`]);
                }
            }
            for (let y = 0; y < this.rowCount; y++) {
                for (let x = 0; x < this.columnCount; x++) {
                    const cell = this.cells[y][x];
                    const upLineStyle = VBATranslateFunctions.colorToVBA(cell.topBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                    const upLineStrokeWidth = cell.topBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.topBorder.style.strokeWidth) : "";
                    const upLineVisibility = cell.topBorder.style.visibility != null ? GraphTableSVG.visible(cell.topBorder.style.visibility) : ""; 

                    lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderTop), ${upLineStyle}, ${upLineStrokeWidth}, ${upLineVisibility})`]);

                    const leftLineStyle = VBATranslateFunctions.colorToVBA(cell.leftBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                    const leftLineStrokeWidth = cell.leftBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.leftBorder.style.strokeWidth) : "";
                    const leftLineVisibility = cell.leftBorder.style.visibility != null ? GraphTableSVG.visible(cell.leftBorder.style.visibility) : ""; 

                    lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderLeft), ${leftLineStyle}, ${leftLineStrokeWidth}, ${leftLineVisibility})`]);
                    if (x + 1 == this.columnCount) {

                        const rightLineStyle = VBATranslateFunctions.colorToVBA(cell.rightBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                        const rightLineStrokeWidth = cell.rightBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.rightBorder.style.strokeWidth) : "";
                        const rightLineVisibility = cell.rightBorder.style.visibility != null ? GraphTableSVG.visible(cell.rightBorder.style.visibility) : ""; 

                        lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderRight), ${rightLineStyle}, ${rightLineStrokeWidth}, ${rightLineVisibility})`]);
                    }

                    if (y + 1 == this.rowCount) {
                        const bottomLineStyle = VBATranslateFunctions.colorToVBA(cell.bottomBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                        const bottomLineStrokeWidth = cell.bottomBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.bottomBorder.style.strokeWidth) : "";
                        const bottomLineVisibility = cell.bottomBorder.style.visibility != null ? GraphTableSVG.visible(cell.bottomBorder.style.visibility) : ""; 

                        lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderBottom), ${bottomLineStyle}, ${bottomLineStrokeWidth}, ${bottomLineVisibility})`]);
                    }

                }
            }
            this.cellArray.forEach((v) => {
                if (v.isMaster) {
                    const cells = v.cellsInGroup;
                    for (let y = 0; y < cells.length; y++) {
                        for (let x = 1; x < cells[y].length; x++) {
                            lines.push([` ${tableName}.Cell(${cells[y][0].cellY + 1}, ${cells[y][0].cellX + 1}).Merge MergeTo := ${tableName}.Cell(${cells[y][x].cellY + 1}, ${cells[y][x].cellX + 1})`]);
                        }
                    }
                    for (let y = 1; y < cells.length; y++) {
                        lines.push([` ${tableName}.Cell(${cells[0][0].cellY + 1}, ${cells[0][0].cellX + 1}).Merge MergeTo := ${tableName}.Cell(${cells[y][0].cellY + 1}, ${cells[y][0].cellX + 1})`]);
                    }
                }
            });

            const x0 = VBATranslateFunctions.joinLines(fstLines);
            const [x1, y1] = VBATranslateFunctions.splitCode(lines, `${tableName} as Table`, `${tableName}`, id);
            return [VBATranslateFunctions.joinLines([x0, x1]), y1];
        }
        /*
        private splitCode(tableName: string, codes: string[], id: number): [string, string] {
            const functions: string[] = [];

            const p = VBATranslateFunctions.grouping80(codes);
            p.forEach(function (x, i, arr) {
                functions.push(`Call SubFunction${id}_${i}(${tableName})`);
                const begin = `Sub SubFunction${id}_${i}(${tableName} As Table)`;
                const end = `End Sub`;
                p[i] = VBATranslateFunctions.joinLines([begin, x, end]);
            });
            return [VBATranslateFunctions.joinLines(functions), VBATranslateFunctions.joinLines(p)];
        }
        */
        


        public toPlainText(): string {
            const plainTable = this.cells.map((v) => v.map((w) => w.toPlainText()));

            const widtharr: number[] = new Array(this.columnCount);
            for (let x = 0; x < this.columnCount; x++) {
                widtharr[x] = 0;
            }


            for (let y = 0; y < this.rowCount; y++) {
                for (let x = 0; x < this.columnCount; x++) {
                    const width = plainTable[y][x].length;
                    if (widtharr[x] < width) widtharr[x] = width;
                }
            }
            for (let y = 0; y < this.rowCount; y++) {
                for (let x = 0; x < this.columnCount; x++) {
                    plainTable[y][x] = GraphTableSVG.Common.paddingLeft(plainTable[y][x], widtharr[x], " ");
                }
            }

            return plainTable.map((v) => v.join(",")).join("\n");
        }
        

        /*
        Update
        */
        /**
        各セルのサイズを再計算します。
        */
        public update() {
            this._isDrawing = true;
            this.resize();
            this.relocation();
            //this.cellArray.forEach(function (x, i, arr) { x.relocation(); });

            this._isDrawing = false;

        }

        private renumbering() {

            this.rows.forEach((v, i) => v.cellY = i);
            this.columns.forEach((v, i) => v.cellX = i);

            this.cellArray.forEach((v) => v.renumbering());

            /*
            this.rows.forEach((v, i) => v.update());
            this.columns.forEach((v, i) => v.update());
            */

            //this.borders.forEach((v, i) => { v.setAttribute("borderID", i.toString()) });

        }
        private resize() {
            this.rows.forEach((v) => v.resize());
            this.columns.forEach((v)=>v.resize());

        }

        private relocation() {
            let height = 0;
            this.rows.forEach(function (x, i, arr) {
                x.setY(height);
                height += x.height;
            });
            let width = 0;
            this.columns.forEach(function (x, i, arr) {
                x.setX(width);

                width += x.width;
            });
            this.rows.forEach((v) => v.relocation());
        }

        private createCell(): Cell {
            return new Cell(this, 0, 0, this.defaultCellClass, this.defaultBorderClass);
        }




        /*
        Dynamic Method
        */

        public removeTable(svg: HTMLElement) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        }

        public setSize(width: number, height: number) {

            this.clear();
            while (this.rowCount < height) {
                this.insertRowFunction(this.rowCount, width);
            }
            while (this.columnCount < width) {
                this.insertColumn(this.columnCount);
            }

        }
        public clear() {
            if (this.columnCount != this.columns.length) throw Error("Error");

            while (this.rowCount > 1) {

                this.deleteRow(1);

            }
            while (this.columnCount > 1) {

                this.deleteColumn(1);

            }
            if (this.rowCount == 1 && this.columnCount == 1) {
                this.deleteLastCell();
            }

            //this.cells[0][0].svgText.textContent = "";
        }

        
        /**
        新しい列をi番目の列に挿入します。
        */
        public insertColumn(i: number) {
            if (this.rowCount > 0) {
                for (let y = 0; y < this.rowCount; y++) {
                    const cell = this.createCell();
                    this.cells[y].splice(i, 0, cell);
                }
                if (i < this.rowCount) {
                    for (let y = 0; y < this.rowCount; y++) {
                        this.cells[y][i].leftBorder = SVG.createLine(0, 0, 0, 0);
                        this.svgGroup.appendChild(this.cells[y][i].leftBorder);
                    }
                }
                this._columns.splice(i, 0, new Column(this, i));
                this.renumbering();
                //const p = i + 1 < this.columnCount ? i : i - 1;
                /*
                for (let y = 0; y < this.rowCount; y++) {
                    this.cells[y][i].updateBorder();
                }
                */
            } else {
                this.insertRow(0);
            }
            this.update();

        }
        private insertRowFunction(i: number, width: number = this.columnCount) {
            const cell: Cell[] = [];
            for (let x = 0; x < width; x++) {
                cell[x] = this.createCell();
                if (this._columns.length <= x) this._columns.push(new Column(this, 0));
            }
            if (i < this.rowCount) {
                for (let x = 0; x < width; x++) {
                    this.cells[i][x].topBorder = SVG.createLine(0, 0, 0, 0);
                    this.svgGroup.appendChild(this.cells[i][x].topBorder);
                }
            }
            this.cells.splice(i, 0, cell);
            this._rows.splice(i, 0, new Row(this, i));

            this.renumbering();
            //this.rows[i].cells.forEach((v) => v.updateBorder());
            this.update();

        }
        public deleteColumn(i: number) {
            if (this.rows.length == 1 && this.columns.length == 1 && i == 0) {
                this.deleteLastCell();
            } else {

                if (this.columnCount != this.columns.length) throw Error("Error");
                if (i > this.columnCount) throw Error("Error");
                if (this.columnCount == 1) throw Error("Error");
                for (let y = 0; y < this.rowCount; y++) {
                    const cell = this.cells[y][i];
                    cell.removeFromTable(true);


                    this.cells[y].splice(i, 1);
                }
                this.columns[i].detouch();
                this.renumbering();

                const p = i + 1 < this.columnCount ? i : i - 1;
                //this.columns[p].cells.forEach((v) => v.updateBorder());
                /*
                for (let y = 0; y < this.rowCount; y++) {
                    this.cells[y][p].updateBorder();
                }
                */
                this.update();

            }

        }
        public deleteRow(i: number) {
            if (this.rows.length == 1 && this.columns.length == 1 && i == 0) {
                this.deleteLastCell();
            } else {
                const h = this.rowCount;
                if (this.rowCount == 1) throw Error("Error");
                for (let x = 0; x < this.columnCount; x++) {
                    const cell = this.cells[i][x];
                    cell.removeFromTable(false);
                }

                this.cells.splice(i, 1);
                this.rows[i].detouch();

                this.renumbering();

                const p = i + 1 < this.rowCount ? i : i - 1;
                //this.rows[p].cells.forEach((v) => v.updateBorder());
                /*
                for (let x = 0; x < this.columnCount; x++) {
                    this.cells[p][x].updateBorder();
                    this.cells[p][x].relocation();
                }
                */
                this.update();

            }

        }
        private deleteLastCell() {
            if (this.rowCount == 1 && this.columnCount == 1) {
                const cell = this.cells[0][0];
                cell.removeFromTable(true);                
                this._cells.splice(0, 1);

                this.rows[0].detouch();
                this.columns[0].detouch();

            }
            this.update();

        }
        /**
        新しい列を最後の列に追加します。
        */
        public appendColumn() {
            this.insertColumn(this.columnCount);
        }

        /**
        新しい行をi番目の行に挿入します
        */
        public insertRow(i: number) {
            this.insertRowFunction(i, this.columnCount == 0 ? 1 : this.columnCount);
        }
        /**
        新しい行を行の最後に追加します。
        */
        public appendRow() {
            this.insertRow(this.rowCount);
        }
        public deleteLastRow() {
            this.deleteRow(this.rowCount - 1);
        }
        public deleteLastColumn() {
            this.deleteColumn(this.columnCount - 1);
        }

    }
}