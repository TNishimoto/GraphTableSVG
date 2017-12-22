
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

/*
function getInputText(): string {
    var textbox: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById(`inputtext_itb`);
    return textbox.value;
}
*/
function leftPadding(str: string, length: number, _leftPadding: string) : string {
    while (str.length - length < 0) {
        str = _leftPadding + str;
    }
    return str;
}
function createLZ77WSRTable() {
    if (graphtable != null) {
        clear(svgBox, [graphtable]);
    }
    var text: string = getInputText(`inputtext_itb`);
    var result = StringModule.LZ77WithSelfReference(text);

    svgBox.innerHTML = "";
    var table = new SVGTable(text.length, result.length + 2);
    svgBox.appendChild(table.svgGroup);
    

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
    if (graphtable != null) {
        clear(svgBox, [graphtable]);
    }

    svgBox = document.getElementById('svgbox');
    var text = getInputText(`inputtext_itb`);
    var graph = new GraphTableSVG.Graph();
    svgBox.appendChild(graph.svgGroup);

    var trie = TreeFunctions.createTrie(text);
    TreeFunctions.translate(trie, graph);
    /*
    var root = graph.getRoot();
    root.x = 50;
    root.y = 50;
    */
    //graph.update();
    GraphTableSVG.GraphArrangement.standardTreeArrangement(graph, 90, 90);
    var tree = new GraphTableSVG.VirtualTree(graph, graph.rootVertex);
    tree.setRectangleLocation(0, 0);
    //graph.tree.setRectangleLocation(0, 0);


    graphtable = graph;

    var rect = graph.getRegion();
    setSVGBoxSize(svgBox, rect.width, rect.height);
}
function createSuffixTree() {
    if (graphtable != null) {
        clear(svgBox, [graphtable]);
    }

    svgBox = document.getElementById('svgbox');
    var text = getInputText(`inputtext_itb`);
    var graph = new GraphTableSVG.Graph();
    svgBox.appendChild(graph.svgGroup);


    var trie = TreeFunctions.createSuffixTree(text);
    TreeFunctions.translate(trie, graph);
    /*
    var root = graph.getRoot();
    root.x = 50;
    root.y = 50;
    */

    //graph.arrangementFunction = GraphTableSVG.GraphArrangement.createStandardTreeArrangementFunction(90);

    GraphTableSVG.GraphArrangement.standardTreeArrangement(graph, 90, 90);
    var tree = new GraphTableSVG.VirtualTree(graph, graph.rootVertex);
    tree.setRectangleLocation(0, 0);
    
    graphtable = graph;

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
    var edge1 = GraphTableSVG.Edge.create(graph);
    graph.connect(node1, edge1, node2);

    edge1.beginConnectorType = GraphTableSVG.ConnectorPosition.RightUp;
    edge1.endConnectorType = GraphTableSVG.ConnectorPosition.LeftUp;

    //graph.edges.push(edge1);
    

    //graph.nodes.push(node1);
    //graph.nodes.push(node2);
    //graph.update();
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
    
    
    //createSuffixTree();

};
var _observer: MutationObserver;
var observeFunction: MutationCallback = (x: MutationRecord[]) => {
    if (graphtable instanceof Graph) {
        var rect = graphtable.getRegion();
        setSVGBoxSize(svgBox, rect.right, rect.bottom);
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