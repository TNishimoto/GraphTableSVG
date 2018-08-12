namespace GraphTableSVG {
    export type PPObjectAttributes = {
        class?: string,
        cx?: number,
        cy?: number,
        width?: number,
        height?: number,
        id? : string
    }

    export type TextBoxShapeAttributes = PPObjectAttributes & {
        text?: string,
        isAutoSizeShapeToFitText?: boolean
    }
    export type ShapeArrowCalloutAttributes = TextBoxShapeAttributes & {
        arrowHeadWidth?: number,
        arrowHeadHeight?: number,
        arrowNeckWidth?: number,
        arrowNeckHeight?: number,
        direction?: Direction
    }
    export type CalloutAttributes = TextBoxShapeAttributes & {
        speakerX?: number,
        speakerY?: number,
    }
    export type PPEdgeAttributes = TextBoxShapeAttributes & {
        startMarker?: boolean,
        endMarker?: boolean,
        x1?: number,
        x2?: number,
        y1?: number,
        y2?: number,
        beginConnectorType?: ConnectorPosition,
        endConnectorType?: ConnectorPosition,
        beginVertex?: PPVertex | string,
        endVertex?: PPVertex | string,
        pathTextAlignment? : pathTextAlighnment
    }
    export type ConnectOption = {
        outcomingInsertIndex?: number, 
        incomingInsertIndex?: number,
        beginConnectorType?: GraphTableSVG.ConnectorPosition, 
        endConnectorType?: GraphTableSVG.ConnectorPosition
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


    export function openCustomElement(id: string | SVGElement): any {

        if (typeof id == "string") {
            const item = document.getElementById(id);
            if (item instanceof SVGElement) {
                return GraphTableSVG.openCustomElement(item);
            } else {
                return null;
            }
        } else {
            const element = id;
            const type = ShapeObjectType.toShapeObjectType(element.nodeName);
            return createCustomElement(element, type);
        }
    }
    function createCustomElement(e: SVGElement, type: ShapeObjectType): PPTextBox {
        const parent = e.parentElement;
        if (parent instanceof SVGElement) {
            let r: PPTextBox;

            if (type == ShapeObjectType.Callout) {
                const option = Callout.constructAttributes(e, true);
                r = new Callout(parent, option);
            } else if (type == ShapeObjectType.ShapeArrowCallout) {
                const option = ShapeArrowCallout.constructAttributes(e, true);
                r = new ShapeArrowCallout(parent, option);
            } else if (type == ShapeObjectType.Ellipse) {
                const option = PPTextBox.constructAttributes(e, true);
                r = new PPEllipse(parent, option);
            } else if (type == ShapeObjectType.Rect) {
                const option = PPTextBox.constructAttributes(e, true);
                r = new PPRectangle(parent, option);
            } else if (type == ShapeObjectType.Line) {
                const option = PPEdge.constructAttributes(e, true);
                r = <any>new PPEdge(parent, option);
            } else if (type == ShapeObjectType.Graph) {
                const option = PPTextBox.constructAttributes(e, true);
                r = <any>new PPGraph(parent, option);
            }
            else {
                return null;
            }
            const attrs = e.gtGetAttributes();
            HTMLFunctions.getChildren(e).forEach((v) => r.svgGroup.appendChild(v));

            e.remove();
            attrs.forEach((v) => r.svgGroup.setAttribute(v.name, v.value));
            return r;
        } else {
            throw Error("error!");
        }
    }
    export function openSVG(id: string | SVGElement, output: any[] = []): any[] {
        if (typeof id == "string") {
            const item = document.getElementById(id);
            if (item != null && item instanceof SVGSVGElement) {
                return GraphTableSVG.openSVG(item, output);
            } else {
                return [];
            }
        } else {
            const element = id;
            while (true) {
                let b = false;
                HTMLFunctions.getChildren(element).forEach((v) => {
                    if (v instanceof SVGElement) {
                        const p = GraphTableSVG.openCustomElement(v);
                        if (p != null){
                            output.push(p);
                            b = true;
                        }else{
                            openSVG(v, output);
                        }
                    }
                });
                if(!b) break;
            }
            return output;
        }
    }
    export function createShape(parent : SVGElement | string | PPObject, type : ShapeObjectType, option : any = {}) : PPObject {
        let _parent : SVGElement;
        if(parent instanceof PPObject){
            _parent = parent.svgGroup;
        }else if(parent instanceof SVGElement){

        }else{
            _parent = <any>document.getElementById(parent);
        }

        switch(type){
            case ShapeObjectType.Callout : return new Callout(_parent, option);
            case ShapeObjectType.ShapeArrowCallout : return new ShapeArrowCallout(_parent, option);
            case ShapeObjectType.Ellipse : return new PPEllipse(_parent, option);
            case ShapeObjectType.Rect : return new PPRectangle(_parent, option);
            case ShapeObjectType.Line : return new PPEdge(_parent, option);
            case ShapeObjectType.Graph : return new PPGraph(_parent, option);
        }
    }
}