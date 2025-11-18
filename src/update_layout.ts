import { LocalZObjectManager } from "./objects/local_zobject_manager";

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