/// <reference path="g_path_textbox.ts"/>
//namespace GraphTableSVG {
    import {GTextBox} from "./g_textbox"
    import {GPathTextBox} from "./g_path_textbox"
    import { ShapeObjectType, SpeakerPosition, VBAShapeType } from "../common/enums";
    import {Rectangle, VLine} from "../common/vline"
    import * as GOptions  from "./g_options"

    import * as ElementExtension from "../interfaces/element_extension"
import { AttributeNames } from "../common";
    
    export type GCalloutAttributes = GOptions.GTextBoxAttributes & {
        speakerX?: number,
        speakerY?: number,
    }
    export class GCallout extends GPathTextBox {
        public constructor(svgbox: SVGElement | string) {
            super(svgbox);

            //const defaultSX = this.cx - 100 : this.fixedX - 50;
            //const defaultSY = this.fixedY == null ? this.cy - 100 : this.fixedY - 50;

           // const defaultSX = this.fixedX == null ? this.cx - 100 : this.fixedX - 50;
            //const defaultSY = this.fixedY == null ? this.cy - 100 : this.fixedY - 50;
            /*
            */
            if(this.type == ShapeObjectType.Callout) this.firstFunctionAfterInitialized();
        }
        protected setBasicOption(option: GCalloutAttributes) {
            super.setBasicOption(option);
            this.speakerX = option.speakerX == undefined ? 0 : option.speakerX;
            this.speakerY = option.speakerY == undefined ? 0 : option.speakerY;

        }
        public setOption(option: GCalloutAttributes) {
            super.setOption(option)
        }
    

        static constructAttributes(e : Element, removeAttributes : boolean = false, output : GCalloutAttributes = {}) : GCalloutAttributes {        
            GTextBox.constructAttributes(e, removeAttributes, output);


            if(e.hasAttribute(AttributeNames.speakerX))output.speakerX = ElementExtension.gtGetAttributeNumber(e, AttributeNames.speakerX, 0)!;
            if(e.hasAttribute(AttributeNames.speakerY))output.speakerY = ElementExtension.gtGetAttributeNumber(e, AttributeNames.speakerY, 0)!;

            if(removeAttributes){
                e.removeAttribute(AttributeNames.speakerX);
                e.removeAttribute(AttributeNames.speakerY);
            }

            return output;
        }
        /*
        static openCustomElement(e: SVGElement): GCallout {
            const parent = e.parentElement;
            if (parent instanceof SVGSVGElement) {
                const option = GCallout.constructAttributes(e,true);
                const attrs = e.gtGetAttributes();

                const r = new GCallout(parent, option);
                attrs.forEach((v)=>r.svgGroup.setAttribute(v.name, v.value));
                e.remove();
                return r;
            } else {
                throw Error("error!");
            }
        }
        */
        public get type(): ShapeObjectType {
            return "g-callout";
        }
        protected updateSurfaceSize(){
            const region = this.getVirtualRegion();
            if(this.width != region.width){
                this.width = region.width;
            }
    
            if(this.height != region.height){
                this.height = region.height;        
            }
            return false;
        }
        public update() {
            super.update();
            const x1 = - (this.width / 2);
            const y1 = - (this.height / 2);
            const x2 = (this.width / 2);
            const y2 = (this.height / 2);

            const speakerDiffX = this.speakerX - this.cx;
            const speakerDiffY = this.speakerY - this.cy;
            let px1 = 0, px2 = 0, py1 = 0, py2 = 0;
            let mes = "";
            switch (this.speakerPosition) {
                case "upleft":
                    px1 = (x1 / 3) * 2;
                    px2 = (x1 / 3) * 1;
                    mes = `H ${px1} L ${speakerDiffX} ${speakerDiffY} L ${px2} ${y1}`;
                    this.svgPath.setAttribute("d", `M ${x1} ${y1} ${mes} H ${x2} V ${y2} H ${x1} V ${y1} z`);
                    break;
                case "upright":
                    px1 = (x2 / 3) * 1;
                    px2 = (x2 / 3) * 2;
                    mes = `H ${px1} L ${speakerDiffX} ${speakerDiffY} L ${px2} ${y1}`;
                    this.svgPath.setAttribute("d", `M ${x1} ${y1} ${mes} H ${x2} V ${y2} H ${x1} V ${y1} z`);
                    break;
                case "rightup":
                    py1 = (y1 / 3) * 2;
                    py2 = (y1 / 3) * 1;
                    mes = `V ${py1} L ${speakerDiffX} ${speakerDiffY} L ${x2} ${py2}`;
                    this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} ${mes} V ${y2} H ${x1} V ${y1} z`);
                    break;
                case "rightdown":
                    py1 = (y2 / 3) * 1;
                    py2 = (y2 / 3) * 2;
                    mes = `V ${py1} L ${speakerDiffX} ${speakerDiffY} L ${x2} ${py2}`;
                    this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} ${mes} V ${y2} H ${x1} V ${y1} z`);
                    break;
                case "leftup":
                    py1 = (y1 / 3) * 1;
                    py2 = (y1 / 3) * 2;
                    mes = `V ${py1} L ${speakerDiffX} ${speakerDiffY} L ${x1} ${py2}`;
                    this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} H ${x1} ${mes} V ${y1} z`);
                    break;
                case "leftdown":
                    py1 = (y2 / 3) * 2;
                    py2 = (y2 / 3) * 1;
                    mes = `V ${py1} L ${speakerDiffX} ${speakerDiffY} L ${x1} ${py2}`;
                    this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} H ${x1} ${mes} V ${y1} z`);
                    break;
                case "downleft":
                    px1 = (x1 / 3) * 1;
                    px2 = (x1 / 3) * 2;
                    mes = `H ${px1} L ${speakerDiffX} ${speakerDiffY} L ${px2} ${y2}`;
                    this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} ${mes} H ${x1} V ${y1} z`);
                    break;
                case "downright":
                    px1 = (x2 / 3) * 2;
                    px2 = (x2 / 3) * 1;
                    mes = `H ${px1} L ${speakerDiffX} ${speakerDiffY} L ${px2} ${y2}`;
                    this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} ${mes} H ${x1} V ${y1} z`);
                    break;
                default:
                    this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} H ${x1} V ${y1} z`);
                    break;
            }


            //this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x1 + this.width} V ${y1 + this.height} H ${x1} V ${y1} z`);
        }

        get speakerX(): number {
            return ElementExtension.gtGetAttributeNumber(this.svgGroup, "data-speaker-x", 0)!;
        }
        set speakerX(value: number) {
            if (this.speakerX != value) this.svgGroup.setAttribute("data-speaker-x", value.toString());
        }
        get speakerY(): number {
            return ElementExtension.gtGetAttributeNumber(this.svgGroup, "data-speaker-y", 0)!;
        }
        set speakerY(value: number) {
            if (this.speakerY != value) this.svgGroup.setAttribute("data-speaker-y", value.toString());
        }




        public get speakerPosition(): SpeakerPosition {
            const speakerDiffX = this.speakerX - this.cx;
            const speakerDiffY = this.speakerY - this.cy;

            const x1 = - (this.width / 2);
            const y1 = - (this.height / 2);
            const x2 = (this.width / 2);
            const y2 = (this.height / 2);
            if (x1 <= speakerDiffX && speakerDiffX <= x2 && y1 <= speakerDiffY && speakerDiffY <= y2) {
                return "inner";
            }

            if (this.speakerX > this.cx) {
                if (this.speakerY > this.cy) {
                    const line = new VLine(0, 0, this.width, this.height);
                    if (line.contains(speakerDiffX, speakerDiffY)) {
                        return "rightdown";
                    } else {
                        return "downright";
                    }
                } else {
                    const line = new VLine(0, 0, this.width, -this.height);
                    if (line.contains(speakerDiffX, speakerDiffY)) {
                        return "upright"
                    } else {
                        return "rightup"
                    }
                }
            } else {
                if (this.speakerY > this.cy) {
                    const line = new VLine(0, 0, this.width, -this.height);
                    if (line.contains(speakerDiffX, speakerDiffY)) {
                        return "leftdown";
                    } else {
                        return "downleft";
                    }

                } else {
                    const line = new VLine(0, 0, this.width, this.height);
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