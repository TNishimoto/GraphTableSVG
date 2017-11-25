

class SVGToVBA {

    public static createTable(table: SVGTable): string{
        var lines = new Array(0);
        lines.push(`Sub createMyTable()`);
        lines.push(` Dim createdSlide As slide`);
        lines.push(` Set createdSlide = ActivePresentation.Slides.Add(1, ppLayoutBlank)`);
        lines.push(` Dim tableS As shape`);
        lines.push(` Dim table_ As table`);

        //lines.push(` Set tableS = CreateTable(createdSlide, ${table.height}, ${table.width})`);
        lines.push(` Set tableS = createdSlide.Shapes.AddTable(${table.height}, ${table.width})`)
        //page.Shapes.AddTable(row_, column_)
        lines.push(` Set table_ = tableS.table`);

        for (var y = 0; y < table.height; y++) {
            lines.push(` Call EditRow(table_.Rows(${y + 1}), ${table.rows[y].height})`);
        }
        for (var x = 0; x < table.width; x++) {
            lines.push(` Call EditColumn(table_.Columns(${x + 1}), ${table.columns[x].width})`);
        }

        for (var y = 0; y < table.height; y++) {
            for (var x = 0; x < table.width; x++) {
                var cell = table.cells[y][x];
                lines.push(` Call EditCell(table_.cell(${y + 1},${x + 1}), "${cell.svgText.textContent}", ${VBATranslateFunctions.colorToVBA(cell.svgBackground.style.fill)})`);
            }
        }
        lines.push(`Call EditCellFonts(table_)`);
        lines.push(`Call EditCellTextFrames(table_)`);
        lines.push(`Call EditBorders(table_)`);

        
        lines.push(`End Sub`);
        lines.push(SVGToVBA.cellFunctionCode);

        lines.push(`Sub EditCellFonts(table_ As Table)`);
        for (var y = 0; y < table.height; y++) {
            for (var x = 0; x < table.width; x++) {
                var cell = table.cells[y][x];
                lines.push(` Call EditCellFont(table_.cell(${y + 1},${x + 1}).Shape.TextFrame, ${parseInt(cell.svgText.style.fontSize)}, "${cell.svgText.style.fontFamily}", ${VBATranslateFunctions.colorToVBA(cell.svgText.style.fill)})`);
            }
        }
        lines.push(`End Sub`);

        lines.push(`Sub EditCellTextFrames(table_ As Table)`);
        for (var y = 0; y < table.height; y++) {
            for (var x = 0; x < table.width; x++) {
                var cell = table.cells[y][x];
                lines.push(` Call EditCellTextFrame(table_.cell(${y + 1},${x + 1}).Shape.TextFrame, ${cell.padding.top}, ${cell.padding.bottom}, ${cell.padding.left}, ${cell.padding.right})`);
            }
        }
        lines.push(`End Sub`);


        lines.push(`Sub EditBorders(table_ As Table)`);
        for (var y = 0; y < table.height; y++) {
            for (var x = 0; x < table.width; x++) {
                var cell = table.cells[y][x];
                lines.push(` Call EditCellBorder(table_.cell(${y + 1},${x + 1}).Borders(ppBorderTop), ${VBATranslateFunctions.colorToVBA(cell.upLine.style.fill)}, ${VBAFunctions.parseInteger(cell.upLine.style.strokeWidth)}, ${VBAFunctions.visible(cell.upLine.style.visibility)})`);

                lines.push(` Call EditCellBorder(table_.cell(${y + 1},${x + 1}).Borders(ppBorderLeft), ${VBATranslateFunctions.colorToVBA(cell.leftLine.style.fill)}, ${VBAFunctions.parseInteger(cell.leftLine.style.strokeWidth)}, ${VBAFunctions.visible(cell.leftLine.style.visibility)})`);
                if (x + 1 == table.width) {
                    lines.push(` Call EditCellBorder(table_.cell(${y + 1},${x + 1}).Borders(ppBorderRight), ${VBATranslateFunctions.colorToVBA(cell.rightLine.style.fill)}, ${VBAFunctions.parseInteger(cell.rightLine.style.strokeWidth)}, ${VBAFunctions.visible(cell.rightLine.style.visibility)})`);
                }

                if (y + 1 == table.height) {
                    lines.push(` Call EditCellBorder(table_.cell(${y + 1},${x + 1}).Borders(ppBorderBottom), ${VBATranslateFunctions.colorToVBA(cell.bottomLine.style.fill)}, ${VBAFunctions.parseInteger(cell.bottomLine.style.strokeWidth)}, ${VBAFunctions.visible(cell.bottomLine.style.visibility)})`);
                }

            }
        }
        lines.push(`End Sub`);


        return VBATranslateFunctions.joinLines(lines);
    }
    
    
    public static cellFunctionCode: string = `
Sub EditTable(table_ As table, cellInfo_() As Variant)
    Dim x As Integer
    Dim y As Integer
    
    For x = 1 To UBound(cellInfo_, 1)
        For y = 1 To UBound(cellInfo_, 2)
         Call EditCell(table_.cell(x, y), CStr(cellInfo_(x, y)(0)))
        Next
    Next
End Sub

Sub EditCell(cell_ As cell, text_ As String, backColor As Variant)
    cell_.Shape.TextFrame.TextRange.text = text_
    cell_.Shape.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))
End Sub
Sub EditCellFont(frame_ As TextFrame, fontSize As Double, fontName As String, color As Variant)
    frame_.TextRange.Font.Size = fontSize
    frame_.TextRange.Font.name = fontName
    frame_.TextRange.Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))
End Sub




Sub EditRow(row_ As Row, height As Integer)
    row_.height = height
End Sub
Sub EditColumn(column_ As Column, width As Integer)
    column_.width = width
End Sub

Sub EditCellTextFrame(frame_ As TextFrame, marginTop As Double, marginBottom As Double, marginLeft As Double, marginRight As Double)
    frame_.marginLeft = marginLeft
    frame_.marginRight = marginRight
    frame_.marginTop = marginTop
    frame_.marginBottom = marginBottom
End Sub

Sub EditTextRange(range_ As TextRange, text As String, subBeg As Integer, subLen As Integer, color As Variant)
    range_.text = text
    range_.Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))
    If subLen > 0 Then
    range_.Characters(subBeg, subLen).Font.Subscript = True
    End If
End Sub

Sub EditShape(shape_ As Shape, name As String, visible As Integer, backColor As Variant)
    shape_.name = name
    shape_.Fill.visible = visible
    shape_.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))
End Sub
Sub EditCellBorder(line_ As LineFormat, foreColor As Variant, weight As Integer, transparent As Double)
    line_.foreColor.RGB = RGB(CInt(foreColor(0)), CInt(foreColor(1)), CInt(foreColor(2)))
    line_.weight = weight
    line_.Transparency = transparent
End Sub

`
}

