let graph = null;
let callOut = null;
window.onload = () => {
    
    const box = document.getElementById('svgbox');
    callOut = new GraphTableSVG.CallOut(box, {cx : 200, cy : 200, text : "hoghogeaaaaaaaaaaaaaa", isAutoSizeShapeToFitText : false, className : "callout"})
    callOut.width = 200;
    callOut.height =100;

    arrow = new GraphTableSVG.ShapeArrow(box, {cx : 100, cy : 100, text : "hoghogeaaaaaaaaaaaaaa", isAutoSizeShapeToFitText : true, className : "callout"})
    arrow.update();

    //callOut.svgText.setMarginTop(50);
    graph = callOut;

    box.onclick = hello;

};
function margin(px, py){
    const px1 = Number(px);
    const py1 = Number(py);

    let r1 = callOut.svgText.getMarginLeft() + px1;
    let r2 = callOut.svgText.getMarginTop() + py1;
     
    callOut.svgText.setMarginLeft(r1);
    callOut.svgText.setMarginTop(r2);

    //callOut.update();

}
function addText(){
    callOut.svgText.textContent+="a";
}
function hello(e){
    const box = document.getElementById('svgbox');
    var clientRect = box.getBoundingClientRect() ;
	var positionX = clientRect.left + window.pageXOffset ;
	var positionY = clientRect.top + window.pageYOffset ;

    const circle = document.getElementById('circle');
    const x = e.pageX  - positionX;
    const y = e.pageY - positionY;
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    callOut.speakerX = x;
    callOut.speakerY = y;
}
function upate(){
    callOut.update();
}