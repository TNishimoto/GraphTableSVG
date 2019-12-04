
import { Size, Rectangle } from "../common/vline";
import { CommonFunctions } from "../common/common_functions";
import { HTMLFunctions } from "./html_functions";
import { HorizontalAnchor, VerticalAnchor} from "../common/enums";
import {} from "./svg_text"
import "./svg_interface";

export namespace SVGTextBox {


        /**
         * 入力テキストをLatex表記でパースした結果をSVGTSpanElement配列で返します。
         * @param text Latex表記のテキスト
         * @param className 生成したSVGTSpanElementのクラス属性名
         * @param fontsize 生成したSVGTSpanElementのフォントサイズ
         * @param dxOfFirstElement 生成した最初のSVGTSpanElementのdx
         * @param dyOfFirstElement 生成した最初のSVGTSpanElementのdy
         * @returns 入力テキストをLatex表記でパースした結果をSVGTSpanElement配列
         */
        function createTextSpans(text: string, className: string | null = null,
            fontsize: number = 12, dxOfFirstElement: number | null = null, dyOfFirstElement: number | null = null): SVGTSpanElement[] {
            let r: SVGTSpanElement[] = [];
            text += "_";
            //const p: SVGTextElement = this;
            //p.textContent = "";
            //const h = parseInt(p.getPropertyStyleValueWithDefault("font-size", "12"));
            let isFst = true;
            let mode = "";
            let tmp = "";
            const char_dy = (1 * fontsize) / 3;
            let lastMode: string = "none";
            const smallFontSize = (2 * fontsize) / 3;
            for (let i = 0; i < text.length; i++) {
                const c = text[i];
                if (c == "_" || c == "{" || c == "^" || c == "}") {
                    mode += c;
                    if (mode == "_{}") {
                        const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        tspan.textContent = tmp;
                        tspan.setAttribute("dy", `${char_dy}`);
                        tspan.setAttribute("data-script", "subscript");
                        tspan.style.fontSize = `${smallFontSize}pt`;
                        r.push(tspan)
                        lastMode = "down";
                        mode = "";
                        tmp = "";
                    } else if (mode == "^{}") {
                        const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        tspan.textContent = tmp;
                        tspan.setAttribute("dy", `-${char_dy}`);
                        tspan.style.fontSize = `${smallFontSize}pt`;
                        tspan.setAttribute("data-script", "superscript");
                        r.push(tspan)
                        lastMode = "up";
                        mode = "";
                        tmp = "";
                    } else if (mode == "_" || mode == "^") {
                        const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        tspan.textContent = tmp;
                        const normaldy = lastMode == "up" ? char_dy : lastMode == "down" ? -char_dy : 0;
                        if (isFst) {
                            if (dxOfFirstElement != null) tspan.setAttribute("dx", `${dxOfFirstElement}`);
                            if (dyOfFirstElement != null) tspan.setAttribute("dy", `${dyOfFirstElement}`);

                        } else {
                            tspan.setAttribute("dy", `${normaldy}`);
                        }
                        r.push(tspan)
                        lastMode = "none";
                        tmp = "";
                        isFst = false;
                    }
                }
                else {
                    tmp += c;
                }
            }
            return r;
        }
        /**
         * SVGTextElementにテキストをセットします。
         * @param svgText テキストをセットされるSVG要素
         * @param text SVG要素に適用するテキスト
         * @param isLatexMode Latex表記を使用するかどうか 
         */
        export function setTextToSVGText(svgText: SVGTextElement, text: string, isLatexMode: boolean) {
            svgText.textContent = "";
            const fontSize = svgText.getPropertyStyleValueWithDefault("font-size", "12");
            const fs = parseInt(fontSize);
            let dx = 0;

            text.split("\n").forEach((lineText) => {
                let dy = fs;
                let width = 0;
                if (isLatexMode) {
                    createTextSpans(lineText, null, fs, dx, dy).forEach((v) => {
                        svgText.appendChild(v)
                        const tLen = v.getComputedTextLength();
                        
                        dx = 0;
                        dy = 0;
                        width += tLen;
                    });

                    dy += fs;
                } else {
                    svgText.appendChild(createSingleTextSpan(lineText, null));
                }
                dx = -width;
            }
            );


        }
        /**
 * SVGTextPathElementにテキストをセットします。
 * @param path テキストをセットされるパス
 * @param text パスに適用するテキスト
 * @param isLatexMode Latex表記を使用するかどうか 
 */
        export function setTextToTextPath(path: SVGTextPathElement, text: string, isLatexMode: boolean) {
            path.textContent = "";
            const fontSize = path.getPropertyStyleValueWithDefault("font-size", "12");
            if (isLatexMode) {
                createTextSpans(text, null, parseInt(fontSize)).forEach((v) => path.appendChild(v));
            } else {
                path.appendChild(createSingleTextSpan(text, null));
            }
        }

