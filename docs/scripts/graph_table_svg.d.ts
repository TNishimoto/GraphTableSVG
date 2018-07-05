declare namespace GraphTableSVG {
    namespace Color {
        function translateHexCodeFromColorName(str: string): string;
        function translateHexCodeFromColorName2(str: string): {
            r: number;
            g: number;
            b: number;
        } | null;
        function translateRGBCodeFromColorName(str: string): string;
        function translateRGBCodeFromColorName2(str: string): {
            r: number;
            g: number;
            b: number;
        };
    }
}
declare namespace GraphTableSVG {
    enum NodeOrder {
        Preorder = 0,
        Postorder = 1,
    }
    type ConnectorPosition = "top" | "topleft" | "left" | "bottomleft" | "bottom" | "bottomright" | "right" | "topright" | "auto";
    namespace ConnectorPosition {
        const Top: ConnectorPosition;
        const TopLeft: ConnectorPosition;
        const Left: ConnectorPosition;
        const BottomLeft: ConnectorPosition;
        const Bottom: ConnectorPosition;
        const BottomRight: ConnectorPosition;
        const Right: ConnectorPosition;
        const TopRight: ConnectorPosition;
        const Auto: ConnectorPosition;
    }
    function ToVBAConnectorPosition(shapeType: string, str: ConnectorPosition): number;
    function ToConnectorPosition(str: string | null): ConnectorPosition;
    const VerticalAnchorPropertyName: string;
    const MaximalRegularIntervalName: string;
    type VerticalAnchor = "top" | "middle" | "bottom";
    namespace VerticalAnchor {
        const Top: VerticalAnchor;
        const Middle: VerticalAnchor;
        const Bottom: VerticalAnchor;
    }
    const HorizontalAnchorPropertyName: string;
    type HorizontalAnchor = "left" | "center" | "right";
    namespace HorizontalAnchor {
        const Left: HorizontalAnchor;
        const Center: HorizontalAnchor;
        const Right: HorizontalAnchor;
    }
    function parsePXString(item: string | null): number;
}
declare namespace GraphTableSVG {
    namespace GUI {
        function createMacroModal(text: string): void;
        function removeMacroModal(): void;
        function copyAndCloseMacroModal(): void;
        function setSVGBoxSize(box: HTMLElement, w: number, h: number): void;
        function setSVGBoxSize(box: HTMLElement, rect: Rectangle, padding: Padding): void;
        function getURLParameters(): {
            [key: string]: string;
        };
        function setURLParametersToHTMLElements(): void;
        function getInputText(boxname: string): string;
        function getNonNullElementById(id: string): HTMLElement;
        function observeSVGBox(svgBox: HTMLElement, sizeFunc: () => GraphTableSVG.Rectangle, padding?: GraphTableSVG.Padding): void;
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
    getPropertyStyleValueWithDefault(name: string, defaultValue: string): string;
    setPropertyStyleValue(name: string, value: string | null): void;
}
interface SVGTextElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
    setTextContent(str: string, isLatexMode: boolean): void;
    setTextContent(str: string): void;
}
interface SVGTextPathElement {
    setTextContent(str: string, isLatexMode: boolean): void;
    setTextContent(str: string): void;
}
interface SVGLineElement {
    setEmphasis(v: boolean): void;
    getEmphasis(): boolean;
}
interface SVGPathElement {
    setPathLocations(points: [number, number][]): void;
    getPathLocations(): [number, number][];
}
declare namespace GraphTableSVG {
    class LogicTree {
        item: any;
        children: (LogicTree | null)[];
        nodeText: string | null;
        edgeLabel: string | null;
        nodeClass: string | null;
        edgeClass: string | null;
        constructor(item?: any, children?: (LogicTree | null)[], nodeText?: string | null, edgeLabel?: string | null);
        getOrderedNodes(order: NodeOrder): LogicTree[];
    }
    class BinaryLogicTree extends LogicTree {
        item: any;
        left: BinaryLogicTree | null;
        right: BinaryLogicTree | null;
        constructor(item?: any, left?: BinaryLogicTree | null, right?: BinaryLogicTree | null, nodeText?: string | null, edgeLabel?: string | null);
    }
    class LogicCell {
        text: string | null;
        cellClass: string | null;
        textClass: string | null;
        backgroundClass: string | null;
        topBorderClass: string | null;
        leftBorderClass: string | null;
        rightBorderClass: string | null;
        bottomBorderClass: string | null;
        connectedColumnCount: number;
        connectedRowCount: number;
        item: any;
        isLatexMode: boolean;
        constructor();
        set(text?: string | undefined, isLatexMode?: boolean, cellClass?: string | undefined, backgroundClass?: string | undefined, textClass?: string | undefined, topBorderClass?: string | undefined, leftBorderClass?: string | undefined, rightBorderClass?: string | undefined, bottomBorderClass?: string | undefined): void;
    }
    class LogicTable {
        cells: LogicCell[][];
        columnWidths: (number | null)[];
        rowHeights: (number | null)[];
        tableClassName: string | null;
        x: number | null;
        y: number | null;
        readonly rowCount: number;
        readonly columnCount: number;
        constructor(option?: {
            columnCount?: number;
            rowCount?: number;
            tableClassName?: string;
            x?: number;
            y?: number;
        });
        readonly cellArray: LogicCell[];
        getColumn(i: number): LogicCell[];
        getRow(i: number): LogicCell[];
        static parse(str: string, delimiter: string): string[][];
        static create(str: string[][], tableClassName?: string | null): LogicTable;
    }
}
declare namespace GraphTableSVG {
    namespace SVG {
        function createLine(x: number, y: number, x2: number, y2: number, className?: string | null): SVGLineElement;
        function createPath(x: number, y: number, x2: number, y2: number, className?: string | null): SVGPathElement;
        function createText(className?: string | null): SVGTextElement;
        function createRectangle(className?: string | null): SVGRectElement;
        function createGroup(className?: string | null): SVGGElement;
        function resetStyle(style: CSSStyleDeclaration): void;
        let defaultCircleRadius: number;
        function createCircle(className?: string | null): SVGCircleElement;
        function createMarker(className?: string | null): SVGMarkerElement;
        function createTextPath(className?: string | null): [SVGTextElement, SVGTextPathElement];
        function setTextToTextPath(path: SVGTextPathElement, str: string, isLatexMode: boolean): void;
        function setTextToSVGText(path: SVGTextElement, str: string, isLatexMode: boolean): void;
        function setDefaultValue(item: SVGCircleElement | SVGRectElement, style?: CSSStyleDeclaration | null): void;
        function setClass(svg: SVGElement, className?: string | null): void;
        function setCSSToStyle(svg: HTMLElement): void;
        function setCSSToAllElementStyles(item: HTMLElement | string): void;
        function getStyleSheet(name: string): CSSStyleDeclaration | null;
    }
}
declare namespace GraphTableSVG {
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
    class Padding {
        top: number;
        left: number;
        right: number;
        bottom: number;
        constructor(top?: number, left?: number, right?: number, bottom?: number);
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
declare namespace GraphTableSVG {
    class AdjacencyMatrix {
        matrix: number[][];
        value: string[];
    }
}
declare namespace GraphTableSVG {
    class Edge {
        static readonly beginConnectorTypeName: string;
        static readonly endConnectorTypeName: string;
        static readonly defaultLineClass: string;
        static readonly beginNodeName: string;
        static readonly endNodeName: string;
        static readonly defaultTextClass: string;
        static readonly controlPointName: string;
        protected _svgTextPath: SVGTextPathElement;
        readonly svgTextPath: SVGTextPathElement;
        tag: any;
        private _observer;
        private observerFunc;
        markerStart: SVGMarkerElement | null;
        markerEnd: SVGMarkerElement | null;
        controlPoint: [number, number][];
        strokeDasharray: string | null;
        readonly lineColor: string | null;
        private _beginVertex;
        private _endVertex;
        private _graph;
        private _svgGroup;
        readonly svgGroup: SVGGElement;
        protected _svgPath: SVGPathElement;
        readonly svgPath: SVGPathElement;
        protected _svgText: SVGTextElement;
        readonly svgText: SVGTextElement;
        constructor(__graph: Graph, g: SVGGElement);
        beginConnectorType: ConnectorPosition;
        endConnectorType: ConnectorPosition;
        beginVertex: Vertex | null;
        endVertex: Vertex | null;
        readonly graph: Graph | null;
        dispose(): void;
        readonly isDisposed: boolean;
        readonly x1: number;
        readonly y1: number;
        readonly x2: number;
        readonly y2: number;
        update(): boolean;
        isMaximalRegularInterval: boolean;
        readonly objectID: string;
        save(): void;
        static create(graph: Graph, option?: {
            className?: string;
            surfaceType?: string;
            beginVertex?: Vertex;
            endVertex?: Vertex;
            beginConnectorType?: ConnectorPosition;
            endConnectorType?: ConnectorPosition;
            incomingInsertIndex?: number;
            outcomingInsertIndex?: number;
            text?: string;
        }): GraphTableSVG.Edge;
        createVBACode(main: string[], sub: string[][], indexDic: {
            [key: string]: number;
        }): void;
        createVBACodeOfText(shapes: string, result: string[][]): void;
        private static markerCounter;
        static createMark(): SVGMarkerElement;
    }
}
declare namespace GraphTableSVG {
    class EdgeText {
        private _svgText;
        readonly svgText: SVGTextElement;
        private _edge;
        readonly edge: Edge;
        constructor(graph: Graph, edge: Edge, text: string);
        readonly x: number;
        readonly y: number;
        private getCenterPosition();
        update(): void;
        readonly fontSize: number;
        private static reverse(str);
    }
}
declare namespace GraphTableSVG {
    class Graph {
        static idCounter: number;
        static readonly defaultVertexClass: string;
        static readonly defaultEdgeClass: string;
        static readonly vertexXIntervalName: string;
        static readonly vertexYIntervalName: string;
        static readonly objectIDName: string;
        static readonly typeName: string;
        protected _vertices: Vertex[];
        protected _edges: Edge[];
        protected _svgGroup: SVGGElement;
        protected _roots: Vertex[];
        constructor(box: HTMLElement, option?: {
            className?: string;
        });
        private updateVertices();
        private updateEdges();
        update(): void;
        x: number;
        y: number;
        vertexXInterval: number | null;
        vertexYInterval: number | null;
        defaultVertexClass: string | null;
        defaultEdgeClass: string | null;
        rootVertex: Vertex | null;
        readonly roots: Vertex[];
        readonly svgGroup: SVGGElement;
        readonly vertices: Vertex[];
        readonly edges: Edge[];
        add(item: Vertex | Edge): void;
        remove(item: Vertex | Edge): void;
        clear(): void;
        removeGraph(svg: HTMLElement): void;
        getRegion(): Rectangle;
        getObject(child: HTMLElement | SVGElement): Vertex | Edge | null;
        getObjectByObjectID(id: string): Vertex | Edge | null;
        connect(beginVertex: Vertex, edge: Edge, endVertex: Vertex, option?: {
            outcomingInsertIndex?: number;
            incomingInsertIndex?: number;
            beginConnectorType?: GraphTableSVG.ConnectorPosition;
            endConnectorType?: GraphTableSVG.ConnectorPosition;
        }): void;
        getOrderedVertices(order: NodeOrder, node?: Vertex | null): Vertex[];
        save(): void;
        static setXY(text: SVGTextElement, rect: GraphTableSVG.Rectangle, vAnchor: string | null, hAnchor: string | null): void;
        createVBACode(id: number): string[];
    }
}
declare namespace GraphTableSVG {
    namespace GraphArrangement {
    }
    namespace TreeArrangement {
        function leaveBasedArrangement(forest: Graph, xInterval: number, yInterval: number): void;
        function reverse(graph: Graph, isX: boolean, isY: boolean): void;
        function average(items: number[]): number;
        function middle(items: number[]): number;
        function standardTreeArrangement(graph: GraphTableSVG.Graph): void;
        function standardTreeWidthArrangement(graph: GraphTableSVG.Graph): void;
        function Arrangement1(graph: GraphTableSVG.Graph): void;
    }
}
declare namespace GraphTableSVG {
    class Tree extends Graph {
        constructFromLogicTree(roots: LogicTree[] | LogicTree, isLatexMode?: boolean): void;
        private createChild<T>(parent, logicNode, isLatexMode?);
        createdNodeCallback: (node: Vertex) => void;
        relocateFunction: (Tree: Graph) => void;
        relocate(): void;
        appendChild(parent: Vertex, str: string, insertIndex: number): void;
    }
    namespace Parse {
        function parseTree(str: string): GraphTableSVG.LogicTree;
        function getParseString(tree: GraphTableSVG.Vertex): string;
    }
}
declare namespace GraphTableSVG {
    class Vertex {
        static readonly defaultSurfaceType: string;
        static readonly defaultTextClass: string;
        static readonly defaultSurfaceClass: string;
        static readonly autoSizeShapeToFitTextName: string;
        private static readonly id_counter;
        private _graph;
        protected _outcomingEdges: Edge[];
        protected _incomingEdges: Edge[];
        tag: any;
        private _svgGroup;
        private _observer;
        private observerFunc;
        readonly shapeType: string;
        private _textObserver;
        protected textObserverFunc: MutationCallback;
        constructor(graph: Graph, params?: {
            className?: string;
            text?: string;
            x?: number;
            y?: number;
        });
        readonly graph: Graph | null;
        readonly svgGroup: SVGGElement;
        private _svgText;
        readonly svgText: SVGTextElement;
        readonly outcomingEdges: Edge[];
        readonly incomingEdges: Edge[];
        readonly innerRectangle: Rectangle;
        readonly isLocated: boolean;
        readonly objectID: string;
        x: number;
        y: number;
        width: number;
        height: number;
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        getConnectorType(type: ConnectorPosition, x: number, y: number): ConnectorPosition;
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
        update(): boolean;
        protected localUpdate(): void;
        readonly region: Rectangle;
        containsObjectID(id: string): boolean;
        readonly surface: SVGElement | null;
        getParents(): Vertex[];
        readonly parentEdge: Edge | null;
        isAutoSizeShapeToFitText: boolean;
        readonly parent: Vertex | null;
        readonly isNoParent: boolean;
        readonly children: Vertex[];
        readonly isLeaf: boolean;
        readonly firstNoParent: Vertex;
        readonly tree: VirtualSubTree;
        save(): void;
        static create(graph: Graph, option?: {
            className?: string;
            surfaceType?: string;
            x?: number;
            y?: number;
            text?: string;
            radius?: number;
            width?: number;
            height?: number;
        }): GraphTableSVG.Vertex;
        insertOutcomingEdge(edge: Edge, insertIndex: number): void;
        removeOutcomingEdge(edge: Edge): void;
        insertIncomingEdge(edge: Edge, insertIndex: number): void;
        removeIncomingEdge(edge: Edge): void;
        dispose(): void;
        readonly isDisposed: boolean;
        createVBACode(main: string[], sub: string[][], indexDic: {
            [key: string]: number;
        }): void;
    }
}
declare namespace GraphTableSVG {
    class CircleVertex extends GraphTableSVG.Vertex {
        private _svgCircle;
        readonly svgCircle: SVGCircleElement;
        constructor(graph: Graph, params: {
            className?: string;
            text?: string;
            x?: number;
            y?: number;
            radius?: number;
        });
        width: number;
        height: number;
        readonly innerRectangle: Rectangle;
        readonly radius: number;
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        readonly surface: SVGElement | null;
        private getRadian(x, y);
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
    }
    class RectangleVertex extends GraphTableSVG.Vertex {
        private _svgRectangle;
        readonly svgRectangle: SVGRectElement;
        readonly shapeType: string;
        constructor(graph: Graph, params?: {
            className?: string;
            text?: string;
            x?: number;
            y?: number;
            width?: number;
            height?: number;
        });
        protected localUpdate(): void;
        width: number;
        height: number;
        readonly innerRectangle: Rectangle;
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
        readonly surface: SVGElement | null;
    }
}
declare namespace GraphTableSVG {
    class VirtualSubTree {
        subTreeRoot: Vertex;
        constructor(_root: Vertex);
        readonly children: Vertex[];
        readonly parentEdge: Edge | null;
        getSubtree(result?: Vertex[]): Vertex[];
        getHeight(): number;
        region(): Rectangle;
        readonly mostLeftLeave: Vertex;
        addOffset(_x: number, _y: number): void;
        setRectangleLocation(_x: number, _y: number): void;
        setRootLocation(_x: number, _y: number): void;
        readonly leaves: Vertex[];
    }
}
declare namespace GraphTableSVG {
    enum DirectionType {
        top = 0,
        left = 1,
        right = 2,
        bottom = 3,
    }
    enum DirectionType2 {
        topLeft = 0,
        bottomLeft = 1,
        bottomRight = 2,
        topRight = 3,
    }
    class Cell {
        private static readonly defaultBackgroundClassName;
        private static readonly defaultTextClass;
        static readonly emphasisCellClass: string;
        static readonly emphasisBorderClass: string;
        static readonly temporaryBorderClass: string;
        static readonly cellXName: string;
        static readonly cellYName: string;
        static readonly borderXName: string;
        static readonly borderYName: string;
        static readonly borderTypeName: string;
        static readonly masterIDName: string;
        static readonly masterDiffXName: string;
        static readonly masterDiffYName: string;
        static readonly elementTypeName: string;
        private _observer;
        private _observerFunc;
        private tmpStyle;
        isEmphasized: boolean;
        constructor(parent: Table, _px: number, _py: number, cellClass?: string | null, borderClass?: string | null);
        private readonly innerExtraPaddingLeft;
        private readonly innerExtraPaddingRight;
        readonly masterDiffX: number;
        private setMasterDiffX(id);
        readonly masterDiffY: number;
        private setMasterDiffY(id);
        readonly masterCellX: number;
        private setMasterCellX(id);
        readonly masterCellY: number;
        private setMasterCellY(id);
        readonly masterID: number;
        readonly master: Cell;
        private _borders;
        topBorder: SVGLineElement;
        leftBorder: SVGLineElement;
        rightBorder: SVGLineElement;
        bottomBorder: SVGLineElement;
        private _table;
        readonly table: Table;
        private _svgBackground;
        readonly svgBackground: SVGRectElement;
        private _svgText;
        readonly svgText: SVGTextElement;
        private _svgGroup;
        readonly svgGroup: SVGGElement;
        readonly fontSize: number;
        readonly paddingLeft: number;
        readonly paddingRight: number;
        readonly paddingTop: number;
        readonly paddingBottom: number;
        horizontalAnchor: string | null;
        verticalAnchor: string | null;
        cellX: number;
        cellY: number;
        readonly defaultTextClass: string | null;
        readonly defaultBackgroundClass: string | null;
        readonly logicalWidth: number;
        readonly logicalHeight: number;
        readonly isLocated: boolean;
        readonly calculatedWidthUsingText: number;
        readonly calculatedHeightUsingText: number;
        calculatedSizeUsingGroup(): [number, number];
        private computeSidePosition(dir);
        readonly isMaster: boolean;
        readonly isSlave: boolean;
        readonly ID: number;
        getNextCell(direction: DirectionType): Cell | null;
        getNextMasterCell(direction: DirectionType): Cell | null;
        readonly topCell: Cell | null;
        readonly leftCell: Cell | null;
        readonly rightCell: Cell | null;
        readonly bottomCell: Cell | null;
        readonly bottomRightCell: Cell | null;
        readonly topRightCell: Cell | null;
        readonly bottomLeftCell: Cell | null;
        readonly topLeftCell: Cell | null;
        readonly topMasterCell: Cell | null;
        readonly leftMasterCell: Cell | null;
        readonly rightMasterCell: Cell | null;
        readonly bottomMasterCell: Cell | null;
        readonly computeGroupWidth: number;
        readonly computeGroupHeight: number;
        readonly GroupRowCount: number;
        readonly GroupColumnCount: number;
        readonly cellsInGroup: Cell[][];
        readonly cellArrayInGroup: Cell[];
        readonly isSingleCell: boolean;
        readonly isRowSingleCell: boolean;
        readonly isColumnSingleCell: boolean;
        private static computeOverlapRange(v, w);
        static computeDisjunction(v: [number, number], w: [number, number]): [number, number] | null;
        readonly groupColumnRange: [number, number];
        readonly groupRowRange: [number, number];
        private computeBorderLength2(dir);
        canMerge(w: number, h: number): boolean;
        merge(w: number, h: number): void;
        getMergedRangeRight(): [number, number] | null;
        getMergedRangeBottom(): [number, number] | null;
        readonly canMergeRight: boolean;
        readonly canMergeBottom: boolean;
        readonly mostRightCellX: number;
        readonly mostBottomCellY: number;
        private getNextGroupCells(direction);
        private readonly leftSideGroupCells;
        private readonly upperSideGroupCells;
        x: number;
        y: number;
        width: number;
        height: number;
        readonly region: Rectangle;
        private static createCellRectangle(className?);
        toPlainText(): string;
        update(): void;
        private groupUpdate();
        private resize();
        private localUpdate();
        removeBorder(dir: DirectionType): void;
        removeFromTable(isColumn: boolean): void;
        private relocateTopBorder();
        private relocateLeftBorder();
        private relocateRightBorder();
        private relocateBottomBorder();
        relocation(): void;
        mergeRight(): void;
        mergeBottom(): void;
        private decomposeRow(upperRowCount);
        private decomposeColomn(leftColumnCount);
        updateBorderAttributes(): void;
    }
}
declare namespace GraphTableSVG {
    class Column {
        private readonly table;
        static readonly rowWidthName: string;
        private _svgGroup;
        cellX: number;
        width: number;
        private setWidthToCells();
        readonly cells: Cell[];
        constructor(_table: Table, _x: number, _width?: number);
        private getMaxWidth();
        update(): void;
        resize(): void;
        fitWidthToOriginalCell(allowShrink: boolean): void;
        setX(posX: number): void;
        readonly leftBorders: SVGLineElement[];
        readonly rightBorders: SVGLineElement[];
        readonly topBorder: SVGLineElement;
        readonly bottomBorder: SVGLineElement;
        remove(isUnit?: boolean): void;
        relocation(): void;
        readonly groupColumnRange: [number, number];
    }
}
declare namespace GraphTableSVG {
    class Row {
        private readonly table;
        private _svgGroup;
        static readonly columnHeightName: string;
        cellY: number;
        height: number;
        constructor(_table: Table, _y: number, _height?: number);
        readonly cells: Cell[];
        readonly topBorders: SVGLineElement[];
        readonly bottomBorders: SVGLineElement[];
        readonly leftBorder: SVGLineElement;
        readonly rightBorder: SVGLineElement;
        setHeightToCells(): void;
        update(): void;
        resize(): void;
        fitHeightToOriginalCell(allowShrink: boolean): void;
        setY(posY: number): void;
        private getMaxHeight();
        remove(isUnit?: boolean): void;
        relocation(): void;
        readonly groupRowRange: [number, number];
    }
}
declare namespace GraphTableSVG {
    class Table {
        private static readonly defaultCellClass;
        private static readonly defaultBorderClass;
        private _svgGroup;
        readonly svgGroup: SVGGElement;
        private _svgHiddenGroup;
        readonly svgHiddenGroup: SVGGElement;
        private _rows;
        readonly rows: Row[];
        private _columns;
        readonly columns: Column[];
        private _cells;
        readonly cells: Cell[][];
        private _isDrawing;
        readonly isDrawing: boolean;
        private _isAutoResized;
        isAutoResized: boolean;
        private _cellTextObserver;
        readonly cellTextObserver: MutationObserver;
        private _cellTextObserverFunc;
        fitSizeToOriginalCells(allowShrink: boolean): void;
        x: number;
        y: number;
        readonly defaultCellClass: string | null;
        readonly defaultBorderClass: string | null;
        readonly columnCount: number;
        readonly rowCount: number;
        getTryCell(x: number, y: number): Cell | null;
        getRangeCells(x: number, y: number, width: number, height: number): Cell[][];
        getRangeCellArray(x: number, y: number, width: number, height: number): Cell[];
        readonly cellArray: Cell[];
        readonly borders: SVGLineElement[];
        getRegion(): Rectangle;
        constructor(svgbox: HTMLElement, option?: {
            tableClassName?: string;
            rowCount?: number;
            columnCount?: number;
            x?: number;
            y?: number;
            rowHeight?: number;
            columnWidth?: number;
        });
        constructFromLogicTable(table: LogicTable): void;
        construct(table: string[][], option?: {
            tableClassName?: string;
            x?: number;
            y?: number;
            rowHeight?: number;
            columnWidth?: number;
            isLatexMode?: boolean;
        }): void;
        createVBACode(id: number, slide: string): string[];
        private createVBAMainCode(slideName, id);
        toPlainText(): string;
        getEmphasizedCells(): GraphTableSVG.Cell[];
        update(): void;
        private renumbering();
        private resize();
        private relocation();
        private createCell();
        removeTable(svg: HTMLElement): void;
        setSize(columnCount: number, rowCount: number): void;
        clear(): void;
        insertRow(i: number): void;
        insertColumn(i: number): void;
        private insertRowFunction(i, columnCount?);
        appendColumn(): void;
        appendRow(): void;
    }
}
declare namespace GraphTableSVG {
    class SVGToVBA {
        static create(items: (Graph | Table | SVGPathElement | SVGTextElement)[]): string;
        private static createVBACodeOfSVGPath(path, id);
        private static createVBACodeOfTextElement(element, id);
        static cellFunctionCode: string;
    }
    function parseInteger(value: string): number;
    function visible(value: string): number;
    class VBATranslateFunctions {
        static grouping80(codes: string[][]): string[];
        static splitCode(codes: string[][], subArg: string, callArg: string, id: number): [string, string];
        static ToFontBold(bold: string): string;
        static ToVerticalAnchor(value: string): string;
        static ToHorizontalAnchor(value: string): string;
        static createStringFunction(item: string): string;
        static createArrayFunction(items: any[]): string;
        static createStringArrayFunction(items: string[]): string;
        static createJagArrayFunction(items: any[][]): string;
        static joinLines(lines: string[]): string;
        static colorToVBA(color: string): string;
        static ToVBAFont(font: string): string;
        static TranslateSVGTextElement(sub: string[][], item: SVGTextElement, range: string): void;
    }
}
declare namespace GraphTableSVG {
    namespace Common {
        function clearGraphTables(svg: HTMLElement, items: (GraphTableSVG.Graph | GraphTableSVG.Table)[]): void;
        function IsDescendantOfBody(node: Node): boolean;
        function getRegion(items: (Graph | Table | SVGPathElement | SVGTextElement)[]): Rectangle;
        function paddingLeft(str: string, n: number, char: string): string;
        function setGraphTableCSS(cellColor: string, borderColor: string): void;
        function getGraphTableCSS(): HTMLElement | null;
    }
}
