window.onload = () => {
    /* svgタグの取得 */
var box = document.getElementById('svgbox');
    /* graphの作成 */
    var graph = new GraphTableSVG.Graph(box);
    /* vertexの作成 */
    var node = GraphTableSVG.Vertex.create(graph);
    node.x = 100;
    node.y = 100;
    node.svgText.textContent = "hello world";
    node.isAutoSizeShapeToFitText = true;
};