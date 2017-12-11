
module GraphTableSVG {
    export class Padding {
        top: number = 0;
        left: number = 0;
        right: number = 0;
        bottom: number = 0;
    }
    /*
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    enum VerticalAnchor {
        msoAnchorBottom, msoAnchorMiddle, msoAnchorTop
    }
    */

    export class Cell {
        /*
        upLine: HorizontalCellLine = null;
        bottomLine: HorizontalCellLine = null;
        leftLine: VerticalCellLine = null;
        rightLine: VerticalCellLine = null;
        */
        //item: RectangleText;

        cellX: number;
        cellY: number;
        masterID: number;
        parent: SVGTable;
        padding: Padding;
        private _upLine: SVGLineElement;
        get upLine(): SVGLineElement {
            return this._upLine;
        }
        set upLine(line: SVGLineElement) {
            this._upLine = line;
        } 
        private _leftLine: SVGLineElement;
        get leftLine(): SVGLineElement {
            return this._leftLine;
        }
        set leftLine(line: SVGLineElement) {
            this._leftLine = line;
        } 

        private _rightLine: SVGLineElement;
        get rightLine(): SVGLineElement {
            return this._rightLine;
        }
        set rightLine(line: SVGLineElement) {
            this._rightLine = line;
        } 


        private _bottomLine: SVGLineElement;
        get bottomLine(): SVGLineElement {
            return this._bottomLine;
        }
        set bottomLine(line: SVGLineElement) {
            this._bottomLine = line;
        } 


        svgBackground: SVGRectElement;
        svgText: SVGTextElement;
        //svgGroup: SVGGElement;
        //verticalAnchor: VerticalAnchor = VerticalAnchor.msoAnchorTop;
        private _observer: MutationObserver;
        private observerFunc: MutationCallback = (x: MutationRecord[]) => {
            for (var i = 0; i < x.length; i++) {
                var p = x[i];
                for (var i = 0; i < p.addedNodes.length; i++) {
                    var item = p.addedNodes.item(i);
                    if (item.nodeName == "#text") {
                        this.parent.resize();
                    }
                }
            }
        };

        get logicalWidth(): number {
            if (this.isMaster) {
                var w = 0;
                var now: Cell | null = this;
                while (now != null && this.ID == now.masterID) {
                    now = this.rightCell;
                    w++;
                }
                return w;
            } else {
                return 0;
            }
        }
        get logicalHeight(): number {
            if (this.isMaster) {
                var h = 0;
                var now: Cell | null = this;
                while (now != null && this.ID == now.masterID) {
                    now = this.bottomCell;
                    h++;
                }
                return h;
            } else {
                return 0;
            }
        }

        get textBoxWidth(): number {
            return this.svgText.getBoundingClientRect().width + this.padding.left + this.padding.right;
        }
        get textBoxHeight(): number {
            return this.svgText.getBoundingClientRect().height + this.padding.top + this.padding.bottom;
        }

        resize() {
            if (this.svgBackground.width.baseVal.value < this.textBoxWidth) {
                this.svgBackground.width.baseVal.value = this.textBoxWidth;
            }
            if (this.svgBackground.height.baseVal.value < this.textBoxHeight) {
                this.svgBackground.height.baseVal.value = this.textBoxHeight;
            }
        }
        relocation() {

            this.upLine.x1.baseVal.value = this.svgBackground.x.baseVal.value;
            this.upLine.x2.baseVal.value = this.svgBackground.x.baseVal.value + this.svgBackground.width.baseVal.value;
            this.upLine.y1.baseVal.value = this.svgBackground.y.baseVal.value;
            this.upLine.y2.baseVal.value = this.upLine.y1.baseVal.value;

            this.leftLine.x1.baseVal.value = this.svgBackground.x.baseVal.value;
            this.leftLine.x2.baseVal.value = this.leftLine.x1.baseVal.value;
            this.leftLine.y1.baseVal.value = this.svgBackground.y.baseVal.value;
            this.leftLine.y2.baseVal.value = this.svgBackground.y.baseVal.value + this.svgBackground.height.baseVal.value;

            this.rightLine.x1.baseVal.value = this.svgBackground.x.baseVal.value + this.svgBackground.width.baseVal.value;
            this.rightLine.x2.baseVal.value = this.rightLine.x1.baseVal.value;
            this.rightLine.y1.baseVal.value = this.svgBackground.y.baseVal.value;
            this.rightLine.y2.baseVal.value = this.svgBackground.y.baseVal.value + this.svgBackground.height.baseVal.value;

            this.bottomLine.x1.baseVal.value = this.svgBackground.x.baseVal.value;
            this.bottomLine.x2.baseVal.value = this.svgBackground.x.baseVal.value + this.svgBackground.width.baseVal.value;
            this.bottomLine.y1.baseVal.value = this.svgBackground.y.baseVal.value + this.svgBackground.height.baseVal.value;
            this.bottomLine.y2.baseVal.value = this.bottomLine.y1.baseVal.value;

            //this.textSVG.x.baseVal.getItem(0).value = 0;
            var text_x = this.svgBackground.x.baseVal.value;
            var text_y = this.svgBackground.y.baseVal.value;
            if (this.svgText.style.textAnchor == "middle") {
                text_x += (this.textBoxWidth / 2);
                text_y += (this.textBoxHeight / 2);
            } else if (this.svgText.style.textAnchor == "left") {
                text_x += this.padding.left;
                text_y += this.padding.top;
            } else {

            }
            this.svgText.setAttribute('x', text_x.toString());
            this.svgText.setAttribute('y', text_y.toString());

        }


