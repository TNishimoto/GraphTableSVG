var Padding = (function () {
    function Padding() {
        this.top = 0;
        this.left = 0;
        this.right = 0;
        this.bottom = 0;
    }
    return Padding;
}());
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
var Cell = (function () {
    function Cell(parent, _px, _py, _rect, _text) {
        this.padding = new Padding();
        this.cellX = _px;
        this.cellY = _py;
        this.parent = parent;
        this.masterID = this.ID;
        this.svgBackground = _rect;
        this.parent.group.appendChild(this.svgBackground);
        this.svgText = _text;
        this.parent.group.appendChild(this.svgText);
    }
    Object.defineProperty(Cell.prototype, "logicalWidth", {
        //verticalAnchor: VerticalAnchor = VerticalAnchor.msoAnchorTop;
        get: function () {
            if (this.isMaster) {
                var w = 0;
                var now = this;
                while (now != null && this.ID == now.masterID) {
                    now = this.rightCell;
                    w++;
                }
                return w;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "logicalHeight", {
        get: function () {
            if (this.isMaster) {
                var h = 0;
                var now = this;
                while (now != null && this.ID == now.masterID) {
                    now = this.bottomCell;
                    h++;
                }
                return h;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "textBoxWidth", {
        get: function () {
            return this.svgText.getBoundingClientRect().width + this.padding.left + this.padding.right;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "textBoxHeight", {
        get: function () {
            return this.svgText.getBoundingClientRect().height + this.padding.top + this.padding.bottom;
        },
        enumerable: true,
        configurable: true
    });
    Cell.prototype.resize = function () {
        if (this.svgBackground.width.baseVal.value < this.textBoxWidth) {
            this.svgBackground.width.baseVal.value = this.textBoxWidth;
        }
        if (this.svgBackground.height.baseVal.value < this.textBoxHeight) {
            this.svgBackground.height.baseVal.value = this.textBoxHeight;
        }
    };
    Cell.prototype.relocation = function () {
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
        }
        else if (this.svgText.style.textAnchor == "left") {
            text_x += this.padding.left;
            text_y += this.padding.top;
        }
        else {
        }
        this.svgText.setAttribute('x', text_x.toString());
        this.svgText.setAttribute('y', text_y.toString());
    };
    Object.defineProperty(Cell.prototype, "isMaster", {
        get: function () {
            return this.ID == this.masterID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "isSlave", {
        get: function () {
            return !this.isMaster;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "ID", {
        get: function () {
            return this.cellX + (this.cellY * this.parent.width);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "upCell", {
        get: function () {
            return this.cellY != 0 ? this.parent.cells[this.cellY - 1][this.cellX] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "leftCell", {
        get: function () {
            return this.cellX != 0 ? this.parent.cells[this.cellY][this.cellX - 1] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "rightCell", {
        get: function () {
            return this.cellX + 1 != this.parent.width ? this.parent.cells[this.cellY][this.cellX + 1] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "bottomCell", {
        get: function () {
            return this.cellY + 1 != this.parent.height ? this.parent.cells[this.cellY + 1][this.cellX] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "upperGroupCells", {
        get: function () {
            if (this.isMaster) {
                var w = [];
                var now = this;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.rightCell;
                }
                return w;
            }
            else {
                return [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "leftGroupCells", {
        get: function () {
            if (this.isMaster) {
                var w = [];
                var now = this;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.bottomCell;
                }
                return w;
            }
            else {
                return [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "leftBottomGroupCell", {
        get: function () {
            if (this.isMaster) {
                return this.parent.cells[this.cellY + this.logicalHeight - 1][this.cellX];
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "rightUpGroupCell", {
        get: function () {
            if (this.isMaster) {
                return this.parent.cells[this.cellY][this.cellX + this.logicalWidth - 1];
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "bottomGroupCells", {
        get: function () {
            if (this.isMaster) {
                var w = [];
                var now = this.leftBottomGroupCell;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.rightCell;
                }
                return w;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "rightGroupCells", {
        get: function () {
            if (this.isMaster) {
                var w = [];
                var now = this.rightUpGroupCell;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.bottomCell;
                }
                return w;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "upVirtualCells", {
        get: function () {
            if (this.isMaster && this.cellY != 0) {
                var upperGroupCells = this.upperGroupCells;
                var r1 = upperGroupCells.map(function (x, i, self) {
                    return upperGroupCells[i].upCell;
                });
                var r2 = r1.filter(function (x, i, self) {
                    return r1.indexOf(x) === i;
                });
                return r2;
            }
            else {
                return [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "x", {
        get: function () {
            return this.svgBackground.x.baseVal.value;
        },
        set: function (value) {
            this.svgBackground.x.baseVal.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "y", {
        get: function () {
            return this.svgBackground.y.baseVal.value;
        },
        set: function (value) {
            this.svgBackground.y.baseVal.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "width", {
        get: function () {
            return this.svgBackground.width.baseVal.value;
        },
        set: function (value) {
            this.svgBackground.width.baseVal.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "height", {
        get: function () {
            return this.svgBackground.height.baseVal.value;
        },
        set: function (value) {
            this.svgBackground.height.baseVal.value = value;
        },
        enumerable: true,
        configurable: true
    });
    return Cell;
}());
var SVGToVBA = (function () {
    function SVGToVBA() {
    }
    SVGToVBA.createTable = function (table) {
        var lines = new Array(0);
        lines.push("Sub createMyTable()");
        lines.push(" Dim createdSlide As slide");
        lines.push(" Set createdSlide = ActivePresentation.Slides.Add(1, ppLayoutBlank)");
        lines.push(" Dim tableS As shape");
        lines.push(" Dim table_ As table");
        //lines.push(` Set tableS = CreateTable(createdSlide, ${table.height}, ${table.width})`);
        lines.push(" Set tableS = createdSlide.Shapes.AddTable(" + table.height + ", " + table.width + ")");
        //page.Shapes.AddTable(row_, column_)
        lines.push(" Set table_ = tableS.table");
        for (var y = 0; y < table.height; y++) {
            lines.push(" Call EditRow(table_.Rows(" + (y + 1) + "), " + table.rows[y].height + ")");
        }
        for (var x = 0; x < table.width; x++) {
            lines.push(" Call EditColumn(table_.Columns(" + (x + 1) + "), " + table.columns[x].width + ")");
        }
        for (var y = 0; y < table.height; y++) {
            for (var x = 0; x < table.width; x++) {
                var cell = table.cells[y][x];
                lines.push(" Call EditCell(table_.cell(" + (y + 1) + "," + (x + 1) + "), \"" + cell.svgText.textContent + "\", " + VBATranslateFunctions.colorToVBA(cell.svgBackground.style.fill) + ")");
            }
        }
        lines.push("Call EditCellFonts(table_)");
        lines.push("Call EditCellTextFrames(table_)");
        lines.push("Call EditBorders(table_)");
        lines.push("End Sub");
        lines.push(SVGToVBA.cellFunctionCode);
        lines.push("Sub EditCellFonts(table_ As Table)");
        for (var y = 0; y < table.height; y++) {
            for (var x = 0; x < table.width; x++) {
                var cell = table.cells[y][x];
                lines.push(" Call EditCellFont(table_.cell(" + (y + 1) + "," + (x + 1) + ").Shape.TextFrame, " + parseInt(cell.svgText.style.fontSize) + ", \"" + cell.svgText.style.fontFamily + "\", " + VBATranslateFunctions.colorToVBA(cell.svgText.style.fill) + ")");
            }
        }
        lines.push("End Sub");
        lines.push("Sub EditCellTextFrames(table_ As Table)");
        for (var y = 0; y < table.height; y++) {
            for (var x = 0; x < table.width; x++) {
                var cell = table.cells[y][x];
                lines.push(" Call EditCellTextFrame(table_.cell(" + (y + 1) + "," + (x + 1) + ").Shape.TextFrame, " + cell.padding.top + ", " + cell.padding.bottom + ", " + cell.padding.left + ", " + cell.padding.right + ")");
            }
        }
        lines.push("End Sub");
        lines.push("Sub EditBorders(table_ As Table)");
        for (var y = 0; y < table.height; y++) {
            for (var x = 0; x < table.width; x++) {
                var cell = table.cells[y][x];
                lines.push(" Call EditCellBorder(table_.cell(" + (y + 1) + "," + (x + 1) + ").Borders(ppBorderTop), " + VBATranslateFunctions.colorToVBA(cell.upLine.style.fill) + ", " + VBAFunctions.parseInteger(cell.upLine.style.strokeWidth) + ", " + VBAFunctions.visible(cell.upLine.style.visibility) + ")");
                lines.push(" Call EditCellBorder(table_.cell(" + (y + 1) + "," + (x + 1) + ").Borders(ppBorderLeft), " + VBATranslateFunctions.colorToVBA(cell.leftLine.style.fill) + ", " + VBAFunctions.parseInteger(cell.leftLine.style.strokeWidth) + ", " + VBAFunctions.visible(cell.leftLine.style.visibility) + ")");
                if (x + 1 == table.width) {
                    lines.push(" Call EditCellBorder(table_.cell(" + (y + 1) + "," + (x + 1) + ").Borders(ppBorderRight), " + VBATranslateFunctions.colorToVBA(cell.rightLine.style.fill) + ", " + VBAFunctions.parseInteger(cell.rightLine.style.strokeWidth) + ", " + VBAFunctions.visible(cell.rightLine.style.visibility) + ")");
                }
                if (y + 1 == table.height) {
                    lines.push(" Call EditCellBorder(table_.cell(" + (y + 1) + "," + (x + 1) + ").Borders(ppBorderBottom), " + VBATranslateFunctions.colorToVBA(cell.bottomLine.style.fill) + ", " + VBAFunctions.parseInteger(cell.bottomLine.style.strokeWidth) + ", " + VBAFunctions.visible(cell.bottomLine.style.visibility) + ")");
                }
            }
        }
        lines.push("End Sub");
        return VBATranslateFunctions.joinLines(lines);
    };
    return SVGToVBA;
}());
SVGToVBA.cellFunctionCode = "\nSub EditTable(table_ As table, cellInfo_() As Variant)\n    Dim x As Integer\n    Dim y As Integer\n    \n    For x = 1 To UBound(cellInfo_, 1)\n        For y = 1 To UBound(cellInfo_, 2)\n         Call EditCell(table_.cell(x, y), CStr(cellInfo_(x, y)(0)))\n        Next\n    Next\nEnd Sub\n\nSub EditCell(cell_ As cell, text_ As String, backColor As Variant)\n    cell_.Shape.TextFrame.TextRange.text = text_\n    cell_.Shape.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))\nEnd Sub\nSub EditCellFont(frame_ As TextFrame, fontSize As Double, fontName As String, color As Variant)\n    frame_.TextRange.Font.Size = fontSize\n    frame_.TextRange.Font.name = fontName\n    frame_.TextRange.Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))\nEnd Sub\n\n\n\n\nSub EditRow(row_ As Row, height As Integer)\n    row_.height = height\nEnd Sub\nSub EditColumn(column_ As Column, width As Integer)\n    column_.width = width\nEnd Sub\n\nSub EditCellTextFrame(frame_ As TextFrame, marginTop As Double, marginBottom As Double, marginLeft As Double, marginRight As Double)\n    frame_.marginLeft = marginLeft\n    frame_.marginRight = marginRight\n    frame_.marginTop = marginTop\n    frame_.marginBottom = marginBottom\nEnd Sub\n\nSub EditTextRange(range_ As TextRange, text As String, subBeg As Integer, subLen As Integer, color As Variant)\n    range_.text = text\n    range_.Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))\n    If subLen > 0 Then\n    range_.Characters(subBeg, subLen).Font.Subscript = True\n    End If\nEnd Sub\n\nSub EditShape(shape_ As Shape, name As String, visible As Integer, backColor As Variant)\n    shape_.name = name\n    shape_.Fill.visible = visible\n    shape_.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))\nEnd Sub\nSub EditCellBorder(line_ As LineFormat, foreColor As Variant, weight As Integer, transparent As Double)\n    line_.foreColor.RGB = RGB(CInt(foreColor(0)), CInt(foreColor(1)), CInt(foreColor(2)))\n    line_.weight = weight\n    line_.Transparency = transparent\nEnd Sub\n\n";
var VBAFunctions;
(function (VBAFunctions) {
    function parseInteger(value) {
        if (value == "") {
            return 1;
        }
        else {
            return parseInt(value);
        }
    }
    VBAFunctions.parseInteger = parseInteger;
    function visible(value) {
        if (value == "hidden") {
            return 1.0;
        }
        else {
            return 0;
        }
    }
    VBAFunctions.visible = visible;
})(VBAFunctions || (VBAFunctions = {}));
var VBATranslateFunctions = (function () {
    function VBATranslateFunctions() {
    }
    VBATranslateFunctions.createStringFunction = function (item) {
        return item.length == 0 ? "\"\"" : "\"" + item + "\"";
    };
    VBATranslateFunctions.createArrayFunction = function (items) {
        var s = "";
        for (var i = 0; i < items.length; i++) {
            s += items[i];
            if (i + 1 != items.length) {
                s += ", ";
            }
        }
        return "Array(" + s + ")";
    };
    VBATranslateFunctions.createStringArrayFunction = function (items) {
        var s = "";
        for (var i = 0; i < items.length; i++) {
            s += "\"" + items[i] + "\"";
            if (i + 1 != items.length) {
                s += ", ";
            }
        }
        return "Array(" + s + ")";
    };
    VBATranslateFunctions.createJagArrayFunction = function (items) {
        var s = "";
        for (var i = 0; i < items.length; i++) {
            s += VBATranslateFunctions.createArrayFunction(items[i]);
            if (i + 1 != items.length)
                s += ", ";
        }
        return "Array(" + s + ")";
    };
    VBATranslateFunctions.joinLines = function (lines) {
        var s = "";
        for (var i = 0; i < lines.length; i++) {
            s += lines[i];
            if (i + 1 != lines.length)
                s += "\n";
        }
        return s;
    };
    VBATranslateFunctions.colorToVBA = function (color) {
        if (color.indexOf("rgb") != -1) {
            return color.replace("rgb", "Array");
        }
        else {
            if (color == "black") {
                return VBATranslateFunctions.colorToVBA("rgb(0,0,0)");
            }
            else {
                return VBATranslateFunctions.colorToVBA("rgb(0,255,0)");
            }
        }
    };
    return VBATranslateFunctions;
}());
var Row = (function () {
    function Row(_table, _y) {
        this.table = _table;
        this.y = _y;
    }
    Row.prototype.getMaxHeight = function () {
        var height = 0;
        for (var x = 0; x < this.table.width; x++) {
            var cell = this.table.cells[this.y][x];
            if (height < cell.textBoxHeight)
                height = cell.textBoxHeight;
            if (height < cell.svgBackground.height.baseVal.value)
                height = cell.svgBackground.height.baseVal.value;
        }
        return height;
    };
    Row.prototype.setHeight = function (height) {
        for (var x = 0; x < this.table.width; x++) {
            var cell = this.table.cells[this.y][x];
            cell.svgBackground.height.baseVal.value = height;
        }
    };
    Row.prototype.resize = function () {
        this.setHeight(this.getMaxHeight());
    };
    Row.prototype.setY = function (posY) {
        for (var x = 0; x < this.table.width; x++) {
            var cell = this.table.cells[this.y][x];
            cell.svgBackground.y.baseVal.value = posY;
        }
    };
    Object.defineProperty(Row.prototype, "height", {
        get: function () {
            return this.getMaxHeight();
        },
        set: function (value) {
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                cell.svgBackground.height.baseVal.value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Row;
}());
var Column = (function () {
    function Column(_table, _x) {
        this.table = _table;
        this.x = _x;
    }
    Column.prototype.getMaxWidth = function () {
        var width = 0;
        for (var y = 0; y < this.table.height; y++) {
            var cell = this.table.cells[y][this.x];
            if (width < cell.textBoxWidth)
                width = cell.textBoxWidth;
            console.log(cell.textBoxWidth);
            if (width < cell.svgBackground.width.baseVal.value)
                width = cell.svgBackground.width.baseVal.value;
        }
        return width;
    };
    Column.prototype.setWidth = function (width) {
        for (var y = 0; y < this.table.height; y++) {
            var cell = this.table.cells[y][this.x];
            cell.svgBackground.width.baseVal.value = width;
        }
    };
    Column.prototype.resize = function () {
        this.setWidth(this.getMaxWidth());
    };
    Column.prototype.setX = function (posX) {
        for (var y = 0; y < this.table.height; y++) {
            var cell = this.table.cells[y][this.x];
            cell.svgBackground.x.baseVal.value = posX;
        }
    };
    Object.defineProperty(Column.prototype, "width", {
        get: function () {
            return this.getMaxWidth();
        },
        set: function (value) {
            this.setWidth(value);
        },
        enumerable: true,
        configurable: true
    });
    return Column;
}());
var SVGTable = (function () {
    function SVGTable(_svg, width, height) {
        this.svg = _svg;
        this.cells = new Array(height);
        var svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.group = svgGroup;
        svgGroup.setAttributeNS(null, 'transform', "translate(160,0)");
        this.svg.appendChild(this.group);
        //this.verticalLines = new Array(width + 1);
        //this.horizontalLines = new Array(height + 1);
        for (var y = 0; y < height; y++) {
            this.cells[y] = new Array(width);
            for (var x = 0; x < width; x++) {
                this.cells[y][x] = new Cell(this, x, y, TableFunctions.createRectangle(), TableFunctions.createText());
            }
        }
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                this.setLine(this.cells[y][x]);
            }
        }
        this.resize();
    }
    Object.defineProperty(SVGTable.prototype, "width", {
        get: function () {
            return this.cells[0].length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SVGTable.prototype, "height", {
        get: function () {
            return this.cells.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SVGTable.prototype, "rows", {
        get: function () {
            var arr = new Array(0);
            for (var y = 0; y < this.height; y++) {
                arr.push(new Row(this, y));
            }
            return arr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SVGTable.prototype, "columns", {
        get: function () {
            var arr = new Array(0);
            for (var x = 0; x < this.width; x++) {
                arr.push(new Column(this, x));
            }
            return arr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SVGTable.prototype, "cellArray", {
        get: function () {
            var arr = new Array(0);
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    arr.push(this.cells[y][x]);
                }
            }
            return arr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SVGTable.prototype, "borders", {
        get: function () {
            var arr = new Array(0);
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    if (arr.indexOf(this.cells[y][x].upLine) == -1) {
                        arr.push(this.cells[y][x].upLine);
                    }
                    if (arr.indexOf(this.cells[y][x].leftLine) == -1) {
                        arr.push(this.cells[y][x].leftLine);
                    }
                    if (arr.indexOf(this.cells[y][x].rightLine) == -1) {
                        arr.push(this.cells[y][x].rightLine);
                    }
                    if (arr.indexOf(this.cells[y][x].bottomLine) == -1) {
                        arr.push(this.cells[y][x].bottomLine);
                    }
                }
            }
            return arr;
        },
        enumerable: true,
        configurable: true
    });
    SVGTable.prototype.resize = function () {
        var rows = this.rows;
        var columns = this.columns;
        rows.forEach(function (x, i, arr) { x.resize(); });
        columns.forEach(function (x, i, arr) { x.resize(); });
        var height = 0;
        rows.forEach(function (x, i, arr) {
            x.setY(height);
            height += x.getMaxHeight();
        });
        var width = 0;
        columns.forEach(function (x, i, arr) {
            x.setX(width);
            width += x.getMaxWidth();
        });
        this.cellArray.forEach(function (x, i, arr) { x.relocation(); });
    };
    SVGTable.prototype.getCellFromID = function (id) {
        var y = Math.floor(id / this.height);
        var x = id % this.width;
        return this.cells[y][x];
    };
    SVGTable.prototype.setLine = function (cell) {
        if (cell.leftCell != null) {
            cell.leftLine = cell.leftCell.rightLine;
        }
        else {
            cell.leftLine = TableFunctions.createLine(cell.x, cell.y, cell.x, cell.y + cell.height);
            this.group.appendChild(cell.leftLine);
        }
        if (cell.upCell != null) {
            cell.upLine = cell.upCell.bottomLine;
        }
        else {
            cell.upLine = TableFunctions.createLine(cell.x, cell.y, cell.x + cell.width, cell.y);
            this.group.appendChild(cell.upLine);
        }
        cell.rightLine = TableFunctions.createLine(cell.x + cell.width, cell.y, cell.x + cell.width, cell.y + cell.height);
        this.group.appendChild(cell.rightLine);
        cell.bottomLine = TableFunctions.createLine(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height);
        this.group.appendChild(cell.bottomLine);
    };
    return SVGTable;
}());
var TableFunctions;
(function (TableFunctions) {
    function createLine(x, y, x2, y2) {
        var line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.x1.baseVal.value = x;
        line1.x2.baseVal.value = x2;
        line1.y1.baseVal.value = y;
        line1.y2.baseVal.value = y2;
        //line1.style.color = "black";
        line1.style.stroke = "black";
        //line1.style.visibility = "hidden";
        //line1.style.strokeWidth = `${5}`
        //line1.setAttribute('stroke', 'black');
        return line1;
    }
    TableFunctions.createLine = createLine;
    function createText() {
        var _svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        _svgText.style.fill = "black";
        _svgText.style.fontSize = "14px";
        _svgText.style.fontWeight = "bold";
        _svgText.style.textAnchor = "middle";
        return _svgText;
    }
    TableFunctions.createText = createText;
    function createRectangle() {
        var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.width.baseVal.value = 30;
        rect.height.baseVal.value = 30;
        rect.style.fill = "#ffffff";
        return rect;
    }
    TableFunctions.createRectangle = createRectangle;
})(TableFunctions || (TableFunctions = {}));
//# sourceMappingURL=graph_table_svg.js.map