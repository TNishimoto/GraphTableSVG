let graph = null;
window.onload = () => {
    const box = document.getElementById('svgbox');
    graph = new GraphTableSVG.Graph(box);
    
    const node1 = GraphTableSVG.Vertex.create(graph, {x : 400, y : 400, text : "1"});
    const node2 = GraphTableSVG.Vertex.create(graph, {x : 200, y : 200, text : "2"});
    const node3 = GraphTableSVG.Vertex.create(graph, {x : 400, y : 200, text : "3"});
    const node4 = GraphTableSVG.Vertex.create(graph, {x : 600, y : 200, text : "4"});
    const node5 = GraphTableSVG.Vertex.create(graph, {x : 200, y : 400, text : "5"});

    const node6 = GraphTableSVG.Vertex.create(graph, {x : 600, y : 400, text : "6"});
    const node7 = GraphTableSVG.Vertex.create(graph, {x : 200, y : 600, text : "7"});
    const node8 = GraphTableSVG.Vertex.create(graph, {x : 400, y : 600, text : "8"});
    const node9 = GraphTableSVG.Vertex.create(graph, {x : 600, y : 600, text : "9"});

    GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node2, text : "abcdef"});
    GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node3, text : "abcdef"});
    GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node4, text : "abcdef"});
    GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node5, text : "abcdef"});
    GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node6, text : "abcdef"});
    GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node7, text : "abcdef"});
    GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node8, text : "abcdef"});
    GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node9, text : "abcdef"});
    graph.edges.forEach((v)=>{v.svgTextPath.style.fontSize = "32pt"})

};