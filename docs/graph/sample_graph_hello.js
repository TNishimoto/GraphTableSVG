let graph = null;
window.onload = () => {
    const box = document.getElementById('svgbox');
    /* graphの作成 */
    graph = new GraphTableSVG.Graph(box);
    /* vertexの作成 */
    const vertex = GraphTableSVG.Vertex.create(graph, {x:100, y:100});
    vertex.svgText.textContent = "hello world";
};