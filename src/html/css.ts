
import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"
import * as DefaultClassNames from "../common/default_class_names"
import * as HTMLFunctions from "./html_functions"

import { HorizontalAnchor, VerticalAnchor, ConnectorType, PathTextAlighnment } from "../common/enums";
//export namespace CSS {
/*
interface IPoint2D {
    x: number;
    y: number;
  }
  */

export function buildClassNameFromSurfaceClassCSS(rule: object): string {
    const _rule: Map<string, string> = toRuleMap(rule);
    return getOrCreateClassName(_rule);
}

const CSSName: string = "___GraphTableCSS";
let createdGraphTableCSS: boolean = false;
const replaceMapper: Map<string, string> = new Map();

function setupReplaceMapper() {
    replaceMapper.set("fontSize", "font-size");
    replaceMapper.set("fontFamily", "font-family");
    replaceMapper.set("autoSizeShapeToFitText", StyleNames.autoSizeShapeToFitText);
    replaceMapper.set("verticalAnchor", StyleNames.verticalAnchor);
    replaceMapper.set("horizontalAnchor", StyleNames.horizontalAnchor);

    replaceMapper.set("beginConnectorType", StyleNames.beginConnectorType);
    replaceMapper.set("endConnectorType", StyleNames.endConnectorType);
    replaceMapper.set("startMarker", StyleNames.markerStart);
    replaceMapper.set("endMarker", StyleNames.markerEnd);

    replaceMapper.set("edgeType", StyleNames.edgeType);

    replaceMapper.set("pathTextAlignment", StyleNames.pathTextAlignment);
    replaceMapper.set("paddingTop", StyleNames.paddingTop);
    replaceMapper.set("paddingLeft", StyleNames.paddingLeft);
    replaceMapper.set("paddingRight", StyleNames.paddingRight);
    replaceMapper.set("paddingBottom", StyleNames.paddingBottom);

    replaceMapper.set("strokeWidth", "stroke-width");

}

export function setGraphTableCSS() {
    if (createdGraphTableCSS) return;
    const item = document.head!.getElementsByClassName(CSSName);
    if (item.length > 0) {
        document.head!.removeChild(item[0]);
    }
    var blankStyle: HTMLStyleElement = document.createElement('style');

    blankStyle.innerHTML = createCSS();
    blankStyle.type = "text/css";
    blankStyle.setAttribute("class", CSSName);
    blankStyle.title = CSSName;


    const head = document.getElementsByTagName('head');
    const fstItem = head.item(0)!.firstChild;
    if (fstItem == null) {
        head.item(0)!.appendChild(blankStyle);

    } else {
        head.item(0)!.insertBefore(blankStyle, fstItem);
    }

    createdGraphTableCSS = true;
}
export function getGraphTableCSS(): HTMLStyleElement | null {
    const item = document.getElementById(CSSName);
    if (item instanceof HTMLStyleElement) {
        return item;
    } else {
        return null;
    }
}
export function getGraphTableStyleSheet(): CSSStyleSheet | null {
    if (!createdGraphTableCSS) setGraphTableCSS();
    for (let i = 0; i < document.styleSheets.length; i++) {
        const css = document.styleSheets.item(i)!;
        if (css.title == CSSName && css instanceof CSSStyleSheet) {
            return css
        }
    }
    return null;
}

export function getRuleContentString(rule: Map<string, string>): string {
    const arr: string[] = new Array();
    rule.forEach((value, key) => {
        arr.push(key);
    })
    arr.sort();
    const content = arr.map((key) => {
        return `${key}: ${rule.get(key)};`;
    }).join("\n");
    return content;
}
export function toRuleMap(rule: object): Map<string, string> {
    if (replaceMapper.size == 0) setupReplaceMapper();
    const _rule: Map<string, string> = new Map();
    Object.keys(rule).forEach((v) => {
        if (replaceMapper.has(v)) {
            _rule.set(replaceMapper.get(v)!, (<any>rule)[v]);
        } else {
            _rule.set(v, (<any>rule)[v]);
        }
        /*        
        if(v == "fontSize"){
            _rule.set("font-size", value);
        }else if(v == "fontFamily"){
            _rule.set("font-family", value);
        }else{
            _rule.set(v, (<any>rule)[v]);
        }
        */
    })
    return _rule;
}

