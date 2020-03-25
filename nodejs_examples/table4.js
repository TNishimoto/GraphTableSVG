const GraphTableSVG = require("../dist/nodejs_index");

const table1 = new GraphTableSVG.Logics.LogicTable({ columnCount: 3, rowCount: 3 });
const table2 = new GraphTableSVG.Logics.LogicTable({ columnCount: 3, rowCount: 3 });
const table3 = new GraphTableSVG.Logics.LogicTable({ columnCount: 3, rowCount: 3 });

for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
        table1.cells[y][x].text.textContent = "aaaa";
        table2.cells[y][x].text.textContent = "bbbb";
        table3.cells[y][x].text.textContent = "cccc";
        table1.cells[y][x].groupOption = { style: { paddingLeft: 0 } };

    }
}
table1.position = { type: "upper-left", x: 0, y: 0 };
table2.position = { type: "upper-left", x: 0, y: 200 };
table3.position = { type: "upper-left", x: 0, y: 400 };

const group = new GraphTableSVG.Logics.LogicGroup();
group.items.push(table1);
group.items.push(table2);
group.items.push(table3);

GraphTableSVG.Console.view(group, "aaa");