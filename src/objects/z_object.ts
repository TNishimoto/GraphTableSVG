//namespace GraphTableSVG {
import * as CommonFunctions from "../common/common_functions";
import * as GUIObserver from "../html/gui_observer";
import {
  Rectangle,
  PositionType,
  round100,
  nearlyEqual,
} from "../common/vline";
import {
  ConnectorType,
  CoodinateType,
  HorizontalAnchor,
  VerticalAnchor,
} from "../common/enums";

import * as SVG from "../interfaces/svg";
import * as HTMLFunctions from "../html/html_functions";
import * as CSS from "../html/css";
import { DraggableObjectFunctions } from "../html/draggable_object";
import * as AttributeNames from "../common/attribute_names";
import * as StyleNames from "../common/style_names";
import { ShapeObjectType } from "../common/enums";
import * as ElementExtension from "../interfaces/element_extension";
import * as SVGGExtension from "../interfaces/svg_g_extension";
import * as GObserver from "./z_observer";
import { IObject } from "./i_object";
import { GlobalZObjectManager } from "./global_gobject_manager";

export type ZObjectMaps = {
  groupAttributes?: Map<string, string>;
  surfaceAttributes?: Map<string, string>;
  textAttributes?: Map<string, string>;
};
export class ZObject implements IObject {
  protected _svgSurface: SVGElement | null = null;
  protected _tag: any;
  private _svgGroup: SVGGElement;
  protected _observer: MutationObserver;
  private _observerOption: MutationObserverInit;

  private _isInitialized = false;
  private __x: number | undefined;
  private __y: number | undefined;
  private __cx: number | undefined;
  private __cy: number | undefined;


  public constructor(svgbox: SVGElement | string) {
    CSS.setGraphTableCSS();
    let parentElement: SVGElement =
      svgbox instanceof SVGElement
        ? svgbox
        : <any>document.getElementById(svgbox);
    if (
      parentElement instanceof SVGSVGElement &&
      !GUIObserver.isObserved(parentElement)
    ) {
      GUIObserver.observeSVGSVG(parentElement);
    }
    this._svgGroup = SVG.createGroup(parentElement);
    this.stableFlag = false;

    ZObject.setObjectFromObjectID(this);

    (this.svgGroup as any).operator = this;

    this.svgGroup.setAttribute(AttributeNames.GroupAttribute, this.type);
    this.createSurface(parentElement);

    this._observer = new MutationObserver(this.observerFunc);
    this._observerOption = { attributes: true, childList: true, subtree: true };
    this.hasConnectedObserverFunction = true;

    this.dispatchObjectCreatedEvent();
    this.addResizeEvent();

    const __svg = <any>this.svgGroup;
    __svg.operator = this;

    this.allowHover = true;

    //this.unstableCounter = GObserver.unstableCounterDefault;

    const svgsvgAncestor = HTMLFunctions.getSVGSVGAncestor(this.svgGroup);
    if (svgsvgAncestor instanceof SVGSVGElement) {
      const xb = GlobalZObjectManager.tryRegisterSVGSVGElement(svgsvgAncestor);
      xb.registerObject(this);
    }

    if (this.type == ShapeObjectType.Object)
      this.firstFunctionAfterInitialized();
  }
  protected copyAttribute(
    from: SVGElement,
    to: SVGElement,
    attributeName: string,
    remove: boolean
  ) {
    const attr = from.getAttribute(attributeName);
    if (attr != null) {
      to.setAttribute(attributeName, attr);
    }
    if (remove) {
      from.removeAttribute(attributeName);
    }
  }
  public initializeSetBasicOption(source: SVGElement) {
    this.copyAttribute(source, this._svgGroup, "class", true);
    this.copyAttribute(source, this._svgGroup, "style", true);
    this.copyAttribute(source, this._svgGroup, "id", true);

    const width = ElementExtension._getAttributeNumber(
      source,
      AttributeNames.width,
      true
    );
    if (width != null) {
      this.width = width;
    }
    const height = ElementExtension._getAttributeNumber(
      source,
      AttributeNames.height,
      true
    );
    if (height != null) {
      this.height = height;
    }

    if (this.svgSurface != null) {
      ZObject.setSubAttributes(this.svgSurface, source);
    }
  }
  public static setSubAttributes(e: SVGElement, source: SVGElement) {
    const objName = e.getAttribute(AttributeNames.dataNameAttribute);
    if (objName != null) {
      this.setSubAttributesWithObjName(e, objName, source);
    }
  }
  public static setSubAttributesWithObjName(
    e: SVGElement,
    objName: string,
    source: SVGElement
  ) {
    if (objName != null) {
      const map = HTMLFunctions.getSubAttributeFromAncestors(source, objName);
      map.forEach((value, key) => {
        e.setAttribute(key, value);
      });
    }
  }

