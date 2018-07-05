window.onload = () => {
    const box = document.getElementById('svgbox');
    const graph = new GraphTableSVG.Graph(box);
    
    const node1 = GraphTableSVG.Vertex.create(graph, {x : 150, y : 100, text : "1", surfaceType: "rectangle"});
    const node2 = GraphTableSVG.Vertex.create(graph, {x : 100, y : 200, text : "2"});
    const node3 = GraphTableSVG.Vertex.create(graph, {x : 200, y : 200, text : "3"});
    const edge1 = GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node2});
    const edge2 = GraphTableSVG.Edge.create(graph, {text : "abcd"});

    //辺と節の接続
    graph.connect(node1, edge2, node3);

    //辺のテキストの設定
    edge1.svgTextPath.setTextContent("efgh");
};