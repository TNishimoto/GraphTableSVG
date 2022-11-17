import { ZObject } from "./z_object";
import * as DefaultClassNames from "../common/default_class_names"
import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"
import { PathTextAlighnment, ConnectorType, msoDashStyle, CoodinateType, EdgeType, Direction } from "../common/enums";
import { escapeWithRound100, nearlyEqual, round100 } from "../common/vline";
import { ZVertex } from "./z_vertex"
import * as ElementExtension from "../interfaces/element_extension"
import * as SVG from "../interfaces/svg"
import { getGraph } from "./graph_helpers/common_functions";
import { tryUpdateAppropriateDashArrayWithUpdateFlag } from "../html/enum_extension";
import * as GOptions from "./z_options"
import { createPath } from "./element_builder"
import { NullError, UndefinedError } from "../common/exceptions";
import { Debugger } from "../common/debugger";
import { IEdge } from "./i_object";
import { HTMLFunctions } from "../html";
import { LocalGObjectManager } from "./global_gobject_manager";
import { ObjectStableFlagName } from "./z_observer";
//import { Direction } from "readline";

export class ZAbstractEdge extends ZObject implements IEdge {
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
    protected createSurface(svgbox: SVGElement, option: GOptions.ZObjectAttributes = {}): void {
        if (option.surfaceClass === undefined) option.surfaceClass = DefaultClassNames.defaultEdgePathClass;
        this._svgSurface = createPath(this.svgGroup, 0, 0, 0, 0, option.surfaceClass, option.surfaceStyle);
    }
    /*
    protected setBasicOption(option: GOptions.ZAbstractEdgeAttributes) {

        super.setBasicOption(option);

        const edgeColor = ElementExtension.getPropertyStyleValue(this.svgPath, "stroke");
        const edgeColor2 = edgeColor == null ? undefined : edgeColor;
        const strokeWidth = ElementExtension.getPropertyStyleValue(this.svgPath, "stroke-width");
        const strokeWidth2 = strokeWidth == null ? undefined : strokeWidth;

        const style = getComputedStyle(this.svgGroup);
        const markerStart = style.getPropertyValue(StyleNames.markerStart);
        const markerEnd = style.getPropertyValue(StyleNames.markerEnd);

        if (markerStart.length != 0) this.markerStart = ZAbstractEdge.createStartMarker({ color: edgeColor2, strokeWidth: strokeWidth2 });
        if (markerEnd.length != 0) this.markerEnd = ZAbstractEdge.createEndMarker({ color: edgeColor2, strokeWidth: strokeWidth2 });

        if (option.x1 !== undefined && option.y1 !== undefined && option.x2 !== undefined && option.y2 !== undefined) {
            this.pathPoints = [[option.x1!, option.y1!], [option.x2!, option.y2!]];
        }


        if (typeof option.beginVertex == "object") {
            if (option.beginVertex instanceof ZVertex) this.beginVertex = option.beginVertex;
        } else if (typeof option.beginVertex == "string") {
            this.beginVertexID = option.beginVertex;
        }

        if (typeof option.endVertex == "object") {
            if (option.endVertex instanceof ZVertex) this.endVertex = option.endVertex;
        } else if (typeof option.endVertex == "string") {
            this.endVertexID = option.endVertex;
        }

    }
    */
    get edgeType(): EdgeType {
        const b = ElementExtension.getPropertyStyleValueWithDefault(this.svgGroup, StyleNames.edgeType, "none");
        if (b == "straight") {
            return "straight";
        } else if (b == "elbow") {
            return "elbow";
        } else if (b == "curve") {
            return "curve";
        } else {
            return "none";
        }
        /*
        if (b == undefined) {
            return false;
        } else {
            return b;
        }
        */
    }


    set edgeType(value: EdgeType) {
        ElementExtension.setPropertyStyleValue(this.svgGroup, StyleNames.edgeType, value);
        //this.svgGroup.setPropertyStyleValue(AttributeNames.Style.autoSizeShapeToFitText, value ? "true" : "false");
    }

