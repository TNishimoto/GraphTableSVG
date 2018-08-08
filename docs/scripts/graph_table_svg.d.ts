declare namespace GraphTableSVG {
    namespace Color {
        function createHexCodeFromColorName(colorName: string): string;
        function createHexFromColorName(colorName: string): {
            r: number;
            g: number;
            b: number;
        } | null;
        function createRGBCodeFromColorName(colorName: string): string;
        function createRGBFromColorName(str: string): {
            r: number;
            g: number;
            b: number;
        };
    }
}
declare namespace GraphTableSVG {
    enum VertexOrder {
        Preorder = 0,
        Postorder = 1,
    }
    type ShapeObjectType = "g-callout" | "g-sarrowcallout" | "g-ellipse" | "g-rect" | "g-line";
    namespace ShapeObjectType {
        const Callout: ShapeObjectType;
        const ShapeArrowCallout: ShapeObjectType;
        const Ellipse: ShapeObjectType;
        const Rect: ShapeObjectType;
        const Line: ShapeObjectType;
        function toShapeObjectType(value: string): ShapeObjectType | null;
    }
    type pathTextAlighnment = "none" | "begin" | "end" | "center" | "regularInterval";
    namespace pathTextAlighnment {
        const regularInterval: pathTextAlighnment;
        const begin: pathTextAlighnment;
        const end: pathTextAlighnment;
        const center: pathTextAlighnment;
        function toPathTextAlighnment(value: string): pathTextAlighnment;
    }
    type msoDashStyle = "msoLineDash" | "msoLineDashDot" | "msoLineDashDotDot" | "msoLineLongDash" | "msoLineLongDashDot" | "msoLineRoundDot" | "msoLineSolid" | "msoLineSquareDot";
    namespace msoDashStyle {
        const msoLineDash: msoDashStyle;
        const msoLineDashDot: msoDashStyle;
        const msoLineDashDotDot: msoDashStyle;
        const msoLineLongDash: msoDashStyle;
        const msoLineLongDashDot: msoDashStyle;
        const msoLineRoundDot: msoDashStyle;
        const msoLineSolid: msoDashStyle;
        const msoLineSquareDot: msoDashStyle;
        const dashArrayDic: {
            [key: string]: number[];
        };
        function toMSODashStyle(value: string): msoDashStyle | null;
        function setStyle(svgLine: SVGLineElement | SVGPathElement | SVGElement, type: string): void;
        function getLineType(svgLine: SVGLineElement | SVGPathElement | SVGElement): msoDashStyle;
    }
    type Direction = "up" | "left" | "right" | "down";
    namespace Direction {
        function toDirection(value: string): Direction;
    }
    type SpeakerPosition = "upleft" | "upright" | "leftup" | "leftdown" | "rightup" | "rightdown" | "downleft" | "downright" | "inner";
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
    const HorizontalAnchorPropertyName: string;
    const PathTextAlignmentName: string;
    type VerticalAnchor = "top" | "middle" | "bottom";
    namespace VerticalAnchor {
        const Top: VerticalAnchor;
        const Middle: VerticalAnchor;
        const Bottom: VerticalAnchor;
        function toVerticalAnchor(value: string): VerticalAnchor;
    }
    type HorizontalAnchor = "left" | "center" | "right";
    namespace HorizontalAnchor {
        const Left: HorizontalAnchor;
        const Center: HorizontalAnchor;
        const Right: HorizontalAnchor;
        function toHorizontalAnchor(value: string): HorizontalAnchor;
    }
    function parsePXString(item: string | null): number;
}
declare namespace GraphTableSVG {
    namespace GUI {
        function createMacroModal(vbaCode: string): void;
        function removeMacroModal(): void;
        function copyAndCloseMacroModal(): void;
        function setSVGBoxSize(box: HTMLElement, w: number, h: number): void;
        function setSVGBoxSize(box: HTMLElement, rect: Rectangle, padding: Padding): void;
        function getURLParameters(): {
            [key: string]: string;
        };
        function setURLParametersToHTMLElements(): void;
        function getInputText(elementID: string): string;
        function getNonNullElementById(id: string): HTMLElement;
        function observeSVGBox(svgBox: HTMLElement, sizeFunc: () => GraphTableSVG.Rectangle, padding?: GraphTableSVG.Padding): void;
    }
}
declare namespace GraphTableSVG {
    class LogicTree {
        vertexText: string | null;
        parentEdgeText: string | null;
        vertexClass: string | null;
        parentEdgeClass: string | null;
        children: (LogicTree | null)[];
        item: any;
        constructor(option?: {
            item?: any;
            children?: (LogicTree | null)[];
            vertexText?: string;
            parentEdgeText?: string;
        });
        getOrderedNodes(order: VertexOrder): LogicTree[];
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
        const defaultTextClass: string;
        const defaultPathClass: string;
        const defaulSurfaceClass: string;
        const objectIDName: string;
        let idCounter: number;
        function createLine(x: number, y: number, x2: number, y2: number, className?: string | null): SVGLineElement;
        const msoDashStyleName = "--stroke-style";
        function createPath(parent: SVGElement | HTMLElement, x: number, y: number, x2: number, y2: number, className?: string | null): SVGPathElement;
        function createText(className?: string | null): SVGTextElement;
        function createRectangle(parent: SVGElement, className?: string | null): SVGRectElement;
        function createGroup(parent: HTMLElement | SVGElement | null, className?: string | null): SVGGElement;
        function resetStyle(style: CSSStyleDeclaration): void;
        const defaultRadiusName = "--default-radius";
        const defaultWidthName = "--default-width";
        const defaultHeightName = "--default-height";
        let defaultCircleRadius: number;
        function createCircle(parent: SVGElement, className?: string | null): SVGCircleElement;
        function createEllipse(parent: SVGElement, className?: string | null): SVGEllipseElement;
        function createMarker(option?: {
            className?: string;
            strokeWidth?: string;
            color?: string;
        }): [SVGMarkerElement, SVGPathElement];
        function createTextPath(className?: string | null): [SVGTextElement, SVGTextPathElement];
        function setTextToTextPath(path: SVGTextPathElement, text: string, isLatexMode: boolean): void;
        function setTextToSVGText(svgText: SVGTextElement, text: string, isLatexMode: boolean): void;
        function setClass(svg: SVGElement, className?: string | null): void;
        function setCSSToStyle(svg: HTMLElement, isComplete?: boolean): void;
        function getAllElementStyleMap(item: HTMLElement | string): {
            [key: number]: string;
        };
        function setAllElementStyleMap(item: HTMLElement | string, dic: {
            [key: number]: string;
        }): void;
        function setCSSToAllElementStyles(item: HTMLElement | string, isComplete?: boolean): void;
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
    class PPTextBoxShapeBase {
        private _svgGroup;
        readonly svgGroup: SVGGElement;
        private _svgText;
        readonly svgText: SVGTextElement;
        private _observer;
        private observerFunc;
        readonly surface: SVGElement;
        readonly objectID: string;
        static constructAttributes(e: SVGElement, removeAttributes?: boolean, output?: TextBoxShapeAttributes): TextBoxShapeAttributes;
        protected updateAttributes: string[];
        protected surfaceAttributes: string[];
        readonly isLocated: boolean;
        private _textObserver;
        protected textObserverFunc: MutationCallback;
        private static updateTextAttributes;
        readonly type: string;
        constructor(svgbox: SVGElement, option?: TextBoxShapeAttributes);
        protected createSurface(svgbox: SVGElement, option?: TextBoxShapeAttributes): void;
        cx: number;
        cy: number;
        width: number;
        height: number;
        readonly x: number;
        readonly y: number;
        horizontalAnchor: HorizontalAnchor;
        verticalAnchor: VerticalAnchor;
        isAutoSizeShapeToFitText: boolean;
        private _isUpdating;
        protected update(): void;
        protected updateSurface(): void;
        protected updateToFitText(): void;
        readonly marginPaddingTop: number;
        readonly marginPaddingLeft: number;
        readonly marginPaddingRight: number;
        readonly marginPaddingBottom: number;
        readonly innerRectangle: Rectangle;
        createVBACode(id: number): string[];
        readonly svgElements: SVGElement[];
        hasDescendant(obj: SVGElement): boolean;
    }
    class PPVertexBase extends PPTextBoxShapeBase {
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        getConnectorType(type: ConnectorPosition, x: number, y: number): ConnectorPosition;
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
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
        static readonly controlPointName: string;
        static readonly markerStartName: string;
        static readonly markerEndName: string;
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
        private removeTextLengthAttribute();
        private setRegularInterval(value);
        update(): boolean;
        pathTextAlignment: pathTextAlighnment;
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
            pathTextAlignment?: pathTextAlighnment;
        }): GraphTableSVG.Edge;
        setIndexDictionaryForVBA(vertexDic: {
            [key: string]: number;
        }, edgeDic: {
            [key: string]: number;
        }): void;
        VBAConnectorNumber: number;
        createVBACode(main: string[], sub: string[][], vertexDic: {
            [key: string]: number;
        }, edgeDic: {
            [key: string]: number;
        }): void;
        createVBACodeOfText(shapes: string, result: string[][]): void;
        private static markerCounter;
        private static createMark(option?);
        static createStartMarker(option?: {
            className?: string;
            strokeWidth?: string;
            color?: string;
        }): SVGMarkerElement;
        static createEndMarker(option?: {
            className?: string;
            strokeWidth?: string;
            color?: string;
        }): SVGMarkerElement;
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
        static readonly defaultVertexClass: string;
        static readonly defaultEdgeClass: string;
        static readonly vertexXIntervalName: string;
        static readonly vertexYIntervalName: string;
        static readonly typeName: string;
        protected _vertices: Vertex[];
        protected _edges: Edge[];
        protected _svgGroup: SVGGElement;
        protected _roots: Vertex[];
        constructor(box: HTMLElement, option?: {
            graphClassName?: string;
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
        getOrderedVertices(order: VertexOrder, node?: Vertex | null): Vertex[];
        save(): void;
        static setXY(text: SVGTextElement, rect: GraphTableSVG.Rectangle, vAnchor: string | null, hAnchor: string | null): void;
        static setXY2(text: SVGTextElement, rect: GraphTableSVG.Rectangle, vAnchor: string | null, hAnchor: string | null, isAutoSizeShapeToFitText: boolean): void;
        createVBACode(id: number): string[];
        constructFromLogicTree(roots: LogicTree[] | LogicTree, option?: {
            x?: number;
            y?: number;
            isLatexMode?: boolean;
        }): void;
        private createChildFromLogicTree<T>(parent, logicVertex, option?);
        appendChild(parent: Vertex, child: Vertex, option?: {
            insertIndex?: number;
        }): void;
        createdNodeCallback: (node: Vertex) => void;
        private _relocateFunction;
        relocateFunction: ((Tree: Graph) => void) | null;
        relocate(): void;
    }
}
declare namespace GraphTableSVG {
    namespace GraphArrangement {
    }
    namespace TreeArrangement {
        function alignVerticeByLeaveSub(forest: Graph, xInterval: number, yInterval: number): void;
        function reverse(graph: Graph, isX: boolean, isY: boolean): void;
        function alignVerticeByChildren(graph: GraphTableSVG.Graph): void;
        function standardTreeWidthArrangement(graph: GraphTableSVG.Graph): void;
        function alignVerticeByLeave(graph: GraphTableSVG.Graph): void;
    }
}
declare namespace GraphTableSVG {
    class Tree extends Graph {
    }
    namespace Parse {
        function parseTree(parseText: string): GraphTableSVG.LogicTree;
        function getParseString(tree: GraphTableSVG.Vertex): string;
    }
}
declare namespace GraphTableSVG {
    class Vertex {
        static readonly defaultSurfaceType: string;
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
            isRoot?: boolean;
        }): GraphTableSVG.Vertex;
        insertOutcomingEdge(edge: Edge, insertIndex: number): void;
        removeOutcomingEdge(edge: Edge): void;
        insertIncomingEdge(edge: Edge, insertIndex: number): void;
        removeIncomingEdge(edge: Edge): void;
        dispose(): void;
        readonly isDisposed: boolean;
        setIndexDictionaryForVBA(vertexDic: {
            [key: string]: number;
        }, edgeDic: {
            [key: string]: number;
        }): void;
        createVBACode(main: string[], sub: string[][], vertexDic: {
            [key: string]: number;
        }, edgeDic: {
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
    type VBAObjectType = Graph | Table | SVGPathElement | SVGTextElement | PPTextBoxShapeBase;
    class SVGToVBA {
        static create(items: VBAObjectType[] | VBAObjectType): string;
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
        private static getFont(css);
        static TranslateSVGTextElement2(item: SVGTextElement, range: string): string[];
    }
}
declare namespace GraphTableSVG {
    namespace Common {
        function clearGraphTables(svg: HTMLElement, items: (GraphTableSVG.Graph | GraphTableSVG.Table)[]): void;
        function IsDescendantOfBody(node: Node): boolean;
        function getRegion(items: (Graph | Table | SVGPathElement | SVGTextElement)[]): Rectangle;
        function paddingLeft(text: string, length: number, leftChar: string): string;
        function setGraphTableCSS(cellColor: string, borderColor: string): void;
        function getGraphTableCSS(): HTMLElement | null;
        function parseUnit(text: string): [number, string];
        function toPX(value: string): number;
        function bezierLocation([px1, py1]: [number, number], [px2, py2]: [number, number], [px3, py3]: [number, number], t: number): [number, number];
    }
}
declare namespace GraphTableSVG {
    namespace PNG {
        function copyCSStoStyle(svg: HTMLElement): void;
        function createCanvasFromImage(img: HTMLImageElement): HTMLCanvasElement;
        function setSaveEvent(img: HTMLImageElement, canvas: HTMLCanvasElement): void;
        function createPNGFromSVG(id: string): HTMLCanvasElement;
        function getImage(svgBox: HTMLElement): HTMLImageElement;
    }
}
declare namespace GraphTableSVG {
    class PPPathTextBox extends PPVertexBase {
        private _svgPath;
        readonly svgPath: SVGPathElement;
        constructor(svgbox: SVGElement, option?: TextBoxShapeAttributes);
        protected createSurface(svgbox: SVGElement, option?: TextBoxShapeAttributes): void;
        readonly innerRectangle: Rectangle;
        protected readonly shape: string;
        readonly surface: SVGElement;
        private getVBAEditLine(id);
        createVBACode(id: number): string[];
        protected readonly VBAAdjustments: number[];
        readonly type: string;
    }
}
declare namespace GraphTableSVG {
    class Callout extends PPPathTextBox {
        constructor(svgbox: SVGSVGElement, option?: CalloutAttributes);
        static constructAttributes(e: SVGElement, removeAttributes?: boolean, output?: CalloutAttributes): CalloutAttributes;
        static openCustomElement(e: SVGElement): Callout;
        readonly type: string;
        protected update(): void;
        speakerX: number;
        speakerY: number;
        readonly speakerPosition: SpeakerPosition;
        protected readonly shape: string;
        protected readonly VBAAdjustments: number[];
    }
}
declare namespace GraphTableSVG {
    class PPEdge extends PPPathTextBox {
        protected _svgTextPath: SVGTextPathElement;
        readonly svgTextPath: SVGTextPathElement;
        tag: any;
        markerStart: SVGMarkerElement | null;
        markerEnd: SVGMarkerElement | null;
        controlPoint: [number, number][];
        readonly lineColor: string | null;
        private _beginVertex;
        private _endVertex;
        static constructAttributes(e: SVGElement, removeAttributes?: boolean, output?: PPEdgeAttributes): PPEdgeAttributes;
        constructor(svgbox: SVGElement, option?: PPEdgeAttributes);
        beginConnectorType: ConnectorPosition;
        endConnectorType: ConnectorPosition;
        beginVertex: Vertex | null;
        endVertex: Vertex | null;
        dispose(): void;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        private removeTextLengthAttribute();
        private setRegularInterval(value);
        private parsePoints();
        private setPoints(points);
        update(): boolean;
        pathTextAlignment: pathTextAlighnment;
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
            pathTextAlignment?: pathTextAlighnment;
        }): GraphTableSVG.Edge;
        setIndexDictionaryForVBA(vertexDic: {
            [key: string]: number;
        }, edgeDic: {
            [key: string]: number;
        }): void;
        VBAConnectorNumber: number;
        private static markerCounter;
        private static createMark(option?);
        static createStartMarker(option?: {
            className?: string;
            strokeWidth?: string;
            color?: string;
        }): SVGMarkerElement;
        static createEndMarker(option?: {
            className?: string;
            strokeWidth?: string;
            color?: string;
        }): SVGMarkerElement;
    }
}
declare namespace GraphTableSVG {
    class PPEllipse extends PPVertexBase {
        private _svgEllipse;
        readonly svgEllipse: SVGEllipseElement;
        readonly surface: SVGElement;
        constructor(svgbox: SVGElement, option?: TextBoxShapeAttributes);
        protected createSurface(svgbox: SVGElement, option?: TextBoxShapeAttributes): void;
        static constructAttributes(e: SVGElement, removeAttributes?: boolean, output?: TextBoxShapeAttributes): CalloutAttributes;
        readonly innerRectangle: Rectangle;
        width: number;
        height: number;
    }
}
declare namespace GraphTableSVG {
    class PPRectangle extends PPVertexBase {
        private _svgRectangle;
        readonly svgRectangle: SVGRectElement;
        readonly surface: SVGElement;
        constructor(svgbox: SVGElement, option?: TextBoxShapeAttributes);
        protected createSurface(svgbox: SVGElement, option?: TextBoxShapeAttributes): void;
        static constructAttributes(e: SVGElement, removeAttributes?: boolean, output?: TextBoxShapeAttributes): CalloutAttributes;
        readonly innerRectangle: Rectangle;
        width: number;
        height: number;
        protected updateSurface(): void;
    }
}
declare namespace GraphTableSVG {
    class ShapeArrowCallout extends PPPathTextBox {
        constructor(svgbox: SVGSVGElement, option?: ShapeArrowCalloutAttributes);
        static constructAttributes(e: SVGElement, removeAttributes?: boolean, output?: ShapeArrowCalloutAttributes): ShapeArrowCalloutAttributes;
        static openCustomElement(e: SVGElement): ShapeArrowCallout;
        readonly type: string;
        arrowNeckWidth: number;
        arrowNeckHeight: number;
        arrowHeadWidth: number;
        arrowHeadHeight: number;
        direction: Direction;
        readonly innerRectangle: Rectangle;
        protected readonly boxHeight: number;
        protected readonly boxWidth: number;
        protected updateToFitText(): void;
        protected update(): void;
        protected readonly shape: string;
        protected readonly VBAAdjustments: number[];
    }
}
declare namespace GraphTableSVG {
    type TextBoxShapeAttributes = {
        className?: string;
        cx?: number;
        cy?: number;
        width?: number;
        height?: number;
        text?: string;
        isAutoSizeShapeToFitText?: boolean;
    };
    type ShapeArrowCalloutAttributes = TextBoxShapeAttributes & {
        arrowHeadWidth?: number;
        arrowHeadHeight?: number;
        arrowNeckWidth?: number;
        arrowNeckHeight?: number;
        direction?: Direction;
    };
    type CalloutAttributes = TextBoxShapeAttributes & {
        speakerX?: number;
        speakerY?: number;
    };
    type PPEdgeAttributes = TextBoxShapeAttributes & {
        startMarker?: boolean;
        endMarker?: boolean;
        x1?: number;
        x2?: number;
        y1?: number;
        y2?: number;
    };
    function openCustomElement(id: string | SVGElement): any;
    function openSVG(id: string | SVGSVGElement): any[];
}
declare namespace HTMLFunctions {
    function getAncestorAttribute(e: HTMLElement | SVGElement, attr: string): string | null;
    function getDescendants(e: Element): Element[];
    function getChildren(e: Element): Element[];
}
interface PPTextboxShape {
    width: number;
    height: number;
    readonly svgText: SVGTextElement;
    readonly svgGroup: SVGGElement;
    cx: number;
    cy: number;
    x: number;
    y: number;
}
interface CSSStyleDeclaration {
    tryGetPropertyValue(name: string): string | null;
}
interface SVGTextPathElement {
    setTextContent(text: string, isLatexMode: boolean): void;
    setTextContent(text: string): void;
}
interface SVGLineElement {
    setEmphasis(b: boolean): void;
    getEmphasis(): boolean;
}
interface SVGPathElement {
    setPathLocations(points: [number, number][]): void;
    getPathLocations(): [number, number][];
}
interface SVGGElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}
interface SVGElement {
    getActiveStyle(): CSSStyleDeclaration;
    getPropertyStyleValue(name: string): string | null;
    getPropertyStyleNumberValue(name: string, defaultValue: number): number | null;
    getPropertyStyleValueWithDefault(name: string, defaultValue: string): string;
    setPropertyStyleValue(name: string, value: string | null): void;
    gtGetAttributeNumber(name: string, defaultValue: number | null): number | null;
    gtGetAttribute(name: string, defaultValue: string | null): string | null;
    gtGetAttributes(): {
        name: string;
        value: string;
    }[];
}
interface SVGElement {
    getPaddingLeft(): number;
    getPaddingTop(): number;
    getPaddingRight(): number;
    getPaddingBottom(): number;
}
interface SVGTextElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
    setTextContent(text: string, isLatexMode: boolean): void;
    setTextContent(text: string): void;
    getMarginLeft(): number;
    setMarginLeft(value: number): void;
    getMarginTop(): number;
    setMarginTop(value: number): void;
    getMarginRight(): number;
    setMarginRight(value: number): void;
    getMarginBottom(): number;
    setMarginBottom(value: number): void;
}
