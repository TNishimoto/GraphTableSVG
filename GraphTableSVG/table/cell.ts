﻿
namespace GraphTableSVG {
    

    export class Cell {
        private static readonly defaultBackgroundClassName: string = "--default-background-class";
        private static readonly defaultTextClass: string = "--default-text-class";
        public static readonly cellXName = "data-cellX";
        public static readonly cellYName = "data-cellY";
        public static readonly borderXName = "data-borderX";
        public static readonly borderYName = "data-borderY";
        public static readonly borderTypeName = "data-borderType";

        public static readonly masterIDName = "data-masterID";
        public static readonly masterDiffXName = "data-masterDiffX";
        public static readonly masterDiffYName = "data-masterDiffY";

        public static readonly elementTypeName = "data-elementType";

        private _observer: MutationObserver;
        private _observerFunc: MutationCallback = (x: MutationRecord[]) => {
            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                if (p.attributeName == "style" || p.attributeName == "class") {
                    this.localUpdate();
                }
                
            }
        };
        

        /*
        private _textObserver: MutationObserver;
        private _textObserverFunc: MutationCallback = (x: MutationRecord[]) => {
            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                for (let j = 0; j < p.addedNodes.length; j++) {
                    const item = p.addedNodes.item(j);
                    console.log(`${this.table.isDrawing} ${this.table.isAutoResized}`)
                    console.log(this.svgText.textContent);

                    if (item.nodeName == "#text") {
                        if (!this.table.isDrawing && this.table.isAutoResized) {
                            this.table.resize();
                        }
                    }
                }
            }
        };
        */
        constructor(parent: Table, _px: number, _py: number, cellClass: string | null = null, borderClass: string | null = null) {



            this._svgGroup = SVG.createGroup();
            this._table = parent;

            this.table.svgGroup.insertBefore(this.svgGroup, this.table.svgGroup.firstChild);

            if (cellClass != null) this.svgGroup.setAttribute("class", cellClass);

            this.svgGroup.setAttribute(Cell.elementTypeName, "cell-group");

            //this.padding = new Padding();
            this.svgGroup.setAttribute(Cell.cellXName, `${_px}`);
            this.svgGroup.setAttribute(Cell.cellYName, `${_py}`);

            //this.cellX = _px;
            //this.cellY = _py;
            this.masterDiffX = 0;
            this.masterDiffY = 0;



            this._svgBackground = Cell.createCellRectangle(this.defaultBackgroundClass);
            this._svgText = SVG.createText(this.defaultTextClass);
            this.svgGroup.appendChild(this.svgBackground);
            SVG.setDefaultValue(this.svgBackground);

            this.svgGroup.appendChild(this.svgText);

            /*
            const circle = createRectangle();
            circle.style.fill = "blue";
            this.rect = circle;
            this.svgGroup.appendChild(circle);
            */

            //this.parent.svgGroup.appendChild(this.svgGroup);

            this.topBorder = GraphTableSVG.SVG.createLine(0, 0, 0, 0, borderClass);
            this.leftBorder = GraphTableSVG.SVG.createLine(0, 0, 0, 0, borderClass);
            this.rightBorder = GraphTableSVG.SVG.createLine(0, 0, 0, 0, borderClass);
            this.bottomBorder = GraphTableSVG.SVG.createLine(0, 0, 0, 0, borderClass);
            this.updateBorderAttributes();
            this.table.svgGroup.appendChild(this.topBorder);
            this.table.svgGroup.appendChild(this.leftBorder);
            this.table.svgGroup.appendChild(this.rightBorder);
            this.table.svgGroup.appendChild(this.bottomBorder);

            const option1: MutationObserverInit = { childList: true, subtree: true };
            this.table.cellTextObserver.observe(this.svgText, option1);

            this._observer = new MutationObserver(this._observerFunc);
            const option2: MutationObserverInit = { attributes : true};
            this._observer.observe(this.svgGroup, option2);
            

            
            /*
            this.verticalAnchor = VerticalAnchor.Middle;
            this.horizontalAnchor = HorizontalAnchor.Left;
            */

        }
        public updateBorderAttributes(): void {
            this.topBorder.setAttribute(Cell.borderXName, `${this.cellX}`);
            this.topBorder.setAttribute(Cell.borderYName, `${this.cellY}`);
            this.topBorder.setAttribute(Cell.borderTypeName, "horizontal");
            //this.topBorder.setAttribute("data-border", "top");


            this.leftBorder.setAttribute(Cell.borderXName, `${this.cellX}`);
            this.leftBorder.setAttribute(Cell.borderYName, `${this.cellY}`);
            this.leftBorder.setAttribute(Cell.borderTypeName, "vertical");


            this.rightBorder.setAttribute(Cell.borderXName, `${this.cellX+1}`);
            this.rightBorder.setAttribute(Cell.borderYName, `${this.cellY+1}`);
            this.rightBorder.setAttribute(Cell.borderTypeName, "vertical");


            this.bottomBorder.setAttribute(Cell.borderXName, `${this.cellX+1}`);
            this.bottomBorder.setAttribute(Cell.borderYName, `${this.cellY+1}`);
            this.bottomBorder.setAttribute(Cell.borderTypeName, "horizontal");
        }
        private get innerExtraPaddingLeft(): number {
            const p = this.fontSize;
            return p / 16;
        }
        private get innerExtraPaddingRight(): number{
            const p = this.fontSize;
            return p / 16;            
        }
        //private _masterID: number;
        public get masterDiffX(): number {
            return Number(this.svgGroup.getAttribute(Cell.masterDiffXName));
        }
        public set masterDiffX(id: number) {
            this.svgGroup.setAttribute(Cell.masterDiffXName, `${id}`);
        }

