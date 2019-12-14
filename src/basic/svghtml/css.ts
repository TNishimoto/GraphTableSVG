
import { CustomAttributeNames } from "../common/custtome_attributes"
import { HorizontalAnchor, VerticalAnchor, ConnectorPosition, PathTextAlighnment } from "../common/enums";
export namespace CSS {
    export type textClassCSS = {
        fill? : string,
        fontSize? : string,
        fontFamily? : string,
    }
    export type surfaceClassCSS = {
        stroke? : string,
        strokeWidth? : string,
        fill? : string,
    }
    export type GTextBoxCSS = {
        isAutoSizeShapeToFitText?: boolean,
        verticalAnchor?: VerticalAnchor,
        horizontalAnchor?: HorizontalAnchor
    }
    export type GEdgeStyleCSS = {
        beginConnectorType?: ConnectorPosition,
        endConnectorType?: ConnectorPosition,
        pathTextAlignment?: PathTextAlighnment
    } & GTextBoxCSS
    /*
    interface IPoint2D {
        x: number;
        y: number;
      }
      */

    export function buildClassNameFromSurfaceClassCSS(rule : surfaceClassCSS) : string {
        const _rule : Map<string, string> = toRuleMap(rule);
        return getOrAddRule(_rule);
    }

    const CSSName: string = "___GraphTableCSS";
    let createdGraphTableCSS : boolean = false;
    
    export function setGraphTableCSS() {
        if(createdGraphTableCSS) return;
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
        if(fstItem == null){
            head.item(0)!.appendChild(blankStyle);

        }else{
            head.item(0)!.insertBefore(blankStyle, fstItem);
        }
        
        createdGraphTableCSS = true;
    }
    export function getGraphTableCSS(): HTMLStyleElement | null {
        const item = document.getElementById(CSSName);
        if(item instanceof HTMLStyleElement){
            return item;
        }else{
            return null;
        }
    }
    export function getGraphTableStyleSheet(): CSSStyleSheet | null {
        if(!createdGraphTableCSS)setGraphTableCSS();
        for(let i=0;i<document.styleSheets.length;i++){
            const css = document.styleSheets.item(i)!;
            if(css.title == CSSName && css instanceof CSSStyleSheet){
                return css
            }
        }
        return null;
    }

    export function getRuleContentString(rule : Map<string,string>) : string{
        const arr : string[] = new Array();
        rule.forEach((value, key) =>{
            arr.push(key);
        })
        arr.sort();
        const content = arr.map((key) =>{
            return `${key}: ${rule.get(key)};`;
        }).join("\n");
        return content;
    }
    export function toRuleMap(rule : textClassCSS) : Map<string,string>{
        const _rule : Map<string, string> = new Map();
        Object.keys(rule).forEach((v)=>{
            const value = (<any>rule)[v];
            if(v == "fontSize"){
                _rule.set("font-size", value);
            }else if(v == "fontFamily"){
                _rule.set("font-family", value);
            }else{
                _rule.set(v, (<any>rule)[v]);
            }
        })
        return _rule;
    }

    const ruleInverseMap : Map<string,string> = new Map();
    let createdCSSRuleCount = 0;
    const generatedCSSRuleName = "--g-class-";

    export function getOrAddRule(rule : Map<string,string> | object) : string {
        if(rule instanceof Map){
            const ruleContentString = getRuleContentString(rule);
            if(ruleInverseMap.has(ruleContentString)){
                return ruleInverseMap.get(ruleContentString)!;
            }else{
                const css = getGraphTableStyleSheet()!;
                const className = `${generatedCSSRuleName}${createdCSSRuleCount++}`;
                const cssRule = `.${className}{${ruleContentString}}`;
                css.insertRule(cssRule, css.cssRules.length);
                ruleInverseMap.set(ruleContentString, className);
                return className;
        
            }    
        }else{
            const _rule : Map<string, string> = toRuleMap(rule);
            return getOrAddRule(_rule);
        }

    }


