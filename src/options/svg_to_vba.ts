﻿
//namespace GraphTableSVG {
    import {GObject} from "../object/g_object"
    import {GTable} from "../object/g_table"
    import {GGraph} from "../object/g_graph"
    import { Rectangle } from "../basic/common/vline";
    import * as CSS from "../basic/svghtml/css"
    import {VBATranslateFunctions} from "../basic/common/vba_functions"    
    import {VBAObjectType} from "./vba_object"    


    export class SVGToVBA {

        /**
         * 入力要素をPowerpoint上で作成するVBAコードを作成します。
         * @param items 
         */
        public static create(items: VBAObjectType[] | VBAObjectType): string {
            //const id = 0;
            if (items instanceof Array) {
                const count = SVGToVBA.count(items);
                const s: string[] = new Array(0);

                s.push(`Sub create()`);
                s.push(` Dim createdSlide As slide`);
                s.push(` Set createdSlide = ActivePresentation.Slides.Add(1, ppLayoutBlank)`);
                for (let i = 0; i < count; i++) {
                    s.push(`Call create${i}(createdSlide)`);
                }
                s.push(`MsgBox "created"`);

                s.push(`End Sub`);

                let id = 0;
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    if (item instanceof GTable) {
                        //const lines = item.createVBACode2(id++, "createdSlide");
                        const lines = item.createVBACode2(id, "createdSlide");
                        
                        lines.forEach((v) => s.push(v));
                        id++;
                    } else if (item instanceof SVGPathElement) {
                        //const lines = SVGToVBA.createVBACodeOfSVGPath(item, id++);
                        const lines = SVGToVBA.createVBACodeOfSVGPath(item, id);
                        
                        lines.forEach((v) => s.push(v));
                        id++;

                    } else if (item instanceof SVGTextElement) {
                        //const lines = SVGToVBA.createVBACodeOfTextElement(item, id++);
                        const lines = SVGToVBA.createVBACodeOfTextElement(item, id);
                        
                        lines.forEach((v) => s.push(v));
                        id++;
                    } else if(item instanceof GGraph){
                        const lines = item.createVBACode(id);
                        lines.forEach((v) => s.push(v));
                        id += item.VBAObjectNum;
                    } else if(item instanceof GObject){
                        const lines = item.createVBACode(id);
                        lines.forEach((v) => s.push(v));
                        id += item.VBAObjectNum;
                    }
                }
                s.push(SVGToVBA.cellFunctionCode);
                const r = VBATranslateFunctions.joinLines(s);
                return r;
            } else {
                return SVGToVBA.create([items]);
            }
        }
        public static count(items: VBAObjectType[] | VBAObjectType): number {
            //const id = 0;
            if (items instanceof Array) {
                let c = 0;
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    if (item instanceof GTable) {
                        c++;
                    } else if (item instanceof SVGPathElement) {
                        c++;
                    } else if (item instanceof SVGTextElement) {
                        c++;
                    } else if(item instanceof GGraph){
                        c += item.VBAObjectNum;
                    } else if(item instanceof GObject){
                        c += item.VBAObjectNum;
                    }
                }
                return c;
            } else {
                return SVGToVBA.count([items]);
            }
        }
        private static createVBACodeOfSVGPath(path: SVGPathElement, id: number): string[] {
            const lines = new Array(0);
            const pos = path.getPathLocations();
            lines.push(`Sub create${id}(createdSlide As slide)`);
            lines.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
            lines.push(` Dim edges${id}(${pos.length - 1}) As Shape`);


            for (let i = 0; i < pos.length - 1; i++) {
                lines.push(` Set edges${id}(${i}) = shapes_.AddConnector(msoConnectorStraight, ${pos[i][0]}, ${pos[i][1]}, ${pos[i + 1][0]}, ${pos[i + 1][1]})`);
                const lineColor = VBATranslateFunctions.colorToVBA(path.getPropertyStyleValueWithDefault("stroke", "gray"));
                const strokeWidth = parseInt(path.getPropertyStyleValueWithDefault("stroke-width", "4"));
                const visible = path.getPropertyStyleValueWithDefault("visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                lines.push(` Call EditLine(edges${id}(${i}).Line, ${lineColor}, msoLineSolid, ${0}, ${strokeWidth}, ${visible})`);
            }

            lines.push(`End Sub`);
            return lines;
        }
        private static createVBACodeOfTextElement(element: SVGTextElement, id: number): string[] {
            const lines = new Array(0);
            const sub: string[][] = [];
            lines.push(`Sub create${id}(createdSlide As slide)`);
            lines.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
            lines.push(` Dim txt As Shape`);
            lines.push(` Set txt = shapes_.AddTextbox(msoTextOrientationHorizontal, ${element.getX()}, ${element.getY()}, 0, 0)`);
            const fontSize = parseInt(element.getPropertyStyleValueWithDefault("font-size", "24"));
            const fontFamily = VBATranslateFunctions.ToVBAFont(element.getPropertyStyleValueWithDefault("font-family", "MS PGothic"));
            const fontBold = VBATranslateFunctions.ToFontBold(element.getPropertyStyleValueWithDefault("font-weight", "none"));
            lines.push([` Call EditTextFrame(txt.TextFrame, ${0}, ${0}, ${0}, ${0}, false, ppAutoSizeShapeToFitText)`]);
            VBATranslateFunctions.TranslateSVGTextElement(sub, element, `txt.TextFrame.TextRange`);
            sub.forEach((v) => lines.push(v[0]));
            lines.push([` Call EditTextEffect(txt.TextEffect, ${fontSize}, "${fontFamily}")`]);


            lines.push(`End Sub`);
            return lines;
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
Sub EditCellFont(frame_ As TextFrame, fontSize As Double, fontName As String, color As Variant, fontBold As Integer)
    frame_.TextRange.Font.Size = fontSize
    frame_.TextRange.Font.name = fontName
    frame_.TextRange.Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))
    frame_.TextRange.Font.Bold = fontBold
