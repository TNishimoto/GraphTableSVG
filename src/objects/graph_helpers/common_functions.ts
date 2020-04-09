import { GObject } from "../g_object";
import * as AttributeNames from "../../common/attribute_names"

export function getGraph(obj : GObject): GObject | null {
    const v = obj.svgGroup.parentElement;
    if (v != null && v instanceof SVGGElement && v.hasAttribute(AttributeNames.objectIDName)) {
        const id = v.getAttribute(AttributeNames.objectIDName)!;
        const obj = GObject.getObjectFromObjectID(id);
        if (obj instanceof GObject) {
            return obj;
        }
    }
    return null;
}