
type Converter = (value : string | null, binder? : SimpleTwowayBinding) => string;

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

    static readonly bindTargetAttributeName : string = "g-bind:t-attr";
    static readonly bindSourceAttributeName : string = "g-bind:s-attr";
    static readonly bindSourceStyleName : string = "g-bind:s-style";
    static readonly bindSourceConverterName : string = "g-bind:s-converter";
    static readonly bindTargetConverterName : string = "g-bind:t-converter";

    static readonly bindSourceID : string = "g-bind:s-id";
    static readonly sourceToTargetName : string = "g-source-to-target";
    static readonly targetToSourceName : string = "g-target-to-source";

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

        const id = HTMLFunctions.getAncestorAttribute(obj.targetElement,SimpleTwowayBinding.bindSourceID);
        if(id == null){
            throw Error("No ID!");
        }
        obj.sourceElement = document.getElementById(id)!;

        

        this.target = new SimpleAttributeObserver({element : obj.targetElement, watchedAttribute : obj.watchedTargetAttribute});
        this.source = new SimpleAttributeObserver({element : obj.sourceElement, watchedAttribute : obj.watchedSourceAttribute, watchedStyleName : obj.watchedSourceStyle});
        
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
                this.target.watchedAttributeValue = this.source.watchedAttributeValue;
            }
        }
    }
    private targetChangedFunc = () => {
        if(this.targetToSource){
            if(this.targetValueConverter != null){
                this.source.watchedAttributeValue = this.targetValueConverter(this.target.watchedAttributeValue, this);
            }else{
                this.source.watchedAttributeValue = this.target.watchedAttributeValue;
            }
        }
    }

    public sourceValueConverter : Converter | null = null;
    public targetValueConverter : Converter | null = null;
    dispose() : void{
        this.source.dispose();
        this.target.dispose();
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
