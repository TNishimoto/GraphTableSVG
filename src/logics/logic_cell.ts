import {defaultCellClass} from "../common/attribute_names"

//import { Cell } from "../object/table_helpers/cell"
import * as GOptions from "../objects/g_options"

import { LogicText } from "./logic_text";

/**
 * 表のセルを表す論理クラス
 */
export class LogicCell {

    public text: LogicText = new LogicText();
    //public textClass?: string | GOptions.textClassCSS;
    //public textStyle?: string | GOptions.textClassCSS;
    public groupOption : GOptions.CellAttributes = { class : defaultCellClass}
    //public cellClass?: string | GOptions.GTextBoxCSS = defaultCellClass;
    //public cellStyle?: string | GOptions.GTextBoxCSS;
    


    public backgroundOption: GOptions.backgroundOption = {};
    public topBorderOption: GOptions.BorderAttributes = {};
    public leftBorderOption: GOptions.BorderAttributes = {};
    public rightBorderOption: GOptions.BorderAttributes = {};
    public bottomBorderOption: GOptions.BorderAttributes = {};


    //public topBorderClass?: string | null;
    //public leftBorderClass?: string | null;
    //public rightBorderClass?: string | null;
    //public bottomBorderClass?: string | null;
    //public svgText: SVGTextElement | null = null;
    public connectedColumnCount: number = 1;
    public connectedRowCount: number = 1;
    public tTexts: HTMLElement[] | null = null;
    

    public item: any;

    //public isLatexMode: boolean = false;
    constructor() {
    }
    public buildFromObject(obj : any){
        this.text.buildFromObject(obj["text"]);
        
        this.groupOption = obj["groupOption"];
        //this.cellStyle = obj["cellStyle"];
        this.backgroundOption = obj["backgroundOption"];
        this.topBorderOption = obj["topBorderOption"];
        this.leftBorderOption = obj["leftBorderOption"];
        this.rightBorderOption = obj["rightBorderOption"];
        this.bottomBorderOption = obj["bottomBorderOption"];
        this.connectedColumnCount = obj["connectedColumnCount"];
        this.connectedRowCount = obj["connectedRowCount"];

    }
    
    public copy(cell : LogicCell){
        this.text = cell.text;
        this.groupOption = {...cell.groupOption}
        this.backgroundOption = {...cell.backgroundOption};
        this.topBorderOption = {...cell.topBorderOption};
        this.leftBorderOption = {...cell.leftBorderOption};
        this.rightBorderOption = {...cell.rightBorderOption};
        this.bottomBorderOption = {...cell.bottomBorderOption};
        /*
        if(cell.topBorderClass !== undefined)this.topBorderClass = cell.topBorderClass;
        if(cell.leftBorderClass !== undefined)this.leftBorderClass = cell.topBorderClass;
        if(cell.rightBorderClass !== undefined)this.rightBorderClass = cell.rightBorderClass;
        if(cell.bottomBorderClass !== undefined){
            this.bottomBorderClass = cell.bottomBorderClass;
        }
        */
        this.connectedRowCount = cell.connectedRowCount;
        this.connectedColumnCount = cell.connectedColumnCount;        
        this.item = cell.item;
    }
    /*
    public set(text: LogicText | undefined = undefined, isLatexMode: boolean = false, cellOption: GOptions.CellAttributes = { class : defaultCellClass}, backgroundOption: GOptions.backgroundOption = {},
        topBorderOption: GOptions.BorderAttributes = {}, leftBorderOption: GOptions.BorderAttributes = {}, rightBorderOption: GOptions.BorderAttributes = {}, bottomBorderOption: GOptions.BorderAttributes = {}) {
        if (text !== undefined) this.text = text;
        this.groupOption = Object.create(cellOption)
        this.backgroundOption = Object.create(backgroundOption);
        this.topBorderOption = Object.create(topBorderOption);
        this.leftBorderOption = Object.create(leftBorderOption);
        this.rightBorderOption = Object.create(rightBorderOption);
        this.bottomBorderOption = Object.create(bottomBorderOption);

    }
    */
    /*
    public createTextElement(svgText: SVGTextElement) {
        if (this.tTexts != null) {
            SVGTextBox.constructSVGTextByHTMLElements(svgText, this.tTexts, true);
        } else if (this.text instanceof LogicText) {
            this.text.setTextElement(svgText);
        }
    }
    */
    /*
    public set(text: string | null = null, isLatexMode: boolean = false, cellClass: string | null = null, backgroundClass: string | null = null, textClass: string | null = null
        , topBorderClass: string | null = null, leftBorderClass: string | null = null, rightBorderClass: string | null = null, bottomBorderClass: string | null = null) {
        if (text != null) this.text = text;
        if (cellClass != null) this.cellClass = cellClass;
        if (textClass != null) this.textClass = textClass;
        if (backgroundClass != null) this.backgroundClass = backgroundClass;
        if (topBorderClass != null) this.topBorderClass = topBorderClass;
        if (leftBorderClass != null) this.leftBorderClass = leftBorderClass;
        if (rightBorderClass != null) this.rightBorderClass = rightBorderClass;
        if (bottomBorderClass != null) this.bottomBorderClass = bottomBorderClass;
        this.isLatexMode = isLatexMode;
    }
    */
    /*
    public checkCell(): boolean {
        if (this.masterCell != null) {

        } else {

        }
    }
    */
}