        public get masterDiffY(): number {
            return Number(this.svgGroup.getAttribute(Cell.masterDiffYName));
        }
        public set masterDiffY(id: number) {
            this.svgGroup.setAttribute(Cell.masterDiffYName, `${id}`);
        }

        public get masterCellX(): number {
            return this.cellX + this.masterDiffX;
        }
        public set masterCellX(id: number) {
            this.masterDiffX = id - this.cellX;
        }

        public get masterCellY(): number {
            return this.cellY + this.masterDiffY;
        }
        public set masterCellY(id: number) {
            this.masterDiffY = id - this.cellY;
        }


        public get masterID(): number {
            return this.table.cells[this.masterCellY][this.masterCellX].ID;
        }
        /*
        public set masterID(id: number) {
            this.svgGroup.setAttribute(Cell.masterIDName, `${id}`);
        }
        */

        public get master(): Cell {
            return this.table.cellArray[this.masterID];
        }

        private _topBorder: SVGLineElement;
        /**
        セルの上にある枠を返します
        */
        get topBorder(): SVGLineElement {
            
            return this._topBorder;
        }
        /**
        セルの上にある枠を設定します
        */
        set topBorder(line: SVGLineElement) {
            this._topBorder = line;
        }
        private _leftBorder: SVGLineElement;
        /**
        セルの左にある枠を返します
        */
        get leftBorder(): SVGLineElement {
            return this._leftBorder;
        }
        /**
        セルの左にある枠を設定します
        */
        set leftBorder(line: SVGLineElement) {
            this._leftBorder = line;
        }

        private _rightBorder: SVGLineElement;
        /**
        セルの右にある枠を返します
        */
        get rightBorder(): SVGLineElement {
            return this._rightBorder;
        }
        /**
        セルの右にある枠を設定します
        */
        set rightBorder(line: SVGLineElement) {
            this._rightBorder = line;
        }


        private _bottomBorder: SVGLineElement;
        /**
        セルの下にある枠を返します
        */
        get bottomBorder(): SVGLineElement {
            return this._bottomBorder;
        }
        /**
        セルの下にある枠を設定します
        */
        set bottomBorder(line: SVGLineElement) {
            this._bottomBorder = line;
        } 
        private _table: Table;
        /**
        所属しているTableを返します。
        */
        public get table(): Table {
            return this._table;
        }        
        private _svgBackground: SVGRectElement;
        /**
        セルの背景を表現しているSVGRectElementを返します。
        */
        public get svgBackground(): SVGRectElement {
            return this._svgBackground;
        }
        private _svgText: SVGTextElement;
        /**
        セルのテキストを表現しているSVGTextElementを返します。
        */
        public get svgText(): SVGTextElement {
            return this._svgText;
        }
        private _svgGroup: SVGGElement;
        /**
        セルを表しているSVGGElementを返します。
        */
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        get fontSize(): number {
            const p = this.svgText.getPropertyStyleValueWithDefault("font-size", "24");
            const p2 = parseInt(p);
            return p2;
        }
        /**
        テキストとセル間の左のパディング値を返します。
        */
        get paddingLeft(): number {
            return parsePXString(this.svgGroup.getPropertyStyleValue("padding-left"));
        }

