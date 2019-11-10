namespace GraphTableSVG {
    export class TableDictionary{
        public static IndexName = "___GraphTableSVG_Console_Index";
        public static ValueName = "___GraphTableSVG_Console_Value";

        columnMapper: Map<string, number> = new Map();
        rows : Map<string, any >[] = new Array();
        //columnValues: Map<string, (string|undefined)[]>= new Map();
        //itemCount : number = 0;

        constructor(){
            this.columnMapper.set(TableDictionary.IndexName, 0);
            //this.columnValues.set("index", []);
        }
        public construct(item : any){
            if (item instanceof Array) {
                item.forEach((v) =>{
                    this.add(v);
                })
            } else {
                this.add(item);
            }
        }

        public addValue(i : number, key : string, value : any){
            const column = this.columnMapper.get(key);
            if(column == undefined){
                this.columnMapper.set(key, this.columnMapper.size);
            }
            this.rows[i].set(key, value);

        }
        public add(item : any){
            this.rows.push(new Map());
            const x = this.rows.length-1;
            this.addValue(x, TableDictionary.IndexName, x.toString());
            if (item instanceof Array) {
                for(let i=0;i<item.length;i++){
                    const cell = item[i];
                    if(cell != undefined){
                        this.addValue(x, i.toString(), cell );
                    }
                }
            } else {
                if (typeof item == 'string' || typeof item == 'number' || typeof item == 'boolean') {
                    this.addValue(x, TableDictionary.ValueName, item.toString());
                } else if(typeof item == 'object'){
                    Object.keys(item).forEach((key)=>{
                        const value = item[key];
                        this.addValue(x, key.toString(), value );
                    })
                }
            }
        }

        public toLogicTable() : GraphTableSVG.LogicTable{
            const table = new GraphTableSVG.LogicTable({columnCount:this.columnMapper.size, rowCount:this.rows.length+1 });

            this.columnMapper.forEach((value, key) =>{
                table.cells[0][value].textClass = CustomAttributeNames.StyleValue.defaultConsoleColumnTitleCellTextClass;
                table.cells[0][value].backgroundClass = CustomAttributeNames.StyleValue.defaultConsoleColumnTitleCellBackgroundClass;    
                if(key == GraphTableSVG.TableDictionary.IndexName){
                    table.cells[0][value].text = "(index)";
                }else if(key == TableDictionary.ValueName){
                    table.cells[0][value].text = "(value)";

                }else{
                    table.cells[0][value].text = key;
                }

            })
            this.rows.forEach((map, index) =>{

                const tableIndex = index+1;
                for(let i=0;i<this.columnMapper.size;i++){
                    table.cells[tableIndex ][i].text = "undefined";
                    table.cells[tableIndex ][i].textClass = CustomAttributeNames.StyleValue.defaultConsoleColumnTitleCellUndefinedTextClass;
                }
                map.forEach((value, key) =>{
                    const columnIndex = this.columnMapper.get(key); 
                    if(columnIndex != undefined){
                        const cell = this.rows[index].get(key);
                        if(cell == null){
                            table.cells[tableIndex][columnIndex].text = "null";
                        } else if(cell != undefined){
                            table.cells[tableIndex][columnIndex].text = cell.toString();
                            table.cells[tableIndex][columnIndex].textClass = CustomAttributeNames.StyleValue.defaultTextClass;

                        }
                    }
                })
            })
            return table;

        }

    }
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
    }
}