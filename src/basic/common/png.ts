//namespace GraphTableSVG {
import { CommonFunctions } from "./common_functions";
import { Size } from "./vline";
import { SVG } from "../svghtml/svg";
//import { SVG } from "../svghtml/svg";

/**
 * SVGをPNGに変換するための名前空間です。
 * この名前空間のコードはhttps://st40.xyz/one-run/article/133/を使用しています。
 */
export namespace PNG {
    export namespace SVGForPNG {
        function preprocessSVGForPng(svgElement: SVGSVGElement) {

        }
        export function svg2jpeg(svgElement: SVGSVGElement, sucessCallback: any, errorCallback: any): HTMLImageElement {
            var canvas = document.createElement('canvas');
            canvas.width = svgElement.width.baseVal.value;
            canvas.height = svgElement.height.baseVal.value;
            var ctx = canvas.getContext('2d')!;
            var image = new Image;

            image.onload = () => {
                // SVGデータをPNG形式に変換する
                ctx.drawImage(image, 0, 0, image.width, image.height);
                if (sucessCallback != null) {
                    sucessCallback(canvas.toDataURL());
                }
            };
            image.onerror = (e) => {
                if (errorCallback != null) {
                    errorCallback(e);
                }
            };
            // SVGデータを取り出す
            var svgData = new XMLSerializer().serializeToString(svgElement);
            image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svgData);

            return image;
        }

        const cssPropertyNames: string[] = ["font-size", "fill", "stroke",
            "font-family", "font-weight", "stroke-width", "background", "border", "background-color", "border-bottom-color", "border-bottom-style", "border-bottom-width",
            "border-left-color", "border-left-style", "border-left-width", "border-right-color", "border-right-style", "border-right-width", "border-top-color", "border-top-style", "border-top-width"];

        const exceptionStyleNames = ["marker-start", "marker-mid", "marker-end"];


        function getAllElementStyleMapSub(item: HTMLElement | string, output: { [key: number]: string | null; }, id: number): number {
            if (typeof item == 'string') {
                const svgBox: HTMLElement | null = document.getElementById(item);
                if (svgBox != null) {
                    getAllElementStyleMapSub(svgBox, output, id);
                }
            }
            else {
                const style = item.getAttribute("style");
                output[id++] = style;
                for (let i = 0; i < item.children.length; i++) {
                    const child = <HTMLElement>item.children.item(i);
                    if (child != null) {
                        id = getAllElementStyleMapSub(child, output, id);
                    }
                }
            }
            return id;

        }

        export function getAllElementStyleMap(item: HTMLElement | string): { [key: number]: string; } {
            const dic: { [key: number]: string; } = {};
            getAllElementStyleMapSub(item, dic, 0);
            return dic;
        }
        function setAllElementStyleMapSub(item: HTMLElement | string, output: { [key: number]: string | null; }, id: number): number {
            if (typeof item == 'string') {
                const svgBox: HTMLElement | null = document.getElementById(item);
                if (svgBox != null) {
                    setAllElementStyleMapSub(svgBox, output, id);
                }
            }
            else {
                const style = output[id++];
                if (style == null) {
                    item.removeAttribute("style");
                } else {
                    item.setAttribute("style", style);
                }
                for (let i = 0; i < item.children.length; i++) {
                    const child = <HTMLElement>item.children.item(i);
                    if (child != null) {
                        id = setAllElementStyleMapSub(child, output, id);
                    }
                }
            }
            return id;

        }

        export function setAllElementStyleMap(item: HTMLElement | string, dic: { [key: number]: string; }) {
            setAllElementStyleMapSub(item, dic, 0);
        }
        /**
     * SVG要素のクラス属性名からCSSStyleDeclarationを取得します。
     * @param svg 取得されるSVG要素
     */

