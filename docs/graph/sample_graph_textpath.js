let graph = null;
window.onload = () => {    
    graph = GraphTableSVG.createShape('svgbox', 'g-graph');

    /* 辺上のテキストの配置方法 */
    const alignments = ["begin", "end", "center", "regularInterval"]

    for(let i=0;i<alignments.length;i++){

        const vertex1 = GraphTableSVG.createShape(graph, 'g-rect', {cx : 50 , cy : (i+2) * 50});
        const vertex2 = GraphTableSVG.createShape(graph, 'g-rect', {cx : 250, cy : (i+2) * 50});
        const vertex3 = GraphTableSVG.createShape(graph, 'g-rect', {cx : 450, cy : (i+2) * 50});

        /* pathTextAlignmentで辺のテキストの配置方法を決定 */
        const edge1 = GraphTableSVG.createShape(graph, 'g-line', {beginVertex : vertex1, endVertex : vertex2, text : alignments[i], pathTextAlignment : alignments[i] } );
        const edge2 = GraphTableSVG.createShape(graph, 'g-line', {beginVertex : vertex2, endVertex : vertex3 , text : alignments[i]});
        edge2.controlPoint = [[350, i*50]];
        /* pathTextAlignmentはプロパティから設定可能 */
        edge2.pathTextAlignment = alignments[i];
            
    }
    
};