namespace GraphTableSVG {
    
    /**
    ノードの並び順です。
    */
    export enum NodeOrder {
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

    }
    export function ToVBAConnectorPosition(str: ConnectorPosition): number {
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
    }
    
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
    export const VerticalAnchorPropertyName: string = "--vertical-anchor";
    export const MaximalRegularIntervalName: string = "--maximal-regular-interval";


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
    }

    
    export const HorizontalAnchorPropertyName: string = "--horizontal-anchor";
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