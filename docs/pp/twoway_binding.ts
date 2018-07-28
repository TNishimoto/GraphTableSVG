
class SimpleAttributeObserver{
    element: HTMLElement;
    watchedAttributeName: string;
    
    constructor(obj: { element: HTMLElement, watchedAttribute: string}) {
        this.element = obj.element;
        this.watchedAttributeName = obj.watchedAttribute;

        
        this.element.oninput = this.targetChangeFunc;

        this._sourceObserver = new MutationObserver(this.sourceObserverFunc);
        const option1: MutationObserverInit = { attributes: true };
        this._sourceObserver.observe(this.element, option1);
    }
    public get watchedAttribute(): string | null {
        return this.element.getAttribute(this.watchedAttributeName);
    }
    public set watchedAttribute(value: string | null) {
        if (this.watchedAttribute != value) {
            if (value == null) {
                this.element.removeAttribute(this.watchedAttributeName);
            } else {
                this.element.setAttribute(this.watchedAttributeName, value);
            }
        }

        if(this.element.nodeName == "INPUT" && this.watchedAttributeName == "value"){
            (<any>this.element).value = value;
        }
    }
    private _sourceObserver: MutationObserver;
    private sourceObserverFunc: MutationCallback = (x: MutationRecord[]) => {        
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
        if (this.element.nodeName == "INPUT") {
            const t = <HTMLInputElement>this.element;
            const value = t.value;
            this.watchedAttribute = value;
        }
    }
    public onChanged : ((obj? : SimpleAttributeObserver) => void) | null = null;
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
}

class SimpleTwowayBinding {
    source: SimpleAttributeObserver;
    target: SimpleAttributeObserver;
    sourceToTarget : boolean;
    targetToSource : boolean;

    static readonly bindTargetAttributeName : string = "g-bind:t-attr";
    static readonly bindSourceAttributeName : string = "g-bind:s-attr";
    static readonly bindSourceID : string = "g-bind:s-id";
    constructor(obj: { sourceElement?: HTMLElement, targetElement: HTMLElement, watchedTargetAttribute?: string, 
        watchedSourceAttribute?: string, sourceToTarget? : boolean, targetToSource? : boolean  }) {
        
        if(obj.watchedSourceAttribute != undefined){
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindSourceAttributeName, obj.watchedSourceAttribute);
        }
        if(obj.watchedTargetAttribute != undefined){
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindTargetAttributeName, obj.watchedTargetAttribute);
        }
        if(obj.sourceElement != undefined){
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindSourceID, obj.targetElement.getAttribute("id")!);
        }
        obj.watchedTargetAttribute = obj.targetElement.getAttribute(SimpleTwowayBinding.bindTargetAttributeName)!;
        obj.watchedSourceAttribute = obj.targetElement.getAttribute(SimpleTwowayBinding.bindSourceAttributeName)!;
        if(obj.watchedTargetAttribute == null){
            throw Error(`No ${SimpleTwowayBinding.bindTargetAttributeName}`);            
        }
        if(obj.watchedSourceAttribute == null){
            throw Error(`No ${SimpleTwowayBinding.bindSourceAttributeName}`);            
        }

        const id = HTMLFunctions.getAncestorAttribute(obj.targetElement,SimpleTwowayBinding.bindSourceID);
        if(id == null){
            throw Error("No ID!");
        }
        obj.sourceElement = document.getElementById(id)!;
        
        this.target = new SimpleAttributeObserver({element : obj.targetElement, watchedAttribute : obj.watchedTargetAttribute});
        this.source = new SimpleAttributeObserver({element : obj.sourceElement, watchedAttribute : obj.watchedSourceAttribute});
        
        this.sourceToTarget = true;
        this.targetToSource = true;
        if(obj.targetToSource != undefined) this.targetToSource = obj.targetToSource;
        if(obj.sourceToTarget != undefined) this.sourceToTarget = obj.sourceToTarget;

        this.source.onChanged = this.sourceChangedFunc;
        this.target.onChanged = this.targetChangedFunc;

        this.sourceChangedFunc();
    }

    sourceChangedFunc = () => {
        if(this.sourceToTarget){
        this.target.watchedAttribute = this.source.watchedAttribute;
        }
    }
    targetChangedFunc = () => {
        if(this.targetToSource){
        this.source.watchedAttribute = this.target.watchedAttribute;
        }
    }
    dispose() : void{

    }
    static isBinderElement(e : HTMLElement) : boolean {
        return e.hasAttribute(SimpleTwowayBinding.bindSourceAttributeName) || e.hasAttribute(SimpleTwowayBinding.bindTargetAttributeName);
    }

    static autoBind(obj : {targetElement : HTMLElement, bindID? : string}) : SimpleTwowayBinding[] {
        if(obj.bindID != undefined){
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindSourceID, obj.bindID);
        }
        return HTMLFunctions.getDescendants(obj.targetElement).filter((v)=>SimpleTwowayBinding.isBinderElement(v)).map((v)=>new SimpleTwowayBinding({targetElement : v}));
    }
}
