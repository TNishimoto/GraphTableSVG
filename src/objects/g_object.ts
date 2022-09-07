//namespace GraphTableSVG {
import * as CommonFunctions from "../common/common_functions"
import * as GUIObserver from "../html/gui_observer"
import { Rectangle, PositionType, round100, nearlyEqual } from "../common/vline"
import { CoodinateType } from "../common/enums"

import * as SVG from "../interfaces/svg"
import * as HTMLFunctions from "../html/html_functions"
import * as CSS from "../html/css"
import { DraggableObjectFunctions } from "../html/draggable_object"
import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names"
import * as DefaultClassNames from "../common/default_class_names"
import { ShapeObjectType } from "../common/enums";
import * as  GOptions from "./g_options";
import * as ElementExtension from "../interfaces/element_extension"
import * as SVGGExtension from "../interfaces/svg_g_extension"
import * as GObserver from "./g_observer"





export type GObjectMaps = {
    groupAttributes?: Map<string, string>;
    surfaceAttributes?: Map<string, string>;
    textAttributes?: Map<string, string>;
}
export class GObject {

    protected _svgSurface: SVGElement | null = null;
    protected _tag: any;
    private _svgGroup: SVGGElement;
    protected _observer: MutationObserver;
    private _observerOption: MutationObserverInit;


    public constructor(svgbox: SVGElement | string) {
        CSS.setGraphTableCSS();
        let parentElement: SVGElement = svgbox instanceof SVGElement ? svgbox : <any>document.getElementById(svgbox);
        if (parentElement instanceof SVGSVGElement && !GUIObserver.isObserved(parentElement)) {
            GUIObserver.observeSVGSVG(parentElement);
        }
        this._svgGroup = SVG.createGroup(parentElement);

        /*
        GOptions.setClassAndStyle(this._svgGroup, option.class, option.style);
        if(option.attributes !== undefined){
            Object.keys(option.attributes).forEach((v) =>{
                const value : string = option.attributes![v];
                this._svgGroup.setAttribute(v, value);
            })
        }
        */

        GObject.setObjectFromObjectID(this);

        (this.svgGroup as any).operator = this;



        this.svgGroup.setAttribute(AttributeNames.GroupAttribute, this.type);
        this.createSurface(parentElement);

        this._observer = new MutationObserver(this.observerFunc);
        this._observerOption = { attributes: true, childList: true, subtree: true };
        this.hasConnectedObserverFunction = true;

        this.dispatchObjectCreatedEvent();
        this.addResizeEvent();


        const __svg = <any>this.svgGroup
        __svg.operator = this;

        this.allowHover = true;

        this.unstableCounter = GObserver.unstableCounterDefault;

        const svgsvgAncestor = HTMLFunctions.getSVGSVGAncestor(this.svgGroup);
        if (svgsvgAncestor instanceof SVGSVGElement) {
            GObserver.registerGObject(svgsvgAncestor, this, this.objectID)

        }



        //console.log("set/" + this.allowHover)

        //this.setOptionInGObject(option);

        /*
        if (_option.x !== undefined) this.fixedX = _option.x;
        if (_option.y !== undefined) this.fixedY = _option.y;
        */
        if (this.type == ShapeObjectType.Object) this.firstFunctionAfterInitialized();

    }

    /*
    public setUnstableFlag() : void {
        this.isStable = false;
    }
    */

    public get unstableCounter(): number | null {
        const p = this.svgGroup.getAttribute(GObserver.unstableCounterName);
        if (p == null) {
            return null;
        } else {
            const num = Number(p);
            return num;
        }
    }
    protected set unstableCounter(value: number | null) {
        if (value == null) {
            this.svgGroup.removeAttribute(GObserver.unstableCounterName)
        } else {
            this.svgGroup.setAttribute(GObserver.unstableCounterName, value.toString());

        }
    }
    public resetUnstableCounter(): void {
        this.unstableCounter = GObserver.unstableCounterDefault;
    }


