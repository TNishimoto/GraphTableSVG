window.onload = () => {
    const box = document.getElementById("svgbox");
    const table = new GraphTableSVG.Table(box, { x: 50, y: 50, rowCount: 10, columnCount: 10 });

    for(let y=0;y<table.rowCount;y++){
        for(let x=0;x<table.columnCount;x++){
            table.cells[y][x].svgText.textContent = `[${y},${x}]`
        }    
    }
    
    //table.cells[2][2]とtable.cells[2][3]を結合
    table.cells[2][2].mergeRight();
    //table.cells[0][0]とtable.cells[1][0]を結合
    table.cells[0][0].mergeBottom();
    //table.cells[5][3]とtable.cells[5][4]を結合
    table.cells[5][3].mergeRight();
    //table.cells[6][3]とtable.cells[6][4]を結合
    table.cells[6][3].mergeRight();
    //table.cells[5][3-4]とtable.cells[6][3-4]を結合
    table.cells[5][3].mergeBottom();
    //Error
    //table.cells[5][3].mergeRight();
    //table.cells[3-4][6-8]を結合
    table.cells[3][6].merge(3,2);

};
