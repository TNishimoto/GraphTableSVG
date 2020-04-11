import { GObject } from "./g_object";
import * as DefaultClassNames from "../common/default_class_names"
import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"
import { PathTextAlighnment, ConnectorPosition, msoDashStyle, CoodinateType } from "../common/enums";
import { escapeWithRound100, round100 } from "../common/vline";
import { GVertex } from "./g_vertex"
import * as ElementExtension from "../interfaces/element_extension"
import * as SVG from "../interfaces/svg"
import { getGraph } from "./graph_helpers/common_functions";
import { setComputedDashArray } from "../html/enum_extension";
import * as GOptions from "./g_options"
import { createPath } from "./element_builder"

export class GAbstractEdge extends GObject {
    constructor(svgbox: SVGElement | string) {
        super(svgbox);

        this.updateAttributes.push(AttributeNames.beginNodeName);
        this.updateAttributes.push(AttributeNames.endNodeName);

        const pathClass = this.svgSurface!.getAttribute("class");
        if (pathClass == DefaultClassNames.defaultSurfaceClass) {
            this.svgSurface!.setAttribute("class", DefaultClassNames.defaultPathSurfaceClass);
        }
        this.svgPath.id = `path-${this.objectID}`;
    }
    protected createSurface(svgbox: SVGElement, option: GOptions.GObjectAttributes = {}): void {
        if (option.surfaceClass === undefined) option.surfaceClass = DefaultClassNames.defaultEdgePathClass;
        this._svgSurface = createPath(this.svgGroup, 0, 0, 0, 0, option.surfaceClass, option.surfaceStyle);
    }
    protected setBasicOption(option: GOptions.GAbstractEdgeAttributes) {

        super.setBasicOption(option);

        const edgeColor = ElementExtension.getPropertyStyleValue(this.svgPath, "stroke");
        const edgeColor2 = edgeColor == null ? undefined : edgeColor;
        const strokeWidth = ElementExtension.getPropertyStyleValue(this.svgPath, "stroke-width");
        const strokeWidth2 = strokeWidth == null ? undefined : strokeWidth;

        if (option.startMarker !== undefined) this.markerStart = GAbstractEdge.createStartMarker({ color: edgeColor2, strokeWidth: strokeWidth2 });
        if (option.endMarker !== undefined) this.markerEnd = GAbstractEdge.createEndMarker({ color: edgeColor2, strokeWidth: strokeWidth2 });

        this.pathPoints = [[option.x1!, option.y1!], [option.x2!, option.y2!]];


        if (typeof option.beginVertex == "object") {
            if (option.beginVertex instanceof GVertex) this.beginVertex = option.beginVertex;
        } else if (typeof option.beginVertex == "string") {
            this.beginVertexID = option.beginVertex;
        }

        if (typeof option.endVertex == "object") {
            if (option.endVertex instanceof GVertex) this.endVertex = option.endVertex;
        } else if (typeof option.endVertex == "string") {
            this.endVertexID = option.endVertex;
        }
    }
    
    public get svgPath(): SVGPathElement {
        return <SVGPathElement>this.svgSurface;
    }
    public get degree(): number {
        const rad = Math.atan2(this.y2 - this.y1, this.x2 - this.x1);
        const degree = (180 * rad) / Math.PI;
        return degree;
    }

    


    /**
     * この辺を廃棄します。廃棄した辺はグラフから取り除かれます。
     */
    public dispose() {
        this.beginVertex = null;
        this.endVertex = null;
    }
    public get coordinateType(): CoodinateType {
        return "group00"
    }
    public get defaultClassName(): string | undefined {
        return DefaultClassNames.defaultEdgeClass;
    }

    public get hasSize(): boolean {
        return false;
    }
    
    public get graph(): GObject | null {
        return getGraph(this);
    }

