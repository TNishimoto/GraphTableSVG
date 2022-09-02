import { textClassCSS } from "../objects/g_options";
import * as CSS from "../html/css";
import * as SVGTextExtension from "../interfaces/svg_text_extension"


export type TextDecorationType = "none" | "underline" | "overline" | "line-through" | "blink";

export class LogicTSpan{
    public textContent : string = "";
    public class? : string | textClassCSS
    public style? : string | textClassCSS
    public isLatexMode : boolean = false;
    public textDecoration : TextDecorationType | null = null;

    public createTSpan() : SVGTSpanElement {

        const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.textContent = this.textContent;
        CSS.setCSSClass(tspan, this.class);
        CSS.setCSSStyle(tspan, this.style);
        if(this.textDecoration != null){
            tspan.setAttribute("text-decoration", this.textDecoration)
        }

        return tspan;
    }
    public parse(obj : any) : void{
        this.textContent =  obj["textContent"];
        this.class = obj["class"];
        this.style = obj["style"];
        this.isLatexMode = obj["isLatexMode"];
        this.textDecoration = obj["textDecoration"];
    }
}

/**
 * 描画されるテキストを表すクラス
 */
export class LogicText{
    public textContent : string | LogicTSpan[] = "";
    public class? : string | textClassCSS
    public style? : string | textClassCSS
    public isLatexMode : boolean = false;
    public textDecoration : TextDecorationType | null = null;

    constructor(_text : string | LogicTSpan[] | null = null, _class? : string | textClassCSS, _style? : string | textClassCSS ){
        if(_text == null){
            this.textContent = "";
        }else{
            this.textContent = _text;
        }
        this.class = _class;
        this.style = _style;
    }

    public setTextElement(svgText: SVGTextElement) {
        CSS.setCSSClass(svgText, this.class);
        CSS.setCSSStyle(svgText, this.style);

        if(typeof this.textContent == "string"){
            SVGTextExtension.setTextContent(svgText,this.textContent, this.isLatexMode);
        }else{
            svgText.textContent = "";
            this.textContent.map((v) => v.createTSpan()).forEach((v)=>{
                svgText.appendChild(v);
            })
        }
        console.log(`X: ${this.textDecoration}`)

        if(this.textDecoration != null){
            svgText.setAttribute("text-decoration", this.textDecoration)
        }
        
    }
    public buildFromObject(obj:any) : void{
        if(Array.isArray(obj["textContent"])){
            const arr : any[] = obj["textContent"];
            this.textContent = new Array(arr.length);
            for(let i=0;i<arr.length;i++){
                this.textContent[i] = new LogicTSpan();
                this.textContent[i].parse(arr[i]);
            }
        }else{
            this.textContent = obj["textContent"];
        }
        this.class = obj["class"];
        this.style = obj["style"];
        this.isLatexMode = obj["isLatexMode"];
        this.textDecoration = obj["textDecoration"];

    }
}