import * as GraphTableSVG from "../../dist/nodejs_index"

const svgsvg = GraphTableSVG.Logics.LogicSVGSVG.createDefaultSVGSVG();
const table = new GraphTableSVG.Logics.LogicTable({columnCount : 5, rowCount : 5});

for(let i = 0;i<table.rowCount;i++){
    for(let j = 0;j<table.columnCount;j++){
        table.cells[i][j].text.textContent = `(${j}, ${i})`
    }    
}
svgsvg.items.push(table);

GraphTableSVG.Console.view(svgsvg);