        /**
        テキストとセル間の右のパディング値を返します。
        */
        get paddingRight(): number {
            return parsePXString(this.svgGroup.getPropertyStyleValue("padding-right"));
        }
        /**
        テキストとセル間の上のパディング値を返します。
        */
        get paddingTop(): number {
            return parsePXString(this.svgGroup.getPropertyStyleValue("padding-top"));
        }
        /**
        テキストとセル間の下のパディング値を返します。
        */
        get paddingBottom(): number {
            return parsePXString(this.svgGroup.getPropertyStyleValue("padding-bottom"));

        }
        /**
        テキストの水平方向の配置設定を返します。
        */
        get horizontalAnchor(): string | null {
            return this.svgGroup.getPropertyStyleValue(HorizontalAnchorPropertyName);
        }
        /**
        テキストの水平方向の配置設定を設定します。
        */
        set horizontalAnchor(value: string | null) {
            if (this.horizontalAnchor != value) this.svgGroup.setPropertyStyleValue(HorizontalAnchorPropertyName, value);
        }
        /**
        テキストの垂直方向の配置設定を返します。
        */
        get verticalAnchor(): string | null {
            return this.svgGroup.getPropertyStyleValue(VerticalAnchorPropertyName);
        }
        /**
        テキストの垂直方向の配置設定を設定します。
        */
        set verticalAnchor(value: string | null) {
            if (this.verticalAnchor != value) this.svgGroup.setPropertyStyleValue(VerticalAnchorPropertyName, value);
        }

        /**
        単位セルを基準にした自身のX座標を返します。
        */
        get cellX(): number {
            return Number(this.svgGroup.getAttribute(Cell.cellXName));
        }
        /**
        単位セルを基準にした自身のX座標を設定します。
        */
        set cellX(value: number) {
            if (this.cellX != value) this.svgGroup.setAttribute(Cell.cellXName, value.toString());
        }
        /**
        単位セルを基準にした自身のY座標を返します。
        */
        get cellY(): number {
            return Number(this.svgGroup.getAttribute(Cell.cellYName));
        }
        /**
        単位セルを基準にした自身のY座標を設定します。
        */
        set cellY(value: number) {
            if (this.cellY != value) this.svgGroup.setAttribute(Cell.cellYName, value.toString());
        }

        /**
        SVGTextElement生成時に設定するクラス名を返します。
        */
        get defaultTextClass(): string | null {
            const r = this.svgGroup.getPropertyStyleValue(Cell.defaultTextClass);
            return r;
        }
        /**
        SVGBackElement生成時に設定するクラス名を返します。
        */
        get defaultBackgroundClass(): string | null {
            return this.svgGroup.getPropertyStyleValue(Cell.defaultBackgroundClassName);
        }

        /**
        未定義
        */
        get logicalWidth(): number {
            if (this.isMaster) {
                let w = 0;
                let now: Cell | null = this;
                while (now != null && this.ID == now.masterID) {
                    now = this.rightCell;
                    w++;
                }
                return w;
            } else {
                return 0;
            }
        }
        /**
        未定義
        */
        get logicalHeight(): number {
            if (this.isMaster) {
                let h = 0;
                let now: Cell | null = this;
                while (now != null && this.ID == now.masterID) {
                    now = this.bottomCell;
                    h++;
                }
                return h;
            } else {
                return 0;
            }
        }

        /**
        CellがDocumentのDOMに所属しているかどうかを返します。
        */
        get isLocated(): boolean {
            return GraphTableSVG.Common.IsDescendantOfBody(this.svgGroup);
        }

        /**
        セルが取るべき幅を返します。
        */
        get calculatedWidthUsingText(): number {
            if (this.isLocated) {
                return this.svgText.getBBox().width + this.innerExtraPaddingLeft + this.innerExtraPaddingRight
                    + parsePXString(this.svgGroup.style.paddingLeft) + parsePXString(this.svgGroup.style.paddingRight);
            } else {
                return 0;
            }
        }
        /**
        セルが取るべき高さを返します。
        */
        get calculatedHeightUsingText(): number {
            if (this.isLocated) {
                return this.svgText.getBBox().height + parsePXString(this.svgGroup.style.paddingTop) + parsePXString(this.svgGroup.style.paddingBottom);
            } else {
                return 0;
            }
        }

        calculatedSizeUsingGroup(): [number, number] {
            if (this.isLocated) {
                let w = 0;
                let h = 0;
                this.leftSideGroupCells.forEach((v) => h += this.table.rows[v.cellY].height);

                this.upperSideGroupCells.forEach((v) => w += this.table.columns[v.cellX].width);
                
                return [w, h];

            } else {
                return [0, 0];
            }
        }

