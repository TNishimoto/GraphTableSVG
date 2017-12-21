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


___

### CSSによる装飾

GraphはSVGの要素で構成されているのでCSSで装飾が出来る。

<svg class="svgbox" viewBox="0 0 300 300" width="300px" height="300px" id="svgbox3" xmlns="http://www.w3.org/2000/svg">

一般的なCSSのプロパティ以外にも、ライブラリ特有のカスタムプロパティがいくつか存在する。


<div class="code">


```css
GraphのCSSのカスタムプロパティ一覧
"--default-vertex-class" : string
/* Vertex.createメソッドによるVertexインスタンス生成時にこの値はVertex.svgGroupのクラス名にセットされる。 */
"--default-edge-class" : string
/* Edge.createメソッドによるEdgeインスタンス生成時にこの値はEdge.svgGroupのクラス名にセットされる。*/

VertexのCSSのカスタムプロパティ一覧

"--default-surface-type" : string
/* Vertex.createメソッドによってこのstyleのVertexが生成されるとき、Vertexの輪郭を表すSVGElementはこの値を参考に決定される。*/
"circle"ならばSVGCircleElement
"rectangle"ならばSVGRectangleElement

"--default-text-class" : string
/* この値はsvgTextのクラス属性にセットされる */

"--default-surface-class" : string
/* この値はsurfaceのクラス属性にセットされる */

EdgeのCSSのカスタムプロパティ一覧
"--begin-connector-type" : string
"--end-connector-type" : string
/* それぞれEdgeの始点と終点の接続位置を表す
top : 上
leftup : 左上
left : 左
leftdown : 左下
bottom : 下
rightdown : 右下
right : 右
rightup : 右上
auto : ノードの位置によって自動判定 */

"--default-line-class" : string
/* この値はsvgLineのクラス属性にセットされる。*/
"--default-text-class" : string
/* この値はsvgTextのクラス属性にセットされる。*/

```
</div>

さらに、Graph中で生成されるSVGCircleElementやSVGRectangleElementにも以下のカスタムプロパティが存在する。

<div class="code">
```css
SVGCircleElementのStyleのカスタムプロパティ一覧
"--default-radius" : number
/* この値は生成時にSVGCircleElement.rにセットされる。 */

SVGRectangleElementのStyleのカスタムプロパティ一覧
"--default-width" : number
"--default-height" : number
/* これらの値はインスタンス生成時にそれそれSVGRectangleElementStyle.width, SVGRectangleElementStyle.heightにセットされる。*/

```
</div>
GraphのカスタムプロパティからVertexやEdgeのクラスが指定でき、またVertexやEdgeのカスタムプロパティから輪郭やテキストのクラスを指定できるので、
次のようにCSSを設定することでグラフのスタイルをある程度一括指定できる。

<div class="code">
```css
.sample5_graph {
    --default-vertex-class : sample5_vertex;
}
.sample5_vertex {
    --default-surface-type : circle;
    --default-surface-class : sample5_circle;    
    --default-text-class : sample5_text;        
}
.sample5_circle {
    --default-radius : 40;
    fill: green;
}
.sample5_text {
    fill : blue;
    font-size: 20pt
}
```
</div>

<div class="code">
```javascript 
    var graph : GraphTableSVG.Graph = new GraphTableSVG.Graph("sample5_graph");
    var node1 : GraphTableSVG.Vertex = GraphTableSVG.Vertex.create(graph);
    var node2 : GraphTableSVG.Vertex = GraphTableSVG.Vertex.create(graph);
    var node3 : GraphTableSVG.Vertex = GraphTableSVG.Vertex.create(graph);

    var edge1 = GraphTableSVG.Edge.create(graph);
    var edge2 = GraphTableSVG.Edge.create(graph);
```
</div>


<svg viewBox="0 0 300 300" width="300px" height="300px" id="svgbox5" xmlns="http://www.w3.org/2000/svg" style="border:#000000 solid 1px;background:#e9e9e9">

