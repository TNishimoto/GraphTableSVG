var Graph = GraphTableSVG.Graph;
var Edge = GraphTableSVG.Edge;
var Vertex = GraphTableSVG.Vertex;
var Table = GraphTableSVG.Table;
function createTable(id, tableClass = null) {
    var box = document.getElementById(id);
    var table = new GraphTableSVG.Table(3, 3, tableClass);
    box.appendChild(table.svgGroup);
    for (var x = 0; x <= 2; x++) {
        for (var y = 0; y <= 2; y++) {
            table.cells[y][x].svgText.textContent = `Cell${y}${x}`;
        }
    }
    table.svgGroup.setX(100);
    table.svgGroup.setY(100);
    return table;
}
function sample6() {
    createTable("svgbox6");
}
window.onload = () => {
    sample6();
};
//# sourceMappingURL=sample.js.map