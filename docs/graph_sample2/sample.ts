import Graph = GraphTableSVG.Graph;
import Edge = GraphTableSVG.Edge;
import Vertex = GraphTableSVG.Vertex;

function createGraph(id : string, graphClass : string | null = null, 
    vertexClass : string | null = null, edgeClass : string | null = null) : [Graph, Vertex, Vertex, Vertex, Edge, Edge]{
    /* svgタグの取得 */
    var box : HTMLElement = document.getElementById(id);
    
    /* graphの作成 */
    var graph : GraphTableSVG.Graph = new GraphTableSVG.Graph(box, graphClass);
    /* graphをsvgタグの子に入れる */
    box.appendChild(graph.svgGroup);

    /* vertexの作成 */
    var node1 : GraphTableSVG.Vertex = GraphTableSVG.Vertex.create(graph, vertexClass);
    var node2 : GraphTableSVG.Vertex = GraphTableSVG.Vertex.create(graph, vertexClass);
    var node3 : GraphTableSVG.Vertex = GraphTableSVG.Vertex.create(graph, vertexClass);

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

function sample2(){
    createGraph("svgbox2");
}




window.onload = () => {
    sample2();
};
