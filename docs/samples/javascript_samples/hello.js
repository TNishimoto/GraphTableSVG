let obj = null;
window.onload = () => {        
    obj = GraphTableSVG.createShape('svgbox', 'g-rect', {cx : 100, cy : 100, text : "hello world"});
};
function clear(){
    const svgbox = document.getElementById("svgbox");
    svgbox.innerHTML = "";
}
function createGRect(){   
    clear(); 
    obj = GraphTableSVG.createShape('svgbox', 'g-rect', {cx : 100, cy : 100, text : "hello world"});
}
function createGEllipse(){
    clear(); 
    obj = GraphTableSVG.createShape('svgbox', 'g-ellipse', {cx : 100, cy : 100, text : "hello world"});
}
function create(type){
    clear(); 
    obj = GraphTableSVG.createShape('svgbox', type, {cx : 100, cy : 100, text : "hello world"});
}

