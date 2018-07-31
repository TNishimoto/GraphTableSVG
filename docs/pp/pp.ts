const items : GraphTableSVG.VBAObjectType[] = [];
/*
interface Window {
    Vue?: any;
}
declare var window: Window
const Vue = window.Vue
*/

window.onload = () => {

    //const inputBox = <HTMLInputElement>document.getElementById('inputOB');
    //const circle = <HTMLElement>document.getElementById('circle');
    
    const box = <HTMLElement>document.getElementById('svgbox');
    /*
    box.onclick = (e : MouseEvent) =>{
        circle.setAttribute("cx", e.x.toString());
        circle.setAttribute("cy", e.y.toString());

    }
    */
    
    const item1 = new GraphTableSVG.CallOut(box, {cx : 200, cy : 200, text : "hoghogeaaaaaaaaaaaaaa", isAutoSizeShapeToFitText : false, className : "callout"})
    item1.width = 200;
    item1.height =100;
    item1.svgGroup.onclick = onObjectClick;
    items.push(item1);
    item1.svgGroup.setAttribute("id", "shape")

    const arrow = new GraphTableSVG.ShapeArrow(box, {cx : 100, cy : 100, text : "hoghogeaaaaaaaaaaaaaa", isAutoSizeShapeToFitText : true, className : "callout"})
    arrow.svgGroup.onclick = onObjectClick;
    items.push(arrow);
    arrow.svgGroup.setAttribute("id", "arrowshape")


    //box.onmousemove = mouseMoveEvent
    

    positionFieldSet = <HTMLElement>document.getElementById('position-field');
    xyFieldSet = <HTMLElement>document.getElementById('xy-field');
    calloutFieldSet = <HTMLElement>document.getElementById('callout-field');
    arrowFieldSet = <HTMLElement>document.getElementById('arrow-field');

};
function sconv(value : string) : string{
    const [v, unit] = GraphTableSVG.Common.parseUnit(value);
    return v.toString();
}
function tconv(value : string) : string{
    return `${value}pt`;
}

function transformSconv(value : string, binder : SimpleTwowayBinding) : string{
    const source = binder.source.element;
    if(source instanceof SVGGElement){
        if(binder.target.element.getAttribute("name")=="x"){
            return source.getX().toString();
        }else{
            return source.getY().toString();
        }
    }
    throw Error("error");
}
function transformTconv(value : string, binder : SimpleTwowayBinding) : string{
    const source = binder.source.element;
    if(source instanceof SVGGElement){
        const a = source.transform.baseVal.getItem(0).matrix.a;
        const b = source.transform.baseVal.getItem(0).matrix.b;
        const c = source.transform.baseVal.getItem(0).matrix.c;
        const d = source.transform.baseVal.getItem(0).matrix.d;
        if(binder.target.element.getAttribute("name")=="x"){
            const e = value;
            const f = source.transform.baseVal.getItem(0).matrix.f;
            return `matrix(${a} ${b} ${c} ${d} ${e} ${f})`;
        }else{
            const e = source.transform.baseVal.getItem(0).matrix.e;
            const f = value;
            return `matrix(${a} ${b} ${c} ${d} ${e} ${f})`;
        }
    }
    throw Error("error");
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

let positionFieldSet : HTMLElement;
let xyFieldSet : HTMLElement;
let calloutFieldSet : HTMLElement;
let arrowFieldSet : HTMLElement;
let binderObjects : SimpleTwowayBinding[] = [];

function setOption(e : GraphTableSVG.VBAObjectType){
    binderObjects.forEach((v)=>v.dispose());
    binderObjects = [];
    const optionFieldSet = <HTMLElement>document.getElementById('option-field');

    if(e instanceof GraphTableSVG.CallOut){
        const id = e.svgGroup.getAttribute("id")!;
        /*
        calloutFieldSet.style.display = "inline";
        positionFieldSet.style.display = "none";
        arrowFieldSet.style.display = "none";
        xyFieldSet.style.display = "inline";
        */
       SimpleTwowayBinding.autoBind({targetElement : optionFieldSet, bindID : id}).forEach((v)=>binderObjects.push(v));

        //SimpleTwowayBinding.autoBind({targetElement : xyFieldSet, bindID : id}).forEach((v)=>binderObjects.push(v));
        //SimpleTwowayBinding.autoBind({targetElement : calloutFieldSet, bindID : id}).forEach((v)=>binderObjects.push(v));

    }else if(e instanceof GraphTableSVG.ShapeArrow){
        const id = e.svgGroup.getAttribute("id")!;
        SimpleTwowayBinding.autoBind({targetElement : optionFieldSet, bindID : id}).forEach((v)=>binderObjects.push(v));

        /*
        calloutFieldSet.style.display = "none";
        positionFieldSet.style.display = "none";
        arrowFieldSet.style.display = "inline";
        xyFieldSet.style.display = "inline";
        */

        //SimpleTwowayBinding.autoBind({targetElement : xyFieldSet, bindID : id}).forEach((v)=>binderObjects.push(v));
        //SimpleTwowayBinding.autoBind({targetElement : arrowFieldSet, bindID : id}).forEach((v)=>binderObjects.push(v));
    }

}
function onObjectClick(this : SVGElement,e : MouseEvent) : void {
    const p = getObject(this)
    mouseMoveItem = p;
    if(mouseMoveItem != null){
        setOption(mouseMoveItem);
    }
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
function optionIf(source : HTMLElement, target : HTMLElement) : boolean {
    const id = target.getAttribute("id");
    if(source instanceof SVGElement){
        const e = getObject(source);
        if(e instanceof GraphTableSVG.CallOut){
            switch(id){
                case "position-field" : return false;
                case "xy-field" : return true;
                case "arrow-field" : return false;
                case "callout-field" : return true;
                case "callout-direction-field" : return false;

            }
            return false;
        }else if(e instanceof GraphTableSVG.ShapeArrow){
            switch(id){
                case "position-field" : return false;
                case "xy-field" : return true;
                case "arrow-field" : return true;
                case "callout-field" : return false;
                case "callout-direction-field" : return true;

            }
            return false;
        }
    }
    return false;
}
