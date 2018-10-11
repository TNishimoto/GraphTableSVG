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
        export function observeSVGSVG(svgBox: SVGSVGElement, padding: GraphTableSVG.Padding = new GraphTableSVG.Padding(5, 5, 5, 5)) {
            let _observer: MutationObserver;
            let observeFunction: MutationCallback = (x: MutationRecord[]) => {
                let b = false;

                for (let i = 0; i < x.length; i++) {
                    const item = x[i];
                    if (svgBox != item.target) {
                        b = true;
                    }
                }

                if (b) {
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
        function observeSVGSVGTimer() {
            dic.forEach((v, i) => {
                const nowVisible = !SVG.isSVGSVGHidden(v.svgsvg);
                if (v.visible) {
                    if (!nowVisible) {
                        v.visible = false;
                    }
                }
                else {
                    if (nowVisible) {
                        dispatchResizeEvent(v.svgsvg);
                        resizeSVGSVG(v.svgsvg, v.padding);
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
    }
}