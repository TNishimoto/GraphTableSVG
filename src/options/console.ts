    import {TableDictionary} from "./table_dictionary"
    import { LogicGraph, LogicGraphNode, LogicTree } from "../object/logic/logic_tree"
    import { LogicTable } from "../object/logic/logic_table"
    //import { CommonFunctions } from "../basic/common/common_functions";
    import { createShape } from "./open_svg";
    import * as SVGTextBox from "../basic/interface/svg_textbox";
    import * as AttributeNames from "../basic/common/attribute_names"
    import * as DefaultClassNames from "../basic/common/default_class_names"
    import * as SVG from "../basic/interface/svg";
    import * as CSS from "../basic/html/css";
    import { PNG } from "../basic/common/png";
    import * as VBAMacroModal from "./vba_macro_modal";
    import { SVGToVBA } from "./svg_to_vba"
    import { VBAObjectType } from "./vba_object"

    import * as GUIObserver from "../basic/html/gui_observer"
    

    //export namespace Console {
        export class ConsoleLineElement {
            public canvas : SVGSVGElement | null = null;
            public vbaObjects : VBAObjectType[] = new Array();
            canvasContainer : HTMLDivElement;
            //pngButton : HTMLButtonElement;
            removeButton : HTMLButtonElement;
            macroButton : HTMLButtonElement;
            constructor(parent : HTMLElement, createVBAButton : boolean = true, createCanvas : boolean = true, mainElement : HTMLElement | null = null){
                this.canvasContainer = document.createElement("div");
                parent.appendChild(this.canvasContainer);           
                
                if(createCanvas){
                    this.canvas = ConsoleLineElement.addSVGSVGElement(this.canvasContainer);
                    GUIObserver.observeSVGSVG(this.canvas);                        
                }
                if(mainElement != null){
                    this.canvasContainer.appendChild(mainElement);
                }
                /*
                this.pngButton = document.createElement("button");
                this.pngButton.textContent = "PNG";
                const pngFunc = () =>{
                    const _canvas = PNG.createPNGFromSVGSVGElement(this.canvas);
                    this.canvasContainer.appendChild(_canvas);

                }
                this.pngButton.onclick = pngFunc;
                */
                //this.canvasContainer.appendChild(this.pngButton);
                //this.pngButton.setAttribute("hidden", "1");
                this.removeButton = document.createElement("button");
                this.removeButton.textContent = "remove";                
                this.canvasContainer.appendChild(this.removeButton);
                const removeFunc = () => {
                    this.canvasContainer.remove();
                }
                this.removeButton.onclick = removeFunc;

                this.macroButton = document.createElement("button");
                this.macroButton.textContent = "VBA";
                if(createVBAButton){
                    this.canvasContainer.appendChild(this.macroButton);
                }



                const vbaFunc = () =>{
                    VBAMacroModal.createMacroModal(SVGToVBA.create(this.vbaObjects));

                }

                this.macroButton.onclick = vbaFunc;



            }
            public addVBAObject(obj : VBAObjectType){
                this.vbaObjects.push(obj);
            }


            public static addSVGSVGElement(code: HTMLElement): SVGSVGElement {
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                //const p = document.createElement("p");
                //code.appendChild(p);
                //p.appendChild(svg);
                code.appendChild(svg);
                svg.setAttribute("style", "background:#e9e9e9;border:solid 1pt;padding:10px");
                //svg.setAttribute("style", "background:#e9e9e9;");

                //svg.setAttribute("width", "600px");
                //svg.setAttribute("height", "600px");
                svg.setAttribute("g-shrink", "true");
                if (svg instanceof SVGSVGElement) {
                    return svg;
                } else {
                    throw "error";
                }
            }
    

        }
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

        function getOrCreateCodeElement(): HTMLElement {
            CSS.setGraphTableCSS();
            const code = getCodeTag();
            if (code != null) {
                return code;
            } else {
                const element = document.createElement("code");
                document.body.appendChild(element);
                element.setAttribute("name", "GraphTableSVG");
    
                return element;
            }
        }


        /*
        function initialize(): void {
            const code = getCodeTag();
            if (code == null) {
                createCodeTag();
            }
        }
        */
        export function table(item: any) {
            if(item instanceof LogicTable){ 
                const code = getOrCreateCodeElement();
                const consoleLine = new ConsoleLineElement(code);

                //const svg = addSVGSVGElement(code);
                const gtable = createShape(consoleLine.canvas!, "g-table");

                gtable.constructFromLogicTable(item);
                gtable.x = 0;
                gtable.y = 0;
                consoleLine.addVBAObject(gtable);

            }else{

                const tableDic = new TableDictionary();
                tableDic.construct(item);
                const logicTable = tableDic.toLogicTable();
                table(logicTable);
            }
            

        }
        export function clear(){
            const code = getOrCreateCodeElement();
            code.innerHTML="";
        }

        export function graph(item : any | LogicTree | LogicGraph, canvasID : string | null = null ){

            if(item instanceof LogicTree || item instanceof LogicGraph){
                if(canvasID != null){
                    const ggraph = createShape(canvasID, "g-graph");    
                    ggraph.build(item);    
                }else{
                    const code = getOrCreateCodeElement();
                    const consoleLine = new ConsoleLineElement(code);
                    //const svg = addSVGSVGElement(code);
                    const ggraph = createShape(consoleLine.canvas!, "g-graph");    
                    ggraph.build(item);
                    consoleLine.addVBAObject(ggraph);
                }
                /*
                if(item instanceof LogicGraph){
                }else{
                    ggraph.constructFromLogicTree(item);
                }
                */
            }else{
                const tableDic = new TableDictionary();
                tableDic.construct(item);
                const logicGraph = tableDic.toLogicGraph();
                graph(logicGraph, canvasID);
                //console.log(logicGraph);    
            }
        }
        export function log(message : string) : ConsoleLineElement{
            const code = getOrCreateCodeElement();
            const consoleLine = new ConsoleLineElement(code);

            const textClass = DefaultClassNames.defaultTextClass;  
            const textElement = SVG.createText(textClass)
            //const text = document.createElementNS('http://www.w3.org/2000/svg', "text");

            //text.textContent = message;
            consoleLine.canvas!.appendChild(textElement);

            SVGTextBox.setTextToSVGText(textElement, message, false);
            textElement.setAttribute("x", "0" );
            const b2 = SVGTextBox.getSize(textElement, true);
            textElement.setAttribute("y", b2.height.toString() );

            consoleLine.addVBAObject(textElement);

            //table(message);
            return consoleLine;
        }
        export function textarea(message : string) : ConsoleLineElement{
            const code = getOrCreateCodeElement();
            const textArea = document.createElement("textarea");
            textArea.textContent = message;
            textArea.rows = 5;
            textArea.cols = 80;
            const consoleLine = new ConsoleLineElement(code, false, false, textArea);


            //const canvasContainer = document.createElement("div");
            //code.appendChild(canvasContainer);                

            //consoleLine.canvasContainer.appendChild(textArea);
            return consoleLine;

        }
        export function view(item : LogicTable | LogicTree | LogicGraph){
            if(item instanceof LogicTable){
                table(item);
            }else if(item instanceof LogicTree){
                graph(item);
            }else{
                graph(item);
            }
        }
    //}
