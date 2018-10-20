let table = null;
window.onload = () => {
    const box = document.getElementById("svgbox");
    table = new GraphTableSVG.GTable(box, { cx: 50, cy: 50, rowCount: 4, columnCount: 5, class : "table" });

    for(let y=0;y<table.rowCount;y++){
        for(let x=0;x<table.columnCount;x++){
            table.cells[y][x].svgText.textContent = `[${y},${x}]`
        }    
    }
};
