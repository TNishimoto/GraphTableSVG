namespace GraphTableSVG {
    export namespace CustomAttributeNames{
        export const autoSizeShapeToFitTextName: string = "--autosize-shape-to-fit-text"
        export const beginConnectorTypeName: string = "--begin-connector-type";
        export const endConnectorTypeName: string = "--end-connector-type";
        export const defaultLineClass: string = "--default-line-class";
        export const beginNodeName: string = "data-begin-node";
        export const endNodeName: string = "data-end-node";
        export const controlPointName: string = "data-control-point";
        export const markerStartName: string = "--marker-start";
        export const markerEndName: string = "--marker-end";
        export const defaultVertexClass: string = "--default-vertex-class";
        export const defaultEdgeClass: string = "--default-edge-class";
        export const vertexXIntervalName: string = "--vertex-x-interval";
        export const vertexYIntervalName: string = "--vertex-y-interval";
    }

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
        beginVertex?: GVertex | string,
        endVertex?: GVertex | string,
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
            if(type != null){
                return createCustomElement(element, type);
            }
        }
    }
    function createCustomElement(e: SVGElement, type: ShapeObjectType): GTextBox | null {
        const parent = e.parentElement;
        if (parent instanceof SVGElement) {
            let r: GTextBox;

            if (type == ShapeObjectType.Callout) {
                const option = GCallout.constructAttributes(e, true);
                r = new GCallout(parent, option);
            } else if (type == ShapeObjectType.ShapeArrowCallout) {
                const option = ShapeArrowCallout.constructAttributes(e, true);
                r = new ShapeArrowCallout(parent, option);
            } else if (type == ShapeObjectType.Ellipse) {
                const option = GTextBox.constructAttributes(e, true);
                r = new GEllipse(parent, option);
            } else if (type == ShapeObjectType.Rect) {
                const option = GTextBox.constructAttributes(e, true);
                r = new GRect(parent, option);
            } else if (type == ShapeObjectType.Line) {
                const option = GEdge.constructAttributes(e, true);
                r = <any>new GEdge(parent, option);
            } else if (type == ShapeObjectType.Graph) {
                const option = GTextBox.constructAttributes(e, true);
                r = <any>new GGraph(parent, option);
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
    export function createShape(parent : SVGElement | string | GObject, type : ShapeObjectType, option : any = {}) : GObject {
        let _parent : SVGElement;
        if(parent instanceof GObject){
            _parent = parent.svgGroup;
        }else if(parent instanceof SVGElement){
            _parent = parent;
        }else{
            _parent = <any>document.getElementById(parent);
        }

        switch(type){
            case ShapeObjectType.Callout : return new GCallout(_parent, option);
            case ShapeObjectType.ShapeArrowCallout : return new ShapeArrowCallout(_parent, option);
            case ShapeObjectType.Ellipse : return new GEllipse(_parent, option);
            case ShapeObjectType.Rect : return new GRect(_parent, option);
            case ShapeObjectType.Line : return new GEdge(_parent, option);
            case ShapeObjectType.Graph : return new GGraph(_parent, option);
        }
        throw Error("error");
    }
}