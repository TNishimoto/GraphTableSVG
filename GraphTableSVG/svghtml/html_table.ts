namespace HTMLFunctions {
    export function createHTMLTable(e: HTMLElement): HTMLTableElement {
        const table = GraphTableSVG.LogicTable.constructHTMLLogicTable(e);
        const tableTag: HTMLTableElement = document.createElement("table");

        tableTag.setAttribute("border", "1");
        tableTag.setAttribute("cellspacing", "0");
        tableTag.setAttribute("bordercolor", "black")


        if (table != null) {
            const cellConnectChecker: boolean[][] = new Array();
            for (let y = 0; y < table.rowCount; y++) {
                cellConnectChecker.push(new Array(table.columnCount));
                for (let x = 0; x < table.columnCount; x++) {
                    cellConnectChecker[y][x] = true;
                }
            }


            for (let y = 0; y < table.rowCount; y++) {
                const tr: HTMLTableRowElement = document.createElement("tr");
                tableTag.appendChild(tr);
                for (let x = 0; x < table.columnCount; x++) {
                    if (cellConnectChecker[y][x]) {
                        const td: HTMLTableDataCellElement = document.createElement("td");

                        const cell = table.cells[y][x];
                        if (cell.connectedRowCount > 1) {
                            td.setAttribute("rowspan", cell.connectedRowCount.toString());
                        }
                        if (cell.connectedColumnCount > 1) {
                            td.setAttribute("columnspan", cell.connectedColumnCount.toString());
                        }
                        for (let ty = 0; ty < cell.connectedRowCount; ty++) {
                            for (let tx = 0; tx < cell.connectedColumnCount; tx++) {
                                if (tx != 0 || ty != 0) {
                                    cellConnectChecker[ty + y][tx + x] = false;
                                }
                            }
                        }

                        const tTexts = cell.tTexts;
                        //td.style.borderTopStyle = "3px solid red";

                        if (tTexts != null) {
                            tTexts.forEach((v) => {

                                td.appendChild(v);
                            })
                        } else {
                            const text = cell.text;
                            if (text != null) td.innerHTML = text;
                        }
                        tr.appendChild(td);
                    }
                }
            }
        }
        return tableTag;
    }
}