    protected get beginVertexID(): string | null {
        return this.svgGroup.getAttribute(AttributeNames.beginNodeName);
    }
    protected set beginVertexID(v: string | null) {
        if (v == null) {
            this.svgGroup.removeAttribute(AttributeNames.beginNodeName);
        } else {
            this.svgGroup.setAttribute(AttributeNames.beginNodeName, v);
        }
    }
    /**
     * svgPathのstyle:strokeを返します。
     */
    public get lineColor(): string | null {
        if (this.svgPath != null) {
            return ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "stroke", "black");
        } else {
            return null;
        }
    }

    protected get endVertexID(): string | null {
        return this.svgGroup.getAttribute(AttributeNames.endNodeName);
    }
    protected set endVertexID(v: string | null) {
        if (v == null) {
            this.svgGroup.removeAttribute(AttributeNames.endNodeName);
        } else {
            this.svgGroup.setAttribute(AttributeNames.endNodeName, v);
        }
    }
    protected updateSurface() {
        this.updateDashArray();
        if (this.markerStart != null) {
            var node = <SVGPolygonElement>this.markerStart.firstChild;
            if (this.lineColor != null) {
                node.setAttribute("fill", this.lineColor);
            }
        }
        if (this.markerEnd != null) {
            var node = <SVGPolygonElement>this.markerEnd.firstChild;
            if (this.lineColor != null) {
                node.setAttribute("fill", this.lineColor);
            }
        }


    }

    private updateDashArray(){
        
        this.hasConnectedObserverFunction = false;
        const dashStyle = this.msoDashStyle;
        if (dashStyle != null) {
            setComputedDashArray(this.svgPath);
        }
        this.hasConnectedObserverFunction = true;
    }
    /**
     * この辺のテキストがパスに沿って均等に描画される状態ならばTrueを返します。
     */
    public get pathTextAlignment(): PathTextAlighnment {
        const value = ElementExtension.getPropertyStyleValueWithDefault(this.svgGroup, StyleNames.PathTextAlignment, "center");
        return PathTextAlighnment.toPathTextAlighnment(value);
    }
    public set pathTextAlignment(value: PathTextAlighnment) {
        ElementExtension.setPropertyStyleValue(this.svgGroup, StyleNames.PathTextAlignment, value);
    }
    protected get pathPoints(): [number, number][] {
        const dAttr = this.svgPath.getAttribute("d");
        if (dAttr == null) throw Error("error");
        const d = dAttr.split(" ");
        let i = 0;
        const r: [number, number][] = [];

        while (i < d.length) {
            if (d[i] == "M") {
                r.push([round100(Number(d[i + 1])), round100(Number(d[i + 2]))]);
                i += 3;
            } else if (d[i] == "L") {
                r.push([round100(Number(d[i + 1])), round100(Number(d[i + 2]))]);
                i += 3;
            } else if (d[i] == "Q") {
                r.push([round100(Number(d[i + 1])), round100(Number(d[i + 2]))]);
                r.push([round100(Number(d[i + 3])), round100(Number(d[i + 4]))]);
                i += 5;
            } else {

                throw Error("path points parse error");
            }
        }

        return r;
    }
    protected set pathPoints(points: [number, number][]) {
        let path = "";
        if (points.length == 2) {
            const [x1, y1] = points[0];
            const [x2, y2] = points[1];

            path = escapeWithRound100`M ${x1} ${y1} L ${x2} ${y2}`
        } else if (points.length == 3) {
            const [x1, y1] = points[0];
            const [x2, y2] = points[2];
            const [cx1, cy1] = points[1];
            path = escapeWithRound100`M ${x1} ${y1} Q ${cx1} ${cy1} ${x2} ${y2}`
        } else if (points.length == 1) {
            throw Error("path points ivnalid error");
        }
        else {
            path = escapeWithRound100`M ${0} ${0} L ${0} ${0}`
        }

        const prevPath = this.svgPath.getAttribute("d");
        if (prevPath == null || path != prevPath) {
            this.svgPath.setAttribute("d", path);
        }
    }

    /**
    開始接点を返します。
    */
    get beginVertex(): GVertex | null {
        if (this.beginVertexID == null) {
            return null;
        } else {
            return <GVertex>GObject.getObjectFromObjectID(this.beginVertexID);
        }
    }
    /**
    開始接点を設定します。
    */
    set beginVertex(value: GVertex | null) {
        if (value == null) {
            this.beginVertexID = null;
        } else {
            this.beginVertexID = value.objectID;
        }

        this.update();

    }
    /**
    終了接点を返します。
    */
    get endVertex(): GVertex | null {
        if (this.endVertexID == null) {
            return null;
        } else {
            return <GVertex>GObject.getObjectFromObjectID(this.endVertexID);
        }
    }
    /**
    終了接点を設定します。
    */
    set endVertex(value: GVertex | null) {
        if (value == null) {
            this.endVertexID = null;
        } else {
            this.endVertexID = value.objectID;
        }


        this.update();

    }
    /**
        開始位置のX座標を返します。
        */
    public get x1(): number {
        return this.pathPoints[0][0];
    }
    public set x1(value: number) {
        const p = this.pathPoints;
        p[0][0] = value;
        this.pathPoints = p;
    }
    /**
    開始位置のY座標を返します。
    */
    public get y1(): number {
        return this.pathPoints[0][1];
    }
    public set y1(value: number) {
        const p = this.pathPoints;
        p[0][1] = value;
        this.pathPoints = p;
    }

    /**
    終了位置のX座標を返します。
    */
    public get x2(): number {
        const d = this.pathPoints;
        return d[d.length - 1][0];
    }
    public set x2(value: number) {
        const p = this.pathPoints;
        p[p.length - 1][0] = value;
        this.pathPoints = p;
    }

    /**
    終了位置のY座標を返します。
    */
    public get y2(): number {
        const d = this.pathPoints;
        return d[d.length - 1][1];
    }
    public set y2(value: number) {
        const p = this.pathPoints;
        p[p.length - 1][1] = value;
        this.pathPoints = p;
    }

    /**
    開始接点の接続位置を返します。
    */
    get beginConnectorType(): ConnectorPosition {
        const p = ElementExtension.getPropertyStyleValue(this.svgGroup, StyleNames.beginConnectorType);
        return ConnectorPosition.ToConnectorPosition(p);
    }
    /**
    開始接点の接続位置を設定します。
    */
    set beginConnectorType(value: ConnectorPosition) {
        ElementExtension.setPropertyStyleValue(this.svgGroup, StyleNames.beginConnectorType, value)
        //this.svgGroup.setAttribute(Edge.beginConnectorTypeName, ToStrFromConnectorPosition(value));
    }
    /**
    終了接点の接続位置を返します。
    */
    get endConnectorType(): ConnectorPosition {
        const p = ElementExtension.getPropertyStyleValue(this.svgGroup, StyleNames.endConnectorType);
        return ConnectorPosition.ToConnectorPosition(p);
    }
    /**
    終了接点の接続位置を設定します。
    */
    set endConnectorType(value: ConnectorPosition) {
        ElementExtension.setPropertyStyleValue(this.svgGroup, StyleNames.endConnectorType, value)
    }



    private static markerCounter: number = 0;
    /**
     * 矢印オブジェクトを作成します。
     */
    private static createMark(option: { className?: string, strokeWidth?: string, color?: string, isEnd?: boolean } = {}): SVGMarkerElement {
        var [marker, path] = SVG.createMarker(option);
        if (option.isEnd != undefined && option.isEnd) {
            path.setAttribute("transform", "rotate(180,5,5)");
            marker.setAttribute("refX", "0");
        }
        marker.id = `marker-${GAbstractEdge.markerCounter++}`;
        return marker;
    }
    public static createStartMarker(option: { className?: string, strokeWidth?: string, color?: string } = {}): SVGMarkerElement {
        const option2 = { className: option.className, strokeWidth: option.strokeWidth, color: option.color, isEnd: true };
        return this.createMark(option2);

    }
    public static createEndMarker(option: { className?: string, strokeWidth?: string, color?: string } = {}): SVGMarkerElement {
        return this.createMark(option);
    }
    /**
         * 開始位置の矢印オブジェクトを返します。
         */
    public get markerStart(): SVGMarkerElement | null {
        if (this.svgPath != null) {
            var p = this.svgPath.getAttribute("marker-start");
            if (p != null) {
                const str = p.substring(5, p.length - 1);
                const ele = <SVGMarkerElement><any>document.getElementById(str);
                return ele;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    /**
     * 開始位置の矢印オブジェクトを設定します。
     * @param value 代入するSVGMarkerElementもしくはNull
     */
    public set markerStart(value: SVGMarkerElement | null) {
        if (this.svgPath != null) {
            if (value == null) {
                this.svgPath.removeAttribute("marker-start");
            } else {

                this.svgGroup.appendChild(value);
                this.svgPath.setAttribute("marker-start", `url(#${value.id})`);
            }
        }
    }
    /**
     * 終了位置の矢印オブジェクトを返します。
     */
    public get markerEnd(): SVGMarkerElement | null {
        if (this.svgPath != null) {
            var p = this.svgPath.getAttribute("marker-end");
            if (p != null) {
                const str = p.substring(5, p.length - 1);
                const ele = <SVGMarkerElement><any>document.getElementById(str);
                return ele;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public set markerEnd(value: SVGMarkerElement | null) {
        if (this.svgPath != null) {
            if (value == null) {
                this.svgPath.removeAttribute("marker-end");
            } else {
                this.svgGroup.appendChild(value);
                this.svgPath.setAttribute("marker-end", `url(#${value.id})`);
            }
        }
    }
    public get msoDashStyle(): msoDashStyle | null {
        if (this.svgSurface != null) {
            const dashStyle = ElementExtension.getPropertyStyleValue(this.svgSurface, StyleNames.msoDashStyleName);
            if (dashStyle != null) {
                return msoDashStyle.toMSODashStyle(dashStyle);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    public set msoDashStyle(value: msoDashStyle | null) {
        if (this.svgSurface != null) {
            if (msoDashStyle == null) {
                this.svgSurface.style.removeProperty(StyleNames.msoDashStyleName);
            } else {
                ElementExtension.setPropertyStyleValue(this.svgSurface, StyleNames.msoDashStyleName, value);
            }
        }
    }

    private removeVertexEvent(vertex: GVertex) {
        vertex.svgGroup.removeEventListener(AttributeNames.connectPositionChangedEventName, this.connectPositionChangedFunc);
    }
    private addVertexEvent(vertex: GVertex) {
        vertex.svgGroup.addEventListener(AttributeNames.connectPositionChangedEventName, this.connectPositionChangedFunc);
    }
    private connectPositionChangedFunc = () => {
        this.update();
    }

    protected updateConnectorInfo() {
        const oldBeginVertex = GAbstractEdge.getConnectedVertexFromDic(this, true);
        const oldEndVertex = GAbstractEdge.getConnectedVertexFromDic(this, false);
        if (this.beginVertex != oldBeginVertex) {
            if (oldBeginVertex != null) {

                this.removeVertexEvent(oldBeginVertex);
                if (oldBeginVertex.outcomingEdges.indexOf(this) != -1) {
                    oldBeginVertex.removeOutcomingEdge(this);
                }
            }

            if (this.beginVertex != null) {
                this.addVertexEvent(this.beginVertex);
                if (this.beginVertex.outcomingEdges.indexOf(this) == -1) {
                    this.beginVertex.insertOutcomingEdge(this);
                }
            }
            GAbstractEdge.setConnectedVertexFromDic(this, true);
        }
        if (this.endVertex != oldEndVertex) {
            if (oldEndVertex != null) {
                this.removeVertexEvent(oldEndVertex);
                if (oldEndVertex.incomingEdges.indexOf(this) != -1) {
                    oldEndVertex.removeIncomingEdge(this);
                }
            }

            if (this.endVertex != null) {
                this.addVertexEvent(this.endVertex);
                if (this.endVertex.incomingEdges.indexOf(this) == -1) {
                    this.endVertex.insertIncomingEdge(this);
                }
            }
            GAbstractEdge.setConnectedVertexFromDic(this, false);
        }
        //if(this.beginVertexID != )
    }
    protected updateLocation() {
        const [cx1, cy1] = this.beginVertex != null ? [this.beginVertex.cx, this.beginVertex.cy] : [this.x1, this.y1];
        const [cx2, cy2] = this.endVertex != null ? [this.endVertex.cx, this.endVertex.cy] : [this.x2, this.y2];

        const [x1, y1] = this.beginVertex != null ? this.beginVertex.getLocation(this.beginConnectorType, cx2, cy2) : [cx1, cy1];
        const [x2, y2] = this.endVertex != null ? this.endVertex.getLocation(this.endConnectorType, cx1, cy1) : [cx2, cy2];
        const points: [number, number][] = this.pathPoints;

        points[0] = [x1, y1];
        points[points.length - 1] = [x2, y2];
        this.pathPoints = points;
    }
    private static connectedBeginVertexDic: { [key: string]: string; } = {};
    private static connectedEndVertexDic: { [key: string]: string; } = {};
    public static getConnectedVertexFromDic(edge: GAbstractEdge, isBegin: boolean): GVertex | null {
        const dic = isBegin ? GAbstractEdge.connectedBeginVertexDic : GAbstractEdge.connectedEndVertexDic;
        if (edge.objectID in dic) {
            const id = dic[edge.objectID];
            const obj = GObject.getObjectFromObjectID(id);
            if (obj instanceof GVertex) {
                return obj;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    public static setConnectedVertexFromDic(edge: GAbstractEdge, isBegin: boolean): void {
        const dic = isBegin ? GAbstractEdge.connectedBeginVertexDic : GAbstractEdge.connectedEndVertexDic;
        const id = isBegin ? edge.beginVertexID : edge.endVertexID;
        if (id == null) {
            if (edge.objectID in dic) {
                delete dic[edge.objectID];
            }
        } else {
            dic[edge.objectID] = id;
        }
    }
    static constructAttributes(e: Element, removeAttributes: boolean = false, output: GOptions.GAbstractEdgeAttributes = {}): GOptions.GAbstractEdgeAttributes {
        GObject.constructAttributes(e, removeAttributes, output);


        //const _output = <GOptions.GEdgeAttributes>GAbstractEdge.constructAttributes(e, removeAttributes, output);
        output.x1 = ElementExtension.gtGetAttributeNumberWithoutNull(e, "x1", 0);
        output.x2 = ElementExtension.gtGetAttributeNumberWithoutNull(e, "x2", 300);
        output.y1 = ElementExtension.gtGetAttributeNumberWithoutNull(e, "y1", 0);
        output.y2 = ElementExtension.gtGetAttributeNumberWithoutNull(e, "y2", 300);

        output.beginVertex = ElementExtension.gtGetAttributeStringWithUndefined(e, "begin-vertex");
        output.endVertex = ElementExtension.gtGetAttributeStringWithUndefined(e, "end-vertex");
        const bct = ElementExtension.getPropertyStyleValue(e, StyleNames.beginConnectorType);

        if (bct != null && typeof (output.style) == "object") {
            output.style.beginConnectorType = ConnectorPosition.ToConnectorPosition(bct);
        }
        const ect = ElementExtension.getPropertyStyleValue(e, StyleNames.endConnectorType);
        if (ect != null && typeof (output.style) == "object") {
            output.style.endConnectorType = ConnectorPosition.ToConnectorPosition(ect);
        }


        output.startMarker = ElementExtension.gtGetStyleBooleanWithUndefined(e, StyleNames.markerStart);
        output.endMarker = ElementExtension.gtGetAttributeBooleanWithUndefined(e, StyleNames.markerEnd);

        if (removeAttributes) {
            e.removeAttribute("x1");
            e.removeAttribute("x2");

            e.removeAttribute("y1");
            e.removeAttribute("y2");

            e.removeAttribute("begin-vertex");
            e.removeAttribute("end-vertex");

        }
        return output;
    }
}