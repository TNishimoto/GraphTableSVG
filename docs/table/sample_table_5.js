var Table = GraphTableSVG.Table;
function createTable() {
    var box = document.getElementById("svgbox");
    var table = new GraphTableSVG.Table(box);
    table.setSize(10,10);

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


    table.svgGroup.setX(50);
    table.svgGroup.setY(50);
    return table;
}
window.onload = () => {
    createTable();
};
