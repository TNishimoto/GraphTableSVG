/// <reference path="z_object.ts"/>
import { VBATranslateFunctions } from "../common/vba_functions";
import * as AttributeNames from "../common/attribute_names";
import * as StyleNames from "../common/style_names";
import {
  ShapeObjectType,
  msoDashStyle,
  HorizontalAnchor,
  VerticalAnchor,
  DataName,
  ShapeToFitType,
} from "../common/enums";
import {
  Rectangle,
  round100,
  nearlyEqual,
} from "../common/vline";
import * as HTMLFunctions from "../html/html_functions";
import * as SVGTextBox from "../interfaces/svg_textbox";
import { ZObject } from "./z_object";
import { ZVertex } from "./z_vertex";
import * as Extensions from "../interfaces/extensions";
import { AutoSizeShapeToFitText } from "../common/enums";
import {
  updateAppropriateDashArray,
  getUpdateFlagAppropriateDashArray,
} from "../html/enum_extension";
import * as ElementExtension from "../interfaces/element_extension";
import * as SVGElementExtension from "../interfaces/svg_element_extension";
import * as SVGTextExtension from "../interfaces/svg_text_extension";
import { createSVGText } from "./element_builder";
import { Debugger } from "../common/debugger";

//namespace GraphTableSVG {

export class ZTextBox extends ZVertex {
  private _svgText: SVGTextElement;
  //private isFixTextSize: boolean = false;
  protected surfaceAttributes: string[] = [];
  private _textObserver: MutationObserver;
  private static updateTextAttributes = ["style"];

  //protected _isSpecialTextBox: boolean = false;

  protected _minimumWidth: number = 10;
  protected _minimumHeight: number = 10;

  public constructor(svgbox: SVGElement | string) {
    super(svgbox);

    this._svgText = createSVGText(undefined, undefined, DataName.Text);
    this.svgGroup.appendChild(this.svgText);
    this._textObserver = new MutationObserver(this.textObserverFunc);
    const option2: MutationObserverInit = {
      childList: true,
      attributes: true,
      subtree: true,
    };
    this._textObserver.observe(this.svgText, option2);

    if (this.type == ShapeObjectType.Object)
      this.firstFunctionAfterInitialized();
  }
  public initializeSetBasicOption(source: SVGElement) {
    super.initializeSetBasicOption(source);

    ZTextBox.importTextFromSource(this.svgText, this.horizontalAnchor, source);

    if (this.svgText != null) {
      ZObject.setSubAttributes(this.svgText, source);
    }
  }

  public static importTextFromSource(
    svgText: SVGTextElement | SVGTextPathElement,
    horizontalAnchor: HorizontalAnchor | null,
    source: SVGElement
  ) {
    if (source.children.length > 0) {
      const tNodes = HTMLFunctions.getTNodes(source);
      if (tNodes != null) {
        tNodes.forEach((v) => v.remove());

        SVGTextBox.constructSVGTextByHTMLElements(svgText, tNodes, false);

        if (horizontalAnchor != null && svgText instanceof SVGTextElement) {
          SVGTextBox.sortText(svgText, horizontalAnchor, false);
        }
      }
    } else if (source.innerHTML.length > 0) {
      if (svgText instanceof SVGTextElement) {
        SVGTextExtension.setTextContent(svgText, source.textContent!);
      } else {
        Extensions.setTextContent(svgText, source.textContent!);
      }

      source.innerHTML = "";
    }
  }

  public get svgText(): SVGTextElement {
    return this._svgText;
  }

  protected textObserverFunc: MutationCallback = (x: MutationRecord[]) => {
    if (!this.isLocated) return;
    let b = false;

    for (let i = 0; i < x.length; i++) {
      const p = x[i];
      if (ZTextBox.updateTextAttributes.some((v) => v == p.attributeName)) {
        b = true;
      }
      if (p.attributeName == null) {
        b = true;
      }
    }
  };

