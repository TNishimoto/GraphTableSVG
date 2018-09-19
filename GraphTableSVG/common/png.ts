namespace GraphTableSVG {
    /**
     * SVGをPNGに変換するための名前空間です。
     * この名前空間のコードはhttps://st40.xyz/one-run/article/133/を使用しています。
     */
    export namespace PNG {

        /**
         * svg要素のCSSをStyle属性に書き込みます。
         * @param svg 
         */
        export function copyCSStoStyle(svg: HTMLElement){
            const widthAttr = svg.getAttribute("width");
            const heightAttr = svg.getAttribute("height");
            if(widthAttr != null){
                svg.style.width = widthAttr;
            }
            if(heightAttr != null){
                svg.style.height = heightAttr;
            }
            //svgBox.removeAttribute("width");
            //svgBox.removeAttribute("height");
            GraphTableSVG.SVG.setCSSToAllElementStyles(svg);
        }
        /**
         * HTMLImageElementからCanvasElementを作成します。
         * @param img 
         */
        export function createCanvasFromImage(img : HTMLImageElement) : HTMLCanvasElement {
            const canvas = document.createElement("canvas");
            if(img.style.width != null && img.style.height != null){
            canvas.setAttribute("width", img.style.width);
            canvas.setAttribute("height", img.style.height);
            }
            //canvas.style.height = img.style.height;    
            return canvas;
        }
        /**
         * HTMLImageElementの画像を保存するイベントを作成します。
         * @param img 
         * @param canvas 
         */
        export function setSaveEvent(img : HTMLImageElement, canvas : HTMLCanvasElement){
            img.onload = () => {                
                const ctx = canvas.getContext("2d");
                if (ctx == null) throw Error("Error");
                ctx.drawImage(img, 0, 0);
                saveCanvas("png", canvas);
            }
        }
        /**
         * SVG要素からPNG画像を生成して保存します。
         * @param id 
         */
        export function createPNGFromSVG(id: string) : HTMLCanvasElement {
            const userAgent = window.navigator.userAgent;
            if (userAgent.indexOf("Firefox") != -1) {
                alert(`Firefox is not supported!`);
                throw Error("not supported error");
            }
            const svgBox = document.getElementById(id);
            if (svgBox == null) throw Error("Error");
            const styleMap = GraphTableSVG.SVG.getAllElementStyleMap(svgBox);
            copyCSStoStyle(svgBox);

            const img = getImage(svgBox);
            const canvas = createCanvasFromImage(img);
            setSaveEvent(img,canvas);
            GraphTableSVG.SVG.setAllElementStyleMap(svgBox, styleMap);
            return canvas;
            //return canvas;
        }
        /**
         * svg要素をHTMLImageElementに変換します。
         * @param svgBox 
         */
        export function getImage(svgBox: HTMLElement): HTMLImageElement {
            const img: HTMLImageElement = document.createElement("img");
            if (window.btoa) {
                img.style.width = svgBox.style.width;
                img.style.height = svgBox.style.height;
                img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgBox.outerHTML)));

            } else {
                throw Error("Error");
            }

            return img;
        }
        /*
        function getCanvas(svgBox: HTMLElement): HTMLCanvasElement {
            var svg = "";
            svg = svgBox.outerHTML;
            var canvas = document.createElement("canvas");
            return canvas;
        }
        */
        /**
         * canvas上のイメージを保存します。
         * @param saveType 
         * @param canvas 
         */
        function saveCanvas(saveType: string, canvas: HTMLCanvasElement) {
            let imageType = "image/png";
            let fileName = "sample.png";
            if (saveType === "jpeg") {
                imageType = "image/jpeg";
                fileName = "sample.jpg";
            }
            //var canvas = document.getElementById("canvas");
            // base64エンコードされたデータを取得 「data:image/png;base64,iVBORw0k～」
            const base64 = canvas.toDataURL(imageType);
            // base64データをblobに変換
            const blob = base64toBlob(base64);
            // blobデータをa要素を使ってダウンロード
            saveBlob(blob, fileName);
        }
        /**
         * Base64データをBlobデータに変換します。
         * @param base64 
         */
        function base64toBlob(base64: string) {
            // カンマで分割して以下のようにデータを分ける
            // tmp[0] : データ形式（data:image/png;base64）
            // tmp[1] : base64データ（iVBORw0k～）
            const tmp = base64.split(',');
            // base64データの文字列をデコード
            const data = atob(tmp[1]);
            // tmp[0]の文字列（data:image/png;base64）からコンテンツタイプ（image/png）部分を取得
            const mime = tmp[0].split(':')[1].split(';')[0];
            //  1文字ごとにUTF-16コードを表す 0から65535 の整数を取得
            const buf = new Uint8Array(data.length);
            for (var i = 0; i < data.length; i++) {
                buf[i] = data.charCodeAt(i);
            }
            // blobデータを作成
            const blob = new Blob([buf], { type: mime });
            return blob;
        }
        /**
         * Blobデータをダウンロードします。
         * @param blob 
         * @param fileName 
         */
        function saveBlob(blob: Blob, fileName: string) {
            const url = (window.URL || (<any>window).webkitURL);
            // ダウンロード用のURL作成
            const dataUrl = url.createObjectURL(blob);
            // イベント作成
            const event = document.createEvent("MouseEvents");
            event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            // a要素を作成
            const a: HTMLAnchorElement = <HTMLAnchorElement>document.createElementNS("http://www.w3.org/1999/xhtml", "a");
            // ダウンロード用のURLセット
            a.href = dataUrl;
            // ファイル名セット
            a.download = fileName;
            // イベントの発火
            a.dispatchEvent(event);
        }
    }
}