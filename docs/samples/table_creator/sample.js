var SVGTable = GraphTableSVG.GTable;
var SVGToVBA = GraphTableSVG.SVGToVBA;
var Graph = GraphTableSVG.GGraph;
//const svgBox: HTMLElement;
var graphtables = [];
var table;
var svgBox;
var firstCell = null;
var selectedCell = null;
function setFirstCell(v) {
    if (firstCell != null) {
        firstCell.svgBackground.style.fill = "white";
    }
    firstCell = v;
    if (firstCell != null) {
        firstCell.svgBackground.style.fill = "red";
    }
}
function create() {
    var text = GraphTableSVG.GUI.getInputText("textbox");
    var pureTable = GraphTableSVG.LogicTable.parse(text, ",");
    GraphTableSVG.Common.clearGraphTables(svgBox, graphtables);
    table = new GraphTableSVG.GTable(svgBox);
    table.constructFromLogicTable(GraphTableSVG.LogicTable.create(pureTable));
    //table.setSize(pureTable[0].length, pureTable.length);
    updateClick();
    graphtables = [table];
    GraphTableSVG.GUI.observeSVGBox(svgBox, function () { return GraphTableSVG.Common.getRegion(graphtables); });
}
function cellMouseDownFunction(e) {
    var cell = getCell(this);
    selectedCell = cell;
}
function updateClick() {
    for (var y = 0; y < table.rowCount; y++) {
        for (var x = 0; x < table.columnCount; x++) {
            table.cells[y][x].svgGroup.onclick = onClick;
            table.cells[y][x].svgGroup.setAttribute("class", "cellclass");
            //table.cells[y][x].svgBackground.setAttribute("class", "cellRect");
            table.cells[y][x].svgGroup.onmousedown = cellMouseDownFunction;
            table.cells[y][x].svgBackground.id = y + "_" + x;
        }
    }
}
function getCell(item) {
    var rect = item;
    var y = Number(rect.getAttribute(GraphTableSVG.Cell.cellYName));
    var x = Number(rect.getAttribute(GraphTableSVG.Cell.cellXName));
    return table.cells[y][x];
}
$(function () {
    $.contextMenu({
        selector: ".cellclass",
        events: {
            show: function () {
                var cell = selectedCell;
                if (cell != null) {
                    table.getEmphasizedCells().forEach(function (v) { return v.isEmphasized = false; });
                    //table.rows[cell.cellY].cells.forEach((v)=>{v.isEmphasized = true;v.topBorder.setEmphasis(true)});
                    //table.columns[cell.cellX].cells.forEach((v)=>{v.isEmphasized = true;v.leftBorder.setEmphasis(true)});
                }
            },
            hide: function () {
                var cell = selectedCell;
                if (cell != null) {
                    table.getEmphasizedCells().forEach(function (v) {
                        v.isEmphasized = false;
                        //v.leftBorder.setEmphasis(false);
                        //v.topBorder.setEmphasis(false);
                    });
                }
            }
        },
        callback: function (key, options) {
            var rect = this[0];
            var y = Number(rect.getAttribute(GraphTableSVG.Cell.cellYName));
            var x = Number(rect.getAttribute(GraphTableSVG.Cell.cellXName));
            var cell = table.cells[y][x];
            if (key == "deleteRow") {
                table.removeRow(y);
            }
            else if (key == "deleteColumn") {
                table.removeColumn(x);
            }
            else if (key == "insertRow") {
                table.insertRow(y);
            }
            else if (key == "insertColumn") {
                table.insertColumn(x);
            }
        },
        items: {
            "deleteRow": {
                name: "行を削除"
            },
            "deleteColumn": { name: "列を削除" },
            "insertRow": { name: "行を追加" },
            "insertColumn": { name: "列を追加" },
            "sep1": "---------",
            "quit": { name: "Quit", disabled: function () { return true; } }
        }
    });
});
function onClick(x) {
    //if (!this.isChoosable) return;
    var svg = x.currentTarget;
    var elementType = svg.getAttribute(GraphTableSVG.Cell.elementTypeName);
    if (elementType != null && elementType == "cell-group") {
        var x_1 = Number(svg.getAttribute(GraphTableSVG.Cell.cellXName));
        var y = Number(svg.getAttribute(GraphTableSVG.Cell.cellYName));
        var cell = table.cells[y][x_1];
        if (firstCell != null) {
            if (cell.rightMasterCell == firstCell && cell.canMergeRight) {
                cell.mergeRight();
                setFirstCell(null);
            }
            else if (cell.bottomMasterCell == firstCell && cell.canMergeBottom) {
                cell.mergeBottom();
                setFirstCell(null);
            }
            else if (firstCell.rightMasterCell == cell && firstCell.canMergeRight) {
                firstCell.mergeRight();
                setFirstCell(null);
            }
            else if (firstCell.bottomMasterCell == cell && firstCell.canMergeBottom) {
                firstCell.mergeBottom();
                setFirstCell(null);
            }
            else {
                setFirstCell(null);
            }
        }
        else {
            setFirstCell(cell);
        }
    }
    //const id = svg.getAttribute(GraphTableSVG.Graph.objectIDName);
}
function writePlainText() {
    var box = document.getElementById("textbox");
    box.value = table.toPlainText();
    console.log(table.toPlainText());
}
function deleteLastRow() {
    table.removeRow(table.rows.length - 1);
    //table.rows[table.rows.length - 1].remove();
}
function deleteLastColumn() {
    table.removeColumn(table.columnCount - 1);
    //table.columns[table.columns.length - 1].remove();
}
function changeColor() {
    GraphTableSVG.Common.setGraphTableCSS("red", "green");
}
window.onload = function () {
    svgBox = GraphTableSVG.GUI.getNonNullElementById('svgbox');
    GraphTableSVG.GUI.setURLParametersToHTMLElements();
    GraphTableSVG.GUI.observeSVGBox(svgBox, function () { return GraphTableSVG.Common.getRegion(graphtables); });
    create();
};
