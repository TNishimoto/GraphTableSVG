declare namespace GraphTableSVG {
    /**
     * 色に関する名前空間です。
     */
    namespace Color {
        /**
         * 色名から16進コードを生成します。
         * @param colorName
         */
        function createHexCodeFromColorName(colorName: string): string;
        /**
         * 色名を16進表現に変換します。
         * @param colorName
         */
        function createHexFromColorName(colorName: string): {
            r: number;
            g: number;
            b: number;
        } | null;
        /**
         * 色名をRGBコードに変換します。
         * @param colorName
         */
        function createRGBCodeFromColorName(colorName: string): string;
        /**
         * 色名をRGB表現に変換します。
         * @param str
         */
        function createRGBFromColorName(str: string): {
            r: number;
            g: number;
            b: number;
        };
    }
}
declare namespace GraphTableSVG {
    namespace Common {
        /**
         * グラフや表を消去します。
         * @param svg
         * @param items
         */
        function clearGraphTables(svg: SVGElement, items: (GraphTableSVG.GGraph | GraphTableSVG.GTable)[]): void;
        /**
         * 入力要素がdocument.bodyの孫であるときに限りTrueを返します。
         * @param node 判定する要素
         */
        function IsDescendantOfBody(node: Node): boolean;
        /**
         * 領域を取得します。
         * @param items
         */
        function getRegion(items: VBAObjectType[]): Rectangle;
        /**
         * 指定された文字数になるまで指定された文字を左に加えます
         * @param text 文字を追加する文字列
         * @param length 計算後のtextの文字数
         * @param leftChar 左に追加する文字
         */
        function paddingLeft(text: string, length: number, leftChar: string): string;
        function setGraphTableCSS(): void;
        function getGraphTableCSS(): HTMLElement | null;
        /**
         * 単位付きの値を値部分と単位部分に分割します。
         * @param text 単位付きの値
         */
        function parseUnit(text: string): [number, string];
        /**
         * 入力値をピクセル単位の値に変換します。
         * @param value
         */
        function toPX(value: string): number;
        /**
         * 二次ベジエ曲線上の座標を計算します。
         * @param param0 [x,y] ベジエ曲線の開始座標
         * @param param1 [x,y] ベジエ曲線の制御点
         * @param param2 [x,y] ベジエ曲線の終了座標
         * @param t 曲線上の位置 0が曲線の開始座標で1が曲線の終了座標、0.5が曲線の中間点を表します
         * @returns 指定された座標
         */
        function bezierLocation([px1, py1]: [number, number], [px2, py2]: [number, number], [px3, py3]: [number, number], t: number): [number, number];
    }
}
declare namespace GraphTableSVG {
    /**
    ノードの並び順です。
    */
    enum VertexOrder {
        Preorder = 0,
        Postorder = 1
    }
    type CustomTag = "row" | "cell" | "t";
    type ShapeObjectType = "g-callout" | "g-arrow-callout" | "g-ellipse" | "g-rect" | "g-edge" | "g-graph" | "g-table" | "g-object" | "g-path-textbox" | "g-rect-button";
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
        const RectButton: ShapeObjectType;
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
        function toVerticalAnchor(value: string): VerticalAnchor;
    }
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
        function toHorizontalAnchor(value: string): HorizontalAnchor;
    }
    function parsePXString(item: string | null): number;
}
declare namespace GraphTableSVG {
    namespace GUI {
        function showMacroModal(id: string | GObject): void;
        /**
         * マクロ用のモーダルを画面に生成します。
         * @param vbaCode モーダルに表示する貼り付けるVBAマクロ
         */
        function createMacroModal(vbaCode: string | GObject): void;
        /**
         * マクロ用モーダルを取り除きます。
         */
        function removeMacroModal(): void;
        /**
         * マクロ用モーダルのテキストをクリップボードにコピーしてマクロ用モーダルを取り除きます。
         */
        function copyAndCloseMacroModal(): void;
        function setSVGBoxSize(box: SVGSVGElement, w: number, h: number): void;
        function setSVGBoxSize(box: SVGSVGElement, rect: Rectangle, padding: Padding): void;
        /**
         * URLのパラメータを表す連想配列を生成します。
         */
        function getURLParameters(): {
            [key: string]: string;
        };
        /**
         * URLのパラメータをパースしてHTML内の適切な要素に代入します。
         */
        function setURLParametersToHTMLElements(): void;
        /**
         * HTMLTextAreaElementのテキストを取得します。
         * @param elementID HTMLTextAreaElementのID
         */
        function getInputText(elementID: string): string;
        /**
         * HTMLTextAreaElementを取得します。
         * @param id HTMLTextAreaElementのID
         */
        function getNonNullElementById(id: string): HTMLElement;
        function getClientRectangle(): Rectangle;
    }
}
declare namespace GraphTableSVG {
    namespace GUI {
        /**
         *
         * @param svgBox
         * @param sizeFunc
         * @param padding
         */
        function observeSVGBox(svgBox: SVGSVGElement, sizeFunc: () => GraphTableSVG.Rectangle, padding?: GraphTableSVG.Padding): void;
        function autostrech(svgBox: SVGSVGElement, objects: VBAObjectType[]): void;
        function autostretchObserve(svgBox: SVGSVGElement, objects: VBAObjectType[]): void;
        function observeSVGSVG(svgBox: SVGSVGElement, padding?: GraphTableSVG.Padding): void;
        function isObserved(svgBox: SVGSVGElement): boolean;
        function observeChangeElement(): void;
    }
}
declare namespace GraphTableSVG {
}
declare namespace GraphTableSVG {
    /**
     * SVGをPNGに変換するための名前空間です。
     * この名前空間のコードはhttps://st40.xyz/one-run/article/133/を使用しています。
     */
    namespace PNG {
        /**
         * svg要素のCSSをStyle属性に書き込みます。
         * @param svg
         */
        function copyCSStoStyle(svg: HTMLElement): void;
        /**
         * HTMLImageElementからCanvasElementを作成します。
         * @param img
         */
        function createCanvasFromImage(img: HTMLImageElement): HTMLCanvasElement;
        /**
         * HTMLImageElementの画像を保存するイベントを作成します。
         * @param img
         * @param canvas
         */
        function setSaveEvent(img: HTMLImageElement, canvas: HTMLCanvasElement): void;
        /**
         * SVG要素からPNG画像を生成して保存します。
         * @param id
         */
        function createPNGFromSVG(id: string): HTMLCanvasElement;
        /**
         * svg要素をHTMLImageElementに変換します。
         * @param svgBox
         */
        function getImage(svgBox: HTMLElement): HTMLImageElement;
    }
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
    class Size {
        width: number;
        height: number;
        constructor(width?: number, height?: number);
    }
    type Point = {
        x: number;
        y: number;
    };
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
declare namespace GraphTableSVG {
    class GObject {
        protected _svgSurface: SVGElement | null;
        protected _tag: any;
        private _svgGroup;
        protected _observer: MutationObserver;
        protected _observerOption: MutationObserverInit;
        constructor(svgbox: SVGElement | string, option?: GObjectAttributes);
        private _isInitialized;
        private __x;
        private __y;
        private __cx;
        private __cy;
        readonly defaultClassName: string | undefined;
        protected readonly isInitialized: boolean;
        protected firstFunctionAfterInitialized(): void;
        protected groupObserverOption: MutationObserverInit;
        private removeResizeEvent;
        private addResizeEvent;
        private pUpdateFunc;
        protected firstResizeUpdate(): void;
        protected resizeUpdate(): void;
        initializeOption(option: GObjectAttributes): GObjectAttributes;
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GObjectAttributes): GObjectAttributes;
        tag: any;
        readonly isShow: boolean;
        /**
        セルを表しているSVGGElementを返します。
        */
        readonly svgGroup: SVGGElement;
        readonly isLocated: boolean;
        readonly svgSurface: SVGElement | null;
        /**
    このVertexのX座標を返します。
    */
        cx: number;
        /**
        このVertexのY座標を返します。
        */
        cy: number;
        /**
        頂点の幅を返します。
        */
        width: number;
        /**
        頂点の高さを返します。
        */
        height: number;
        fixedX: number | null;
        fixedY: number | null;
        readonly isCenterBased: boolean;
        x: number;
        y: number;
        isProhibitionOutOfRange: boolean;
        moveInCanvas(): void;
        readonly type: ShapeObjectType;
        protected createSurface(svgbox: SVGElement, option?: GObjectAttributes): void;
        protected setClassNameOfSVGGroup(): void;
        private observerFunc;
        protected observerFunction(x: MutationRecord[]): void;
        /**
         * この頂点を廃棄します。廃棄された頂点はグラフから取り除かれます。
         */
        dispose(): void;
        /**
        この頂点が廃棄されていたらTrueを返します。
        */
        readonly isDisposed: boolean;
        /**
        このVertexのObjectIDを返します。
        */
        readonly objectID: string;
        createVBACode(id: number): string[];
        readonly VBAObjectNum: number;
        protected dispatchObjectCreatedEvent(): void;
        protected _isUpdating: boolean;
        update(): void;
        protected updateAttributes: string[];
        protected dispatchConnectPositionChangedEvent(): void;
        readonly hasSize: boolean;
        private static objectDic;
        static getObjectFromObjectID(id: string | SVGElement): GObject | null;
        static setObjectFromObjectID(obj: GObject): void;
        static getObjectFromID(id: string): GObject | null;
        /**
         * グラフの領域を表すRectangleを返します。位置の基準はグラフが追加されているNodeです。
         */
        getRegion(): Rectangle;
        movable(): void;
    }
}
declare namespace GraphTableSVG {
    class GTextBox extends GObject {
        private _svgText;
        private isFixTextSize;
        protected surfaceAttributes: string[];
        private _textObserver;
        private static updateTextAttributes;
        protected _isSpecialTextBox: boolean;
        protected _minimumWidth: number;
        protected _minimumHeight: number;
        constructor(svgbox: SVGElement | string, option?: GTextBoxAttributes);
        initializeOption(option: GObjectAttributes): GObjectAttributes;
        /**
                 * SVGTextElementを生成します。
                 * @param className 生成するSVG要素のクラス属性名
                 * @returns 生成されたSVGTextElement
                 */
        private static createSVGText;
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GTextBoxAttributes): GTextBoxAttributes;
        readonly svgText: SVGTextElement;
        protected textObserverFunc: MutationCallback;
        /**
        テキストの水平方向の配置設定を設定します。
        */
        horizontalAnchor: HorizontalAnchor;
        /**
        テキストの垂直方向の配置設定を返します。
        */
        /**
        テキストの垂直方向の配置設定を設定します。
        */
        verticalAnchor: VerticalAnchor;
        /**
         * このVertexがテキストに合わせてサイズを変える場合Trueを返します。
         */
        isAutoSizeShapeToFitText: boolean;
        update(): void;
        protected updateSurface(): void;
        protected updateToFitText(): void;
        readonly marginPaddingTop: number;
        readonly marginPaddingLeft: number;
        readonly marginPaddingRight: number;
        readonly marginPaddingBottom: number;
        paddingTop: number;
        paddingLeft: number;
        paddingRight: number;
        paddingBottom: number;
        marginTop: number;
        marginLeft: number;
        marginRight: number;
        marginBottom: number;
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
        readonly defaultClassName: string | undefined;
        /**
        * 接続部分のXY座標を返します。
        * @param type
        * @param x
        * @param y
        */
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        /**
         * 与えられた位置から伸びた辺に対応する接続位置を返します。
         * @param type
         * @param x
         * @param y
         */
        getConnectorType(type: ConnectorPosition, x: number, y: number): ConnectorPosition;
        /**
         * 与えられた位置から伸びた辺に対応する接続位置がAutoだったときの実際の接続位置を返します。
         * @param x
         * @param y
         */
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
        /**
        入辺配列を返します。
        */
        readonly outcomingEdges: GEdge[];
        /**
        出辺配列を返します。
        */
        readonly incomingEdges: GEdge[];
        /**
         * 出辺を挿入します。
         * @param edge
         * @param insertIndex
         */
        insertOutcomingEdge(edge: GEdge, insertIndex?: number): void;
        /**
         * 出辺を削除します。
         * @param edge
         */
        removeOutcomingEdge(edge: GEdge): void;
        /**
        * 入辺を挿入します。
        * @param edge
        * @param insertIndex
        */
        insertIncomingEdge(edge: GEdge, insertIndex?: number): void;
        /**
         * 入辺を削除します。
         * @param edge
         */
        removeIncomingEdge(edge: GEdge): void;
        dispose(): void;
        /**
        * 親Vertex配列を返します。
        */
        getParents(): GVertex[];
        /**
        親との間の辺を返します。
        */
        readonly parentEdge: GEdge | null;
        /**
        このVertexの親を返します。
        */
        readonly parent: GVertex | null;
        /**
        このVertexに親がいないときTrueを返します。
        */
        readonly isNoParent: boolean;
        /**
        出辺配列を返します。
        */
        readonly children: GVertex[];
        /**
        このVertexが葉のときTrueを返します。
        */
        readonly isLeaf: boolean;
        /**
         * このVertexを頂点とする仮想部分木を作成します。
         */
        createVirtualTree(excludedEdgeDic?: Set<GEdge>): VirtualTree;
        /**
        このVertexの領域を返します。
        */
        readonly region: Rectangle;
        readonly shape: string;
        /**
                 *
                 * @param id
                 */
        createVBACode(id: number): string[];
        /**
         * VBAコードでのこの図形を表すShape図形のVBAAdjustmentsプロパティを表します。
         */
        protected readonly VBAAdjustments: number[];
        private getVBAEditLine;
        readonly graph: GGraph | null;
    }
}
declare namespace GraphTableSVG {
    class GPathTextBox extends GVertex {
        readonly svgPath: SVGPathElement;
        constructor(svgbox: SVGElement | string, option?: GTextBoxAttributes);
        protected createSurface(svgbox: SVGElement, option?: GObjectAttributes): void;
        private static createSurfacePath;
        initializeOption(option: GObjectAttributes): GObjectAttributes;
        readonly innerRectangle: Rectangle;
        readonly type: ShapeObjectType;
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
        /**
         * 矢印部分を除いた図形の高さを表します。
         */
        protected readonly boxHeight: number;
        protected readonly boxWidth: number;
        protected updateToFitText(): void;
        update(): void;
        readonly shape: string;
        /**
         * VBAコードでのこの図形を表すShape図形のVBAAdjustmentsプロパティを表します。
         * 第一要素は矢印の首の幅（）
         * 第二要素は矢印の頭の幅
         * @returns VBAAdjustments値の配列。
         */
        protected readonly VBAAdjustments: number[];
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
    class GCallout extends GPathTextBox {
        constructor(svgbox: SVGElement | string, option?: GCalloutAttributes);
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GCalloutAttributes): GCalloutAttributes;
        readonly type: ShapeObjectType;
        update(): void;
        speakerX: number;
        speakerY: number;
        readonly speakerPosition: SpeakerPosition;
        readonly shape: string;
        protected readonly VBAAdjustments: number[];
    }
}
declare namespace GraphTableSVG {
    /**
     * 辺をSVGで表現するためのクラスです。
     */
    class GEdge extends GTextBox {
        constructor(svgbox: SVGElement | string, option?: GEdgeAttributes);
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GEdgeAttributes): GEdgeAttributes;
        initializeOption(option: GObjectAttributes): GObjectAttributes;
        private static connectedBeginVertexDic;
        private static connectedEndVertexDic;
        static getConnectedVertexFromDic(edge: GEdge, isBegin: boolean): GVertex | null;
        static setConnectedVertexFromDic(edge: GEdge, isBegin: boolean): void;
        readonly degree: number;
        readonly defaultClassName: string | undefined;
        readonly svgPath: SVGPathElement;
        protected _svgTextPath: SVGTextPathElement;
        readonly svgTextPath: SVGTextPathElement;
        protected createSurface(svgbox: SVGElement, option?: GObjectAttributes): void;
        /**
             * SVGPathElementを生成します。
             * @param parent 生成したSVGPathElementを子に追加する要素
             * @param x 開始位置のX座標
             * @param y 開始位置のY座標
             * @param x2 終了位置のX座標
             * @param y2 終了位置のY座標
             * @param className SVGPathElementのクラス属性名
             * @returns 生成されたSVGPathElement
             */
        private static createPath;
        readonly type: ShapeObjectType;
        tag: any;
        /**
         * 辺の制御点を返します。
         */
        controlPoint: [number, number][];
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
        private beginVertexID;
        private endVertexID;
        isAppropriatelyReverseMode: boolean;
        side: string | null;
        /**
         * 開始位置の矢印オブジェクトを返します。
         */
        /**
        * 開始位置の矢印オブジェクトを設定します。
        * @param value 代入するSVGMarkerElementもしくはNull
        */
        markerStart: SVGMarkerElement | null;
        /**
         * 終了位置の矢印オブジェクトを返します。
         */
        markerEnd: SVGMarkerElement | null;
        private removeVertexEvent;
        private addVertexEvent;
        private connectPositionChangedFunc;
        /**
        開始接点を返します。
        */
        /**
        開始接点を設定します。
        */
        beginVertex: GVertex | null;
        /**
        終了接点を返します。
        */
        /**
        終了接点を設定します。
        */
        endVertex: GVertex | null;
        /**
         * この辺を廃棄します。廃棄した辺はグラフから取り除かれます。
         */
        dispose(): void;
        /**
        この辺が廃棄されているときTrueを返します。
        */
        /**
        開始位置のX座標を返します。
        */
        x1: number;
        /**
        開始位置のY座標を返します。
        */
        y1: number;
        /**
        終了位置のX座標を返します。
        */
        x2: number;
        /**
        終了位置のY座標を返します。
        */
        y2: number;
        /**
         * svgPathのstyle:stroke-dasharrayを返します。
         */
        /**
         * svgPathのstyle:strokeを返します。
         */
        readonly lineColor: string | null;
        private removeTextLengthAttribute;
        private setRegularInterval;
        private pathPoints;
        private updateConnectorInfo;
        private revTextForApp;
        /**
         * 再描画します。
         */
        update(): boolean;
        private static getRevString;
        /**
         * この辺のテキストがパスに沿って均等に描画される状態ならばTrueを返します。
         */
        pathTextAlignment: PathTextAlighnment;
        save(): void;
        setIndexDictionaryForVBA(vertexDic: {
            [key: string]: number;
        }, edgeDic: {
            [key: string]: number;
        }): void;
        VBAConnectorNumber: number;
        private static markerCounter;
        /**
         * 矢印オブジェクトを作成します。
         */
        private static createMark;
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
        /**
         * VBAコードを作成します。
         * @param shapes
         * @param result
         */
        createVBACodeOfText(id: number): string[][];
    }
}
declare namespace GraphTableSVG {
    class GEllipse extends GVertex {
        readonly svgEllipse: SVGEllipseElement;
        constructor(svgbox: SVGElement | string, option?: GTextBoxAttributes);
        protected createSurface(svgbox: SVGElement, option?: GObjectAttributes): void;
        private static createEllipse;
        static constructAttributes(e: SVGElement, removeAttributes?: boolean, output?: GTextBoxAttributes): GCalloutAttributes;
        /**
        テキストの領域を返します。
        */
        readonly innerRectangle: Rectangle;
        /**
        頂点の幅を返します。
        */
        width: number;
        /**
        頂点の高さを返します。
        */
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
    /**
    グラフを表します。
    */
    class GGraph extends GObject {
        constructor(box: SVGElement | string, option?: GTextBoxAttributes);
        readonly vertices: GVertex[];
        readonly edges: GEdge[];
        readonly roots: GVertex[];
        protected _roots: GVertex[];
        vertexXInterval: number | null;
        vertexYInterval: number | null;
        /**
        根を返します。
        */
        readonly rootVertex: GVertex | null;
        /**
         * 頂点もしくは辺をグラフに追加します。
         * @param item
         */
        add(item: GVertex | GEdge): void;
        /**
         * 頂点もしくは辺を削除します。
         * @param item
         */
        remove(item: GVertex | GEdge): void;
        clear(): void;
        /**
                * 与えられた二つの頂点と辺を接続します。
                * @param beginVertex 開始節
                * @param edge 接続する辺
                * @param endVertex 終了節
                * @param option 接続オプション
                * @param option.incomingInsertIndex endVertexのincomingEdgeの配列に今回の辺をどの位置に挿入するか
                * @param option.outcomingInsertIndex beginVertexのoutcomingEdgeの配列に今回の辺をどの位置に挿入するか
                * @param option.beginConnectorType beginVertexの接続位置
                * @param option.endConnectorType endVertexの接続位置
                */
        connect(beginVertex: GVertex, edge: GEdge, endVertex: GVertex, option?: ConnectOption): void;
        getOrderedVertices(order: VertexOrder, node?: GVertex | null): GVertex[];
        /**
         * 親ノードに子ノードを追加します。
         * @param parent
         * @param child
         * @param option
         */
        appendChild(parent: GVertex, child: GVertex | null, option?: {
            insertIndex?: number;
        }): void;
        relocateStyle: string | null;
        relocate(): void;
        width: number;
        height: number;
        Noderegion(): Rectangle;
        moveInCanvas(): void;
        build(graph: LogicGraph | LogicTree, option?: {
            x?: number;
            y?: number;
            isLatexMode?: boolean;
        }): void;
        /**
        * LogicTreeから木を構築します。
        * @param roots
        * @param isLatexMode
        */
        constructFromLogicTree(roots: LogicTree[] | LogicTree, option?: {
            x?: number;
            y?: number;
            isLatexMode?: boolean;
        }): void;
        removeGraph(svg: SVGElement): void;
        /**
         * グラフの領域を表すRectangleを返します。位置の基準はグラフが追加されているNodeです。
         */
        getRegion(): Rectangle;
        /**
         * 入力のVertexを親として、入力のLogicTreeを子とした部分木を作成します。
         * @param parent 親にするVertex
         * @param logicVertex 子にするLogicTree
         * @param option 作成オプション
         * @returns logicVertexを表すVertex
         */
        private createChildFromLogicTree;
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
        /**
         * SVGRectElementを生成します。
         * @param parent 生成したSVG要素を子に追加する要素
         * @param className 生成するSVG要素のクラス属性名
         * @returns 生成されたSVGRectElement
         */
        private static createRectangle;
        static constructAttributes(e: SVGElement, removeAttributes?: boolean, output?: GTextBoxAttributes): GCalloutAttributes;
        readonly type: ShapeObjectType;
        /**
        テキストの領域を返します。
        */
        readonly innerRectangle: Rectangle;
        /**
        頂点の幅を返します。
        */
        width: number;
        /**
        頂点の高さを返します。
        */
        height: number;
        protected updateSurface(): void;
        /**
                * 接続部分の座標を返します。
                * @param type
                * @param x
                * @param y
                */
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
        readonly shape: string;
    }
}
declare namespace GraphTableSVG {
    class GRectButton extends GRect {
        constructor(svgbox: SVGElement | string, option?: GTextBoxAttributes);
        initializeOption(option: GObjectAttributes): GObjectAttributes;
        readonly defaultClassName: string | undefined;
        readonly type: ShapeObjectType;
    }
}
declare namespace GraphTableSVG {
    /**
    テーブルを表します。
    */
    class GTable extends GObject {
        /**
         * コンストラクタです。
         */
        constructor(svgbox: SVGElement, option?: GTableOption);
        private _isNoneMode;
        readonly isNoneMode: boolean;
        readonly isCenterBased: boolean;
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GTableOption): GTableOption;
        private _svgHiddenGroup;
        private _svgRowBorderGroup;
        private _svgColumnBorderGroup;
        readonly svgRowBorderGroup: SVGGElement;
        readonly svgColumnBorderGroup: SVGGElement;
        /**
        各行を表す配列を返します。読み取り専用です。
        */
        private _rows;
        /**
        各列を表す配列を返します。読み取り専用です。
        */
        private _columns;
        private _borderRows;
        private _borderColumns;
        readonly borderRows: BorderRow[];
        readonly borderColumns: BorderColumn[];
        private isConstructing;
        width: number;
        height: number;
        /**
         * mergeによって見えなくなったBorderなどを格納している特別なSVGGElementです。
         */
        readonly svgHiddenGroup: SVGGElement;
        readonly type: ShapeObjectType;
        /**
        各行を表す配列を返します。読み取り専用です。
        */
        readonly rows: CellRow[];
        /**
        各列を表す配列を返します。読み取り専用です。
        */
        readonly columns: CellColumn[];
        /**
        各セルを格納している二次元ジャグ配列を返します。
        */
        readonly cells: Cell[][];
        private _isDrawing;
        readonly isDrawing: boolean;
        private _isAutoResized;
        isAutoResized: boolean;
        private _cellTextObserver;
        readonly cellTextObserver: MutationObserver;
        private _cellTextObserverFunc;
        /**
        * テーブルの行方向の単位セルの数を返します。
        * @returns 表の列数
        */
        readonly columnCount: number;
        /**
        * テーブルの列方向の単位セルの数を返します。
        * @returns 表の行数
        */
        readonly rowCount: number;
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
         * セルの元々のサイズに合わせて表のサイズを調整します。
         * @param allowShrink 各行と各列が現在の幅より短くなることを許す
         */
        fitSizeToOriginalCells(allowShrink: boolean): void;
        /**
         * 指定したセル座標のセルを返します。そのようなセルが存在しない場合nullを返します。
         * @param x セルの列番号
         * @param y セルの行番号
         */
        getTryCell(x: number, y: number): Cell | null;
        /**
         * 指定したセル座標範囲の二次元セル配列を返します。
         * @param x 範囲の左上を示す列番号
         * @param y 範囲の左上を示す行番号
         * @param width 範囲に含まれる列数
         * @param height 範囲に含まれる行数
         */
        getRangeCells(x: number, y: number, width: number, height: number): Cell[][];
        /**
         * 指定したセル座標範囲のセルを配列でかえします。
         * @param x 範囲の左上を示す列番号
         * @param y 範囲の左上を示す行番号
         * @param width 範囲に含まれる列数
         * @param height 範囲に含まれる行数
         */
        getRangeCellArray(x: number, y: number, width: number, height: number): Cell[];
        /**
        所属しているSVGタグ上でのテーブルの領域を表すRectangleクラスを返します。
        */
        getRegion(): Rectangle;
        /**
        * 強調セルを全て返します。
        */
        getEmphasizedCells(): GraphTableSVG.Cell[];
        /**
        * 表を文字列に変換した結果を返します。
        */
        toPlainText(): string;
        private _isTextObserved;
        isTextObserved: boolean;
        private updateCellByLogicCell;
        /**
         * LogicTableからTableを構築します。
         * @param table 入力LogicTable
         */
        constructFromLogicTable(table: LogicTable): void;
        /**
         * 二次元文字列配列から表を作成します。
         * @param table 各セルの文字列
         * @param option 表情報
         * @param option.x 表のx座標
         * @param option.y 表のy座標
         * @param option.rowHeight 各行の縦幅(px)
         * @param option.columnWidth 各列の横幅(px)
         * @param option.tableClassName 表(svgGroup)のクラス属性
         * @param option.isLatexMode Trueのときセルの文字列をLatex表記とみなして描画します。
         *
         */
        construct(table: string[][], option?: {
            tableClassName?: string;
            x?: number;
            y?: number;
            rowHeight?: number;
            columnWidth?: number;
            isLatexMode?: boolean;
        }): void;
        /**
         * 表からVBAコードを作成します。
         * @param id
         * @param slide
         */
        createVBACode2(id: number, slide: string): string[];
        /**
         * 現在のテーブルを表すVBAコードを返します。
         */
        private createVBAMainCode;
        /**
         * 新しいセルを作成します。
         */
        /**
         * テーブルを削除します。
         * @param svg 表が格納されているSVG要素
         */
        removeTable(svg: SVGElement): void;
        private isSetSize;
        private firstSetSize;
        private borderSizeCheck;
        /**
         * 表の列数と行数を変更します。
         * @param columnCount 列数
         * @param rowCount 行数
         */
        setSize(columnCount: number, rowCount: number): void;
        private primitiveInsertRow;
        private primitiveInsertColumn;
        readonly borderColumnCount: number;
        readonly borderRowCount: number;
        /**
         * rowCount = 0, columnCount = 0のテーブルを作成します。
         */
        clear(): void;
        private removeCellRow;
        private removeCellColumn;
        private primitiveRemoveRow;
        private primitiveRemoveColumn;
        private removeColumnBorder;
        private removeRowBorder;
        removeRow(ithRow: number): void;
        removeColumn(ithColumn: number): void;
        private deleteXHorizontalBorders;
        private deleteYVerticalBorders;
        private createColumnBorder;
        private createRowBorder;
        private createRow;
        private createColumn;
        private insertXHorizontalBorders;
        private insertYVerticalBorders;
        /**
        * 新しい行をi番目の行に挿入します
        * @param 挿入行の行番号
        */
        insertRow(ithRow: number): void;
        /**
        * 新しい列をi番目の列に挿入します。
        * @param ithColumn 挿入列の列番号
        */
        insertColumn(ithColumn: number): void;
        /**
         * 新しい行を作って挿入します。
         * @param i 挿入行の行番号
         * @param columnCount 挿入行の列数
         */
        /**
        新しい列を最後の列に追加します。
        */
        appendColumn(): void;
        /**
        新しい行を行の最後に追加します。
        */
        appendRow(): void;
        private prevShow;
        /**
        各セルのサイズを再計算します。
        */
        update(): void;
        /**
         * セル番号を振り直します。
         */
        private updateNodeRelations;
        /**
         * サイズを再計算します。
         */
        private resize;
        /**
         * 各セルの位置を再計算します。
         */
        private relocation;
    }
}
declare namespace GraphTableSVG {
    namespace GraphArrangement {
        function standardTreeWidthArrangement(graph: GGraph): void;
    }
}
declare namespace GraphTableSVG {
    namespace Parse {
        /**
         * 入力文字列をパースしてLogicTreeを構築します。
         * @param parseText
         */
        function parseTree(parseText: string): GraphTableSVG.LogicTree;
        /**
         * 入力木構造を表現する文字列を出力します。
         * @param tree 文字列に変換する木構造
         */
        function getParseString(tree: GraphTableSVG.GVertex): string;
    }
}
declare namespace GraphTableSVG {
    namespace TreeArrangement {
        function reverse(graph: GGraph, isX: boolean, isY: boolean): void;
        /**
         * 子Vertexが一列に並ぶようにグラフ内のVertexを整列します。
         * @param graph
         */
        function alignVerticeByChildren(graph: GGraph): void;
        /**
         * グラフに設定されているVertex間の水平間隔と垂直間隔を算出します。
         * @param graph
         */
        function getXYIntervals(graph: GGraph): [number, number];
        function addOffset(graph: GGraph, x: number, y: number): void;
        /**
         * 葉が一列に並ぶようにVertexを整列します。
         * @param forest
         * @param xInterval
         * @param yInterval
         */
        function alignVerticeByLeaveSub(forest: GGraph, xInterval: number, yInterval: number): void;
        /**
         * 葉が一列に並ぶようにVertexを整列します。
         * @param graph
         */
        function alignVerticeByLeave(graph: GGraph): void;
        function standardTreeWidthArrangement(graph: GGraph): void;
    }
}
declare namespace GraphTableSVG {
    class VirtualTree {
        subTreeRoot: GVertex;
        externalEdges: Set<GEdge>;
        constructor(_root: GVertex, _externalEdgeDic?: Set<GEdge>);
        readonly root: GVertex;
        /**
         * 根の子ノードの配列を返します。
         */
        readonly children: GVertex[];
        readonly virtualTreeChildren: VirtualTree[];
        /**
         * 根の親との間の辺を返します。
         */
        readonly parentEdge: GEdge | null;
        /**
         * この木の中の全てのVertexを返します。
         * @param result
         */
        getSubtree(result?: GVertex[]): GVertex[];
        getHeight(): number;
        /**
         * この木を内包する最小の四角形を返します。
         */
        region(): Rectangle;
        /**
         * 一番左の葉を返します。
         */
        readonly mostLeftLeave: GVertex;
        addOffset(_x: number, _y: number): void;
        setRectangleLocation(_x: number, _y: number): void;
        /**
         * 根を入力位置に移動させます。木も同様に移動します。
         * @param _x
         * @param _y
         */
        setRootLocation(_x: number, _y: number): void;
        setRegionXYLocation(_x: number, _y: number): void;
        /**
         * 葉の配列を返します。
         */
        readonly leaves: GVertex[];
    }
}
declare namespace GraphTableSVG {
    /**
     * 表の行を表現するクラスです。
     */
    class BorderRow {
        private readonly table;
        private _svgGroup;
        readonly svgGroup: SVGGElement;
        /**
        列の単位セルのY座標を返します。
        */
        borderY: number;
        constructor(_table: GTable, _y: number, columnSize: number, borderClass?: string);
        private _borders;
        readonly borders: SVGLineElement[];
        insertBorder(coromni: number, borderClass?: string): void;
        removeBorder(i: number): void;
        remove(): void;
    }
    class BorderColumn {
        private readonly table;
        private _svgGroup;
        /**
        列の単位セルのY座標を返します。
        */
        borderX: number;
        readonly svgGroup: SVGGElement;
        constructor(_table: GTable, _x: number, rowSize: number, borderClass?: string);
        private _borders;
        readonly borders: SVGLineElement[];
        insertBorder(rowi: number, borderClass?: string): void;
        removeBorder(i: number): void;
        remove(): void;
    }
}
declare namespace GraphTableSVG {
    enum DirectionType {
        top = 0,
        left = 1,
        right = 2,
        bottom = 3
    }
    enum DirectionType2 {
        topLeft = 0,
        bottomLeft = 1,
        bottomRight = 2,
        topRight = 3
    }
    /**
     * セルをSVGで表現するためのクラスです。
     */
    class Cell {
        constructor(parent: GTable, _px: number, _py: number, option?: CellOption);
        private recomputeDefaultProperties;
        private __currentClass;
        /**
         * このセルが強調してるかどうかを返します。
         */
        isEmphasized: boolean;
        /**
         * テキストのフォントサイズを返します。
         */
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
        テキストの水平方向の配置設定を設定します。
        */
        horizontalAnchor: HorizontalAnchor;
        /**
        テキストの垂直方向の配置設定を返します。
        */
        /**
        テキストの垂直方向の配置設定を設定します。
        */
        verticalAnchor: VerticalAnchor;
        static readonly emphasisCellClass: string;
        static readonly emphasisBorderClass: string;
        static readonly temporaryBorderClass: string;
        static readonly defaultCellClass: string;
        static readonly cellXName = "data-cellX";
        static readonly cellYName = "data-cellY";
        static readonly borderXName = "data-borderX";
        static readonly borderYName = "data-borderY";
        static readonly borderTypeName = "data-borderType";
        static readonly masterIDName = "data-masterID";
        static readonly masterDiffXName = "data-masterDiffX";
        static readonly masterDiffYName = "data-masterDiffY";
        private tmpStyle;
        private _table;
        /**
        所属しているTableを返します。
        */
        readonly table: GTable;
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
        private _observer;
        private _observerFunc;
        private readonly innerExtraPaddingLeft;
        private readonly innerExtraPaddingRight;
        /**
         * このセルのx座標とマスターセルとのX座標の差分を返します。
         */
        readonly masterDiffX: number;
        /**
         * このセルのx座標とマスターセルとのX座標の差分を設定します。
         */
        private setMasterDiffX;
        /**
         * このセルのy座標とマスターセルとのy座標の差分を返します。
         */
        readonly masterDiffY: number;
        /**
         * このセルのy座標とマスターセルとのy座標の差分を設定します。
         */
        private setMasterDiffY;
        /**
         * マスターセルのx座標を返します。
         */
        readonly masterCellX: number;
        /**
         * マスターセルのx座標を設定します。
         */
        private setMasterCellX;
        /**
         * マスターセルのy座標を返します。
         */
        readonly masterCellY: number;
        /**
         * マスターセルのy座標を設定します。
         */
        private setMasterCellY;
        /**
         * マスターセルのIDを返します。
         */
        readonly masterID: number;
        /**
         * マスターセルを返します。
         */
        readonly master: Cell;
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
        CellがDocumentのDOMに所属しているかどうかを返します。
        */
        readonly isLocated: boolean;
        /**
         * このセルがマスターセルのときに限りTrueを返します。
         */
        readonly isMaster: boolean;
        /**
         * このセルが奴隷セルのときに限りTrueを返します。
         */
        readonly isSlave: boolean;
        /**
        セルのIDを返します。
        */
        readonly ID: number;
        readonly isErrorCell: boolean;
        /**
         * グループセルの行数を返します。
         */
        readonly GroupRowCount: number;
        /**
         * グループセルの列数を返します。
         */
        readonly GroupColumnCount: number;
        /**
         * グループセルを構成しているセルを2次元配列で返します。
         */
        readonly cellsInGroup: Cell[][];
        /**
         * グループセルを構成しているセルを配列で返します。
         */
        readonly cellArrayInGroup: Cell[];
        /**
         * このセルがグループセルであるときに限りTrueを返します。
         */
        readonly isSingleCell: boolean;
        /**
         * マスターセルかつ行数が１のときに限りTrueを返します。
         */
        readonly isMasterCellOfRowCountOne: boolean;
        /**
         * マスターセルかつ列数が１のときに限りTrueを返します。
         */
        readonly isMasterCellOfColumnCountOne: boolean;
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
        /**
         * グループセルの横幅を返します。
         */
        readonly computeGroupWidth: number;
        /**
         * グループセルの縦幅を返します。
         */
        readonly computeGroupHeight: number;
        /**
         * ２つの線分がオーバーラップしている部分の線分を返します。
         * @param v
         * @param w
         */
        private static computeOverlapRange;
        /**
         * ２つの線分がオーバーラップしているときに限り、その結合した線分を返します。
         * @param v
         * @param w
         */
        static computeDisjunction(v: [number, number], w: [number, number]): [number, number] | null;
        /**
         * このグループセルの左上のX座標と右上のX座標を返します。
         */
        readonly groupColumnRange: [number, number];
        /**
         * このグループセルの左上のY座標と左下のY座標を返します。
         */
        readonly groupRowRange: [number, number];
        private computeBorderLength2;
        /**
        セルの上にある枠を返します
        */
        readonly svgTopBorder: SVGLineElement;
        /**
        セルの左にある枠を返します
        */
        readonly svgLeftBorder: SVGLineElement;
        /**
        セルの右にある枠を返します
        */
        readonly svgRightBorder: SVGLineElement;
        /**
        セルの下にある枠を返します
        */
        readonly svgBottomBorder: SVGLineElement;
        /**
        未定義
        */
        readonly logicalWidth: number;
        /**
        未定義
        */
        readonly logicalHeight: number;
        /**
        セルが取るべき幅を返します。
        */
        readonly calculatedWidthUsingText: number;
        private _assurancevisibility;
        /**
        セルが取るべき高さを返します。
        */
        readonly calculatedHeightUsingText: number;
        calculatedSizeUsingGroup(): [number, number];
        private computeSidePosition;
        /**
         * 与えられた方向にあるセルを返します。
         * @param direction
         */
        getNextCell(direction: DirectionType): Cell | null;
        /**
         * 与えられた方向にある、このセルが属しているグループセルとは異なる最初のグループセルのマスターセルを返します。
         * @param direction
         */
        getNextMasterCell(direction: DirectionType): Cell | null;
        /**
        上にあるセルを返します。
        */
        readonly topCell: Cell | null;
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
        /**
         * 右下のセルを返します。
         */
        readonly bottomRightCell: Cell | null;
        /**
         * 右上のセルを返します。
         */
        readonly topRightCell: Cell | null;
        /**
         * 左下のセルを返します。
         */
        readonly bottomLeftCell: Cell | null;
        /**
         * 左上のセルを返します。
         */
        readonly topLeftCell: Cell | null;
        /**
         * このグループセルの上にあるグループセルのマスターセルを返します。
         */
        readonly topMasterCell: Cell | null;
        /**
         * このグループセルの左にあるグループセルのマスターセルを返します。
         */
        readonly leftMasterCell: Cell | null;
        /**
         * このグループセルの右にあるグループセルのマスターセルを返します。
         */
        readonly rightMasterCell: Cell | null;
        /**
         * このグループセルの下にあるグループセルのマスターセルを返します。
         */
        readonly bottomMasterCell: Cell | null;
        /**
         * グループセル内の右端にあるせるセルのX座標を返します。
         */
        readonly mostRightCellX: number;
        /**
         * グループセル内の下端にあるせるセルのY座標を返します。
         */
        readonly mostBottomCellY: number;
        /**
         * 指定した方向にあるグループセルの配列を返します。
         * @param direction
         */
        private getNextGroupCells;
        /**
        未定義
        */
        private readonly leftSideGroupCells;
        /**
        未定義
        */
        readonly upperSideGroupCells: Cell[];
        /**
         * セルの背景を表すSVGRectElementを作成します。
         * @param className
         */
        toPlainText(): string;
        updateNodeRelations(): void;
        /**
         * このセルを更新します。
         */
        update(): void;
        /**
         * svgGroupの親関係を更新します。
         */
        private updateSVGGroupParent;
        private readonly topBorderRow;
        private readonly bottomBorderRow;
        private readonly leftBorderColumn;
        private readonly rightBorderColumn;
        /**
         * 枠の親関係を更新します。
         */
        private updateBorderParent;
        /**
         *セルのサイズを再計算します。
         */
        private resize;
        /**
         * テキストを再描画します。
         */
        private locateSVGText;
        /**
         * 指定した方向の枠を取り除きます。
         * @param dir
         */
        removeBorder(dir: DirectionType): void;
        /**
         * このセルを取り除きます。
         * @param isColumn
         */
        removeFromTable(isColumn: boolean): void;
        /**
         * このセルが持つ枠の情報を更新します。
         */
        private updateBorderAttributes;
        /**
         * 上枠の位置を再計算します。
         */
        private relocateTopBorder;
        /**
         * 左枠の位置を再計算します。
         */
        private relocateLeftBorder;
        /**
         * 右枠の位置を再計算します。
         */
        private relocateRightBorder;
        /**
         * 下枠の位置を再計算します。
         */
        private relocateBottomBorder;
        /**
         *セルの位置を再計算します。
         */
        relocation(): void;
        /**
         * 右のグループセルと結合します。
         */
        mergeRight(): void;
        /**
         * 下のグループセルと結合します。
         */
        mergeBottom(): void;
        /**
         * このセルをマスターセルとした横セル数wかつ縦セル数hのグループセルを作成できるとき、Trueを返します。
         * @param w
         * @param h
         */
        canMerge(w: number, h: number): boolean;
        /**
         * このセルをマスターセルとした横セル数wかつ縦セル数hのグループセルを作成します。
         * @param w
         * @param h
         */
        merge(w: number, h: number): void;
        /**
         * このセルから見て右にあるグループセルとこのセルが属しているグループセルが結合できるとき、そのグループセルの左上のY座標と左下のY座標を返します。
         * さもなければnullを返します。
         */
        getMergedRangeRight(): [number, number] | null;
        /**
         * このセルから見て下にあるグループセルとこのセルが属しているグループセルが結合できるとき、そのグループセルの左上のX座標と右上のX座標を返します。
         * さもなければnullを返します。
         */
        getMergedRangeBottom(): [number, number] | null;
        /**
         * 右のセルと結合できるときTrueを返します。
         */
        readonly canMergeRight: boolean;
        /**
         * 下のセルと結合できるときTrueを返します。
         */
        readonly canMergeBottom: boolean;
        private decomposeRow;
        private decomposeColomn;
    }
}
declare namespace GraphTableSVG {
    /**
     * 表の列を表現するクラスです。
     */
    class CellColumn {
        private readonly table;
        static readonly rowWidthName = "data-width";
        private _svgGroup;
        /**
        列の単位セルのX座標を返します。
        */
        cellX: number;
        /**
        列の幅を返します。
        */
        /**
        列の幅を設定します。
        */
        width: number;
        private setWidthToCells;
        /**
         * この列のセルの配列を返します。
         */
        readonly cells: Cell[];
        readonly length: number;
        constructor(_table: GTable, _x: number, _width?: number);
        /**
         * この列に属しているセルの中で最大の横幅を返します。
         */
        private getMaxWidth;
        /**
         * この列を更新します。
         */
        /**
         * 列内のセルのサイズを再計算します。
         */
        resize(): void;
        /**
         * セルの元々のサイズに合わせて列のサイズを調整します。
         * @param allowShrink 現在の列の幅より短くなることを許す
         */
        fitWidthToOriginalCell(allowShrink: boolean): void;
        /**
         * 列のX座標を設定します。
         * @param posX
         */
        setX(posX: number): void;
        /**
         * この列の左の枠を配列で返します。
         */
        readonly leftBorders: SVGLineElement[];
        /**
         * この列の右の枠を配列で返します。
         */
        readonly rightBorders: SVGLineElement[];
        /**
         * この列の上の枠を返します。
         */
        readonly topBorder: SVGLineElement;
        /**
         * この列の下の枠を返します。
         */
        readonly bottomBorder: SVGLineElement;
        private readonly selfx;
        /**
         * この列を取り除きます。
         * @param isUnit
         */
        _dispose(): void;
        /**
         * この列のセルの位置を再計算します。
         */
        relocation(): void;
        /**
         * この列に属しているグループセルによって関係している列の範囲を返します。
         */
        readonly groupColumnRange: [number, number];
    }
}
declare namespace GraphTableSVG {
    /**
     * 表の行を表現するクラスです。
     */
    class CellRow {
        private readonly table;
        private _svgGroup;
        static readonly columnHeightName = "data-height";
        constructor(_table: GTable, _y: number, _height?: number);
        private createCell;
        _insertCell(i: number): void;
        _appendCell(num?: number): void;
        private _cells;
        readonly cells: Cell[];
        readonly length: number;
        readonly svgGroup: SVGElement;
        /**
        列の単位セルのY座標を返します。
        */
        cellY: number;
        /**
        行の高さを返します。
        */
        /**
        行の高さを設定します。
        */
        height: number;
        /**
         * この行のセル配列を返します。
         */
        /**
         * この行のセルの上にある枠の配列を返します。
         */
        readonly topBorders: SVGLineElement[];
        /**
         * この行のセルの下にある枠の配列を返します。
         */
        readonly bottomBorders: SVGLineElement[];
        /**
         * この行のセルの左にある枠を返します。
         */
        readonly leftBorder: SVGLineElement;
        /**
         * この行のセルの右にある枠を返します。
         */
        readonly rightBorder: SVGLineElement;
        setHeightToCells(): void;
        /**
         * この行を更新します。
         */
        /**
         * 行内のセルのサイズを再計算します。
         */
        resize(): void;
        /**
         * セルの元々のサイズに合わせて行のサイズを調整します。
         * @param allowShrink 現在の行の幅より短くなることを許す
         */
        fitHeightToOriginalCell(allowShrink: boolean): void;
        /**
         * 行内のセルのY座標を設定します。
         *
         */
        setY(posY: number): void;
        /**
         * この行の最大の縦幅を持つセルの縦幅を返します。
         */
        private getMaxHeight;
        private readonly selfy;
        _dispose(): void;
        _removeCell(i: number): void;
        /**
         * この行を取り除きます。
         * @param isUnit
         */
        /**
         * この行の各セルを再配置します。
         */
        /**
         * この行に属しているグループセルによって関係している行の範囲を返します。
         */
        readonly groupRowRange: [number, number];
    }
}
declare namespace GraphTableSVG {
    type VBAObjectType = SVGPathElement | SVGTextElement | GObject;
    class SVGToVBA {
        /**
         * 入力要素をPowerpoint上で作成するVBAコードを作成します。
         * @param items
         */
        static create(items: VBAObjectType[] | VBAObjectType): string;
        static count(items: VBAObjectType[] | VBAObjectType): number;
        private static createVBACodeOfSVGPath;
        private static createVBACodeOfTextElement;
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
        private static getFont;
        static TranslateSVGTextElement2(item: SVGTextElement, range: string): string[];
    }
}
declare namespace GraphTableSVG {
    namespace Console {
        function table(item: any): void;
        function clear(): void;
        function graph(item: any | LogicTree | LogicGraph): void;
    }
}
declare namespace GraphTableSVG {
    namespace Common {
        function createCSS(): string;
    }
}
declare namespace HTMLFunctions {
    function draggable(element: SVGElement, g: SVGGElement): void;
    function appendDragFunctionsToDocument(): void;
}
declare namespace HTMLFunctions {
    enum NodeOrder {
        Preorder = 0,
        Postorder = 1
    }
    function getAncestorAttribute(e: HTMLElement | SVGElement, attr: string): string | null;
    function isShow(e: HTMLElement | SVGElement): boolean;
    function getDescendantsByPreorder(e: Element): Element[];
    function getDescendantsByPostorder(e: Element): Element[];
    function getDescendants(e: Element, order?: NodeOrder): Element[];
    function getChildren(e: Element): Element[];
    function getChildByNodeName(e: Element, name: string): Element | null;
    function isInsideElement(element: Element): boolean;
}
declare namespace HTMLFunctions {
    function createHTMLTable(e: HTMLElement): HTMLTableElement;
}
interface CSSStyleDeclaration {
    tryGetPropertyValue(name: string): string | null;
}
interface SVGTextPathElement {
    /**
     * SVGTextElementのテキストを設定します。
     * @param text 設定するテキスト
     * @param isLatexMode TrueのときLatex表記を使用します。
     */
    setTextContent(text: string, isLatexMode: boolean): void;
    setTextContent(text: string): void;
}
interface SVGLineElement {
    /**
     * SVGLineElementを強調するかどうかを設定します。
     * @param b Trueなら強調。Falseなら強調しません。
     */
    setEmphasis(b: boolean): void;
    /**
     * SVGLineElementが強調されているときにかぎりTrueを返します。
     */
    getEmphasis(): boolean;
}
interface SVGPathElement {
    /**
     * SVGPathElementの位置を設定します。
     * @param points
     */
    setPathLocations(points: [number, number][]): void;
    /**
     * SVGPathElementの位置を取得します。
     */
    getPathLocations(): [number, number][];
}
declare namespace GraphTableSVG {
    namespace SVG {
        let idCounter: number;
        /**
         * SVGLineElementを生成します。
         * @param x 開始位置のX座標
         * @param y 開始位置のY座標
         * @param x2 終了位置のX座標
         * @param y2 終了位置のY座標
         * @param className SVGLineElementのクラス属性名
         * @returns 生成されたSVGLineElement
         */
        function createLine(x: number, y: number, x2: number, y2: number, className: string): SVGLineElement;
        /**
         * SVGTextElementを生成します。
         * @param className 生成するSVG要素のクラス属性名
         * @returns 生成されたSVGTextElement
         */
        function createText(className: string): SVGTextElement;
        /**
         * SVGRectElementを生成します。
         * @param parent 生成したSVG要素を子に追加する要素
         * @param className 生成するSVG要素のクラス属性名
         * @returns 生成されたSVGRectElement
         */
        function createRectangle(parent: SVGElement, className?: string | null): SVGRectElement;
        /**
         * SVGRectElementを生成します。
         * @param parent 生成したSVG要素を子に追加する要素
         * @param className 生成するSVG要素のクラス属性名
         * @returns 生成されたSVGRectElement
         */
        function createCellRectangle(parent: SVGElement, className?: string | null): SVGRectElement;
        /**
         * SVGGElementを生成します。
         * @param className 生成するSVG要素のクラス属性名
         * @returns 生成されたSVGGElement
         */
        function createGroup(parent: HTMLElement | SVGElement | null): SVGGElement;
        /**
         * Styleの設定を消去します。
         * @param style 消去するStyle
         */
        function resetStyle(style: CSSStyleDeclaration): void;
        /**
         * SVGCircleElementを生成します。
         * @param parent 生成したSVG要素を子に追加する要素
         * @param className 生成するSVG要素のクラス属性名
         * @returns 生成されたSVGCircleElement
         */
        function createCircle(parent: SVGElement, className?: string | null): SVGCircleElement;
        /**
         * Edgeの矢じりとして使うSVGMarkerElementを作成します。
         * @param className 生成するSVG要素のクラス属性名
         * @returns 生成されたSVGMarkerElement
         */
        function createMarker(option?: {
            className?: string;
            strokeWidth?: string;
            color?: string;
        }): [SVGMarkerElement, SVGPathElement];
        /**
         * SVGTextElementを子に持つSVGTextPathElementを作成します。
         * @param className 生成するSVGTextPathElementのクラス属性名
         * @returns 生成されたSVGTextElementとSVGTextPathElement
         */
        function createTextPath(className?: string | null): [SVGTextElement, SVGTextPathElement];
        /**
 * SVGTextElementを子に持つSVGTextPathElementを作成します。
 * @param className 生成するSVGTextPathElementのクラス属性名
 * @returns 生成されたSVGTextElementとSVGTextPathElement
 */
        function createTextPath2(className: string): SVGTextPathElement;
        /**
         * SVG要素にクラス属性をセットします。
         * @param svg 適用されるSVG要素
         * @param className クラス属性名
         */
        function setClass(svg: SVGElement, className?: string | null): void;
        /**
         * SVG要素のクラス属性名から取得できるCSSStyleDeclarationを要素のスタイル属性にセットします。
         * @param svg 適用されるSVG要素
         */
        function setCSSToStyle(svg: HTMLElement, isComplete?: boolean): void;
        function getAllElementStyleMap(item: HTMLElement | string): {
            [key: number]: string;
        };
        function setAllElementStyleMap(item: HTMLElement | string, dic: {
            [key: number]: string;
        }): void;
        /**
         * 入力のSVG要素とその配下の要素全てにsetCSSToStyleを適用します。
         * @param item SVG要素もしくはそのid
         */
        function setCSSToAllElementStyles(item: HTMLElement | string, isComplete?: boolean): void;
        /**
         * 未使用。
         * @param name
         */
        function getStyleSheet(name: string): CSSStyleDeclaration | null;
        function getRegion2(e: SVGElement): Rectangle;
        function getSVGSVG(e: SVGElement): SVGSVGElement;
        function getLeastContainer(e: SVGElement): SVGGElement | SVGSVGElement | null;
        function getAbsolutePosition(g: SVGGElement | SVGSVGElement): Point;
        function isSVGSVGHidden(e: SVGElement): boolean;
        function isSVGHidden(e: SVGElement): boolean;
    }
}
interface SVGGElement {
    /**
     * X座標を取得します。
     */
    getX(): number;
    /**
     * X座標を設定します。
     */
    setX(value: number): void;
    /**
     * Y座標を取得します。
     */
    getY(): number;
    /**
     * Y座標を設定します。
     */
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
    /**
     * X座標を取得します。
     */
    getX(): number;
    /**
     * X座標を設定します。
     */
    setX(value: number): void;
    /**
     * Y座標を取得します。
     */
    getY(): number;
    /**
     * Y座標を設定します。
     */
    setY(value: number): void;
    /**
     * SVGTextElementのテキストを設定します。
     * @param text 設定するテキスト
     * @param isLatexMode TrueのときLatex表記を使用します。
     */
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
        /**
         * SVGTextElementにテキストをセットします。
         * @param svgText テキストをセットされるSVG要素
         * @param text SVG要素に適用するテキスト
         * @param isLatexMode Latex表記を使用するかどうか
         */
        function setTextToSVGText(svgText: SVGTextElement, text: string, isLatexMode: boolean): void;
        /**
 * SVGTextPathElementにテキストをセットします。
 * @param path テキストをセットされるパス
 * @param text パスに適用するテキスト
 * @param isLatexMode Latex表記を使用するかどうか
 */
        function setTextToTextPath(path: SVGTextPathElement, text: string, isLatexMode: boolean): void;
        /**
         * SVGTextElement
         * @param svgText
         * @param hAnchor
         */
        function sortText(svgText: SVGTextElement, hAnchor: GraphTableSVG.HorizontalAnchor, showChecked: boolean): void;
        function constructSVGTextByHTMLElements(svgText: SVGTextElement, text: HTMLElement[], isLatexMode: boolean): void;
        function getSize(svgText: SVGTextElement, showChecked?: boolean): Rectangle;
        function getComputedTextLengthsOfTSpans(svgText: SVGTextElement, showChecked: boolean): Size[];
    }
}
declare namespace GraphTableSVG {
    class TableDictionary {
        static IndexName: string;
        static ValueName: string;
        private columnMapper;
        private rows;
        private objects;
        constructor();
        construct(item: any): void;
        addValue(i: number, key: string, value: any): void;
        add(item: any): void;
        toLogicTable(): GraphTableSVG.LogicTable;
        createNode(item: any, graph: LogicGraph, dic: Map<object, LogicGraphNode>): LogicGraphNode;
        toLogicGraph(): LogicGraph;
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
        class?: string;
        surfaceClass?: string;
        style?: string;
        surfaceStyle?: string;
    };
    type GObjectMaps = {
        groupAttributes?: Map<string, string>;
        surfaceAttributes?: Map<string, string>;
        textAttributes?: Map<string, string>;
    };
    type _GTextBoxAttribute = {
        text?: string | HTMLElement[];
        isAutoSizeShapeToFitText?: boolean;
        verticalAnchor?: VerticalAnchor;
        horizontalAnchor?: HorizontalAnchor;
        textClass?: string;
        textStyle?: string;
    };
    type GTextBoxAttributes = GObjectAttributes & _GTextBoxAttribute;
    type _GShapeArrowCalloutAttributes = {
        arrowHeadWidth?: number;
        arrowHeadHeight?: number;
        arrowNeckWidth?: number;
        arrowNeckHeight?: number;
        direction?: Direction;
    };
    type GShapeArrowCalloutAttributes = GTextBoxAttributes & _GShapeArrowCalloutAttributes;
    type GCalloutAttributes = GTextBoxAttributes & {
        speakerX?: number;
        speakerY?: number;
    };
    type _GEdgeAttributes = {
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
    type GEdgeAttributes = GTextBoxAttributes & _GEdgeAttributes;
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
    type _GTableOption = {
        rowCount?: number;
        columnCount?: number;
        rowHeight?: number;
        columnWidth?: number;
        table?: LogicTable;
    };
    type GTableOption = GObjectAttributes & _GTableOption;
}
declare namespace GraphTableSVG {
    namespace CustomAttributeNames {
        namespace Style {
            const autoSizeShapeToFitText: string;
            const beginConnectorType: string;
            const endConnectorType: string;
            const markerStart: string;
            const markerEnd: string;
            const vertexXInterval: string;
            const vertexYInterval: string;
            const defaultRadius = "--default-radius";
            const defaultWidth = "--default-width";
            const defaultHeight = "--default-height";
            const defaultSurfaceType: string;
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
            const prohibitionOutOfRange: string;
        }
        namespace StyleValue {
            const defaultTextClass: string;
            const defaultCellClass: string;
            const defaultSurfaceClass: string;
            const defaultPathSurfaceClass: string;
            const defaultEdgePathClass: string;
            const defaultTextboxPathClass: string;
            const defaultCellBackgroungClass: string;
            const defaultCellBorderClass: string;
            const defaultRectButtonSurfaceClass: string;
            const defaultRectButtonClass: string;
            const defaultEdgeClass: string;
            const defaultVertexClass: string;
            const defaultConsoleColumnTitleCellClass = "___column_title_cell";
            const defaultConsoleColumnTitleCellTextClass = "___column_title_text_cell";
            const defaultConsoleColumnTitleCellUndefinedTextClass = "___column_title_undefined_text_cell";
            const defaultConsoleColumnTitleCellBackgroundClass = "___column_title_background_cell";
        }
        const beginNodeName: string;
        const endNodeName: string;
        const isAppropriatelyReverseTextMode: string;
        const controlPointName: string;
        const connectPositionChangedEventName = "connect_position_changed";
        const resizeName = "resized";
        const vertexCreatedEventName = "vertex_created";
        const objectCreatedEventName = "object_created";
        const GroupAttribute = "data-type";
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
    /**
     * 表を表現するクラスです。
     */
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
        static constructLogicTable(e: Element): LogicTable | null;
        static constructHTMLLogicTable(e: Element): LogicTable | null;
        view(): void;
    }
}
declare namespace GraphTableSVG {
    class LogicGraphEdge {
        text: string | null;
        endNodeIndex: number;
    }
    class LogicGraphNode {
        text: string | null;
        outputEdges: LogicGraphEdge[];
        addEdge(e: LogicGraphEdge): void;
    }
    class LogicGraph {
        nodes: LogicGraphNode[];
        edges: LogicGraphEdge[];
        construct(iten: any): void;
        addNode(): LogicGraphNode;
        createEdge(): LogicGraphEdge;
        getIndex(node: LogicGraphNode): number;
    }
    /**
     * 木構造を表現するクラスです。
     */
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
        view(): void;
    }
    /**
     * 二分木を表現するクラスです。
     */
    class BinaryLogicTree extends LogicTree {
        item: any;
        left: BinaryLogicTree | null;
        right: BinaryLogicTree | null;
        constructor(item?: any, left?: BinaryLogicTree | null, right?: BinaryLogicTree | null, nodeText?: string | null, edgeLabel?: string | null);
    }
}
declare namespace GraphTableSVG {
    namespace openSVGFunctions {
        function getTNodes(e: Element): HTMLElement[] | null;
    }
    function openCustomElement(id: string | SVGElement): GObject | null;
    function lazyOpenSVG(): void;
    function openSVG(id: string, output?: GObject[]): GObject[];
    function openSVG(element: Element, output?: GObject[]): GObject[];
    function openSVG(empty: null, output?: GObject[]): GObject[];
    function openSVG(svgsvg: SVGSVGElement, output?: GObject[]): GObject[];
    function createShape(parent: SVGElement | string | GObject, type: "g-rect-button", option?: GTextBoxAttributes): GRectButton;
    function createShape(parent: SVGElement | string | GObject, type: "g-rect", option?: GTextBoxAttributes): GRect;
    function createShape(parent: SVGElement | string | GObject, type: "g-edge", option?: GEdgeAttributes): GEdge;
    function createShape(parent: SVGElement | string | GObject, type: "g-ellipse", option?: GTextBoxAttributes): GEllipse;
    function createShape(parent: SVGElement | string | GObject, type: "g-callout", option?: GTextBoxAttributes): GCallout;
    function createShape(parent: SVGElement | string | GObject, type: "g-arrow-callout", option?: GTextBoxAttributes): GArrowCallout;
    function createShape(parent: SVGElement | string | GObject, type: "g-graph", option?: GTextBoxAttributes): GGraph;
    function createShape(parent: SVGElement | string | GObject, type: "g-table", option?: GTableOption): GTable;
    function createVertex(parent: GGraph, option?: GTextBoxAttributes): GVertex;
    function toSVGUnknownElement(e: Element): void;
    function toDivElement(e: Element): HTMLElement | null;
    function openHTML(id?: string | HTMLElement | null): void;
}
declare namespace GraphTableSVG {
    namespace GraphManager {
        function createRandomObject(size: number): {
            [key: number]: any;
        }[];
    }
}
