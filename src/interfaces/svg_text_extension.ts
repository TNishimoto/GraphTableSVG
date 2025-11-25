import { Size, Rectangle, round100 } from "../common/vline";
import {
  HorizontalAnchor,
  VerticalAnchor,
  AutoSizeShapeToFitText,
} from "../common/enums";
import * as SVGTextBox from "./svg_textbox";
import * as AttributeNames from "../common/attribute_names"
import * as StyleNames from "../common/style_names";
import * as ElementExtension from "./element_extension";
import * as HTMLFunctions from "../html/html_functions";
import * as CommonFunctions from "../common/common_functions";

/**
 * X座標を取得します。
 */
export function getX(item: SVGTextElement): number {
  if (item.x.baseVal.numberOfItems == 0) {
    item.setAttribute("x", "0");
  }
  return item.x.baseVal.getItem(0).value;
}
/**
 * X座標を設定します。
 */
export function setX(item: SVGTextElement, value: number): void {
  if (item.x.baseVal.numberOfItems == 0) {
    item.setAttribute("x", "0");
  }
  //p.setAttribute('x', value.toString());

  item.x.baseVal.getItem(0).value = value;
}
/**
 * Y座標を取得します。
 */
export function getY(item: SVGTextElement): number {
  if (item.y.baseVal.numberOfItems == 0) {
    item.setAttribute("y", "0");
  }
  return item.y.baseVal.getItem(0).value;
}
/**
 * Y座標を設定します。
 */
export function setY(item: SVGTextElement, value: number): void {
  if (item.y.baseVal.numberOfItems == 0) {
    item.setAttribute("y", "0");
  }
  item.y.baseVal.getItem(0).value = value;
}
/**
 * SVGTextElementのテキストを設定します。
 * @param text 設定するテキスト
 * @param isLatexMode TrueのときLatex表記を使用します。
 */

export function setTextContent(
  item: SVGTextElement,
  text: string,
  isLatexMode: boolean = false
): void {
  SVGTextBox.setTextToSVGText(item, text, isLatexMode);
}
//setTextContent(text: string): void;

export function getMarginLeft(item: SVGTextElement): number {
  return ElementExtension.getPropertyStyleNumberValue(
    item,
    StyleNames.marginLeft,
    0
  )!;
}
export function setMarginLeft(item: SVGTextElement, value: number): void {
  ElementExtension.setPropertyStyleValue(
    item,
    StyleNames.marginLeft,
    value.toString()
  );
}
export function getMarginTop(item: SVGTextElement): number {
  return ElementExtension.getPropertyStyleNumberValue(
    item,
    StyleNames.marginTop,
    0
  )!;
}
export function setMarginTop(item: SVGTextElement, value: number): void {
  ElementExtension.setPropertyStyleValue(
    item,
    StyleNames.marginTop,
    value.toString()
  );
}
export function getMarginRight(item: SVGTextElement): number {
  return ElementExtension.getPropertyStyleNumberValue(
    item,
    StyleNames.marginRight,
    0
  )!;
}
export function setMarginRight(item: SVGTextElement, value: number): void {
  ElementExtension.setPropertyStyleValue(
    item,
    StyleNames.marginRight,
    value.toString()
  );
}
export function getMarginBottom(item: SVGTextElement): number {
  return ElementExtension.getPropertyStyleNumberValue(
    item,
    StyleNames.marginBottom,
    0
  )!;
}
export function setMarginBottom(item: SVGTextElement, value: number): void {
  ElementExtension.setPropertyStyleValue(
    item,
    StyleNames.marginBottom,
    value.toString()
  );
}

