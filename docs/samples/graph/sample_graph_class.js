let graph = null;
window.onload = () => {
    graph = GraphTableSVG.createShape('svgbox', 'g-graph', {class : "graph"}); 
    
    
    const vertex1 = GraphTableSVG.createShape(graph, 'g-rect', {cx : 100, cy : 100, text : "1"});
    const vertex2 = GraphTableSVG.createShape(graph, 'g-rect', {cx : 150, cy : 200, text : "2"});
    const vertex3 = GraphTableSVG.createShape(graph, 'g-rect', {cx : 50 , cy : 200, text : "3"});
    
    const edge1 = GraphTableSVG.createShape(graph, 'g-edge', {beginVertex : vertex1, endVertex : vertex2 , text : "abcd" });
    const edge2 = GraphTableSVG.createShape(graph, 'g-edge', {beginVertex : vertex1, endVertex : vertex3 });


    
};