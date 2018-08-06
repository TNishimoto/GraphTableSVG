namespace GraphTableSVG {
    export type TextBoxShapeAttributes = { 
        className?: string, 
        cx?: number, 
        cy?: number, 
        width? : number, 
        height? : number, 
        text?: string, 
        isAutoSizeShapeToFitText?: boolean 
    }
    export type ShapeArrowCalloutAttributes = TextBoxShapeAttributes & {
        arrowHeadWidth? : number,
        arrowHeadHeight? : number,
        arrowNeckWidth? : number,
        arrowNeckHeight? : number,
        direction? : Direction 
    }
    export type CalloutAttributes = TextBoxShapeAttributes & {
        speakerX? : number,
        speakerY? : number,
    }

    /*
    export namespace ShapeAttributes{
        export function constructTextBoxShapeAttributes(e : SVGElement, 
            removeAttributes : boolean = false, output : TextBoxShapeAttributes = {}) : TextBoxShapeAttributes {        
            output.className = e.getAttribute("class")
            output.cx = e.gtGetAttributeNumber("cx", 0);
            output.cy = e.gtGetAttributeNumber("cy", 0);
            output.text = e.getAttribute("text");
            output.width = e.gtGetAttributeNumber("width", 100);
            output.height = e.gtGetAttributeNumber("height", 100);
    
            output.isAutoSizeShapeToFitText = e.getPropertyStyleValueWithDefault(Vertex.autoSizeShapeToFitTextName, "false") == "true";
    
            if(removeAttributes){
                e.removeAttribute("cx");
                e.removeAttribute("cy");
                e.removeAttribute("class");
                e.removeAttribute("text");
                e.removeAttribute("width");
                e.removeAttribute("height");
                e.style.removeProperty(Vertex.autoSizeShapeToFitTextName);
            }
            return output;
        }
        
    }
    */


    export function openCustomElement(id : string | SVGElement) : any {
        
        if(typeof id == "string"){
            const item = document.getElementById(id);
            if(item instanceof SVGElement){
                return GraphTableSVG.openCustomElement(item);
            }else{
                return null;
            }
        }else{
            const element = id;
            const name = element.nodeName
            switch(name){
                case "g-callout" : return Callout.openCustomElement(element);
                case "g-sarrowcallout" : return ShapeArrowCallout.openCustomElement(element);

            }
            return null;
        }
    }
    export function openSVG(id : string | SVGSVGElement) : any[] {
        if(typeof id == "string"){
            const item = document.getElementById(id);
            if(item != null && item instanceof SVGSVGElement){
                return GraphTableSVG.openSVG(item);
            }else{
                return [];
            }
        }else{
            const element = id;
            const r : any[] = [];
            HTMLFunctions.getChildren(element).forEach((v)=>{
                if(v instanceof SVGElement){
                    const p = GraphTableSVG.openCustomElement(v);
                    if(p != null) r.push(p);
                }
            });
            return r;
        }
    }
}