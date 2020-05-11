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
    if (dashArray != null && dashArray != "none") {
        return msoDashStyle.msoLineDash;
    } else {
        return msoDashStyle.msoLineSolid;
    }
}    
function computeDashArray(type: msoDashStyle, width: number): string {
    const r = [];
    for (let i = 0; i < msoDashStyle.dashArrayDic[type].length; i++) {
        r.push(`${msoDashStyle.dashArrayDic[type][i] * width}px`);
    }
    if(r.length == 0){
        return "none"
    }else{
        return r.join(", ");
    }
}

export function setComputedDashArray(svgLine: SVGLineElement | SVGPathElement | SVGElement): boolean {
    const type = ElementExtension.getPropertyStyleValue(svgLine,StyleNames.msoDashStyleName);
    if (type == null) {
        return false;
    }
    else if (msoDashStyle.toMSODashStyle(type) != null) {
        const width = <number>ElementExtension.getPropertyStyleNumberValue(svgLine,"stroke-width", 2);
        const newDashArray = computeDashArray(msoDashStyle.toMSODashStyle(type), width);
        const newLineCap = msoDashStyle.lineCapDic[type];
        const b1 = ElementExtension.setPropertyStyleValue2(svgLine,"stroke-dasharray", newDashArray);
        const b2 = ElementExtension.setPropertyStyleValue2(svgLine,"stroke-linecap", newLineCap);

        return b1 || b2;
    }else{
        return false;
    }
}