module VBAFunctions {
    export function parseInteger(value: string): number {
        if (value == "") {
            return 1;
        } else {
            return parseInt(value);
        }
    }
    export function visible(value: string): number {
        if (value == "hidden") {
            return 1.0;
        } else {
            return 0;
        }
    }
}

class VBATranslateFunctions {

    static createStringFunction(item: string) {
        return item.length == 0 ? `""` : `"` + item + `"`;
    }

    static createArrayFunction(items: any[]) {
        var s = ``;

        for (var i = 0; i < items.length; i++) {
            s += items[i];
            if (i + 1 != items.length) {
                s += `, `;
            }
        }
        return `Array(${s})`;
    }
    static createStringArrayFunction(items: string[]) {
        var s = ``;
        for (var i = 0; i < items.length; i++) {
            s += `"${items[i]}"`;
            if (i + 1 != items.length) {
                s += `, `;
            }
        }
        return `Array(${s})`;
    }
    static createJagArrayFunction(items: any[][]) {
        var s = ``;
        for (var i = 0; i < items.length; i++) {
            s += VBATranslateFunctions.createArrayFunction(items[i]);
            if (i + 1 != items.length) s += `, `;
        }
        return `Array(${s})`;
    }
    static joinLines(lines: string[]) {
        var s = ``;
        for (var i = 0; i < lines.length; i++) {
            s += lines[i];
            if (i + 1 != lines.length) s += `\n`;
        }
        return s;
    }

    public static colorToVBA(color: string): string {
        if (color.indexOf("rgb") != -1) {
            return color.replace("rgb", "Array");
        } else {
            if (color == "black") {
                return VBATranslateFunctions.colorToVBA("rgb(0,0,0)");
            } else {
                return VBATranslateFunctions.colorToVBA("rgb(0,255,0)");
            }
        }
        
    }
    /*
    public static shapeToVBA(shape: ShapeStyle, item: string) {
        return ` Call EditNodeLine(${item}, ${VBATranslateFunctions.colorToVBA(shape.lineColor)}, ${shape.dashStyleCode}, ${shape.transparency}, ${shape.weight})`;
    }
    */
}

