
import { ShapeObjectType } from "../common/enums";

import { ZObject } from "../objects/z_object"
import { ZCallout } from "../objects/z_callout"
import { ZArrowCallout } from "../objects/z_arrow_callout"
import { ZEllipse } from "../objects/z_ellipse"
import { ZRect } from "../objects/z_rect"
import { ZEdge } from "../objects/z_edge"
import { ZTable, ZTableOption } from "../objects/z_table"
import { ZGraph } from "../objects/z_graph"
import { ZRectButton } from "../objects/z_rect_button"
import { ZCircle } from "../objects/z_circle";
import * as GOptions from "../objects/z_options"
import { ArgumentOutOfRangeError, NullError } from "../common/exceptions";
import { ZForeignButton } from "../objects/z_foreign_button";

export function createGObject(parent: SVGElement | string | ZObject, type: "z-rect-button", option?: GOptions.ZTextBoxAttributes): ZRectButton
export function createGObject(parent: SVGElement | string | ZObject, type: "z-rect", option?: GOptions.ZTextBoxAttributes): ZRect
export function createGObject(parent: SVGElement | string | ZObject, type: "z-edge", option?: GOptions.ZEdgeAttributes): ZEdge
export function createGObject(parent: SVGElement | string | ZObject, type: "z-ellipse", option?: GOptions.ZTextBoxAttributes): ZEllipse
export function createGObject(parent: SVGElement | string | ZObject, type: "z-callout", option?: GOptions.ZTextBoxAttributes): ZCallout
export function createGObject(parent: SVGElement | string | ZObject, type: "z-circle", option?: GOptions.ZTextBoxAttributes): ZCircle
export function createGObject(parent: SVGElement | string | ZObject, type: "z-arrow-callout", option?: GOptions.ZTextBoxAttributes): ZArrowCallout
export function createGObject(parent: SVGElement | string | ZObject, type: "z-graph", option?: GOptions.ZTextBoxAttributes): ZGraph
export function createGObject(parent: SVGElement | string | ZObject, type: "z-table", option?: ZTableOption): ZTable
export function createGObject(parent: SVGElement | string | ZObject, type: "z-object", option?: ZTableOption): ZObject
export function createGObject(parent: SVGElement | string | ZObject, type: "z-path-textbox", option?: GOptions.ZTextBoxAttributes): ZObject
export function createGObject(parent: SVGElement | string | ZObject, type: ShapeObjectType, option?: any): ZObject
export function createGObject(parent: SVGElement | string | ZObject, type: ShapeObjectType, option: any = {}): ZObject {
    /*
    let _parent: SVGElement;
    if (parent instanceof ZObject) {
        _parent = parent.svgGroup;
    } else if (parent instanceof SVGElement) {
        _parent = parent;
    } else {
        _parent = <any>document.getElementById(parent);
    }

    switch (type) {
        case ShapeObjectType.Callout:
            const call = new ZCallout(_parent);
            call.setOption(option);
            return call;
        case ShapeObjectType.ArrowCallout:
            const arr = new ZArrowCallout(_parent);
            arr.setOption(option);
        case ShapeObjectType.Ellipse:
            const ell = new ZEllipse(_parent);
            ell.setOption(option);
            return ell;
        case ShapeObjectType.Rect:
            const rect = new ZRect(_parent);
            rect.setOption(option);
            return rect;
        case ShapeObjectType.Edge:
            const edge = new ZEdge(_parent);
            edge.setOption(option);
            return edge;
        case ShapeObjectType.Graph:
            const graph = new ZGraph(_parent);
            graph.setOption(option);
            return graph;
        case ShapeObjectType.Table:
            const table = new ZTable(_parent);
            table.setOption(option);
            return table;
        case ShapeObjectType.RectButton:
            const rectb = new ZRectButton(_parent);
            rectb.setOption(option);
            return rectb;
        case ShapeObjectType.Circle:
            const circle = new ZCircle(_parent);
            circle.setOption(option);
            return circle;
        case ShapeObjectType.ForeignButton:
            const button = new ZForeignButton(_parent);
            button.setOption(option);
            return button;

        case ShapeObjectType.Object:
            const obj = new ZObject(_parent);
            obj.setOption(option);
            return obj;
    }
    */
    throw new ArgumentOutOfRangeError();
}
