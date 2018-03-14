namespace GraphTableSVG {
    export namespace Common {
        export function clearGraphTables(svg: HTMLElement, items: (GraphTableSVG.Graph | GraphTableSVG.Table)[]) {
            for (let i = 0; i < items.length; i++) {
                var item = items[i];
                if (item instanceof GraphTableSVG.Graph) {
                    item.removeGraph(svg);
                } else if (item instanceof GraphTableSVG.Table) {
                    item.removeTable(svg);
                }
            }
        }
        export function IsDescendantOfBody(node: Node): boolean {
            const parent = node.parentNode;
            if (parent == null) {
                return false;
            }
            else if (parent == document.body) {
                return true;
            } else {
                return Common.IsDescendantOfBody(parent);
            }
        }

        export function getRegion(items: (Graph | Table)[]): Rectangle {
            const rects = items.map((v) => v.getRegion());
            if (rects.length > 0) {
                return GraphTableSVG.Rectangle.merge(rects);
            } else {
                return new Rectangle();
            }
        }
        export function paddingLeft(str: string, n: number, char: string): string {
            while (str.length < n) {
                str = char + str;
            }
            return str;
        }
    }
}