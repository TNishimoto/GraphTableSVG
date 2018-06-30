var Table = GraphTableSVG.Table;
function createTable() {
    var box = document.getElementById("svgbox");
    var table = new GraphTableSVG.Table(box);
    table.setSize(5,5);

    for(let y=0;y<table.rowCount;y++){
        table.rows[y].height = 60;

        for(let x=0;x<table.columnCount;x++){
            table.columns[x].width = 60;

            table.cells[y][x].svgText.textContent = `[${y},${x}]`
        }    
    }

    GraphTableSVG.SVG.setClass(table.cells[1][1].svgGroup, "cell_L");
    GraphTableSVG.SVG.setClass(table.cells[1][2].svgGroup, "cell_C");
    GraphTableSVG.SVG.setClass(table.cells[1][3].svgGroup, "cell_R");
    GraphTableSVG.SVG.setClass(table.cells[2][1].svgGroup, "cell_T");
    GraphTableSVG.SVG.setClass(table.cells[2][2].svgGroup, "cell_M");
    GraphTableSVG.SVG.setClass(table.cells[2][3].svgGroup, "cell_B");
    GraphTableSVG.SVG.setClass(table.cells[3][1].svgGroup, "cell_TL");
    GraphTableSVG.SVG.setClass(table.cells[3][2].svgGroup, "cell_MC");
    GraphTableSVG.SVG.setClass(table.cells[3][3].svgGroup, "cell_BR");

    table.cells[4][1].verticalAnchor = "top";
    table.cells[4][2].verticalAnchor = "middle";
    table.cells[4][3].verticalAnchor = "bottom";
    table.cells[4][1].horizontalAnchor = "right";
    table.cells[4][2].horizontalAnchor = "center";
    table.cells[4][3].horizontalAnchor = "left";

    table.svgGroup.setX(50);
    table.svgGroup.setY(50);
    return table;
}
window.onload = () => {
    createTable();
};
