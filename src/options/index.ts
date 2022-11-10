import { openSVG, openHTML,  lazyOpenSVG, clearSVG } from "./open_svg";
import { createGObject } from "./create_g_object"
import {equalityCheck} from "./svg_equal"
import {stringify} from "./to_json"
//import {convertFromIntermediateSVGGElementToZObject} from "./custom_tag_processors/intermediate_g_tag_preprocessor"


import {SVGToVBA} from "./svg_to_vba"
import * as VBAObject from "./vba_object"

import { createMacroModalFromID, processVBAButtonClickEvent } from "./vba_macro_modal"
import * as EditorHelper from "./editor_helper"

export{
    openSVG, openHTML,  lazyOpenSVG, createGObject as createShape, clearSVG, equalityCheck, SVGToVBA, createMacroModalFromID, EditorHelper, stringify, 
    processVBAButtonClickEvent, VBAObject
}