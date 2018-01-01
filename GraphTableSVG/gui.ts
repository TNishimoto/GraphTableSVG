module GUI {
    export function createMacroModal(text: string) {

        var mainDiv = document.createElement("div");
        mainDiv.id = "macro-modal"
        mainDiv.innerHTML = `
    使い方（Powerpoint 2013）<br>
        新規ファイル<br>
        →表示→マクロ→作成<br>
        →生成したコードをユーザーフォームに貼り付ける<br>
        →F5 or ユーザーフォームを実行<br>
        →木が貼られたスライドが１ページ目に挿入される<br>
        ※サイズの大きすぎる木はマクロ実行時にエラーが出ます。
        <br>
        <textarea id="codeBox" rows="8" cols="100" style="overflow:auto;"></textarea>
        <button class="btn" onClick="GUI.copyAndCloseMacroModal();">
            クリップボードにコピー
        </button>
    `;

        mainDiv.style.position = "fixed";
        mainDiv.style.zIndex = "16";
        mainDiv.style.width = "900px";
        mainDiv.style.height = "400px";
        mainDiv.style.left = `${((window.outerWidth - parseInt(mainDiv.style.width)) / 2)}px`;
        mainDiv.style.top = `${((window.outerHeight - parseInt(mainDiv.style.height)) / 2)}px`;
        mainDiv.style.display = "inline";
        mainDiv.style.backgroundColor = "#ffffff";
        document.body.appendChild(mainDiv);


        var cnt = <HTMLInputElement>document.getElementById("codeBox");
        cnt.value = text;

        var bgDiv = document.createElement("div");
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
    export function removeMacroModal() {

        var div1 = document.getElementById("macro-modal");

        var div2 = document.getElementById("modal-bg");
        if (div1 != null) document.body.removeChild(div1);
        if (div2 != null) document.body.removeChild(div2);

    }
    export function copyAndCloseMacroModal() {
        var cnt = <HTMLInputElement>document.getElementById("codeBox");
        cnt.select();
        window.document.execCommand('copy');
        alert('クリップボードにコピーしました。');
        removeMacroModal();
    }
    export function setSVGBoxSize(box: HTMLElement, w: number, h: number): void;
    export function setSVGBoxSize(box: HTMLElement, rect: GraphTableSVG.Rectangle, padding: GraphTableSVG.Padding): void;
    export function setSVGBoxSize(box: HTMLElement, item1: GraphTableSVG.Rectangle | number, item2: GraphTableSVG.Padding | number) {
        if (item1 instanceof GraphTableSVG.Rectangle) {
            if (item2 instanceof GraphTableSVG.Padding) {
                var w: number = item1.right + item2.left + item2.right;
                var h: number = item1.bottom + item2.top + item2.bottom;
                setSVGBoxSize(box, w, h);
            } else {
                throw new Error();
            }
        } else {
            if (item2 instanceof GraphTableSVG.Padding) {
                throw new Error();
            } else {
                var width = `${item1}px`;
                var height = `${item2}px`;

                if (box.style.width != width || box.style.height != height) {
                    box.style.width = width;
                    box.style.height = height;
                    box.setAttribute(`viewBox`, `0 0 ${item1} ${item2}`);
                }
            }
        }
        
    }
}