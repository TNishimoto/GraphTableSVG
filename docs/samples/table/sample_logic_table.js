let svgBox = null;
let table = null;
window.onload = () => {
    svgBox = GraphTableSVG.GUI.getNonNullElementById('svgbox');
    const logicTable = new GraphTableSVG.LogicTable({columnCount : 5, rowCount : 4, tableClassName : "table"});
    table = new GraphTableSVG.GTable(svgBox);
    table.constructFromLogicTable(logicTable);
};
