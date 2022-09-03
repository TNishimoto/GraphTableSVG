import {defaultCellClass} from "../common/attribute_names"

//import { Cell } from "../object/table_helpers/cell"
import * as GOptions from "../objects/g_options"
import { CellReteral, setSVGReteral } from "./gobject_reterals";

import { LogicText } from "./logic_text";


/**
 * 表のセルを表す論理クラス
 */
export class LogicCell {

    public text: LogicText = new LogicText();
    public groupOption : GOptions.CellAttributes = { class : defaultCellClass}
    public backgroundOption: GOptions.backgroundOption = {};
    public topBorderOption: GOptions.BorderAttributes = {};
    public leftBorderOption: GOptions.BorderAttributes = {};
    public rightBorderOption: GOptions.BorderAttributes = {};
    public bottomBorderOption: GOptions.BorderAttributes = {};

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

    public toReteral() : CellReteral {
        const p : CellReteral = <any>new Object();
        setSVGReteral(p, "cell", undefined, this.groupOption.class, this.groupOption.style);
        if(this.connectedRowCount > 1){
            p.h = this.connectedRowCount;
        }
        if(this.connectedColumnCount > 1){
            p.w = this.connectedColumnCount
        }
        return p;
    }
}