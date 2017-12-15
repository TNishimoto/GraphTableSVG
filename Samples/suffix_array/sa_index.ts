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
    var table = new SVGTable(2, sa.length + 1, "sa-table");
    svgBox.appendChild(table.group);

    table.cells[0][0].svgText.textContent = "SA";
    table.cells[0][1].svgText.textContent = "Text";
    //table.cells[0][1].horizontalAnchor = GraphTableSVG.HorizontalAnchor.Left;
    console.log(table.cells[0][1].svgBackground.getActiveStyle().getHorizontalAnchor());

    
    for (var i = 0; i < sa.length; i++) {
        var suffix = text.substr(sa[i]);
        table.cells[i+1][0].svgText.textContent = (sa[i]+1).toString();
        table.cells[i + 1][1].svgText.textContent = suffix;
        table.cells[i+1][1].svgBackground.setAttribute("class", "textarea-background");
        //var span = <SVGTSpanElement>document.createElementNS('http://www.w3.org/2000/svg', 'tspan');    
        //span.textContent = "hogehoge";
        //span.style.fill = "red";
        //table.cells[i+1][1].svgText.appendChild(span);
        //span.dy.baseVal.getItem(0).value = 50;
        //span.setAttribute("dy", "20");       
        //table.cells[i+1][1].height = 160;
        //console.log(table.cells[i+1][1].svgText.getBBox());
        //console.log(table.cells[i+1][1].svgText.getBoundingClientRect());
        //table.cells[i + 1][1].horizontalAnchor = GraphTableSVG.HorizontalAnchor.Left;        
        //table.cells[i + 1][0].horizontalAnchor = GraphTableSVG.HorizontalAnchor.Center;
        
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