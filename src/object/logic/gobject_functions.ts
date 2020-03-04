import { LogicCell } from "./logic_cell";
import * as SVGTextBox from "../../basic/interface/svg_textbox"
import { LogicText } from "./logic_text";

export function createTextElementFromLogicCell(item : LogicCell,svgText: SVGTextElement) {
    if (item.tTexts != null) {
        SVGTextBox.constructSVGTextByHTMLElements(svgText, item.tTexts, true);
    } else if (item.text instanceof LogicText) {
        item.text.setTextElement(svgText);
    }
}
