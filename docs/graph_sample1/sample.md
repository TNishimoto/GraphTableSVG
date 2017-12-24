
<svg class="svgbox" viewBox="0 0 300 300" width="300px" height="300px" id="svgbox1" xmlns="http://www.w3.org/2000/svg">

ノードをドラッグすると動きます。

<div class="code">

```html
<svg class="svgbox" viewBox="0 0 300 300" width="300px" height="300px" id="svgbox1" xmlns="http://www.w3.org/2000/svg">
```

```javascript
// typescript
import Graph = GraphTableSVG.Graph;
import Edge = GraphTableSVG.Edge;
import Vertex = GraphTableSVG.Vertex;

function createGraph(id : string, graphClass : string | null = null, 
    vertexClass : string | null = null, edgeClass : string | null = null) : [Graph, Vertex, Vertex, Vertex, Edge, Edge]{
    /* svgタグの取得 */
    var box : HTMLElement = document.getElementById(id);
    
    /* graphの作成 */
    var graph : GraphTableSVG.Graph = new GraphTableSVG.Graph(graphClass);
    /* graphをsvgタグの子に入れる */
    box.appendChild(graph.svgGroup);

    /* vertexの作成 */
    var node1 : GraphTableSVG.Vertex = GraphTableSVG.Vertex.create(graph, vertexClass);
    var node2 : GraphTableSVG.Vertex = GraphTableSVG.Vertex.create(graph, vertexClass);
    var node3 : GraphTableSVG.Vertex = GraphTableSVG.Vertex.create(graph, vertexClass);

    var edge1 = GraphTableSVG.Edge.create(graph, edgeClass);
    var edge2 = GraphTableSVG.Edge.create(graph, edgeClass);

    /* node1の座標を設定 */
    graph.connect(node1, edge1, node2);
    graph.connect(node1, edge2, node3);
    
    [node1.x, node1.y] = [100, 100];
    [node2.x, node2.y] = [150, 200];
    [node3.x, node3.y] = [50, 200];

    node1.svgText.textContent = "1";
    node2.svgText.textContent = "2";
    node3.svgText.textContent = "3";

    return [graph, node1, node2, node3, edge1, edge2];
}

function sample1(){
    var [graph, node1, node2, node3, edge1, edge2] = createGraph("svgbox1");
    
    node1.svgGroup.onmousedown = sample1_mousedown;
    node1.svgGroup.onmouseup = sample1_mouseup;
    node1.svgGroup.onmousemove = sample1_mousemove;
    
    node2.svgGroup.onmousedown = sample1_mousedown;
    node2.svgGroup.onmouseup = sample1_mouseup;
    node2.svgGroup.onmousemove = sample1_mousemove;
    

    node3.svgGroup.onmousedown = sample1_mousedown;
    node3.svgGroup.onmouseup = sample1_mouseup;
    node3.svgGroup.onmousemove = sample1_mousemove;
    
}
let drag : {
	target : SVGGElement | null;
	offsetx : number;
	offsety : number;
} | null = {target : null, offsetx : 0, offsety : 0};


var sample1_mouseup = (e : MouseEvent) => {
    drag = null;
}
var sample1_mousedown = (e : MouseEvent) => {
    drag = {target : <SVGGElement>e.currentTarget, offsetx : e.clientX, offsety : e.clientY };
}
var sample1_mousemove = (e : MouseEvent) => {
        var box = document.getElementById('svgbox1');
        if (drag != null) {
        var item : SVGGElement = <SVGGElement>drag.target;
        item.setX(item.getX() + (e.clientX - drag.offsetx));
        drag.offsetx = e.clientX;
        item.setY(item.getY() + (e.clientY - drag.offsety));
        drag.offsety = e.clientY;
	}
}

window.onload = () => {
    sample1();
};
```

</div>
