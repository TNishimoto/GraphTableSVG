import {defaultCellClass} from "../common/attribute_names"

//import { Cell } from "../object/table_helpers/cell"
import * as GOptions from "../objects/g_options"
import { SurfaceOptionReteral, BorderOptionReteral, CellOptionReteral, CellReteral, setSVGReteral } from "./gobject_reterals";

import { LogicText } from "./logic_text";


/**
 * 表のセルを表す論理クラス
 */
export class LogicCell {

    public text: LogicText = new LogicText();
    public option : CellOptionReteral;
    public get backgroundOption() : SurfaceOptionReteral{
        return this.option.surfaceOption;
    }
    public get topBorderOption() : BorderOptionReteral{
        return this.option.topBorderOption;
    }
    public get leftBorderOption() : BorderOptionReteral{
        return this.option.leftBorderOption;
    }
    public get rightBorderOption() : BorderOptionReteral{
        return this.option.rightBorderOption;
    }
    public get bottomBorderOption() : BorderOptionReteral{
        return this.option.bottomBorderOption;
    }

    public get connectedColumnCount() : number{
        if(this.option.w == undefined){
            return 1;
        }else{
            return this.option.w;
        }
    }
    public get connectedRowCount() : number{
        if(this.option.h == undefined){
            return 1;
        }else{
            return this.option.h;
        }
    }

    /*
    public groupOption : GOptions.CellAttributes = { class : defaultCellClass}
    public backgroundOption: GOptions.backgroundOption = {};
    public topBorderOption: GOptions.BorderAttributes = {};
    public leftBorderOption: GOptions.BorderAttributes = {};
    public rightBorderOption: GOptions.BorderAttributes = {};
    public bottomBorderOption: GOptions.BorderAttributes = {};
    public connectedColumnCount: number = 1;
    public connectedRowCount: number = 1;
    */
    public tTexts: HTMLElement[] | null = null;
    

    public item: any;

    //public isLatexMode: boolean = false;
    constructor() {
        this.option = <any> new Object();
        this.option.topBorderOption = <any>new Object();
        this.option.leftBorderOption = <any>new Object();
        this.option.rightBorderOption = <any>new Object();
        this.option.bottomBorderOption = <any>new Object();
        this.option.surfaceOption = <any>new Object();
        this.option.textOption = <any>new Object();
        //this.option.w = 1;
        //this.option.h = 1;

    }
    public buildFromObject(obj : any){
        this.text.buildFromObject(obj["text"]);

        //this.cellStyle = obj["cellStyle"];
        /*
        this.groupOption = obj["groupOption"];
        this.backgroundOption = obj["backgroundOption"];
        this.topBorderOption = obj["topBorderOption"];
        this.leftBorderOption = obj["leftBorderOption"];
        this.rightBorderOption = obj["rightBorderOption"];
        this.bottomBorderOption = obj["bottomBorderOption"];
        this.connectedColumnCount = obj["connectedColumnCount"];
        this.connectedRowCount = obj["connectedRowCount"];
        */

    }
    
    public copy(cell : LogicCell){
        this.text = cell.text;
        /*
        this.groupOption = {...cell.groupOption}
        this.backgroundOption = {...cell.backgroundOption};
        this.topBorderOption = {...cell.topBorderOption};
        this.leftBorderOption = {...cell.leftBorderOption};
        this.rightBorderOption = {...cell.rightBorderOption};
        this.bottomBorderOption = {...cell.bottomBorderOption};
        */
        /*
        if(cell.topBorderClass !== undefined)this.topBorderClass = cell.topBorderClass;
        if(cell.leftBorderClass !== undefined)this.leftBorderClass = cell.topBorderClass;
        if(cell.rightBorderClass !== undefined)this.rightBorderClass = cell.rightBorderClass;
        if(cell.bottomBorderClass !== undefined){
            this.bottomBorderClass = cell.bottomBorderClass;
        }
        */
       /*
        this.connectedRowCount = cell.connectedRowCount;
        this.connectedColumnCount = cell.connectedColumnCount;        
        */
        this.item = cell.item;
    }

    public toReteral() : CellReteral {
        const p : CellReteral = <any>{...this.option};

        p.tag = "cell";
        const child = this.text.toReteral();
        p.children = new Array();
        p.children.push(child);
        return p;
    }
}