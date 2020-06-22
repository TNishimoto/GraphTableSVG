

import { VertexObjectType } from "../common/enums"

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
    return [ DisplayObject.create("g-callout", "GCallout"), 
    DisplayObject.create("g-arrow-callout", "GArrowCallout"), 
    DisplayObject.create("g-ellipse", "GEllipse"), 
    DisplayObject.create("g-circle", "GCircle"), 
    DisplayObject.create("g-rect", "GRect"), 
    DisplayObject.create("g-path-textbox", "GPathTextbox"), 
    DisplayObject.create("g-rect-button", "GRectButton"), 
    DisplayObject.create("g-table", "GTable") ];
}

