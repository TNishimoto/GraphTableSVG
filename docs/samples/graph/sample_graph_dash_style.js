let graph = null;
window.onload = () => {
    graph = GraphTableSVG.createShape('svgbox', 'g-graph');

    /* 点線の種類 */
    const dashStyles = ["msoLineDash", "msoLineDashDot", "msoLineDashDotDot" , "msoLineLongDash" , "msoLineLongDashDot" , "msoLineRoundDot", "msoLineSolid", "msoLineSquareDot"];
    for(let i=0;i<dashStyles.length;i++){
        const vertexLL = GraphTableSVG.createShape(graph, 'g-rect', {cx : 50 , cy : (i+1) * 50});
        const vertexL = GraphTableSVG.createShape(graph, 'g-rect', {cx : 250 , cy : (i+1) * 50} );
        const vertexC = GraphTableSVG.createShape(graph, 'g-rect', {cx : 450 , cy : (i+1) * 50});
        const vertexR = GraphTableSVG.createShape(graph, 'g-rect', {cx : 700 , cy : (i+1) * 50});

        const edgeL = GraphTableSVG.createShape(graph, 'g-edge', {beginVertex : vertexLL, endVertex : vertexL});
        const edgeC = GraphTableSVG.createShape(graph, 'g-edge', {beginVertex : vertexL, endVertex : vertexC, text : dashStyles[i]});
        const edgeR = GraphTableSVG.createShape(graph, 'g-edge', {beginVertex : vertexC, endVertex : vertexR});

        edgeL.svgPath.style.strokeWidth="1px"; 
        edgeC.svgPath.style.strokeWidth="3px"; 
        edgeR.svgPath.style.strokeWidth="6px";

        /* 点線の設定　*/
        edgeL.svgPath.style.setProperty("--stroke-style", dashStyles[i]);
        edgeC.svgPath.style.setProperty("--stroke-style", dashStyles[i]);
        edgeR.svgPath.style.setProperty("--stroke-style", dashStyles[i]);


    }
    
};