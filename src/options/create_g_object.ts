
import { ShapeObjectType } from "../common/enums";

import { GObject } from "../objects/z_object"
import { GCallout } from "../objects/z_callout"
import { GArrowCallout } from "../objects/z_arrow_callout"
import { GEllipse } from "../objects/z_ellipse"
import { GRect } from "../objects/z_rect"
import { GEdge } from "../objects/z_edge"
import { GTable, GTableOption } from "../objects/z_table"
import { GGraph } from "../objects/z_graph"
import { GRectButton } from "../objects/z_rect_button"
import { GCircle } from "../objects/z_circle";
import * as GOptions from "../objects/z_options"
import { ArgumentOutOfRangeError, NullError } from "../common/exceptions";
import { GForeignButton } from "../objects/z_foreign_button";

export function createGObject(parent: SVGElement | string | GObject, type: "z-rect-button", option?: GOptions.GTextBoxAttributes): GRectButton
export function createGObject(parent: SVGElement | string | GObject, type: "z-rect", option?: GOptions.GTextBoxAttributes): GRect
export function createGObject(parent: SVGElement | string | GObject, type: "z-edge", option?: GOptions.GEdgeAttributes): GEdge
export function createGObject(parent: SVGElement | string | GObject, type: "z-ellipse", option?: GOptions.GTextBoxAttributes): GEllipse
export function createGObject(parent: SVGElement | string | GObject, type: "z-callout", option?: GOptions.GTextBoxAttributes): GCallout
export function createGObject(parent: SVGElement | string | GObject, type: "z-circle", option?: GOptions.GTextBoxAttributes): GCircle
export function createGObject(parent: SVGElement | string | GObject, type: "z-arrow-callout", option?: GOptions.GTextBoxAttributes): GArrowCallout
export function createGObject(parent: SVGElement | string | GObject, type: "z-graph", option?: GOptions.GTextBoxAttributes): GGraph
export function createGObject(parent: SVGElement | string | GObject, type: "z-table", option?: GTableOption): GTable
export function createGObject(parent: SVGElement | string | GObject, type: "z-object", option?: GTableOption): GObject
export function createGObject(parent: SVGElement | string | GObject, type: "z-path-textbox", option?: GOptions.GTextBoxAttributes): GObject
export function createGObject(parent: SVGElement | string | GObject, type: ShapeObjectType, option?: any): GObject
export function createGObject(parent: SVGElement | string | GObject, type: ShapeObjectType, option: any = {}): GObject {
    let _parent: SVGElement;
    if (parent instanceof GObject) {
        _parent = parent.svgGroup;
    } else if (parent instanceof SVGElement) {
        _parent = parent;
    } else {
        _parent = <any>document.getElementById(parent);
    }

    switch (type) {
        case ShapeObjectType.Callout:
            const call = new GCallout(_parent);
            call.setOption(option);
            return call;
        case ShapeObjectType.ArrowCallout:
            const arr = new GArrowCallout(_parent);
            arr.setOption(option);
        case ShapeObjectType.Ellipse:
            const ell = new GEllipse(_parent);
            ell.setOption(option);
            return ell;
        case ShapeObjectType.Rect:
            const rect = new GRect(_parent);
            rect.setOption(option);
            return rect;
        case ShapeObjectType.Edge:
            const edge = new GEdge(_parent);
            edge.setOption(option);
            return edge;
        case ShapeObjectType.Graph:
            const graph = new GGraph(_parent);
            graph.setOption(option);
            return graph;
        case ShapeObjectType.Table:
            const table = new GTable(_parent);
            table.setOption(option);
            return table;
        case ShapeObjectType.RectButton:
            const rectb = new GRectButton(_parent);
            rectb.setOption(option);
            return rectb;
        case ShapeObjectType.Circle:
            const circle = new GCircle(_parent);
            circle.setOption(option);
            return circle;
        case ShapeObjectType.ForeignButton:
            const button = new GForeignButton(_parent);
            button.setOption(option);
            return button;

        case ShapeObjectType.Object:
            const obj = new GObject(_parent);
            obj.setOption(option);
            return obj;
    }
    throw new ArgumentOutOfRangeError();
}
