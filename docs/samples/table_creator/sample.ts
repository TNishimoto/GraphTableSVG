import SVGTable = GraphTableSVG.GTable;
import SVGToVBA = GraphTableSVG.SVGToVBA;
import Graph = GraphTableSVG.GGraph;
//const svgBox: HTMLElement;
let graphtables: (SVGTable | Graph)[] = [];
let table: SVGTable;
let svgBox: SVGSVGElement;

let firstCell: GraphTableSVG.Cell | null = null;
let selectedCell: GraphTableSVG.Cell | null = null;

function setFirstCell(v: GraphTableSVG.Cell | null) {
    if (firstCell != null) {
        firstCell.svgBackground.style.fill = "white";
    }
    firstCell = v;
    if (firstCell != null) {
        firstCell.svgBackground.style.fill = "red";
    }
}

function create() {
    const text = GraphTableSVG.GUI.getInputText("textbox");
    const pureTable = GraphTableSVG.LogicTable.parse(text, ",");
    GraphTableSVG.Common.clearGraphTables(svgBox, graphtables);
    table = new GraphTableSVG.GTable(svgBox);
    table.constructFromLogicTable(GraphTableSVG.LogicTable.create(pureTable));

    //table.setSize(pureTable[0].length, pureTable.length);
    updateClick();
    graphtables = [table];
    GraphTableSVG.GUI.observeSVGBox(svgBox, () => GraphTableSVG.Common.getRegion(graphtables));
}

function cellMouseDownFunction(e) {
    const cell = getCell(this);
    selectedCell = cell;
}

function updateClick() {
    for (let y = 0; y < table.rowCount; y++) {
        for (let x = 0; x < table.columnCount; x++) {
            table.cells[y][x].svgGroup.onclick = onClick;
            table.cells[y][x].svgGroup.setAttribute("class", "cellclass");
            //table.cells[y][x].svgBackground.setAttribute("class", "cellRect");
            table.cells[y][x].svgGroup.onmousedown = cellMouseDownFunction;

            table.cells[y][x].svgBackground.id = `${y}_${x}`;


        }
    }


}

function getCell(item: SVGGElement): GraphTableSVG.Cell {
    const rect = item;
    const y = Number(rect.getAttribute(GraphTableSVG.Cell.cellYName));
    const x = Number(rect.getAttribute(GraphTableSVG.Cell.cellXName));
    return table.cells[y][x];

}

$(function () {
    $.contextMenu({
        selector: ".cellclass",
        events: {
            show: () => {
                const cell = selectedCell;
                if (cell != null) {

                    table.getEmphasizedCells().forEach((v)=>v.isEmphasized = false);
                    //table.rows[cell.cellY].cells.forEach((v)=>{v.isEmphasized = true;v.topBorder.setEmphasis(true)});
                    //table.columns[cell.cellX].cells.forEach((v)=>{v.isEmphasized = true;v.leftBorder.setEmphasis(true)});
                }
            },
            hide: () => { 
                const cell = selectedCell;
                if (cell != null) {
                    table.getEmphasizedCells().forEach((v)=>{
                        v.isEmphasized = false;
                        //v.leftBorder.setEmphasis(false);
                        //v.topBorder.setEmphasis(false);
                    });
                }
                
            }
        },
        callback: function (key, options) {
            const rect = <SVGRectElement>this[0];
            const y = Number(rect.getAttribute(GraphTableSVG.Cell.cellYName));
            const x = Number(rect.getAttribute(GraphTableSVG.Cell.cellXName));

            const cell = table.cells[y][x];
            if (key == "deleteRow") {
                table.removeRow(y);
            } else if (key == "deleteColumn") {
                table.removeColumn(x);
            } else if (key == "insertRow") {
                table.insertRow(y);
            } else if (key == "insertColumn") {
                table.insertColumn(x);
            }
        },
        items: {
            "deleteRow": {
                name: "行を削除",
            },
            "deleteColumn": { name: "列を削除" },
            "insertRow": { name: "行を追加" },
            "insertColumn": { name: "列を追加" },

            "sep1": "---------",
            "quit": { name: "Quit", disabled: () => true }
        }

    });

});



function onClick(x: MouseEvent) {
    //if (!this.isChoosable) return;

    const svg: HTMLElement = <HTMLElement>x.currentTarget;
    const elementType = svg.getAttribute(GraphTableSVG.Cell.elementTypeName);
    if (elementType != null && elementType == "cell-group") {
        const x = Number(svg.getAttribute(GraphTableSVG.Cell.cellXName));
        const y = Number(svg.getAttribute(GraphTableSVG.Cell.cellYName));
        const cell = table.cells[y][x];

        if (firstCell != null) {
            if (cell.rightMasterCell == firstCell && cell.canMergeRight) {
                cell.mergeRight();
                setFirstCell(null);
            } else if (cell.bottomMasterCell == firstCell && cell.canMergeBottom) {
                cell.mergeBottom();
                setFirstCell(null);
            } else if (firstCell.rightMasterCell == cell && firstCell.canMergeRight) {
                firstCell.mergeRight();
                setFirstCell(null);
            } else if (firstCell.bottomMasterCell == cell && firstCell.canMergeBottom) {
                firstCell.mergeBottom();
                setFirstCell(null);
            } else {
                setFirstCell(null);
            }
        } else {
            setFirstCell(cell);
        }

    }
    //const id = svg.getAttribute(GraphTableSVG.Graph.objectIDName);

}
function writePlainText() {
    const box = <HTMLTextAreaElement>document.getElementById("textbox");
    box.value = table.toPlainText();
    console.log(table.toPlainText());
}
function deleteLastRow() {
    table.removeRow(table.rows.length-1);
    //table.rows[table.rows.length - 1].remove();
}

function deleteLastColumn() {
    table.removeColumn(table.columnCount-1);

    //table.columns[table.columns.length - 1].remove();
}

function changeColor(){
    GraphTableSVG.Common.setGraphTableCSS("red", "green");
}

window.onload = () => {
    svgBox = <any>GraphTableSVG.GUI.getNonNullElementById('svgbox');
    GraphTableSVG.GUI.setURLParametersToHTMLElements();
    GraphTableSVG.GUI.observeSVGBox(svgBox, () => GraphTableSVG.Common.getRegion(graphtables));
    create();

    
};