End Sub




Sub EditRow(row_ As Row, height As Integer)
    row_.height = height
End Sub
Sub EditColumn(column_ As Column, width As Integer)
    column_.width = width
End Sub

Sub EditCellTextFrame(frame_ As TextFrame, marginTop As Double, marginBottom As Double, marginLeft As Double, marginRight As Double, vAnchor As Integer, hAnchor As Integer)
    frame_.marginLeft = marginLeft
    frame_.marginRight = marginRight
    frame_.marginTop = marginTop
    frame_.marginBottom = marginBottom
    frame_.VerticalAnchor = vAnchor
    frame_.TextRange.ParagraphFormat.Alignment = hAnchor
End Sub

Sub EditTextRange(range_ As TextRange, text As String)
    range_.text = text
End Sub
Sub EditTextRangeSub(range_ As TextRange, subBeg As Integer, subLen As Integer, script As String, color As Variant, fontName As String, fontSize As Double, fontBold As Integer)
    range_.Characters(subBeg, subLen).Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))
    range_.Characters(subBeg, subLen).Font.Size = fontSize
    range_.Characters(subBeg, subLen).Font.name = fontName
    range_.Characters(subBeg, subLen).Font.Bold = fontBold
    If script = "subscript" Then
    range_.Characters(subBeg, subLen).Font.Subscript = True
    End If
    If script = "superscript" Then
    range_.Characters(subBeg, subLen).Font.Superscript = True
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

Sub EditConnector(connector_ As ConnectorFormat, begShape As Shape, endShape As Shape, begPos As Integer, endPos As Integer)
    Call connector_.BeginConnect(begShape, begPos)
    Call connector_.EndConnect(endShape, endPos)
End Sub

Sub EditTextFrame(frame_ As TextFrame, marginTop As Double, marginBottom As Double, marginLeft As Double, marginRight As Double, wordWrap As Boolean, autoSize As Integer)
    frame_.autoSize = autoSize
    frame_.wordWrap = wordWrap
    frame_.marginLeft = marginLeft
    frame_.marginRight = marginRight
    frame_.marginTop = marginTop
    frame_.marginBottom = marginBottom
End Sub
Sub EditAnchor(frame_ As TextFrame, vAnchor As Integer, hAnchor As Integer)
    frame_.VerticalAnchor = vAnchor
    frame_.TextRange.ParagraphFormat.Alignment = hAnchor
End Sub

Sub EditTextEffect(effect_ As TextEffectFormat, fontSize As Double, fontName As String)
 effect_.fontSize = fontSize
 effect_.fontName = fontName
End Sub

Sub EditVertexShape(shape_ As Shape, name As String, visible As Integer, backColor As Variant)
    shape_.name = name
    shape_.Fill.visible = visible
    shape_.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))
End Sub

Sub EditLine(line_ As LineFormat, foreColor As Variant, dashStyle As Integer, transparent As Double, weight As Integer, visible As Integer)
    line_.foreColor.RGB = RGB(CInt(foreColor(0)), CInt(foreColor(1)), CInt(foreColor(2)))
    line_.dashStyle = dashStyle
    line_.Transparency = transparent
    line_.weight = weight
    line_.visible = visible
End Sub

Sub EditCallOut(shape_ As Shape, name As String, visible As Integer, backColor As Variant)
    shape_.name = name
    shape_.Fill.visible = visible
    shape_.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))
End Sub

`
    }


//}