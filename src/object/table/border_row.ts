//namespace GraphTableSVG {
    import {Cell} from "./cell"
    import { CustomAttributeNames } from "../../options/custtome_attributes"
    import {GTable} from "../g_table"
    import {SVG} from "../../svghtml/svg"

    /**
     * 表の行を表現するクラスです。
     */
    export class BorderRow {
        private readonly table: GTable;
        private _svgGroup: SVGGElement;
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        /**
        列の単位セルのY座標を返します。
        */
        public get borderY(): number {
            return Number(this._svgGroup.getAttribute(Cell.cellYName));
        }
        public set borderY(v: number) {
            this._svgGroup.setAttribute(Cell.cellYName, `${v}`);
        }
        constructor(_table: GTable, _y: number, columnSize: number, borderClass?: string) {
            this.table = _table;
            this._svgGroup = SVG.createGroup(this.table.svgRowBorderGroup);
            this._svgGroup.setAttribute("name", "border_row");
            this.borderY = _y;
            for (let x = 0; x < columnSize; x++) {
                this.insertBorder(x, borderClass !== undefined ? borderClass : CustomAttributeNames.StyleValue.defaultCellBorderClass);
            }
        }
        private _borders: SVGLineElement[] = new Array(0);
        public get borders(): SVGLineElement[] {
            return this._borders;
        }

        public insertBorder(coromni: number, borderClass?: string) {
            const line = SVG.createLine(0, 0, 0, 0, borderClass !== undefined ? borderClass : CustomAttributeNames.StyleValue.defaultCellBorderClass);
            this._svgGroup.appendChild(line);
            this._borders.splice(coromni, 0, line);
        }
        public removeBorder(i : number) {
            this._borders[i].remove();
            this._borders.splice(i, 1);
        }

        public remove() {
            this.svgGroup.remove();
        }
    }

    export class BorderColumn {
        private readonly table: GTable;
        private _svgGroup: SVGGElement;
        /**
        列の単位セルのY座標を返します。
        */
        public get borderX(): number {
            return Number(this._svgGroup.getAttribute(Cell.cellYName));
        }
        public set borderX(v: number) {
            this._svgGroup.setAttribute(Cell.cellYName, `${v}`);
        }
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }

        constructor(_table: GTable, _x: number, rowSize: number, borderClass?: string) {
            this.table = _table;
            this._svgGroup = SVG.createGroup(this.table.svgColumnBorderGroup);
            this._svgGroup.setAttribute("name", "border_column");

            this.borderX = _x;

            for (let y = 0; y < rowSize; y++) {
                this.insertBorder(y, borderClass !== undefined ? borderClass : CustomAttributeNames.StyleValue.defaultCellBorderClass);

            }

        }
        private _borders: SVGLineElement[] = new Array(0);
        public get borders(): SVGLineElement[] {
            return this._borders;
        }
        public insertBorder(rowi: number, borderClass?: string) {
            const line = SVG.createLine(0, 0, 0, 0, borderClass !== undefined ? borderClass : CustomAttributeNames.StyleValue.defaultCellBorderClass);
            this._svgGroup.appendChild(line);
            this._borders.splice(rowi, 0, line);
        }
        public removeBorder(i : number) {
            this._borders[i].remove();
            this._borders.splice(i, 1);
        }

        public remove() {
            this.svgGroup.remove();
        }

    }

//}

