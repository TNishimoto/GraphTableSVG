window.onload = () => {
    const box = document.getElementById('svgbox');
    const graph = new GraphTableSVG.Graph(box);    
    
    const node1 = GraphTableSVG.Vertex.create(graph, {surfaceType: "rectangle", text:"hogehgoe"});
    const node2 = GraphTableSVG.Vertex.create(graph);
    const node3 = GraphTableSVG.Vertex.create(graph);

    const edge1 = GraphTableSVG.Edge.create(graph);
    const edge2 = GraphTableSVG.Edge.create(graph);

    edge1.controlPoint = [[600, 100]];
    edge1.markerEnd = GraphTableSVG.Edge.createMark();
    edge2.markerStart = GraphTableSVG.Edge.createMark();

    graph.connect(node1, edge1, node2);
    graph.connect(node1, edge2, node3);
    [node1.x, node1.y] = [500, 100];
    [node2.x, node2.y] = [550, 200];
    [node3.x, node3.y] = [450, 200];
    //node1.svgText.textContent = "1";
    node2.svgText.textContent = "2";
    node3.svgText.textContent = "3";
    
    edge1.svgTextPath.setTextContent("abcd");
};