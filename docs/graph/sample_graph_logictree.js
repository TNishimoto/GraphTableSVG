let graph = null;
window.onload = () => {

    const node1 = new GraphTableSVG.LogicTree({vertexText : "1"});
    const node2 = new GraphTableSVG.LogicTree({vertexText : "2"});
    const node3 = new GraphTableSVG.LogicTree({vertexText : "3", parentEdgeText : "ho"});
    const node4 = new GraphTableSVG.LogicTree({vertexText : "4"});
    const node5 = new GraphTableSVG.LogicTree({vertexText : "5"});
    const node6 = new GraphTableSVG.LogicTree({vertexText : "6"});

    node1.children.push(node2);
    node1.children.push(node3);
    node3.children.push(node4);
    node4.children.push(node5);
    node4.children.push(node6);

    const box = document.getElementById('svgbox');
    graph = new GraphTableSVG.Tree(box);
    graph.constructFromLogicTree(node1, {x : 50, y : 50});
    
};