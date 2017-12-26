var Graph = GraphTableSVG.Graph;
var Edge = GraphTableSVG.Edge;
var Vertex = GraphTableSVG.Vertex;
var Table = GraphTableSVG.Table;
function createGraph(id, graphClass = null, vertexClass = null, edgeClass = null) {
    /* svgタグの取得 */
    var box = document.getElementById(id);
    /* graphの作成 */
    var graph = new GraphTableSVG.Graph(box, graphClass);
    /* graphをsvgタグの子に入れる */
    box.appendChild(graph.svgGroup);
    /* vertexの作成 */
    var node1 = GraphTableSVG.Vertex.create(graph, vertexClass);
    var node2 = GraphTableSVG.Vertex.create(graph, vertexClass);
    var node3 = GraphTableSVG.Vertex.create(graph, vertexClass);
    var edge1 = GraphTableSVG.Edge.create(graph, edgeClass);
    var edge2 = GraphTableSVG.Edge.create(graph, edgeClass);
    /* node1の座標を設定 */
    graph.connect(node1, edge1, node2);
    graph.connect(node1, edge2, node3);
    [node1.x, node1.y] = [100, 100];
    [node2.x, node2.y] = [150, 200];
    [node3.x, node3.y] = [50, 200];
    node1.svgText.textContent = "1";
    node2.svgText.textContent = "2";
    node3.svgText.textContent = "3";
    return [graph, node1, node2, node3, edge1, edge2];
}
function sample2() {
    createGraph("svgbox2");
}
function sample3() {
    var [graph, node1, node2, node3, edge1, edge2] = createGraph("svgbox3");
    GraphTableSVG.resetStyle(node1.surface.style);
    //node1.svgCircle.style.;
    node1.surface.setAttribute("class", "sample3_node");
}
function sample4() {
    var [graph, node1, node2, node3, edge1, edge2] = createGraph("svgbox4", null, "sample4_vertex");
}
function sample5() {
    var [graph, node1, node2, node3, edge1, edge2] = createGraph("svgbox5", "sample5_graph");
}
window.onload = () => {
    sample3();
    sample5();
};
//# sourceMappingURL=sample.js.map