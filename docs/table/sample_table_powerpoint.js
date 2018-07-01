let _table = [];
window.onload = () => {
    const logicTable = new GraphTableSVG.LogicTable(4, 5, null);
    
    for(let y=0;y<logicTable.rowCount;y++){
        for(let x=0;x<logicTable.columnCount;x++){
            logicTable.cells[y][x].set(`[${y}, ${x}]`);
        }    
    }

    const box = document.getElementById("svgbox");
    const table = new GraphTableSVG.Table(box);
    table.constructFromLogicTable(logicTable);    

    [table.x, table.y] = [50, 50];
    _table.push(table);

};
