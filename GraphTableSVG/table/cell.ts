
namespace GraphTableSVG {
    

    export class Cell {
        private static readonly defaultBackgroundClassName: string = "--default-background-class";
        private static readonly defaultTextClass: string = "--default-text-class";

        private _observer: MutationObserver;
        private _observerFunc: MutationCallback = (x: MutationRecord[]) => {
            for (var i = 0; i < x.length; i++) {
                var p = x[i];
                if (p.attributeName == "style" || p.attributeName == "class") {
                    this.localUpdate();
                }
                
            }
        };
        

        /*
        private _textObserver: MutationObserver;
        private _textObserverFunc: MutationCallback = (x: MutationRecord[]) => {
            for (var i = 0; i < x.length; i++) {
                var p = x[i];
                for (var j = 0; j < p.addedNodes.length; j++) {
                    var item = p.addedNodes.item(j);
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



            this._svgGroup = createGroup();
            this._table = parent;

            this.table.svgGroup.insertBefore(this.svgGroup, this.table.svgGroup.firstChild);

            if (cellClass != null) this.svgGroup.setAttribute("class", cellClass);
            //this.padding = new Padding();
            this.cellX = _px;
            this.cellY = _py;
            this._masterID = this.ID;



            this._svgBackground = Cell.createCellRectangle(this.defaultBackgroundClass);
            this._svgText = createText(this.defaultTextClass);
            this.svgGroup.appendChild(this.svgBackground);
            setDefaultValue(this.svgBackground);

            this.svgGroup.appendChild(this.svgText);

            /*
            var circle = createRectangle();
            circle.style.fill = "blue";
            this.rect = circle;
            this.svgGroup.appendChild(circle);
            */

            //this.parent.svgGroup.appendChild(this.svgGroup);


            this.upLine = GraphTableSVG.createLine(0, 0, 0, 0, borderClass);
            this.leftLine = GraphTableSVG.createLine(0, 0, 0, 0, borderClass);
            this.rightLine = GraphTableSVG.createLine(0, 0, 0, 0, borderClass);
            this.bottomLine = GraphTableSVG.createLine(0, 0, 0, 0, borderClass);
            this.table.svgGroup.appendChild(this.upLine);
            this.table.svgGroup.appendChild(this.leftLine);
            this.table.svgGroup.appendChild(this.rightLine);
            this.table.svgGroup.appendChild(this.bottomLine);

            var option1: MutationObserverInit = { childList: true, subtree: true };
            this.table.cellTextObserver.observe(this.svgText, option1);

            this._observer = new MutationObserver(this._observerFunc);
            var option2: MutationObserverInit = { attributes : true};
            this._observer.observe(this.svgGroup, option2);
            

            
            /*
            this.verticalAnchor = VerticalAnchor.Middle;
            this.horizontalAnchor = HorizontalAnchor.Left;
            */

        }
        private get innerExtraPaddingLeft(): number {
            var p = this.fontSize;
            return p / 16;
        }
        private get innerExtraPaddingRight(): number{
            var p = this.fontSize;
            return p / 16;            
        }
        private _masterID: number;
        public get masterID(): number {
            return this._masterID;
        }
        private _upLine: SVGLineElement;
        /**
        セルの上にある枠を返します
        */
        get upLine(): SVGLineElement {
            return this._upLine;
        }
        /**
        セルの上にある枠を設定します
        */
        set upLine(line: SVGLineElement) {
            this._upLine = line;
        }
        private _leftLine: SVGLineElement;
        /**
        セルの左にある枠を返します
        */
        get leftLine(): SVGLineElement {
            return this._leftLine;
        }
        /**
        セルの左にある枠を設定します
        */
        set leftLine(line: SVGLineElement) {
            this._leftLine = line;
        }

        private _rightLine: SVGLineElement;
        /**
        セルの右にある枠を返します
        */
        get rightLine(): SVGLineElement {
            return this._rightLine;
        }
        /**
        セルの右にある枠を設定します
        */
        set rightLine(line: SVGLineElement) {
            this._rightLine = line;
        }


        private _bottomLine: SVGLineElement;
        /**
        セルの下にある枠を返します
        */
        get bottomLine(): SVGLineElement {
            return this._bottomLine;
        }
        /**
        セルの下にある枠を設定します
        */
        set bottomLine(line: SVGLineElement) {
            this._bottomLine = line;
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
            var p = this.svgText.getPropertyStyleValueWithDefault("font-size", "24");
            var p2 = parseInt(p);
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
            return Number(this.svgGroup.getAttribute("cellX"));
        }
        /**
        単位セルを基準にした自身のX座標を設定します。
        */
        set cellX(value: number) {
            if (this.cellX != value) this.svgGroup.setAttribute("cellX", value.toString());
        }
        /**
        単位セルを基準にした自身のY座標を返します。
        */
        get cellY(): number {
            return Number(this.svgGroup.getAttribute("cellY"));
        }
        /**
        単位セルを基準にした自身のY座標を設定します。
        */
        set cellY(value: number) {
            if (this.cellY != value) this.svgGroup.setAttribute("cellY", value.toString());
        }

        /**
        SVGTextElement生成時に設定するクラス名を返します。
        */
        get defaultTextClass(): string | null {
            var r = this.svgGroup.getPropertyStyleValue(Cell.defaultTextClass);
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
                var w = 0;
                var now: Cell | null = this;
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
                var h = 0;
                var now: Cell | null = this;
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
            return Graph.IsDescendantOfBody(this.svgGroup);
        }

