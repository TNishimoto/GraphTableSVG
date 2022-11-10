//namespace GraphTableSVG {

import { ShapeObjectType, ConnectorType } from "../common/enums";
import * as CommonFunctions from "../common/common_functions"
import { sanityze, VBATranslateFunctions } from "../common/vba_functions"
import { getLineType } from "../html/enum_extension";

import * as GOptions from "./z_options"
import * as ElementExtension from "../interfaces/element_extension"
import { GAbstractTextEdge } from "./z_abstract_text_edge";
import { AttributeNames, Color, StyleNames } from "../common";
import { HTMLFunctions } from "../html";

/**
 * 辺をSVGで表現するためのクラスです。
 */
export class GEdge extends GAbstractTextEdge  {
    //private isFixTextSize: boolean = false;
    protected surfaceAttributes: string[] = [];
    protected _minimumWidth: number = 10;
    protected _minimumHeight: number = 10;
    //public tag: any;

    constructor(svgbox: SVGElement | string) {
        super(svgbox);


        if (this.type == ShapeObjectType.Edge) this.firstFunctionAfterInitialized();

        //this.setAppropriateText();
    }


    protected setBasicOption(option: GOptions.GEdgeAttributes) {
        super.setBasicOption(option);

        if (option.x3 !== undefined && option.y3 !== undefined) {
            this.controlPoint = [[option.x3, option.y3]];
        }
    }

    static constructAttributes(e: Element, removeAttributes: boolean = false, output: GOptions.GEdgeAttributes = {}): GOptions.GEdgeAttributes {
        GAbstractTextEdge.constructAttributes(e, removeAttributes, output);

        if (e.hasAttribute(AttributeNames.x3)) {
            output.x3 = ElementExtension.gtGetAttributeNumberWithoutNull(e, AttributeNames.x3, 0);
        }
        if (e.hasAttribute(AttributeNames.y3)) {
            output.y3 = ElementExtension.gtGetAttributeNumberWithoutNull(e, AttributeNames.y3, 0);
        }


        if (removeAttributes) {
            e.removeAttribute(AttributeNames.x3);
            e.removeAttribute(AttributeNames.y3);
        }
        return output;
    }

    public get type(): ShapeObjectType {
        return ShapeObjectType.Edge;
    }
    /**
     * 辺の制御点を返します。
     */
    public get controlPoint(): [number, number][] {
        const r = this.pathPoints
        r.shift()
        r.pop();
        return r;
    }
    public set controlPoint(value: [number, number][]) {
        const fst: [number, number] = [this.x1, this.y1];
        const lst: [number, number] = [this.x2, this.y2];
        value.unshift(fst);
        value.push(lst);
        this.pathPoints = value;
    }




    public setIndexDictionaryForVBA(vertexDic: { [key: string]: number; }, edgeDic: { [key: string]: number; }) {
        if (this.controlPoint.length == 0) {
            edgeDic[this.objectID] = Object.keys(edgeDic).length;
        } else if (this.controlPoint.length > 0) {
            //edgeDic[this.objectID] = Object.keys(edgeDic).length;
            for (let i = 0; i < this.VBAConnectorNumber; i++) {
                vertexDic[`${this.objectID}_${i}`] = Object.keys(vertexDic).length;
            }
            for (let i = 0; i <= this.VBAConnectorNumber; i++) {
                edgeDic[`${this.objectID}_${i}`] = Object.keys(edgeDic).length;
            }

        }

    }
    private VBAConnectorNumber = 1;




