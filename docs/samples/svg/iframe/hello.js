let obj = null;
window.onload = () => {        
    // g-rectの作成
    obj = GraphTableSVG.createShape('svgbox', 'g-rect', {cx : 100, cy : 100, text : "hello world"});
};