
/**
 * X座標を取得します。
 */
export function getX(item: SVGGElement): number{
    if (item.transform.baseVal.numberOfItems == 0) {
        item.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    return item.transform.baseVal.getItem(0).matrix.e;

}
/**
 * X座標を設定します。
 */
export function setX(item: SVGGElement, value: number): void{
    if (item.transform.baseVal.numberOfItems == 0) {
        item.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    const a = item.transform.baseVal.getItem(0).matrix.a;
    const b = item.transform.baseVal.getItem(0).matrix.b;
    const c = item.transform.baseVal.getItem(0).matrix.c;
    const d = item.transform.baseVal.getItem(0).matrix.d;
    const e = value;
    const f = item.transform.baseVal.getItem(0).matrix.f;
    item.setAttribute('transform', `matrix(${a} ${b} ${c} ${d} ${e} ${f})`);

}
/**
 * Y座標を取得します。
 */
export function getY(item: SVGGElement): number{
    if (item.transform.baseVal.numberOfItems == 0) {
        item.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }

    return item.transform.baseVal.getItem(0).matrix.f;

}
/**
 * Y座標を設定します。
 */
export function setY(item: SVGGElement, value: number): void{
    if (item.transform.baseVal.numberOfItems == 0) {
        item.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    }
    const a = item.transform.baseVal.getItem(0).matrix.a;
    const b = item.transform.baseVal.getItem(0).matrix.b;
    const c = item.transform.baseVal.getItem(0).matrix.c;
    const d = item.transform.baseVal.getItem(0).matrix.d;
    const e = item.transform.baseVal.getItem(0).matrix.e;
    const f = value;
    item.setAttribute('transform', `matrix(${a} ${b} ${c} ${d} ${e} ${f})`);

}