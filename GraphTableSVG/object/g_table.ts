
namespace GraphTableSVG {

    /**
    テーブルを表します。
    */
    export class GTable extends GObject {


        /**
         * コンストラクタです。
         */
        constructor(svgbox: SVGElement,
            option: GTableOption = {}) {
            super(svgbox, option)
            if (Common.getGraphTableCSS() == null) Common.setGraphTableCSS("yellow", "red");

            this._svgHiddenGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            this._svgRowBorderGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            this._svgRowBorderGroup.setAttribute("name", "rowBorderGroup");
            this._svgColumnBorderGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            this._svgColumnBorderGroup.setAttribute("name", "columnBorderGroup");

            this._svgHiddenGroup.style.visibility = "hidden";
            this.svgGroup.appendChild(this.svgHiddenGroup);
            this.svgGroup.appendChild(this.svgRowBorderGroup);
            this.svgGroup.appendChild(this.svgColumnBorderGroup);

            this._cellTextObserver = new MutationObserver(this._cellTextObserverFunc);
            this.updateAttributes = [];
            this.isConstructing = true;

            this.firstSetSize();

            if (option.table === undefined) {
                if (option.rowCount == undefined) option.rowCount = 5;
                if (option.columnCount == undefined) option.columnCount = 5;
                this.setSize(option.columnCount, option.rowCount);

                if (option.rowHeight != undefined) {
                    this.rows.forEach((v) => v.height = <number>option.rowHeight);
                }
                if (option.columnWidth != undefined) {
                    this.columns.forEach((v) => v.width = <number>option.columnWidth);
                }
                for (let y = 0; y < this.rowCount; y++) {
                    for (let x = 0; x < this.columnCount; x++) {
                        this.updateCellByLogicCell(null, x, y);
                    }
                }
                this.update();

            } else {
                this.constructFromLogicTable(option.table);
            }

            if (option.cx !== undefined) this.cx = option.cx;
            if (option.cy !== undefined) this.cy = option.cy;
            this.isConstructing = false;

        }
        static constructAttributes(e: Element,
            removeAttributes: boolean = false, output: GTableOption = {}): GTableOption {
            const widthsStr = e.getPropertyStyleValue("--widths");

            GObject.constructAttributes(e, removeAttributes, output);

            const rows = HTMLFunctions.getChildren(e).filter((v) => v.getAttribute(CustomAttributeNames.customElement) == "row").map((v) => <HTMLElement>v);
            if (rows.length == 0) {

            } else {
                const cells: Element[][] = new Array(rows.length);
                let columnSize = 0;
                rows.forEach((v, i) => {
                    const cellArray = HTMLFunctions.getChildren(v).filter((v) => v.getAttribute(CustomAttributeNames.customElement) == "cell");
                    cellArray.forEach((v) => v.removeAttribute(CustomAttributeNames.customElement));
                    cells[i] = cellArray;
                    if (columnSize < cellArray.length) columnSize = cellArray.length;
                });
                output.table = new LogicTable({ rowCount: rows.length, columnCount: columnSize });

                if (widthsStr != null) {
                    const widths: (number | null)[] = JSON.parse(widthsStr);
                    widths.forEach((v, i) => output.table!.columnWidths[i] = v);
                }

                for (let y = 0; y < cells.length; y++) {
                    const h = rows[y].getPropertyStyleNumberValue("--height", null);
                    output.table!.rowHeights[y] = h;

                    for (let x = 0; x < cells[y].length; x++) {
                        output.table!.cells[y][x].text = cells[y][x].innerHTML;
                        if (cells[y][x].hasAttribute("w")) {
                            const w = Number(cells[y][x].getAttribute("w"));
                            output.table!.cells[y][x].connectedColumnCount = w;
                        }
                        if (cells[y][x].hasAttribute("h")) {
                            const h = Number(cells[y][x].getAttribute("h"));
                            output.table!.cells[y][x].connectedRowCount = h;
                        }
                        const tNodes = openSVGFunctions.getTNodes(cells[y][x]);
                        if (tNodes != null) output.table!.cells[y][x].tTexts = tNodes;

                    }
                }
                if (output.x !== undefined) output.table!.x = output.x;
                if (output.y !== undefined) output.table!.y = output.y;
                if (output.groupClass !== undefined) output.table!.tableClassName = output.groupClass;
                while (e.childNodes.length > 0) e.removeChild(e.childNodes.item(0));
            }

            return output;
        }
        // #region field
        private _svgHiddenGroup: SVGGElement;
        private _svgRowBorderGroup: SVGGElement;
        private _svgColumnBorderGroup: SVGGElement;
        public get svgRowBorderGroup(){
            return this._svgRowBorderGroup;
        }
        public get svgColumnBorderGroup(){
            return this._svgColumnBorderGroup;
        }

