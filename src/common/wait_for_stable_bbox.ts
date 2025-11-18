/**
 * Wait until the getBBox() results of multiple SVG elements become stable.
 *
 * @param elements SVG elements (e.g. <text>, <rect>, <g>...)
 * @param options
 *  - maxFrames: 最大待機フレーム数（約 60 で 1 秒）
 *  - tolerance: 幅・高さ・位置の変動許容誤差
 */
export async function waitForStableBBoxAll(
  elements: SVGGraphicsElement[],
  options: { maxFrames?: number; tolerance?: number } = {}
): Promise<DOMRect[]> {
  const { maxFrames = 60, tolerance = 0.5 } = options;

  const anyDoc = document as any;
  if (anyDoc.fonts?.ready instanceof Promise) {
    try {
      await anyDoc.fonts.ready;
    } catch {}
  }

  return new Promise<DOMRect[]>((resolve) => {
    let lastBoxes: (DOMRect | null)[] = elements.map(() => null);
    let stableCounts: number[] = elements.map(() => 0);
    let frame = 0;

    const check = () => {
      frame++;

      const boxes = elements.map((el) => el.getBBox());
      let allStable = true;

      for (let i = 0; i < elements.length; i++) {
        const box = boxes[i];
        const last = lastBoxes[i];

        if (last) {
          const dw = Math.abs(box.width - last.width);
          const dh = Math.abs(box.height - last.height);
          const dx = Math.abs(box.x - last.x);
          const dy = Math.abs(box.y - last.y);

          if (dw < tolerance && dh < tolerance && dx < tolerance && dy < tolerance) {
            stableCounts[i]++;
          } else {
            stableCounts[i] = 0;
          }

          if (stableCounts[i] < 3) allStable = false;
        } else {
          allStable = false; // 初回はまだ安定しない
        }

        lastBoxes[i] = box;
      }

      if (allStable) {
        resolve(boxes);
        return;
      }

      if (frame > maxFrames) {
        resolve(boxes);
        return;
      }

      requestAnimationFrame(check);
    };

    requestAnimationFrame(check);
  });
}


/*
export function getBBoxAfterFramesWithTolerance(
  element: SVGGraphicsElement,
  callback: (box: DOMRect) => void,
  options: { frames?: number; tolerance?: number } = {}
): void {
  const frames = options.frames ?? 3;
  const tolerance = options.tolerance ?? 0.5;

  let lastBox: DOMRect | null = null;
  let stableCount = 0;
  let frameCount = 0;

  const step = () => {
    frameCount++;
    const box = element.getBBox();

    if (lastBox) {
      const dw = Math.abs(box.width - lastBox.width);
      const dh = Math.abs(box.height - lastBox.height);
      const dx = Math.abs(box.x - lastBox.x);
      const dy = Math.abs(box.y - lastBox.y);

      if (dw < tolerance && dh < tolerance && dx < tolerance && dy < tolerance) {
        stableCount++;
      } else {
        stableCount = 0;
      }
    }

    lastBox = box;

    if (stableCount >= 2 || frameCount >= frames) {
      callback(box);
      return;
    }

    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
*/