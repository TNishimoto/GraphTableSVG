import { LocalZObjectManager } from "./local_zobject_manager";
import { OriginalSVGSVGAttributes } from "./common/enums";
import { appendVBAButton } from "./options/vba_macro_modal";
import { convertFromZTagToIntermediateSVGGTag, processIntermediateSVGGElements } from "./options/custom_tag_processors/intermediate_g_tag_preprocessor";
import { processMacroTag } from "./options/custom_tag_processors/macro_tag_preprocessor";
import { waitForStableBBoxAll } from "./common/wait_for_stable_bbox";
import * as AttributeNames from "./common/attribute_names";
import { IObject } from "./objects/i_object";
import { HTMLFunctions } from "./html";


/*
export async function updateLayout(id: string): Promise<boolean>;
export async function updateLayout(svgsvg: SVGSVGElement): Promise<boolean>;
export async function updateLayout(inputItem: string | SVGSVGElement): Promise<boolean> {
    if (typeof inputItem == "string") {
        const item = document.getElementById(inputItem);
        if (item != null && item instanceof SVGSVGElement) {
            return updateLayout(item);
        } else {
            throw Error("Error");
        }
    } else if (inputItem instanceof SVGSVGElement) {
        const svgsvg: SVGSVGElement = inputItem;
        const manager = (<any>svgsvg)._manager;
        if (manager instanceof LocalZObjectManager) {
            return await manager.update_layout();
        } else {
            throw Error("Error");
        }
    } else {
        throw Error("errror");
    }
}
*/

export function transpile(id: string): void;
export function transpile(svgsvg: SVGSVGElement): void;
export function transpile(inputItem: string | SVGSVGElement): void {
    if (typeof inputItem == "string") {
        const item = document.getElementById(inputItem);
        if (item != null && item instanceof SVGSVGElement) {
            transpile(item);
        } else {
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

export async function updateUnstableObjects(id: string): Promise<boolean>
export async function updateUnstableObjects(svgsvg: SVGSVGElement): Promise<boolean>
export async function updateUnstableObjects(inputItem: SVGSVGElement | string): Promise<boolean> {
    if (typeof inputItem == "string") {
        const item = document.getElementById(inputItem);
        if (item != null && item instanceof SVGSVGElement) {
            return updateUnstableObjects(item);
        } else {
            throw Error("Error");
        }
    } else if (inputItem instanceof SVGSVGElement) {
        const svgsvg: SVGSVGElement = inputItem;
        let manager: LocalZObjectManager | undefined = (<any>svgsvg)._manager;
        if (manager == undefined) {
            manager = LocalZObjectManager.create(svgsvg);
        }

        const unstableObjects = manager.getAllUnstableObjects();
        const boxes = await waitForStableBBoxAll(unstableObjects);
        for (let i = 0; i < unstableObjects.length; i++) {
            const object = unstableObjects[i];
            if (object instanceof SVGTextElement) {
                object.setAttribute(AttributeNames.virtualWidthName, boxes[i].width.toString());
                object.setAttribute(AttributeNames.virtualHeightName, boxes[i].height.toString());
                object.setAttribute(AttributeNames.virtualXName, boxes[i].x.toString());
                object.setAttribute(AttributeNames.virtualYName, boxes[i].y.toString());
            }
        }
        return true



    } else {
        throw Error("errror");
    }
}

export function collectObjectsToUpdate(id: string): Element[]
export function collectObjectsToUpdate(svgsvgElement: SVGSVGElement): Element[]
export function collectObjectsToUpdate(inputItem: SVGSVGElement | string): Element[] {

    if (typeof inputItem == "string") {
        const item = document.getElementById(inputItem);
        if (item != null && item instanceof SVGSVGElement) {
            return collectObjectsToUpdate(item);
        } else {
            throw Error("Error");
        }
    } else if (inputItem instanceof SVGSVGElement) {
        const svgsvg: SVGSVGElement = inputItem;
        const elements = HTMLFunctions.getDescendantsByPreorder(svgsvg, (v) => !v.hasAttribute("data-descendant-skip"));
        /*
        let manager: LocalZObjectManager | undefined = (<any>svgsvg)._manager;
        if (manager == undefined) {
            manager = LocalZObjectManager.create(svgsvg);
        }

        const values: SVGElement[] = Array.from(manager.map.values()).map((v) => v.svgGroup);
        */
        return elements;
    } else {
        throw Error("errror");
    }

}
export function afterEvaluateAttributes(e: Element) {
    const operator: IObject | undefined = (<any>e).operator;
    if (operator != undefined) {
        operator.afterEvaluateAttributes();
    } else if (e instanceof HTMLElement || e instanceof SVGElement) {
        const dataArray: { key: string; value: string | undefined }[] =
            Object.entries(e.dataset).map(([key, value]) => ({ key, value }));
        dataArray.forEach((v) => {

            if (v.key.indexOf("Xpath") == v.key.length - "Xpath".length && v.value != undefined) {
                const attributeName = v.key.substring(0, v.key.length - "Xpath".length);
                const attributeValue: string = document.evaluate(
                    v.value,
                    document,
                    null,
                    XPathResult.STRING_TYPE,
                    null
                ).stringValue;
                e.setAttribute(attributeName, attributeValue);
            }
        })


    }
}

export async function updateAll(id: string): Promise<boolean>
export async function updateAll(svgsvg: SVGSVGElement): Promise<boolean>
export async function updateAll(inputItem: SVGSVGElement | string): Promise<boolean> {
    if (typeof inputItem == "string") {
        const item = document.getElementById(inputItem);
        if (item != null && item instanceof SVGSVGElement) {
            return updateAll(item);
        } else {
            throw Error("Error");
        }
    } else if (inputItem instanceof SVGSVGElement) {
        const svgsvg: SVGSVGElement = inputItem;
        let manager: LocalZObjectManager | undefined = (<any>svgsvg)._manager;
        if (manager == undefined) {
            manager = LocalZObjectManager.create(svgsvg);
        }
        transpile(svgsvg);
        await updateUnstableObjects(svgsvg);
        const objects : Element[] = collectObjectsToUpdate(svgsvg);
        objects.forEach((v) => {
            afterEvaluateAttributes(v);
        })
        return true;



    } else {
        throw Error("errror");
    }
}
