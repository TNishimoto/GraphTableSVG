let table = null;
window.onload = () => {
    const box = document.getElementById("svgbox");
    table = new GraphTableSVG.GTable(box, { cx: 50, cy: 50, rowCount: 5, columnCount: 5 });

    for(let y=0;y<table.rowCount;y++){
        for(let x=0;x<table.columnCount;x++){
            table.cells[y][x].svgText.textContent = `[${y},${x}]`
        }    
    }
    table.rows[1].height = 100;
    table.columns[1].width = 100;

    table.rows[2].height = 0;
    table.columns[2].width = 0;
};
