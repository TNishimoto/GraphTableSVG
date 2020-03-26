const GraphTableSVG = require("../dist/nodejs_index");

const table1 = new GraphTableSVG.Logics.LogicTable({ columnCount: 4, rowCount: 1 });
for (let y = 0; y < 1; y++) {
    for (let x = 0; x < 4; x++) {
        table1.cells[y][x].text.textContent = "aaaa";
        table1.cells[y][x].groupOption = { style: { paddingLeft: 0 } };
    }
}

const table2 = new GraphTableSVG.Logics.LogicTable({ columnCount: 10, rowCount: 1 });
for (let y = 0; y < 1; y++) {
    for (let x = 0; x < 10; x++) {
        table2.cells[y][x].text.textContent = "a";
    }
}

const table3 = new GraphTableSVG.Logics.LogicTable({ columnCount: 10, rowCount: 1 });
for (let y = 0; y < 1; y++) {
    for (let x = 0; x < 10; x++) {
        table3.cells[y][x].text.textContent = "aaaa";
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