  get horizontalAnchor(): HorizontalAnchor {
    const b = ElementExtension.getPropertyStyleValueWithDefault(
      this.svgGroup,
      StyleNames.horizontalAnchor,
      "center"
    );
    return HorizontalAnchor.toHorizontalAnchor(b);
  }
  /**
    テキストの水平方向の配置設定を設定します。
    */
  set horizontalAnchor(value: HorizontalAnchor) {
    if (this.horizontalAnchor != value)
      ElementExtension.setPropertyStyleValue(
        this.svgGroup,
        StyleNames.horizontalAnchor,
        value
      );
  }
  /**
    テキストの垂直方向の配置設定を返します。
    */
  get verticalAnchor(): VerticalAnchor {
    const b = ElementExtension.getPropertyStyleValueWithDefault(
      this.svgGroup,
      StyleNames.verticalAnchor,
      "middle"
    );
    return VerticalAnchor.toVerticalAnchor(b);
  }
  /**
    テキストの垂直方向の配置設定を設定します。
    */
  set verticalAnchor(value: VerticalAnchor) {
    if (this.verticalAnchor != value)
      ElementExtension.setPropertyStyleValue(
        this.svgGroup,
        StyleNames.verticalAnchor,
        value
      );
  }

  /**
   * このVertexがテキストに合わせてサイズを変える場合Trueを返します。
   */
  get isAutoSizeShapeToFitText(): AutoSizeShapeToFitText {
    const b = ElementExtension.getPropertyStyleValueWithDefault(
      this.svgGroup,
      StyleNames.autoSizeShapeToFitText,
      ShapeToFitType.SemiAuto
    );
    if (b == ShapeToFitType.Auto) {
      return ShapeToFitType.Auto;
    } else if (b == ShapeToFitType.SemiAuto) {
      return ShapeToFitType.SemiAuto;
    } else {
      return ShapeToFitType.None;
    }
  }
  set isAutoSizeShapeToFitText(value: AutoSizeShapeToFitText) {
    ElementExtension.setPropertyStyleValue(
      this.svgGroup,
      StyleNames.autoSizeShapeToFitText,
      value
    );
    //this.svgGroup.setPropertyStyleValue(AttributeNames.Style.autoSizeShapeToFitText, value ? "true" : "false");
  }

  protected updateStyleWithUpdateFlag(updateFlag: boolean): boolean {
    let b = false;
    const dashStyle = this.msoDashStyle;
    if (dashStyle != null && this.svgSurface != null) {
      if (updateFlag) {
        this.hasConnectedObserverFunction = false;
        b = updateAppropriateDashArray(this.svgSurface);
        this.hasConnectedObserverFunction = true;
      } else {
        b = getUpdateFlagAppropriateDashArray(this.svgSurface);
      }
    }
    return b;
  }
  protected updateSurfaceSizeWithUpdateFlag(withUpdate: boolean) {
    const region = this.getVirtualRegion();

    let b = false;
    const widthRound100 = round100(region.width);

    if (!nearlyEqual(this.width, widthRound100)) {
      if (withUpdate) {
        this.width = widthRound100;
      }
      b = true;
    }

    const heightRound100 = round100(region.height);

    if (!nearlyEqual(this.height, heightRound100)) {
      if (withUpdate) {
        this.height = heightRound100;
      }
      //this.height = region.height;
      b = true;
    }
    return b;
  }
  /*
  public async waitForStableRender(): Promise<boolean> {
    const region = await getVirtualRegion(this.svgText);
    this.svgText.setAttribute(AttributeNames.virtualWidthName, region.width.toString());
    this.svgText.setAttribute(AttributeNames.virtualHeightName, region.height.toString());
    this.svgText.setAttribute(AttributeNames.virtualXName, region.x.toString());
    this.svgText.setAttribute(AttributeNames.virtualYName, region.y.toString());
    return true;
  }
  */

