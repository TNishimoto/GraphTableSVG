var Table = GraphTableSVG.Table;
function createTable() {
    const logicTable = new GraphTableSVG.LogicTable(4, 5, null);
    
    for(let y=0;y<logicTable.rowCount;y++){
        for(let x=0;x<logicTable.columnCount;x++){
            logicTable.cells[y][x].set(`[${y}, ${x}]`);
        }    
    }

    var box = document.getElementById("svgbox");
    var table = new GraphTableSVG.Table(box);
    table.constructFromLogicTable(logicTable);    

    table.svgGroup.setX(50);
    table.svgGroup.setY(50);
    return table;
}
window.onload = () => {
    createTable();
};
