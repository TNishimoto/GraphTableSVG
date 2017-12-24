
module GraphTableSVG {
    

    export class Cell {
        private static defaultBackgroundClassName: string = "--default-background-class";
        private static defaultTextClass: string = "--default-text-class";
        masterID: number;
        parent: Table;
        //padding: Padding;
        svgBackground: SVGRectElement;
        svgText: SVGTextElement;
        svgGroup: SVGGElement;
        //rect: SVGRectElement;
        
        
        //private _horizontalAnchor: HorizontalAnchor;
        
        get paddingLeft(): number {
            return parsePXString(this.svgGroup.getPropertyStyleValue("padding-left"));
        }
        get paddingRight(): number {
            return parsePXString(this.svgGroup.getPropertyStyleValue("padding-right"));
        }
        get paddingTop(): number {
            return parsePXString(this.svgGroup.getPropertyStyleValue("padding-top"));
        }
        get paddingBottom(): number {
            return parsePXString(this.svgGroup.getPropertyStyleValue("padding-bottom"));

        }

        get horizontalAnchor(): string | null {
            //return this.svgGroup.getActiveStyle().getHorizontalAnchor();
            return this.svgGroup.getPropertyStyleValue(HorizontalAnchorPropertyName);
        }
        set horizontalAnchor(value: string | null) {
            this.svgGroup.setPropertyStyleValue(HorizontalAnchorPropertyName, value);
            //this.svgGroup.getActiveStyle().setHorizontalAnchor(value)
            this.relocation();
        }
        get cellX(): number {
            return Number(this.svgGroup.getAttribute("cellX"));
        }
        set cellX(value: number) {
            this.svgGroup.setAttribute("cellX", value.toString());
        }
        get cellY(): number {
            return Number(this.svgGroup.getAttribute("cellY"));
        }
        set cellY(value: number) {
            this.svgGroup.setAttribute("cellY", value.toString());
        }

        
        get verticalAnchor(): string | null {
            return this.svgGroup.getPropertyStyleValue(VerticalAnchorPropertyName);
        }
        set verticalAnchor(value: string | null) {
            this.svgGroup.setPropertyStyleValue(VerticalAnchorPropertyName, value);
            this.relocation();
        }
        


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

        get defaultTextClass(): string | null {
            var r = this.svgGroup.getPropertyStyleValue(Cell.defaultTextClass);
            return r;
        }
        get defaultBackgroundClass(): string | null {
            return this.svgGroup.getPropertyStyleValue(Cell.defaultBackgroundClassName);
        }

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

        get isLocated(): boolean {
            return IsDescendantOfBody(this.svgGroup);
        }

        get textBoxWidth(): number {
            if (this.isLocated) {
                return this.svgText.getBBox().width + parsePXString(this.svgGroup.style.paddingLeft) + parsePXString(this.svgGroup.style.paddingRight);
            } else {
                return 0;
            }
        }
        get textBoxHeight(): number {
            if (this.isLocated) {
                return this.svgText.getBBox().height + parsePXString(this.svgGroup.style.paddingTop) + parsePXString(this.svgGroup.style.paddingBottom);
            } else {
                return 0;
            }
        }

        resize() {
            if (this.width < this.textBoxWidth) {
                this.width = this.textBoxWidth;
            }
            if (this.height < this.textBoxHeight) {
                this.height = this.textBoxHeight;
            }
        }
        relocation() {
            if (!IsDescendantOfBody(this.svgGroup)) return;
            this.upLine.x1.baseVal.value = this.x;
            this.upLine.x2.baseVal.value = this.x + this.width;
            this.upLine.y1.baseVal.value = this.y;
            this.upLine.y2.baseVal.value = this.upLine.y1.baseVal.value;

            this.leftLine.x1.baseVal.value = this.x;
            this.leftLine.x2.baseVal.value = this.leftLine.x1.baseVal.value;
            this.leftLine.y1.baseVal.value = this.y;
            this.leftLine.y2.baseVal.value = this.y + this.height;

            this.rightLine.x1.baseVal.value = this.x + this.width;
            this.rightLine.x2.baseVal.value = this.rightLine.x1.baseVal.value;
            this.rightLine.y1.baseVal.value = this.y;
            this.rightLine.y2.baseVal.value = this.y + this.height;

            this.bottomLine.x1.baseVal.value = this.x;
            this.bottomLine.x2.baseVal.value = this.x + this.width;
            this.bottomLine.y1.baseVal.value = this.y + this.height;
            this.bottomLine.y2.baseVal.value = this.bottomLine.y1.baseVal.value;

            //this.textSVG.x.baseVal.getItem(0).value = 0;
            var text_x = 0;
            var text_y = 0;

            var innerRect = new Rectangle();
            innerRect.x = this.paddingLeft;
            innerRect.y = this.paddingTop;
            innerRect.height = this.height - this.paddingTop - this.paddingBottom;
            innerRect.width = this.width - this.paddingLeft - this.paddingRight;
            
            setXY(this.svgText, innerRect, this.verticalAnchor, this.horizontalAnchor);

            

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
            return this.svgGroup.getX();
        }
        set x(value: number) {
            this.svgGroup.setX(value);
        }

        get y(): number {
            return this.svgGroup.getY();
        }
        set y(value: number) {
            this.svgGroup.setY(value);
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
        get region(): Rectangle {
            var p = new Rectangle(this.x, this.y, this.width, this.height);
            return p;
        }

        constructor(parent: Table, _px: number, _py: number, cellClass : string | null = null, borderClass : string | null = null) {



            this.svgGroup = createGroup();
            if (cellClass != null) this.svgGroup.setAttribute("class", cellClass);
            //this.padding = new Padding();
            this.cellX = _px;
            this.cellY = _py;
            this.parent = parent;
            this.masterID = this.ID;



            this.svgBackground = createRectangle(this.defaultBackgroundClass);
            this.svgText = createText(this.defaultTextClass);
            this.svgGroup.appendChild(this.svgBackground);

            /*
            var circle = createRectangle();
            circle.style.fill = "blue";
            this.rect = circle;
            this.svgGroup.appendChild(circle);
            */

            this.svgGroup.appendChild(this.svgText);
            //this.parent.svgGroup.appendChild(this.svgGroup);
            this.parent.svgGroup.insertBefore(this.svgGroup, this.parent.svgGroup.firstChild);


            this.upLine = GraphTableSVG.createLine(0, 0, 0, 0, borderClass);
            this.leftLine = GraphTableSVG.createLine(0, 0, 0, 0, borderClass);
            this.rightLine = GraphTableSVG.createLine(0, 0, 0, 0, borderClass);
            this.bottomLine = GraphTableSVG.createLine(0, 0, 0, 0, borderClass);
            this.parent.svgGroup.appendChild(this.upLine);
            this.parent.svgGroup.appendChild(this.leftLine);
            this.parent.svgGroup.appendChild(this.rightLine);
            this.parent.svgGroup.appendChild(this.bottomLine);

            
            
            this._observer = new MutationObserver(this.observerFunc);
            var option: MutationObserverInit = { childList : true };
            this._observer.observe(this.svgText, option);

            /*
            this.verticalAnchor = VerticalAnchor.Middle;
            this.horizontalAnchor = HorizontalAnchor.Left;
            */

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