import SVGTable = GraphTableSVG.SVGTable;
import SVGToVBA = GraphTableSVG.SVGToVBA;
import Graph = GraphTableSVG.Graph;
//var svgBox: HTMLElement;
var graphtable: SVGTable | Graph | null = null;


function createSuffixArrayTable() {
    var svgBox = document.getElementById('svgbox');
    
    var text: string = getInputText("inputtext_itb");
    var sa: number[] = StringModule.computeSuffixArray(text);
    svgBox.innerHTML = "";
    var table = new SVGTable(2, sa.length + 1);
    svgBox.appendChild(table.group);

    table.cells[0][0].svgText.textContent = "SA";
    table.cells[0][1].svgText.textContent = "Text";
    table.cells[0][1].horizontalAnchor = GraphTableSVG.HorizontalAnchor.Left;
    
    table.cells[0][0].width = 0;
    table.cells[0][0].height = 0;
    table.cells[0][1].width = 0;
    table.cells[0][1].height = 0;
    

    for (var i = 0; i < sa.length; i++) {
        var suffix = text.substr(sa[i]);
        table.cells[i+1][0].svgText.textContent = sa[i].toString();
        table.cells[i + 1][1].svgText.textContent = suffix;
        table.cells[i + 1][1].horizontalAnchor = GraphTableSVG.HorizontalAnchor.Left;
        
        table.cells[i + 1][0].width = 0;
        table.cells[i + 1][0].height = 0;
        table.cells[i + 1][1].width = 0;
        table.cells[i + 1][1].height = 0;
        
        table.cells[i + 1][0].horizontalAnchor = GraphTableSVG.HorizontalAnchor.Center;
        
    }
    table.resize();

    graphtable = table;
    resizeSVGBox();
}


window.onload = () => {

    var svgBox = document.getElementById('svgbox');
    createSuffixArrayTable();
};
function resizeSVGBox(){
    var svgBox = document.getElementById('svgbox');        
    if (graphtable instanceof Graph) {
        var rect = graphtable.getRegion();
        setSVGBoxSize(svgBox,rect.right, rect.bottom);
    }else if(graphtable instanceof GraphTableSVG.SVGTable){
        var rect = graphtable.getRegion();
        setSVGBoxSize(svgBox,rect.right, rect.bottom);        
    }
}