# Graph

## CSSによる装飾

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

