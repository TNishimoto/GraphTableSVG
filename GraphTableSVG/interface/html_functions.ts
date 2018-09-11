namespace HTMLFunctions{
    export function getAncestorAttribute(e : HTMLElement | SVGElement, attr : string) : string | null{
        if(e.hasAttribute(attr)){
            return e.getAttribute(attr);
        }else{
            if(e.parentElement == null){
                return null;
            }else{
                return getAncestorAttribute(e.parentElement, attr);
            }
        }
    }

    export function getDescendants(e : Element) : Element[]{
        const r : Element[] = [];
        r.push(e);
        for(let i=0;i<e.children.length;i++){
            const p = e.children.item(i);
            if(p instanceof Element){
            getDescendants(p).forEach((v)=>r.push(v));
            }
        }
        return r;
    }
    export function getChildren(e : Element) : Element[]{
        const r : Element[] = [];
        for(let i=0;i<e.children.length;i++){
            const p = e.children.item(i);
            if(p instanceof Element){
                r.push(p);
            }
        }
        return r;
    }
    export function getChildByNodeName(e : Element, name : string) : Element | null {
        const p = getChildren(e).filter((v)=>v.nodeName == name);
        if(p.length > 0){
            return p[0];
        }else{
            return null;
        }
    }
}