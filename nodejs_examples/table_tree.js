const GraphTableSVG = require("../dist/nodejs_index");

const table1 = new GraphTableSVG.Logics.LogicTable({ columnCount: 3, rowCount: 3 });
const table2 = new GraphTableSVG.Logics.LogicTable({ columnCount: 3, rowCount: 3 });
const table3 = new GraphTableSVG.Logics.LogicTable({ columnCount: 3, rowCount: 3 });

for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
        table1.cells[y][x].text.textContent = "aaaa";
        table2.cells[y][x].text.textContent = "bbbb";
        table3.cells[y][x].text.textContent = "cccc";

    }
}


const node1 = new GraphTableSVG.Logics.LogicTree({ vertexOption: { text: "hello1" } });
node1.table = table1;
node1.vertexShape = "g-table";
const node2 = new GraphTableSVG.Logics.LogicTree({ vertexOption: { text: "hello2" } });
node2.table = table2;
node2.vertexShape = "g-table";
const node3 = new GraphTableSVG.Logics.LogicTree({ vertexOption: { text: "hello3" } });
node3.table = table3;
node3.vertexShape = "g-table";

node1.children.push(node2);
node1.children.push(node3);

GraphTableSVG.Console.graph(node1, "aaa");