const GraphTableSVG = require("../dist/nodejs_index");

const column = 5;
const row = 1;
const table = new GraphTableSVG.Logics.LogicTable({ columnCount: column, rowCount: row });

for (let y = 0; y < row; y++) {
    for (let x = 0; x < column; x++) {
        table.cells[y][x].text.textContent = "aaaa";
        table.cells[y][x].groupOption = { style: { paddingLeft: 0 } };

        table.cells[y][x].rightBorderOption = { style: { stroke: "transparent" } }
    }
}

GraphTableSVG.Console.table(table);