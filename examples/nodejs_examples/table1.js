const GraphTableSVG = require("../dist/nodejs_index");

const table = new GraphTableSVG.Logics.LogicTable({ columnCount: 5, rowCount: 5 });

for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
        table.cells[y][x].text.textContent = "aaaa";
    }
}

GraphTableSVG.Console.table(table);