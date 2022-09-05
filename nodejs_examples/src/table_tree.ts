import * as GraphTableSVG from "../../dist/nodejs_index"

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


const node1 = new GraphTableSVG.Logics.LogicTreeNode();
node1.shapeObject = table1;
const node2 = new GraphTableSVG.Logics.LogicTreeNode();
node2.shapeObject = table2;
const node3 = new GraphTableSVG.Logics.LogicTreeNode();
node3.shapeObject = table3;

node1.children.push(node2);
node1.children.push(node3);

const tree = new GraphTableSVG.Logics.LogicTree();
tree.root = node1;

GraphTableSVG.Console.view(tree, "aaa");