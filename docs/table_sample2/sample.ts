import Table = GraphTableSVG.Table;

function createTable(id : string, tableClass : string | null = null) : Table{

    var box : HTMLElement = document.getElementById(id);
    
    var table : GraphTableSVG.Table = new GraphTableSVG.Table(box, 3,3, tableClass);
    //box.appendChild(table.svgGroup);

    for(var x=0;x<=2;x++){
        for(var y=0;y<=2;y++){
            table.cells[y][x].svgText.textContent = `Cell${y}${x}`;            
        }            
    }
    table.svgGroup.setX(100);
    table.svgGroup.setY(100);
    
    return table;
}

function sample7(){
    var table = createTable("svgbox7", "sample7_table");

    for(var x=0;x<=2;x++){
        table.columns[x].width = 100;        
        for(var y=0;y<=2;y++){
            table.rows[y].height = 100;            
            table.cells[y][x].verticalAnchor = y == 0 ? "bottom" : y == 1 ? "middle" : "top";
            table.cells[y][x].horizontalAnchor = x == 0 ? "left" : x == 1 ? "center" : "right";
            
        }            
    }
}


window.onload = () => {
    sample7();
};
