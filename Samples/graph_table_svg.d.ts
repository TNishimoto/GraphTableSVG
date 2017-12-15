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
        function leaveBasedArrangement(forest: OrderedForest, xInterval: number, yInterval: number): void;
        function reverse(graph: Graph, isX: boolean, isY: boolean): void;
        function average(items: number[]): number;
        function middle(items: number[]): number;
        function standardTreeArrangement(graph: OrderedTree, xInterval: number, yInterval: number): void;
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
        readonly isLocated: boolean;
        readonly graph: Graph | null;
        setGraph(value: Graph): void;
        private _id;
        readonly id: number;
        constructor(className?: string | null);
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
        private _textObserver;
        protected textObserverFunc: MutationCallback;
        setGraph(value: Graph): void;
        constructor(className?: string | null, r?: number, text?: string);
        readonly width: number;
        readonly height: number;
        readonly innerRectangle: Rectangle;
        static create(_parent: Graph, x?: number, y?: number, r?: number, nodeClassName?: string | null): CircleVertex;
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
    enum VerticalAnchor {
        Bottom = 0,
        Middle = 1,
        Top = 2,
    }
    enum HorizontalAnchor {
        Left = 0,
        Center = 1,
        Right = 2,
    }
    class Cell {
        masterID: number;
        parent: SVGTable;
        padding: Padding;
        svgBackground: SVGRectElement;
        svgText: SVGTextElement;
        svgGroup: SVGGElement;
        horizontalAnchor: HorizontalAnchor | null;
        cellX: number;
        cellY: number;
        verticalAnchor: VerticalAnchor | null;
        private _upLine;
        upLine: SVGLineElement;
        private _leftLine;
        leftLine: SVGLineElement;
        private _rightLine;
        rightLine: SVGLineElement;
        private _bottomLine;
        bottomLine: SVGLineElement;
        readonly defaultTextClass: string | null;
        readonly defaultBackgroundClass: string | null;
        private _observer;
        private observerFunc;
        readonly logicalWidth: number;
        readonly logicalHeight: number;
        readonly isLocated: boolean;
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
        constructor(parent: SVGTable, _px: number, _py: number, cellClass?: string | null);
    }
}
interface SVGGElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}
interface CSSStyleDeclaration {
    getHorizontalAnchor(): GraphTableSVG.HorizontalAnchor | null;
    setHorizontalAnchor(value: GraphTableSVG.HorizontalAnchor | null): void;
    getVerticalAnchor(): GraphTableSVG.VerticalAnchor | null;
    setVerticalAnchor(value: GraphTableSVG.VerticalAnchor | null): void;
    tryGetPropertyValue(name: string): string | null;
}
interface SVGElement {
    getActiveStyle(): CSSStyleDeclaration;
}
interface SVGTextElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}
declare function IsDescendantOfBody(node: Node): boolean;
declare function setXY(text: SVGTextElement, rect: GraphTableSVG.Rectangle, vAnchor: GraphTableSVG.VerticalAnchor | null, hAnchor: GraphTableSVG.HorizontalAnchor | null): void;
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
        readonly defaultCellClass: string | null;
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
        private insertRowFunction(i, width?);
        insertRow(i: number): void;
        appendRow(): void;
        private createCell();
        insertColumn(i: number): void;
        appendColumn(): void;
        private updateBorder(cell);
        private renumbering();
        resize(): void;
        getRegion(): Rectangle;
        getCellFromID(id: number): Cell;
        constructor(width: number, height: number, _tableClassName?: string | null);
        createVBAMainCode(slideName: string): [string, string];
        private splitCode(tableName, codes);
        private splitCode1(codes);
        removeTable(svg: HTMLElement): void;
    }
}
declare module GraphTableSVG {
    function createLine(x: number, y: number, x2: number, y2: number): SVGLineElement;
    function createText(className?: string | null): SVGTextElement;
    function resetStyle(item: SVGTextElement): void;
    function createRectangle(width?: number, height?: number, className?: string | null): SVGRectElement;
    function createGroup(className?: string | null): SVGGElement;
    function createCircle(r?: number, className?: string | null): SVGCircleElement;
}
