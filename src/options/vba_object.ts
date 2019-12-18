//namespace GraphTableSVG {
    import { Rectangle } from "../basic/common/vline";
    import {GGraph} from "../object/g_graph"
    import {GTable} from "../object/g_table"
    import {GObject} from "../object/g_object"
//    import {VBAObjectType} from "./svg_to_vba"

    export type VBAObjectType = SVGPathElement | SVGTextElement | GObject;

    //export namespace VBAObject{
        /**
         * 領域を取得します。
         * @param items 
         */
        export function getRegion(items: VBAObjectType[]): Rectangle {
            const rects = items.map((v) => {
                if (v instanceof GObject) {
                    return v.getRegion();
                } else if (v instanceof SVGPathElement || v instanceof SVGTextElement) {
                    const rect = v.getBBox();
                    return new Rectangle(rect.x, rect.y, rect.width, rect.height);
                } else {
                    return new Rectangle();
                }
            });
            if (rects.length > 0) {
                return Rectangle.merge(rects);
            } else {
                return new Rectangle();
            }
        }
        /**
         * グラフや表を消去します。
         * @param svg 
         * @param items 
         */
        export function clearGraphTables(svg: SVGElement, items: (GGraph | GTable)[]) {
            for (let i = 0; i < items.length; i++) {
                var item = items[i];
                if (item instanceof GGraph) {
                    item.removeGraph(svg);
                } else if (item instanceof GTable) {
                    item.removeTable(svg);
                }
            }
            
        }

    //}
