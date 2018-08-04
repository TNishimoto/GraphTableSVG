
type Converter = (value : string | null, binder? : SimpleTwowayBinding) => string;

namespace AttributeFunctions{
    export const bindingIf : string = "n-if";

    export function checkIfFunction(e : HTMLElement) : boolean {

        if(e.hasAttribute(bindingIf)){

            const value = e.getAttribute(bindingIf)!;

            const p = Function("v", `return ${value}(v)`);
            const f = <any>Function("source", "target", `return ${value}(source, target)`);
            const source = getSourceElement(e);
            if(source == null) return true;
            return <boolean>f(source, e);
        }else{
            return true;
        }
    }
    export function getSourceElement(e : HTMLElement) : HTMLElement | null {
        const id = HTMLFunctions.getAncestorAttribute(e,SimpleTwowayBinding.bindSourceID);
        if(id != null){
            return document.getElementById(id);
        }else{
            return null;
        }
    }
    export function isBinderElement(e : HTMLElement) : boolean {
        return e.hasAttribute(SimpleTwowayBinding.bindSourceAttributeName) || e.hasAttribute(SimpleTwowayBinding.bindTargetAttributeName);
    }
}

class SimpleTwowayBinding {
    source: SimpleAttributeObserver;
    target: SimpleAttributeObserver;
    get sourceToTarget() : boolean{
        return this.target.element.getAttribute(SimpleTwowayBinding.sourceToTargetName) == "true";
    }
    set sourceToTarget(value : boolean){
        this.target.element.setAttribute(SimpleTwowayBinding.sourceToTargetName, value ? "true" : "false");
    }

    get targetToSource() : boolean{
        return this.target.element.getAttribute(SimpleTwowayBinding.targetToSourceName) == "true";
    }
    set targetToSource(value : boolean){
        this.target.element.setAttribute(SimpleTwowayBinding.targetToSourceName, value ? "true" : "false");
    }

    static readonly bindTargetAttributeName : string = "n-bind:t-attr";
    static readonly bindSourceAttributeName : string = "n-bind:s-attr";
    static readonly bindSourceStyleName : string = "n-bind:s-style";
    static readonly bindSourceConverterName : string = "n-bind:s-converter";
    static readonly bindTargetConverterName : string = "n-bind:t-converter";
    static readonly bindTargetConverterValueName : string = "n-bind:t-value";

    static readonly bindSourceID : string = "n-bind:s-id";
    static readonly bindSourceXPath : string = "n-bind:s-xpath";

    static readonly sourceToTargetName : string = "n-source-to-target";
    static readonly targetToSourceName : string = "n-target-to-source";

