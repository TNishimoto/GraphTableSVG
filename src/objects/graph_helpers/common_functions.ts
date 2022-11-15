import { ZObject } from "../z_object";
import * as AttributeNames from "../../common/attribute_names"

export function getGraph(obj : ZObject): ZObject | null {
    const v = obj.svgGroup.parentElement;
    if (v != null && v instanceof SVGGElement && v.hasAttribute(AttributeNames.objectIDName)) {
        const id = v.getAttribute(AttributeNames.objectIDName)!;
        const obj = ZObject.getObjectFromIDOrObjectID(id);
        if (obj instanceof ZObject) {
            return obj;
        }
    }
    return null;
}