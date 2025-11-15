/**
 * Wait until the getBBox() result of an SVG element becomes stable.
 *
 * @param element SVG element (e.g. <text>, <rect>, <g>...)
 * @param options
 *  - maxFrames: 最大待機フレーム数（約 60 で 1 秒）
 *  - tolerance: 幅・高さ・位置の変動許容誤差
 */
export async function waitForStableBBox(
    element: SVGGraphicsElement,
    options: { maxFrames?: number; tolerance?: number } = {}
  ): Promise<DOMRect> {
    const { maxFrames = 60, tolerance = 0.5 } = options;
  
    // Web フォント使用時のために、フォントロード完了を待つ
    const anyDoc = document as any;
    if (anyDoc.fonts?.ready instanceof Promise) {
      try {
        await anyDoc.fonts.ready;
      } catch {
        // フォント読み込み失敗時はそのまま続行
      }
    }
  
    return new Promise<DOMRect>((resolve) => {
      let lastBox: DOMRect | null = null;
      let stableCount = 0;
      let frame = 0;
  
      const check = () => {
        frame++;
        const box = element.getBBox(); // DOMRect
  
        if (lastBox) {
          const dw = Math.abs(box.width - lastBox.width);
          const dh = Math.abs(box.height - lastBox.height);
          const dx = Math.abs(box.x - lastBox.x);
          const dy = Math.abs(box.y - lastBox.y);
  
          // 前回との差が許容範囲内なら「安定した」とみなす
          if (dw < tolerance && dh < tolerance && dx < tolerance && dy < tolerance) {
            stableCount++;
          } else {
            stableCount = 0;
          }
  
          // 数フレーム連続で安定していたら確定
          if (stableCount >= 3) {
            resolve(box);
            return;
          }
        }
  
        lastBox = box;
  
        // タイムアウト（maxFrames 経過）したら、その時点の値で確定
        if (frame > maxFrames) {
          resolve(box);
          return;
        }
  
        requestAnimationFrame(check);
      };
  
      requestAnimationFrame(check);
    });
  }

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