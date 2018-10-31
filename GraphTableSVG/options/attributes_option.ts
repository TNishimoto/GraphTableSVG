namespace GraphTableSVG {


    export type GObjectAttributes = {
        //class?: string,
        cx?: number,
        cy?: number,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        id?: string,
        groupClass?: string,
        surfaceClass?: string,
        groupStyle?: string,
        surfaceStyle?: string

    }
    export type GObjectMaps = {
        groupAttributes?: Map<string, string>;
        surfaceAttributes?: Map<string, string>;
        textAttributes?: Map<string, string>;
    }

    export type _GTextBoxAttribute = {
        text?: string | HTMLElement[],
        isAutoSizeShapeToFitText?: boolean,
        verticalAnchor?: VerticalAnchor,
        horizontalAnchor?: HorizontalAnchor
        textClass?: string
        textStyle?: string
    }
    export type GTextBoxAttributes = GObjectAttributes & _GTextBoxAttribute

    export type _GShapeArrowCalloutAttributes = {
        arrowHeadWidth?: number,
        arrowHeadHeight?: number,
        arrowNeckWidth?: number,
        arrowNeckHeight?: number,
        direction?: Direction
    }

    export type GShapeArrowCalloutAttributes = GTextBoxAttributes & _GShapeArrowCalloutAttributes
    export type GCalloutAttributes = GTextBoxAttributes & {
        speakerX?: number,
        speakerY?: number,
    }
    export type _GEdgeAttributes = {
        startMarker?: boolean,
        endMarker?: boolean,
        x1?: number,
        x2?: number,
        x3?: number,

        y1?: number,
        y2?: number,
        y3?: number,

        beginConnectorType?: ConnectorPosition,
        endConnectorType?: ConnectorPosition,
        beginVertex?: GVertex | string,
        endVertex?: GVertex | string,
        pathTextAlignment?: PathTextAlighnment
    }
    export type GEdgeAttributes = GTextBoxAttributes & _GEdgeAttributes
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
    export type _GTableOption = {
        rowCount?: number,
        columnCount?: number,
        rowHeight?: number,
        columnWidth?: number,
        table?: LogicTable
    }
    export type GTableOption = GObjectAttributes & _GTableOption;

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

    export namespace openSVGFunctions {
        export function getTNodes(e: Element): HTMLElement[] | null {
            const tNodes = <HTMLElement[]>HTMLFunctions.getChildren(e).filter((v) => v.getAttribute(CustomAttributeNames.customElement) == "t");
            if (tNodes.length > 0) {
                tNodes.forEach((v, i) => {
                    v.removeAttribute(CustomAttributeNames.customElement);
                    if (i > 0 && !v.hasAttribute("newline"))
                        v.setAttribute("newline", "true")
                }
                )
                return tNodes;
            } else {
                return null;
            }
        }
    }
    function isGCustomElement(element: SVGElement): boolean {
        const gObjectTypeAttr = element.getAttribute(CustomAttributeNames.customElement);

        if (gObjectTypeAttr != null) {
            const gObjectType = ShapeObjectType.toShapeObjectType(gObjectTypeAttr);
            return gObjectType != null;
        } else {
            return false;
        }

    }
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
            //const shapeType = GraphTableSVG.ShapeObjectType.toShapeObjectType(element.nodeName);
            const gObjectTypeAttr = element.getAttribute(CustomAttributeNames.customElement);
            if (gObjectTypeAttr != null) {
                const gObjectType = ShapeObjectType.toShapeObjectType(gObjectTypeAttr);
                if (gObjectType != null) {
                    return createCustomElement(element, gObjectType);
                } else {
                    return null;
                }
            } else {
                const type = ShapeObjectType.toShapeObjectType(element.nodeName);

                if (type != null) {
                    return createCustomElement(element, type);
                } else {
                    return null;
                }

            }
        }
    }
    function createCustomElement(e: Element, type: ShapeObjectType): GObject | null {
        const parent = e.parentElement;
        if (parent instanceof SVGElement) {
            let r: GObject;

            e.removeAttribute(CustomAttributeNames.customElement);
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
                //throw Error("error");


            } else if (type == ShapeObjectType.Edge) {
                const option = GEdge.constructAttributes(e, true);
                r = new GEdge(parent, option);
            } else if (type == ShapeObjectType.Graph) {
                const option = GTextBox.constructAttributes(e, true);
                r = new GGraph(parent, option);
            } else if (type == ShapeObjectType.Table) {
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
    let timerInterval = 100;
    export function lazyOpenSVG() {
        const p = document.getElementsByTagName("svg");
        const svgElements: SVGSVGElement[] = [];
        for (let i = 0; i < p.length; i++) {
            const svgNode = p.item(i);
            if (svgNode instanceof SVGSVGElement) svgElements.push(svgNode);
        }
        svgElements.forEach((svgsvg) => lazyElementDic.push(svgsvg));
        if(lazyElementDic.length > 0)setTimeout(observelazyElementTimer, timerInterval);

    }
    let lazyElementDic: SVGSVGElement[] = [];
    function observelazyElementTimer() {
        for(let i=0;i<lazyElementDic.length;i++){
            const element = lazyElementDic[i];

            if(HTMLFunctions.isInsideElement(element)){
                openSVG(element);
                lazyElementDic.splice(i, 1);
                i=-1;
                
            }

        }
        if(lazyElementDic.length > 0)setTimeout(observelazyElementTimer, timerInterval);
    }



    export function openSVG(id: string, output?: GObject[]): GObject[];
    export function openSVG(element: Element, output?: GObject[]): GObject[];
    export function openSVG(empty: null, output?: GObject[]): GObject[];
    export function openSVG(svgsvg: SVGSVGElement, output?: GObject[]): GObject[];
    export function openSVG(inputItem: string | Element | null = null, output: GObject[] = []): GObject[] {
        if (typeof inputItem == "string") {
            const item = document.getElementById(inputItem);
            if (item != null && item instanceof SVGSVGElement) {
                return GraphTableSVG.openSVG(item, output);
            } else {
                return [];
            }
        } else if (inputItem === null) {
            const p = document.getElementsByTagName("svg");
            const svgElements: SVGSVGElement[] = [];
            for (let i = 0; i < p.length; i++) {
                const svgNode = p.item(i);
                if (svgNode instanceof SVGSVGElement) svgElements.push(svgNode);
            }
            svgElements.forEach((svgsvg) => openSVG(svgsvg, output));
            return output;
        } else if (inputItem instanceof SVGSVGElement) {
            
            const svgsvg: SVGSVGElement = inputItem;
            HTMLFunctions.getDescendants(svgsvg).forEach(v => {
                const shapeType = GraphTableSVG.ShapeObjectType.toShapeObjectType(v.nodeName);
                if (shapeType != null) {
                    toHTMLUnknownElement(v);
                }
            })
            const startTime = performance.now();

            HTMLFunctions.getDescendantsByPostorder(svgsvg).forEach((v) => {
                if(v instanceof SVGElement){
                    if(isGCustomElement(v)){
                        const p = GraphTableSVG.openCustomElement(v);
                        if (p != null) {
                            output.push(p);
                        }
                    }
    
                }
            })
            const endTime = performance.now();
            const time = endTime - startTime;
            console.log("create " + svgsvg.id + " : " + time + "ms");

            GraphTableSVG.GUI.observeSVGSVG(svgsvg);
        } else {
            throw Error("errror");
        }
        return output;

    }
    export function createShape(parent: SVGElement | string | GObject, type: "g-rect", option?: GTextBoxAttributes): GRect
    export function createShape(parent: SVGElement | string | GObject, type: "g-edge", option?: GEdgeAttributes): GEdge
    export function createShape(parent: SVGElement | string | GObject, type: "g-ellipse", option?: GTextBoxAttributes): GEllipse
    export function createShape(parent: SVGElement | string | GObject, type: "g-callout", option?: GTextBoxAttributes): GCallout
    export function createShape(parent: SVGElement | string | GObject, type: "g-arrow-callout", option?: GTextBoxAttributes): GArrowCallout
    export function createShape(parent: SVGElement | string | GObject, type: "g-graph", option?: GTextBoxAttributes): GGraph
    export function createShape(parent: SVGElement | string | GObject, type: "g-table", option?: GTableOption): GTable
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
        if (option.groupClass == undefined && parent.defaultVertexClass != null) option.groupClass = parent.defaultVertexClass;
        const type = option.groupClass == undefined ? null : parent.getStyleValue(option.groupClass, CustomAttributeNames.Style.defaultSurfaceType);
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
    export function toHTMLUnknownElement(e: Element) {
        const type = ShapeObjectType.toShapeObjectTypeOrCustomTag(e.nodeName);

        if (type == null) {

        } else {
            const ns = document.createElementNS('http://www.w3.org/2000/svg', "g");
            ns.setAttribute(CustomAttributeNames.customElement, e.nodeName);
            for (let i = 0; i < e.attributes.length; i++) {
                const attr = e.attributes.item(i);
                ns.setAttribute(attr!.name, attr!.value);
            }
            ns.innerHTML = e.innerHTML;
            //HTMLFunctions.getChildren(e).forEach((v)=>ns.appendChild(v));
            const p = e.parentElement;
            if (p != null) {
                p.insertBefore(ns, e);
                e.remove();
            }
            const children = HTMLFunctions.getChildren(ns);
            children.forEach((v) => toHTMLUnknownElement(v));
        }
    }
}