        /**
        セルが取るべき幅を返します。
        */
        get calculatedWidth(): number {
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
        get calculatedHeight(): number {
            if (this.isLocated) {
                return this.svgText.getBBox().height + parsePXString(this.svgGroup.style.paddingTop) + parsePXString(this.svgGroup.style.paddingBottom);
            } else {
                return 0;
            }
        }

        /**
         *セルのサイズを再計算します。
         */
        public resize() {
            if (this.width < this.calculatedWidth) {
                this.width = this.calculatedWidth;
            }
            if (this.height < this.calculatedHeight) {
                this.height = this.calculatedHeight;
            }
        }
        /**
         * 再描画します。
         */
        private localUpdate() {
            var innerRect = new Rectangle();
            innerRect.x = this.innerExtraPaddingLeft + this.paddingLeft;
            innerRect.y = this.paddingTop;
            innerRect.height = this.height  - this.paddingTop - this.paddingBottom;
            innerRect.width = this.width - this.innerExtraPaddingLeft - this.innerExtraPaddingRight - this.paddingLeft - this.paddingRight;

            Graph.setXY(this.svgText, innerRect, this.verticalAnchor, this.horizontalAnchor);

        }
        /**
         *セルの位置を再計算します。
         */
        public relocation() {
            if (!Graph.IsDescendantOfBody(this.svgGroup)) return;
            this.upLine.x1.baseVal.value = this.x;
            this.upLine.x2.baseVal.value = this.x + this.width;
            this.upLine.y1.baseVal.value = this.y;
            this.upLine.y2.baseVal.value = this.upLine.y1.baseVal.value;

            this.leftLine.x1.baseVal.value = this.x;
            this.leftLine.x2.baseVal.value = this.leftLine.x1.baseVal.value;
            this.leftLine.y1.baseVal.value = this.y;
            this.leftLine.y2.baseVal.value = this.y + this.height;

            this.rightLine.x1.baseVal.value = this.x + this.width;
            this.rightLine.x2.baseVal.value = this.rightLine.x1.baseVal.value;
            this.rightLine.y1.baseVal.value = this.y;
            this.rightLine.y2.baseVal.value = this.y + this.height;

            this.bottomLine.x1.baseVal.value = this.x;
            this.bottomLine.x2.baseVal.value = this.x + this.width;
            this.bottomLine.y1.baseVal.value = this.y + this.height;
            this.bottomLine.y2.baseVal.value = this.bottomLine.y1.baseVal.value;

            //this.textSVG.x.baseVal.getItem(0).value = 0;
            var text_x = 0;
            var text_y = 0;

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
            return this.cellX + (this.cellY * this.table.width);
        }
        /**
        上にあるセルを返します。
        */
        get upCell(): Cell | null {
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
            return this.cellX + 1 != this.table.width ? this.table.cells[this.cellY][this.cellX + 1] : null;
        }
        /**
        下にあるセルを返します。
        */
        get bottomCell(): Cell | null {
            return this.cellY + 1 != this.table.height ? this.table.cells[this.cellY + 1][this.cellX] : null;
        }
        get bottomRightCell(): Cell | null {
            return this.bottomCell == null ? null : this.bottomCell.rightCell == null ? null : this.bottomCell.rightCell;
        }
        get topRightCell(): Cell | null {
            return this.upCell == null ? null : this.upCell.rightCell == null ? null : this.upCell.rightCell;
        }
        get bottomLeftCell(): Cell | null {
            return this.bottomCell == null ? null : this.bottomCell.leftCell == null ? null : this.bottomCell.leftCell;
        }
        get topLeftCell(): Cell | null {
            return this.upCell == null ? null : this.upCell.leftCell == null ? null : this.upCell.leftCell;
        }
        /**
        未定義
        */
        get upperGroupCells(): Cell[] {
            if (this.isMaster) {
                var w: Cell[] = [];
                var now: Cell | null = this;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.upCell;
                }
                return w;
            } else {
                return [];
            }
        }
        /**
        未定義
        */
        get leftGroupCells(): Cell[] {
            if (this.isMaster) {
                var w: Cell[] = [];
                var now: Cell | null = this;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.leftCell;
                }
                return w;
            } else {
                return [];
            }
        }
        /**
        未定義
        */
        get leftBottomGroupCell(): Cell | null {
            if (this.isMaster) {
                return this.table.cells[this.cellY + this.logicalHeight - 1][this.cellX];
            } else {
                return null;
            }
        }
        /**
        未定義
        */
        get rightUpGroupCell(): Cell | null {
            if (this.isMaster) {
                return this.table.cells[this.cellY][this.cellX + this.logicalWidth - 1];
            } else {
                return null;
            }
        }
        /**
        未定義
        */
        get bottomGroupCells(): Cell[] {
            if (this.isMaster) {
                var w: Cell[] = [];
                var now: Cell | null = this.leftBottomGroupCell;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.bottomCell;
                }
                return w;

            } else {
                return [];
            }
        }
        /**
        未定義
        */
        get rightGroupCells(): Cell[] {
            if (this.isMaster) {
                var w: Cell[] = [];
                var now: Cell | null = this.rightUpGroupCell;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.rightCell;
                }
                return w;

            } else {
                return [];
            }
        }
        /*
        get upVirtualCells(): Cell[] {
            if (this.isMaster && this.cellY != 0) {
                var upperGroupCells = this.upperGroupCells;
                var r1 = upperGroupCells.map(function (x, i, self) {
                    return upperGroupCells[i].upCell;
                });
                var r2 = r1.filter(function (x, i, self) {
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
            var p = new Rectangle(this.x, this.y, this.width, this.height);
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
            var rect = <SVGRectElement>document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.width.baseVal.value = 30;
            rect.height.baseVal.value = 30;
            if (className == null) {
                rect.style.fill = "#ffffff";
            } else {
                return GraphTableSVG.createRectangle(className);
            }
            return rect;
        }
    }
}