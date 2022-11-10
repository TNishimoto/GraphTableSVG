
//namespace GraphTableSVG {
import { GObject } from "../objects/z_object"
import { GTable } from "../objects/z_table"
import { GGraph } from "../objects/z_graph"
import { Rectangle } from "../common/vline";
import * as CSS from "../html/css"
import { VBATranslateFunctions } from "../common/vba_functions"
import { isVBAObject, VBAObjectType, collectVBAObjectTypes, countVBSObjectNum, isVBACodableSVG } from "./vba_object"
import * as ElementExtension from "../interfaces/element_extension"
import * as Extensions from "../interfaces/extensions"
import * as SVGTextExtension from "../interfaces/svg_text_extension"
import { msoDashStyle, ShapeObjectType } from "../common/enums";
import { msoDashStyleName } from "../common/style_names";
import { getBackgroundColor, getBackgroundVisible, getStrokeColor, getStrokeWidth } from "../interfaces/svg_element_extension";
import * as Parser from 'svg-path-parser';

export class SVGToVBA {





    public static convert(svgsvgID: string | SVGSVGElement): string {
        if (svgsvgID instanceof SVGSVGElement) {
            const types = collectVBAObjectTypes(svgsvgID);
            return this.create(types);
        } else {
            const obj = <any>document.getElementById(svgsvgID);
            if (obj instanceof SVGSVGElement) {
                return this.convert(obj);
            } else {
                throw new ReferenceError(`${svgsvgID} is not the ID of an SVGSVGElement.`);
            }

        }
    }
    /**
     * 入力要素をPowerpoint上で作成するVBAコードを作成します。
     * @param items 
     */
    public static create(items: VBAObjectType[] | VBAObjectType | string): string {
        //const id = 0;
        if (items instanceof Array) {
            const count = countVBSObjectNum(items);
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
                    const lines = item.createVBACode(id);

                    lines.forEach((v) => s.push(v));
                    id++;
                } else if (item instanceof GGraph) {
                    const lines = item.createVBACode(id);
                    lines.forEach((v) => s.push(v));
                    id += item.VBAObjectNum;
                } else if (item instanceof GObject) {
                    const lines = item.createVBACode(id);
                    lines.forEach((v) => s.push(v));
                    id += item.VBAObjectNum;
                } else if (isVBACodableSVG(item)) {
                    //const lines = SVGToVBA.createVBACodeOfSVGPath(item, id++);
                    const lines = SVGToVBA.createVBACodeOfSVGElement(item, id);

                    lines.forEach((v) => s.push(v));
                    id++;

                }
            }
            s.push(SVGToVBA.cellFunctionCode);
            const r = VBATranslateFunctions.joinLines(s);
            return r;
        }
        else if (typeof (items) == "string") {
            const id = items;
            const obj = <any>document.getElementById(id);
            if (obj != null && obj.operator instanceof GObject) {
                return SVGToVBA.create([obj.operator]);
            } else {
                throw new Error();
            }

        }
        else {
            return SVGToVBA.create([items]);
        }
    }

    private static createVBACodeOfSVGElement(obj: SVGRectElement | SVGCircleElement | SVGPathElement | SVGTextElement | SVGEllipseElement | SVGLineElement | SVGPolylineElement, id: number): string[] {
        const lines = new Array(0);
        const backGroundvisible = getBackgroundVisible(obj) ? "msoTrue" : "msoFalse";

        lines.push(`Sub create${id}(createdSlide As slide)`);
        lines.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);

        if (obj instanceof SVGTextElement) {
            const sub: string[][] = [];
            lines.push(` Dim txt As Shape`);
            lines.push(` Set txt = shapes_.AddTextbox(msoTextOrientationHorizontal, ${SVGTextExtension.getX(obj)}, ${SVGTextExtension.getY(obj)}, 0, 0)`);
            const fontSize = parseInt(ElementExtension.getPropertyStyleValueWithDefault(obj, "font-size", "24"));
            const fontFamily = VBATranslateFunctions.ToVBAFont(ElementExtension.getPropertyStyleValueWithDefault(obj, "font-family", "MS PGothic"));
            const fontBold = VBATranslateFunctions.ToFontBold(ElementExtension.getPropertyStyleValueWithDefault(obj, "font-weight", "none"));
            lines.push([` Call EditTextFrame(txt.TextFrame, ${0}, ${0}, ${0}, ${0}, false, ppAutoSizeShapeToFitText)`]);
            VBATranslateFunctions.TranslateSVGTextElement(sub, obj, `txt.TextFrame.TextRange`);
            sub.forEach((v) => lines.push(v[0]));
            lines.push([` Call EditTextEffect(txt.TextEffect, ${fontSize}, "${fontFamily}")`]);

        } else {
            const lineColor = VBATranslateFunctions.colorToVBA(getStrokeColor(obj));
            const strokeWidth = getStrokeWidth(obj);
            const lineColorValue = getStrokeColor(obj);
            const lineVisible = lineColorValue != "none" ? "msoTrue" : "msoFalse";

            if (obj instanceof SVGPathElement || obj instanceof SVGLineElement || obj instanceof SVGPolylineElement || obj instanceof SVGPolygonElement) {
                
                if(obj instanceof SVGPathElement){
                    const backColor = VBATranslateFunctions.colorToVBA(getBackgroundColor(obj));

                    lines.push(` Dim builder As FreeformBuilder`);

                    const length = obj.getTotalLength();
                    
                    let d = 0;

                    let p = obj.getPointAtLength(d);
                    lines.push(` Set builder = shapes_.BuildFreeform(msoEditingCorner, ${p.x}, ${p.y}) `);
                    d += 10;
                    while(d < length){
                        p = obj.getPointAtLength(d);
                        lines.push(`builder.AddNodes msoSegmentLine, msoEditingAuto, ${p.x}, ${p.y}`);
                        d += 10;
                    }
                    d = length;
                    p = obj.getPointAtLength(d);



                    lines.push(`builder.AddNodes msoSegmentLine, msoEditingAuto, ${p.x}, ${p.y}`);

                    const commandAttr = obj.getAttribute("d");
                    let hasClosePath = false;
                    if(commandAttr != null){
                        const commandList = Parser.parseSVG(commandAttr);
                        commandList.forEach((v) =>{
                            if(v.code=="Z" || v.code=="z"){
                                hasClosePath =  true;
                            }
                        })
                    }
                    if(hasClosePath){
                        p = obj.getPointAtLength(0);
                        lines.push(`builder.AddNodes msoSegmentLine, msoEditingAuto, ${p.x}, ${p.y}`);
                    }

                    lines.push(` Dim obj As Shape`);
                    lines.push(`Set obj = builder.ConvertToShape`);
                    lines.push(` Call EditLine(obj.Line, ${lineColor}, msoLineSolid, ${0}, ${strokeWidth}, ${lineVisible})`);
                    lines.push(` Call EditCallOut(obj, "${id}", ${backGroundvisible}, ${backColor})`)

                    /*
                    const pos = Extensions.getPathLocations(obj);
                    lines.push(` Dim edges${id}(${pos.length - 1}) As Shape`);
    
                    for (let i = 0; i < pos.length - 1; i++) {
                        lines.push(` Set edges${id}(${i}) = shapes_.AddConnector(msoConnectorStraight, ${pos[i][0]}, ${pos[i][1]}, ${pos[i + 1][0]}, ${pos[i + 1][1]})`);
                        lines.push(` Call EditLine(edges${id}(${i}).Line, ${lineColor}, msoLineSolid, ${0}, ${strokeWidth}, ${visible})`);
                    }
                    */
    
                }
                else if(<any>obj instanceof SVGPolylineElement){
                    lines.push(` Dim builder As FreeformBuilder`);
                    const list = (<any>obj).points;
                    let p = list.getItem(0);
                    lines.push(` Set builder = shapes_.BuildFreeform(msoEditingCorner, ${p.x}, ${p.y}) `);

                    for(let i=0;i<list.length;i++){
                        p = list.getItem(i);
                        lines.push(`builder.AddNodes msoSegmentLine, msoEditingAuto, ${p.x}, ${p.y}`);
                    }
                    lines.push(` Dim obj As Shape`);
                    lines.push(`Set obj = builder.ConvertToShape`);
                    lines.push(` Call EditLine(obj.Line, ${lineColor}, msoLineSolid, ${0}, ${strokeWidth}, ${lineVisible})`);

                }else if(<any>obj instanceof SVGPolygonElement){
                    const backColor = VBATranslateFunctions.colorToVBA(getBackgroundColor(<any>obj));

                    lines.push(` Dim builder As FreeformBuilder`);
                    const list = (<any>obj).points;
                    let p = list.getItem(0);
                    lines.push(` Set builder = shapes_.BuildFreeform(msoEditingCorner, ${p.x}, ${p.y}) `);

                    for(let i=0;i<list.length;i++){
                        p = list.getItem(i);
                        lines.push(`builder.AddNodes msoSegmentLine, msoEditingAuto, ${p.x}, ${p.y}`);
                    }
                    p = list.getItem(0);
                    lines.push(`builder.AddNodes msoSegmentLine, msoEditingAuto, ${p.x}, ${p.y}`);


                    lines.push(` Dim obj As Shape`);
                    lines.push(`Set obj = builder.ConvertToShape`);
                    lines.push(` Call EditLine(obj.Line, ${lineColor}, msoLineSolid, ${0}, ${strokeWidth}, ${lineVisible})`);
                    lines.push(` Call EditCallOut(obj, "${id}", ${backGroundvisible}, ${backColor})`)

                }
                else{
                    const x1 = (<any>obj).x1.baseVal.value;
                    const y1 = (<any>obj).y1.baseVal.value;
                    const x2 = (<any>obj).x2.baseVal.value;
                    const y2 = (<any>obj).y2.baseVal.value;
                    lines.push(` Dim obj As Shape`);
                    lines.push(` Set obj = shapes_.AddConnector(msoConnectorStraight, ${x1}, ${y1}, ${x2}, ${y2})`);
                    lines.push(` Call EditLine(obj.Line, ${lineColor}, msoLineSolid, ${0}, ${strokeWidth}, ${lineVisible})`);

                }

            } else {
                const backColor = VBATranslateFunctions.colorToVBA(getBackgroundColor(obj));

                lines.push(` Dim obj As Shape`);

                if (obj instanceof SVGRectElement) {
                    const rx = obj.getAttribute("rx") == null ? 0 : parseInt(obj.getAttribute("rx")!);
                    const ry = obj.getAttribute("ry") == null ? 0 : parseInt(obj.getAttribute("ry")!);
                    const maxr = Math.max(rx, ry);
                    const shape = maxr == 0? "msoShapeRectangle" : "msoShapeRoundedRectangle";
                    const width = obj.width.baseVal.value;
                    const height = obj.height.baseVal.value;
                    const x = obj.x.baseVal.value;
                    const y = obj.y.baseVal.value;

                    lines.push(` Set obj = shapes_.AddShape(${shape}, ${x}, ${y}, ${width}, ${height})`);

                    if(maxr > 0){
                        const ratio = maxr / width;
                        lines.push(` obj.Adjustments.Item(1) = ${ratio}`);

                    }
                }
                else if(obj instanceof SVGEllipseElement){
                    const shape = "msoShapeOval"
                    const width = obj.rx.baseVal.value * 2;
                    const height = obj.ry.baseVal.value * 2;
                    const x = obj.cx.baseVal.value - obj.rx.baseVal.value;
                    const y = obj.cy.baseVal.value - obj.ry.baseVal.value;

                    lines.push(` Set obj = shapes_.AddShape(${shape}, ${x}, ${y}, ${width}, ${height})`);

                } 
                else {

                    const shape = "msoShapeOval"
                    const width = obj.r.baseVal.value * 2;
                    const height = obj.r.baseVal.value * 2;
                    const x = obj.cx.baseVal.value - obj.r.baseVal.value;
                    const y = obj.cy.baseVal.value - obj.r.baseVal.value;

                    lines.push(` Set obj = shapes_.AddShape(${shape}, ${x}, ${y}, ${width}, ${height})`);

                }
                lines.push(` Call EditLine(obj.Line, ${lineColor}, ${msoDashStyle.msoLineSolid}, ${0}, ${strokeWidth}, ${lineVisible})`);
                lines.push(` Call EditCallOut(obj, "${id}", ${backGroundvisible}, ${backColor})`)
            }

        }

        lines.push(`End Sub`);
        return lines;
    }
    /*
    private static createVBACodeOfSVGPath(path: SVGPathElement, id: number): string[] {
        const lines = new Array(0);
        const pos = Extensions.getPathLocations(path);
        lines.push(`Sub create${id}(createdSlide As slide)`);
        lines.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
        lines.push(` Dim edges${id}(${pos.length - 1}) As Shape`);


        for (let i = 0; i < pos.length - 1; i++) {
            lines.push(` Set edges${id}(${i}) = shapes_.AddConnector(msoConnectorStraight, ${pos[i][0]}, ${pos[i][1]}, ${pos[i + 1][0]}, ${pos[i + 1][1]})`);
            const lineColor = VBATranslateFunctions.colorToVBA(ElementExtension.getPropertyStyleValueWithDefault(path, "stroke", "gray"));
            const strokeWidth = parseInt(ElementExtension.getPropertyStyleValueWithDefault(path,"stroke-width", "4"));
            const visible = ElementExtension.getPropertyStyleValueWithDefault(path, "visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
            lines.push(` Call EditLine(edges${id}(${i}).Line, ${lineColor}, msoLineSolid, ${0}, ${strokeWidth}, ${visible})`);
        }

        lines.push(`End Sub`);
        return lines;
    }
    */
    /*
     private static createVBACodeOfTextElement(element: SVGTextElement, id: number): string[] {
         const lines = new Array(0);
         const sub: string[][] = [];
         lines.push(`Sub create${id}(createdSlide As slide)`);
         lines.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
         lines.push(` Dim txt As Shape`);
         lines.push(` Set txt = shapes_.AddTextbox(msoTextOrientationHorizontal, ${SVGTextExtension.getX(element)}, ${SVGTextExtension.getY(element)}, 0, 0)`);
         const fontSize = parseInt(ElementExtension.getPropertyStyleValueWithDefault(element, "font-size", "24"));
         const fontFamily = VBATranslateFunctions.ToVBAFont(ElementExtension.getPropertyStyleValueWithDefault(element,"font-family", "MS PGothic"));
         const fontBold = VBATranslateFunctions.ToFontBold(ElementExtension.getPropertyStyleValueWithDefault(element, "font-weight", "none"));
         lines.push([` Call EditTextFrame(txt.TextFrame, ${0}, ${0}, ${0}, ${0}, false, ppAutoSizeShapeToFitText)`]);
         VBATranslateFunctions.TranslateSVGTextElement(sub, element, `txt.TextFrame.TextRange`);
         sub.forEach((v) => lines.push(v[0]));
         lines.push([` Call EditTextEffect(txt.TextEffect, ${fontSize}, "${fontFamily}")`]);
 
 
         lines.push(`End Sub`);
         return lines;
     }
     */


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