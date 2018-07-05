window.onload = () => {
    const box = document.getElementById('svgbox');
    const graph = new GraphTableSVG.Graph(box);    
    
    const node1 = GraphTableSVG.Vertex.create(graph,{x : 100, y : 100, text : "1"});
    const node2 = GraphTableSVG.Vertex.create(graph,{x : 150, y : 200, text : "2"});
    const node3 = GraphTableSVG.Vertex.create(graph,{x : 50, y : 200, text : "3"});

    const edge1 = GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node2, text : "abcd"});
    const edge2 = GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node3});

    /* x:400, y:200の位置に制御点の設定 */
    edge1.controlPoint = [[400, 200]];
    /* 終了節の方向に矢印を作成　*/
    edge1.markerEnd = GraphTableSVG.Edge.createMark();
    /* 開始節の方向に矢印を作成　*/
    edge2.markerStart = GraphTableSVG.Edge.createMark();
    
};