        /**
         *セルのサイズを再計算します。
         */
        public resize() {
            const [w, h] = this.calculatedSizeUsingGroup(); 
            if (this.width != w) {
                this.width = w;
            }
            if (this.height != h) {
                this.height = h;
            }

            if (this.width < this.calculatedWidthUsingText) {
                this.width = this.calculatedWidthUsingText;
            }
            if (this.height < this.calculatedHeightUsingText) {
                this.height = this.calculatedHeightUsingText;
            }
            //console.log([-1, this.width, this.height, w, h]);
        }
        /**
         * 再描画します。
         */
        private localUpdate() {
            const innerRect = new Rectangle();
            innerRect.x = this.innerExtraPaddingLeft + this.paddingLeft;
            innerRect.y = this.paddingTop;
            innerRect.height = this.height  - this.paddingTop - this.paddingBottom;
            innerRect.width = this.width - this.innerExtraPaddingLeft - this.innerExtraPaddingRight - this.paddingLeft - this.paddingRight;

            Graph.setXY(this.svgText, innerRect, this.verticalAnchor, this.horizontalAnchor);

        }

        public relocateTopBorder() {
            if (this.table.svgGroup.contains(this.topBorder)) {
                if (this.isMaster) {
                    this.topBorder.x1.baseVal.value = this.x;
                    this.topBorder.x2.baseVal.value = this.x + this.computeTopBorderWidth();
                    this.topBorder.y1.baseVal.value = this.y;
                    this.topBorder.y2.baseVal.value = this.topBorder.y1.baseVal.value;
                } else if (this.topCell != null && this.topCell.isMaster) {
                    this.topCell.relocateBottomBorder();
                } else {
                    throw Error("error");
                }
            }
        }
        public relocateLeftBorder() {
            if (this.table.svgGroup.contains(this.leftBorder)) {
                if (this.isMaster) {
                    this.leftBorder.x1.baseVal.value = this.x;
                    this.leftBorder.x2.baseVal.value = this.leftBorder.x1.baseVal.value;
                    this.leftBorder.y1.baseVal.value = this.y;
                    this.leftBorder.y2.baseVal.value = this.y + this.computeLeftBorderHeight();
                } else if (this.leftCell != null && this.leftCell.isMaster) {
                    this.leftCell.relocateRightBorder();
                } else {
                    throw Error("error");
                }
            }
        }
        public relocateRightBorder() {
            if (this.table.svgGroup.contains(this.rightBorder)) {
                if (this.isMaster) {

                    this.rightBorder.x1.baseVal.value = this.x + this.width;
                    this.rightBorder.x2.baseVal.value = this.rightBorder.x1.baseVal.value;
                    this.rightBorder.y1.baseVal.value = this.y;
                    this.rightBorder.y2.baseVal.value = this.y + this.computeRightBorderHeight();
                } else if (this.rightCell != null && this.rightCell.isMaster) {
                    this.rightCell.relocateLeftBorder();
                } else {
                    throw Error("error");
                }
            }
        }
        public relocateBottomBorder() {
            if (this.table.svgGroup.contains(this.bottomBorder)) {
                if (this.isMaster) {
                    this.bottomBorder.x1.baseVal.value = this.x;
                    this.bottomBorder.x2.baseVal.value = this.x + this.computebottomBorderWidth();
                    this.bottomBorder.y1.baseVal.value = this.y + this.height;
                    this.bottomBorder.y2.baseVal.value = this.bottomBorder.y1.baseVal.value;
                } else if (this.bottomCell != null && this.bottomCell.isMaster) {
                    this.bottomCell.relocateTopBorder();
                } else {
                    throw Error("error");
                }
            }
        }

        /**
         *セルの位置を再計算します。
         */
        public relocation() {
            if (!GraphTableSVG.Common.IsDescendantOfBody(this.svgGroup)) return;

            this.relocateTopBorder();
            this.relocateLeftBorder();
            this.relocateRightBorder();
            this.relocateBottomBorder();
            /*
            if (this.table.svgGroup.contains(this.topBorder)) {
                this.topBorder.x1.baseVal.value = this.x;
                this.topBorder.x2.baseVal.value = this.x + this.computeTopBorderWidth();
                this.topBorder.y1.baseVal.value = this.y;
                this.topBorder.y2.baseVal.value = this.topBorder.y1.baseVal.value;
            }

            if (this.table.svgGroup.contains(this.leftBorder)) {
                this.leftBorder.x1.baseVal.value = this.x;
                this.leftBorder.x2.baseVal.value = this.leftBorder.x1.baseVal.value;
                this.leftBorder.y1.baseVal.value = this.y;
                this.leftBorder.y2.baseVal.value = this.y + this.computeLeftBorderHeight();
            }

            if (this.table.svgGroup.contains(this.rightBorder)) {
                this.rightBorder.x1.baseVal.value = this.x + this.width;
                this.rightBorder.x2.baseVal.value = this.rightBorder.x1.baseVal.value;
                this.rightBorder.y1.baseVal.value = this.y;
                this.rightBorder.y2.baseVal.value = this.y + this.computeRightBorderHeight();

            }

            if (this.table.svgGroup.contains(this.bottomBorder)) {
                this.bottomBorder.x1.baseVal.value = this.x;
                this.bottomBorder.x2.baseVal.value = this.x + this.computebottomBorderWidth();
                this.bottomBorder.y1.baseVal.value = this.y + this.height;
                this.bottomBorder.y2.baseVal.value = this.bottomBorder.y1.baseVal.value;

                if (this.cellX == 1 && this.cellY == 1) {
                    console.log(this.calculatedSizeUsingGroup());
                }

            }
            */


            //this.textSVG.x.baseVal.getItem(0).value = 0;
            //const text_x = 0;
            //const text_y = 0;

            this.localUpdate();

            

        }


