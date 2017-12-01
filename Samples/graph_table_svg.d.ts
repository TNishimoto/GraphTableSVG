declare module GraphTableSVG {
    class Edge {
        beginNode: Vertex;
        beginConnectType: ConnecterPositionType;
        endNode: Vertex;
        endConnectType: ConnecterPositionType;
        parent: Graph;
        text: EdgeText | null;
        readonly x1: number;
        readonly y1: number;
        readonly x2: number;
        readonly y2: number;
        update(): boolean;
    }
    class LineEdge extends Edge {
        svg: SVGLineElement;
        static create(_parent: Graph, _begin: Vertex, _end: Vertex): LineEdge;
        update(): boolean;
    }
}
declare module GraphTableSVG {
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    enum ConnecterPositionType {
        Top = 1,
        LeftUp = 2,
        Left = 3,
        LeftDown = 4,
        Bottom = 5,
        RightDown = 6,
        Right = 7,
        RightUp = 8,
    }
    class Graph {
        nodes: Vertex[];
        edges: Edge[];
        svgGroup: SVGGElement;
        relocation(): void;
        resize(): void;
        update(): void;
        static create(svg: HTMLElement): Graph;
    }
    class OrderedOutcomingEdgesGraph extends Graph {
        outcomingEdgesDic: {
            [key: number]: Edge[];
        };
        getRoot(): Vertex;
        getParentEdge(node: Vertex): Edge | null;
        getTree(node: Vertex): VirtualTree;
        static create(svg: HTMLElement): OrderedOutcomingEdgesGraph;
        relocation(): void;
    }
}
declare module GraphTableSVG {
    module relocation {
        function standardLocateSub2(tree: VirtualTree, edgeLength: number): void;
    }
}
declare module GraphTableSVG {
    class EdgeText {
        svg: SVGTextElement;
        parentEdge: Edge;
        readonly x: number;
        readonly y: number;
        private getCenterPosition();
        static create(edge: Edge, text: string): EdgeText;
        update(): void;
    }
}
declare module GraphTableSVG {
    class Vertex {
        private static id_counter;
        svgGroup: SVGGElement;
        parent: Graph;
        private _id;
        readonly id: number;
        x: number;
        y: number;
        getLocation(type: ConnecterPositionType): [number, number];
        update(): boolean;
    }
    class CircleVertex extends Vertex {
        svgCircle: SVGCircleElement;
        svgText: SVGTextElement;
        static create(_parent: Graph): CircleVertex;
        readonly radius: number;
        getLocation(type: ConnecterPositionType): [number, number];
    }
}
declare module GraphTableSVG {
    class VirtualTree {
        graph: OrderedOutcomingEdgesGraph;
        root: Vertex;
        constructor(_graph: OrderedOutcomingEdgesGraph, _root: Vertex);
        getChildren(): VirtualTree[];
        readonly parentEdge: Edge | null;
        getSubtree(result?: Vertex[]): Vertex[];
        getLeaves(): Vertex[];
        getHeight(): number;
        getTreeRegion(): Rectangle;
        getMostLeftLeave(): VirtualTree;
        addOffset(_x: number, _y: number): void;
        setLocation(_x: number, _y: number): void;
        setLocation2(_x: number, _y: number): void;
    }
}
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
interface SVGGElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}
interface SVGTextElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}
declare module GraphTableSVG {
    class SVGToVBA {
        static createTable(table: SVGTable): string;
        static cellFunctionCode: string;
    }
    function parseInteger(value: string): number;
    function visible(value: string): number;
    class VBATranslateFunctions {
        static createStringFunction(item: string): string;
        static createArrayFunction(items: any[]): string;
        static createStringArrayFunction(items: string[]): string;
        static createJagArrayFunction(items: any[][]): string;
        static joinLines(lines: string[]): string;
        static colorToVBA(color: string): string;
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
        private _cells;
        readonly cells: Cell[][];
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
        createVBAMainCode(slideName: string): [string, string];
        private splitCode(tableName, codes);
        private splitCode1(codes);
    }
}
declare module GraphTableSVG {
    function createLine(x: number, y: number, x2: number, y2: number): SVGLineElement;
    function createText(): SVGTextElement;
    function createRectangle(): SVGRectElement;
    function createGroup(): SVGGElement;
}
