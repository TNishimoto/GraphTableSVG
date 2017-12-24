module GraphTableSVG {
    /*
    export class Padding {
        top: number = 0;
        left: number = 0;
        right: number = 0;
        bottom: number = 0;
    }
    */
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
    export type VerticalAnchor = "top" | "middle" | "bottom"
    export namespace VerticalAnchor {
        export const Top: VerticalAnchor = "top"
        export const Middle: VerticalAnchor = "middle"
        export const Bottom: VerticalAnchor = "bottom"
    }


    export var HorizontalAnchorPropertyName: string = "--horizontal-anchor";
    export type HorizontalAnchor = "left" | "center" | "right"
    export namespace HorizontalAnchor {
        export const Left: HorizontalAnchor = "left"
        export const Center: HorizontalAnchor = "center"
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