const items: GraphTableSVG.VBAObjectType[] = [];
let mouseMoveItem: GraphTableSVG.VBAObjectType | null = null;
let binderObjects: SimpleTwowayBinding[] = [];

window.onload = () => {


    const box: SVGSVGElement = <any>document.getElementById('svgbox');
    if (box instanceof SVGSVGElement) {
        const p = GraphTableSVG.openSVG(box);
        p.forEach((v) => {
            if (v instanceof GraphTableSVG.GObject) {
                v.svgGroup.onclick = onObjectClick;
                items.push(v);
            }
        })
    }
    FooterButton.call('footer-button', 0);

};


function binding(e: GraphTableSVG.GObject) {
    binderObjects.forEach((v) => v.dispose());
    binderObjects = [];
    const optionFieldSet = <HTMLElement>document.getElementById('option-field');
    const id = e.svgGroup.getAttribute("id")!;
    if (id == null) throw Error("No ID");
    SimpleTwowayBinding.autoBind({ targetElement: optionFieldSet, bindID: id }).forEach((v) => binderObjects.push(v));
}
function onObjectClick(this: SVGElement, e: MouseEvent): void {
    const p = GraphTableSVG.GObject.getObjectFromObjectID(this)
    mouseMoveItem = p;

    if (mouseMoveItem != null) {
        binding(mouseMoveItem);
    }
}
/*
function mouseMoveEvent(e: MouseEvent): void {
    if (e.buttons == 1 && mouseMoveItem != null) {
        if (mouseMoveItem instanceof GraphTableSVG.GObject) {
            mouseMoveItem.cx = e.x;
            mouseMoveItem.cy = e.y;
        }
    }
}
*/