        get isMaster(): boolean {
            return this.ID == this.masterID;
        }
        get isSlave(): boolean {
            return !this.isMaster;
        }
        get ID(): number {
            return this.cellX + (this.cellY * this.parent.width);
        }
        get upCell(): Cell | null {
            return this.cellY != 0 ? this.parent.cells[this.cellY - 1][this.cellX] : null;
        }
        get leftCell(): Cell | null {
            return this.cellX != 0 ? this.parent.cells[this.cellY][this.cellX - 1] : null;
        }
        get rightCell(): Cell | null {
            return this.cellX + 1 != this.parent.width ? this.parent.cells[this.cellY][this.cellX + 1] : null;
        }
        get bottomCell(): Cell | null {
            return this.cellY + 1 != this.parent.height ? this.parent.cells[this.cellY + 1][this.cellX] : null;
        }

        get upperGroupCells(): Cell[] {
            if (this.isMaster) {
                var w: Cell[] = [];
                var now: Cell | null = this;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.upCell;
                }
                return w;
            } else {
                return [];
            }
        }
        get leftGroupCells(): Cell[] {
            if (this.isMaster) {
                var w: Cell[] = [];
                var now: Cell | null = this;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.leftCell;
                }
                return w;
            } else {
                return [];
            }
        }
        get leftBottomGroupCell(): Cell | null {
            if (this.isMaster) {
                return this.parent.cells[this.cellY + this.logicalHeight - 1][this.cellX];
            } else {
                return null;
            }
        }
        get rightUpGroupCell(): Cell | null {
            if (this.isMaster) {
                return this.parent.cells[this.cellY][this.cellX + this.logicalWidth - 1];
            } else {
                return null;
            }
        }
        get bottomGroupCells(): Cell[] {
            if (this.isMaster) {
                var w: Cell[] = [];
                var now: Cell | null = this.leftBottomGroupCell;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.bottomCell;
                }
                return w;

            } else {
                return [];
            }
        }
        get rightGroupCells(): Cell[] {
            if (this.isMaster) {
                var w: Cell[] = [];
                var now: Cell | null = this.rightUpGroupCell;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.rightCell;
                }
                return w;

            } else {
                return [];
            }
        }
        /*
        get upVirtualCells(): Cell[] {
            if (this.isMaster && this.cellY != 0) {
                var upperGroupCells = this.upperGroupCells;
                var r1 = upperGroupCells.map(function (x, i, self) {
                    return upperGroupCells[i].upCell;
                });
                var r2 = r1.filter(function (x, i, self) {
                    return r1.indexOf(x) === i;
                });
                return r2;
            } else {
                return [];
            }
        }
        */

        get x(): number {
            return this.svgBackground.x.baseVal.value;
        }
        set x(value: number) {
            this.svgBackground.x.baseVal.value = value;
        }

        get y(): number {
            return this.svgBackground.y.baseVal.value;
        }
        set y(value: number) {
            this.svgBackground.y.baseVal.value = value;
        }

        get width(): number {
            return this.svgBackground.width.baseVal.value;
        }
        set width(value: number) {
            this.svgBackground.width.baseVal.value = value;
        }

        get height(): number {
            return this.svgBackground.height.baseVal.value;
        }
        set height(value: number) {
            this.svgBackground.height.baseVal.value = value;
        }
        constructor(parent: SVGTable, _px: number, _py: number, _rect: SVGRectElement, _text: SVGTextElement) {
            this.padding = new Padding();
            this.cellX = _px;
            this.cellY = _py;
            this.parent = parent;
            this.masterID = this.ID;

            this.svgBackground = _rect;
            this.parent.group.appendChild(this.svgBackground);

            this.svgText = _text;
            this.parent.group.appendChild(this.svgText);

            this.upLine = GraphTableSVG.createLine(0, 0, 0, 0);
            this.leftLine = GraphTableSVG.createLine(0, 0, 0, 0);
            this.rightLine = GraphTableSVG.createLine(0, 0, 0, 0);
            this.bottomLine = GraphTableSVG.createLine(0, 0, 0, 0);
            this.parent.group.appendChild(this.upLine);
            this.parent.group.appendChild(this.leftLine);
            this.parent.group.appendChild(this.rightLine);
            this.parent.group.appendChild(this.bottomLine);


            
            this._observer = new MutationObserver(this.observerFunc);
            var option: MutationObserverInit = { childList : true };
            this._observer.observe(this.svgText, option);


        }
        /*
        get fill(): string {
            return this.backRect.style.fill;
        }
        set fill(value : string) {
            this.backRect.style.fill = value;
        }
        */


    }
}