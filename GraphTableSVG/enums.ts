namespace GraphTableSVG {

    /**
    ノードの並び順です。
    */
    export enum VertexOrder {
        Preorder, Postorder
    }
    /*
    export enum OldConnectorPosition {
        Top = 1,
        LeftUp = 2,
        Left = 3,
        LeftDown = 4,
        Bottom = 5,
        RightDown = 6,
        Right = 7,
        RightUp = 8,
        Auto = 9
    }
    */
    export type CustomTag = "row" | "cell" | "t";

    export type ShapeObjectType = "g-callout" | "g-arrow-callout" | "g-ellipse" |
     "g-rect" | "g-edge" | "g-graph" | "g-table" | "g-object" | "g-path-textbox";
    export namespace ShapeObjectType {
        export const Callout: ShapeObjectType = "g-callout"
        export const ArrowCallout: ShapeObjectType = "g-arrow-callout"
        export const Ellipse: ShapeObjectType = "g-ellipse"
        export const Rect: ShapeObjectType = "g-rect"
        export const Edge: ShapeObjectType = "g-edge"
        export const Graph: ShapeObjectType = "g-graph"
        export const Table: ShapeObjectType = "g-table"
        export const Object: ShapeObjectType = "g-object"
        export const PathTextBox: ShapeObjectType = "g-path-textbox"

        const typeDic: { [key: string]: boolean; } = {
            "g-callout": true,
            "g-arrow-callout": true,
            "g-ellipse": true,
            "g-rect": true,
            "g-edge": true,
            "g-graph": true,
            "g-table": true,
            "g-object": true,
            "g-path-textbox": true
        }
        const customTypeDic: { [key: string]: boolean; } = {
            "row": true,
            "cell": true,
            "t": true
        }

        export function toShapeObjectType(value : string) : ShapeObjectType | null {
            if(value in typeDic){
                return <ShapeObjectType>value;
            }else{
                return null;
            }
        }
        export function toShapeObjectTypeOrCustomTag(value : string) : ShapeObjectType | CustomTag | null {
            
            const value1 = toShapeObjectType(value); 
            if(value1 != null){
                return value1;
            }else{
                if(value in customTypeDic){
                    return <CustomTag>value;
                }else{
                    return null;
                }
            }
            
        }
    }

    export type pathTextAlighnment = "none" | "begin" | "end" | "center" | "regularInterval";
    export namespace pathTextAlighnment {
        export const regularInterval: pathTextAlighnment = "regularInterval"
        export const begin: pathTextAlighnment = "begin"
        export const end: pathTextAlighnment = "end"
        export const center: pathTextAlighnment = "center"

        const typeDic: { [key: string]: pathTextAlighnment; } = {
            "none": "none",
            "begin": "begin",
            "end": "end",
            "center": "center",
            "regularInterval": "regularInterval",
        }
        export function toPathTextAlighnment(value: string): pathTextAlighnment {
            if (value in typeDic) {
                return typeDic[value];
            } else {
                return "none";
            }
        }
    }

    export type msoDashStyle = "msoLineDash" | "msoLineDashDot" | "msoLineDashDotDot" | "msoLineLongDash" | "msoLineLongDashDot" | "msoLineRoundDot" | "msoLineSolid" | "msoLineSquareDot";
    export namespace msoDashStyle {
        //export const styleName : string = "--mso-dash-style"
        export const msoLineDash: msoDashStyle = "msoLineDash"
        export const msoLineDashDot: msoDashStyle = "msoLineDashDot"
        export const msoLineDashDotDot: msoDashStyle = "msoLineDashDotDot"
        //export const msoLineDashStyleMixed: msoDashStyle = "msoLineDashStyleMixed"
        export const msoLineLongDash: msoDashStyle = "msoLineLongDash"
        export const msoLineLongDashDot: msoDashStyle = "msoLineLongDashDot"
        export const msoLineRoundDot: msoDashStyle = "msoLineRoundDot"
        export const msoLineSolid: msoDashStyle = "msoLineSolid"
        export const msoLineSquareDot: msoDashStyle = "msoLineSquareDot"
        export const dashArrayDic: { [key: string]: number[]; } = {
            "msoLineDash": [4, 3],
            "msoLineDashDot": [4, 3, 1, 3],
            "msoLineDashDotDot": [3, 1, 1, 1, 1, 1],
            //"msoLineDashStyleMixed" : "6,3",
            "msoLineLongDash": [9, 3],
            "msoLineLongDashDot": [9, 3, 1, 3],
            "msoLineRoundDot": [0.25, 2],
            "msoLineSolid": [],
            "msoLineSquareDot": [1, 1]
        };
        const lineCapDic: { [key: string]: string; } = {
            "msoLineDash": "butt",
            "msoLineDashDot": "butt",
            "msoLineDashDotDot": "butt",
            //"msoLineDashStyleMixed" : "butt",
            "msoLineLongDash": "butt",
            "msoLineLongDashDot": "butt",
            "msoLineRoundDot": "round",
            "msoLineSolid": "butt",
            "msoLineSquareDot": "butt"
        }
        const typeDic: { [key: string]: msoDashStyle; } = {
            "msoLineDash": msoDashStyle.msoLineDash,
            "msoLineDashDot": msoDashStyle.msoLineDashDot,
            "msoLineDashDotDot": msoDashStyle.msoLineDashDotDot,
            //"msoLineDashStyleMixed" : msoDashStyle.msoLineDashStyleMixed,
            "msoLineLongDash": msoDashStyle.msoLineLongDash,
            "msoLineLongDashDot": msoDashStyle.msoLineLongDashDot,
            "msoLineRoundDot": msoDashStyle.msoLineRoundDot,
            "msoLineSquareDot": msoDashStyle.msoLineSquareDot,
            "msoLineSolid": msoDashStyle.msoLineSolid
        }
        export function toMSODashStyle(value: string): msoDashStyle {
            if (value in typeDic) {
                return typeDic[value];
            } else {
                return msoLineSolid;
            }
        }
        function computeDashArray(type: msoDashStyle, width: number): string {
            const r = [];
            for (let i = 0; i < dashArrayDic[type].length; i++) {
                r.push(dashArrayDic[type][i] * width);
            }
            return r.join(",");
        }

        export function setStyle(svgLine: SVGLineElement | SVGPathElement | SVGElement, type: string): void {
            if (toMSODashStyle(type) != null) {
                const width = <number>svgLine.getPropertyStyleNumberValue("stroke-width", 2);
                svgLine.setPropertyStyleValue("stroke-dasharray", computeDashArray(toMSODashStyle(type), width));
                svgLine.setPropertyStyleValue("stroke-linecap", lineCapDic[type]);
                svgLine.setPropertyStyleValue(GraphTableSVG.SVG.msoDashStyleName, type);
            } else {

            }
        }
        export function getLineType(svgLine: SVGLineElement | SVGPathElement | SVGElement): msoDashStyle {
            const typeName = svgLine.getPropertyStyleValue(GraphTableSVG.SVG.msoDashStyleName);
            if (typeName != null) {
                const type = toMSODashStyle(typeName);
                if (type != null) {
                    return type;
                }
            }
            const dashArray = svgLine.getPropertyStyleValue("stroke-dasharray");
            if (dashArray != null) {
                return msoDashStyle.msoLineDash;
            } else {
                return msoDashStyle.msoLineSolid;
            }
        }
    }

    export type Direction = "up" | "left" | "right" | "down";
    export namespace Direction {
        export function toDirection(value: string | null): Direction {
            if (value == "up") {
                return "up";
            } else if (value == "left") {
                return "left";
            } else if (value == "right") {
                return "right";
            } else {
                return "down";
            }
        }
    }

    export type SpeakerPosition = "upleft" | "upright" | "leftup" | "leftdown" | "rightup" | "rightdown" | "downleft" | "downright" | "inner";

    export type ConnectorPosition = "top" | "topleft" | "left" | "bottomleft" | "bottom" | "bottomright" | "right" | "topright" | "auto";
    export namespace ConnectorPosition {
        export const Top: ConnectorPosition = "top"
        export const TopLeft: ConnectorPosition = "topleft"
        export const Left: ConnectorPosition = "left"
        export const BottomLeft: ConnectorPosition = "bottomleft"
        export const Bottom: ConnectorPosition = "bottom"
        export const BottomRight: ConnectorPosition = "bottomright"
        export const Right: ConnectorPosition = "right"
        export const TopRight: ConnectorPosition = "topright"
        export const Auto: ConnectorPosition = "auto"
        export function ToConnectorPosition(str: string | null): ConnectorPosition {
            if (str == null) {
                return ConnectorPosition.Auto;
            } else {
                return <ConnectorPosition>str;
                /*
                switch (str) {
                    case "top": return ConnectorPosition.Top;
                    case "topleft": return ConnectorPosition.TopLeft;
                    case "left": return ConnectorPosition.Left;
                    case "bottomleft": return ConnectorPosition.BottomLeft;
                    case "bottom": return ConnectorPosition.Bottom;
                    case "bottomright": return ConnectorPosition.BottomRight;
                    case "right": return ConnectorPosition.Right;
                    case "topright": return ConnectorPosition.TopRight;
                    case "auto": return ConnectorPosition.Auto;
                    default: return ConnectorPosition.Auto;
                }
                */
            }
        }
        export function ToVBAConnectorPosition(shapeType: string, str: ConnectorPosition): number {
            if (shapeType == "circle") {
                switch (str) {
                    case "top": return 1;
                    case "topleft": return 2;
                    case "left": return 3;
                    case "bottomleft": return 4;
                    case "bottom": return 5;
                    case "bottomright": return 6;
                    case "right": return 7;
                    case "topright": return 8;
                    case "auto": return 9;
                    default: return 1;
                }
            } else if (shapeType == "rectangle") {
                switch (str) {
                    case "top": return 1;
                    case "left": return 2;
                    case "bottom": return 3;
                    case "right": return 4;
                    case "auto": return 9;
                    default: return 1;
                }
    
            } else {
                return 1;
            }
        }
        export function ToVBAConnectorPosition2(shapeType: string, str: ConnectorPosition): number {
            if (shapeType == "msoShapeOval") {
                switch (str) {
                    case "top": return 1;
                    case "topleft": return 2;
                    case "left": return 3;
                    case "bottomleft": return 4;
                    case "bottom": return 5;
                    case "bottomright": return 6;
                    case "right": return 7;
                    case "topright": return 8;
                    case "auto": return 9;
                    default: return 1;
                }
            } else if (shapeType == "msoShapeRectangle") {
                switch (str) {
                    case "top": return 1;
                    case "left": return 2;
                    case "bottom": return 3;
                    case "right": return 4;
                    case "auto": return 9;
                    default: return 1;
                }
    
            } else {
                return 1;
            }
        }

    }
    

    
    /*
    export function ToStrFromConnectorPosition(position: OldConnectorPosition): string {
        switch (position) {
            case OldConnectorPosition.Top: return "top";
            case ConnectorPosition.TopLeft: return "leftup";
            case OldConnectorPosition.Left: return "left";
            case OldConnectorPosition.BottomLeft: return "leftdown";
            case OldConnectorPosition.Bottom: return "bottom";
            case ConnectorPosition.TopRight: return "rightup";
            case OldConnectorPosition.Right: return "right";
            case ConnectorPosition.BottomRight: return "rightdown";
            case OldConnectorPosition.Auto: return "auto";
            default: return "auto";
        }
    }
    */
    //export const VerticalAnchorPropertyName: string = "--vertical-anchor";
    //export const HorizontalAnchorPropertyName: string = "--horizontal-anchor";
    //export const PathTextAlignmentName: string = "--path-text-alignment";


    /**
    垂直方向の配置位置を表す値です。
    */
    export type VerticalAnchor = "top" | "middle" | "bottom"
    export namespace VerticalAnchor {
        /**
         * 上を表します。
         */
        export const Top: VerticalAnchor = "top"
        /**
         * 真ん中を表します。
         */
        export const Middle: VerticalAnchor = "middle"
        /**
         * 底を表します。
         */
        export const Bottom: VerticalAnchor = "bottom"

        export function toVerticalAnchor(value: string): VerticalAnchor {
            if (value == "top") {
                return "top";
            } else if (value == "bottom") {
                return "bottom";
            } else {
                return "middle";
            }
        }
    }


    /**
    水平方向の配置位置を表す値です。
    */
    export type HorizontalAnchor = "left" | "center" | "right"
    export namespace HorizontalAnchor {
        /**
         * 左を表します。
         */
        export const Left: HorizontalAnchor = "left"
        /**
         * 中央を表します。
         */
        export const Center: HorizontalAnchor = "center"
        /**
        * 右を表します。
        */
        export const Right: HorizontalAnchor = "right"

        export function toHorizontalAnchor(value: string): HorizontalAnchor {
            if (value == "left") {
                return "left";
            } else if (value == "right") {
                return "right";
            } else {
                return "center";
            }
        }
    }
    export function parsePXString(item: string | null): number {
        if (item == null) {
            return 0;
        } else {
            if (item.length == 0) {
                return 0;
            } else {
                return parseInt(item);
            }
        }
    }


}