  protected updateTextLocation(): boolean {
    return SVGTextExtension.updateLocation(
      this.svgText,
      this.getVirtualExtraRegion(),
      this.verticalAnchor,
      this.horizontalAnchor,
      this.isAutoSizeShapeToFitText
    );
  }
  protected getUpdateFlagOfTextLocation(): boolean {
    return SVGTextExtension.getUpdateFlagOfLocation(
      this.svgText,
      this.getVirtualExtraRegion(),
      this.verticalAnchor,
      this.horizontalAnchor,
      this.isAutoSizeShapeToFitText
    );
  }
  protected updateSurfaceLocation(): boolean {
    return false;
  }
  protected getUpdateFlagOfSurfaceLocation(): boolean {
    return false;
  }

  op: number = 0;

  public getUpdateFlag(): boolean {
    const b1 = super.getUpdateFlag();
    if (b1) {
      Debugger.updateFlagLog(
        this,
        this.getUpdateFlag,
        `${super.getUpdateFlag.name}`
      );
      return b1;
    }

    if (!this.isShown) return b1;

    if (this.svgText == null) {
      throw new TypeError("svgText is null");
    }

    const b2: boolean = this.updateStyleWithUpdateFlag(false);
    if (b2) {
      Debugger.updateFlagLog(
        this,
        this.getUpdateFlag,
        `${this.updateStyleWithUpdateFlag.name}`
      );
      return b2;
    }

    const b3: boolean = this.getUpdateFlagOfTextLocation();
    if (b3) {
      Debugger.updateFlagLog(
        this,
        this.getUpdateFlag,
        `${this.getUpdateFlagOfTextLocation.name}`
      );
      return b3;
    }

    const b4: boolean = this.updateSurfaceSizeWithUpdateFlag(false);
    if (b4) {
      Debugger.updateFlagLog(
        this,
        this.getUpdateFlag,
        `${this.updateSurfaceSizeWithUpdateFlag.name}`
      );
      return b3;
    }

    const b5: boolean = this.getUpdateFlagOfSurfaceLocation();
    if (b4) {
      Debugger.updateFlagLog(
        this,
        this.getUpdateFlag,
        `${this.getUpdateFlagOfSurfaceLocation.name}`
      );
      return b3;
    }

    const b = b1 || b2 || b3 || b4 || b5;

    return b;
  }
  public afterEvaluateAttributes(): void {
    super.afterEvaluateAttributes();
    this._isUpdating = true;
    if (!this.isShown) return;
    //this._observer.disconnect();
    this.hasConnectedObserverFunction = false;

    if (this.svgText == null) {
      throw new TypeError("svgText is null");
    }
    this.updateStyleWithUpdateFlag(true);
    this.updateTextLocation();
    this.updateSurfaceSizeWithUpdateFlag(true);
    this.updateSurfaceLocation();
    this._isUpdating = false;
    this.hasConnectedObserverFunction = true;
  }
  public update() {
    super.update();
    this._isUpdating = true;
    if (!this.isShown) return;
    //this._observer.disconnect();
    this.hasConnectedObserverFunction = false;

    if (this.svgText == null) {
      throw new TypeError("svgText is null");
    }
    this.updateStyleWithUpdateFlag(true);
    this.updateTextLocation();
    this.updateSurfaceSizeWithUpdateFlag(true);
    this.updateSurfaceLocation();
    this.updateObjectLocation();
    //this.joint();
    this._isUpdating = false;
    this.hasConnectedObserverFunction = true;
  }
  /*
  get marginPaddingTop() {
    return (
      SVGTextExtension.getMarginTop(this.svgText) +
      SVGElementExtension.getPaddingTop(this.svgGroup)
    );
  }
  get marginPaddingLeft() {
    return (
      SVGTextExtension.getMarginLeft(this.svgText) +
      SVGElementExtension.getPaddingLeft(this.svgGroup)
    );
  }
  get marginPaddingRight() {
    return (
      SVGTextExtension.getMarginRight(this.svgText) +
      SVGElementExtension.getPaddingRight(this.svgGroup)
    );
  }
  get marginPaddingBottom() {
    return (
      SVGTextExtension.getMarginBottom(this.svgText) +
      SVGElementExtension.getPaddingBottom(this.svgGroup)
    );
  }
  */

