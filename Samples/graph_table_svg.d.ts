declare module GraphTableSVG {
    class Edge {
        private _beginNode;
        beginConnecterType: ConnecterPosition;
        private _endNode;
        endConnecterType: ConnecterPosition;
        private _graph;
        text: EdgeText | null;
        beginNode: Vertex;
        endNode: Vertex;
        readonly graph: Graph | null;
        setGraph(value: Graph): void;
        constructor();
        readonly x1: number;
        readonly y1: number;
        readonly x2: number;
        readonly y2: number;
        update(): boolean;
    }
    class LineEdge extends Edge {
        private _svg;
        readonly svg: SVGLineElement;
        setGraph(value: Graph): void;
        constructor(line: SVGLineElement);
        static create(): LineEdge;
        update(): boolean;
    }
}
declare module GraphTableSVG {
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        readonly right: number;
        readonly bottom: number;
    }
    enum NodeOrder {
        Preorder = 0,
        Postorder = 1,
    }
    enum ConnecterPosition {
        Top = 1,
        LeftUp = 2,
        Left = 3,
        LeftDown = 4,
        Bottom = 5,
        RightDown = 6,
        Right = 7,
        RightUp = 8,
        Auto = 9,
    }
    class Graph {
        private static id;
        protected _nodes: Vertex[];
        protected _edges: Edge[];
        protected _svgGroup: SVGGElement;
        name: string;
        readonly svgGroup: SVGGElement;
        readonly nodes: Vertex[];
        readonly edges: Edge[];
        addVertex(vertex: Vertex): void;
        private addEdge(edge);
        constructor();
        updateNodes(): void;
        updateEdges(): void;
        update(): void;
        removeGraph(svg: HTMLElement): void;
        getRegion(): Rectangle;
        getObjectBySVGID(id: string): Vertex | Edge | null;
        connect(node1: Vertex, edge: Edge, node2: Vertex, _beginConnectType?: ConnecterPosition, _endConnectType?: ConnecterPosition): void;
    }
}
declare module GraphTableSVG {
    module GraphArrangement {
        function leaveBasedArrangement(forest: OrderedForest, edgeLength: number): void;
        function reverse(graph: Graph, isX: boolean, isY: boolean): void;
        function average(items: number[]): number;
        function middle(items: number[]): number;
        function standardTreeArrangement(graph: OrderedTree, edgeLength: number): void;
    }
}
declare module GraphTableSVG {
    class EdgeText {
        svg: SVGTextElement;
        parentEdge: Edge;
        readonly x: number;
        readonly y: number;
        private getCenterPosition();
        static create(graph: Graph, edge: Edge, text: string): EdgeText;
        update(): void;
        static reverse(str: string): string;
    }
}
declare module GraphTableSVG {
    class OrderedOutcomingEdgesGraph extends Graph {
        private _outcomingEdgesDic;
        readonly outcomingEdgesDic: {
            [key: number]: Edge[];
        };
        constructor();
    }
    class OrderedForest extends OrderedOutcomingEdgesGraph {
        protected _roots: Vertex[];
        readonly roots: Vertex[];
        addVertex(vertex: Vertex): void;
        constructor();
        connect(node1: Vertex, edge: Edge, node2: Vertex, insertIndex?: number, _beginConnectType?: ConnecterPosition, _endConnectType?: ConnecterPosition): void;
        getOrderedNodes(order: NodeOrder, node?: Vertex | null): Vertex[];
    }
    class OrderedTree extends OrderedForest {
        _rootVertex: Vertex | null;
        rootVertex: Vertex | null;
        constructor();
        readonly tree: VirtualTree;
        getFirstNoParentVertex(): Vertex;
        getParentEdge(node: Vertex): Edge | null;
        getSubTree(node: Vertex): VirtualTree;
    }
}
declare module GraphTableSVG {
    class Vertex {
        private static id_counter;
        svgGroup: SVGGElement;
        private _graph;
        private _observer;
        private observerFunc;
        readonly graph: Graph | null;
        setGraph(value: Graph): void;
        private _id;
        readonly id: number;
        constructor(group: SVGGElement);
        x: number;
        y: number;
        readonly width: number;
        readonly height: number;
        getLocation(type: ConnecterPosition): [number, number];
        update(): boolean;
        readonly region: Rectangle;
        static getRegion(vertexes: Vertex[]): Rectangle;
        containsSVGID(id: string): boolean;
        readonly surface: SVGElement | null;
        getParents(): Vertex[];
        getParent(): Vertex | null;
        readonly isRoot: boolean;
        readonly children: Edge[];
        readonly isLeaf: boolean;
        readonly root: Vertex;
        readonly index: number;
    }
    class CircleVertex extends Vertex {
        svgCircle: SVGCircleElement;
        svgText: SVGTextElement;
        setGraph(value: Graph): void;
        constructor(group: SVGGElement, circle: SVGCircleElement, text: SVGTextElement);
        readonly width: number;
        readonly height: number;
        static create(_parent: Graph, x?: number, y?: number, r?: number, circleClassName?: string | null): CircleVertex;
        readonly radius: number;
        getLocation(type: ConnecterPosition): [number, number];
        readonly surface: SVGElement | null;
        containsSVGID(id: string): boolean;
    }
}
declare module GraphTableSVG {
    class VirtualTree {
        graph: OrderedTree;
        root: Vertex;
        constructor(_graph: OrderedTree, _root: Vertex);
        getChildren(): VirtualTree[];
        readonly parentEdge: Edge | null;
        getSubtree(result?: Vertex[]): Vertex[];
        getLeaves(): Vertex[];
        getHeight(): number;
        region(): Rectangle;
        getMostLeftLeave(): VirtualTree;
        addOffset(_x: number, _y: number): void;
        setRectangleLocation(_x: number, _y: number): void;
        setRootLocation(_x: number, _y: number): void;
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
        private _observer;
        private observerFunc;
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
        readonly leftBottomGroupCell: Cell | null;
        readonly rightUpGroupCell: Cell | null;
        readonly bottomGroupCells: Cell[];
        readonly rightGroupCells: Cell[];
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
    class SVGTable {
        private _cells;
        readonly cells: Cell[][];
        group: SVGGElement;
        readonly width: number;
        readonly height: number;
        readonly rows: Row[];
        readonly columns: Column[];
        readonly cellArray: Cell[];
        readonly borders: SVGLineElement[];
        private _observer;
        private observerFunc;
        resize(): void;
        getCellFromID(id: number): Cell;
        private setLine(cell);
        constructor(_svg: HTMLElement, width: number, height: number);
        createVBAMainCode(slideName: string): [string, string];
        private splitCode(tableName, codes);
        private splitCode1(codes);
        removeTable(svg: HTMLElement): void;
    }
}
declare module GraphTableSVG {
    function createLine(x: number, y: number, x2: number, y2: number): SVGLineElement;
    function createText(): SVGTextElement;
    function createRectangle(): SVGRectElement;
    function createGroup(): SVGGElement;
    function createCircle(r?: number, className?: string | null): SVGCircleElement;
}
