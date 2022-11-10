

import { ShapeObjectType, VertexObjectType } from "../common/enums"

export type DisplayObject = { key: string, displayName : string}

export namespace DisplayObject {
    export function create(key : string, displayName : string) : DisplayObject {
        return {key : key, displayName : displayName};
    }

}

//export function getObjects() : VertexObjectType[] {
//    return [ "g-callout", "g-arrow-callout", "g-ellipse", "g-circle", "g-rect", "g-path-textbox", "g-rect-button", "g-table"];
//}

export function getDisplayVertexObjectTypes() : DisplayObject[] {
    return [ DisplayObject.create(ShapeObjectType.Callout, "ZCallout"), 
    DisplayObject.create(ShapeObjectType.ArrowCallout, "ZArrowCallout"), 
    DisplayObject.create(ShapeObjectType.Ellipse, "GEllipse"), 
    DisplayObject.create(ShapeObjectType.Circle, "GCircle"), 
    DisplayObject.create(ShapeObjectType.Rect, "GRect"), 
    DisplayObject.create(ShapeObjectType.PathTextBox, "GPathTextbox"), 
    DisplayObject.create(ShapeObjectType.RectButton, "GRectButton"), 
    DisplayObject.create(ShapeObjectType.Table, "GTable") ];
}

