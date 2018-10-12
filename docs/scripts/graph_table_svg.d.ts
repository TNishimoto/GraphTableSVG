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
    namespace Common {
        function clearGraphTables(svg: SVGElement, items: (GraphTableSVG.GGraph | GraphTableSVG.GTable)[]): void;
        function IsDescendantOfBody(node: Node): boolean;
        function getRegion(items: VBAObjectType[]): Rectangle;
        function paddingLeft(text: string, length: number, leftChar: string): string;
        function setGraphTableCSS(cellColor: string, borderColor: string): void;
        function getGraphTableCSS(): HTMLElement | null;
        function parseUnit(text: string): [number, string];
        function toPX(value: string): number;
        function bezierLocation([px1, py1]: [number, number], [px2, py2]: [number, number], [px3, py3]: [number, number], t: number): [number, number];
    }
}
declare namespace GraphTableSVG {
    enum VertexOrder {
        Preorder = 0,
        Postorder = 1,
    }
    type CustomTag = "row" | "cell" | "t";
    type ShapeObjectType = "g-callout" | "g-arrow-callout" | "g-ellipse" | "g-rect" | "g-edge" | "g-graph" | "g-table" | "g-object" | "g-path-textbox";
    namespace ShapeObjectType {
        const Callout: ShapeObjectType;
        const ArrowCallout: ShapeObjectType;
        const Ellipse: ShapeObjectType;
        const Rect: ShapeObjectType;
        const Edge: ShapeObjectType;
        const Graph: ShapeObjectType;
        const Table: ShapeObjectType;
        const Object: ShapeObjectType;
        const PathTextBox: ShapeObjectType;
        function toShapeObjectType(value: string): ShapeObjectType | null;
        function toShapeObjectTypeOrCustomTag(value: string): ShapeObjectType | CustomTag | null;
    }
    type PathTextAlighnment = "none" | "begin" | "end" | "center" | "regularInterval";
    namespace PathTextAlighnment {
        const regularInterval: PathTextAlighnment;
        const begin: PathTextAlighnment;
        const end: PathTextAlighnment;
        const center: PathTextAlighnment;
        function toPathTextAlighnment(value: string): PathTextAlighnment;
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
        function toMSODashStyle(value: string): msoDashStyle;
        function setCpmoutedDashArray(svgLine: SVGLineElement | SVGPathElement | SVGElement): void;
        function getLineType(svgLine: SVGLineElement | SVGPathElement | SVGElement): msoDashStyle;
    }
    type Direction = "up" | "left" | "right" | "down";
    namespace Direction {
        function toDirection(value: string | null): Direction;
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
        function ToConnectorPosition(str: string | null): ConnectorPosition;
        function ToVBAConnectorPosition(shapeType: string, str: ConnectorPosition): number;
        function ToVBAConnectorPosition2(shapeType: string, str: ConnectorPosition): number;
    }
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
        function setSVGBoxSize(box: SVGSVGElement, w: number, h: number): void;
        function setSVGBoxSize(box: SVGSVGElement, rect: Rectangle, padding: Padding): void;
        function getURLParameters(): {
            [key: string]: string;
        };
        function setURLParametersToHTMLElements(): void;
        function getInputText(elementID: string): string;
        function getNonNullElementById(id: string): HTMLElement;
    }
}
declare namespace GraphTableSVG {
    namespace GUI {
        function observeSVGBox(svgBox: SVGSVGElement, sizeFunc: () => GraphTableSVG.Rectangle, padding?: GraphTableSVG.Padding): void;
        function observeSVGSVG(svgBox: SVGSVGElement, padding?: GraphTableSVG.Padding): void;
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
    class Size {
        width: number;
        height: number;
        constructor(width?: number, height?: number);
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
    class GObject {
        protected _svgSurface: SVGElement | null;
        protected _tag: any;
        private _svgGroup;
        protected _observer: MutationObserver;
        protected _observerOption: MutationObserverInit;
        constructor(svgbox: SVGElement | string, option?: GObjectAttributes);
        protected groupObserverOption: MutationObserverInit;
        private removeResizeEvent();
        private addResizeEvent();
        private pUpdateFunc;
        protected resizeUpdate(): void;
        initializeOption(option: GObjectAttributes): GObjectAttributes;
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GObjectAttributes): GObjectAttributes;
        tag: any;
        readonly isShow: boolean;
        readonly svgGroup: SVGGElement;
        readonly isLocated: boolean;
        readonly svgSurface: SVGElement | null;
        cx: number;
        cy: number;
        width: number;
        height: number;
        fixedX: number | null;
        fixedY: number | null;
        x: number;
        y: number;
        readonly type: ShapeObjectType;
        protected createSurface(svgbox: SVGElement, option?: GObjectAttributes): void;
        protected setClassNameOfSVGGroup(): void;
        private observerFunc;
        protected observerFunction(x: MutationRecord[]): void;
        dispose(): void;
        readonly isDisposed: boolean;
        readonly objectID: string;
        createVBACode(id: number): string[];
        readonly VBAObjectNum: number;
        protected dispatchObjectCreatedEvent(): void;
        protected _isUpdating: boolean;
        protected update(): void;
        protected updateAttributes: string[];
        protected dispatchConnectPositionChangedEvent(): void;
        readonly hasSize: boolean;
        private static objectDic;
        static getObjectFromObjectID(id: string | SVGElement): GObject | null;
        static setObjectFromObjectID(obj: GObject): void;
        static getObjectFromID(id: string): GObject | null;
        getRegion(): Rectangle;
    }
}
declare namespace GraphTableSVG {
    class GTextBox extends GObject {
        private _svgText;
        private isFixTextSize;
        protected surfaceAttributes: string[];
        private _textObserver;
        private static updateTextAttributes;
        constructor(svgbox: SVGElement | string, option?: GTextBoxAttributes);
        initializeOption(option: GObjectAttributes): GObjectAttributes;
        private static createSVGText(className, style);
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GTextBoxAttributes): GTextBoxAttributes;
        readonly svgText: SVGTextElement;
        protected textObserverFunc: MutationCallback;
        horizontalAnchor: HorizontalAnchor;
        verticalAnchor: VerticalAnchor;
        isAutoSizeShapeToFitText: boolean;
        protected update(): void;
        protected updateSurface(): void;
        protected updateToFitText(): void;
        readonly marginPaddingTop: number;
        readonly marginPaddingLeft: number;
        readonly marginPaddingRight: number;
        readonly marginPaddingBottom: number;
        readonly innerRectangle: Rectangle;
        private readonly innerRectangleWithoutMargin;
        readonly svgElements: SVGElement[];
        hasDescendant(obj: SVGElement): boolean;
        readonly hasSize: boolean;
        msoDashStyle: msoDashStyle | null;
    }
}
declare namespace GraphTableSVG {
    class GVertex extends GTextBox {
        protected setClassNameOfSVGGroup(): void;
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        getConnectorType(type: ConnectorPosition, x: number, y: number): ConnectorPosition;
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
        readonly outcomingEdges: GEdge[];
        readonly incomingEdges: GEdge[];
        insertOutcomingEdge(edge: GEdge, insertIndex?: number): void;
        removeOutcomingEdge(edge: GEdge): void;
        insertIncomingEdge(edge: GEdge, insertIndex?: number): void;
        removeIncomingEdge(edge: GEdge): void;
        dispose(): void;
        getParents(): GVertex[];
        readonly parentEdge: GEdge | null;
        readonly parent: GVertex | null;
        readonly isNoParent: boolean;
        readonly children: GVertex[];
        readonly isLeaf: boolean;
        readonly tree: VirtualTree;
        readonly region: Rectangle;
        readonly shape: string;
        createVBACode(id: number): string[];
        protected readonly VBAAdjustments: number[];
        private getVBAEditLine();
        readonly graph: GGraph | null;
    }
}
declare namespace GraphTableSVG {
    class GPathTextBox extends GVertex {
        readonly svgPath: SVGPathElement;
        constructor(svgbox: SVGElement | string, option?: GTextBoxAttributes);
        protected createSurface(svgbox: SVGElement, option?: GObjectAttributes): void;
        private static createSurfacePath(parent, x, y, x2, y2, className, style);
        initializeOption(option: GObjectAttributes): GObjectAttributes;
        readonly innerRectangle: Rectangle;
        readonly type: ShapeObjectType;
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
    }
}
declare namespace GraphTableSVG {
    class GArrowCallout extends GPathTextBox {
        constructor(svgbox: SVGElement | string, option?: GShapeArrowCalloutAttributes);
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GShapeArrowCalloutAttributes): GShapeArrowCalloutAttributes;
        readonly type: ShapeObjectType;
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
        readonly shape: string;
        protected readonly VBAAdjustments: number[];
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
    }
}
declare namespace GraphTableSVG {
    class GCallout extends GPathTextBox {
        constructor(svgbox: SVGElement | string, option?: GCalloutAttributes);
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GCalloutAttributes): GCalloutAttributes;
        readonly type: ShapeObjectType;
        protected update(): void;
        speakerX: number;
        speakerY: number;
        readonly speakerPosition: SpeakerPosition;
        readonly shape: string;
        protected readonly VBAAdjustments: number[];
    }
}
declare namespace GraphTableSVG {
    class GEdge extends GTextBox {
        constructor(svgbox: SVGElement | string, option?: GEdgeAttributes);
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GEdgeAttributes): GEdgeAttributes;
        initializeOption(option: GObjectAttributes): GObjectAttributes;
        private static connectedBeginVertexDic;
        private static connectedEndVertexDic;
        static getConnectedVertexFromDic(edge: GEdge, isBegin: boolean): GVertex | null;
        static setConnectedVertexFromDic(edge: GEdge, isBegin: boolean): void;
        protected setClassNameOfSVGGroup(): void;
        readonly svgPath: SVGPathElement;
        protected _svgTextPath: SVGTextPathElement;
        readonly svgTextPath: SVGTextPathElement;
        protected createSurface(svgbox: SVGElement, option?: GObjectAttributes): void;
        private static createPath(parent, x, y, x2, y2, className, style);
        readonly type: ShapeObjectType;
        tag: any;
        controlPoint: [number, number][];
        beginConnectorType: ConnectorPosition;
        endConnectorType: ConnectorPosition;
        private beginVertexID;
        private endVertexID;
        markerStart: SVGMarkerElement | null;
        markerEnd: SVGMarkerElement | null;
        private removeVertexEvent(vertex);
        private addVertexEvent(vertex);
        private pUpdateFunc2;
        beginVertex: GVertex | null;
        endVertex: GVertex | null;
        dispose(): void;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        readonly lineColor: string | null;
        private removeTextLengthAttribute();
        private setRegularInterval(value);
        private pathPoints;
        private updateConnectorInfo();
        update(): boolean;
        pathTextAlignment: PathTextAlighnment;
        save(): void;
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
        readonly shape: string;
        createVBACode(id: number): string[];
        readonly hasSize: boolean;
        createVBACodeOfText(id: number): string[][];
    }
}
declare namespace GraphTableSVG {
    class GEllipse extends GVertex {
        readonly svgEllipse: SVGEllipseElement;
        constructor(svgbox: SVGElement | string, option?: GTextBoxAttributes);
        protected createSurface(svgbox: SVGElement, option?: GObjectAttributes): void;
        private static createEllipse(parent, className, style);
        static constructAttributes(e: SVGElement, removeAttributes?: boolean, output?: GTextBoxAttributes): GCalloutAttributes;
        readonly innerRectangle: Rectangle;
        width: number;
        height: number;
        readonly rx: number;
        readonly ry: number;
        readonly type: ShapeObjectType;
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
        readonly shape: string;
    }
}
declare namespace GraphTableSVG {
    class GGraph extends GObject {
        readonly vertices: GVertex[];
        readonly edges: GEdge[];
        readonly roots: GVertex[];
        protected _roots: GVertex[];
        constructor(box: SVGElement | string, option?: GTextBoxAttributes);
        vertexXInterval: number | null;
        vertexYInterval: number | null;
        defaultVertexClass: string | null;
        defaultEdgeClass: string | null;
        readonly rootVertex: GVertex | null;
        add(item: GVertex | GEdge): void;
        remove(item: GVertex | GEdge): void;
        clear(): void;
        connect(beginVertex: GVertex, edge: GEdge, endVertex: GVertex, option?: ConnectOption): void;
        getOrderedVertices(order: VertexOrder, node?: GVertex | null): GVertex[];
        appendChild(parent: GVertex, child: GVertex | null, option?: {
            insertIndex?: number;
        }): void;
        relocateAttribute: string | null;
        relocate(): void;
        constructFromLogicTree(roots: LogicTree[] | LogicTree, option?: {
            x?: number;
            y?: number;
            isLatexMode?: boolean;
        }): void;
        removeGraph(svg: SVGElement): void;
        getRegion(): Rectangle;
        private createChildFromLogicTree<T>(parent, logicVertex, option?);
        createVBACode(id: number): string[];
        readonly VBAObjectNum: number;
        getStyleValue(className: string, valueName: string): string | null;
        protected dispatchVertexCreatedEvent(vertex: GVertex): void;
        private objectCreatedFunction;
        setRootIndex(vertex: GVertex, rootIndex: number): void;
        protected observerFunction(x: MutationRecord[]): void;
        readonly type: ShapeObjectType;
        protected resizeUpdate(): void;
    }
}
declare namespace GraphTableSVG {
    class GRect extends GVertex {
        readonly svgRectangle: SVGRectElement;
        constructor(svgbox: SVGElement | string, option?: GTextBoxAttributes);
        protected createSurface(svgbox: SVGElement, option?: GObjectAttributes): void;
        private static createRectangle(parent, className, style);
        static constructAttributes(e: SVGElement, removeAttributes?: boolean, output?: GTextBoxAttributes): GCalloutAttributes;
        readonly type: ShapeObjectType;
        readonly innerRectangle: Rectangle;
        width: number;
        height: number;
        protected updateSurface(): void;
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
        readonly shape: string;
    }
}
declare namespace GraphTableSVG {
    namespace TreeArrangement {
        function reverse(graph: GGraph, isX: boolean, isY: boolean): void;
        function alignVerticeByChildren(graph: GGraph): void;
        function standardTreeWidthArrangement(graph: GGraph): void;
        function addOffset(graph: GGraph, x: number, y: number): void;
        function alignVerticeByLeaveSub(forest: GGraph, xInterval: number, yInterval: number): void;
        function alignVerticeByLeave(graph: GGraph): void;
    }
}
declare namespace GraphTableSVG {
    class GTable extends GObject {
        private _svgHiddenGroup;
        private _rows;
        private _columns;
        private _cells;
        constructor(svgbox: SVGElement, option?: TableOption);
        width: number;
        height: number;
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: TableOption): TableOption;
        readonly svgHiddenGroup: SVGGElement;
        readonly type: ShapeObjectType;
        readonly rows: Row[];
        readonly columns: Column[];
        readonly cells: Cell[][];
        private _isDrawing;
        readonly isDrawing: boolean;
        private _isAutoResized;
        isAutoResized: boolean;
        private _cellTextObserver;
        readonly cellTextObserver: MutationObserver;
        private _cellTextObserverFunc;
        fitSizeToOriginalCells(allowShrink: boolean): void;
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
        private updateCellByLogicCell(table, x, y);
        constructFromLogicTable(table: LogicTable): void;
        construct(table: string[][], option?: {
            tableClassName?: string;
            x?: number;
            y?: number;
            rowHeight?: number;
            columnWidth?: number;
            isLatexMode?: boolean;
        }): void;
        createVBACode2(id: number, slide: string): string[];
        private createVBAMainCode(slideName, id);
        toPlainText(): string;
        getEmphasizedCells(): GraphTableSVG.Cell[];
        private prevShow;
        update(): void;
        private renumbering();
        private resize();
        private relocation();
        private createCell();
        removeTable(svg: SVGElement): void;
        private isSetSize;
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
    namespace Parse {
        function parseTree(parseText: string): GraphTableSVG.LogicTree;
        function getParseString(tree: GraphTableSVG.GVertex): string;
    }
}
declare namespace GraphTableSVG {
    class VirtualTree {
        subTreeRoot: GVertex;
        constructor(_root: GVertex);
        readonly children: GVertex[];
        readonly parentEdge: GEdge | null;
        getSubtree(result?: GVertex[]): GVertex[];
        getHeight(): number;
        region(): Rectangle;
        readonly mostLeftLeave: GVertex;
        addOffset(_x: number, _y: number): void;
        setRectangleLocation(_x: number, _y: number): void;
        setRootLocation(_x: number, _y: number): void;
        readonly leaves: GVertex[];
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
        constructor(parent: GTable, _px: number, _py: number, option?: CellOption);
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
        svgTopBorder: SVGLineElement;
        svgLeftBorder: SVGLineElement;
        svgRightBorder: SVGLineElement;
        svgBottomBorder: SVGLineElement;
        private _table;
        readonly table: GTable;
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
        horizontalAnchor: HorizontalAnchor;
        verticalAnchor: VerticalAnchor;
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
        readonly upperSideGroupCells: Cell[];
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
        constructor(_table: GTable, _x: number, _width?: number);
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
        constructor(_table: GTable, _y: number, _height?: number);
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
    type VBAObjectType = SVGPathElement | SVGTextElement | GObject;
    class SVGToVBA {
        static create(items: VBAObjectType[] | VBAObjectType): string;
        static count(items: VBAObjectType[] | VBAObjectType): number;
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
declare namespace HTMLFunctions {
    function getAncestorAttribute(e: HTMLElement | SVGElement, attr: string): string | null;
    function isShow(e: HTMLElement | SVGElement): boolean;
    function getDescendants(e: Element): Element[];
    function getChildren(e: Element): Element[];
    function getChildByNodeName(e: Element, name: string): Element | null;
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
declare namespace GraphTableSVG {
    namespace SVG {
        let idCounter: number;
        function createLine(x: number, y: number, x2: number, y2: number, className?: string | null): SVGLineElement;
        function createText(className?: string | null): SVGTextElement;
        function createRectangle(parent: SVGElement, className?: string | null): SVGRectElement;
        function createGroup(parent: HTMLElement | SVGElement | null): SVGGElement;
        function resetStyle(style: CSSStyleDeclaration): void;
        function createCircle(parent: SVGElement, className?: string | null): SVGCircleElement;
        function createMarker(option?: {
            className?: string;
            strokeWidth?: string;
            color?: string;
        }): [SVGMarkerElement, SVGPathElement];
        function createTextPath(className?: string | null): [SVGTextElement, SVGTextPathElement];
        function createTextPath2(className?: string | null): SVGTextPathElement;
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
        function getRegion2(e: SVGElement): Rectangle;
        function getSVGSVG(e: SVGElement): SVGSVGElement;
        function isSVGSVGHidden(e: SVGElement): boolean;
        function isSVGHidden(e: SVGElement): boolean;
    }
}
interface SVGGElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}
interface SVGElement {
    getPaddingLeft(): number;
    getPaddingTop(): number;
    getPaddingRight(): number;
    getPaddingBottom(): number;
    setPaddingLeft(value: number): void;
    setPaddingTop(value: number): void;
    setPaddingRight(value: number): void;
    setPaddingBottom(value: number): void;
}
interface Element {
    getActiveStyle(): CSSStyleDeclaration;
    getPropertyStyleValue(name: string): string | null;
    getPropertyStyleNumberValue(name: string, defaultValue: number | null): number | null;
    getPropertyStyleValueWithDefault(name: string, defaultValue: string): string;
    setPropertyStyleValue(name: string, value: string | null): void;
    gtGetAttributeNumber(name: string, defaultValue: number | null): number | null;
    gtGetAttributeNumberWithoutNull(name: string, defaultValue: number): number;
    gtGetAttributeNumberWithUndefined(name: string): number | undefined;
    gtGetAttributeStringWithUndefined(name: string): string | undefined;
    gtGetAttributeBooleanWithUndefined(name: string): boolean | undefined;
    gtGetStyleBooleanWithUndefined(name: string): boolean | undefined;
    gtGetAttribute(name: string, defaultValue: string | null): string | null;
    gtGetAttributes(): {
        name: string;
        value: string;
    }[];
    hasStyleAttribute(name: string): boolean;
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
    gtSetXY(rect: GraphTableSVG.Rectangle, vAnchor: GraphTableSVG.VerticalAnchor | null, hAnchor: GraphTableSVG.HorizontalAnchor | null, isAutoSizeShapeToFitText: boolean): void;
}
declare namespace GraphTableSVG {
    namespace SVGTextBox {
        function setTextToSVGText(svgText: SVGTextElement, text: string, isLatexMode: boolean): void;
        function setTextToTextPath(path: SVGTextPathElement, text: string, isLatexMode: boolean): void;
        function sortText(svgText: SVGTextElement, hAnchor: GraphTableSVG.HorizontalAnchor): void;
        function constructSVGTextByHTMLElements(svgText: SVGTextElement, text: HTMLElement[], isLatexMode: boolean): void;
        function getSize(svgText: SVGTextElement): Rectangle;
        function getComputedTextLengthsOfTSpans(svgText: SVGTextElement): Size[];
    }
}
declare namespace GraphTableSVG {
    type GObjectAttributes = {
        cx?: number;
        cy?: number;
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        id?: string;
        groupClass?: string;
        surfaceClass?: string;
        groupStyle?: string;
        surfaceStyle?: string;
    };
    type GObjectMaps = {
        groupAttributes?: Map<string, string>;
        surfaceAttributes?: Map<string, string>;
        textAttributes?: Map<string, string>;
    };
    type GTextBoxAttributes = GObjectAttributes & {
        text?: string | HTMLElement[];
        isAutoSizeShapeToFitText?: boolean;
        verticalAnchor?: VerticalAnchor;
        horizontalAnchor?: HorizontalAnchor;
        textClass?: string;
        textStyle?: string;
    };
    type GShapeArrowCalloutAttributes = GTextBoxAttributes & {
        arrowHeadWidth?: number;
        arrowHeadHeight?: number;
        arrowNeckWidth?: number;
        arrowNeckHeight?: number;
        direction?: Direction;
    };
    type GCalloutAttributes = GTextBoxAttributes & {
        speakerX?: number;
        speakerY?: number;
    };
    type GEdgeAttributes = GTextBoxAttributes & {
        startMarker?: boolean;
        endMarker?: boolean;
        x1?: number;
        x2?: number;
        x3?: number;
        y1?: number;
        y2?: number;
        y3?: number;
        beginConnectorType?: ConnectorPosition;
        endConnectorType?: ConnectorPosition;
        beginVertex?: GVertex | string;
        endVertex?: GVertex | string;
        pathTextAlignment?: PathTextAlighnment;
    };
    type CellOption = {
        cellClass?: string;
        borderClass?: string;
    };
    type ConnectOption = {
        outcomingInsertIndex?: number;
        incomingInsertIndex?: number;
        beginConnectorType?: GraphTableSVG.ConnectorPosition;
        endConnectorType?: GraphTableSVG.ConnectorPosition;
    };
    type TableOption = GObjectAttributes & {
        rowCount?: number;
        columnCount?: number;
        rowHeight?: number;
        columnWidth?: number;
        table?: LogicTable;
    };
    namespace openSVGFunctions {
        function getTNodes(e: Element): HTMLElement[] | null;
    }
    function openCustomElement(id: string | SVGElement): GObject | null;
    function openSVG(id?: string | Element | null, output?: GObject[], shrink?: boolean): GObject[];
    function createShape(parent: SVGElement | string | GObject, type: ShapeObjectType, option?: any): GObject;
    function createVertex(parent: GGraph, option?: GTextBoxAttributes): GVertex;
    function toHTMLUnknownElement(e: Element): void;
}
declare namespace GraphTableSVG {
    namespace CustomAttributeNames {
        namespace Style {
            const autoSizeShapeToFitText: string;
            const beginConnectorType: string;
            const endConnectorType: string;
            const defaultLineClass: string;
            const markerStart: string;
            const markerEnd: string;
            const defaultVertexClass: string;
            const defaultEdgeClass: string;
            const vertexXInterval: string;
            const vertexYInterval: string;
            const defaultRadius = "--default-radius";
            const defaultWidth = "--default-width";
            const defaultHeight = "--default-height";
            const defaultTextClass: string;
            const defaultPathClass: string;
            const defaulSurfaceClass: string;
            const defaultSurfaceType: string;
            const defaultCellClass: string;
            const defaultBorderClass: string;
            const paddingTop: string;
            const paddingLeft: string;
            const paddingRight: string;
            const paddingBottom: string;
            const marginTop: string;
            const marginLeft: string;
            const marginRight: string;
            const marginBottom: string;
            const VerticalAnchor: string;
            const HorizontalAnchor: string;
            const PathTextAlignment: string;
            const msoDashStyleName = "--stroke-style";
            const relocateName = "--relocate";
        }
        const beginNodeName: string;
        const endNodeName: string;
        const controlPointName: string;
        const connectPositionChangedEventName = "connect_position_changed";
        const resizeName = "resized";
        const vertexCreatedEventName = "vertex_created";
        const objectCreatedEventName = "object_created";
        const GroupAttribute = "data-group-type";
        const objectIDName: string;
        const customElement: string;
        let defaultCircleRadius: number;
    }
}
declare namespace GraphTableSVG {
    class LogicCell {
        text: string | null;
        cellClass: string | null;
        textClass: string | null;
        backgroundClass: string | null;
        topBorderClass: string | null;
        leftBorderClass: string | null;
        rightBorderClass: string | null;
        bottomBorderClass: string | null;
        svgText: SVGTextElement | null;
        connectedColumnCount: number;
        connectedRowCount: number;
        tTexts: HTMLElement[] | null;
        item: any;
        isLatexMode: boolean;
        constructor();
        set(text?: string | undefined, isLatexMode?: boolean, cellClass?: string | undefined, backgroundClass?: string | undefined, textClass?: string | undefined, topBorderClass?: string | undefined, leftBorderClass?: string | undefined, rightBorderClass?: string | undefined, bottomBorderClass?: string | undefined): void;
        createTextElement(svgText: SVGTextElement): void;
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
}
