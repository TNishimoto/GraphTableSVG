
let graph = null;
window.onload = () => {
    const box = document.getElementById('svgbox');
    graph = new GraphTableSVG.Graph(box);
    const node1 = GraphTableSVG.Vertex.create(graph, {text:"1", isRoot : true});
    const node2 = GraphTableSVG.Vertex.create(graph, {text:"2"});
    const node3 = GraphTableSVG.Vertex.create(graph, {text:"3"});
    const node4 = GraphTableSVG.Vertex.create(graph, {text:"4"});
    const node5 = GraphTableSVG.Vertex.create(graph, {text:"5"});
    const node6 = GraphTableSVG.Vertex.create(graph, {text:"6"});
    const node7 = GraphTableSVG.Vertex.create(graph, {text:"7"});
    const node8 = GraphTableSVG.Vertex.create(graph, {text:"8"});
    const node9 = GraphTableSVG.Vertex.create(graph, {text:"9"});
    const node10 = GraphTableSVG.Vertex.create(graph, {text:"10"});
    const node11 = GraphTableSVG.Vertex.create(graph, {text:"11"});
    const node12 = GraphTableSVG.Vertex.create(graph, {text:"12"});

    graph.appendChild(node1, node2);
    graph.appendChild(node1, node3);
    graph.appendChild(node3, node4);
    graph.appendChild(node4, node5);
    graph.appendChild(node2, node6);
    graph.appendChild(node2, node7);
    graph.appendChild(node2, node8);
    graph.appendChild(node2, node9);
    graph.appendChild(node8, node10);
    graph.appendChild(node8, node11);
    graph.appendChild(node8, node12);

    graph.vertexXInterval = 70;
    graph.vertexYInterval = 70;

    graph.relocateFunction = GraphTableSVG.TreeArrangement.alignVerticeByLeave;


    document.getElementById("childrenButton").onclick = () => {
        graph.relocateFunction = GraphTableSVG.TreeArrangement.alignVerticeByChildren;
    };
    document.getElementById("leaveButton").onclick = () => {
        graph.relocateFunction = GraphTableSVG.TreeArrangement.alignVerticeByLeave;
    };

};
function XYInterval(px, py){
    graph.vertexXInterval += px;
    graph.vertexYInterval += py;

    if(graph.vertexXInterval < 0) graph.vertexXInterval = 0;
    if(graph.vertexYInterval < 0) graph.vertexYInterval = 0;
    graph.relocate();
}