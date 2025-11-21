import * as HTML from "./html/index"
import * as Common from "./common/index"
import * as Objects from "./objects/index"
import {LocalZObjectManager} from "./local_zobject_manager"
import * as Options from "./options/index";
import * as Logics from "./logics/index";
import * as Console from "./options/console";
import * as Debug from "./debug/debug";
import * as Interfaces from "./interfaces/index";
import * as TypeDoc from "./typedoc/index";

import { transpile, updateUnstableObjects, updateAll, collectObjectsToUpdate } from "./main_functions"


export {
    HTML, Common, Objects, Logics, Options, 
    Console, Debug, Interfaces, TypeDoc, transpile, updateUnstableObjects, updateAll, collectObjectsToUpdate
};

