let graph = null;
window.onload = () => {
    const box = document.getElementById('svgbox');
    graph = new GraphTableSVG.Graph(box);

    /* 辺上のテキストの配置方法 */
    const alignments = ["begin", "end", "center", "regularInterval"]

    for(let i=0;i<alignments.length;i++){
        const node1 = GraphTableSVG.Vertex.create(graph,{surfaceType: "rectangle", x : 50, y : (i+2) * 50});
        const node2 = GraphTableSVG.Vertex.create(graph,{surfaceType: "rectangle", x : 250, y : (i+2) * 50});
        const node3 = GraphTableSVG.Vertex.create(graph,{surfaceType: "rectangle", x : 450, y : (i+2) * 50});
        /* pathTextAlignmentで辺のテキストの配置方法を決定 */
        const edge1 = GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node2, 
            text : alignments[i], pathTextAlignment : alignments[i] }); 
        const edge2 = GraphTableSVG.Edge.create(graph, {beginVertex : node2, endVertex : node3, text : alignments[i] });
        edge2.controlPoint = [[350, i*50]];
        /* pathTextAlignmentはプロパティから設定可能 */
        edge2.pathTextAlignment = alignments[i];
            
    }
    
};