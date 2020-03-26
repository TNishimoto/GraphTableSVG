const GraphTableSVG = require("../dist/nodejs_index");


const node1 = new GraphTableSVG.Logics.LogicTree({ vertexOption: { text: "hello1" } });
node1.graphOption.drawingFunction = { url: "", functionName: "GraphTableSVG.Logics.Test", drawingFunction: null }

GraphTableSVG.Console.view(node1, "aaa");