export function updateLocationOrGetUpdateFlag(
  text: SVGTextElement,
  rect: Rectangle,
  vAnchor: VerticalAnchor | null,
  hAnchor: HorizontalAnchor | null,
  isAutoSizeShapeToFitText: AutoSizeShapeToFitText,
  executeUpdate: boolean
): boolean {
  const box_x = ElementExtension.gtGetAttributeNumber(text, AttributeNames.dataBBoxXName, null);
  const box_y = ElementExtension.gtGetAttributeNumber(text, AttributeNames.dataBBoxYName, null);
  const box_width = ElementExtension.gtGetAttributeNumber(text, AttributeNames.dataBBoxWidthName, null);
  const box_height = ElementExtension.gtGetAttributeNumber(text, AttributeNames.dataBBoxHeightName, null);
  if (box_x == null || box_y == null || box_width == null || box_height == null) {
    throw Error("virtual region is not set");
  }
  const box = new Rectangle(box_x, box_y, box_width, box_height);



  //const box = getVirtualRegion(<any>text);

  let y = rect.y - box.y;
  let x = rect.x - box.x;

  if (vAnchor == VerticalAnchor.Middle) {
    y += (rect.height - box.height) / 2;
  } else if (vAnchor == VerticalAnchor.Bottom) {
    y += rect.height - box.height;
  }

  if (hAnchor == HorizontalAnchor.Center) {
    x += (rect.width - box.width) / 2;
  } else if (hAnchor == HorizontalAnchor.Right) {
    x += rect.width - box.width;
  }

  const roundX = round100(x);
  const roundY = round100(y);

  const _x = (<any>text).getAttribute("x", x.toString());
  const _y = (<any>text).getAttribute("y", y.toString());
  let b = false;

  if (_x != roundX) {
    b = true;
    if (executeUpdate) {
      (<any>text).setAttribute("x", roundX.toString());
    }
  }
  if (_y != roundY) {
    b = true;
    if (executeUpdate) {
      (<any>text).setAttribute("y", roundY.toString());
    }
  }
  return b;
}

export function updateLocation(
  text: SVGTextElement,
  rect: Rectangle,
  vAnchor: VerticalAnchor | null,
  hAnchor: HorizontalAnchor | null,
  isAutoSizeShapeToFitText: AutoSizeShapeToFitText
): boolean {
  return updateLocationOrGetUpdateFlag(
    text,
    rect,
    vAnchor,
    hAnchor,
    isAutoSizeShapeToFitText,
    true
  );
}
export function getUpdateFlagOfLocation(
  text: SVGTextElement,
  rect: Rectangle,
  vAnchor: VerticalAnchor | null,
  hAnchor: HorizontalAnchor | null,
  isAutoSizeShapeToFitText: AutoSizeShapeToFitText
): boolean {
  return updateLocationOrGetUpdateFlag(
    text,
    rect,
    vAnchor,
    hAnchor,
    isAutoSizeShapeToFitText,
    false
  );
}

export function getHeight(
  text: SVGTSpanElement | SVGTextElement | SVGTextPathElement
): number {
  const b = HTMLFunctions.isShow(text);
  if (b) {
    return text.getBBox().height;
  } else {
    throw Error("error!");
  }
}
export function getWidth(
  text: SVGTSpanElement | SVGTextElement | SVGTextPathElement
): number {
  const b = HTMLFunctions.isShow(text);
  if (b) {
    return text.getBBox().width;
  } else {
    throw Error("error!");
  }

  /*
    if (text instanceof SVGTSpanElement) {
        const style = getComputedStyle(text);
        const fontSize = CommonFunctions.toPX(style.fontSize!);
        const fontFamily = style.fontFamily!;

        return text.getBBox().width;
        //return superComputeTextWidth(text.textContent!, fontSize, fontFamily, style.fontWeight);

        //return superComputeTextWidth(text.textContent!, fontSize, fontFamily);
        //return computeTextWidth(text.textContent!, fontSize, fontFamily);
    } else {

        const tspans = <SVGTSpanElement[]>HTMLFunctions.getChildren(text).filter((v) => v.nodeName == "tspan");
        let len = 0;
        tspans.forEach((v) => { len += getVirtualWidth(v) });
        return len;
    }
    */
}

export function getSize(
  svgText: SVGTextElement,
  showChecked: boolean = false
): Rectangle {
  let r = new Rectangle();
  const b = showChecked ? true : HTMLFunctions.isShow(svgText);

  if (b) {
    const rect = svgText.getBBox();
    r.x = rect.x;
    r.y = rect.y;
    r.width = rect.width;
    r.height = rect.height;
    return r;
  } else {
    return new Rectangle();
  }
}

function getHorizontalAnchor(svgText: SVGTextElement) {
  const b = ElementExtension.getPropertyStyleValueWithDefault(
    svgText, StyleNames.horizontalAnchor, "center"
  );
  return HorizontalAnchor.toHorizontalAnchor(b);
}

