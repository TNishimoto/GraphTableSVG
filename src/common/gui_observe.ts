//namespace GraphTableSVG {
    
    import { Padding, Rectangle } from "./vline";
    import { CustomAttributeNames } from "../options/custtome_attributes"
    import * as GUIP  from "../common/gui"
    import { HTMLFunctions } from "../svghtml/html_functions"
    import { SVG } from "../svghtml/svg"

    import { Common } from "../common/common";
    import {VBAObjectType} from "../object/table/vba"
    import {GObject} from "../object/g_object"
    

    export namespace GUI {
        /**
         * 
         * @param svgBox 
         * @param sizeFunc 
         * @param padding 
         */
        export function observeSVGBox(svgBox: SVGSVGElement, sizeFunc: () => Rectangle, padding: Padding = new Padding(5, 5, 5, 5)) {
            let _observer: MutationObserver;
            let observeFunction: MutationCallback = (x: MutationRecord[]) => {
                let b = false;

                for (let i = 0; i < x.length; i++) {
                    const item = x[i];
                    //console.log(item.target);
                    if (svgBox != item.target) {
                        b = true;
                    }
                }

                if (b) GUIP.GUI.setSVGBoxSize(svgBox, sizeFunc(), padding);
            }
            
            _observer = new MutationObserver(observeFunction);
            const option: MutationObserverInit = {
                subtree: true, attributes: true
            };
            _observer.observe(svgBox, option);            
        }

        export function autostrech(svgBox: SVGSVGElement, objects : VBAObjectType[]){
            objects.forEach((v)=>
            {
                if(v instanceof GObject){
                    v.update();
                }
            }
            )
            const rect = Common.getRegion(objects);

            GUIP.GUI.setSVGBoxSize(svgBox, rect, new Padding(5,5,5,5));
        }

        export function autostretchObserve(svgBox: SVGSVGElement, objects : VBAObjectType[]) {
            throw "NotImplementedException";
        }


        type ObserveSVGSVGInfo = {
            svgsvg: SVGSVGElement;
            visible: boolean;
            padding: Padding;
        }
        let dic: ObserveSVGSVGInfo[] = [];
        let createdObserveSVGSVGTimer = false;
        function resizeSVGSVG(svgBox: SVGSVGElement, padding: Padding) {
            //GraphTableSVG.GUI.setSVGBoxSize(svgBox, new Rectangle(0,0,1000,1000), padding);
            const rect = SVG.getRegion2(svgBox);
            if (rect.width == 0) rect.width = 1;
            if (rect.height == 0) rect.height = 1;
            GUIP.GUI.setSVGBoxSize(svgBox, rect, padding);
        }
        export function observeSVGSVG(svgBox: SVGSVGElement, padding: Padding = new Padding(0, 0, 0, 0)) {
            if(isObserved(svgBox)){
                return;
            }

            let _observer: MutationObserver;
            let observeFunction: MutationCallback = (x: MutationRecord[]) => {
                const gShrink = svgBox.gtGetAttributeBooleanWithUndefined("g-shrink");
                let b = false;

                for (let i = 0; i < x.length; i++) {
                    const item = x[i];
                    if (svgBox != item.target) {
                        b = true;
                    }
                }
                if (gShrink === true && b) {

                    resizeSVGSVG(svgBox, padding);
                }
            }

            _observer = new MutationObserver(observeFunction);
            const option: MutationObserverInit = {
                subtree: true, attributes: true
            };
            _observer.observe(svgBox, option);

            dic.push({ svgsvg: svgBox, visible: false, padding: padding });
            if (!createdObserveSVGSVGTimer) {
                createdObserveSVGSVGTimer = true;
                setTimeout(observeSVGSVGTimer, timerInterval);
            }
        }
        export function isObserved(svgBox: SVGSVGElement) : boolean {
            for(let i=0;i<dic.length;i++){
                if(dic[i].svgsvg === svgBox){
                    return true;
                }
            }
            return false;
        }

        function observeSVGSVGTimer() {
            dic.forEach((v, i) => {
                
                const nowVisible = !SVG.isSVGSVGHidden(v.svgsvg);
                //const nowVisible = (!SVG.isSVGSVGHidden(v.svgsvg) ) && isInsideElement(v.svgsvg);

                if (v.visible) {
                    if (!nowVisible) {
                        v.visible = false;
                    }
                }
                else {
                    if (nowVisible) {
                        //const startTime = performance.now();
                        dispatchResizeEvent(v.svgsvg);
                        //const endTime = performance.now();
                        //const time = endTime - startTime;
                        //console.log("dispatch " + v.svgsvg.id + " : " + time + "ms");

                        const b = v.svgsvg.gtGetAttributeBooleanWithUndefined("g-shrink");
                        if(b !== undefined && b === true)resizeSVGSVG(v.svgsvg, v.padding);
                        v.visible = true;
                    }
                }
            })
            setTimeout(observeSVGSVGTimer, timerInterval);
        }
        function dispatchResizeEvent(e: Element): void {

            const children = HTMLFunctions.getChildren(e);
            children.forEach((v)=>{
                dispatchResizeEvent(v);
            })
            if (e instanceof SVGGElement) {
                
                var event = document.createEvent("HTMLEvents");
                
                event.initEvent(CustomAttributeNames.resizeName, false, true)
                e.dispatchEvent(event);
            }

        }

        let changeElementDic: HTMLElement[] = [];
        let timerInterval = 100;
        export function observeChangeElement(){
            var result = document.evaluate("//iframe[@g-src]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for(var i=0; i<result.snapshotLength; i++){
                var node = <HTMLElement>result.snapshotItem(i);
                changeElementDic.push(node);
              }
              if(changeElementDic.length > 0)setTimeout(observeChangeElementTimer, timerInterval);
        }
        function observeChangeElementTimer() {
            for(let i=0;i<changeElementDic.length;i++){
                const element = changeElementDic[i];

                if(HTMLFunctions.isInsideElement(element)){
                    const url = element.getAttribute("g-src")!;
                    
                    
                    element.setAttribute("src", url);
                    element.removeAttribute("g-src");
                    changeElementDic.splice(i, 1);
                    i=-1;
                    
                }

            }
            if(changeElementDic.length > 0)setTimeout(observeChangeElementTimer, timerInterval);
        }

    }
//}