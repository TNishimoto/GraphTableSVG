
let graph = null;
window.onload = () => {
    graph = GraphTableSVG.createShape('svgbox', 'g-graph');
    /* ノードをグラフの根にしたい場合はisRootにTrueを入れるか、graph.roots配列にノードを追加すること */
    const vertex1 = GraphTableSVG.createShape(graph, 'g-ellipse', {text : "1"} );
    const vertex2 = GraphTableSVG.createShape(graph, 'g-ellipse', {text : "2"} );
    const vertex3 = GraphTableSVG.createShape(graph, 'g-ellipse', {text : "3"} );
    const vertex4 = GraphTableSVG.createShape(graph, 'g-ellipse', {text : "4"} );
    const vertex5 = GraphTableSVG.createShape(graph, 'g-ellipse', {text : "5"} );
    const vertex6 = GraphTableSVG.createShape(graph, 'g-ellipse', {text : "6"} );
    const vertex7 = GraphTableSVG.createShape(graph, 'g-ellipse', {text : "7"} );
    const vertex8 = GraphTableSVG.createShape(graph, 'g-ellipse', {text : "8"} );
    const vertex9 = GraphTableSVG.createShape(graph, 'g-ellipse', {text : "9"} );
    const vertex10 = GraphTableSVG.createShape(graph, 'g-ellipse', {text : "10"} );
    const vertex11 = GraphTableSVG.createShape(graph, 'g-ellipse', {text : "11"} );
    const vertex12 = GraphTableSVG.createShape(graph, 'g-ellipse', {text : "12"} );

    /*
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
    */

    /* 第一引数のVertexに第二引数のVertexを子として追加する。二点間の辺は自動で作成される */
    graph.appendChild(vertex1, vertex2);
    graph.appendChild(vertex1, vertex3);
    graph.appendChild(vertex3, vertex4);
    graph.appendChild(vertex4, vertex5);
    graph.appendChild(vertex2, vertex6);
    graph.appendChild(vertex2, vertex7);
    graph.appendChild(vertex2, vertex8);
    graph.appendChild(vertex2, vertex9);
    graph.appendChild(vertex8, vertex10);
    graph.appendChild(vertex8, vertex11);
    graph.appendChild(vertex8, vertex12);

    /* 隣り合う頂点間の水平方向の間隔を設定 */
    graph.vertexXInterval = 70;
    /* 隣り合う頂点間の垂直方向の間隔を設定 */
    graph.vertexYInterval = 70;
    /* 木の各頂点の配置方法を選択 */
    graph.relocateFunction = GraphTableSVG.PPTreeArrangement.alignVerticeByLeave;


    document.getElementById("childrenButton").onclick = () => {
        graph.relocateFunction = GraphTableSVG.PPTreeArrangement.alignVerticeByChildren;
    };
    document.getElementById("leaveButton").onclick = () => {
        graph.relocateFunction = GraphTableSVG.PPTreeArrangement.alignVerticeByLeave;
    };

};
function XYInterval(px, py){
    graph.vertexXInterval += px;
    graph.vertexYInterval += py;

    if(graph.vertexXInterval < 0) graph.vertexXInterval = 0;
    if(graph.vertexYInterval < 0) graph.vertexYInterval = 0;
    graph.relocate();
}