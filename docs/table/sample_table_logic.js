window.onload = () => {
    const logicTable = new GraphTableSVG.LogicTable(4, 5, null);
    
    for(let y=0;y<logicTable.rowCount;y++){
        for(let x=0;x<logicTable.columnCount;x++){
            logicTable.cells[y][x].set(`[${y}, ${x}]`);
        }    
    }

    var box = document.getElementById("svgbox");
    var table = new GraphTableSVG.Table(box);
    table.constructFromLogicTable(logicTable, {x:50,y:50});    
};