const ruleInverseMap: Map<string, string> = new Map();
let createdCSSRuleCount = 0;
const generatedCSSRuleName = "--g-class-";

export function getOrCreateClassName(rule: Map<string, string> | object): string {
    if (rule instanceof Map) {
        const ruleContentString = getRuleContentString(rule);
        if (ruleInverseMap.has(ruleContentString)) {
            return ruleInverseMap.get(ruleContentString)!;
        } else {
            const css = getGraphTableStyleSheet()!;
            const className = `${generatedCSSRuleName}${createdCSSRuleCount++}`;
            const cssRule = `.${className}{${ruleContentString}}`;
            css.insertRule(cssRule, css.cssRules.length);
            ruleInverseMap.set(ruleContentString, className);
            return className;

        }
    } else {
        const _rule: Map<string, string> = toRuleMap(rule);
        return getOrCreateClassName(_rule);
    }

}


export function createCSS(): string {

    const r = `
            .${AttributeNames.cellEmphasisCellClass}{
            fill : yellow !important;
            }
            .${AttributeNames.cellEmphasisBorderClass}{
            stroke : red !important;
            }
            .${DefaultClassNames.defaultCellClass}{
                ${StyleNames.paddingTop} : 0px;
                ${StyleNames.paddingLeft} : 0px;
                ${StyleNames.paddingRight} : 0px;
                ${StyleNames.paddingBottom} : 0px;
                ${StyleNames.verticalAnchor} : ${VerticalAnchor.Middle};
                ${StyleNames.horizontalAnchor} : ${HorizontalAnchor.Center};
            }
            .${DefaultClassNames.defaultTextClass}{
                fill : black;
                font-size: 20px;
                font-family: "Times New Roman";
            }
            .${DefaultClassNames.defaultCellBackgroungClass}{
                fill : white;
            }
            .${DefaultClassNames.defaultCellBorderClass}{
                stroke : black;
            }
            .${DefaultClassNames.defaultVertexClass}{

            }
            .${DefaultClassNames.defaultEdgeClass}{
                ${StyleNames.pathTextAlignment}: center;
            }

            .${DefaultClassNames.defaultSurfaceClass}{
                stroke: black;
                stroke-width: 1px;
                fill : white;
            }
            .${DefaultClassNames.defaultPathSurfaceClass}{
                stroke: black;
                stroke-width: 1px;
                fill : transparent;
            }
            .${DefaultClassNames.defaultCircleLogicTreeCircleSVGGroup}{
                ${StyleNames.autoSizeShapeToFitText}: false;
            }

            .${DefaultClassNames.defaultEdgePathClass}{
                stroke: black;
                fill: none;
                stroke-width: 1px;
            }
            .${DefaultClassNames.defaultTextboxPathClass}{
                stroke: black;
                fill: white;
                stroke-width: 1px;
            }

            .${DefaultClassNames.defaultRectButtonClass}{
                --padding-top: 5;
                --padding-left: 15;
                --padding-right: 15;
                --padding-bottom: 5;
            }

            .___column_title_cellaa{
                --default-text-class : table-text;
                --default-background-class : background;    
                --horizontal-anchor: center;
                --vertical-anchor: middle;
                --padding-top: 0px;
                --padding-left: 0px;
                --padding-right: 0px;
                --padding-bottom: 0px;
            }

            .${DefaultClassNames.defaultConsoleColumnTitleCellTextClass} {
                fill : black;
                font-size: 18px;
                font-weight: bold;
                font-family: "'Times New Roman'";
            }
            .${DefaultClassNames.defaultConsoleColumnTitleCellUndefinedTextClass} {
                fill : pink;
                font-size: 18px;
                font-style: italic;
            }

            .${DefaultClassNames.defaultConsoleColumnTitleCellBackgroundClass}{
                fill: #8EB8FF; 
                stroke: black;
            }


            g[data-type="z-rect-button"] > rect {
                fill:#69c; 
                stroke: #444444;
                stroke-width: 3px;
                transition-duration: 0.2s;
            }

            g[data-type="z-rect-button"] > rect[disabled]{
                stroke-width: 5px;
            }
            g[data-type="z-rect-button"] > rect:not([disabled]):hover {
                stroke-width: 1px;
                fill: #79acdf;
                stroke: white;

            }
            g[data-type="z-rect-button"] > rect:not([disabled]):active {
                stroke-width: 5px;
                stroke: black;

            }
            g[data-type="z-rect-button"] > text {
                pointer-events: none;
                fill: white;
                font-family: "'Arial'";
            }

            g[data-allow-hover="true"] > rect, g[data-allow-hover="true"] > circle, g[data-allow-hover="true"] > ellipse, g[data-allow-hover="true"] > path {
                transition-duration: 0.2s;
            }
            g[data-allow-hover="true"] > rect:not([disabled]):hover, g[data-allow-hover="true"] > circle:not([disabled]):hover, g[data-allow-hover="true"] > ellipse:not([disabled]):hover, g[data-allow-hover="true"] > path:not([disabled]):hover {
                stroke-width: 1px;
            }


            `
    return r;
}
export function createCSSString(obj: object | string | undefined): string | undefined {
    if (typeof obj == "string") {
        return obj;
    } else if (typeof obj == "object") {
        const styleContent = getRuleContentString(toRuleMap(obj));
        return styleContent;
    } else {
        return undefined;
    }
}
export function createCSSClass(obj: object | string | undefined): string | undefined {
    if (typeof obj == "string") {
        return obj;
    } else if (typeof obj == "object") {
        const styleClass = getOrCreateClassName(obj);
        return styleClass;
    } else {
        return undefined;
    }
}
export function setCSSClass(e: SVGElement, style: object | string | undefined | null) {
    if (style !== undefined) {
        //SVG.resetStyle(e.style);
        if (style == null) {
            e.removeAttribute("class")
        } else {
            const styleClass = createCSSClass(style);
            if (styleClass !== undefined) {
                e.setAttribute("class", styleClass);
            }
        }
    }
}
export function setCSSStyle(e: SVGElement, style: object | string | undefined) {
    if (style !== undefined) {
        //SVG.resetStyle(e.style);
        const styleClass = createCSSString(style);
        if (styleClass !== undefined) {
            e.setAttribute("style", styleClass);
        }
    }
}

