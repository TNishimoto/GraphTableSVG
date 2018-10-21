namespace GraphTableSVG {
    export namespace GUI {
        export function observeSVGBox(svgBox: SVGSVGElement, sizeFunc: () => GraphTableSVG.Rectangle, padding: GraphTableSVG.Padding = new GraphTableSVG.Padding(5, 5, 5, 5)) {
            let _observer: MutationObserver;
            let observeFunction: MutationCallback = (x: MutationRecord[]) => {
                let b = false;

                for (let i = 0; i < x.length; i++) {
                    const item = x[i];
                    if (svgBox != item.target) {
                        b = true;
                    }
                }

                if (b) GraphTableSVG.GUI.setSVGBoxSize(svgBox, sizeFunc(), padding);
            }

            _observer = new MutationObserver(observeFunction);
            const option: MutationObserverInit = {
                subtree: true, attributes: true
            };
            _observer.observe(svgBox, option);
        }

        type ObserveSVGSVGInfo = {
            svgsvg: SVGSVGElement;
            visible: boolean;
            padding: Padding;
        }
        let dic: ObserveSVGSVGInfo[] = [];
        let createdObserveSVGSVGTimer = false;
        function resizeSVGSVG(svgBox: SVGSVGElement, padding: GraphTableSVG.Padding) {
            //GraphTableSVG.GUI.setSVGBoxSize(svgBox, new Rectangle(0,0,1000,1000), padding);
            const rect = SVG.getRegion2(svgBox);
            if (rect.width == 0) rect.width = 1;
            if (rect.height == 0) rect.height = 1;
            GraphTableSVG.GUI.setSVGBoxSize(svgBox, rect, padding);
        }
        export function observeSVGSVG(svgBox: SVGSVGElement, padding: GraphTableSVG.Padding = new GraphTableSVG.Padding(0, 0, 0, 0)) {
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
                setTimeout(observeSVGSVGTimer, 500);
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
                        const startTime = performance.now();
                        dispatchResizeEvent(v.svgsvg);
                        const endTime = performance.now();
                        const time = endTime - startTime;
                        console.log("dispatch " + v.svgsvg.id + " : " + time + "ms");

                        const b = v.svgsvg.gtGetAttributeBooleanWithUndefined("g-shrink");
                        if(b !== undefined && b === true)resizeSVGSVG(v.svgsvg, v.padding);
                        v.visible = true;
                    }
                }
            })
            setTimeout(observeSVGSVGTimer, 500);
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
        export function observeChangeElement(){
            var result = document.evaluate("//iframe[@g-src]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for(var i=0; i<result.snapshotLength; i++){
                var node = <HTMLElement>result.snapshotItem(i);
                changeElementDic.push(node);
              }
              if(changeElementDic.length > 0)setTimeout(observeChangeElementTimer, 500);
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
            if(changeElementDic.length > 0)setTimeout(observeChangeElementTimer, 500);
        }

    }
}