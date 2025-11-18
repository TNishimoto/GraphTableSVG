import { OriginalSVGSVGAttributes } from "./common/enums";
import { appendVBAButton } from "./options/vba_macro_modal";
import { convertFromZTagToIntermediateSVGGTag, processIntermediateSVGGElements } from "./options/custom_tag_processors/intermediate_g_tag_preprocessor";
import { processMacroTag } from "./options/custom_tag_processors/macro_tag_preprocessor";

export function transpile(id: string): void;
export function transpile(svgsvg: SVGSVGElement): void;
export function transpile(inputItem: string | SVGSVGElement): void {
    if (typeof inputItem == "string") {
        const item = document.getElementById(inputItem);
        if (item != null && item instanceof SVGSVGElement) {
            transpile(item);
        }else{
            throw Error("Error");
        }
    } else if (inputItem instanceof SVGSVGElement) {
        const svgsvg: SVGSVGElement = inputItem;

        processMacroTag(svgsvg);

        const vbaAttr = svgsvg.getAttribute(OriginalSVGSVGAttributes.VBAAttributeName);
        if (vbaAttr != null && vbaAttr == "true") {
            appendVBAButton(svgsvg);
        }
        
        convertFromZTagToIntermediateSVGGTag(svgsvg);
        processIntermediateSVGGElements(svgsvg, null);
        
    } else {
        throw Error("Error");
    }

}
