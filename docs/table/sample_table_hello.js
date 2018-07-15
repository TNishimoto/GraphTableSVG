let table = null;
window.onload = () => {
    // SVG要素の取得
    const box = document.getElementById("svgbox");
    // Tableの作成
    table = new GraphTableSVG.Table(box, { x: 50, y: 50, rowCount: 3, columnCount: 3 });
    // X : 2, Y : 1 のセルのテキストを変更
    table.cells[1][2].svgText.textContent = `Hello World`;
};