  //protected setText

  public initializeOptionalPosition(source: SVGElement) {
    const cx = ElementExtension._getAttributeNumber(
      source,
      AttributeNames.cx,
      true
    );
    const cy = ElementExtension._getAttributeNumber(
      source,
      AttributeNames.cy,
      true
    );
    const x = ElementExtension._getAttributeNumber(
      source,
      AttributeNames.x,
      true
    );
    const y = ElementExtension._getAttributeNumber(
      source,
      AttributeNames.y,
      true
    );

    if (x != null || y != null) {
      this.positionType = PositionType.UpperLeft;
      const __x = x == null ? 0 : x;
      const __y = y == null ? 0 : y;
      this.setVirtualXY(__x, __y);
    } else {
      this.positionType = PositionType.Center;
      this.cx = cx == null ? 0 : cx;
      this.cy = cy == null ? 0 : cy;
    }
  }

  public initialize(source: SVGElement) {
    this.initializeSetBasicOption(source);
    this.initializeOptionalPosition(source);

    while (source.attributes.length > 0) {
      const attr = source.attributes.item(0);
      if (attr != null) {
        this.svgGroup.setAttribute(attr.name, attr.value);
        source.removeAttribute(attr.name);
      }
    }
    source.remove();
  }
  public get stableFlag(): boolean {
    return this.svgGroup.getAttribute(AttributeNames.ObjectStableFlagName) == "true";
  }
  public get syncXTargetObject(): ZObject | null {
    const p = this.svgGroup.getAttribute(AttributeNames.syncXTarget);
    if (p == null) {
      return null;
    } else {
      return <ZObject>ZObject.getObjectFromIDOrObjectID(p);
    }
  }
  public get syncYTargetObject(): ZObject | null {
    const p = this.svgGroup.getAttribute(AttributeNames.syncYTarget);
    if (p == null) {
      return null;
    } else {
      return <ZObject>ZObject.getObjectFromIDOrObjectID(p);
    }
  }

  public get syncXSourcePosition(): HorizontalAnchor | null {
    const p = this.svgGroup.getAttribute(AttributeNames.syncXSourcePosition);
    if (p == null) {
      return null;
    } else {
      return HorizontalAnchor.toHorizontalAnchor(p);
    }
  }
  public get syncXTargetPosition(): HorizontalAnchor | null {
    const p = this.svgGroup.getAttribute(AttributeNames.syncXTargetPosition);
    if (p == null) {
      return null;
    } else {
      return HorizontalAnchor.toHorizontalAnchor(p);
    }
  }

  public get syncYSourcePosition(): VerticalAnchor | null {
    const p = this.svgGroup.getAttribute(AttributeNames.syncYSourcePosition);
    if (p == null) {
      return null;
    } else {
      return VerticalAnchor.toVerticalAnchor(p);
    }
  }
  public get syncYTargetPosition(): VerticalAnchor | null {
    const p = this.svgGroup.getAttribute(AttributeNames.syncYTargetPosition);
    if (p == null) {
      return null;
    } else {
      return VerticalAnchor.toVerticalAnchor(p);
    }
  }