        get isMaster(): boolean {
            return this.ID == this.masterID;
        }
        get isSlave(): boolean {
            return !this.isMaster;
        }
        /**
        セルのIDを返します。
        */
        get ID(): number {
            return this.cellX + (this.cellY * this.table.columnCount);
        }
        /**
        上にあるセルを返します。
        */
        get topCell(): Cell | null {
            return this.cellY != 0 ? this.table.cells[this.cellY - 1][this.cellX] : null;
        }
        
        /**
        左にあるセルを返します。
        */
        get leftCell(): Cell | null {
            return this.cellX != 0 ? this.table.cells[this.cellY][this.cellX - 1] : null;
        }


        /**
        右にあるセルを返します。
        */
        get rightCell(): Cell | null {
            return this.cellX + 1 != this.table.columnCount ? this.table.cells[this.cellY][this.cellX + 1] : null;
        }
        /**
        下にあるセルを返します。
        */
        get bottomCell(): Cell | null {
            return this.cellY + 1 != this.table.rowCount ? this.table.cells[this.cellY + 1][this.cellX] : null;
        }
        get bottomRightCell(): Cell | null {
            return this.bottomCell == null ? null : this.bottomCell.rightCell == null ? null : this.bottomCell.rightCell;
        }
        get topRightCell(): Cell | null {
            return this.topCell == null ? null : this.topCell.rightCell == null ? null : this.topCell.rightCell;
        }
        get bottomLeftCell(): Cell | null {
            return this.bottomCell == null ? null : this.bottomCell.leftCell == null ? null : this.bottomCell.leftCell;
        }
        get topLeftCell(): Cell | null {
            return this.topCell == null ? null : this.topCell.leftCell == null ? null : this.topCell.leftCell;
        }
        
        get topMasterCell(): Cell | null {
            return this.topCell == null ? null :
                this.topCell.masterID != this.masterID ? this.topCell.master : this.topCell.topMasterCell;
        }
        get leftMasterCell(): Cell | null {
            return this.leftCell == null ? null :
                this.leftCell.masterID != this.masterID ? this.leftCell.master : this.leftCell.leftMasterCell;
        }
        get rightMasterCell(): Cell | null {
            return this.rightCell == null ? null :
                this.rightCell.masterID != this.masterID ? this.rightCell.master : this.rightCell.rightMasterCell;
        }
        get bottomMasterCell(): Cell | null {
            return this.bottomCell == null ? null :
                this.bottomCell.masterID != this.masterID ? this.bottomCell.master : this.bottomCell.bottomMasterCell;

        }
        get GroupRowCount(): number {
            if (!this.isMaster) throw Error("Slave Error");
            return this.leftSideGroupCells.length;
        }
        get GroupColumnCount(): number {
            if (!this.isMaster) throw Error("Slave Error");
            return this.upperSideGroupCells.length;
        }

        get cellsInGroup(): Cell[][] {
            if (this.isMaster) {
                return this.table.getRangeCells(this.cellX, this.cellY, this.GroupColumnCount, this.GroupRowCount);
            } else {
                throw Error("Slave Error");
            }
        }
        get cellArrayInGroup(): Cell[] {
            if (this.isMaster) {
                return this.table.getRangeCellArray(this.cellX, this.cellY, this.GroupColumnCount, this.GroupRowCount);
            } else {
                throw Error("Slave Error");
            }
        }



