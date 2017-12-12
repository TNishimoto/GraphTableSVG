import SVGTable = GraphTableSVG.SVGTable;
import SVGToVBA = GraphTableSVG.SVGToVBA;
import Graph = GraphTableSVG.Graph;
//var svgBox: HTMLElement;
var graphtable: SVGTable | Graph | null = null;


function createSuffixArrayTable() {
    var svgBox = document.getElementById('svgbox');
    
    var text: string = getInputText();
    var sa: number[] = StringModule.computeSuffixArray(text);
    svgBox.innerHTML = "";
    var table = new SVGTable(2, sa.length + 1);
    svgBox.appendChild(table.group);

    table.cells[0][0].svgText.textContent = "SA";
    table.cells[0][1].svgText.textContent = "Text";
    table.cells[0][1].svgText.style.textAnchor = "left";
    table.cells[0][0].width = 0;
    table.cells[0][0].height = 0;
    table.cells[0][1].width = 0;
    table.cells[0][1].height = 0;

    for (var i = 0; i < sa.length; i++) {
        var suffix = text.substr(sa[i]);
        table.cells[i+1][0].svgText.textContent = sa[i].toString();
        table.cells[i + 1][1].svgText.textContent = suffix;
        table.cells[i + 1][1].svgText.style.textAnchor = "left";
        table.cells[i + 1][0].width = 0;
        table.cells[i + 1][0].height = 0;
        table.cells[i + 1][1].width = 0;
        table.cells[i + 1][1].height = 0;

    }
    table.resize();

    graphtable = table;
}


window.onload = () => {

    var svgBox = document.getElementById('svgbox');

    _observer = new MutationObserver(observeFunction);
    var option: MutationObserverInit = {
        subtree: true, attributes: true
    };
    _observer.observe(svgBox, option);

};
var _observer: MutationObserver;
var observeFunction: MutationCallback = (x: MutationRecord[]) => {
    if (graphtable instanceof Graph) {
        var svgBox = document.getElementById('svgbox');        
        var rect = graphtable.getRegion();
        setSVGBoxSize(svgBox,rect.right, rect.bottom);
    }
}
function setSVGBoxSize(box : HTMLElement, w: number, h: number) {
    var width = `${w}px`;
    var height = `${h}px`;

    if (box.style.width != width || box.style.height != height) {
        box.style.width = width;
        box.style.height = height;
        box.setAttribute(`viewBox`, `0 0 ${w} ${h}`);
    }

}
function getInputText(): string {
    var textbox: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById(`inputtext_itb`);
    return textbox.value;
}