        /**
        各行を表す配列を返します。読み取り専用です。
        */
        private _rows: CellRow[] = new Array(0);
        /**
        各列を表す配列を返します。読み取り専用です。
        */
        private _columns: CellColumn[] = new Array(0);

        private _borderRows: BorderRow[] = new Array(0);
        private _borderColumns: BorderColumn[] = new Array(0);

        public get borderRows(): BorderRow[] {
            return this._borderRows;
        }
        public get borderColumns(): BorderColumn[] {
            return this._borderColumns;
        }

        //private _cells: Cell[][] = [];

        private isConstructing = false;
        get width(): number {
            let width = 0;
            this.columns.forEach((v) => width += v.width);
            return width;
        }
        set width(value: number) {
        }
        get height(): number {
            let height = 0;
            this.rows.forEach((v) => height += v.height);
            return height;

        }
        set height(value: number) {
        }

        /**
         * mergeによって見えなくなったBorderなどを格納している特別なSVGGElementです。
         */
        public get svgHiddenGroup(): SVGGElement {
            return this._svgHiddenGroup;
        }
        public get type(): ShapeObjectType {
            return ShapeObjectType.Table;
        }

        /**
        各行を表す配列を返します。読み取り専用です。
        */
        get rows(): CellRow[] {
            return this._rows;
        }
        /**
        各列を表す配列を返します。読み取り専用です。
        */
        get columns(): CellColumn[] {
            return this._columns;
        }
        /**
        各セルを格納している二次元ジャグ配列を返します。
        */

        get cells(): Cell[][] {
            return this.rows.map((v) => v.cells);
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
            let b2 = false;
            for (let i = 0; i < x.length; i++) {
                const p: MutationRecord = x[i];
                if (p.type == "childList") {
                    b = true;
                    b2 = true;
                }
                for (let j = 0; j < p.addedNodes.length; j++) {
                    const item = p.addedNodes.item(j);

                    if (item != null && item.nodeName == "#text") {
                        b = true;
                        b2 = true;
                    }
                }
            }
            if (b2 && !this.isConstructing) {
                //if(this.cellArray.some((v)=>v.isErrorCell)) throw new Error("err!");
                this.fitSizeToOriginalCells(false);
            }
            if (b) this.update();
        };
        /**
        * テーブルの行方向の単位セルの数を返します。
        * @returns 表の列数 
        */
        get columnCount(): number {
            if (this.cells.length == 0) {
                return 0;
            } else {
                if(this.rows.length > 2 && (this.rows[0].length != this.rows[1].length) ) throw new Error("Invalid length error");
                return this.rows[0].length;
            }
        }
        /**
        * テーブルの列方向の単位セルの数を返します。
        * @returns 表の行数
        */
        get rowCount(): number {

            return this.cells.length;
        }

        // #endregion

