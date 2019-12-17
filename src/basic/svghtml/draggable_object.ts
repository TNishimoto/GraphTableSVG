import * as SVG from "./svg"
export namespace DraggableObjectFunctions {
    type DragInfo = { target: SVGElement, offsetX: number, offsetY: number, g : SVGGElement, gParentG : SVGGElement | SVGSVGElement }
    let drag: DragInfo | null = null;
    export function draggable(element: SVGElement, g : SVGGElement) {
        element.addEventListener('mousedown', function (e) {
            e.preventDefault();
            //const rect = getContainerRect(g);
            const parent = SVG.getLeastContainer(g);
            if(parent != null){
                const rect = SVG.getAbsolutePosition(g);
                drag = {
                    offsetX : e.clientX - rect.x,
                    offsetY : e.clientY - rect.y,
                    target : element,
                    g : g,
                    gParentG : parent
                }
    
            }

            return false;

        });
    }
    /*
    function getContainerRect(e: SVGElement) {
        const container = SVG.getLeastContainer(e)!;
        const containerRect = container.getBoundingClientRect();
        return containerRect;
    }
    */
    export function appendDragFunctionsToDocument(): void {
        document.onmouseup = function () {
            drag = null;
        }
        document.onmousemove = function (e: any) {
            if (drag != null) {
                if (drag.target != null && drag.target instanceof SVGElement) {
    
                    const g = drag.g!;
                    const containerRect = SVG.getAbsolutePosition(drag.gParentG);
                    const refx = (e.clientX - containerRect.x) - drag.offsetX;
                    const refy =  (e.clientY - containerRect.y) - drag.offsetY; 
                    g.setX( refx  );
                    g.setY( refy  );

                    //drag.target.x.baseVal.value = e.clientX - drag.offsetx;
                    //drag.target.y.baseVal.value = e.clientY - drag.offsety;
                }
            }
        }
    }
}