  protected set stableFlag(b: boolean) {
    this.svgGroup.setAttribute(
      AttributeNames.ObjectStableFlagName,
      b ? "true" : "false"
    );
  }
  public get childrenStableFlag(): boolean {
    return true;
  }
  public updateSurfaceWithoutSVGText(): boolean {
    this.update();
    return true;
  }
  public updateObjectLocation() {
    this.joint();
  }
  private joint() {
    const objRegion = this.getRegion();
    if (this.syncXTargetObject != null) {
      const jointRegion = this.syncXTargetObject.getRegion();

      let diffX = 0;

      if (
        this.syncXSourcePosition == "left" ||
        this.syncXSourcePosition == null
      ) {
        if (
          this.syncXTargetPosition == "left" ||
          this.syncXTargetPosition == null
        ) {
          diffX = jointRegion.x - objRegion.x;
        } else if (this.syncXTargetPosition == "center") {
          diffX = jointRegion.x + jointRegion.width / 2 - objRegion.x;
        } else {
          diffX = jointRegion.right - objRegion.x;
        }
      } else if (this.syncXSourcePosition == "center") {
        if (
          this.syncXTargetPosition == "left" ||
          this.syncXTargetPosition == null
        ) {
          diffX = jointRegion.x - objRegion.x - objRegion.width / 2;
        } else if (this.syncXTargetPosition == "center") {
          diffX =
            jointRegion.x +
            jointRegion.width / 2 -
            objRegion.x -
            objRegion.width / 2;
        } else {
          diffX = jointRegion.right - objRegion.x - objRegion.width / 2;
        }
      } else {
        if (
          this.syncXTargetPosition == "left" ||
          this.syncXTargetPosition == null
        ) {
          diffX = jointRegion.x - objRegion.right;
        } else if (this.syncXTargetPosition == "center") {
          diffX = jointRegion.x + jointRegion.width / 2 - objRegion.right;
        } else {
          diffX = jointRegion.right - objRegion.right;
        }
      }
      this.x = this.x + diffX;
    }
    if (this.syncYTargetObject != null) {
      const jointRegion = this.syncYTargetObject.getRegion();

      let diffy = 0;

      if (
        this.syncYSourcePosition == "top" ||
        this.syncYSourcePosition == null
      ) {
        if (
          this.syncYTargetPosition == "top" ||
          this.syncYTargetPosition == null
        ) {
          diffy = jointRegion.y - objRegion.y;
        } else if (this.syncYTargetPosition == "middle") {
          diffy = jointRegion.y + jointRegion.height / 2 - objRegion.y;
        } else {
          diffy = jointRegion.bottom - objRegion.y;
        }
      } else if (this.syncYSourcePosition == "middle") {
        if (
          this.syncYTargetPosition == "top" ||
          this.syncYTargetPosition == null
        ) {
          diffy = jointRegion.y - objRegion.y - objRegion.height / 2;
        } else if (this.syncYTargetPosition == "middle") {
          diffy =
            jointRegion.y +
            jointRegion.height / 2 -
            objRegion.y -
            objRegion.height / 2;
        } else {
          diffy = jointRegion.bottom - objRegion.y - objRegion.height / 2;
        }
      } else {
        if (
          this.syncYTargetPosition == "top" ||
          this.syncYTargetPosition == null
        ) {
          diffy = jointRegion.y - objRegion.bottom;
        } else if (this.syncYTargetPosition == "middle") {
          diffy = jointRegion.y + jointRegion.height / 2 - objRegion.bottom;
        } else {
          diffy = jointRegion.bottom - objRegion.bottom;
        }
      }

      this.y = this.y + diffy;
    }
  }

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
    return "object-center";
  }

  public get defaultClassName(): string | undefined {
    return undefined;
  }
  protected get isInitialized(): boolean {
    return this._isInitialized;
  }
  protected firstFunctionAfterInitialized() {
    if (this._isInitialized) {
      throw new Error("This function is already called");
    }
    this._isInitialized = true;

    //this.update();
    //this.resetUnstableCounter();
    if (this.__cx !== undefined) this.cx = this.__cx;
    if (this.__cy !== undefined) this.cy = this.__cy;

    if (this.__x !== undefined) this.x = this.__x;
    if (this.__y !== undefined) this.y = this.__y;
  }

  protected groupObserverOption: MutationObserverInit = {
    attributes: true,
    childList: true,
    subtree: true,
  };

  private removeResizeEvent() {
    this.svgGroup.removeEventListener(
      AttributeNames.resizeName,
      this.pUpdateFunc
    );
  }
  private addResizeEvent() {
    this.svgGroup.addEventListener(AttributeNames.resizeName, this.pUpdateFunc);
  }
  private pUpdateFunc = () => {
    if (!this.isShown) return;
  };

  protected firstResizeUpdate() {}
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
      return SVGGExtension.getX(this.svgGroup) + this.width / 2;
    }
  }
  public set cx(value: number) {
    if (this.coordinateType == CoodinateType.Group00) {
      //throw Error("This object does not support set cx!" + this.type);
    } else {
      if (this.isCenterBased) {
        if (SVGGExtension.getX(this.svgGroup) != value) {
          SVGGExtension.setX(this.svgGroup, value);
        }
      } else {
        SVGGExtension.setX(this.svgGroup, value - this.width / 2);
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
      return SVGGExtension.getY(this.svgGroup) + this.height / 2;
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
        SVGGExtension.setY(this.svgGroup, value - this.height / 2);
      }
    }
  }
  public get upperHeight(): number {
    return this.height / 2;
  }
  public get leftWidth(): number {
    return this.width / 2;
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
      return round100(
        <number>(
          ElementExtension.gtGetAttributeNumber(this.svgGroup, "data-width", 0)
        )
      );
    } else {
      return 0;
    }
  }
  set width(value: number) {
    const newValue = round100(value);
    if (this.hasSize) {
      if (!nearlyEqual(this.width, newValue)) {
        ElementExtension.setAttributeNumber(
          this.svgGroup,
          "data-width",
          newValue
        );
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
      return <number>(
        ElementExtension.gtGetAttributeNumber(this.svgGroup, "data-height", 0)
      );
    } else {
      return 0;
    }
  }
  set height(value: number) {
    const newValue = round100(value);
    if (this.hasSize) {
      if (!nearlyEqual(this.height, newValue)) {
        ElementExtension.setAttributeNumber(
          this.svgGroup,
          "data-height",
          newValue
        );
      }

      //this.svgGroup.setAttribute("data-height", value.toString());
    }
  }
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
    const p = ElementExtension.getPropertyStyleValueWithDefault(
      this.svgGroup,
      StyleNames.prohibitionOutOfRange,
      "true"
    );
    return p == "true";
  }
  public set isProhibitionOutOfRange(v: boolean) {
    ElementExtension.setPropertyStyleValue(
      this.svgGroup,
      StyleNames.prohibitionOutOfRange,
      v.toString()
    );
  }
  public moveInCanvas() {
    this.x = this.width / 2 + 10;
    this.y = this.height / 2 + 10;
  }

  public get type(): ShapeObjectType {
    return ShapeObjectType.Object;
  }
  protected createSurface(svgbox: SVGElement): void {}

  protected setClassNameOfSVGGroup() {}
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
      //this.resetUnstableCounter();
      //this.update();
    }
  }

  /**
   * この頂点を廃棄します。廃棄された頂点はグラフから取り除かれます。
   */
  public dispose() {}
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
    this.svgGroup.setAttribute(
      "data-is-dynamic",
      value == true ? "true" : "false"
    );
  }
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
  protected updateAttributes = [
    "style",
    "transform",
    "data-speaker-x",
    "data-speaker-y",
    "data-width",
    "data-height",
    "data-arrow-neck-width",
    "data-arrow-neck-height",
    "data-arrow-head-width",
    "data-arrow-head-height",
  ];
  protected dispatchConnectPositionChangedEvent(): void {
    if (this.svgSurface != null) {
      var event = document.createEvent("HTMLEvents");
      event.initEvent(
        AttributeNames.connectPositionChangedEventName,
        false,
        true
      );
      this.svgGroup.dispatchEvent(event);
    }
  }
  public get hasSize(): boolean {
    return false;
  }

  private static objectDic: { [key: string]: ZObject } = {};
  public static getObjectFromIDOrObjectID(
    id: string | SVGElement
  ): ZObject | null {
    if (id instanceof SVGElement) {
      if (id.hasAttribute(AttributeNames.objectIDName)) {
        const _id = id.getAttribute(AttributeNames.objectIDName)!;
        return ZObject.getObjectFromIDOrObjectID(_id);
      } else {
        return null;
      }
    } else {
      if (id in this.objectDic) {
        return this.objectDic[id];
      } else {
        const element: any = document.getElementById(id);
        if (
          element !== null &&
          element.operator !== undefined &&
          element.operator instanceof ZObject
        ) {
          return element.operator;
        } else {
          return null;
        }
      }
    }
  }
  public static setObjectFromObjectID(obj: ZObject) {
    const id = obj.objectID;
    this.objectDic[id] = obj;
  }
  public static getObjectFromID(id: string): ZObject | null {
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