        private groupUpdate() {

            this.svgGroup.style.visibility = this.isMaster ? "visible" : "hidden";

            if (this.isMaster || (this.topCell != null && this.topCell.isMaster)) {
                this.table.svgGroup.appendChild(this.topBorder);
            } else {
                this.table.svgHiddenGroup.appendChild(this.topBorder);
            }

            if (this.isMaster || (this.leftCell != null && this.leftCell.isMaster)) {
                this.table.svgGroup.appendChild(this.leftBorder);
            } else {
                this.table.svgHiddenGroup.appendChild(this.leftBorder);
            }

            if (this.isMaster || (this.rightCell != null && this.rightCell.isMaster)) {
                this.table.svgGroup.appendChild(this.rightBorder);
            } else {
                this.table.svgHiddenGroup.appendChild(this.rightBorder);
            }

            if (this.isMaster || (this.bottomCell != null && this.bottomCell.isMaster)) {
                this.table.svgGroup.appendChild(this.bottomBorder);
            } else {
                this.table.svgHiddenGroup.appendChild(this.bottomBorder);
            }

            this.resize();
            this.relocation();

            /*
            this.topBorder.style.visibility = this.isMaster || (this.topCell != null && this.topCell.isMaster) ? "visible" : "hidden";
            this.leftBorder.style.visibility = this.isMaster || (this.leftCell != null && this.leftCell.isMaster) ? "visible" : "hidden";
            this.rightBorder.style.visibility = this.isMaster || (this.rightCell != null && this.rightCell.isMaster) ? "visible" : "hidden";
            this.bottomBorder.style.visibility = this.isMaster || (this.bottomCell != null && this.bottomCell.isMaster) ? "visible" : "hidden";
            */

            /*
            if (this.isSlave) {
                this.svgGroup.style.visibility = "hidden";
                //this.svgBackground.style.visibility = "hidden";
                //this.svgText.style.visibility = "hidden";


                this.topBorder.style.visibility = this.topCell != null && this.topCell.isMaster && this.masterID != this.topCell.masterID ? "visible" : "hidden";
                this.leftBorder.style.visibility = this.leftCell != null && this.leftCell.isMaster && this.masterID != this.leftCell.masterID ? "visible" : "hidden";
                this.rightBorder.style.visibility = this.rightCell != null && this.rightCell.isMaster && this.masterID != this.rightCell.masterID ? "visible" : "hidden";
                this.bottomBorder.style.visibility = this.bottomCell != null && this.bottomCell.isMaster && this.masterID != this.bottomCell.masterID ? "visible" : "hidden";
                //console.log(`${this.cellX},${this.cellY}@ ${this.topBorder.style.visibility}`);
                //this.relocation();

            }
            if (this.isMaster) {
                this.resize();
                this.relocation();

                this.topBorder.style.visibility = "visible";
                this.leftBorder.style.visibility = "visible";
                this.rightBorder.style.visibility = "visible";
                this.bottomBorder.style.visibility = "visible";

            }
            */
        }
        get isSingleCell(): boolean {
            return this.isMaster && this.leftSideGroupCells.length == 1 && this.upperSideGroupCells.length == 1;
        }
        get isRowSingleCell(): boolean {
            return this.isMaster && this.leftSideGroupCells.length == 1;
        }
        get isColumnSingleCell(): boolean {
            return this.isMaster && this.upperSideGroupCells.length == 1;
        }
        private decomposeRow(upperRowCount: number) {
            if (this.isMaster) {
                const upperSide = this.table.getRangeCellArray(this.cellX, this.cellY, this.GroupColumnCount, upperRowCount);
                const lowerSide = this.table.getRangeCellArray(this.cellX, this.cellY + upperRowCount, this.GroupColumnCount, this.GroupRowCount - upperRowCount);
                const lowerMaster = lowerSide[0];
                lowerSide.forEach((v) => [v.masterCellX, v.masterCellY] = [lowerMaster.cellX, lowerMaster.cellY]);

                upperSide.forEach((v) => v.groupUpdate());
                lowerSide.forEach((v) => v.groupUpdate());

            } else {
                throw Error("Slave Error");
            }
        }

