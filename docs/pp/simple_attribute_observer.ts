class SimpleAttributeObserver{
    element: HTMLElement;
    watchedAttributeName: string;
    watchedStyleName: string | undefined;
    
    constructor(obj: { element: HTMLElement, watchedAttribute: string, watchedStyleName? : string}) {
        this.element = obj.element;
        this.watchedAttributeName = obj.watchedAttribute;

        this.watchedStyleName = obj.watchedStyleName;        
        this.element.oninput = this.targetChangeFunc;

        this._observer = new MutationObserver(this.observerFunc);
        const option1: MutationObserverInit = { attributes: true };
        this._observer.observe(this.element, option1);
    }
    public get watchedAttributeValue(): string | null {
        if(this.watchedAttributeName == "style" && this.watchedStyleName != undefined){
            return this.element.style.getPropertyValue(this.watchedStyleName);
        }else{
            return this.element.getAttribute(this.watchedAttributeName);
        }
    }
    public set watchedAttributeValue(value: string | null) {
        if (this.watchedAttributeValue != value) {
            if(this.watchedAttributeName == "style" && this.watchedStyleName != undefined){
                this.element.style.setProperty(this.watchedStyleName, value);                
            }else{
                if (value == null) {
                    this.element.removeAttribute(this.watchedAttributeName);
                } else {
                    this.element.setAttribute(this.watchedAttributeName, value);
                }    
            }
        }

        if(this.element instanceof HTMLInputElement){
            if(this.watchedAttributeName == "value"){
                (<any>this.element).value = value;
            }
            if(this.element.type == "radio" && value != null){
                this.element.setAttribute(this.watchedAttributeName, value);
            }
            if(this.element.type == "checkbox"){
                const b = value == "true" ? true : false;
                this.element.setAttribute(this.watchedAttributeName, b.toString());
                if(this.element.checked != b) this.element.checked = b;
            }
        }
    }
    private _observer: MutationObserver;
    private observerFunc: MutationCallback = (x: MutationRecord[]) => {        
        let b = false;
        for (let i = 0; i < x.length; i++) {
            const p = x[i];
            if (p.attributeName == this.watchedAttributeName) {
                b = true;
            }
        }
        if (b && this.onChanged != null){
            this.onChanged(this);
        }
        
    };
    private targetChangeFunc = () => {        
        if(this.element instanceof HTMLInputElement){
            if(this.element.type == "checkbox"){
                const t = <HTMLInputElement>this.element;
                const value = t.value;
                this.watchedAttributeValue = this.element.checked.toString();    
            }else{
                const t = <HTMLInputElement>this.element;
                const value = t.value;
                this.watchedAttributeValue = value;    
            }
        }
    }
    public onChanged : ((obj? : SimpleAttributeObserver) => void) | null = null;

    public dispose() : void {
        this._observer.disconnect();
    }
}
namespace HTMLFunctions{
    export function getAncestorAttribute(e : HTMLElement, attr : string) : string | null{
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

    export function getDescendants(e : HTMLElement) : HTMLElement[]{
        const r : HTMLElement[] = [];
        r.push(e);
        for(let i=0;i<e.children.length;i++){
            const p = e.children.item(i);
            if(p instanceof HTMLElement){
            getDescendants(p).forEach((v)=>r.push(v));
            }
        }
        return r;
    }
    export function getChildren(e : HTMLElement) : HTMLElement[]{
        const r : HTMLElement[] = [];
        for(let i=0;i<e.children.length;i++){
            const p = e.children.item(i);
            if(p instanceof HTMLElement){
                r.push(p);
            }
        }
        return r;
    }
}