    protected setBasicOption(option: GOptions.GObjectAttributes): void {

        GOptions.setClassAndStyle(this._svgGroup, option.class, option.style);

        if (option.attributes !== undefined) {
            Object.keys(option.attributes).forEach((v) => {
                const value: string = option.attributes![v];
                this._svgGroup.setAttribute(v, value);
            })
        }
        if (typeof option.id !== "undefined") this.svgGroup.id = option.id;
    }
    protected setOptionalSize(option: GOptions.GObjectAttributes) {
        if (this.svgSurface !== null) {
            GOptions.setClassAndStyle(this.svgSurface, option.surfaceClass, option.surfaceStyle)
        }

        this.width = (option.width !== undefined ? option.width : 25);
        this.height = (option.height !== undefined ? option.height : 25);
    }

    protected setOptionalPosition(option: GOptions.GObjectAttributes) {

        if (option.position !== undefined) {
            if (option.position.type == "center") {
                this.positionType = PositionType.Center;
                this.cx = option.position.x;
                this.cy = option.position.y;
            } else {

                this.positionType = PositionType.UpperLeft;
                this.setVirtualXY(option.position.x, option.position.y);
                //this.x = option.position.x;
                //this.y = option.position.y;

            }
        } else {
            this.positionType = PositionType.Center;
            this.__cx = 0;
            this.__cy = 0;

        }
    }
    public setOption(option: GOptions.GObjectAttributes) {
        this.setBasicOption(option);
        this.setOptionalSize(option);
        this.setOptionalPosition(option)

        this.resetUnstableCounter();
        //this.update();
    }


    /*
    public get shape() : ShapeObjectType {
        return ShapeObjectType.Object;
    }
    */
    private _isInitialized = false;
    private __x: number | undefined;
    private __y: number | undefined;
    private __cx: number | undefined;
    private __cy: number | undefined;

    protected disconnectObserverFunction() {
        this._observer.disconnect();
    }
    protected connectObserverFunction() {
        this._observer.observe(this.svgGroup, this._observerOption);
    }
    private _hasConnectedObserverFunction: boolean = false;
    protected get hasConnectedObserverFunction(): boolean {
        return this._hasConnectedObserverFunction;
    }
    protected set hasConnectedObserverFunction(b: boolean) {
        if (this._hasConnectedObserverFunction != b) {
            if (b) {
                this.connectObserverFunction();
            } else {
                this.disconnectObserverFunction();
            }
            this._hasConnectedObserverFunction = b;
        }
    }

    public get coordinateType(): CoodinateType {
        return "object-center"
    }

    public get defaultClassName(): string | undefined {
        return undefined;
    }
    protected get isInitialized(): boolean {
        return this._isInitialized
    }
    protected firstFunctionAfterInitialized() {
        if (this._isInitialized) {
            throw new Error("This function is already called");
        }
        this._isInitialized = true;

        //this.update();
        this.resetUnstableCounter();
        if (this.__cx !== undefined) this.cx = this.__cx;
        if (this.__cy !== undefined) this.cy = this.__cy;

        if (this.__x !== undefined) this.x = this.__x;
        if (this.__y !== undefined) this.y = this.__y;
    }

    protected groupObserverOption: MutationObserverInit = { attributes: true, childList: true, subtree: true };

    private removeResizeEvent() {
        this.svgGroup.removeEventListener(AttributeNames.resizeName, this.pUpdateFunc);
    }
    private addResizeEvent() {
        this.svgGroup.addEventListener(AttributeNames.resizeName, this.pUpdateFunc);
    }
    private pUpdateFunc = () => {
        if (!this.isShown) return;
        this.resizeUpdate();
    }
    /*
    private addOnLoadEvent() {
        this.svgGroup.onload = this.onLoadFunction;
        //this.svgGroup.addEventListener("load", this.onLoadFunction);
    }

    private removeOnLoadEvent() {
        
        this.svgGroup.removeEventListener("load", this.onLoadFunction);
    }
    protected onLoadFunction = () => {
    }
    */

    protected firstResizeUpdate() {

    }
    /*
    protected _isLoaded = false;
    public get isLoaded(){
        return this._isLoaded;
    }
    */

    protected resizeUpdate() {
        this.resetUnstableCounter();
        //this.update();
    }

