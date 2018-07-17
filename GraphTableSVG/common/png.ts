namespace GraphTableSVG {
    /**
     * SVGをPNGに変換するための名前空間です。
     * この名前空間のコードはhttps://st40.xyz/one-run/article/133/を使用しています。
     */
    export namespace PNG {
        /**
         * SVG要素からPNG画像を生成して保存します。
         * @param id 
         */
        export function createPNGFromSVG(id: string) {
            const userAgent = window.navigator.userAgent;
            if (userAgent.indexOf("Firefox") != -1) {
                alert(`Firefox is not supported!`);
                return;
            }

            const svgBox = document.getElementById(id);
            if (svgBox == null) throw Error("Error");
            const styleMap = GraphTableSVG.SVG.getAllElementStyleMap(svgBox);
            GraphTableSVG.SVG.setCSSToAllElementStyles(svgBox);

            const widthAttr = svgBox.getAttribute("width");
            const heightAttr = svgBox.getAttribute("height");

            if(widthAttr != null){
                svgBox.style.width = widthAttr;
            }
            if(heightAttr != null){
                svgBox.style.height = heightAttr;
            }
            /*
            if (svgBox.getAttribute("width") != null || svgBox.getAttribute("height") != null) {
                alert("svgbox cannot use width and height tags");
                return;
            }
            */


            const img = getImage(svgBox);
            const canvas = document.createElement("canvas");
            //const canvas = getCanvas(svgBox);
            //document.body.appendChild(canvas);
            svgBox.removeAttribute("width");
            svgBox.removeAttribute("height");

            img.onload = () => {
                var style = getComputedStyle(svgBox)
                img.setAttribute("width", style.width);
                img.setAttribute("height", style.height);
                canvas.setAttribute("width", style.width);
                canvas.setAttribute("height", style.height);
                const ctx = canvas.getContext("2d");
                if (ctx == null) throw Error("Error");
                ctx.drawImage(img, 0, 0);
                //saveCanvas("png", canvas);
                saveCanvas("png", canvas);
                //document.body.removeChild(canvas);


            }
            if(widthAttr != null){
                svgBox.style.removeProperty("width");
                svgBox.setAttribute("width", widthAttr);
            }
            if(heightAttr != null){
                svgBox.style.removeProperty("height");
                svgBox.setAttribute("height", heightAttr);
            }

            GraphTableSVG.SVG.setAllElementStyleMap(svgBox, styleMap);
            return canvas;
            //return canvas;
        }
        /**
         * svg要素をHTMLImageElementに変換します。
         * @param svgBox 
         */
        function getImage(svgBox: HTMLElement): HTMLImageElement {
            let svg = "";
            svg = svgBox.outerHTML;

            const img: HTMLImageElement = document.createElement("img");
            if (window.btoa) {
                img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
                //console.log(unescape(encodeURIComponent(svg)));
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