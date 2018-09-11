let graph = null;
window.onload = () => {
    graph = GraphTableSVG.createShape('svgbox', 'g-graph');

    const vertex1 = GraphTableSVG.createShape(graph, 'g-rect', {cx : 150, cy : 100, text : "1", id:"vertex1"});
    const vertex2 = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 100, cy : 200, text : "2", id:"vertex2"});
    const vertex3 = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 200, cy : 200, text : "3", id:"vertex3"});

    const edge1 = GraphTableSVG.createShape(graph, 'g-edge', {beginVertex : "vertex1", endVertex : "vertex2", text : "abcd" });
    const edge2 = GraphTableSVG.createShape(graph, 'g-edge', {beginVertex : vertex1, endVertex : vertex3 , text : "abcd" });

    //const edge1 = GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node2});
    //const edge2 = GraphTableSVG.Edge.create(graph, {text : "abcd"});

    //辺と節の接続
    //graph.connect(node1, edge2, node3);

    //辺のテキストの設定
    //edge1.svgTextPath.setTextContent("efgh");
};