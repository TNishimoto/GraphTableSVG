//namespace GraphTableSVG {

import { ShapeObjectType, ConnectorType } from "../common/enums";
import * as CommonFunctions from "../common/common_functions"
import { VBATranslateFunctions } from "../common/vba_functions"
import { getLineType } from "../html/enum_extension";

import * as GOptions from "./g_options"
import * as ElementExtension from "../interfaces/element_extension"
import { GAbstractTextEdge } from "./g_abstract_text_edge";
import { AttributeNames, StyleNames } from "../common";

/**
 * 辺をSVGで表現するためのクラスです。
 */
export class GEdge extends GAbstractTextEdge {
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
        return "g-edge";
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


    /**
     * 再描画します。
     */
    public update(): boolean {
        super.update();
        this.updateConnectorInfo();
        this.updateSurface();
        this.updateLocation();
        this.updateTextPath();
        return false;
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

            if(this.edgeType == "elbow"){
                r.push(` Set obj = shapes_.AddConnector(msoConnectorElbow, 0, 0, 0, 0)`);
            }else{
                r.push(` Set obj = shapes_.AddConnector(msoConnectorStraight, 0, 0, 0, 0)`);
            }
            if (this.beginVertex != null && this.endVertex != null) {
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

                const begType: number = ConnectorType.ToVBAConnectorPosition2(this.beginVertex.shape, this.beginVertex.getConnectorType(this.beginConnectorType, this.endVertex.x, this.endVertex.y));
                const endType: number = ConnectorType.ToVBAConnectorPosition2(this.endVertex.shape, this.endVertex.getConnectorType(this.endConnectorType, this.beginVertex.x, this.beginVertex.y));
                r.push(` Call EditConnector(obj.ConnectorFormat, shapes_("${this.beginVertex.objectID}"), shapes_("${this.endVertex.objectID}"), ${begType}, ${endType})`)
                const lineType = getLineType(this.svgPath);
                const lineColor = VBATranslateFunctions.colorToVBA(ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "stroke", "gray"));
                const strokeWidth = parseInt(ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "stroke-width", "4"));
                const visible = ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                r.push(` Call EditLine(obj.Line, ${lineColor}, ${lineType}, ${0}, ${strokeWidth}, ${visible})`);

            }
        } else if (this.controlPoint.length > 0 && this.beginVertex != null && this.endVertex != null) {

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
                const beg = j == 0 ? this.beginVertex.objectID : `${this.objectID}_node_${j - 1}`;
                const end = j == this.VBAConnectorNumber ? this.endVertex.objectID : `${this.objectID}_node_${j}`;

                r.push(` shapes_.AddConnector(msoConnectorStraight, 0, 0, 0, 0).name = "${this.objectID}_edge_${j}"`);
                const lineType = getLineType(this.svgPath);
                const lineColor = VBATranslateFunctions.colorToVBA(ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "stroke", "gray"));
                const strokeWidth = parseInt(ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "stroke-width", "4"));
                const visible = ElementExtension.getPropertyStyleValueWithDefault(this.svgPath, "visibility", "visible") == "visible" ? "msoTrue" : "msoFalse";
                r.push(` Call EditLine(shapes_("${edgeID}").Line, ${lineColor}, ${lineType}, ${0}, ${strokeWidth}, ${visible})`);

                const begType: number = j == 0 ? ConnectorType.ToVBAConnectorPosition2(this.beginVertex.shape, this.beginVertex.getConnectorType(this.beginConnectorType, this.endVertex.x, this.endVertex.y)) : 1;
                const endType: number = j == this.VBAConnectorNumber ? ConnectorType.ToVBAConnectorPosition2(this.endVertex.shape, this.endVertex.getConnectorType(this.endConnectorType, this.beginVertex.x, this.beginVertex.y)) : 1;
                r.push(` Call EditConnector(shapes_("${edgeID}").ConnectorFormat, shapes_("${beg}"), shapes_("${end}"), ${begType}, ${endType})`)

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
    /**
     * VBAコードを作成します。
     * @param shapes 
     * @param result 
     */
    public createVBACodeOfText(id: number): string[][] {
        const r: string[][] = [];
        const fontSize = parseInt(ElementExtension.getPropertyStyleValueWithDefault(this.svgTextPath, "font-size", "12"));
        const fontFamily = VBATranslateFunctions.ToVBAFont(ElementExtension.getPropertyStyleValueWithDefault(this.svgTextPath, "font-family", "MS PGothic"));
        const fontBold = VBATranslateFunctions.ToFontBold(ElementExtension.getPropertyStyleValueWithDefault(this.svgTextPath, "font-weight", "none"));

        const globalX = this.graph != null ? this.graph.x : 0;
        const globalY = this.graph != null ? this.graph.y : 0;

        if (this.svgTextPath.textContent != null) {
            for (let i = 0; i < this.svgTextPath.textContent.length; i++) {
                const s: string[] = new Array(0);
                const p1 = this.svgTextPath.getStartPositionOfChar(i);
                const p2 = this.svgTextPath.getEndPositionOfChar(i);
                const width = Math.abs(p2.x - p1.x);
                const height = Math.abs(p2.y - p1.y);

                const rad = this.svgTextPath.getRotationOfChar(i);
                const diffx = (fontSize * 1 / 2) * Math.sin((rad / 180) * Math.PI);
                const diffy = (fontSize * 3 / 8) + ((fontSize * 3 / 8) * Math.cos((rad / 180) * Math.PI));

                const left = p1.x + globalX + diffx;
                //const top = this.graph.svgGroup.getY() + p1.y - (fontSize / 2);
                const top = p1.y + globalY - (fontSize * 1 / 4) - diffy;
                //const top = p1.y + globalY  - diffy;

                //const top = this.graph.svgGroup.getY() + p1.y - diffy;
                s.push(`Sub create${id}_label_${i}(shapes_ As Shapes)`);
                s.push(`With shapes_.AddTextBox(msoTextOrientationHorizontal, ${left}, ${top},${width},${fontSize})`);
                s.push(`.TextFrame.TextRange.Text = "${this.svgTextPath.textContent[i]}"`);
                s.push(`.TextFrame.marginLeft = 0`);
                s.push(`.TextFrame.marginRight = 0`);
                s.push(`.TextFrame.marginTop = 0`);
                s.push(`.TextFrame.marginBottom = 0`);
                s.push(`.TextFrame.TextRange.Font.Size = ${fontSize}`);
                s.push(`.TextFrame.TextRange.Font.name = "${fontFamily}"`);
                s.push(`.TextFrame.TextRange.Font.Bold = ${fontBold}`);
                s.push(`.IncrementRotation(${this.svgTextPath.getRotationOfChar(i)})`);
                //s.push(`.IncrementRotation(${this.svgText.transform.baseVal.getItem(0).angle})`);
                s.push(`End With`);
                s.push(`End Sub`);
                r.push(s);

            }
        }
        return r;
    }
}

//}