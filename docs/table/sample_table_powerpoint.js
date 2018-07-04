let _table = [];
window.onload = () => {
    const box = document.getElementById("svgbox");
    const table = new GraphTableSVG.Table(box);
    table.construct([["[0,0]","[0,1]","[0,2]"], ["[1,0]","[1,1]","[1,2]"], ["[2,0]","[2,1]","[2,2]"]], {x:50,y:50});

    _table.push(table);

};
