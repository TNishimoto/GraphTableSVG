import * as AttributeNames from "./attribute_names";

/**
 * Wait until the getBBox() results of multiple SVG elements become stable.
 *
 * @param elements SVG elements (e.g. <text>, <rect>, <g>...)
 * @param options
 *  - maxFrames: 最大待機フレーム数（約 60 で 1 秒）
 *  - tolerance: 幅・高さ・位置の変動許容誤差
 */

type BoxData = {
  bBox: (DOMRect | null)
  bBoxStableCount: number
  boundingClientRect : (DOMRect | null)
  boundingClientRectStableCount : number

};

function checkStableBoundingClientRect(e: SVGGraphicsElement, idx: number, lastBoxes: BoxData[], tolerance: number): boolean {
  const lastBox = lastBoxes[idx].boundingClientRect

  if (lastBox) {
    const currentBox = e.getBoundingClientRect();
    const dw = Math.abs(currentBox.width - lastBox.width);
    const dh = Math.abs(currentBox.height - lastBox.height);
    const dx = Math.abs(currentBox.x - lastBox.x);
    const dy = Math.abs(currentBox.y - lastBox.y);

    if (dw < tolerance && dh < tolerance && dx < tolerance && dy < tolerance) {
      lastBoxes[idx].boundingClientRectStableCount++;
    } else {
      lastBoxes[idx].boundingClientRectStableCount = 0;
    }
    lastBoxes[idx].boundingClientRect = currentBox;

    if (lastBoxes[idx].boundingClientRectStableCount < 3) {
      return false;
    }
    return true;

  } else {
    lastBoxes[idx].boundingClientRect = e.getBoundingClientRect();
    return false;
  }

}


function checkStableBoxes(e: SVGGraphicsElement, idx: number, lastBoxes: BoxData[], tolerance: number): boolean {

  const lastBox = lastBoxes[idx].bBox

  if (lastBox) {
    const currentBox = e.getBBox();
    const dw = Math.abs(currentBox.width - lastBox.width);
    const dh = Math.abs(currentBox.height - lastBox.height);
    const dx = Math.abs(currentBox.x - lastBox.x);
    const dy = Math.abs(currentBox.y - lastBox.y);

    if (dw < tolerance && dh < tolerance && dx < tolerance && dy < tolerance) {
      lastBoxes[idx].bBoxStableCount++;
    } else {
      lastBoxes[idx].bBoxStableCount = 0;
    }
    lastBoxes[idx].bBox = currentBox;

    if (lastBoxes[idx].bBoxStableCount < 3) {
      return false;
    }
    return true;

  } else {
    lastBoxes[idx].bBox = e.getBBox();
    return false; // 初回はまだ安定しない
  }

}

function setStableBoxes(e: SVGGraphicsElement, idx: number, lastBoxes: BoxData[]): void {
  const lastBBox = lastBoxes[idx].bBox
  const lastCBox = lastBoxes[idx].boundingClientRect

  if (lastBBox) {
    if (e instanceof SVGTextElement) {
      e.setAttribute(AttributeNames.dataBBoxWidthName, lastBBox.width.toString());
      e.setAttribute(AttributeNames.dataBBoxHeightName, lastBBox.height.toString());
      e.setAttribute(AttributeNames.dataBBoxXName, lastBBox.x.toString());
      e.setAttribute(AttributeNames.dataBBoxYName, lastBBox.y.toString());
      
    }
  }
  if(lastCBox){
    if (e instanceof SVGTextElement) {
      e.setAttribute(AttributeNames.dataBoundingClientRectXName, lastCBox.x.toString());
      e.setAttribute(AttributeNames.dataBoundingClientRectYName, lastCBox.y.toString());
      e.setAttribute(AttributeNames.dataBoundingClientRectWidthName, lastCBox.width.toString());
      e.setAttribute(AttributeNames.dataBoundingClientRectHeightName, lastCBox.height.toString());
      
    }

  }
}

export async function waitForStableBBoxAll(
  elements: SVGGraphicsElement[],
  options: { maxFrames?: number; tolerance?: number } = {}
): Promise<boolean> {
  const { maxFrames = 60, tolerance = 0.5 } = options;

  const anyDoc = document as any;
  if (anyDoc.fonts?.ready instanceof Promise) {
    try {
      await anyDoc.fonts.ready;
    } catch { }
  }

  return new Promise<boolean>((resolve) => {
    let lastBoxes: BoxData[] = elements.map(() => {
      return { bBox: null, bBoxStableCount: 0, boundingClientRect : null, boundingClientRectStableCount : 0 }
    }
    );
    //let stableCounts: number[] = elements.map(() => 0);
    let frame = 0;



    const check = () => {
      frame++;
      console.log("check")
      console.log(lastBoxes);

      //const boxes = elements.map((el) => el.getBBox());

      let allStable = true;

      for (let i = 0; i < elements.length; i++) {
        const b1 = checkStableBoxes(elements[i], i, lastBoxes, tolerance)
        const b2 = checkStableBoundingClientRect(elements[i], i, lastBoxes, tolerance)
        allStable = allStable && b1 && b2;
      }

      if (allStable) {
        elements.forEach((v, i) => setStableBoxes(v, i, lastBoxes))
        resolve(true);
        return;
      }

      if (frame > maxFrames) {
        resolve(false);
        return;
      }

      requestAnimationFrame(check);
    };

    requestAnimationFrame(check);
  });
}
