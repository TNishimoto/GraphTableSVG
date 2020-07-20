
export function spacePadding(len : number){
    let s = "";
    for(let i=0;i<len;i++){
        s += " ";
    }
    return s;
}
export function isPrimitiveObject(item : object | any[] | null) : boolean{
    if (item == null){
        return true;
    } else if (item instanceof Array) {
        return item.every((v) => (typeof v === "string" || typeof v === "number" || typeof v === "boolean"));
    }else{
        return Object.keys(item).every((key) => {
            const value = (<any>item)[key];
            return (typeof value === "string" || typeof value === "number" || typeof value === "boolean");
        })
    }
}
function toStringLineArray(item : any, name : string | null,padding : number) : string[] {
    const r : string[] = new Array();
    if (item instanceof Array) {
        if(isPrimitiveObject(item)){
            const center = item.map((v) => v.toString()).join(", ")
            const s = name == null ? `[ ${center} ]` : `${name} = [ ${center} ]` 
            r.push(spacePadding(padding) + s);
        }else{
            let left = name == null ? (spacePadding(padding) + "[") : (spacePadding(padding) + `${name} = [`) ;
            r.push(left);
            for (let i = 0; i < item.length; i++) {
                const center = toStringLineArray(item[i], null,padding+1);
                center.forEach((v) => r.push(v));
            }    
            let right = spacePadding(padding) + "[";
            r.push(right);

        }
    } else {
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
            if(name == null){
                const s = spacePadding(padding) + item.toString();
                r.push(s);
            }else{
                const s = `${spacePadding(padding)}${name} = ${item.toString()}`;
                r.push(s);
            }
        } 
        else if(item instanceof Map){

            const arr : any[] = [];
            item.forEach((value, key) => {
                arr.push({ "key" : key, "value" : value} );
            });
            const center = toStringLineArray(arr, name, padding);
            center.forEach((v) => r.push(v));

        }
        else if (typeof item === "object") {
            if(isPrimitiveObject(item)){
                if(item == null){
                    const s = name == null ? `null` : `${name} = null` 
                    r.push(spacePadding(padding) + s);    
                }else{
                    const center = Object.keys(item).map((key) => `${key} = ${(item[key]).toString()}`).join(", ")
                    const s = name == null ? `{ ${center} }` : `${name} = { ${center} }` 
                    r.push(spacePadding(padding) + s);    
                }
            }else{
                let left = name == null ? (spacePadding(padding) + "{") : (spacePadding(padding) + `${name} = {`) ;
                r.push(left);
                Object.keys(item).forEach((key) => {
                    const value = item[key];
                    const center = toStringLineArray(value, key.toString(), padding+1);
                    center.forEach((v) => r.push(v));
                })
                let right = spacePadding(padding) + "}";
                r.push(right);    
            }

        }
    }
    return r;
}
export function stringify(item : any) : string {
    const r : string[] = toStringLineArray(item, null, 0);
    return r.join("\n");
}