    static constructAttributes(e: Element,
        removeAttributes: boolean = false, output: GOptions.GObjectAttributes = {}, defaultPositionType : "center" | "upper-left" ): GOptions.GObjectAttributes {
        output.class = ElementExtension.gtGetAttributeStringWithUndefined(e, AttributeNames.className);
        if (output.class === undefined) ElementExtension.gtGetAttributeStringWithUndefined(e, AttributeNames.className);
        output.surfaceClass = ElementExtension.gtGetInheritedAttributeString(e, AttributeNames.surfaceClassName);
        output.surfaceStyle = ElementExtension.gtGetInheritedAttributeString(e, AttributeNames.surfaceStyle);

        output.style = ElementExtension.gtGetAttributeStringWithUndefined(e, AttributeNames.style);
        if (e.hasAttribute(AttributeNames.style)) output.style = ElementExtension.gtGetAttributeStringWithUndefined(e, AttributeNames.style);

        const cx = ElementExtension.gtGetAttributeNumberWithUndefined(e, AttributeNames.cx);
        const cy = ElementExtension.gtGetAttributeNumberWithUndefined(e, AttributeNames.cy);
        const x = ElementExtension.gtGetAttributeNumberWithUndefined(e, AttributeNames.x);
        const y = ElementExtension.gtGetAttributeNumberWithUndefined(e, AttributeNames.y);
        if (cx !== undefined || cy !== undefined) {
            output.position = { type: "center", x: cx !== undefined ? cx : 0, y: cy !== undefined ? cy : 0 }
        } else if (x !== undefined || y !== undefined) {
            output.position = { type: "upper-left", x: x !== undefined ? x : 0, y: y !== undefined ? y : 0 }
        } else {
            output.position = { type: defaultPositionType, x: 0, y: 0 }
        }
        //const cx = 
        output.width = ElementExtension.gtGetAttributeNumberWithUndefined(e, AttributeNames.width);
        output.height = ElementExtension.gtGetAttributeNumberWithUndefined(e, AttributeNames.height);

        /*
        const surfaceAttributes = ElementExtension.collectAttributesByPrefix(e, "surface");
        if(surfaceAttributes.size > 0){
            output.surfaceAttributes = {};
            surfaceAttributes.forEach((value, key) =>{
                output.surfaceAttributes![key] = value;
            })
        }
        */




        if (removeAttributes) {
            e.removeAttribute(AttributeNames.cx);
            e.removeAttribute(AttributeNames.cy);
            e.removeAttribute(AttributeNames.x);
            e.removeAttribute(AttributeNames.y);
            e.removeAttribute(AttributeNames.className);
            e.removeAttribute(AttributeNames.surfaceClassName);
            //e.removeAttribute(AttributeNames.groupClassName);
            e.removeAttribute(AttributeNames.surfaceStyle);
            //e.removeAttribute(AttributeNames.groupStyle);
            e.removeAttribute(AttributeNames.style);

            e.removeAttribute(AttributeNames.width);
            e.removeAttribute(AttributeNames.height);
        }
        return output;
    }
    public get tag() {
        return this._tag;
    }
    public set tag(v: any) {
        this._tag = v;
    }
    public get isShown(): boolean {
        return HTMLFunctions.isShow(this.svgGroup);
    }

    /**
    セルを表しているSVGGElementを返します。
    */
    public get svgGroup(): SVGGElement {
        return this._svgGroup;
    }



    get isLocated(): boolean {
        return CommonFunctions.IsDescendantOfBody(this.svgGroup);
    }
    public get svgSurface(): SVGElement | null {
        return this._svgSurface;
    }