        function getCSSStyle(svg: HTMLElement): CSSStyleDeclaration | null {
            const css = getComputedStyle(svg);
            return css;

            if (svg.getAttribute("class") == null) {
                return null;
            } else {
                const css = getComputedStyle(svg);
                return css;
            }

        }
        function getPropertyStyleValue(item: HTMLElement, name: string): string | null {
            const p = item.style.getPropertyValue(name).trim();
            if (p.length == 0) {
                const r = item.getAttribute("class");
                if (r == null) {
                    return null;
                } else {
                    const css = getCSSStyle(item);
                    if (css == null) throw Error("error");
                    //const css = getComputedStyle(item);
                    const p2 = css.getPropertyValue(name).trim();
                    if (p2.length == 0) {
                        return null;
                    } else {
                        return p2;
                    }
                }
            } else {
                return p;
            }
        }
        /**
        * SVG要素のクラス属性名から取得できるCSSStyleDeclarationを要素のスタイル属性にセットします。
        * @param svg 適用されるSVG要素
        */
        export function setCSSToStyle(svg: HTMLElement, isComplete: boolean = true) {
            if (isComplete) {
                const css: CSSStyleDeclaration | null = getComputedStyle(svg);
                console.log(css);
                if (css != null) {
                    for (let i = 0; i < css.length; i++) {
                        const name = css.item(i);
                        const value = css.getPropertyValue(name);
                        if (value.length > 0) {
                            if (!exceptionStyleNames.some((v) => v == name)) {
                                svg.style.setProperty(name, value);
                            }
                        }
                    }
                }

            } else {
                cssPropertyNames.forEach((v) => {
                    const value = getPropertyStyleValue(svg, v);
                    if (value != null) {
                        svg.style.setProperty(v, value);
                    }
                });
            }

            /*
            const css = getCSSStyle(svg);
            if (css != null) {
                let css2: CSSStyleDeclaration = css;
                cssPropertyNames.forEach((v) => {                    
                    const value = css2.getPropertyValue(v).trim();
                    if (value.length > 0) {
                        svg.style.setProperty(v, value);
                    }
                });
            }
            */
        }
        /**
    * 入力のSVG要素とその配下の要素全てにsetCSSToStyleを適用します。
    * @param item SVG要素もしくはそのid
    */
        export function setCSSToAllElementStyles(item: HTMLElement | string, isComplete: boolean = true) {
            if (typeof item == 'string') {
                const svgBox: HTMLElement | null = document.getElementById(item);
                if (svgBox != null) {
                    setCSSToAllElementStyles(svgBox, isComplete);
                }
            }
            else {
                if (!item.hasAttribute("data-skip")) setCSSToStyle(item, isComplete);
                for (let i = 0; i < item.children.length; i++) {
                    const child = <HTMLElement>item.children.item(i);
                    if (child != null) {
                        setCSSToAllElementStyles(child, isComplete);
                    }
                }
            }
        }
        /**
         * svg要素のCSSをStyle属性に書き込みます。
         * @param svg 
         */
        export function copyCSStoStyle(svg: HTMLElement) {
            const widthAttr = svg.getAttribute("width");
            const heightAttr = svg.getAttribute("height");
            if (widthAttr != null) {
                svg.style.width = widthAttr;
            }
            if (heightAttr != null) {
                svg.style.height = heightAttr;
            }
            //svgBox.removeAttribute("width");
            //svgBox.removeAttribute("height");
            setCSSToAllElementStyles(svg);
        }
    }
    /**
     * HTMLImageElementからCanvasElementを作成します。
     * @param img 
     */
    export function createCanvasFromImage(img: HTMLImageElement): HTMLCanvasElement {
        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", img.getAttribute("width")! );
        canvas.setAttribute("height", img.getAttribute("height")!);
        /*
        if (img.style.width != null && img.style.height != null) {

            console.log(img.style.width);
            canvas.setAttribute("width", img.getAttribute("width")! );
            canvas.setAttribute("height", img.getAttribute("height")!);
        }
        */
        //canvas.style.height = img.style.height;    
        return canvas;
    }
    /**
     * HTMLImageElementの画像を保存するイベントを作成します。
     * @param img 
     * @param canvas 
     */
    export function setSaveEvent(img: HTMLImageElement) {
        console.log("load?");
        img.onload = () => {
            console.log("load!");

            const canvas = document.createElement("canvas");
            canvas.setAttribute("width", img.getAttribute("width")! );
            canvas.setAttribute("height", img.getAttribute("height")!);

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
    export function createPNGFromSVG(id: string): HTMLImageElement {


        const svgBox = document.getElementById(id);
        if (svgBox == null) throw Error("Error");
        if (svgBox instanceof SVGSVGElement) {
            return createPNGFromSVGSVGElement(svgBox);
        } else {
            throw Error("Error");
        }

    }
    export function createPNGFromSVGSVGElement(svgsvg: SVGSVGElement): HTMLImageElement   {
        const userAgent = window.navigator.userAgent;
        if (userAgent.indexOf("Firefox") != -1) {
            alert(`Firefox is not supported!`);
            throw Error("not supported error");
        }
        const svgBox: any = svgsvg;
        const styleMap = SVGForPNG.getAllElementStyleMap(svgBox);
        SVGForPNG.copyCSStoStyle(svgBox);

        const img = getImage2(svgBox);
        setSaveEvent(img);
        SVGForPNG.setAllElementStyleMap(svgBox, styleMap);
        return img;
        //return canvas;
    }

    function getPadding(svgBox: HTMLElement): number[] {
        const r: number[] = new Array(4);
        var style = window.getComputedStyle(svgBox);

        r[0] = style.paddingTop == null ? 0 : CommonFunctions.toPX(style.paddingTop);
        r[1] = style.paddingLeft == null ? 0 : CommonFunctions.toPX(style.paddingLeft);
        r[2] = style.paddingBottom == null ? 0 : CommonFunctions.toPX(style.paddingBottom);
        r[3] = style.paddingRight == null ? 0 : CommonFunctions.toPX(style.paddingRight);

        return r;
    }
    function getSizeWidthPadding(svgBox: HTMLElement) {
        const padding = getPadding(svgBox);
        const width = svgBox.style.width == null ? 0 : CommonFunctions.toPX(svgBox.style.width);
        const height = svgBox.style.height == null ? 0 : CommonFunctions.toPX(svgBox.style.height);
        //return new Size(Math.round(width + padding[1] + padding[3]), Math.round(height + padding[0] + padding[2] ) );
        return new Size(width + padding[1] + padding[3], height + padding[0] + padding[2]);
    }
    function getViewBox(svgBox: HTMLElement): number[] {
        const r: number[] = new Array(4);
        const viewbox = svgBox.getAttribute("viewBox");
        if (viewbox != null) {
            const strs = viewbox.split(" ");
            for (let i = 0; i < strs.length; i++) {
                const num = CommonFunctions.toPX(strs[i]);
                r[i] = num;
            }
        }
        return r;
    }

    /**
     * svg要素をHTMLImageElementに変換します。
     * @param svgBox 
     */
    export function getImage(svgBox: HTMLElement): HTMLImageElement {
        if (window.btoa) {
            const img: HTMLImageElement = document.createElement("img");
            const realSize = getSizeWidthPadding(svgBox);
            let originalWidthAttr = svgBox.getAttribute("width");
            let originalHeightAttr = svgBox.getAttribute("height");
            let originalWidthStyle = svgBox.style.width;
            let originalHeightStyle = svgBox.style.height;

            let originalViewBox = svgBox.getAttribute("viewBox");
            let viewBoxValue = getViewBox(svgBox);
            let viewBox = `${viewBoxValue[0]} ${viewBoxValue[1]} ${realSize.width} ${realSize.height}`

            svgBox.style.width = realSize.width.toString();
            svgBox.style.height = realSize.height.toString();

            svgBox.setAttribute("width", realSize.width.toString());
            svgBox.setAttribute("height", realSize.height.toString());
            svgBox.setAttribute("viewBox", viewBox);

            img.style.width = svgBox.style.width;
            img.style.height = svgBox.style.height;

            //img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgBox.outerHTML)));            
            var svgData = new XMLSerializer().serializeToString(svgBox);
            img.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svgData);


            svgBox.style.width = originalWidthStyle;
            svgBox.style.height = originalHeightStyle;
            if (originalWidthAttr != null) {
                svgBox.setAttribute("width", originalWidthAttr);
            } else {
                svgBox.removeAttribute("width");
            }
            if (originalHeightAttr != null) {
                svgBox.setAttribute("height", originalHeightAttr);
            } else {
                svgBox.removeAttribute("height")
            }
            if (originalViewBox != null) {
                svgBox.setAttribute("viewBox", originalViewBox);
            } else {
                svgBox.removeAttribute("viewBox")
            }
            return img;


        } else {
            throw Error("Error");
        }

        //return img;
    }
    export function getImage2(svgBox: SVGSVGElement): HTMLImageElement {
        if (window.btoa !== undefined) {
            const img: HTMLImageElement = document.createElement("img");
            /*
            const realSize = getSizeWidthPadding(svgBox);
            let originalWidthAttr = svgBox.getAttribute("width");
            let originalHeightAttr = svgBox.getAttribute("height");
            let originalWidthStyle = svgBox.style.width;
            let originalHeightStyle = svgBox.style.height;

            let originalViewBox = svgBox.getAttribute("viewBox");
            let viewBoxValue = getViewBox(svgBox);
            let viewBox = `${viewBoxValue[0]} ${viewBoxValue[1]} ${realSize.width} ${realSize.height}`

            svgBox.style.width = realSize.width.toString();
            svgBox.style.height = realSize.height.toString();

            svgBox.setAttribute("width", realSize.width.toString());
            svgBox.setAttribute("height", realSize.height.toString());
            svgBox.setAttribute("viewBox", viewBox);
            */
            //const rect = svgBox;
            //img.setAttribute("width", svgBox.width.baseVal.value.toString()+"px" );
            img.setAttribute("width", svgBox.width.baseVal.value.toString()+"px" );
            img.setAttribute("height", svgBox.height.baseVal.value.toString()+"px" );
            //img.style.width = svgBox.width.baseVal.value.toString();

            //img.style.height = svgBox.height.baseVal.value.toString();

            //img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgBox.outerHTML)));            
            var svgData = new XMLSerializer().serializeToString(svgBox);
            img.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svgData);

            /*
            svgBox.style.width = originalWidthStyle;
            svgBox.style.height = originalHeightStyle;
            if (originalWidthAttr != null) {
                svgBox.setAttribute("width", originalWidthAttr);
            } else {
                svgBox.removeAttribute("width");
            }
            if (originalHeightAttr != null) {
                svgBox.setAttribute("height", originalHeightAttr);
            } else {
                svgBox.removeAttribute("height")
            }
            if (originalViewBox != null) {
                svgBox.setAttribute("viewBox", originalViewBox);
            } else {
                svgBox.removeAttribute("viewBox")
            }
            */
            return img;


        } else {
            throw Error("Error");
        }
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
//}