        private decomposeColomn(leftColumnCount: number) {
            if (this.isMaster) {
                const leftSide = this.table.getRangeCellArray(this.cellX, this.cellY, leftColumnCount, this.GroupRowCount);
                const rightSide = this.table.getRangeCellArray(this.cellX + leftColumnCount, this.cellY, this.GroupColumnCount - leftColumnCount, this.GroupRowCount);
                const rightMaster = rightSide[0];
                rightSide.forEach((v) => [v.masterCellX, v.masterCellY] = [rightMaster.cellX, rightMaster.cellY]);

                leftSide.forEach((v) => v.groupUpdate());
                rightSide.forEach((v) => v.groupUpdate());

            } else {
                throw Error("Slave Error");
            }

        }
        private computeTopBorderWidth(): number {
            const mostRightCellX = this.master.mostRightCellX;
            const d = this.topMasterCell == null ? mostRightCellX : this.topMasterCell.mostRightCellX;
            const r = Math.min(mostRightCellX, d);
            let w = 0;
            for (var i = this.cellX; i <= r; i++) {
                w += this.table.columns[i].width;
            }
            return w;
        }
        private computebottomBorderWidth(): number {
            const mostRightCellX = this.master.mostRightCellX;
            const d = this.bottomMasterCell == null ? mostRightCellX : this.bottomMasterCell.mostRightCellX;
            const r = Math.min(mostRightCellX, d);
            let w = 0;
            for (var i = this.cellX; i <= r; i++) {
                w += this.table.columns[i].width;
            }
            return w;
        }
        private computeLeftBorderHeight(): number {
            const mostBottomCellY = this.master.mostBottomCellY;
            const d = this.leftMasterCell == null ? mostBottomCellY : this.leftMasterCell.mostBottomCellY;
            const r = Math.min(mostBottomCellY, d);
            let w = 0;

            for (var i = this.cellY; i <= r; i++) {
                w += this.table.rows[i].height;
            }
            return w;
            /*
            if (this.isMaster) {
                
            } else {
                if (this.leftCell != null && this.lef) {
                    return this.master.leftMasterCell.computeRightBorderHeight();
                } else {
                    return 0;
                }
            }
            */
        }
        private computeRightBorderHeight(): number {
            const mostBottomCellY = this.master.mostBottomCellY;

            const d = this.rightMasterCell == null ? mostBottomCellY : this.rightMasterCell.mostBottomCellY;
            const r = Math.min(mostBottomCellY, d);
            let w = 0;
            for (var i = this.cellY; i <= r; i++) {
                w += this.table.rows[i].height;
            }
            return w;
        }

