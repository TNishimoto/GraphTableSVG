namespace GraphTableSVG {
    /*
    export class BaseLogicTree {
        public edgeLabel: string | null = null;
        public nodeText: string | null = null;
    }
    */

    export class LogicTree {
        public nodeText: string | null = null
        public edgeLabel: string | null = null
        public nodeClass: string | null = null
        public edgeClass: string | null = null

        constructor(public item: any = null, public children: (LogicTree | null)[] = [], nodeText: string | null = null, edgeLabel: string | null = null) {
            this.nodeText = nodeText;
            this.edgeLabel = edgeLabel;
        }
        public getOrderedNodes(order: NodeOrder): LogicTree[] {
            const r: LogicTree[] = [];
            const edges = this.children;
            if (order == NodeOrder.Preorder) {
                r.push(this);
                edges.forEach((v) => {
                    if (v != null) {
                        v.getOrderedNodes(order).forEach((w) => {
                            r.push(w);
                        });
                    }
                });

            } else if (order == NodeOrder.Postorder) {
                edges.forEach((v) => {
                    if (v != null) {
                        v.getOrderedNodes(order).forEach((w) => {
                            r.push(w);
                        });
                    }
                });
                r.push(this);
            }
            return r;
        }
    }
    export class BinaryLogicTree extends LogicTree {
        public get left(): BinaryLogicTree | null {
            const left = this.children[0];
            if (left == null) {
                return null;
            } else {
                return <BinaryLogicTree>left;
            }
        }
        public set left(value: BinaryLogicTree | null) {
            this.children[0] = value;
        }
        public get right(): BinaryLogicTree | null {
            const right = this.children[1];
            if (right == null) {
                return null;
            } else {
                return <BinaryLogicTree>right;
            }

        }
        public set right(value: BinaryLogicTree | null) {
            this.children[1] = value;
        }
        constructor(public item: any = null, left: BinaryLogicTree | null = null, right: BinaryLogicTree | null = null, nodeText: string | null = null, edgeLabel: string | null = null) {
            super(item, [left, right], nodeText, edgeLabel);
        }
        /*
        public toLogicTree(): LogicTree<T> {
            var r = new LogicTree<T>(this.item);
            if (this.left != null) {
                r.children.push(this.left.toLogicTree());
            }
            if (this.right != null) {
                r.children.push(this.right.toLogicTree());
            }
            return r;
        }
        */
    }
    export class LogicCell {

        public text: string | null = null;
        public cellClass: string | null = null;
        public textClass: string | null = null;
        public backgroundClass: string | null = null;
        public topBorderClass: string | null = null;
        public leftBorderClass: string | null = null;
        public rightBorderClass: string | null = null;
        public bottomBorderClass: string | null = null;
        public connectedColumnCount: number = 1;
        public connectedRowCount: number = 1;

        public item: any;

        public isLatexMode: boolean = false;
        constructor() {
        }
        public set(text: string | undefined = undefined, isLatexMode: boolean = false, cellClass: string | undefined = undefined, backgroundClass: string | undefined = undefined, textClass: string | undefined = undefined,
            topBorderClass: string | undefined = undefined, leftBorderClass: string | undefined = undefined, rightBorderClass: string | undefined = undefined, bottomBorderClass: string | undefined = undefined) {
            if (text !== undefined) this.text = text;
            if (cellClass !== undefined) this.cellClass = cellClass;
            if (textClass !== undefined) this.textClass = textClass;
            if (backgroundClass !== undefined) this.backgroundClass = backgroundClass;
            if (topBorderClass !== undefined) this.topBorderClass = topBorderClass;
            if (leftBorderClass !== undefined) this.leftBorderClass = leftBorderClass;
            if (rightBorderClass !== undefined) this.rightBorderClass = rightBorderClass;
            if (bottomBorderClass !== undefined) this.bottomBorderClass = bottomBorderClass;
            this.isLatexMode = isLatexMode;
        }
        /*
        public set(text: string | null = null, isLatexMode: boolean = false, cellClass: string | null = null, backgroundClass: string | null = null, textClass: string | null = null
            , topBorderClass: string | null = null, leftBorderClass: string | null = null, rightBorderClass: string | null = null, bottomBorderClass: string | null = null) {
            if (text != null) this.text = text;
            if (cellClass != null) this.cellClass = cellClass;
            if (textClass != null) this.textClass = textClass;
            if (backgroundClass != null) this.backgroundClass = backgroundClass;
            if (topBorderClass != null) this.topBorderClass = topBorderClass;
            if (leftBorderClass != null) this.leftBorderClass = leftBorderClass;
            if (rightBorderClass != null) this.rightBorderClass = rightBorderClass;
            if (bottomBorderClass != null) this.bottomBorderClass = bottomBorderClass;
            this.isLatexMode = isLatexMode;
        }
        */
        /*
        public checkCell(): boolean {
            if (this.masterCell != null) {

            } else {

            }
        }
        */
    }
    export class LogicTable {
        public cells: LogicCell[][];
        public columnWidths: (number | null)[];
        public rowHeights: (number | null)[];
        public tableClassName: string | null = null;
        public x : number | null = null;
        public y : number | null = null;

        public get rowCount(): number {
            return this.rowHeights.length;
        }
        public get columnCount(): number {
            return this.columnWidths.length;
        }

        public constructor(option : {columnCount?: number, rowCount?: number, tableClassName? : string, x? : number, y? :number } = {} ) {

            if(option.columnCount == undefined) option.columnCount = 3;
            if(option.rowCount == undefined) option.rowCount = 3;
            
            if(option.x == undefined) option.x = 0;
            if(option.y == undefined) option.y = 0;
            [this.x, this.y] = [option.x, option.y];

            if(option.tableClassName == undefined) option.tableClassName = null;

            this.tableClassName = option.tableClassName;
            this.cells = new Array(option.rowCount);
            for (let y = 0; y < option.rowCount; y++) {
                this.cells[y] = new Array(option.columnCount);
                for (let x = 0; x < option.columnCount; x++) {
                    this.cells[y][x] = new LogicCell();
                }
            }
            this.rowHeights = new Array(option.rowCount);
            for (let y = 0; y < option.rowCount; y++) {
                this.rowHeights[y] = null;
            }
            this.columnWidths = new Array(option.columnCount);
            for (let x = 0; x < option.columnCount; x++) {
                this.columnWidths[x] = null;
            }

        }
        public get cellArray(): LogicCell[] {
            const r: LogicCell[] = new Array();
            for (let y = 0; y < this.rowHeights.length; y++) {
                for (let x = 0; x < this.columnWidths.length; x++) {
                    r.push(this.cells[y][x]);
                }
            }
            return r;
        }
        public getColumn(i: number): LogicCell[] {
            const r: LogicCell[] = new Array();
            for (let y = 0; y < this.rowHeights.length; y++) {
                r.push(this.cells[y][i]);
            }
            return r;
        }
        public getRow(i: number): LogicCell[] {
            const r: LogicCell[] = new Array();
            for (let x = 0; x < this.columnWidths.length; x++) {
                r.push(this.cells[i][x]);
            }
            return r;
        }
        /*
        public checkTable(): boolean {

        }
        */

        public static parse(str: string, delimiter: string): string[][] {
            const lines = str.split("\n");
            const r: string[][] = new Array(lines.length);
            for (let y = 0; y < lines.length; y++) {
                const line = lines[y].split(delimiter);
                r[y] = new Array(line.length);
                for (let x = 0; x < line.length; x++) {
                    r[y][x] = line[x];
                }
                if (y > 0) {
                    if (r[y].length != r[y - 1].length) {
                        alert("Parse Error");
                        throw Error("Parse Error");
                    }
                }
            }
            return r;
        }
        public static create(str: string[][], tableClassName: string | null = null): LogicTable {
            const table = new LogicTable({ columnCount : str[0].length, rowCount : str.length, tableClassName : tableClassName });

            for (let y = 0; y < str.length; y++) {
                for (let x = 0; x < str[y].length; x++) {
                    const p = str[y][x].split("%%%");
                    table.cells[y][x].text = p[0];
                    if (p.length == 3) {
                        table.cells[y][x].connectedColumnCount = Number(p[1]);
                        table.cells[y][x].connectedRowCount = Number(p[2]);
                    }
                }
            }
            return table;
        }
    }
}