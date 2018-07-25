
const items : GraphTableSVG.VBAObjectType[] = [];
window.onload = () => {
    
    const box = <HTMLElement>document.getElementById('svgbox');
    const item1 = new GraphTableSVG.CallOut(box, {cx : 200, cy : 200, text : "hoghogeaaaaaaaaaaaaaa", isAutoSizeShapeToFitText : false, className : "callout"})
    item1.width = 200;
    item1.height =100;
    item1.svgGroup.onclick = onObjectClick;
    items.push(item1);

    const arrow = new GraphTableSVG.ShapeArrow(box, {cx : 100, cy : 100, text : "hoghogeaaaaaaaaaaaaaa", isAutoSizeShapeToFitText : true, className : "callout"})
    arrow.svgGroup.onclick = onObjectClick;
    items.push(arrow);

};

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

function onObjectClick(this : SVGElement,e : MouseEvent) : void {
    console.log(this);

    const p = getObject(this)
    console.log(p);
}