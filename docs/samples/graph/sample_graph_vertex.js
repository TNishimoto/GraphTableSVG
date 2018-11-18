let graph = null;
window.onload = () => {
    graph = GraphTableSVG.createShape('svgbox', 'g-graph');
    
    const vertex1 = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 100, cy : 100, text : "1", id:"vertex1"});
    const vertex2 = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 150, cy : 200, text : "2", id:"vertex2"});
    const vertex3 = GraphTableSVG.createShape(graph, 'g-ellipse', {cx : 50, cy : 200, text : "3", id:"vertex3"});;


    const edge1 = GraphTableSVG.createShape(graph, 'g-edge', {beginVertex : vertex1, endVertex : vertex2, text : "abcd", endMarker : true });
    const edge2 = GraphTableSVG.createShape(graph, 'g-edge', {beginVertex : vertex1, endVertex : vertex3, startMarker : true });


    /* x:400, y:200の位置に制御点の設定 */
    edge1.controlPoint = [[400, 200]];
    /* 終了頂点の方向に矢印を作成　*/
    edge1.markerEnd = GraphTableSVG.GEdge.createEndMarker();
    /* 開始頂点の方向に矢印を作成　*/
    edge2.markerStart = GraphTableSVG.GEdge.createStartMarker();
    
};