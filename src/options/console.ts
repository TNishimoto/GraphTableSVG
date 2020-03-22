import { TableDictionary } from "./table_dictionary"
import { LogicGraph, LogicGraphNode, LogicTree } from "../logics/logic_tree"
import { LogicTable } from "../logics/logic_table"
//import { CommonFunctions } from "../common/common_functions";
import { createShape } from "./open_svg";
import * as SVGTextBox from "../interfaces/svg_textbox";
import * as DefaultClassNames from "../common/default_class_names"
import * as SVG from "../interfaces/svg";
import * as CSS from "../html/css";
import * as VBAMacroModal from "./vba_macro_modal";
import { SVGToVBA } from "./svg_to_vba"
import { VBAObjectType } from "./vba_object"

import * as GUIObserver from "../html/gui_observer"
import { GTable } from "../objects/g_table";
import { GGraph } from "../objects/g_graph";


//export namespace Console {
export class ConsoleLineElement {
    public canvas: SVGSVGElement | null = null;
    public vbaObjects: VBAObjectType[] = new Array();
    public mainObject: GTable | GGraph | null = null;
    public fieldSetElement: HTMLFieldSetElement;
    private legendElement: HTMLLegendElement;
    private canvasContainer: HTMLDivElement;
    //pngButton : HTMLButtonElement;
    private removeButton: HTMLButtonElement;
    private macroButton: HTMLButtonElement;
    private csvButton: HTMLButtonElement;


