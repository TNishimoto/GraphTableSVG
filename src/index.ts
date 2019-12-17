
//import { Hello } from "./hello";


//import { XMLPreprocessor } from "./xml_preprocessor";


//let exspo = Hello;
import * as CommonFunctions from "./basic/common/common_functions"
//import {GUIObserver} from "./basic/svghtml/gui_observer"
import {Rectangle} from "./basic/common/vline"
import {CSS, SVG, HTMLFunctions, GUIObserver} from "./basic/svghtml/index"

//import {GObjectAttributes} from "./options/attributes_option"
//import {SVG} from "./basic/svghtml/svg"
//import {HTMLFunctions} from "./basic/svghtml/html_functions"

import * as CustomAttributeNames from "./basic/common/custtome_attributes"
import { ShapeObjectType } from "./basic/common/enums";
import { openSVG, openHTML, openCustomElement,  lazyOpenSVG, createShape, clearSVG } from "./options/open_svg";
import { LogicTable } from "./options/logic_table";
import { LogicTree } from "./options/logic_tree";
import * as Console from "./options/console";
import * as Debug from "./options/debug";

import {GObject} from "./object/g_object"
import {GPathTextBox} from "./object/g_path_textbox"


export {
    CommonFunctions, GUIObserver, Rectangle, SVG, HTMLFunctions, CustomAttributeNames, 
    ShapeObjectType, openSVG, openHTML, openCustomElement, lazyOpenSVG,
    LogicTable, LogicTree, Console, GObject, GPathTextBox, createShape, clearSVG, Debug, CSS
};