        /**
         * 入力テキストからSVGTSpanElementを生成します。
         * @param text SVGTSpanElementのテキスト
         * @param className SVGTSpanElementのクラス属性名
         * @returns 生成されるSVGTSpanElement
         */
        function createSingleTextSpan(text: string, className: string | null = null): SVGTSpanElement {
            const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.textContent = text;

            if (className != null) {
                tspan.setAttribute("class", className)
            }
            return tspan;
        }

        function copy(e: HTMLElement, target: SVGTSpanElement) {
            for (let i = 0; i < e.attributes.length; i++) {
                const attr = e.attributes.item(i);
                if (attr != null) {
                    const name = attr.name;
                    const value = attr.value;
                    target.setAttribute(name, value);
                }
            }
        }
        function getLines(svgText: SVGTextElement): SVGTSpanElement[][] {
            const spans = <SVGTSpanElement[]>HTMLFunctions.getChildren(svgText).filter((v) => v.nodeName == "tspan");
            let r: SVGTSpanElement[][] = [];
            if (spans.length == 0) {
                return [];
            } else {
                r.push([]);
                let y = 0;
                spans.forEach((v, i) => {
                    if (v.getAttribute("newline") == "true") {
                        r.push([v]);
                        y++;
                    } else {
                        r[y].push(v);
                    }
                })
                return r;
            }
        }
        function alignTextByHorizontalAnchor(svgText: SVGTextElement, hAnchor: HorizontalAnchor){

            const lineSpans = getLines(svgText);
            let dx = 0;

            if (hAnchor == HorizontalAnchor.Center) {
                const tl = getComputedTextLengthsOfTSpans(svgText, true);
                let p=0;
                let maxWidth = 0;
                const widths = lineSpans.map((v) => {
                    let width = 0;
                    v.forEach((w) => {
                        width += tl[p++].width;
                    })
                    return width;
                })
                p=0;
                widths.forEach((v) => {
                    if (v > maxWidth) maxWidth = v;
                })
                dx = 0;
                if (widths.length > 0) {
                    for (let y = 0; y < lineSpans.length; y++) {
                        const offset = (maxWidth - widths[y]) / 2;
                        let width = offset;
                        for (let x = 0; x < lineSpans[y].length; x++) {
                            const v = lineSpans[y][x];
                            //const tLen = v.getComputedTextLength();
                            const tLen = tl[p++].width;
                            
                            if (x == 0 && y != 0) {
                                v.setAttribute("dx", (dx + offset).toString());
                            }
                            width += tLen;
                        }
                        dx = -width;
                    }
                }

            } else if (hAnchor == HorizontalAnchor.Right) {

            }
        }
        function alignTextAsText(svgText: SVGTextElement, showChecked : boolean){
            const lineSpans = getLines(svgText);
            const fontSize = (svgText).getPropertyStyleValueWithDefault("font-size", "24");
            const fs = parseInt(fontSize);

            let dx = 0;
            let dy = fs;
            let c = 0;
            const lengths = getComputedTextLengthsOfTSpans(svgText, showChecked);
            for (let y = 0; y < lineSpans.length; y++) {
                let width = 0;
                let heightMax = fs;
                let fstObj : SVGTSpanElement | null = null;
                for (let x = 0; x < lineSpans[y].length; x++) {
                    const v = lineSpans[y][x];
                    //const tLen = v.getComputedTextLength();
                    const size = lengths[c++];
                    if(size.height > heightMax) heightMax = size.height;

                    if (x == 0) v.setAttribute("dx", dx.toString());
                    if(x == 0) fstObj = v;
                    width += size.width;
                }
                if (y != 0 && fstObj != null) fstObj.setAttribute("dy", heightMax.toString());

                dx -= width;
                //dy += fs;
            }
        }