        // #region property
        /**
        セルのインスタント生成時にこの値がインスタントのクラス名にセットされます。
        */
        get defaultCellClass(): string | null {
            return this.svgGroup.getPropertyStyleValue(CustomAttributeNames.Style.defaultCellClass);
        }
        /**
        ボーダーのインスタント生成時にこの値がインスタントのクラス名にセットされます。
        */
        get defaultBorderClass(): string | null {
            return this.svgGroup.getPropertyStyleValue(CustomAttributeNames.Style.defaultBorderClass);
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
                    if (arr.indexOf(this.cells[y][x].svgTopBorder) == -1) {
                        arr.push(this.cells[y][x].svgTopBorder);
                    }
                    if (arr.indexOf(this.cells[y][x].svgLeftBorder) == -1) {
                        arr.push(this.cells[y][x].svgLeftBorder);
                    }
                    if (arr.indexOf(this.cells[y][x].svgRightBorder) == -1) {
                        arr.push(this.cells[y][x].svgRightBorder);
                    }
                    if (arr.indexOf(this.cells[y][x].svgBottomBorder) == -1) {
                        arr.push(this.cells[y][x].svgBottomBorder);
                    }
                }
            }
            return arr;
        }
        // #endregion

        // #region method
        /**
         * セルの元々のサイズに合わせて表のサイズを調整します。
         * @param allowShrink 各行と各列が現在の幅より短くなることを許す
         */
        public fitSizeToOriginalCells(allowShrink: boolean) {
            this.rows.forEach((v) => v.fitHeightToOriginalCell(allowShrink));
            this.columns.forEach((v) => v.fitWidthToOriginalCell(allowShrink));
        }


        /**
         * 指定したセル座標のセルを返します。そのようなセルが存在しない場合nullを返します。
         * @param x セルの列番号
         * @param y セルの行番号
         */
        public getTryCell(x: number, y: number): Cell | null {
            if (x < 0 || x >= this.columnCount || y < 0 || y >= this.rowCount) {
                return null;
            } else {
                return this.cells[y][x];
            }
        }
        /**
         * 指定したセル座標範囲の二次元セル配列を返します。
         * @param x 範囲の左上を示す列番号
         * @param y 範囲の左上を示す行番号
         * @param width 範囲に含まれる列数
         * @param height 範囲に含まれる行数
         */
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
        /**
         * 指定したセル座標範囲のセルを配列でかえします。
         * @param x 範囲の左上を示す列番号
         * @param y 範囲の左上を示す行番号
         * @param width 範囲に含まれる列数
         * @param height 範囲に含まれる行数
         */
        public getRangeCellArray(x: number, y: number, width: number, height: number): Cell[] {
            let cells: Cell[] = new Array();
            this.getRangeCells(x, y, width, height).forEach((v) => { v.forEach((w) => { cells.push(w) }) });
            return cells;
        }




        /**
        所属しているSVGタグ上でのテーブルの領域を表すRectangleクラスを返します。        
        */
        public getRegion(): Rectangle {
            let rect = new Rectangle();
            rect.x = this.svgGroup.getX();
            rect.y = this.svgGroup.getY();
            rect.width = this.width;
            rect.height = this.height;
            return rect;
            /*
            const regions = this.cellArray.map((v) => v.region);
            const rect = Rectangle.merge(regions);
            rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
            return rect;
            */
        }
        /**
        * 強調セルを全て返します。
        */
        public getEmphasizedCells(): GraphTableSVG.Cell[] {
            return this.cellArray.filter((v) => v.isEmphasized);
        }
        /**
        * 表を文字列に変換した結果を返します。
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
        // #endregion

        // #region construct2
        private updateCellByLogicCell(table: LogicTable | null, x: number, y: number) {
            const cell = this.cells[y][x];
            //const isShow = HTMLFunctions.isShow(this.svgGroup);
            if (table != null) {
                const cellInfo = table.cells[y][x];
                if (cellInfo != null) {
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
                    cellInfo.createTextElement(cell.svgText);
                    /*
                    if (cellInfo.text != null) {
                        cell.svgText.setTextContent(cellInfo.text, cellInfo.isLatexMode);
                    }
                    */
                    if (cellInfo.topBorderClass != null) {

                        //const topCellInfo = y > 0 ? table.cells[y - 1][x] : null;
                        let borderClass = cellInfo.topBorderClass;
                        //if (topCellInfo != null && topCellInfo.bottomBorderClass != null) {
                        //    borderClass = topCellInfo.bottomBorderClass;
                        //}
                        //if (topCellInfo != null && topCellInfo.bottomBorderClass != cellInfo.topBorderClass) {
                        //    throw Error(`Forbidden table[${y}][${x}].topBorderClass != table[${y-1}][${x}].bottomBorderClass`);
                        //}

                        GraphTableSVG.SVG.resetStyle(cell.svgTopBorder.style);
                        cell.svgTopBorder.setAttribute("class", borderClass);
                    }
                    if (cellInfo.leftBorderClass != null) {
                        //const leftCellInfo = x > 0 ? table.cells[y][x - 1] : null;

                        let borderClass = cellInfo.leftBorderClass;
                        //if (leftCellInfo != null && leftCellInfo.rightBorderClass != null) {
                        //    borderClass = leftCellInfo.rightBorderClass;
                        // }
                        /*
                        if (leftCellInfo != null && leftCellInfo.rightBorderClass != cellInfo.leftBorderClass) {
                            throw Error(`Forbidden table[${y}][${x}].leftBorderClass != table[${y}][${x-1}].rightBorderClass`);
                        }
                        */
                        GraphTableSVG.SVG.resetStyle(cell.svgLeftBorder.style);
                        cell.svgLeftBorder.setAttribute("class", borderClass);
                    }
                    if (cellInfo.rightBorderClass != null) {
                        //const rightCellInfo = x + 1 < table.columnCount ? table.cells[y][x + 1] : null;
                        let borderClass = cellInfo.rightBorderClass;
                        //if (rightCellInfo != null && rightCellInfo.leftBorderClass != null) {
                        //    borderClass = rightCellInfo.leftBorderClass;
                        //}
                        /*
                        if (rightCellInfo != null && rightCellInfo.leftBorderClass != cellInfo.rightBorderClass) {
                            throw Error(`Forbidden table[${y}][${x}].rightBorderClass != table[${y}][${x + 1}].leftBorderClass`);
                        }
                        */
                        GraphTableSVG.SVG.resetStyle(cell.svgRightBorder.style);
                        cell.svgRightBorder.setAttribute("class", borderClass);
                    }
                    if (cellInfo.bottomBorderClass != null) {
                        //const bottomCellInfo = y + 1 < table.rowCount ? table.cells[y + 1][x] : null;
                        let borderClass = cellInfo.bottomBorderClass;
                        //if (bottomCellInfo != null && bottomCellInfo.topBorderClass != null) {
                        //    borderClass = bottomCellInfo.topBorderClass;
                        //}
                        /*
                        if (bottomCellInfo != null && bottomCellInfo.topBorderClass != cellInfo.bottomBorderClass) {
                            throw Error(`Forbidden table[${y}][${x}].bottomBorderClass != table[${y+1}][${x}].topBorderClass`);
                        }
                        */
                        GraphTableSVG.SVG.resetStyle(cell.svgBottomBorder.style);
                        cell.svgBottomBorder.setAttribute("class", borderClass);
                    }
                    //if (isShow) cell.update();

                }
            }

            if (!cell.svgGroup.hasStyleAttribute(CustomAttributeNames.Style.paddingLeft)) cell.svgGroup.setPaddingLeft(10);
            if (!cell.svgGroup.hasStyleAttribute(CustomAttributeNames.Style.paddingRight)) cell.svgGroup.setPaddingRight(10);
            if (!cell.svgGroup.hasStyleAttribute(CustomAttributeNames.Style.paddingTop)) cell.svgGroup.setPaddingTop(10);
            if (!cell.svgGroup.hasStyleAttribute(CustomAttributeNames.Style.paddingBottom)) cell.svgGroup.setPaddingBottom(10);
            if (!cell.svgGroup.hasStyleAttribute(CustomAttributeNames.Style.VerticalAnchor)) cell.verticalAnchor = VerticalAnchor.Middle;
            if (!cell.svgGroup.hasStyleAttribute(CustomAttributeNames.Style.HorizontalAnchor)) cell.horizontalAnchor = HorizontalAnchor.Center;
            //if(this.cells[y][x].)
        }
        /**
         * LogicTableからTableを構築します。
         * @param table 入力LogicTable
         */
        public constructFromLogicTable(table: LogicTable) {

            if (table.tableClassName != null) this.svgGroup.setAttribute("class", table.tableClassName);
            this.setSize(table.columnWidths.length, table.rowHeights.length);

            if (table.x != null) this.cx = table.x;
            if (table.y != null) this.cy = table.y;

            for (let y = 0; y < this.rowCount; y++) {
                for (let x = 0; x < this.columnCount; x++) {
                    this.updateCellByLogicCell(table, x, y);
                }

            }

            //this.fitSizeToOriginalCells();
            for (let y = 0; y < this.rowCount; y++) {
                const h = table.rowHeights[y];
                if (h != null) this.rows[y].height = h;
            }
            for (let x = 0; x < this.columnCount; x++) {
                const w = table.columnWidths[x];
                if (w != null) this.columns[x].width = w;
            }

            this.update();
            for (let y = 0; y < this.rowCount; y++) {
                for (let x = 0; x < this.columnCount; x++) {
                    const cell = this.cells[y][x];
                    const logicCell = table.cells[y][x];
                    if (logicCell.connectedColumnCount > 1 || logicCell.connectedRowCount > 1) {
                        if (cell.canMerge(logicCell.connectedColumnCount, logicCell.connectedRowCount)) {
                            cell.merge(logicCell.connectedColumnCount, logicCell.connectedRowCount);
                        }
                    }
                }
            }

        }

        /**
         * 二次元文字列配列から表を作成します。
         * @param table 各セルの文字列
         * @param option 表情報
         * @param option.x 表のx座標
         * @param option.y 表のy座標
         * @param option.rowHeight 各行の縦幅(px)
         * @param option.columnWidth 各列の横幅(px)
         * @param option.tableClassName 表(svgGroup)のクラス属性
         * @param option.isLatexMode Trueのときセルの文字列をLatex表記とみなして描画します。
         * 
         */
        public construct(table: string[][], option: { tableClassName?: string, x?: number, y?: number, rowHeight?: number, columnWidth?: number, isLatexMode?: boolean } = {}) {
            if (option.isLatexMode == undefined) option.isLatexMode = false;
            if (option.x == undefined) option.x = 0;
            if (option.y == undefined) option.y = 0;
            [this.cx, this.cy] = [option.x, option.y];


            this.clear();
            let width = 0;
            table.forEach((v) => { if (v.length > width) width = v.length });
            let height = table.length;
            this.setSize(width, height);

            table.forEach((v, y) => {
                v.forEach((str, x) => {
                    this.cells[y][x].svgText.setTextContent(str, <boolean>option.isLatexMode);
                })
            })
            if (option.rowHeight != undefined) {
                this.rows.forEach((v) => v.height = <number>option.rowHeight);
            }
            if (option.columnWidth != undefined) {
                this.columns.forEach((v) => v.width = <number>option.columnWidth);
            }

        }
        // #endregion
        // #region vba
        /**
         * 表からVBAコードを作成します。
         * @param id 
         * @param slide 
         */
        public createVBACode2(id: number, slide: string): string[] {
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
            const lines: string[][] = new Array(0);

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
                    let color = Color.createRGBFromColorName(cell.svgBackground.getPropertyStyleValueWithDefault("fill", "gray"));
                    //const style = cell.svgBackground.style.fill != null ? VBATranslateFunctions.colorToVBA(cell.svgBackground.style.fill) : "";
                    VBATranslateFunctions.TranslateSVGTextElement(lines, this.cells[y][x].svgText, `${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame.TextRange`);
                    lines.push([`${tableName}.cell(${y + 1},${x + 1}).Shape.Fill.ForeColor.RGB = RGB(CInt(${color.r}), CInt(${color.g}), CInt(${color.b}))`]);
                    //lines.push(` Call EditCell(${tableName}.cell(${y + 1},${x + 1}), "${cell.svgText.textContent}", ${color})`);
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
                    const upLineStyle = VBATranslateFunctions.colorToVBA(cell.svgTopBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                    const upLineStrokeWidth = cell.svgTopBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.svgTopBorder.style.strokeWidth) : "";
                    const upLineVisibility = cell.svgTopBorder.style.visibility != null ? GraphTableSVG.visible(cell.svgTopBorder.style.visibility) : "";

                    lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderTop), ${upLineStyle}, ${upLineStrokeWidth}, ${upLineVisibility})`]);

                    const leftLineStyle = VBATranslateFunctions.colorToVBA(cell.svgLeftBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                    const leftLineStrokeWidth = cell.svgLeftBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.svgLeftBorder.style.strokeWidth) : "";
                    const leftLineVisibility = cell.svgLeftBorder.style.visibility != null ? GraphTableSVG.visible(cell.svgLeftBorder.style.visibility) : "";

                    lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderLeft), ${leftLineStyle}, ${leftLineStrokeWidth}, ${leftLineVisibility})`]);
                    if (x + 1 == this.columnCount) {

                        const rightLineStyle = VBATranslateFunctions.colorToVBA(cell.svgRightBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                        const rightLineStrokeWidth = cell.svgRightBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.svgRightBorder.style.strokeWidth) : "";
                        const rightLineVisibility = cell.svgRightBorder.style.visibility != null ? GraphTableSVG.visible(cell.svgRightBorder.style.visibility) : "";

                        lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderRight), ${rightLineStyle}, ${rightLineStrokeWidth}, ${rightLineVisibility})`]);
                    }

                    if (y + 1 == this.rowCount) {
                        const bottomLineStyle = VBATranslateFunctions.colorToVBA(cell.svgBottomBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                        const bottomLineStrokeWidth = cell.svgBottomBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.svgBottomBorder.style.strokeWidth) : "";
                        const bottomLineVisibility = cell.svgBottomBorder.style.visibility != null ? GraphTableSVG.visible(cell.svgBottomBorder.style.visibility) : "";

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

        // #endregion


        //private _updateCounter = 0;


        // #region dynamic

        /**
         * 新しいセルを作成します。
         */
        /*
        private createCell(cellX: number, cellY: number): Cell {
            const cellClass = this.defaultCellClass == null ? undefined : this.defaultCellClass;
            const borderClass = this.defaultBorderClass == null ? undefined : this.defaultBorderClass;

            const option: CellOption = { cellClass: cellClass, borderClass: borderClass };
            return new Cell(this, cellX, cellY, option);
        }
        */
        /*
        Dynamic Method
        */

        /**
         * テーブルを削除します。
         * @param svg 表が格納されているSVG要素
         */
        public removeTable(svg: SVGElement) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        }

        private isSetSize = false;

        private firstSetSize() {
            this.createRowBorder(0, 1);
            this.createRowBorder(0, 1);
            this.createColumnBorder(0, 1);
            this.createColumnBorder(0, 1);
            this._rows.splice(0, 0, new CellRow(this, 0, undefined));
            this._rows[0]._appendCell();
            this._columns.splice(0, 0, new CellColumn(this, 0));
        }

        private borderSizeCheck(_w: number, _h: number): void {
            const w = this.borderRows[0].borders.length;
            const h = this.borderColumns[0].borders.length;
            if (w != _w) throw Error(`error ${_w} ${_h} ${w} ${h}`);
            if (h != _h) throw Error(`error ${_w} ${_h} ${w} ${h}`);

            this.borderRows.forEach((v, i) => {
                if (w != v.borders.length) throw Error("border rows error");
            })
            this.borderColumns.forEach((v, i) => {
                if (h != v.borders.length) throw Error(`border column error ${h} ${v.borders.length} ${i}`);
            })

            //return [w, h];
        }
        /**
         * 表の列数と行数を変更します。
         * @param columnCount 列数 
         * @param rowCount 行数
         */
        public setSize(columnCount: number, rowCount: number) {

            this.clear();
            this.isSetSize = true;
            const borderRowCount = rowCount + 1;
            const borderColumnCount = columnCount + 1;
            if (this.rowCount == 0 || this.columnCount == 0) throw Error("Table Empty Error");

            /*
            while (this._borderRows.length < rowCount + 1) {
                const i = this._borderRows.length;
                this.createRowBorder(i);
                this.insertLineIntoColumns(i)
                //this.createRow(i-1);
            }
            */
            while (this.rowCount < rowCount) {
                this.primitiveInsertRow(this.rowCount, false);
            }
            while (this.columnCount < columnCount) {
                this.primitiveInsertColumn(this.columnCount, false);
            }
            /*
            this.borderSizeCheck(1, rowCount);
            while (this._borderColumns.length < columnCount + 1) {
                const i = this._borderColumns.length + 1;
                this.createColumnBorder(i);
                this.insertLineIntoRows(i);
            }
            this.borderSizeCheck(columnCount, rowCount);

            while (this.columnCount < columnCount) {
                this.createColumn(this.columnCount);
            }
            */

            /*
            while (this.rowCount < rowCount) {
                this.createRow(this.rowCount);
            }
            */




    
            this.updateNodeRelations();
            this.isSetSize = false;

            /*
            this.renumbering();
            this.update();
            */

        }
        private primitiveInsertRow(ithRow: number, insertTopBorders: boolean) {
            let ithRowBorder = insertTopBorders ? ithRow : ithRow + 1;
            if (ithRow < 0 || ithRow > this.rowCount) throw new Error("primitive insert row error");
            if(ithRow == 0) ithRowBorder = 0;
            if(ithRow == this.rowCount) ithRowBorder = this.borderRows.length;


            this.createRowBorder(ithRowBorder);
            this.insertYVerticalBorders(ithRow)
            this.createRow(ithRow);
        }
        private primitiveInsertColumn(ithColumn: number, insertLeftBorders: boolean) {
            let ithColumnBorder = insertLeftBorders ? ithColumn : ithColumn + 1;
            if (ithColumn < 0 || ithColumn > this.columnCount) throw new Error("primitive insert column error");
            if(ithColumn == 0) ithColumnBorder = 0;
            if(ithColumn == this.columnCount) ithColumnBorder = this.borderColumns.length;

            this.createColumnBorder(ithColumnBorder);
            this.insertXHorizontalBorders(ithColumn);
            this.createColumn(ithColumn);
        }

        public get borderColumnCount(): number {
            return this.columnCount + 1;
        }
        public get borderRowCount(): number {
            return this.rowCount + 1;
        }

        /**
         * rowCount = 0, columnCount = 0のテーブルを作成します。
         */
        public clear() {
            if (this.rowCount == 0 || this.columnCount == 0) throw Error("Table Empty Error");
            if (this.columnCount != this.columns.length) throw Error("clear error");
            
            while(this.rowCount > 1){
                this.primitiveRemoveRow(1, false);
            }
            while(this.columnCount > 1){
                this.primitiveRemoveColumn(1, false);
            }
            
            this.updateNodeRelations();

        }
        /*
        public removeCell(i: number) {
            this.cells[i].removeFromTable(false);
            //this.cells.forEach((v) => v.removeFromTable(false));
            this.cells.splice(i, 1);
        }
        */
        private removeCellRow(i : number) {
           this.rows[i]._dispose();
            this.rows.splice(i, 1);
        }
        private removeCellColumn(i : number) {
            this.columns[i]._dispose();
             this.columns.splice(i, 1);
         }
 
        private primitiveRemoveRow(ithRow: number, removeTopBorders: boolean) {
            const ithBorderRow = removeTopBorders ? ithRow : ithRow + 1;
            if (ithRow < 0 || ithRow >= this.rowCount) throw new Error("error");

            //this.removeRow(rowi);
            this.removeCellRow(ithRow);;
            this.removeRowBorder(ithBorderRow);
            this.deleteYVerticalBorders(ithRow);
        }

        private primitiveRemoveColumn(ithColumn: number, removeLeftBorders: boolean) {
            const ithborderColumn = removeLeftBorders ? ithColumn : ithColumn + 1;
            if (ithColumn < 0 || ithColumn >= this.columnCount) throw new Error("primitive insert column error");

            this.removeCellColumn(ithColumn);
            //this.columns[ithColumn].remove(true);
            //this.table.columns.splice(x, 1);


            this.removeColumnBorder(ithborderColumn);
            this.deleteXHorizontalBorders(ithColumn);

        }
        
        private removeColumnBorder(i: number) {
            //this._borderRows.forEach((v) => v.removeBorder(i));
            this._borderColumns[i].remove();
            this._borderColumns.splice(i, 1);
        }
        private removeRowBorder(i: number) {
            //this._borderColumns.forEach((v) => v.removeBorder(i));
            this._borderRows[i].remove();
            this._borderRows.splice(i, 1);
        }
        
        
        public removeRow(ithRow: number) {
            this.primitiveRemoveRow(ithRow, false);
            this.updateNodeRelations();
            this.update();
        }
        
       
        public removeColumn(ithColumn: number) {
            this.primitiveRemoveColumn(ithColumn, false);
            this.updateNodeRelations();
            this.update();
        }
        
        private deleteXHorizontalBorders(i: number) {
            this._borderRows.forEach((v) => {
                v.removeBorder(i);
            })
        }
        private deleteYVerticalBorders(i: number) {
            this._borderColumns.forEach((v) => {
                v.removeBorder(i);
            })
        }

        private createColumnBorder(i: number, borderRowCount: number = this.borderRows.length - 1) {
            const column = new BorderColumn(this, i, borderRowCount, undefined);
            this._borderColumns.splice(i, 0, column);
        }
        private createRowBorder(i: number, borderColumnCount: number = this.borderColumns.length - 1) {
            const row = new BorderRow(this, i, borderColumnCount, undefined);
            this._borderRows.splice(i, 0, row);
        }

        private createRow(i: number) {
            //const cell: Cell[] = [];
            //this.cells.splice(i, 0, cell);
            const columnCount = this.columnCount;
            const row = new CellRow(this, i, undefined);
            this._rows.splice(i, 0, row);
            row._appendCell(columnCount);
            /*
            for (let x = 0; x < this.columnCount; x++) {
                cell[x] = this.createCell(x, i);
                if (this._columns.length <= x) this._columns.push(new Column(this, 0));
            }
            */
        }
        private createColumn(i: number) {
            for (let y = 0; y < this.rowCount; y++) {
                this.rows[y]._insertCell(i);
                //const cell = this.createCell(i, y);
                //this.cells[y].splice(i, 0, cell);
            }
            this._columns.splice(i, 0, new CellColumn(this, i));
        }
        private insertXHorizontalBorders(i: number) {
            this._borderRows.forEach((v) => {
                v.insertBorder(i, undefined);
            })
        }
        private insertYVerticalBorders(i: number) {
            this._borderColumns.forEach((v) => {
                v.insertBorder(i, undefined);
            })
        }



        /**
        * 新しい行をi番目の行に挿入します
        * @param 挿入行の行番号
        */
        public insertRow(ithRow: number) {
            this.primitiveInsertRow(ithRow, false);
            this.updateNodeRelations();
            this.update();

        }
        /**
        * 新しい列をi番目の列に挿入します。
        * @param ithColumn 挿入列の列番号
        */
        public insertColumn(ithColumn: number) {
            this.primitiveInsertColumn(ithColumn,false)
            this.updateNodeRelations();
            this.update();
        }
        /**
         * 新しい行を作って挿入します。
         * @param i 挿入行の行番号
         * @param columnCount 挿入行の列数
         */
        /*
        private insertRowFunction(i: number, columnCount: number = this.columnCount) {
            const cell: Cell[] = [];

            this.cells.splice(i, 0, cell);
            this._rows.splice(i, 0, new Row(this, i));
            for (let x = 0; x < columnCount; x++) {
                cell[x] = this.createCell(x, i);
                if (this._columns.length <= x) this._columns.push(new Column(this, 0));
            }

        }
        */
        /**
        新しい列を最後の列に追加します。
        */
        public appendColumn() {
            //this.insertColumn(this.columnCount);
            this.primitiveInsertColumn(this.columnCount,false)
            this.updateNodeRelations();
            this.update();

        }

        /**
        新しい行を行の最後に追加します。
        */
        public appendRow() {
            //this.insertRow(this.rowCount);
            this.primitiveInsertRow(this.rowCount, false);
            this.updateNodeRelations();
            this.update();
            //this.update();
        }
        // #endregion

        // #region update
        private prevShow: boolean = false;

        /**
        各セルのサイズを再計算します。
        */
        public update() {
            this._observer.disconnect();
            const display = this.svgGroup.getPropertyStyleValue("display");

            if (display == "none") return;
            const b = HTMLFunctions.isShow(this.svgGroup);
            if (!b) {
                this.prevShow = true;
                return;
            }

            this._isDrawing = true;
            if (this.prevShow) {
                this.cellArray.forEach((v) => v.update());
                this.fitSizeToOriginalCells(false);
                this.prevShow = false;
            }
            this.resize();
            this.relocation();
            this._isDrawing = false;
            this._observer.observe(this.svgGroup, this.groupObserverOption);

        }
        /**
         * セル番号を振り直します。
         */
        /*
        private renumbering() {

            this.rows.forEach((v, i) => v.cellY = i);
            this.columns.forEach((v, i) => v.cellX = i);
            //this.cellArray.forEach((v) => v.updateBorderAttributes());

        }
        */

        private updateNodeRelations() {
            this.rows.forEach((v, i) => v.cellY = i);
            this.columns.forEach((v, i) => v.cellX = i);
            this.borderRows.forEach((v, i) => {
                if (v.borders.length != this.columnCount) {
                    throw new Error(`error row ${i} ${v.borders.length} ${this.columnCount}`);
                }
            })
            this.borderColumns.forEach((v, i) => {
                if (v.borders.length != this.rowCount) {
                    throw new Error(`error column ${i} ${v.borders.length} ${this.rowCount}`);

                }
            })

            this.cellArray.forEach((v) => v.updateNodeRelations());

        }


        /**
         * サイズを再計算します。
         */
        private resize() {
            this.rows.forEach((v) => v.resize());
            this.columns.forEach((v) => v.resize());

        }
        /**
         * 各セルの位置を再計算します。
         */
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

            this.cellArray.forEach((v) => v.relocation());

            //this.rows.forEach((v) => v.relocation());
        }
        // #endregion


        /*
        public deleteLastRow() {
            this.rows[this.rowCount - 1].remove(true);
        }
        public deleteLastColumn() {
            this.deleteColumn(this.columnCount - 1);
        }
        */
        /*
        public deleteColumn(i: number) {
            const [b,e] = this.columns[i].groupColumnRange;
            for (let x = e; x >= b; x--) {
                this.columns[x].remove();
            }
        }
        */
        /*
        public deleteRow(i: number) {
            
            const [b, e] = this.rows[i].groupRowRange;
            for (let y = e; y >= b; y--) {
                this.rows[y].remove();
            }
        }
        */
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
        /*
        public constructFromLogicCell(table: LogicCell[][], isLatexMode: boolean = false) {

        }
        */
        /*
        public get x() : number {
            return this.svgGroup.getX();
        }
        public set x(value :number) {
            this.svgGroup.setX(value);
        }
        public get y() : number {
            return this.svgGroup.getY();
        }
        public set y(value :number) {
            this.svgGroup.setY(value);
        }
        */

    }
}