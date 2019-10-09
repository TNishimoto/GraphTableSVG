var items = [];
var mouseMoveItem = null;
var binderObjects = [];
window.onload = function () {
    var box = document.getElementById('svgbox');
    if (box instanceof SVGSVGElement) {
        var p = GraphTableSVG.openSVG(box);
        p.forEach(function (v) {
            if (v instanceof GraphTableSVG.GObject) {
                v.svgGroup.onclick = onObjectClick;
                items.push(v);
            }
        });
    }
    FooterButton.call('footer-button', 0);
};
function binding(e) {
    binderObjects.forEach(function (v) { return v.dispose(); });
    binderObjects = [];
    var optionFieldSet = document.getElementById('option-field');
    var id = e.svgGroup.getAttribute("id");
    if (id == null)
        throw Error("No ID");
    SimpleTwowayBinding.autoBind({ targetElement: optionFieldSet, bindID: id }).forEach(function (v) { return binderObjects.push(v); });
}
function onObjectClick(e) {
    var p = GraphTableSVG.GObject.getObjectFromObjectID(this);
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
