const GraphTableSVG = require("../dist/nodejs_index");


const node1 = new GraphTableSVG.Logics.LogicTree({ vertexOption: { text: "hello1" } });
const node2 = new GraphTableSVG.Logics.LogicTree({ vertexOption: { text: "hello2" } });
const node3 = new GraphTableSVG.Logics.LogicTree({ vertexOption: { text: "hello3" } });

node1.children.push(node2);
node1.children.push(node3);

GraphTableSVG.Console.graph(node1, "aaa");