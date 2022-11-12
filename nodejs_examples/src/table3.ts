import * as GraphTableSVG from "../../dist/nodejs_index"

const svgsvg = GraphTableSVG.Logics.LogicSVGSVG.createDefaultSVGSVG();
svgsvg.option.g_shrink = true;
//const table = new GraphTableSVG.Logics.LogicTable({columnCount : 10, rowCount : 10});

//const table = new GraphTableSVG.Logics.LogicTable({columnCount : 3, rowCount : 3});
//const table = new GraphTableSVG.Logics.LogicTable({columnCount : 15, rowCount : 15});
const table = new GraphTableSVG.Logics.LogicTable({columnCount : 50, rowCount : 50});

for(let i = 0;i<table.rowCount;i++){
    for(let j = 0;j<table.columnCount;j++){
        table.cells[i][j].text.textContent = `(${j}, ${i})`
        table.cells[i][j].topBorderOption.style = "stroke:red;stroke-width:3pt;"
        table.cells[i][j].backgroundOption.style = "fill:aqua;"
        
    }    
}
svgsvg.items.push(table);

GraphTableSVG.Console.view(svgsvg);