
export type DebugMode = "ObserveUpdateFlag" | "Node" | "None"

const debugMode : DebugMode = "Node";


let objID : string | null = null;
let updateObjID : string | null = null;

let counter = 0;

export class Debugger {
    public static getDebugMode() : DebugMode{
        return debugMode;        
    }
    public static updateFlagLog(obj : any, func : any, msg : string){
        if(debugMode == "ObserveUpdateFlag"){
            const type = obj.constructor.name;
            let id : string | null = null;
            let name = func.name;

            if(type == "Cell"){
                id = `{X = ${obj.cellX}, Y = ${obj.cellY}}`
            }else{
                id = (<number>obj.objectID).toString();
            }
            const styles = 'color: yellow; background-color: black;';


            let s = "";
            if(objID == id){
                for(let i=0;i<counter;i++){
                    s += "\t";
                }
                counter++;
            }else{
                objID = id;
                counter = 1;
            }

            console.log(`${s} %c (ID = ${id}) object = ${type}, function = ${name}(${msg})`, styles)
            //console.trace(obj);
            if(name == "updateSVGSVGTimer"){
                objID = null;
                counter = 0;
            }

        }
    }
    public static updateLog(obj : any, func : any, msg : string){
        if(debugMode == "ObserveUpdateFlag"){
            const type = obj.constructor.name;
            let id : string | null = null;
            let name = func.name;

            if(type == "Cell"){
                id = `{X = ${obj.cellX}, Y = ${obj.cellY}}`
            }else{
                id = (<number>obj.objectID).toString();
            }
            const styles = 'color: black; background-color: aqua;';


            let s = "";
            if(updateObjID == id){
                for(let i=0;i<counter;i++){
                    s += "\t";
                }
                counter++;
            }else{
                updateObjID = id;
                counter = 1;
            }

            console.log(`${s} %c (ID = ${id}) object = ${type}, function = ${name}(${msg})`, styles)
            //console.trace(obj);
            if(name == "updateSVGSVGTimer"){
                updateObjID = null;
                counter = 0;
            }

        }
    }

}