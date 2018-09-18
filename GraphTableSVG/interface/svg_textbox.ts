namespace GraphTableSVG {
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
        export function sortText(svgText: SVGTextElement, rect: GraphTableSVG.Rectangle | null, vAnchor: GraphTableSVG.VerticalAnchor, hAnchor: GraphTableSVG.HorizontalAnchor) {
            const lineSpans = getLines(svgText);
            const fontSize = svgText.getPropertyStyleValueWithDefault("font-size", "24");
            const fs = parseInt(fontSize);

            let dx = 0;
            let dy = fs;
            for (let y = 0; y < lineSpans.length; y++) {
                let width = 0;
                for (let x = 0; x < lineSpans[y].length; x++) {
                    const v = lineSpans[y][x];
                    const tLen = v.getComputedTextLength();
                    if (x == 0) v.setAttribute("dx", dx.toString());
                    if (x == 0 && y != 0) v.setAttribute("dy", dy.toString());
                    width += tLen;
                }
                dx -= width;
                //dy += fs;
            }

            if (hAnchor == GraphTableSVG.HorizontalAnchor.Center) {
                let maxWidth = 0;
                const widths = lineSpans.map((v) => {
                    let width = 0;
                    v.forEach((w) => {
                        width += w.getComputedTextLength();
                    })
                    return width;
                })
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
                            const tLen = v.getComputedTextLength();
                            if (x == 0 && y != 0) {
                                v.setAttribute("dx", (dx + offset).toString());
                            }
                            width += tLen;
                        }
                        dx = -width;
                    }
                }

            } else if (hAnchor == GraphTableSVG.HorizontalAnchor.Right) {

            }
        }
        export function setTextToSVGText2(svgText: SVGTextElement, text: HTMLElement[], isLatexMode: boolean) {
            svgText.textContent = "";
            const fontSize = svgText.getPropertyStyleValueWithDefault("font-size", "24");
            const fs = parseInt(fontSize);
            let dx = 0;

            const spans = text.map((v, i) => {

                const tspan: SVGTSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.innerHTML = v.innerHTML;
                //const span = createSingleTextSpan(v.textContent!, null);
                copy(v, tspan);
                return tspan;
            })
            let dy = 0;

            spans.forEach((v, i) => {
                svgText.appendChild(v);
            })
            /*
            spans.forEach((v,i)=>{                
                v.setAttribute("dx", dx.toString());
                v.setAttribute("dy", dy.toString());

                const rect = v.getBoundingClientRect();
                if(v.hasAttribute("newline")){
                    dy += fs;                    
                    dx -= rect.width;
                }else{
                }

            })
            */
        }
        let ura : SVGSVGElement | null = null;
        export function getSize(svgText:SVGTextElement) : Rectangle {
            let r = new Rectangle();
            if(HTMLFunctions.isShow(svgText)){
                const rect = svgText.getBBox();
                r.x = rect.x;
                r.y = rect.y;
                r.width = rect.width;
                r.height = rect.height;
                return r;
            }else{
                if(ura == null){
                    ura = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                } 
                document.body.appendChild(ura);
                ura.innerHTML = svgText.outerHTML;
                const fst = ura.firstChild;
                //const pos = svgText.nextSibling;
                //const parent = svgText.parentElement;
                if(fst instanceof SVGTextElement){
                    /*
                    const x = svgText.getX();
                    const y = svgText.getY();
                    fst.setAttribute("x", x.toString());
                    fst.setAttribute("y", y.toString());
                    */

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
            }
        }

    }
}