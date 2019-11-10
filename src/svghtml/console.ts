namespace GraphTableSVG {
    export namespace Console {
        function getCodeTag(): HTMLElement | null {
            const collection = document.getElementsByTagName("code");
            for (let i = 0; i < collection.length; i++) {
                const item = collection.item(i);
                if (item != null) {
                    const name = item.getAttribute("name");
                    if (name == "GraphTableSVG") {
                        return item;
                    }
                }
            }
            return null;
        }

        function createCodeTag(): HTMLElement {
            const element = document.createElement("code");
            document.body.appendChild(element);
            element.setAttribute("name", "GraphTableSVG");
            return element;
        }
        function getOrCreateCodeElement(): HTMLElement {
            const code = getCodeTag();
            if (code != null) {
                return code;
            } else {
                return createCodeTag();
            }
        }

        function addSVGSVGElement(code: HTMLElement): SVGSVGElement {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const p = document.createElement("p");
            code.appendChild(p);
            p.appendChild(svg);
            svg.setAttribute("style", "background:#e9e9e9;border:solid 1pt;padding:10px");
            //svg.setAttribute("width", "600px");
            //svg.setAttribute("height", "600px");
            svg.setAttribute("g-shrink", "true");
            if (svg instanceof SVGSVGElement) {
                return svg;
            } else {
                throw "error";
            }
        }



        function initialize(): void {
            const code = getCodeTag();
            if (code == null) {
                createCodeTag();
            }
        }
        export function table(item: any) {
            GraphTableSVG.Common.setGraphTableCSS();
            const code = getOrCreateCodeElement();
            const svg = addSVGSVGElement(code);
            const gtable = createShape(svg, "g-table");
            const tableDic = new TableDictionary();
            tableDic.construct(item);
            const logicTable = tableDic.toLogicTable();
            
            gtable.constructFromLogicTable(logicTable);
            gtable.x = 0;
            gtable.y = 0;

        }
        export function clear(){
            const code = getOrCreateCodeElement();
            code.innerHTML="";
        }

        export function graph(item : any){
            GraphTableSVG.Common.setGraphTableCSS();
            const code = getOrCreateCodeElement();
            const svg = addSVGSVGElement(code);
            const ggraph = createShape(svg, "g-graph");
            const tableDic = new TableDictionary();
            tableDic.construct(item);
            const logicGraph = tableDic.toLogicGraph();
            ggraph.constructFromLogicGraph(logicGraph);
            console.log(logicGraph);
        }
    }
}