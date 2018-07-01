window.onload = () => {
    const box = document.getElementById("svgbox");
    const table = new GraphTableSVG.Table(box, { x: 50, y: 50, rowCount: 4, columnCount: 5, tableClassName : "table" });

    for(let y=0;y<table.rowCount;y++){
        for(let x=0;x<table.columnCount;x++){
            table.cells[y][x].svgText.textContent = `[${y},${x}]`
        }    
    }

    return table;
};
