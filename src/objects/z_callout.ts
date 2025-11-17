/// <reference path="z_path_textbox.ts"/>
//namespace GraphTableSVG {
import { ZTextBox } from "./z_textbox"
import { ZPathTextBox } from "./z_path_textbox"
import { ShapeObjectType, SpeakerPosition, VBAShapeType } from "../common/enums";
import { Rectangle, VLine } from "../common/vline"
import * as GOptions from "./z_options"

import * as ElementExtension from "../interfaces/element_extension"
import { AttributeNames } from "../common";

export type ZCalloutAttributes = GOptions.ZTextBoxAttributes & {
    speakerX?: number,
    speakerY?: number,
}
export class ZCallout extends ZPathTextBox {
    public constructor(svgbox: SVGElement | string) {
        super(svgbox);

        if (this.type == ShapeObjectType.Callout) this.firstFunctionAfterInitialized();
    }


    public initializeSetBasicOption(source: SVGElement) {
        super.initializeSetBasicOption(source);
    }

    public get type(): ShapeObjectType {
        return ShapeObjectType.Callout;
    }
    protected updateSurfaceSize() {
        throw new Error("Not implemented for async");
    }
    protected updateSurfaceLocation(): boolean {

        const x1 = this.getVirtualX();
        const y1 = this.getVirtualY();
        const x2 = x1 + this.getVirtualWidth();
        const y2 = y1 + this.getVirtualHeight();


        let px1 = 0, px2 = 0, py1 = 0, py2 = 0;
        let mes = "";
        switch (this.speakerPosition) {
            case "upleft":
                px1 = x1 + (this.getVirtualWidth() / 3);
                px2 = x1 + (this.getVirtualWidth() * 2 / 3);
                mes = `H ${px1} L ${this.speakerX} ${this.speakerY} L ${px2} ${y1}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} ${mes} H ${x2} V ${y2} H ${x1} V ${y1} z`);
                break;
            case "upright":
                px1 = x1 + (this.getVirtualWidth() / 3);
                px2 = x1 + (this.getVirtualWidth() * 2 / 3);
                mes = `H ${px1} L ${this.speakerX} ${this.speakerY} L ${px2} ${y1}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} ${mes} H ${x2} V ${y2} H ${x1} V ${y1} z`);
                break;
            case "rightup":
                py1 = y1 + (this.getVirtualHeight() / 3);
                py2 = y1 + (this.getVirtualHeight() * 2 / 3);
                mes = `V ${py1} L ${this.speakerX} ${this.speakerY} L ${x2} ${py2}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} ${mes} V ${y2} H ${x1} V ${y1} z`);
                break;
            case "rightdown":
                py1 = y1 + (this.getVirtualHeight() / 3);
                py2 = y1 + (this.getVirtualHeight() * 2 / 3);
                mes = `V ${py1} L ${this.speakerX} ${this.speakerY} L ${x2} ${py2}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} ${mes} V ${y2} H ${x1} V ${y1} z`);
                break;
            case "leftup":
                py1 = y2 - (this.getVirtualHeight() / 3);
                py2 = y2 - (this.getVirtualHeight() * 2 / 3);
                mes = `V ${py1} L ${this.speakerX} ${this.speakerY} L ${x1} ${py2}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} H ${x1} ${mes} V ${y1} z`);
                break;
            case "leftdown":
                py1 = y2 - (this.getVirtualHeight() / 3);
                py2 = y2 - (this.getVirtualHeight() * 2 / 3);
                mes = `V ${py1} L ${this.speakerX} ${this.speakerY} L ${x1} ${py2}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} H ${x1} ${mes} V ${y1} z`);
                break;
            case "downleft":
                px1 = x2 - (this.getVirtualWidth() / 3);
                px2 = x2 - (this.getVirtualWidth() * 2 / 3);
                mes = `H ${px1} L ${this.speakerX} ${this.speakerY} L ${px2} ${y2}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} ${mes} H ${x1} V ${y1} z`);
                break;
            case "downright":
                px1 = x2 - (this.getVirtualWidth() / 3);
                px2 = x2 - (this.getVirtualWidth() * 2 / 3);
                mes = `H ${px1} L ${this.speakerX} ${this.speakerY} L ${px2} ${y2}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} ${mes} H ${x1} V ${y1} z`);
                break;
            default:
                this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} H ${x1} V ${y1} z`);
                break;
        }
        return true;
    }
    
    public update() : void {
        super.update();
    }


    //this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x1 + this.width} V ${y1 + this.height} H ${x1} V ${y1} z`);


    get speakerX(): number {
    return ElementExtension.gtGetAttributeNumber(this.svgGroup, AttributeNames.dataSpeakerX, 0)!;
}
    set speakerX(value: number) {
    if (this.speakerX != value) this.svgGroup.setAttribute(AttributeNames.dataSpeakerX, value.toString());
}
    get speakerY(): number {
    return ElementExtension.gtGetAttributeNumber(this.svgGroup, AttributeNames.dataSpeakerY, 0)!;
}
    set speakerY(value: number) {
    if (this.speakerY != value) this.svgGroup.setAttribute(AttributeNames.dataSpeakerY, value.toString());
}




    public get speakerPosition(): SpeakerPosition {
    const speakerDiffX = this.speakerX - this.getVirtualCX();
    const speakerDiffY = this.speakerY - this.getVirtualCY();

    const x1 = this.getVirtualX();
    const y1 = this.getVirtualY();
    const x2 = x1 + this.getVirtualWidth();
    const y2 = y1 + this.getVirtualHeight();
    if (x1 <= speakerDiffX && speakerDiffX <= x2 && y1 <= speakerDiffY && speakerDiffY <= y2) {
        return "inner";
    }

    if (this.speakerX > this.getVirtualCX()) {
        if (this.speakerY > this.getVirtualCY()) {
            const line = new VLine(0, 0, this.getVirtualWidth(), this.getVirtualHeight());
            if (line.contains(speakerDiffX, speakerDiffY)) {
                return "rightdown";
            } else {
                return "downright";
            }
        } else {
            const line = new VLine(0, 0, this.getVirtualWidth(), -this.getVirtualHeight());
            if (line.contains(speakerDiffX, speakerDiffY)) {
                return "upright"
            } else {
                return "rightup"
            }
        }
    } else {
        if (this.speakerY > this.getVirtualCY()) {
            const line = new VLine(0, 0, this.getVirtualWidth(), -this.getVirtualHeight());
            if (line.contains(speakerDiffX, speakerDiffY)) {
                return "leftdown";
            } else {
                return "downleft";
            }

        } else {
            const line = new VLine(0, 0, this.getVirtualWidth(), this.getVirtualHeight());
            if (line.contains(speakerDiffX, speakerDiffY)) {
                return "upleft";

            } else {
                return "leftup";

            }
        }
    }

}
    public get shape(): VBAShapeType {
    return VBAShapeType.Callout;
}

    protected get VBAAdjustments(): number[] {
    const y1 = this.speakerY - this.cy;
    const py = y1 / this.height;
    const x1 = this.speakerX - this.cx;
    const px = x1 / this.width;
    return [px, py];
}


}


//}