function getVerticalAnchor(svgText: SVGTextElement) {
  const b = ElementExtension.getPropertyStyleValueWithDefault(
    svgText, StyleNames.verticalAnchor, "middle"
  );
  return VerticalAnchor.toVerticalAnchor(b);
}

export function getComputedTextLengthsOfTSpans(svgText: SVGTextElement, showChecked: boolean): Size[] {
  const b = showChecked ? true : HTMLFunctions.isShow(svgText);

  if (b) {
      const tspans = <SVGTSpanElement[]>HTMLFunctions.getChildren(svgText).filter((v) => v.nodeName.toLowerCase() == "tspan");
      const r = tspans.map((v) => {
          const w = v.getComputedTextLength();
          //const h = v.getBoundingClientRect().height;
          const fontSize = ElementExtension.getPropertyStyleValueWithDefault(v, "font-size", "24");
          const fs = CommonFunctions.toPX(fontSize);
          return new Size(w, fs);
      })

      return r;
  } else {
      const tspans = <SVGTSpanElement[]>HTMLFunctions.getChildren(svgText).filter((v) => v.nodeName.toLowerCase() == "tspan");
      const r = tspans.map((v) => {
          return new Size(0, 0);
      })
      return r;
  }
}

export function autoLocate(svgText: SVGTextElement) {
  const tSpanItem = <SVGTSpanElement[]>HTMLFunctions.getChildren(svgText).filter((v) => v.nodeName.toLowerCase() == "tspan");
  const hAnchor = getHorizontalAnchor(svgText);
  const vAnchor = getVerticalAnchor(svgText);

  let x = 0;
  if(svgText.hasAttribute("x")){
    x = ElementExtension.gtGetAttributeNumber(svgText, "x", 0)!;
  }

  let widthMax = 0;
  tSpanItem.forEach((v) => {
    const width = v.getComputedTextLength();
    if (width > widthMax) widthMax = width;
  });

  if (hAnchor == HorizontalAnchor.Center) {

    tSpanItem.forEach((v, i) => {
      //const bBox = v.getBBox();
      const width = v.getComputedTextLength();
      const dx = (widthMax - width) / 2;

      v.setAttribute("x", (x + dx).toString());
      if (i > 0) {
        const newDY = 12;
        v.setAttribute("dy", newDY.toString());
      }
    });
  } else if (hAnchor == HorizontalAnchor.Right) {
    throw new Error("not implemented");
  } else {

    tSpanItem.forEach((v, i) => {
      v.setAttribute("x", x.toString());
      if (i > 0) {
        const newDY = 12;
        v.setAttribute("dy", newDY.toString());
      }
    });
  }

}

/*
function getLines(text: SVGTextElement | SVGTSpanElement | SVGTextPathElement) : SVGTSpanElement[][] | SVGTextElement | SVGTSpanElement | SVGTextPathElement{
    if (text instanceof SVGTSpanElement) {
        return text;
    } else {
        const r : SVGTSpanElement[][] = new Array();

        const tspans = <SVGTSpanElement[]>HTMLFunctions.getChildren(text).filter((v) => v.nodeName == "tspan");
        tspans.forEach((v) =>{
            
        })
        let len = 0;
        tspans.forEach((v) => { len += getVirtualTextLineLength(v) });
        return len;
    }
}
*/
export function getRegion(svgText: SVGTextElement): Rectangle {
  const b = HTMLFunctions.isShow(svgText);
  let r = new Rectangle();
  r.x = getX(svgText);
  r.y = getY(svgText);

  if (b) {
    const box = svgText.getBBox();
    r.width = box.width;
    r.height = box.height;
    return r;
  } else {
    throw Error("error!");
  }

  //const style = getComputedStyle(svgText);
  //const fontSize = CommonFunctions.toPX(style.fontSize!);

  /*
    let r = new Rectangle();
    r.x = getX(svgText);
    r.y = getY(svgText);
    r.width = getVirtualWidth(svgText);
    r.height = fontSize;
    */

  //const rect = svgText.getBBox();
  /*
    r.x = rect.x;
    r.y = rect.y;
    r.width = rect.width;
    r.height = rect.height;
    */
  return r;
}
