import { openSVG, openHTML, openCustomElement,  lazyOpenSVG, createShape, clearSVG } from "./open_svg";
import {equalityCheck} from "./svg_equal"
import {stringify} from "./to_json"

import {SVGToVBA} from "./svg_to_vba"
import { createMacroModalFromID, processVBAButtonClickEvent } from "./vba_macro_modal"
import * as EditorHelper from "./editor_helper"

export{
    openSVG, openHTML, openCustomElement,  lazyOpenSVG, createShape, clearSVG, equalityCheck, SVGToVBA, createMacroModalFromID, EditorHelper, stringify, 
    processVBAButtonClickEvent
}