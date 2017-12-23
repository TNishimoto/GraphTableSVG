module GraphTableSVG {
    export enum NodeOrder {
        Preorder, Postorder
    }
    export enum ConnectorPosition {
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

    export var VerticalAnchorPropertyName: string = "--vertical-anchor";
    export type VerticalAnchorEnum = "top" | "middle" | "bottom"
    export namespace VerticalAnchorEnum {
        export const Top: VerticalAnchorEnum = "top"
        export const Middle: VerticalAnchorEnum = "middle"
        export const Bottom: VerticalAnchorEnum = "bottom"
    }


    export var HorizontalAnchorPropertyName: string = "--horizontal-anchor";
    export type HorizontalAnchorEnum = "left" | "center" | "right"
    export namespace HorizontalAnchorEnum {
        export const Left: HorizontalAnchorEnum = "left"
        export const Center: HorizontalAnchorEnum = "center"
        export const Right: HorizontalAnchorEnum = "right"
    }
    
}