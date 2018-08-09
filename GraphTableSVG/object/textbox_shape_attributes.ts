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
    export type PPEdgeAttributes = TextBoxShapeAttributes & {
        startMarker? : boolean,
        endMarker? : boolean, 
        x1? :number,
        x2? : number,
        y1? : number,
        y2? : number, 
        beginVertexID? : string,
        endVertexID? : string,
        beginConnectorType?: ConnectorPosition, 
        endConnectorType?: ConnectorPosition,
        beginVertex? : PPVertexBase,
        endVertex? : PPVertexBase
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
            const type = ShapeObjectType.toShapeObjectType(element.nodeName);
            return createCustomElement(element, type);
        }
    }
    function createCustomElement(e: SVGElement, type : ShapeObjectType): PPTextBoxShapeBase {
        const parent = e.parentElement;
        if (parent instanceof SVGSVGElement) {
            let r : PPTextBoxShapeBase;

            if(type == ShapeObjectType.Callout){
                const option = Callout.constructAttributes(e,true);
                r = new Callout(parent, option);
            }else if(type == ShapeObjectType.ShapeArrowCallout){
                const option = ShapeArrowCallout.constructAttributes(e, true);
                r = new ShapeArrowCallout(parent, option);    
            }else if(type == ShapeObjectType.Ellipse){
                const option = PPTextBoxShapeBase.constructAttributes(e, true);
                r = new PPEllipse(parent, option);    
            }else if(type == ShapeObjectType.Rect){
                const option = PPTextBoxShapeBase.constructAttributes(e, true);
                r = new PPRectangle(parent, option);    
            }else if(type == ShapeObjectType.Line){
                const option = PPEdge.constructAttributes(e, true);
                r = <any>new PPEdge(parent, option);    
            }
            else{
                return null;
            }
            const attrs = e.gtGetAttributes();
            e.remove();
            attrs.forEach((v) => r.svgGroup.setAttribute(v.name, v.value));
            return r;
        } else {
            throw Error("error!");
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