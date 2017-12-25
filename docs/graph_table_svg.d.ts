declare module GraphTableSVG {
    enum NodeOrder {
        Preorder = 0,
        Postorder = 1,
    }
    enum ConnectorPosition {
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
    function ToConnectorPosition(str: string | null): ConnectorPosition;
    function ToStrFromConnectorPosition(position: ConnectorPosition): string;
    var VerticalAnchorPropertyName: string;
    type VerticalAnchor = "top" | "middle" | "bottom";
    namespace VerticalAnchor {
        const Top: VerticalAnchor;
        const Middle: VerticalAnchor;
        const Bottom: VerticalAnchor;
    }
    var HorizontalAnchorPropertyName: string;
    type HorizontalAnchor = "left" | "center" | "right";
    namespace HorizontalAnchor {
        const Left: HorizontalAnchor;
        const Center: HorizontalAnchor;
        const Right: HorizontalAnchor;
    }
    function parsePXString(item: string | null): number;
}
declare module GraphTableSVG {
    class Edge {
        static beginConnectorTypeName: string;
        static endConnectorTypeName: string;
        static defaultLineClass: string;
        static beginNodeName: string;
        static endNodeName: string;
        static defaultTextClass: string;
        private _beginVertex;
        private _endVertex;
        beginConnectorType: ConnectorPosition;
        endConnectorType: ConnectorPosition;
        private _graph;
        svgGroup: SVGGElement;
        text: EdgeText | null;
        beginVertex: Vertex | null;
        endVertex: Vertex | null;
        readonly graph: Graph | null;
        dispose(): void;
        readonly isDisposed: boolean;
        constructor(__graph: Graph, className?: string | null);
        readonly x1: number;
        readonly y1: number;
        readonly x2: number;
        readonly y2: number;
        update(): boolean;
        readonly objectID: number | null;
        save(): void;
        static create(graph: Graph, className?: string | null, lineType?: string | null): GraphTableSVG.Edge;
    }
    class LineEdge extends Edge {
        private _svgLine;
        readonly svg: SVGLineElement;
        constructor(__graph: Graph, className?: string | null);
        update(): boolean;
    }
}
declare module GraphTableSVG {
    /**
    グラフを表します。
    */
    class Graph {
        static id: number;
        static defaultVertexClass: string;
        static defaultEdgeClass: string;
        static objectIDName: string;
        static typeName: string;
        protected _vertices: Vertex[];
        protected _edges: Edge[];
        protected _svgGroup: SVGGElement;
        protected _roots: Vertex[];
        defaultVertexClass: string | null;
        defaultEdgeClass: string | null;
        readonly roots: Vertex[];
        readonly svgGroup: SVGGElement;
        readonly vertices: Vertex[];
        readonly edges: Edge[];
        add(item: Vertex | Edge): void;
        remove(item: Vertex | Edge): void;
        constructor(className?: string | null);
        updateVertices(): void;
        updateEdges(): void;
        private update();
        removeGraph(svg: HTMLElement): void;
        getRegion(): Rectangle;
        getObjectBySVGID(id: string): Vertex | Edge | null;
        connect(node1: Vertex, edge: Edge, node2: Vertex, insertIndex?: number): void;
        getOrderedVertices(order: NodeOrder, node?: Vertex | null): Vertex[];
        rootVertex: Vertex | null;
        save(): void;
    }
}
declare module GraphTableSVG {
    module GraphArrangement {
        function leaveBasedArrangement(forest: Graph, xInterval: number, yInterval: number): void;
        function reverse(graph: Graph, isX: boolean, isY: boolean): void;
        function average(items: number[]): number;
        function middle(items: number[]): number;
        function standardTreeArrangement(graph: GraphTableSVG.Graph, xInterval: number, yInterval: number): void;
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
    class Vertex {
        symbol: symbol;
        static defaultSurfaceType: string;
        static defaultTextClass: string;
        static defaultSurfaceClass: string;
        private static id_counter;
        svgGroup: SVGGElement;
        svgText: SVGTextElement;
        private _graph;
        protected _outcomingEdges: Edge[];
        readonly outcomingEdges: Edge[];
        protected _incomingEdges: Edge[];
        readonly incomingEdges: Edge[];
        readonly innerRectangle: Rectangle;
        private _observer;
        private observerFunc;
        private _textObserver;
        protected textObserverFunc: MutationCallback;
        readonly isLocated: boolean;
        readonly graph: Graph | null;
        readonly objectID: string;
        constructor(__graph: Graph, className: string | null | undefined, text: string);
        x: number;
        y: number;
        readonly width: number;
        readonly height: number;
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        update(): boolean;
        private localUpdate();
        readonly region: Rectangle;
        containsSVGID(id: string): boolean;
        readonly surface: SVGElement | null;
        getParents(): Vertex[];
        readonly parentEdge: Edge | null;
        readonly parent: Vertex | null;
        readonly isRoot: boolean;
        readonly children: Edge[];
        readonly isLeaf: boolean;
        readonly root: Vertex;
        readonly index: number;
        save(): void;
        static create(graph: Graph, className?: string | null, defaultSurfaceType?: string): GraphTableSVG.Vertex;
        insertOutcomingEdge(edge: Edge, insertIndex: number): void;
        removeOutcomingEdge(edge: Edge): void;
        insertIncomingEdge(edge: Edge, insertIndex: number): void;
        removeIncomingEdge(edge: Edge): void;
        dispose(): void;
        readonly isDisposed: boolean;
    }
}
declare module GraphTableSVG {
    class CircleVertex extends GraphTableSVG.Vertex {
        svgCircle: SVGCircleElement;
        constructor(__graph: Graph, className?: string | null, text?: string);
        readonly width: number;
        readonly height: number;
        readonly innerRectangle: Rectangle;
        readonly radius: number;
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        readonly surface: SVGElement | null;
        getRadian(x: number, y: number): ConnectorPosition;
        getAutoPosition(x: number, y: number): ConnectorPosition;
    }
    class RectangleVertex extends GraphTableSVG.Vertex {
        svgRectangle: SVGRectElement;
        constructor(__graph: Graph, className?: string | null, text?: string);
        readonly width: number;
        readonly height: number;
        readonly innerRectangle: Rectangle;
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        getAutoPosition(x: number, y: number): ConnectorPosition;
    }
}
declare module GraphTableSVG {
    class VirtualTree {
        graph: Graph;
        root: Vertex;
        constructor(_graph: Graph, _root: Vertex);
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
    class Cell {
        private static defaultBackgroundClassName;
        private static defaultTextClass;
        masterID: number;
        parent: Table;
        svgBackground: SVGRectElement;
        svgText: SVGTextElement;
        svgGroup: SVGGElement;
        readonly paddingLeft: number;
        readonly paddingRight: number;
        readonly paddingTop: number;
        readonly paddingBottom: number;
        horizontalAnchor: string | null;
        cellX: number;
        cellY: number;
        verticalAnchor: string | null;
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
        readonly region: Rectangle;
        constructor(parent: Table, _px: number, _py: number, cellClass?: string | null, borderClass?: string | null);
    }
}
interface SVGGElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}
interface CSSStyleDeclaration {
    tryGetPropertyValue(name: string): string | null;
}
interface SVGElement {
    getActiveStyle(): CSSStyleDeclaration;
    getPropertyStyleValue(name: string): string | null;
    setPropertyStyleValue(name: string, value: string | null): void;
}
interface SVGTextElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}
declare function IsDescendantOfBody(node: Node): boolean;
declare function setXY(text: SVGTextElement, rect: GraphTableSVG.Rectangle, vAnchor: string | null, hAnchor: string | null): void;
declare module GraphTableSVG {
    class Row {
        table: Table;
        y: number;
        constructor(_table: Table, _y: number);
        getMaxHeight(): number;
        private setHeight(height);
        resize(): void;
        setY(posY: number): void;
        height: number;
    }
    class Column {
        table: Table;
        x: number;
        constructor(_table: Table, _x: number);
        getMaxWidth(): number;
        private setWidth(width);
        resize(): void;
        setX(posX: number): void;
        width: number;
    }
}
declare module GraphTableSVG {
    class SVGToVBA {
        static createTable(table: Table): string;
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
    class Table {
        private static defaultCellClass;
        private static defaultBorderClass;
        private _cells;
        readonly defaultCellClass: string | null;
        readonly defaultBorderClass: string | null;
        readonly cells: Cell[][];
        svgGroup: SVGGElement;
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
    function createLine(x: number, y: number, x2: number, y2: number, className?: string | null): SVGLineElement;
    function createText(className?: string | null): SVGTextElement;
    function createRectangle(className?: string | null): SVGRectElement;
    function createGroup(className?: string | null): SVGGElement;
    function resetStyle(style: CSSStyleDeclaration): void;
    function createCircle(className?: string | null): SVGCircleElement;
}
declare module GraphTableSVG {
    class VLine {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        readonly smallPoint: [number, number];
        readonly largePoint: [number, number];
        constructor(x1: number, y1: number, x2: number, y2: number);
        contains(x: number, y: number): boolean;
        getY(x: number): number | null;
        readonly slope: number | null;
        readonly intercept: number | null;
        readonly inverseSlope: number | null;
        inverseIntercept(x: number, y: number): number | null;
    }
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        readonly right: number;
        readonly bottom: number;
        addOffset(x: number, y: number): void;
        static merge(rects: Rectangle[]): Rectangle;
    }
}
