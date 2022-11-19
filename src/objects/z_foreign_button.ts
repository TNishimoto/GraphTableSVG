import { ZForeignObject } from "./z_foreign_object"
import { ShapeObjectType, msoDashStyle, HorizontalAnchor, VerticalAnchor } from "../common/enums";
import * as GOptions from "./z_options"

import * as CSS from "../html/css"
import * as StyleNames from "../common/style_names"
import * as SVGTextBox from "../interfaces/svg_textbox"
import * as ElementExtension from "../interfaces/element_extension"
import * as SVGTextExtension from "../interfaces/svg_text_extension"
import { HTMLFunctions } from "../html";


export class ZForeignButton extends ZForeignObject {
    private _button: HTMLButtonElement;
    //private static updateTextAttributes = ["style"]

    public constructor(svgbox: SVGElement | string) {
        super(svgbox)
        //console.log(option);
        this._button = document.createElement("button");
        /*
        if(option != null){
            if(option.text != undefined){
                if(typeof option.text == "string"){
                    this._button.textContent = option.text;
                }else{
                    let s = "";
                    option.text.forEach((v) => s += v.textContent);
                    this._button.textContent = s;
                }
            }
        }
        */

        this.foreignObject.appendChild(this._button);


        if (this.type == ShapeObjectType.Object) this.firstFunctionAfterInitialized();
    }
    public get type(): ShapeObjectType {
        return ShapeObjectType.ForeignButton;
    }

    public initializeSetBasicOption(source : SVGElement) {
        super.initializeSetBasicOption(source);

        if (source.children.length > 0) {
            let s = "";
            const tNodes = HTMLFunctions.getTNodes(source);
            if (tNodes != null) {
                tNodes.forEach((v) => v.remove())
                tNodes.forEach((v) =>{
                    s += v.textContent;
                })
                this._button.textContent = s;

            }
        } else if (source.innerHTML.length > 0) {
            this._button.textContent = source.textContent;
            source.innerHTML = "";
        }


    }
    /*
    protected setBasicOption(option: GOptions.ZTextBoxAttributes) {
        super.setBasicOption(option)
        const textClass = CSS.createCSSClass(option.textClass);
        const styleClass = CSS.createCSSClass(option.textStyle);
        //GOptions.setClassAndStyle(this._button, textClass, styleClass);
        

        if (typeof option.text == "string") {
            this._button.textContent = option.text
        } else if (Array.isArray(option.text)) {
            let s = "";
            option.text.forEach((v) => s += v.textContent);
            this._button.textContent = s;
        } else {

        }
    }
    */
    get width(): number {
        return this._button.getBoundingClientRect().width;
    }
    set width(value: number) {
        this._button.style.setProperty("width", `${value}px`);
    }

    /**
    頂点の高さを返します。
    */
    get height(): number {
        return this._button.getBoundingClientRect().height;
    }

    set height(value: number) {
        this._button.style.setProperty("height", `${value}px`);

    }
}