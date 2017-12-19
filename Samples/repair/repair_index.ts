import SVGTable = GraphTableSVG.SVGTable;
import SVGToVBA = GraphTableSVG.SVGToVBA;
import Graph = GraphTableSVG.Graph;
//var svgBox: HTMLElement;
var graphtable: SVGTable | Graph | null = null;
var repairGrammars : Grammar.SLPDictionary[] = [];
var grammarIndex = 0;
function createRepair() {
    //clear();

    var svgBox = document.getElementById('svgbox');
    var text = getInputText("inputtext_itb");    
    var r = new Grammar.RepairCompressor(text);

    repairGrammars.push(r.slp.copy());

    while(r.slp.startVariables.length > 1){
        r.repair();
        repairGrammars.push(r.slp.copy());
    }
    view(repairGrammars.length-1);
}
function view(i : number){
    var svgBox = document.getElementById('svgbox');
    svgBox.innerHTML = "";
    var p = new Grammar.SLPViewer(repairGrammars[i], svgBox, 30,"slp-table", "slp-graph");
    p.table.resize();
    
    var nb = <HTMLButtonElement>document.getElementById('next_button');
    var pb = <HTMLButtonElement>document.getElementById('prev_button');
    nb.disabled = i == repairGrammars.length-1;
    pb.disabled = i == 0;
    
    grammarIndex = i;

    var rect = GraphTableSVG.Rectangle.merge([p.graph.getRegion(), p.table.getRegion()]);

    
    setSVGBoxSize(svgBox, rect.right, rect.bottom)

}
function prev(){
    view(grammarIndex-1);
}
function next(){
    view(grammarIndex+1);    
}

window.onload = () => {

    var svgBox = document.getElementById('svgbox');

    _observer = new MutationObserver(observeFunction);
    var option: MutationObserverInit = {
        subtree: true, attributes: true
    };
    _observer.observe(svgBox, option);
    createRepair();
};
var _observer: MutationObserver;
var observeFunction: MutationCallback = (x: MutationRecord[]) => {
    var svgBox = document.getElementById('svgbox');            
    for(var i = 0;i<x.length;i++){
        if(x[i].target != svgBox){
        if (graphtable instanceof Graph) {
            //var rect1 = clicker.graph.getRegion();
            //var rect2 = clicker.table.getRegion();
            //setSVGBoxSize(svgBox, Math.max(rect1.right, rect2.right), Math.max(rect1.bottom, rect2.bottom));
        }
        }
    }
}
