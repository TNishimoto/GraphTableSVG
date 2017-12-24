# GraphTableSVG サンプルを用いた解説

___

## Graph

### 基本

<svg class="svgbox" viewBox="0 0 300 300" width="300px" height="300px" id="svgbox2" xmlns="http://www.w3.org/2000/svg">
<div class="code">

```html
<svg class="svgbox" viewBox="0 0 300 300" width="300px" height="300px" id="svgbox2" xmlns="http://www.w3.org/2000/svg">
```

```javascript
// typescript
function sample2(){
    /* svgタグの取得 */
    var box : HTMLElement = document.getElementById('svgbox2');
    
    /* graphの作成 */
    var graph : GraphTableSVG.Graph = new GraphTableSVG.Graph();
    /* graphをsvgタグの子に入れる */
    box.appendChild(graph.svgGroup);

    /* vertexの作成 */
    var node1 : GraphTableSVG.Vertex = GraphTableSVG.CircleVertex.create(graph);
    var node2 : GraphTableSVG.Vertex = GraphTableSVG.CircleVertex.create(graph);
    var node3 : GraphTableSVG.Vertex = GraphTableSVG.CircleVertex.create(graph);

    var edge1 = GraphTableSVG.LineEdge.create();
    var edge2 = GraphTableSVG.LineEdge.create();

    /* node1の座標を設定 */
    graph.connect(node1, edge1, node2);
    graph.connect(node1, edge2, node3);
    
    [node1.x, node1.y] = [100, 100];
    [node2.x, node2.y] = [150, 200];
    [node3.x, node3.y] = [50, 200];
}
```

</div>

グラフクラスを作成してグラフにノードを追加した例。  
Graph, Vertex, Edgeクラスの構成は大雑把に以下のようになっている。  
svgの要素を表すプロパティは接頭辞にsvgがついている。

<div class="code">

```javascript
export class Graph {    
    public vertices: Vertex[];
    public edges: Edge[];
    public svgGroup: SVGGElement;
}
```
</div>

Graphクラスは内部に含んでいるVertexとEdgeをそれぞれverticesとedgesに格納している。  
そして、Graphは本質的にVetrtexやEdgeを表すSVGの要素を子に持つSVGGElementに過ぎない。

<div class="code">

```javascript
export class Vertex {    
    public svgGroup: SVGGElement;
    public svgText: SVGTextElement;
}
export class CircleVertex extends Vertex {
    public svgCircle: SVGCircleElement;
}
```
</div>

VertexクラスもまたVertexを表すいくつかのSVG要素をまとめたSVGGElementに過ぎない。  
Vertexクラス自体はSVGTextElementしか持っていないが、CircleVertexはVertexの輪郭としてSVGCircleElementを備えている。

<div class="code">
```javascript
export class Edge {
        public beginVertex: Vertex;
        public endVertex: Vertex;
        public svgGroup: SVGGElement;
}
export class LineEdge extends Edge {
        public svgLine: SVGLineElement;
}
```
</div>

EdgeクラスもEdgeを表すSVG要素をまとめたSVGGElementである。  
ただEdgeクラスはVertexクラスよりもさらにシンプルでSVGGElement以外のSVG要素が存在しない。  
つまりEdgeクラスのインスタンスを作っても何も表示されることはない。  
LineEdgeクラスはSVGLineElementを持っている。  
これが上の例の線を表している要素である。

beginVertexとendVertexはEdgeの始点と終点を表している。  
要するにEdgeの線がどのVertexを繋ぐか示している。

<div class="code">

```html
<svg class="svgbox" viewBox="0 0 300 300" width="300px" height="300px" id="svgbox2" xmlns="http://www.w3.org/2000/svg">
<g type="graph">
	<g objectID="5" type="vertex" transform="matrix(1, 0, 0, 1, 100, 100)">
		<circle r="30" style="stroke: black; stroke-width: 1pt; fill: rgb(255, 255, 255);" cx="0" cy="0"></circle>
		<text style="fill: black; font-size: 14px; font-weight: bold;"></text>
	</g>
	
	<g objectID="6" type="vertex" transform="matrix(1, 0, 0, 1, 150, 200)">
		<circle r="30" style="stroke: black; stroke-width: 1pt; fill: rgb(255, 255, 255);" cx="0" cy="0"></circle>
		<text style="fill: black; font-size: 14px; font-weight: bold;"></text>
	</g>

	<g objectID="7" type="vertex" transform="matrix(1, 0, 0, 1, 50, 200)">
		<circle r="30" style="stroke: black; stroke-width: 1pt; fill: rgb(255, 255, 255);" cx="0" cy="0"></circle>
		<text style="fill: black; font-size: 14px; font-weight: bold;"></text></g>
	
	<g objectID="8" type="edge" beginConnectorType="auto" endConnectorType="auto" beginNode="5" endNode="6">
		<line x1="100" x2="150" y1="130" y2="170" style="stroke: black;"></line>
	</g>
	
	<g objectID="9" type="edge" beginConnectorType="auto" endConnectorType="auto" beginNode="5" endNode="7">
		<line x1="100" x2="50" y1="130" y2="170" style="stroke: black;"></line>
	</g>
</g>
</svg>
```

</div>

結局のところ、GraphもVertexもEdgeもそれぞれの概念を表すSVG要素を子に持ったSVGGElementなのである。  
上のコードは上の例のtypescript実行後のsvgタグの中身である。  
それぞれのSVGGElementのtype属性を見ればこのライブラリにおけるGraphの概念がなんとなく理解できると思う。