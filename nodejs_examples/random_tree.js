const GraphTableSVG = require("../dist/nodejs_index");

function editTree(tree) {
    tree.getOrderedNodes().forEach((v) => {
        v.vertexOption.surfaceClass = {
            fill: "black"
        };
        v.vertexOption.width = 10;

    })
    return tree;

}

function randomBinaryTreeButton() {
    let tree = GraphTableSVG.Debug.randomBinaryTree(15);
    tree = editTree(tree);
    GraphTableSVG.Console.graph(tree, "random", "svgbox");
}
randomBinaryTreeButton();