    constructor(parent: HTMLElement, type: "table" | "graph" | "log" | "textarea", title: string = "", option: { mainElement?: HTMLElement | GTable | GGraph } = {}) {
        this.canvasContainer = document.createElement("div");
        parent.appendChild(this.canvasContainer);

        this.fieldSetElement = document.createElement("fieldset");
        this.canvasContainer.appendChild(this.fieldSetElement);
        this.legendElement = document.createElement("legend");
        this.fieldSetElement.appendChild(this.legendElement);
        this.title = title;

        const createCanvas = type == "table" || type == "graph" || type == "log";
        const createVBAButton = type == "table" || type == "graph" || type == "log"

        if (createCanvas) {
            this.canvas = ConsoleLineElement.addSVGSVGElement(this.fieldSetElement);
            GUIObserver.observeSVGSVG(this.canvas);
        }
        if (option.mainElement !== undefined) {
            if (option.mainElement instanceof HTMLElement) {
                this.fieldSetElement.appendChild(option.mainElement);
            }
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
        this.fieldSetElement.appendChild(this.removeButton);
        const removeFunc = () => {
            this.fieldSetElement.remove();
        }
        this.removeButton.onclick = removeFunc;

        this.macroButton = document.createElement("button");
        this.macroButton.textContent = "VBA";
        if (createVBAButton) {
            this.fieldSetElement.appendChild(this.macroButton);
        }
        const vbaFunc = () => {
            VBAMacroModal.createMacroModal(SVGToVBA.create(this.vbaObjects));
        }
        this.macroButton.onclick = vbaFunc;




        const createCSVButton = type == "table";
        this.csvButton = document.createElement("button");
        this.csvButton.textContent = "csv";
        if (createCSVButton) {
            this.fieldSetElement.appendChild(this.csvButton);
        }
        const csvFunc = () => {
            if (this.mainObject instanceof GTable) {
                const str = this.mainObject.rows.map((v) => {
                    return v.cells.map((w) => w.svgText.textContent).join(",")
                }).join("\n");
                textarea(str, this.title);
            }
        }
        this.csvButton.onclick = csvFunc;



    }
    public get title(): string {
        return this.legendElement.textContent!;
    }
    public set title(value: string) {
        this.legendElement.textContent = value;
        this.legendElement.style.fontWeight = "bold"
    }

    public addVBAObject(obj: VBAObjectType) {
        this.vbaObjects.push(obj);
        if (obj instanceof GTable || obj instanceof GGraph) {
            this.mainObject = obj;
        }
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
export function table(item: any, title: string = "") {
    if (item instanceof LogicTable) {
        const code = getOrCreateCodeElement();
        const consoleLine = new ConsoleLineElement(code, "table", title);

        //const svg = addSVGSVGElement(code);
        const gtable = createShape(consoleLine.canvas!, "g-table");

        gtable.constructFromLogicTable(item);
        gtable.x = 0;
        gtable.y = 0;
        consoleLine.addVBAObject(gtable);
        //consoleLine.addVBAObject(gtable);
        //consoleLine.title = title;

    } else {

        const tableDic = new TableDictionary();
        tableDic.construct(item);
        const logicTable = tableDic.toLogicTable();
        table(logicTable, title);
    }


}
export function clear() {
    const code = getOrCreateCodeElement();
    code.innerHTML = "";
}

export function graph(item: any | LogicTree | LogicGraph, title: string = "", canvasID: string | null = null) : [GGraph, ConsoleLineElement | null] {

    if (item instanceof LogicTree || item instanceof LogicGraph) {
        if (canvasID != null) {
            const ggraph = createShape(canvasID, "g-graph");
            ggraph.build(item);
            return [ggraph, null];
        } else {
            const code = getOrCreateCodeElement();
            const consoleLine = new ConsoleLineElement(code, "graph", title);
            //const svg = addSVGSVGElement(code);
            const ggraph = createShape(consoleLine.canvas!, "g-graph");
            ggraph.build(item);
            consoleLine.addVBAObject(ggraph);
            return [ggraph, consoleLine];
        }
        
        /*
        if(item instanceof LogicGraph){
        }else{
            ggraph.constructFromLogicTree(item);
        }
        */
    } else {
        const tableDic = new TableDictionary();
        tableDic.construct(item);
        const logicGraph = tableDic.toLogicGraph();
        return graph(logicGraph, title, canvasID);
        //console.log(logicGraph);    
    }
}
export function log(message: string, title: string = ""): ConsoleLineElement {
    const code = getOrCreateCodeElement();
    const consoleLine = new ConsoleLineElement(code, "log", title);

    const textClass = DefaultClassNames.defaultTextClass;
    const textElement = SVG.createText(textClass)
    //const text = document.createElementNS('http://www.w3.org/2000/svg', "text");

    //text.textContent = message;
    consoleLine.canvas!.appendChild(textElement);

    SVGTextBox.setTextToSVGText(textElement, message, false);
    textElement.setAttribute("x", "0");
    const b2 = SVGTextBox.getSize(textElement, true);
    textElement.setAttribute("y", b2.height.toString());

    consoleLine.addVBAObject(textElement);

    //table(message);
    return consoleLine;
}
function getRowCount(line: string, cols: number) {
    return Math.ceil(line.length / cols);
}
export function textarea(message: string, title: string = "", option?: { cols?: number, rows?: number }): ConsoleLineElement {
    const code = getOrCreateCodeElement();
    const textArea = document.createElement("textarea");
    textArea.textContent = message;

    const lines = message.split("\n");
    let maxCols = 0;
    lines.forEach((v) => {
        if (v.length > maxCols) {
            maxCols = v.length;
        }
    })
    const defaultCols = maxCols < 240 ? maxCols + 5 : 245;

    const newOption = option === undefined ? {} : option;
    textArea.cols = newOption.cols === undefined ? defaultCols : newOption.cols;

    let rowCount = 0;
    lines.forEach((v) => rowCount += getRowCount(v, textArea.cols));


    textArea.rows = newOption.rows === undefined ? rowCount : newOption.rows;
    const consoleLine = new ConsoleLineElement(code, "textarea", title, { mainElement: textArea });
    consoleLine.title = title;


    //const canvasContainer = document.createElement("div");
    //code.appendChild(canvasContainer);                

    //consoleLine.canvasContainer.appendChild(textArea);
    return consoleLine;

}
export function view(item: LogicTable | LogicTree | LogicGraph) {
    if (item instanceof LogicTable) {
        table(item);
    } else if (item instanceof LogicTree) {
        graph(item);
    } else {
        graph(item);
    }
}
    //}
