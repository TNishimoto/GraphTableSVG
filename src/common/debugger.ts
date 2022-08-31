
export type DebugMode = "ObserveUpdateFlag" | "None"

export const debugMode : DebugMode = "ObserveUpdateFlag";


let objID : number | undefined = undefined;
let counter = 0;

export class Debugger {
    public static updateFlagLog(obj : any, func : any, msg : string){
        if(debugMode == "ObserveUpdateFlag"){
            const type = obj.constructor.name;
            const id = obj.objectID;
            const name = func.name;
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
                objID = undefined;
                counter = 0;
            }

        }
    }

}