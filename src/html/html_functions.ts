
import * as GUI from "./gui"
import * as AttributeNames from "../common/attribute_names"
//export namespace HTMLFunctions {
    export enum NodeOrder {
        Preorder, Postorder
    }
    export function getTNodes(e: Element): HTMLElement[] | null {
        const tNodes = <HTMLElement[]>getChildren(e).filter((v) => v.getAttribute(AttributeNames.customElement) == "t");
        if (tNodes.length > 0) {
            tNodes.forEach((v, i) => {
                v.removeAttribute(AttributeNames.customElement);
                if (i > 0 && !v.hasAttribute("newline"))
                    v.setAttribute("newline", "true")
            }
            )
            return tNodes;
        } else {
            return null;
        }
    }
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
    export function copyAttributes(from : Element, to : Element){
        for (let i = 0; i < from.attributes.length; i++) {
            const attr = from.attributes.item(i);
            to.setAttribute(attr!.name, attr!.value);
        }

    }
    /*
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
    */


    export function isShow(e: HTMLElement | SVGElement): boolean {
        const p = e.getBoundingClientRect();
        return !(p.top == 0 && p.left == 0 && p.width == 0 && p.height == 0)

        //return isShow2(e);

    }

    export function getDescendantsByPreorder(e: Element): Element[] {
        const r: Element[] = [];
        r.push(e);
        for (let i = 0; i < e.children.length; i++) {
            const p = e.children.item(i);
            if (p instanceof Element) {
                getDescendantsByPreorder(p).forEach((v) => r.push(v));
            }
        }
        return r;
    }
    export function getDescendantsByPostorder(e: Element): Element[] {
        const r: Element[] = [];
        for (let i = 0; i < e.children.length; i++) {
            const p = e.children.item(i);
            if (p instanceof Element) {
                getDescendantsByPostorder(p).forEach((v) => r.push(v));
            }
        }
        r.push(e);

        return r;
    }


    export function getDescendants(e: Element, order : NodeOrder = NodeOrder.Preorder): Element[] {
        if(order == NodeOrder.Preorder){
            return getDescendantsByPreorder(e);
        }else{
            return getDescendantsByPostorder(e);
        }
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
        const p = getChildren(e).filter((v) => v.nodeName.toLowerCase() == name.toLowerCase());
        if (p.length > 0) {
            return p[0];
        } else {
            return null;
        }
    }
    export function isInsideElement(element : Element) : boolean {
        const win = GUI.getClientRectangle();
        const ele = element.getBoundingClientRect();
        const b1 = ele.left <= win.width && ele.top <= win.height; 
        const b2 = ele.right <= win.width && ele.top <= win.height; 
        const b3 = ele.left <= win.width && ele.bottom <= win.height; 
        const b4 = ele.right <= win.width && ele.bottom <= win.height; 

        return b1 || b2 || b3 || b4;
    }
    export function removeInvisibleCharacters(text : string) : string{
        let prevSpace = true;
        var l = text.split("\n");
        var newContent = l.join('');
        let s = "";
        for (let j = 0; j < newContent.length; j++) {
            const character = newContent[j];
            const value = character.charCodeAt(0);
            
            if (value >= 32 && !(prevSpace && value == 32)) {
                s += character;
            }
            if (value == 32) {
                prevSpace = true;
            } else {
                prevSpace = false;
            }            
        }
        return s;
    }
    export function getSVGSVGAncestor(e: HTMLElement | SVGElement): SVGSVGElement | null {
        const parent = e.parentElement;
        if(parent == null){
            return null;
        }else{
            if(parent instanceof SVGSVGElement){
                return parent;
            }else{
                return getSVGSVGAncestor(parent);
            }
        }

    }
    function getSubAttributeFromAncestorsSub(e: Element, subName : string, output : Map<string,string>) : void {
        const attrs = e.attributes;
        for(let i = 0;i<attrs.length;i++){
            const attr = attrs.item(i)!;
            const ps = attr.name.split("::");
            if(ps.length == 2 && ps[0] == subName){
                if(!output.has(ps[1])){
                    output.set(ps[1], attr.value);
                }
            }
        }
        if(e.parentElement != null){
            getSubAttributeFromAncestorsSub(e.parentElement, subName, output);
        }
    }
    
    export function getSubAttributeFromAncestors(e: Element, subName : string) : Map<string,string> {
        const output : Map<string,string> = new Map();
        getSubAttributeFromAncestorsSub(e, subName, output)
        return output;
    }
    

//}