const exceptionStyleNames = ["marker-start", "marker-mid", "marker-end", "width", "height"];
const cssPropertyNames: string[] = ["font-size", "fill", "stroke",
    "font-family", "font-weight", "stroke-width", "background", "border", "background-color", "border-bottom-color", "border-bottom-style", "border-bottom-width",
    "border-left-color", "border-left-style", "border-left-width", "border-right-color", "border-right-style", "border-right-width", "border-top-color", "border-top-style", "border-top-width"];


function getPropertyStyleValue(item: HTMLElement | SVGElement, name: string): string | null {
    const p = item.style.getPropertyValue(name).trim();
    if (p.length == 0) {
        const r = item.getAttribute("class");
        if (r == null) {
            return null;
        } else {
            const css = getComputedStyle(item);
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
export function setCSSToStyle(svg: HTMLElement | SVGElement, isComplete: boolean = true) {
    if (isComplete) {
        const css: CSSStyleDeclaration = getComputedStyle(svg);
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

export function writeDownCSSToStyleAttributes(element: SVGSVGElement | SVGGElement | string): void {
    if(element instanceof SVGSVGElement || element instanceof SVGGElement){
        const elements = HTMLFunctions.getDescendantsByPostorder(element);
        elements.forEach((v) => {
            console.log(v.nodeName);
            if (v instanceof SVGGeometryElement) {
                setCSSToStyle(v, false);
            }else if(v instanceof SVGTextElement){
                setCSSToStyle(v, false);
            }

        })    
    }else{
        const id : string = element;
        const v = document.getElementById(id);
        if(v instanceof SVGSVGElement || v instanceof SVGGElement){
            writeDownCSSToStyleAttributes(v);
        }else{
            throw new Error("Not found!");
        }
    }
}

//}
