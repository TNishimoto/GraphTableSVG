window.onload = () => {
    const box = document.getElementById("svgbox");
    const table = new GraphTableSVG.Table(box);
    table.setSize(5,5);
    table.cells[1][2].svgText.textContent = `Hello World`;
    table.svgGroup.setX(50);
    table.svgGroup.setY(50);
};
