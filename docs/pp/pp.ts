const items : GraphTableSVG.VBAObjectType[] = [];
/*
interface Window {
    Vue?: any;
}
declare var window: Window
const Vue = window.Vue
*/

window.onload = () => {

    const inputBox = <HTMLInputElement>document.getElementById('inputOB');
    const circle = <HTMLElement>document.getElementById('circle');
    //const tw = new SimpleTwowayBinding({sourceElement: circle, targetElement: inputBox, watchedTargetAttribute: "value", watchedSourceAttribute: "cx"} )
    //const tw = new SimpleTwowayBinding({targetElement: inputBox} )
    const positionFieldSet = <HTMLElement>document.getElementById('position-field');
    const pg = SimpleTwowayBinding.autoBind({targetElement : positionFieldSet, bindID : "circle"});
    
    
    
    //inputBox.setAttribute("value", "hogehgoe");
    inputBox.value = "hgohgoe";
    console.log(circle);
    console.log(inputBox);

    const box = <HTMLElement>document.getElementById('svgbox');
    box.onclick = (e : MouseEvent) =>{
        circle.setAttribute("cx", e.x.toString());
        circle.setAttribute("cy", e.y.toString());

    }
    
    const item1 = new GraphTableSVG.CallOut(box, {cx : 200, cy : 200, text : "hoghogeaaaaaaaaaaaaaa", isAutoSizeShapeToFitText : false, className : "callout"})
    item1.width = 200;
    item1.height =100;
    item1.svgGroup.onclick = onObjectClick;
    items.push(item1);

    const arrow = new GraphTableSVG.ShapeArrow(box, {cx : 100, cy : 100, text : "hoghogeaaaaaaaaaaaaaa", isAutoSizeShapeToFitText : true, className : "callout"})
    arrow.svgGroup.onclick = onObjectClick;
    items.push(arrow);

    //box.onmousemove = mouseMoveEvent
    

};
function sconv(value : string) : string{
    const [v, unit] = GraphTableSVG.Common.parseUnit(value);
    return v.toString();
}
function tconv(value : string) : string{
    return `${value}pt`;
}

function getObject(svg : SVGElement) : GraphTableSVG.VBAObjectType | null{
    for(let i=0;i<items.length;i++){
        const item = items[i];
        if(item instanceof GraphTableSVG.PPTextBoxShapeBase){
            if(item.hasDescendant(svg)){
                return item;
            }
        }
    }
    return null;

}
let mouseMoveItem : GraphTableSVG.VBAObjectType | null = null;
function onObjectClick(this : SVGElement,e : MouseEvent) : void {
    const p = getObject(this)
    mouseMoveItem = p;
}
function mouseMoveEvent(e : MouseEvent) : void {
    if(e.buttons == 1 && mouseMoveItem != null){
        if(mouseMoveItem instanceof GraphTableSVG.PPTextBoxShapeBase){
            mouseMoveItem.cx = e.x;
            mouseMoveItem.cy = e.y;
        }
    }
}
function plus(){
    const circle = <HTMLElement>document.getElementById('circle');
    circle.style.strokeWidth = "8pt";
}