window.onload = () => {
    const box = document.getElementById("svgbox");
    const table = new GraphTableSVG.Table(box);
    table.setSize(4,5);

    for(let y=0;y<table.rowCount;y++){
        for(let x=0;x<table.columnCount;x++){
            table.cells[y][x].svgText.textContent = `[${y},${x}]`
        }    
    }
    table.cells[3][2].topBorder.style = "stroke:green;stroke-width:4pt";    
    table.cells[3][2].svgBackground.style = "fill:aqua";    
    table.cells[0][0].svgText.style = "stroke:blue";    

    table.cells[1][2].topBorder.removeAttribute("style");
    table.cells[1][2].topBorder.setAttribute("class","border");

    table.cells[1][2].svgBackground.removeAttribute("style");
    table.cells[1][2].svgBackground.setAttribute("class","background");

    table.cells[3][0].svgText.removeAttribute("style");
    table.cells[3][0].svgText.setAttribute("class","text");

    GraphTableSVG.SVG.setClass(table.cells[1][1].svgText,"text");

    [table.x, table.y] = [50, 50];

};
