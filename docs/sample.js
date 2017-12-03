var SVGTable = GraphTableSVG.SVGTable;
var SVGToVBA = GraphTableSVG.SVGToVBA;
var Graph = GraphTableSVG.Graph;
/*
class VirtualCell {
    pos_x: number;
    pos_y: number;
    parent: Table;
}
*/
//var table: SVGTable = null;
var svgBox;
var graphtable = null;
function getInputText() {
    var textbox = document.getElementById("inputtext_itb");
    return textbox.value;
}
function createSuffixArrayTable() {
    clear();
    var text = getInputText();
    var sa = StringModule.computeSuffixArray(text);
    console.log(text);
    svgBox.innerHTML = "";
    var table = new SVGTable(svgBox, 2, sa.length + 1);
    table.cells[0][0].svgText.textContent = "SA";
    table.cells[0][1].svgText.textContent = "Text";
    table.cells[0][1].svgText.style.textAnchor = "left";
    table.cells[0][0].width = 0;
    table.cells[0][0].height = 0;
    table.cells[0][1].width = 0;
    table.cells[0][1].height = 0;
    for (var i = 0; i < sa.length; i++) {
        var suffix = text.substr(sa[i]);
        table.cells[i + 1][0].svgText.textContent = sa[i].toString();
        table.cells[i + 1][1].svgText.textContent = suffix;
        table.cells[i + 1][1].svgText.style.textAnchor = "left";
        table.cells[i + 1][0].width = 0;
        table.cells[i + 1][0].height = 0;
        table.cells[i + 1][1].width = 0;
        table.cells[i + 1][1].height = 0;
    }
    table.resize();
    graphtable = table;
}
function leftPadding(str, length, _leftPadding) {
    while (str.length - length < 0) {
        str = _leftPadding + str;
    }
    return str;
}
function createLZ77WSRTable() {
    clear();
    var text = getInputText();
    var result = StringModule.LZ77WithSelfReference(text);
    svgBox.innerHTML = "";
    var table = new SVGTable(svgBox, text.length, result.length + 2);
    table.cellArray.forEach(function (x, i, arr) { x.width = 0; x.height = 0; });
    table.borders.forEach(function (x, i, arr) { x.style.visibility = "hidden"; });
    for (var i = 0; i < text.length; i++) {
        table.cells[0][i].svgText.textContent = leftPadding(i.toString(), 2, "_");
        table.cells[1][i].svgText.textContent = text[i];
    }
    for (var y = 0; y < table.height; y++) {
        for (var x = 0; x < table.width; x++) {
            if (y >= 2) {
                var cell = table.cells[y][x];
                cell.svgText.style.fontSize = "8pt";
            }
        }
    }
    var x = 0;
    var rows = table.rows;
    for (var i = 0; i < result.length; i++) {
        rows[2 + i].height = 10;
        if (typeof result[i] == "string") {
            table.cells[2 + i][x].svgBackground.style.fill = "red";
            x++;
        }
        else {
            var startPos = result[i][0];
            var length = result[i][1];
            for (var p = 0; p < length; p++) {
                table.cells[2 + i][x].svgBackground.style.fill = "red";
                var bottomLine = table.cells[2 + i][startPos + p].bottomLine;
                bottomLine.style.visibility = "visible";
                bottomLine.style.fill = "blue";
                x++;
            }
        }
    }
    table.resize();
    graphtable = table;
}
function createSuffixTrie() {
    clear();
    svgBox = document.getElementById('svgbox');
    var text = getInputText();
    var graph = new GraphTableSVG.OrderedOutcomingEdgesGraph(svgBox);
    var trie = TreeFunctions.createTrie(text);
    TreeFunctions.translate(trie, graph);
    /*
    var root = graph.getRoot();
    root.x = 50;
    root.y = 50;
    */
    graph.update();
    graphtable = graph;
}
function createSuffixTree() {
    clear();
    svgBox = document.getElementById('svgbox');
    var text = getInputText();
    var graph = new GraphTableSVG.OrderedOutcomingEdgesGraph(svgBox);
    var trie = TreeFunctions.createSuffixTree(text);
    TreeFunctions.translate(trie, graph);
    /*
    var root = graph.getRoot();
    root.x = 50;
    root.y = 50;
    */
    graph.update();
    graphtable = graph;
}
function clear() {
    svgBox = document.getElementById('svgbox');
    if (graphtable != null) {
        if (graphtable instanceof Graph) {
            graphtable.removeGraph(svgBox);
        }
        else if (graphtable instanceof SVGTable) {
            graphtable.removeTable(svgBox);
        }
    }
}
function createTestGraph() {
    svgBox = document.getElementById('svgbox');
    var graph = new Graph(svgBox);
    var node1 = GraphTableSVG.CircleVertex.create(graph);
    var node2 = GraphTableSVG.CircleVertex.create(graph);
    node1.svgGroup.setX(100);
    node1.svgGroup.setY(200);
    node2.svgGroup.setX(260);
    node2.svgGroup.setY(100);
    var edge1 = GraphTableSVG.LineEdge.create(graph, node1, node2);
    edge1.beginConnectType = GraphTableSVG.ConnecterPositionType.RightUp;
    edge1.endConnectType = GraphTableSVG.ConnecterPositionType.LeftUp;
    //graph.edges.push(edge1);
    //graph.nodes.push(node1);
    //graph.nodes.push(node2);
    graph.update();
}
window.onload = function () {
    //createTestGraph();
    /*
    svgBox = document.getElementById('svgbox');
    var el = document.getElementById('content');
    table = new SVGTable(svgBox, 5, 5);
    */
    //table.cells[0][0].svgText.textContent = "hogehgoehg<tbreak/>oheoghoeghoe";
};
function createCode() {
    var cnt = document.getElementById("codeBox");
    if (graphtable instanceof SVGTable) {
        cnt.value = SVGToVBA.createTable(graphtable);
        openModal("macro-modal");
    }
    else {
        alert("error");
    }
}
function copyAndClose() {
    var cnt = document.getElementById("codeBox");
    cnt.select();
    window.document.execCommand('copy');
    alert('クリップボードにコピーしました。');
    closeModal("macro-modal");
}
var TreeFunctions;
(function (TreeFunctions) {
    var TreeNode = (function () {
        function TreeNode() {
            this.children = [];
            this.edgeText = "";
            this.nodeText = "";
            this.parent = null;
            this._id = TreeNode.counter++;
        }
        Object.defineProperty(TreeNode.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreeNode.prototype, "path", {
            get: function () {
                if (this.parent == null) {
                    return this.edgeText;
                }
                else {
                    return this.parent.path + this.edgeText;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreeNode.prototype, "isRoot", {
            get: function () {
                return this.parent == null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreeNode.prototype, "isLeaf", {
            get: function () {
                return this.children.length == 0;
            },
            enumerable: true,
            configurable: true
        });
        TreeNode.prototype.getNodes = function () {
            var r = [this];
            if (this.isLeaf) {
                return r;
            }
            else {
                this.children.forEach(function (x, i, arr) {
                    x.getNodes().forEach(function (y, j, arr2) {
                        r.push(y);
                    });
                });
                return r;
            }
        };
        TreeNode.prototype.addLeaf = function (insertIndex, str) {
            var newNode = new TreeNode();
            newNode.parent = this;
            newNode.edgeText = str;
            this.children.splice(insertIndex, 0, newNode);
            return newNode;
        };
        TreeNode.prototype.split = function (splitPosition) {
            var pref = this.edgeText.substr(0, splitPosition);
            var suf = this.edgeText.substr(splitPosition);
            if (this.parent != null) {
                var newNode = new TreeNode();
                var i = this.parent.children.indexOf(this);
                this.parent.children[i] = newNode;
                newNode.children.push(this);
                this.parent = newNode;
                newNode.edgeText = pref;
                this.edgeText = suf;
                return newNode;
            }
            else {
                return this;
            }
        };
        TreeNode.prototype.locus = function (pattern) {
            //var matchLen = 0;
            if (pattern.length == 0)
                return [this, 0];
            var _a = StringModule.compare(this.edgeText, pattern), matchLen = _a[0], comp = _a[1];
            if (matchLen == this.edgeText.length && this.edgeText.length < pattern.length) {
                var edges = this.children.map(function (x, i, arr) { return x.edgeText.charCodeAt(0); });
                var suf = pattern.substr(matchLen);
                var _b = getInsertIndex(edges, suf.charCodeAt(0)), i = _b[0], b = _b[1];
                if (b) {
                    return this.children[i].locus(suf);
                }
                else {
                    return [this, matchLen];
                }
            }
            else {
                return [this, matchLen];
            }
        };
        return TreeNode;
    }());
    TreeNode.counter = 0;
    TreeFunctions.TreeNode = TreeNode;
    /*
    class LocusResult {
        node: TreeNode;
        matchLen: number;

    }
    */
    /*
    function getFirstPrefixIndex(texts: string[], pattern: string): number {
        for (var i = 0; i < texts.length; i++) {
            if (texts[i].indexOf(pattern) == 0) {
                return i;
            }
        }
        return -1;
    }
    */
    function addString(node, pattern) {
        if (pattern.length == 0)
            return node;
        var edges = node.children.map(function (x, i, arr) { return x.edgeText.charCodeAt(0); });
        var _a = getInsertIndex(edges, pattern.charCodeAt(0)), i = _a[0], isMatch = _a[1];
        if (!isMatch) {
            node.addLeaf(i, pattern[0]);
        }
        return addString(node.children[i], pattern.substr(1));
    }
    TreeFunctions.addString = addString;
    /*
    function getInsertIndex(texts: string[], pattern: string): [number, boolean] {
        for (var i = 0; i < texts.length; i++) {
            var [matchLen, p] = StringModule.compare(pattern, texts[i]);
            if (p < 0) {

            } else if (p == 0) {
                return [i, true];
            } else {
                return [i, false];
            }
            
        }
        return [texts.length, false];
    }
    */
    function getInsertIndex(texts, pattern) {
        for (var i = 0; i < texts.length; i++) {
            if (pattern < texts[i]) {
            }
            else if (pattern == texts[i]) {
                return [i, true];
            }
            else {
                return [i, false];
            }
        }
        return [texts.length, false];
    }
    TreeFunctions.getInsertIndex = getInsertIndex;
    function translate(root, graph) {
        var dic = [];
        root.getNodes().forEach(function (x) {
            var node = createNode(x, graph, dic);
            graph.outcomingEdgesDic[node.id] = [];
            x.children.forEach(function (y) {
                var child = createNode(y, graph, dic);
                var edge = GraphTableSVG.LineEdge.create(graph, node, child);
                edge.beginConnectType = GraphTableSVG.ConnecterPositionType.Bottom;
                edge.endConnectType = GraphTableSVG.ConnecterPositionType.Top;
                var edgeText = GraphTableSVG.EdgeText.create(graph, edge, y.edgeText);
                edge.text = edgeText;
                //graph.edges.push(edge);
                graph.outcomingEdgesDic[node.id].push(edge);
            });
        });
    }
    TreeFunctions.translate = translate;
    function shrink(root) {
        if (root.parent != null) {
            if (root.children.length == 1) {
                var child = root.children[0];
                var i = root.parent.children.indexOf(root);
                root.parent.children[i] = child;
                child.parent = root.parent;
                child.edgeText = root.edgeText + child.edgeText;
                shrink(child);
            }
            else {
                root.children.forEach(function (x) { shrink(x); });
            }
        }
        else {
            root.children.forEach(function (x) { shrink(x); });
        }
    }
    TreeFunctions.shrink = shrink;
    function createNode(treeNode, graph, dic) {
        if (treeNode.id in dic) {
            return dic[treeNode.id];
        }
        else {
            var node = GraphTableSVG.CircleVertex.create(graph);
            node.svgText.textContent = treeNode.id.toString();
            //graph.nodes.push(node);
            dic[treeNode.id] = node;
            return node;
        }
    }
    /*
    class TreeSVG {
        root: TreeNode;
        graph: GraphTableSVG.Graph;
        nodeDic: { [key: number]: GraphTableSVG.Vertex; } = [];
        edgeDic: { [key: number]: GraphTableSVG.Edge; } = [];

        public static create(_root: TreeNode, _graph: GraphTableSVG.Graph): TreeSVG {
            var p = new TreeSVG();
            p.root = _root;
            p.graph = _graph;

            p.root.getNodes().forEach(function (x, i, arr) {
                var node = GraphTableSVG.CircleVertex.create(p.graph);
                node.svgText.textContent = x.id.toString();
                p.nodeDic[x.id] = node;

                if (!x.isRoot) {
                    var parent = p.nodeDic[x.parent.id];
                    var edge = GraphTableSVG.LineEdge.create(p.graph, parent, node);
                    p.edgeDic[x.id] = edge;
                }

            });
            return p;
        }
    }
    */
})(TreeFunctions || (TreeFunctions = {}));
var TreeFunctions;
(function (TreeFunctions) {
    function createTrie(text) {
        var root = new TreeFunctions.TreeNode();
        for (var i = 0; i < text.length; i++) {
            TreeFunctions.addString(root, text.substr(i));
            //root.addString(text.substr(i));
        }
        return root;
    }
    TreeFunctions.createTrie = createTrie;
    function createSuffixTree(text) {
        var root = new TreeFunctions.TreeNode();
        for (var i = 0; i < text.length; i++) {
            TreeFunctions.addString(root, text.substr(i));
            //root.addString(text.substr(i));
        }
        TreeFunctions.shrink(root);
        return root;
    }
    TreeFunctions.createSuffixTree = createSuffixTree;
    /*
    function addString1(node: TreeNode, pattern: string): TreeNode {
        if (pattern.length == 0) return node;
        var edges = node.children.map(function (x, i, arr) { return x.edgeText.charCodeAt(0); });
        var [i, isMatch] = getInsertIndex(edges, pattern.charCodeAt(0));
        if (!isMatch) {
            return node.addLeaf(i, pattern[0]);
        } else {
            return addString1(node.children[i], pattern.substr(1));
        }

    }
    */
})(TreeFunctions || (TreeFunctions = {}));
var FooterButton = (function () {
    function FooterButton(_buttonIDPrefix, _contentIDPrefix, id) {
        var content = document.getElementById("" + _contentIDPrefix + id);
        var button = document.getElementById("" + _buttonIDPrefix + id);
        this.button_ = button;
        this.content_ = content;
        //this.isActive = isActive;
    }
    Object.defineProperty(FooterButton.prototype, "isActive", {
        /*
        static isActive(content: HTMLDivElement) {
            return content.style.display == "block";
        }
        
        static getContent(_contentIDPrefix: string, id: number): HTMLDivElement {
            var content: HTMLDivElement = <HTMLDivElement>document.getElementById(`${_contentIDPrefix}${id}`);
            return content;
        }
        static getButton(_buttonIDPrefix: string, id: number): HTMLDivElement {
            var content: HTMLDivElement = <HTMLDivElement>document.getElementById(`${_buttonIDPrefix}${id}`);
            return content;
        }
        static setMode(value: boolean) {
            if (value) {
                this.content_.style.display = "block";
                this.button_.style.backgroundColor = FooterButton.activeColor;
                this.content_.style.backgroundColor = FooterButton.activeColor;
            } else {
    
                this.content_.style.display = "none";
                this.button_.style.backgroundColor = FooterButton.nonActiveColor;
                this.content_.style.backgroundColor = FooterButton.nonActiveColor;
            }
            this.isActive_ = value;
    
        }
        */
        get: function () {
            return this.content_.style.display == "block";
        },
        set: function (value) {
            if (value) {
                this.content_.style.display = "block";
                this.button_.style.backgroundColor = FooterButton.activeColor;
                this.content_.style.backgroundColor = FooterButton.activeColor;
            }
            else {
                this.content_.style.display = "none";
                this.button_.style.backgroundColor = FooterButton.nonActiveColor;
                this.content_.style.backgroundColor = FooterButton.nonActiveColor;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FooterButton.prototype, "isExist", {
        get: function () {
            return this.content_ != null;
        },
        enumerable: true,
        configurable: true
    });
    FooterButton.call = function (_buttonIDPrefix, _contentIDPrefix, id) {
        var i = 0;
        while (true) {
            var item = new FooterButton(_buttonIDPrefix, _contentIDPrefix, i);
            if (!item.isExist)
                break;
            item.isActive = i == id;
            i++;
        }
    };
    return FooterButton;
}());
FooterButton.activeColor = "#31c8aa";
FooterButton.nonActiveColor = "#524b4b";
function openModal(modalName) {
    var div = document.getElementById(modalName);
    div.style.left = ((window.outerWidth - parseInt(div.style.width)) / 2) + "px";
    div.style.top = ((window.outerHeight - parseInt(div.style.height)) / 2) + "px";
    $("body").append('<div id="modal-bg" style="z-index:5"></div>');
    $("#modal-bg,#" + modalName).fadeIn("fast");
    $("#modal-bg").click(function () {
        closeModal(modalName);
    });
}
function closeModal(name) {
    $("#" + name + ",#modal-bg").fadeOut("fast", function () {
        //挿入した<div id="modal-bg"></div>を削除
        $('#modal-bg').remove();
        //graphManager.editMode = GUIEditMode.View;
    });
}
var StringModule;
(function (StringModule) {
    function bunrui(strings) {
        var p = {};
        for (var i = 0; i < strings.length; i++) {
            var str1 = strings[i];
            var c = str1.charCodeAt(0);
            if (p[c] == null)
                p[c] = new Array(0);
            p[c].push(str1.substring(1));
        }
        return p;
    }
    function getChars(str) {
        var p = {};
        var r = new Array(0);
        var count = 0;
        for (var i = 0; i < str.length; i++) {
            if (p[str.charAt(i)] == null) {
                p[str.charCodeAt(i)] = str.charAt(i);
                count++;
            }
            else {
            }
        }
        for (var c in p) {
            var ch = +c;
            r.push(String.fromCharCode(ch));
        }
        return r;
    }
    function compare(str1, str2) {
        var min = Math.min(str1.length, str2.length);
        for (var i = 0; i <= min; i++) {
            if (str1.charAt(i) < str2.charAt(i)) {
                return [i, -1];
            }
            else if (str1.charAt(i) > str2.charAt(i)) {
                return [i, 1];
            }
        }
        if (str1 == str2) {
            return [str1.length, 0];
        }
        else {
            return str1.length < str2.length ? [str1.length, 1] : [str2.length, -1];
        }
    }
    StringModule.compare = compare;
    function computeSuffixArray(str) {
        var arr = new Array(str.length);
        for (var i = 0; i < str.length; i++) {
            arr[i] = i;
        }
        var func = function (item1, item2) {
            for (var i = 0; i <= str.length; i++) {
                if (item1 + i >= str.length || item2 + i >= str.length)
                    break;
                if (str.charAt(item1 + i) < str.charAt(item2 + i)) {
                    return -1;
                }
                else if (str.charAt(item1 + i) > str.charAt(item2 + i)) {
                    return 1;
                }
            }
            if (item1 == item2) {
                return 0;
            }
            else {
                return item1 < item2 ? 1 : -1;
            }
        };
        arr.sort(func);
        return arr;
    }
    StringModule.computeSuffixArray = computeSuffixArray;
    function getSortedSuffixes(str) {
        var arr = computeSuffixArray(str);
        var r = new Array(arr.length);
        for (var i = 0; i < arr.length; i++) {
            r[i] = str.substring(arr[i]);
        }
        return r;
    }
    function computeLCP(str1, str2) {
        var min = str1.length < str2.length ? str1.length : str2.length;
        var lcp = 0;
        for (var i = 0; i < min; i++) {
            if (str1.charAt[i] == str2.charAt[i]) {
                lcp++;
            }
            else {
                break;
            }
        }
        return lcp;
    }
    function computeLCPArray(str, sufarr) {
        var lcparr = new Array(sufarr.length);
        for (var i = 0; i < sufarr.length; i++) {
            if (i == 0 && sufarr.length > 1) {
                lcparr[i] = -1;
            }
            else {
                lcparr[i] = computeLCP(str.substring(sufarr[i]), str.substring(sufarr[i - 1]));
            }
        }
        return lcparr;
    }
    function createAllSuffixes(str) {
        var str2 = "";
        for (var i = 0; i < str.length; i++) {
            if (str[i] != "\n") {
                str2 += str[i];
            }
        }
        var suffixes = new Array(str2.length);
        for (var i = 0; i < suffixes.length; i++) {
            suffixes[i] = str2.substring(i);
        }
        return suffixes;
    }
    StringModule.createAllSuffixes = createAllSuffixes;
    function createAllTruncatedSuffixes(str, truncatedLength) {
        var suffixes = new Array(str.length);
        for (var i = 0; i < suffixes.length; i++) {
            suffixes[i] = str.substr(i, truncatedLength);
        }
        return suffixes;
    }
    StringModule.createAllTruncatedSuffixes = createAllTruncatedSuffixes;
    function removeSpace(str) {
        var r = "";
        var emptyCode = " ".charCodeAt(0);
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) != emptyCode) {
                r += str.charAt(i);
            }
        }
        return r;
    }
    StringModule.removeSpace = removeSpace;
    function removeFirstSpaces(str) {
        var i = 0;
        for (i = 0; i < str.length; i++) {
            if (str[i] != " ")
                break;
        }
        if (i == str.length) {
            return "";
        }
        else {
            return str.substring(i);
        }
    }
    function reverse(str) {
        var rv = [];
        for (var i = 0, n = str.length; i < n; i++) {
            rv[i] = str.charAt(n - i - 1);
        }
        return rv.join("");
    }
    StringModule.reverse = reverse;
    function LZ77WithSelfReference(str) {
        var r = new Array(0);
        var startPos = 0;
        var lastRefPos = -1;
        var i = 0;
        while (i < str.length) {
            var substr = str.substr(startPos, i - startPos + 1);
            var reference = i == 0 ? "" : str.substr(0, i);
            var refPos = reference.indexOf(substr);
            if (refPos == -1) {
                if (lastRefPos == -1) {
                    r.push(substr);
                    i++;
                }
                else {
                    r.push([lastRefPos, i - startPos]);
                }
                startPos = i;
                lastRefPos = -1;
            }
            else {
                lastRefPos = refPos;
                i++;
            }
        }
        if (lastRefPos != -1) {
            r.push([lastRefPos, str.length - startPos]);
        }
        return r;
    }
    StringModule.LZ77WithSelfReference = LZ77WithSelfReference;
})(StringModule || (StringModule = {}));
//# sourceMappingURL=sample.js.map