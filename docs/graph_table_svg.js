var GraphTableSVG;
(function (GraphTableSVG) {
    var Color;
    (function (Color) {
        const color_name = new Array("aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen");
        let color_dic;
        //redの16進数の配列
        const r_value = new Array("F0", "FA", "00", "7F", "F0", "F5", "FF", "00", "FF", "00", "8A", "A5", "DE", "5F", "7F", "D2", "FF", "64", "FF", "DC", "00", "00", "00", "B8", "A9", "00", "BD", "8B", "55", "FF", "99", "8B", "E9", "8F", "48", "2F", "00", "94", "FF", "00", "69", "1E", "B2", "FF", "22", "FF", "DC", "F8", "FF", "DA", "80", "00", "AD", "F0", "FF", "CD", "4B", "FF", "F0", "E6", "FF", "7C", "FF", "AD", "F0", "E0", "FA", "90", "D3", "FF", "FF", "20", "87", "77", "B0", "FF", "00", "32", "FA", "FF", "80", "66", "00", "BA", "93", "3C", "7B", "00", "48", "C7", "19", "F5", "FF", "FF", "FF", "00", "FD", "80", "6B", "FF", "FF", "DA", "EE", "98", "AF", "DB", "FF", "FF", "CD", "FF", "DD", "B0", "80", "FF", "BC", "41", "8B", "FA", "F4", "2E", "FF", "A0", "C0", "87", "6A", "70", "FF", "00", "46", "D2", "00", "D8", "FF", "40", "EE", "F5", "FF", "F5", "FF", "9A");
        //greenの16進数の配列
        const g_value = new Array("F8", "EB", "FF", "FF", "FF", "F5", "E4", "00", "EB", "00", "2B", "2A", "B8", "9E", "FF", "69", "7F", "95", "F8", "14", "FF", "00", "8B", "86", "A9", "64", "B7", "00", "6B", "8C", "32", "00", "96", "BC", "3D", "4F", "CE", "00", "14", "BF", "69", "90", "22", "FA", "8B", "00", "DC", "F8", "D7", "A5", "80", "80", "FF", "FF", "69", "5C", "00", "FF", "E6", "E6", "F0", "FC", "FA", "D8", "80", "FF", "FA", "EE", "D3", "B6", "A0", "B2", "CE", "88", "C4", "FF", "FF", "CD", "F0", "00", "00", "CD", "00", "55", "70", "B3", "68", "FA", "D1", "15", "19", "FF", "E4", "E4", "DE", "00", "F5", "80", "8E", "A5", "45", "70", "E8", "FB", "EE", "70", "EF", "DA", "85", "C0", "A0", "E0", "00", "00", "8F", "69", "45", "80", "A4", "8B", "F5", "52", "C0", "CE", "5A", "80", "FA", "FF", "82", "B4", "80", "BF", "63", "E0", "82", "DE", "FF", "F5", "FF", "CD");
        //blueの16進数の配列
        const b_value = new Array("FF", "D7", "FF", "D4", "FF", "DC", "C4", "00", "CD", "FF", "E2", "2A", "87", "A0", "00", "1E", "50", "ED", "DC", "3C", "FF", "8B", "8B", "0B", "A9", "00", "6B", "8B", "2F", "00", "CC", "00", "7A", "8F", "8B", "4F", "D1", "D3", "93", "FF", "69", "FF", "22", "F0", "22", "FF", "DC", "FF", "00", "20", "80", "00", "2F", "F0", "B4", "5C", "82", "F0", "8C", "FA", "F5", "00", "CD", "E6", "80", "FF", "D2", "90", "D3", "C1", "7A", "AA", "FA", "99", "DE", "E0", "00", "32", "E6", "FF", "00", "AA", "CD", "D3", "DB", "71", "EE", "9A", "CC", "85", "70", "FA", "E1", "B5", "AD", "80", "E6", "00", "23", "00", "00", "D6", "AA", "98", "EE", "93", "D5", "B9", "3F", "CB", "DD", "E6", "80", "00", "8F", "E1", "13", "72", "60", "57", "EE", "2D", "C0", "EB", "CD", "90", "FA", "7F", "B4", "8C", "80", "D8", "47", "D0", "EE", "B3", "FF", "F5", "00", "32");
        function translateHexCodeFromColorName(str) {
            if (!color_dic) {
                color_dic = {};
                for (let i = 0; i < color_name.length; i++) {
                    color_dic[color_name[i]] = i;
                }
            }
            if (str in color_dic) {
                const i = color_dic[str];
                return r_value[i] + g_value[i] + b_value[i];
            }
            else {
                return str;
            }
        }
        Color.translateHexCodeFromColorName = translateHexCodeFromColorName;
        function translateHexCodeFromColorName2(str) {
            if (!color_dic) {
                color_dic = {};
                for (let i = 0; i < color_name.length; i++) {
                    color_dic[color_name[i]] = i;
                }
            }
            if (str in color_dic) {
                const i = color_dic[str];
                //return r_value[i] + g_value[i] + b_value[i];
                return { r: parseInt(r_value[i], 16), g: parseInt(g_value[i], 16), b: parseInt(b_value[i], 16) };
            }
            else {
                return null;
            }
        }
        Color.translateHexCodeFromColorName2 = translateHexCodeFromColorName2;
        function translateRGBCodeFromColorName(str) {
            str = translateHexCodeFromColorName(str);
            if (str.substr(0, 3) == "rgb") {
                return str;
            }
            else {
                if (str.length == 6) {
                    const r = str.substr(0, 2);
                    const g = str.substr(2, 2);
                    const b = str.substr(4, 2);
                    return `rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`;
                }
                else {
                    return `rgb(${80}, ${80}, ${80})`;
                }
            }
        }
        Color.translateRGBCodeFromColorName = translateRGBCodeFromColorName;
        function translateRGBCodeFromColorName2(str) {
            const v = translateHexCodeFromColorName2(str);
            const def = { r: 80, g: 80, b: 80 };
            if (v != null) {
                return v;
            }
            else {
                if (str.substr(0, 3) == "rgb") {
                    str = str.replace("rgb(", "");
                    str = str.replace(")", "");
                    const values = str.split(",");
                    if (values.length == 3) {
                        return { r: parseInt(values[0]), g: parseInt(values[1]), b: parseInt(values[2]) };
                    }
                    else {
                        return def;
                    }
                }
                else if (str.length == 6) {
                    const r = str.substr(0, 2);
                    const g = str.substr(2, 2);
                    const b = str.substr(4, 2);
                    return { r: parseInt(r), g: parseInt(g), b: parseInt(b) };
                }
                else {
                    return def;
                }
            }
        }
        Color.translateRGBCodeFromColorName2 = translateRGBCodeFromColorName2;
    })(Color = GraphTableSVG.Color || (GraphTableSVG.Color = {}));
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    /**
    ノードの並び順です。
    */
    var NodeOrder;
    (function (NodeOrder) {
        NodeOrder[NodeOrder["Preorder"] = 0] = "Preorder";
        NodeOrder[NodeOrder["Postorder"] = 1] = "Postorder";
    })(NodeOrder = GraphTableSVG.NodeOrder || (GraphTableSVG.NodeOrder = {}));
    /**
    Vertexの接続位置を表す値です。
    */
    var ConnectorPosition;
    (function (ConnectorPosition) {
        /**
        上を表します。
        */
        ConnectorPosition[ConnectorPosition["Top"] = 1] = "Top";
        /**
        左上を表します。
        */
        ConnectorPosition[ConnectorPosition["LeftUp"] = 2] = "LeftUp";
        /**
        左を表します。
        */
        ConnectorPosition[ConnectorPosition["Left"] = 3] = "Left";
        /**
        左下を表します。
        */
        ConnectorPosition[ConnectorPosition["LeftDown"] = 4] = "LeftDown";
        /**
        下を表します。
        */
        ConnectorPosition[ConnectorPosition["Bottom"] = 5] = "Bottom";
        /**
        右下を表します。
        */
        ConnectorPosition[ConnectorPosition["RightDown"] = 6] = "RightDown";
        /**
        右を表します。
        */
        ConnectorPosition[ConnectorPosition["Right"] = 7] = "Right";
        /**
        右上を表します。
        */
        ConnectorPosition[ConnectorPosition["RightUp"] = 8] = "RightUp";
        /**
        ノードの位置によって自動判定
        */
        ConnectorPosition[ConnectorPosition["Auto"] = 9] = "Auto";
    })(ConnectorPosition = GraphTableSVG.ConnectorPosition || (GraphTableSVG.ConnectorPosition = {}));
    function ToConnectorPosition(str) {
        if (str == null) {
            return ConnectorPosition.Auto;
        }
        else {
            switch (str) {
                case "top": return ConnectorPosition.Top;
                case "leftup": return ConnectorPosition.LeftUp;
                case "left": return ConnectorPosition.Left;
                case "leftdown": return ConnectorPosition.LeftDown;
                case "bottom": return ConnectorPosition.Bottom;
                case "rightdown": return ConnectorPosition.RightDown;
                case "right": return ConnectorPosition.Right;
                case "rightup": return ConnectorPosition.RightUp;
                case "auto": return ConnectorPosition.Auto;
                default: return ConnectorPosition.Auto;
            }
        }
    }
    GraphTableSVG.ToConnectorPosition = ToConnectorPosition;
    function ToStrFromConnectorPosition(position) {
        switch (position) {
            case ConnectorPosition.Top: return "top";
            case ConnectorPosition.LeftUp: return "leftup";
            case ConnectorPosition.Left: return "left";
            case ConnectorPosition.LeftDown: return "leftdown";
            case ConnectorPosition.Bottom: return "bottom";
            case ConnectorPosition.RightUp: return "rightup";
            case ConnectorPosition.Right: return "right";
            case ConnectorPosition.RightDown: return "rightdown";
            case ConnectorPosition.Auto: return "auto";
            default: return "auto";
        }
    }
    GraphTableSVG.ToStrFromConnectorPosition = ToStrFromConnectorPosition;
    GraphTableSVG.VerticalAnchorPropertyName = "--vertical-anchor";
    var VerticalAnchor;
    (function (VerticalAnchor) {
        /**
         * 上を表します。
         */
        VerticalAnchor.Top = "top";
        /**
         * 真ん中を表します。
         */
        VerticalAnchor.Middle = "middle";
        /**
         * 底を表します。
         */
        VerticalAnchor.Bottom = "bottom";
    })(VerticalAnchor = GraphTableSVG.VerticalAnchor || (GraphTableSVG.VerticalAnchor = {}));
    GraphTableSVG.HorizontalAnchorPropertyName = "--horizontal-anchor";
    var HorizontalAnchor;
    (function (HorizontalAnchor) {
        /**
         * 左を表します。
         */
        HorizontalAnchor.Left = "left";
        /**
         * 中央を表します。
         */
        HorizontalAnchor.Center = "center";
        /**
        * 右を表します。
        */
        HorizontalAnchor.Right = "right";
    })(HorizontalAnchor = GraphTableSVG.HorizontalAnchor || (GraphTableSVG.HorizontalAnchor = {}));
    function parsePXString(item) {
        if (item == null) {
            return 0;
        }
        else {
            if (item.length == 0) {
                return 0;
            }
            else {
                return parseInt(item);
            }
        }
    }
    GraphTableSVG.parsePXString = parsePXString;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class AdjacencyMatrix {
    }
    GraphTableSVG.AdjacencyMatrix = AdjacencyMatrix;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class Edge {
        constructor(__graph, g) {
            this.observerFunc = (x) => {
                let b = false;
                for (let i = 0; i < x.length; i++) {
                    const p = x[i];
                    b = true;
                }
                if (b)
                    this.update();
            };
            this._beginVertex = null;
            this._endVertex = null;
            this._graph = null;
            this._text = null;
            this._svgGroup = g;
            this.svgGroup.setAttribute(GraphTableSVG.Graph.objectIDName, (GraphTableSVG.Graph.idCounter++).toString());
            this.svgGroup.setAttribute(GraphTableSVG.Graph.typeName, "edge");
            const t1 = this.svgGroup.getPropertyStyleValue(Edge.beginConnectorTypeName);
            const t2 = this.svgGroup.getPropertyStyleValue(Edge.endConnectorTypeName);
            this.beginConnectorType = GraphTableSVG.ToConnectorPosition(t1);
            this.endConnectorType = GraphTableSVG.ToConnectorPosition(t2);
            this._graph = __graph;
            this._graph.add(this);
            this._observer = new MutationObserver(this.observerFunc);
            const option1 = { attributes: true };
            this._observer.observe(this.svgGroup, option1);
            //this._parent = graph;
            /*
            this._beginNode = _beginNode;
            this._endNode = _endNode;
            */
        }
        get svgGroup() {
            return this._svgGroup;
        }
        get text() {
            return this._text;
        }
        set text(value) {
            this._text = value;
        }
        /**
        開始接点の接続位置を返します。
        */
        get beginConnectorType() {
            const p = this.svgGroup.getPropertyStyleValue(Edge.beginConnectorTypeName);
            if (p == null) {
                return GraphTableSVG.ConnectorPosition.Auto;
            }
            else {
                return GraphTableSVG.ToConnectorPosition(p);
            }
        }
        /**
        開始接点の接続位置を設定します。
        */
        set beginConnectorType(value) {
            this.svgGroup.setPropertyStyleValue(Edge.beginConnectorTypeName, GraphTableSVG.ToStrFromConnectorPosition(value));
            //this.svgGroup.setAttribute(Edge.beginConnectorTypeName, GraphTableSVG.ToStrFromConnectorPosition(value));
        }
        /**
        終了接点の接続位置を返します。
        */
        get endConnectorType() {
            const p = this.svgGroup.getPropertyStyleValue(Edge.endConnectorTypeName);
            if (p == null) {
                return GraphTableSVG.ConnectorPosition.Auto;
            }
            else {
                return GraphTableSVG.ToConnectorPosition(p);
            }
        }
        /**
        終了接点の接続位置を設定します。
        */
        set endConnectorType(value) {
            this.svgGroup.setPropertyStyleValue(Edge.endConnectorTypeName, GraphTableSVG.ToStrFromConnectorPosition(value));
        }
        /**
        開始接点を返します。
        */
        get beginVertex() {
            return this._beginVertex;
        }
        /**
        開始接点を設定します。
        */
        set beginVertex(value) {
            const prev = this._beginVertex;
            this._beginVertex = value;
            if (value != null) {
                this.svgGroup.setAttribute(Edge.beginNodeName, value.objectID);
            }
            else {
                this.svgGroup.removeAttribute(Edge.beginNodeName);
            }
            if (prev != null) {
                prev.removeOutcomingEdge(this);
            }
            this.update();
        }
        /**
        終了接点を返します。
        */
        get endVertex() {
            return this._endVertex;
        }
        /**
        終了接点を設定します。
        */
        set endVertex(value) {
            const prev = this._endVertex;
            this._endVertex = value;
            if (value != null) {
                this.svgGroup.setAttribute(Edge.endNodeName, value.objectID);
            }
            else {
                this.svgGroup.removeAttribute(Edge.endNodeName);
            }
            if (prev != null) {
                prev.removeIncomingEdge(this);
            }
            this.update();
        }
        /**
        所属しているグラフを返します。
        */
        get graph() {
            return this._graph;
        }
        /**
         * この辺を廃棄します。廃棄した辺はグラフから取り除かれます。
         */
        dispose() {
            this.beginVertex = null;
            this.endVertex = null;
            const prev = this.graph;
            this._graph = null;
            if (prev != null) {
                prev.remove(this);
            }
        }
        /**
        この辺が廃棄されているときTrueを返します。
        */
        get isDisposed() {
            return this.graph == null;
        }
        /**
        開始位置のX座標を返します。
        */
        get x1() {
            if (this.beginVertex != null && this.endVertex != null) {
                const [x1, y1] = this.beginVertex.getLocation(this.beginConnectorType, this.endVertex.x, this.endVertex.y);
                return x1;
            }
            else {
                return 0;
            }
        }
        /**
        開始位置のY座標を返します。
        */
        get y1() {
            if (this.beginVertex != null && this.endVertex != null) {
                const [x1, y1] = this.beginVertex.getLocation(this.beginConnectorType, this.endVertex.x, this.endVertex.y);
                return y1;
            }
            else {
                return 0;
            }
        }
        /**
        終了位置のX座標を返します。
        */
        get x2() {
            if (this.beginVertex != null && this.endVertex != null) {
                const [x2, y2] = this.endVertex.getLocation(this.endConnectorType, this.beginVertex.x, this.beginVertex.y);
                return x2;
            }
            else {
                return 0;
            }
        }
        /**
        終了位置のY座標を返します。
        */
        get y2() {
            if (this.beginVertex != null && this.endVertex != null) {
                const [x2, y2] = this.endVertex.getLocation(this.endConnectorType, this.beginVertex.x, this.beginVertex.y);
                return y2;
            }
            else {
                return 0;
            }
        }
        /**
         * 再描画します。
         */
        update() {
            return false;
        }
        /**
        ObjectIDを返します。
        */
        get objectID() {
            const r = this.svgGroup.getAttribute(GraphTableSVG.Graph.objectIDName);
            if (r == null) {
                throw new Error();
            }
            else {
                return r;
            }
        }
        /*
        public set objectID(value: number | null) {
            if (value == null) {
                this.group.setAttribute("objectID", "");
            } else {
                this.group.setAttribute("objectID", value.toString());
            }
        }
        */
        save() {
        }
        /**
         * Edgeを作成します。
         * @param graph
         * @param className
         * @param lineType
         */
        static create(graph, className = graph.defaultEdgeClass, defaultSurfaceType = null) {
            className = className != null ? className : graph.defaultVertexClass;
            const g = GraphTableSVG.createGroup(className);
            graph.svgGroup.appendChild(g);
            const type1 = g.getPropertyStyleValue(GraphTableSVG.Vertex.defaultSurfaceType);
            const type = defaultSurfaceType != null ? defaultSurfaceType :
                type1 != null ? type1 : "line";
            if (type == "curve") {
                const line = new BezierEdge(graph, g);
                return line;
            }
            else {
                const line = new LineEdge(graph, g);
                return line;
            }
        }
        createVBACode(main, sub, indexDic) {
            if (this.graph != null) {
                const subline = [];
                const i = indexDic[this.objectID];
                subline.push(` Set edges(${i}) = shapes_.AddConnector(msoConnectorStraight, 0, 0, 0, 0)`);
                if (this.beginVertex != null && this.endVertex != null) {
                    const beg = indexDic[this.beginVertex.objectID];
                    const end = indexDic[this.endVertex.objectID];
                    const begType = this.beginVertex.getConnectorType(this.beginConnectorType, this.endVertex.x, this.endVertex.y);
                    const endType = this.endVertex.getConnectorType(this.endConnectorType, this.beginVertex.x, this.beginVertex.y);
                    subline.push(` Call EditConnector(edges(${i}).ConnectorFormat, nodes(${beg}), nodes(${end}), ${begType}, ${endType})`);
                }
                subline.forEach((v) => sub.push([v]));
                if (this.text != null) {
                    this.text.createVBACode("shapes_", sub);
                }
            }
        }
    }
    //public static defaultBeginConnectorPosition: string = "--default-begin-connector-position";
    //public static defaultEndConnectorPosition: string = "--default-end-connector-position";
    Edge.beginConnectorTypeName = "--begin-connector-type";
    Edge.endConnectorTypeName = "--end-connector-type";
    Edge.defaultLineClass = "--default-line-class";
    Edge.beginNodeName = "data-begin-node";
    Edge.endNodeName = "data-end-node";
    Edge.defaultTextClass = "--default-text-class";
    GraphTableSVG.Edge = Edge;
    class LineEdge extends Edge {
        /*
        public setGraph(value: Graph)
        {
            super.setGraph(value);
            if (this.graph != null) {
                this.graph.svgGroup.appendChild(this.svgGroup);
            }
        }
        */
        constructor(__graph, g) {
            super(__graph, g);
            const p = this.svgGroup.getPropertyStyleValue(Edge.defaultLineClass);
            this._svgLine = GraphTableSVG.createLine(0, 0, 0, 0, p);
            this.svgGroup.appendChild(this._svgLine);
            //this.graph.svgGroup.appendChild(this._svg);
        }
        //svgText: SVGTextElement;
        get svgLine() {
            return this._svgLine;
        }
        /*
        public static create(className: string | null = null): LineEdge {
            const line = new LineEdge(className);
            
            return line;
        }
        */
        update() {
            if (this.beginVertex != null && this.endVertex != null) {
                this._svgLine.x1.baseVal.value = this.x1;
                this._svgLine.y1.baseVal.value = this.y1;
                this._svgLine.x2.baseVal.value = this.x2;
                this._svgLine.y2.baseVal.value = this.y2;
                if (this.text != null) {
                    this.text.update();
                }
            }
            return false;
        }
        createVBACode(main, sub, indexDic) {
            super.createVBACode(main, sub, indexDic);
            if (this.graph != null) {
                const i = indexDic[this.objectID];
                const lineColor = GraphTableSVG.VBATranslateFunctions.colorToVBA(this._svgLine.getPropertyStyleValueWithDefault("stroke", "gray"));
                const strokeWidth = parseInt(this._svgLine.getPropertyStyleValueWithDefault("stroke-width", "4"));
                const visible = this._svgLine.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                sub.push([` Call EditLine(edges(${i}).Line, ${lineColor}, msoLineSolid, ${0}, ${strokeWidth}, ${visible})`]);
            }
        }
    }
    GraphTableSVG.LineEdge = LineEdge;
    class BezierEdge extends Edge {
        constructor(__graph, g) {
            super(__graph, g);
            const p = this.svgGroup.getPropertyStyleValue(Edge.defaultLineClass);
            this._svgBezier = GraphTableSVG.createPath(0, 0, 0, 0, p);
            this.svgGroup.appendChild(this.svgBezier);
        }
        get svgBezier() {
            return this._svgBezier;
        }
        get controlPoint() {
            const str = this.svgBezier.getAttribute(BezierEdge.controlPointName);
            if (str != null) {
                const p = JSON.parse(str);
                return p;
            }
            else {
                this.controlPoint = [0, 0];
                return [0, 0];
            }
        }
        set controlPoint(value) {
            const str = JSON.stringify(value);
            this.svgBezier.setAttribute(BezierEdge.controlPointName, str);
        }
        update() {
            if (this.beginVertex != null && this.endVertex != null) {
                var [cx1, cy1] = this.controlPoint;
                const path = `M ${this.x1} ${this.y1} Q ${cx1} ${cy1} ${this.x2} ${this.y2}`;
                var prevPath = this.svgBezier.getAttribute("d");
                if (prevPath == null || path != prevPath) {
                    this.svgBezier.setAttribute("d", path);
                }
                if (this.text != null) {
                    this.text.update();
                }
            }
            return false;
        }
    }
    BezierEdge.controlPointName = "data-control-point";
    GraphTableSVG.BezierEdge = BezierEdge;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    /**
    グラフを表します。
    */
    class Graph {
        constructor(box, className = null) {
            this._vertices = new Array(0);
            this._edges = new Array(0);
            this._roots = [];
            this._svgGroup = GraphTableSVG.createGroup(className);
            box.appendChild(this.svgGroup);
            this._svgGroup.setAttribute(Graph.typeName, "graph");
        }
        updateVertices() {
            this._vertices.forEach(function (x) { x.update(); });
        }
        updateEdges() {
            this._edges.forEach(function (x) { x.update(); });
        }
        update() {
            this.updateVertices();
            this.updateEdges();
        }
        get vertexXInterval() {
            const v = this.svgGroup.getPropertyStyleValue(Graph.vertexXIntervalName);
            if (v == null) {
                return null;
            }
            else {
                return parseInt(v);
            }
        }
        set vertexXInterval(value) {
            this.svgGroup.setPropertyStyleValue(Graph.vertexXIntervalName, value == null ? null : value.toString());
        }
        get vertexYInterval() {
            const v = this.svgGroup.getPropertyStyleValue(Graph.vertexYIntervalName);
            if (v == null) {
                return null;
            }
            else {
                return parseInt(v);
            }
        }
        set vertexYInterval(value) {
            this.svgGroup.setPropertyStyleValue(Graph.vertexYIntervalName, value == null ? null : value.toString());
        }
        /**
        Vertexインスタンスの生成時、この値がインスタンスのクラス名にセットされます。
        */
        get defaultVertexClass() {
            return this.svgGroup.getPropertyStyleValue(Graph.defaultVertexClass);
        }
        /**
        Vertexインスタンスの生成時のクラス名を設定します。
        */
        set defaultVertexClass(value) {
            this.svgGroup.setPropertyStyleValue(Graph.defaultVertexClass, value);
        }
        /**
        Edgeインスタンスの生成時、この値がインスタンスのクラス名にセットされます。
        */
        get defaultEdgeClass() {
            return this.svgGroup.getPropertyStyleValue(Graph.defaultEdgeClass);
        }
        /**
        Edgeインスタンスの生成時のクラス名を設定します。
        */
        set defaultEdgeClass(value) {
            this.svgGroup.setPropertyStyleValue(Graph.defaultEdgeClass, value);
        }
        /**
        根を返します。
        */
        get rootVertex() {
            if (this.roots.length == 0) {
                return null;
            }
            else {
                return this.roots[0];
            }
        }
        /**
        根を設定します。
        */
        set rootVertex(value) {
            this._roots = [];
            if (value != null) {
                this.roots.push(value);
            }
        }
        /**
        根の配列を返します。
        */
        get roots() {
            return this._roots;
        }
        /**
        グラフを表すSVGGElementを返します。
        */
        get svgGroup() {
            return this._svgGroup;
        }
        /**
        グラフの頂点を全て返します。
        */
        get vertices() {
            return this._vertices;
        }
        /**
        グラフの辺を全て返します。
        */
        get edges() {
            return this._edges;
        }
        /**
         * 頂点もしくは辺をグラフに追加します。
         * @param item
         */
        add(item) {
            if (item instanceof GraphTableSVG.Vertex) {
                const i = this._vertices.indexOf(item);
                if (i == -1 && item.graph == this) {
                    this._vertices.push(item);
                    this.svgGroup.appendChild(item.svgGroup);
                }
                else {
                    throw Error();
                }
            }
            else {
                const i = this._edges.indexOf(item);
                if (i == -1 && item.graph == this) {
                    this._edges.push(item);
                    this.svgGroup.insertBefore(item.svgGroup, this.svgGroup.firstChild);
                }
                else {
                    throw Error();
                }
            }
        }
        /**
         * 頂点もしくは辺を削除します。
         * @param item
         */
        remove(item) {
            if (item instanceof GraphTableSVG.Vertex) {
                const p = this.vertices.indexOf(item);
                if (p != -1) {
                    this._vertices.splice(p, 1);
                    this.svgGroup.removeChild(item.svgGroup);
                    item.dispose();
                }
            }
            else {
                const p = this.edges.indexOf(item);
                if (p != -1) {
                    this._vertices.splice(p, 1);
                    this.svgGroup.removeChild(item.svgGroup);
                    item.dispose();
                }
            }
        }
        /*
        clear(svg: HTMLElement) {
            this._nodes.forEach(function (x) { x.setGraph(null) });
            this._edges.forEach(function (x) { x.setGraph(null) });
            this._nodes = [];
            this._edges = [];
        }
        */
        removeGraph(svg) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        }
        /**
         * グラフの領域を表すRectangleを返します。位置の基準はグラフが追加されているNodeです。
         */
        getRegion() {
            const rects = this.vertices.map((v) => v.region);
            const rect = GraphTableSVG.Rectangle.merge(rects);
            rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
            return rect;
        }
        /**
         * ObjectIDから頂点もしくは辺を返します。
         * @param id
         */
        getObjectByObjectID(id) {
            for (let i = 0; i < this.vertices.length; i++) {
                if (this.vertices[i].containsObjectID(id)) {
                    return this.vertices[i];
                }
            }
            return null;
        }
        /**
         * 与えられた二つの頂点と辺を接続します。
         * @param node1
         * @param edge
         * @param node2
         * @param outcomingInsertIndex
         * @param incomingInsertIndex
         */
        connect(node1, edge, node2, outcomingInsertIndex = node1.outcomingEdges.length, incomingInsertIndex = node2.incomingEdges.length) {
            //this._connect(node1, edge, node2);
            node1.insertOutcomingEdge(edge, outcomingInsertIndex);
            node2.insertIncomingEdge(edge, incomingInsertIndex);
            const i = this.roots.indexOf(node1);
            const j = this.roots.indexOf(node2);
            if (j != -1) {
                if (i == -1) {
                    this.roots[j] = node1;
                }
                else {
                    this.roots.splice(j, 1);
                }
            }
            /*
            if (!(node1.id in this.outcomingEdgesDic)) {
                this.outcomingEdgesDic[node1.id] = [];
            }
            */
            //node1.outcomingEdges.splice(insertIndex, 0, edge);
            //node2.incomingEdges.push(edge);
        }
        /**
         * 与えられたNodeOrderに従って与えられた頂点を根とした部分木の整列された頂点配列を返します。
         * @param order
         * @param node
         */
        getOrderedVertices(order, node = null) {
            const r = [];
            if (node == null) {
                this.roots.forEach((v) => {
                    this.getOrderedVertices(order, v).forEach((w) => {
                        r.push(w);
                    });
                });
            }
            else {
                const edges = node.outcomingEdges;
                if (order == GraphTableSVG.NodeOrder.Preorder) {
                    r.push(node);
                    edges.forEach((v) => {
                        this.getOrderedVertices(order, v.endVertex).forEach((w) => {
                            r.push(w);
                        });
                    });
                }
                else if (order == GraphTableSVG.NodeOrder.Postorder) {
                    edges.forEach((v) => {
                        this.getOrderedVertices(order, v.endVertex).forEach((w) => {
                            r.push(w);
                        });
                    });
                    r.push(node);
                }
            }
            return r;
        }
        save() {
            //const id = 0;
            //this.nodes.forEach((v) => v.objectID = id++);
            //this.edges.forEach((v) => v.objectID = id++);
            const ids = this.vertices.map((v) => v.objectID);
            this.svgGroup.setAttribute("node", JSON.stringify(ids));
        }
        static setXY(text, rect, vAnchor, hAnchor) {
            let x = rect.x;
            let y = rect.y;
            text.setAttribute('x', x.toString());
            text.setAttribute('y', y.toString());
            const b2 = text.getBBox();
            const dy = b2.y - y;
            const dx = b2.x - x;
            y -= dy;
            if (vAnchor == GraphTableSVG.VerticalAnchor.Middle) {
                y += (rect.height - b2.height) / 2;
            }
            else if (vAnchor == GraphTableSVG.VerticalAnchor.Bottom) {
                y += rect.height - b2.height;
            }
            x -= dx;
            if (hAnchor == GraphTableSVG.HorizontalAnchor.Center) {
                x += (rect.width - b2.width) / 2;
            }
            else if (hAnchor == GraphTableSVG.HorizontalAnchor.Right) {
                x += rect.width - b2.width;
            }
            text.setAttribute('y', y.toString());
            text.setAttribute('x', x.toString());
        }
        static IsDescendantOfBody(node) {
            const parent = node.parentNode;
            if (parent == null) {
                return false;
            }
            else if (parent == document.body) {
                return true;
            }
            else {
                return Graph.IsDescendantOfBody(parent);
            }
        }
        static getRegion(items) {
            const rects = items.map((v) => v.getRegion());
            if (rects.length > 0) {
                return GraphTableSVG.Rectangle.merge(rects);
            }
            else {
                return new GraphTableSVG.Rectangle();
            }
        }
        createVBACode(id) {
            const dic = {};
            this.vertices.forEach((v, i) => dic[v.objectID] = i);
            this.edges.forEach((v, i) => dic[v.objectID] = i);
            const main = [];
            const sub = [];
            const lines = new Array(0);
            lines.push(`Sub create${id}(createdSlide As slide)`);
            lines.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
            lines.push(` Dim nodes(${this.vertices.length}) As Shape`);
            lines.push(` Dim edges(${this.edges.length}) As Shape`);
            this.vertices.forEach((v, i) => v.createVBACode(main, sub, dic));
            this.edges.forEach((v, i) => v.createVBACode(main, sub, dic));
            const [x1, y1] = GraphTableSVG.VBATranslateFunctions.splitCode(sub, `shapes_ As Shapes, nodes() As Shape, edges() As Shape`, `shapes_, nodes, edges`, id);
            lines.push(x1);
            lines.push(`End Sub`);
            lines.push(y1);
            return lines;
        }
    }
    Graph.idCounter = 0;
    Graph.defaultVertexClass = "--default-vertex-class";
    Graph.defaultEdgeClass = "--default-edge-class";
    Graph.vertexXIntervalName = "--vertex-x-interval";
    Graph.vertexYIntervalName = "--vertex-y-interval";
    Graph.objectIDName = "data-objectID";
    Graph.typeName = "data-type";
    GraphTableSVG.Graph = Graph;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GraphArrangement;
    (function (GraphArrangement) {
        function leaveBasedArrangement(forest, xInterval, yInterval) {
            let leafCounter = 0;
            forest.getOrderedVertices(GraphTableSVG.NodeOrder.Postorder).forEach((v) => {
                let x = 0;
                let y = 0;
                if (v.isLeaf) {
                    x = leafCounter * xInterval;
                    leafCounter++;
                }
                else {
                    v.children.forEach((w) => {
                        x += w.x;
                        if (y < w.y)
                            y = w.y;
                    });
                    x = x / v.children.length;
                    y += yInterval;
                }
                v.x = x;
                v.y = y;
            });
        }
        GraphArrangement.leaveBasedArrangement = leaveBasedArrangement;
        function reverse(graph, isX, isY) {
            if (graph.vertices.length > 0) {
                if (isY) {
                    const midY = middle(graph.vertices.map((v) => v.y));
                    graph.vertices.forEach((v) => {
                        if (v.y < midY) {
                            v.y += 2 * (midY - v.y);
                        }
                        else {
                            v.y -= 2 * (v.y - midY);
                        }
                    });
                }
                if (isX) {
                    const midX = middle(graph.vertices.map((v) => v.x));
                    graph.vertices.forEach((v) => {
                        if (v.x < midX) {
                            v.x += 2 * (midX - v.x);
                        }
                        else {
                            v.x -= 2 * (v.x - midX);
                        }
                    });
                }
            }
        }
        GraphArrangement.reverse = reverse;
        function average(items) {
            if (items.length > 0) {
                let y = 0;
                items.forEach((v) => {
                    y += v;
                });
                return y / items.length;
            }
            else {
                throw new Error();
            }
        }
        GraphArrangement.average = average;
        function middle(items) {
            if (items.length > 0) {
                let min = items[0];
                let max = items[0];
                items.forEach((w) => {
                    if (min > w)
                        min = w;
                    if (max < w)
                        max = w;
                });
                return (min + max) / 2;
            }
            else {
                throw new Error();
            }
        }
        GraphArrangement.middle = middle;
        function standardTreeArrangement(graph) {
            const xInterval = graph.vertexXInterval;
            const yInterval = graph.vertexYInterval;
            if (xInterval != null && yInterval != null) {
                if (graph.rootVertex != null) {
                    const rootTree = graph.rootVertex.tree;
                    const [x, y] = [rootTree.subTreeRoot.x, rootTree.subTreeRoot.y];
                    standardTreeArrangementSub(rootTree, xInterval, yInterval);
                    rootTree.setRootLocation(x, y);
                    //graph.update();
                }
            }
            else {
                throw new Error();
            }
        }
        GraphArrangement.standardTreeArrangement = standardTreeArrangement;
        function standardTreeArrangementSub(tree, xInterval, yInterval) {
            tree.subTreeRoot.x = 0;
            tree.subTreeRoot.y = 0;
            let leaves = 0;
            const children = tree.children;
            const leaveSizeWidthHalf = (tree.leaves.length * xInterval) / 2;
            let x = -leaveSizeWidthHalf;
            for (let i = 0; i < children.length; i++) {
                standardTreeArrangementSub(children[i].tree, xInterval, yInterval);
                const w = (children[i].tree.leaves.length * xInterval) / 2;
                children[i].tree.setRootLocation(x + w, yInterval);
                x += children[i].tree.leaves.length * xInterval;
            }
        }
    })(GraphArrangement = GraphTableSVG.GraphArrangement || (GraphTableSVG.GraphArrangement = {}));
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class EdgeText {
        constructor(graph, edge, text) {
            this._svgText = GraphTableSVG.createText();
            this.svgText.textContent = text;
            edge.svgGroup.appendChild(this.svgText);
            this._edge = edge;
            edge.text = this;
        }
        /**
        テキスト要素を返します。
        */
        get svgText() {
            return this._svgText;
        }
        /**
        所属している辺を返します。
        */
        get edge() {
            return this._edge;
        }
        //private isReverse: boolean = false;
        /**
        テキストのX座標を返します。
        */
        get x() {
            return this.svgText.getX();
        }
        /**
        テキストのY座標を返します。
        */
        get y() {
            return this.svgText.getY();
        }
        getCenterPosition() {
            let x = (this.edge.x1 + this.edge.x2) / 2;
            let y = (this.edge.y1 + this.edge.y2) / 2;
            return [x, y];
        }
        /*
        public static create(graph: Graph, edge: Edge, text: string): EdgeText {
            let p = new EdgeText();
            p._svgText = createText();
            p.svgText.textContent = text;
            edge.svgGroup.appendChild(p.svgText);
            p.parentEdge = edge;
            edge.text = p;
            return p;
        }
        */
        /**
         * 再描画します。
         */
        update() {
            const [x, y] = this.getCenterPosition();
            this.svgText.setX(x);
            this.svgText.setY(y);
            const [x1, y1] = [this.edge.x1, this.edge.y1];
            const [x2, y2] = [this.edge.x2, this.edge.y2];
            const rad = Math.atan2(y2 - y1, x2 - x1);
            let rar = rad * (180 / Math.PI);
            if (rar > 90) {
                rar = rar - 180;
                if (this.svgText.textContent != null) {
                    this.svgText.textContent = EdgeText.reverse(this.svgText.textContent);
                }
            }
            this.svgText.setAttribute('transform', `rotate(${rar}, ${this.svgText.getX()}, ${this.svgText.getY()})`);
        }
        get fontSize() {
            return parseInt(this.svgText.getPropertyStyleValueWithDefault("font-size", "12"));
        }
        static reverse(str) {
            const rv = [];
            for (let i = 0, n = str.length; i < n; i++) {
                rv[i] = str.charAt(n - i - 1);
            }
            return rv.join("");
        }
        createVBACode(shapes, result) {
            const s = new Array(0);
            if (this.edge.graph != null) {
                const region = this.svgText.getBBox();
                const fontFamily = GraphTableSVG.VBATranslateFunctions.ToVBAFont(this.svgText.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
                const fontBold = GraphTableSVG.VBATranslateFunctions.ToFontBold(this.svgText.getPropertyStyleValueWithDefault("font-weight", "none"));
                const left = this.edge.graph.svgGroup.getX() + this.svgText.getX();
                let top = this.edge.graph.svgGroup.getY() + this.svgText.getY() - (this.fontSize / 2);
                s.push(`With ${shapes}.AddTextBox(msoTextOrientationHorizontal, ${left}, ${top},${region.width},${this.fontSize})`);
                s.push(`.TextFrame.TextRange.Text = "${this.svgText.textContent}"`);
                s.push(`.TextFrame.marginLeft = 0`);
                s.push(`.TextFrame.marginRight = 0`);
                s.push(`.TextFrame.marginTop = 0`);
                s.push(`.TextFrame.marginBottom = 0`);
                s.push(`.TextFrame.TextRange.Font.Size = ${this.fontSize}`);
                s.push(`.TextFrame.TextRange.Font.name = "${fontFamily}"`);
                s.push(`.TextFrame.TextRange.Font.Bold = ${fontBold}`);
                s.push(`.IncrementRotation(${this.svgText.transform.baseVal.getItem(0).angle})`);
                s.push(`End With`);
            }
            result.push(s);
        }
    }
    GraphTableSVG.EdgeText = EdgeText;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class Vertex {
        constructor(__graph, group, text) {
            this._graph = null;
            this._outcomingEdges = [];
            this._incomingEdges = [];
            this.observerFunc = (x) => {
                let b = false;
                for (let i = 0; i < x.length; i++) {
                    const p = x[i];
                    if (p.attributeName == "transform") {
                        b = true;
                    }
                }
                if (b)
                    this.localUpdate();
            };
            this.textObserverFunc = (x) => {
                for (let i = 0; i < x.length; i++) {
                    const p = x[i];
                    if (this.isLocated) {
                        let vAnchor = this.svgGroup.getPropertyStyleValue(GraphTableSVG.VerticalAnchorPropertyName);
                        if (vAnchor == null)
                            vAnchor = GraphTableSVG.VerticalAnchor.Middle;
                        let hAnchor = this.svgGroup.getPropertyStyleValue(GraphTableSVG.HorizontalAnchorPropertyName);
                        if (hAnchor == null)
                            hAnchor = GraphTableSVG.HorizontalAnchor.Center;
                        GraphTableSVG.Graph.setXY(this.svgText, this.innerRectangle, vAnchor, hAnchor);
                    }
                }
            };
            this._svgGroup = group;
            //this._svgGroup = GraphTableSVG.createGroup(className);
            this.svgGroup.setAttribute(GraphTableSVG.Graph.objectIDName, (GraphTableSVG.Graph.idCounter++).toString());
            this.svgGroup.setAttribute(GraphTableSVG.Graph.typeName, "vertex");
            this._graph = __graph;
            __graph.add(this);
            this._svgText = GraphTableSVG.createText(this.svgGroup.getPropertyStyleValue(Vertex.defaultTextClass));
            this.svgText.textContent = text;
            this.svgGroup.appendChild(this.svgText);
            this._observer = new MutationObserver(this.observerFunc);
            const option1 = { attributes: true };
            this._observer.observe(this.svgGroup, option1);
            this._textObserver = new MutationObserver(this.textObserverFunc);
            const option2 = { childList: true };
            this._textObserver.observe(this.svgText, option2);
            this.x = 0;
            this.y = 0;
            /*
            this.parent = parent;

            this.parent.svgGroup.appendChild(this.svgGroup);
            */
        }
        /**
        所属しているグラフを返します。
        */
        get graph() {
            return this._graph;
        }
        /**
        このVertexのグループを返します。
        */
        get svgGroup() {
            return this._svgGroup;
        }
        /**
        このVertexのテキストを返します。
        */
        get svgText() {
            return this._svgText;
        }
        /**
        入辺配列を返します。
        */
        get outcomingEdges() {
            return this._outcomingEdges;
        }
        /**
        出辺配列を返します。
        */
        get incomingEdges() {
            return this._incomingEdges;
        }
        /**
        テキストの取るべき領域を返します。
        */
        get innerRectangle() {
            const rect = new GraphTableSVG.Rectangle();
            rect.width = 0;
            rect.height = 0;
            rect.x = 0;
            rect.y = 0;
            return rect;
            //setXY(this.svgText, rect, VerticalAnchor.Middle, HorizontalAnchor.Center);
        }
        /**
        このVertexがBodyの子孫であるとき、Trueを返します。
        */
        get isLocated() {
            return GraphTableSVG.Graph.IsDescendantOfBody(this.svgGroup);
        }
        /**
        このVertexのObjectIDを返します。
        */
        get objectID() {
            const r = this.svgGroup.getAttribute(GraphTableSVG.Graph.objectIDName);
            if (r == null) {
                throw new Error();
            }
            else {
                return r;
            }
        }
        /**
        このVertexのX座標を返します。
        */
        get x() {
            return this.svgGroup.getX();
        }
        set x(value) {
            if (this.svgGroup.getX() != value) {
                this.svgGroup.setX(value);
            }
            /*
            if (this.graph != null) {
                this.graph.update();
            }
            */
        }
        /**
        このVertexのY座標を返します。
        */
        get y() {
            return this.svgGroup.getY();
        }
        set y(value) {
            if (this.svgGroup.getY() != value) {
                this.svgGroup.setY(value);
            }
        }
        /**
        このVertexの幅を返します。
        */
        get width() {
            return 0;
        }
        /**
        このVertexの高さを返します。
        */
        get height() {
            return 0;
        }
        /**
         * 接続部分のXY座標を返します。
         * @param type
         * @param x
         * @param y
         */
        getLocation(type, x, y) {
            return [this.x, this.y];
        }
        getConnectorType(type, x, y) {
            if (type == GraphTableSVG.ConnectorPosition.Auto) {
                return this.getAutoPosition(x, y);
            }
            else {
                return type;
            }
        }
        getAutoPosition(x, y) {
            return GraphTableSVG.ConnectorPosition.Top;
        }
        /**
        再描画します。
        */
        update() {
            return false;
        }
        localUpdate() {
            this.incomingEdges.forEach((v) => v.update());
            this.outcomingEdges.forEach((v) => v.update());
        }
        /**
        このVertexの領域を返します。
        */
        get region() {
            const p = new GraphTableSVG.Rectangle();
            p.x = this.x - (this.width / 2);
            p.y = this.y - (this.height / 2);
            p.width = this.width;
            p.height = this.height;
            return p;
        }
        /**
         * 与えられたObjectIDがこのVertexの中に含まれているときTrueを返します。
         * @param id
         */
        containsObjectID(id) {
            return this.svgGroup.getAttribute(GraphTableSVG.Graph.objectIDName) == id;
        }
        /**
        Vertexの輪郭を象っているインスタンスを返します。
        */
        get surface() {
            return null;
        }
        /**
         * 親Vertex配列を返します。
         */
        getParents() {
            return this.incomingEdges.filter((v) => v.beginVertex != null).map((v) => v.beginVertex);
        }
        /**
        親との間の辺を返します。
        */
        get parentEdge() {
            if (this.incomingEdges.length == 0) {
                return null;
            }
            else {
                return this.incomingEdges[0];
            }
        }
        /**
        このVertexの親を返します。
        */
        get parent() {
            if (this.parentEdge == null) {
                return null;
            }
            else {
                return this.parentEdge.beginVertex;
            }
        }
        /**
        このVertexに親がいないときTrueを返します。
        */
        get isNoParent() {
            return this.parent == null;
        }
        /**
        出辺配列を返します。
        */
        get children() {
            return this.outcomingEdges.filter((v) => v.endVertex != null).map((v) => v.endVertex);
        }
        /**
        このVertexが葉のときTrueを返します。
        */
        get isLeaf() {
            return this.outcomingEdges.length == 0;
        }
        /**
        このVertexの根を返します。
        */
        get firstNoParent() {
            let p = this;
            let parent = p.parent;
            while (parent != null) {
                p = parent;
                parent = p.parent;
            }
            return p;
        }
        get tree() {
            return new GraphTableSVG.VirtualSubTree(this);
        }
        /*
        get index(): number {
            if (this.isNoParent && this.graph != null) {
                return this.graph.roots.indexOf(this);
            } else {
                return -1;
            }
        }
        */
        save() {
            const p = this.outcomingEdges.map((v) => v.x1);
            const out = JSON.stringify(p);
            this.svgGroup.setAttribute("outcomingEdges", out);
        }
        /**
         * Vertexインスタンスを生成します。
         * @param graph
         * @param className
         * @param defaultSurfaceType
         *   "circle"ならばSVGCircleElement <br>
         *   "rectangle"ならばSVGRectangleElement
         */
        static create(graph, className = null, defaultSurfaceType = null) {
            className = className != null ? className : graph.defaultVertexClass;
            const g = GraphTableSVG.createGroup(className);
            graph.svgGroup.appendChild(g);
            const type1 = g.getPropertyStyleValue(Vertex.defaultSurfaceType);
            const type = defaultSurfaceType != null ? defaultSurfaceType :
                type1 != null ? type1 : "circle";
            let p;
            if (type == "circle") {
                p = new GraphTableSVG.CircleVertex(graph, g, "");
            }
            else if (type == "rectangle") {
                p = new GraphTableSVG.RectangleVertex(graph, g, "");
            }
            else {
                p = new Vertex(graph, g, "");
            }
            return p;
        }
        /**
         * 出辺を挿入します。
         * @param edge
         * @param insertIndex
         */
        insertOutcomingEdge(edge, insertIndex) {
            const p = this.outcomingEdges.indexOf(edge);
            if (p != -1) {
                throw new Error();
            }
            else {
                this.outcomingEdges.splice(insertIndex, 0, edge);
                //const s = this.outcomingEdges.map((v) => v.objectID).join(', ')
                //this.svgGroup.setAttribute("data-outcoming-edge", s);
                edge.beginVertex = this;
            }
        }
        /**
         * 出辺を削除します。
         * @param edge
         */
        removeOutcomingEdge(edge) {
            const p = this.outcomingEdges.indexOf(edge);
            if (p != null) {
                this.outcomingEdges.splice(p, 1);
                edge.beginVertex = null;
            }
        }
        /**
         * 入辺を挿入します。
         * @param edge
         * @param insertIndex
         */
        insertIncomingEdge(edge, insertIndex) {
            const p = this.incomingEdges.indexOf(edge);
            if (p != -1) {
                throw new Error();
            }
            else {
                this.incomingEdges.splice(insertIndex, 0, edge);
                edge.endVertex = this;
            }
        }
        /**
         * 入辺を削除します。
         * @param edge
         */
        removeIncomingEdge(edge) {
            const p = this.incomingEdges.indexOf(edge);
            if (p != null) {
                this.incomingEdges.splice(p, 1);
                edge.endVertex = null;
            }
        }
        /**
         * この頂点を廃棄します。廃棄された頂点はグラフから取り除かれます。
         */
        dispose() {
            while (this.incomingEdges.length > 0) {
                this.removeIncomingEdge(this.incomingEdges[0]);
            }
            while (this.outcomingEdges.length > 0) {
                this.removeOutcomingEdge(this.outcomingEdges[0]);
            }
            const prev = this.graph;
            this._graph = null;
            if (prev != null) {
                prev.remove(this);
            }
        }
        /**
        この頂点が廃棄されていたらTrueを返します。
        */
        get isDisposed() {
            return this.graph == null;
        }
        createVBACode(main, sub, indexDic) {
            if (this.graph != null) {
                //const subline: string[] = [];
                const i = indexDic[this.objectID];
                const left = this.graph.svgGroup.getX() + this.x - (this.width / 2);
                const top = this.graph.svgGroup.getY() + this.y - (this.height / 2);
                const surface = this.surface;
                const shape = surface instanceof SVGRectElement ? "msoShapeRectangle" : "msoShapeOval";
                sub.push([` Set nodes(${i}) = shapes_.AddShape(${shape}, ${left}, ${top}, ${this.width}, ${this.height})`]);
                if (surface == null) {
                    const backColor = GraphTableSVG.VBATranslateFunctions.colorToVBA("gray");
                    sub.push([` Call EditVertexShape(nodes(${i}), "${this.objectID}", msoFalse, ${backColor})`]);
                }
                else {
                    const backColor = GraphTableSVG.VBATranslateFunctions.colorToVBA(surface.getPropertyStyleValueWithDefault("fill", "gray"));
                    const lineColor = GraphTableSVG.VBATranslateFunctions.colorToVBA(surface.getPropertyStyleValueWithDefault("stroke", "gray"));
                    const strokeWidth = parseInt(surface.getPropertyStyleValueWithDefault("stroke-width", "4"));
                    const visible = surface.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                    sub.push([` Call EditVertexShape(nodes(${i}), "${this.objectID}", ${visible}, ${backColor})`]);
                    sub.push([` Call EditLine(nodes(${i}).Line, ${lineColor}, msoLineSolid, ${0}, ${strokeWidth}, ${visible})`]);
                }
                //const text = this.svgText.textContent == null ? "" : this.svgText.textContent;
                //const color = this.svgText.getPropertyStyleValueWithDefault("fill", "gray");
                const fontSize = parseInt(this.svgText.getPropertyStyleValueWithDefault("font-size", "24"));
                const fontFamily = GraphTableSVG.VBATranslateFunctions.ToVBAFont(this.svgText.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
                const fontBold = GraphTableSVG.VBATranslateFunctions.ToFontBold(this.svgText.getPropertyStyleValueWithDefault("font-weight", "none"));
                sub.push([` Call EditTextFrame(nodes(${i}).TextFrame, ${0}, ${0}, ${0}, ${0}, false, ppAutoSizeNone)`]);
                GraphTableSVG.VBATranslateFunctions.TranslateSVGTextElement(sub, this.svgText, `nodes(${i}).TextFrame.TextRange`);
                //sub.push(` Call EditTextRange(nodes(${i}).TextFrame.TextRange, ${VBATranslateFunctions.createStringFunction(text)}, ${0}, ${0}, ${VBATranslateFunctions.colorToVBA(color)})`);
                sub.push([` Call EditTextEffect(nodes(${i}).TextEffect, ${fontSize}, "${fontFamily}")`]);
            }
        }
    }
    //public symbol: symbol = Symbol();
    Vertex.defaultSurfaceType = "--default-surface-type";
    Vertex.defaultTextClass = "--default-text-class";
    Vertex.defaultSurfaceClass = "--default-surface-class";
    Vertex.id_counter = 0;
    GraphTableSVG.Vertex = Vertex;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    /**
     * 輪郭が円の頂点です。
     */
    class CircleVertex extends GraphTableSVG.Vertex {
        /**
         *
         * @param ___graph
         * @param className
         * @param text
         */
        constructor(__graph, group, text = "") {
            super(__graph, group, text);
            this._svgCircle = GraphTableSVG.createCircle(this.svgGroup.getPropertyStyleValue(GraphTableSVG.Vertex.defaultSurfaceClass));
            this.svgGroup.insertBefore(this.svgCircle, this.svgText);
            GraphTableSVG.setDefaultValue(this.svgCircle);
        }
        get svgCircle() {
            return this._svgCircle;
        }
        /**
        頂点の幅を返します。
        */
        get width() {
            return this.svgCircle.r.baseVal.value * 2;
        }
        /**
        頂点の高さを返します。
        */
        get height() {
            return this.svgCircle.r.baseVal.value * 2;
        }
        /**
        テキストの領域を返します。
        */
        get innerRectangle() {
            const r = this.svgCircle.r.baseVal.value;
            const rect = new GraphTableSVG.Rectangle();
            rect.width = r * 2;
            rect.height = r * 2;
            rect.x = -r;
            rect.y = -r;
            return rect;
            //setXY(this.svgText, rect, VerticalAnchor.Middle, HorizontalAnchor.Center);
        }
        /**
        頂点の半径を返します。
        */
        get radius() {
            return this.svgCircle.r.baseVal.value;
        }
        /**
         * 接続部分の座標を返します。
         * @param type
         * @param x
         * @param y
         */
        getLocation(type, x, y) {
            const r = (Math.sqrt(2) / 2) * this.radius;
            switch (type) {
                case GraphTableSVG.ConnectorPosition.Top:
                    return [this.x, this.y - this.radius];
                case GraphTableSVG.ConnectorPosition.RightUp:
                    return [this.x + r, this.y - r];
                case GraphTableSVG.ConnectorPosition.Right:
                    return [this.x + this.radius, this.y];
                case GraphTableSVG.ConnectorPosition.RightDown:
                    return [this.x + r, this.y + r];
                case GraphTableSVG.ConnectorPosition.Bottom:
                    return [this.x, this.y + this.radius];
                case GraphTableSVG.ConnectorPosition.LeftDown:
                    return [this.x - r, this.y + r];
                case GraphTableSVG.ConnectorPosition.Left:
                    return [this.x - this.radius, this.y];
                case GraphTableSVG.ConnectorPosition.LeftUp:
                    return [this.x - r, this.y - r];
                default:
                    const autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        }
        /**
        頂点の輪郭を返します。
        */
        get surface() {
            return this.svgCircle;
        }
        getRadian(x, y) {
            const [x2, y2] = [x - this.x, y - this.y];
            if (x2 < 0) {
                if (y2 < 0) {
                    return GraphTableSVG.ConnectorPosition.LeftUp;
                }
                else if (y2 > 0) {
                    return GraphTableSVG.ConnectorPosition.LeftDown;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Left;
                }
            }
            else if (x2 > 0) {
                if (y2 < 0) {
                    return GraphTableSVG.ConnectorPosition.RightUp;
                }
                else if (y2 > 0) {
                    return GraphTableSVG.ConnectorPosition.RightDown;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Right;
                }
            }
            else {
                if (y2 < 0) {
                    return GraphTableSVG.ConnectorPosition.Top;
                }
                else if (y2 > 0) {
                    return GraphTableSVG.ConnectorPosition.Bottom;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Top;
                }
            }
        }
        getAutoPosition(x, y) {
            const r = (Math.sqrt(2) / 2) * this.radius;
            const line1 = new GraphTableSVG.VLine(this.x, this.y, this.x + r, this.y + r);
            const line2 = new GraphTableSVG.VLine(this.x, this.y, this.x + r, this.y - r);
            const b1 = line1.contains(x, y);
            const b2 = line2.contains(x, y);
            if (b1) {
                if (b2) {
                    return GraphTableSVG.ConnectorPosition.Top;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Right;
                }
            }
            else {
                if (b2) {
                    return GraphTableSVG.ConnectorPosition.Left;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Bottom;
                }
            }
        }
    }
    GraphTableSVG.CircleVertex = CircleVertex;
    /**
     * 輪郭が四角形の頂点です。
     */
    class RectangleVertex extends GraphTableSVG.Vertex {
        constructor(__graph, group, text = "") {
            super(__graph, group, text);
            this._svgRectangle = GraphTableSVG.createRectangle(this.svgGroup.getPropertyStyleValue(GraphTableSVG.Vertex.defaultSurfaceClass));
            this.svgGroup.insertBefore(this.svgRectangle, this.svgText);
            GraphTableSVG.setDefaultValue(this.svgRectangle);
            this.svgRectangle.x.baseVal.value = -this.width / 2;
            this.svgRectangle.y.baseVal.value = -this.height / 2;
        }
        get svgRectangle() {
            return this._svgRectangle;
        }
        /**
        頂点の幅を返します。
        */
        get width() {
            return this.svgRectangle.width.baseVal.value;
        }
        /**
        頂点の高さを返します。
        */
        get height() {
            return this.svgRectangle.height.baseVal.value;
        }
        /**
        テキストの領域を返します。
        */
        get innerRectangle() {
            const rect = new GraphTableSVG.Rectangle();
            rect.width = this.width;
            rect.height = this.height;
            rect.x = -this.width / 2;
            rect.y = -this.height / 2;
            ;
            return rect;
            //setXY(this.svgText, rect, VerticalAnchor.Middle, HorizontalAnchor.Center);
        }
        /**
         * 接続部分の座標を返します。
         * @param type
         * @param x
         * @param y
         */
        getLocation(type, x, y) {
            const wr = this.width / 2;
            const hr = this.height / 2;
            switch (type) {
                case GraphTableSVG.ConnectorPosition.Top:
                    return [this.x, this.y - hr];
                case GraphTableSVG.ConnectorPosition.RightUp:
                case GraphTableSVG.ConnectorPosition.Right:
                case GraphTableSVG.ConnectorPosition.RightDown:
                    return [this.x + wr, this.y];
                case GraphTableSVG.ConnectorPosition.Bottom:
                    return [this.x, this.y + hr];
                case GraphTableSVG.ConnectorPosition.LeftDown:
                case GraphTableSVG.ConnectorPosition.Left:
                case GraphTableSVG.ConnectorPosition.LeftUp:
                    return [this.x - wr, this.y];
                default:
                    const autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        }
        getAutoPosition(x, y) {
            const wr = this.width / 2;
            const hr = this.height / 2;
            const line1 = new GraphTableSVG.VLine(this.x, this.y, this.x + wr, this.y + hr);
            const line2 = new GraphTableSVG.VLine(this.x, this.y, this.x + wr, this.y - hr);
            const b1 = line1.contains(x, y);
            const b2 = line2.contains(x, y);
            if (b1) {
                if (b2) {
                    return GraphTableSVG.ConnectorPosition.Top;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Right;
                }
            }
            else {
                if (b2) {
                    return GraphTableSVG.ConnectorPosition.Left;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Bottom;
                }
            }
        }
    }
    GraphTableSVG.RectangleVertex = RectangleVertex;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class VirtualSubTree {
        constructor(_root) {
            this.subTreeRoot = _root;
        }
        get children() {
            const p = this;
            return this.subTreeRoot.children.map(function (x, i, arr) {
                return x;
            });
        }
        get parentEdge() {
            return this.subTreeRoot.parentEdge;
        }
        getSubtree(result = []) {
            result.push(this.subTreeRoot);
            const children = this.children;
            if (children.length == 0) {
                return result;
            }
            else {
                children.forEach(function (x, i, arr) {
                    x.tree.getSubtree(result);
                });
                return result;
            }
        }
        getLeaves() {
            const p = this;
            return this.getSubtree().filter(function (x, i, arr) {
                return x.outcomingEdges.length == 0;
            });
        }
        getHeight() {
            const children = this.children;
            if (children.length == 0) {
                return 1;
            }
            else {
                let max = 0;
                children.forEach(function (x, i, arr) {
                    if (max < x.tree.getHeight())
                        max = x.tree.getHeight();
                });
                return max + 1;
            }
        }
        region() {
            const p = this.getSubtree();
            let minX = this.subTreeRoot.x;
            let maxX = this.subTreeRoot.x;
            let minY = this.subTreeRoot.y;
            let maxY = this.subTreeRoot.y;
            p.forEach(function (x, i, arr) {
                const rect = x.region;
                if (minX > rect.x)
                    minX = rect.x;
                if (maxX < rect.right)
                    maxX = rect.right;
                if (minY > rect.y)
                    minY = rect.y;
                if (maxY < rect.bottom)
                    maxY = rect.bottom;
            });
            const result = new GraphTableSVG.Rectangle();
            result.x = minX;
            result.y = minY;
            result.width = maxX - minX;
            result.height = maxY - minY;
            return result;
        }
        get mostLeftLeave() {
            return this.leaves[0];
        }
        addOffset(_x, _y) {
            this.getSubtree().forEach(function (x, i, arr) {
                x.x += _x;
                x.y += _y;
            });
        }
        setRectangleLocation(_x, _y) {
            const x = this.mostLeftLeave.region.x;
            const y = this.subTreeRoot.region.y;
            const diffX = _x - x;
            const diffY = _y - y;
            this.addOffset(diffX, diffY);
            //this.graph.updateEdges();
        }
        setRootLocation(_x, _y) {
            const x = this.subTreeRoot.x;
            const y = this.subTreeRoot.y;
            const diffX = _x - x;
            const diffY = _y - y;
            this.addOffset(diffX, diffY);
            //this.graph.updateEdges();
        }
        get leaves() {
            const p = this;
            return this.getSubtree().filter(function (x, i, arr) {
                return x.outcomingEdges.length == 0;
            });
        }
    }
    GraphTableSVG.VirtualSubTree = VirtualSubTree;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GUI;
    (function (GUI) {
        function createMacroModal(text) {
            const mainDiv = document.createElement("div");
            mainDiv.id = "macro-modal";
            mainDiv.innerHTML = `
    使い方（Powerpoint 2013）<br>
        新規ファイル<br>
        →表示→マクロ→作成<br>
        →生成したコードをユーザーフォームに貼り付ける<br>
        →F5 or ユーザーフォームを実行<br>
        →木が貼られたスライドが１ページ目に挿入される<br>
        ※サイズの大きすぎる木はマクロ実行時にエラーが出ます。
        <br>
        <textarea id="codeBox" rows="8" cols="100" style="overflow:auto;"></textarea>
        <button class="btn" onClick="GraphTableSVG.GUI.copyAndCloseMacroModal();">
            クリップボードにコピー
        </button>
    `;
            mainDiv.style.position = "fixed";
            mainDiv.style.zIndex = "16";
            mainDiv.style.width = "900px";
            mainDiv.style.height = "400px";
            mainDiv.style.left = `${((window.outerWidth - parseInt(mainDiv.style.width)) / 2)}px`;
            mainDiv.style.top = `${((window.outerHeight - parseInt(mainDiv.style.height)) / 2)}px`;
            mainDiv.style.display = "inline";
            mainDiv.style.backgroundColor = "#ffffff";
            document.body.appendChild(mainDiv);
            const cnt = document.getElementById("codeBox");
            cnt.value = text;
            const bgDiv = document.createElement("div");
            document.body.appendChild(bgDiv);
            bgDiv.style.width = "100%";
            bgDiv.style.height = "100%";
            bgDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
            bgDiv.style.position = "fixed";
            bgDiv.style.top = "0";
            bgDiv.style.left = "0";
            bgDiv.id = "modal-bg";
            bgDiv.style.zIndex = "5";
            bgDiv.style.display = "inline";
            bgDiv.onclick = removeMacroModal;
            //$("body").append('<div id="modal-bg" style="z-index:5"></div>');
        }
        GUI.createMacroModal = createMacroModal;
        function removeMacroModal() {
            const div1 = document.getElementById("macro-modal");
            const div2 = document.getElementById("modal-bg");
            if (div1 != null)
                document.body.removeChild(div1);
            if (div2 != null)
                document.body.removeChild(div2);
        }
        GUI.removeMacroModal = removeMacroModal;
        function copyAndCloseMacroModal() {
            const cnt = document.getElementById("codeBox");
            cnt.select();
            window.document.execCommand('copy');
            alert('クリップボードにコピーしました。');
            removeMacroModal();
        }
        GUI.copyAndCloseMacroModal = copyAndCloseMacroModal;
        function setSVGBoxSize(box, item1, item2) {
            if (item1 instanceof GraphTableSVG.Rectangle) {
                if (item2 instanceof GraphTableSVG.Padding) {
                    const w = item1.right + item2.left + item2.right;
                    const h = item1.bottom + item2.top + item2.bottom;
                    setSVGBoxSize(box, w, h);
                }
                else {
                    throw new Error();
                }
            }
            else {
                if (item2 instanceof GraphTableSVG.Padding) {
                    throw new Error();
                }
                else {
                    const width = `${item1}px`;
                    const height = `${item2}px`;
                    if (box.style.width != width || box.style.height != height) {
                        box.style.width = width;
                        box.style.height = height;
                        box.setAttribute(`viewBox`, `0 0 ${item1} ${item2}`);
                    }
                }
            }
        }
        GUI.setSVGBoxSize = setSVGBoxSize;
        function GetURLParameters() {
            const arg = new Object;
            const pair = location.search.substring(1).split('&');
            for (let i = 0; pair[i]; i++) {
                const kv = pair[i].split('=');
                arg[kv[0]] = kv[1];
            }
            return arg;
        }
        GUI.GetURLParameters = GetURLParameters;
    })(GUI = GraphTableSVG.GUI || (GraphTableSVG.GUI = {}));
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class Cell {
        /*
        private _textObserver: MutationObserver;
        private _textObserverFunc: MutationCallback = (x: MutationRecord[]) => {
            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                for (let j = 0; j < p.addedNodes.length; j++) {
                    const item = p.addedNodes.item(j);
                    console.log(`${this.table.isDrawing} ${this.table.isAutoResized}`)
                    console.log(this.svgText.textContent);

                    if (item.nodeName == "#text") {
                        if (!this.table.isDrawing && this.table.isAutoResized) {
                            this.table.resize();
                        }
                    }
                }
            }
        };
        */
        constructor(parent, _px, _py, cellClass = null, borderClass = null) {
            this._observerFunc = (x) => {
                for (let i = 0; i < x.length; i++) {
                    const p = x[i];
                    if (p.attributeName == "style" || p.attributeName == "class") {
                        this.localUpdate();
                    }
                }
            };
            this._svgGroup = GraphTableSVG.createGroup();
            this._table = parent;
            this.table.svgGroup.insertBefore(this.svgGroup, this.table.svgGroup.firstChild);
            if (cellClass != null)
                this.svgGroup.setAttribute("class", cellClass);
            //this.padding = new Padding();
            this.cellX = _px;
            this.cellY = _py;
            this._masterID = this.ID;
            this._svgBackground = Cell.createCellRectangle(this.defaultBackgroundClass);
            this._svgText = GraphTableSVG.createText(this.defaultTextClass);
            this.svgGroup.appendChild(this.svgBackground);
            GraphTableSVG.setDefaultValue(this.svgBackground);
            this.svgGroup.appendChild(this.svgText);
            /*
            const circle = createRectangle();
            circle.style.fill = "blue";
            this.rect = circle;
            this.svgGroup.appendChild(circle);
            */
            //this.parent.svgGroup.appendChild(this.svgGroup);
            this.topBorder = GraphTableSVG.createLine(0, 0, 0, 0, borderClass);
            this.leftBorder = GraphTableSVG.createLine(0, 0, 0, 0, borderClass);
            this.rightBorder = GraphTableSVG.createLine(0, 0, 0, 0, borderClass);
            this.bottomBorder = GraphTableSVG.createLine(0, 0, 0, 0, borderClass);
            this.table.svgGroup.appendChild(this.topBorder);
            this.table.svgGroup.appendChild(this.leftBorder);
            this.table.svgGroup.appendChild(this.rightBorder);
            this.table.svgGroup.appendChild(this.bottomBorder);
            const option1 = { childList: true, subtree: true };
            this.table.cellTextObserver.observe(this.svgText, option1);
            this._observer = new MutationObserver(this._observerFunc);
            const option2 = { attributes: true };
            this._observer.observe(this.svgGroup, option2);
            /*
            this.verticalAnchor = VerticalAnchor.Middle;
            this.horizontalAnchor = HorizontalAnchor.Left;
            */
        }
        get innerExtraPaddingLeft() {
            const p = this.fontSize;
            return p / 16;
        }
        get innerExtraPaddingRight() {
            const p = this.fontSize;
            return p / 16;
        }
        get masterID() {
            return this._masterID;
        }
        /**
        セルの上にある枠を返します
        */
        get topBorder() {
            return this._topBorder;
        }
        /**
        セルの上にある枠を設定します
        */
        set topBorder(line) {
            this._topBorder = line;
        }
        /**
        セルの左にある枠を返します
        */
        get leftBorder() {
            return this._leftBorder;
        }
        /**
        セルの左にある枠を設定します
        */
        set leftBorder(line) {
            this._leftBorder = line;
        }
        /**
        セルの右にある枠を返します
        */
        get rightBorder() {
            return this._rightBorder;
        }
        /**
        セルの右にある枠を設定します
        */
        set rightBorder(line) {
            this._rightBorder = line;
        }
        /**
        セルの下にある枠を返します
        */
        get bottomBorder() {
            return this._bottomBorder;
        }
        /**
        セルの下にある枠を設定します
        */
        set bottomBorder(line) {
            this._bottomBorder = line;
        }
        /**
        所属しているTableを返します。
        */
        get table() {
            return this._table;
        }
        /**
        セルの背景を表現しているSVGRectElementを返します。
        */
        get svgBackground() {
            return this._svgBackground;
        }
        /**
        セルのテキストを表現しているSVGTextElementを返します。
        */
        get svgText() {
            return this._svgText;
        }
        /**
        セルを表しているSVGGElementを返します。
        */
        get svgGroup() {
            return this._svgGroup;
        }
        get fontSize() {
            const p = this.svgText.getPropertyStyleValueWithDefault("font-size", "24");
            const p2 = parseInt(p);
            return p2;
        }
        /**
        テキストとセル間の左のパディング値を返します。
        */
        get paddingLeft() {
            return GraphTableSVG.parsePXString(this.svgGroup.getPropertyStyleValue("padding-left"));
        }
        /**
        テキストとセル間の右のパディング値を返します。
        */
        get paddingRight() {
            return GraphTableSVG.parsePXString(this.svgGroup.getPropertyStyleValue("padding-right"));
        }
        /**
        テキストとセル間の上のパディング値を返します。
        */
        get paddingTop() {
            return GraphTableSVG.parsePXString(this.svgGroup.getPropertyStyleValue("padding-top"));
        }
        /**
        テキストとセル間の下のパディング値を返します。
        */
        get paddingBottom() {
            return GraphTableSVG.parsePXString(this.svgGroup.getPropertyStyleValue("padding-bottom"));
        }
        /**
        テキストの水平方向の配置設定を返します。
        */
        get horizontalAnchor() {
            return this.svgGroup.getPropertyStyleValue(GraphTableSVG.HorizontalAnchorPropertyName);
        }
        /**
        テキストの水平方向の配置設定を設定します。
        */
        set horizontalAnchor(value) {
            if (this.horizontalAnchor != value)
                this.svgGroup.setPropertyStyleValue(GraphTableSVG.HorizontalAnchorPropertyName, value);
        }
        /**
        テキストの垂直方向の配置設定を返します。
        */
        get verticalAnchor() {
            return this.svgGroup.getPropertyStyleValue(GraphTableSVG.VerticalAnchorPropertyName);
        }
        /**
        テキストの垂直方向の配置設定を設定します。
        */
        set verticalAnchor(value) {
            if (this.verticalAnchor != value)
                this.svgGroup.setPropertyStyleValue(GraphTableSVG.VerticalAnchorPropertyName, value);
        }
        /**
        単位セルを基準にした自身のX座標を返します。
        */
        get cellX() {
            return Number(this.svgGroup.getAttribute("cellX"));
        }
        /**
        単位セルを基準にした自身のX座標を設定します。
        */
        set cellX(value) {
            if (this.cellX != value)
                this.svgGroup.setAttribute("cellX", value.toString());
        }
        /**
        単位セルを基準にした自身のY座標を返します。
        */
        get cellY() {
            return Number(this.svgGroup.getAttribute("cellY"));
        }
        /**
        単位セルを基準にした自身のY座標を設定します。
        */
        set cellY(value) {
            if (this.cellY != value)
                this.svgGroup.setAttribute("cellY", value.toString());
        }
        /**
        SVGTextElement生成時に設定するクラス名を返します。
        */
        get defaultTextClass() {
            const r = this.svgGroup.getPropertyStyleValue(Cell.defaultTextClass);
            return r;
        }
        /**
        SVGBackElement生成時に設定するクラス名を返します。
        */
        get defaultBackgroundClass() {
            return this.svgGroup.getPropertyStyleValue(Cell.defaultBackgroundClassName);
        }
        /**
        未定義
        */
        get logicalWidth() {
            if (this.isMaster) {
                let w = 0;
                let now = this;
                while (now != null && this.ID == now.masterID) {
                    now = this.rightCell;
                    w++;
                }
                return w;
            }
            else {
                return 0;
            }
        }
        /**
        未定義
        */
        get logicalHeight() {
            if (this.isMaster) {
                let h = 0;
                let now = this;
                while (now != null && this.ID == now.masterID) {
                    now = this.bottomCell;
                    h++;
                }
                return h;
            }
            else {
                return 0;
            }
        }
        /**
        CellがDocumentのDOMに所属しているかどうかを返します。
        */
        get isLocated() {
            return GraphTableSVG.Graph.IsDescendantOfBody(this.svgGroup);
        }
        /**
        セルが取るべき幅を返します。
        */
        get calculatedWidth() {
            if (this.isLocated) {
                return this.svgText.getBBox().width + this.innerExtraPaddingLeft + this.innerExtraPaddingRight
                    + GraphTableSVG.parsePXString(this.svgGroup.style.paddingLeft) + GraphTableSVG.parsePXString(this.svgGroup.style.paddingRight);
            }
            else {
                return 0;
            }
        }
        /**
        セルが取るべき高さを返します。
        */
        get calculatedHeight() {
            if (this.isLocated) {
                return this.svgText.getBBox().height + GraphTableSVG.parsePXString(this.svgGroup.style.paddingTop) + GraphTableSVG.parsePXString(this.svgGroup.style.paddingBottom);
            }
            else {
                return 0;
            }
        }
        /**
         *セルのサイズを再計算します。
         */
        resize() {
            if (this.width < this.calculatedWidth) {
                this.width = this.calculatedWidth;
            }
            if (this.height < this.calculatedHeight) {
                this.height = this.calculatedHeight;
            }
        }
        /**
         * 再描画します。
         */
        localUpdate() {
            const innerRect = new GraphTableSVG.Rectangle();
            innerRect.x = this.innerExtraPaddingLeft + this.paddingLeft;
            innerRect.y = this.paddingTop;
            innerRect.height = this.height - this.paddingTop - this.paddingBottom;
            innerRect.width = this.width - this.innerExtraPaddingLeft - this.innerExtraPaddingRight - this.paddingLeft - this.paddingRight;
            GraphTableSVG.Graph.setXY(this.svgText, innerRect, this.verticalAnchor, this.horizontalAnchor);
        }
        /**
         *セルの位置を再計算します。
         */
        relocation() {
            if (!GraphTableSVG.Graph.IsDescendantOfBody(this.svgGroup))
                return;
            this.topBorder.x1.baseVal.value = this.x;
            this.topBorder.x2.baseVal.value = this.x + this.width;
            this.topBorder.y1.baseVal.value = this.y;
            this.topBorder.y2.baseVal.value = this.topBorder.y1.baseVal.value;
            this.leftBorder.x1.baseVal.value = this.x;
            this.leftBorder.x2.baseVal.value = this.leftBorder.x1.baseVal.value;
            this.leftBorder.y1.baseVal.value = this.y;
            this.leftBorder.y2.baseVal.value = this.y + this.height;
            this.rightBorder.x1.baseVal.value = this.x + this.width;
            this.rightBorder.x2.baseVal.value = this.rightBorder.x1.baseVal.value;
            this.rightBorder.y1.baseVal.value = this.y;
            this.rightBorder.y2.baseVal.value = this.y + this.height;
            this.bottomBorder.x1.baseVal.value = this.x;
            this.bottomBorder.x2.baseVal.value = this.x + this.width;
            this.bottomBorder.y1.baseVal.value = this.y + this.height;
            this.bottomBorder.y2.baseVal.value = this.bottomBorder.y1.baseVal.value;
            //this.textSVG.x.baseVal.getItem(0).value = 0;
            //const text_x = 0;
            //const text_y = 0;
            this.localUpdate();
        }
        get isMaster() {
            return this.ID == this.masterID;
        }
        get isSlave() {
            return !this.isMaster;
        }
        /**
        セルのIDを返します。
        */
        get ID() {
            return this.cellX + (this.cellY * this.table.width);
        }
        /**
        上にあるセルを返します。
        */
        get upCell() {
            return this.cellY != 0 ? this.table.cells[this.cellY - 1][this.cellX] : null;
        }
        /**
        左にあるセルを返します。
        */
        get leftCell() {
            return this.cellX != 0 ? this.table.cells[this.cellY][this.cellX - 1] : null;
        }
        /**
        右にあるセルを返します。
        */
        get rightCell() {
            return this.cellX + 1 != this.table.width ? this.table.cells[this.cellY][this.cellX + 1] : null;
        }
        /**
        下にあるセルを返します。
        */
        get bottomCell() {
            return this.cellY + 1 != this.table.height ? this.table.cells[this.cellY + 1][this.cellX] : null;
        }
        get bottomRightCell() {
            return this.bottomCell == null ? null : this.bottomCell.rightCell == null ? null : this.bottomCell.rightCell;
        }
        get topRightCell() {
            return this.upCell == null ? null : this.upCell.rightCell == null ? null : this.upCell.rightCell;
        }
        get bottomLeftCell() {
            return this.bottomCell == null ? null : this.bottomCell.leftCell == null ? null : this.bottomCell.leftCell;
        }
        get topLeftCell() {
            return this.upCell == null ? null : this.upCell.leftCell == null ? null : this.upCell.leftCell;
        }
        /**
        未定義
        */
        get upperGroupCells() {
            if (this.isMaster) {
                let w = [];
                let now = this;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.upCell;
                }
                return w;
            }
            else {
                return [];
            }
        }
        /**
        未定義
        */
        get leftGroupCells() {
            if (this.isMaster) {
                let w = [];
                let now = this;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.leftCell;
                }
                return w;
            }
            else {
                return [];
            }
        }
        /**
        未定義
        */
        get leftBottomGroupCell() {
            if (this.isMaster) {
                return this.table.cells[this.cellY + this.logicalHeight - 1][this.cellX];
            }
            else {
                return null;
            }
        }
        /**
        未定義
        */
        get rightUpGroupCell() {
            if (this.isMaster) {
                return this.table.cells[this.cellY][this.cellX + this.logicalWidth - 1];
            }
            else {
                return null;
            }
        }
        /**
        未定義
        */
        get bottomGroupCells() {
            if (this.isMaster) {
                let w = [];
                let now = this.leftBottomGroupCell;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.bottomCell;
                }
                return w;
            }
            else {
                return [];
            }
        }
        /**
        未定義
        */
        get rightGroupCells() {
            if (this.isMaster) {
                let w = [];
                let now = this.rightUpGroupCell;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.rightCell;
                }
                return w;
            }
            else {
                return [];
            }
        }
        /*
        get upVirtualCells(): Cell[] {
            if (this.isMaster && this.cellY != 0) {
                const upperGroupCells = this.upperGroupCells;
                const r1 = upperGroupCells.map(function (x, i, self) {
                    return upperGroupCells[i].upCell;
                });
                const r2 = r1.filter(function (x, i, self) {
                    return r1.indexOf(x) === i;
                });
                return r2;
            } else {
                return [];
            }
        }
        */
        /**
        セルのX座標を返します。
        */
        get x() {
            return this.svgGroup.getX();
        }
        /**
        セルのX座標を設定します。
        */
        set x(value) {
            this.svgGroup.setX(value);
        }
        /**
        セルのY座標を返します。
        */
        get y() {
            return this.svgGroup.getY();
        }
        /**
        セルのY座標を設定します。
        */
        set y(value) {
            this.svgGroup.setY(value);
        }
        /**
        セルの幅を返します。
        */
        get width() {
            return this.svgBackground.width.baseVal.value;
        }
        /**
        セルの幅を設定します。
        */
        set width(value) {
            this.svgBackground.width.baseVal.value = value;
        }
        /**
        セルの高さを返します。
        */
        get height() {
            return this.svgBackground.height.baseVal.value;
        }
        /**
        セルの高さを設定します。
        */
        set height(value) {
            this.svgBackground.height.baseVal.value = value;
        }
        /**
        セルの領域を表すRectangleを返します。領域の基準は属しているテーブルのSVGGElementです。
        */
        get region() {
            const p = new GraphTableSVG.Rectangle(this.x, this.y, this.width, this.height);
            return p;
        }
        /*
        get fill(): string {
            return this.backRect.style.fill;
        }
        set fill(value : string) {
            this.backRect.style.fill = value;
        }
        */
        static createCellRectangle(className = null) {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.width.baseVal.value = 30;
            rect.height.baseVal.value = 30;
            if (className == null) {
                rect.style.fill = "#ffffff";
            }
            else {
                return GraphTableSVG.createRectangle(className);
            }
            return rect;
        }
    }
    Cell.defaultBackgroundClassName = "--default-background-class";
    Cell.defaultTextClass = "--default-text-class";
    GraphTableSVG.Cell = Cell;
})(GraphTableSVG || (GraphTableSVG = {}));
SVGGElement.prototype.getX = function () {
    const p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    return p.transform.baseVal.getItem(0).matrix.e;
};
SVGGElement.prototype.setX = function (value) {
    const p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    const a = this.transform.baseVal.getItem(0).matrix.a;
    const b = this.transform.baseVal.getItem(0).matrix.b;
    const c = this.transform.baseVal.getItem(0).matrix.c;
    const d = this.transform.baseVal.getItem(0).matrix.d;
    const e = value;
    const f = this.transform.baseVal.getItem(0).matrix.f;
    p.setAttribute('transform', `matrix(${a} ${b} ${c} ${d} ${e} ${f})`);
    //p.transform.baseVal.getItem(0).matrix.e = value;
};
SVGGElement.prototype.getY = function () {
    const p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    return this.transform.baseVal.getItem(0).matrix.f;
};
SVGGElement.prototype.setY = function (value) {
    const p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    const a = this.transform.baseVal.getItem(0).matrix.a;
    const b = this.transform.baseVal.getItem(0).matrix.b;
    const c = this.transform.baseVal.getItem(0).matrix.c;
    const d = this.transform.baseVal.getItem(0).matrix.d;
    const e = this.transform.baseVal.getItem(0).matrix.e;
    const f = value;
    p.setAttribute('transform', `matrix(${a} ${b} ${c} ${d} ${e} ${f})`);
    //this.transform.baseVal.getItem(0).matrix.f = value;
};
CSSStyleDeclaration.prototype.tryGetPropertyValue = function (name) {
    const p = this;
    const r = p.getPropertyValue(name).trim();
    if (r.length == 0) {
        return null;
    }
    else {
        return r;
    }
};
SVGElement.prototype.getActiveStyle = function () {
    const p = this;
    const r = p.getAttribute("class");
    if (r == null) {
        return p.style;
    }
    else {
        return getComputedStyle(p);
    }
};
SVGElement.prototype.getPropertyStyleValueWithDefault = function (name, defaultValue) {
    const item = this;
    const p = item.getPropertyStyleValue(name);
    if (p == null) {
        return defaultValue;
    }
    else {
        return p;
    }
};
SVGElement.prototype.getPropertyStyleValue = function (name) {
    const item = this;
    const p = item.style.getPropertyValue(name).trim();
    if (p.length == 0) {
        const r = item.getAttribute("class");
        if (r == null) {
            return null;
        }
        else {
            let css = GraphTableSVG.getStyleSheet(r);
            if (css == null)
                css = getComputedStyle(item);
            const p2 = css.getPropertyValue(name).trim();
            if (p2.length == 0) {
                return null;
            }
            else {
                return p2;
            }
        }
    }
    else {
        return p;
    }
};
SVGElement.prototype.setPropertyStyleValue = function (name, value) {
    const item = this;
    item.style.setProperty(name, value);
};
SVGTextElement.prototype.setLatexTextContent = function (str) {
    str += "_";
    const p = this;
    p.textContent = "";
    const h = parseInt(p.getPropertyStyleValueWithDefault("font-size", "12"));
    let mode = "";
    let tmp = "";
    const dy = (1 * h) / 3;
    let lastMode = "none";
    const smallFontSize = (2 * h) / 3;
    for (let i = 0; i < str.length; i++) {
        const c = str[i];
        if (c == "_" || c == "{" || c == "^" || c == "}") {
            mode += c;
            if (mode == "_{}") {
                const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.textContent = tmp;
                tspan.setAttribute("dy", `${dy}`);
                tspan.setAttribute("data-script", "subscript");
                tspan.style.fontSize = `${smallFontSize}pt`;
                p.appendChild(tspan);
                lastMode = "down";
                mode = "";
                tmp = "";
            }
            else if (mode == "^{}") {
                const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.textContent = tmp;
                tspan.setAttribute("dy", `-${dy}`);
                tspan.style.fontSize = `${smallFontSize}pt`;
                tspan.setAttribute("data-script", "superscript");
                p.appendChild(tspan);
                lastMode = "up";
                mode = "";
                tmp = "";
            }
            else if (mode == "_" || mode == "^") {
                const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.textContent = tmp;
                const normaldy = lastMode == "up" ? dy : lastMode == "down" ? -dy : 0;
                tspan.setAttribute("dy", `${normaldy}`);
                p.appendChild(tspan);
                lastMode = "none";
                tmp = "";
            }
        }
        else {
            tmp += c;
        }
    }
};
SVGTextElement.prototype.getX = function () {
    const p = this;
    if (p.x.baseVal.numberOfItems == 0) {
        p.setAttribute('x', "0");
    }
    return p.x.baseVal.getItem(0).value;
};
SVGTextElement.prototype.setX = function (value) {
    const p = this;
    if (p.x.baseVal.numberOfItems == 0) {
        p.setAttribute('x', "0");
    }
    //p.setAttribute('x', value.toString());
    p.x.baseVal.getItem(0).value = value;
};
SVGTextElement.prototype.getY = function () {
    const p = this;
    if (p.y.baseVal.numberOfItems == 0) {
        p.setAttribute('y', "0");
    }
    return p.y.baseVal.getItem(0).value;
};
SVGTextElement.prototype.setY = function (value) {
    const p = this;
    if (p.y.baseVal.numberOfItems == 0) {
        p.setAttribute('y', "0");
    }
    p.y.baseVal.getItem(0).value = value;
};
var GraphTableSVG;
(function (GraphTableSVG) {
    class Row {
        constructor(_table, _y) {
            this.table = _table;
            this._cellY = _y;
        }
        /**
        列の単位セルのY座標を返します。
        */
        get cellY() {
            return this._cellY;
        }
        get cells() {
            return this.table.cells[this.cellY];
        }
        get topBorders() {
            const r = [];
            this.cells.forEach((v) => {
                if (r.length == 0) {
                    r.push(v.topBorder);
                }
                else {
                    const last = r[r.length - 1];
                    if (last != v.topBorder)
                        r.push(v.topBorder);
                }
            });
            return r;
        }
        get bottomBorders() {
            const r = [];
            this.cells.forEach((v) => {
                if (r.length == 0) {
                    r.push(v.bottomBorder);
                }
                else {
                    const last = r[r.length - 1];
                    if (last != v.bottomBorder)
                        r.push(v.bottomBorder);
                }
            });
            return r;
        }
        get leftBorder() {
            return this.cells[0].leftBorder;
        }
        get rightBorder() {
            const cells = this.cells;
            return cells[cells.length - 1].rightBorder;
        }
        /**
         * 行内のセルのサイズを再計算します。
         */
        resize() {
            this.height = this.getMaxHeight();
        }
        /**
         * 行内のセルのY座標を設定します。
         *
         */
        setY(posY) {
            for (let x = 0; x < this.table.width; x++) {
                const cell = this.table.cells[this.cellY][x];
                cell.y = posY;
            }
        }
        getMaxHeight() {
            let height = 0;
            for (let x = 0; x < this.table.width; x++) {
                const cell = this.table.cells[this.cellY][x];
                if (height < cell.calculatedHeight)
                    height = cell.calculatedHeight;
                if (height < cell.height)
                    height = cell.height;
            }
            return height;
        }
        /**
        行の高さを返します。
        */
        get height() {
            return this.getMaxHeight();
        }
        /**
        行の高さを設定します。
        */
        set height(value) {
            let b = false;
            for (let x = 0; x < this.table.width; x++) {
                const cell = this.table.cells[this.cellY][x];
                if (cell.height != value) {
                    cell.height = value;
                    b = true;
                }
            }
            if (b && !this.table.isDrawing && this.table.isAutoResized)
                this.table.update();
        }
    }
    GraphTableSVG.Row = Row;
    class Column {
        constructor(_table, _x) {
            this.table = _table;
            this._cellX = _x;
        }
        /**
        列の単位セルのX座標を返します。
        */
        get cellX() {
            return this._cellX;
        }
        get cells() {
            const items = [];
            for (let i = 0; i < this.table.height; i++) {
                items.push(this.table.cells[i][this.cellX]);
            }
            return items;
        }
        getMaxWidth() {
            let width = 0;
            for (let y = 0; y < this.table.height; y++) {
                const cell = this.table.cells[y][this.cellX];
                if (width < cell.calculatedWidth)
                    width = cell.calculatedWidth;
                if (width < cell.width)
                    width = cell.width;
            }
            return width;
        }
        /**
         * 列内のセルのサイズを再計算します。
         */
        resize() {
            this.width = (this.getMaxWidth());
        }
        /**
         * 列のX座標を設定します。
         * @param posX
         */
        setX(posX) {
            for (let y = 0; y < this.table.height; y++) {
                const cell = this.table.cells[y][this.cellX];
                cell.x = posX;
            }
        }
        /**
        列の幅を返します。
        */
        get width() {
            return this.getMaxWidth();
        }
        /**
        列の幅を設定します。
        */
        set width(value) {
            let b = false;
            for (let y = 0; y < this.table.height; y++) {
                const cell = this.table.cells[y][this.cellX];
                if (cell.width != value) {
                    cell.width = value;
                    b = true;
                }
            }
            if (b && !this.table.isDrawing && this.table.isAutoResized)
                this.table.update();
        }
        get leftBorders() {
            const r = [];
            this.cells.forEach((v) => {
                if (r.length == 0) {
                    r.push(v.leftBorder);
                }
                else {
                    const last = r[r.length - 1];
                    if (last != v.leftBorder)
                        r.push(v.leftBorder);
                }
            });
            return r;
        }
        get rightBorders() {
            const r = [];
            this.cells.forEach((v) => {
                if (r.length == 0) {
                    r.push(v.rightBorder);
                }
                else {
                    const last = r[r.length - 1];
                    if (last != v.rightBorder)
                        r.push(v.rightBorder);
                }
            });
            return r;
        }
        get topBorder() {
            return this.cells[0].topBorder;
        }
        get bottomBorder() {
            const cells = this.cells;
            return cells[cells.length - 1].bottomBorder;
        }
    }
    GraphTableSVG.Column = Column;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class SVGToVBA {
        static create(items) {
            //const id = 0;
            const s = new Array(0);
            s.push(`Sub create()`);
            s.push(` Dim createdSlide As slide`);
            s.push(` Set createdSlide = ActivePresentation.Slides.Add(1, ppLayoutBlank)`);
            for (let i = 0; i < items.length; i++) {
                s.push(`Call create${i}(createdSlide)`);
            }
            s.push(`MsgBox "created"`);
            s.push(`End Sub`);
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item instanceof GraphTableSVG.Table) {
                    const lines = item.createVBACode(i, "createdSlide");
                    lines.forEach((v) => s.push(v));
                }
                else {
                    const lines = item.createVBACode(i);
                    lines.forEach((v) => s.push(v));
                }
            }
            s.push(SVGToVBA.cellFunctionCode);
            const r = VBATranslateFunctions.joinLines(s);
            return r;
        }
    }
    SVGToVBA.cellFunctionCode = `
Sub EditTable(table_ As table, cellInfo_() As Variant)
    Dim x As Integer
    Dim y As Integer
    
    For x = 1 To UBound(cellInfo_, 1)
        For y = 1 To UBound(cellInfo_, 2)
         Call EditCell(table_.cell(x, y), CStr(cellInfo_(x, y)(0)))
        Next
    Next
End Sub

Sub EditCell(cell_ As cell, text_ As String, backColor As Variant)
    cell_.Shape.TextFrame.TextRange.text = text_
    cell_.Shape.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))
End Sub
Sub EditCellFont(frame_ As TextFrame, fontSize As Double, fontName As String, color As Variant, fontBold As Integer)
    frame_.TextRange.Font.Size = fontSize
    frame_.TextRange.Font.name = fontName
    frame_.TextRange.Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))
    frame_.TextRange.Font.Bold = fontBold
End Sub




Sub EditRow(row_ As Row, height As Integer)
    row_.height = height
End Sub
Sub EditColumn(column_ As Column, width As Integer)
    column_.width = width
End Sub

Sub EditCellTextFrame(frame_ As TextFrame, marginTop As Double, marginBottom As Double, marginLeft As Double, marginRight As Double, vAnchor As Integer, hAnchor As Integer)
    frame_.marginLeft = marginLeft
    frame_.marginRight = marginRight
    frame_.marginTop = marginTop
    frame_.marginBottom = marginBottom
    frame_.VerticalAnchor = vAnchor
    frame_.TextRange.ParagraphFormat.Alignment = hAnchor
End Sub

Sub EditTextRange(range_ As TextRange, text As String)
    range_.text = text
End Sub
Sub EditTextRangeSub(range_ As TextRange, subBeg As Integer, subLen As Integer, script As String, color As Variant)
    range_.Characters(subBeg, subLen).Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))
    If script = "subscript" Then
    range_.Characters(subBeg, subLen).Font.Subscript = True
    End If
    If script = "superscript" Then
    range_.Characters(subBeg, subLen).Font.Superscript = True
    End If
End Sub



Sub EditShape(shape_ As Shape, name As String, visible As Integer, backColor As Variant)
    shape_.name = name
    shape_.Fill.visible = visible
    shape_.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))
End Sub
Sub EditCellBorder(line_ As LineFormat, foreColor As Variant, weight As Integer, transparent As Double)
    line_.foreColor.RGB = RGB(CInt(foreColor(0)), CInt(foreColor(1)), CInt(foreColor(2)))
    line_.weight = weight
    line_.Transparency = transparent
End Sub

Sub EditConnector(connector_ As ConnectorFormat, begShape As Shape, endShape As Shape, begPos As Integer, endPos As Integer)
    Call connector_.BeginConnect(begShape, begPos)
    Call connector_.EndConnect(endShape, endPos)
End Sub

Sub EditTextFrame(frame_ As TextFrame, marginTop As Double, marginBottom As Double, marginLeft As Double, marginRight As Double, wordWrap As Boolean, autoSize As Integer)
    frame_.autoSize = autoSize
    frame_.wordWrap = wordWrap
    frame_.marginLeft = marginLeft
    frame_.marginRight = marginRight
    frame_.marginTop = marginTop
    frame_.marginBottom = marginBottom
End Sub

Sub EditTextEffect(effect_ As TextEffectFormat, fontSize As Double, fontName As String)
 effect_.fontSize = fontSize
 effect_.fontName = fontName
End Sub

Sub EditVertexShape(shape_ As Shape, name As String, visible As Integer, backColor As Variant)
    shape_.name = name
    shape_.Fill.visible = visible
    shape_.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))
End Sub

Sub EditLine(line_ As LineFormat, foreColor As Variant, dashStyle As Integer, transparent As Double, weight As Integer, visible As Integer)
    line_.foreColor.RGB = RGB(CInt(foreColor(0)), CInt(foreColor(1)), CInt(foreColor(2)))
    line_.dashStyle = dashStyle
    line_.Transparency = transparent
    line_.weight = weight
    line_.visible = visible
End Sub


`;
    GraphTableSVG.SVGToVBA = SVGToVBA;
    function parseInteger(value) {
        if (value == "") {
            return 1;
        }
        else {
            return parseInt(value);
        }
    }
    GraphTableSVG.parseInteger = parseInteger;
    function visible(value) {
        if (value == "hidden") {
            return 1.0;
        }
        else {
            return 0;
        }
    }
    GraphTableSVG.visible = visible;
    class VBATranslateFunctions {
        static grouping80(codes) {
            let r = [];
            const result = [];
            codes.forEach(function (x, i, arr) {
                if (r.length + x.length >= 80) {
                    result.push(VBATranslateFunctions.joinLines(r));
                    r = [];
                }
                x.forEach((v) => r.push(v));
            });
            if (r.length > 0) {
                result.push(VBATranslateFunctions.joinLines(r));
                r = [];
            }
            return result;
        }
        static splitCode(codes, subArg, callArg, id) {
            const functions = [];
            const p = VBATranslateFunctions.grouping80(codes);
            p.forEach(function (x, i, arr) {
                functions.push(`Call SubFunction${id}_${i}(${callArg})`);
                const begin = `Sub SubFunction${id}_${i}(${subArg})`;
                const end = `End Sub`;
                p[i] = VBATranslateFunctions.joinLines([begin, x, end]);
            });
            return [VBATranslateFunctions.joinLines(functions), VBATranslateFunctions.joinLines(p)];
        }
        static ToFontBold(bold) {
            if (bold == "bold") {
                return "msotrue";
            }
            else {
                return "msofalse";
            }
        }
        static ToVerticalAnchor(value) {
            switch (value) {
                case "top": return "msoAnchorTop";
                case "middle": return "msoAnchorMiddle";
                case "bottom": return "msoAnchorBottom";
                default: return "msoAnchorTop";
            }
        }
        static ToHorizontalAnchor(value) {
            switch (value) {
                case "left": return "ppAlignLeft";
                case "center": return "ppAlignCenter";
                case "right": return "ppAlignRight";
                default: return "ppAlignLeft";
            }
        }
        static createStringFunction(item) {
            return item.length == 0 ? `""` : `"` + item + `"`;
        }
        static createArrayFunction(items) {
            let s = ``;
            for (let i = 0; i < items.length; i++) {
                s += items[i];
                if (i + 1 != items.length) {
                    s += `, `;
                }
            }
            return `Array(${s})`;
        }
        static createStringArrayFunction(items) {
            let s = ``;
            for (let i = 0; i < items.length; i++) {
                s += `"${items[i]}"`;
                if (i + 1 != items.length) {
                    s += `, `;
                }
            }
            return `Array(${s})`;
        }
        static createJagArrayFunction(items) {
            let s = ``;
            for (let i = 0; i < items.length; i++) {
                s += VBATranslateFunctions.createArrayFunction(items[i]);
                if (i + 1 != items.length)
                    s += `, `;
            }
            return `Array(${s})`;
        }
        static joinLines(lines) {
            let s = ``;
            for (let i = 0; i < lines.length; i++) {
                s += lines[i];
                if (i + 1 != lines.length)
                    s += `\n`;
            }
            return s;
        }
        static colorToVBA(color) {
            color = GraphTableSVG.Color.translateRGBCodeFromColorName(color);
            if (color.indexOf("rgb") != -1) {
                return color.replace("rgb", "Array");
            }
            else {
                return "Array(0, 0, 0)";
            }
        }
        static ToVBAFont(font) {
            font = font.replace(/"/g, "");
            font = font.replace(/'/g, "");
            return font;
        }
        static TranslateSVGTextElement(sub, item, range) {
            const text = item.textContent == null ? "" : item.textContent;
            const color = GraphTableSVG.Color.translateRGBCodeFromColorName2(item.getPropertyStyleValueWithDefault("fill", "gray"));
            sub.push([`${range}.text = "${item.textContent}"`]);
            //sub.push([`${range}.Font.color.RGB = RGB(CInt(${color.r}), CInt(${color.g}), CInt(${color.b}))`])
            if (item.children.length > 0) {
                let pos = 1;
                for (let i = 0; i < item.children.length; i++) {
                    const child = item.children.item(i);
                    if (child.textContent != null && child.textContent.length > 0) {
                        const len = child.textContent.length;
                        let f = child.getAttribute("data-script");
                        if (f == null) {
                            f = "";
                        }
                        sub.push([`Call EditTextRangeSub(${range},${pos}, ${len}, "${f}", Array(${color.r}, ${color.g}, ${color.b}))`]);
                        /*
                        if (f != null) {
                            if (f == "superscript") {

                                sub.push([`${range}.Characters(${pos}, ${len}).Font.Superscript = True`])
                            } else if (f == "subscript") {
                                sub.push([`${range}.Characters(${pos}, ${len}).Font.Subscript = True`])
                            }
                        }
                        */
                        pos += len;
                    }
                }
            }
        }
    }
    GraphTableSVG.VBATranslateFunctions = VBATranslateFunctions;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    /**
    テーブルを表します。
    */
    class Table {
        constructor(svgbox, width, height, _tableClassName = null) {
            this._cells = [];
            this._isDrawing = false;
            this._isAutoResized = false;
            this._cellTextObserverFunc = (x) => {
                let b = false;
                for (let i = 0; i < x.length; i++) {
                    const p = x[i];
                    if (p.type == "childList") {
                        b = true;
                    }
                    for (let j = 0; j < p.addedNodes.length; j++) {
                        const item = p.addedNodes.item(j);
                        if (item.nodeName == "#text") {
                            b = true;
                        }
                    }
                }
                if (b)
                    this.update();
            };
            this._svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgbox.appendChild(this.svgGroup);
            this._cellTextObserver = new MutationObserver(this._cellTextObserverFunc);
            //this.svgLineGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            //this.svgGroup.appendChild(this.svgLineGroup);
            if (_tableClassName != null)
                this.svgGroup.setAttribute("class", _tableClassName);
            for (let y = 0; y < height; y++) {
                this.insertRowFunction(y, width);
            }
        }
        get isDrawing() {
            return this._isDrawing;
        }
        get isAutoResized() {
            return this._isAutoResized;
        }
        set isAutoResized(value) {
            this._isAutoResized = value;
            if (value) {
                this.update();
            }
        }
        get cellTextObserver() {
            return this._cellTextObserver;
        }
        insertRowFunction(i, width = this.width) {
            const cell = [];
            for (let x = 0; x < width; x++) {
                cell[x] = this.createCell();
            }
            if (i < this.height) {
                for (let x = 0; x < width; x++) {
                    this.cells[i][x].topBorder = GraphTableSVG.createLine(0, 0, 0, 0);
                    this.svgGroup.appendChild(this.cells[i][x].topBorder);
                }
            }
            this.cells.splice(i, 0, cell);
            this.renumbering();
            for (let x = 0; x < width; x++) {
                this.updateBorder(this.cells[i][x]);
            }
        }
        createCell() {
            return new GraphTableSVG.Cell(this, 0, 0, this.defaultCellClass, this.defaultBorderClass);
        }
        updateBorder(cell) {
            if (cell.leftCell != null && cell.leftCell.rightBorder != cell.leftBorder) {
                this.svgGroup.removeChild(cell.leftBorder);
                cell.leftBorder = cell.leftCell.rightBorder;
            }
            if (cell.upCell != null && cell.upCell.bottomBorder != cell.topBorder) {
                this.svgGroup.removeChild(cell.topBorder);
                cell.topBorder = cell.upCell.bottomBorder;
            }
            if (cell.rightCell != null && cell.rightCell.leftBorder != cell.rightBorder) {
                this.svgGroup.removeChild(cell.rightCell.leftBorder);
                cell.rightCell.leftBorder = cell.rightBorder;
            }
            if (cell.bottomCell != null && cell.bottomCell.topBorder != cell.bottomBorder) {
                this.svgGroup.removeChild(cell.bottomCell.topBorder);
                cell.bottomCell.topBorder = cell.bottomBorder;
            }
        }
        renumbering() {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    this.cells[y][x].cellX = x;
                    this.cells[y][x].cellY = y;
                }
            }
            this.borders.forEach((v, i) => { v.setAttribute("borderID", i.toString()); });
            /*
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    this.setLine(this.cells[y][x]);
                }
            }
            */
        }
        //private _textClassName: string | null = "table_text";
        /**
        セルのインスタント生成時にこの値がインスタントのクラス名にセットされます。
        */
        get defaultCellClass() {
            return this.svgGroup.getPropertyStyleValue(Table.defaultCellClass);
        }
        /**
        ボーダーのインスタント生成時にこの値がインスタントのクラス名にセットされます。
        */
        get defaultBorderClass() {
            return this.svgGroup.getPropertyStyleValue(Table.defaultBorderClass);
        }
        /**
        各セルを格納している二次元ジャグ配列を返します。
        */
        get cells() {
            return this._cells;
        }
        /**
        テーブルを表現しているSVGGElementを返します。
        */
        get svgGroup() {
            return this._svgGroup;
        }
        /**
        テーブルの行方向の単位セルの数を返します。
        */
        get width() {
            if (this.cells.length == 0) {
                return 0;
            }
            else {
                return this.cells[0].length;
            }
        }
        /**
        テーブルの列方向の単位セルの数を返します。
        */
        get height() {
            return this.cells.length;
        }
        /**
        各行を表す配列を返します。読み取り専用です。
        */
        get rows() {
            const arr = new Array(0);
            for (let y = 0; y < this.height; y++) {
                arr.push(new GraphTableSVG.Row(this, y));
            }
            return arr;
        }
        /**
        各列を表す配列を返します。読み取り専用です。
        */
        get columns() {
            const arr = new Array(0);
            for (let x = 0; x < this.width; x++) {
                arr.push(new GraphTableSVG.Column(this, x));
            }
            return arr;
        }
        /**
        各セルを表す配列を返します。テーブルの左上のセルから右に向かってインデックスが割り当てられ、
        テーブル右下のセルが配列の最後の値となります。読み取り専用です。
        */
        get cellArray() {
            const arr = new Array(0);
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    arr.push(this.cells[y][x]);
                }
            }
            return arr;
        }
        /**
        各ボーダーを表す配列を返します。
        ボーダーの順番は未定義です。
        読み取り専用です。
        */
        get borders() {
            const arr = new Array(0);
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    if (arr.indexOf(this.cells[y][x].topBorder) == -1) {
                        arr.push(this.cells[y][x].topBorder);
                    }
                    if (arr.indexOf(this.cells[y][x].leftBorder) == -1) {
                        arr.push(this.cells[y][x].leftBorder);
                    }
                    if (arr.indexOf(this.cells[y][x].rightBorder) == -1) {
                        arr.push(this.cells[y][x].rightBorder);
                    }
                    if (arr.indexOf(this.cells[y][x].bottomBorder) == -1) {
                        arr.push(this.cells[y][x].bottomBorder);
                    }
                }
            }
            return arr;
        }
        /**
        新しい行をi番目の行に挿入します
        */
        insertRow(i) {
            this.insertRowFunction(i, this.width == 0 ? 1 : this.width);
        }
        /**
        新しい行を行の最後に追加します。
        */
        appendRow() {
            this.insertRow(this.height);
        }
        /**
        新しい列をi番目の列に挿入します。
        */
        insertColumn(i) {
            if (this.height > 0) {
                for (let y = 0; y < this.height; y++) {
                    const cell = this.createCell();
                    this.cells[y].splice(i, 0, cell);
                }
                if (i < this.height) {
                    for (let y = 0; y < this.height; y++) {
                        this.cells[y][i].leftBorder = GraphTableSVG.createLine(0, 0, 0, 0);
                        this.svgGroup.appendChild(this.cells[y][i].leftBorder);
                    }
                }
                this.renumbering();
                for (let y = 0; y < this.height; y++) {
                    this.updateBorder(this.cells[y][i]);
                }
            }
            else {
                this.insertRow(0);
            }
        }
        /**
        新しい列を最後の列に追加します。
        */
        appendColumn() {
            this.insertColumn(this.width);
        }
        /**
        各セルのサイズを再計算します。
        */
        update() {
            this._isDrawing = true;
            const rows = this.rows;
            const columns = this.columns;
            rows.forEach(function (x, i, arr) { x.resize(); });
            columns.forEach(function (x, i, arr) { x.resize(); });
            let height = 0;
            rows.forEach(function (x, i, arr) {
                x.setY(height);
                height += x.height;
            });
            let width = 0;
            columns.forEach(function (x, i, arr) {
                x.setX(width);
                width += x.width;
            });
            this.cellArray.forEach(function (x, i, arr) { x.relocation(); });
            this._isDrawing = false;
        }
        /**
        所属しているSVGタグ上でのテーブルの領域を表すRectangleクラスを返します。
        */
        getRegion() {
            const regions = this.cellArray.map((v) => v.region);
            const rect = GraphTableSVG.Rectangle.merge(regions);
            rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
            return rect;
        }
        /*
        private getCellFromID(id: number): Cell {
            const y = Math.floor(id / this.height);
            const x = id % this.width;
            return this.cells[y][x];
        }
        */
        createVBACode(id, slide) {
            const lines = new Array(0);
            lines.push(`Sub create${id}(createdSlide As slide)`);
            const [main, sub] = this.createVBAMainCode("createdSlide", id);
            lines.push(main);
            lines.push(`End Sub`);
            lines.push(sub);
            return lines;
        }
        /**
         * 現在のテーブルを表すVBAコードを返します。
         */
        createVBAMainCode(slideName, id) {
            const fstLines = [];
            const lines = new Array(0);
            fstLines.push(` Dim tableS As shape`);
            fstLines.push(` Dim table_ As table`);
            //lines.push(` Set tableS = CreateTable(createdSlide, ${table.height}, ${table.width})`);
            fstLines.push(` Set tableS = ${slideName}.Shapes.AddTable(${this.height}, ${this.width})`);
            fstLines.push(` tableS.Left = ${this.svgGroup.getX()}`);
            fstLines.push(` tableS.Top = ${this.svgGroup.getY()}`);
            //page.Shapes.AddTable(row_, column_)
            fstLines.push(` Set table_ = tableS.table`);
            const tableName = "table_";
            for (let y = 0; y < this.height; y++) {
                lines.push([` Call EditRow(${tableName}.Rows(${y + 1}), ${this.rows[y].height})`]);
            }
            for (let x = 0; x < this.width; x++) {
                lines.push([` Call EditColumn(${tableName}.Columns(${x + 1}), ${this.columns[x].width})`]);
            }
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    const cell = this.cells[y][x];
                    let color = GraphTableSVG.Color.translateRGBCodeFromColorName2(cell.svgBackground.getPropertyStyleValueWithDefault("fill", "gray"));
                    //const style = cell.svgBackground.style.fill != null ? VBATranslateFunctions.colorToVBA(cell.svgBackground.style.fill) : "";
                    GraphTableSVG.VBATranslateFunctions.TranslateSVGTextElement(lines, this.cells[y][x].svgText, `${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame.TextRange`);
                    lines.push([`${tableName}.cell(${y + 1},${x + 1}).Shape.Fill.ForeColor.RGB = RGB(CInt(${color.r}), CInt(${color.g}), CInt(${color.b}))`]);
                    //lines.push(` Call EditCell(${tableName}.cell(${y + 1},${x + 1}), "${cell.svgText.textContent}", ${color})`);
                }
            }
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    const cell = this.cells[y][x];
                    const fontSize = parseInt(cell.svgText.getPropertyStyleValueWithDefault("font-size", "12pt"));
                    const color = GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.svgText.getPropertyStyleValueWithDefault("fill", "gray"));
                    const fontFamily = GraphTableSVG.VBATranslateFunctions.ToVBAFont(cell.svgText.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
                    const fontBold = GraphTableSVG.VBATranslateFunctions.ToFontBold(cell.svgText.getPropertyStyleValueWithDefault("font-weight", "none"));
                    lines.push([` Call EditCellFont(${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame, ${fontSize}, "${fontFamily}", ${color}, ${fontBold})`]);
                }
            }
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    const cell = this.cells[y][x];
                    const vAnchor = GraphTableSVG.VBATranslateFunctions.ToVerticalAnchor(cell.verticalAnchor == null ? "" : cell.verticalAnchor);
                    const hAnchor = GraphTableSVG.VBATranslateFunctions.ToHorizontalAnchor(cell.horizontalAnchor == null ? "" : cell.horizontalAnchor);
                    lines.push([` Call EditCellTextFrame(${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame, ${cell.paddingTop}, ${cell.paddingBottom}, ${cell.paddingLeft}, ${cell.paddingRight}, ${vAnchor}, ${hAnchor})`]);
                }
            }
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    const cell = this.cells[y][x];
                    const upLineStyle = GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.topBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                    const upLineStrokeWidth = cell.topBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.topBorder.style.strokeWidth) : "";
                    const upLineVisibility = cell.topBorder.style.visibility != null ? GraphTableSVG.visible(cell.topBorder.style.visibility) : "";
                    lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderTop), ${upLineStyle}, ${upLineStrokeWidth}, ${upLineVisibility})`]);
                    const leftLineStyle = GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.leftBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                    const leftLineStrokeWidth = cell.leftBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.leftBorder.style.strokeWidth) : "";
                    const leftLineVisibility = cell.leftBorder.style.visibility != null ? GraphTableSVG.visible(cell.leftBorder.style.visibility) : "";
                    lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderLeft), ${leftLineStyle}, ${leftLineStrokeWidth}, ${leftLineVisibility})`]);
                    if (x + 1 == this.width) {
                        const rightLineStyle = GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.rightBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                        const rightLineStrokeWidth = cell.rightBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.rightBorder.style.strokeWidth) : "";
                        const rightLineVisibility = cell.rightBorder.style.visibility != null ? GraphTableSVG.visible(cell.rightBorder.style.visibility) : "";
                        lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderRight), ${rightLineStyle}, ${rightLineStrokeWidth}, ${rightLineVisibility})`]);
                    }
                    if (y + 1 == this.height) {
                        const bottomLineStyle = GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.bottomBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                        const bottomLineStrokeWidth = cell.bottomBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.bottomBorder.style.strokeWidth) : "";
                        const bottomLineVisibility = cell.bottomBorder.style.visibility != null ? GraphTableSVG.visible(cell.bottomBorder.style.visibility) : "";
                        lines.push([` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderBottom), ${bottomLineStyle}, ${bottomLineStrokeWidth}, ${bottomLineVisibility})`]);
                    }
                }
            }
            const x0 = GraphTableSVG.VBATranslateFunctions.joinLines(fstLines);
            const [x1, y1] = GraphTableSVG.VBATranslateFunctions.splitCode(lines, `${tableName} as Table`, `${tableName}`, id);
            return [GraphTableSVG.VBATranslateFunctions.joinLines([x0, x1]), y1];
        }
        /*
        private splitCode(tableName: string, codes: string[], id: number): [string, string] {
            const functions: string[] = [];

            const p = VBATranslateFunctions.grouping80(codes);
            p.forEach(function (x, i, arr) {
                functions.push(`Call SubFunction${id}_${i}(${tableName})`);
                const begin = `Sub SubFunction${id}_${i}(${tableName} As Table)`;
                const end = `End Sub`;
                p[i] = VBATranslateFunctions.joinLines([begin, x, end]);
            });
            return [VBATranslateFunctions.joinLines(functions), VBATranslateFunctions.joinLines(p)];
        }
        */
        removeTable(svg) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        }
    }
    Table.defaultCellClass = "--default-cell-class";
    Table.defaultBorderClass = "--default-border-class";
    GraphTableSVG.Table = Table;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    /**
     * SVGLineElementを生成します。
     * @param x
     * @param y
     * @param x2
     * @param y2
     * @param className
     */
    function createLine(x, y, x2, y2, className = null) {
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.x1.baseVal.value = x;
        line1.x2.baseVal.value = x2;
        line1.y1.baseVal.value = y;
        line1.y2.baseVal.value = y2;
        //line1.style.color = "black";
        if (className != null) {
            line1.setAttribute("class", className);
        }
        else {
            line1.style.stroke = "black";
        }
        //line1.style.visibility = "hidden";
        //line1.style.strokeWidth = `${5}`
        //line1.setAttribute('stroke', 'black');
        return line1;
    }
    GraphTableSVG.createLine = createLine;
    function createPath(x, y, x2, y2, className = null) {
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        line1.setAttribute("d", `M ${x} ${y} M ${x2} ${y2}`);
        if (className != null) {
            line1.setAttribute("class", className);
        }
        else {
            line1.style.stroke = "black";
            line1.style.fill = "none";
        }
        return line1;
    }
    GraphTableSVG.createPath = createPath;
    /**
     * SVGTextElementを生成します。
     * @param className
     */
    function createText(className = null) {
        const _svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        //_svgText.style.textAnchor = "middle";
        if (className == null) {
            _svgText.style.fill = "black";
            _svgText.style.fontSize = "14px";
            _svgText.style.fontWeight = "bold";
            _svgText.style.fontFamily = "Yu Gothic";
        }
        else {
            _svgText.setAttribute("class", className);
            //_svgText.className = className;
        }
        return _svgText;
    }
    GraphTableSVG.createText = createText;
    /**
     * SVGRectElementを生成します。
     * @param className
     */
    function createRectangle(className = null) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.width.baseVal.value = 30;
        rect.height.baseVal.value = 30;
        if (className == null) {
            rect.style.fill = "#ffffff";
            rect.style.stroke = "#000000";
        }
        else {
            rect.setAttribute("class", className);
        }
        return rect;
    }
    GraphTableSVG.createRectangle = createRectangle;
    /**
     * SVGGElementを生成します。
     * @param className
     */
    function createGroup(className = null) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        if (className != null) {
            g.setAttribute("class", className);
        }
        return g;
    }
    GraphTableSVG.createGroup = createGroup;
    /**
     * Styleの設定を消去します。
     * @param style
     */
    function resetStyle(style) {
        style.stroke = null;
        style.strokeWidth = null;
        style.fill = null;
        style.fontSize = null;
        style.fontWeight = null;
        style.fontFamily = null;
    }
    GraphTableSVG.resetStyle = resetStyle;
    const defaultRadiusName = "--default-radius";
    const defaultWidthName = "--default-width";
    const defaultHeightName = "--default-height";
    /**
     * SVGCircleElementを生成します。
     * @param className
     */
    function createCircle(className = null) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.r.baseVal.value = 30;
        if (className == null) {
            circle.style.stroke = "black";
            circle.style.strokeWidth = "1pt";
            circle.style.fill = "#ffffff";
        }
        else {
            circle.setAttribute("class", className);
            //const s = circle.getActiveStyle().getPropertyValue(defaultRadiusName).trim();
            //circle.className = className
            //console.log("d : " + circle.setAttribute("class", className));
        }
        //circle.style.fill = "#ffffff";
        circle.cx.baseVal.value = 0;
        circle.cy.baseVal.value = 0;
        //circle.r.baseVal.value = r;
        return circle;
    }
    GraphTableSVG.createCircle = createCircle;
    function setDefaultValue(item) {
        const className = item.getAttribute("class");
        if (className != null) {
            const style = getStyleSheet(className);
            if (style != null) {
                if (item instanceof SVGCircleElement) {
                    const s = style.getPropertyValue(defaultRadiusName).trim();
                    if (s.length > 0) {
                        item.r.baseVal.value = Number(s);
                    }
                }
                else {
                    const s1 = style.getPropertyValue(defaultWidthName).trim();
                    if (s1.length > 0) {
                        item.width.baseVal.value = Number(s1);
                    }
                    const s2 = style.getPropertyValue(defaultHeightName).trim();
                    if (s2.length > 0) {
                        item.height.baseVal.value = Number(s2);
                    }
                }
            }
        }
    }
    GraphTableSVG.setDefaultValue = setDefaultValue;
    function setClass(svg, className = null) {
        if (className == null) {
            svg.removeAttribute("class");
        }
        else {
            resetStyle(svg.style);
            svg.setAttribute("class", className);
        }
    }
    GraphTableSVG.setClass = setClass;
    function getCSSStyle(svg) {
        if (svg.getAttribute("class") == null) {
            return null;
        }
        else {
            const css = getComputedStyle(svg);
            return css;
        }
    }
    function setCSSToStyle(svg) {
        const css = getCSSStyle(svg);
        if (css != null) {
            let css2 = css;
            cssPropertyNames.forEach((v) => {
                const value = css2.getPropertyValue(v).trim();
                if (value.length > 0) {
                    svg.style.setProperty(v, value);
                }
            });
        }
    }
    GraphTableSVG.setCSSToStyle = setCSSToStyle;
    function setCSSToAllElementStyles(item) {
        if (typeof item == 'string') {
            const svgBox = document.getElementById(item);
            if (svgBox != null) {
                setCSSToAllElementStyles(svgBox);
            }
        }
        else {
            setCSSToStyle(item);
            for (let i = 0; i < item.children.length; i++) {
                const child = item.children.item(i);
                if (child != null) {
                    setCSSToAllElementStyles(child);
                }
            }
        }
    }
    GraphTableSVG.setCSSToAllElementStyles = setCSSToAllElementStyles;
    const cssPropertyNames = ["font-size", "fill", "stroke"];
    function getStyleSheet(name) {
        const name2 = "." + name;
        for (let i = 0; i < document.styleSheets.length; i++) {
            const sheet = document.styleSheets.item(i);
            const rules = sheet.cssRules || sheet.rules;
            if (rules != null) {
                for (let j = 0; j < rules.length; j++) {
                    const rule = rules.item(j);
                    if (rule.selectorText == name2) {
                        return rule.style;
                    }
                }
            }
        }
        return null;
    }
    GraphTableSVG.getStyleSheet = getStyleSheet;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    /**
     * 傾きや切片を計算できる線です。
     */
    class VLine {
        constructor(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        }
        get smallPoint() {
            if (this.x1 < this.x2) {
                return [this.x1, this.y1];
            }
            else {
                return [this.x2, this.y2];
            }
        }
        get largePoint() {
            if (this.x1 < this.x2) {
                return [this.x2, this.y2];
            }
            else {
                return [this.x1, this.y1];
            }
        }
        contains(x, y) {
            const lineY = this.getY(x);
            if (lineY == null) {
                return x < this.x1;
            }
            else {
                return y < lineY;
            }
        }
        getY(x) {
            const intercept = this.intercept;
            if (intercept == null) {
                return null;
            }
            else {
                if (this.slope == null) {
                    return null;
                }
                else {
                    return (this.slope * x) + intercept;
                }
            }
        }
        get slope() {
            const [x1, y1] = this.smallPoint;
            const [x2, y2] = this.largePoint;
            if (x2 - x1 == 0) {
                return null;
            }
            else {
                return (y2 - y1) / (x2 - x1);
            }
        }
        get intercept() {
            const [x1, y1] = this.smallPoint;
            const [x2, y2] = this.largePoint;
            if (this.slope == null) {
                return null;
            }
            else {
                return y1 - x1 * this.slope;
            }
        }
        get inverseSlope() {
            if (this.slope == 0) {
                return null;
            }
            else {
                if (this.slope == null) {
                    return null;
                }
                else {
                    return -1 / this.slope;
                }
            }
        }
        inverseIntercept(x, y) {
            if (this.slope == 0) {
                return null;
            }
            else {
                if (this.inverseSlope == null) {
                    return null;
                }
                else {
                    return y - (this.inverseSlope * x);
                }
            }
        }
    }
    GraphTableSVG.VLine = VLine;
    class Padding {
        constructor(top = 0, left = 0, right = 0, bottom = 0) {
            this.top = top;
            this.left = left;
            this.right = right;
            this.bottom = bottom;
        }
    }
    GraphTableSVG.Padding = Padding;
    /**
     * 四角形を表します。
     */
    class Rectangle {
        constructor(x = 0, y = 0, width = 0, height = 0) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        /**
        右端のX座標を返します。
        */
        get right() {
            return this.x + this.width;
        }
        /**
        底のY座標を返します。
        */
        get bottom() {
            return this.y + this.height;
        }
        /**
         * X座標とY座標に値を加えます。
         * @param x
         * @param y
         */
        addOffset(x, y) {
            this.x += x;
            this.y += y;
        }
        /**
         * 引数の四角形を内包する最小の四角形を返します。
         * @param rects
         */
        static merge(rects) {
            let x1 = rects[0].x;
            let y1 = rects[0].y;
            let x2 = rects[0].right;
            let y2 = rects[0].bottom;
            rects.forEach((v) => {
                if (x1 > v.x)
                    x1 = v.x;
                if (y1 > v.y)
                    y1 = v.y;
                if (x2 < v.right)
                    x2 = v.right;
                if (y2 < v.bottom)
                    y2 = v.bottom;
            });
            const rect = new Rectangle();
            rect.x = x1;
            rect.y = y1;
            rect.width = x2 - x1;
            rect.height = y2 - y1;
            return rect;
        }
    }
    GraphTableSVG.Rectangle = Rectangle;
})(GraphTableSVG || (GraphTableSVG = {}));
//# sourceMappingURL=graph_table_svg.js.map