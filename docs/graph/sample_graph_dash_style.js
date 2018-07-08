let graph = null;
window.onload = () => {
    const box = document.getElementById('svgbox');
    graph = new GraphTableSVG.Graph(box);

    const dashStyles = ["msoLineDash", "msoLineDashDot", "msoLineDashDotDot" , "msoLineLongDash" , "msoLineLongDashDot" , "msoLineRoundDot", "msoLineSolid", "msoLineSquareDot"];
    const alignments = ["begin", "end", "center", "regularInterval"]
    for(let i=0;i<dashStyles.length;i++){
        const nodeLL = GraphTableSVG.Vertex.create(graph,{surfaceType: "rectangle", x : 50, y : (i+1) * 50});
        const nodeL = GraphTableSVG.Vertex.create(graph,{surfaceType: "rectangle", x : 250, y : (i+1) * 50});
        const nodeC = GraphTableSVG.Vertex.create(graph,{surfaceType: "rectangle", x : 450, y : (i+1) * 50});
        const nodeR = GraphTableSVG.Vertex.create(graph,{surfaceType: "rectangle", x : 700, y : (i+1) * 50});

        const edgeL = GraphTableSVG.Edge.create(graph, {beginVertex : nodeLL, endVertex : nodeL, text : alignments[i%alignments.length],pathTextAlignment : alignments[i%alignments.length] });
        const edgeC = GraphTableSVG.Edge.create(graph, {beginVertex : nodeL, endVertex : nodeC, text : dashStyles[i]});
        const edgeR = GraphTableSVG.Edge.create(graph, {beginVertex : nodeC, endVertex : nodeR});

        edgeL.svgPath.style.strokeWidth="1px"; 
        edgeC.svgPath.style.strokeWidth="3px"; 
        edgeR.svgPath.style.strokeWidth="6px";

        GraphTableSVG.msoDashStyle.setStyle(edgeL.svgPath, dashStyles[i]);
        GraphTableSVG.msoDashStyle.setStyle(edgeC.svgPath, dashStyles[i]);
        GraphTableSVG.msoDashStyle.setStyle(edgeR.svgPath, dashStyles[i]);

    }
    
};