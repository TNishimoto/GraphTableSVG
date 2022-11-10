
import { escapeWithRound100, round100 } from "../common/vline";
import * as GOptions from "./z_options"
import * as CSS from "../html/css"
import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"

import * as SVG from "../interfaces/svg"
import * as ElementExtension from "../interfaces/element_extension"
import * as SVGElementExtension from "../interfaces/svg_element_extension"
import * as SVGTextExtension from "../interfaces/svg_text_extension"
import * as DefaultClassNames from "../common/default_class_names"
import { GObject } from "./z_object";
/**
     * SVGPathElementを生成します。
     * @param parent 生成したSVGPathElementを子に追加する要素
     * @param x 開始位置のX座標
     * @param y 開始位置のY座標
     * @param x2 終了位置のX座標
     * @param y2 終了位置のY座標
     * @param className SVGPathElementのクラス属性名
     * @returns 生成されたSVGPathElement
     */
export function createPath(parent: SVGElement | HTMLElement, x: number, y: number, x2: number, y2: number,
    className: string | GOptions.surfaceClassCSS, style: string | undefined | GOptions.surfaceClassCSS): SVGPathElement {
    const path = <SVGPathElement>document.createElementNS('http://www.w3.org/2000/svg', 'path');
    parent.appendChild(path);
    path.setAttribute("d", escapeWithRound100`M ${x} ${y} L ${x2} ${y2}`);

    path.setAttribute(AttributeNames.objectIDName, (SVG.getNewID()).toString());


    GOptions.setClassAndStyle(path, className, style);

    return path;
}

    /**
    * SVGTextElementを生成します。
    * @param className 生成するSVG要素のクラス属性名
    * @returns 生成されたSVGTextElement
    */
   export function createSVGText(className: string | undefined | null, style: string | undefined): SVGTextElement {
    const _svgText: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    _svgText.setAttribute(AttributeNames.objectIDName, (SVG.getNewID()).toString());
    if (style !== undefined) {
        _svgText.setAttribute("style", style);
    }

    //_svgText.style.textAnchor = "middle";
    if(className === undefined){
        _svgText.setAttribute("class", DefaultClassNames.defaultTextClass);
    }
    else if (className == null) {
    } else {
        _svgText.setAttribute("class", className);

        //_svgText.className = className;
    }
    return _svgText;
}