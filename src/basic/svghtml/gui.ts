//namespace GraphTableSVG {
import { Padding, Rectangle } from "../common/vline";
//import {SVGToVBA} from "../object/table/vba"
//import {GObject} from "../object/g_object"

//export namespace GUI {



    export function setSVGBoxSize(box: SVGSVGElement, w: number, h: number): void;
    export function setSVGBoxSize(box: SVGSVGElement, rect: Rectangle, padding: Padding): void;

    export function setSVGBoxSize(box: SVGSVGElement, item1: Rectangle | number, item2: Padding | number) {
        if (item1 instanceof Rectangle) {

            if (item2 instanceof Padding) {
                const w: number = item1.right + item2.left + item2.right;
                const h: number = item1.bottom + item2.top + item2.bottom;

                setSVGBoxSize(box, w, h);
            } else {
                throw new Error();
            }
        } else {
            if (item2 instanceof Padding) {
                throw new Error();
            } else {

                const width = `${item1}px`;
                const height = `${item2}px`;
                if (box.style.width != width || box.style.height != height) {
                    box.style.width = width;
                    box.style.height = height;
                    box.setAttribute("width", width);
                    box.setAttribute("height", height);

                    box.setAttribute(`viewBox`, `0 0 ${item1} ${item2}`);
                }
            }
        }

    }
    /**
     * URLのパラメータを表す連想配列を生成します。
     */
    export function getURLParameters(): { [key: string]: string; } {
        const arg: { [key: string]: string; } = {};
        const pair = location.search.substring(1).split('&');
        for (let i = 0; pair[i]; i++) {
            const kv = pair[i].split('=');
            arg[kv[0]] = kv[1];
        }
        return arg;
    }
    /**
     * URLのパラメータをパースしてHTML内の適切な要素に代入します。
     */
    export function setURLParametersToHTMLElements() {
        const parameters = getURLParameters();
        Object.keys(parameters).forEach((key) => {
            const val = parameters[key]; // this は obj
            const element = document.getElementById(key);
            if (element != null) {
                if (element instanceof HTMLTextAreaElement) {
                    element.value = val;
                }
            }
        }, parameters);
    }

    /**
     * HTMLTextAreaElementのテキストを取得します。
     * @param elementID HTMLTextAreaElementのID
     */
    export function getInputText(elementID: string): string {
        const textbox: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById(elementID);
        return textbox.value;
    }

    /**
     * HTMLTextAreaElementを取得します。
     * @param id HTMLTextAreaElementのID
     */
    export function getNonNullElementById(id: string): HTMLElement {
        const tmp = document.getElementById(id);
        if (tmp == null) {
            throw Error("Null Error");
        } else {
            return tmp;
        }
    }
    export function getClientRectangle(): Rectangle {
        const x = window.pageXOffset;
        const y = window.pageYOffset;
        const width = window.innerWidth;
        const height = window.innerHeight;
        return new Rectangle(x, y, width, height);
    }



//}
//}