    /**
このVertexのX座標を返します。
*/
    public get cx(): number {
        if (this.isCenterBased) {
            return SVGGExtension.getX(this.svgGroup);
        } else {
            return SVGGExtension.getX(this.svgGroup) + (this.width / 2);
        }
    }
    public set cx(value: number) {
        if (this.coordinateType == CoodinateType.Group00) {
            //throw Error("This object does not support set cx!" + this.type);
        }
        else {
            if (this.isCenterBased) {
                if (SVGGExtension.getX(this.svgGroup) != value) {
                    SVGGExtension.setX(this.svgGroup, value);
                }
            } else {
                SVGGExtension.setX(this.svgGroup, value - (this.width / 2));
            }

        }


    }
    /**
    このVertexのY座標を返します。
    */
    public get cy(): number {

        if (this.isCenterBased) {
            return SVGGExtension.getY(this.svgGroup);
        } else {
            return SVGGExtension.getY(this.svgGroup) + (this.height / 2);
        }
    }
    public set cy(value: number) {
        if (this.coordinateType == CoodinateType.Group00) {
            //throw Error("This object does not support set cy!");
        } else {
            if (this.isCenterBased) {
                if (SVGGExtension.getY(this.svgGroup) != value) {
                    SVGGExtension.setY(this.svgGroup, value);
                }
            } else {
                SVGGExtension.setY(this.svgGroup, value - (this.height / 2));
            }
        }

    }
    public get upperHeight(): number {
        return (this.height / 2);
    }
    public get leftWidth(): number {
        return (this.width / 2);
    }
    public get surfaceRegion(): Rectangle {
        return new Rectangle();
    }

    public get x(): number {
        if (this.isCenterBased) {
            return SVGGExtension.getX(this.svgGroup) + this.surfaceRegion.x;
        } else {
            return SVGGExtension.getX(this.svgGroup);
        }
    }
    public get y(): number {
        if (this.isCenterBased) {
            return SVGGExtension.getY(this.svgGroup) + this.surfaceRegion.y;
        } else {
            return SVGGExtension.getY(this.svgGroup);
        }
    }
    public set x(v: number) {
        if (this.coordinateType == CoodinateType.Group00) {
            throw Error("This object does not support set x!");
        } else {
            if (this.isCenterBased) {
                SVGGExtension.setX(this.svgGroup, v - this.surfaceRegion.x);
            } else {
                SVGGExtension.setX(this.svgGroup, v);
            }
        }

    }
    public set y(v: number) {
        if (this.coordinateType == CoodinateType.Group00) {
            throw Error("This object does not support set y!");
        } else {
            if (this.isCenterBased) {
                SVGGExtension.setY(this.svgGroup, v - this.surfaceRegion.y);
            } else {
                SVGGExtension.setY(this.svgGroup, v);
            }
        }
    }


    public setVirtualXY(x: number, y: number) {
        const rect = this.getVirtualRegion();
        if (this.coordinateType == CoodinateType.Group00) {
            throw Error("This object does not support set x!");
        } else {
            if (this.isCenterBased) {
                SVGGExtension.setX(this.svgGroup, x - rect.x);
            } else {
                SVGGExtension.setX(this.svgGroup, x);
            }
        }
        if (this.coordinateType == CoodinateType.Group00) {
            throw Error("This object does not support set y!");
        } else {
            if (this.isCenterBased) {
                SVGGExtension.setY(this.svgGroup, y - rect.y);
            } else {
                SVGGExtension.setY(this.svgGroup, y);
            }
        }

    }

    /*
    public set virtualX(v: number) {
        if(this.coordinateType == CoodinateType.Group00){
            throw Error("This object does not support set x!");
        }else{
            if (this.isCenterBased) {
                SVGGExtension.setX(this.svgGroup,v - this.getVirtualRegion().x );
            } else {
                SVGGExtension.setX(this.svgGroup, v);
            }    
        }

    }
    */

    /*
    public set virtualY(v: number) {
        if(this.coordinateType == CoodinateType.Group00){
            throw Error("This object does not support set y!");
        }else{
            if (this.isCenterBased) {
                SVGGExtension.setY(this.svgGroup, v + (this.getVirtualHeight() / 2));
            } else {
                SVGGExtension.setY(this.svgGroup, v);
            }    
        }

    }
    */

    /**
    頂点の幅を返します。
    */
    get width(): number {
        if (this.hasSize) {
            return round100(<number>ElementExtension.gtGetAttributeNumber(this.svgGroup, "data-width", 0));
        } else {
            return 0;
        }
    }
    set width(value: number) {
        const newValue = round100(value);
        if (this.hasSize) {
            if (!nearlyEqual(this.width, newValue)) {
                ElementExtension.setAttributeNumber(this.svgGroup, "data-width", newValue);
            }
            //this.svgGroup.setAttribute("data-width", value.toString());
        }
    }
    /*
    protected setWidthWithoutUpdate(value: number) {
        this.width = value;

    }
    protected setHeightWithoutUpdate(value: number) {
        this.height = value;
    }
    */