  get paddingTop(): number {
    return SVGElementExtension.getPaddingTop(this.svgGroup);
  }
  set paddingTop(value: number) {
    SVGElementExtension.setPaddingTop(this.svgGroup, value);
  }
  get paddingLeft(): number {
    return SVGElementExtension.getPaddingLeft(this.svgGroup);
  }
  set paddingLeft(value: number) {
    SVGElementExtension.setPaddingLeft(this.svgGroup, value);
  }
  get paddingRight(): number {
    return SVGElementExtension.getPaddingRight(this.svgGroup);
  }
  set paddingRight(value: number) {
    SVGElementExtension.setPaddingRight(this.svgGroup, value);
  }
  get paddingBottom(): number {
    return SVGElementExtension.getPaddingBottom(this.svgGroup);
  }
  set paddingBottom(value: number) {
    SVGElementExtension.setPaddingBottom(this.svgGroup, value);
  }

  get marginTop(): number {
    return SVGTextExtension.getMarginTop(this.svgText);
  }
  set marginTop(value: number) {
    SVGTextExtension.setMarginTop(this.svgText, value);
  }

  get marginLeft(): number {
    return SVGTextExtension.getMarginLeft(this.svgText);
  }
  set marginLeft(value: number) {
    SVGTextExtension.setMarginLeft(this.svgText, value);
  }
  get marginRight(): number {
    return SVGTextExtension.getMarginRight(this.svgText);
  }
  set marginRight(value: number) {
    SVGTextExtension.setMarginRight(this.svgText, value);
  }
  get marginBottom(): number {
    return SVGTextExtension.getMarginBottom(this.svgText);
  }
  set marginBottom(value: number) {
    SVGTextExtension.setMarginBottom(this.svgText, value);
  }

  public get svgElements(): SVGElement[] {
    const r: SVGElement[] = [];
    r.push(this.svgGroup);
    r.push(this.svgText);
    return r;
  }
  public hasDescendant(obj: SVGElement): boolean {
    const ids = this.svgElements
      .map((v) => v.getAttribute(AttributeNames.objectIDName))
      .filter((v) => v != null);
    const id = obj.getAttribute(AttributeNames.objectIDName);
    return ids.some((v) => v == id);
  }

  public get hasSize(): boolean {
    return true;
  }

