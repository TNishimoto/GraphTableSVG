import Graph = GraphTableSVG.Graph;
import Edge = GraphTableSVG.Edge;
import Vertex = GraphTableSVG.Vertex;
import Table = GraphTableSVG.Table;

function createTable(id : string, tableClass : string | null = null) : Table{

    var box : HTMLElement = document.getElementById(id);
    
    var table : GraphTableSVG.Table = new GraphTableSVG.Table(3,3, tableClass);
    box.appendChild(table.svgGroup);

    for(var x=0;x<=2;x++){
        for(var y=0;y<=2;y++){
            table.cells[y][x].svgText.textContent = `Cell${y}${x}`;            
        }            
    }
    table.svgGroup.setX(100);
    table.svgGroup.setY(100);
    
    return table;
}
function sample6(){
    createTable("svgbox6");
}


window.onload = () => {
    sample6();
};
