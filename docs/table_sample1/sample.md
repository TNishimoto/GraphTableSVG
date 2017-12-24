# Sample

## Table

<svg viewBox="0 0 300 300" width="300px" height="300px" id="svgbox6" xmlns="http://www.w3.org/2000/svg" style="border:#000000 solid 1px;background:#e9e9e9">

<div class="code">
```javascript 
var box : HTMLElement = document.getElementById(id);    
    var table : GraphTableSVG.Table = new GraphTableSVG.Table(3,3, tableClass);
    box.appendChild(table.svgGroup);

    for(var x=0;x<=2;x++){
        for(var y=0;y<=2;y++){
            table.cells[y][x].svgText.textContent = `Cell${y}${x}`;            
        }            
    }
    table.svgGroup.setX(100);
    table.svgGroup.setY(100);
```
</div>

GraphTableSVG.Tableクラスは表をSVGで表現したものだ。
構造としてはセルを表現するCellクラスと枠を表すSVGLineElementを内包したSVGGElementから構成されている。

Cellクラスは背景色を表すSVGRectangleElementとセル内のテキストを表現するSVGTextElementを内包したSVGGElementから構成されている。
