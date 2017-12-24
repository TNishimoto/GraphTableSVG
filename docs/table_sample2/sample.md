# Sample

## Table

<svg viewBox="0 0 600 600" width="600px" height="600px" id="svgbox7" xmlns="http://www.w3.org/2000/svg" style="border:#000000 solid 1px;background:#e9e9e9">


<div class="code">
```css
TableのStyleのカスタムプロパティ一覧
"--default-cell-class"
/* この値は生成時にSVGCircleElement.Cellのクラスにセットされる。 */
"--default-border-class"
/* この値はテーブルの枠を表すSVGLineElementのクラスにセットされる。 */


Cellのカスタムプロパティ一覧
"--default-text-class" : string
/* この値はsvgTextのクラス属性にセットされる。*/
"--default-background-class" : string
/* この値はsvgBackgroundのクラス属性にセットされる。*/
"--horizontal-anchor" : string
/* テキスト配置の水平位置を指定
left : 左、　center : 中央、　right : 右
*/
"--vertical-anchor" : string
/* テキスト配置の垂直位置を指定
top : 上、　middle : 中央、　bottom : 下
*/


```
</div>

<div class="code">
```css
.sample7_table{
    --default-cell-class : sample7_cell;
    --default-border-class : sample7_line;    
}
.sample7_cell{
    --default-background-class : sample7_background;
    --default-text-class : sample7_text;
    --horizontal-anchor : center;
    --vertical-anchor : middle;
    /* padding-left: 10px;*/
}
.sample7_background {
    fill: pink;
}
.sample7_line {
    stroke: red;
    stroke-width: 3pt
}
.sample7_text{
    stroke: green;
    fill: green;
    font-size: 16pt;
}

```
</div>

<div class="code">
```javascript 

for(var x=0;x<=2;x++){
        table.columns[x].width = 100;        
        for(var y=0;y<=2;y++){
            table.rows[y].height = 100;            
            table.cells[y][x].verticalAnchor = y == 0 ? "bottom" : y == 1 ? "middle" : "top";
            table.cells[y][x].horizontalAnchor = x == 0 ? "left" : x == 1 ? "center" : "right";            
        }            
    }
```

</div>