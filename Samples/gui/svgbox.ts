
function clear(svg: HTMLElement, items: (GraphTableSVG.Graph | GraphTableSVG.SVGTable)[]) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item instanceof Graph) {
            item.removeGraph(svg);
        } else if (item instanceof SVGTable) {
            item.removeTable(svg);
        }
    }
}
function setSVGBoxSize(box: HTMLElement, w: number, h: number) {
    var width = `${w}px`;
    var height = `${h}px`;

    if (box.style.width != width || box.style.height != height) {
        box.style.width = width;
        box.style.height = height;
        box.setAttribute(`viewBox`, `0 0 ${w} ${h}`);
    }

}
function getInputText(boxname: string): string {
    var textbox: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById(boxname);
    return textbox.value;
}