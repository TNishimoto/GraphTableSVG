"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var GraphTableSVG;
(function (GraphTableSVG) {
    var Color;
    (function (Color) {
        var color_name = new Array("aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen");
        var color_dic;
        var r_value = new Array("F0", "FA", "00", "7F", "F0", "F5", "FF", "00", "FF", "00", "8A", "A5", "DE", "5F", "7F", "D2", "FF", "64", "FF", "DC", "00", "00", "00", "B8", "A9", "00", "BD", "8B", "55", "FF", "99", "8B", "E9", "8F", "48", "2F", "00", "94", "FF", "00", "69", "1E", "B2", "FF", "22", "FF", "DC", "F8", "FF", "DA", "80", "00", "AD", "F0", "FF", "CD", "4B", "FF", "F0", "E6", "FF", "7C", "FF", "AD", "F0", "E0", "FA", "90", "D3", "FF", "FF", "20", "87", "77", "B0", "FF", "00", "32", "FA", "FF", "80", "66", "00", "BA", "93", "3C", "7B", "00", "48", "C7", "19", "F5", "FF", "FF", "FF", "00", "FD", "80", "6B", "FF", "FF", "DA", "EE", "98", "AF", "DB", "FF", "FF", "CD", "FF", "DD", "B0", "80", "FF", "BC", "41", "8B", "FA", "F4", "2E", "FF", "A0", "C0", "87", "6A", "70", "FF", "00", "46", "D2", "00", "D8", "FF", "40", "EE", "F5", "FF", "F5", "FF", "9A");
        var g_value = new Array("F8", "EB", "FF", "FF", "FF", "F5", "E4", "00", "EB", "00", "2B", "2A", "B8", "9E", "FF", "69", "7F", "95", "F8", "14", "FF", "00", "8B", "86", "A9", "64", "B7", "00", "6B", "8C", "32", "00", "96", "BC", "3D", "4F", "CE", "00", "14", "BF", "69", "90", "22", "FA", "8B", "00", "DC", "F8", "D7", "A5", "80", "80", "FF", "FF", "69", "5C", "00", "FF", "E6", "E6", "F0", "FC", "FA", "D8", "80", "FF", "FA", "EE", "D3", "B6", "A0", "B2", "CE", "88", "C4", "FF", "FF", "CD", "F0", "00", "00", "CD", "00", "55", "70", "B3", "68", "FA", "D1", "15", "19", "FF", "E4", "E4", "DE", "00", "F5", "80", "8E", "A5", "45", "70", "E8", "FB", "EE", "70", "EF", "DA", "85", "C0", "A0", "E0", "00", "00", "8F", "69", "45", "80", "A4", "8B", "F5", "52", "C0", "CE", "5A", "80", "FA", "FF", "82", "B4", "80", "BF", "63", "E0", "82", "DE", "FF", "F5", "FF", "CD");
        var b_value = new Array("FF", "D7", "FF", "D4", "FF", "DC", "C4", "00", "CD", "FF", "E2", "2A", "87", "A0", "00", "1E", "50", "ED", "DC", "3C", "FF", "8B", "8B", "0B", "A9", "00", "6B", "8B", "2F", "00", "CC", "00", "7A", "8F", "8B", "4F", "D1", "D3", "93", "FF", "69", "FF", "22", "F0", "22", "FF", "DC", "FF", "00", "20", "80", "00", "2F", "F0", "B4", "5C", "82", "F0", "8C", "FA", "F5", "00", "CD", "E6", "80", "FF", "D2", "90", "D3", "C1", "7A", "AA", "FA", "99", "DE", "E0", "00", "32", "E6", "FF", "00", "AA", "CD", "D3", "DB", "71", "EE", "9A", "CC", "85", "70", "FA", "E1", "B5", "AD", "80", "E6", "00", "23", "00", "00", "D6", "AA", "98", "EE", "93", "D5", "B9", "3F", "CB", "DD", "E6", "80", "00", "8F", "E1", "13", "72", "60", "57", "EE", "2D", "C0", "EB", "CD", "90", "FA", "7F", "B4", "8C", "80", "D8", "47", "D0", "EE", "B3", "FF", "F5", "00", "32");
        function createHexCodeFromColorName(colorName) {
            if (!color_dic) {
                color_dic = {};
                for (var i = 0; i < color_name.length; i++) {
                    color_dic[color_name[i]] = i;
                }
            }
            if (colorName in color_dic) {
                var i = color_dic[colorName];
                return r_value[i] + g_value[i] + b_value[i];
            }
            else {
                return colorName;
            }
        }
        Color.createHexCodeFromColorName = createHexCodeFromColorName;
        function createHexFromColorName(colorName) {
            if (!color_dic) {
                color_dic = {};
                for (var i = 0; i < color_name.length; i++) {
                    color_dic[color_name[i]] = i;
                }
            }
            if (colorName in color_dic) {
                var i = color_dic[colorName];
                return { r: parseInt(r_value[i], 16), g: parseInt(g_value[i], 16), b: parseInt(b_value[i], 16) };
            }
            else {
                return null;
            }
        }
        Color.createHexFromColorName = createHexFromColorName;
        function createRGBCodeFromColorName(colorName) {
            colorName = createHexCodeFromColorName(colorName);
            if (colorName.substr(0, 3) == "rgb") {
                return colorName;
            }
            else {
                if (colorName.length == 6) {
                    var r = colorName.substr(0, 2);
                    var g = colorName.substr(2, 2);
                    var b = colorName.substr(4, 2);
                    return "rgb(" + parseInt(r, 16) + ", " + parseInt(g, 16) + ", " + parseInt(b, 16) + ")";
                }
                else {
                    return "rgb(" + 80 + ", " + 80 + ", " + 80 + ")";
                }
            }
        }
        Color.createRGBCodeFromColorName = createRGBCodeFromColorName;
        function createRGBFromColorName(str) {
            var v = createHexFromColorName(str);
            var def = { r: 80, g: 80, b: 80 };
            if (v != null) {
                return v;
            }
            else {
                if (str.substr(0, 3) == "rgb") {
                    str = str.replace("rgb(", "");
                    str = str.replace(")", "");
                    var values = str.split(",");
                    if (values.length == 3) {
                        return { r: parseInt(values[0]), g: parseInt(values[1]), b: parseInt(values[2]) };
                    }
                    else {
                        return def;
                    }
                }
                else if (str.length == 6) {
                    var r = str.substr(0, 2);
                    var g = str.substr(2, 2);
                    var b = str.substr(4, 2);
                    return { r: parseInt(r), g: parseInt(g), b: parseInt(b) };
                }
                else {
                    return def;
                }
            }
        }
        Color.createRGBFromColorName = createRGBFromColorName;
    })(Color = GraphTableSVG.Color || (GraphTableSVG.Color = {}));
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var VertexOrder;
    (function (VertexOrder) {
        VertexOrder[VertexOrder["Preorder"] = 0] = "Preorder";
        VertexOrder[VertexOrder["Postorder"] = 1] = "Postorder";
    })(VertexOrder = GraphTableSVG.VertexOrder || (GraphTableSVG.VertexOrder = {}));
    var ShapeObjectType;
    (function (ShapeObjectType) {
        ShapeObjectType.Callout = "g-callout";
        ShapeObjectType.ShapeArrowCallout = "g-sarrowcallout";
        ShapeObjectType.Ellipse = "g-ellipse";
        ShapeObjectType.Rect = "g-rect";
        ShapeObjectType.Edge = "g-edge";
        ShapeObjectType.Graph = "g-graph";
        function toShapeObjectType(value) {
            return value;
        }
        ShapeObjectType.toShapeObjectType = toShapeObjectType;
    })(ShapeObjectType = GraphTableSVG.ShapeObjectType || (GraphTableSVG.ShapeObjectType = {}));
    var pathTextAlighnment;
    (function (pathTextAlighnment) {
        pathTextAlighnment.regularInterval = "regularInterval";
        pathTextAlighnment.begin = "begin";
        pathTextAlighnment.end = "end";
        pathTextAlighnment.center = "center";
        var typeDic = {
            "none": "none",
            "begin": "begin",
            "end": "end",
            "center": "center",
            "regularInterval": "regularInterval",
        };
        function toPathTextAlighnment(value) {
            if (value in typeDic) {
                return typeDic[value];
            }
            else {
                return "none";
            }
        }
        pathTextAlighnment.toPathTextAlighnment = toPathTextAlighnment;
    })(pathTextAlighnment = GraphTableSVG.pathTextAlighnment || (GraphTableSVG.pathTextAlighnment = {}));
    var msoDashStyle;
    (function (msoDashStyle) {
        msoDashStyle.msoLineDash = "msoLineDash";
        msoDashStyle.msoLineDashDot = "msoLineDashDot";
        msoDashStyle.msoLineDashDotDot = "msoLineDashDotDot";
        msoDashStyle.msoLineLongDash = "msoLineLongDash";
        msoDashStyle.msoLineLongDashDot = "msoLineLongDashDot";
        msoDashStyle.msoLineRoundDot = "msoLineRoundDot";
        msoDashStyle.msoLineSolid = "msoLineSolid";
        msoDashStyle.msoLineSquareDot = "msoLineSquareDot";
        msoDashStyle.dashArrayDic = {
            "msoLineDash": [4, 3],
            "msoLineDashDot": [4, 3, 1, 3],
            "msoLineDashDotDot": [3, 1, 1, 1, 1, 1],
            "msoLineLongDash": [9, 3],
            "msoLineLongDashDot": [9, 3, 1, 3],
            "msoLineRoundDot": [0.25, 2],
            "msoLineSolid": [],
            "msoLineSquareDot": [1, 1]
        };
        var lineCapDic = {
            "msoLineDash": "butt",
            "msoLineDashDot": "butt",
            "msoLineDashDotDot": "butt",
            "msoLineLongDash": "butt",
            "msoLineLongDashDot": "butt",
            "msoLineRoundDot": "round",
            "msoLineSolid": "butt",
            "msoLineSquareDot": "butt"
        };
        var typeDic = {
            "msoLineDash": msoDashStyle.msoLineDash,
            "msoLineDashDot": msoDashStyle.msoLineDashDot,
            "msoLineDashDotDot": msoDashStyle.msoLineDashDotDot,
            "msoLineLongDash": msoDashStyle.msoLineLongDash,
            "msoLineLongDashDot": msoDashStyle.msoLineLongDashDot,
            "msoLineRoundDot": msoDashStyle.msoLineRoundDot,
            "msoLineSquareDot": msoDashStyle.msoLineSquareDot,
            "msoLineSolid": msoDashStyle.msoLineSolid
        };
        function toMSODashStyle(value) {
            if (value in typeDic) {
                return typeDic[value];
            }
            else {
                return msoDashStyle.msoLineSolid;
            }
        }
        msoDashStyle.toMSODashStyle = toMSODashStyle;
        function computeDashArray(type, width) {
            var r = [];
            for (var i = 0; i < msoDashStyle.dashArrayDic[type].length; i++) {
                r.push(msoDashStyle.dashArrayDic[type][i] * width);
            }
            return r.join(",");
        }
        function setStyle(svgLine, type) {
            if (toMSODashStyle(type) != null) {
                var width = svgLine.getPropertyStyleNumberValue("stroke-width", 2);
                svgLine.setPropertyStyleValue("stroke-dasharray", computeDashArray(toMSODashStyle(type), width));
                svgLine.setPropertyStyleValue("stroke-linecap", lineCapDic[type]);
                svgLine.setPropertyStyleValue(GraphTableSVG.SVG.msoDashStyleName, type);
            }
            else {
            }
        }
        msoDashStyle.setStyle = setStyle;
        function getLineType(svgLine) {
            var typeName = svgLine.getPropertyStyleValue(GraphTableSVG.SVG.msoDashStyleName);
            if (typeName != null) {
                var type = toMSODashStyle(typeName);
                if (type != null) {
                    return type;
                }
            }
            var dashArray = svgLine.getPropertyStyleValue("stroke-dasharray");
            if (dashArray != null) {
                return msoDashStyle.msoLineDash;
            }
            else {
                return msoDashStyle.msoLineSolid;
            }
        }
        msoDashStyle.getLineType = getLineType;
    })(msoDashStyle = GraphTableSVG.msoDashStyle || (GraphTableSVG.msoDashStyle = {}));
    var Direction;
    (function (Direction) {
        function toDirection(value) {
            if (value == "up") {
                return "up";
            }
            else if (value == "left") {
                return "left";
            }
            else if (value == "right") {
                return "right";
            }
            else {
                return "down";
            }
        }
        Direction.toDirection = toDirection;
    })(Direction = GraphTableSVG.Direction || (GraphTableSVG.Direction = {}));
    var ConnectorPosition;
    (function (ConnectorPosition) {
        ConnectorPosition.Top = "top";
        ConnectorPosition.TopLeft = "topleft";
        ConnectorPosition.Left = "left";
        ConnectorPosition.BottomLeft = "bottomleft";
        ConnectorPosition.Bottom = "bottom";
        ConnectorPosition.BottomRight = "bottomright";
        ConnectorPosition.Right = "right";
        ConnectorPosition.TopRight = "topright";
        ConnectorPosition.Auto = "auto";
        function ToConnectorPosition(str) {
            if (str == null) {
                return ConnectorPosition.Auto;
            }
            else {
                return str;
            }
        }
        ConnectorPosition.ToConnectorPosition = ToConnectorPosition;
        function ToVBAConnectorPosition(shapeType, str) {
            if (shapeType == "circle") {
                switch (str) {
                    case "top": return 1;
                    case "topleft": return 2;
                    case "left": return 3;
                    case "bottomleft": return 4;
                    case "bottom": return 5;
                    case "bottomright": return 6;
                    case "right": return 7;
                    case "topright": return 8;
                    case "auto": return 9;
                    default: return 1;
                }
            }
            else if (shapeType == "rectangle") {
                switch (str) {
                    case "top": return 1;
                    case "left": return 2;
                    case "bottom": return 3;
                    case "right": return 4;
                    case "auto": return 9;
                    default: return 1;
                }
            }
            else {
                return 1;
            }
        }
        ConnectorPosition.ToVBAConnectorPosition = ToVBAConnectorPosition;
        function ToVBAConnectorPosition2(shapeType, str) {
            if (shapeType == "msoShapeOval") {
                switch (str) {
                    case "top": return 1;
                    case "topleft": return 2;
                    case "left": return 3;
                    case "bottomleft": return 4;
                    case "bottom": return 5;
                    case "bottomright": return 6;
                    case "right": return 7;
                    case "topright": return 8;
                    case "auto": return 9;
                    default: return 1;
                }
            }
            else if (shapeType == "msoShapeRectangle") {
                switch (str) {
                    case "top": return 1;
                    case "left": return 2;
                    case "bottom": return 3;
                    case "right": return 4;
                    case "auto": return 9;
                    default: return 1;
                }
            }
            else {
                return 1;
            }
        }
        ConnectorPosition.ToVBAConnectorPosition2 = ToVBAConnectorPosition2;
    })(ConnectorPosition = GraphTableSVG.ConnectorPosition || (GraphTableSVG.ConnectorPosition = {}));
    GraphTableSVG.VerticalAnchorPropertyName = "--vertical-anchor";
    GraphTableSVG.HorizontalAnchorPropertyName = "--horizontal-anchor";
    GraphTableSVG.PathTextAlignmentName = "--path-text-alignment";
    var VerticalAnchor;
    (function (VerticalAnchor) {
        VerticalAnchor.Top = "top";
        VerticalAnchor.Middle = "middle";
        VerticalAnchor.Bottom = "bottom";
        function toVerticalAnchor(value) {
            if (value == "top") {
                return "top";
            }
            else if (value == "bottom") {
                return "bottom";
            }
            else {
                return "middle";
            }
        }
        VerticalAnchor.toVerticalAnchor = toVerticalAnchor;
    })(VerticalAnchor = GraphTableSVG.VerticalAnchor || (GraphTableSVG.VerticalAnchor = {}));
    var HorizontalAnchor;
    (function (HorizontalAnchor) {
        HorizontalAnchor.Left = "left";
        HorizontalAnchor.Center = "center";
        HorizontalAnchor.Right = "right";
        function toHorizontalAnchor(value) {
            if (value == "left") {
                return "left";
            }
            else if (value == "right") {
                return "right";
            }
            else {
                return "center";
            }
        }
        HorizontalAnchor.toHorizontalAnchor = toHorizontalAnchor;
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
    var GUI;
    (function (GUI) {
        function createMacroModal(vbaCode) {
            var mainDiv = document.createElement("div");
            mainDiv.id = "macro-modal";
            mainDiv.innerHTML = "\n    \u4F7F\u3044\u65B9\uFF08Powerpoint 2013\uFF09<br>\n        \u65B0\u898F\u30D5\u30A1\u30A4\u30EB<br>\n        \u2192\u8868\u793A\u2192\u30DE\u30AF\u30ED\u2192\u4F5C\u6210<br>\n        \u2192\u751F\u6210\u3057\u305F\u30B3\u30FC\u30C9\u3092\u30E6\u30FC\u30B6\u30FC\u30D5\u30A9\u30FC\u30E0\u306B\u8CBC\u308A\u4ED8\u3051\u308B<br>\n        \u2192F5 or \u30E6\u30FC\u30B6\u30FC\u30D5\u30A9\u30FC\u30E0\u3092\u5B9F\u884C<br>\n        \u2192\u6728\u304C\u8CBC\u3089\u308C\u305F\u30B9\u30E9\u30A4\u30C9\u304C\uFF11\u30DA\u30FC\u30B8\u76EE\u306B\u633F\u5165\u3055\u308C\u308B<br>\n        \u203B\u30B5\u30A4\u30BA\u306E\u5927\u304D\u3059\u304E\u308B\u6728\u306F\u30DE\u30AF\u30ED\u5B9F\u884C\u6642\u306B\u30A8\u30E9\u30FC\u304C\u51FA\u307E\u3059\u3002\n        <br>\n        <textarea id=\"codeBox\" rows=\"8\" cols=\"100\" style=\"overflow:auto;\"></textarea>\n        <button class=\"btn\" onClick=\"GraphTableSVG.GUI.copyAndCloseMacroModal();\">\n            \u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC\n        </button>\n    ";
            mainDiv.style.position = "fixed";
            mainDiv.style.zIndex = "16";
            mainDiv.style.width = "900px";
            mainDiv.style.height = "400px";
            mainDiv.style.left = ((window.outerWidth - parseInt(mainDiv.style.width)) / 2) + "px";
            mainDiv.style.top = ((window.outerHeight - parseInt(mainDiv.style.height)) / 2) + "px";
            mainDiv.style.display = "inline";
            mainDiv.style.backgroundColor = "#ffffff";
            document.body.appendChild(mainDiv);
            var cnt = document.getElementById("codeBox");
            cnt.value = vbaCode;
            var bgDiv = document.createElement("div");
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
        }
        GUI.createMacroModal = createMacroModal;
        function removeMacroModal() {
            var div1 = document.getElementById("macro-modal");
            var div2 = document.getElementById("modal-bg");
            if (div1 != null)
                document.body.removeChild(div1);
            if (div2 != null)
                document.body.removeChild(div2);
        }
        GUI.removeMacroModal = removeMacroModal;
        function copyAndCloseMacroModal() {
            var cnt = document.getElementById("codeBox");
            cnt.select();
            window.document.execCommand('copy');
            alert('クリップボードにコピーしました。');
            removeMacroModal();
        }
        GUI.copyAndCloseMacroModal = copyAndCloseMacroModal;
        function setSVGBoxSize(box, item1, item2) {
            if (item1 instanceof GraphTableSVG.Rectangle) {
                if (item2 instanceof GraphTableSVG.Padding) {
                    var w = item1.right + item2.left + item2.right;
                    var h = item1.bottom + item2.top + item2.bottom;
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
                    var width = item1 + "px";
                    var height = item2 + "px";
                    if (box.style.width != width || box.style.height != height) {
                        box.style.width = width;
                        box.style.height = height;
                        box.setAttribute("width", width);
                        box.setAttribute("height", height);
                        box.setAttribute("viewBox", "0 0 " + item1 + " " + item2);
                    }
                }
            }
        }
        GUI.setSVGBoxSize = setSVGBoxSize;
        function getURLParameters() {
            var arg = {};
            var pair = location.search.substring(1).split('&');
            for (var i = 0; pair[i]; i++) {
                var kv = pair[i].split('=');
                arg[kv[0]] = kv[1];
            }
            return arg;
        }
        GUI.getURLParameters = getURLParameters;
        function setURLParametersToHTMLElements() {
            var parameters = getURLParameters();
            Object.keys(parameters).forEach(function (key) {
                var val = parameters[key];
                var element = document.getElementById(key);
                if (element != null) {
                    if (element instanceof HTMLTextAreaElement) {
                        element.value = val;
                    }
                }
            }, parameters);
        }
        GUI.setURLParametersToHTMLElements = setURLParametersToHTMLElements;
        function getInputText(elementID) {
            var textbox = document.getElementById(elementID);
            return textbox.value;
        }
        GUI.getInputText = getInputText;
        function getNonNullElementById(id) {
            var tmp = document.getElementById(id);
            if (tmp == null) {
                throw Error("Null Error");
            }
            else {
                return tmp;
            }
        }
        GUI.getNonNullElementById = getNonNullElementById;
        function observeSVGBox(svgBox, sizeFunc, padding) {
            if (padding === void 0) { padding = new GraphTableSVG.Padding(5, 5, 5, 5); }
            var _observer;
            var observeFunction = function (x) {
                var b = false;
                for (var i = 0; i < x.length; i++) {
                    var item = x[i];
                    if (svgBox != item.target) {
                        b = true;
                    }
                }
                if (b)
                    GraphTableSVG.GUI.setSVGBoxSize(svgBox, sizeFunc(), padding);
            };
            _observer = new MutationObserver(observeFunction);
            var option = {
                subtree: true, attributes: true
            };
            _observer.observe(svgBox, option);
        }
        GUI.observeSVGBox = observeSVGBox;
    })(GUI = GraphTableSVG.GUI || (GraphTableSVG.GUI = {}));
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var LogicTree = (function () {
        function LogicTree(option) {
            if (option === void 0) { option = {}; }
            this.vertexText = null;
            this.parentEdgeText = null;
            this.vertexClass = null;
            this.parentEdgeClass = null;
            this.children = [];
            this.item = null;
            if (option.item != undefined)
                this.item = option.item;
            if (option.vertexText != undefined)
                this.vertexText = option.vertexText;
            if (option.parentEdgeText != undefined)
                this.parentEdgeText = option.parentEdgeText;
            if (option.children != undefined)
                this.children = option.children;
        }
        LogicTree.prototype.getOrderedNodes = function (order) {
            var r = [];
            var edges = this.children;
            if (order == GraphTableSVG.VertexOrder.Preorder) {
                r.push(this);
                edges.forEach(function (v) {
                    if (v != null) {
                        v.getOrderedNodes(order).forEach(function (w) {
                            r.push(w);
                        });
                    }
                });
            }
            else if (order == GraphTableSVG.VertexOrder.Postorder) {
                edges.forEach(function (v) {
                    if (v != null) {
                        v.getOrderedNodes(order).forEach(function (w) {
                            r.push(w);
                        });
                    }
                });
                r.push(this);
            }
            return r;
        };
        return LogicTree;
    }());
    GraphTableSVG.LogicTree = LogicTree;
    var BinaryLogicTree = (function (_super) {
        __extends(BinaryLogicTree, _super);
        function BinaryLogicTree(item, left, right, nodeText, edgeLabel) {
            if (item === void 0) { item = null; }
            if (left === void 0) { left = null; }
            if (right === void 0) { right = null; }
            if (nodeText === void 0) { nodeText = null; }
            if (edgeLabel === void 0) { edgeLabel = null; }
            var _this = _super.call(this, { item: item == null ? undefined : item, children: [left, right], vertexText: nodeText == null ? undefined : nodeText, parentEdgeText: edgeLabel == null ? undefined : edgeLabel }) || this;
            _this.item = item;
            return _this;
        }
        Object.defineProperty(BinaryLogicTree.prototype, "left", {
            get: function () {
                var left = this.children[0];
                if (left == null) {
                    return null;
                }
                else {
                    return left;
                }
            },
            set: function (value) {
                this.children[0] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinaryLogicTree.prototype, "right", {
            get: function () {
                var right = this.children[1];
                if (right == null) {
                    return null;
                }
                else {
                    return right;
                }
            },
            set: function (value) {
                this.children[1] = value;
            },
            enumerable: true,
            configurable: true
        });
        return BinaryLogicTree;
    }(LogicTree));
    GraphTableSVG.BinaryLogicTree = BinaryLogicTree;
    var LogicCell = (function () {
        function LogicCell() {
            this.text = null;
            this.cellClass = null;
            this.textClass = null;
            this.backgroundClass = null;
            this.topBorderClass = null;
            this.leftBorderClass = null;
            this.rightBorderClass = null;
            this.bottomBorderClass = null;
            this.connectedColumnCount = 1;
            this.connectedRowCount = 1;
            this.isLatexMode = false;
        }
        LogicCell.prototype.set = function (text, isLatexMode, cellClass, backgroundClass, textClass, topBorderClass, leftBorderClass, rightBorderClass, bottomBorderClass) {
            if (text === void 0) { text = undefined; }
            if (isLatexMode === void 0) { isLatexMode = false; }
            if (cellClass === void 0) { cellClass = undefined; }
            if (backgroundClass === void 0) { backgroundClass = undefined; }
            if (textClass === void 0) { textClass = undefined; }
            if (topBorderClass === void 0) { topBorderClass = undefined; }
            if (leftBorderClass === void 0) { leftBorderClass = undefined; }
            if (rightBorderClass === void 0) { rightBorderClass = undefined; }
            if (bottomBorderClass === void 0) { bottomBorderClass = undefined; }
            if (text !== undefined)
                this.text = text;
            if (cellClass !== undefined)
                this.cellClass = cellClass;
            if (textClass !== undefined)
                this.textClass = textClass;
            if (backgroundClass !== undefined)
                this.backgroundClass = backgroundClass;
            if (topBorderClass !== undefined)
                this.topBorderClass = topBorderClass;
            if (leftBorderClass !== undefined)
                this.leftBorderClass = leftBorderClass;
            if (rightBorderClass !== undefined)
                this.rightBorderClass = rightBorderClass;
            if (bottomBorderClass !== undefined)
                this.bottomBorderClass = bottomBorderClass;
            this.isLatexMode = isLatexMode;
        };
        return LogicCell;
    }());
    GraphTableSVG.LogicCell = LogicCell;
    var LogicTable = (function () {
        function LogicTable(option) {
            if (option === void 0) { option = {}; }
            this.tableClassName = null;
            this.x = null;
            this.y = null;
            if (option.columnCount == undefined)
                option.columnCount = 3;
            if (option.rowCount == undefined)
                option.rowCount = 3;
            if (option.x == undefined)
                option.x = 0;
            if (option.y == undefined)
                option.y = 0;
            _a = [option.x, option.y], this.x = _a[0], this.y = _a[1];
            this.tableClassName = option.tableClassName == undefined ? null : option.tableClassName;
            this.cells = new Array(option.rowCount);
            for (var y = 0; y < option.rowCount; y++) {
                this.cells[y] = new Array(option.columnCount);
                for (var x = 0; x < option.columnCount; x++) {
                    this.cells[y][x] = new LogicCell();
                }
            }
            this.rowHeights = new Array(option.rowCount);
            for (var y = 0; y < option.rowCount; y++) {
                this.rowHeights[y] = null;
            }
            this.columnWidths = new Array(option.columnCount);
            for (var x = 0; x < option.columnCount; x++) {
                this.columnWidths[x] = null;
            }
            var _a;
        }
        Object.defineProperty(LogicTable.prototype, "rowCount", {
            get: function () {
                return this.rowHeights.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LogicTable.prototype, "columnCount", {
            get: function () {
                return this.columnWidths.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LogicTable.prototype, "cellArray", {
            get: function () {
                var r = new Array();
                for (var y = 0; y < this.rowHeights.length; y++) {
                    for (var x = 0; x < this.columnWidths.length; x++) {
                        r.push(this.cells[y][x]);
                    }
                }
                return r;
            },
            enumerable: true,
            configurable: true
        });
        LogicTable.prototype.getColumn = function (i) {
            var r = new Array();
            for (var y = 0; y < this.rowHeights.length; y++) {
                r.push(this.cells[y][i]);
            }
            return r;
        };
        LogicTable.prototype.getRow = function (i) {
            var r = new Array();
            for (var x = 0; x < this.columnWidths.length; x++) {
                r.push(this.cells[i][x]);
            }
            return r;
        };
        LogicTable.parse = function (str, delimiter) {
            var lines = str.split("\n");
            var r = new Array(lines.length);
            for (var y = 0; y < lines.length; y++) {
                var line = lines[y].split(delimiter);
                r[y] = new Array(line.length);
                for (var x = 0; x < line.length; x++) {
                    r[y][x] = line[x];
                }
                if (y > 0) {
                    if (r[y].length != r[y - 1].length) {
                        alert("Parse Error");
                        throw Error("Parse Error");
                    }
                }
            }
            return r;
        };
        LogicTable.create = function (str, tableClassName) {
            if (tableClassName === void 0) { tableClassName = null; }
            var table = new LogicTable({ columnCount: str[0].length, rowCount: str.length, tableClassName: tableClassName == null ? undefined : tableClassName });
            for (var y = 0; y < str.length; y++) {
                for (var x = 0; x < str[y].length; x++) {
                    var p = str[y][x].split("%%%");
                    table.cells[y][x].text = p[0];
                    if (p.length == 3) {
                        table.cells[y][x].connectedColumnCount = Number(p[1]);
                        table.cells[y][x].connectedRowCount = Number(p[2]);
                    }
                }
            }
            return table;
        };
        return LogicTable;
    }());
    GraphTableSVG.LogicTable = LogicTable;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var SVG;
    (function (SVG) {
        SVG.idCounter = 0;
        function createLine(x, y, x2, y2, className) {
            if (className === void 0) { className = null; }
            var line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line1.x1.baseVal.value = x;
            line1.x2.baseVal.value = x2;
            line1.y1.baseVal.value = y;
            line1.y2.baseVal.value = y2;
            if (className != null) {
                line1.setAttribute("class", className);
            }
            else {
                line1.style.stroke = "black";
            }
            return line1;
        }
        SVG.createLine = createLine;
        SVG.msoDashStyleName = "--stroke-style";
        function createPath(parent, x, y, x2, y2, className) {
            if (className === void 0) { className = null; }
            var line1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            parent.appendChild(line1);
            line1.setAttribute("d", "M " + x + " " + y + " L " + x2 + " " + y2);
            if (parent instanceof SVGElement) {
                var _className = parent.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.defaultPathClass);
                if (className == null) {
                    className = _className;
                }
            }
            if (className != null) {
                line1.setAttribute("class", className);
                var dashStyle = line1.getPropertyStyleValue(SVG.msoDashStyleName);
                if (dashStyle != null) {
                    GraphTableSVG.msoDashStyle.setStyle(line1, dashStyle);
                }
            }
            else {
                line1.style.stroke = "black";
                line1.style.fill = "none";
                line1.style.strokeWidth = "1pt";
            }
            return line1;
        }
        SVG.createPath = createPath;
        function createText(className) {
            if (className === void 0) { className = null; }
            var _svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            _svgText.setAttribute(GraphTableSVG.CustomAttributeNames.objectIDName, (GraphTableSVG.SVG.idCounter++).toString());
            if (className == null) {
                _svgText.style.fill = "black";
                _svgText.style.fontSize = "14px";
                _svgText.style.fontWeight = "bold";
                _svgText.style.fontFamily = 'Times New Roman';
            }
            else {
                _svgText.setAttribute("class", className);
            }
            return _svgText;
        }
        SVG.createText = createText;
        function createRectangle(parent, className) {
            if (className === void 0) { className = null; }
            var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            parent.appendChild(rect);
            rect.width.baseVal.value = 30;
            rect.height.baseVal.value = 30;
            if (className == null) {
                rect.style.fill = "#ffffff";
                rect.style.stroke = "#000000";
                rect.style.strokeWidth = "1pt";
            }
            else {
                rect.setAttribute("class", className);
                var dashStyle = rect.getPropertyStyleValue(GraphTableSVG.SVG.msoDashStyleName);
                if (dashStyle != null)
                    GraphTableSVG.msoDashStyle.setStyle(rect, dashStyle);
                var width = rect.getPropertyStyleNumberValue(GraphTableSVG.CustomAttributeNames.Style.defaultWidthName, null);
                if (width != null) {
                    rect.width.baseVal.value = width;
                }
                var height = rect.getPropertyStyleNumberValue(GraphTableSVG.CustomAttributeNames.Style.defaultHeightName, null);
                if (height != null) {
                    rect.height.baseVal.value = height;
                }
            }
            return rect;
        }
        SVG.createRectangle = createRectangle;
        function createGroup(parent, className) {
            if (className === void 0) { className = null; }
            var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute(GraphTableSVG.CustomAttributeNames.objectIDName, (GraphTableSVG.SVG.idCounter++).toString());
            if (className != null) {
                g.setAttribute("class", className);
            }
            if (parent != null)
                parent.appendChild(g);
            return g;
        }
        SVG.createGroup = createGroup;
        function resetStyle(style) {
            style.stroke = null;
            style.strokeWidth = null;
            style.fill = null;
            style.fontSize = null;
            style.fontWeight = null;
            style.fontFamily = null;
        }
        SVG.resetStyle = resetStyle;
        function createCircle(parent, className) {
            if (className === void 0) { className = null; }
            var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            parent.appendChild(circle);
            circle.r.baseVal.value = GraphTableSVG.CustomAttributeNames.defaultCircleRadius;
            if (className == null) {
                circle.style.stroke = "black";
                circle.style.strokeWidth = "1pt";
                circle.style.fill = "#ffffff";
            }
            else {
                circle.setAttribute("class", className);
                var radius = circle.getPropertyStyleNumberValue(GraphTableSVG.CustomAttributeNames.Style.defaultRadiusName, null);
                if (radius != null) {
                    circle.r.baseVal.value = radius;
                }
                var dashStyle = circle.getPropertyStyleValue(GraphTableSVG.SVG.msoDashStyleName);
                if (dashStyle != null)
                    GraphTableSVG.msoDashStyle.setStyle(circle, dashStyle);
            }
            circle.cx.baseVal.value = 0;
            circle.cy.baseVal.value = 0;
            return circle;
        }
        SVG.createCircle = createCircle;
        function createEllipse(parent, className) {
            if (className === void 0) { className = null; }
            var circle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            parent.appendChild(circle);
            circle.rx.baseVal.value = GraphTableSVG.CustomAttributeNames.defaultCircleRadius;
            circle.ry.baseVal.value = GraphTableSVG.CustomAttributeNames.defaultCircleRadius;
            if (className == null) {
                circle.style.stroke = "black";
                circle.style.strokeWidth = "1pt";
                circle.style.fill = "#ffffff";
            }
            else {
                circle.setAttribute("class", className);
                var radius = circle.getPropertyStyleNumberValue(GraphTableSVG.CustomAttributeNames.Style.defaultRadiusName, null);
                if (radius != null) {
                    circle.rx.baseVal.value = radius;
                    circle.ry.baseVal.value = radius;
                }
                var dashStyle = circle.getPropertyStyleValue(GraphTableSVG.SVG.msoDashStyleName);
                if (dashStyle != null)
                    GraphTableSVG.msoDashStyle.setStyle(circle, dashStyle);
            }
            circle.cx.baseVal.value = 0;
            circle.cy.baseVal.value = 0;
            return circle;
        }
        SVG.createEllipse = createEllipse;
        function createMarker(option) {
            if (option === void 0) { option = {}; }
            var marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            var poly = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            poly.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
            if (option.color != undefined) {
                poly.setPropertyStyleValue("stroke", option.color);
                marker.setPropertyStyleValue("fill", option.color);
            }
            else {
                poly.setPropertyStyleValue("stroke", "black");
                marker.setPropertyStyleValue("fill", "black");
            }
            poly.setPropertyStyleValue("stroke-width", "1px");
            marker.setAttribute("markerUnits", "userSpaceOnUse");
            marker.setAttribute("markerHeight", "15");
            marker.setAttribute("markerWidth", "15");
            marker.setAttribute("refX", "10");
            marker.setAttribute("refY", "5");
            marker.setAttribute("preserveAspectRatio", "none");
            marker.setAttribute("orient", "auto");
            marker.setAttribute("viewBox", "0 0 10 10");
            marker.appendChild(poly);
            if (option.className != null) {
            }
            else {
            }
            return [marker, poly];
        }
        SVG.createMarker = createMarker;
        function createTextPath(className) {
            if (className === void 0) { className = null; }
            var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            ;
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
            text.appendChild(path);
            if (className == null) {
                path.style.fill = "black";
                path.style.fontSize = "14px";
                path.style.fontWeight = "bold";
                path.style.fontFamily = 'Times New Roman';
            }
            else {
                path.setAttribute("class", className);
            }
            return [text, path];
        }
        SVG.createTextPath = createTextPath;
        function createTextPath2(className) {
            if (className === void 0) { className = null; }
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
            if (className == null) {
                path.style.fill = "black";
                path.style.fontSize = "14px";
                path.style.fontWeight = "bold";
                path.style.fontFamily = 'Times New Roman';
            }
            else {
                path.setAttribute("class", className);
            }
            return path;
        }
        SVG.createTextPath2 = createTextPath2;
        function createTextSpans(text, className, fontsize, dxOfFirstElement, dyOfFirstElement) {
            if (className === void 0) { className = null; }
            if (fontsize === void 0) { fontsize = 12; }
            if (dxOfFirstElement === void 0) { dxOfFirstElement = null; }
            if (dyOfFirstElement === void 0) { dyOfFirstElement = null; }
            var r = [];
            text += "_";
            var isFst = true;
            var mode = "";
            var tmp = "";
            var char_dy = (1 * fontsize) / 3;
            var lastMode = "none";
            var smallFontSize = (2 * fontsize) / 3;
            for (var i = 0; i < text.length; i++) {
                var c = text[i];
                if (c == "_" || c == "{" || c == "^" || c == "}") {
                    mode += c;
                    if (mode == "_{}") {
                        var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        tspan.textContent = tmp;
                        tspan.setAttribute("dy", "" + char_dy);
                        tspan.setAttribute("data-script", "subscript");
                        tspan.style.fontSize = smallFontSize + "pt";
                        r.push(tspan);
                        lastMode = "down";
                        mode = "";
                        tmp = "";
                    }
                    else if (mode == "^{}") {
                        var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        tspan.textContent = tmp;
                        tspan.setAttribute("dy", "-" + char_dy);
                        tspan.style.fontSize = smallFontSize + "pt";
                        tspan.setAttribute("data-script", "superscript");
                        r.push(tspan);
                        lastMode = "up";
                        mode = "";
                        tmp = "";
                    }
                    else if (mode == "_" || mode == "^") {
                        var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        tspan.textContent = tmp;
                        var normaldy = lastMode == "up" ? char_dy : lastMode == "down" ? -char_dy : 0;
                        if (isFst) {
                            if (dxOfFirstElement != null)
                                tspan.setAttribute("dx", "" + dxOfFirstElement);
                            if (dyOfFirstElement != null)
                                tspan.setAttribute("dy", "" + dyOfFirstElement);
                        }
                        else {
                            tspan.setAttribute("dy", "" + normaldy);
                        }
                        r.push(tspan);
                        lastMode = "none";
                        tmp = "";
                        isFst = false;
                    }
                }
                else {
                    tmp += c;
                }
            }
            return r;
        }
        function createSingleTextSpan(text, className) {
            if (className === void 0) { className = null; }
            var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.textContent = text;
            if (className != null) {
                tspan.setAttribute("class", className);
            }
            return tspan;
        }
        function setTextToTextPath(path, text, isLatexMode) {
            path.textContent = "";
            var fontSize = path.getPropertyStyleValueWithDefault("font-size", "12");
            if (isLatexMode) {
                createTextSpans(text, null, parseInt(fontSize)).forEach(function (v) { return path.appendChild(v); });
            }
            else {
                path.appendChild(createSingleTextSpan(text, null));
            }
        }
        SVG.setTextToTextPath = setTextToTextPath;
        function setTextToSVGText(svgText, text, isLatexMode) {
            svgText.textContent = "";
            var fontSize = svgText.getPropertyStyleValueWithDefault("font-size", "12");
            var fs = parseInt(fontSize);
            var dx = 0;
            text.split("\n").forEach(function (w) {
                var dy = fs;
                var width = 0;
                if (isLatexMode) {
                    createTextSpans(w, null, fs, dx, dy).forEach(function (v) {
                        svgText.appendChild(v);
                        var rect = v.getBoundingClientRect();
                        dx = 0;
                        dy = 0;
                        width += rect.width;
                    });
                    dy += fs;
                }
                else {
                    svgText.appendChild(createSingleTextSpan(w, null));
                }
                dx = -width;
            });
        }
        SVG.setTextToSVGText = setTextToSVGText;
        function setClass(svg, className) {
            if (className === void 0) { className = null; }
            if (className == null) {
                svg.removeAttribute("class");
            }
            else {
                resetStyle(svg.style);
                svg.setAttribute("class", className);
            }
        }
        SVG.setClass = setClass;
        function getCSSStyle(svg) {
            if (svg.getAttribute("class") == null) {
                return null;
            }
            else {
                var css = getComputedStyle(svg);
                return css;
            }
        }
        var exceptionStyleNames = ["marker-start", "marker-mid", "marker-end"];
        function setCSSToStyle(svg, isComplete) {
            if (isComplete === void 0) { isComplete = true; }
            if (isComplete) {
                var css = getCSSStyle(svg);
                if (css != null) {
                    var _loop_1 = function (i) {
                        var name_1 = css.item(i);
                        var value = css.getPropertyValue(name_1);
                        if (value.length > 0) {
                            if (!exceptionStyleNames.some(function (v) { return v == name_1; })) {
                                svg.style.setProperty(name_1, value);
                            }
                        }
                    };
                    for (var i = 0; i < css.length; i++) {
                        _loop_1(i);
                    }
                }
            }
            else {
                cssPropertyNames.forEach(function (v) {
                    var value = getPropertyStyleValue(svg, v);
                    if (value != null) {
                        svg.style.setProperty(v, value);
                    }
                });
            }
        }
        SVG.setCSSToStyle = setCSSToStyle;
        function getPropertyStyleValue(item, name) {
            var p = item.style.getPropertyValue(name).trim();
            if (p.length == 0) {
                var r = item.getAttribute("class");
                if (r == null) {
                    return null;
                }
                else {
                    var css = getCSSStyle(item);
                    if (css == null)
                        throw Error("error");
                    var p2 = css.getPropertyValue(name).trim();
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
        }
        function getAllElementStyleMapSub(item, output, id) {
            if (typeof item == 'string') {
                var svgBox = document.getElementById(item);
                if (svgBox != null) {
                    getAllElementStyleMapSub(svgBox, output, id);
                }
            }
            else {
                var style = item.getAttribute("style");
                output[id++] = style;
                for (var i = 0; i < item.children.length; i++) {
                    var child = item.children.item(i);
                    if (child != null) {
                        id = getAllElementStyleMapSub(child, output, id);
                    }
                }
            }
            return id;
        }
        function getAllElementStyleMap(item) {
            var dic = {};
            getAllElementStyleMapSub(item, dic, 0);
            return dic;
        }
        SVG.getAllElementStyleMap = getAllElementStyleMap;
        function setAllElementStyleMapSub(item, output, id) {
            if (typeof item == 'string') {
                var svgBox = document.getElementById(item);
                if (svgBox != null) {
                    setAllElementStyleMapSub(svgBox, output, id);
                }
            }
            else {
                var style = output[id++];
                if (style == null) {
                    item.removeAttribute("style");
                }
                else {
                    item.setAttribute("style", style);
                }
                for (var i = 0; i < item.children.length; i++) {
                    var child = item.children.item(i);
                    if (child != null) {
                        id = setAllElementStyleMapSub(child, output, id);
                    }
                }
            }
            return id;
        }
        function setAllElementStyleMap(item, dic) {
            setAllElementStyleMapSub(item, dic, 0);
        }
        SVG.setAllElementStyleMap = setAllElementStyleMap;
        function setCSSToAllElementStyles(item, isComplete) {
            if (isComplete === void 0) { isComplete = true; }
            if (typeof item == 'string') {
                var svgBox = document.getElementById(item);
                if (svgBox != null) {
                    setCSSToAllElementStyles(svgBox, isComplete);
                }
            }
            else {
                if (!item.hasAttribute("data-skip"))
                    setCSSToStyle(item, isComplete);
                for (var i = 0; i < item.children.length; i++) {
                    var child = item.children.item(i);
                    if (child != null) {
                        setCSSToAllElementStyles(child, isComplete);
                    }
                }
            }
        }
        SVG.setCSSToAllElementStyles = setCSSToAllElementStyles;
        var cssPropertyNames = ["font-size", "fill", "stroke",
            "font-family", "font-weight", "stroke-width", "background", "border", "background-color", "border-bottom-color", "border-bottom-style", "border-bottom-width",
            "border-left-color", "border-left-style", "border-left-width", "border-right-color", "border-right-style", "border-right-width", "border-top-color", "border-top-style", "border-top-width"];
        function getStyleSheet(name) {
            var name2 = "." + name;
            for (var i = 0; i < document.styleSheets.length; i++) {
                var sheet = document.styleSheets.item(i);
                var rules = sheet.cssRules || sheet.rules;
                if (rules != null) {
                    for (var j = 0; j < rules.length; j++) {
                        var rule = rules.item(j);
                        if (rule.selectorText == name2) {
                            return rule.style;
                        }
                    }
                }
            }
            return null;
        }
        SVG.getStyleSheet = getStyleSheet;
    })(SVG = GraphTableSVG.SVG || (GraphTableSVG.SVG = {}));
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var VLine = (function () {
        function VLine(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        }
        Object.defineProperty(VLine.prototype, "smallPoint", {
            get: function () {
                if (this.x1 < this.x2) {
                    return [this.x1, this.y1];
                }
                else {
                    return [this.x2, this.y2];
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VLine.prototype, "largePoint", {
            get: function () {
                if (this.x1 < this.x2) {
                    return [this.x2, this.y2];
                }
                else {
                    return [this.x1, this.y1];
                }
            },
            enumerable: true,
            configurable: true
        });
        VLine.prototype.contains = function (x, y) {
            var lineY = this.getY(x);
            if (lineY == null) {
                return x < this.x1;
            }
            else {
                return y < lineY;
            }
        };
        VLine.prototype.getY = function (x) {
            var intercept = this.intercept;
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
        };
        Object.defineProperty(VLine.prototype, "slope", {
            get: function () {
                var _a = this.smallPoint, x1 = _a[0], y1 = _a[1];
                var _b = this.largePoint, x2 = _b[0], y2 = _b[1];
                if (x2 - x1 == 0) {
                    return null;
                }
                else {
                    return (y2 - y1) / (x2 - x1);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VLine.prototype, "intercept", {
            get: function () {
                var _a = this.smallPoint, x1 = _a[0], y1 = _a[1];
                var _b = this.largePoint, x2 = _b[0], y2 = _b[1];
                if (this.slope == null) {
                    return null;
                }
                else {
                    return y1 - x1 * this.slope;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VLine.prototype, "inverseSlope", {
            get: function () {
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
            },
            enumerable: true,
            configurable: true
        });
        VLine.prototype.inverseIntercept = function (x, y) {
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
        };
        return VLine;
    }());
    GraphTableSVG.VLine = VLine;
    var Padding = (function () {
        function Padding(top, left, right, bottom) {
            if (top === void 0) { top = 0; }
            if (left === void 0) { left = 0; }
            if (right === void 0) { right = 0; }
            if (bottom === void 0) { bottom = 0; }
            this.top = top;
            this.left = left;
            this.right = right;
            this.bottom = bottom;
        }
        return Padding;
    }());
    GraphTableSVG.Padding = Padding;
    var Rectangle = (function () {
        function Rectangle(x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        Object.defineProperty(Rectangle.prototype, "right", {
            get: function () {
                return this.x + this.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "bottom", {
            get: function () {
                return this.y + this.height;
            },
            enumerable: true,
            configurable: true
        });
        Rectangle.prototype.addOffset = function (x, y) {
            this.x += x;
            this.y += y;
        };
        Rectangle.merge = function (rects) {
            if (rects.length > 0) {
                var x1_1 = rects[0].x;
                var y1_1 = rects[0].y;
                var x2_1 = rects[0].right;
                var y2_1 = rects[0].bottom;
                rects.forEach(function (v) {
                    if (x1_1 > v.x)
                        x1_1 = v.x;
                    if (y1_1 > v.y)
                        y1_1 = v.y;
                    if (x2_1 < v.right)
                        x2_1 = v.right;
                    if (y2_1 < v.bottom)
                        y2_1 = v.bottom;
                });
                var rect = new Rectangle();
                rect.x = x1_1;
                rect.y = y1_1;
                rect.width = x2_1 - x1_1;
                rect.height = y2_1 - y1_1;
                return rect;
            }
            else {
                return new Rectangle(0, 0, 0, 0);
            }
        };
        return Rectangle;
    }());
    GraphTableSVG.Rectangle = Rectangle;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var DirectionType;
    (function (DirectionType) {
        DirectionType[DirectionType["top"] = 0] = "top";
        DirectionType[DirectionType["left"] = 1] = "left";
        DirectionType[DirectionType["right"] = 2] = "right";
        DirectionType[DirectionType["bottom"] = 3] = "bottom";
    })(DirectionType = GraphTableSVG.DirectionType || (GraphTableSVG.DirectionType = {}));
    var DirectionType2;
    (function (DirectionType2) {
        DirectionType2[DirectionType2["topLeft"] = 0] = "topLeft";
        DirectionType2[DirectionType2["bottomLeft"] = 1] = "bottomLeft";
        DirectionType2[DirectionType2["bottomRight"] = 2] = "bottomRight";
        DirectionType2[DirectionType2["topRight"] = 3] = "topRight";
    })(DirectionType2 = GraphTableSVG.DirectionType2 || (GraphTableSVG.DirectionType2 = {}));
    var Cell = (function () {
        function Cell(parent, _px, _py, cellClass, borderClass) {
            if (cellClass === void 0) { cellClass = null; }
            if (borderClass === void 0) { borderClass = null; }
            var _this = this;
            this._observerFunc = function (x) {
                for (var i = 0; i < x.length; i++) {
                    var p = x[i];
                    if (p.attributeName == "style" || p.attributeName == "class") {
                        _this.localUpdate();
                    }
                }
            };
            this.tmpStyle = null;
            this._borders = new Array(4);
            this._svgGroup = GraphTableSVG.SVG.createGroup(null);
            this._table = parent;
            this.table.svgGroup.insertBefore(this.svgGroup, this.table.svgGroup.firstChild);
            if (cellClass != null)
                this.svgGroup.setAttribute("class", cellClass);
            this.svgGroup.setAttribute(Cell.elementTypeName, "cell-group");
            this.svgGroup.setAttribute(Cell.cellXName, "" + _px);
            this.svgGroup.setAttribute(Cell.cellYName, "" + _py);
            this.setMasterDiffX(0);
            this.setMasterDiffY(0);
            this._svgBackground = GraphTableSVG.SVG.createRectangle(this.svgGroup, this.defaultBackgroundClass);
            this._svgText = GraphTableSVG.SVG.createText(this.defaultTextClass);
            this.svgGroup.appendChild(this.svgText);
            this.topBorder = GraphTableSVG.SVG.createLine(0, 0, 0, 0, borderClass);
            this.leftBorder = GraphTableSVG.SVG.createLine(0, 0, 0, 0, borderClass);
            this.rightBorder = GraphTableSVG.SVG.createLine(0, 0, 0, 0, borderClass);
            this.bottomBorder = GraphTableSVG.SVG.createLine(0, 0, 0, 0, borderClass);
            this.table.svgGroup.appendChild(this.topBorder);
            this.table.svgGroup.appendChild(this.leftBorder);
            this.table.svgGroup.appendChild(this.rightBorder);
            this.table.svgGroup.appendChild(this.bottomBorder);
            var option1 = { childList: true, subtree: true };
            this.table.cellTextObserver.observe(this.svgText, option1);
            this._observer = new MutationObserver(this._observerFunc);
            var option2 = { attributes: true };
            this._observer.observe(this.svgGroup, option2);
        }
        Object.defineProperty(Cell.prototype, "isEmphasized", {
            get: function () {
                var cellClass = this.svgBackground.getAttribute("class");
                return cellClass == Cell.emphasisCellClass;
            },
            set: function (v) {
                if (v) {
                    if (!this.isEmphasized) {
                        this.tmpStyle = this.svgBackground.getAttribute("class");
                        this.svgBackground.setAttribute("class", Cell.emphasisCellClass);
                    }
                }
                else {
                    if (this.isEmphasized) {
                        if (this.tmpStyle == null) {
                            this.svgBackground.removeAttribute("class");
                        }
                        else {
                            this.svgBackground.setAttribute("class", this.tmpStyle);
                            this.tmpStyle = null;
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "innerExtraPaddingLeft", {
            get: function () {
                var p = this.fontSize;
                return p / 16;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "innerExtraPaddingRight", {
            get: function () {
                var p = this.fontSize;
                return p / 16;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "masterDiffX", {
            get: function () {
                return Number(this.svgGroup.getAttribute(Cell.masterDiffXName));
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.setMasterDiffX = function (id) {
            this.svgGroup.setAttribute(Cell.masterDiffXName, "" + id);
        };
        Object.defineProperty(Cell.prototype, "masterDiffY", {
            get: function () {
                return Number(this.svgGroup.getAttribute(Cell.masterDiffYName));
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.setMasterDiffY = function (id) {
            this.svgGroup.setAttribute(Cell.masterDiffYName, "" + id);
        };
        Object.defineProperty(Cell.prototype, "masterCellX", {
            get: function () {
                return this.cellX + this.masterDiffX;
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.setMasterCellX = function (id) {
            this.setMasterDiffX(id - this.cellX);
        };
        Object.defineProperty(Cell.prototype, "masterCellY", {
            get: function () {
                return this.cellY + this.masterDiffY;
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.setMasterCellY = function (id) {
            this.setMasterDiffY(id - this.cellY);
        };
        Object.defineProperty(Cell.prototype, "masterID", {
            get: function () {
                return this.table.cells[this.masterCellY][this.masterCellX].ID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "master", {
            get: function () {
                return this.table.cellArray[this.masterID];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "topBorder", {
            get: function () {
                return this._borders[DirectionType.top];
            },
            set: function (line) {
                this._borders[DirectionType.top] = line;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "leftBorder", {
            get: function () {
                return this._borders[DirectionType.left];
            },
            set: function (line) {
                this._borders[DirectionType.left] = line;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "rightBorder", {
            get: function () {
                return this._borders[DirectionType.right];
            },
            set: function (line) {
                this._borders[DirectionType.right] = line;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "bottomBorder", {
            get: function () {
                return this._borders[DirectionType.bottom];
            },
            set: function (line) {
                this._borders[DirectionType.bottom] = line;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "table", {
            get: function () {
                return this._table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "svgBackground", {
            get: function () {
                return this._svgBackground;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "svgText", {
            get: function () {
                return this._svgText;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "svgGroup", {
            get: function () {
                return this._svgGroup;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "fontSize", {
            get: function () {
                var p = this.svgText.getPropertyStyleValueWithDefault("font-size", "24");
                var p2 = parseInt(p);
                return p2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "paddingLeft", {
            get: function () {
                return GraphTableSVG.parsePXString(this.svgGroup.getPropertyStyleValue("padding-left"));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "paddingRight", {
            get: function () {
                return GraphTableSVG.parsePXString(this.svgGroup.getPropertyStyleValue("padding-right"));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "paddingTop", {
            get: function () {
                return GraphTableSVG.parsePXString(this.svgGroup.getPropertyStyleValue("padding-top"));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "paddingBottom", {
            get: function () {
                return GraphTableSVG.parsePXString(this.svgGroup.getPropertyStyleValue("padding-bottom"));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "horizontalAnchor", {
            get: function () {
                return this.svgGroup.getPropertyStyleValue(GraphTableSVG.HorizontalAnchorPropertyName);
            },
            set: function (value) {
                if (this.horizontalAnchor != value)
                    this.svgGroup.setPropertyStyleValue(GraphTableSVG.HorizontalAnchorPropertyName, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "verticalAnchor", {
            get: function () {
                return this.svgGroup.getPropertyStyleValue(GraphTableSVG.VerticalAnchorPropertyName);
            },
            set: function (value) {
                if (this.verticalAnchor != value)
                    this.svgGroup.setPropertyStyleValue(GraphTableSVG.VerticalAnchorPropertyName, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "cellX", {
            get: function () {
                return Number(this.svgGroup.getAttribute(Cell.cellXName));
            },
            set: function (value) {
                if (this.cellX != value)
                    this.svgGroup.setAttribute(Cell.cellXName, value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "cellY", {
            get: function () {
                return Number(this.svgGroup.getAttribute(Cell.cellYName));
            },
            set: function (value) {
                if (this.cellY != value)
                    this.svgGroup.setAttribute(Cell.cellYName, value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "defaultTextClass", {
            get: function () {
                var r = this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.defaultTextClass);
                return r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "defaultBackgroundClass", {
            get: function () {
                return this.svgGroup.getPropertyStyleValue(Cell.defaultBackgroundClassName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "logicalWidth", {
            get: function () {
                if (this.isMaster) {
                    var w = 0;
                    var now = this;
                    while (now != null && this.ID == now.masterID) {
                        now = this.rightCell;
                        w++;
                    }
                    return w;
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "logicalHeight", {
            get: function () {
                if (this.isMaster) {
                    var h = 0;
                    var now = this;
                    while (now != null && this.ID == now.masterID) {
                        now = this.bottomCell;
                        h++;
                    }
                    return h;
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "isLocated", {
            get: function () {
                return GraphTableSVG.Common.IsDescendantOfBody(this.svgGroup);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "calculatedWidthUsingText", {
            get: function () {
                if (this.isLocated) {
                    return this.svgText.getBBox().width + this.innerExtraPaddingLeft + this.innerExtraPaddingRight
                        + GraphTableSVG.parsePXString(this.svgGroup.style.paddingLeft) + GraphTableSVG.parsePXString(this.svgGroup.style.paddingRight);
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "calculatedHeightUsingText", {
            get: function () {
                if (this.isLocated) {
                    return this.svgText.getBBox().height + GraphTableSVG.parsePXString(this.svgGroup.style.paddingTop) + GraphTableSVG.parsePXString(this.svgGroup.style.paddingBottom);
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.calculatedSizeUsingGroup = function () {
            var _this = this;
            if (this.isLocated) {
                var w_1 = 0;
                var h_1 = 0;
                this.leftSideGroupCells.forEach(function (v) { return h_1 += _this.table.rows[v.cellY].height; });
                this.upperSideGroupCells.forEach(function (v) { return w_1 += _this.table.columns[v.cellX].width; });
                return [w_1, h_1];
            }
            else {
                return [0, 0];
            }
        };
        Cell.prototype.computeSidePosition = function (dir) {
            switch (dir) {
                case DirectionType2.topLeft: return [this.x, this.y];
                case DirectionType2.topRight: return [this.x + this.width, this.y];
                case DirectionType2.bottomLeft: return [this.x, this.y + this.height];
                case DirectionType2.bottomRight: return [this.x + this.width, this.y + this.height];
            }
            throw Error("error");
        };
        Object.defineProperty(Cell.prototype, "isMaster", {
            get: function () {
                return this.ID == this.masterID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "isSlave", {
            get: function () {
                return !this.isMaster;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "ID", {
            get: function () {
                return this.cellX + (this.cellY * this.table.columnCount);
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.getNextCell = function (direction) {
            switch (direction) {
                case DirectionType.top: return this.cellY != 0 ? this.table.cells[this.cellY - 1][this.cellX] : null;
                case DirectionType.left: return this.cellX != 0 ? this.table.cells[this.cellY][this.cellX - 1] : null;
                case DirectionType.right: return this.cellX + 1 != this.table.columnCount ? this.table.cells[this.cellY][this.cellX + 1] : null;
                case DirectionType.bottom: return this.cellY + 1 != this.table.rowCount ? this.table.cells[this.cellY + 1][this.cellX] : null;
            }
            throw Error("error");
        };
        Cell.prototype.getNextMasterCell = function (direction) {
            var nextCell = this.getNextCell(direction);
            return nextCell == null ? null :
                nextCell.masterID != this.masterID ? nextCell.master : nextCell.getNextMasterCell(direction);
        };
        Object.defineProperty(Cell.prototype, "topCell", {
            get: function () {
                return this.getNextCell(DirectionType.top);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "leftCell", {
            get: function () {
                return this.getNextCell(DirectionType.left);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "rightCell", {
            get: function () {
                return this.getNextCell(DirectionType.right);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "bottomCell", {
            get: function () {
                return this.getNextCell(DirectionType.bottom);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "bottomRightCell", {
            get: function () {
                return this.bottomCell == null ? null : this.bottomCell.rightCell == null ? null : this.bottomCell.rightCell;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "topRightCell", {
            get: function () {
                return this.topCell == null ? null : this.topCell.rightCell == null ? null : this.topCell.rightCell;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "bottomLeftCell", {
            get: function () {
                return this.bottomCell == null ? null : this.bottomCell.leftCell == null ? null : this.bottomCell.leftCell;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "topLeftCell", {
            get: function () {
                return this.topCell == null ? null : this.topCell.leftCell == null ? null : this.topCell.leftCell;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "topMasterCell", {
            get: function () {
                return this.getNextMasterCell(DirectionType.top);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "leftMasterCell", {
            get: function () {
                return this.getNextMasterCell(DirectionType.left);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "rightMasterCell", {
            get: function () {
                return this.getNextMasterCell(DirectionType.right);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "bottomMasterCell", {
            get: function () {
                return this.getNextMasterCell(DirectionType.bottom);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "computeGroupWidth", {
            get: function () {
                var p = this.master.upperSideGroupCells;
                var x2 = p[p.length - 1].cellX;
                var w = 0;
                for (var i = this.cellX; i <= x2; i++) {
                    w += this.table.columns[i].width;
                }
                return w;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "computeGroupHeight", {
            get: function () {
                var p = this.master.leftSideGroupCells;
                var y2 = p[p.length - 1].cellY;
                var w = 0;
                for (var i = this.cellY; i <= y2; i++) {
                    w += this.table.rows[i].height;
                }
                return w;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "GroupRowCount", {
            get: function () {
                if (!this.isMaster)
                    throw Error("Slave Error");
                return this.leftSideGroupCells.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "GroupColumnCount", {
            get: function () {
                if (!this.isMaster)
                    throw Error("Slave Error");
                return this.upperSideGroupCells.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "cellsInGroup", {
            get: function () {
                if (this.isMaster) {
                    return this.table.getRangeCells(this.cellX, this.cellY, this.GroupColumnCount, this.GroupRowCount);
                }
                else {
                    throw Error("Slave Error");
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "cellArrayInGroup", {
            get: function () {
                if (this.isMaster) {
                    return this.table.getRangeCellArray(this.cellX, this.cellY, this.GroupColumnCount, this.GroupRowCount);
                }
                else {
                    throw Error("Slave Error");
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "isSingleCell", {
            get: function () {
                return this.isMaster && this.leftSideGroupCells.length == 1 && this.upperSideGroupCells.length == 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "isRowSingleCell", {
            get: function () {
                return this.isMaster && this.leftSideGroupCells.length == 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "isColumnSingleCell", {
            get: function () {
                return this.isMaster && this.upperSideGroupCells.length == 1;
            },
            enumerable: true,
            configurable: true
        });
        Cell.computeOverlapRange = function (v, w) {
            if (w[0] < v[0]) {
                return Cell.computeOverlapRange(w, v);
            }
            else {
                if (v[1] < w[0]) {
                    return null;
                }
                else {
                    if (w[1] < v[1]) {
                        return [w[0], w[1]];
                    }
                    else {
                        return [w[0], v[1]];
                    }
                }
            }
        };
        Cell.computeDisjunction = function (v, w) {
            if (w[0] < v[0]) {
                return Cell.computeDisjunction(w, v);
            }
            else {
                if (v[1] < w[0]) {
                    return null;
                }
                else {
                    return [v[0], Math.max(v[1], w[1])];
                }
            }
        };
        Object.defineProperty(Cell.prototype, "groupColumnRange", {
            get: function () {
                return [this.master.cellX, this.master.mostRightCellX];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "groupRowRange", {
            get: function () {
                return [this.master.cellY, this.master.mostBottomCellY];
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.computeBorderLength2 = function (dir) {
            var d1 = dir == DirectionType.top || dir == DirectionType.bottom ? this.master.x : this.master.y;
            var d2 = dir == DirectionType.top || dir == DirectionType.bottom ? this.master.x + this.computeGroupWidth : this.master.y + this.computeGroupHeight;
            var nextCell = this.getNextMasterCell(dir);
            if (nextCell != null) {
                var e1 = dir == DirectionType.top || dir == DirectionType.bottom ? nextCell.x : nextCell.y;
                var e2 = dir == DirectionType.top || dir == DirectionType.bottom ? nextCell.x + nextCell.computeGroupWidth : nextCell.y + nextCell.computeGroupHeight;
                var range = Cell.computeOverlapRange([d1, d2], [e1, e2]);
                if (range == null) {
                    throw Error("error");
                }
                else {
                    return range[1] - range[0];
                }
            }
            else {
                return d2 - d1;
            }
        };
        Cell.prototype.canMerge = function (w, h) {
            var range = this.table.getRangeCells(this.cellX, this.cellY, w, h);
            for (var x = 0; x < w; x++) {
                var topCell = range[0][x].topCell;
                if (topCell != null) {
                    if (range[0][x].masterID == topCell.masterID)
                        return false;
                }
                var bottomCell = range[h - 1][x].bottomCell;
                if (bottomCell != null) {
                    if (range[h - 1][x].masterID == bottomCell.masterID)
                        return false;
                }
            }
            for (var y = 0; y < h; y++) {
                var leftCell = range[y][0].leftCell;
                if (leftCell != null) {
                    if (range[y][0].masterID == leftCell.masterID)
                        return false;
                }
                var rightCell = range[y][w - 1].rightCell;
                if (rightCell != null) {
                    if (range[y][w - 1].masterID == rightCell.masterID)
                        return false;
                }
            }
            return true;
        };
        Cell.prototype.merge = function (w, h) {
            var _this = this;
            if (!this.isMaster)
                throw Error("Error");
            var range = this.table.getRangeCellArray(this.cellX, this.cellY, w, h);
            range.forEach(function (v) { v.setMasterCellX(_this.masterCellX); v.setMasterCellY(_this.masterCellY); });
            range.forEach(function (v) { v.groupUpdate(); });
        };
        Cell.prototype.getMergedRangeRight = function () {
            if (!this.isMaster)
                return null;
            if (this.rightMasterCell != null) {
                var b1 = this.cellY == this.rightMasterCell.cellY;
                var b2 = this.GroupRowCount == this.rightMasterCell.GroupRowCount;
                if (b1 && b2) {
                    return [this.GroupColumnCount + this.rightMasterCell.GroupColumnCount, this.GroupRowCount];
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        };
        Cell.prototype.getMergedRangeBottom = function () {
            if (!this.isMaster)
                return null;
            if (this.bottomMasterCell != null) {
                var b1 = this.cellX == this.bottomMasterCell.cellX;
                var b2 = this.GroupColumnCount == this.bottomMasterCell.GroupColumnCount;
                if (b1 && b2) {
                    return [this.GroupColumnCount, this.GroupRowCount + this.bottomMasterCell.GroupRowCount];
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        };
        Object.defineProperty(Cell.prototype, "canMergeRight", {
            get: function () {
                return this.getMergedRangeRight() != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "canMergeBottom", {
            get: function () {
                return this.getMergedRangeBottom() != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "mostRightCellX", {
            get: function () {
                return this.cellX + this.GroupColumnCount - 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "mostBottomCellY", {
            get: function () {
                return this.cellY + this.GroupRowCount - 1;
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.getNextGroupCells = function (direction) {
            if (this.isMaster) {
                var w = [this];
                var now = this.getNextCell(direction);
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = now.getNextCell(direction);
                }
                return w;
            }
            else {
                return [];
            }
        };
        Object.defineProperty(Cell.prototype, "leftSideGroupCells", {
            get: function () {
                return this.getNextGroupCells(DirectionType.bottom);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "upperSideGroupCells", {
            get: function () {
                return this.getNextGroupCells(DirectionType.right);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "x", {
            get: function () {
                return this.svgGroup.getX();
            },
            set: function (value) {
                this.svgGroup.setX(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "y", {
            get: function () {
                return this.svgGroup.getY();
            },
            set: function (value) {
                this.svgGroup.setY(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "width", {
            get: function () {
                return this.svgBackground.width.baseVal.value;
            },
            set: function (value) {
                this.svgBackground.width.baseVal.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "height", {
            get: function () {
                return this.svgBackground.height.baseVal.value;
            },
            set: function (value) {
                this.svgBackground.height.baseVal.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "region", {
            get: function () {
                var p = new GraphTableSVG.Rectangle(this.x, this.y, this.width, this.height);
                return p;
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.toPlainText = function () {
            if (this.isMaster) {
                var textContext = this.svgText.textContent != null ? this.svgText.textContent : "";
                if (this.isSingleCell) {
                    return textContext;
                }
                else {
                    return textContext + "%%%" + this.GroupColumnCount + "%%%" + this.GroupRowCount;
                }
            }
            else {
                return "";
            }
        };
        Cell.prototype.update = function () {
            this.groupUpdate();
        };
        Cell.prototype.groupUpdate = function () {
            if (this.isMaster) {
                this.table.svgGroup.insertBefore(this.svgGroup, this.table.svgGroup.firstChild);
            }
            else {
                this.table.svgHiddenGroup.appendChild(this.svgGroup);
                this.svgText.textContent = "";
            }
            if (this.isMaster || (this.topCell != null && this.topCell.isMaster)) {
                this.table.svgGroup.appendChild(this.topBorder);
            }
            else {
                this.table.svgHiddenGroup.appendChild(this.topBorder);
            }
            if (this.isMaster || (this.leftCell != null && this.leftCell.isMaster)) {
                this.table.svgGroup.appendChild(this.leftBorder);
            }
            else {
                this.table.svgHiddenGroup.appendChild(this.leftBorder);
            }
            if (this.isMaster || (this.rightCell != null && this.rightCell.isMaster)) {
                this.table.svgGroup.appendChild(this.rightBorder);
            }
            else {
                this.table.svgHiddenGroup.appendChild(this.rightBorder);
            }
            if (this.isMaster || (this.bottomCell != null && this.bottomCell.isMaster)) {
                this.table.svgGroup.appendChild(this.bottomBorder);
            }
            else {
                this.table.svgHiddenGroup.appendChild(this.bottomBorder);
            }
            this.resize();
            this.relocation();
        };
        Cell.prototype.resize = function () {
            var _a = this.calculatedSizeUsingGroup(), w = _a[0], h = _a[1];
            if (this.width != w) {
                this.width = w;
            }
            if (this.height != h) {
                this.height = h;
            }
            if (this.width < this.calculatedWidthUsingText) {
                this.width = this.calculatedWidthUsingText;
            }
            if (this.height < this.calculatedHeightUsingText) {
                this.height = this.calculatedHeightUsingText;
            }
        };
        Cell.prototype.localUpdate = function () {
            var innerRect = new GraphTableSVG.Rectangle();
            innerRect.x = this.innerExtraPaddingLeft + this.paddingLeft;
            innerRect.y = this.paddingTop;
            innerRect.height = this.height - this.paddingTop - this.paddingBottom;
            innerRect.width = this.width - this.innerExtraPaddingLeft - this.innerExtraPaddingRight - this.paddingLeft - this.paddingRight;
            if (this.isLocated) {
                this.svgText.gtSetXY(innerRect, this.verticalAnchor, this.horizontalAnchor, false);
            }
        };
        Cell.prototype.removeBorder = function (dir) {
            var border = this._borders[dir];
            if (this.table.svgHiddenGroup.contains(border)) {
                this.table.svgHiddenGroup.removeChild(border);
            }
            else if (this.table.svgGroup.contains(border)) {
                this.table.svgGroup.removeChild(border);
            }
            else {
                throw Error("error");
            }
        };
        Cell.prototype.removeFromTable = function (isColumn) {
            if (this.table.svgGroup.contains(this.svgGroup)) {
                this.table.svgGroup.removeChild(this.svgGroup);
            }
            else if (this.table.svgHiddenGroup.contains(this.svgGroup)) {
                this.table.svgHiddenGroup.removeChild(this.svgGroup);
            }
            else {
                throw Error("error");
            }
            if (isColumn) {
                this.removeBorder(DirectionType.top);
                if (this.table.svgGroup.contains(this.topBorder)) {
                    throw Error("err");
                }
                if (this.bottomCell == null)
                    this.removeBorder(DirectionType.bottom);
                if (this.leftCell == null)
                    this.removeBorder(DirectionType.left);
                if (this.rightCell == null)
                    this.removeBorder(DirectionType.right);
            }
            else {
                this.removeBorder(DirectionType.left);
                if (this.rightCell == null)
                    this.removeBorder(DirectionType.right);
                if (this.topCell == null)
                    this.removeBorder(DirectionType.top);
                if (this.bottomCell == null)
                    this.removeBorder(DirectionType.bottom);
            }
        };
        Cell.prototype.relocateTopBorder = function () {
            if (!this.isMaster)
                return;
            if (this.table.svgGroup.contains(this.topBorder)) {
                if (this.isMaster) {
                    this.topBorder.x1.baseVal.value = this.x;
                    this.topBorder.x2.baseVal.value = this.x + this.computeBorderLength2(DirectionType.top);
                    this.topBorder.y1.baseVal.value = this.y;
                    this.topBorder.y2.baseVal.value = this.topBorder.y1.baseVal.value;
                }
                else if (this.topCell != null && this.topCell.isMaster) {
                    this.topCell.relocateBottomBorder();
                }
                else {
                    throw Error("error");
                }
            }
        };
        Cell.prototype.relocateLeftBorder = function () {
            if (!this.isMaster)
                return;
            if (this.table.svgGroup.contains(this.leftBorder)) {
                if (this.isMaster) {
                    this.leftBorder.x1.baseVal.value = this.x;
                    this.leftBorder.x2.baseVal.value = this.leftBorder.x1.baseVal.value;
                    this.leftBorder.y1.baseVal.value = this.y;
                    this.leftBorder.y2.baseVal.value = this.y + this.computeBorderLength2(DirectionType.left);
                }
                else if (this.leftCell != null && this.leftCell.isMaster) {
                    this.leftCell.relocateRightBorder();
                }
                else {
                    throw Error("error");
                }
            }
        };
        Cell.prototype.relocateRightBorder = function () {
            if (!this.isMaster)
                return;
            if (this.table.svgGroup.contains(this.rightBorder)) {
                if (this.isMaster) {
                    this.rightBorder.x1.baseVal.value = this.x + this.width;
                    this.rightBorder.x2.baseVal.value = this.rightBorder.x1.baseVal.value;
                    this.rightBorder.y1.baseVal.value = this.y;
                    this.rightBorder.y2.baseVal.value = this.y + this.computeBorderLength2(DirectionType.right);
                }
                else if (this.rightCell != null && this.rightCell.isMaster) {
                    this.rightCell.relocateLeftBorder();
                }
                else {
                    throw Error("error");
                }
            }
        };
        Cell.prototype.relocateBottomBorder = function () {
            if (!this.isMaster)
                return;
            if (this.table.svgGroup.contains(this.bottomBorder)) {
                if (this.isMaster) {
                    this.bottomBorder.x1.baseVal.value = this.x;
                    this.bottomBorder.x2.baseVal.value = this.x + this.computeBorderLength2(DirectionType.bottom);
                    this.bottomBorder.y1.baseVal.value = this.y + this.height;
                    this.bottomBorder.y2.baseVal.value = this.bottomBorder.y1.baseVal.value;
                }
                else if (this.bottomCell != null && this.bottomCell.isMaster) {
                    this.bottomCell.relocateTopBorder();
                }
                else {
                    throw Error("error");
                }
            }
        };
        Cell.prototype.relocation = function () {
            if (!GraphTableSVG.Common.IsDescendantOfBody(this.svgGroup))
                return;
            this.relocateTopBorder();
            this.relocateLeftBorder();
            this.relocateRightBorder();
            this.relocateBottomBorder();
            this.localUpdate();
        };
        Cell.prototype.mergeRight = function () {
            var range = this.getMergedRangeRight();
            if (range != null) {
                this.merge(range[0], range[1]);
            }
            else {
                throw Error("Error");
            }
        };
        Cell.prototype.mergeBottom = function () {
            var range = this.getMergedRangeBottom();
            if (range != null) {
                this.merge(range[0], range[1]);
            }
            else {
                throw Error("Error");
            }
        };
        Cell.prototype.decomposeRow = function (upperRowCount) {
            if (this.isMaster) {
                var upperSide = this.table.getRangeCellArray(this.cellX, this.cellY, this.GroupColumnCount, upperRowCount);
                var lowerSide = this.table.getRangeCellArray(this.cellX, this.cellY + upperRowCount, this.GroupColumnCount, this.GroupRowCount - upperRowCount);
                var lowerMaster_1 = lowerSide[0];
                lowerSide.forEach(function (v) {
                    v.setMasterCellX(lowerMaster_1.cellX);
                    v.setMasterCellY(lowerMaster_1.cellY);
                });
                upperSide.forEach(function (v) { return v.groupUpdate(); });
                lowerSide.forEach(function (v) { return v.groupUpdate(); });
            }
            else {
                throw Error("Slave Error");
            }
        };
        Cell.prototype.decomposeColomn = function (leftColumnCount) {
            if (this.isMaster) {
                var leftSide = this.table.getRangeCellArray(this.cellX, this.cellY, leftColumnCount, this.GroupRowCount);
                var rightSide = this.table.getRangeCellArray(this.cellX + leftColumnCount, this.cellY, this.GroupColumnCount - leftColumnCount, this.GroupRowCount);
                var rightMaster_1 = rightSide[0];
                rightSide.forEach(function (v) {
                    v.setMasterCellX(rightMaster_1.cellX);
                    v.setMasterCellY(rightMaster_1.cellY);
                });
                leftSide.forEach(function (v) { return v.groupUpdate(); });
                rightSide.forEach(function (v) { return v.groupUpdate(); });
            }
            else {
                throw Error("Slave Error");
            }
        };
        Cell.prototype.updateBorderAttributes = function () {
            if (this.leftCell != null && this.leftCell.rightBorder != this.leftBorder) {
                this.removeBorder(DirectionType.left);
                this.leftBorder = this.leftCell.rightBorder;
            }
            if (this.topCell != null && this.topCell.bottomBorder != this.topBorder) {
                this.removeBorder(DirectionType.top);
                this.topBorder = this.topCell.bottomBorder;
            }
            if (this.rightCell != null && this.rightCell.leftBorder != this.rightBorder) {
                this.rightCell.removeBorder(DirectionType.left);
                this.rightCell.leftBorder = this.rightBorder;
            }
            if (this.bottomCell != null && this.bottomCell.topBorder != this.bottomBorder) {
                this.bottomCell.removeBorder(DirectionType.top);
                this.bottomCell.topBorder = this.bottomBorder;
            }
            this.topBorder.setAttribute(Cell.borderXName, "" + this.cellX);
            this.topBorder.setAttribute(Cell.borderYName, "" + this.cellY);
            this.topBorder.setAttribute(Cell.borderTypeName, "horizontal");
            this.leftBorder.setAttribute(Cell.borderXName, "" + this.cellX);
            this.leftBorder.setAttribute(Cell.borderYName, "" + this.cellY);
            this.leftBorder.setAttribute(Cell.borderTypeName, "vertical");
            this.rightBorder.setAttribute(Cell.borderXName, "" + (this.cellX + 1));
            this.rightBorder.setAttribute(Cell.borderYName, "" + this.cellY);
            this.rightBorder.setAttribute(Cell.borderTypeName, "vertical");
            this.bottomBorder.setAttribute(Cell.borderXName, "" + this.cellX);
            this.bottomBorder.setAttribute(Cell.borderYName, "" + (this.cellY + 1));
            this.bottomBorder.setAttribute(Cell.borderTypeName, "horizontal");
        };
        Cell.defaultBackgroundClassName = "--default-background-class";
        Cell.emphasisCellClass = "___cell-emphasis";
        Cell.emphasisBorderClass = "___border-emphasis";
        Cell.temporaryBorderClass = "___temporary-class";
        Cell.cellXName = "data-cellX";
        Cell.cellYName = "data-cellY";
        Cell.borderXName = "data-borderX";
        Cell.borderYName = "data-borderY";
        Cell.borderTypeName = "data-borderType";
        Cell.masterIDName = "data-masterID";
        Cell.masterDiffXName = "data-masterDiffX";
        Cell.masterDiffYName = "data-masterDiffY";
        Cell.elementTypeName = "data-elementType";
        return Cell;
    }());
    GraphTableSVG.Cell = Cell;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var Column = (function () {
        function Column(_table, _x, _width) {
            if (_width === void 0) { _width = 30; }
            this.table = _table;
            this._svgGroup = GraphTableSVG.SVG.createGroup(this.table.svgGroup);
            this.cellX = _x;
            this._svgGroup.setAttribute(Column.rowWidthName, "" + _width);
        }
        Object.defineProperty(Column.prototype, "cellX", {
            get: function () {
                return Number(this._svgGroup.getAttribute(GraphTableSVG.Cell.cellXName));
            },
            set: function (v) {
                this._svgGroup.setAttribute(GraphTableSVG.Cell.cellXName, "" + v);
                this.cells.forEach(function (w) { return w.cellX = v; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Column.prototype, "width", {
            get: function () {
                return Number(this._svgGroup.getAttribute(Column.rowWidthName));
            },
            set: function (value) {
                this._svgGroup.setAttribute(Column.rowWidthName, "" + value);
                this.setWidthToCells();
            },
            enumerable: true,
            configurable: true
        });
        Column.prototype.setWidthToCells = function () {
            var width = this.width;
            var b = false;
            for (var y = 0; y < this.table.rowCount; y++) {
                var cell = this.table.cells[y][this.cellX];
                if (cell.isColumnSingleCell && cell.width != width) {
                    cell.width = width;
                    b = true;
                }
            }
            for (var y = 0; y < this.table.rowCount; y++) {
                var cell = this.table.cells[y][this.cellX];
                if (!cell.isColumnSingleCell) {
                    cell.update();
                    b = true;
                }
            }
            if (b && !this.table.isDrawing && this.table.isAutoResized)
                this.table.update();
        };
        Object.defineProperty(Column.prototype, "cells", {
            get: function () {
                var items = [];
                for (var i = 0; i < this.table.rowCount; i++) {
                    items.push(this.table.cells[i][this.cellX]);
                }
                return items;
            },
            enumerable: true,
            configurable: true
        });
        Column.prototype.getMaxWidth = function () {
            var width = 0;
            for (var y = 0; y < this.table.rowCount; y++) {
                var cell = this.table.cells[y][this.cellX];
                if (cell.isColumnSingleCell) {
                    if (width < cell.calculatedWidthUsingText)
                        width = cell.calculatedWidthUsingText;
                    if (width < cell.width)
                        width = cell.width;
                }
            }
            return width;
        };
        Column.prototype.update = function () {
            this.setWidthToCells();
        };
        Column.prototype.resize = function () {
            this.setWidthToCells();
        };
        Column.prototype.fitWidthToOriginalCell = function (allowShrink) {
            if (allowShrink) {
                this.width = this.getMaxWidth();
            }
            else {
                this.width = Math.max(this.width, this.getMaxWidth());
            }
        };
        Column.prototype.setX = function (posX) {
            for (var y = 0; y < this.table.rowCount; y++) {
                var cell = this.table.cells[y][this.cellX];
                cell.x = posX;
            }
        };
        Object.defineProperty(Column.prototype, "leftBorders", {
            get: function () {
                var r = [];
                this.cells.forEach(function (v) {
                    if (r.length == 0) {
                        r.push(v.leftBorder);
                    }
                    else {
                        var last = r[r.length - 1];
                        if (last != v.leftBorder)
                            r.push(v.leftBorder);
                    }
                });
                return r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Column.prototype, "rightBorders", {
            get: function () {
                var r = [];
                this.cells.forEach(function (v) {
                    if (r.length == 0) {
                        r.push(v.rightBorder);
                    }
                    else {
                        var last = r[r.length - 1];
                        if (last != v.rightBorder)
                            r.push(v.rightBorder);
                    }
                });
                return r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Column.prototype, "topBorder", {
            get: function () {
                return this.cells[0].topBorder;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Column.prototype, "bottomBorder", {
            get: function () {
                var cells = this.cells;
                return cells[cells.length - 1].bottomBorder;
            },
            enumerable: true,
            configurable: true
        });
        Column.prototype.remove = function (isUnit) {
            var _this = this;
            if (isUnit === void 0) { isUnit = false; }
            if (isUnit) {
                if (this.table.columns.length > 1) {
                    this.table.columns[this.cellX].cells.forEach(function (v) {
                        v.removeFromTable(true);
                        _this.table.cells[v.cellY].splice(_this.cellX, 1);
                    });
                    this.table.columns.splice(this.cellX, 1);
                    this.table.columns.forEach(function (v, i) { return v.cellX = i; });
                    this.table.svgGroup.removeChild(this._svgGroup);
                    this.table.update();
                }
                else if (this.table.columns.length == 1) {
                    while (this.table.rows.length > 0) {
                        this.table.rows[this.table.rows.length - 1].remove(true);
                    }
                    if (this.table.columns.length == 1)
                        this.table.columns.splice(0, 1);
                }
                else {
                    throw Error("error");
                }
            }
            else {
                var _a = this.groupColumnRange, b = _a[0], e = _a[1];
                for (var x = e; x >= b; x--) {
                    this.table.columns[x].remove(true);
                }
            }
        };
        Column.prototype.relocation = function () {
            this.cells.forEach(function (v) { return v.relocation(); });
        };
        Object.defineProperty(Column.prototype, "groupColumnRange", {
            get: function () {
                var range = this.cells[0].groupColumnRange;
                this.cells.forEach(function (v) {
                    if (range != null) {
                        range = GraphTableSVG.Cell.computeDisjunction(range, v.groupColumnRange);
                    }
                });
                if (range == null) {
                    throw Error("error");
                }
                else {
                    return range;
                }
            },
            enumerable: true,
            configurable: true
        });
        Column.rowWidthName = "data-width";
        return Column;
    }());
    GraphTableSVG.Column = Column;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var Row = (function () {
        function Row(_table, _y, _height) {
            if (_height === void 0) { _height = 30; }
            this.table = _table;
            this._svgGroup = GraphTableSVG.SVG.createGroup(this.table.svgGroup);
            this.cellY = _y;
            this._svgGroup.setAttribute(Row.columnHeightName, "" + _height);
        }
        Object.defineProperty(Row.prototype, "cellY", {
            get: function () {
                return Number(this._svgGroup.getAttribute(GraphTableSVG.Cell.cellYName));
            },
            set: function (v) {
                this._svgGroup.setAttribute(GraphTableSVG.Cell.cellYName, "" + v);
                this.cells.forEach(function (w) { return w.cellY = v; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Row.prototype, "height", {
            get: function () {
                return Number(this._svgGroup.getAttribute(Row.columnHeightName));
            },
            set: function (value) {
                this._svgGroup.setAttribute(Row.columnHeightName, "" + value);
                this.setHeightToCells();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Row.prototype, "cells", {
            get: function () {
                return this.table.cells[this.cellY];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Row.prototype, "topBorders", {
            get: function () {
                var r = [];
                this.cells.forEach(function (v) {
                    if (r.length == 0) {
                        r.push(v.topBorder);
                    }
                    else {
                        var last = r[r.length - 1];
                        if (last != v.topBorder)
                            r.push(v.topBorder);
                    }
                });
                return r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Row.prototype, "bottomBorders", {
            get: function () {
                var r = [];
                this.cells.forEach(function (v) {
                    if (r.length == 0) {
                        r.push(v.bottomBorder);
                    }
                    else {
                        var last = r[r.length - 1];
                        if (last != v.bottomBorder)
                            r.push(v.bottomBorder);
                    }
                });
                return r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Row.prototype, "leftBorder", {
            get: function () {
                return this.cells[0].leftBorder;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Row.prototype, "rightBorder", {
            get: function () {
                var cells = this.cells;
                return cells[cells.length - 1].rightBorder;
            },
            enumerable: true,
            configurable: true
        });
        Row.prototype.setHeightToCells = function () {
            var height = this.height;
            var b = false;
            for (var x = 0; x < this.table.columnCount; x++) {
                var cell = this.table.cells[this.cellY][x];
                if (cell.isRowSingleCell && cell.height != height) {
                    cell.height = height;
                    b = true;
                }
            }
            for (var x = 0; x < this.table.columnCount; x++) {
                var cell = this.table.cells[this.cellY][x];
                if (!cell.isRowSingleCell) {
                    cell.update();
                    b = true;
                }
            }
            if (b && !this.table.isDrawing && this.table.isAutoResized)
                this.table.update();
        };
        Row.prototype.update = function () {
            this.setHeightToCells();
        };
        Row.prototype.resize = function () {
            this.setHeightToCells();
        };
        Row.prototype.fitHeightToOriginalCell = function (allowShrink) {
            if (allowShrink) {
                this.height = this.getMaxHeight();
            }
            else {
                this.height = Math.max(this.height, this.getMaxHeight());
            }
        };
        Row.prototype.setY = function (posY) {
            for (var x = 0; x < this.table.columnCount; x++) {
                var cell = this.table.cells[this.cellY][x];
                cell.y = posY;
            }
        };
        Row.prototype.getMaxHeight = function () {
            var height = 0;
            for (var x = 0; x < this.table.columnCount; x++) {
                var cell = this.table.cells[this.cellY][x];
                if (cell.isRowSingleCell) {
                    if (height < cell.calculatedHeightUsingText)
                        height = cell.calculatedHeightUsingText;
                    if (height < cell.height)
                        height = cell.height;
                }
            }
            return height;
        };
        Row.prototype.remove = function (isUnit) {
            if (isUnit === void 0) { isUnit = false; }
            if (isUnit) {
                if (this.table.rows.length > 1 || (this.table.rows.length == 1 && this.table.columns.length == 1)) {
                    this.cells.forEach(function (v) { return v.removeFromTable(false); });
                    this.table.cells.splice(this.cellY, 1);
                    this.table.rows.splice(this.cellY, 1);
                    this.table.rows.forEach(function (v, i) { return v.cellY = i; });
                    this.table.svgGroup.removeChild(this._svgGroup);
                    this.table.update();
                }
                else if (this.table.rows.length == 1) {
                    while (this.table.columns.length > 1) {
                        this.table.columns[this.table.columns.length - 1].remove(true);
                    }
                    this.table.rows[0].remove(true);
                }
                else {
                    throw Error("Error");
                }
            }
            else {
                var _a = this.groupRowRange, b = _a[0], e = _a[1];
                for (var y = e; y >= b; y--) {
                    this.table.rows[y].remove(true);
                }
            }
        };
        Row.prototype.relocation = function () {
            this.cells.forEach(function (v) { return v.relocation(); });
        };
        Object.defineProperty(Row.prototype, "groupRowRange", {
            get: function () {
                var range = this.cells[0].groupRowRange;
                this.cells.forEach(function (v) {
                    if (range != null) {
                        range = GraphTableSVG.Cell.computeDisjunction(range, v.groupRowRange);
                    }
                });
                if (range == null) {
                    throw Error("error");
                }
                else {
                    return range;
                }
            },
            enumerable: true,
            configurable: true
        });
        Row.columnHeightName = "data-height";
        return Row;
    }());
    GraphTableSVG.Row = Row;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var Table = (function () {
        function Table(svgbox, option) {
            if (option === void 0) { option = {}; }
            var _this = this;
            this._rows = new Array(0);
            this._columns = new Array(0);
            this._cells = [];
            this._isDrawing = false;
            this._isAutoResized = false;
            this._cellTextObserverFunc = function (x) {
                var b = false;
                var b2 = false;
                for (var i = 0; i < x.length; i++) {
                    var p = x[i];
                    if (p.type == "childList") {
                        b = true;
                        b2 = true;
                    }
                    for (var j = 0; j < p.addedNodes.length; j++) {
                        var item = p.addedNodes.item(j);
                        if (item.nodeName == "#text") {
                            b = true;
                            b2 = true;
                        }
                    }
                }
                if (b2) {
                    _this.fitSizeToOriginalCells(false);
                }
                if (b)
                    _this.update();
            };
            if (GraphTableSVG.Common.getGraphTableCSS() == null)
                GraphTableSVG.Common.setGraphTableCSS("yellow", "red");
            this._svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgbox.appendChild(this.svgGroup);
            this._svgHiddenGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            this._svgHiddenGroup.style.visibility = "hidden";
            svgbox.appendChild(this.svgHiddenGroup);
            this._cellTextObserver = new MutationObserver(this._cellTextObserverFunc);
            if (option.tableClassName != null)
                this.svgGroup.setAttribute("class", option.tableClassName);
            if (option.rowCount == undefined)
                option.rowCount = 5;
            if (option.columnCount == undefined)
                option.columnCount = 5;
            this.setSize(option.columnCount, option.rowCount);
            if (option.x == undefined)
                option.x = 0;
            if (option.y == undefined)
                option.y = 0;
            _a = [option.x, option.y], this.x = _a[0], this.y = _a[1];
            if (option.rowHeight != undefined) {
                this.rows.forEach(function (v) { return v.height = option.rowHeight; });
            }
            if (option.columnWidth != undefined) {
                this.columns.forEach(function (v) { return v.width = option.columnWidth; });
            }
            var _a;
        }
        Object.defineProperty(Table.prototype, "svgGroup", {
            get: function () {
                return this._svgGroup;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "svgHiddenGroup", {
            get: function () {
                return this._svgHiddenGroup;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "rows", {
            get: function () {
                return this._rows;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "columns", {
            get: function () {
                return this._columns;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "cells", {
            get: function () {
                return this._cells;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "isDrawing", {
            get: function () {
                return this._isDrawing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "isAutoResized", {
            get: function () {
                return this._isAutoResized;
            },
            set: function (value) {
                this._isAutoResized = value;
                if (value) {
                    this.update();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "cellTextObserver", {
            get: function () {
                return this._cellTextObserver;
            },
            enumerable: true,
            configurable: true
        });
        Table.prototype.fitSizeToOriginalCells = function (allowShrink) {
            this.rows.forEach(function (v) { return v.fitHeightToOriginalCell(allowShrink); });
            this.columns.forEach(function (v) { return v.fitWidthToOriginalCell(allowShrink); });
        };
        Object.defineProperty(Table.prototype, "x", {
            get: function () {
                return this.svgGroup.getX();
            },
            set: function (value) {
                this.svgGroup.setX(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "y", {
            get: function () {
                return this.svgGroup.getY();
            },
            set: function (value) {
                this.svgGroup.setY(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "defaultCellClass", {
            get: function () {
                return this.svgGroup.getPropertyStyleValue(Table.defaultCellClass);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "defaultBorderClass", {
            get: function () {
                return this.svgGroup.getPropertyStyleValue(Table.defaultBorderClass);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "columnCount", {
            get: function () {
                if (this.cells.length == 0) {
                    return 0;
                }
                else {
                    return this.cells[0].length;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "rowCount", {
            get: function () {
                return this.cells.length;
            },
            enumerable: true,
            configurable: true
        });
        Table.prototype.getTryCell = function (x, y) {
            if (x < 0 || x >= this.columnCount || y < 0 || y >= this.rowCount) {
                return null;
            }
            else {
                return this.cells[y][x];
            }
        };
        Table.prototype.getRangeCells = function (x, y, width, height) {
            var cells = new Array(height);
            for (var i = 0; i < cells.length; i++) {
                cells[i] = new Array(0);
                for (var j = 0; j < width; j++) {
                    cells[i].push(this.cells[y + i][x + j]);
                }
            }
            return cells;
        };
        Table.prototype.getRangeCellArray = function (x, y, width, height) {
            var cells = new Array();
            this.getRangeCells(x, y, width, height).forEach(function (v) { v.forEach(function (w) { cells.push(w); }); });
            return cells;
        };
        Object.defineProperty(Table.prototype, "cellArray", {
            get: function () {
                var arr = new Array(0);
                for (var y = 0; y < this.rowCount; y++) {
                    for (var x = 0; x < this.columnCount; x++) {
                        arr.push(this.cells[y][x]);
                    }
                }
                return arr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "borders", {
            get: function () {
                var arr = new Array(0);
                for (var y = 0; y < this.rowCount; y++) {
                    for (var x = 0; x < this.columnCount; x++) {
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
            },
            enumerable: true,
            configurable: true
        });
        Table.prototype.getRegion = function () {
            var regions = this.cellArray.map(function (v) { return v.region; });
            var rect = GraphTableSVG.Rectangle.merge(regions);
            rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
            return rect;
        };
        Table.prototype.constructFromLogicTable = function (table) {
            if (table.tableClassName != null)
                this.svgGroup.setAttribute("class", table.tableClassName);
            this.setSize(table.columnWidths.length, table.rowHeights.length);
            if (table.x != null)
                this.x = table.x;
            if (table.y != null)
                this.y = table.y;
            for (var y = 0; y < this.rowCount; y++) {
                for (var x = 0; x < this.columnCount; x++) {
                    var cellInfo = table.cells[y][x];
                    if (cellInfo != null) {
                        var cell = this.cells[y][x];
                        if (cellInfo.cellClass != null) {
                            GraphTableSVG.SVG.resetStyle(cell.svgGroup.style);
                            cell.svgGroup.setAttribute("class", cellInfo.cellClass);
                        }
                        if (cellInfo.backgroundClass != null) {
                            GraphTableSVG.SVG.resetStyle(cell.svgBackground.style);
                            cell.svgBackground.setAttribute("class", cellInfo.backgroundClass);
                        }
                        if (cellInfo.textClass != null) {
                            GraphTableSVG.SVG.resetStyle(cell.svgText.style);
                            cell.svgText.setAttribute("class", cellInfo.textClass);
                        }
                        if (cellInfo.text != null) {
                            cell.svgText.setTextContent(cellInfo.text, cellInfo.isLatexMode);
                        }
                        if (cellInfo.topBorderClass != null) {
                            var topCellInfo = y > 0 ? table.cells[y - 1][x] : null;
                            var borderClass = cellInfo.topBorderClass;
                            if (topCellInfo != null && topCellInfo.bottomBorderClass != null) {
                                borderClass = topCellInfo.bottomBorderClass;
                            }
                            GraphTableSVG.SVG.resetStyle(cell.topBorder.style);
                            cell.topBorder.setAttribute("class", borderClass);
                        }
                        if (cellInfo.leftBorderClass != null) {
                            var leftCellInfo = x > 0 ? table.cells[y][x - 1] : null;
                            var borderClass = cellInfo.leftBorderClass;
                            if (leftCellInfo != null && leftCellInfo.rightBorderClass != null) {
                                borderClass = leftCellInfo.rightBorderClass;
                            }
                            GraphTableSVG.SVG.resetStyle(cell.leftBorder.style);
                            cell.leftBorder.setAttribute("class", borderClass);
                        }
                        if (cellInfo.rightBorderClass != null) {
                            var rightCellInfo = x + 1 < table.columnCount ? table.cells[y][x + 1] : null;
                            var borderClass = cellInfo.rightBorderClass;
                            if (rightCellInfo != null && rightCellInfo.leftBorderClass != null) {
                                borderClass = rightCellInfo.leftBorderClass;
                            }
                            GraphTableSVG.SVG.resetStyle(cell.rightBorder.style);
                            cell.rightBorder.setAttribute("class", borderClass);
                        }
                        if (cellInfo.bottomBorderClass != null) {
                            var bottomCellInfo = y + 1 < table.rowCount ? table.cells[y + 1][x] : null;
                            var borderClass = cellInfo.bottomBorderClass;
                            if (bottomCellInfo != null && bottomCellInfo.topBorderClass != null) {
                                borderClass = bottomCellInfo.topBorderClass;
                            }
                            GraphTableSVG.SVG.resetStyle(cell.bottomBorder.style);
                            cell.bottomBorder.setAttribute("class", borderClass);
                        }
                    }
                }
            }
            for (var y = 0; y < this.rowCount; y++) {
                var h = table.rowHeights[y];
                if (h != null)
                    this.rows[y].height = h;
            }
            for (var x = 0; x < this.columnCount; x++) {
                var w = table.columnWidths[x];
                if (w != null)
                    this.columns[x].width = w;
            }
            this.update();
            for (var y = 0; y < this.rowCount; y++) {
                for (var x = 0; x < this.columnCount; x++) {
                    var cell = this.cells[y][x];
                    var logicCell = table.cells[y][x];
                    if (logicCell.connectedColumnCount > 1 || logicCell.connectedRowCount > 1) {
                        if (cell.canMerge(logicCell.connectedColumnCount, logicCell.connectedRowCount)) {
                            cell.merge(logicCell.connectedColumnCount, logicCell.connectedRowCount);
                        }
                    }
                }
            }
        };
        Table.prototype.construct = function (table, option) {
            var _this = this;
            if (option === void 0) { option = {}; }
            if (option.isLatexMode == undefined)
                option.isLatexMode = false;
            if (option.x == undefined)
                option.x = 0;
            if (option.y == undefined)
                option.y = 0;
            _a = [option.x, option.y], this.x = _a[0], this.y = _a[1];
            this.clear();
            var width = 0;
            table.forEach(function (v) { if (v.length > width)
                width = v.length; });
            var height = table.length;
            this.setSize(width, height);
            table.forEach(function (v, y) {
                v.forEach(function (str, x) {
                    _this.cells[y][x].svgText.setTextContent(str, option.isLatexMode);
                });
            });
            if (option.rowHeight != undefined) {
                this.rows.forEach(function (v) { return v.height = option.rowHeight; });
            }
            if (option.columnWidth != undefined) {
                this.columns.forEach(function (v) { return v.width = option.columnWidth; });
            }
            var _a;
        };
        Table.prototype.createVBACode = function (id, slide) {
            var lines = new Array(0);
            lines.push("Sub create" + id + "(createdSlide As slide)");
            var _a = this.createVBAMainCode("createdSlide", id), main = _a[0], sub = _a[1];
            lines.push(main);
            lines.push("End Sub");
            lines.push(sub);
            return lines;
        };
        Table.prototype.createVBAMainCode = function (slideName, id) {
            var fstLines = [];
            var lines = new Array(0);
            fstLines.push(" Dim tableS As shape");
            fstLines.push(" Dim table_ As table");
            fstLines.push(" Set tableS = " + slideName + ".Shapes.AddTable(" + this.rowCount + ", " + this.columnCount + ")");
            fstLines.push(" tableS.Left = " + this.svgGroup.getX());
            fstLines.push(" tableS.Top = " + this.svgGroup.getY());
            fstLines.push(" Set table_ = tableS.table");
            var tableName = "table_";
            for (var y = 0; y < this.rowCount; y++) {
                lines.push([" Call EditRow(" + tableName + ".Rows(" + (y + 1) + "), " + this.rows[y].height + ")"]);
            }
            for (var x = 0; x < this.columnCount; x++) {
                lines.push([" Call EditColumn(" + tableName + ".Columns(" + (x + 1) + "), " + this.columns[x].width + ")"]);
            }
            for (var y = 0; y < this.rowCount; y++) {
                for (var x = 0; x < this.columnCount; x++) {
                    var cell = this.cells[y][x];
                    var color = GraphTableSVG.Color.createRGBFromColorName(cell.svgBackground.getPropertyStyleValueWithDefault("fill", "gray"));
                    GraphTableSVG.VBATranslateFunctions.TranslateSVGTextElement(lines, this.cells[y][x].svgText, tableName + ".cell(" + (y + 1) + "," + (x + 1) + ").Shape.TextFrame.TextRange");
                    lines.push([tableName + ".cell(" + (y + 1) + "," + (x + 1) + ").Shape.Fill.ForeColor.RGB = RGB(CInt(" + color.r + "), CInt(" + color.g + "), CInt(" + color.b + "))"]);
                }
            }
            for (var y = 0; y < this.rowCount; y++) {
                for (var x = 0; x < this.columnCount; x++) {
                    var cell = this.cells[y][x];
                    var vAnchor = GraphTableSVG.VBATranslateFunctions.ToVerticalAnchor(cell.verticalAnchor == null ? "" : cell.verticalAnchor);
                    var hAnchor = GraphTableSVG.VBATranslateFunctions.ToHorizontalAnchor(cell.horizontalAnchor == null ? "" : cell.horizontalAnchor);
                    lines.push([" Call EditCellTextFrame(" + tableName + ".cell(" + (y + 1) + "," + (x + 1) + ").Shape.TextFrame, " + cell.paddingTop + ", " + cell.paddingBottom + ", " + cell.paddingLeft + ", " + cell.paddingRight + ", " + vAnchor + ", " + hAnchor + ")"]);
                }
            }
            for (var y = 0; y < this.rowCount; y++) {
                for (var x = 0; x < this.columnCount; x++) {
                    var cell = this.cells[y][x];
                    var upLineStyle = GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.topBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                    var upLineStrokeWidth = cell.topBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.topBorder.style.strokeWidth) : "";
                    var upLineVisibility = cell.topBorder.style.visibility != null ? GraphTableSVG.visible(cell.topBorder.style.visibility) : "";
                    lines.push([" Call EditCellBorder(" + tableName + ".cell(" + (y + 1) + "," + (x + 1) + ").Borders(ppBorderTop), " + upLineStyle + ", " + upLineStrokeWidth + ", " + upLineVisibility + ")"]);
                    var leftLineStyle = GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.leftBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                    var leftLineStrokeWidth = cell.leftBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.leftBorder.style.strokeWidth) : "";
                    var leftLineVisibility = cell.leftBorder.style.visibility != null ? GraphTableSVG.visible(cell.leftBorder.style.visibility) : "";
                    lines.push([" Call EditCellBorder(" + tableName + ".cell(" + (y + 1) + "," + (x + 1) + ").Borders(ppBorderLeft), " + leftLineStyle + ", " + leftLineStrokeWidth + ", " + leftLineVisibility + ")"]);
                    if (x + 1 == this.columnCount) {
                        var rightLineStyle = GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.rightBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                        var rightLineStrokeWidth = cell.rightBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.rightBorder.style.strokeWidth) : "";
                        var rightLineVisibility = cell.rightBorder.style.visibility != null ? GraphTableSVG.visible(cell.rightBorder.style.visibility) : "";
                        lines.push([" Call EditCellBorder(" + tableName + ".cell(" + (y + 1) + "," + (x + 1) + ").Borders(ppBorderRight), " + rightLineStyle + ", " + rightLineStrokeWidth + ", " + rightLineVisibility + ")"]);
                    }
                    if (y + 1 == this.rowCount) {
                        var bottomLineStyle = GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.bottomBorder.getPropertyStyleValueWithDefault("stroke", "gray"));
                        var bottomLineStrokeWidth = cell.bottomBorder.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.bottomBorder.style.strokeWidth) : "";
                        var bottomLineVisibility = cell.bottomBorder.style.visibility != null ? GraphTableSVG.visible(cell.bottomBorder.style.visibility) : "";
                        lines.push([" Call EditCellBorder(" + tableName + ".cell(" + (y + 1) + "," + (x + 1) + ").Borders(ppBorderBottom), " + bottomLineStyle + ", " + bottomLineStrokeWidth + ", " + bottomLineVisibility + ")"]);
                    }
                }
            }
            this.cellArray.forEach(function (v) {
                if (v.isMaster) {
                    var cells = v.cellsInGroup;
                    for (var y = 0; y < cells.length; y++) {
                        for (var x = 1; x < cells[y].length; x++) {
                            lines.push([" " + tableName + ".Cell(" + (cells[y][0].cellY + 1) + ", " + (cells[y][0].cellX + 1) + ").Merge MergeTo := " + tableName + ".Cell(" + (cells[y][x].cellY + 1) + ", " + (cells[y][x].cellX + 1) + ")"]);
                        }
                    }
                    for (var y = 1; y < cells.length; y++) {
                        lines.push([" " + tableName + ".Cell(" + (cells[0][0].cellY + 1) + ", " + (cells[0][0].cellX + 1) + ").Merge MergeTo := " + tableName + ".Cell(" + (cells[y][0].cellY + 1) + ", " + (cells[y][0].cellX + 1) + ")"]);
                    }
                }
            });
            var x0 = GraphTableSVG.VBATranslateFunctions.joinLines(fstLines);
            var _a = GraphTableSVG.VBATranslateFunctions.splitCode(lines, tableName + " as Table", "" + tableName, id), x1 = _a[0], y1 = _a[1];
            return [GraphTableSVG.VBATranslateFunctions.joinLines([x0, x1]), y1];
        };
        Table.prototype.toPlainText = function () {
            var plainTable = this.cells.map(function (v) { return v.map(function (w) { return w.toPlainText(); }); });
            var widtharr = new Array(this.columnCount);
            for (var x = 0; x < this.columnCount; x++) {
                widtharr[x] = 0;
            }
            for (var y = 0; y < this.rowCount; y++) {
                for (var x = 0; x < this.columnCount; x++) {
                    var width = plainTable[y][x].length;
                    if (widtharr[x] < width)
                        widtharr[x] = width;
                }
            }
            for (var y = 0; y < this.rowCount; y++) {
                for (var x = 0; x < this.columnCount; x++) {
                    plainTable[y][x] = GraphTableSVG.Common.paddingLeft(plainTable[y][x], widtharr[x], " ");
                }
            }
            return plainTable.map(function (v) { return v.join(","); }).join("\n");
        };
        Table.prototype.getEmphasizedCells = function () {
            return this.cellArray.filter(function (v) { return v.isEmphasized; });
        };
        Table.prototype.update = function () {
            this._isDrawing = true;
            this.renumbering();
            this.resize();
            this.relocation();
            this._isDrawing = false;
        };
        Table.prototype.renumbering = function () {
            this.rows.forEach(function (v, i) { return v.cellY = i; });
            this.columns.forEach(function (v, i) { return v.cellX = i; });
            this.cellArray.forEach(function (v) { return v.updateBorderAttributes(); });
        };
        Table.prototype.resize = function () {
            this.rows.forEach(function (v) { return v.resize(); });
            this.columns.forEach(function (v) { return v.resize(); });
        };
        Table.prototype.relocation = function () {
            var height = 0;
            this.rows.forEach(function (x, i, arr) {
                x.setY(height);
                height += x.height;
            });
            var width = 0;
            this.columns.forEach(function (x, i, arr) {
                x.setX(width);
                width += x.width;
            });
            this.rows.forEach(function (v) { return v.relocation(); });
        };
        Table.prototype.createCell = function () {
            return new GraphTableSVG.Cell(this, 0, 0, this.defaultCellClass, this.defaultBorderClass);
        };
        Table.prototype.removeTable = function (svg) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        };
        Table.prototype.setSize = function (columnCount, rowCount) {
            this.clear();
            while (this.rowCount < rowCount) {
                this.insertRowFunction(this.rowCount, columnCount);
            }
            while (this.columnCount < columnCount) {
                this.insertColumn(this.columnCount);
            }
        };
        Table.prototype.clear = function () {
            if (this.columnCount != this.columns.length)
                throw Error("clear error");
            while (this.rowCount > 1) {
                this.rows[this.rows.length - 1].remove(true);
            }
            while (this.columnCount > 0) {
                this.columns[this.columns.length - 1].remove(true);
            }
            if (this.columnCount != this.columns.length)
                throw Error("clear error2");
        };
        Table.prototype.insertRow = function (i) {
            this.insertRowFunction(i, this.columnCount == 0 ? 1 : this.columnCount);
        };
        Table.prototype.insertColumn = function (i) {
            var _this = this;
            if (this.rowCount > 0) {
                for (var y = 0; y < this.rowCount; y++) {
                    var cell = this.createCell();
                    this.cells[y].splice(i, 0, cell);
                }
                this._columns.splice(i, 0, new GraphTableSVG.Column(this, i));
                if (i > 0 && i != this.columnCount - 1) {
                    this.columns[i].cells.forEach(function (v, j) {
                        _this.cells[j][i - 1].rightBorder = v.leftBorder;
                    });
                }
            }
            else {
                this.insertRow(0);
            }
            this.update();
        };
        Table.prototype.insertRowFunction = function (i, columnCount) {
            if (columnCount === void 0) { columnCount = this.columnCount; }
            var cell = [];
            for (var x = 0; x < columnCount; x++) {
                cell[x] = this.createCell();
                if (this._columns.length <= x)
                    this._columns.push(new GraphTableSVG.Column(this, 0));
            }
            this.cells.splice(i, 0, cell);
            this._rows.splice(i, 0, new GraphTableSVG.Row(this, i));
            if (i > 0 && i < this.rowCount - 1) {
                for (var x = 0; x < columnCount; x++) {
                    this.cells[i - 1][x].bottomBorder = this.cells[i][x].topBorder;
                }
            }
            this.update();
        };
        Table.prototype.appendColumn = function () {
            this.insertColumn(this.columnCount);
        };
        Table.prototype.appendRow = function () {
            this.insertRow(this.rowCount);
        };
        Table.defaultCellClass = "--default-cell-class";
        Table.defaultBorderClass = "--default-border-class";
        return Table;
    }());
    GraphTableSVG.Table = Table;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var SVGToVBA = (function () {
        function SVGToVBA() {
        }
        SVGToVBA.create = function (items) {
            if (items instanceof Array) {
                var count = GraphTableSVG.SVGToVBA.count(items);
                var s_1 = new Array(0);
                s_1.push("Sub create()");
                s_1.push(" Dim createdSlide As slide");
                s_1.push(" Set createdSlide = ActivePresentation.Slides.Add(1, ppLayoutBlank)");
                for (var i = 0; i < count; i++) {
                    s_1.push("Call create" + i + "(createdSlide)");
                }
                s_1.push("MsgBox \"created\"");
                s_1.push("End Sub");
                var id = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item instanceof GraphTableSVG.Table) {
                        var lines = item.createVBACode(id++, "createdSlide");
                        lines.forEach(function (v) { return s_1.push(v); });
                        id++;
                    }
                    else if (item instanceof SVGPathElement) {
                        var lines = SVGToVBA.createVBACodeOfSVGPath(item, id++);
                        lines.forEach(function (v) { return s_1.push(v); });
                        id++;
                    }
                    else if (item instanceof SVGTextElement) {
                        var lines = SVGToVBA.createVBACodeOfTextElement(item, id++);
                        lines.forEach(function (v) { return s_1.push(v); });
                        id++;
                    }
                    else if (item instanceof GraphTableSVG.GGraph) {
                        var lines = item.createVBACode(id);
                        lines.forEach(function (v) { return s_1.push(v); });
                        id += item.VBAObjectNum;
                    }
                    else if (item instanceof GraphTableSVG.GObject) {
                        var lines = item.createVBACode(id);
                        lines.forEach(function (v) { return s_1.push(v); });
                        id += item.VBAObjectNum;
                    }
                }
                s_1.push(SVGToVBA.cellFunctionCode);
                var r = VBATranslateFunctions.joinLines(s_1);
                return r;
            }
            else {
                return SVGToVBA.create([items]);
            }
        };
        SVGToVBA.count = function (items) {
            if (items instanceof Array) {
                var c = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item instanceof GraphTableSVG.Table) {
                        c++;
                    }
                    else if (item instanceof SVGPathElement) {
                        c++;
                    }
                    else if (item instanceof SVGTextElement) {
                        c++;
                    }
                    else if (item instanceof GraphTableSVG.GGraph) {
                        c += item.VBAObjectNum;
                    }
                    else if (item instanceof GraphTableSVG.GObject) {
                        c += item.VBAObjectNum;
                    }
                }
                return c;
            }
            else {
                return SVGToVBA.count([items]);
            }
        };
        SVGToVBA.createVBACodeOfSVGPath = function (path, id) {
            var lines = new Array(0);
            var pos = path.getPathLocations();
            lines.push("Sub create" + id + "(createdSlide As slide)");
            lines.push(" Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes");
            lines.push(" Dim edges" + id + "(" + (pos.length - 1) + ") As Shape");
            for (var i = 0; i < pos.length - 1; i++) {
                lines.push(" Set edges" + id + "(" + i + ") = shapes_.AddConnector(msoConnectorStraight, " + pos[i][0] + ", " + pos[i][1] + ", " + pos[i + 1][0] + ", " + pos[i + 1][1] + ")");
                var lineColor = VBATranslateFunctions.colorToVBA(path.getPropertyStyleValueWithDefault("stroke", "gray"));
                var strokeWidth = parseInt(path.getPropertyStyleValueWithDefault("stroke-width", "4"));
                var visible_1 = path.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                lines.push(" Call EditLine(edges" + id + "(" + i + ").Line, " + lineColor + ", msoLineSolid, " + 0 + ", " + strokeWidth + ", " + visible_1 + ")");
            }
            lines.push("End Sub");
            return lines;
        };
        SVGToVBA.createVBACodeOfTextElement = function (element, id) {
            var lines = new Array(0);
            var sub = [];
            lines.push("Sub create" + id + "(createdSlide As slide)");
            lines.push(" Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes");
            lines.push(" Dim txt As Shape");
            lines.push(" Set txt = shapes_.AddTextbox(msoTextOrientationHorizontal, " + element.getX() + ", " + element.getY() + ", 0, 0)");
            var fontSize = parseInt(element.getPropertyStyleValueWithDefault("font-size", "24"));
            var fontFamily = VBATranslateFunctions.ToVBAFont(element.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
            var fontBold = VBATranslateFunctions.ToFontBold(element.getPropertyStyleValueWithDefault("font-weight", "none"));
            lines.push([" Call EditTextFrame(txt.TextFrame, " + 0 + ", " + 0 + ", " + 0 + ", " + 0 + ", false, ppAutoSizeShapeToFitText)"]);
            VBATranslateFunctions.TranslateSVGTextElement(sub, element, "txt.TextFrame.TextRange");
            sub.forEach(function (v) { return lines.push(v[0]); });
            lines.push([" Call EditTextEffect(txt.TextEffect, " + fontSize + ", \"" + fontFamily + "\")"]);
            lines.push("End Sub");
            return lines;
        };
        SVGToVBA.cellFunctionCode = "\nSub EditTable(table_ As table, cellInfo_() As Variant)\n    Dim x As Integer\n    Dim y As Integer\n    \n    For x = 1 To UBound(cellInfo_, 1)\n        For y = 1 To UBound(cellInfo_, 2)\n         Call EditCell(table_.cell(x, y), CStr(cellInfo_(x, y)(0)))\n        Next\n    Next\nEnd Sub\n\nSub EditCell(cell_ As cell, text_ As String, backColor As Variant)\n    cell_.Shape.TextFrame.TextRange.text = text_\n    cell_.Shape.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))\nEnd Sub\nSub EditCellFont(frame_ As TextFrame, fontSize As Double, fontName As String, color As Variant, fontBold As Integer)\n    frame_.TextRange.Font.Size = fontSize\n    frame_.TextRange.Font.name = fontName\n    frame_.TextRange.Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))\n    frame_.TextRange.Font.Bold = fontBold\nEnd Sub\n\n\n\n\nSub EditRow(row_ As Row, height As Integer)\n    row_.height = height\nEnd Sub\nSub EditColumn(column_ As Column, width As Integer)\n    column_.width = width\nEnd Sub\n\nSub EditCellTextFrame(frame_ As TextFrame, marginTop As Double, marginBottom As Double, marginLeft As Double, marginRight As Double, vAnchor As Integer, hAnchor As Integer)\n    frame_.marginLeft = marginLeft\n    frame_.marginRight = marginRight\n    frame_.marginTop = marginTop\n    frame_.marginBottom = marginBottom\n    frame_.VerticalAnchor = vAnchor\n    frame_.TextRange.ParagraphFormat.Alignment = hAnchor\nEnd Sub\n\nSub EditTextRange(range_ As TextRange, text As String)\n    range_.text = text\nEnd Sub\nSub EditTextRangeSub(range_ As TextRange, subBeg As Integer, subLen As Integer, script As String, color As Variant, fontName As String, fontSize As Double, fontBold As Integer)\n    range_.Characters(subBeg, subLen).Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))\n    range_.Characters(subBeg, subLen).Font.Size = fontSize\n    range_.Characters(subBeg, subLen).Font.name = fontName\n    range_.Characters(subBeg, subLen).Font.Bold = fontBold\n    If script = \"subscript\" Then\n    range_.Characters(subBeg, subLen).Font.Subscript = True\n    End If\n    If script = \"superscript\" Then\n    range_.Characters(subBeg, subLen).Font.Superscript = True\n    End If\nEnd Sub\n\n\n\nSub EditShape(shape_ As Shape, name As String, visible As Integer, backColor As Variant)\n    shape_.name = name\n    shape_.Fill.visible = visible\n    shape_.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))\nEnd Sub\nSub EditCellBorder(line_ As LineFormat, foreColor As Variant, weight As Integer, transparent As Double)\n    line_.foreColor.RGB = RGB(CInt(foreColor(0)), CInt(foreColor(1)), CInt(foreColor(2)))\n    line_.weight = weight\n    line_.Transparency = transparent\nEnd Sub\n\nSub EditConnector(connector_ As ConnectorFormat, begShape As Shape, endShape As Shape, begPos As Integer, endPos As Integer)\n    Call connector_.BeginConnect(begShape, begPos)\n    Call connector_.EndConnect(endShape, endPos)\nEnd Sub\n\nSub EditTextFrame(frame_ As TextFrame, marginTop As Double, marginBottom As Double, marginLeft As Double, marginRight As Double, wordWrap As Boolean, autoSize As Integer)\n    frame_.autoSize = autoSize\n    frame_.wordWrap = wordWrap\n    frame_.marginLeft = marginLeft\n    frame_.marginRight = marginRight\n    frame_.marginTop = marginTop\n    frame_.marginBottom = marginBottom\nEnd Sub\nSub EditAnchor(frame_ As TextFrame, vAnchor As Integer, hAnchor As Integer)\n    frame_.VerticalAnchor = vAnchor\n    frame_.TextRange.ParagraphFormat.Alignment = hAnchor\nEnd Sub\n\nSub EditTextEffect(effect_ As TextEffectFormat, fontSize As Double, fontName As String)\n effect_.fontSize = fontSize\n effect_.fontName = fontName\nEnd Sub\n\nSub EditVertexShape(shape_ As Shape, name As String, visible As Integer, backColor As Variant)\n    shape_.name = name\n    shape_.Fill.visible = visible\n    shape_.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))\nEnd Sub\n\nSub EditLine(line_ As LineFormat, foreColor As Variant, dashStyle As Integer, transparent As Double, weight As Integer, visible As Integer)\n    line_.foreColor.RGB = RGB(CInt(foreColor(0)), CInt(foreColor(1)), CInt(foreColor(2)))\n    line_.dashStyle = dashStyle\n    line_.Transparency = transparent\n    line_.weight = weight\n    line_.visible = visible\nEnd Sub\n\nSub EditCallOut(shape_ As Shape, name As String, visible As Integer, backColor As Variant)\n    shape_.name = name\n    shape_.Fill.visible = visible\n    shape_.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))\nEnd Sub\n\n";
        return SVGToVBA;
    }());
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
    var VBATranslateFunctions = (function () {
        function VBATranslateFunctions() {
        }
        VBATranslateFunctions.grouping80 = function (codes) {
            var r = [];
            var result = [];
            codes.forEach(function (x, i, arr) {
                if (r.length + x.length >= 80) {
                    result.push(VBATranslateFunctions.joinLines(r));
                    r = [];
                }
                x.forEach(function (v) { return r.push(v); });
            });
            if (r.length > 0) {
                result.push(VBATranslateFunctions.joinLines(r));
                r = [];
            }
            return result;
        };
        VBATranslateFunctions.splitCode = function (codes, subArg, callArg, id) {
            var functions = [];
            var p = VBATranslateFunctions.grouping80(codes);
            p.forEach(function (x, i, arr) {
                functions.push("Call SubFunction" + id + "_" + i + "(" + callArg + ")");
                var begin = "Sub SubFunction" + id + "_" + i + "(" + subArg + ")";
                var end = "End Sub";
                p[i] = VBATranslateFunctions.joinLines([begin, x, end]);
            });
            return [VBATranslateFunctions.joinLines(functions), VBATranslateFunctions.joinLines(p)];
        };
        VBATranslateFunctions.ToFontBold = function (bold) {
            if (bold == "bold") {
                return "msotrue";
            }
            else {
                return "msofalse";
            }
        };
        VBATranslateFunctions.ToVerticalAnchor = function (value) {
            switch (value) {
                case "top": return "msoAnchorTop";
                case "middle": return "msoAnchorMiddle";
                case "bottom": return "msoAnchorBottom";
                default: return "msoAnchorTop";
            }
        };
        VBATranslateFunctions.ToHorizontalAnchor = function (value) {
            switch (value) {
                case "left": return "ppAlignLeft";
                case "center": return "ppAlignCenter";
                case "right": return "ppAlignRight";
                default: return "ppAlignLeft";
            }
        };
        VBATranslateFunctions.createStringFunction = function (item) {
            return item.length == 0 ? "\"\"" : "\"" + item + "\"";
        };
        VBATranslateFunctions.createArrayFunction = function (items) {
            var s = "";
            for (var i = 0; i < items.length; i++) {
                s += items[i];
                if (i + 1 != items.length) {
                    s += ", ";
                }
            }
            return "Array(" + s + ")";
        };
        VBATranslateFunctions.createStringArrayFunction = function (items) {
            var s = "";
            for (var i = 0; i < items.length; i++) {
                s += "\"" + items[i] + "\"";
                if (i + 1 != items.length) {
                    s += ", ";
                }
            }
            return "Array(" + s + ")";
        };
        VBATranslateFunctions.createJagArrayFunction = function (items) {
            var s = "";
            for (var i = 0; i < items.length; i++) {
                s += VBATranslateFunctions.createArrayFunction(items[i]);
                if (i + 1 != items.length)
                    s += ", ";
            }
            return "Array(" + s + ")";
        };
        VBATranslateFunctions.joinLines = function (lines) {
            var s = "";
            for (var i = 0; i < lines.length; i++) {
                s += lines[i];
                if (i + 1 != lines.length)
                    s += "\n";
            }
            return s;
        };
        VBATranslateFunctions.colorToVBA = function (color) {
            color = GraphTableSVG.Color.createRGBCodeFromColorName(color);
            if (color.indexOf("rgb") != -1) {
                return color.replace("rgb", "Array");
            }
            else {
                return "Array(0, 0, 0)";
            }
        };
        VBATranslateFunctions.ToVBAFont = function (font) {
            font = font.replace(/"/g, "");
            font = font.replace(/'/g, "");
            return font;
        };
        VBATranslateFunctions.TranslateSVGTextElement = function (sub, item, range) {
            var text = item.textContent == null ? "" : item.textContent;
            sub.push([range + ".text = \"" + item.textContent + "\""]);
            if (item.children.length > 0) {
                var pos = 1;
                for (var i = 0; i < item.children.length; i++) {
                    var child = item.children.item(i);
                    if (child.textContent != null && child.textContent.length > 0) {
                        var css = getComputedStyle(child);
                        var childColor = GraphTableSVG.Color.createRGBFromColorName(css.fill == null ? "black" : css.fill);
                        var fontName = this.getFont(css);
                        var fontSize = GraphTableSVG.Common.toPX(css.fontSize == null ? "14pt" : css.fontSize);
                        var fontBold = Number(css.fontWeight) == 400 ? 0 : 1;
                        var len = child.textContent.length;
                        var f = child.getAttribute("data-script");
                        if (f == null) {
                            f = "";
                        }
                        sub.push(["Call EditTextRangeSub(" + range + "," + pos + ", " + len + ", \"" + f + "\", Array(" + childColor.r + ", " + childColor.g + ", " + childColor.b + "), \"" + fontName + "\", " + fontSize + ", " + fontBold + " )"]);
                        pos += len;
                    }
                }
            }
            else if (item.textContent != null && item.textContent.length > 0) {
                var css = getComputedStyle(item);
                if (css.fontSize == null)
                    throw Error("error");
                if (css.fill == null)
                    throw Error("error");
                var color = GraphTableSVG.Color.createRGBFromColorName(css.fill);
                var fontName = this.getFont(css);
                var fontSize = GraphTableSVG.Common.toPX(css.fontSize);
                var fontBold = Number(css.fontWeight) == 400 ? 0 : 1;
                sub.push(["Call EditTextRangeSub(" + range + "," + 1 + ", " + item.textContent.length + ", \"\", Array(" + color.r + ", " + color.g + ", " + color.b + "), \"" + fontName + "\", " + fontSize + ", " + fontBold + " )"]);
            }
        };
        VBATranslateFunctions.getFont = function (css) {
            if (css.fontFamily == null)
                throw Error("error");
            var arr = css.fontFamily.split(",");
            if (arr.length > 0) {
                var name_2 = arr[0];
                name_2 = name_2.replace(/\"/g, "");
                name_2 = name_2.replace(/\'/g, "");
                return name_2;
            }
            else {
                return "";
            }
        };
        VBATranslateFunctions.TranslateSVGTextElement2 = function (item, range) {
            var lines = [];
            var text = item.textContent == null ? "" : item.textContent;
            lines.push(range + ".text = \"" + item.textContent + "\"");
            if (item.children.length > 0) {
                var pos = 1;
                for (var i = 0; i < item.children.length; i++) {
                    var child = item.children.item(i);
                    if (child.textContent != null && child.textContent.length > 0) {
                        var css = getComputedStyle(child);
                        if (css.fontSize == null)
                            throw Error("error");
                        if (css.fill == null)
                            throw Error("error");
                        var childColor = GraphTableSVG.Color.createRGBFromColorName(css.fill);
                        var fontName = this.getFont(css);
                        var fontSize = GraphTableSVG.Common.toPX(css.fontSize);
                        var fontBold = Number(css.fontWeight) == 400 ? 0 : 1;
                        var len = child.textContent.length;
                        var f = child.getAttribute("data-script");
                        if (f == null) {
                            f = "";
                        }
                        lines.push("Call EditTextRangeSub(" + range + "," + pos + ", " + len + ", \"" + f + "\", Array(" + childColor.r + ", " + childColor.g + ", " + childColor.b + "), \"" + fontName + "\", " + fontSize + ", " + fontBold + " )");
                        pos += len;
                    }
                }
            }
            else if (item.textContent != null && item.textContent.length > 0) {
                var css = getComputedStyle(item);
                if (css.fontSize == null)
                    throw Error("error");
                if (css.fill == null)
                    throw Error("error");
                var color = GraphTableSVG.Color.createRGBFromColorName(css.fill);
                var fontName = this.getFont(css);
                var fontSize = GraphTableSVG.Common.toPX(css.fontSize);
                var fontBold = Number(css.fontWeight) == 400 ? 0 : 1;
                lines.push("Call EditTextRangeSub(" + range + "," + 1 + ", " + item.textContent.length + ", \"\", Array(" + color.r + ", " + color.g + ", " + color.b + "), \"" + fontName + "\", " + fontSize + ", " + fontBold + " )");
            }
            return lines;
        };
        return VBATranslateFunctions;
    }());
    GraphTableSVG.VBATranslateFunctions = VBATranslateFunctions;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var Common;
    (function (Common) {
        function clearGraphTables(svg, items) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item instanceof GraphTableSVG.GGraph) {
                    item.removeGraph(svg);
                }
                else if (item instanceof GraphTableSVG.Table) {
                    item.removeTable(svg);
                }
            }
        }
        Common.clearGraphTables = clearGraphTables;
        function IsDescendantOfBody(node) {
            var parent = node.parentNode;
            if (parent == null) {
                return false;
            }
            else if (parent == document.body) {
                return true;
            }
            else {
                return Common.IsDescendantOfBody(parent);
            }
        }
        Common.IsDescendantOfBody = IsDescendantOfBody;
        function getRegion(items) {
            var rects = items.map(function (v) {
                if (v instanceof GraphTableSVG.GGraph) {
                    return v.getRegion();
                }
                else if (v instanceof GraphTableSVG.Table) {
                    return v.getRegion();
                }
                else if (v instanceof SVGPathElement || v instanceof SVGTextElement) {
                    var rect = v.getBBox();
                    return new GraphTableSVG.Rectangle(rect.x, rect.y, rect.width, rect.height);
                }
                else {
                    return new GraphTableSVG.Rectangle();
                }
            });
            if (rects.length > 0) {
                return GraphTableSVG.Rectangle.merge(rects);
            }
            else {
                return new GraphTableSVG.Rectangle();
            }
        }
        Common.getRegion = getRegion;
        function paddingLeft(text, length, leftChar) {
            while (text.length < length) {
                text = leftChar + text;
            }
            return text;
        }
        Common.paddingLeft = paddingLeft;
        var CSSName = "___GraphTableCSS";
        function setGraphTableCSS(cellColor, borderColor) {
            var item = document.head.getElementsByClassName(CSSName);
            if (item.length > 0) {
                document.head.removeChild(item[0]);
            }
            var blankStyle = document.createElement('style');
            blankStyle.innerHTML = "\n            ." + GraphTableSVG.Cell.emphasisCellClass + "{\n            fill : " + cellColor + " !important;\n            }\n            ." + GraphTableSVG.Cell.emphasisBorderClass + "{\n            stroke : " + borderColor + " !important;\n            }\n\n            ";
            blankStyle.type = "text/css";
            blankStyle.setAttribute("class", CSSName);
            var head = document.getElementsByTagName('head');
            head.item(0).appendChild(blankStyle);
        }
        Common.setGraphTableCSS = setGraphTableCSS;
        function getGraphTableCSS() {
            var item = document.getElementById(CSSName);
            return item;
        }
        Common.getGraphTableCSS = getGraphTableCSS;
        function parseUnit(text) {
            var str1 = "", str2 = "";
            for (var i = 0; i < text.length; i++) {
                if (isNaN(text[i])) {
                    str2 += text[i];
                }
                else {
                    str1 += text[i];
                }
            }
            return [Number(str1), str2];
        }
        Common.parseUnit = parseUnit;
        function toPX(value) {
            var _a = parseUnit(value), val = _a[0], unit = _a[1];
            if (unit == "px") {
                return val;
            }
            else if (unit == "em") {
                return val * 16;
            }
            else {
                return val;
            }
        }
        Common.toPX = toPX;
        function bezierLocation(_a, _b, _c, t) {
            var px1 = _a[0], py1 = _a[1];
            var px2 = _b[0], py2 = _b[1];
            var px3 = _c[0], py3 = _c[1];
            var x = px1 * (1 - t) * (1 - t) + 2 * px2 * t * (1 - t) + px3 * t * t;
            var y = py1 * (1 - t) * (1 - t) + 2 * py2 * t * (1 - t) + py3 * t * t;
            return [x, y];
        }
        Common.bezierLocation = bezierLocation;
    })(Common = GraphTableSVG.Common || (GraphTableSVG.Common = {}));
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var PNG;
    (function (PNG) {
        function copyCSStoStyle(svg) {
            var widthAttr = svg.getAttribute("width");
            var heightAttr = svg.getAttribute("height");
            if (widthAttr != null) {
                svg.style.width = widthAttr;
            }
            if (heightAttr != null) {
                svg.style.height = heightAttr;
            }
            GraphTableSVG.SVG.setCSSToAllElementStyles(svg);
        }
        PNG.copyCSStoStyle = copyCSStoStyle;
        function createCanvasFromImage(img) {
            var canvas = document.createElement("canvas");
            if (img.style.width != null && img.style.height != null) {
                canvas.setAttribute("width", img.style.width);
                canvas.setAttribute("height", img.style.height);
            }
            return canvas;
        }
        PNG.createCanvasFromImage = createCanvasFromImage;
        function setSaveEvent(img, canvas) {
            img.onload = function () {
                var ctx = canvas.getContext("2d");
                if (ctx == null)
                    throw Error("Error");
                ctx.drawImage(img, 0, 0);
                saveCanvas("png", canvas);
            };
        }
        PNG.setSaveEvent = setSaveEvent;
        function createPNGFromSVG(id) {
            var userAgent = window.navigator.userAgent;
            if (userAgent.indexOf("Firefox") != -1) {
                alert("Firefox is not supported!");
                throw Error("not supported error");
            }
            var svgBox = document.getElementById(id);
            if (svgBox == null)
                throw Error("Error");
            var styleMap = GraphTableSVG.SVG.getAllElementStyleMap(svgBox);
            copyCSStoStyle(svgBox);
            var img = getImage(svgBox);
            var canvas = createCanvasFromImage(img);
            setSaveEvent(img, canvas);
            GraphTableSVG.SVG.setAllElementStyleMap(svgBox, styleMap);
            return canvas;
        }
        PNG.createPNGFromSVG = createPNGFromSVG;
        function getImage(svgBox) {
            var img = document.createElement("img");
            if (window.btoa) {
                img.style.width = svgBox.style.width;
                img.style.height = svgBox.style.height;
                img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgBox.outerHTML)));
            }
            else {
                throw Error("Error");
            }
            return img;
        }
        PNG.getImage = getImage;
        function saveCanvas(saveType, canvas) {
            var imageType = "image/png";
            var fileName = "sample.png";
            if (saveType === "jpeg") {
                imageType = "image/jpeg";
                fileName = "sample.jpg";
            }
            var base64 = canvas.toDataURL(imageType);
            var blob = base64toBlob(base64);
            saveBlob(blob, fileName);
        }
        function base64toBlob(base64) {
            var tmp = base64.split(',');
            var data = atob(tmp[1]);
            var mime = tmp[0].split(':')[1].split(';')[0];
            var buf = new Uint8Array(data.length);
            for (var i = 0; i < data.length; i++) {
                buf[i] = data.charCodeAt(i);
            }
            var blob = new Blob([buf], { type: mime });
            return blob;
        }
        function saveBlob(blob, fileName) {
            var url = (window.URL || window.webkitURL);
            var dataUrl = url.createObjectURL(blob);
            var event = document.createEvent("MouseEvents");
            event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
            a.href = dataUrl;
            a.download = fileName;
            a.dispatchEvent(event);
        }
    })(PNG = GraphTableSVG.PNG || (GraphTableSVG.PNG = {}));
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GObject = (function () {
        function GObject(svgbox, option) {
            if (option === void 0) { option = {}; }
            this._surface = null;
            var parentElement = svgbox instanceof SVGElement ? svgbox : document.getElementById(svgbox);
            this._svgGroup = GraphTableSVG.SVG.createGroup(parentElement, option.class == undefined ? null : option.class);
            this.setClassNameOfSVGGroup();
            GObject.setObjectFromObjectID(this);
            this.svgGroup.setAttribute("data-group-type", this.type);
            this.createSurface(parentElement, option);
            var _option = this.updateOptionByCSS(option);
            if (typeof option.id !== "undefined")
                this.svgGroup.id = option.id;
            this.width = _option.width;
            this.height = _option.height;
            this.cx = _option.cx;
            this.cy = _option.cy;
            this.dispatchObjectCreatedEvent();
        }
        GObject.getObjectFromObjectID = function (id) {
            if (id instanceof SVGElement) {
                if (id.hasAttribute(GraphTableSVG.CustomAttributeNames.objectIDName)) {
                    var _id = id.getAttribute(GraphTableSVG.CustomAttributeNames.objectIDName);
                    return GObject.getObjectFromObjectID(_id);
                }
                else {
                    return null;
                }
            }
            else {
                if (id in this.objectDic) {
                    return this.objectDic[id];
                }
                else {
                    return null;
                }
            }
        };
        GObject.setObjectFromObjectID = function (obj) {
            var id = obj.objectID;
            this.objectDic[id] = obj;
        };
        GObject.getObjectFromID = function (id) {
            for (var key in this.objectDic) {
                if (this.objectDic[key].svgGroup.id == id) {
                    return this.objectDic[key];
                }
            }
            return null;
        };
        Object.defineProperty(GObject.prototype, "svgGroup", {
            get: function () {
                return this._svgGroup;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "isLocated", {
            get: function () {
                return GraphTableSVG.Common.IsDescendantOfBody(this.svgGroup);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "surface", {
            get: function () {
                return this._surface;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "cx", {
            get: function () {
                return this.svgGroup.getX();
            },
            set: function (value) {
                if (this.svgGroup.getX() != value) {
                    this.svgGroup.setX(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "cy", {
            get: function () {
                return this.svgGroup.getY();
            },
            set: function (value) {
                if (this.svgGroup.getY() != value) {
                    this.svgGroup.setY(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "width", {
            get: function () {
                return this.svgGroup.gtGetAttributeNumber("data-width", 0);
            },
            set: function (value) {
                if (this.width != value && value != null)
                    this.svgGroup.setAttribute("data-width", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "height", {
            get: function () {
                return this.svgGroup.gtGetAttributeNumber("data-height", 0);
            },
            set: function (value) {
                if (this.height != value && value != null)
                    this.svgGroup.setAttribute("data-height", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "x", {
            get: function () {
                return this.cx - (this.width / 2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "y", {
            get: function () {
                return this.cy - (this.height / 2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "type", {
            get: function () {
                return "PPTextBoxShapeBase";
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.createSurface = function (svgbox, option) {
            if (option === void 0) { option = {}; }
        };
        GObject.prototype.setClassNameOfSVGGroup = function () {
        };
        GObject.prototype.updateOptionByCSS = function (option) {
            var _option = __assign({}, option);
            if (this.surface != null && this.surface.className != null) {
                var width = this.surface.getPropertyStyleNumberValue(GraphTableSVG.CustomAttributeNames.Style.defaultWidthName, null);
                var height = this.surface.getPropertyStyleNumberValue(GraphTableSVG.CustomAttributeNames.Style.defaultHeightName, null);
                if (width != null)
                    _option.width = width;
                if (height != null)
                    _option.height = height;
            }
            if (typeof _option.width === "undefined")
                _option.width = 50;
            if (typeof _option.height === "undefined")
                _option.height = 50;
            if (typeof _option.cx === "undefined")
                _option.cx = 0;
            if (typeof _option.cy === "undefined")
                _option.cy = 0;
            return _option;
        };
        GObject.prototype.dispose = function () {
        };
        Object.defineProperty(GObject.prototype, "isDisposed", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "objectID", {
            get: function () {
                var r = this.svgGroup.getAttribute(GraphTableSVG.CustomAttributeNames.objectIDName);
                if (r == null) {
                    throw new Error();
                }
                else {
                    return r;
                }
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.createVBACode = function (id) {
            var lines = [];
            lines.push("Sub create" + id + "(createdSlide As slide)");
            lines.push("End Sub");
            return lines;
        };
        Object.defineProperty(GObject.prototype, "VBAObjectNum", {
            get: function () {
                return 1;
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.dispatchObjectCreatedEvent = function () {
            var event = document.createEvent("HTMLEvents");
            event.initEvent(GraphTableSVG.CustomAttributeNames.objectCreatedEventName, true, true);
            this.svgGroup.dispatchEvent(event);
        };
        GObject.objectDic = {};
        return GObject;
    }());
    GraphTableSVG.GObject = GObject;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GTextBox = (function (_super) {
        __extends(GTextBox, _super);
        function GTextBox(svgbox, option) {
            if (option === void 0) { option = {}; }
            var _this = _super.call(this, svgbox, option) || this;
            _this.observerFunc = function (x) {
                var b = false;
                if (!_this.isLocated)
                    return;
                var _loop_2 = function (i) {
                    var p = x[i];
                    if (_this.updateAttributes.some(function (v) { return v == p.attributeName; })) {
                        b = true;
                    }
                    if (p.attributeName == "transform") {
                        _this.dispatchConnectPositionChangedEvent();
                    }
                };
                for (var i = 0; i < x.length; i++) {
                    _loop_2(i);
                }
                if (b)
                    _this.update();
            };
            _this.updateAttributes = ["style", "transform", "data-speaker-x", "data-speaker-y",
                "data-width", "data-height", "data-arrow-neck-width", "data-arrow-neck-height",
                "data-arrow-head-width", "data-arrow-head-height"];
            _this.surfaceAttributes = [];
            _this.textObserverFunc = function (x) {
                if (!_this.isLocated)
                    return;
                var b = false;
                var _loop_3 = function (i) {
                    var p = x[i];
                    if (GTextBox.updateTextAttributes.some(function (v) { return v == p.attributeName; })) {
                        b = true;
                    }
                    if (p.attributeName == null) {
                        b = true;
                    }
                };
                for (var i = 0; i < x.length; i++) {
                    _loop_3(i);
                }
                if (b)
                    _this.update();
            };
            _this._isUpdating = false;
            _this._svgText = GraphTableSVG.SVG.createText(_this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.defaultTextClass));
            _this.svgGroup.appendChild(_this.svgText);
            _this._observer = new MutationObserver(_this.observerFunc);
            var option1 = { attributes: true, childList: true, subtree: true };
            _this._observer.observe(_this.svgGroup, option1);
            _this._textObserver = new MutationObserver(_this.textObserverFunc);
            var option2 = { childList: true, attributes: true, subtree: true };
            _this._textObserver.observe(_this.svgText, option2);
            if (typeof option.text !== "undefined")
                _this.svgText.setTextContent(option.text);
            if (typeof option.isAutoSizeShapeToFitText !== "undefined")
                _this.isAutoSizeShapeToFitText = option.isAutoSizeShapeToFitText;
            return _this;
        }
        GTextBox.constructAttributes = function (e, removeAttributes, output) {
            if (removeAttributes === void 0) { removeAttributes = false; }
            if (output === void 0) { output = {}; }
            if (e.hasAttribute("class"))
                output.class = e.getAttribute("class");
            output.cx = e.gtGetAttributeNumberWithoutNull("cx", 0);
            output.cy = e.gtGetAttributeNumberWithoutNull("cy", 0);
            if (e.hasAttribute("text"))
                output.text = e.getAttribute("text");
            output.width = e.gtGetAttributeNumber2("width");
            output.height = e.gtGetAttributeNumber2("height");
            output.isAutoSizeShapeToFitText = e.getPropertyStyleValueWithDefault(GraphTableSVG.CustomAttributeNames.Style.autoSizeShapeToFitTextName, "false") == "true";
            if (removeAttributes) {
                e.removeAttribute("cx");
                e.removeAttribute("cy");
                e.removeAttribute("class");
                e.removeAttribute("text");
                e.removeAttribute("width");
                e.removeAttribute("height");
                e.style.removeProperty(GraphTableSVG.CustomAttributeNames.Style.autoSizeShapeToFitTextName);
            }
            return output;
        };
        Object.defineProperty(GTextBox.prototype, "svgText", {
            get: function () {
                return this._svgText;
            },
            enumerable: true,
            configurable: true
        });
        GTextBox.prototype.dispatchConnectPositionChangedEvent = function () {
            if (this.surface != null) {
                var event = document.createEvent("HTMLEvents");
                event.initEvent(GraphTableSVG.CustomAttributeNames.connectPositionChangedEventName, true, true);
                this.surface.dispatchEvent(event);
            }
        };
        Object.defineProperty(GTextBox.prototype, "horizontalAnchor", {
            get: function () {
                var b = this.svgGroup.getPropertyStyleValueWithDefault(GraphTableSVG.HorizontalAnchorPropertyName, "center");
                return GraphTableSVG.HorizontalAnchor.toHorizontalAnchor(b);
            },
            set: function (value) {
                if (this.horizontalAnchor != value)
                    this.svgGroup.setPropertyStyleValue(GraphTableSVG.HorizontalAnchorPropertyName, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextBox.prototype, "verticalAnchor", {
            get: function () {
                var b = this.svgGroup.getPropertyStyleValueWithDefault(GraphTableSVG.VerticalAnchorPropertyName, "middle");
                return GraphTableSVG.VerticalAnchor.toVerticalAnchor(b);
            },
            set: function (value) {
                if (this.verticalAnchor != value)
                    this.svgGroup.setPropertyStyleValue(GraphTableSVG.VerticalAnchorPropertyName, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextBox.prototype, "isAutoSizeShapeToFitText", {
            get: function () {
                return this.svgGroup.getPropertyStyleValueWithDefault(GraphTableSVG.CustomAttributeNames.Style.autoSizeShapeToFitTextName, "false") == "true";
            },
            set: function (value) {
                this.svgGroup.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.autoSizeShapeToFitTextName, value ? "true" : "false");
            },
            enumerable: true,
            configurable: true
        });
        GTextBox.prototype.update = function () {
            this._isUpdating = true;
            if (this.isAutoSizeShapeToFitText)
                this.updateToFitText();
            this.updateSurface();
            this.svgText.gtSetXY(this.innerRectangle, this.verticalAnchor, this.horizontalAnchor, this.isAutoSizeShapeToFitText);
            this._isUpdating = false;
        };
        GTextBox.prototype.updateSurface = function () {
        };
        GTextBox.prototype.updateToFitText = function () {
            var box = this.svgText.getBBox();
            this.width = box.width + this.marginPaddingLeft + this.marginPaddingRight;
            this.height = box.height + this.marginPaddingTop + this.marginPaddingBottom;
        };
        Object.defineProperty(GTextBox.prototype, "marginPaddingTop", {
            get: function () {
                return this.svgText.getMarginTop() + this.svgGroup.getPaddingTop();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextBox.prototype, "marginPaddingLeft", {
            get: function () {
                return this.svgText.getMarginLeft() + this.svgGroup.getPaddingLeft();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextBox.prototype, "marginPaddingRight", {
            get: function () {
                return this.svgText.getMarginRight() + this.svgGroup.getPaddingRight();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextBox.prototype, "marginPaddingBottom", {
            get: function () {
                return this.svgText.getMarginBottom() + this.svgGroup.getPaddingBottom();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextBox.prototype, "innerRectangle", {
            get: function () {
                var rect = new GraphTableSVG.Rectangle();
                rect.width = 0;
                rect.height = 0;
                rect.x = 0;
                rect.y = 0;
                return rect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextBox.prototype, "svgElements", {
            get: function () {
                var r = [];
                r.push(this.svgGroup);
                r.push(this.svgText);
                return r;
            },
            enumerable: true,
            configurable: true
        });
        GTextBox.prototype.hasDescendant = function (obj) {
            var ids = this.svgElements.map(function (v) { return v.getAttribute(GraphTableSVG.CustomAttributeNames.objectIDName); }).filter(function (v) { return v != null; });
            var id = obj.getAttribute(GraphTableSVG.CustomAttributeNames.objectIDName);
            return ids.some(function (v) { return v == id; });
        };
        GTextBox.updateTextAttributes = ["style"];
        return GTextBox;
    }(GraphTableSVG.GObject));
    GraphTableSVG.GTextBox = GTextBox;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GVertex = (function (_super) {
        __extends(GVertex, _super);
        function GVertex() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GVertex.prototype.setClassNameOfSVGGroup = function () {
            var parent = this.svgGroup.parentElement;
            if (parent instanceof SVGElement) {
                var className = parent.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.defaultVertexClass);
                if (className != null && !this.svgGroup.hasAttribute("class")) {
                    this.svgGroup.setAttribute("class", className);
                }
            }
        };
        GVertex.prototype.getLocation = function (type, x, y) {
            return [this.cx, this.cy];
        };
        GVertex.prototype.getConnectorType = function (type, x, y) {
            if (type == GraphTableSVG.ConnectorPosition.Auto) {
                return this.getAutoPosition(x, y);
            }
            else {
                return type;
            }
        };
        GVertex.prototype.getAutoPosition = function (x, y) {
            return GraphTableSVG.ConnectorPosition.Top;
        };
        Object.defineProperty(GVertex.prototype, "outcomingEdges", {
            get: function () {
                var p = JSON.parse(this.svgGroup.gtGetAttribute("outcoming-edges", "[]"));
                var p2 = p.map(function (v) { return GraphTableSVG.GObject.getObjectFromObjectID(v.toString()); });
                return p2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GVertex.prototype, "incomingEdges", {
            get: function () {
                var p = JSON.parse(this.svgGroup.gtGetAttribute("incoming-edges", "[]"));
                var p2 = p.map(function (v) { return GraphTableSVG.GObject.getObjectFromObjectID(v.toString()); });
                return p2;
            },
            enumerable: true,
            configurable: true
        });
        GVertex.prototype.insertOutcomingEdge = function (edge, insertIndex) {
            if (insertIndex === void 0) { insertIndex = this.outcomingEdges.length; }
            var p = this.outcomingEdges.indexOf(edge);
            if (p != -1) {
                throw new Error();
            }
            else {
                var edges = this.outcomingEdges;
                edges.splice(insertIndex, 0, edge);
                var newEdges = JSON.stringify(edges.map(function (v) { return Number(v.objectID); }));
                this.svgGroup.setAttribute("outcoming-edges", newEdges);
                if (edge.beginVertex != this) {
                    edge.beginVertex = this;
                }
            }
        };
        GVertex.prototype.removeOutcomingEdge = function (edge) {
            var p = this.outcomingEdges.indexOf(edge);
            if (p != null) {
                var edges = this.outcomingEdges;
                edges.splice(p, 1);
                var newEdges = JSON.stringify(edges.map(function (v) { return Number(v.objectID); }));
                this.svgGroup.setAttribute("outcoming-edges", newEdges);
                if (edge.beginVertex == this) {
                    edge.beginVertex = null;
                }
            }
        };
        GVertex.prototype.insertIncomingEdge = function (edge, insertIndex) {
            if (insertIndex === void 0) { insertIndex = this.incomingEdges.length; }
            var p = this.incomingEdges.indexOf(edge);
            if (p != -1) {
                throw new Error();
            }
            else {
                var edges = this.incomingEdges;
                edges.splice(insertIndex, 0, edge);
                var newEdges = JSON.stringify(edges.map(function (v) { return Number(v.objectID); }));
                this.svgGroup.setAttribute("incoming-edges", newEdges);
                if (edge.endVertex != this) {
                    edge.endVertex = this;
                }
            }
        };
        GVertex.prototype.removeIncomingEdge = function (edge) {
            var p = this.incomingEdges.indexOf(edge);
            if (p != null) {
                var edges = this.incomingEdges;
                edges.splice(p, 1);
                var newEdges = JSON.stringify(edges.map(function (v) { return Number(v.objectID); }));
                this.svgGroup.setAttribute("incoming-edges", newEdges);
                if (edge.endVertex == this) {
                    edge.endVertex = null;
                }
            }
        };
        GVertex.prototype.dispose = function () {
            while (this.incomingEdges.length > 0) {
                this.removeIncomingEdge(this.incomingEdges[0]);
            }
            while (this.outcomingEdges.length > 0) {
                this.removeOutcomingEdge(this.outcomingEdges[0]);
            }
        };
        GVertex.prototype.getParents = function () {
            return this.incomingEdges.filter(function (v) { return v.beginVertex != null; }).map(function (v) { return v.beginVertex; });
        };
        Object.defineProperty(GVertex.prototype, "parentEdge", {
            get: function () {
                if (this.incomingEdges.length == 0) {
                    return null;
                }
                else {
                    return this.incomingEdges[0];
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GVertex.prototype, "parent", {
            get: function () {
                if (this.parentEdge == null) {
                    return null;
                }
                else {
                    return this.parentEdge.beginVertex;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GVertex.prototype, "isNoParent", {
            get: function () {
                return this.parent == null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GVertex.prototype, "children", {
            get: function () {
                return this.outcomingEdges.filter(function (v) { return v.endVertex != null; }).map(function (v) { return v.endVertex; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GVertex.prototype, "isLeaf", {
            get: function () {
                return this.outcomingEdges.length == 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GVertex.prototype, "tree", {
            get: function () {
                return new GraphTableSVG.GVirtualSubTree(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GVertex.prototype, "region", {
            get: function () {
                var p = new GraphTableSVG.Rectangle();
                p.x = this.cx - (this.width / 2);
                p.y = this.cy - (this.height / 2);
                p.width = this.width;
                p.height = this.height;
                return p;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GVertex.prototype, "shape", {
            get: function () {
                return "NONE";
            },
            enumerable: true,
            configurable: true
        });
        GVertex.prototype.createVBACode = function (id) {
            var lines = [];
            var backColor = GraphTableSVG.VBATranslateFunctions.colorToVBA(this.surface.getPropertyStyleValueWithDefault("fill", "gray"));
            var visible = this.surface.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
            var vAnchor = GraphTableSVG.VBATranslateFunctions.ToVerticalAnchor(this.verticalAnchor);
            var hAnchor = GraphTableSVG.VBATranslateFunctions.ToHorizontalAnchor(this.horizontalAnchor);
            lines.push("Sub create" + id + "(createdSlide As slide)");
            lines.push(" Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes");
            lines.push(" Dim obj As Shape");
            lines.push(" Set obj = shapes_.AddShape(" + this.shape + ", " + this.x + ", " + this.y + ", " + this.width + ", " + this.height + ")");
            lines.push(" Call EditTextFrame(obj.TextFrame, " + this.marginPaddingTop + ", " + this.marginPaddingBottom + ", " + this.marginPaddingLeft + ", " + this.marginPaddingRight + ", false, ppAutoSizeNone)");
            lines.push(" Call EditAnchor(obj.TextFrame, " + vAnchor + ", " + hAnchor + ")");
            GraphTableSVG.VBATranslateFunctions.TranslateSVGTextElement2(this.svgText, "obj.TextFrame.TextRange").forEach(function (v) { return lines.push(v); });
            lines.push(this.getVBAEditLine());
            lines.push(" Call EditCallOut(obj, \"" + this.objectID + "\", " + visible + ", " + backColor + ")");
            this.VBAAdjustments.forEach(function (v, i) {
                lines.push(" obj.Adjustments.Item(" + (i + 1) + ") = " + v);
            });
            lines.push("End Sub");
            return lines;
        };
        Object.defineProperty(GVertex.prototype, "VBAAdjustments", {
            get: function () {
                return [];
            },
            enumerable: true,
            configurable: true
        });
        GVertex.prototype.getVBAEditLine = function () {
            var lineColor = GraphTableSVG.VBATranslateFunctions.colorToVBA(this.surface.getPropertyStyleValueWithDefault("stroke", "gray"));
            var lineType = GraphTableSVG.msoDashStyle.getLineType(this.surface);
            var strokeWidth = parseInt(this.surface.getPropertyStyleValueWithDefault("stroke-width", "4"));
            var visible = this.surface.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
            return " Call EditLine(obj.Line, " + lineColor + ", " + lineType + ", " + 0 + ", " + strokeWidth + ", " + visible + ")";
        };
        Object.defineProperty(GVertex.prototype, "graph", {
            get: function () {
                var v = this.svgGroup.parentElement;
                if (v != null && v instanceof SVGGElement && v.hasAttribute(GraphTableSVG.CustomAttributeNames.objectIDName)) {
                    var id = v.getAttribute(GraphTableSVG.CustomAttributeNames.objectIDName);
                    var obj = GraphTableSVG.GObject.getObjectFromObjectID(id);
                    if (obj instanceof GraphTableSVG.GGraph) {
                        return obj;
                    }
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return GVertex;
    }(GraphTableSVG.GTextBox));
    GraphTableSVG.GVertex = GVertex;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GPathTextBox = (function (_super) {
        __extends(GPathTextBox, _super);
        function GPathTextBox(svgbox, option) {
            if (option === void 0) { option = {}; }
            return _super.call(this, svgbox, option) || this;
        }
        Object.defineProperty(GPathTextBox.prototype, "svgPath", {
            get: function () {
                return this.surface;
            },
            enumerable: true,
            configurable: true
        });
        GPathTextBox.prototype.createSurface = function (svgbox, option) {
            if (option === void 0) { option = {}; }
            this._surface = GraphTableSVG.SVG.createPath(this.svgGroup, 0, 0, 0, 0, this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.defaulSurfaceClass));
            this.svgGroup.insertBefore(this.svgPath, this.svgText);
        };
        Object.defineProperty(GPathTextBox.prototype, "innerRectangle", {
            get: function () {
                var rect = new GraphTableSVG.Rectangle();
                if (this.isAutoSizeShapeToFitText) {
                    var b = this.svgText.getBBox();
                    rect.width = b.width;
                    rect.height = b.height;
                    rect.x = (-this.width / 2) + this.marginPaddingLeft;
                    rect.y = (-this.height / 2) + this.marginPaddingTop;
                }
                else {
                    rect.width = this.width - this.marginPaddingLeft;
                    rect.height = this.height - this.marginPaddingTop;
                    rect.x = (-this.width / 2) + this.marginPaddingLeft;
                    rect.y = (-this.height / 2) + this.marginPaddingTop;
                }
                return rect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GPathTextBox.prototype, "type", {
            get: function () {
                return "PPPathTextBox";
            },
            enumerable: true,
            configurable: true
        });
        GPathTextBox.prototype.getLocation = function (type, x, y) {
            var wr = this.width / 2;
            var hr = this.height / 2;
            switch (type) {
                case GraphTableSVG.ConnectorPosition.Top:
                    return [this.cx, this.cy - hr];
                case GraphTableSVG.ConnectorPosition.TopRight:
                case GraphTableSVG.ConnectorPosition.Right:
                case GraphTableSVG.ConnectorPosition.BottomRight:
                    return [this.cx + wr, this.cy];
                case GraphTableSVG.ConnectorPosition.Bottom:
                    return [this.cx, this.cy + hr];
                case GraphTableSVG.ConnectorPosition.BottomLeft:
                case GraphTableSVG.ConnectorPosition.Left:
                case GraphTableSVG.ConnectorPosition.TopLeft:
                    return [this.cx - wr, this.cy];
                default:
                    var autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        };
        GPathTextBox.prototype.getAutoPosition = function (x, y) {
            var wr = this.width / 2;
            var hr = this.height / 2;
            var line1 = new GraphTableSVG.VLine(this.cx, this.cy, this.cx + wr, this.cy + hr);
            var line2 = new GraphTableSVG.VLine(this.cx, this.cy, this.cx + wr, this.cy - hr);
            var b1 = line1.contains(x, y);
            var b2 = line2.contains(x, y);
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
        };
        return GPathTextBox;
    }(GraphTableSVG.GVertex));
    GraphTableSVG.GPathTextBox = GPathTextBox;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GCallout = (function (_super) {
        __extends(GCallout, _super);
        function GCallout(svgbox, option) {
            if (option === void 0) { option = {}; }
            var _this = _super.call(this, svgbox, option) || this;
            _this.speakerX = option.speakerX == undefined ? 0 : option.speakerX;
            _this.speakerY = option.speakerY == undefined ? 0 : option.speakerY;
            return _this;
        }
        GCallout.constructAttributes = function (e, removeAttributes, output) {
            if (removeAttributes === void 0) { removeAttributes = false; }
            if (output === void 0) { output = {}; }
            GraphTableSVG.GTextBox.constructAttributes(e, removeAttributes, output);
            output.speakerX = e.gtGetAttributeNumber("speaker-x", 200);
            output.speakerY = e.gtGetAttributeNumber("speaker-y", 200);
            if (removeAttributes) {
                e.removeAttribute("speaker-x");
                e.removeAttribute("speaker-y");
            }
            return output;
        };
        GCallout.openCustomElement = function (e) {
            var parent = e.parentElement;
            if (parent instanceof SVGSVGElement) {
                var option = GCallout.constructAttributes(e, true);
                var attrs = e.gtGetAttributes();
                var r_1 = new GCallout(parent, option);
                attrs.forEach(function (v) { return r_1.svgGroup.setAttribute(v.name, v.value); });
                e.remove();
                return r_1;
            }
            else {
                throw Error("error!");
            }
        };
        Object.defineProperty(GCallout.prototype, "type", {
            get: function () {
                return "CallOut";
            },
            enumerable: true,
            configurable: true
        });
        GCallout.prototype.update = function () {
            _super.prototype.update.call(this);
            var x1 = -(this.width / 2);
            var y1 = -(this.height / 2);
            var x2 = (this.width / 2);
            var y2 = (this.height / 2);
            var speakerDiffX = this.speakerX - this.cx;
            var speakerDiffY = this.speakerY - this.cy;
            var px1 = 0, px2 = 0, py1 = 0, py2 = 0;
            var mes = "";
            switch (this.speakerPosition) {
                case "upleft":
                    px1 = (x1 / 3) * 2;
                    px2 = (x1 / 3) * 1;
                    mes = "H " + px1 + " L " + speakerDiffX + " " + speakerDiffY + " L " + px2 + " " + y1;
                    this.svgPath.setAttribute("d", "M " + x1 + " " + y1 + " " + mes + " H " + x2 + " V " + y2 + " H " + x1 + " V " + y1 + " z");
                    break;
                case "upright":
                    px1 = (x2 / 3) * 1;
                    px2 = (x2 / 3) * 2;
                    mes = "H " + px1 + " L " + speakerDiffX + " " + speakerDiffY + " L " + px2 + " " + y1;
                    this.svgPath.setAttribute("d", "M " + x1 + " " + y1 + " " + mes + " H " + x2 + " V " + y2 + " H " + x1 + " V " + y1 + " z");
                    break;
                case "rightup":
                    py1 = (y1 / 3) * 2;
                    py2 = (y1 / 3) * 1;
                    mes = "V " + py1 + " L " + speakerDiffX + " " + speakerDiffY + " L " + x2 + " " + py2;
                    this.svgPath.setAttribute("d", "M " + x1 + " " + y1 + " H " + x2 + " " + mes + " V " + y2 + " H " + x1 + " V " + y1 + " z");
                    break;
                case "rightdown":
                    py1 = (y2 / 3) * 1;
                    py2 = (y2 / 3) * 2;
                    mes = "V " + py1 + " L " + speakerDiffX + " " + speakerDiffY + " L " + x2 + " " + py2;
                    this.svgPath.setAttribute("d", "M " + x1 + " " + y1 + " H " + x2 + " " + mes + " V " + y2 + " H " + x1 + " V " + y1 + " z");
                    break;
                case "leftup":
                    py1 = (y1 / 3) * 1;
                    py2 = (y1 / 3) * 2;
                    mes = "V " + py1 + " L " + speakerDiffX + " " + speakerDiffY + " L " + x1 + " " + py2;
                    this.svgPath.setAttribute("d", "M " + x1 + " " + y1 + " H " + x2 + " V " + y2 + " H " + x1 + " " + mes + " V " + y1 + " z");
                    break;
                case "leftdown":
                    py1 = (y2 / 3) * 2;
                    py2 = (y2 / 3) * 1;
                    mes = "V " + py1 + " L " + speakerDiffX + " " + speakerDiffY + " L " + x1 + " " + py2;
                    this.svgPath.setAttribute("d", "M " + x1 + " " + y1 + " H " + x2 + " V " + y2 + " H " + x1 + " " + mes + " V " + y1 + " z");
                    break;
                case "downleft":
                    px1 = (x1 / 3) * 1;
                    px2 = (x1 / 3) * 2;
                    mes = "H " + px1 + " L " + speakerDiffX + " " + speakerDiffY + " L " + px2 + " " + y2;
                    this.svgPath.setAttribute("d", "M " + x1 + " " + y1 + " H " + x2 + " V " + y2 + " " + mes + " H " + x1 + " V " + y1 + " z");
                    break;
                case "downright":
                    px1 = (x2 / 3) * 2;
                    px2 = (x2 / 3) * 1;
                    mes = "H " + px1 + " L " + speakerDiffX + " " + speakerDiffY + " L " + px2 + " " + y2;
                    this.svgPath.setAttribute("d", "M " + x1 + " " + y1 + " H " + x2 + " V " + y2 + " " + mes + " H " + x1 + " V " + y1 + " z");
                    break;
                default:
                    this.svgPath.setAttribute("d", "M " + x1 + " " + y1 + " H " + x2 + " V " + y2 + " H " + x1 + " V " + y1 + " z");
                    break;
            }
        };
        Object.defineProperty(GCallout.prototype, "speakerX", {
            get: function () {
                return this.svgGroup.gtGetAttributeNumber("data-speaker-x", 0);
            },
            set: function (value) {
                if (this.speakerX != value)
                    this.svgGroup.setAttribute("data-speaker-x", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GCallout.prototype, "speakerY", {
            get: function () {
                return this.svgGroup.gtGetAttributeNumber("data-speaker-y", 0);
            },
            set: function (value) {
                if (this.speakerY != value)
                    this.svgGroup.setAttribute("data-speaker-y", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GCallout.prototype, "speakerPosition", {
            get: function () {
                var speakerDiffX = this.speakerX - this.cx;
                var speakerDiffY = this.speakerY - this.cy;
                var x1 = -(this.width / 2);
                var y1 = -(this.height / 2);
                var x2 = (this.width / 2);
                var y2 = (this.height / 2);
                if (x1 <= speakerDiffX && speakerDiffX <= x2 && y1 <= speakerDiffY && speakerDiffY <= y2) {
                    return "inner";
                }
                if (this.speakerX > this.cx) {
                    if (this.speakerY > this.cy) {
                        var line = new GraphTableSVG.VLine(0, 0, this.width, this.height);
                        if (line.contains(speakerDiffX, speakerDiffY)) {
                            return "rightdown";
                        }
                        else {
                            return "downright";
                        }
                    }
                    else {
                        var line = new GraphTableSVG.VLine(0, 0, this.width, -this.height);
                        if (line.contains(speakerDiffX, speakerDiffY)) {
                            return "upright";
                        }
                        else {
                            return "rightup";
                        }
                    }
                }
                else {
                    if (this.speakerY > this.cy) {
                        var line = new GraphTableSVG.VLine(0, 0, this.width, -this.height);
                        if (line.contains(speakerDiffX, speakerDiffY)) {
                            return "leftdown";
                        }
                        else {
                            return "downleft";
                        }
                    }
                    else {
                        var line = new GraphTableSVG.VLine(0, 0, this.width, this.height);
                        if (line.contains(speakerDiffX, speakerDiffY)) {
                            return "upleft";
                        }
                        else {
                            return "leftup";
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GCallout.prototype, "shape", {
            get: function () {
                return "msoShapeRectangularCallout";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GCallout.prototype, "VBAAdjustments", {
            get: function () {
                var y1 = this.speakerY - this.cy;
                var py = y1 / this.height;
                var x1 = this.speakerX - this.cx;
                var px = x1 / this.width;
                return [px, py];
            },
            enumerable: true,
            configurable: true
        });
        return GCallout;
    }(GraphTableSVG.GPathTextBox));
    GraphTableSVG.GCallout = GCallout;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GEdge = (function (_super) {
        __extends(GEdge, _super);
        function GEdge(svgbox, option) {
            if (option === void 0) { option = {}; }
            var _this = _super.call(this, svgbox, option) || this;
            _this.pUpdateFunc = function () { return _this.update(); };
            _this.VBAConnectorNumber = 1;
            _this.updateAttributes.push(GraphTableSVG.CustomAttributeNames.beginNodeName);
            _this.updateAttributes.push(GraphTableSVG.CustomAttributeNames.endNodeName);
            _this.svgText.textContent = "";
            var textClass = _this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.defaultTextClass);
            _this._svgTextPath = GraphTableSVG.SVG.createTextPath2(textClass);
            _this.svgPath.id = "path-" + _this.objectID;
            _this.svgText.appendChild(_this._svgTextPath);
            _this._svgTextPath.href.baseVal = "#" + _this.svgPath.id;
            if (option.text != undefined) {
                _this.svgTextPath.setTextContent(option.text);
            }
            var edgeColor = _this.svgPath.getPropertyStyleValue("stroke");
            var edgeColor2 = edgeColor == null ? undefined : edgeColor;
            var strokeWidth = _this.svgPath.getPropertyStyleValue("stroke-width");
            var strokeWidth2 = strokeWidth == null ? undefined : strokeWidth;
            if (typeof option.startMarker !== "undefined")
                _this.markerStart = GraphTableSVG.GEdge.createStartMarker({ color: edgeColor2, strokeWidth: strokeWidth2 });
            if (typeof option.endMarker !== "undefined")
                _this.markerEnd = GraphTableSVG.GEdge.createEndMarker({ color: edgeColor2, strokeWidth: strokeWidth2 });
            _this.pathPoints = [[option.x1, option.y1], [option.x2, option.y2]];
            if (option.beginVertex instanceof GraphTableSVG.GVertex)
                _this.beginVertex = option.beginVertex;
            if (option.endVertex instanceof GraphTableSVG.GVertex)
                _this.endVertex = option.endVertex;
            if (typeof option.beginConnectorType !== "undefined")
                _this.beginConnectorType = option.beginConnectorType;
            if (typeof option.endConnectorType !== "undefined")
                _this.endConnectorType = option.endConnectorType;
            _this.pathTextAlignment = option.pathTextAlignment;
            _this.update();
            return _this;
        }
        GEdge.constructAttributes = function (e, removeAttributes, output) {
            if (removeAttributes === void 0) { removeAttributes = false; }
            if (output === void 0) { output = {}; }
            GraphTableSVG.GTextBox.constructAttributes(e, removeAttributes, output);
            output.x1 = e.gtGetAttributeNumberWithoutNull("x1", 0);
            output.x2 = e.gtGetAttributeNumberWithoutNull("x2", 300);
            output.y1 = e.gtGetAttributeNumberWithoutNull("y1", 0);
            output.y2 = e.gtGetAttributeNumberWithoutNull("y2", 300);
            if (e.hasAttribute("begin-vertex"))
                output.beginVertex = e.getAttribute("begin-vertex");
            if (e.hasAttribute("end-vertex"))
                output.endVertex = e.getAttribute("end-vertex");
            output.beginConnectorType = GraphTableSVG.ConnectorPosition.ToConnectorPosition(e.gtGetAttribute("begin-connector", "auto"));
            output.endConnectorType = GraphTableSVG.ConnectorPosition.ToConnectorPosition(e.gtGetAttribute("end-connector", "auto"));
            output.startMarker = e.gtGetAttribute("start-marker", "false") == "true";
            output.endMarker = e.gtGetAttribute("end-marker", "false") == "true";
            if (removeAttributes) {
                e.removeAttribute("x1");
                e.removeAttribute("x2");
                e.removeAttribute("y1");
                e.removeAttribute("y2");
                e.removeAttribute("start-marker");
                e.removeAttribute("end-marker");
                e.removeAttribute("begin-vertex");
                e.removeAttribute("end-vertex");
                e.removeAttribute("begin-connector");
                e.removeAttribute("end-connector");
            }
            return output;
        };
        GEdge.prototype.updateOptionByCSS = function (option) {
            var _option = _super.prototype.updateOptionByCSS.call(this, option);
            var markerStartName = this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.markerStartName);
            var markerEndName = this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.markerEndName);
            if (typeof _option.startMarker === "undefined" && markerStartName != null)
                _option.startMarker = markerStartName == "true";
            if (typeof _option.endMarker === "undefined" && markerEndName != null)
                _option.endMarker = markerEndName == "true";
            if (typeof _option.x1 === "undefined")
                _option.x1 = 0;
            if (typeof _option.y1 === "undefined")
                _option.y1 = 0;
            if (typeof _option.x2 === "undefined")
                _option.x2 = 300;
            if (typeof _option.y2 === "undefined")
                _option.y2 = 300;
            if (typeof _option.beginVertex === "string") {
                var obj = GraphTableSVG.GTextBox.getObjectFromID(_option.beginVertex);
                if (obj instanceof GraphTableSVG.GVertex) {
                    _option.beginVertex = obj;
                }
            }
            if (typeof _option.endVertex === "string") {
                var obj = GraphTableSVG.GTextBox.getObjectFromID(_option.endVertex);
                if (obj instanceof GraphTableSVG.GVertex) {
                    _option.endVertex = obj;
                }
            }
            var styleBeginConnectorType = this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.beginConnectorTypeName);
            var styleEndConnectorType = this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.endConnectorTypeName);
            if (typeof _option.beginConnectorType === "undefined" && styleBeginConnectorType === null)
                _option.beginConnectorType = GraphTableSVG.ConnectorPosition.Auto;
            if (typeof _option.endConnectorType === "undefined" && styleEndConnectorType === null)
                _option.endConnectorType = GraphTableSVG.ConnectorPosition.Auto;
            if (typeof _option.pathTextAlignment === "undefined")
                _option.pathTextAlignment = GraphTableSVG.pathTextAlighnment.center;
            return _option;
        };
        GEdge.getConnectedVertexFromDic = function (edge, isBegin) {
            var dic = isBegin ? GEdge.connectedBeginVertexDic : GEdge.connectedEndVertexDic;
            if (edge.objectID in dic) {
                var id = dic[edge.objectID];
                var obj = GraphTableSVG.GObject.getObjectFromObjectID(id);
                if (obj instanceof GraphTableSVG.GVertex) {
                    return obj;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        };
        GEdge.setConnectedVertexFromDic = function (edge, isBegin) {
            var dic = isBegin ? GEdge.connectedBeginVertexDic : GEdge.connectedEndVertexDic;
            var id = isBegin ? edge.beginVertexID : edge.endVertexID;
            if (id == null) {
                if (edge.objectID in dic) {
                    delete dic[edge.objectID];
                }
            }
            else {
                dic[edge.objectID] = id;
            }
        };
        GEdge.prototype.setClassNameOfSVGGroup = function () {
            var parent = this.svgGroup.parentElement;
            if (parent instanceof SVGElement) {
                var className = parent.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.defaultEdgeClass);
                if (className != null) {
                    this.svgGroup.setAttribute("class", className);
                }
            }
        };
        Object.defineProperty(GEdge.prototype, "svgPath", {
            get: function () {
                return this.surface;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEdge.prototype, "svgTextPath", {
            get: function () {
                return this._svgTextPath;
            },
            enumerable: true,
            configurable: true
        });
        GEdge.prototype.createSurface = function (svgbox, option) {
            if (option === void 0) { option = {}; }
            this._surface = GraphTableSVG.SVG.createPath(this.svgGroup, 0, 0, 0, 0, this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.defaulSurfaceClass));
            this.svgGroup.insertBefore(this.svgPath, this.svgText);
        };
        Object.defineProperty(GEdge.prototype, "type", {
            get: function () {
                return "PPEdge";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEdge.prototype, "controlPoint", {
            get: function () {
                var r = this.pathPoints;
                r.shift();
                r.pop();
                return r;
            },
            set: function (value) {
                var fst = [this.x1, this.y1];
                var lst = [this.x2, this.y2];
                value.unshift(fst);
                value.push(lst);
                this.pathPoints = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEdge.prototype, "beginConnectorType", {
            get: function () {
                var p = this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.beginConnectorTypeName);
                return GraphTableSVG.ConnectorPosition.ToConnectorPosition(p);
            },
            set: function (value) {
                this.svgGroup.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.beginConnectorTypeName, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEdge.prototype, "endConnectorType", {
            get: function () {
                var p = this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.endConnectorTypeName);
                return GraphTableSVG.ConnectorPosition.ToConnectorPosition(p);
            },
            set: function (value) {
                this.svgGroup.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.endConnectorTypeName, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEdge.prototype, "beginVertexID", {
            get: function () {
                return this.svgGroup.getAttribute(GraphTableSVG.CustomAttributeNames.beginNodeName);
            },
            set: function (v) {
                if (v == null) {
                    this.svgGroup.removeAttribute(GraphTableSVG.CustomAttributeNames.beginNodeName);
                }
                else {
                    this.svgGroup.setAttribute(GraphTableSVG.CustomAttributeNames.beginNodeName, v);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEdge.prototype, "endVertexID", {
            get: function () {
                return this.svgGroup.getAttribute(GraphTableSVG.CustomAttributeNames.endNodeName);
            },
            set: function (v) {
                if (v == null) {
                    this.svgGroup.removeAttribute(GraphTableSVG.CustomAttributeNames.endNodeName);
                }
                else {
                    this.svgGroup.setAttribute(GraphTableSVG.CustomAttributeNames.endNodeName, v);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEdge.prototype, "markerStart", {
            get: function () {
                if (this.svgPath != null) {
                    var p = this.svgPath.getAttribute("marker-start");
                    if (p != null) {
                        var str = p.substring(5, p.length - 1);
                        var ele = document.getElementById(str);
                        return ele;
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                if (this.svgPath != null) {
                    if (value == null) {
                        this.svgPath.removeAttribute("marker-start");
                    }
                    else {
                        this.svgGroup.appendChild(value);
                        this.svgPath.setAttribute("marker-start", "url(#" + value.id + ")");
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEdge.prototype, "markerEnd", {
            get: function () {
                if (this.svgPath != null) {
                    var p = this.svgPath.getAttribute("marker-end");
                    if (p != null) {
                        var str = p.substring(5, p.length - 1);
                        var ele = document.getElementById(str);
                        return ele;
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                if (this.svgPath != null) {
                    if (value == null) {
                        this.svgPath.removeAttribute("marker-end");
                    }
                    else {
                        this.svgGroup.appendChild(value);
                        this.svgPath.setAttribute("marker-end", "url(#" + value.id + ")");
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        GEdge.prototype.removeVertexEvent = function (vertex) {
            vertex.svgGroup.removeEventListener(GraphTableSVG.CustomAttributeNames.connectPositionChangedEventName, this.pUpdateFunc);
        };
        GEdge.prototype.addVertexEvent = function (vertex) {
            vertex.svgGroup.addEventListener(GraphTableSVG.CustomAttributeNames.connectPositionChangedEventName, this.pUpdateFunc);
        };
        Object.defineProperty(GEdge.prototype, "beginVertex", {
            get: function () {
                if (this.beginVertexID == null) {
                    return null;
                }
                else {
                    return GraphTableSVG.GTextBox.getObjectFromObjectID(this.beginVertexID);
                }
            },
            set: function (value) {
                if (value == null) {
                    this.beginVertexID = null;
                }
                else {
                    this.beginVertexID = value.objectID;
                }
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEdge.prototype, "endVertex", {
            get: function () {
                if (this.endVertexID == null) {
                    return null;
                }
                else {
                    return GraphTableSVG.GTextBox.getObjectFromObjectID(this.endVertexID);
                }
            },
            set: function (value) {
                if (value == null) {
                    this.endVertexID = null;
                }
                else {
                    this.endVertexID = value.objectID;
                }
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        GEdge.prototype.dispose = function () {
            this.beginVertex = null;
            this.endVertex = null;
        };
        Object.defineProperty(GEdge.prototype, "x1", {
            get: function () {
                return this.pathPoints[0][0];
            },
            set: function (value) {
                var p = this.pathPoints;
                p[0][0] = value;
                this.pathPoints = p;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEdge.prototype, "y1", {
            get: function () {
                return this.pathPoints[0][1];
            },
            set: function (value) {
                var p = this.pathPoints;
                p[0][1] = value;
                this.pathPoints = p;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEdge.prototype, "x2", {
            get: function () {
                var d = this.pathPoints;
                return d[d.length - 1][0];
            },
            set: function (value) {
                var p = this.pathPoints;
                p[p.length - 1][0] = value;
                this.pathPoints = p;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEdge.prototype, "y2", {
            get: function () {
                var d = this.pathPoints;
                return d[d.length - 1][1];
            },
            set: function (value) {
                var p = this.pathPoints;
                p[p.length - 1][1] = value;
                this.pathPoints = p;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEdge.prototype, "lineColor", {
            get: function () {
                if (this.svgPath != null) {
                    return this.svgPath.getPropertyStyleValueWithDefault("stroke", "black");
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        GEdge.prototype.removeTextLengthAttribute = function () {
            if (this.svgText.hasAttribute("textLength"))
                this.svgText.removeAttribute("textLength");
            if (this.svgTextPath.hasAttribute("textLength"))
                this.svgTextPath.removeAttribute("textLength");
            if (this.svgText.hasAttribute("letter-spacing"))
                this.svgText.removeAttribute("letter-spacing");
        };
        GEdge.prototype.setRegularInterval = function (value) {
            this.removeTextLengthAttribute();
            var box = this.svgText.getBBox();
            var diff = value - box.width;
            var number = this.svgText.textContent != null ? this.svgText.textContent.length : 0;
            if (number >= 2) {
                var w = diff / (number - 1);
                this.svgText.setAttribute("letter-spacing", "" + w);
            }
            this.svgText.setAttribute("textLength", "" + value);
            this.svgTextPath.setAttribute("textLength", "" + value);
        };
        Object.defineProperty(GEdge.prototype, "pathPoints", {
            get: function () {
                var dAttr = this.svgPath.getAttribute("d");
                if (dAttr == null)
                    throw Error("error");
                var d = dAttr.split(" ");
                var i = 0;
                var r = [];
                while (i < d.length) {
                    if (d[i] == "M") {
                        r.push([Number(d[i + 1]), Number(d[i + 2])]);
                        i += 3;
                    }
                    else if (d[i] == "L") {
                        r.push([Number(d[i + 1]), Number(d[i + 2])]);
                        i += 3;
                    }
                    else if (d[i] == "Q") {
                        r.push([Number(d[i + 1]), Number(d[i + 2])]);
                        r.push([Number(d[i + 3]), Number(d[i + 4])]);
                        i += 5;
                    }
                    else {
                        throw Error("path points parse error");
                    }
                }
                return r;
            },
            set: function (points) {
                var path = "";
                if (points.length == 2) {
                    var _a = points[0], x1 = _a[0], y1 = _a[1];
                    var _b = points[1], x2 = _b[0], y2 = _b[1];
                    path = "M " + x1 + " " + y1 + " L " + x2 + " " + y2;
                }
                else if (points.length == 3) {
                    var _c = points[0], x1 = _c[0], y1 = _c[1];
                    var _d = points[2], x2 = _d[0], y2 = _d[1];
                    var _e = points[1], cx1 = _e[0], cy1 = _e[1];
                    path = "M " + x1 + " " + y1 + " Q " + cx1 + " " + cy1 + " " + x2 + " " + y2;
                }
                else if (points.length == 1) {
                    throw Error("path points ivnalid error");
                }
                else {
                    path = "M " + 0 + " " + 0 + " L " + 0 + " " + 0;
                }
                var prevPath = this.svgPath.getAttribute("d");
                if (prevPath == null || path != prevPath) {
                    this.svgPath.setAttribute("d", path);
                }
            },
            enumerable: true,
            configurable: true
        });
        GEdge.prototype.updateConnectorInfo = function () {
            var oldBeginVertex = GEdge.getConnectedVertexFromDic(this, true);
            var oldEndVertex = GEdge.getConnectedVertexFromDic(this, false);
            if (this.beginVertex != oldBeginVertex) {
                if (oldBeginVertex != null) {
                    this.removeVertexEvent(oldBeginVertex);
                    if (oldBeginVertex.outcomingEdges.indexOf(this) != -1) {
                        oldBeginVertex.removeOutcomingEdge(this);
                    }
                }
                if (this.beginVertex != null) {
                    this.addVertexEvent(this.beginVertex);
                    if (this.beginVertex.outcomingEdges.indexOf(this) == -1) {
                        this.beginVertex.insertOutcomingEdge(this);
                    }
                }
                GEdge.setConnectedVertexFromDic(this, true);
            }
            if (this.endVertex != oldEndVertex) {
                if (oldEndVertex != null) {
                    this.removeVertexEvent(oldEndVertex);
                    if (oldEndVertex.incomingEdges.indexOf(this) != -1) {
                        oldEndVertex.removeIncomingEdge(this);
                    }
                }
                if (this.endVertex != null) {
                    this.addVertexEvent(this.endVertex);
                    if (this.endVertex.incomingEdges.indexOf(this) == -1) {
                        this.endVertex.insertIncomingEdge(this);
                    }
                }
                GEdge.setConnectedVertexFromDic(this, false);
            }
        };
        GEdge.prototype.update = function () {
            this.updateConnectorInfo();
            var _a = this.beginVertex != null ? [this.beginVertex.cx, this.beginVertex.cy] : [this.x1, this.y1], cx1 = _a[0], cy1 = _a[1];
            var _b = this.endVertex != null ? [this.endVertex.cx, this.endVertex.cy] : [this.x2, this.y2], cx2 = _b[0], cy2 = _b[1];
            var _c = this.beginVertex != null ? this.beginVertex.getLocation(this.beginConnectorType, cx2, cy2) : [cx1, cy1], x1 = _c[0], y1 = _c[1];
            var _d = this.endVertex != null ? this.endVertex.getLocation(this.endConnectorType, cx1, cy1) : [cx2, cy2], x2 = _d[0], y2 = _d[1];
            var points = this.pathPoints;
            points[0] = [x1, y1];
            points[points.length - 1] = [x2, y2];
            this.pathPoints = points;
            if (this.markerStart != null) {
                var node = this.markerStart.firstChild;
                if (this.lineColor != null) {
                    node.setAttribute("fill", this.lineColor);
                }
            }
            if (this.markerEnd != null) {
                var node = this.markerEnd.firstChild;
                if (this.lineColor != null) {
                    node.setAttribute("fill", this.lineColor);
                }
            }
            if (this.pathTextAlignment == GraphTableSVG.pathTextAlighnment.regularInterval) {
                var pathLen = this.svgPath.getTotalLength();
                var strLen = this.svgTextPath.textContent == null ? 0 : this.svgTextPath.textContent.length;
                if (strLen > 0) {
                    var startPos = pathLen / (strLen + 1);
                    var textPathLen = pathLen - (startPos * 2);
                    if (textPathLen <= 0)
                        textPathLen = 5;
                    this.svgTextPath.setAttribute("startOffset", "" + startPos);
                    this.setRegularInterval(textPathLen);
                }
            }
            else if (this.pathTextAlignment == GraphTableSVG.pathTextAlighnment.end) {
                this.removeTextLengthAttribute();
                var box = this.svgText.getBBox();
                var pathLen = this.svgPath.getTotalLength();
                this.svgTextPath.setAttribute("startOffset", "" + (pathLen - box.width));
            }
            else if (this.pathTextAlignment == GraphTableSVG.pathTextAlighnment.center) {
                this.removeTextLengthAttribute();
                var box = this.svgText.getBBox();
                var pathLen = this.svgPath.getTotalLength();
                var offset = (pathLen - box.width) / 2;
                this.svgTextPath.setAttribute("startOffset", "" + offset);
            }
            else {
                this.svgTextPath.setAttribute("startOffset", "" + 0);
                this.removeTextLengthAttribute();
            }
            var strokeWidth = this.svgPath.getPropertyStyleValue("stroke-width");
            if (strokeWidth != null) {
                this.svgText.setAttribute("dy", "-" + strokeWidth);
            }
            else {
                this.svgText.setAttribute("dy", "0");
            }
            return false;
        };
        Object.defineProperty(GEdge.prototype, "pathTextAlignment", {
            get: function () {
                var value = this.svgTextPath.getPropertyStyleValueWithDefault(GraphTableSVG.PathTextAlignmentName, "none");
                return GraphTableSVG.pathTextAlighnment.toPathTextAlighnment(value);
            },
            set: function (value) {
                this.svgTextPath.setPropertyStyleValue(GraphTableSVG.PathTextAlignmentName, value);
            },
            enumerable: true,
            configurable: true
        });
        GEdge.prototype.save = function () {
        };
        GEdge.prototype.setIndexDictionaryForVBA = function (vertexDic, edgeDic) {
            if (this.controlPoint.length == 0) {
                edgeDic[this.objectID] = Object.keys(edgeDic).length;
            }
            else if (this.controlPoint.length > 0) {
                for (var i = 0; i < this.VBAConnectorNumber; i++) {
                    vertexDic[this.objectID + "_" + i] = Object.keys(vertexDic).length;
                }
                for (var i = 0; i <= this.VBAConnectorNumber; i++) {
                    edgeDic[this.objectID + "_" + i] = Object.keys(edgeDic).length;
                }
            }
        };
        GEdge.createMark = function (option) {
            if (option === void 0) { option = {}; }
            var _a = GraphTableSVG.SVG.createMarker(option), marker = _a[0], path = _a[1];
            if (option.isEnd != undefined && option.isEnd) {
                path.setAttribute("transform", "rotate(180,5,5)");
                marker.setAttribute("refX", "0");
            }
            marker.id = "marker-" + GEdge.markerCounter++;
            return marker;
        };
        GEdge.createStartMarker = function (option) {
            if (option === void 0) { option = {}; }
            var option2 = { className: option.className, strokeWidth: option.strokeWidth, color: option.color, isEnd: true };
            return this.createMark(option2);
        };
        GEdge.createEndMarker = function (option) {
            if (option === void 0) { option = {}; }
            return this.createMark(option);
        };
        Object.defineProperty(GEdge.prototype, "shape", {
            get: function () {
                return "msoConnectorStraight";
            },
            enumerable: true,
            configurable: true
        });
        GEdge.prototype.createVBACode = function (id) {
            var _this = this;
            var lineArr = [];
            var r = [];
            r.push("Sub create" + id + "(createdSlide As slide)");
            r.push(" Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes");
            r.push(" Dim obj As Shape");
            if (this.controlPoint.length == 0) {
                r.push(" Set obj = shapes_.AddConnector(msoConnectorStraight, 0, 0, 0, 0)");
                if (this.beginVertex != null && this.endVertex != null) {
                    if (this.markerStart != null) {
                        r.push(" obj.Line.BeginArrowheadLength = msoArrowheadLong");
                        r.push(" obj.Line.BeginArrowheadStyle = msoArrowheadTriangle");
                        r.push(" obj.Line.BeginArrowheadWidth = msoArrowheadWide");
                    }
                    if (this.markerEnd != null) {
                        r.push(" obj.Line.EndArrowheadLength = msoArrowheadLong");
                        r.push(" obj.Line.EndArrowheadStyle = msoArrowheadTriangle");
                        r.push(" obj.Line.EndArrowheadWidth = msoArrowheadWide");
                    }
                    var begType = GraphTableSVG.ConnectorPosition.ToVBAConnectorPosition2(this.beginVertex.shape, this.beginVertex.getConnectorType(this.beginConnectorType, this.endVertex.x, this.endVertex.y));
                    var endType = GraphTableSVG.ConnectorPosition.ToVBAConnectorPosition2(this.endVertex.shape, this.endVertex.getConnectorType(this.endConnectorType, this.beginVertex.x, this.beginVertex.y));
                    r.push(" Call EditConnector(obj.ConnectorFormat, shapes_(\"" + this.beginVertex.objectID + "\"), shapes_(\"" + this.endVertex.objectID + "\"), " + begType + ", " + endType + ")");
                    var lineType = GraphTableSVG.msoDashStyle.getLineType(this.svgPath);
                    var lineColor = GraphTableSVG.VBATranslateFunctions.colorToVBA(this.svgPath.getPropertyStyleValueWithDefault("stroke", "gray"));
                    var strokeWidth = parseInt(this.svgPath.getPropertyStyleValueWithDefault("stroke-width", "4"));
                    var visible_2 = this.svgPath.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                    r.push(" Call EditLine(obj.Line, " + lineColor + ", " + lineType + ", " + 0 + ", " + strokeWidth + ", " + visible_2 + ")");
                }
            }
            else if (this.controlPoint.length > 0 && this.beginVertex != null && this.endVertex != null) {
                r.push(" Dim nodes(" + this.VBAConnectorNumber + ") As Shape");
                for (var j = 0; j < this.VBAConnectorNumber; j++) {
                    var t = (j + 1) / (this.VBAConnectorNumber + 1);
                    var centerPoint = GraphTableSVG.Common.bezierLocation([this.x1, this.y1], this.controlPoint[0], [this.x2, this.y2], t);
                    r.push("shapes_.AddShape(msoShapeOval, " + centerPoint[0] + ", " + centerPoint[1] + ", 0, 0).name = \"" + this.objectID + "_node_" + j + "\"");
                }
                for (var j = 0; j <= this.VBAConnectorNumber; j++) {
                    var edgeID = this.objectID + "_edge_" + j;
                    var beg = j == 0 ? this.beginVertex.objectID : this.objectID + "_node_" + (j - 1);
                    var end = j == this.VBAConnectorNumber ? this.endVertex.objectID : this.objectID + "_node_" + j;
                    r.push(" shapes_.AddConnector(msoConnectorStraight, 0, 0, 0, 0).name = \"" + this.objectID + "_edge_" + j + "\"");
                    var lineType = GraphTableSVG.msoDashStyle.getLineType(this.svgPath);
                    var lineColor = GraphTableSVG.VBATranslateFunctions.colorToVBA(this.svgPath.getPropertyStyleValueWithDefault("stroke", "gray"));
                    var strokeWidth = parseInt(this.svgPath.getPropertyStyleValueWithDefault("stroke-width", "4"));
                    var visible_3 = this.svgPath.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                    r.push(" Call EditLine(shapes_(\"" + edgeID + "\").Line, " + lineColor + ", " + lineType + ", " + 0 + ", " + strokeWidth + ", " + visible_3 + ")");
                    var begType = j == 0 ? GraphTableSVG.ConnectorPosition.ToVBAConnectorPosition2(this.beginVertex.shape, this.beginVertex.getConnectorType(this.beginConnectorType, this.endVertex.x, this.endVertex.y)) : 1;
                    var endType = j == this.VBAConnectorNumber ? GraphTableSVG.ConnectorPosition.ToVBAConnectorPosition2(this.endVertex.shape, this.endVertex.getConnectorType(this.endConnectorType, this.beginVertex.x, this.beginVertex.y)) : 1;
                    r.push(" Call EditConnector(shapes_(\"" + edgeID + "\").ConnectorFormat, shapes_(\"" + beg + "\"), shapes_(\"" + end + "\"), " + begType + ", " + endType + ")");
                }
            }
            lineArr.forEach(function (v) {
                var lineType = GraphTableSVG.msoDashStyle.getLineType(_this.svgPath);
                var lineColor = GraphTableSVG.VBATranslateFunctions.colorToVBA(_this.svgPath.getPropertyStyleValueWithDefault("stroke", "gray"));
                var strokeWidth = parseInt(_this.svgPath.getPropertyStyleValueWithDefault("stroke-width", "4"));
                var visible = _this.svgPath.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                r.push(" Call EditLine(edges(" + v + ").Line, " + lineColor + ", " + lineType + ", " + 0 + ", " + strokeWidth + ", " + visible + ")");
            });
            var textCodes = this.createVBACodeOfText(id);
            textCodes.forEach(function (v, i) { return r.push("Call create" + id + "_label_" + i + "(shapes_)"); });
            r.push("End Sub");
            textCodes.forEach(function (v) { return v.forEach(function (w) { return r.push(w); }); });
            return r;
        };
        GEdge.prototype.createVBACodeOfText = function (id) {
            var r = [];
            var fontSize = parseInt(this.svgTextPath.getPropertyStyleValueWithDefault("font-size", "12"));
            var fontFamily = GraphTableSVG.VBATranslateFunctions.ToVBAFont(this.svgTextPath.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
            var fontBold = GraphTableSVG.VBATranslateFunctions.ToFontBold(this.svgTextPath.getPropertyStyleValueWithDefault("font-weight", "none"));
            if (this.svgTextPath.textContent != null) {
                for (var i = 0; i < this.svgTextPath.textContent.length; i++) {
                    var s = new Array(0);
                    var p1 = this.svgTextPath.getStartPositionOfChar(i);
                    var p2 = this.svgTextPath.getEndPositionOfChar(i);
                    var width = Math.abs(p2.x - p1.x);
                    var height = Math.abs(p2.y - p1.y);
                    var rad = this.svgTextPath.getRotationOfChar(i);
                    var diffx = (fontSize * 1 / 2) * Math.sin((rad / 180) * Math.PI);
                    var diffy = (fontSize * 3 / 8) + ((fontSize * 3 / 8) * Math.cos((rad / 180) * Math.PI));
                    var left = p1.x + diffx;
                    var top_1 = p1.y - (fontSize * 1 / 4) - diffy;
                    s.push("Sub create" + id + "_label_" + i + "(shapes_ As Shapes)");
                    s.push("With shapes_.AddTextBox(msoTextOrientationHorizontal, " + left + ", " + top_1 + "," + width + "," + fontSize + ")");
                    s.push(".TextFrame.TextRange.Text = \"" + this.svgTextPath.textContent[i] + "\"");
                    s.push(".TextFrame.marginLeft = 0");
                    s.push(".TextFrame.marginRight = 0");
                    s.push(".TextFrame.marginTop = 0");
                    s.push(".TextFrame.marginBottom = 0");
                    s.push(".TextFrame.TextRange.Font.Size = " + fontSize);
                    s.push(".TextFrame.TextRange.Font.name = \"" + fontFamily + "\"");
                    s.push(".TextFrame.TextRange.Font.Bold = " + fontBold);
                    s.push(".IncrementRotation(" + this.svgTextPath.getRotationOfChar(i) + ")");
                    s.push("End With");
                    s.push("End Sub");
                    r.push(s);
                }
            }
            return r;
        };
        GEdge.connectedBeginVertexDic = {};
        GEdge.connectedEndVertexDic = {};
        GEdge.markerCounter = 0;
        return GEdge;
    }(GraphTableSVG.GTextBox));
    GraphTableSVG.GEdge = GEdge;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GEllipse = (function (_super) {
        __extends(GEllipse, _super);
        function GEllipse(svgbox, option) {
            if (option === void 0) { option = {}; }
            return _super.call(this, svgbox, option) || this;
        }
        Object.defineProperty(GEllipse.prototype, "svgEllipse", {
            get: function () {
                return this._surface;
            },
            enumerable: true,
            configurable: true
        });
        GEllipse.prototype.createSurface = function (svgbox, option) {
            if (option === void 0) { option = {}; }
            this._surface = GraphTableSVG.SVG.createEllipse(this.svgGroup, this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.defaulSurfaceClass));
            this.svgGroup.insertBefore(this.svgEllipse, this.svgText);
        };
        GEllipse.constructAttributes = function (e, removeAttributes, output) {
            if (removeAttributes === void 0) { removeAttributes = false; }
            if (output === void 0) { output = {}; }
            GraphTableSVG.GTextBox.constructAttributes(e, removeAttributes, output);
            return output;
        };
        Object.defineProperty(GEllipse.prototype, "innerRectangle", {
            get: function () {
                var rect = new GraphTableSVG.Rectangle();
                rect.width = this.svgEllipse.rx.baseVal.value * 2;
                rect.height = this.svgEllipse.ry.baseVal.value * 2;
                rect.x = -this.svgEllipse.rx.baseVal.value;
                rect.y = -this.svgEllipse.ry.baseVal.value;
                return rect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEllipse.prototype, "width", {
            get: function () {
                return this.svgEllipse.rx.baseVal.value * 2;
            },
            set: function (value) {
                var _rx = value / 2;
                if (this.width != value)
                    this.svgEllipse.setAttribute("rx", _rx.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEllipse.prototype, "height", {
            get: function () {
                return this.svgEllipse.ry.baseVal.value * 2;
            },
            set: function (value) {
                var _ry = value / 2;
                if (this.height != value)
                    this.svgEllipse.setAttribute("ry", _ry.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEllipse.prototype, "rx", {
            get: function () {
                return this.svgEllipse.rx.baseVal.value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GEllipse.prototype, "ry", {
            get: function () {
                return this.svgEllipse.ry.baseVal.value;
            },
            enumerable: true,
            configurable: true
        });
        GEllipse.prototype.getLocation = function (type, x, y) {
            var centerX = (Math.sqrt(2) / 2) * this.svgEllipse.rx.baseVal.value;
            var centerY = (Math.sqrt(2) / 2) * this.svgEllipse.ry.baseVal.value;
            switch (type) {
                case GraphTableSVG.ConnectorPosition.Top:
                    return [this.cx, this.cy - this.ry];
                case GraphTableSVG.ConnectorPosition.TopRight:
                    return [this.cx + centerX, this.cy - centerY];
                case GraphTableSVG.ConnectorPosition.Right:
                    return [this.cx + this.rx, this.cy];
                case GraphTableSVG.ConnectorPosition.BottomRight:
                    return [this.cx + centerX, this.cy + centerY];
                case GraphTableSVG.ConnectorPosition.Bottom:
                    return [this.cx, this.cy + this.ry];
                case GraphTableSVG.ConnectorPosition.BottomLeft:
                    return [this.cx - centerX, this.cy + centerY];
                case GraphTableSVG.ConnectorPosition.Left:
                    return [this.cx - this.rx, this.cy];
                case GraphTableSVG.ConnectorPosition.TopLeft:
                    return [this.cx - centerX, this.cy - centerY];
                default:
                    var autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        };
        GEllipse.prototype.getAutoPosition = function (x, y) {
            var radius = this.rx;
            var r = (Math.sqrt(2) / 2) * radius;
            var line1 = new GraphTableSVG.VLine(this.x, this.y, this.x + r, this.y + r);
            var line2 = new GraphTableSVG.VLine(this.x, this.y, this.x + r, this.y - r);
            var b1 = line1.contains(x, y);
            var b2 = line2.contains(x, y);
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
        };
        Object.defineProperty(GEllipse.prototype, "shape", {
            get: function () {
                return "msoShapeOval";
            },
            enumerable: true,
            configurable: true
        });
        return GEllipse;
    }(GraphTableSVG.GVertex));
    GraphTableSVG.GEllipse = GEllipse;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GGraph = (function (_super) {
        __extends(GGraph, _super);
        function GGraph(box, option) {
            if (option === void 0) { option = {}; }
            var _this = _super.call(this, box, option) || this;
            _this._roots = [];
            _this._relocateFunction = null;
            _this.objectCreatedFunction = function (e) {
                var obj = GraphTableSVG.GObject.getObjectFromObjectID(e.target);
                if (obj instanceof GraphTableSVG.GVertex) {
                    _this.dispatchVertexCreatedEvent(obj);
                }
                else if (obj instanceof GraphTableSVG.GEdge) {
                }
                else {
                }
            };
            _this.svgGroup.addEventListener(GraphTableSVG.CustomAttributeNames.objectCreatedEventName, _this.objectCreatedFunction);
            return _this;
        }
        Object.defineProperty(GGraph.prototype, "vertices", {
            get: function () {
                var r = [];
                HTMLFunctions.getChildren(this.svgGroup).filter(function (v) { return v.hasAttribute(GraphTableSVG.CustomAttributeNames.objectIDName); }).forEach(function (v) {
                    var item = GraphTableSVG.GObject.getObjectFromObjectID(v.getAttribute(GraphTableSVG.CustomAttributeNames.objectIDName));
                    if (item instanceof GraphTableSVG.GVertex) {
                        r.push(item);
                    }
                });
                return r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GGraph.prototype, "edges", {
            get: function () {
                var r = [];
                HTMLFunctions.getChildren(this.svgGroup).filter(function (v) { return v.hasAttribute(GraphTableSVG.CustomAttributeNames.objectIDName); }).forEach(function (v) {
                    var item = GraphTableSVG.GObject.getObjectFromObjectID(v.getAttribute(GraphTableSVG.CustomAttributeNames.objectIDName));
                    if (item instanceof GraphTableSVG.GEdge) {
                        r.push(item);
                    }
                });
                return r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GGraph.prototype, "roots", {
            get: function () {
                return this.vertices.filter(function (v) { return v.incomingEdges.length == 0; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GGraph.prototype, "vertexXInterval", {
            get: function () {
                var v = this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.vertexXIntervalName);
                if (v == null) {
                    return null;
                }
                else {
                    return parseInt(v);
                }
            },
            set: function (value) {
                this.svgGroup.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.vertexXIntervalName, value == null ? null : value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GGraph.prototype, "vertexYInterval", {
            get: function () {
                var v = this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.vertexYIntervalName);
                if (v == null) {
                    return null;
                }
                else {
                    return parseInt(v);
                }
            },
            set: function (value) {
                this.svgGroup.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.vertexYIntervalName, value == null ? null : value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GGraph.prototype, "defaultVertexClass", {
            get: function () {
                return this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.defaultVertexClass);
            },
            set: function (value) {
                this.svgGroup.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.defaultVertexClass, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GGraph.prototype, "defaultEdgeClass", {
            get: function () {
                return this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.defaultEdgeClass);
            },
            set: function (value) {
                this.svgGroup.setPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.defaultEdgeClass, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GGraph.prototype, "rootVertex", {
            get: function () {
                if (this.roots.length == 0) {
                    return null;
                }
                else {
                    return this.roots[0];
                }
            },
            enumerable: true,
            configurable: true
        });
        GGraph.prototype.add = function (item) {
            if (item instanceof GraphTableSVG.GVertex) {
                this.svgGroup.insertBefore(item.svgGroup, this.svgGroup.firstChild);
            }
            else {
                this.svgGroup.appendChild(item.svgGroup);
            }
        };
        GGraph.prototype.remove = function (item) {
            this.svgGroup.removeChild(item.svgGroup);
            item.dispose();
        };
        GGraph.prototype.clear = function () {
            while (this.edges.length > 0) {
                this.remove(this.edges[0]);
            }
            while (this.vertices.length > 0) {
                this.remove(this.vertices[0]);
            }
        };
        GGraph.prototype.connect = function (beginVertex, edge, endVertex, option) {
            if (option === void 0) { option = {}; }
            var oIndex = option.outcomingInsertIndex == undefined ? beginVertex.outcomingEdges.length : option.outcomingInsertIndex;
            var iIndex = option.incomingInsertIndex == undefined ? endVertex.incomingEdges.length : option.incomingInsertIndex;
            beginVertex.insertOutcomingEdge(edge, oIndex);
            endVertex.insertIncomingEdge(edge, iIndex);
            var i = this.roots.indexOf(beginVertex);
            var j = this.roots.indexOf(endVertex);
            if (j != -1) {
                if (i == -1) {
                    this.roots[j] = beginVertex;
                }
                else {
                    this.roots.splice(j, 1);
                }
            }
            if (option.beginConnectorType != undefined)
                edge.beginConnectorType = option.beginConnectorType;
            if (option.endConnectorType != undefined)
                edge.endConnectorType = option.endConnectorType;
        };
        GGraph.prototype.getOrderedVertices = function (order, node) {
            var _this = this;
            if (node === void 0) { node = null; }
            var r = [];
            if (node == null) {
                this.roots.forEach(function (v) {
                    _this.getOrderedVertices(order, v).forEach(function (w) {
                        r.push(w);
                    });
                });
            }
            else {
                var edges = node.outcomingEdges;
                if (order == GraphTableSVG.VertexOrder.Preorder) {
                    r.push(node);
                    edges.forEach(function (v) {
                        _this.getOrderedVertices(order, v.endVertex).forEach(function (w) {
                            r.push(w);
                        });
                    });
                }
                else if (order == GraphTableSVG.VertexOrder.Postorder) {
                    edges.forEach(function (v) {
                        _this.getOrderedVertices(order, v.endVertex).forEach(function (w) {
                            r.push(w);
                        });
                    });
                    r.push(node);
                }
            }
            return r;
        };
        GGraph.prototype.appendChild = function (parent, child, option) {
            if (option === void 0) { option = {}; }
            var _child = child == null ? GraphTableSVG.createVertex(this) : child;
            var edge = GraphTableSVG.createShape(this, 'g-edge');
            this.connect(parent, edge, _child, { beginConnectorType: "bottom", endConnectorType: "top" });
            this.relocate();
        };
        Object.defineProperty(GGraph.prototype, "relocateFunction", {
            get: function () {
                return this._relocateFunction;
            },
            set: function (func) {
                this._relocateFunction = func;
                this.relocate();
            },
            enumerable: true,
            configurable: true
        });
        GGraph.prototype.relocate = function () {
            if (this._relocateFunction != null)
                this._relocateFunction(this);
        };
        GGraph.prototype.constructFromLogicTree = function (roots, option) {
            var _this = this;
            if (option === void 0) { option = {}; }
            if (option.isLatexMode == undefined)
                option.isLatexMode = false;
            if (roots instanceof Array) {
                this.clear();
                roots.forEach(function (v) {
                    if (v != null) {
                        _this.createChildFromLogicTree(null, v, option);
                    }
                });
                if (this.relocateFunction == null) {
                    this.relocateFunction = GraphTableSVG.GTreeArrangement.alignVerticeByChildren;
                }
                else {
                    this.relocate();
                }
            }
            else {
                this.constructFromLogicTree([roots], option);
            }
            if (option.x != undefined)
                this.svgGroup.setX(option.x);
            if (option.y != undefined)
                this.svgGroup.setY(option.y);
        };
        GGraph.prototype.removeGraph = function (svg) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        };
        GGraph.prototype.getRegion = function () {
            var rects = this.vertices.map(function (v) { return v.region; });
            var rect = GraphTableSVG.Rectangle.merge(rects);
            rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
            return rect;
        };
        GGraph.prototype.createChildFromLogicTree = function (parent, logicVertex, option) {
            var _this = this;
            if (parent === void 0) { parent = null; }
            if (option === void 0) { option = {}; }
            if (option.isLatexMode == undefined)
                option.isLatexMode = false;
            var node = GraphTableSVG.createVertex(this, { class: logicVertex.vertexClass == null ? undefined : logicVertex.vertexClass });
            if (logicVertex.vertexText != null)
                GraphTableSVG.SVG.setTextToSVGText(node.svgText, logicVertex.vertexText, option.isLatexMode);
            if (parent != null) {
                var edge = GraphTableSVG.createShape(this, 'g-edge', { class: logicVertex.parentEdgeClass });
                if (logicVertex.parentEdgeText != null) {
                    edge.svgTextPath.setTextContent(logicVertex.parentEdgeText, option.isLatexMode);
                    edge.pathTextAlignment = GraphTableSVG.pathTextAlighnment.regularInterval;
                }
                this.connect(parent, edge, node, { beginConnectorType: "bottom", endConnectorType: "top" });
            }
            else {
                this.roots.push(node);
            }
            logicVertex.children.forEach(function (v) {
                if (v != null)
                    _this.createChildFromLogicTree(node, v, option);
            });
            return node;
        };
        GGraph.prototype.createVBACode = function (id) {
            var r = [];
            this.vertices.forEach(function (v) { return v.createVBACode(id++).forEach(function (w) { return r.push(w); }); });
            this.edges.forEach(function (v) { return v.createVBACode(id++).forEach(function (w) { return r.push(w); }); });
            return r;
        };
        Object.defineProperty(GGraph.prototype, "VBAObjectNum", {
            get: function () {
                return this.vertices.length + this.edges.length;
            },
            enumerable: true,
            configurable: true
        });
        GGraph.prototype.getStyleValue = function (className, valueName) {
            if (this.svgGroup.hasAttribute("class")) {
                var oldClass = this.svgGroup.getAttribute("class");
                this.svgGroup.setAttribute("class", className);
                var r = this.svgGroup.getPropertyStyleValue(valueName);
                this.svgGroup.setAttribute("class", oldClass);
                return r;
            }
            else {
                this.svgGroup.setAttribute("class", className);
                var r = this.svgGroup.getPropertyStyleValue(valueName);
                this.svgGroup.removeAttribute("class");
                return r;
            }
        };
        GGraph.prototype.dispatchVertexCreatedEvent = function (vertex) {
            var event = document.createEvent("HTMLEvents");
            event.initEvent(GraphTableSVG.CustomAttributeNames.vertexCreatedEventName, true, true);
            vertex.svgGroup.dispatchEvent(event);
        };
        GGraph.prototype.setRootIndex = function (vertex, rootIndex) {
            if (vertex.graph == this) {
                if (rootIndex < this.roots.length) {
                    this.svgGroup.insertBefore(vertex.svgGroup, this.roots[rootIndex].svgGroup);
                }
                else {
                    if (this.roots.length == 0) {
                        if (this.svgGroup.firstChild == null) {
                            this.svgGroup.appendChild(vertex.svgGroup);
                        }
                        else {
                            this.svgGroup.insertBefore(vertex.svgGroup, this.svgGroup.firstChild);
                        }
                    }
                    else {
                        if (this.roots[this.roots.length - 1].svgGroup.nextSibling == null) {
                            this.svgGroup.appendChild(vertex.svgGroup);
                        }
                        else {
                            this.svgGroup.insertBefore(vertex.svgGroup, this.roots[this.roots.length - 1].svgGroup.nextSibling);
                        }
                    }
                }
            }
            else {
                throw Error("error!");
            }
        };
        return GGraph;
    }(GraphTableSVG.GObject));
    GraphTableSVG.GGraph = GGraph;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GRect = (function (_super) {
        __extends(GRect, _super);
        function GRect(svgbox, option) {
            if (option === void 0) { option = {}; }
            var _this = _super.call(this, svgbox, option) || this;
            _this.updateAttributes.push("width");
            _this.updateAttributes.push("height");
            _this.update();
            return _this;
        }
        Object.defineProperty(GRect.prototype, "svgRectangle", {
            get: function () {
                return this._surface;
            },
            enumerable: true,
            configurable: true
        });
        GRect.prototype.createSurface = function (svgbox, option) {
            if (option === void 0) { option = {}; }
            this._surface = GraphTableSVG.SVG.createRectangle(this.svgGroup, this.svgGroup.getPropertyStyleValue(GraphTableSVG.CustomAttributeNames.Style.defaulSurfaceClass));
            this.svgGroup.insertBefore(this.svgRectangle, this.svgText);
        };
        GRect.constructAttributes = function (e, removeAttributes, output) {
            if (removeAttributes === void 0) { removeAttributes = false; }
            if (output === void 0) { output = {}; }
            GraphTableSVG.GTextBox.constructAttributes(e, removeAttributes, output);
            return output;
        };
        Object.defineProperty(GRect.prototype, "innerRectangle", {
            get: function () {
                var rect = new GraphTableSVG.Rectangle();
                rect.width = this.width;
                rect.height = this.height;
                rect.x = -this.width / 2;
                rect.y = -this.height / 2;
                return rect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRect.prototype, "width", {
            get: function () {
                return this.svgRectangle.width.baseVal.value;
            },
            set: function (value) {
                if (this.width != value)
                    this.svgRectangle.setAttribute("width", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRect.prototype, "height", {
            get: function () {
                return this.svgRectangle.height.baseVal.value;
            },
            set: function (value) {
                if (this.height != value)
                    this.svgRectangle.setAttribute("height", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        GRect.prototype.updateSurface = function () {
            this.svgRectangle.x.baseVal.value = -this.width / 2;
            this.svgRectangle.y.baseVal.value = -this.height / 2;
        };
        GRect.prototype.getLocation = function (type, x, y) {
            var wr = this.width / 2;
            var hr = this.height / 2;
            switch (type) {
                case GraphTableSVG.ConnectorPosition.Top:
                    return [this.cx, this.cy - hr];
                case GraphTableSVG.ConnectorPosition.TopRight:
                case GraphTableSVG.ConnectorPosition.Right:
                case GraphTableSVG.ConnectorPosition.BottomRight:
                    return [this.cx + wr, this.cy];
                case GraphTableSVG.ConnectorPosition.Bottom:
                    return [this.cx, this.cy + hr];
                case GraphTableSVG.ConnectorPosition.BottomLeft:
                case GraphTableSVG.ConnectorPosition.Left:
                case GraphTableSVG.ConnectorPosition.TopLeft:
                    return [this.cx - wr, this.cy];
                default:
                    var autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        };
        GRect.prototype.getAutoPosition = function (x, y) {
            var wr = this.width / 2;
            var hr = this.height / 2;
            var line1 = new GraphTableSVG.VLine(this.cx, this.cy, this.cx + wr, this.cy + hr);
            var line2 = new GraphTableSVG.VLine(this.cx, this.cy, this.cx + wr, this.cy - hr);
            var b1 = line1.contains(x, y);
            var b2 = line2.contains(x, y);
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
        };
        Object.defineProperty(GRect.prototype, "shape", {
            get: function () {
                return "msoShapeRectangle";
            },
            enumerable: true,
            configurable: true
        });
        return GRect;
    }(GraphTableSVG.GVertex));
    GraphTableSVG.GRect = GRect;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GTreeArrangement;
    (function (GTreeArrangement) {
        function alignVerticeByLeaveSub(forest, xInterval, yInterval) {
            var leafCounter = 0;
            forest.getOrderedVertices(GraphTableSVG.VertexOrder.Postorder).forEach(function (v) {
                var x = 0;
                var y = 0;
                if (v.isLeaf) {
                    x = leafCounter * xInterval;
                    leafCounter++;
                }
                else {
                    v.children.forEach(function (w) {
                        x += w.cx;
                        if (y < w.cy)
                            y = w.cy;
                    });
                    x = x / v.children.length;
                    y += yInterval;
                }
                v.cx = x;
                v.cy = y;
            });
        }
        GTreeArrangement.alignVerticeByLeaveSub = alignVerticeByLeaveSub;
        function reverse(graph, isX, isY) {
            if (graph.vertices.length > 0) {
                if (isY) {
                    var midY_1 = middle(graph.vertices.map(function (v) { return v.cy; }));
                    graph.vertices.forEach(function (v) {
                        if (v.cy < midY_1) {
                            v.cy += 2 * (midY_1 - v.cy);
                        }
                        else {
                            v.cy -= 2 * (v.cy - midY_1);
                        }
                    });
                }
                if (isX) {
                    var midX_1 = middle(graph.vertices.map(function (v) { return v.cx; }));
                    graph.vertices.forEach(function (v) {
                        if (v.cx < midX_1) {
                            v.cx += 2 * (midX_1 - v.cx);
                        }
                        else {
                            v.cx -= 2 * (v.cx - midX_1);
                        }
                    });
                }
            }
        }
        GTreeArrangement.reverse = reverse;
        function average(items) {
            if (items.length > 0) {
                var y_1 = 0;
                items.forEach(function (v) {
                    y_1 += v;
                });
                return y_1 / items.length;
            }
            else {
                throw new Error();
            }
        }
        function middle(items) {
            if (items.length > 0) {
                var min_1 = items[0];
                var max_1 = items[0];
                items.forEach(function (w) {
                    if (min_1 > w)
                        min_1 = w;
                    if (max_1 < w)
                        max_1 = w;
                });
                return (min_1 + max_1) / 2;
            }
            else {
                throw new Error();
            }
        }
        function alignVerticeByChildren(graph) {
            var _a = getXYIntervals(graph), xi = _a[0], yi = _a[1];
            if (graph.rootVertex != null) {
                var rootTree = graph.rootVertex.tree;
                var _b = [rootTree.subTreeRoot.x, rootTree.subTreeRoot.y], x = _b[0], y = _b[1];
                alignVerticeByChildrenSub(rootTree, xi, yi);
                rootTree.setRootLocation(x, y);
            }
            alignTrees(graph);
        }
        GTreeArrangement.alignVerticeByChildren = alignVerticeByChildren;
        function alignVerticeByChildrenSub(tree, xInterval, yInterval) {
            tree.subTreeRoot.cx = 0;
            tree.subTreeRoot.cy = 0;
            var leaves = 0;
            var children = tree.children;
            var leaveSizeWidthHalf = (tree.leaves.length * xInterval) / 2;
            var x = -leaveSizeWidthHalf;
            for (var i = 0; i < children.length; i++) {
                alignVerticeByChildrenSub(children[i].tree, xInterval, yInterval);
                var w = (children[i].tree.leaves.length * xInterval) / 2;
                children[i].tree.setRootLocation(x + w, yInterval);
                x += children[i].tree.leaves.length * xInterval;
            }
        }
        function standardTreeWidthArrangement(graph) {
            var _a = getXYIntervals(graph), xi = _a[0], yi = _a[1];
            if (graph.rootVertex != null) {
                var rootTree = graph.rootVertex.tree;
                var _b = [rootTree.subTreeRoot.cx, rootTree.subTreeRoot.cy], x = _b[0], y = _b[1];
                standardTreeWidthArrangementSub(rootTree, xi, yi);
                rootTree.setRootLocation(x, y);
            }
        }
        GTreeArrangement.standardTreeWidthArrangement = standardTreeWidthArrangement;
        function computeAutoXYIntervals(graph) {
            var yMaximalInterval = 30;
            var xMaximalInterval = 30;
            graph.vertices.forEach(function (v) {
                if (v.width > xMaximalInterval)
                    xMaximalInterval = v.width;
                if (v.height > yMaximalInterval)
                    yMaximalInterval = v.height;
            });
            return [xMaximalInterval * 2, yMaximalInterval * 2];
        }
        function getXYIntervals(graph) {
            var _a = computeAutoXYIntervals(graph), xMaximalInterval = _a[0], yMaximalInterval = _a[1];
            var xi = graph.vertexXInterval != null ? graph.vertexXInterval : xMaximalInterval;
            var yi = graph.vertexYInterval != null ? graph.vertexYInterval : yMaximalInterval;
            return [xi, yi];
        }
        function alignTrees(graph) {
            var x = 0;
            graph.roots.forEach(function (v) {
                var region = v.tree.region();
                v.tree.setRectangleLocation(x, 0);
                x += region.width;
            });
        }
        function alignVerticeByLeave(graph) {
            graph.vertices.forEach(function (v) { v.cx = 0; v.cy = 0; });
            var _a = getXYIntervals(graph), xi = _a[0], yi = _a[1];
            alignVerticeByLeaveSub(graph, xi, yi);
            reverse(graph, false, true);
            alignTrees(graph);
        }
        GTreeArrangement.alignVerticeByLeave = alignVerticeByLeave;
        function standardTreeWidthArrangementSub(tree, xInterval, yInterval) {
            tree.subTreeRoot.cx = 0;
            tree.subTreeRoot.cy = 0;
            var centerX = 0;
            var children = tree.children;
            var x = 0;
            if (children.length == 1) {
                tree.subTreeRoot.cx = children[0].cx;
                standardTreeWidthArrangementSub(children[0].tree, xInterval, yInterval);
                children[0].tree.setRootLocation(children[0].x, yInterval);
            }
            else if (children.length == 0) {
            }
            else {
                for (var i = 0; i < children.length; i++) {
                    standardTreeWidthArrangementSub(children[i].tree, xInterval, yInterval);
                    var rect = children[i].tree.region();
                    var diffX = children[i].cx - rect.x;
                    children[i].tree.setRootLocation(x + diffX, yInterval);
                    x += rect.width + xInterval;
                    if (i < children.length - 1) {
                        centerX += x - (xInterval / 2);
                    }
                }
                centerX = centerX / (children.length - 1);
                tree.subTreeRoot.cx = centerX;
            }
        }
    })(GTreeArrangement = GraphTableSVG.GTreeArrangement || (GraphTableSVG.GTreeArrangement = {}));
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var ShapeArrowCallout = (function (_super) {
        __extends(ShapeArrowCallout, _super);
        function ShapeArrowCallout(svgbox, option) {
            if (option === void 0) { option = {}; }
            var _this = _super.call(this, svgbox, option) || this;
            if (option.height == undefined)
                _this.height = 100;
            if (option.width == undefined)
                _this.width = 100;
            _this.arrowNeckWidth = option.arrowNeckWidth == undefined ? 10 : option.arrowNeckWidth;
            _this.arrowNeckHeight = option.arrowNeckHeight == undefined ? 10 : option.arrowNeckHeight;
            _this.arrowHeadWidth = option.arrowHeadWidth == undefined ? 20 : option.arrowHeadWidth;
            _this.arrowHeadHeight = option.arrowHeadHeight == undefined ? 20 : option.arrowHeadHeight;
            _this.svgGroup.setAttribute("data-direction", option.direction == undefined ? "down" : option.direction);
            _this.updateAttributes.push("data-direction");
            return _this;
        }
        ShapeArrowCallout.constructAttributes = function (e, removeAttributes, output) {
            if (removeAttributes === void 0) { removeAttributes = false; }
            if (output === void 0) { output = {}; }
            GraphTableSVG.GTextBox.constructAttributes(e, removeAttributes, output);
            output.arrowNeckWidth = e.gtGetAttributeNumberWithoutNull("arrow-neck-width", 10);
            output.arrowNeckHeight = e.gtGetAttributeNumberWithoutNull("arrow-neck-height", 10);
            output.arrowHeadWidth = e.gtGetAttributeNumberWithoutNull("arrow-head-width", 20);
            output.arrowHeadHeight = e.gtGetAttributeNumberWithoutNull("arrow-head-height", 20);
            var p = e.gtGetAttribute("direction", "");
            output.direction = GraphTableSVG.Direction.toDirection(p);
            if (removeAttributes) {
                e.removeAttribute("arrow-neck-width");
                e.removeAttribute("arrow-neck-height");
                e.removeAttribute("arrow-head-width");
                e.removeAttribute("arrow-head-height");
                e.removeAttribute("direction");
            }
            return output;
        };
        ShapeArrowCallout.openCustomElement = function (e) {
            var parent = e.parentElement;
            if (parent instanceof SVGSVGElement) {
                var option = ShapeArrowCallout.constructAttributes(e, true);
                var attrs = e.gtGetAttributes();
                var r_2 = new ShapeArrowCallout(parent, option);
                e.remove();
                attrs.forEach(function (v) { return r_2.svgGroup.setAttribute(v.name, v.value); });
                return r_2;
            }
            else {
                throw Error("error!");
            }
        };
        Object.defineProperty(ShapeArrowCallout.prototype, "type", {
            get: function () {
                return "ShapeArrow";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShapeArrowCallout.prototype, "arrowNeckWidth", {
            get: function () {
                return this.svgGroup.gtGetAttributeNumberWithoutNull("data-arrow-neck-width", 0);
            },
            set: function (value) {
                if (this.arrowNeckWidth != value)
                    this.svgGroup.setAttribute("data-arrow-neck-width", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShapeArrowCallout.prototype, "arrowNeckHeight", {
            get: function () {
                return this.svgGroup.gtGetAttributeNumberWithoutNull("data-arrow-neck-height", 0);
            },
            set: function (value) {
                if (this.arrowNeckHeight != value)
                    this.svgGroup.setAttribute("data-arrow-neck-height", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShapeArrowCallout.prototype, "arrowHeadWidth", {
            get: function () {
                return this.svgGroup.gtGetAttributeNumberWithoutNull("data-arrow-head-width", 0);
            },
            set: function (value) {
                if (this.arrowHeadWidth != value)
                    this.svgGroup.setAttribute("data-arrow-head-width", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShapeArrowCallout.prototype, "arrowHeadHeight", {
            get: function () {
                return this.svgGroup.gtGetAttributeNumberWithoutNull("data-arrow-head-height", 0);
            },
            set: function (value) {
                if (this.arrowHeadHeight != value)
                    this.svgGroup.setAttribute("data-arrow-head-height", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShapeArrowCallout.prototype, "direction", {
            get: function () {
                var r = this.svgGroup.getAttribute("data-direction");
                return GraphTableSVG.Direction.toDirection(r);
            },
            set: function (value) {
                if (this.direction != value) {
                    this.svgGroup.setAttribute("data-direction", value.toString());
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShapeArrowCallout.prototype, "innerRectangle", {
            get: function () {
                var rect = new GraphTableSVG.Rectangle();
                if (this.isAutoSizeShapeToFitText) {
                    var b = this.svgText.getBBox();
                    rect.width = b.width;
                    rect.height = b.height;
                    rect.x = (-this.width / 2) + this.marginPaddingLeft;
                    rect.y = (-this.height / 2) + this.marginPaddingTop;
                }
                else {
                    rect.width = this.boxWidth - this.marginPaddingLeft;
                    rect.height = this.boxHeight - this.marginPaddingTop;
                    rect.x = (-this.width / 2) + this.marginPaddingLeft;
                    rect.y = (-this.height / 2) + this.marginPaddingTop;
                }
                if (this.direction == "up")
                    rect.y += this.arrowNeckHeight + this.arrowHeadHeight;
                if (this.direction == "left")
                    rect.x += this.arrowNeckHeight + this.arrowHeadHeight;
                return rect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShapeArrowCallout.prototype, "boxHeight", {
            get: function () {
                if (this.direction == "up" || this.direction == "down") {
                    return this.height - this.arrowNeckHeight - this.arrowHeadWidth;
                }
                else {
                    return this.height;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShapeArrowCallout.prototype, "boxWidth", {
            get: function () {
                if (this.direction == "up" || this.direction == "down") {
                    return this.width;
                }
                else {
                    return this.width - this.arrowNeckHeight - this.arrowHeadWidth;
                }
            },
            enumerable: true,
            configurable: true
        });
        ShapeArrowCallout.prototype.updateToFitText = function () {
            var box = this.svgText.getBBox();
            if (this.direction == "up" || this.direction == "down") {
                this.width = box.width + this.marginPaddingLeft + this.marginPaddingRight;
                this.height = box.height + this.marginPaddingTop + this.marginPaddingBottom + this.arrowNeckHeight + this.arrowHeadHeight;
            }
            else {
                this.width = box.width + this.marginPaddingLeft + this.marginPaddingRight + this.arrowNeckHeight + this.arrowHeadHeight;
                this.height = box.height + this.marginPaddingTop + this.marginPaddingBottom;
            }
        };
        ShapeArrowCallout.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.direction == "up") {
                var x1 = -(this.width / 2);
                var y1 = -(this.height / 2);
                var x2 = (this.width / 2);
                var y2 = (this.height / 2);
                var bx1 = x1;
                var by1 = y1 + this.arrowHeadHeight + this.arrowNeckHeight;
                var bx2 = x2;
                var by2 = y2;
                var nx1 = -(this.arrowNeckWidth / 2);
                var nx2 = (this.arrowNeckWidth / 2);
                var ny = by1 - this.arrowNeckHeight;
                var cx = 0;
                var hx1 = -(this.arrowHeadWidth / 2);
                var hx2 = (this.arrowHeadWidth / 2);
                var hy = y1;
                var mes = "H " + nx1 + " V " + ny + " H " + hx1 + " L " + cx + " " + hy + " L " + hx2 + " " + ny + " H " + nx2 + " V " + by1;
                var top_2 = "M " + bx1 + " " + by1 + " " + mes + " H " + bx2;
                var right = "V " + by2;
                var bottom = "H " + bx1;
                var left = "V " + by1;
                this.svgPath.setAttribute("d", top_2 + " " + right + " " + bottom + " " + left + " z");
            }
            else if (this.direction == "left") {
                var x1 = -(this.width / 2);
                var y1 = -(this.height / 2);
                var x2 = (this.width / 2);
                var y2 = (this.height / 2);
                var bx1 = x1 + this.arrowHeadHeight + this.arrowNeckHeight;
                var by1 = y1;
                var bx2 = x2;
                var by2 = y2;
                var ny1 = 0 + (this.arrowNeckWidth / 2);
                var ny2 = 0 - (this.arrowNeckWidth / 2);
                var nx = bx1 - this.arrowNeckHeight;
                var cy = 0;
                var hy1 = 0 + (this.arrowHeadWidth / 2);
                var hy2 = 0 - (this.arrowHeadWidth / 2);
                var hx = x1;
                var top_3 = "M " + bx1 + " " + by1 + " H " + bx2;
                var right = "V " + by2;
                var bottom = "H " + bx1;
                var left = "V " + ny1 + " H " + nx + " V " + hy1 + " L " + hx + " " + cy + " L " + nx + " " + hy2 + " V " + ny2 + " H " + bx1 + " V " + by1;
                this.svgPath.setAttribute("d", top_3 + " " + right + " " + bottom + " " + left + " z");
            }
            else if (this.direction == "right") {
                var x1 = -(this.width / 2);
                var y1 = -(this.height / 2);
                var x2 = (this.width / 2);
                var y2 = (this.height / 2);
                var bx1 = x1;
                var by1 = y1;
                var bx2 = x2 - this.arrowHeadHeight - this.arrowNeckHeight;
                var by2 = y2;
                var ny1 = 0 - (this.arrowNeckWidth / 2);
                var ny2 = 0 + (this.arrowNeckWidth / 2);
                var nx = bx2 + this.arrowNeckHeight;
                var cy = 0;
                var hy1 = 0 - (this.arrowHeadWidth / 2);
                var hy2 = 0 + (this.arrowHeadWidth / 2);
                var hx = x2;
                var top_4 = "M " + bx1 + " " + by1 + " H " + bx2;
                var right = "V " + ny1 + " H " + nx + " V " + hy1 + " L " + hx + " " + cy + " L " + nx + " " + hy2 + " V " + ny2 + " H " + bx2 + " V " + by2;
                var bottom = "H " + bx1;
                var left = "V " + by1;
                this.svgPath.setAttribute("d", top_4 + " " + right + " " + bottom + " " + left + " z");
            }
            else {
                var x1 = -(this.width / 2);
                var y1 = -(this.height / 2);
                var x2 = (this.width / 2);
                var y2 = (this.height / 2);
                var bx1 = x1;
                var by1 = y1;
                var bx2 = x2;
                var by2 = y2 - this.arrowHeadHeight - this.arrowNeckHeight;
                var nx1 = -(this.arrowNeckWidth / 2);
                var nx2 = (this.arrowNeckWidth / 2);
                var ny = by2 + this.arrowNeckHeight;
                var cx = 0;
                var hx1 = -(this.arrowHeadWidth / 2);
                var hx2 = (this.arrowHeadWidth / 2);
                var hy = y2;
                var top_5 = "M " + bx1 + " " + by1 + " H " + bx2;
                var right = "V " + by2;
                var bottom = "H " + nx2 + " V " + ny + " H " + hx2 + " L " + cx + " " + hy + " L " + hx1 + " " + ny + " H " + nx1 + " V " + by2 + " H " + bx1;
                var left = "V " + by1;
                this.svgPath.setAttribute("d", top_5 + " " + right + " " + bottom + " " + left + " z");
            }
        };
        Object.defineProperty(ShapeArrowCallout.prototype, "shape", {
            get: function () {
                switch (this.direction) {
                    case "up": return "msoShapeUpArrowCallout";
                    case "left": return "msoShapeLeftArrowCallout";
                    case "right": return "msoShapeRightArrowCallout";
                    case "down": return "msoShapeDownArrowCallout";
                }
                return "msoShapeDownArrowCallout";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShapeArrowCallout.prototype, "VBAAdjustments", {
            get: function () {
                if (this.direction == "up") {
                    var neckWidthRatio = this.arrowNeckWidth / this.height;
                    var headWidthRatio = this.arrowHeadWidth / (this.height * 2);
                    var headHeightRatio = this.arrowHeadHeight / this.height;
                    var boxHeightRatio = this.boxHeight / this.height;
                    return [neckWidthRatio, headWidthRatio, headHeightRatio, boxHeightRatio];
                }
                else if (this.direction == "right") {
                    var neckWidthRatio = this.arrowNeckWidth / this.height;
                    var headWidthRatio = this.arrowHeadWidth / (this.height * 2);
                    var headHeightRatio = this.arrowHeadHeight / this.height;
                    var boxWidthRatio = this.boxWidth / this.width;
                    return [neckWidthRatio, headWidthRatio, headHeightRatio, boxWidthRatio];
                }
                else if (this.direction == "left") {
                    var neckWidthRatio = this.arrowNeckWidth / this.height;
                    var headWidthRatio = this.arrowHeadWidth / (this.height * 2);
                    var headHeightRatio = this.arrowHeadHeight / this.height;
                    var boxWidthRatio = this.boxWidth / this.width;
                    return [neckWidthRatio, headWidthRatio, headHeightRatio, boxWidthRatio];
                }
                else {
                    var neckWidthRatio = this.arrowNeckWidth / this.height;
                    var headWidthRatio = this.arrowHeadWidth / (this.height * 2);
                    var headHeightRatio = this.arrowHeadHeight / this.height;
                    var boxHeightRatio = this.boxHeight / this.height;
                    return [neckWidthRatio, headWidthRatio, headHeightRatio, boxHeightRatio];
                }
            },
            enumerable: true,
            configurable: true
        });
        ShapeArrowCallout.prototype.getLocation = function (type, x, y) {
            var wr = this.width / 2;
            var hr = this.height / 2;
            switch (type) {
                case GraphTableSVG.ConnectorPosition.Top:
                    return [this.x, this.y - hr];
                case GraphTableSVG.ConnectorPosition.TopRight:
                case GraphTableSVG.ConnectorPosition.Right:
                case GraphTableSVG.ConnectorPosition.BottomRight:
                    return [this.x + wr, this.y];
                case GraphTableSVG.ConnectorPosition.Bottom:
                    return [this.x, this.y + hr];
                case GraphTableSVG.ConnectorPosition.BottomLeft:
                case GraphTableSVG.ConnectorPosition.Left:
                case GraphTableSVG.ConnectorPosition.TopLeft:
                    return [this.x - wr, this.y];
                default:
                    var autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        };
        ShapeArrowCallout.prototype.getAutoPosition = function (x, y) {
            var wr = this.width / 2;
            var hr = this.height / 2;
            var line1 = new GraphTableSVG.VLine(this.x, this.y, this.x + wr, this.y + hr);
            var line2 = new GraphTableSVG.VLine(this.x, this.y, this.x + wr, this.y - hr);
            var b1 = line1.contains(x, y);
            var b2 = line2.contains(x, y);
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
        };
        return ShapeArrowCallout;
    }(GraphTableSVG.GPathTextBox));
    GraphTableSVG.ShapeArrowCallout = ShapeArrowCallout;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GVirtualSubTree = (function () {
        function GVirtualSubTree(_root) {
            this.subTreeRoot = _root;
        }
        Object.defineProperty(GVirtualSubTree.prototype, "children", {
            get: function () {
                var p = this;
                return this.subTreeRoot.children.map(function (x, i, arr) {
                    return x;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GVirtualSubTree.prototype, "parentEdge", {
            get: function () {
                return this.subTreeRoot.parentEdge;
            },
            enumerable: true,
            configurable: true
        });
        GVirtualSubTree.prototype.getSubtree = function (result) {
            if (result === void 0) { result = []; }
            result.push(this.subTreeRoot);
            var children = this.children;
            if (children.length == 0) {
                return result;
            }
            else {
                children.forEach(function (x, i, arr) {
                    x.tree.getSubtree(result);
                });
                return result;
            }
        };
        GVirtualSubTree.prototype.getHeight = function () {
            var children = this.children;
            if (children.length == 0) {
                return 1;
            }
            else {
                var max_2 = 0;
                children.forEach(function (x, i, arr) {
                    if (max_2 < x.tree.getHeight())
                        max_2 = x.tree.getHeight();
                });
                return max_2 + 1;
            }
        };
        GVirtualSubTree.prototype.region = function () {
            var p = this.getSubtree();
            var minX = this.subTreeRoot.x;
            var maxX = this.subTreeRoot.x;
            var minY = this.subTreeRoot.y;
            var maxY = this.subTreeRoot.y;
            p.forEach(function (x, i, arr) {
                var rect = x.region;
                if (minX > rect.x)
                    minX = rect.x;
                if (maxX < rect.right)
                    maxX = rect.right;
                if (minY > rect.y)
                    minY = rect.y;
                if (maxY < rect.bottom)
                    maxY = rect.bottom;
            });
            var result = new GraphTableSVG.Rectangle();
            result.x = minX;
            result.y = minY;
            result.width = maxX - minX;
            result.height = maxY - minY;
            return result;
        };
        Object.defineProperty(GVirtualSubTree.prototype, "mostLeftLeave", {
            get: function () {
                return this.leaves[0];
            },
            enumerable: true,
            configurable: true
        });
        GVirtualSubTree.prototype.addOffset = function (_x, _y) {
            this.getSubtree().forEach(function (x, i, arr) {
                x.cx += _x;
                x.cy += _y;
            });
        };
        GVirtualSubTree.prototype.setRectangleLocation = function (_x, _y) {
            var x = this.mostLeftLeave.region.x;
            var y = this.subTreeRoot.region.y;
            var diffX = _x - x;
            var diffY = _y - y;
            this.addOffset(diffX, diffY);
        };
        GVirtualSubTree.prototype.setRootLocation = function (_x, _y) {
            var x = this.subTreeRoot.cx;
            var y = this.subTreeRoot.cy;
            var diffX = _x - x;
            var diffY = _y - y;
            this.addOffset(diffX, diffY);
        };
        Object.defineProperty(GVirtualSubTree.prototype, "leaves", {
            get: function () {
                var p = this;
                return this.getSubtree().filter(function (x, i, arr) {
                    return x.outcomingEdges.length == 0;
                });
            },
            enumerable: true,
            configurable: true
        });
        return GVirtualSubTree;
    }());
    GraphTableSVG.GVirtualSubTree = GVirtualSubTree;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var CustomAttributeNames;
    (function (CustomAttributeNames) {
        var Style;
        (function (Style) {
            Style.autoSizeShapeToFitTextName = "--autosize-shape-to-fit-text";
            Style.beginConnectorTypeName = "--begin-connector-type";
            Style.endConnectorTypeName = "--end-connector-type";
            Style.defaultLineClass = "--default-line-class";
            Style.markerStartName = "--marker-start";
            Style.markerEndName = "--marker-end";
            Style.defaultVertexClass = "--default-vertex-class";
            Style.defaultEdgeClass = "--default-edge-class";
            Style.vertexXIntervalName = "--vertex-x-interval";
            Style.vertexYIntervalName = "--vertex-y-interval";
            Style.defaultRadiusName = "--default-radius";
            Style.defaultWidthName = "--default-width";
            Style.defaultHeightName = "--default-height";
            Style.defaultTextClass = "--default-text-class";
            Style.defaultPathClass = "--default-path-class";
            Style.defaulSurfaceClass = "--default-surface-class";
            Style.defaultSurfaceType = "--default-surface-type";
        })(Style = CustomAttributeNames.Style || (CustomAttributeNames.Style = {}));
        CustomAttributeNames.beginNodeName = "data-begin-node";
        CustomAttributeNames.endNodeName = "data-end-node";
        CustomAttributeNames.controlPointName = "data-control-point";
        CustomAttributeNames.connectPositionChangedEventName = "connect_position_changed";
        CustomAttributeNames.vertexCreatedEventName = "vertex_created";
        CustomAttributeNames.objectCreatedEventName = "object_created";
        CustomAttributeNames.objectIDName = "data-objectID";
        CustomAttributeNames.defaultCircleRadius = 15;
    })(CustomAttributeNames = GraphTableSVG.CustomAttributeNames || (GraphTableSVG.CustomAttributeNames = {}));
    function openCustomElement(id) {
        if (typeof id == "string") {
            var item = document.getElementById(id);
            if (item instanceof SVGElement) {
                return GraphTableSVG.openCustomElement(item);
            }
            else {
                return null;
            }
        }
        else {
            var element = id;
            var type = GraphTableSVG.ShapeObjectType.toShapeObjectType(element.nodeName);
            if (type != null) {
                return createCustomElement(element, type);
            }
        }
    }
    GraphTableSVG.openCustomElement = openCustomElement;
    function createCustomElement(e, type) {
        var parent = e.parentElement;
        if (parent instanceof SVGElement) {
            var r_3;
            if (type == GraphTableSVG.ShapeObjectType.Callout) {
                var option = GraphTableSVG.GCallout.constructAttributes(e, true);
                r_3 = new GraphTableSVG.GCallout(parent, option);
            }
            else if (type == GraphTableSVG.ShapeObjectType.ShapeArrowCallout) {
                var option = GraphTableSVG.ShapeArrowCallout.constructAttributes(e, true);
                r_3 = new GraphTableSVG.ShapeArrowCallout(parent, option);
            }
            else if (type == GraphTableSVG.ShapeObjectType.Ellipse) {
                var option = GraphTableSVG.GTextBox.constructAttributes(e, true);
                r_3 = new GraphTableSVG.GEllipse(parent, option);
            }
            else if (type == GraphTableSVG.ShapeObjectType.Rect) {
                var option = GraphTableSVG.GTextBox.constructAttributes(e, true);
                r_3 = new GraphTableSVG.GRect(parent, option);
            }
            else if (type == GraphTableSVG.ShapeObjectType.Edge) {
                var option = GraphTableSVG.GEdge.constructAttributes(e, true);
                r_3 = new GraphTableSVG.GEdge(parent, option);
            }
            else if (type == GraphTableSVG.ShapeObjectType.Graph) {
                var option = GraphTableSVG.GTextBox.constructAttributes(e, true);
                r_3 = new GraphTableSVG.GGraph(parent, option);
            }
            else {
                return null;
            }
            var attrs = e.gtGetAttributes();
            HTMLFunctions.getChildren(e).forEach(function (v) { return r_3.svgGroup.appendChild(v); });
            e.remove();
            attrs.forEach(function (v) { return r_3.svgGroup.setAttribute(v.name, v.value); });
            return r_3;
        }
        else {
            throw Error("error!");
        }
    }
    function openSVG(id, output) {
        if (output === void 0) { output = []; }
        if (typeof id == "string") {
            var item = document.getElementById(id);
            if (item != null && item instanceof SVGSVGElement) {
                return GraphTableSVG.openSVG(item, output);
            }
            else {
                return [];
            }
        }
        else {
            var element = id;
            var _loop_4 = function () {
                var b = false;
                HTMLFunctions.getChildren(element).forEach(function (v) {
                    if (v instanceof SVGElement) {
                        var p = GraphTableSVG.openCustomElement(v);
                        if (p != null) {
                            output.push(p);
                            b = true;
                        }
                        else {
                            openSVG(v, output);
                        }
                    }
                });
                if (!b)
                    return "break";
            };
            while (true) {
                var state_1 = _loop_4();
                if (state_1 === "break")
                    break;
            }
            return output;
        }
    }
    GraphTableSVG.openSVG = openSVG;
    function createShape(parent, type, option) {
        if (option === void 0) { option = {}; }
        var _parent;
        if (parent instanceof GraphTableSVG.GObject) {
            _parent = parent.svgGroup;
        }
        else if (parent instanceof SVGElement) {
            _parent = parent;
        }
        else {
            _parent = document.getElementById(parent);
        }
        switch (type) {
            case GraphTableSVG.ShapeObjectType.Callout: return new GraphTableSVG.GCallout(_parent, option);
            case GraphTableSVG.ShapeObjectType.ShapeArrowCallout: return new GraphTableSVG.ShapeArrowCallout(_parent, option);
            case GraphTableSVG.ShapeObjectType.Ellipse: return new GraphTableSVG.GEllipse(_parent, option);
            case GraphTableSVG.ShapeObjectType.Rect: return new GraphTableSVG.GRect(_parent, option);
            case GraphTableSVG.ShapeObjectType.Edge: return new GraphTableSVG.GEdge(_parent, option);
            case GraphTableSVG.ShapeObjectType.Graph: return new GraphTableSVG.GGraph(_parent, option);
        }
        throw Error("error");
    }
    GraphTableSVG.createShape = createShape;
    function createVertex(parent, option) {
        if (option === void 0) { option = {}; }
        var _parent = parent.svgGroup;
        if (option.class == undefined && parent.defaultVertexClass != null)
            option.class = parent.defaultVertexClass;
        var type = option.class == undefined ? null : parent.getStyleValue(option.class, CustomAttributeNames.Style.defaultSurfaceType);
        if (type != null) {
            switch (type) {
                case GraphTableSVG.ShapeObjectType.Callout: return new GraphTableSVG.GCallout(_parent, option);
                case GraphTableSVG.ShapeObjectType.ShapeArrowCallout: return new GraphTableSVG.ShapeArrowCallout(_parent, option);
                case GraphTableSVG.ShapeObjectType.Ellipse: return new GraphTableSVG.GEllipse(_parent, option);
                case GraphTableSVG.ShapeObjectType.Rect: return new GraphTableSVG.GRect(_parent, option);
            }
        }
        return new GraphTableSVG.GEllipse(_parent, option);
    }
    GraphTableSVG.createVertex = createVertex;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var Parse;
    (function (Parse) {
        function parseTree(parseText) {
            var _a = parseTreeSub(parseText, 0), tree = _a[0], pos = _a[1];
            return tree;
        }
        Parse.parseTree = parseTree;
        function parseTreeSub(str, pos) {
            var node = new GraphTableSVG.LogicTree({ item: "" });
            var c = str[pos];
            if (c != '(') {
                throw Error("Parse Error");
            }
            else {
                pos++;
                while (true) {
                    var c2 = str[pos];
                    if (c2 == ')') {
                        break;
                    }
                    else if (c2 == '(') {
                        var _a = parseTreeSub(str, pos++), child = _a[0], newPos = _a[1];
                        node.children.push(child);
                        pos = newPos + 1;
                    }
                    else {
                        pos++;
                    }
                }
                return [node, pos];
            }
        }
        function getParseString(tree) {
            var str = "";
            str += "(";
            tree.outcomingEdges.forEach(function (v) {
                if (v.endVertex != null) {
                    str += getParseString(v.endVertex);
                }
            });
            str += ")";
            return str;
        }
        Parse.getParseString = getParseString;
    })(Parse = GraphTableSVG.Parse || (GraphTableSVG.Parse = {}));
})(GraphTableSVG || (GraphTableSVG = {}));
var HTMLFunctions;
(function (HTMLFunctions) {
    function getAncestorAttribute(e, attr) {
        if (e.hasAttribute(attr)) {
            return e.getAttribute(attr);
        }
        else {
            if (e.parentElement == null) {
                return null;
            }
            else {
                return getAncestorAttribute(e.parentElement, attr);
            }
        }
    }
    HTMLFunctions.getAncestorAttribute = getAncestorAttribute;
    function getDescendants(e) {
        var r = [];
        r.push(e);
        for (var i = 0; i < e.children.length; i++) {
            var p = e.children.item(i);
            if (p instanceof Element) {
                getDescendants(p).forEach(function (v) { return r.push(v); });
            }
        }
        return r;
    }
    HTMLFunctions.getDescendants = getDescendants;
    function getChildren(e) {
        var r = [];
        for (var i = 0; i < e.children.length; i++) {
            var p = e.children.item(i);
            if (p instanceof Element) {
                r.push(p);
            }
        }
        return r;
    }
    HTMLFunctions.getChildren = getChildren;
})(HTMLFunctions || (HTMLFunctions = {}));
CSSStyleDeclaration.prototype.tryGetPropertyValue = function (name) {
    var p = this;
    var r = p.getPropertyValue(name).trim();
    if (r.length == 0) {
        return null;
    }
    else {
        return r;
    }
};
SVGTextPathElement.prototype.setTextContent = function (text, isLatexMode) {
    if (isLatexMode === void 0) { isLatexMode = false; }
    GraphTableSVG.SVG.setTextToTextPath(this, text, isLatexMode);
};
SVGLineElement.prototype.getEmphasis = function () {
    var p = this;
    var emp = p.getAttribute("class");
    if (emp != null) {
        return emp == GraphTableSVG.Cell.emphasisBorderClass;
    }
    else {
        return false;
    }
};
SVGLineElement.prototype.setEmphasis = function (value) {
    if (GraphTableSVG.Common.getGraphTableCSS() == null)
        GraphTableSVG.Common.setGraphTableCSS("yellow", "red");
    var p = this;
    if (p.getEmphasis() && !value) {
        var tmp = p.getAttribute(GraphTableSVG.Cell.temporaryBorderClass);
        if (tmp != null) {
            p.setAttribute("class", tmp);
            p.removeAttribute(GraphTableSVG.Cell.temporaryBorderClass);
        }
        else {
            p.removeAttribute("class");
            p.removeAttribute(GraphTableSVG.Cell.temporaryBorderClass);
        }
    }
    else if (!p.getEmphasis() && value) {
        var lineClass = p.getAttribute("class");
        p.setAttribute("class", GraphTableSVG.Cell.emphasisBorderClass);
        if (lineClass != null) {
            p.setAttribute(GraphTableSVG.Cell.temporaryBorderClass, lineClass);
        }
    }
};
SVGPathElement.prototype.setPathLocations = function (points) {
    var p = this;
    var s = "";
    for (var i = 0; i < points.length; i++) {
        s += (i == 0 ? "M" : "L") + " " + points[i][0] + " " + points[i][1] + " ";
    }
    p.setAttribute("d", s);
};
SVGPathElement.prototype.getPathLocations = function () {
    var p = this;
    var info = p.getAttribute("d");
    if (info == null)
        return [];
    var r = [];
    var pos = [0, 0];
    var pathType = "";
    info.split(" ").forEach(function (v, i) {
        if (i % 3 == 0) {
            pathType = v;
        }
        else if (i % 3 == 1) {
            pos[0] = parseInt(v);
        }
        else {
            pos[1] = parseInt(v);
            r.push(pos);
            pos = [0, 0];
        }
    });
    return r;
};
SVGGElement.prototype.getX = function () {
    var p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    return p.transform.baseVal.getItem(0).matrix.e;
};
SVGGElement.prototype.setX = function (value) {
    var p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    var a = this.transform.baseVal.getItem(0).matrix.a;
    var b = this.transform.baseVal.getItem(0).matrix.b;
    var c = this.transform.baseVal.getItem(0).matrix.c;
    var d = this.transform.baseVal.getItem(0).matrix.d;
    var e = value;
    var f = this.transform.baseVal.getItem(0).matrix.f;
    p.setAttribute('transform', "matrix(" + a + " " + b + " " + c + " " + d + " " + e + " " + f + ")");
};
SVGGElement.prototype.getY = function () {
    var p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    return this.transform.baseVal.getItem(0).matrix.f;
};
SVGGElement.prototype.setY = function (value) {
    var p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    var a = this.transform.baseVal.getItem(0).matrix.a;
    var b = this.transform.baseVal.getItem(0).matrix.b;
    var c = this.transform.baseVal.getItem(0).matrix.c;
    var d = this.transform.baseVal.getItem(0).matrix.d;
    var e = this.transform.baseVal.getItem(0).matrix.e;
    var f = value;
    p.setAttribute('transform', "matrix(" + a + " " + b + " " + c + " " + d + " " + e + " " + f + ")");
};
SVGElement.prototype.gtGetAttribute = function (name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    var item = this;
    var value = item.getAttribute(name);
    if (value != null) {
        return value;
    }
    else {
        return defaultValue;
    }
};
SVGElement.prototype.gtGetAttributes = function () {
    var p = this;
    var r = [];
    for (var i = 0; i < p.attributes.length; i++) {
        var item = p.attributes.item(i);
        if (item != null) {
            r.push({ name: item.name, value: item.value });
        }
    }
    return r;
};
SVGElement.prototype.getActiveStyle = function () {
    var p = this;
    var r = p.getAttribute("class");
    if (r == null) {
        return p.style;
    }
    else {
        return getComputedStyle(p);
    }
};
SVGElement.prototype.gtGetAttributeNumber = function (name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    var item = this;
    var value = item.getAttribute(name);
    if (value != null) {
        return Number(value);
    }
    else {
        return defaultValue;
    }
};
SVGElement.prototype.gtGetAttributeNumber2 = function (name) {
    var item = this;
    var value = item.getAttribute(name);
    if (value != null) {
        return Number(value);
    }
    else {
        return undefined;
    }
};
SVGElement.prototype.gtGetAttributeNumberWithoutNull = function (name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 0; }
    var item = this;
    var value = item.getAttribute(name);
    if (value != null) {
        return Number(value);
    }
    else {
        return defaultValue;
    }
};
SVGElement.prototype.getPropertyStyleValueWithDefault = function (name, defaultValue) {
    var item = this;
    var p = item.getPropertyStyleValue(name);
    if (p == null) {
        return defaultValue;
    }
    else {
        return p;
    }
};
SVGElement.prototype.getPropertyStyleValue = function (name) {
    var item = this;
    var p = item.style.getPropertyValue(name).trim();
    if (p.length == 0) {
        var r = item.getAttribute("class");
        if (r == null) {
            return null;
        }
        else {
            var css = getComputedStyle(item);
            var p2 = css.getPropertyValue(name).trim();
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
SVGElement.prototype.getPropertyStyleNumberValue = function (name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    var item = this;
    var p = item.getPropertyStyleValue(name);
    if (p != null) {
        return GraphTableSVG.Common.toPX(p);
    }
    else {
        return defaultValue;
    }
};
SVGElement.prototype.setPropertyStyleValue = function (name, value) {
    var item = this;
    item.style.setProperty(name, value);
};
SVGElement.prototype.getPaddingTop = function () {
    var p = this;
    return p.getPropertyStyleNumberValue("--padding-top", 0);
};
SVGElement.prototype.getPaddingLeft = function () {
    var p = this;
    return p.getPropertyStyleNumberValue("--padding-left", 0);
};
SVGElement.prototype.getPaddingRight = function () {
    var p = this;
    return p.getPropertyStyleNumberValue("--padding-right", 0);
};
SVGElement.prototype.getPaddingBottom = function () {
    var p = this;
    return p.getPropertyStyleNumberValue("--padding-bottom", 0);
};
SVGTextElement.prototype.gtSetXY = function (rect, vAnchor, hAnchor, isAutoSizeShapeToFitText) {
    var text = this;
    var x = rect.x;
    var y = rect.y;
    text.setAttribute('x', x.toString());
    text.setAttribute('y', y.toString());
    var b2 = text.getBBox();
    var dy = b2.y - y;
    var dx = b2.x - x;
    y -= dy;
    x -= dx;
    if (vAnchor == GraphTableSVG.VerticalAnchor.Middle) {
        y += (rect.height - b2.height) / 2;
    }
    else if (vAnchor == GraphTableSVG.VerticalAnchor.Bottom) {
        y += rect.height - b2.height;
    }
    if (hAnchor == GraphTableSVG.HorizontalAnchor.Center) {
        x += (rect.width - b2.width) / 2;
    }
    else if (hAnchor == GraphTableSVG.HorizontalAnchor.Right) {
        x += rect.width - b2.width;
    }
    text.setAttribute('y', y.toString());
    text.setAttribute('x', x.toString());
};
SVGTextElement.prototype.getMarginLeft = function () {
    var p = this;
    return p.getPropertyStyleNumberValue("--margin-left", 0);
};
SVGTextElement.prototype.setMarginLeft = function (value) {
    var p = this;
    p.setPropertyStyleValue("--margin-left", value.toString());
};
SVGTextElement.prototype.getMarginTop = function () {
    var p = this;
    return p.getPropertyStyleNumberValue("--margin-top", 0);
};
SVGTextElement.prototype.setMarginTop = function (value) {
    var p = this;
    p.setPropertyStyleValue("--margin-top", value.toString());
};
SVGTextElement.prototype.getMarginRight = function () {
    var p = this;
    return p.getPropertyStyleNumberValue("--margin-right", 0);
};
SVGTextElement.prototype.setMarginRight = function (value) {
    var p = this;
    p.setPropertyStyleValue("--margin-right", value.toString());
};
SVGTextElement.prototype.getMarginBottom = function () {
    var p = this;
    return p.getPropertyStyleNumberValue("--margin-bottom", 0);
};
SVGTextElement.prototype.setMarginBottom = function (value) {
    var p = this;
    p.setPropertyStyleValue("--margin-bottom", value.toString());
};
SVGTextElement.prototype.setTextContent = function (text, isLatexMode) {
    if (isLatexMode === void 0) { isLatexMode = false; }
    GraphTableSVG.SVG.setTextToSVGText(this, text, isLatexMode);
};
SVGTextElement.prototype.getX = function () {
    var p = this;
    if (p.x.baseVal.numberOfItems == 0) {
        p.setAttribute('x', "0");
    }
    return p.x.baseVal.getItem(0).value;
};
SVGTextElement.prototype.setX = function (value) {
    var p = this;
    if (p.x.baseVal.numberOfItems == 0) {
        p.setAttribute('x', "0");
    }
    p.x.baseVal.getItem(0).value = value;
};
SVGTextElement.prototype.getY = function () {
    var p = this;
    if (p.y.baseVal.numberOfItems == 0) {
        p.setAttribute('y', "0");
    }
    return p.y.baseVal.getItem(0).value;
};
SVGTextElement.prototype.setY = function (value) {
    var p = this;
    if (p.y.baseVal.numberOfItems == 0) {
        p.setAttribute('y', "0");
    }
    p.y.baseVal.getItem(0).value = value;
};
//# sourceMappingURL=graph_table_svg.js.map