//namespace GraphTableSVG {
import { Cell } from "./cell"
import * as AttributeNames from "../../common/attribute_names"
import * as DefaultClassNames from "../../common/default_class_names"
import { ZTable } from "../z_table"
import * as SVG from "../../interfaces/svg"


export class BorderColumn {
    private readonly table: ZTable;
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

    constructor(_table: ZTable, _x: number, rowSize: number, borderClass?: string) {
        this.table = _table;
        this._svgGroup = SVG.createGroup(this.table.svgColumnBorderGroup);
        this._svgGroup.setAttribute("name", "border_column");

        this.borderX = _x;

        for (let y = 0; y < rowSize; y++) {
            this.insertBorder(y, borderClass !== undefined ? borderClass : DefaultClassNames.defaultCellBorderClass);

        }

    }
    private _borders: SVGLineElement[] = new Array(0);
    public get borders(): SVGLineElement[] {
        return this._borders;
    }
    public insertBorder(rowi: number, borderClass?: string) {
        const line = SVG.createLine(0, 0, 0, 0, borderClass !== undefined ? borderClass : DefaultClassNames.defaultCellBorderClass);
        this._svgGroup.appendChild(line);
        this._borders.splice(rowi, 0, line);
    }
    public removeBorder(i: number) {
        this._borders[i].remove();
        this._borders.splice(i, 1);
    }

    public remove() {
        this.svgGroup.remove();
    }

}

//}