    /**
    頂点の高さを返します。
    */
    get height(): number {
        if (this.hasSize) {
            return <number>ElementExtension.gtGetAttributeNumber(this.svgGroup, "data-height", 0);
        } else {
            return 0;
        }
    }
    set height(value: number) {
        const newValue = round100(value);
        if (this.hasSize) {
            if (! nearlyEqual(this.height, newValue)) {
                ElementExtension.setAttributeNumber(this.svgGroup, "data-height", newValue)
            }

            //this.svgGroup.setAttribute("data-height", value.toString());
        }
    }
    /*
    public get fixedX(): number | null {
        return ElementExtension.gtGetAttributeNumber(this.svgGroup, "data-fixedX", null);
    }
    public set fixedX(v: number | null) {
        if (v == null) {
            this.svgGroup.removeAttribute("data-fixedX");
        } else {
            this.svgGroup.setAttribute("data-fixedX", v.toString());
        }
    }
    
    public get fixedY(): number | null {
        return ElementExtension.gtGetAttributeNumber(this.svgGroup, "data-fixedY", null);
    }
    public set fixedY(v: number | null) {
        if (v == null) {
            this.svgGroup.removeAttribute("data-fixedY");
        } else {
            this.svgGroup.setAttribute("data-fixedY", v.toString());
        }
    }
    */
    public get isCenterBased() {
        return true;
    }
    public get positionType(): PositionType {
        const str = this.svgGroup.getAttribute("data-position-type");
        if (str !== undefined) {
            if (str == PositionType.Center) {
                return PositionType.Center;
            } else {
                return PositionType.UpperLeft;
            }
        } else {
            return PositionType.Center;
        }
    }
    public set positionType(value: PositionType) {
        this.svgGroup.setAttribute("data-position-type", value);
    }


    public get isProhibitionOutOfRange(): boolean {
        const p = ElementExtension.getPropertyStyleValueWithDefault(this.svgGroup, StyleNames.prohibitionOutOfRange, "true");
        return p == "true";
    }
    public set isProhibitionOutOfRange(v: boolean) {
        ElementExtension.setPropertyStyleValue(this.svgGroup, StyleNames.prohibitionOutOfRange, v.toString());

    }
    public moveInCanvas() {
        this.x = (this.width / 2) + 10;
        this.y = (this.height / 2) + 10;
    }



    public get type(): ShapeObjectType {
        return ShapeObjectType.Object;
    }
    protected createSurface(svgbox: SVGElement): void {

    }

    protected setClassNameOfSVGGroup() {

    }
    private observerFunc: MutationCallback = (x: MutationRecord[]) => {
        this.observerFunction(x);
    };

    protected observerFunction(x: MutationRecord[]) {
        //throw Error("error1");

        if (!this.isShown) return;

        let b = false;
        if (!this.isLocated) return;

        for (let i = 0; i < x.length; i++) {
            const p = x[i];
            if (this.updateAttributes.some((v) => v == p.attributeName)) {
                b = true;
            }

            if (p.target == this.svgGroup) {
                if (p.attributeName == "x" || p.attributeName == "y") {
                    this.dispatchConnectPositionChangedEvent();
                }
            }
            if (p.attributeName == "transform") {
                this.dispatchConnectPositionChangedEvent();
            }
        }

        if (b) {
            this.resetUnstableCounter();
            //this.update();
        }

    }


    /**
     * この頂点を廃棄します。廃棄された頂点はグラフから取り除かれます。
     */
    public dispose() {
    }
    /**
    この頂点が廃棄されていたらTrueを返します。
    */
    get isDisposed(): boolean {
        return false;
        //return this.graph == null;
    }
    /**
    このVertexのObjectIDを返します。
    */
    public get objectID(): string {
        const r = this.svgGroup.getAttribute(AttributeNames.objectIDName);
        if (r == null) {
            throw new Error();
        } else {
            return r;
        }
    }

