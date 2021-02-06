//namespace GraphTableSVG {
//import { Padding, Rectangle } from "../common/vline";
import { SVGToVBA } from "./svg_to_vba"
import { GObject } from "../objects/g_object"
import { runInThisContext } from "vm";
import { getGObjects } from "./open_svg";
import { VBAObjectType } from "./vba_object";
import { getSVGSVG } from "../interfaces/svg";

//export namespace VBAMacroModal {
    export function processVBAButtonClickEvent(e : MouseEvent){
        const target = e.target;
        if(target instanceof SVGElement){
            const svgsvg = getSVGSVG(target);
            const types = SVGToVBA.collectVBAObjectTypes(svgsvg);
            const vbaCode = SVGToVBA.create(types);
            createMacroModal(vbaCode);
        }else{
            alert("Error!");
        }
    }

    export function appendVBAButton(svgsvg : SVGSVGElement) : void {
        const p = document.createElementNS('http://www.w3.org/2000/svg', "g-rect-button");
        p.textContent = "VBA";
        const rect = svgsvg.getBoundingClientRect();        
        p.setAttribute("x", (rect.width - 100).toString() );
        p.setAttribute("y", (rect.height - 50).toString());
        p.setAttribute("data-vba", "false");


        p.setAttribute("onclick", `GraphTableSVG.Options.processVBAButtonClickEvent(event)`);

        svgsvg.appendChild(p);

    }
    export function showMacroModal(id :string | GObject){
        if (id instanceof GObject) {
            const p = SVGToVBA.create(id);
            createMacroModal(p);
        }else{

        }
    }
    export function createMacroModalFromID(id : string) {
        const objects : VBAObjectType[] = getGObjects(id);

        const code = SVGToVBA.create(objects);
        return createMacroModal(code);
    }

    /**
     * マクロ用のモーダルを画面に生成します。
     * @param vbaCode モーダルに表示する貼り付けるVBAマクロ
     */
    export function createMacroModal(vbaCode: string | GObject) {
        if (vbaCode instanceof GObject) {
            const p = SVGToVBA.create(vbaCode);
            createMacroModal(p);
        } else {
            const mainDiv = document.createElement("div");
            mainDiv.id = "macro-modal"
            mainDiv.innerHTML = `
使い方（Powerpoint 2013）<br>
    新規ファイル<br>
    →表示→マクロ→作成<br>
    →生成したコードをユーザーフォームに貼り付ける<br>
    →F5 or ユーザーフォームを実行<br>
    →木が貼られたスライドが１ページ目に挿入される<br>
    ※サイズの大きすぎるSVGはマクロ実行時にエラーが出ます。
    <br>
    <textarea id="codeBox" rows="8" cols="100" style="overflow:auto;"></textarea>
`;
            const button = document.createElement("button");
            button.setAttribute("class", "btn");
            button.textContent = "クリップボードにコピー";
            button.onclick = () =>{
                copyAndCloseMacroModal();
            }
            mainDiv.appendChild(button);

            mainDiv.style.position = "fixed";
            mainDiv.style.zIndex = "16";
            mainDiv.style.width = "900px";
            mainDiv.style.height = "400px";
            mainDiv.style.left = `${((window.outerWidth - parseInt(mainDiv.style.width)) / 2)}px`;
            //mainDiv.style.top = `${((window.outerHeight - parseInt(mainDiv.style.height)) / 2)}px`;
            mainDiv.style.top = `${((window.outerHeight - parseInt(mainDiv.style.height)) / 16)}px`;


            mainDiv.style.display = "inline";
            mainDiv.style.backgroundColor = "#ffffff";
            document.body.appendChild(mainDiv);


            const cnt = <HTMLInputElement>document.getElementById("codeBox");
            cnt.value = vbaCode;

            const bgDiv = document.createElement("div");
            document.body.appendChild(bgDiv);
            bgDiv.style.width = "100%";
            bgDiv.style.height = "100%";
            bgDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
            bgDiv.style.position = "fixed";
            bgDiv.style.top = "0";
            bgDiv.style.left = "0";

            bgDiv.id = "modal-bg";
            bgDiv.style.zIndex = "5";
            bgDiv.style.display = "inline";
            bgDiv.onclick = removeMacroModal;
            //$("body").append('<div id="modal-bg" style="z-index:5"></div>');

        }
    }
    /**
     * マクロ用モーダルを取り除きます。
     */
    export function removeMacroModal() {

        const div1 = document.getElementById("macro-modal");

        const div2 = document.getElementById("modal-bg");
        if (div1 != null) document.body.removeChild(div1);
        if (div2 != null) document.body.removeChild(div2);

    }
    /**
     * マクロ用モーダルのテキストをクリップボードにコピーしてマクロ用モーダルを取り除きます。
     */
    export function copyAndCloseMacroModal() {
        const cnt = <HTMLInputElement>document.getElementById("codeBox");
        cnt.select();
        window.document.execCommand('copy');
        alert('クリップボードにコピーしました。');
        removeMacroModal();
    }
//}