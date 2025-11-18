import { LocalZObjectManager } from "./local_zobject_manager";

export class GlobalZObjectManager {
    //static items : LocalGObjectManager[] = new Array();
    private static getLocalGobjectManager(svgsvg: SVGSVGElement): LocalZObjectManager | null {
        const p = <any>svgsvg;
        if (p._manager != undefined) {
            return <LocalZObjectManager>p._manager;
        } else {
            return null;
        }
    }
    private static tryRegisterSVGSVGElement(svgsvg: SVGSVGElement): LocalZObjectManager {
        const p = <any>svgsvg;
        if (p._manager == undefined) {
            p._manager = new LocalZObjectManager(p);
            return p._manager;
        } else {
            return p._manager;
        }

    }
    private static deleteSVGSVGElement(svgsvg: SVGSVGElement): boolean {
        const p = <any>svgsvg;
        if (p._manager != undefined) {
            p._manager.dispose();
            p._manager = undefined;
            return true;
        } else {
            return false;
        }

    }

}
