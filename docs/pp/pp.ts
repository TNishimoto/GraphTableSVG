const items : GraphTableSVG.VBAObjectType[] = [];

window.onload = () => {

    
    const box : SVGSVGElement = <any>document.getElementById('svgbox');
    if(box instanceof SVGSVGElement){
        const p = GraphTableSVG.openSVG(box);
        p.forEach((v)=>{
            if(v instanceof GraphTableSVG.PPTextBoxShapeBase){
                v.svgGroup.onclick = onObjectClick;
                items.push(v);
            }
        })
    }
    
    /*
    positionFieldSet = <HTMLElement>document.getElementById('position-field');
    xyFieldSet = <HTMLElement>document.getElementById('xy-field');
    calloutFieldSet = <HTMLElement>document.getElementById('callout-field');
    arrowFieldSet = <HTMLElement>document.getElementById('arrow-field');
    */
    FooterButton.call('footer-button',0);

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
    console.log(source);
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
    console.log(source);
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
/*
let positionFieldSet : HTMLElement;
let xyFieldSet : HTMLElement;
let calloutFieldSet : HTMLElement;
let arrowFieldSet : HTMLElement;
*/
let binderObjects : SimpleTwowayBinding[] = [];

function setOption(e : GraphTableSVG.VBAObjectType){

    binderObjects.forEach((v)=>v.dispose());
    binderObjects = [];
    const optionFieldSet = <HTMLElement>document.getElementById('option-field');

    if(e instanceof GraphTableSVG.Callout){
        const id = e.svgGroup.getAttribute("id")!;
        if(id == null) throw Error("No ID");
        SimpleTwowayBinding.autoBind({targetElement : optionFieldSet, bindID : id}).forEach((v)=>binderObjects.push(v));
    }else if(e instanceof GraphTableSVG.ShapeArrowCallout){
        const id = e.svgGroup.getAttribute("id")!;
        if(id == null) throw Error("error");

        SimpleTwowayBinding.autoBind({targetElement : optionFieldSet, bindID : id}).forEach((v)=>binderObjects.push(v));
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
        if(e instanceof GraphTableSVG.Callout){
            switch(id){
                case "position-field" : return false;
                case "xy-field" : return true;
                case "arrow-field" : return false;
                case "callout-field" : return true;
                case "callout-direction-field" : return false;
                case "shrink-field" : return true;
                case "size-field" : return true;
                case "margin-field" : return true;
                case "vertical-field" : return true;
                case "horizontal-field" : return true;
                case "text-field" : return true;

            }
            return false;
        }else if(e instanceof GraphTableSVG.ShapeArrowCallout){
            switch(id){
                case "position-field" : return false;
                case "xy-field" : return true;
                case "arrow-field" : return true;
                case "callout-field" : return false;
                case "callout-direction-field" : return true;
                case "shrink-field" : return true;
                case "size-field" : return true;
                case "margin-field" : return true;
                case "vertical-field" : return true;
                case "horizontal-field" : return true;
                case "text-field" : return true;

            }
            return false;
        }
    }
    return false;
}