let graph = null;
window.onload = () => {
    graph = GraphTableSVG.createShape('svgbox', 'g-graph');
    
    const node1 = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 250, cy : 250, text : "1"});
    const node2 = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 50, cy : 50, text : "2"});
    const node3 = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 250, cy : 50, text : "3"});
    const node4 = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 450, cy : 50, text : "4"});
    const node5 = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 50, cy : 250, text : "5"});

    const node6 = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 450, cy : 250, text : "6"});
    const node7 = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 50, cy : 450, text : "7"});
    const node8 = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 250, cy : 450, text : "8"});
    const node9 = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 450, cy : 450, text : "9"});


    GraphTableSVG.createShape(graph, 'g-line', {beginVertex : node1, endVertex : node2, text : "abcdef"});
    GraphTableSVG.createShape(graph, 'g-line', {beginVertex : node1, endVertex : node3, text : "abcdef"});
    GraphTableSVG.createShape(graph, 'g-line', {beginVertex : node1, endVertex : node4, text : "abcdef"});
    GraphTableSVG.createShape(graph, 'g-line', {beginVertex : node1, endVertex : node5, text : "abcdef"});
    GraphTableSVG.createShape(graph, 'g-line', {beginVertex : node1, endVertex : node6, text : "abcdef"});
    GraphTableSVG.createShape(graph, 'g-line', {beginVertex : node1, endVertex : node7, text : "abcdef"});
    GraphTableSVG.createShape(graph, 'g-line', {beginVertex : node1, endVertex : node8, text : "abcdef"});
    GraphTableSVG.createShape(graph, 'g-line', {beginVertex : node1, endVertex : node9, text : "abcdef"});
    graph.edges.forEach((v)=>{
        v.svgTextPath.style.fontSize = "32pt"
    })

};