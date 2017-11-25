declare module GraphTableSVG {
    class Padding {
        top: number;
        left: number;
        right: number;
        bottom: number;
    }
    class Cell {
        cellX: number;
        cellY: number;
        masterID: number;
        parent: SVGTable;
        padding: Padding;
        upLine: SVGLineElement;
        leftLine: SVGLineElement;
        rightLine: SVGLineElement;
        bottomLine: SVGLineElement;
        svgBackground: SVGRectElement;
        svgText: SVGTextElement;
        svgGroup: SVGGElement;
        readonly logicalWidth: number;
        readonly logicalHeight: number;
        readonly textBoxWidth: number;
        readonly textBoxHeight: number;
        resize(): void;
        relocation(): void;
        readonly isMaster: boolean;
        readonly isSlave: boolean;
        readonly ID: number;
        readonly upCell: Cell | null;
        readonly leftCell: Cell | null;
        readonly rightCell: Cell | null;
        readonly bottomCell: Cell | null;
        readonly upperGroupCells: Cell[];
        readonly leftGroupCells: Cell[];
        readonly leftBottomGroupCell: Cell;
        readonly rightUpGroupCell: Cell;
        readonly bottomGroupCells: Cell[];
        readonly rightGroupCells: Cell[];
        readonly upVirtualCells: Cell[];
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(parent: SVGTable, _px: number, _py: number, _rect: SVGRectElement, _text: SVGTextElement);
    }
}
declare module GraphTableSVG {
    class SVGToVBA {
        static createTable(table: SVGTable): string;
        private static cellFunctionCode;
    }
}
declare module GraphTableSVG {
    class Row {
        table: SVGTable;
        y: number;
        constructor(_table: SVGTable, _y: number);
        getMaxHeight(): number;
        private setHeight(height);
        resize(): void;
        setY(posY: number): void;
        height: number;
    }
    class Column {
        table: SVGTable;
        x: number;
        constructor(_table: SVGTable, _x: number);
        getMaxWidth(): number;
        private setWidth(width);
        resize(): void;
        setX(posX: number): void;
        width: number;
    }
    class SVGTable {
        cells: Cell[][];
        private svg;
        group: SVGGElement;
        readonly width: number;
        readonly height: number;
        readonly rows: Row[];
        readonly columns: Column[];
        readonly cellArray: Cell[];
        readonly borders: SVGLineElement[];
        resize(): void;
        getCellFromID(id: number): Cell;
        private setLine(cell);
        constructor(_svg: HTMLElement, width: number, height: number);
    }
}
declare module GraphTableSVG {
    function createLine(x: number, y: number, x2: number, y2: number): SVGLineElement;
    function createText(): SVGTextElement;
    function createRectangle(): SVGRectElement;
}
