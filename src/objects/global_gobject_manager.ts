

import { IObject, ITextBox, IEdge } from "./i_object";
import { ObjectStableFlagName, updateTextByTimer, timerInterval, updatePathByTimer } from "./z_observer";
import { Debugger } from "../common/debugger";
let updateSVGSVGTimerCounter = 0;

/*
export function registerGObject(svgsvg: SVGSVGElement, obj: IObject) {
    if ((<any>svgsvg)._gobjects === undefined) {
        (<any>svgsvg)._gobjects = new Map<string, Object>();

        setTimeout(updateSVGSVGTimer, timerInterval, svgsvg);

    }

    const map: Map<string, Object> = (<any>svgsvg)._gobjects;
    if (map instanceof Map) {
        map.set(obj.objectID, obj);

    }
}
*/
export function textObserveTimer(manager: LocalZObjectManager) {
    manager.map.forEach((value: IObject, key) => {
        const x = <any>value;

        const svgText = x.svgText;
        if (svgText instanceof SVGTextElement) {
            updateTextByTimer(svgText);
        }
        const svgPath = x.svgPath;
        if (svgPath instanceof SVGPathElement) {
            updatePathByTimer(svgPath);
        }

    })

}

export function updateSVGSVGTimer(svgsvg: SVGSVGElement) {
    updateSVGSVGTimerCounter++;
    const manager = (<any>svgsvg)._manager;
    if (manager instanceof LocalZObjectManager) {
        textObserveTimer(manager);

        manager.map.forEach((value: IObject, key) => {
            const b = value.stableFlag;
            if (!b) {
                const b2 = value.childrenStableFlag;
                if (b2) {
                    const b3 = value.updateSurfaceWithoutSVGText();
                    if (b3) {
                        Debugger.updateUnstableFlagLog(value, updateSVGSVGTimer, "false -> true");
                        value.svgGroup.setAttribute(ObjectStableFlagName, "true");
                    }
                }
            }

        })

    }
    setTimeout(updateSVGSVGTimer, timerInterval, svgsvg);
}

export class LocalZObjectManager {
    public map: Map<string, IObject> = new Map();
    public svgsvgElement: SVGSVGElement;
    private incomingEdgeMapFromVertexID: Map<string, IEdge[]> = new Map();
    private outgoingEdgeMapFromVertexID: Map<string, IEdge[]> = new Map();
    private beginVertexMapFromEdgeID: Map<string, string | null> = new Map();
    private endVertexMapFromEdgeID: Map<string, string | null> = new Map();

    constructor(_svgsvgElement: SVGSVGElement) {
        this.svgsvgElement = _svgsvgElement;
        setTimeout(updateSVGSVGTimer, timerInterval, this.svgsvgElement);

    }
    public registerObject(obj: IObject) {
        this.map.set(obj.objectID, obj);
    }
    public getObject(key: string): IObject | undefined {
        return this.map.get(key);
    }
    public dispose() {

    }
    private removeBeginVertexObjectID(edge: IEdge, beginVertexID: string): boolean {
        const objectID = edge.objectID;

        const arr = this.outgoingEdgeMapFromVertexID.get(beginVertexID);
        if (arr != undefined) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].objectID == objectID) {
                    arr.splice(i, 1);
                    return true;
                }
            }

        }
        return false;
    }
    private removeEndVertexObjectID(edge: IEdge, endVertexID: string): boolean {
        const objectID = edge.objectID;

        const arr = this.incomingEdgeMapFromVertexID.get(endVertexID);
        if (arr != undefined) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].objectID == objectID) {
                    arr.splice(i, 1);
                    return true;
                }
            }

        }
        return false;
    }
    private addBeginVertexObjectID(edge: IEdge, beginVertexID: string){
        const objectID = edge.objectID;
        const arr = this.outgoingEdgeMapFromVertexID.get(beginVertexID);
        if(arr == null){
            this.outgoingEdgeMapFromVertexID.set(beginVertexID, new Array(0));
            this.addBeginVertexObjectID(edge, beginVertexID);
        }else{
            arr.push(edge);
        }
    }
    private addEndVertexObjectID(edge: IEdge, endVertexID: string){
        const objectID = edge.objectID;
        const arr = this.incomingEdgeMapFromVertexID.get(endVertexID);
        if(arr == null){
            this.incomingEdgeMapFromVertexID.set(endVertexID, new Array(0));
            this.addEndVertexObjectID(edge, endVertexID);
        }else{
            arr.push(edge);
        }    

    }
    public getBeginVertexID(edge: IEdge) : string | null{
        const objectID = edge.objectID;
        const beginVertexID = this.beginVertexMapFromEdgeID.get(objectID);
        if(beginVertexID == null || beginVertexID == undefined){
            return null;
        }else{
            return beginVertexID;
        }
    }
    public getEndVertexID(edge: IEdge) : string | null{
        const objectID = edge.objectID;
        const endVertexID = this.endVertexMapFromEdgeID.get(objectID);
        if(endVertexID == null || endVertexID == undefined){
            return null;
        }else{
            return endVertexID;
        }
    }

    public registerBeginVertexID(edge: IEdge, vertexID : string | null) {
        const objectID = edge.objectID;
        const oldBeginVertexID = this.beginVertexMapFromEdgeID.get(objectID);


        if (oldBeginVertexID != undefined) {
            this.removeBeginVertexObjectID(edge, oldBeginVertexID);
        }

        if(vertexID != null){
            this.addBeginVertexObjectID(edge, vertexID);
        }
        this.beginVertexMapFromEdgeID.set(objectID, vertexID);

    }
    public registerEndVertexID(edge: IEdge, vertexID : string | null) {
        const objectID = edge.objectID;
        const oldEndVertexID = this.endVertexMapFromEdgeID.get(objectID);

        if (oldEndVertexID != undefined) {
            this.removeEndVertexObjectID(edge, oldEndVertexID);
        }


        if(vertexID != null){
            this.addEndVertexObjectID(edge, vertexID);
        }
        this.endVertexMapFromEdgeID.set(objectID, vertexID);
    }

    public getIncmoingEdges(obj : IObject) : IEdge[] | null{
        const id = obj.svgGroup.getAttribute("id");
        if(id == null){
            return null;
        }else{
            const xb = this.incomingEdgeMapFromVertexID.get(id);
            if(xb == undefined){
                return null;
            }else{
                return xb.map((v) => v);
            }   
        }
    }
    public getOutgoingEdges(obj : IObject) : IEdge[] | null{
        const id = obj.svgGroup.getAttribute("id");
        if(id == null){
            return null;
        }else{
            const xb = this.outgoingEdgeMapFromVertexID.get(id);
            if(xb == undefined){
                return null;
            }else{
                return xb.map((v) => v);
            }   
        }

    }

}

export class GlobalZObjectManager {
    //static items : LocalGObjectManager[] = new Array();
    public static getLocalGobjectManager(svgsvg: SVGSVGElement): LocalZObjectManager | null {
        const p = <any>svgsvg;
        if (p._manager != undefined) {
            return <LocalZObjectManager>p._manager;
        } else {
            return null;
        }
    }
    public static tryRegisterSVGSVGElement(svgsvg: SVGSVGElement): LocalZObjectManager {
        const p = <any>svgsvg;
        if (p._manager == undefined) {
            p._manager = new LocalZObjectManager(p);
            return p._manager;
        } else {
            return p._manager;
        }

    }
    public static deleteSVGSVGElement(svgsvg: SVGSVGElement): boolean {
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
