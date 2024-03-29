
export type DebugMode = "None"

const debugMode : DebugMode = "None";


let objID : string | null = null;
let updateObjID : string | null = null;

let counter = 0;

export class Debugger {
    public static getDebugMode() : DebugMode{
        return debugMode;        
    }
    public static getStopWatchFlag() : boolean{
        return false;
    }
    public static getStableFlagWatchFlag() : boolean {
        return false;
    }
    public static getNodePathFlag() : boolean{
        return false;
    }
    public static getObserveUpdateFlag() : boolean {
        return false;
    }
    public static showTime(oldTime : Date, newTime : Date, name : string, msg : string){
        const diffx = newTime.getTime() - oldTime.getTime();
        const styles = 'color: black; background-color: lightgreen;';

        console.log(`%c Timer: name = ${name}: UpdateTime = ${Math.abs(diffx) / 1000}s`, styles);

    }
    public static updateUnstableFlagLog(obj : any, func : any, msg : string){
        if(this.getStableFlagWatchFlag()){
            const type = obj.constructor.name;
            let id : string | null = null;
            let name = func.name;

            const xid : string | undefined = (obj.objectID)
            if(xid != undefined){
                id = xid;                
            }else{
                id = null;
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

        }

    }

    public static updateFlagLog(obj : any, func : any, msg : string){
        if(Debugger.getObserveUpdateFlag()){
            const type = obj.constructor.name;
            let id : string | null = null;
            let name = func.name;

            const xid : string | undefined = (obj.objectID)
            if(xid != undefined){
                id = xid;                
            }else{
                id = null;
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
        if(Debugger.getObserveUpdateFlag()){
            const type = obj.constructor.name;
            let id : string | null = null;
            let name = func.name;

            const xid : string | undefined = (obj.objectID)
            if(xid != undefined){
                id = xid;                
            }else{
                id = null;
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