    constructor(obj: { sourceElement?: HTMLElement, targetElement: HTMLElement, watchedTargetAttribute?: string,
        watchedSourceStyle?: string,  sourceValueCongerter? : Converter, targetValueConverter? : Converter, 
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
        if(!obj.targetElement.hasAttribute(SimpleTwowayBinding.bindTargetAttributeName)){
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindTargetAttributeName, "value");
        }


        obj.watchedTargetAttribute = obj.targetElement.getAttribute(SimpleTwowayBinding.bindTargetAttributeName)!;
        obj.watchedSourceAttribute = obj.targetElement.getAttribute(SimpleTwowayBinding.bindSourceAttributeName)!;
        if(obj.targetElement.hasAttribute(SimpleTwowayBinding.bindSourceStyleName)){
            obj.watchedSourceStyle = obj.targetElement.getAttribute(SimpleTwowayBinding.bindSourceStyleName)!;
        }

        if(obj.watchedTargetAttribute == null){
            throw Error(`No ${SimpleTwowayBinding.bindTargetAttributeName}`);            
        }
        if(obj.watchedSourceAttribute == null){
            throw Error(`No ${SimpleTwowayBinding.bindSourceAttributeName}`);            
        }
        /*
        const id = HTMLFunctions.getAncestorAttribute(obj.targetElement,SimpleTwowayBinding.bindSourceID);
        if(id == null){
            throw Error("No ID!");
        }
        obj.sourceElement = document.getElementById(id)!;
        */
        const sourceElement = SimpleTwowayBinding.getSourceElement(obj.targetElement);
        if(sourceElement == null){
            console.log(obj.targetElement);
            throw Error("No Source Element!");
        }

        

        this.target = new SimpleAttributeObserver({element : obj.targetElement, watchedAttribute : obj.watchedTargetAttribute});
        this.source = new SimpleAttributeObserver({element : sourceElement, watchedAttribute : obj.watchedSourceAttribute, watchedStyleName : obj.watchedSourceStyle});
        
        if(!obj.targetElement.hasAttribute(SimpleTwowayBinding.sourceToTargetName)){
            obj.targetElement.setAttribute(SimpleTwowayBinding.sourceToTargetName, "true");
        }
        if(!obj.targetElement.hasAttribute(SimpleTwowayBinding.targetToSourceName)){
            obj.targetElement.setAttribute(SimpleTwowayBinding.targetToSourceName, "true");
        }
        if(obj.targetToSource != undefined) this.targetToSource = obj.targetToSource;
        if(obj.sourceToTarget != undefined) this.sourceToTarget = obj.sourceToTarget;

        this.source.onChanged = this.sourceChangedFunc;
        this.target.onChanged = this.targetChangedFunc;

        if(this.target.element.hasAttribute(SimpleTwowayBinding.bindTargetConverterName)){
            const value = this.target.element.getAttribute(SimpleTwowayBinding.bindTargetConverterName)!;
            const p = Function("v", `return ${value}(v)`);
            this.targetValueConverter = <any>Function("v", "a", "b", `return ${value}(v, a, b)`);
        }
        if(this.target.element.hasAttribute(SimpleTwowayBinding.bindSourceConverterName)){
            const value = this.target.element.getAttribute(SimpleTwowayBinding.bindSourceConverterName)!;
            //this.sourceValueConverter = value;
            this.sourceValueConverter = <any>Function("v", "a", "b", `return ${value}(v, a, b)`);

        }


        this.sourceChangedFunc();
    }
    //private sourceChangedFunc
    private sourceChangedFunc = () => {
        if(this.sourceToTarget){
            if(this.sourceValueConverter != null){
                this.target.watchedAttributeValue = this.sourceValueConverter(this.source.watchedAttributeValue, this);
            }else{
                if(this.target.element instanceof HTMLInputElement && this.target.element.type == "radio"){
                    this.target.element.checked = this.source.watchedAttributeValue == this.target.element.value; 
                }else{
                    this.target.watchedAttributeValue = this.source.watchedAttributeValue;
                }
            }
        }
    }
    private targetChangedFunc = () => {
        if(this.targetToSource){
            if(this.targetValueConverter != null){
                this.source.watchedAttributeValue = this.targetValueConverter(this.target.watchedAttributeValue, this);
            }else{
                if(this.target.element instanceof HTMLInputElement && this.target.element.type == "radio"){
                    if(this.target.element.checked){
                        this.source.watchedAttributeValue = this.target.element.value; 
                    }
                }else{
                    this.source.watchedAttributeValue = this.target.watchedAttributeValue;
                }

            }
        }
    }

    public sourceValueConverter : Converter | null = null;
    public targetValueConverter : Converter | null = null;
    dispose() : void{
        this.source.dispose();
        this.target.dispose();
    }
    

    static autoBind(obj : {targetElement : HTMLElement, bindID? : string}) : SimpleTwowayBinding[] {
        const r : SimpleTwowayBinding[] =[];
        if(obj.bindID != undefined){
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindSourceID, obj.bindID);
        }

        if(AttributeFunctions.checkIfFunction(obj.targetElement)){
            obj.targetElement.style.removeProperty("display");
            //obj.targetElement.style.display = "inline";

            if(AttributeFunctions.isBinderElement(obj.targetElement)){
                const item = new SimpleTwowayBinding({targetElement : obj.targetElement});
                r.push(item);
            }else{

            }
            HTMLFunctions.getChildren(obj.targetElement).forEach((v)=>{
                if(v instanceof HTMLElement){
                this.autoBind({targetElement : v}).forEach((w)=> r.push(w));
                }
            });
        }else{
            obj.targetElement.style.display = "none";
        }
        return r;
    }
    static getSourceElement(target : HTMLElement) : HTMLElement | null {
        const id = HTMLFunctions.getAncestorAttribute(target, SimpleTwowayBinding.bindSourceID);
        const xpath = HTMLFunctions.getAncestorAttribute(target, SimpleTwowayBinding.bindSourceXPath);
        const idElement = id == null ? null : document.getElementById(id); 
        const root = idElement == null ? document.body : idElement;
        if(xpath != null){
            var result = document.evaluate(xpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return <HTMLElement> result.singleNodeValue;
            /*
            if(result.singleNodeValue instanceof HTMLElement){
                return result.singleNodeValue;
            }else{
                return null;
            }
            */

        }else{
            return root;
        }
    }
}
