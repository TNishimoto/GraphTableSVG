import SVGTable = GraphTableSVG.SVGTable;
import SVGToVBA = GraphTableSVG.SVGToVBA;
import Graph = GraphTableSVG.Graph;
//var svgBox: HTMLElement;
var graphtable: SVGTable | Graph | null = null;

function createSLP() {
    //clear();

    var svgBox = document.getElementById('svgbox');
    svgBox.innerHTML = "";
    var text = getInputText("inputtext_itb");    
    var clicker = new SLP.Clicker(text, svgBox, 20);
    clicker.nodeXInterval = 60;
    clicker.nodeYInterval = 60;
    
    graphtable = clicker.graph;
    
}

window.onload = () => {

    var svgBox = document.getElementById('svgbox');

    _observer = new MutationObserver(observeFunction);
    var option: MutationObserverInit = {
        subtree: true, attributes: true
    };
    _observer.observe(svgBox, option);
    createSLP();
};
var _observer: MutationObserver;
var observeFunction: MutationCallback = (x: MutationRecord[]) => {
    if (graphtable instanceof Graph) {
        var svgBox = document.getElementById('svgbox');        
        var rect = graphtable.getRegion();
        setSVGBoxSize(svgBox,rect.right, rect.bottom);
    }
}
