namespace HTMLFunctions {
    export function getAncestorAttribute(e: HTMLElement | SVGElement, attr: string): string | null {
        if (e.hasAttribute(attr)) {
            return e.getAttribute(attr);
        } else {
            if (e.parentElement == null) {
                return null;
            } else {
                return getAncestorAttribute(e.parentElement, attr);
            }
        }
    }

    function isShow2(e: HTMLElement | SVGElement, isParentWindow : boolean = false): boolean {
        
        const p = isParentWindow ? window.parent.getComputedStyle(e) : window.getComputedStyle(e);
        const disp = p.display;
        const vis = p.visibility;
        if (disp == "none" || vis == "hidden") {
            return false;
        } else {
            const parent = e.parentElement;
            if (parent == null) {
                if(isParentWindow){
                    return true;
                }else{
                    if(window == window.parent){
                        return true;
                    }else{
                        return isShow2(<HTMLElement>window.frameElement, true);
                    }    
                }
            } else {
                return isShow2(parent, isParentWindow);
            }
        }

    }


    export function isShow(e: HTMLElement | SVGElement): boolean {
        return isShow2(e);

    }

    export function getDescendants(e: Element): Element[] {
        const r: Element[] = [];
        r.push(e);
        for (let i = 0; i < e.children.length; i++) {
            const p = e.children.item(i);
            if (p instanceof Element) {
                getDescendants(p).forEach((v) => r.push(v));
            }
        }
        return r;
    }
    export function getChildren(e: Element): Element[] {
        const r: Element[] = [];
        for (let i = 0; i < e.children.length; i++) {
            const p = e.children.item(i);
            if (p instanceof Element) {
                r.push(p);
            }
        }
        return r;
    }
    export function getChildByNodeName(e: Element, name: string): Element | null {
        const p = getChildren(e).filter((v) => v.nodeName == name);
        if (p.length > 0) {
            return p[0];
        } else {
            return null;
        }
    }
    export function isInsideElement(element : Element) : boolean {
        const win = GraphTableSVG.GUI.getClientRectangle();
        const ele = element.getBoundingClientRect();
        const b1 = ele.left <= win.width && ele.top <= win.height; 
        const b2 = ele.right <= win.width && ele.top <= win.height; 
        const b3 = ele.left <= win.width && ele.bottom <= win.height; 
        const b4 = ele.right <= win.width && ele.bottom <= win.height; 

        return b1 || b2 || b3 || b4;
    }

}