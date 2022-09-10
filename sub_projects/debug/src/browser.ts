import { webkit, firefox, chromium, ElementHandle, Locator, Page } from 'playwright'
import * as fs from 'fs';




/*
export async function getAllChilren(root: Page, xpath : string): Promise<string[]> {
    const r : string[] = new Array();
    const nodes = await root.locator(`xpath=${xpath}/*`);
    const count = await nodes.count();
    const dic : Map<string, number> = new Map();
    for (let i = 0; i < count; i++) {
        const name = await nodes.nth(i).evaluate(el => el.nodeName);
        if(!dic.has(name)){
            dic.set(name, 1);
        }else{
            dic.set(name, dic.get(name)! + 1);
        }
        r.push(xpath + `/*[${i+1}]` )
    }
    return r;
}

export async function getAllDescendants(root: Page, xpath : string): Promise<string[]> {
    const children : string[] = new Array();
    const nodes = await root.locator(`xpath=${xpath}/*`);
    const count = await nodes.count();
    const dic : Map<string, number> = new Map();
    for (let i = 0; i < count; i++) {
        const name = await nodes.nth(i).evaluate(el => el.nodeName);
        if(!dic.has(name)){
            dic.set(name, 1);
        }else{
            dic.set(name, dic.get(name)! + 1);
        }
        children.push(xpath + `/*[${i+1}]` )
    }

    const r : string[] = new Array();
    children.forEach((v) => {
        r.push(v);
    })
    for(let i=0;i<children.length;i++){
        (await getAllDescendants(root, children[i])).forEach((v) =>{
            r.push(v);
        })
    }


    return r;
}
*/

/*
export async function getChildren(node : Locator) : void  {
    const children = await node.locator("xpath=//")
    children.
    return children;
}
*/
