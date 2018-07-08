let graph = null;
window.onload = () => {
    const box = document.getElementById('svgbox');
    graph = new GraphTableSVG.Graph(box);

    const connectorTypes = ["top", "topleft", "left", "bottomleft", "bottom", "bottomright", "right", "topright", "auto"];
    for(let i=0;i<9;i++){
        const nodeL = GraphTableSVG.Vertex.create(graph,{surfaceType: "rectangle", text:`${connectorTypes[i]}`, x : 100, y : (i+1) * 100, width : 40, height : 40});
        const nodeC = GraphTableSVG.Vertex.create(graph,{surfaceType: "circle", text:`${connectorTypes[i]}`, x : 200, y : (i+1) * 100, radius : 20});
        const nodeR = GraphTableSVG.Vertex.create(graph,{surfaceType: "rectangle", text:`${connectorTypes[i]}`, x : 300, y : (i+1) * 100, width : 40, height : 40});

        const edgeL = GraphTableSVG.Edge.create(graph);
        edgeL.svgPath.style.stroke="red";
        /* 接続位置の設定 */
        graph.connect(nodeL, edgeL, nodeC, {beginConnectorType : connectorTypes[i], endConnectorType : connectorTypes[i]});

        /* create時にも接続位置の設定が可能 */
        const edgeR = GraphTableSVG.Edge.create(graph, {beginVertex : nodeC, endVertex : nodeR, beginConnectorType : connectorTypes[i], endConnectorType : connectorTypes[i]});
        edgeR.svgPath.style.stroke="blue";    
    }
    
};