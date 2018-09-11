let table = null;
window.onload = () => {
    const box = document.getElementById("svgbox");
    table = new GraphTableSVG.GTable(box, { cx: 50, cy: 50, rowCount: 5, columnCount: 5 });

    /* 各セルのテキストの編集 */
    for(let y=0;y<table.rowCount;y++){
        for(let x=0;x<table.columnCount;x++){
            table.cells[y][x].svgText.textContent = `[${y},${x}]`
        }    
    }

    /* 各セルのスタイルの編集 */
    table.cells[3][2].topBorder.style = "stroke:green;stroke-width:4pt";    
    table.cells[3][2].svgBackground.style = "fill:aqua";    
    table.cells[0][0].svgText.style = "stroke:blue";    

    /* SVG要素はクラス名を設定することでスタイルをCSSファイルで設定することが出来る 
    けれどスタイルに直書きしているとそちらのほうが優先？されるようなので一旦消している。    
    */
    table.cells[1][2].topBorder.removeAttribute("style");
    table.cells[1][2].topBorder.setAttribute("class","border");

    table.cells[1][2].svgBackground.removeAttribute("style");
    table.cells[1][2].svgBackground.setAttribute("class","background");

    table.cells[3][0].svgText.removeAttribute("style");
    table.cells[3][0].svgText.setAttribute("class","text");

    /*  table.cells[1][1].topBorder.removeAttribute("style");
        table.cells[1][1].topBorder.setAttribute("class","border");
        と同等
    */
    GraphTableSVG.SVG.setClass(table.cells[1][1].svgText,"text");

};