    export function createCSS(): string {

        const r = `
            .${CustomAttributeNames.cellEmphasisCellClass}{
            fill : yellow !important;
            }
            .${CustomAttributeNames.cellEmphasisBorderClass}{
            stroke : red !important;
            }
            .${CustomAttributeNames.StyleValue.defaultCellClass}{
                ${CustomAttributeNames.Style.paddingTop} : 5px;
                ${CustomAttributeNames.Style.paddingLeft} : 5px;
                ${CustomAttributeNames.Style.paddingRight} : 5px;
                ${CustomAttributeNames.Style.paddingBottom} : 5px;
                ${CustomAttributeNames.Style.VerticalAnchor} : ${VerticalAnchor.Middle};
                ${CustomAttributeNames.Style.HorizontalAnchor} : ${HorizontalAnchor.Center};
            }
            .${CustomAttributeNames.StyleValue.defaultTextClass}{
                fill : black;
                font-size: 18px;
                font-family: "monospace";
            }
            .${CustomAttributeNames.StyleValue.defaultCellBackgroungClass}{
                fill : white;
            }
            .${CustomAttributeNames.StyleValue.defaultCellBorderClass}{
                stroke : black;
            }
            .${CustomAttributeNames.StyleValue.defaultVertexClass}{

            }

            .${CustomAttributeNames.StyleValue.defaultSurfaceClass}{
                stroke: black;
                stroke-width: 1px;
                fill : white;
            }
            .${CustomAttributeNames.StyleValue.defaultPathSurfaceClass}{
                stroke: black;
                stroke-width: 1px;
                fill : transparent;
            }
            .${CustomAttributeNames.StyleValue.defaultCircleLogicTreeCircleSVGGroup}{
                ${CustomAttributeNames.Style.autoSizeShapeToFitText}: false;
            }

            .${CustomAttributeNames.StyleValue.defaultEdgePathClass}{
                stroke: black;
                fill: none;
                stroke-width: 1px;
            }
            .${CustomAttributeNames.StyleValue.defaultTextboxPathClass}{
                stroke: black;
                fill: white;
                stroke-width: 1px;
            }

            .${CustomAttributeNames.StyleValue.defaultRectButtonSurfaceClass}{
                fill: #8EB8FF; 
                stroke: black;
            }
            .${CustomAttributeNames.StyleValue.defaultRectButtonSurfaceClass}[disabled]{
                fill: #aaaaaa; 
            }
            .${CustomAttributeNames.StyleValue.defaultRectButtonSurfaceClass}:not([disabled]):hover{
                fill:#A4C6FF; 
            }
            .${CustomAttributeNames.StyleValue.defaultRectButtonSurfaceClass}:not([disabled]):active{
                fill:#8EB8FF; 
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

            .${CustomAttributeNames.StyleValue.defaultConsoleColumnTitleCellTextClass} {
                fill : black;
                font-size: 18px;
                font-weight: bold;
            }
            .${CustomAttributeNames.StyleValue.defaultConsoleColumnTitleCellUndefinedTextClass} {
                fill : pink;
                font-size: 18px;
                font-style: italic;
            }

            .${CustomAttributeNames.StyleValue.defaultConsoleColumnTitleCellBackgroundClass}{
                fill: #8EB8FF; 
                stroke: black;
            }


            g[data-type="g-rect-button"] > rect {
                stroke-width: 1px;
                transition-duration: 0.2s;
            }

            g[data-type="g-rect-button"] > rect[disabled]{
                stroke-width: 1px;
            }
            g[data-type="g-rect-button"] > rect:not([disabled]):hover {
                stroke-width: 3px;
            }
            g[data-type="g-rect-button"] > rect:not([disabled]):active {
                stroke-width: 1px;
            }
            g[data-type="g-rect-button"] > text {
                pointer-events: none;
            }
    
            `
        return r;
    }
}
