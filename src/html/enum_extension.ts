import { msoDashStyle } from "../common/enums";
import * as StyleNames from "../common/style_names"

import * as ElementExtension from "../interfaces/element_extension"


export function getLineType(svgLine: SVGLineElement | SVGPathElement | SVGElement): msoDashStyle {
    const typeName = ElementExtension.getPropertyStyleValue(svgLine, StyleNames.msoDashStyleName);
    if (typeName != null) {
        const type = msoDashStyle.toMSODashStyle(typeName);
        if (type != null) {
            return type;
        }
    }
    const dashArray = ElementExtension.getPropertyStyleValue(svgLine,"stroke-dasharray");
    if (dashArray != null) {
        return msoDashStyle.msoLineDash;
    } else {
        return msoDashStyle.msoLineSolid;
    }
}    
function computeDashArray(type: msoDashStyle, width: number): string {
    const r = [];
    for (let i = 0; i < msoDashStyle.dashArrayDic[type].length; i++) {
        r.push(msoDashStyle.dashArrayDic[type][i] * width);
    }
    return r.join(",");
}

export function setCpmoutedDashArray(svgLine: SVGLineElement | SVGPathElement | SVGElement): void {
    const type = ElementExtension.getPropertyStyleValue(svgLine,StyleNames.msoDashStyleName);
    if (type == null) {

    }
    else if (msoDashStyle.toMSODashStyle(type) != null) {
        const width = <number>ElementExtension.getPropertyStyleNumberValue(svgLine,"stroke-width", 2);
        ElementExtension.setPropertyStyleValue(svgLine,"stroke-dasharray", computeDashArray(msoDashStyle.toMSODashStyle(type), width));
        ElementExtension.setPropertyStyleValue(svgLine,"stroke-linecap", msoDashStyle.lineCapDic[type]);
    }
}