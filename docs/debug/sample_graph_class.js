let graph = null;
window.onload = () => {
    const box = document.getElementById('svgbox');
    graph = new GraphTableSVG.Graph(box, {graphClassName : "graph"});    
    
    const node1 = GraphTableSVG.Vertex.create(graph,{x : 100, y : 100, text : "1"});
    const node2 = GraphTableSVG.Vertex.create(graph,{x : 150, y : 200, text : "2"});
    const node3 = GraphTableSVG.Vertex.create(graph,{x : 50, y : 200, text : "3"});

    const edge1 = GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node2, text : "abcd"});
    const edge2 = GraphTableSVG.Edge.create(graph, {beginVertex : node1, endVertex : node3});

    graph.update();
    GraphTableSVG.PNG.setAllElementStyleMap(box);
    //const img = GraphTableSVG.PNG.getImage(box);
    //const canvas = GraphTableSVG.PNG.setCanvas(img);
    //document.body.appendChild(img);
    //document.body.appendChild(canvas);
    //img.style.width="200px";
    //img.style.height="200px";

};
function png2(){
    const box = document.getElementById('svgbox');
    const img = GraphTableSVG.PNG.getImage(box);
    const canvas = GraphTableSVG.PNG.setCanvas(img);
    document.body.appendChild(img);
    document.body.appendChild(canvas);
}