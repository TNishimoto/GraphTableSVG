let graph = null;
window.onload = () => {        
    //const box = document.getElementById('svgbox');
    // graphの作成
    graph = GraphTableSVG.createShape('svgbox', 'g-graph');
    //graph = new GraphTableSVG.Graph(box);
    // vertexの作成
    const vertex = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 100, cy : 100, text : "hello world"});

    //const vertex = GraphTableSVG.Vertex.create(graph, {x:100, y:100});
    //vertex.svgText.textContent = "hello world";    
};