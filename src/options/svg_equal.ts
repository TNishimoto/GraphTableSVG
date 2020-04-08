
import {NullError} from "../common/exceptions"
function attributesToSet(obj1: Element, obj2: Element) : Set<string>{
    const set : Set<string> = new Set();
    for(let i = 0;i<obj1.attributes.length;i++){
        const attr = obj1.attributes.item(i);
        if(attr!=null){
            set.add(attr.name);
        }
    }
    for(let i = 0;i<obj2.attributes.length;i++){
        const attr = obj2.attributes.item(i);
        if(attr!=null){
            set.add(attr.name);
        }
    }

    return set;
}
function equal_attributes(obj1: Element, obj2: Element, attributeSet : Set<string>) : boolean{
    Array.from(attributeSet.values()).forEach((v) =>{

        const value1 = obj1.getAttribute(v);
        const value2 = obj2.getAttribute(v);
        if(v == "href" || v == "xlink:href"){

        }else{
            if(value1 != value2){
                throw new Error(`${v}/${value1}/${value2}`);
            }        
        }

    })
    return true;
}



function equal_html(obj1: Element, obj2: Element, checkAttributes : boolean) : boolean {
    if(checkAttributes){
        const attrNames = attributesToSet(obj1, obj2);
        equal_attributes(obj1, obj2, attrNames);    
    }
    const childsize1 = obj1.children.length;
    const childsize2 = obj2.children.length;
    if(childsize1 == childsize2){
        for(let i=0;i<childsize1;i++){            
            const node1 = obj1.children.item(i)!;
            const node2 = obj2.children.item(i)!;
            const b = equal_html(node1, node2, true);
        }
    }else{
        throw new Error("Children Size Error");
    }
    return true;
}
/*
function equal_svgsvg(obj1: HTMLElement, obj2: HTMLElement) {
    const childsize1 = obj1.children.length;
    const childsize2 = obj2.children.length;
    if(childsize1 == childsize2){
        for(let i=0;i<childsize1;i++){            
            const node1 = obj1.children.item(i)!;
            const node2 = obj1.children.item(i)!;
            if(node1 instanceof HTMLElement && node2 instanceof HTMLElement){
                const b = equal_html(node1, node2);
            }else{
                throw new Error();
            }
        }
    }else{
        throw new Error();
    }
}
*/
function equal(obj1_id: string, obj2_id: string) : boolean {
    const obj1 = document.getElementById(obj1_id);
    const obj2 = document.getElementById(obj2_id);
    if (obj1 != null && obj2 != null) {
        let errorFlag = false;
        try{
            equal_html(obj1, obj2, false);
        }
        catch(e){
            errorFlag = true;
            obj2.style.backgroundColor = "red"
            throw e;

        }
        if(!errorFlag){
            obj2.style.backgroundColor = "yellow"
        }
        return true;
    } else {
        throw new NullError(`${obj1_id} / ${obj2_id}`);

    }
}

export function equalityCheck(test_id: string, correct_id_firefox: string | null, correct_id_edge: string | null, correct_id_chrome: string | null)  {
    const userAgent = window.navigator.userAgent.toLowerCase();
    let correct_id : string | null= null;
    let browser = window.navigator.userAgent;
    if(userAgent.indexOf('edge') != -1) {
        correct_id = correct_id_edge;
    }else if(userAgent.indexOf('firefox') != -1){
        correct_id = correct_id_firefox;
    }else if(userAgent.indexOf('chrome') != -1){
        correct_id = correct_id_chrome;
    }else{

    }
    //console.log(`Browser: ${browser}`)
    if(correct_id != null){
        equal(test_id, correct_id);
        //console.log(`Check OK!: ${test_id} / ${correct_id}`)
    }else{
        //console.log(`NULL`);
    }

}