  public get msoDashStyle(): msoDashStyle | null {
    if (this.svgSurface != null) {
      const dashStyle = ElementExtension.getPropertyStyleValue(
        this.svgSurface,
        StyleNames.msoDashStyleName
      );
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
        ElementExtension.setPropertyStyleValue(
          this.svgSurface,
          StyleNames.msoDashStyleName,
          value
        );
      }
    }
  }
  public createVBACode(id: number): string[] {
    const lines: string[] = [];

    const backColor = VBATranslateFunctions.colorToVBA(
      ElementExtension.getPropertyStyleValueWithDefault(
        this.svgSurface!,
        "fill",
        "gray"
      )
    );
    const visible =
      ElementExtension.getPropertyStyleValueWithDefault(
        this.svgSurface!,
        "visibility",
        "visible"
      ) == "visible"
        ? "msoTrue"
        : "msoFalse";

    const vAnchor = VBATranslateFunctions.ToVerticalAnchor(this.verticalAnchor);
    const hAnchor = VBATranslateFunctions.ToHorizontalAnchor(
      this.horizontalAnchor
    );

    lines.push(`Sub create${id}(createdSlide As slide)`);
    lines.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
    lines.push(` Dim obj As Shape`);
    lines.push(
      ` Set obj = shapes_.AddShape(${this.shape}, ${this.globalX}, ${this.globalY}, ${this.width}, ${this.height})`
    );
    lines.push(
      ` Call EditTextFrame(obj.TextFrame, ${this.marginTop}, ${this.marginBottom}, ${this.marginLeft}, ${this.marginRight}, false, ppAutoSizeNone)`
    );
    lines.push(` Call EditAnchor(obj.TextFrame, ${vAnchor}, ${hAnchor})`);

    VBATranslateFunctions.TranslateSVGTextElement2(
      this.svgText,
      `obj.TextFrame.TextRange`
    ).forEach((v) => lines.push(v));
    lines.push(this.getVBAEditLine());

    lines.push(
      ` Call EditCallOut(obj, "${this.objectID}", ${visible}, ${backColor})`
    );
    this.VBAAdjustments.forEach((v, i) => {
      lines.push(` obj.Adjustments.Item(${i + 1}) = ${v}`);
    });
    lines.push(`End Sub`);

    return lines;
  }

  public getVirtualX(): number {
    let x = 0;
    if(this.svgGroup.hasAttribute(AttributeNames.dataX)){
      x = <number>ElementExtension.gtGetAttributeNumber(this.svgGroup,AttributeNames.dataX, 0);
    }else if(this.svgGroup.hasAttribute(AttributeNames.dataCX)){
      const cx = <number>ElementExtension.gtGetAttributeNumber(this.svgGroup,AttributeNames.dataCX, 0);
      x = cx - (this.getVirtualWidth()/2);
    }
    return x;
  }
  public getVirtualCX(): number {
    return this.getVirtualX() + this.getVirtualWidth() / 2;
  }

  public getVirtualY(): number {
    let y = 0;
    if(this.svgGroup.hasAttribute(AttributeNames.dataY)){
      y = <number>ElementExtension.gtGetAttributeNumber(this.svgGroup,AttributeNames.dataY, 0);
    }else if(this.svgGroup.hasAttribute(AttributeNames.dataCY)){
      const cy = <number>ElementExtension.gtGetAttributeNumber(this.svgGroup,AttributeNames.dataCY, 0);
      y = cy - (this.getVirtualHeight()/2);
    }
    return y;
  }
  public getVirtualCY(): number {
    return this.getVirtualY() + this.getVirtualHeight() / 2;
  }


  public getVirtualWidth(): number {
    const textWidth = <number>ElementExtension.gtGetAttributeNumber(this.svgText,AttributeNames.dataBBoxWidthName,0);
    const rectWidth = <number>ElementExtension.gtGetAttributeNumber(this.svgGroup,AttributeNames.dataWidth,0);
    const autoWidth = textWidth + this.paddingLeft + this.paddingRight;

    if (this.isAutoSizeShapeToFitText == AutoSizeShapeToFitText.Auto) {
      return autoWidth;
    } else if (this.isAutoSizeShapeToFitText == AutoSizeShapeToFitText.SemiAuto) {
      return Math.max(rectWidth, autoWidth);
    } else {
      return rectWidth;
    }
  }
  public getVirtualHeight(): number {
    const textHeight = <number>ElementExtension.gtGetAttributeNumber(this.svgText,AttributeNames.dataBBoxHeightName,0);
    const rectHeight = <number>ElementExtension.gtGetAttributeNumber(this.svgGroup,AttributeNames.dataHeight,0);
    const autoHeight = textHeight + this.paddingTop + this.paddingBottom;

    if (this.isAutoSizeShapeToFitText == AutoSizeShapeToFitText.Auto) {
      return autoHeight;
    } else if (this.isAutoSizeShapeToFitText == AutoSizeShapeToFitText.SemiAuto) {
      return Math.max(rectHeight, autoHeight);
    } else {
      return rectHeight;
    }
  }

  getVirtualExtraRegion(): Rectangle {
    return new Rectangle(this.getVirtualX(), this.getVirtualY(), this.getVirtualWidth(), this.getVirtualHeight());
  }
  /*
  getVirtualTextLocationRegion(): Rectangle {
    const rect = this.getVirtualRegion();
    rect.x += this.leftExtraLength;
    rect.y += this.topExtraLength;
    rect.width -= this.leftExtraLength + this.rightExtraLength;
    rect.height -= this.topExtraLength + this.bottomExtraLength;
    return rect;
  }
  */

  public getVirtualRegion(): Rectangle {
    return this.getVirtualExtraRegion();
  }

  get topExtraLength(): number {
    return this.marginTop;
  }
  get leftExtraLength(): number {
    return this.marginLeft;
  }
  get rightExtraLength(): number {
    return this.marginRight;
  }
  get bottomExtraLength(): number {
    return this.marginBottom;
  }
}

//}
