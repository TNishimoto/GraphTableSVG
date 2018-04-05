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

        export function getRegion(items: (Graph | Table | SVGPathElement | SVGTextElement)[]): Rectangle {
            const rects = items.map((v) => {
                if (v instanceof Graph) {
                    return v.getRegion();
                } else if (v instanceof Table) {
                    return v.getRegion();
                } else if (v instanceof SVGPathElement || v instanceof SVGTextElement) {
                    const rect = v.getBBox();
                    return new Rectangle(rect.x, rect.y, rect.width, rect.height);
                } else {
                    return new Rectangle();
                }
            });
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
        const CSSName: string = "___GraphTableCSS";
        export function setGraphTableCSS(cellColor: string, borderColor : string) {
            const item = document.head.getElementsByClassName(CSSName);
            if (item.length > 0) {
                document.head.removeChild(item[0]);
            }
            var blankStyle: HTMLStyleElement = document.createElement('style');

            blankStyle.innerHTML = `
            .${Cell.emphasisCellClass}{
            fill : ${cellColor} !important;
            }
            .${Cell.emphasisBorderClass}{
            stroke : ${borderColor} !important;
            }

            `
            blankStyle.type = "text/css";
            blankStyle.setAttribute("class", CSSName);

            const head = document.getElementsByTagName('head');
            
            head.item(0).appendChild(blankStyle);

        }
        export function getGraphTableCSS(): HTMLElement | null {
            const item = document.getElementById(CSSName);
            return item;
        }
    }
}