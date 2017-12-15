import SVGTable = GraphTableSVG.SVGTable;
import SVGToVBA = GraphTableSVG.SVGToVBA;
import Graph = GraphTableSVG.Graph;
//var svgBox: HTMLElement;
var graphtable: SVGTable | Graph | null = null;
var clicker : SLP.Clicker; 

function createSLP() {
    //clear();

    var svgBox = document.getElementById('svgbox');
    svgBox.innerHTML = "";
    var text = getInputText("inputtext_itb");    
    clicker = new SLP.Clicker(text, svgBox, 20, "slp-table", "slp-node");
    clicker.nodeXInterval = 60;
    clicker.nodeYInterval = 60;
    //clicker.table.textClassName = "table_text";
    
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
    var svgBox = document.getElementById('svgbox');            
    for(var i = 0;i<x.length;i++){
        if(x[i].target != svgBox){
        if (graphtable instanceof Graph) {
            var rect1 = clicker.graph.getRegion();
            var rect2 = clicker.table.getRegion();
            setSVGBoxSize(svgBox, Math.max(rect1.right, rect2.right), Math.max(rect1.bottom, rect2.bottom));
        }
        }
    }
}
