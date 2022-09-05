import * as GraphTableSVG from "../../dist/nodejs_index"

const node1 = new GraphTableSVG.Logics.LogicTreeNode({ vertexText : "hello1" });
const node2 = new GraphTableSVG.Logics.LogicTreeNode({ vertexText : "hello2" });
const node3 = new GraphTableSVG.Logics.LogicTreeNode({ vertexText : "hello3" });

node1.children.push(node2);
node1.children.push(node3);
const tree = new GraphTableSVG.Logics.LogicTree();
tree.root = node1;

GraphTableSVG.Console.view(tree, "aaa");