    public get svgPath(): SVGPathElement {
        return <SVGPathElement>this.svgSurface;
    }
    public get degree(): number {
        const rad = Math.atan2(this.y2 - this.y1, this.x2 - this.x1);
        const degree = (180 * rad) / Math.PI;
        return degree;
    }

    public get childrenStableFlag() : boolean{        
        const b = this.svgPath.getAttribute(ObjectStableFlagName);
        return b == "true";
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

    public get graph(): ZObject | null {
        return getGraph(this);
    }

    public get beginVertexID(): string | null {
        return this.svgGroup.getAttribute(AttributeNames.beginNodeName);
    }
    protected set beginVertexID(v: string | null) {


        if (v == null) {
            this.svgGroup.removeAttribute(AttributeNames.beginNodeName);
        } else {
            this.svgGroup.setAttribute(AttributeNames.beginNodeName, v);
        }
        
        const svgsvg = HTMLFunctions.getSVGSVGAncestor(this.svgGroup);
        if(svgsvg != null){
            const manager : LocalGObjectManager | undefined = (<any>svgsvg)._manager;
            if(manager != undefined){
                manager.registerBeginVertexID(this, v);
            }
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

    public get endVertexID(): string | null {
        return this.svgGroup.getAttribute(AttributeNames.endNodeName);
    }
    protected set endVertexID(v: string | null) {
        if (v == null) {
            this.svgGroup.removeAttribute(AttributeNames.endNodeName);
        } else {
            this.svgGroup.setAttribute(AttributeNames.endNodeName, v);
        }
        const svgsvg = HTMLFunctions.getSVGSVGAncestor(this.svgGroup);
        if(svgsvg != null){
            const manager : LocalGObjectManager | undefined = (<any>svgsvg)._manager;
            if(manager != undefined){
                manager.registerEndVertexID(this, v);
            }
        }

    }
    /*
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

    private updateDashArray() {

        this.hasConnectedObserverFunction = false;
        const dashStyle = this.msoDashStyle;
        if (dashStyle != null) {
            updateAppropriateDashArray(this.svgPath);
        }
        this.hasConnectedObserverFunction = true;
    }
    */
    /**
     * この辺のテキストがパスに沿って均等に描画される状態ならばTrueを返します。
     */
    public get pathTextAlignment(): PathTextAlighnment {
        const value = ElementExtension.getPropertyStyleValueWithDefault(this.svgGroup, StyleNames.pathTextAlignment, "center");
        return PathTextAlighnment.toPathTextAlighnment(value);
    }
    public set pathTextAlignment(value: PathTextAlighnment) {
        ElementExtension.setPropertyStyleValue(this.svgGroup, StyleNames.pathTextAlignment, value);
    }
    protected get pathPoints(): [number, number][] {
        const dAttr = this.svgPath.getAttribute("d");
        if (dAttr == null) throw Error("error");
        const r: [number, number][] = [];
        if (dAttr.length > 0) {
            const d = dAttr.split(" ");
            let i = 0;

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

                    throw Error("path points parse error/" + dAttr + "/" + dAttr.length);
                }
            }

            return r;
        } else {
            return r;
        }
    }
    protected set pathPoints(points: [number, number][]) {
        points.forEach((v) => {
            if (v[0] === undefined) {
                throw new UndefinedError();
            }
        })
        let path = "";
        if (this.edgeType == "elbow") {
            path += `M ${points[0][0]} ${points[0][1]} `;
            for (let i = 1; i < points.length - 1; i++) {
                path += `L ${points[i][0]} ${points[i][1]} `;
            }
            path += `L ${points[points.length - 1][0]} ${points[points.length - 1][1]}`;

        } else {
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

        }

        const prevPath = this.svgPath.getAttribute("d");
        if (prevPath == null || path != prevPath) {
            this.svgPath.setAttribute("d", path);
        }
    }

    /**
    開始接点を返します。
    */
    get beginVertex(): ZVertex | null {
        if (this.beginVertexID == null) {
            return null;
        } else {
            return <ZVertex>ZObject.getObjectFromIDOrObjectID(this.beginVertexID);
        }
    }
    /**
    開始接点を設定します。
    */
    set beginVertex(value: ZVertex | null) {
        if (value == null) {
            this.beginVertexID = null;
        } else {
            this.beginVertexID = value.objectID;
        }
        //this.update();

    }
    /**
    終了接点を返します。
    */
    get endVertex(): ZVertex | null {
        if (this.endVertexID == null) {
            return null;
        } else {
            return <ZVertex>ZObject.getObjectFromIDOrObjectID(this.endVertexID);
        }
    }
    /**
    終了接点を設定します。
    */
    set endVertex(value: ZVertex | null) {
        if (value == null) {
            this.endVertexID = null;
        } else {
            this.endVertexID = value.objectID;
        }

        //this.update();

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
    get beginConnectorType(): ConnectorType {
        const p = ElementExtension.getPropertyStyleValue(this.svgGroup, StyleNames.beginConnectorType);
        const type = ConnectorType.ToConnectorPosition(p);
        if(type == ConnectorType.Auto){
            if(this.graph != null){
                const dir : Direction | null = (<any>this.graph).direction;
                if(dir != null){
                    if(dir == "up"){
                        return ConnectorType.Top;
                    }else if(dir == "left"){
                        return ConnectorType.Left;
                    }else if(dir == "right"){
                        return ConnectorType.Right;
                    }else{
                        return ConnectorType.Bottom;
                    }
                }else{
                    return type;
                }
            }else{
                return type;
            }
    
        }else{
            return type;
        }

        
    }
    /**
    開始接点の接続位置を設定します。
    */
    set beginConnectorType(value: ConnectorType) {
        ElementExtension.setPropertyStyleValue(this.svgGroup, StyleNames.beginConnectorType, value)
        //this.svgGroup.setAttribute(Edge.beginConnectorTypeName, ToStrFromConnectorPosition(value));
    }
    /**
    終了接点の接続位置を返します。
    */
    get endConnectorType(): ConnectorType {
        const p = ElementExtension.getPropertyStyleValue(this.svgGroup, StyleNames.endConnectorType);
        const type = ConnectorType.ToConnectorPosition(p);
        if(type == ConnectorType.Auto){
            if(this.graph != null){
                const dir : Direction | null = (<any>this.graph).direction;
                if(dir != null){
                    if(dir == "up"){
                        return ConnectorType.Bottom;
                    }else if(dir == "left"){
                        return ConnectorType.Right;
                    }else if(dir == "right"){
                        return ConnectorType.Left;
                    }else{
                        return ConnectorType.Top;
                    }
                }else{
                    return type;
                }
            }else{
                return type;
            }
    
        }else{
            return type;
        }

    }
    /**
    終了接点の接続位置を設定します。
    */
    set endConnectorType(value: ConnectorType) {
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
        marker.id = `marker-${ZAbstractEdge.markerCounter++}`;
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

    private removeVertexEvent(vertex: ZVertex) {
        vertex.svgGroup.removeEventListener(AttributeNames.connectPositionChangedEventName, this.connectPositionChangedFunc);
    }
    private addVertexEvent(vertex: ZVertex) {
        vertex.svgGroup.addEventListener(AttributeNames.connectPositionChangedEventName, this.connectPositionChangedFunc);
    }
    private connectPositionChangedFunc = () => {
        //this.update();
    }

    private tryUpdateConnectorWithUpdateFlag(withUpdate: boolean): boolean {
        let b = false;
        const oldBeginVertex = ZAbstractEdge.getConnectedVertexFromDic(this, true);
        const oldEndVertex = ZAbstractEdge.getConnectedVertexFromDic(this, false);
        if (this.beginVertex != oldBeginVertex) {
            b = true;
            if(!withUpdate){
                Debugger.updateFlagLog(this, this.tryUpdateConnectorWithUpdateFlag, `this.beginVertex != oldBeginVertex`)
                return b;
            }
            if (withUpdate) {
                if (oldBeginVertex != null) {
                    this.removeVertexEvent(oldBeginVertex);
                    if (oldBeginVertex.outgoingEdges.indexOf(this) != -1) {
                        oldBeginVertex.removeOutcomingEdge(this);
                    }
                }

                if (this.beginVertex != null) {
                    this.addVertexEvent(this.beginVertex);
                    if (this.beginVertex.outgoingEdges.indexOf(this) == -1) {
                        this.beginVertex.insertOutcomingEdge(this);
                    }
                }
                ZAbstractEdge.setConnectedVertexFromDic(this, true);

            }
        }
        if (this.endVertex != oldEndVertex) {
            b = true;
            if(!withUpdate){
                Debugger.updateFlagLog(this, this.tryUpdateConnectorWithUpdateFlag, `this.endVertex != oldEndVertex`)
                return b;
            }

            if (withUpdate) {
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
                ZAbstractEdge.setConnectedVertexFromDic(this, false);

            }
        }
        return b;
    }
    private tryUpdateDashArrayWithUpdateFlag(withUpdate: boolean) : boolean{
        let b = false;
        this.hasConnectedObserverFunction = false;
        const dashStyle = this.msoDashStyle;
        if (dashStyle != null) {
            b = tryUpdateAppropriateDashArrayWithUpdateFlag(this.svgPath, withUpdate)
        }
        this.hasConnectedObserverFunction = true;
        return b;
    }
    private updateSurfaceWithUpdateFlag(withUpdate: boolean) : boolean{
        let b = this.tryUpdateDashArrayWithUpdateFlag(withUpdate);

        if(!withUpdate && b){
            Debugger.updateFlagLog(this, this.updateSurfaceWithUpdateFlag, `${this.tryUpdateDashArrayWithUpdateFlag.name}`)
        }
        
        if (this.markerStart != null) {
            var node = <SVGPolygonElement>this.markerStart.firstChild;
            if (this.lineColor != null) {
                const fill = node.getAttribute("fill");
                if(fill != this.lineColor){
                    b = true;
                    
                    if(withUpdate){
                        node.setAttribute("fill", this.lineColor);
                    }else{
                        Debugger.updateFlagLog(this, this.updateSurfaceWithUpdateFlag, "fill != this.lineColor (markerStart)")
                        return b;
                    }
                }
            }
        }
        if (this.markerEnd != null) {
            var node = <SVGPolygonElement>this.markerEnd.firstChild;
            if (this.lineColor != null) {
                const fill = node.getAttribute("fill");
                if(fill != this.lineColor){
                    b = true;
                    if(withUpdate){
                        node.setAttribute("fill", this.lineColor);
                    }else{
                        Debugger.updateFlagLog(this, this.updateSurfaceWithUpdateFlag, "fill != this.lineColor (markerEnd)")
                        return b;
                    }

                }
            }
        }
        return b;

    }
    private updateLocationWithUpdateFlag(withUpdate: boolean) : boolean {
        let b = false;
        const [x1, y1] = this.beginConnectoPosition;
        const [x2, y2] = this.endConnectorPosition;

        const equalFunc = (prevObj : [number, number][], newObj: [number, number][]) : boolean  =>{
            if(prevObj.length != newObj.length){
                return false;
            }else{
                for(let i=0;i<prevObj.length;i++){
                    if(!nearlyEqual(prevObj[i][0], newObj[i][0])){
                        return false;
                    }
                    else if(!nearlyEqual(prevObj[i][1], newObj[i][1])){
                        return false;
                    }

                }
            }
            return true;
        }
        const arrayRound100 = (obj : [number, number][]) =>{
            for(let i = 0;i<obj.length;i++){
                obj[i] = [round100(obj[i][0]), round100(obj[i][1])];
            }
        }

        if (this.edgeType == "elbow") {
            const points: [number, number][] = new Array();
            const elbowPositions = this.elbowCalculator(x1, y1, this.beginConnectorType, x2, y2, this.endConnectorType);
            points.push([x1, y1]);
            elbowPositions.forEach((v) => points.push(v));
            points.push([x2, y2]);
            arrayRound100(points);

            if(!equalFunc(this.pathPoints, points)){
                b = true;
                if(withUpdate){
                    this.pathPoints = points;
                }
            }



        } else if (this.edgeType == "curve") {

        } else {
            const points: [number, number][] = new Array();
            this.pathPoints.forEach((v) => points.push(v));

            points[0] = [x1, y1];
            points[points.length - 1] = [x2, y2];
            arrayRound100(points);


            if(!equalFunc(this.pathPoints, points)){
                b = true;

                if(withUpdate){
                    this.pathPoints = points;
                }
            }

        }
        //if (points[0][0] == undefined) throw new UndefinedError();
        //this.pathPoints = points;

        return b;

    }

    public getUpdateFlag(): boolean {
        const b1 = super.getUpdateFlag();
        if(b1){
            Debugger.updateFlagLog(this, this.getUpdateFlag, `${super.getUpdateFlag.name}`)
        }
        const b2 = this.tryUpdateConnectorWithUpdateFlag(false);
        if(b2){
            Debugger.updateFlagLog(this, this.getUpdateFlag, `${this.tryUpdateConnectorWithUpdateFlag.name}`)
        }

        const b3 = this.updateSurfaceWithUpdateFlag(false);

        if(b3){
            Debugger.updateFlagLog(this, this.getUpdateFlag, `${this.updateSurfaceWithUpdateFlag.name}`)
        }
        const b4 = this.updateLocationWithUpdateFlag(false);
        if(b4){
            Debugger.updateFlagLog(this, this.getUpdateFlag, `${this.updateLocationWithUpdateFlag.name}`)
        }

        return b1 || b2 || b3 || b4;
    }
    public update(): void {
        super.update();
        const b2 = this.tryUpdateConnectorWithUpdateFlag(true);
        const b3 = this.updateSurfaceWithUpdateFlag(true);
        const b4 = this.updateLocationWithUpdateFlag(true);

    }

    /*
    protected updateConnectorInfo() {
        const oldBeginVertex = ZAbstractEdge.getConnectedVertexFromDic(this, true);
        const oldEndVertex = ZAbstractEdge.getConnectedVertexFromDic(this, false);
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
            ZAbstractEdge.setConnectedVertexFromDic(this, true);
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
            ZAbstractEdge.setConnectedVertexFromDic(this, false);
        }
        //if(this.beginVertexID != )
    }
    */
    public get beginConnectoPosition(): [number, number] {
        const [cx1, cy1] = this.beginVertex != null ? [this.beginVertex.cx, this.beginVertex.cy] : [this.x1, this.y1];
        const [cx2, cy2] = this.endVertex != null ? [this.endVertex.cx, this.endVertex.cy] : [this.x2, this.y2];

        const [x1, y1] = this.beginVertex != null ? this.beginVertex.getContactPosition(this.beginConnectorType, cx2, cy2) : [cx1, cy1];
        return [x1, y1];
    }
    public get endConnectorPosition(): [number, number] {
        const [cx1, cy1] = this.beginVertex != null ? [this.beginVertex.cx, this.beginVertex.cy] : [this.x1, this.y1];
        const [cx2, cy2] = this.endVertex != null ? [this.endVertex.cx, this.endVertex.cy] : [this.x2, this.y2];
        const [x2, y2] = this.endVertex != null ? this.endVertex.getContactPosition(this.endConnectorType, cx1, cy1) : [cx2, cy2];
        return [x2, y2];
    }
    protected elbowCalculator(x1: number, y1: number, type1: ConnectorType, x2: number, y2: number, type2: ConnectorType, recursion: number = 0): [number, number][] {
        if (recursion > 6) {
            return [];
        }
        const xgap = Math.abs(x2 - x1) / 2;
        const ygap = Math.abs(y2 - y1) / 2;
        const gap = 30;

        let area: "leftup" | "rightup" | "leftdown" | "rightdown" = "leftup";
        if (x1 < x2) {
            if (y1 < y2) {
                area = "rightdown"
            } else {
                area = "rightup"
            }
        } else {
            if (y1 < y2) {
                area = "leftdown"
            } else {
                area = "leftup"
            }

        }
        const right = area == "rightdown" || area == "rightup";
        const left = area == "leftdown" || area == "leftup";
        const up = area == "rightup" || area == "leftup";
        const down = area == "rightdown" || area == "leftdown";

        if (type1 == ConnectorType.Bottom) {
            const x3 = x1;
            const type3 = right ? ConnectorType.Right : ConnectorType.Left;
            let y3 = 0;

            if (type2 == ConnectorType.Top) {
                if (x1 == x2 && down) {
                    return [];
                } else {
                    y3 = y1 + ygap;
                }
            }
            else if (type2 == ConnectorType.Left) {
                y3 = (area == "rightdown") ? y2 : y1 + gap;
            }
            else if (type2 == ConnectorType.Right) {
                y3 = (area == "leftdown") ? y2 : y1 + ygap;
            } else {
                y3 = down ? y2 + gap : y1 + gap;
            }
            const arr = this.elbowCalculator(x3, y3, type3, x2, y2, type2, recursion + 1);
            arr.unshift([x3, y3]);
            return arr;

        } else if (type1 == ConnectorType.Right) {
            const y3 = y1;
            const type3 = up ? ConnectorType.Top : ConnectorType.Bottom;
            let x3 = 0;
            if (type2 == ConnectorType.Top) {
                x3 = area == "rightdown" ? x2 : x1 + gap;
            }
            else if (type2 == ConnectorType.Bottom) {
                x3 = area == "rightup" ? x2 : x1 + xgap;
            }
            else if (type2 == ConnectorType.Left) {
                if (y1 == y2 && right) {
                    return [];
                } else {
                    x3 = x1 + xgap;
                }
            }
            else {
                x3 = right ? x2 + gap : x1 + gap;
            }
            const arr = this.elbowCalculator(x3, y3, type3, x2, y2, type2, recursion + 1);
            arr.unshift([x3, y3]);
            return arr;

        } else if (type1 == ConnectorType.Left) {
            const y3 = y1;
            const type3 = up ? ConnectorType.Top : ConnectorType.Bottom;
            let x3 = 0;

            if (type2 == ConnectorType.Top) {
                x3 = area == "leftdown" ? x2 : x1 - gap;
            }
            else if (type2 == ConnectorType.Bottom) {
                x3 = area == "leftup" ? x2 : x1 - gap;
            }
            else if (type2 == ConnectorType.Right) {
                if (y1 == y2 && left) {
                    return [];
                } else {
                    x3 = x1 - gap;
                }
            }
            else {
                x3 = right ? x1 - gap : x2 - gap;
            }
            const arr = this.elbowCalculator(x3, y3, type3, x2, y2, type2, recursion + 1);
            arr.unshift([x3, y3]);
            return arr;
        } else {
            const x3 = x1;
            const type3 = right ? ConnectorType.Right : ConnectorType.Left;
            let y3 = 0;

            if (type2 == ConnectorType.Bottom) {
                if (x1 == x2 && up) {
                    return [];
                } else {
                    y3 = y1 - gap;
                }
            }
            else if (type2 == ConnectorType.Left) {
                y3 = (area == "rightup") ? y2 : y1 - gap;
            }
            else if (type2 == ConnectorType.Right) {
                y3 = (area == "leftup") ? y2 : y1 - gap;
            } else {
                //y3 = up ? y2 + gap : y1 - gap;
                y3 = y1 - gap;

            }
            const arr = this.elbowCalculator(x3, y3, type3, x2, y2, type2, recursion + 1);
            arr.unshift([x3, y3]);
            return arr;

        }

    }
    /*
    protected computeElbowPositions() : [number, number][]{
        const [x1, y1] = this.beginConnectoPosition;
        const [x2, y2] = this.endConnectorPosition;

        const arr = this.elbowCalculator(x1,y1, this.beginConnectorType, x2, y2, this.endConnectorType);
        

    }
    */
   /*
    protected updateLocation() {
        const [x1, y1] = this.beginConnectoPosition;
        const [x2, y2] = this.endConnectorPosition;
        const points: [number, number][] = this.pathPoints;

        if (this.edgeType == "elbow") {
            const elbowPositions = this.elbowCalculator(x1, y1, this.beginConnectorType, x2, y2, this.endConnectorType);
            while (points.length > 0) points.pop();
            points.push([x1, y1]);
            elbowPositions.forEach((v) => points.push(v));
            points.push([x2, y2]);

        } else if (this.edgeType == "curve") {

        } else {
            points[0] = [x1, y1];
            points[points.length - 1] = [x2, y2];
        }
        if (points[0][0] == undefined) throw new UndefinedError();
        this.pathPoints = points;

    }
    */
    private static connectedBeginVertexDic: { [key: string]: string; } = {};
    private static connectedEndVertexDic: { [key: string]: string; } = {};
    public static getConnectedVertexFromDic(edge: ZAbstractEdge, isBegin: boolean): ZVertex | null {
        const dic = isBegin ? ZAbstractEdge.connectedBeginVertexDic : ZAbstractEdge.connectedEndVertexDic;
        if (edge.objectID in dic) {
            const id = dic[edge.objectID];
            const obj = ZObject.getObjectFromIDOrObjectID(id);
            if (obj instanceof ZVertex) {
                return obj;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    public static setConnectedVertexFromDic(edge: ZAbstractEdge, isBegin: boolean): void {
        const dic = isBegin ? ZAbstractEdge.connectedBeginVertexDic : ZAbstractEdge.connectedEndVertexDic;
        const id = isBegin ? edge.beginVertexID : edge.endVertexID;
        if (id == null) {
            if (edge.objectID in dic) {
                delete dic[edge.objectID];
            }
        } else {
            dic[edge.objectID] = id;
        }
    }
    static constructAttributes(e: Element, removeAttributes: boolean = false, output: GOptions.ZAbstractEdgeAttributes = {}): GOptions.ZAbstractEdgeAttributes {
        /*
        const style = getComputedStyle(e);
        const markerStart = style.getPropertyValue(StyleNames.markerStart);
        if(markerStart == "true"){
            output.startMarker = true;
        }
        const markerEnd = style.getPropertyValue(StyleNames.markerEnd);
        if(markerEnd == "true"){
            output.endMarker = true;
        }
        */
        ZObject.constructAttributes(e, removeAttributes, output, "center");


        //const _output = <GOptions.ZEdgeAttributes>ZAbstractEdge.constructAttributes(e, removeAttributes, output);
        output.x1 = ElementExtension.gtGetAttributeNumberWithoutNull(e, AttributeNames.x1, 0);
        output.x2 = ElementExtension.gtGetAttributeNumberWithoutNull(e, AttributeNames.x2, 300);
        output.y1 = ElementExtension.gtGetAttributeNumberWithoutNull(e, AttributeNames.y1, 0);
        output.y2 = ElementExtension.gtGetAttributeNumberWithoutNull(e, AttributeNames.y2, 300);


        output.beginVertex = ElementExtension.gtGetAttributeStringWithUndefined(e, AttributeNames.beginVertex);
        output.endVertex = ElementExtension.gtGetAttributeStringWithUndefined(e, AttributeNames.endVertex);
        const bct = ElementExtension.getPropertyStyleValue(e, StyleNames.beginConnectorType);

        if (bct != null && typeof (output.style) == "object") {
            output.style.beginConnectorType = ConnectorType.ToConnectorPosition(bct);
        }
        const ect = ElementExtension.getPropertyStyleValue(e, StyleNames.endConnectorType);
        if (ect != null && typeof (output.style) == "object") {
            output.style.endConnectorType = ConnectorType.ToConnectorPosition(ect);
        }


        //output.startMarker = ElementExtension.gtGetStyleBooleanWithUndefined(e, StyleNames.markerStart);
        //output.endMarker = ElementExtension.gtGetAttributeBooleanWithUndefined(e, StyleNames.markerEnd);

        if (removeAttributes) {
            e.removeAttribute(AttributeNames.x1);
            e.removeAttribute(AttributeNames.x2);

            e.removeAttribute(AttributeNames.y1);
            e.removeAttribute(AttributeNames.y2);

            e.removeAttribute(AttributeNames.beginVertex);
            e.removeAttribute(AttributeNames.endVertex);

        }
        return output;
    }
}