        canMerge(w: number, h: number): boolean {
            const range = this.table.getRangeCells(this.cellX, this.cellY, w, h);

            for (let x = 0; x < w; x++) {
                const topCell = range[0][x].topCell;
                if (topCell != null) {
                    if (range[0][x].masterID == topCell.masterID) return false;
                }
                const bottomCell = range[h - 1][x].bottomCell;
                if (bottomCell != null) {
                    if (range[h-1][x].masterID == bottomCell.masterID) return false;
                }
            }
            for (let y = 0; y < h; y++) {
                const leftCell = range[y][0].leftCell;
                if (leftCell != null) {
                    if (range[y][0].masterID == leftCell.masterID) return false;
                }
                const rightCell = range[y][w-1].rightCell;
                if (rightCell != null) {
                    if (range[y][w-1].masterID == rightCell.masterID) return false;
                }
            }
            return true;
        }
        Merge(w: number, h: number) {
            if (!this.isMaster) throw Error("Error");
            const range = this.table.getRangeCellArray(this.cellX, this.cellY, w, h);
            range.forEach((v) => { v.masterCellX = this.masterCellX; v.masterCellY = this.masterCellY });
            range.forEach((v) => { v.groupUpdate() });
        }
        getMergedRangeRight(): [number, number] | null {
            if (!this.isMaster) return null;
            if (this.rightMasterCell != null) {
                const b1 = this.cellY == this.rightMasterCell.cellY;
                const b2 = this.GroupRowCount == this.rightMasterCell.GroupRowCount;
                if (b1 && b2) {
                    return [this.GroupColumnCount + this.rightMasterCell.GroupColumnCount, this.GroupRowCount];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        getMergedRangeBottom(): [number, number] | null {
            if (!this.isMaster) return null;
            if (this.bottomMasterCell != null) {
                const b1 = this.cellX == this.bottomMasterCell.cellX;
                const b2 = this.GroupColumnCount == this.bottomMasterCell.GroupColumnCount;

                if (b1 && b2) {
                    return [this.GroupColumnCount, this.GroupRowCount + this.bottomMasterCell.GroupRowCount];
                } else {
                    return null;
                }


            } else {
                return null;
            }
        }
        get canMergeRight(): boolean {
            return this.getMergedRangeRight() != null;
        }
        get canMergeBottom(): boolean {
            return this.getMergedRangeBottom() != null;
        }


        /*
        get canConnectRight(): boolean {
            if (!this.isMaster) return false;
            if (this.rightMasterCell != null) {
                const b1 = this.cellY == this.rightMasterCell.cellY;
                const b2 = this.GroupRowCount == this.rightMasterCell.GroupRowCount;
                return b1 && b2;
            } else {
                return false;
            }
        }
        */
        mergeRight(): void {
            const range = this.getMergedRangeRight();
            if (range != null) {
                this.Merge(range[0], range[1]);
            } else {
                throw Error("Error");
            }
        }
        mergeBottom(): void {
            const range = this.getMergedRangeBottom();
            if (range != null) {
                this.Merge(range[0], range[1]);
            } else {
                throw Error("Error");
            }
        }
        /*
        connectBottom(): void {
            if (this.canConnectBottom && this.bottomMasterCell != null) {
                const preBottom = this.bottomMasterCell.cellArrayInGroup;
                preBottom.forEach((v) => { v.masterCellX = this.masterCellX; v.masterCellY = this.masterCellY });
                preBottom.forEach((v) => { v.groupUpdate() });
                this.groupUpdate();
            } else {
                throw Error("Error");
            }
        }
        */
        /*
        private get topGroupCells(): Cell[] {
            if (this.isMaster) {
                let w: Cell[] = [];
                let now: Cell | null = this;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.topCell;
                }
                return w;
            } else {
                return [];
            }
        }
        private get leftGroupCells(): Cell[] {
            if (this.isMaster) {
                let w: Cell[] = [];
                let now: Cell | null = this;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.leftCell;
                }
                return w;
            } else {
                return [];
            }
        }
        
        private get bottomLeftGroupCell(): Cell | null {
            if (this.isMaster) {
                return this.table.cells[this.cellY + this.logicalHeight - 1][this.cellX];
            } else {
                return null;
            }
        }
        private get topRightGroupCell(): Cell | null {
            if (this.isMaster) {
                return this.table.cells[this.cellY][this.cellX + this.logicalWidth - 1];
            } else {
                return null;
            }
        }
        */

        public get mostRightCellX(): number {
            return this.cellX + this.GroupColumnCount - 1;
        }
        public get mostBottomCellY(): number {
            return this.cellY + this.GroupRowCount - 1;
        }

        /**
        未定義
        */
        private get leftSideGroupCells(): Cell[] {
            if (this.isMaster) {
                let w: Cell[] = [this];
                let now: Cell | null = this.bottomCell;
                let y = -1;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = now.bottomCell;
                    if (now != null) {
                        if (y == now.cellY) throw Error("Error");
                        y = now.cellY;
                    }

                }
                return w;

            } else {
                return [];
            }
        }
        /**
        未定義
        */
        private get upperSideGroupCells(): Cell[] {
            if (this.isMaster) {
                let w: Cell[] = [this];
                let now: Cell | null = this.rightCell;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = now.rightCell;

                }
                return w;

            } else {
                return [];
            }
        }
        /*
        get upVirtualCells(): Cell[] {
            if (this.isMaster && this.cellY != 0) {
                const upperGroupCells = this.upperGroupCells;
                const r1 = upperGroupCells.map(function (x, i, self) {
                    return upperGroupCells[i].upCell;
                });
                const r2 = r1.filter(function (x, i, self) {
                    return r1.indexOf(x) === i;
                });
                return r2;
            } else {
                return [];
            }
        }
        */
        /**
        セルのX座標を返します。
        */
        get x(): number {
            return this.svgGroup.getX();
        }
        /**
        セルのX座標を設定します。
        */
        set x(value: number) {
            this.svgGroup.setX(value);
        }
        /**
        セルのY座標を返します。
        */
        get y(): number {
            return this.svgGroup.getY();
        }
        /**
        セルのY座標を設定します。
        */
        set y(value: number) {
            this.svgGroup.setY(value);
        }
        
        /**
        セルの幅を返します。
        */
        get width(): number {
            return this.svgBackground.width.baseVal.value;
        }
        /**
        セルの幅を設定します。
        */
        set width(value: number) {
            this.svgBackground.width.baseVal.value = value;
        }
        /**
        セルの高さを返します。
        */
        get height(): number {
            return this.svgBackground.height.baseVal.value;
        }
        /**
        セルの高さを設定します。
        */
        set height(value: number) {
            this.svgBackground.height.baseVal.value = value;
        }
        /**
        セルの領域を表すRectangleを返します。領域の基準は属しているテーブルのSVGGElementです。
        */
        get region(): Rectangle {
            const p = new Rectangle(this.x, this.y, this.width, this.height);
            return p;
        }

        
        /*
        get fill(): string {
            return this.backRect.style.fill;
        }
        set fill(value : string) {
            this.backRect.style.fill = value;
        }
        */

        private static createCellRectangle(className: string | null = null): SVGRectElement {
            const rect = <SVGRectElement>document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.width.baseVal.value = 30;
            rect.height.baseVal.value = 30;
            if (className == null) {
                rect.style.fill = "#ffffff";
            } else {
                return GraphTableSVG.SVG.createRectangle(className);
            }
            return rect;
        }
        public toPlainText(): string {
            if (this.isMaster) {
                const textContext = this.svgText.textContent != null ? this.svgText.textContent : "";
                if (this.isSingleCell) {
                    return textContext;
                } else {
                    return `${textContext}%%%${this.GroupColumnCount}%%%${this.GroupRowCount}`;
                }
            } else {
                return "";
            }
        }
    }
}