window.onload = () => {
    const logicTable = new GraphTableSVG.LogicTable({rowCount : 5, columnCount : 4, x : 50, y : 50});
    for(let y=0;y<logicTable.rowCount;y++){
        for(let x=0;x<logicTable.columnCount;x++){
            logicTable.cells[y][x].set(`[${y}, ${x}]`);
        }    
    }

    const box = document.getElementById("svgbox");
    const table = new GraphTableSVG.Table(box);
    table.constructFromLogicTable(logicTable);    

    const table2 = new GraphTableSVG.Table(box);
    table2.construct([["[0,0]","[0,1]","[0,2]"], ["[1,0]","[1,1]","[1,2]"], ["[2,0]","[2,1]","[2,2]"]], {x:250,y:50});
};
