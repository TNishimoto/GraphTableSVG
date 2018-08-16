let graph = null;
window.onload = () => {
    graph = GraphTableSVG.createShape('svgbox', 'g-graph');

    const connectorTypes = ["top", "topleft", "left", "bottomleft", "bottom", "bottomright", "right", "topright", "auto"];
    for(let i=0;i<9;i++){

        const vertexL = GraphTableSVG.createShape(graph, 'g-rect'   , {cx : 100, cy : (i+1) * 50, text : `${connectorTypes[i]}`, width : 40, height : 40});
        const vertexC = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 200, cy : (i+1) * 50, text : `${connectorTypes[i]}`, width : 40, height : 40});
        const vertexR = GraphTableSVG.createShape(graph, 'g-rect'   , {cx : 300, cy : (i+1) * 50, text : `${connectorTypes[i]}`, width : 40, height : 40});

        const edgeL = GraphTableSVG.createShape(graph, 'g-edge');
        edgeL.svgPath.style.stroke="red";
        /* 接続位置の設定 */
        graph.connect(vertexL, edgeL, vertexC, {beginConnectorType : connectorTypes[i], endConnectorType : connectorTypes[i]});

        /* create時にも接続位置の設定が可能 */
        const edgeR = GraphTableSVG.createShape(graph, 'g-edge', {beginVertex : vertexC, endVertex : vertexR, beginConnectorType : connectorTypes[i], endConnectorType : connectorTypes[i]});
        edgeR.svgPath.style.stroke="blue";    
    }
    
};