    public createVBACode(id: number): string[] {
        const lines: string[] = [];
        lines.push(`Sub create${id}(createdSlide As slide)`);
        lines.push(`End Sub`);
        return lines;
    }
    public get VBAObjectNum(): number {
        return 1;
    }

    protected dispatchObjectCreatedEvent(): void {
        var event = document.createEvent("HTMLEvents");
        event.initEvent(AttributeNames.objectCreatedEventName, true, true);
        this.svgGroup.dispatchEvent(event);

    }

    public get isDynamic(): boolean {
        const p = this.svgGroup.getAttribute("data-is-dynamic");
        return p == "true";
    }
    protected set isDynamic(value: boolean) {
        this.svgGroup.setAttribute("data-is-dynamic", value == true ? "true" : "false");
    }

    /*
    public get isStable(): boolean {
        const p = this.svgGroup.getAttribute("data-object-stable");
        return p == "true";
    }
    protected set isStable(value: boolean) {
        this.svgGroup.setAttribute("data-object-stable", value == true ? "true" : "false");
    }
    */

    protected _isUpdating: boolean = false;
    public getUpdateFlag(): boolean {
        return false;
    }

    public update() {
        if (!this._isInitialized) {
            //throw new Error("This instance have not been initialized!");
            //return true;

        } else {
            this._isUpdating = true;
            this._isUpdating = false;
            //return true;
        }
    }
    protected updateAttributes = ["style", "transform", "data-speaker-x", "data-speaker-y",
        "data-width", "data-height", "data-arrow-neck-width", "data-arrow-neck-height",
        "data-arrow-head-width", "data-arrow-head-height"]
    protected dispatchConnectPositionChangedEvent(): void {
        if (this.svgSurface != null) {
            var event = document.createEvent("HTMLEvents");
            event.initEvent(AttributeNames.connectPositionChangedEventName, false, true)
            this.svgGroup.dispatchEvent(event);
        }
    }
    public get hasSize(): boolean {
        return false;
    }

    private static objectDic: { [key: string]: GObject; } = {};
    public static getObjectFromObjectID(id: string | SVGElement): GObject | null {
        if (id instanceof SVGElement) {
            if (id.hasAttribute(AttributeNames.objectIDName)) {
                const _id = id.getAttribute(AttributeNames.objectIDName)!;
                return GObject.getObjectFromObjectID(_id);
            } else {
                return null;
            }
        } else {
            if (id in this.objectDic) {
                return this.objectDic[id];
            } else {
                const element: any = document.getElementById(id);
                if (element !== null && element.operator !== undefined && element.operator instanceof GObject) {
                    return element.operator;
                } else {
                    return null;
                }
            }
        }
    }
    public static setObjectFromObjectID(obj: GObject) {
        const id = obj.objectID;
        this.objectDic[id] = obj;
    }
    public static getObjectFromID(id: string): GObject | null {
        for (let key in this.objectDic) {
            if (this.objectDic[key].svgGroup.id == id) {
                return this.objectDic[key];
            }
        }
        return null;
    }
    /**
     * グラフの領域を表すRectangleを返します。位置の基準はグラフが追加されているNodeです。
     */
    public getRegion(): Rectangle {
        let rect = new Rectangle();
        rect.x = this.x;
        rect.y = this.y;
        rect.width = this.width;
        rect.height = this.height;
        return rect;
    }
    public getVirtualWidth(): number {
        return 0;
    }
    public getVirtualHeight(): number {
        return 0;
    }

    public getVirtualRegion(): Rectangle {
        let rect = new Rectangle();
        rect.x = this.x;
        rect.y = this.y;
        rect.width = this.width;
        rect.height = this.height;
        return rect;
    }

    public movable(): void {

        DraggableObjectFunctions.appendDragFunctionsToDocument();
        DraggableObjectFunctions.draggable(this.svgSurface!, this.svgGroup);
    }

    public get allowHover(): boolean {
        return this.svgGroup.getAttribute(AttributeNames.allowHoverName) == "true";
    }
    public set allowHover(value: boolean) {
        if (value) {
            this.svgGroup.setAttribute(AttributeNames.allowHoverName, "true");
        } else {
            this.svgGroup.setAttribute(AttributeNames.allowHoverName, "false");
        }
    }



}

//}