        /**
         * SVGTextElement
         * @param svgText 
         * @param hAnchor 
         */
        export function sortText(svgText: SVGTextElement, hAnchor: HorizontalAnchor, showChecked : boolean) {
            alignTextAsText(svgText, showChecked);
            alignTextByHorizontalAnchor(svgText,hAnchor);            
        }
        export function constructSVGTextByHTMLElements(svgText: SVGTextElement, text: HTMLElement[], isLatexMode: boolean) {
            svgText.textContent = "";
            const spans = text.map((v, i) => {
                const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.innerHTML = v.innerHTML;
                copy(v, tspan);
                return tspan;
            })
            let dy = 0;

            spans.forEach((v, i) => {
                svgText.appendChild(v);
            })
        }
        let ura : SVGSVGElement | null = null;

        
        export function getSize(svgText:SVGTextElement, showChecked : boolean = false) : Rectangle {
            let r = new Rectangle();

            /*
            try{
                const rect = svgText.getBBox();
                r.x = rect.x;
                r.y = rect.y;
                r.width = rect.width;
                r.height = rect.height;
                return r;
            }catch(e){
                return new Rectangle();
            }
            */
           const b = showChecked ? true : HTMLFunctions.isShow(svgText);

            if(b){
                const rect = svgText.getBBox();
                r.x = rect.x;
                r.y = rect.y;
                r.width = rect.width;
                r.height = rect.height;
                return r;
            }else{
                return new Rectangle();
                /*
                if(ura == null){
                    ura = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                } 
                document.body.appendChild(ura);
                ura.innerHTML = svgText.outerHTML;
                const fst = ura.firstChild;
                if(fst instanceof SVGTextElement){

                    const rect = fst.getBBox();
                    r.x = rect.x;
                    r.y = rect.y;
                    r.width = rect.width;
                    r.height = rect.height;
    
                    ura.removeChild(fst);
                    ura.remove();
                    return r;
                }else if(fst != null){
                    ura.removeChild(fst);
                    ura.remove();
                    return r;
                }else{
                    ura.remove();
                    return r;
                }
                */
            }
            
        }
        
        export function getComputedTextLengthsOfTSpans(svgText:SVGTextElement, showChecked : boolean) : Size[] {
            const b = showChecked ? true : HTMLFunctions.isShow(svgText);

            if(b){
                const tspans = <SVGTSpanElement[]>HTMLFunctions.getChildren(svgText).filter((v)=>v.nodeName=="tspan");
                const r = tspans.map((v)=> {
                    const w = v.getComputedTextLength();
                    //const h = v.getBoundingClientRect().height;
                    const fontSize = v.getPropertyStyleValueWithDefault("font-size", "24");
                    const fs = CommonFunctions.toPX(fontSize);
                    return new Size(w, fs);
                })

                return r;
            }else{
                const tspans = <SVGTSpanElement[]>HTMLFunctions.getChildren(svgText).filter((v)=>v.nodeName=="tspan");
                const r = tspans.map((v)=> {
                    return new Size(0, 0);
                })
                return r;

                //return [];
                /*
                if(ura == null){
                    ura = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                } 
                document.body.appendChild(ura);
                ura.innerHTML = svgText.outerHTML;
                const fst = ura.firstChild;
                if(fst instanceof SVGTextElement){

                    const tspans = <SVGTSpanElement[]>HTMLFunctions.getChildren(fst).filter((v)=>v.nodeName=="tspan");
                    const r = tspans.map((v)=> {
                        const w = v.getComputedTextLength();
                    const fontSize = svgText.getPropertyStyleValueWithDefault("font-size", "24");
                    const fs = CommonFunctions.toPX(fontSize);
                        return new Size(w, fs);
                    })
                    ura.removeChild(fst);
                    ura.remove();
                    return r;
                }else if(fst != null){
                    ura.removeChild(fst);
                    ura.remove();
                    return [];
                }else{
                    ura.remove();
                    return [];
                }
                */
            }
        }
        /*
        export function getComputedTSpanLength(svgText:SVGTSpanElement) : number {
            if(HTMLFunctions.isShow(svgText)){
                return svgText.getComputedTextLength();
            }else{
                if(ura == null){
                    ura = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                } 
                document.body.appendChild(ura);
                ura.innerHTML = svgText.outerHTML;
                const fst = ura.firstChild;
                if(fst instanceof SVGTextElement){

                    const tspans = <SVGTSpanElement[]>HTMLFunctions.getChildren(fst).filter((v)=>v.nodeName=="tspan");
                    const r = tspans.map((v)=>v.getComputedTextLength());
                    ura.removeChild(fst);
                    ura.remove();
                    return r;
                }else if(fst != null){
                    ura.removeChild(fst);
                    ura.remove();
                    return [];
                }else{
                    ura.remove();
                    return [];
                }
            }
        }
        */

    }
