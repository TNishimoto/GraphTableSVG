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
                return null;
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
                var width = svgLine.getPropertyStyleNumberValue("stroke-width", null);
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
    })(ConnectorPosition = GraphTableSVG.ConnectorPosition || (GraphTableSVG.ConnectorPosition = {}));
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
    GraphTableSVG.ToVBAConnectorPosition = ToVBAConnectorPosition;
    function ToConnectorPosition(str) {
        if (str == null) {
            return ConnectorPosition.Auto;
        }
        else {
            return str;
        }
    }
    GraphTableSVG.ToConnectorPosition = ToConnectorPosition;
    GraphTableSVG.VerticalAnchorPropertyName = "--vertical-anchor";
    GraphTableSVG.PathTextAlignmentName = "--path-text-alignment";
    var VerticalAnchor;
    (function (VerticalAnchor) {
        VerticalAnchor.Top = "top";
        VerticalAnchor.Middle = "middle";
        VerticalAnchor.Bottom = "bottom";
    })(VerticalAnchor = GraphTableSVG.VerticalAnchor || (GraphTableSVG.VerticalAnchor = {}));
    GraphTableSVG.HorizontalAnchorPropertyName = "--horizontal-anchor";
    var HorizontalAnchor;
    (function (HorizontalAnchor) {
        HorizontalAnchor.Left = "left";
        HorizontalAnchor.Center = "center";
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
            var _this = _super.call(this, { item: item, children: [left, right], vertexText: nodeText, parentEdgeText: edgeLabel }) || this;
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
            if (option.tableClassName == undefined)
                option.tableClassName = null;
            this.tableClassName = option.tableClassName;
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
            var table = new LogicTable({ columnCount: str[0].length, rowCount: str.length, tableClassName: tableClassName });
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
            line1.setAttribute("d", "M " + x + " " + y + " M " + x2 + " " + y2);
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
                var width = rect.getPropertyStyleNumberValue(SVG.defaultWidthName, null);
                if (width != null) {
                    rect.width.baseVal.value = width;
                }
                var height = rect.getPropertyStyleNumberValue(SVG.defaultHeightName, null);
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
        SVG.defaultRadiusName = "--default-radius";
        SVG.defaultWidthName = "--default-width";
        SVG.defaultHeightName = "--default-height";
        SVG.defaultCircleRadius = 15;
        function createCircle(parent, className) {
            if (className === void 0) { className = null; }
            var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            parent.appendChild(circle);
            circle.r.baseVal.value = SVG.defaultCircleRadius;
            if (className == null) {
                circle.style.stroke = "black";
                circle.style.strokeWidth = "1pt";
                circle.style.fill = "#ffffff";
            }
            else {
                circle.setAttribute("class", className);
                var radius = circle.getPropertyStyleNumberValue(SVG.defaultRadiusName, null);
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
    var AdjacencyMatrix = (function () {
        function AdjacencyMatrix() {
        }
        return AdjacencyMatrix;
    }());
    GraphTableSVG.AdjacencyMatrix = AdjacencyMatrix;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var Edge = (function () {
        function Edge(__graph, g) {
            var _this = this;
            this.observerFunc = function (x) {
                var b = false;
                for (var i = 0; i < x.length; i++) {
                    var p = x[i];
                    b = true;
                }
                if (b)
                    _this.update();
            };
            this._beginVertex = null;
            this._endVertex = null;
            this._graph = null;
            this.VBAConnectorNumber = 1;
            this._svgGroup = g;
            this.svgGroup.setAttribute(GraphTableSVG.Graph.objectIDName, (GraphTableSVG.Graph.idCounter++).toString());
            this.svgGroup.setAttribute(GraphTableSVG.Graph.typeName, "edge");
            var t1 = this.svgGroup.getPropertyStyleValue(Edge.beginConnectorTypeName);
            var t2 = this.svgGroup.getPropertyStyleValue(Edge.endConnectorTypeName);
            this.beginConnectorType = GraphTableSVG.ToConnectorPosition(t1);
            this.endConnectorType = GraphTableSVG.ToConnectorPosition(t2);
            this._graph = __graph;
            this._graph.add(this);
            this._observer = new MutationObserver(this.observerFunc);
            var option1 = { attributes: true };
            this._observer.observe(this.svgGroup, option1);
            var lineClass = this.svgGroup.getPropertyStyleValue(Edge.defaultLineClass);
            this._svgPath = GraphTableSVG.SVG.createPath(this.svgGroup, 0, 0, 0, 0, lineClass);
            this._svgPath.id = "path-" + this.objectID;
            var textClass = this.svgGroup.getPropertyStyleValue(Edge.defaultTextClass);
            _a = GraphTableSVG.SVG.createTextPath(textClass), this._svgText = _a[0], this._svgTextPath = _a[1];
            this.svgGroup.appendChild(this._svgText);
            this._svgText.appendChild(this._svgTextPath);
            this._svgTextPath.href.baseVal = "#" + this._svgPath.id;
            var markerStartName = this.svgGroup.getPropertyStyleValue(Edge.markerStartName);
            var markerEndName = this.svgGroup.getPropertyStyleValue(Edge.markerEndName);
            var edgeColor = this.svgPath.getPropertyStyleValue("stroke");
            var strokeWidth = this.svgPath.getPropertyStyleValue("stroke-width");
            if (markerStartName == "true")
                this.markerStart = GraphTableSVG.Edge.createStartMarker({ color: edgeColor, strokeWidth: strokeWidth });
            if (markerEndName == "true")
                this.markerEnd = GraphTableSVG.Edge.createEndMarker({ color: edgeColor, strokeWidth: strokeWidth });
            var _a;
        }
        Object.defineProperty(Edge.prototype, "svgTextPath", {
            get: function () {
                return this._svgTextPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "markerStart", {
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
        Object.defineProperty(Edge.prototype, "markerEnd", {
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
        Object.defineProperty(Edge.prototype, "controlPoint", {
            get: function () {
                var str = this.svgPath.getAttribute(Edge.controlPointName);
                if (str != null) {
                    var p = JSON.parse(str);
                    return p;
                }
                else {
                    this.controlPoint = [];
                    return [];
                }
            },
            set: function (value) {
                var str = JSON.stringify(value);
                this.svgPath.setAttribute(Edge.controlPointName, str);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "strokeDasharray", {
            get: function () {
                if (this.svgPath != null) {
                    var s = this.svgPath.getPropertyStyleValue("stroke-dasharray");
                    return s;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                if (this.svgPath != null) {
                    if (value != null) {
                        this.svgPath.setPropertyStyleValue("stroke-dasharray", value);
                    }
                    else {
                        this.svgPath.removeAttribute("stroke-dasharray");
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "lineColor", {
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
        Object.defineProperty(Edge.prototype, "svgGroup", {
            get: function () {
                return this._svgGroup;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "svgPath", {
            get: function () {
                return this._svgPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "svgText", {
            get: function () {
                return this._svgText;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "beginConnectorType", {
            get: function () {
                var p = this.svgGroup.getPropertyStyleValue(Edge.beginConnectorTypeName);
                if (p == null) {
                    return GraphTableSVG.ConnectorPosition.Auto;
                }
                else {
                    return p;
                }
            },
            set: function (value) {
                this.svgGroup.setPropertyStyleValue(Edge.beginConnectorTypeName, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "endConnectorType", {
            get: function () {
                var p = this.svgGroup.getPropertyStyleValue(Edge.endConnectorTypeName);
                if (p == null) {
                    return GraphTableSVG.ConnectorPosition.Auto;
                }
                else {
                    return p;
                }
            },
            set: function (value) {
                this.svgGroup.setPropertyStyleValue(Edge.endConnectorTypeName, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "beginVertex", {
            get: function () {
                return this._beginVertex;
            },
            set: function (value) {
                var prev = this._beginVertex;
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
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "endVertex", {
            get: function () {
                return this._endVertex;
            },
            set: function (value) {
                var prev = this._endVertex;
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
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "graph", {
            get: function () {
                return this._graph;
            },
            enumerable: true,
            configurable: true
        });
        Edge.prototype.dispose = function () {
            this.beginVertex = null;
            this.endVertex = null;
            var prev = this.graph;
            this._graph = null;
            if (prev != null) {
                prev.remove(this);
            }
        };
        Object.defineProperty(Edge.prototype, "isDisposed", {
            get: function () {
                return this.graph == null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "x1", {
            get: function () {
                if (this.beginVertex != null && this.endVertex != null) {
                    var _a = this.beginVertex.getLocation(this.beginConnectorType, this.endVertex.x, this.endVertex.y), x1 = _a[0], y1 = _a[1];
                    return x1;
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "y1", {
            get: function () {
                if (this.beginVertex != null && this.endVertex != null) {
                    var _a = this.beginVertex.getLocation(this.beginConnectorType, this.endVertex.x, this.endVertex.y), x1 = _a[0], y1 = _a[1];
                    return y1;
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "x2", {
            get: function () {
                if (this.beginVertex != null && this.endVertex != null) {
                    var _a = this.endVertex.getLocation(this.endConnectorType, this.beginVertex.x, this.beginVertex.y), x2 = _a[0], y2 = _a[1];
                    return x2;
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "y2", {
            get: function () {
                if (this.beginVertex != null && this.endVertex != null) {
                    var _a = this.endVertex.getLocation(this.endConnectorType, this.beginVertex.x, this.beginVertex.y), x2 = _a[0], y2 = _a[1];
                    return y2;
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Edge.prototype.removeTextLengthAttribute = function () {
            if (this.svgText.hasAttribute("textLength"))
                this.svgText.removeAttribute("textLength");
            if (this.svgTextPath.hasAttribute("textLength"))
                this.svgTextPath.removeAttribute("textLength");
            if (this.svgText.hasAttribute("letter-spacing"))
                this.svgText.removeAttribute("letter-spacing");
        };
        Edge.prototype.setRegularInterval = function (value) {
            this.removeTextLengthAttribute();
            var box = this.svgText.getBBox();
            var diff = value - box.width;
            var number = this.svgText.textContent.length;
            if (number >= 2) {
                var w = diff / (number - 1);
                this.svgText.setAttribute("letter-spacing", "" + w);
            }
            this.svgText.setAttribute("textLength", "" + value);
            this.svgTextPath.setAttribute("textLength", "" + value);
        };
        Edge.prototype.update = function () {
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
            if (this.beginVertex != null && this.endVertex != null) {
                var points = this.controlPoint;
                var path = "";
                if (points.length == 0) {
                    path = "M " + this.x1 + " " + this.y1 + " L " + this.x2 + " " + this.y2;
                }
                else if (points.length == 1) {
                    var _a = points[0], cx1 = _a[0], cy1 = _a[1];
                    path = "M " + this.x1 + " " + this.y1 + " Q " + cx1 + " " + cy1 + " " + this.x2 + " " + this.y2;
                }
                else {
                }
                var prevPath = this.svgPath.getAttribute("d");
                if (prevPath == null || path != prevPath) {
                    this.svgPath.setAttribute("d", path);
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
                    this.removeTextLengthAttribute();
                }
                var strokeWidth = this.svgPath.getPropertyStyleValue("stroke-width");
                if (strokeWidth != null) {
                    this.svgText.setAttribute("dy", "-" + strokeWidth);
                }
                else {
                    this.svgText.setAttribute("dy", "0");
                }
            }
            return false;
        };
        Object.defineProperty(Edge.prototype, "pathTextAlignment", {
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
        Object.defineProperty(Edge.prototype, "objectID", {
            get: function () {
                var r = this.svgGroup.getAttribute(GraphTableSVG.Graph.objectIDName);
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
        Edge.prototype.save = function () {
        };
        Edge.create = function (graph, option) {
            if (option === void 0) { option = {}; }
            if (option.className == undefined)
                option.className = graph.defaultEdgeClass;
            if (option.surfaceType == undefined)
                option.surfaceType = null;
            option.className = option.className != null ? option.className : graph.defaultVertexClass;
            var g = GraphTableSVG.SVG.createGroup(graph.svgGroup, option.className);
            var edge = new Edge(graph, g);
            if (option.beginVertex != undefined && option.endVertex != undefined) {
                graph.connect(option.beginVertex, edge, option.endVertex, option);
            }
            if (option.text != undefined)
                edge.svgTextPath.setTextContent(option.text);
            if (option.pathTextAlignment == undefined)
                option.pathTextAlignment = GraphTableSVG.pathTextAlighnment.center;
            edge.pathTextAlignment = option.pathTextAlignment;
            return edge;
        };
        Edge.prototype.setIndexDictionaryForVBA = function (vertexDic, edgeDic) {
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
        Edge.prototype.createVBACode = function (main, sub, vertexDic, edgeDic) {
            var _this = this;
            if (this.graph != null) {
                var lineArr = [];
                var subline_1 = [];
                if (this.controlPoint.length == 0) {
                    var i = edgeDic[this.objectID];
                    lineArr.push(edgeDic[this.objectID]);
                    subline_1.push(" Set edges(" + i + ") = shapes_.AddConnector(msoConnectorStraight, 0, 0, 0, 0)");
                    if (this.beginVertex != null && this.endVertex != null) {
                        if (this.markerStart != null) {
                            subline_1.push(" edges(" + i + ").Line.BeginArrowheadLength = msoArrowheadLong");
                            subline_1.push(" edges(" + i + ").Line.BeginArrowheadStyle = msoArrowheadTriangle");
                            subline_1.push(" edges(" + i + ").Line.BeginArrowheadWidth = msoArrowheadWide");
                        }
                        if (this.markerEnd != null) {
                            subline_1.push(" edges(" + i + ").Line.EndArrowheadLength = msoArrowheadLong");
                            subline_1.push(" edges(" + i + ").Line.EndArrowheadStyle = msoArrowheadTriangle");
                            subline_1.push(" edges(" + i + ").Line.EndArrowheadWidth = msoArrowheadWide");
                        }
                        var beg = vertexDic[this.beginVertex.objectID];
                        var end = vertexDic[this.endVertex.objectID];
                        var begType = GraphTableSVG.ToVBAConnectorPosition(this.beginVertex.shapeType, this.beginVertex.getConnectorType(this.beginConnectorType, this.endVertex.x, this.endVertex.y));
                        var endType = GraphTableSVG.ToVBAConnectorPosition(this.endVertex.shapeType, this.endVertex.getConnectorType(this.endConnectorType, this.beginVertex.x, this.beginVertex.y));
                        subline_1.push(" Call EditConnector(edges(" + i + ").ConnectorFormat, nodes(" + beg + "), nodes(" + end + "), " + begType + ", " + endType + ")");
                    }
                }
                else if (this.controlPoint.length > 0) {
                    for (var j = 0; j < this.VBAConnectorNumber; j++) {
                        var t = (j + 1) / (this.VBAConnectorNumber + 1);
                        var centerPoint = GraphTableSVG.Common.bezierLocation([this.x1, this.y1], this.controlPoint[0], [this.x2, this.y2], t);
                        var vertexID = vertexDic[this.objectID + "_" + j];
                        subline_1.push("Set nodes(" + vertexID + ") = shapes_.AddShape(msoShapeOval, " + centerPoint[0] + ", " + centerPoint[1] + ", 0, 0)");
                    }
                    for (var j = 0; j <= this.VBAConnectorNumber; j++) {
                        var edgeID = edgeDic[this.objectID + "_" + j];
                        var beg = j == 0 ? vertexDic[this.beginVertex.objectID] : vertexDic[this.objectID + "_" + (j - 1)];
                        var end = j == this.VBAConnectorNumber ? vertexDic[this.endVertex.objectID] : vertexDic[this.objectID + "_" + j];
                        lineArr.push(edgeID);
                        subline_1.push(" Set edges(" + edgeID + ") = shapes_.AddConnector(msoConnectorStraight, 0, 0, 0, 0)");
                        var begType = j == 0 ? GraphTableSVG.ToVBAConnectorPosition(this.beginVertex.shapeType, this.beginVertex.getConnectorType(this.beginConnectorType, this.endVertex.x, this.endVertex.y)) : 1;
                        var endType = j == this.VBAConnectorNumber ? GraphTableSVG.ToVBAConnectorPosition(this.endVertex.shapeType, this.endVertex.getConnectorType(this.endConnectorType, this.beginVertex.x, this.beginVertex.y)) : 1;
                        subline_1.push(" Call EditConnector(edges(" + edgeID + ").ConnectorFormat, nodes(" + beg + "), nodes(" + end + "), " + begType + ", " + endType + ")");
                    }
                    var edgeBeginID = edgeDic[this.objectID + "_" + 0];
                    var edgeEndID = edgeDic[this.objectID + "_" + this.VBAConnectorNumber];
                    if (this.beginVertex != null && this.endVertex != null) {
                        if (this.markerStart != null) {
                            subline_1.push(" edges(" + edgeBeginID + ").Line.BeginArrowheadLength = msoArrowheadLong");
                            subline_1.push(" edges(" + edgeBeginID + ").Line.BeginArrowheadStyle = msoArrowheadTriangle");
                            subline_1.push(" edges(" + edgeBeginID + ").Line.BeginArrowheadWidth = msoArrowheadWide");
                        }
                        if (this.markerEnd != null) {
                            subline_1.push(" edges(" + edgeEndID + ").Line.EndArrowheadLength = msoArrowheadLong");
                            subline_1.push(" edges(" + edgeEndID + ").Line.EndArrowheadStyle = msoArrowheadTriangle");
                            subline_1.push(" edges(" + edgeEndID + ").Line.EndArrowheadWidth = msoArrowheadWide");
                        }
                    }
                }
                lineArr.forEach(function (v) {
                    var lineType = GraphTableSVG.msoDashStyle.getLineType(_this.svgPath);
                    var lineColor = GraphTableSVG.VBATranslateFunctions.colorToVBA(_this.svgPath.getPropertyStyleValueWithDefault("stroke", "gray"));
                    var strokeWidth = parseInt(_this.svgPath.getPropertyStyleValueWithDefault("stroke-width", "4"));
                    var visible = _this.svgPath.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                    subline_1.push(" Call EditLine(edges(" + v + ").Line, " + lineColor + ", " + lineType + ", " + 0 + ", " + strokeWidth + ", " + visible + ")");
                });
                subline_1.forEach(function (v) { return sub.push([v]); });
                this.createVBACodeOfText("shapes_", sub);
            }
        };
        Edge.prototype.createVBACodeOfText = function (shapes, result) {
            if (this.svgTextPath.textContent != null && this.graph != null) {
                var fontSize = parseInt(this.svgTextPath.getPropertyStyleValueWithDefault("font-size", "12"));
                var fontFamily = GraphTableSVG.VBATranslateFunctions.ToVBAFont(this.svgTextPath.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
                var fontBold = GraphTableSVG.VBATranslateFunctions.ToFontBold(this.svgTextPath.getPropertyStyleValueWithDefault("font-weight", "none"));
                for (var i = 0; i < this.svgTextPath.textContent.length; i++) {
                    var s = new Array(0);
                    var p1 = this.svgTextPath.getStartPositionOfChar(i);
                    var p2 = this.svgTextPath.getEndPositionOfChar(i);
                    var width = Math.abs(p2.x - p1.x);
                    var height = Math.abs(p2.y - p1.y);
                    var rad = this.svgTextPath.getRotationOfChar(i);
                    var diffx = (fontSize * 1 / 2) * Math.sin((rad / 180) * Math.PI);
                    var diffy = (fontSize * 3 / 8) + ((fontSize * 3 / 8) * Math.cos((rad / 180) * Math.PI));
                    var left = this.graph.svgGroup.getX() + p1.x + diffx;
                    var top_1 = this.graph.svgGroup.getY() + p1.y - (fontSize * 1 / 4) - diffy;
                    s.push("With " + shapes + ".AddTextBox(msoTextOrientationHorizontal, " + left + ", " + top_1 + "," + width + "," + fontSize + ")");
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
                    result.push(s);
                }
            }
        };
        Edge.createMark = function (option) {
            if (option === void 0) { option = {}; }
            var _a = GraphTableSVG.SVG.createMarker(option), marker = _a[0], path = _a[1];
            if (option.isEnd != undefined && option.isEnd) {
                path.setAttribute("transform", "rotate(180,5,5)");
                marker.setAttribute("refX", "0");
            }
            marker.id = "marker-" + Edge.markerCounter++;
            return marker;
        };
        Edge.createStartMarker = function (option) {
            if (option === void 0) { option = {}; }
            var option2 = { className: option.className, strokeWidth: option.strokeWidth, color: option.color, isEnd: true };
            return this.createMark(option2);
        };
        Edge.createEndMarker = function (option) {
            if (option === void 0) { option = {}; }
            return this.createMark(option);
        };
        Edge.beginConnectorTypeName = "--begin-connector-type";
        Edge.endConnectorTypeName = "--end-connector-type";
        Edge.defaultLineClass = "--default-line-class";
        Edge.beginNodeName = "data-begin-node";
        Edge.endNodeName = "data-end-node";
        Edge.defaultTextClass = "--default-text-class";
        Edge.controlPointName = "data-control-point";
        Edge.markerStartName = "--marker-start";
        Edge.markerEndName = "--marker-end";
        Edge.markerCounter = 0;
        return Edge;
    }());
    GraphTableSVG.Edge = Edge;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var EdgeText = (function () {
        function EdgeText(graph, edge, text) {
            this._svgText = GraphTableSVG.SVG.createText();
            this.svgText.textContent = text;
            edge.svgGroup.appendChild(this.svgText);
            this._edge = edge;
        }
        Object.defineProperty(EdgeText.prototype, "svgText", {
            get: function () {
                return this._svgText;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EdgeText.prototype, "edge", {
            get: function () {
                return this._edge;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EdgeText.prototype, "x", {
            get: function () {
                return this.svgText.getX();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EdgeText.prototype, "y", {
            get: function () {
                return this.svgText.getY();
            },
            enumerable: true,
            configurable: true
        });
        EdgeText.prototype.getCenterPosition = function () {
            var x = (this.edge.x1 + this.edge.x2) / 2;
            var y = (this.edge.y1 + this.edge.y2) / 2;
            return [x, y];
        };
        EdgeText.prototype.update = function () {
            var _a = this.getCenterPosition(), x = _a[0], y = _a[1];
            this.svgText.setX(x);
            this.svgText.setY(y);
            var _b = [this.edge.x1, this.edge.y1], x1 = _b[0], y1 = _b[1];
            var _c = [this.edge.x2, this.edge.y2], x2 = _c[0], y2 = _c[1];
            var rad = Math.atan2(y2 - y1, x2 - x1);
            var rar = rad * (180 / Math.PI);
            if (rar > 90) {
                rar = rar - 180;
                if (this.svgText.textContent != null) {
                    this.svgText.textContent = EdgeText.reverse(this.svgText.textContent);
                }
            }
            this.svgText.setAttribute('transform', "rotate(" + rar + ", " + this.svgText.getX() + ", " + this.svgText.getY() + ")");
        };
        Object.defineProperty(EdgeText.prototype, "fontSize", {
            get: function () {
                return parseInt(this.svgText.getPropertyStyleValueWithDefault("font-size", "12"));
            },
            enumerable: true,
            configurable: true
        });
        EdgeText.reverse = function (str) {
            var rv = [];
            for (var i = 0, n = str.length; i < n; i++) {
                rv[i] = str.charAt(n - i - 1);
            }
            return rv.join("");
        };
        return EdgeText;
    }());
    GraphTableSVG.EdgeText = EdgeText;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var Graph = (function () {
        function Graph(box, option) {
            if (option === void 0) { option = {}; }
            this._vertices = new Array(0);
            this._edges = new Array(0);
            this._roots = [];
            this.createdNodeCallback = function (node) { };
            this._relocateFunction = null;
            if (option.graphClassName == undefined)
                option.graphClassName = null;
            this._svgGroup = GraphTableSVG.SVG.createGroup(box, option.graphClassName);
            this._svgGroup.setAttribute(Graph.typeName, "graph");
        }
        Graph.prototype.updateVertices = function () {
            this._vertices.forEach(function (x) { x.update(); });
        };
        Graph.prototype.updateEdges = function () {
            this._edges.forEach(function (x) { x.update(); });
        };
        Graph.prototype.update = function () {
            this.updateVertices();
            this.updateEdges();
        };
        Object.defineProperty(Graph.prototype, "x", {
            get: function () {
                return this.svgGroup.getX();
            },
            set: function (value) {
                this.svgGroup.setX(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graph.prototype, "y", {
            get: function () {
                return this.svgGroup.getY();
            },
            set: function (value) {
                this.svgGroup.setY(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graph.prototype, "vertexXInterval", {
            get: function () {
                var v = this.svgGroup.getPropertyStyleValue(Graph.vertexXIntervalName);
                if (v == null) {
                    return null;
                }
                else {
                    return parseInt(v);
                }
            },
            set: function (value) {
                this.svgGroup.setPropertyStyleValue(Graph.vertexXIntervalName, value == null ? null : value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graph.prototype, "vertexYInterval", {
            get: function () {
                var v = this.svgGroup.getPropertyStyleValue(Graph.vertexYIntervalName);
                if (v == null) {
                    return null;
                }
                else {
                    return parseInt(v);
                }
            },
            set: function (value) {
                this.svgGroup.setPropertyStyleValue(Graph.vertexYIntervalName, value == null ? null : value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graph.prototype, "defaultVertexClass", {
            get: function () {
                return this.svgGroup.getPropertyStyleValue(Graph.defaultVertexClass);
            },
            set: function (value) {
                this.svgGroup.setPropertyStyleValue(Graph.defaultVertexClass, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graph.prototype, "defaultEdgeClass", {
            get: function () {
                return this.svgGroup.getPropertyStyleValue(Graph.defaultEdgeClass);
            },
            set: function (value) {
                this.svgGroup.setPropertyStyleValue(Graph.defaultEdgeClass, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graph.prototype, "rootVertex", {
            get: function () {
                if (this.roots.length == 0) {
                    return null;
                }
                else {
                    return this.roots[0];
                }
            },
            set: function (value) {
                this._roots = [];
                if (value != null) {
                    this.roots.push(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graph.prototype, "roots", {
            get: function () {
                return this._roots;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graph.prototype, "svgGroup", {
            get: function () {
                return this._svgGroup;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graph.prototype, "vertices", {
            get: function () {
                return this._vertices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graph.prototype, "edges", {
            get: function () {
                return this._edges;
            },
            enumerable: true,
            configurable: true
        });
        Graph.prototype.add = function (item) {
            if (item instanceof GraphTableSVG.Vertex) {
                var i = this._vertices.indexOf(item);
                if (i == -1 && item.graph == this) {
                    this._vertices.push(item);
                    this.svgGroup.insertBefore(item.svgGroup, this.svgGroup.firstChild);
                }
                else {
                    throw Error();
                }
            }
            else {
                var i = this._edges.indexOf(item);
                if (i == -1 && item.graph == this) {
                    this._edges.push(item);
                    this.svgGroup.appendChild(item.svgGroup);
                }
                else {
                    throw Error();
                }
            }
        };
        Graph.prototype.remove = function (item) {
            if (item instanceof GraphTableSVG.Vertex) {
                var p = this.vertices.indexOf(item);
                if (p != -1) {
                    this._vertices.splice(p, 1);
                    this.svgGroup.removeChild(item.svgGroup);
                    item.dispose();
                }
            }
            else {
                var p = this.edges.indexOf(item);
                if (p != -1) {
                    this._edges.splice(p, 1);
                    this.svgGroup.removeChild(item.svgGroup);
                    item.dispose();
                }
            }
        };
        Graph.prototype.clear = function () {
            while (this.edges.length > 0) {
                this.remove(this.edges[0]);
            }
            while (this.vertices.length > 0) {
                this.remove(this.vertices[0]);
            }
            this._roots = [];
        };
        Graph.prototype.removeGraph = function (svg) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        };
        Graph.prototype.getRegion = function () {
            var rects = this.vertices.map(function (v) { return v.region; });
            var rect = GraphTableSVG.Rectangle.merge(rects);
            rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
            return rect;
        };
        Graph.prototype.getObject = function (child) {
            var id = child.getAttribute(GraphTableSVG.Graph.objectIDName);
            if (id != null) {
                return this.getObjectByObjectID(id);
            }
            else {
                if (child.parentElement != null) {
                    return this.getObject(child.parentElement);
                }
                else {
                    return null;
                }
            }
        };
        Graph.prototype.getObjectByObjectID = function (id) {
            for (var i = 0; i < this.vertices.length; i++) {
                if (this.vertices[i].containsObjectID(id)) {
                    return this.vertices[i];
                }
            }
            return null;
        };
        Graph.prototype.connect = function (beginVertex, edge, endVertex, option) {
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
        Graph.prototype.getOrderedVertices = function (order, node) {
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
        Graph.prototype.save = function () {
            var ids = this.vertices.map(function (v) { return v.objectID; });
            this.svgGroup.setAttribute("node", JSON.stringify(ids));
        };
        Graph.setXY = function (text, rect, vAnchor, hAnchor) {
            var x = rect.x;
            var y = rect.y;
            text.setAttribute('x', x.toString());
            text.setAttribute('y', y.toString());
            var b2 = text.getBBox();
            var dy = b2.y - y;
            var dx = b2.x - x;
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
        };
        Graph.prototype.createVBACode = function (id) {
            var vertexDic = {};
            var edgeDic = {};
            this.vertices.forEach(function (v) { return v.setIndexDictionaryForVBA(vertexDic, edgeDic); });
            this.edges.forEach(function (v) { return v.setIndexDictionaryForVBA(vertexDic, edgeDic); });
            var vertexSize = Object.keys(vertexDic).length;
            var edgeSize = Object.keys(edgeDic).length;
            var main = [];
            var sub = [];
            var lines = new Array(0);
            lines.push("Sub create" + id + "(createdSlide As slide)");
            lines.push(" Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes");
            lines.push(" Dim nodes(" + vertexSize + ") As Shape");
            lines.push(" Dim edges(" + edgeSize + ") As Shape");
            this.vertices.forEach(function (v, i) { return v.createVBACode(main, sub, vertexDic, edgeDic); });
            this.edges.forEach(function (v, i) { return v.createVBACode(main, sub, vertexDic, edgeDic); });
            var _a = GraphTableSVG.VBATranslateFunctions.splitCode(sub, "shapes_ As Shapes, nodes() As Shape, edges() As Shape", "shapes_, nodes, edges", id), x1 = _a[0], y1 = _a[1];
            lines.push(x1);
            lines.push("End Sub");
            lines.push(y1);
            return lines;
        };
        Graph.prototype.constructFromLogicTree = function (roots, option) {
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
                    this.relocateFunction = GraphTableSVG.TreeArrangement.alignVerticeByChildren;
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
        Graph.prototype.createChildFromLogicTree = function (parent, logicVertex, option) {
            var _this = this;
            if (parent === void 0) { parent = null; }
            if (option === void 0) { option = {}; }
            if (option.isLatexMode == undefined)
                option.isLatexMode = false;
            var node = GraphTableSVG.Vertex.create(this, { className: logicVertex.vertexClass });
            if (logicVertex.vertexText != null)
                GraphTableSVG.SVG.setTextToSVGText(node.svgText, logicVertex.vertexText, option.isLatexMode);
            if (parent != null) {
                var edge = GraphTableSVG.Edge.create(this, { className: logicVertex.parentEdgeClass });
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
            this.createdNodeCallback(node);
            return node;
        };
        Graph.prototype.appendChild = function (parent, child, option) {
            if (option === void 0) { option = {}; }
            var edge = GraphTableSVG.Edge.create(this);
            this.connect(parent, edge, child, { beginConnectorType: "bottom", endConnectorType: "top" });
            this.createdNodeCallback(child);
            this.relocate();
        };
        Object.defineProperty(Graph.prototype, "relocateFunction", {
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
        Graph.prototype.relocate = function () {
            if (this._relocateFunction != null)
                this._relocateFunction(this);
        };
        Graph.idCounter = 0;
        Graph.defaultVertexClass = "--default-vertex-class";
        Graph.defaultEdgeClass = "--default-edge-class";
        Graph.vertexXIntervalName = "--vertex-x-interval";
        Graph.vertexYIntervalName = "--vertex-y-interval";
        Graph.objectIDName = "data-objectID";
        Graph.typeName = "data-type";
        return Graph;
    }());
    GraphTableSVG.Graph = Graph;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var TreeArrangement;
    (function (TreeArrangement) {
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
        TreeArrangement.alignVerticeByLeaveSub = alignVerticeByLeaveSub;
        function reverse(graph, isX, isY) {
            if (graph.vertices.length > 0) {
                if (isY) {
                    var midY_1 = middle(graph.vertices.map(function (v) { return v.y; }));
                    graph.vertices.forEach(function (v) {
                        if (v.y < midY_1) {
                            v.y += 2 * (midY_1 - v.y);
                        }
                        else {
                            v.y -= 2 * (v.y - midY_1);
                        }
                    });
                }
                if (isX) {
                    var midX_1 = middle(graph.vertices.map(function (v) { return v.x; }));
                    graph.vertices.forEach(function (v) {
                        if (v.x < midX_1) {
                            v.x += 2 * (midX_1 - v.x);
                        }
                        else {
                            v.x -= 2 * (v.x - midX_1);
                        }
                    });
                }
            }
        }
        TreeArrangement.reverse = reverse;
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
        TreeArrangement.alignVerticeByChildren = alignVerticeByChildren;
        function alignVerticeByChildrenSub(tree, xInterval, yInterval) {
            tree.subTreeRoot.x = 0;
            tree.subTreeRoot.y = 0;
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
                var _b = [rootTree.subTreeRoot.x, rootTree.subTreeRoot.y], x = _b[0], y = _b[1];
                standardTreeWidthArrangementSub(rootTree, xi, yi);
                rootTree.setRootLocation(x, y);
            }
        }
        TreeArrangement.standardTreeWidthArrangement = standardTreeWidthArrangement;
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
            graph.vertices.forEach(function (v) { v.x = 0; v.y = 0; });
            var _a = getXYIntervals(graph), xi = _a[0], yi = _a[1];
            GraphTableSVG.TreeArrangement.alignVerticeByLeaveSub(graph, xi, yi);
            GraphTableSVG.TreeArrangement.reverse(this, false, true);
            alignTrees(graph);
        }
        TreeArrangement.alignVerticeByLeave = alignVerticeByLeave;
        function standardTreeWidthArrangementSub(tree, xInterval, yInterval) {
            tree.subTreeRoot.x = 0;
            tree.subTreeRoot.y = 0;
            var centerX = 0;
            var children = tree.children;
            var x = 0;
            if (children.length == 1) {
                tree.subTreeRoot.x = children[0].x;
                standardTreeWidthArrangementSub(children[0].tree, xInterval, yInterval);
                children[0].tree.setRootLocation(children[0].x, yInterval);
            }
            else if (children.length == 0) {
            }
            else {
                for (var i = 0; i < children.length; i++) {
                    standardTreeWidthArrangementSub(children[i].tree, xInterval, yInterval);
                    var rect = children[i].tree.region();
                    var diffX = children[i].x - rect.x;
                    children[i].tree.setRootLocation(x + diffX, yInterval);
                    x += rect.width + xInterval;
                    if (i < children.length - 1) {
                        centerX += x - (xInterval / 2);
                    }
                }
                centerX = centerX / (children.length - 1);
                tree.subTreeRoot.x = centerX;
            }
        }
    })(TreeArrangement = GraphTableSVG.TreeArrangement || (GraphTableSVG.TreeArrangement = {}));
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var Tree = (function (_super) {
        __extends(Tree, _super);
        function Tree() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Tree;
    }(GraphTableSVG.Graph));
    GraphTableSVG.Tree = Tree;
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
var GraphTableSVG;
(function (GraphTableSVG) {
    var Vertex = (function () {
        function Vertex(graph, params) {
            if (params === void 0) { params = {}; }
            var _this = this;
            this._graph = null;
            this._outcomingEdges = [];
            this._incomingEdges = [];
            this.observerFunc = function (x) {
                var b = false;
                if (!_this.isLocated)
                    return;
                for (var i = 0; i < x.length; i++) {
                    var p = x[i];
                    if (p.attributeName == "transform") {
                        b = true;
                    }
                }
                if (b)
                    _this.localUpdate();
            };
            this.textObserverFunc = function (x) {
                if (!_this.isLocated)
                    return;
                for (var i = 0; i < x.length; i++) {
                    var p = x[i];
                    _this.localUpdate();
                }
            };
            if (params.className == undefined) {
                params.className = graph.defaultVertexClass;
            }
            if (params.text == undefined)
                params.text = "";
            if (params.x == undefined)
                params.x = 0;
            if (params.y == undefined)
                params.y = 0;
            var g = GraphTableSVG.SVG.createGroup(graph.svgGroup, params.className);
            this._svgGroup = g;
            this.svgGroup.setAttribute(GraphTableSVG.Graph.objectIDName, (GraphTableSVG.Graph.idCounter++).toString());
            this.svgGroup.setAttribute(GraphTableSVG.Graph.typeName, "vertex");
            this._graph = graph;
            graph.add(this);
            this._svgText = GraphTableSVG.SVG.createText(this.svgGroup.getPropertyStyleValue(Vertex.defaultTextClass));
            this.svgText.textContent = params.text;
            this.svgGroup.appendChild(this.svgText);
            this._observer = new MutationObserver(this.observerFunc);
            var option1 = { attributes: true };
            this._observer.observe(this.svgGroup, option1);
            this._textObserver = new MutationObserver(this.textObserverFunc);
            var option2 = { childList: true };
            this._textObserver.observe(this.svgText, option2);
            this.x = params.x;
            this.y = params.y;
        }
        Object.defineProperty(Vertex.prototype, "shapeType", {
            get: function () {
                return "circle";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "graph", {
            get: function () {
                return this._graph;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "svgGroup", {
            get: function () {
                return this._svgGroup;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "svgText", {
            get: function () {
                return this._svgText;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "outcomingEdges", {
            get: function () {
                return this._outcomingEdges;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "incomingEdges", {
            get: function () {
                return this._incomingEdges;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "innerRectangle", {
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
        Object.defineProperty(Vertex.prototype, "isLocated", {
            get: function () {
                return GraphTableSVG.Common.IsDescendantOfBody(this.svgGroup);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "objectID", {
            get: function () {
                var r = this.svgGroup.getAttribute(GraphTableSVG.Graph.objectIDName);
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
        Object.defineProperty(Vertex.prototype, "x", {
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
        Object.defineProperty(Vertex.prototype, "y", {
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
        Object.defineProperty(Vertex.prototype, "width", {
            get: function () {
                return 0;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "height", {
            get: function () {
                return 0;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Vertex.prototype.getLocation = function (type, x, y) {
            return [this.x, this.y];
        };
        Vertex.prototype.getConnectorType = function (type, x, y) {
            if (type == GraphTableSVG.ConnectorPosition.Auto) {
                return this.getAutoPosition(x, y);
            }
            else {
                return type;
            }
        };
        Vertex.prototype.getAutoPosition = function (x, y) {
            return GraphTableSVG.ConnectorPosition.Top;
        };
        Vertex.prototype.update = function () {
            this.localUpdate();
            return false;
        };
        Vertex.prototype.localUpdate = function () {
            var vAnchor = this.svgGroup.getPropertyStyleValue(GraphTableSVG.VerticalAnchorPropertyName);
            if (vAnchor == null)
                vAnchor = GraphTableSVG.VerticalAnchor.Middle;
            var hAnchor = this.svgGroup.getPropertyStyleValue(GraphTableSVG.HorizontalAnchorPropertyName);
            if (hAnchor == null)
                hAnchor = GraphTableSVG.HorizontalAnchor.Center;
            if (this.isAutoSizeShapeToFitText) {
                var box = this.svgText.getBBox();
                if (this.surface instanceof SVGCircleElement) {
                    this.width = Math.max(box.width, box.height);
                }
                else {
                    this.width = box.width;
                    this.height = box.height;
                }
            }
            GraphTableSVG.Graph.setXY(this.svgText, this.innerRectangle, vAnchor, hAnchor);
            this.incomingEdges.forEach(function (v) { return v.update(); });
            this.outcomingEdges.forEach(function (v) { return v.update(); });
        };
        Object.defineProperty(Vertex.prototype, "region", {
            get: function () {
                var p = new GraphTableSVG.Rectangle();
                p.x = this.x - (this.width / 2);
                p.y = this.y - (this.height / 2);
                p.width = this.width;
                p.height = this.height;
                return p;
            },
            enumerable: true,
            configurable: true
        });
        Vertex.prototype.containsObjectID = function (id) {
            return this.svgGroup.getAttribute(GraphTableSVG.Graph.objectIDName) == id;
        };
        Object.defineProperty(Vertex.prototype, "surface", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Vertex.prototype.getParents = function () {
            return this.incomingEdges.filter(function (v) { return v.beginVertex != null; }).map(function (v) { return v.beginVertex; });
        };
        Object.defineProperty(Vertex.prototype, "parentEdge", {
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
        Object.defineProperty(Vertex.prototype, "isAutoSizeShapeToFitText", {
            get: function () {
                if (this.surface != null) {
                    var v = this.surface.getPropertyStyleValueWithDefault(Vertex.autoSizeShapeToFitTextName, "false");
                    return v == "true";
                }
                else {
                    return false;
                }
            },
            set: function (value) {
                if (this.surface != null) {
                    this.surface.setPropertyStyleValue(Vertex.autoSizeShapeToFitTextName, value ? "true" : "false");
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "parent", {
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
        Object.defineProperty(Vertex.prototype, "isNoParent", {
            get: function () {
                return this.parent == null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "children", {
            get: function () {
                return this.outcomingEdges.filter(function (v) { return v.endVertex != null; }).map(function (v) { return v.endVertex; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "isLeaf", {
            get: function () {
                return this.outcomingEdges.length == 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "firstNoParent", {
            get: function () {
                var p = this;
                var parent = p.parent;
                while (parent != null) {
                    p = parent;
                    parent = p.parent;
                }
                return p;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "tree", {
            get: function () {
                return new GraphTableSVG.VirtualSubTree(this);
            },
            enumerable: true,
            configurable: true
        });
        Vertex.prototype.save = function () {
            var p = this.outcomingEdges.map(function (v) { return v.x1; });
            var out = JSON.stringify(p);
            this.svgGroup.setAttribute("outcomingEdges", out);
        };
        Vertex.create = function (graph, option) {
            if (option === void 0) { option = {}; }
            if (option.className == undefined)
                option.className = graph.defaultVertexClass;
            var g = GraphTableSVG.SVG.createGroup(graph.svgGroup, option.className);
            var gSurfaceType = g.getPropertyStyleValue(Vertex.defaultSurfaceType);
            if (option.surfaceType == undefined)
                option.surfaceType = gSurfaceType != null ? gSurfaceType : "circle";
            if (option.x == undefined)
                option.x = 0;
            if (option.y == undefined)
                option.y = 0;
            if (option.text == undefined)
                option.text = "";
            var p;
            if (option.surfaceType == "circle") {
                p = new GraphTableSVG.CircleVertex(graph, option);
            }
            else if (option.surfaceType == "rectangle") {
                p = new GraphTableSVG.RectangleVertex(graph, option);
            }
            else {
                p = new Vertex(graph, option);
            }
            if (option.isRoot) {
                graph.roots.push(p);
            }
            return p;
        };
        Vertex.prototype.insertOutcomingEdge = function (edge, insertIndex) {
            var p = this.outcomingEdges.indexOf(edge);
            if (p != -1) {
                throw new Error();
            }
            else {
                this.outcomingEdges.splice(insertIndex, 0, edge);
                edge.beginVertex = this;
            }
        };
        Vertex.prototype.removeOutcomingEdge = function (edge) {
            var p = this.outcomingEdges.indexOf(edge);
            if (p != null) {
                this.outcomingEdges.splice(p, 1);
                edge.beginVertex = null;
            }
        };
        Vertex.prototype.insertIncomingEdge = function (edge, insertIndex) {
            var p = this.incomingEdges.indexOf(edge);
            if (p != -1) {
                throw new Error();
            }
            else {
                this.incomingEdges.splice(insertIndex, 0, edge);
                edge.endVertex = this;
            }
        };
        Vertex.prototype.removeIncomingEdge = function (edge) {
            var p = this.incomingEdges.indexOf(edge);
            if (p != null) {
                this.incomingEdges.splice(p, 1);
                edge.endVertex = null;
            }
        };
        Vertex.prototype.dispose = function () {
            while (this.incomingEdges.length > 0) {
                this.removeIncomingEdge(this.incomingEdges[0]);
            }
            while (this.outcomingEdges.length > 0) {
                this.removeOutcomingEdge(this.outcomingEdges[0]);
            }
            var prev = this.graph;
            this._graph = null;
            if (prev != null) {
                prev.remove(this);
            }
        };
        Object.defineProperty(Vertex.prototype, "isDisposed", {
            get: function () {
                return this.graph == null;
            },
            enumerable: true,
            configurable: true
        });
        Vertex.prototype.setIndexDictionaryForVBA = function (vertexDic, edgeDic) {
            vertexDic[this.objectID] = Object.keys(vertexDic).length;
        };
        Vertex.prototype.createVBACode = function (main, sub, vertexDic, edgeDic) {
            if (this.graph != null) {
                var i = vertexDic[this.objectID];
                var left = this.graph.svgGroup.getX() + this.x - (this.width / 2);
                var top_2 = this.graph.svgGroup.getY() + this.y - (this.height / 2);
                var surface = this.surface;
                var shape = surface instanceof SVGRectElement ? "msoShapeRectangle" : "msoShapeOval";
                sub.push([" Set nodes(" + i + ") = shapes_.AddShape(" + shape + ", " + left + ", " + top_2 + ", " + this.width + ", " + this.height + ")"]);
                if (surface == null) {
                    var backColor = GraphTableSVG.VBATranslateFunctions.colorToVBA("gray");
                    sub.push([" Call EditVertexShape(nodes(" + i + "), \"" + this.objectID + "\", msoFalse, " + backColor + ")"]);
                }
                else {
                    var backColor = GraphTableSVG.VBATranslateFunctions.colorToVBA(surface.getPropertyStyleValueWithDefault("fill", "gray"));
                    var lineColor = GraphTableSVG.VBATranslateFunctions.colorToVBA(surface.getPropertyStyleValueWithDefault("stroke", "gray"));
                    var lineType = GraphTableSVG.msoDashStyle.getLineType(surface);
                    var strokeWidth = parseInt(surface.getPropertyStyleValueWithDefault("stroke-width", "4"));
                    var visible_1 = surface.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                    sub.push([" Call EditVertexShape(nodes(" + i + "), \"" + this.objectID + "\", " + visible_1 + ", " + backColor + ")"]);
                    sub.push([" Call EditLine(nodes(" + i + ").Line, " + lineColor + ", " + lineType + ", " + 0 + ", " + strokeWidth + ", " + visible_1 + ")"]);
                }
                var fontSize = parseInt(this.svgText.getPropertyStyleValueWithDefault("font-size", "24"));
                var fontFamily = GraphTableSVG.VBATranslateFunctions.ToVBAFont(this.svgText.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
                var fontBold = GraphTableSVG.VBATranslateFunctions.ToFontBold(this.svgText.getPropertyStyleValueWithDefault("font-weight", "none"));
                sub.push([" Call EditTextFrame(nodes(" + i + ").TextFrame, " + 0 + ", " + 0 + ", " + 0 + ", " + 0 + ", false, ppAutoSizeNone)"]);
                GraphTableSVG.VBATranslateFunctions.TranslateSVGTextElement(sub, this.svgText, "nodes(" + i + ").TextFrame.TextRange");
                sub.push([" Call EditTextEffect(nodes(" + i + ").TextEffect, " + fontSize + ", \"" + fontFamily + "\")"]);
            }
        };
        Vertex.defaultSurfaceType = "--default-surface-type";
        Vertex.defaultTextClass = "--default-text-class";
        Vertex.defaultSurfaceClass = "--default-surface-class";
        Vertex.autoSizeShapeToFitTextName = "--autosize-shape-to-fit-text";
        Vertex.id_counter = 0;
        return Vertex;
    }());
    GraphTableSVG.Vertex = Vertex;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var CircleVertex = (function (_super) {
        __extends(CircleVertex, _super);
        function CircleVertex(graph, params) {
            var _this = _super.call(this, graph, params) || this;
            _this._svgCircle = GraphTableSVG.SVG.createCircle(_this.svgGroup, _this.svgGroup.getPropertyStyleValue(GraphTableSVG.Vertex.defaultSurfaceClass));
            if (params.radius != undefined)
                _this._svgCircle.r.baseVal.value = params.radius;
            _this.svgGroup.insertBefore(_this.svgCircle, _this.svgText);
            return _this;
        }
        Object.defineProperty(CircleVertex.prototype, "svgCircle", {
            get: function () {
                return this._svgCircle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CircleVertex.prototype, "width", {
            get: function () {
                return this.svgCircle.r.baseVal.value * 2;
            },
            set: function (value) {
                this.svgCircle.r.baseVal.value = value / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CircleVertex.prototype, "height", {
            get: function () {
                return this.svgCircle.r.baseVal.value * 2;
            },
            set: function (value) {
                this.svgCircle.r.baseVal.value = value / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CircleVertex.prototype, "innerRectangle", {
            get: function () {
                var rect = new GraphTableSVG.Rectangle();
                var r = this.svgCircle.r.baseVal.value;
                rect.width = r * 2;
                rect.height = r * 2;
                rect.x = -r;
                rect.y = -r;
                return rect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CircleVertex.prototype, "radius", {
            get: function () {
                return this.svgCircle.r.baseVal.value;
            },
            enumerable: true,
            configurable: true
        });
        CircleVertex.prototype.getLocation = function (type, x, y) {
            var r = (Math.sqrt(2) / 2) * this.radius;
            switch (type) {
                case GraphTableSVG.ConnectorPosition.Top:
                    return [this.x, this.y - this.radius];
                case GraphTableSVG.ConnectorPosition.TopRight:
                    return [this.x + r, this.y - r];
                case GraphTableSVG.ConnectorPosition.Right:
                    return [this.x + this.radius, this.y];
                case GraphTableSVG.ConnectorPosition.BottomRight:
                    return [this.x + r, this.y + r];
                case GraphTableSVG.ConnectorPosition.Bottom:
                    return [this.x, this.y + this.radius];
                case GraphTableSVG.ConnectorPosition.BottomLeft:
                    return [this.x - r, this.y + r];
                case GraphTableSVG.ConnectorPosition.Left:
                    return [this.x - this.radius, this.y];
                case GraphTableSVG.ConnectorPosition.TopLeft:
                    return [this.x - r, this.y - r];
                default:
                    var autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        };
        Object.defineProperty(CircleVertex.prototype, "surface", {
            get: function () {
                return this.svgCircle;
            },
            enumerable: true,
            configurable: true
        });
        CircleVertex.prototype.getRadian = function (x, y) {
            var _a = [x - this.x, y - this.y], x2 = _a[0], y2 = _a[1];
            if (x2 < 0) {
                if (y2 < 0) {
                    return GraphTableSVG.ConnectorPosition.TopLeft;
                }
                else if (y2 > 0) {
                    return GraphTableSVG.ConnectorPosition.BottomLeft;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Left;
                }
            }
            else if (x2 > 0) {
                if (y2 < 0) {
                    return GraphTableSVG.ConnectorPosition.TopRight;
                }
                else if (y2 > 0) {
                    return GraphTableSVG.ConnectorPosition.BottomRight;
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
        };
        CircleVertex.prototype.getAutoPosition = function (x, y) {
            var r = (Math.sqrt(2) / 2) * this.radius;
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
        return CircleVertex;
    }(GraphTableSVG.Vertex));
    GraphTableSVG.CircleVertex = CircleVertex;
    var RectangleVertex = (function (_super) {
        __extends(RectangleVertex, _super);
        function RectangleVertex(graph, params) {
            if (params === void 0) { params = {}; }
            var _this = _super.call(this, graph, params) || this;
            _this._svgRectangle = GraphTableSVG.SVG.createRectangle(_this.svgGroup, _this.svgGroup.getPropertyStyleValue(GraphTableSVG.Vertex.defaultSurfaceClass));
            if (params.width != undefined)
                _this.width = params.width;
            if (params.height != undefined)
                _this.height = params.height;
            _this.svgGroup.insertBefore(_this.svgRectangle, _this.svgText);
            _this.svgRectangle.x.baseVal.value = -_this.width / 2;
            _this.svgRectangle.y.baseVal.value = -_this.height / 2;
            return _this;
        }
        Object.defineProperty(RectangleVertex.prototype, "svgRectangle", {
            get: function () {
                return this._svgRectangle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RectangleVertex.prototype, "shapeType", {
            get: function () {
                return "rectangle";
            },
            enumerable: true,
            configurable: true
        });
        RectangleVertex.prototype.localUpdate = function () {
            this.svgRectangle.x.baseVal.value = -this.width / 2;
            this.svgRectangle.y.baseVal.value = -this.height / 2;
            _super.prototype.localUpdate.call(this);
        };
        Object.defineProperty(RectangleVertex.prototype, "width", {
            get: function () {
                return this.svgRectangle.width.baseVal.value;
            },
            set: function (value) {
                this.svgRectangle.width.baseVal.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RectangleVertex.prototype, "height", {
            get: function () {
                return this.svgRectangle.height.baseVal.value;
            },
            set: function (value) {
                this.svgRectangle.height.baseVal.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RectangleVertex.prototype, "innerRectangle", {
            get: function () {
                var rect = new GraphTableSVG.Rectangle();
                rect.width = this.width;
                rect.height = this.height;
                rect.x = -this.width / 2;
                rect.y = -this.height / 2;
                ;
                return rect;
            },
            enumerable: true,
            configurable: true
        });
        RectangleVertex.prototype.getLocation = function (type, x, y) {
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
        RectangleVertex.prototype.getAutoPosition = function (x, y) {
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
        Object.defineProperty(RectangleVertex.prototype, "surface", {
            get: function () {
                return this.svgRectangle;
            },
            enumerable: true,
            configurable: true
        });
        return RectangleVertex;
    }(GraphTableSVG.Vertex));
    GraphTableSVG.RectangleVertex = RectangleVertex;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var VirtualSubTree = (function () {
        function VirtualSubTree(_root) {
            this.subTreeRoot = _root;
        }
        Object.defineProperty(VirtualSubTree.prototype, "children", {
            get: function () {
                var p = this;
                return this.subTreeRoot.children.map(function (x, i, arr) {
                    return x;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualSubTree.prototype, "parentEdge", {
            get: function () {
                return this.subTreeRoot.parentEdge;
            },
            enumerable: true,
            configurable: true
        });
        VirtualSubTree.prototype.getSubtree = function (result) {
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
        VirtualSubTree.prototype.getHeight = function () {
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
        VirtualSubTree.prototype.region = function () {
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
        Object.defineProperty(VirtualSubTree.prototype, "mostLeftLeave", {
            get: function () {
                return this.leaves[0];
            },
            enumerable: true,
            configurable: true
        });
        VirtualSubTree.prototype.addOffset = function (_x, _y) {
            this.getSubtree().forEach(function (x, i, arr) {
                x.x += _x;
                x.y += _y;
            });
        };
        VirtualSubTree.prototype.setRectangleLocation = function (_x, _y) {
            var x = this.mostLeftLeave.region.x;
            var y = this.subTreeRoot.region.y;
            var diffX = _x - x;
            var diffY = _y - y;
            this.addOffset(diffX, diffY);
        };
        VirtualSubTree.prototype.setRootLocation = function (_x, _y) {
            var x = this.subTreeRoot.x;
            var y = this.subTreeRoot.y;
            var diffX = _x - x;
            var diffY = _y - y;
            this.addOffset(diffX, diffY);
        };
        Object.defineProperty(VirtualSubTree.prototype, "leaves", {
            get: function () {
                var p = this;
                return this.getSubtree().filter(function (x, i, arr) {
                    return x.outcomingEdges.length == 0;
                });
            },
            enumerable: true,
            configurable: true
        });
        return VirtualSubTree;
    }());
    GraphTableSVG.VirtualSubTree = VirtualSubTree;
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
                var r = this.svgGroup.getPropertyStyleValue(Cell.defaultTextClass);
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
                GraphTableSVG.Graph.setXY(this.svgText, innerRect, this.verticalAnchor, this.horizontalAnchor);
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
        Cell.defaultTextClass = "--default-text-class";
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
            this._svgGroup = GraphTableSVG.SVG.createGroup(this.table.svgGroup);
            this.table = _table;
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
            this._svgGroup = GraphTableSVG.SVG.createGroup(this.table.svgGroup);
            this.table = _table;
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
                var s_1 = new Array(0);
                s_1.push("Sub create()");
                s_1.push(" Dim createdSlide As slide");
                s_1.push(" Set createdSlide = ActivePresentation.Slides.Add(1, ppLayoutBlank)");
                for (var i = 0; i < items.length; i++) {
                    s_1.push("Call create" + i + "(createdSlide)");
                }
                s_1.push("MsgBox \"created\"");
                s_1.push("End Sub");
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item instanceof GraphTableSVG.Table) {
                        var lines = item.createVBACode(i, "createdSlide");
                        lines.forEach(function (v) { return s_1.push(v); });
                    }
                    else if (item instanceof GraphTableSVG.Graph) {
                        var lines = item.createVBACode(i);
                        lines.forEach(function (v) { return s_1.push(v); });
                    }
                    else if (item instanceof SVGPathElement) {
                        var lines = SVGToVBA.createVBACodeOfSVGPath(item, i);
                        lines.forEach(function (v) { return s_1.push(v); });
                    }
                    else if (item instanceof SVGTextElement) {
                        var lines = SVGToVBA.createVBACodeOfTextElement(item, i);
                        lines.forEach(function (v) { return s_1.push(v); });
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
                var visible_2 = path.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                lines.push(" Call EditLine(edges" + id + "(" + i + ").Line, " + lineColor + ", msoLineSolid, " + 0 + ", " + strokeWidth + ", " + visible_2 + ")");
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
        SVGToVBA.cellFunctionCode = "\nSub EditTable(table_ As table, cellInfo_() As Variant)\n    Dim x As Integer\n    Dim y As Integer\n    \n    For x = 1 To UBound(cellInfo_, 1)\n        For y = 1 To UBound(cellInfo_, 2)\n         Call EditCell(table_.cell(x, y), CStr(cellInfo_(x, y)(0)))\n        Next\n    Next\nEnd Sub\n\nSub EditCell(cell_ As cell, text_ As String, backColor As Variant)\n    cell_.Shape.TextFrame.TextRange.text = text_\n    cell_.Shape.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))\nEnd Sub\nSub EditCellFont(frame_ As TextFrame, fontSize As Double, fontName As String, color As Variant, fontBold As Integer)\n    frame_.TextRange.Font.Size = fontSize\n    frame_.TextRange.Font.name = fontName\n    frame_.TextRange.Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))\n    frame_.TextRange.Font.Bold = fontBold\nEnd Sub\n\n\n\n\nSub EditRow(row_ As Row, height As Integer)\n    row_.height = height\nEnd Sub\nSub EditColumn(column_ As Column, width As Integer)\n    column_.width = width\nEnd Sub\n\nSub EditCellTextFrame(frame_ As TextFrame, marginTop As Double, marginBottom As Double, marginLeft As Double, marginRight As Double, vAnchor As Integer, hAnchor As Integer)\n    frame_.marginLeft = marginLeft\n    frame_.marginRight = marginRight\n    frame_.marginTop = marginTop\n    frame_.marginBottom = marginBottom\n    frame_.VerticalAnchor = vAnchor\n    frame_.TextRange.ParagraphFormat.Alignment = hAnchor\nEnd Sub\n\nSub EditTextRange(range_ As TextRange, text As String)\n    range_.text = text\nEnd Sub\nSub EditTextRangeSub(range_ As TextRange, subBeg As Integer, subLen As Integer, script As String, color As Variant, fontName As String, fontSize As Double, fontBold As Integer)\n    range_.Characters(subBeg, subLen).Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))\n    range_.Characters(subBeg, subLen).Font.Size = fontSize\n    range_.Characters(subBeg, subLen).Font.name = fontName\n    range_.Characters(subBeg, subLen).Font.Bold = fontBold\n    If script = \"subscript\" Then\n    range_.Characters(subBeg, subLen).Font.Subscript = True\n    End If\n    If script = \"superscript\" Then\n    range_.Characters(subBeg, subLen).Font.Superscript = True\n    End If\nEnd Sub\n\n\n\nSub EditShape(shape_ As Shape, name As String, visible As Integer, backColor As Variant)\n    shape_.name = name\n    shape_.Fill.visible = visible\n    shape_.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))\nEnd Sub\nSub EditCellBorder(line_ As LineFormat, foreColor As Variant, weight As Integer, transparent As Double)\n    line_.foreColor.RGB = RGB(CInt(foreColor(0)), CInt(foreColor(1)), CInt(foreColor(2)))\n    line_.weight = weight\n    line_.Transparency = transparent\nEnd Sub\n\nSub EditConnector(connector_ As ConnectorFormat, begShape As Shape, endShape As Shape, begPos As Integer, endPos As Integer)\n    Call connector_.BeginConnect(begShape, begPos)\n    Call connector_.EndConnect(endShape, endPos)\nEnd Sub\n\nSub EditTextFrame(frame_ As TextFrame, marginTop As Double, marginBottom As Double, marginLeft As Double, marginRight As Double, wordWrap As Boolean, autoSize As Integer)\n    frame_.autoSize = autoSize\n    frame_.wordWrap = wordWrap\n    frame_.marginLeft = marginLeft\n    frame_.marginRight = marginRight\n    frame_.marginTop = marginTop\n    frame_.marginBottom = marginBottom\nEnd Sub\n\nSub EditTextEffect(effect_ As TextEffectFormat, fontSize As Double, fontName As String)\n effect_.fontSize = fontSize\n effect_.fontName = fontName\nEnd Sub\n\nSub EditVertexShape(shape_ As Shape, name As String, visible As Integer, backColor As Variant)\n    shape_.name = name\n    shape_.Fill.visible = visible\n    shape_.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))\nEnd Sub\n\nSub EditLine(line_ As LineFormat, foreColor As Variant, dashStyle As Integer, transparent As Double, weight As Integer, visible As Integer)\n    line_.foreColor.RGB = RGB(CInt(foreColor(0)), CInt(foreColor(1)), CInt(foreColor(2)))\n    line_.dashStyle = dashStyle\n    line_.Transparency = transparent\n    line_.weight = weight\n    line_.visible = visible\nEnd Sub\n\n\n";
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
                        var childColor = GraphTableSVG.Color.createRGBFromColorName(css.fill);
                        var fontName = css.fontFamily;
                        var fontSize = GraphTableSVG.Common.toPX(css.fontSize);
                        var fontBold = Number(css.fontWeight) == 400 ? 0 : 1;
                        var len = child.textContent.length;
                        var f = child.getAttribute("data-script");
                        if (f == null) {
                            f = "";
                        }
                        sub.push(["Call EditTextRangeSub(" + range + "," + pos + ", " + len + ", \"" + f + "\", Array(" + childColor.r + ", " + childColor.g + ", " + childColor.b + "), " + fontName + ", " + fontSize + ", " + fontBold + " )"]);
                        pos += len;
                    }
                }
            }
            else if (item.textContent != null && item.textContent.length > 0) {
                var css = getComputedStyle(item);
                var color = GraphTableSVG.Color.createRGBFromColorName(css.fill);
                var fontName = css.fontFamily;
                var fontSize = GraphTableSVG.Common.toPX(css.fontSize);
                var fontBold = Number(css.fontWeight) == 400 ? 0 : 1;
                sub.push(["Call EditTextRangeSub(" + range + "," + 1 + ", " + item.textContent.length + ", \"\", Array(" + color.r + ", " + color.g + ", " + color.b + "), " + fontName + ", " + fontSize + ", " + fontBold + " )"]);
            }
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
                if (item instanceof GraphTableSVG.Graph) {
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
                if (v instanceof GraphTableSVG.Graph) {
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
            canvas.setAttribute("width", img.style.width);
            canvas.setAttribute("height", img.style.height);
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
                return;
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
    var PPTextBoxShapeBase = (function () {
        function PPTextBoxShapeBase(svgbox, option) {
            if (option === void 0) { option = {}; }
            this._svgGroup = GraphTableSVG.SVG.createGroup(svgbox);
            this._svgText = GraphTableSVG.SVG.createText();
            this.svgGroup.appendChild(this.svgText);
            if (option.text != undefined)
                this.svgText.setTextContent(option.text);
            if (option.isAutoSizeShapeToFitText != undefined)
                this.isAutoSizeShapeToFitText = option.isAutoSizeShapeToFitText;
        }
        Object.defineProperty(PPTextBoxShapeBase.prototype, "svgGroup", {
            get: function () {
                return this._svgGroup;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PPTextBoxShapeBase.prototype, "svgText", {
            get: function () {
                return this._svgText;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PPTextBoxShapeBase.prototype, "cx", {
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
        Object.defineProperty(PPTextBoxShapeBase.prototype, "cy", {
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
        Object.defineProperty(PPTextBoxShapeBase.prototype, "width", {
            get: function () {
                return this.svgGroup.getAttributeNumber("data-width", 0);
            },
            set: function (value) {
                this.svgGroup.setAttribute("data-width", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PPTextBoxShapeBase.prototype, "height", {
            get: function () {
                return this.svgGroup.getAttributeNumber("data-height", 0);
            },
            set: function (value) {
                this.svgGroup.setAttribute("data-height", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PPTextBoxShapeBase.prototype, "x", {
            get: function () {
                return this.cx - (this.width / 2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PPTextBoxShapeBase.prototype, "y", {
            get: function () {
                return this.cy - (this.height / 2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PPTextBoxShapeBase.prototype, "isAutoSizeShapeToFitText", {
            get: function () {
                return this.svgGroup.getPropertyStyleValueWithDefault(GraphTableSVG.Vertex.autoSizeShapeToFitTextName, "false") == "true";
            },
            set: function (value) {
                this.svgGroup.setPropertyStyleValue(GraphTableSVG.Vertex.autoSizeShapeToFitTextName, value ? "true" : "false");
            },
            enumerable: true,
            configurable: true
        });
        PPTextBoxShapeBase.prototype.update = function () {
            var vAnchor = this.svgGroup.getPropertyStyleValue(GraphTableSVG.VerticalAnchorPropertyName);
            if (vAnchor == null)
                vAnchor = GraphTableSVG.VerticalAnchor.Middle;
            var hAnchor = this.svgGroup.getPropertyStyleValue(GraphTableSVG.HorizontalAnchorPropertyName);
            if (hAnchor == null)
                hAnchor = GraphTableSVG.HorizontalAnchor.Center;
            if (this.isAutoSizeShapeToFitText) {
                var box = this.svgText.getBBox();
                this.width = box.width;
                this.height = box.height;
            }
            GraphTableSVG.Graph.setXY(this.svgText, this.innerRectangle, vAnchor, hAnchor);
        };
        Object.defineProperty(PPTextBoxShapeBase.prototype, "innerRectangle", {
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
        return PPTextBoxShapeBase;
    }());
    GraphTableSVG.PPTextBoxShapeBase = PPTextBoxShapeBase;
    var CallOut = (function (_super) {
        __extends(CallOut, _super);
        function CallOut(svgbox, option) {
            if (option === void 0) { option = {}; }
            var _this = _super.call(this, svgbox, option) || this;
            _this._svgPath = GraphTableSVG.SVG.createPath(_this.svgGroup, 0, 0, 0, 0);
            _this.width = 100;
            _this.height = 100;
            if (option.cx != undefined)
                _this.cx = option.cx;
            if (option.cy != undefined)
                _this.cy = option.cy;
            _this.speakerX = _this.cx;
            _this.speakerY = _this.cy;
            _this.update();
            return _this;
        }
        Object.defineProperty(CallOut.prototype, "svgPath", {
            get: function () {
                return this._svgPath;
            },
            enumerable: true,
            configurable: true
        });
        CallOut.prototype.update = function () {
            _super.prototype.update.call(this);
            var x1 = -(this.width / 2);
            var y1 = -(this.height / 2);
            var x2 = (this.width / 2);
            var y2 = (this.height / 2);
            var speakerDiffX = this.speakerX - this.cx;
            var speakerDiffY = this.speakerY - this.cy;
            var px1 = 0, px2 = 0, py1 = 0, py2 = 0;
            var mes = "";
            switch (this.SpeakerPosition) {
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
        Object.defineProperty(CallOut.prototype, "innerRectangle", {
            get: function () {
                var rect = new GraphTableSVG.Rectangle();
                rect.width = this.width;
                rect.height = this.height;
                rect.x = -this.width / 2;
                rect.y = -this.height / 2;
                ;
                return rect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CallOut.prototype, "speakerX", {
            get: function () {
                return this.svgGroup.getAttributeNumber("data-speaker-x", 0);
            },
            set: function (value) {
                this.svgGroup.setAttribute("data-speaker-x", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CallOut.prototype, "speakerY", {
            get: function () {
                return this.svgGroup.getAttributeNumber("data-speaker-y", 0);
            },
            set: function (value) {
                this.svgGroup.setAttribute("data-speaker-y", value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CallOut.prototype, "SpeakerPosition", {
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
                        var line = new GraphTableSVG.VLine(0, 0, this.height, this.width);
                        if (line.contains(speakerDiffX, speakerDiffY)) {
                            return "rightdown";
                        }
                        else {
                            return "downright";
                        }
                    }
                    else {
                        var line = new GraphTableSVG.VLine(0, 0, -this.height, this.width);
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
                        var line = new GraphTableSVG.VLine(0, 0, -this.height, this.width);
                        if (line.contains(speakerDiffX, speakerDiffY)) {
                            return "leftdown";
                        }
                        else {
                            return "downleft";
                        }
                    }
                    else {
                        var line = new GraphTableSVG.VLine(0, 0, this.height, this.width);
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
        return CallOut;
    }(PPTextBoxShapeBase));
    GraphTableSVG.CallOut = CallOut;
})(GraphTableSVG || (GraphTableSVG = {}));
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
SVGElement.prototype.getAttributeNumber = function (name, defaultValue) {
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