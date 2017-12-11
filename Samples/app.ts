
import SVGTable = GraphTableSVG.SVGTable;
import SVGToVBA = GraphTableSVG.SVGToVBA;
import Graph = GraphTableSVG.Graph;
var svgBox: HTMLElement;
//var mainGroup: SVGGElement;
var graphtable: SVGTable | Graph | null = null;

/*
class VirtualCell {
    pos_x: number;
    pos_y: number;
    parent: Table;
}
*/
//var table: SVGTable = null;

function getInputText(): string {
    var textbox: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById(`inputtext_itb`);
    return textbox.value;
}



function createSuffixArrayTable() {
    clear();

    var text: string = getInputText();
    var sa: number[] = StringModule.computeSuffixArray(text);
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
        table.cells[i+1][0].svgText.textContent = sa[i].toString();
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
function leftPadding(str: string, length: number, _leftPadding: string) : string {
    while (str.length - length < 0) {
        str = _leftPadding + str;
    }
    return str;
}
function createLZ77WSRTable() {
    clear();
    var text: string = getInputText();
    var result = StringModule.LZ77WithSelfReference(text);

    svgBox.innerHTML = "";
    var table = new SVGTable(svgBox, text.length, result.length + 2);

    table.cellArray.forEach(function (x, i, arr) { x.width = 0; x.height = 0 });
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
        } else {
            var startPos = <number>result[i][0];
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
    var graph = new GraphTableSVG.OrderedTree();
    svgBox.appendChild(graph.svgGroup);

    var trie = TreeFunctions.createTrie(text);
    TreeFunctions.translate(trie, graph);
    /*
    var root = graph.getRoot();
    root.x = 50;
    root.y = 50;
    */
    graph.update();
    GraphTableSVG.GraphArrangement.standardTreeArrangement(graph, 90);
    graph.tree.setRectangleLocation(0, 0);


    graphtable = graph;

    var rect = graph.getRegion();
    setSVGBoxSize(rect.width, rect.height);
}
function createSuffixTree() {
    clear();

    svgBox = document.getElementById('svgbox');
    var text = getInputText();
    var graph = new GraphTableSVG.OrderedTree();
    svgBox.appendChild(graph.svgGroup);


    var trie = TreeFunctions.createSuffixTree(text);
    TreeFunctions.translate(trie, graph);
    /*
    var root = graph.getRoot();
    root.x = 50;
    root.y = 50;
    */

    //graph.arrangementFunction = GraphTableSVG.GraphArrangement.createStandardTreeArrangementFunction(90);

    GraphTableSVG.GraphArrangement.standardTreeArrangement(graph, 90);
    graph.tree.setRectangleLocation(0, 0);
    
    graphtable = graph;

}
function setSVGBoxSize(w: number, h: number) {
    svgBox = document.getElementById('svgbox');
    var width = `${w}px`;
    var height = `${h}px`;

    if (svgBox.style.width != width || svgBox.style.height != height) {
        svgBox.style.width = width;
        svgBox.style.height = height;
        svgBox.setAttribute(`viewBox`, `0 0 ${w} ${h}`);
    }

}
function clear() {
    svgBox = document.getElementById('svgbox');
    if (graphtable != null) {
        if (graphtable instanceof Graph) {
            graphtable.removeGraph(svgBox);
        } else if (graphtable instanceof SVGTable) {
            graphtable.removeTable(svgBox);
        }
    }
}

function createTestGraph() {
    svgBox = document.getElementById('svgbox');
    var graph = new Graph();
    svgBox.appendChild(graph.svgGroup);

    var node1 = GraphTableSVG.CircleVertex.create(graph);
    var node2 = GraphTableSVG.CircleVertex.create(graph);
    node1.svgGroup.setX(100)
    node1.svgGroup.setY(200)

    node2.svgGroup.setX(260);
    node2.svgGroup.setY(100);
    var edge1 = GraphTableSVG.LineEdge.create();
    graph.connect(node1, edge1, node2);

    edge1.beginConnecterType = GraphTableSVG.ConnecterPosition.RightUp;
    edge1.endConnecterType = GraphTableSVG.ConnecterPosition.LeftUp;

    //graph.edges.push(edge1);
    

    //graph.nodes.push(node1);
    //graph.nodes.push(node2);
    graph.update();
}
function createSLP() {
    clear();

    svgBox = document.getElementById('svgbox');
    var text = getInputText();
    //var graph = new GraphTableSVG.OrderedForest();
    //svgBox.appendChild(graph.svgGroup);


    //var table = new GraphTableSVG.SVGTable(svgBox, 2, 10);


    var clicker = new SLP.Clicker(text, svgBox);

    graphtable = clicker.graph;
    //var rect = graph.getRegion();
    //setSVGBoxSize(rect.right, rect.bottom);
}
window.onload = () => {

    svgBox = document.getElementById('svgbox');
    //mainGroup = <SVGGElement><any>document.getElementById('main_group');
    //mainGroup = GraphTableSVG.createGroup();
    //svgBox.appendChild(mainGroup);
    
    _observer = new MutationObserver(observeFunction);
    var option: MutationObserverInit = {
        subtree : true, attributes: true
    };
    _observer.observe(svgBox, option);

    //svgBox.onclick = (v) => { console.log("click") };
    
    /*
    var box = document.getElementById('svgbox');
    var graph = new GraphTableSVG.OrderedTree(box);

    var node1 = GraphTableSVG.CircleVertex.create(graph, 100,100);
    var node2 = GraphTableSVG.CircleVertex.create(graph, 150, 200);
    var node3 = GraphTableSVG.CircleVertex.create(graph, 50, 200);

    
    var edge1 = GraphTableSVG.LineEdge.create(graph, node1, node2, GraphTableSVG.ConnecterPosition.Bottom, GraphTableSVG.ConnecterPosition.Top);
    var edge2 = GraphTableSVG.LineEdge.create(graph, node1, node3, GraphTableSVG.ConnecterPosition.Bottom, GraphTableSVG.ConnecterPosition.Top);

    */

    /*
    var observar = new MutationObserver(function (x) { console.log(x) });
    var option: MutationObserverInit = { attributes: true };
    observar.observe(node1.svgGroup, option);
    */

    /*
    var func = function (x) { console.log(x) };
    edge1.svg.addEventListener("DOMAttrModified", func);
    */

    //[edge2.beginConnectType, edge2.endConnectType] = [GraphTableSVG.ConnecterPositionType.Bottom, GraphTableSVG.ConnecterPositionType.Top];

    /*
    [node1.x, node1.y] = [100, 100];
    [node2.x, node2.y] = [150, 150];
    [node3.x, node3.y] = [50, 200];
    */
    //graph.update();
    
    //createSuffixTree();

};
var _observer: MutationObserver;
var observeFunction: MutationCallback = (x: MutationRecord[]) => {
    if (graphtable instanceof Graph) {
        var rect = graphtable.getRegion();
        setSVGBoxSize(rect.right, rect.bottom);
    }
}
function createCode() {
    var cnt = <HTMLInputElement>document.getElementById("codeBox");

    if (graphtable instanceof SVGTable) {
        cnt.value = SVGToVBA.createTable(graphtable);
        openModal("macro-modal");
    } else {
        alert("error");
    }

}
function copyAndClose() {
    var cnt = <HTMLInputElement>document.getElementById("codeBox");
    cnt.select();
    window.document.execCommand('copy');
    alert('クリップボードにコピーしました。');
    closeModal("macro-modal");
}

