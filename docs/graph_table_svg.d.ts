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
    /**
    ノードの並び順です。
    */
    enum NodeOrder {
        Preorder = 0,
        Postorder = 1,
    }
    /**
    Vertexの接続位置を表す値です。
    */
    enum ConnectorPosition {
        /**
        上を表します。
        */
        Top = 1,
        /**
        左上を表します。
        */
        LeftUp = 2,
        /**
        左を表します。
        */
        Left = 3,
        /**
        左下を表します。
        */
        LeftDown = 4,
        /**
        下を表します。
        */
        Bottom = 5,
        /**
        右下を表します。
        */
        RightDown = 6,
        /**
        右を表します。
        */
        Right = 7,
        /**
        右上を表します。
        */
        RightUp = 8,
        /**
        ノードの位置によって自動判定
        */
        Auto = 9,
    }
    function ToConnectorPosition(str: string | null): ConnectorPosition;
    function ToStrFromConnectorPosition(position: ConnectorPosition): string;
    const VerticalAnchorPropertyName: string;
    /**
    垂直方向の配置位置を表す値です。
    */
    type VerticalAnchor = "top" | "middle" | "bottom";
    namespace VerticalAnchor {
        /**
         * 上を表します。
         */
        const Top: VerticalAnchor;
        /**
         * 真ん中を表します。
         */
        const Middle: VerticalAnchor;
        /**
         * 底を表します。
         */
        const Bottom: VerticalAnchor;
    }
    const HorizontalAnchorPropertyName: string;
    /**
    水平方向の配置位置を表す値です。
    */
    type HorizontalAnchor = "left" | "center" | "right";
    namespace HorizontalAnchor {
        /**
         * 左を表します。
         */
        const Left: HorizontalAnchor;
        /**
         * 中央を表します。
         */
        const Center: HorizontalAnchor;
        /**
        * 右を表します。
        */
        const Right: HorizontalAnchor;
    }
    function parsePXString(item: string | null): number;
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
        private _observer;
        private observerFunc;
        private _beginVertex;
        private _endVertex;
        private _graph;
        private _svgGroup;
        readonly svgGroup: SVGGElement;
        protected _text: EdgeText | null;
        text: EdgeText | null;
        constructor(__graph: Graph, g: SVGGElement);
        /**
        開始接点の接続位置を返します。
        */
        /**
        開始接点の接続位置を設定します。
        */
        beginConnectorType: ConnectorPosition;
        /**
        終了接点の接続位置を返します。
        */
        /**
        終了接点の接続位置を設定します。
        */
        endConnectorType: ConnectorPosition;
        /**
        開始接点を返します。
        */
        /**
        開始接点を設定します。
        */
        beginVertex: Vertex | null;
        /**
        終了接点を返します。
        */
        /**
        終了接点を設定します。
        */
        endVertex: Vertex | null;
        /**
        所属しているグラフを返します。
        */
        readonly graph: Graph | null;
        /**
         * この辺を廃棄します。廃棄した辺はグラフから取り除かれます。
         */
        dispose(): void;
        /**
        この辺が廃棄されているときTrueを返します。
        */
        readonly isDisposed: boolean;
        /**
        開始位置のX座標を返します。
        */
        readonly x1: number;
        /**
        開始位置のY座標を返します。
        */
        readonly y1: number;
        /**
        終了位置のX座標を返します。
        */
        readonly x2: number;
        /**
        終了位置のY座標を返します。
        */
        readonly y2: number;
        /**
         * 再描画します。
         */
        update(): boolean;
        /**
        ObjectIDを返します。
        */
        readonly objectID: string;
        save(): void;
        /**
         * Edgeを作成します。
         * @param graph
         * @param className
         * @param lineType
         */
        static create(graph: Graph, className?: string | null, defaultSurfaceType?: string | null): GraphTableSVG.Edge;
        createVBACode(main: string[], sub: string[][], indexDic: {
            [key: string]: number;
        }): void;
    }
    class LineEdge extends Edge {
        private _svgLine;
        readonly svgLine: SVGLineElement;
        constructor(__graph: Graph, g: SVGGElement);
        update(): boolean;
        createVBACode(main: string[], sub: string[][], indexDic: {
            [key: string]: number;
        }): void;
    }
    class BezierEdge extends Edge {
        static readonly controlPointName: string;
        private _svgBezier;
        readonly svgBezier: SVGPathElement;
        constructor(__graph: Graph, g: SVGGElement);
        controlPoint: [number, number];
        update(): boolean;
    }
}
declare namespace GraphTableSVG {
    /**
    グラフを表します。
    */
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
        constructor(box: HTMLElement, className?: string | null);
        private updateVertices();
        private updateEdges();
        update(): void;
        vertexXInterval: number | null;
        vertexYInterval: number | null;
        /**
        Vertexインスタンスの生成時、この値がインスタンスのクラス名にセットされます。
        */
        /**
        Vertexインスタンスの生成時のクラス名を設定します。
        */
        defaultVertexClass: string | null;
        /**
        Edgeインスタンスの生成時、この値がインスタンスのクラス名にセットされます。
        */
        /**
        Edgeインスタンスの生成時のクラス名を設定します。
        */
        defaultEdgeClass: string | null;
        /**
        根を返します。
        */
        /**
        根を設定します。
        */
        rootVertex: Vertex | null;
        /**
        根の配列を返します。
        */
        readonly roots: Vertex[];
        /**
        グラフを表すSVGGElementを返します。
        */
        readonly svgGroup: SVGGElement;
        /**
        グラフの頂点を全て返します。
        */
        readonly vertices: Vertex[];
        /**
        グラフの辺を全て返します。
        */
        readonly edges: Edge[];
        /**
         * 頂点もしくは辺をグラフに追加します。
         * @param item
         */
        add(item: Vertex | Edge): void;
        /**
         * 頂点もしくは辺を削除します。
         * @param item
         */
        remove(item: Vertex | Edge): void;
        removeGraph(svg: HTMLElement): void;
        /**
         * グラフの領域を表すRectangleを返します。位置の基準はグラフが追加されているNodeです。
         */
        getRegion(): Rectangle;
        /**
         * ObjectIDから頂点もしくは辺を返します。
         * @param id
         */
        getObjectByObjectID(id: string): Vertex | Edge | null;
        /**
         * 与えられた二つの頂点と辺を接続します。
         * @param node1
         * @param edge
         * @param node2
         * @param outcomingInsertIndex
         * @param incomingInsertIndex
         */
        connect(node1: Vertex, edge: Edge, node2: Vertex, outcomingInsertIndex?: number, incomingInsertIndex?: number): void;
        /**
         * 与えられたNodeOrderに従って与えられた頂点を根とした部分木の整列された頂点配列を返します。
         * @param order
         * @param node
         */
        getOrderedVertices(order: NodeOrder, node?: Vertex | null): Vertex[];
        save(): void;
        static setXY(text: SVGTextElement, rect: GraphTableSVG.Rectangle, vAnchor: string | null, hAnchor: string | null): void;
        static IsDescendantOfBody(node: Node): boolean;
        static getRegion(items: (Graph | Table)[]): Rectangle;
        createVBACode(id: number): string[];
    }
}
declare namespace GraphTableSVG {
    namespace GraphArrangement {
        function leaveBasedArrangement(forest: Graph, xInterval: number, yInterval: number): void;
        function reverse(graph: Graph, isX: boolean, isY: boolean): void;
        function average(items: number[]): number;
        function middle(items: number[]): number;
        function standardTreeArrangement(graph: GraphTableSVG.Graph): void;
    }
}
declare namespace GraphTableSVG {
    class EdgeText {
        private _svgText;
        /**
        テキスト要素を返します。
        */
        readonly svgText: SVGTextElement;
        private _edge;
        /**
        所属している辺を返します。
        */
        readonly edge: Edge;
        constructor(graph: Graph, edge: Edge, text: string);
        /**
        テキストのX座標を返します。
        */
        readonly x: number;
        /**
        テキストのY座標を返します。
        */
        readonly y: number;
        private getCenterPosition();
        /**
         * 再描画します。
         */
        update(): void;
        readonly fontSize: number;
        private static reverse(str);
        createVBACode(shapes: string, result: string[][]): void;
    }
}
declare namespace GraphTableSVG {
    class Vertex {
        static readonly defaultSurfaceType: string;
        static readonly defaultTextClass: string;
        static readonly defaultSurfaceClass: string;
        private static readonly id_counter;
        private _graph;
        protected _outcomingEdges: Edge[];
        protected _incomingEdges: Edge[];
        private _svgGroup;
        private _observer;
        private observerFunc;
        private _textObserver;
        protected textObserverFunc: MutationCallback;
        constructor(__graph: Graph, group: SVGGElement, text: string);
        /**
        所属しているグラフを返します。
        */
        readonly graph: Graph | null;
        /**
        このVertexのグループを返します。
        */
        readonly svgGroup: SVGGElement;
        private _svgText;
        /**
        このVertexのテキストを返します。
        */
        readonly svgText: SVGTextElement;
        /**
        入辺配列を返します。
        */
        readonly outcomingEdges: Edge[];
        /**
        出辺配列を返します。
        */
        readonly incomingEdges: Edge[];
        /**
        テキストの取るべき領域を返します。
        */
        readonly innerRectangle: Rectangle;
        /**
        このVertexがBodyの子孫であるとき、Trueを返します。
        */
        readonly isLocated: boolean;
        /**
        このVertexのObjectIDを返します。
        */
        readonly objectID: string;
        /**
        このVertexのX座標を返します。
        */
        x: number;
        /**
        このVertexのY座標を返します。
        */
        y: number;
        /**
        このVertexの幅を返します。
        */
        readonly width: number;
        /**
        このVertexの高さを返します。
        */
        readonly height: number;
        /**
         * 接続部分のXY座標を返します。
         * @param type
         * @param x
         * @param y
         */
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        getConnectorType(type: ConnectorPosition, x: number, y: number): ConnectorPosition;
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
        /**
        再描画します。
        */
        update(): boolean;
        private localUpdate();
        /**
        このVertexの領域を返します。
        */
        readonly region: Rectangle;
        /**
         * 与えられたObjectIDがこのVertexの中に含まれているときTrueを返します。
         * @param id
         */
        containsObjectID(id: string): boolean;
        /**
        Vertexの輪郭を象っているインスタンスを返します。
        */
        readonly surface: SVGElement | null;
        /**
         * 親Vertex配列を返します。
         */
        getParents(): Vertex[];
        /**
        親との間の辺を返します。
        */
        readonly parentEdge: Edge | null;
        /**
        このVertexの親を返します。
        */
        readonly parent: Vertex | null;
        /**
        このVertexに親がいないときTrueを返します。
        */
        readonly isNoParent: boolean;
        /**
        出辺配列を返します。
        */
        readonly children: Vertex[];
        /**
        このVertexが葉のときTrueを返します。
        */
        readonly isLeaf: boolean;
        /**
        このVertexの根を返します。
        */
        readonly firstNoParent: Vertex;
        readonly tree: VirtualSubTree;
        save(): void;
        /**
         * Vertexインスタンスを生成します。
         * @param graph
         * @param className
         * @param defaultSurfaceType
         *   "circle"ならばSVGCircleElement <br>
         *   "rectangle"ならばSVGRectangleElement
         */
        static create(graph: Graph, className?: string | null, defaultSurfaceType?: string | null): GraphTableSVG.Vertex;
        /**
         * 出辺を挿入します。
         * @param edge
         * @param insertIndex
         */
        insertOutcomingEdge(edge: Edge, insertIndex: number): void;
        /**
         * 出辺を削除します。
         * @param edge
         */
        removeOutcomingEdge(edge: Edge): void;
        /**
         * 入辺を挿入します。
         * @param edge
         * @param insertIndex
         */
        insertIncomingEdge(edge: Edge, insertIndex: number): void;
        /**
         * 入辺を削除します。
         * @param edge
         */
        removeIncomingEdge(edge: Edge): void;
        /**
         * この頂点を廃棄します。廃棄された頂点はグラフから取り除かれます。
         */
        dispose(): void;
        /**
        この頂点が廃棄されていたらTrueを返します。
        */
        readonly isDisposed: boolean;
        createVBACode(main: string[], sub: string[][], indexDic: {
            [key: string]: number;
        }): void;
    }
}
declare namespace GraphTableSVG {
    /**
     * 輪郭が円の頂点です。
     */
    class CircleVertex extends GraphTableSVG.Vertex {
        private _svgCircle;
        readonly svgCircle: SVGCircleElement;
        /**
         *
         * @param ___graph
         * @param className
         * @param text
         */
        constructor(__graph: Graph, group: SVGGElement, text?: string);
        /**
        頂点の幅を返します。
        */
        readonly width: number;
        /**
        頂点の高さを返します。
        */
        readonly height: number;
        /**
        テキストの領域を返します。
        */
        readonly innerRectangle: Rectangle;
        /**
        頂点の半径を返します。
        */
        readonly radius: number;
        /**
         * 接続部分の座標を返します。
         * @param type
         * @param x
         * @param y
         */
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        /**
        頂点の輪郭を返します。
        */
        readonly surface: SVGElement | null;
        private getRadian(x, y);
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
    }
    /**
     * 輪郭が四角形の頂点です。
     */
    class RectangleVertex extends GraphTableSVG.Vertex {
        private _svgRectangle;
        readonly svgRectangle: SVGRectElement;
        constructor(__graph: Graph, group: SVGGElement, text?: string);
        /**
        頂点の幅を返します。
        */
        readonly width: number;
        /**
        頂点の高さを返します。
        */
        readonly height: number;
        /**
        テキストの領域を返します。
        */
        readonly innerRectangle: Rectangle;
        /**
         * 接続部分の座標を返します。
         * @param type
         * @param x
         * @param y
         */
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
    }
}
declare namespace GraphTableSVG {
    class VirtualSubTree {
        subTreeRoot: Vertex;
        constructor(_root: Vertex);
        readonly children: Vertex[];
        readonly parentEdge: Edge | null;
        getSubtree(result?: Vertex[]): Vertex[];
        getLeaves(): Vertex[];
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
    namespace GUI {
        function createMacroModal(text: string): void;
        function removeMacroModal(): void;
        function copyAndCloseMacroModal(): void;
        function setSVGBoxSize(box: HTMLElement, w: number, h: number): void;
        function setSVGBoxSize(box: HTMLElement, rect: Rectangle, padding: Padding): void;
        function GetURLParameters(): Object;
    }
}
declare namespace GraphTableSVG {
    class Cell {
        private static readonly defaultBackgroundClassName;
        private static readonly defaultTextClass;
        private _observer;
        private _observerFunc;
        constructor(parent: Table, _px: number, _py: number, cellClass?: string | null, borderClass?: string | null);
        private readonly innerExtraPaddingLeft;
        private readonly innerExtraPaddingRight;
        private _masterID;
        readonly masterID: number;
        private _topBorder;
        /**
        セルの上にある枠を返します
        */
        /**
        セルの上にある枠を設定します
        */
        topBorder: SVGLineElement;
        private _leftBorder;
        /**
        セルの左にある枠を返します
        */
        /**
        セルの左にある枠を設定します
        */
        leftBorder: SVGLineElement;
        private _rightBorder;
        /**
        セルの右にある枠を返します
        */
        /**
        セルの右にある枠を設定します
        */
        rightBorder: SVGLineElement;
        private _bottomBorder;
        /**
        セルの下にある枠を返します
        */
        /**
        セルの下にある枠を設定します
        */
        bottomBorder: SVGLineElement;
        private _table;
        /**
        所属しているTableを返します。
        */
        readonly table: Table;
        private _svgBackground;
        /**
        セルの背景を表現しているSVGRectElementを返します。
        */
        readonly svgBackground: SVGRectElement;
        private _svgText;
        /**
        セルのテキストを表現しているSVGTextElementを返します。
        */
        readonly svgText: SVGTextElement;
        private _svgGroup;
        /**
        セルを表しているSVGGElementを返します。
        */
        readonly svgGroup: SVGGElement;
        readonly fontSize: number;
        /**
        テキストとセル間の左のパディング値を返します。
        */
        readonly paddingLeft: number;
        /**
        テキストとセル間の右のパディング値を返します。
        */
        readonly paddingRight: number;
        /**
        テキストとセル間の上のパディング値を返します。
        */
        readonly paddingTop: number;
        /**
        テキストとセル間の下のパディング値を返します。
        */
        readonly paddingBottom: number;
        /**
        テキストの水平方向の配置設定を返します。
        */
        /**
        テキストの水平方向の配置設定を設定します。
        */
        horizontalAnchor: string | null;
        /**
        テキストの垂直方向の配置設定を返します。
        */
        /**
        テキストの垂直方向の配置設定を設定します。
        */
        verticalAnchor: string | null;
        /**
        単位セルを基準にした自身のX座標を返します。
        */
        /**
        単位セルを基準にした自身のX座標を設定します。
        */
        cellX: number;
        /**
        単位セルを基準にした自身のY座標を返します。
        */
        /**
        単位セルを基準にした自身のY座標を設定します。
        */
        cellY: number;
        /**
        SVGTextElement生成時に設定するクラス名を返します。
        */
        readonly defaultTextClass: string | null;
        /**
        SVGBackElement生成時に設定するクラス名を返します。
        */
        readonly defaultBackgroundClass: string | null;
        /**
        未定義
        */
        readonly logicalWidth: number;
        /**
        未定義
        */
        readonly logicalHeight: number;
        /**
        CellがDocumentのDOMに所属しているかどうかを返します。
        */
        readonly isLocated: boolean;
        /**
        セルが取るべき幅を返します。
        */
        readonly calculatedWidth: number;
        /**
        セルが取るべき高さを返します。
        */
        readonly calculatedHeight: number;
        /**
         *セルのサイズを再計算します。
         */
        resize(): void;
        /**
         * 再描画します。
         */
        private localUpdate();
        /**
         *セルの位置を再計算します。
         */
        relocation(): void;
        readonly isMaster: boolean;
        readonly isSlave: boolean;
        /**
        セルのIDを返します。
        */
        readonly ID: number;
        /**
        上にあるセルを返します。
        */
        readonly upCell: Cell | null;
        /**
        左にあるセルを返します。
        */
        readonly leftCell: Cell | null;
        /**
        右にあるセルを返します。
        */
        readonly rightCell: Cell | null;
        /**
        下にあるセルを返します。
        */
        readonly bottomCell: Cell | null;
        readonly bottomRightCell: Cell | null;
        readonly topRightCell: Cell | null;
        readonly bottomLeftCell: Cell | null;
        readonly topLeftCell: Cell | null;
        /**
        未定義
        */
        readonly upperGroupCells: Cell[];
        /**
        未定義
        */
        readonly leftGroupCells: Cell[];
        /**
        未定義
        */
        readonly leftBottomGroupCell: Cell | null;
        /**
        未定義
        */
        readonly rightUpGroupCell: Cell | null;
        /**
        未定義
        */
        readonly bottomGroupCells: Cell[];
        /**
        未定義
        */
        readonly rightGroupCells: Cell[];
        /**
        セルのX座標を返します。
        */
        /**
        セルのX座標を設定します。
        */
        x: number;
        /**
        セルのY座標を返します。
        */
        /**
        セルのY座標を設定します。
        */
        y: number;
        /**
        セルの幅を返します。
        */
        /**
        セルの幅を設定します。
        */
        width: number;
        /**
        セルの高さを返します。
        */
        /**
        セルの高さを設定します。
        */
        height: number;
        /**
        セルの領域を表すRectangleを返します。領域の基準は属しているテーブルのSVGGElementです。
        */
        readonly region: Rectangle;
        private static createCellRectangle(className?);
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
    setLatexTextContent(str: string): void;
}
declare namespace GraphTableSVG {
    class Row {
        private readonly table;
        private readonly _cellY;
        /**
        列の単位セルのY座標を返します。
        */
        readonly cellY: number;
        constructor(_table: Table, _y: number);
        readonly cells: Cell[];
        readonly topBorders: SVGLineElement[];
        readonly bottomBorders: SVGLineElement[];
        readonly leftBorder: SVGLineElement;
        readonly rightBorder: SVGLineElement;
        /**
         * 行内のセルのサイズを再計算します。
         */
        resize(): void;
        /**
         * 行内のセルのY座標を設定します。
         *
         */
        setY(posY: number): void;
        private getMaxHeight();
        /**
        行の高さを返します。
        */
        /**
        行の高さを設定します。
        */
        height: number;
    }
    class Column {
        private readonly table;
        private readonly _cellX;
        /**
        列の単位セルのX座標を返します。
        */
        readonly cellX: number;
        readonly cells: Cell[];
        constructor(_table: Table, _x: number);
        private getMaxWidth();
        /**
         * 列内のセルのサイズを再計算します。
         */
        resize(): void;
        /**
         * 列のX座標を設定します。
         * @param posX
         */
        setX(posX: number): void;
        /**
        列の幅を返します。
        */
        /**
        列の幅を設定します。
        */
        width: number;
        readonly leftBorders: SVGLineElement[];
        readonly rightBorders: SVGLineElement[];
        readonly topBorder: SVGLineElement;
        readonly bottomBorder: SVGLineElement;
    }
}
declare namespace GraphTableSVG {
    class SVGToVBA {
        static create(items: (Graph | Table)[]): string;
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
    /**
    テーブルを表します。
    */
    class Table {
        private static readonly defaultCellClass;
        private static readonly defaultBorderClass;
        private _svgGroup;
        private _cells;
        private _isDrawing;
        readonly isDrawing: boolean;
        private _isAutoResized;
        isAutoResized: boolean;
        private _cellTextObserver;
        readonly cellTextObserver: MutationObserver;
        private _cellTextObserverFunc;
        constructor(svgbox: HTMLElement, width: number, height: number, _tableClassName?: string | null);
        private insertRowFunction(i, width?);
        private createCell();
        private updateBorder(cell);
        private renumbering();
        /**
        セルのインスタント生成時にこの値がインスタントのクラス名にセットされます。
        */
        readonly defaultCellClass: string | null;
        /**
        ボーダーのインスタント生成時にこの値がインスタントのクラス名にセットされます。
        */
        readonly defaultBorderClass: string | null;
        /**
        各セルを格納している二次元ジャグ配列を返します。
        */
        readonly cells: Cell[][];
        /**
        テーブルを表現しているSVGGElementを返します。
        */
        readonly svgGroup: SVGGElement;
        /**
        テーブルの行方向の単位セルの数を返します。
        */
        readonly width: number;
        /**
        テーブルの列方向の単位セルの数を返します。
        */
        readonly height: number;
        /**
        各行を表す配列を返します。読み取り専用です。
        */
        readonly rows: Row[];
        /**
        各列を表す配列を返します。読み取り専用です。
        */
        readonly columns: Column[];
        /**
        各セルを表す配列を返します。テーブルの左上のセルから右に向かってインデックスが割り当てられ、
        テーブル右下のセルが配列の最後の値となります。読み取り専用です。
        */
        readonly cellArray: Cell[];
        /**
        各ボーダーを表す配列を返します。
        ボーダーの順番は未定義です。
        読み取り専用です。
        */
        readonly borders: SVGLineElement[];
        /**
        新しい行をi番目の行に挿入します
        */
        insertRow(i: number): void;
        /**
        新しい行を行の最後に追加します。
        */
        appendRow(): void;
        /**
        新しい列をi番目の列に挿入します。
        */
        insertColumn(i: number): void;
        /**
        新しい列を最後の列に追加します。
        */
        appendColumn(): void;
        /**
        各セルのサイズを再計算します。
        */
        update(): void;
        /**
        所属しているSVGタグ上でのテーブルの領域を表すRectangleクラスを返します。
        */
        getRegion(): Rectangle;
        createVBACode(id: number, slide: string): string[];
        /**
         * 現在のテーブルを表すVBAコードを返します。
         */
        private createVBAMainCode(slideName, id);
        removeTable(svg: HTMLElement): void;
    }
}
declare namespace GraphTableSVG {
    /**
     * SVGLineElementを生成します。
     * @param x
     * @param y
     * @param x2
     * @param y2
     * @param className
     */
    function createLine(x: number, y: number, x2: number, y2: number, className?: string | null): SVGLineElement;
    function createPath(x: number, y: number, x2: number, y2: number, className?: string | null): SVGPathElement;
    /**
     * SVGTextElementを生成します。
     * @param className
     */
    function createText(className?: string | null): SVGTextElement;
    /**
     * SVGRectElementを生成します。
     * @param className
     */
    function createRectangle(className?: string | null): SVGRectElement;
    /**
     * SVGGElementを生成します。
     * @param className
     */
    function createGroup(className?: string | null): SVGGElement;
    /**
     * Styleの設定を消去します。
     * @param style
     */
    function resetStyle(style: CSSStyleDeclaration): void;
    /**
     * SVGCircleElementを生成します。
     * @param className
     */
    function createCircle(className?: string | null): SVGCircleElement;
    function setDefaultValue(item: SVGCircleElement | SVGRectElement): void;
    function setClass(svg: SVGElement, className?: string | null): void;
    function setCSSToStyle(svg: HTMLElement): void;
    function setCSSToAllElementStyles(item: HTMLElement | string): void;
    function getStyleSheet(name: string): CSSStyleDeclaration | null;
}
declare namespace GraphTableSVG {
    /**
     * 傾きや切片を計算できる線です。
     */
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
    /**
     * 四角形を表します。
     */
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        /**
        右端のX座標を返します。
        */
        readonly right: number;
        /**
        底のY座標を返します。
        */
        readonly bottom: number;
        /**
         * X座標とY座標に値を加えます。
         * @param x
         * @param y
         */
        addOffset(x: number, y: number): void;
        /**
         * 引数の四角形を内包する最小の四角形を返します。
         * @param rects
         */
        static merge(rects: Rectangle[]): Rectangle;
    }
}
