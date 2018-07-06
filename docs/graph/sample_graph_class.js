window.onload = () => {
    const box = document.getElementById('svgbox');
    const graph = new GraphTableSVG.Graph(box, {graphClassName : "graph"});    
    
    const node1 = GraphTableSVG.Vertex.create(graph,{x : 100, y : 100, text : "1"});
    const node2 = GraphTableSVG.Vertex.create(graph,{x : 150, y : 200, text : "2"});
    const node3 = GraphTableSVG.Vertex.create(graph,{x : 50, y : 200, text : "3"});

    const edge1 = GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node2, text : "abcd"});
    const edge2 = GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node3});

    
};