namespace GraphTableSVG {
        

    export type GObjectAttributes = {
        class?: string,
        cx?: number,
        cy?: number,
        x? : number,
        y? : number,
        width?: number,
        height?: number,
        id?: string
    }

    export type GTextBoxAttributes = GObjectAttributes & {
        text?: string,
        isAutoSizeShapeToFitText?: boolean,
        verticalAnchor? : VerticalAnchor,
        horizontalAnchor? : HorizontalAnchor
    }
    export type GShapeArrowCalloutAttributes = GTextBoxAttributes & {
        arrowHeadWidth?: number,
        arrowHeadHeight?: number,
        arrowNeckWidth?: number,
        arrowNeckHeight?: number,
        direction?: Direction
    }
    export type GCalloutAttributes = GTextBoxAttributes & {
        speakerX?: number,
        speakerY?: number,
    }
    export type GEdgeAttributes = GTextBoxAttributes & {
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
        pathTextAlignment?: pathTextAlighnment
    }
    export type CellOption = {
        cellClass?: string, 
        borderClass?: string
    }

    export type ConnectOption = {
        outcomingInsertIndex?: number,
        incomingInsertIndex?: number,
        beginConnectorType?: GraphTableSVG.ConnectorPosition,
        endConnectorType?: GraphTableSVG.ConnectorPosition
    }
    export type TableOption = GObjectAttributes & {
        //tableClassName?: string,
        rowCount?: number,
        columnCount?: number,
        //x?: number,
        //y?: number,
        rowHeight?: number,
        columnWidth?: number,
        table? : LogicTable
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


    export function openCustomElement(id: string | SVGElement): GObject | null {

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
            if (type != null) {
                return createCustomElement(element, type);
            }else{
                return null;
            }
        }
    }
    function createCustomElement(e: SVGElement, type: ShapeObjectType): GObject | null {
        const parent = e.parentElement;
        if (parent instanceof SVGElement) {
            let r: GObject;

            if (type == ShapeObjectType.Callout) {
                const option = GCallout.constructAttributes(e, true);
                r = new GCallout(parent, option);
            } else if (type == ShapeObjectType.ArrowCallout) {
                const option = GArrowCallout.constructAttributes(e, true);
                r = new GArrowCallout(parent, option);
            } else if (type == ShapeObjectType.Ellipse) {
                const option = GTextBox.constructAttributes(e, true);
                r = new GEllipse(parent, option);
            } else if (type == ShapeObjectType.Rect) {
                const option = GTextBox.constructAttributes(e, true);
                r = new GRect(parent, option);
            } else if (type == ShapeObjectType.Edge) {
                const option = GEdge.constructAttributes(e, true);
                r = new GEdge(parent, option);
            } else if (type == ShapeObjectType.Graph) {
                const option = GTextBox.constructAttributes(e, true);
                r = new GGraph(parent, option);
            } else if(type == ShapeObjectType.Table){
                const option = GTable.constructAttributes(e, true);
                r = new GTable(parent, option);
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
    export function openSVG(id: string | SVGElement | null = null, output: GObject[] = [], shrink : boolean = false): GObject[] {
        if (typeof id == "string") {
            const item = document.getElementById(id);
            if (item != null && item instanceof SVGSVGElement) {
                return GraphTableSVG.openSVG(item, output);
            } else {
                return [];
            }
        } else if(id === null){
            const p = document.getElementsByTagName("svg");
            const svgElements : SVGSVGElement[] = [];
            for(let i=0;i<p.length;i++){
                const svgNode = p.item(i);
                if(svgNode instanceof SVGSVGElement) svgElements.push(svgNode);
            }
            svgElements.forEach((v)=> openSVG(v, output));
            return output;
        }
        else {
            const element = id;

            while (true) {
                let b = false;
                HTMLFunctions.getChildren(element).forEach((v) => {
                    console.log(v);
                    console.log(v instanceof Element);

                    if (v instanceof SVGElement) {
                        const p = GraphTableSVG.openCustomElement(v);
                        if (p != null) {
                            output.push(p);
                            b = true;
                        } else {
                            openSVG(v, output);
                        }
                    }
                });
                if (!b) break;
            }

            if(element instanceof SVGSVGElement){
                const sh = element.getAttribute("g-shrink");
                if(sh != null) shrink = sh == "true";
                if(shrink)GraphTableSVG.GUI.observeSVGBox(element, () => GraphTableSVG.Common.getRegion(output), new Padding(0,0,0,0));  
            }
            return output;
        }
    }
    export function createShape(parent: SVGElement | string | GObject, type: ShapeObjectType, option: any = {}): GObject {
        let _parent: SVGElement;
        if (parent instanceof GObject) {
            _parent = parent.svgGroup;
        } else if (parent instanceof SVGElement) {
            _parent = parent;
        } else {
            _parent = <any>document.getElementById(parent);
        }

        switch (type) {
            case ShapeObjectType.Callout: return new GCallout(_parent, option);
            case ShapeObjectType.ArrowCallout: return new GArrowCallout(_parent, option);
            case ShapeObjectType.Ellipse: return new GEllipse(_parent, option);
            case ShapeObjectType.Rect: return new GRect(_parent, option);
            case ShapeObjectType.Edge: return new GEdge(_parent, option);
            case ShapeObjectType.Graph: return new GGraph(_parent, option);
            case ShapeObjectType.Table: return new GTable(_parent, option);

        }
        throw Error("error");
    }
    export function createVertex(parent: GGraph, option: GTextBoxAttributes = {}): GVertex {
        let _parent = parent.svgGroup;
        if (option.class == undefined && parent.defaultVertexClass != null) option.class = parent.defaultVertexClass;
        const type = option.class == undefined ? null : parent.getStyleValue(option.class, CustomAttributeNames.Style.defaultSurfaceType);
        if (type != null) {
            switch (type) {
                case ShapeObjectType.Callout: return new GCallout(_parent, option);
                case ShapeObjectType.ArrowCallout: return new GArrowCallout(_parent, option);
                case ShapeObjectType.Ellipse: return new GEllipse(_parent, option);
                case ShapeObjectType.Rect: return new GRect(_parent, option);
            }
        }
        return new GEllipse(_parent, option);

    }
}