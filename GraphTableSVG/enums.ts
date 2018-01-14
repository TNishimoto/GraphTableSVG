namespace GraphTableSVG {
    
    /**
    ノードの並び順です。
    */
    export enum NodeOrder {
        Preorder, Postorder
    }
    /**
    Vertexの接続位置を表す値です。
    */
    export enum ConnectorPosition {
        /**
        上を表します。
        */
        Top = 1,
        /**
        左上を表します。
        */
        LeftUp = 2,
        /**
        左を表します。
        */
        Left = 3,
        /**
        左下を表します。
        */
        LeftDown = 4,
        /**
        下を表します。
        */
        Bottom = 5,
        /**
        右下を表します。
        */
        RightDown = 6,
        /**
        右を表します。
        */
        Right = 7,
        /**
        右上を表します。
        */
        RightUp = 8,
        /**
        ノードの位置によって自動判定
        */
        Auto = 9
    }
    export function ToConnectorPosition(str: string | null): ConnectorPosition {
        if (str == null) {
            return ConnectorPosition.Auto;
        } else {
            switch (str) {
                case "top": return ConnectorPosition.Top;
                case "leftup": return ConnectorPosition.LeftUp;
                case "left": return ConnectorPosition.Left;
                case "leftdown": return ConnectorPosition.LeftDown;
                case "bottom": return ConnectorPosition.Bottom;
                case "rightdown": return ConnectorPosition.RightDown;
                case "right": return ConnectorPosition.Right;
                case "rightup": return ConnectorPosition.RightUp;
                case "auto": return ConnectorPosition.Auto;
                default: return ConnectorPosition.Auto;
            }
        }
    }
    export function ToStrFromConnectorPosition(position: ConnectorPosition): string {
        switch (position) {
            case ConnectorPosition.Top: return "top";
            case ConnectorPosition.LeftUp: return "leftup";
            case ConnectorPosition.Left: return "left";
            case ConnectorPosition.LeftDown: return "leftdown";
            case ConnectorPosition.Bottom: return "bottom";
            case ConnectorPosition.RightUp: return "rightup";
            case ConnectorPosition.Right: return "right";
            case ConnectorPosition.RightDown: return "rightdown";
            case ConnectorPosition.Auto: return "auto";
            default: return "auto";
        }
    }

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