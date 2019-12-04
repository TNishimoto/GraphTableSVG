
//namespace GraphTableSVG {

    import {CommonFunctions} from "../../basic/common/common_functions"
    import {Rectangle} from "../../basic/common/vline"
    import { CustomAttributeNames } from "../../basic/common/custtome_attributes"
    import {GTable} from "../g_table"
    import {SVG} from "../../basic/svghtml/svg"
    import {CellOption} from "../../options/attributes_option"
    import { HorizontalAnchor, VerticalAnchor } from "../../basic/common/enums";
    import { SVGTextBox } from "../../basic/svghtml/svg_textbox"
    import { BorderRow, BorderColumn } from "./border_row"

    export enum DirectionType {
        top = 0, left = 1, right = 2, bottom = 3
    }
    export enum DirectionType2 {
        topLeft = 0, bottomLeft = 1, bottomRight = 2, topRight = 3
    }
    /**
     * セルをSVGで表現するためのクラスです。
     */
    export class Cell {

        constructor(parent: GTable, _px: number, _py: number, option: CellOption = {}) {
            this._svgGroup = SVG.createGroup(null);
            this._table = parent;


            this.table.rows[_py].svgGroup.appendChild(this.svgGroup);
            //this.table.svgGroup.insertBefore(this.svgGroup, this.table.svgGroup.firstChild);
            this.svgGroup.setAttribute("class", option.cellClass !== undefined ? option.cellClass : CustomAttributeNames.StyleValue.defaultCellClass);
            this.svgGroup.setAttribute(CustomAttributeNames.GroupAttribute, "cell");
            this.svgGroup.setAttribute(Cell.cellXName, `${_px}`);
            this.svgGroup.setAttribute(Cell.cellYName, `${_py}`);
            this.setMasterDiffX(0);
            this.setMasterDiffY(0);

            const backGroundClass = CustomAttributeNames.StyleValue.defaultCellBackgroungClass;
            this._svgBackground = SVG.createCellRectangle(this.svgGroup, backGroundClass);
            
            const textClass = CustomAttributeNames.StyleValue.defaultTextClass;            
            this._svgText = SVG.createText(textClass);
            this.svgGroup.appendChild(this.svgText);

            //const borderClass = option.borderClass === undefined ? null : option.borderClass;

            //const option1: MutationObserverInit = { childList: true, subtree: true };
            //this.table.cellTextObserver.observe(this.svgText, option1);


            this._observer = new MutationObserver(this._observerFunc);
            const option2: MutationObserverInit = { attributes: true };
            this._observer.observe(this.svgGroup, option2);


        }
        // #region style
        private recomputeDefaultProperties(){
            /*
            if(this.defaultBackgroundClass != null){
                this._svgBackground.setAttribute("class", this.defaultBackgroundClass);
            }
            if(this.defaultTextClass != null){
                this._svgText.setAttribute("class", this.defaultTextClass);
            }
            */
            

        }
        private __currentClass : string | null = null;
        /*
        public get class() : string | null{
            return this.svgGroup.getAttribute("class");
        }
        public set class(value : string | null){
            if(value == null){
                this.svgGroup.removeAttribute("class");
            }else{
                this.svgGroup.setAttribute("class", value);
            }
        }
        */
        
        /**
         * このセルが強調してるかどうかを返します。
         */
        public get isEmphasized(): boolean {
            const cellClass = this.svgBackground.getAttribute("class");
            return cellClass == CustomAttributeNames.cellEmphasisCellClass;
        }
        public set isEmphasized(v: boolean) {
            if (v) {
                if (!this.isEmphasized) {
                    this.tmpStyle = this.svgBackground.getAttribute("class");
                    this.svgBackground.setAttribute("class", CustomAttributeNames.cellEmphasisCellClass);
                }
            } else {
                if (this.isEmphasized) {
                    if (this.tmpStyle == null) {
                        this.svgBackground.removeAttribute("class");

                    } else {
                        this.svgBackground.setAttribute("class", this.tmpStyle);
                        this.tmpStyle = null;
                    }

                }
            }
        }
        
        /**
         * テキストのフォントサイズを返します。
         */
        get fontSize(): number {
            const p = this.svgText.getPropertyStyleValueWithDefault("font-size", "24");
            const p2 = parseInt(p);
            return p2;
        }
        /**
        テキストとセル間の左のパディング値を返します。
        */
        get paddingLeft(): number {
            return this.svgGroup.getPaddingLeft();
        }

        /**
        テキストとセル間の右のパディング値を返します。
        */
        get paddingRight(): number {
            return this.svgGroup.getPaddingRight();
        }
        /**
        テキストとセル間の上のパディング値を返します。
        */
        get paddingTop(): number {
            return this.svgGroup.getPaddingTop();
        }
        /**
        テキストとセル間の下のパディング値を返します。
        */
        get paddingBottom(): number {
            return this.svgGroup.getPaddingBottom();
        }


        get horizontalAnchor(): HorizontalAnchor {
            const b = this.svgGroup.getPropertyStyleValueWithDefault(CustomAttributeNames.Style.HorizontalAnchor, "center");
            return HorizontalAnchor.toHorizontalAnchor(b);
        }
        /**
        テキストの水平方向の配置設定を設定します。
        */
        set horizontalAnchor(value: HorizontalAnchor) {
            if (this.horizontalAnchor != value) this.svgGroup.setPropertyStyleValue(CustomAttributeNames.Style.HorizontalAnchor, value);
        }
        /**
        テキストの垂直方向の配置設定を返します。
        */
        get verticalAnchor(): VerticalAnchor {
            const b = this.svgGroup.getPropertyStyleValueWithDefault(CustomAttributeNames.Style.VerticalAnchor, "middle");
            return VerticalAnchor.toVerticalAnchor(b);
        }
        /**
        テキストの垂直方向の配置設定を設定します。
        */
        set verticalAnchor(value: VerticalAnchor) {
            if (this.verticalAnchor != value) this.svgGroup.setPropertyStyleValue(CustomAttributeNames.Style.VerticalAnchor, value);
        }
        // #endregion

        // #region field
        //private static readonly defaultBackgroundClassName: string = "--default-background-class";
        public static readonly defaultCellClass: string = "___cell-default";

        public static readonly cellXName = "data-cellX";
        public static readonly cellYName = "data-cellY";
        public static readonly borderXName = "data-borderX";
        public static readonly borderYName = "data-borderY";
        public static readonly borderTypeName = "data-borderType";

        public static readonly masterIDName = "data-masterID";
        public static readonly masterDiffXName = "data-masterDiffX";
        public static readonly masterDiffYName = "data-masterDiffY";

        private tmpStyle: string | null = null;
        private _table: GTable;
        /**
        所属しているTableを返します。
        */
        public get table(): GTable {
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
        private _observer: MutationObserver;
        private _observerFunc: MutationCallback = (x: MutationRecord[]) => {

            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                if (p.attributeName == "style" || p.attributeName == "class") {
                    if(p.attributeName == "class"){
                        const className = this.svgGroup.getAttribute("class");
                        if(className != this.__currentClass){
                            this.recomputeDefaultProperties();
                            this.__currentClass = className;
                        }
                    }
                    this.locateSVGText();
                }

            }
        };
        // #endregion

        // #region property





        private get innerExtraPaddingLeft(): number {
            const p = this.fontSize;
            return p / 16;
        }
        private get innerExtraPaddingRight(): number {
            const p = this.fontSize;
            return p / 16;
        }
        //private _masterID: number;

        /**
         * このセルのx座標とマスターセルとのX座標の差分を返します。
         */
        public get masterDiffX(): number {
            return Number(this.svgGroup.getAttribute(Cell.masterDiffXName));
        }
        /**
         * このセルのx座標とマスターセルとのX座標の差分を設定します。
         */
        private setMasterDiffX(id: number) {
            this.svgGroup.setAttribute(Cell.masterDiffXName, `${id}`);
        }
        /**
         * このセルのy座標とマスターセルとのy座標の差分を返します。
         */
        public get masterDiffY(): number {
            return Number(this.svgGroup.getAttribute(Cell.masterDiffYName));
        }
        /**
         * このセルのy座標とマスターセルとのy座標の差分を設定します。
         */
        private setMasterDiffY(id: number) {
            this.svgGroup.setAttribute(Cell.masterDiffYName, `${id}`);
        }

        /**
         * マスターセルのx座標を返します。
         */
        public get masterCellX(): number {
            return this.cellX + this.masterDiffX;
        }
        /**
         * マスターセルのx座標を設定します。
         */
        private setMasterCellX(id: number) {
            this.setMasterDiffX(id - this.cellX);
        }

        /**
         * マスターセルのy座標を返します。
         */
        public get masterCellY(): number {
            return this.cellY + this.masterDiffY;
        }
        /**
         * マスターセルのy座標を設定します。
         */
        private setMasterCellY(id: number) {
            this.setMasterDiffY(id - this.cellY);
        }

        /**
         * マスターセルのIDを返します。
         */
        public get masterID(): number {
            return this.table.cells[this.masterCellY][this.masterCellX].ID;
        }
        /*
        public set masterID(id: number) {
            this.svgGroup.setAttribute(Cell.masterIDName, `${id}`);
        }
        */
        /**
         * マスターセルを返します。
         */
        public get master(): Cell {
            return this.table.cellArray[this.masterID];
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
        /*
        get defaultTextClass(): string | null {
            const r = this.svgGroup.getPropertyStyleValue(CustomAttributeNames.Style.defaultTextClass);
            return r;
        }
        get defaultBackgroundClass(): string | null {
            const v = this.svgGroup.getPropertyStyleValue(CustomAttributeNames.Style.defaultCellBackgroundClass);
            return v;
        }
        */
        /**
        CellがDocumentのDOMに所属しているかどうかを返します。
        */
        get isLocated(): boolean {
            return CommonFunctions.IsDescendantOfBody(this.svgGroup);
        }
        /**
         * このセルがマスターセルのときに限りTrueを返します。
         */
        get isMaster(): boolean {
            return this.ID == this.masterID;
        }
        /**
         * このセルが奴隷セルのときに限りTrueを返します。
         */
        get isSlave(): boolean {
            return !this.isMaster;
        }
        /**
        セルのIDを返します。
        */
        get ID(): number {
            return this.cellX + (this.cellY * this.table.columnCount);
        }

        get isErrorCell(): boolean {
            return this.table.cells[this.cellY][this.cellX] != this;
        }

        /**
         * グループセルの行数を返します。
         */
        get GroupRowCount(): number {
            if (!this.isMaster) throw Error("Slave Error");
            return this.leftSideGroupCells.length;
        }
        /**
         * グループセルの列数を返します。
         */
        get GroupColumnCount(): number {
            if (!this.isMaster) throw Error("Slave Error");
            return this.upperSideGroupCells.length;
        }
        /**
         * グループセルを構成しているセルを2次元配列で返します。
         */
        get cellsInGroup(): Cell[][] {
            if (this.isMaster) {
                return this.table.getRangeCells(this.cellX, this.cellY, this.GroupColumnCount, this.GroupRowCount);
            } else {
                throw Error("Slave Error");
            }
        }
        /**
         * グループセルを構成しているセルを配列で返します。
         */
        get cellArrayInGroup(): Cell[] {
            if (this.isMaster) {
                return this.table.getRangeCellArray(this.cellX, this.cellY, this.GroupColumnCount, this.GroupRowCount);
            } else {
                throw Error("Slave Error");
            }
        }

        /**
         * このセルがグループセルであるときに限りTrueを返します。
         */
        get isSingleCell(): boolean {
            return this.isMaster && this.leftSideGroupCells.length == 1 && this.upperSideGroupCells.length == 1;
        }
        /**
         * マスターセルかつ行数が１のときに限りTrueを返します。
         */
        get isMasterCellOfRowCountOne(): boolean {
            return this.isMaster && this.leftSideGroupCells.length == 1;
        }
        /**
         * マスターセルかつ列数が１のときに限りTrueを返します。
         */
        get isMasterCellOfColumnCountOne(): boolean {
            return this.isMaster && this.upperSideGroupCells.length == 1;
        }

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

        /**
         * グループセルの横幅を返します。
         */
        get computeGroupWidth(): number {
            const p = this.master.upperSideGroupCells;
            const x2 = p[p.length - 1].cellX;
            let w = 0;
            for (let i = this.cellX; i <= x2; i++) {
                w += this.table.columns[i].width;
            }
            return w;
        }
        /**
         * グループセルの縦幅を返します。
         */
        get computeGroupHeight(): number {
            const p = this.master.leftSideGroupCells;
            const y2 = p[p.length - 1].cellY;
            let w = 0;
            for (let i = this.cellY; i <= y2; i++) {
                w += this.table.rows[i].height;
            }
            return w;

        }


        /**
         * ２つの線分がオーバーラップしている部分の線分を返します。
         * @param v 
         * @param w 
         */
        private static computeOverlapRange(v: [number, number], w: [number, number]): [number, number] | null {
            if (w[0] < v[0]) {
                return Cell.computeOverlapRange(w, v);
            } else {
                if (v[1] < w[0]) {
                    return null;
                } else {
                    if (w[1] < v[1]) {
                        return [w[0], w[1]];
                    } else {
                        return [w[0], v[1]];
                    }
                }
            }
        }
        /**
         * ２つの線分がオーバーラップしているときに限り、その結合した線分を返します。
         * @param v 
         * @param w 
         */
        public static computeDisjunction(v: [number, number], w: [number, number]): [number, number] | null {
            if (w[0] < v[0]) {
                return Cell.computeDisjunction(w, v);
            } else {
                if (v[1] < w[0]) {
                    return null;
                } else {
                    return [v[0], Math.max(v[1], w[1])];
                }
            }
        }
        /**
         * このグループセルの左上のX座標と右上のX座標を返します。
         */
        public get groupColumnRange(): [number, number] {
            return [this.master.cellX, this.master.mostRightCellX];
        }

        /**
         * このグループセルの左上のY座標と左下のY座標を返します。
         */
        public get groupRowRange(): [number, number] {
            return [this.master.cellY, this.master.mostBottomCellY];
        }

        private computeBorderLength2(dir: DirectionType): number {
            //const andFunc = ((v, w) => v);

            const d1 = dir == DirectionType.top || dir == DirectionType.bottom ? this.master.x : this.master.y;
            const d2 = dir == DirectionType.top || dir == DirectionType.bottom ? this.master.x + this.computeGroupWidth : this.master.y + this.computeGroupHeight;

            const nextCell = this.getNextMasterCell(dir);
            if (nextCell != null) {
                const e1 = dir == DirectionType.top || dir == DirectionType.bottom ? nextCell.x : nextCell.y;
                const e2 = dir == DirectionType.top || dir == DirectionType.bottom ? nextCell.x + nextCell.computeGroupWidth : nextCell.y + nextCell.computeGroupHeight;

                const range = Cell.computeOverlapRange([d1, d2], [e1, e2]);
                if (range == null) {
                    return 0;
                    //throw Error(`error ${d1} ${d2} ${e1} ${e2}`);
                } else {
                    return range[1] - range[0];
                }
            } else {
                return d2 - d1;
            }

        }
        // #endregion
        // #region border
        //private _borders: SVGLineElement[] = new Array(4);
        //private _topBorder: SVGLineElement;
        /**
        セルの上にある枠を返します
        */
        get svgTopBorder(): SVGLineElement {
            return this._table.borderRows[this.cellY].borders[this.cellX];
            //return this._borders[DirectionType.top];
        }
        /*
        set svgTopBorder(line: SVGLineElement) {

            this._borders[DirectionType.top] = line;
        }
        */
        /**
        セルの左にある枠を返します
        */
        get svgLeftBorder(): SVGLineElement {
            return this._table.borderColumns[this.cellX].borders[this.cellY];
            //return this._borders[DirectionType.left];
        }
        /*
        set svgLeftBorder(line: SVGLineElement) {
            this._borders[DirectionType.left] = line;
        }
        */
        /**
        セルの右にある枠を返します
        */
        get svgRightBorder(): SVGLineElement {
            return this._table.borderColumns[this.cellX+1].borders[this.cellY];

            //return this._borders[DirectionType.right];
        }
        /*
        set svgRightBorder(line: SVGLineElement) {
            this._borders[DirectionType.right] = line;

        }
        */
        /**
        セルの下にある枠を返します
        */
        get svgBottomBorder(): SVGLineElement {
            return this._table.borderRows[this.cellY+1].borders[this.cellX];

            //return this._borders[DirectionType.bottom];

        }
        /*
        set svgBottomBorder(line: SVGLineElement) {
            this._borders[DirectionType.bottom] = line;

        }
        */
        // #endregion

        // #region other
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
        セルが取るべき幅を返します。
        */
        get calculatedWidthUsingText(): number {
            if (this.isLocated) {
                const textRect = SVGTextBox.getSize(this.svgText, this._assurancevisibility);
                return textRect.width + this.innerExtraPaddingLeft + this.innerExtraPaddingRight
                    + this.paddingLeft + this.paddingRight;
            } else {
                return 0;
            }
        }
        private _assurancevisibility : boolean = false;

        /**
        セルが取るべき高さを返します。
        */
        get calculatedHeightUsingText(): number {
            if (this.isLocated) {
                const textRect = SVGTextBox.getSize(this.svgText, this._assurancevisibility);

                return textRect.height + this.paddingTop + this.paddingBottom;
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


        private computeSidePosition(dir: DirectionType2): [number, number] {
            switch (dir) {
                case DirectionType2.topLeft: return [this.x, this.y];
                case DirectionType2.topRight: return [this.x + this.width, this.y];
                case DirectionType2.bottomLeft: return [this.x, this.y + this.height];
                case DirectionType2.bottomRight: return [this.x + this.width, this.y + this.height];
            }
            throw Error("error");
        }
        // #endregion

        // #region NextCell
        /**
         * 与えられた方向にあるセルを返します。
         * @param direction 
         */
        getNextCell(direction: DirectionType): Cell | null {
            switch (direction) {
                case DirectionType.top: return this.cellY != 0 ? this.table.cells[this.cellY - 1][this.cellX] : null;
                case DirectionType.left: return this.cellX != 0 ? this.table.cells[this.cellY][this.cellX - 1] : null;
                case DirectionType.right: return this.cellX + 1 != this.table.columnCount ? this.table.cells[this.cellY][this.cellX + 1] : null;
                case DirectionType.bottom: return this.cellY + 1 != this.table.rowCount ? this.table.cells[this.cellY + 1][this.cellX] : null;
            }
            throw Error("error");
        }
        /**
         * 与えられた方向にある、このセルが属しているグループセルとは異なる最初のグループセルのマスターセルを返します。
         * @param direction 
         */
        getNextMasterCell(direction: DirectionType): Cell | null {
            const nextCell = this.getNextCell(direction);
            return nextCell == null ? null :
                nextCell.masterID != this.masterID ? nextCell.master : nextCell.getNextMasterCell(direction);
        }

        /**
        上にあるセルを返します。
        */
        get topCell(): Cell | null {
            return this.getNextCell(DirectionType.top);
        }

        /**
        左にあるセルを返します。
        */
        get leftCell(): Cell | null {
            return this.getNextCell(DirectionType.left);
        }


        /**
        右にあるセルを返します。
        */
        get rightCell(): Cell | null {
            return this.getNextCell(DirectionType.right);
        }
        /**
        下にあるセルを返します。
        */
        get bottomCell(): Cell | null {
            return this.getNextCell(DirectionType.bottom);

        }
        /**
         * 右下のセルを返します。
         */
        get bottomRightCell(): Cell | null {
            return this.bottomCell == null ? null : this.bottomCell.rightCell == null ? null : this.bottomCell.rightCell;
        }
        /**
         * 右上のセルを返します。
         */
        get topRightCell(): Cell | null {
            return this.topCell == null ? null : this.topCell.rightCell == null ? null : this.topCell.rightCell;
        }
        /**
         * 左下のセルを返します。
         */
        get bottomLeftCell(): Cell | null {
            return this.bottomCell == null ? null : this.bottomCell.leftCell == null ? null : this.bottomCell.leftCell;
        }
        /**
         * 左上のセルを返します。
         */
        get topLeftCell(): Cell | null {
            return this.topCell == null ? null : this.topCell.leftCell == null ? null : this.topCell.leftCell;
        }
        /**
         * このグループセルの上にあるグループセルのマスターセルを返します。
         */
        get topMasterCell(): Cell | null {
            return this.getNextMasterCell(DirectionType.top);
        }
        /**
         * このグループセルの左にあるグループセルのマスターセルを返します。
         */
        get leftMasterCell(): Cell | null {
            return this.getNextMasterCell(DirectionType.left);
        }
        /**
         * このグループセルの右にあるグループセルのマスターセルを返します。
         */
        get rightMasterCell(): Cell | null {
            return this.getNextMasterCell(DirectionType.right);
        }
        /**
         * このグループセルの下にあるグループセルのマスターセルを返します。
         */
        get bottomMasterCell(): Cell | null {
            return this.getNextMasterCell(DirectionType.bottom);

        }
        
        /**
         * グループセル内の右端にあるせるセルのX座標を返します。
         */
        public get mostRightCellX(): number {
            return this.cellX + this.GroupColumnCount - 1;
        }
        /**
         * グループセル内の下端にあるせるセルのY座標を返します。
         */
        public get mostBottomCellY(): number {
            return this.cellY + this.GroupRowCount - 1;
        }

        /**
         * 指定した方向にあるグループセルの配列を返します。
         * @param direction 
         */
        private getNextGroupCells(direction: DirectionType): Cell[] {
            if (this.isMaster) {
                //if(this.isErrorCell) throw new Error("error!");
                let w: Cell[] = [this];
                let now: Cell | null = this.getNextCell(direction);
                while (now != null && this.ID == now.masterID) {
                    w.push(now);

                    now = now.getNextCell(direction);
                    if (this.table.columnCount < w.length && (direction == DirectionType.left || direction == DirectionType.right)) {
                        throw new Error("Invalid getNextGroupCells-Loop!");
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
        private get leftSideGroupCells(): Cell[] {
            return this.getNextGroupCells(DirectionType.bottom);
        }
        /**
        未定義
        */
        public get upperSideGroupCells(): Cell[] {
            return this.getNextGroupCells(DirectionType.right);

        }
        // #endregion


        /**
         * セルの背景を表すSVGRectElementを作成します。
         * @param className 
         */
        /*
        private static createCellRectangle(parent : SVGElement, className: string | null = null): SVGRectElement {
            const rect = <SVGRectElement>document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            parent.appendChild(rect);
            rect.width.baseVal.value = 30;
            rect.height.baseVal.value = 30;
            if (className == null) {
                rect.style.fill = "#ffffff";
            } else {
                SVG.createRectangle(className);
            }
            return rect;
        }
        */
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

       // #region update

        public updateNodeRelations(){
            
            this.updateSVGGroupParent();            
            
            this.updateBorderParent();            
            //this.updateBorderAttributes();
            
        }

        /**
         * このセルを更新します。
         */
        public update() {
            if(this.table.isNoneMode) return;
            const className = this.svgGroup.getAttribute("class"); 
            if(className != this.__currentClass){
                this.recomputeDefaultProperties();
                this.__currentClass = className;
            }
            
            this.resize();
            this.relocation();
            

        }

        /**
         * svgGroupの親関係を更新します。
         */
        private updateSVGGroupParent(){
            if (this.isMaster) {
                if(this.table.rows[this.cellY].svgGroup != this.table.svgGroup){
                    this.table.rows[this.cellY].svgGroup.appendChild(this.svgGroup);
                }

            } else {
                this.table.svgHiddenGroup.appendChild(this.svgGroup);
                this.svgText.textContent = "";

            }
        }
        private get topBorderRow() : BorderRow{
            return this.table.borderRows[this.cellY];
        }
        private get bottomBorderRow() : BorderRow{
            return this.table.borderRows[this.cellY+1];
        }
        private get leftBorderColumn() : BorderColumn{
            return this.table.borderColumns[this.cellX];
        }
        private get rightBorderColumn() : BorderColumn{
            return this.table.borderColumns[this.cellX+1];
        }

        /**
         * 枠の親関係を更新します。
         */
        private updateBorderParent(){
            if (this.isMaster || (this.topCell != null && this.topCell.isMaster)) {
                if(this.topBorderRow.svgGroup != this.svgTopBorder.parentNode) this.topBorderRow.svgGroup.appendChild(this.svgTopBorder);
            } else {
                if(this.table.svgHiddenGroup != this.svgTopBorder.parentNode) this.table.svgHiddenGroup.appendChild(this.svgTopBorder);
            }

            if (this.isMaster || (this.leftCell != null && this.leftCell.isMaster)) {
                if(this.leftBorderColumn.svgGroup != this.svgLeftBorder.parentNode) this.leftBorderColumn.svgGroup.appendChild(this.svgLeftBorder);
            } else {
                if(this.table.svgHiddenGroup != this.svgLeftBorder.parentNode) this.table.svgHiddenGroup.appendChild(this.svgLeftBorder);
            }

            if (this.isMaster || (this.rightCell != null && this.rightCell.isMaster)) {
                if(this.rightBorderColumn.svgGroup != this.svgRightBorder.parentNode) this.rightBorderColumn.svgGroup.appendChild(this.svgRightBorder);
            } else {
                if(this.table.svgHiddenGroup != this.svgRightBorder.parentNode) this.table.svgHiddenGroup.appendChild(this.svgRightBorder);
            }

            if (this.isMaster || (this.bottomCell != null && this.bottomCell.isMaster)) {
                if(this.bottomBorderRow.svgGroup != this.svgBottomBorder.parentNode) this.bottomBorderRow.svgGroup.appendChild(this.svgBottomBorder);
            } else {
                if(this.table.svgHiddenGroup != this.svgBottomBorder.parentNode) this.table.svgHiddenGroup.appendChild(this.svgBottomBorder);
            }
        }

        /**
         *セルのサイズを再計算します。
         */
        private resize() {
            SVGTextBox.sortText(this.svgText, this.horizontalAnchor, this._assurancevisibility);
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

        }
        /**
         * テキストを再描画します。
         */
        private locateSVGText() {
            const innerRect = new Rectangle();
            innerRect.x = this.innerExtraPaddingLeft + this.paddingLeft;
            innerRect.y = this.paddingTop;
            innerRect.height = this.height - this.paddingTop - this.paddingBottom;
            innerRect.width = this.width - this.innerExtraPaddingLeft - this.innerExtraPaddingRight - this.paddingLeft - this.paddingRight;
            if (this.isLocated) {
                this.svgText.gtSetXY(innerRect, this.verticalAnchor, this.horizontalAnchor, false);
                //ObsoleteGraph.setXY(this.svgText, innerRect, this.verticalAnchor, this.horizontalAnchor);
            }
        }

        /**
         * 指定した方向の枠を取り除きます。
         * @param dir 
         */
        public removeBorder(dir: DirectionType) {
            /*
            const border = this._borders[dir];
            if (this.table.svgHiddenGroup.contains(border)) {
                this.table.svgHiddenGroup.removeChild(border);
            } else if (this.table.svgGroup.contains(border)) {
                this.table.svgGroup.removeChild(border);
            } else {
                throw Error("error");
            }
            */
        }
        /**
         * このセルを取り除きます。
         * @param isColumn 
         */
        public removeFromTable(isColumn: boolean) {
            this.svgGroup.remove();
            /*
            if (this.table.svgGroup.contains(this.svgGroup)) {
                this.table.svgGroup.removeChild(this.svgGroup);
            } else if (this.table.svgHiddenGroup.contains(this.svgGroup)) {
                this.table.svgHiddenGroup.removeChild(this.svgGroup);
            } else {
                throw Error("error");
            }
            */
           /*
            if (isColumn) {
                this.removeBorder(DirectionType.top);
                if (this.table.svgGroup.contains(this.svgTopBorder)) {
                    throw Error("err");
                }
                if (this.bottomCell == null) this.removeBorder(DirectionType.bottom);
                if (this.leftCell == null) this.removeBorder(DirectionType.left);
                if (this.rightCell == null) this.removeBorder(DirectionType.right);
            } else {

                this.removeBorder(DirectionType.left);
                if (this.rightCell == null) this.removeBorder(DirectionType.right);
                if (this.topCell == null) this.removeBorder(DirectionType.top);
                if (this.bottomCell == null) this.removeBorder(DirectionType.bottom);
            }
            */
        }

        
        /**
         * このセルが持つ枠の情報を更新します。
         */
        private updateBorderAttributes(): void {
            /*
            if (this.leftCell != null && this.leftCell.svgRightBorder != this.svgLeftBorder) {
                this.removeBorder(DirectionType.left);
                this.svgLeftBorder = this.leftCell.svgRightBorder;
            }

            if (this.topCell != null && this.topCell.svgBottomBorder != this.svgTopBorder) {
                this.removeBorder(DirectionType.top);
                this.svgTopBorder = this.topCell.svgBottomBorder;
            }

            if (this.rightCell != null && this.rightCell.svgLeftBorder != this.svgRightBorder) {
                this.rightCell.removeBorder(DirectionType.left);
                this.rightCell.svgLeftBorder = this.svgRightBorder;
            }

            if (this.bottomCell != null && this.bottomCell.svgTopBorder != this.svgBottomBorder) {
                this.bottomCell.removeBorder(DirectionType.top);
                this.bottomCell.svgTopBorder = this.svgBottomBorder;
            }
            */

            const topCellX = this.svgTopBorder.getAttribute(Cell.borderXName);
            const topCellY = this.svgTopBorder.getAttribute(Cell.borderYName);
            const topCellAttr = this.svgTopBorder.getAttribute(Cell.borderTypeName);
            if(topCellX != `${this.cellX}`)this.svgTopBorder.setAttribute(Cell.borderXName, `${this.cellX}`);
            if(topCellY != `${this.cellY}`)this.svgTopBorder.setAttribute(Cell.borderYName, `${this.cellY}`);
            if(topCellAttr != `horizontal`)this.svgTopBorder.setAttribute(Cell.borderTypeName, "horizontal");
            //this.topBorder.setAttribute("data-border", "top");

            const leftCellX = this.svgLeftBorder.getAttribute(Cell.borderXName);
            const leftCellY = this.svgLeftBorder.getAttribute(Cell.borderYName);
            const leftCellAttr = this.svgLeftBorder.getAttribute(Cell.borderTypeName);
            if(leftCellX != `${this.cellX}`)this.svgLeftBorder.setAttribute(Cell.borderXName, `${this.cellX}`);
            if(leftCellY != `${this.cellY}`)this.svgLeftBorder.setAttribute(Cell.borderYName, `${this.cellY}`);
            if(leftCellAttr != `vertical`)this.svgLeftBorder.setAttribute(Cell.borderTypeName, "vertical");

            const rightCellX = this.svgRightBorder.getAttribute(Cell.borderXName);
            const rightCellY = this.svgRightBorder.getAttribute(Cell.borderYName);
            const rightCellAttr = this.svgRightBorder.getAttribute(Cell.borderTypeName);
            if(rightCellX != `${this.cellX+1}`)this.svgRightBorder.setAttribute(Cell.borderXName, `${this.cellX + 1}`);
            if(rightCellY != `${this.cellY}`)this.svgRightBorder.setAttribute(Cell.borderYName, `${this.cellY}`);
            if(rightCellAttr != `vertical`)this.svgRightBorder.setAttribute(Cell.borderTypeName, "vertical");

            const bottomCellX = this.svgBottomBorder.getAttribute(Cell.borderXName);
            const bottomCellY = this.svgBottomBorder.getAttribute(Cell.borderYName);
            const bottomCellAttr = this.svgBottomBorder.getAttribute(Cell.borderTypeName);
            if(bottomCellX != `${this.cellX}`)this.svgBottomBorder.setAttribute(Cell.borderXName, `${this.cellX}`);
            if(bottomCellY != `${this.cellY+1}`)this.svgBottomBorder.setAttribute(Cell.borderYName, `${this.cellY + 1}`);
            if(bottomCellAttr != `horizontal`)this.svgBottomBorder.setAttribute(Cell.borderTypeName, "horizontal");
        }
        // #endregion
        // #region relocate
        
        /**
         * 上枠の位置を再計算します。
         */
        private relocateTopBorder() {
            if (!this.isMaster) return;

            if (this.table.svgGroup.contains(this.svgTopBorder)) {
                if (this.isMaster) {
                    this.svgTopBorder.x1.baseVal.value = this.x;
                    this.svgTopBorder.x2.baseVal.value = this.x + this.computeBorderLength2(DirectionType.top);
                    this.svgTopBorder.y1.baseVal.value = this.y;
                    this.svgTopBorder.y2.baseVal.value = this.svgTopBorder.y1.baseVal.value;
                } else if (this.topCell != null && this.topCell.isMaster) {
                    this.topCell.relocateBottomBorder();
                } else {
                    throw Error("error");
                }
            }
        }
        /**
         * 左枠の位置を再計算します。
         */
        private relocateLeftBorder() {
            if (!this.isMaster) return;

            if (this.table.svgGroup.contains(this.svgLeftBorder)) {
                if (this.isMaster) {
                    this.svgLeftBorder.x1.baseVal.value = this.x;
                    this.svgLeftBorder.x2.baseVal.value = this.svgLeftBorder.x1.baseVal.value;
                    this.svgLeftBorder.y1.baseVal.value = this.y;
                    this.svgLeftBorder.y2.baseVal.value = this.y + this.computeBorderLength2(DirectionType.left);
                } else if (this.leftCell != null && this.leftCell.isMaster) {
                    this.leftCell.relocateRightBorder();
                } else {
                    throw Error("error");
                }
            }
        }
        /**
         * 右枠の位置を再計算します。
         */
        private relocateRightBorder() {
            if (!this.isMaster) return;

            if (this.table.svgGroup.contains(this.svgRightBorder)) {
                if (this.isMaster) {

                    this.svgRightBorder.x1.baseVal.value = this.x + this.width;
                    this.svgRightBorder.x2.baseVal.value = this.svgRightBorder.x1.baseVal.value;
                    this.svgRightBorder.y1.baseVal.value = this.y;
                    this.svgRightBorder.y2.baseVal.value = this.y + this.computeBorderLength2(DirectionType.right);
                } else if (this.rightCell != null && this.rightCell.isMaster) {
                    this.rightCell.relocateLeftBorder();
                } else {
                    throw Error("error");
                }
            }
        }
        /**
         * 下枠の位置を再計算します。
         */
        private relocateBottomBorder() {
            if (!this.isMaster) return;
            if (this.table.svgGroup.contains(this.svgBottomBorder)) {
                if (this.isMaster) {
                    this.svgBottomBorder.x1.baseVal.value = this.x;
                    this.svgBottomBorder.x2.baseVal.value = this.x + this.computeBorderLength2(DirectionType.bottom);
                    this.svgBottomBorder.y1.baseVal.value = this.y + this.height;
                    this.svgBottomBorder.y2.baseVal.value = this.svgBottomBorder.y1.baseVal.value;
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
            if (!CommonFunctions.IsDescendantOfBody(this.svgGroup)) return;

            this.relocateTopBorder();
            this.relocateLeftBorder();
            this.relocateRightBorder();
            this.relocateBottomBorder();


            this.locateSVGText();



        }
        // #endregion

        // #region merge
        /**
         * 右のグループセルと結合します。
         */
        mergeRight(): void {
            const range = this.getMergedRangeRight();
            if (range != null) {
                this.merge(range[0], range[1]);
            } else {
                throw Error("Error");
            }
        }
        /**
         * 下のグループセルと結合します。
         */
        mergeBottom(): void {
            const range = this.getMergedRangeBottom();
            if (range != null) {
                this.merge(range[0], range[1]);
            } else {
                throw Error("Error");
            }
        }
        /**
         * このセルをマスターセルとした横セル数wかつ縦セル数hのグループセルを作成できるとき、Trueを返します。
         * @param w 
         * @param h 
         */
        canMerge(w: number, h: number): boolean {
            const range = this.table.getRangeCells(this.cellX, this.cellY, w, h);

            for (let x = 0; x < w; x++) {
                const topCell = range[0][x].topCell;
                if (topCell != null) {
                    if (range[0][x].masterID == topCell.masterID) return false;
                }
                const bottomCell = range[h - 1][x].bottomCell;
                if (bottomCell != null) {
                    if (range[h - 1][x].masterID == bottomCell.masterID) return false;
                }
            }
            for (let y = 0; y < h; y++) {
                const leftCell = range[y][0].leftCell;
                if (leftCell != null) {
                    if (range[y][0].masterID == leftCell.masterID) return false;
                }
                const rightCell = range[y][w - 1].rightCell;
                if (rightCell != null) {
                    if (range[y][w - 1].masterID == rightCell.masterID) return false;
                }
            }
            return true;
        }
        /**
         * このセルをマスターセルとした横セル数wかつ縦セル数hのグループセルを作成します。
         * @param w 
         * @param h 
         */
        merge(w: number, h: number) {
            if (!this.isMaster) throw Error("Error");
            const range = this.table.getRangeCellArray(this.cellX, this.cellY, w, h);
            range.forEach((v) => { v.setMasterCellX(this.masterCellX); v.setMasterCellY(this.masterCellY) });
            range.forEach((v) => { v.updateNodeRelations(); v.update() });
        }
        /**
         * このセルから見て右にあるグループセルとこのセルが属しているグループセルが結合できるとき、そのグループセルの左上のY座標と左下のY座標を返します。
         * さもなければnullを返します。
         */
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
        /**
         * このセルから見て下にあるグループセルとこのセルが属しているグループセルが結合できるとき、そのグループセルの左上のX座標と右上のX座標を返します。
         * さもなければnullを返します。
         */
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
        /**
         * 右のセルと結合できるときTrueを返します。
         */
        get canMergeRight(): boolean {
            return this.getMergedRangeRight() != null;
        }
        /**
         * 下のセルと結合できるときTrueを返します。
         */
        get canMergeBottom(): boolean {
            return this.getMergedRangeBottom() != null;
        }

        // #endregion

        // #region decompose
        private decomposeRow(upperRowCount: number) {
            if (this.isMaster) {
                const upperSide = this.table.getRangeCellArray(this.cellX, this.cellY, this.GroupColumnCount, upperRowCount);
                const lowerSide = this.table.getRangeCellArray(this.cellX, this.cellY + upperRowCount, this.GroupColumnCount, this.GroupRowCount - upperRowCount);
                const lowerMaster = lowerSide[0];
                lowerSide.forEach((v) => {
                    v.setMasterCellX(lowerMaster.cellX);
                    v.setMasterCellY(lowerMaster.cellY);
                });

                upperSide.forEach((v) => v.update());
                lowerSide.forEach((v) => v.update());

            } else {
                throw Error("Slave Error");
            }
        }

        private decomposeColomn(leftColumnCount: number) {
            if (this.isMaster) {
                const leftSide = this.table.getRangeCellArray(this.cellX, this.cellY, leftColumnCount, this.GroupRowCount);
                const rightSide = this.table.getRangeCellArray(this.cellX + leftColumnCount, this.cellY, this.GroupColumnCount - leftColumnCount, this.GroupRowCount);
                const rightMaster = rightSide[0];
                rightSide.forEach((v) => {
                    v.setMasterCellX(rightMaster.cellX);
                    v.setMasterCellY(rightMaster.cellY);
                });

                leftSide.forEach((v) => v.update());
                rightSide.forEach((v) => v.update());

            } else {
                throw Error("Slave Error");
            }

        }
        // #endregion


    }
//}