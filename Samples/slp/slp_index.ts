import SVGTable = GraphTableSVG.SVGTable;
import SVGToVBA = GraphTableSVG.SVGToVBA;
import Graph = GraphTableSVG.Graph;
//var svgBox: HTMLElement;
var graphtable: SVGTable | Graph | null = null;
var clicker : Grammar.Clicker; 

function createSLP() {
    //clear();

    var svgBox = document.getElementById('svgbox');
    svgBox.innerHTML = "";
    var text = getInputText("inputtext_itb");    
    clicker = new Grammar.Clicker(text, svgBox, 20, "slp-table", "slp-graph");
    clicker.nodeXInterval = 60;
    clicker.nodeYInterval = 60;
    //clicker.table.textClassName = "table_text";
    
    clicker.graph.save();
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
            var rect = GraphTableSVG.Rectangle.merge([clicker.graph.getRegion(), clicker.table.getRegion()]);
            setSVGBoxSize(svgBox, rect.right + 30, rect.bottom + 30);
        }
        }
    }
}
