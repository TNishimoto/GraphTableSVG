
let graph = null;
window.onload = () => {
    const box = document.getElementById('svgbox');
    graph = new GraphTableSVG.Graph(box);
    /* ノードをグラフの根にしたい場合はisRootにTrueを入れるか、graph.roots配列にノードを追加すること */
    const node1 = GraphTableSVG.Vertex.create(graph, {text:"1", isRoot : true});
    const node2 = GraphTableSVG.Vertex.create(graph, {text:"2"});
    const node3 = GraphTableSVG.Vertex.create(graph, {text:"3"});
    const node4 = GraphTableSVG.Vertex.create(graph, {text:"4"});
    const node5 = GraphTableSVG.Vertex.create(graph, {text:"5"});
    const node6 = GraphTableSVG.Vertex.create(graph, {text:"6"});
    const node7 = GraphTableSVG.Vertex.create(graph, {text:"7"});
    const node8 = GraphTableSVG.Vertex.create(graph, {text:"8"});
    const node9 = GraphTableSVG.Vertex.create(graph, {text:"9"});
    const node10 = GraphTableSVG.Vertex.create(graph, {text:"10"});
    const node11 = GraphTableSVG.Vertex.create(graph, {text:"11"});
    const node12 = GraphTableSVG.Vertex.create(graph, {text:"12"});

    /* 第一引数のVertexに第二引数のVertexを子として追加する。二点間の辺は自動で作成される */
    graph.appendChild(node1, node2);
    graph.appendChild(node1, node3);
    graph.appendChild(node3, node4);
    graph.appendChild(node4, node5);
    graph.appendChild(node2, node6);
    graph.appendChild(node2, node7);
    graph.appendChild(node2, node8);
    graph.appendChild(node2, node9);
    graph.appendChild(node8, node10);
    graph.appendChild(node8, node11);
    graph.appendChild(node8, node12);

    /* 隣り合う頂点間の水平方向の間隔を設定 */
    graph.vertexXInterval = 70;
    /* 隣り合う頂点間の垂直方向の間隔を設定 */
    graph.vertexYInterval = 70;
    /* 木の各頂点の配置方法を選択 */
    graph.relocateFunction = GraphTableSVG.TreeArrangement.alignVerticeByLeave;


    document.getElementById("childrenButton").onclick = () => {
        graph.relocateFunction = GraphTableSVG.TreeArrangement.alignVerticeByChildren;
    };
    document.getElementById("leaveButton").onclick = () => {
        graph.relocateFunction = GraphTableSVG.TreeArrangement.alignVerticeByLeave;
    };

};
function XYInterval(px, py){
    graph.vertexXInterval += px;
    graph.vertexYInterval += py;

    if(graph.vertexXInterval < 0) graph.vertexXInterval = 0;
    if(graph.vertexYInterval < 0) graph.vertexYInterval = 0;
    graph.relocate();
}