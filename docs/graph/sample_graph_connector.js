window.onload = () => {
    const box = document.getElementById('svgbox');
    const graph = new GraphTableSVG.Graph(box);

    const connectorTypes = ["top", "topleft", "left", "bottomleft", "bottom", "bottomright", "right", "topright", "auto"];
    for(let i=0;i<9;i++){
        const nodeL = GraphTableSVG.Vertex.create(graph,{surfaceType: "rectangle", text:`${connectorTypes[i]}`, x : 100, y : (i+1) * 100, width : 40, height : 40});
        const nodeC = GraphTableSVG.Vertex.create(graph,{surfaceType: "circle", text:`${connectorTypes[i]}`, x : 200, y : (i+1) * 100, radius : 20});
        const nodeR = GraphTableSVG.Vertex.create(graph,{surfaceType: "rectangle", text:`${connectorTypes[i]}`, x : 300, y : (i+1) * 100, width : 40, height : 40});

        const edgeL = GraphTableSVG.Edge.create(graph);
        edgeL.svgPath.style.stroke="red";
        graph.connect(nodeL, edgeL, nodeC, {beginConnectorType : connectorTypes[i], endConnectorType : connectorTypes[i]});
        const edgeR = GraphTableSVG.Edge.create(graph);
        edgeR.svgPath.style.stroke="blue";
        graph.connect(nodeC, edgeR, nodeR, {beginConnectorType : connectorTypes[i], endConnectorType : connectorTypes[i]});
    
    }
    
};