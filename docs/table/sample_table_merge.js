window.onload = () => {
    const box = document.getElementById("svgbox");
    const table = new GraphTableSVG.Table(box, { x: 50, y: 50, rowCount: 10, columnCount: 10 });

    for(let y=0;y<table.rowCount;y++){
        for(let x=0;x<table.columnCount;x++){
            table.cells[y][x].svgText.textContent = `[${y},${x}]`
        }    
    }

    table.cells[2][2].mergeRight();
    table.cells[0][0].mergeBottom();

    table.cells[5][3].mergeRight();
    table.cells[6][3].mergeRight();
    table.cells[5][3].mergeBottom();

    table.update();


    [table.x, table.y] = [50, 50];
};
