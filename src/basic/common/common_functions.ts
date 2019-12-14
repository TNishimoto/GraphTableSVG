//namespace GraphTableSVG {
    //import { Rectangle } from "./vline";
    //import * as CSS from "../svghtml/css"
    //import {GGraph} from "../object/g_graph"
    //import {GTable} from "../object/g_table"
    //import {GObject} from "../object/g_object"

    //import {VBAObjectType} from "../object/table/vba"
    
    export namespace CommonFunctions {
        /**
         * 入力要素がdocument.bodyの孫であるときに限りTrueを返します。
         * @param node 判定する要素
         */
        export function IsDescendantOfBody(node: Node): boolean {
            const parent = node.parentNode;
            if (parent == null) {
                return false;
            }
            else if (parent == document.body) {
                return true;
            } else {
                return CommonFunctions.IsDescendantOfBody(parent);
            }
        }
        
        /**
         * 指定された文字数になるまで指定された文字を左に加えます
         * @param text 文字を追加する文字列
         * @param length 計算後のtextの文字数
         * @param leftChar 左に追加する文字
         */
        export function paddingLeft(text: string, length: number, leftChar: string): string {
            while (text.length < length) {
                text = leftChar + text;
            }
            return text;
        }
        
        //export function setCellCSS(){

        //}
        /**
         * 単位付きの値を値部分と単位部分に分割します。
         * @param text 単位付きの値
         */
        export function parseUnit(text : string) : [number, string]{
            let str1="", str2="";
            for(let i=0;i<text.length;i++){
                if(isNaN(<any>text[i]) && text[i] != "." ){
                    str2 += text[i];
                }else{
                    str1 += text[i];
                }
            }
            return [Number(str1), str2];
        }
        /**
         * 入力値をピクセル単位の値に変換します。
         * @param value 
         */
        export function toPX(value : string) : number{
            const [val, unit] = parseUnit(value);
            if(unit == "px"){
                return val;
            } else if(unit == "em"){
                return val * 16;
            } else if(unit == "pt"){
                return (val / 72) * 96;
            }
            else{
                return val;
            }
        }
        /**
         * 二次ベジエ曲線上の座標を計算します。
         * @param param0 [x,y] ベジエ曲線の開始座標
         * @param param1 [x,y] ベジエ曲線の制御点
         * @param param2 [x,y] ベジエ曲線の終了座標
         * @param t 曲線上の位置 0が曲線の開始座標で1が曲線の終了座標、0.5が曲線の中間点を表します
         * @returns 指定された座標
         */
        export function bezierLocation([px1,py1] : [number, number], [px2,py2] : [number, number], [px3,py3] : [number, number], t : number) : [number, number]{
            const x = px1 * (1-t) * (1-t) + 2 * px2 * t *( 1-t) + px3 * t * t; 
            const y = py1 * (1-t) * (1-t) + 2 * py2 * t *( 1-t) + py3 * t * t; 
            return [x, y];
        }

    }
//}