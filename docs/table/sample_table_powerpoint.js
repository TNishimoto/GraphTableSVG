let table = null;
window.onload = () => {
    const box = document.getElementById("svgbox");
    table = new GraphTableSVG.GTable(box);
    table.construct([["[0,0]","[0,1]","[0,2]"], ["[1,0]","[1,1]","[1,2]"], ["[2,0]","[2,1]","[2,2]"]], {x:50,y:50});
};
