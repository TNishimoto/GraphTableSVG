import * as GraphTableSVG from "../../dist/nodejs_index"

function editTree(tree : GraphTableSVG.Logics.LogicTreeNode) {
    tree.getOrderedNodes().forEach((v) => {
        if(v.shapeObject instanceof GraphTableSVG.Logics.LogicBasicShape){
            v.shapeObject.option.surfaceClass = {
                fill: "black"
            };
            v.shapeObject.option.width = 10;    
        }

    })
    return tree;

}

function randomBinaryTreeButton() {
    let tree = GraphTableSVG.Debug.randomBinaryTree(15);
    editTree(tree.root!);
    GraphTableSVG.Console.view(tree, "random");
}
randomBinaryTreeButton();