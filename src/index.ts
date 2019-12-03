
//import { Hello } from "./hello";


//import { XMLPreprocessor } from "./xml_preprocessor";


//let exspo = Hello;
import {Common} from "./common/common"
import {GUI} from "./common/gui_observe"
import {Rectangle} from "./common/vline"

import {GObjectAttributes} from "./options/attributes_option"
import {SVG} from "./svghtml/svg"
import {HTMLFunctions} from "./svghtml/html_functions"

import { CustomAttributeNames } from "./options/custtome_attributes"
import { ShapeObjectType } from "./common/enums";
import { openSVG, openHTML, openCustomElement, openSVGFunctions, lazyOpenSVG } from "./options/open_svg";
import { LogicTable } from "./options/logic_table";
import { LogicTree } from "./options/logic_tree";
import { Console } from "./svghtml/console";

import {GObject} from "./object/g_object"
import {GPathTextBox} from "./object/g_path_textbox"


export {
    Common, GUI, Rectangle, GObjectAttributes, SVG, HTMLFunctions, CustomAttributeNames, 
    ShapeObjectType, openSVG, openHTML, openCustomElement, openSVGFunctions, lazyOpenSVG,
    LogicTable, LogicTree, Console, GObject, GPathTextBox
};


console.log("Loaded Index.ts")