import { LogicCell } from "./logic_cell";
import * as SVGTextBox from "../interfaces/svg_textbox"
import { LogicText } from "./logic_text";

export function createTextElementFromLogicCell(item : LogicCell,svgText: SVGTextElement) {
    if (item.tTexts != null) {
        SVGTextBox.constructSVGTextByHTMLElements(svgText, item.tTexts, true);
    } else if (item.text instanceof LogicText) {
        if(item.option.textOption.class != undefined){
            svgText.setAttribute("class", item.option.textOption.class)
        }
        if(item.option.textOption.style != undefined){
            svgText.setAttribute("style", item.option.textOption.style)
        }
        if(item.option.textOption.id != undefined){
            svgText.setAttribute("id", item.option.textOption.id)
        }

        item.text.copyToTextElement(svgText);
    }
}