    public get shape(): string {
        return "msoConnectorStraight";
    }
    public createVBACode(id: number): string[] {
        const lineArr: number[] = [];
        const r: string[] = [];
        r.push(`Sub create${id}(createdSlide As slide)`);
        r.push(` Dim shapes_ As Shapes : Set shapes_ = createdSlide.Shapes`);
        r.push(` Dim obj As Shape`);

        if (this.controlPoint.length == 0 || this.edgeType == "elbow") {

            if (this.edgeType == "elbow") {
                r.push(` Set obj = shapes_.AddConnector(msoConnectorElbow, ${this.x1}, ${this.y1}, ${this.x2}, ${this.y2})`);
            } else {
                r.push(` Set obj = shapes_.AddConnector(msoConnectorStraight, ${this.x1}, ${this.y1}, ${this.x2}, ${this.y2})`);
            }

            if (this.markerStart != null) {
                r.push(` obj.Line.BeginArrowheadLength = msoArrowheadLong`);
                r.push(` obj.Line.BeginArrowheadStyle = msoArrowheadTriangle`);
                r.push(` obj.Line.BeginArrowheadWidth = msoArrowheadWide`);
            }
            if (this.markerEnd != null) {
                r.push(` obj.Line.EndArrowheadLength = msoArrowheadLong`);
                r.push(` obj.Line.EndArrowheadStyle = msoArrowheadTriangle`);
                r.push(` obj.Line.EndArrowheadWidth = msoArrowheadWide`);
            }
            if (this.beginVertex != null) {
                const endX = this.endVertex == null ? this.x2 : this.endVertex.cx;
                const endY = this.endVertex == null ? this.y2 : this.endVertex.cy;

                let begType = 0;

                if(this.beginConnectorType == "auto"){
                    begType = ConnectorType.ToVBAConnectorPosition2(this.beginVertex.shape, this.beginVertex.getContactAutoPosition(endX, endY));
                }else{
                    begType = ConnectorType.ToVBAConnectorPosition2(this.beginVertex.shape, this.beginConnectorType);
                }

                r.push(` Call obj.ConnectorFormat.BeginConnect(shapes_("${this.beginVertex.objectID}"), ${begType})`);

            }
            if (this.endVertex != null) {
                const beginX = this.beginVertex == null ? this.x1 : this.beginVertex.cx;
                const beginY = this.beginVertex == null ? this.y1 : this.beginVertex.cy;

                let endType = 0;
                if(this.endConnectorType == "auto"){
                    endType = ConnectorType.ToVBAConnectorPosition2(this.endVertex.shape, this.endVertex.getContactAutoPosition(beginX, beginY));
                }else{
                    endType = ConnectorType.ToVBAConnectorPosition2(this.endVertex.shape, this.endConnectorType);
                }

                r.push(` Call obj.ConnectorFormat.EndConnect(shapes_("${this.endVertex.objectID}"), ${endType})`);

            }
            const lineType = getLineType(this.svgPath);
            const colorName = ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "stroke", "gray");
            const lineColor = VBATranslateFunctions.colorToVBA(colorName);

            const strokeWidth = parseInt(ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "stroke-width", "4"));
            const visible = ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
            r.push(` Call EditLine(obj.Line, ${lineColor}, ${lineType}, ${0}, ${strokeWidth}, ${visible})`);

        } else if (this.controlPoint.length > 0) {

            //subline.push(` Set obj = shapes_.AddConnector(msoConnectorStraight, 0, 0, 0, 0)`);
            //lineArr.push(i);
            r.push(` Dim nodes(${this.VBAConnectorNumber}) As Shape`);

            for (let j = 0; j < this.VBAConnectorNumber; j++) {
                const t = (j + 1) / (this.VBAConnectorNumber + 1);
                const centerPoint = CommonFunctions.bezierLocation([this.x1, this.y1], this.controlPoint[0], [this.x2, this.y2], t);
                r.push(`shapes_.AddShape(msoShapeOval, ${centerPoint[0]}, ${centerPoint[1]}, 0, 0).name = "${this.objectID}_node_${j}"`);
            }

            for (let j = 0; j <= this.VBAConnectorNumber; j++) {
                //const centerPoint = Common.bezierLocation([this.x1, this.y1], this.controlPoint[0], [this.x2, this.y2], 0.5);
                const edgeID = `${this.objectID}_edge_${j}`;

                r.push(` shapes_.AddConnector(msoConnectorStraight, ${this.x1}, ${this.y1}, ${this.x2}, ${this.y2}).name = "${this.objectID}_edge_${j}"`);



                const lineType = getLineType(this.svgPath);
                const lineColor = VBATranslateFunctions.colorToVBA(ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "stroke", "gray"));
                const strokeWidth = parseInt(ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "stroke-width", "4"));
                const visible = ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                r.push(` Call EditLine(shapes_("${edgeID}").Line, ${lineColor}, ${lineType}, ${0}, ${strokeWidth}, ${visible})`);

                if (this.beginVertex != null) {
                    const beg = j == 0 ? this.beginVertex.objectID : `${this.objectID}_node_${j - 1}`;
                    const endX = this.endVertex == null ? this.x2 : this.endVertex.x;
                    const endY = this.endVertex == null ? this.y2 : this.endVertex.y;

                    const begType: number = j == 0 ? ConnectorType.ToVBAConnectorPosition2(this.beginVertex.shape, this.beginVertex.getConnectorType(this.beginConnectorType, endX, endY)) : 1;
                    r.push(` Call shapes_("${edgeID}").ConnectorFormat.BeginConnect(shapes_("${beg}"), ${begType})`);
                }
                if (this.endVertex != null) {
                    const end = j == this.VBAConnectorNumber ? this.endVertex.objectID : `${this.objectID}_node_${j}`;
                    const beginX = this.beginVertex == null ? this.x1 : this.beginVertex.x;
                    const beginY = this.beginVertex == null ? this.y1 : this.beginVertex.y;

                    const endType: number = j == this.VBAConnectorNumber ? ConnectorType.ToVBAConnectorPosition2(this.endVertex.shape, this.endVertex.getConnectorType(this.endConnectorType, beginX, beginY)) : 1;
                    r.push(` Call shapes_("${edgeID}").ConnectorFormat.EndConnect(shapes_("${end}"), ${endType})`);

                }
                //r.push(` Call EditConnector(shapes_("${edgeID}").ConnectorFormat, shapes_("${beg}"), shapes_("${end}"), ${begType}, ${endType})`)

            }
        }


        lineArr.forEach((v) => {
            const lineType = getLineType(this.svgPath);
            const lineColor = VBATranslateFunctions.colorToVBA(ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "stroke", "gray"));
            const strokeWidth = parseInt(ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "stroke-width", "4"));
            const visible = ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
            r.push(` Call EditLine(edges(${v}).Line, ${lineColor}, ${lineType}, ${0}, ${strokeWidth}, ${visible})`);
        });




        //subline.forEach((v) => sub.push([v]));

        const textCodes = this.createVBACodeOfText(id);
        textCodes.forEach((v, i) => r.push(`Call create${id}_label_${i}(shapes_)`));

        r.push(`End Sub`);
        textCodes.forEach((v) => v.forEach((w) => r.push(w)));
        return r;
    }
    private static getVisibleCharElements(e: SVGElement): [Element, string][] {
        const r: [Element, string][] = new Array(0);

        for (let i = 0; i < e.childNodes.length; i++) {
            const child = e.childNodes.item(i);
            if (child instanceof SVGTextPathElement) {
                const r2 = this.getVisibleCharElements(child);
                r2.forEach(([a, b]) => {
                    r.push([a, b]);
                })
            } else if (child instanceof SVGTSpanElement) {
                const r2 = this.getVisibleCharElements(child);
                r2.forEach(([a, b]) => {
                    r.push([a, b]);
                })
            } else {
                if (child.textContent != null && child.textContent.length > 0) {
                    const newText = HTMLFunctions.removeInvisibleCharacters(child.textContent!);
                    for (let j = 0; j < newText.length; j++) {
                        const character = newText[j];
                        r.push([e, character]);                        
                    }
                }

            }
        }
        return r;
    }
    /**
     * VBAコードを作成します。
     * @param shapes 
     * @param result 
     */
    public createVBACodeOfText(id: number): string[][] {
        const r: string[][] = [];


        const globalX = this.graph != null ? this.graph.x : 0;
        const globalY = this.graph != null ? this.graph.y : 0;

        //let pid = 0;
        const charInfoArray = GEdge.getVisibleCharElements(this.svgText);
        charInfoArray.forEach(([parent, character], i) => {
            if (parent instanceof SVGTSpanElement) {
                //const character = this.svgText.textContent![i];
                const fontSize = parseInt(ElementExtension.getInheritedPropertyStyleValueWithDefault(parent, "font-size", "12"));
                const fontFamily = VBATranslateFunctions.ToVBAFont(ElementExtension.getInheritedPropertyStyleValueWithDefault(parent, "font-family", "MS PGothic"));
                const fontBold = VBATranslateFunctions.ToFontBold(ElementExtension.getInheritedPropertyStyleValueWithDefault(parent, "font-weight", "none"));
                const css = getComputedStyle(parent);
                const childColor = Color.createRGBFromColorName(css.fill);

                const s: string[] = new Array(0);
                const p1 = this.svgText.getStartPositionOfChar(i);
                const p2 = this.svgText.getEndPositionOfChar(i);
                const width = Math.abs(p2.x - p1.x);
                //const height = Math.abs(p2.y - p1.y);

                const rad = this.svgText.getRotationOfChar(i);
                const diffx = (fontSize * 1 / 2) * Math.sin((rad / 180) * Math.PI);
                const diffy = (fontSize * 3 / 8) + ((fontSize * 3 / 8) * Math.cos((rad / 180) * Math.PI));

                const left = p1.x + globalX + diffx;
                //const top = this.graph.svgGroup.getY() + p1.y - (fontSize / 2);
                const top = p1.y + globalY - (fontSize * 1 / 4) - diffy;
                //const top = p1.y + globalY  - diffy;

                //const top = this.graph.svgGroup.getY() + p1.y - diffy;
                s.push(`Sub create${id}_label_${i}(shapes_ As Shapes)`);
                s.push(`With shapes_.AddTextBox(msoTextOrientationHorizontal, ${left}, ${top},${width},${fontSize})`);                
                s.push(`.TextFrame.TextRange.Text = "${sanityze(character)}"`);
                s.push(`.TextFrame.marginLeft = 0`);
                s.push(`.TextFrame.marginRight = 0`);
                s.push(`.TextFrame.marginTop = 0`);
                s.push(`.TextFrame.marginBottom = 0`);
                s.push(`.TextFrame.TextRange.Font.color.RGB = RGB(CInt(${childColor.r}), CInt(${childColor.g}), CInt(${childColor.b}))`);
                s.push(`.TextFrame.TextRange.Font.Size = ${fontSize}`);
                s.push(`.TextFrame.TextRange.Font.name = "${fontFamily}"`);
                s.push(`.TextFrame.TextRange.Font.Bold = ${fontBold}`);
                s.push(`.IncrementRotation(${this.svgText.getRotationOfChar(i)})`);
                //s.push(`.IncrementRotation(${this.svgText.transform.baseVal.getItem(0).angle})`);
                s.push(`End With`);
                s.push(`End Sub`);
                r.push(s);

            }
        })
        /*
        for (let i = 0; i < this.svgText.getNumberOfChars(); i++) {
        }
        */
        /*
        if (this.svgTextPath.textContent != null) {
        }
        */
        return r;
    }
}

//}