import { webkit, firefox, chromium, ElementHandle, Locator, Page } from 'playwright'
import * as fs from 'fs';

export type BrowserNameType = 'webkit' | 'firefox' | 'chromium' | 'edge';
export type ErrorType = 'TextMismatch' | 'TimeoutError' | 'UnexpectedError';

export function createDirectoryIfNotExist(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdir(dirPath, (err) => {
            if (err) { throw err; }
            console.log(`Created folder: ${dirPath}`);
        });
    }

}
function isSpecialNode(nodeName : string) : boolean{
    const dic : Set<string> = new  Set();
    dic.add("svg");
    dic.add("g");
    dic.add("rect");
    dic.add("text");
    dic.add("tspan");
    dic.add("line");
    dic.add("circle");
    dic.add("ellipse");
    dic.add("path");
    dic.add("polygon");
    dic.add("polyline");
    dic.add("textPath");
    dic.add("metadata");
    dic.add("marker");

    return dic.has(nodeName);
}
function HTMLCaptialNodeToProperName(nodeName : string) : string{
    const p = nodeName.toLowerCase();
    if(p == "textpath"){
        return "textPath";
    }else{
        return p;
    }
}

export function rightPadding(text: string, maxLen: number) {
    let s = text;
    while (s.length < maxLen) {
        s += " ";
    }
    return s;
}

export function getAbsoluteDirectoryPath(relativeDirPath: string): string {
    const name = "GraphTableSVG";
    const p = __filename.indexOf(name);
    const baseDirPath = __filename.substring(0, p + name.length);
    if (relativeDirPath == "") {
        return `${baseDirPath}`
    } else {
        return `${baseDirPath}/${relativeDirPath}`
    }
}
export function concatenatePaths(relativeDirPath1: string, relativeDirPath2: string): string {
    if (relativeDirPath1 == "") {
        return relativeDirPath2;
    } else {
        if (relativeDirPath2 == "") {
            return relativeDirPath1;
        } else {
            return `${relativeDirPath1}/${relativeDirPath2}`;
        }

    }
}

export async function outerHtml(elem: Locator) {
    if (!elem) {
        return undefined;
    }

    //@ts-ignore
    return await elem.evaluate(elem => elem.outerHTML);
}

type NodeAttribute = { name: string, value: string | null }
function sanityze(attribute : NodeAttribute) : string {
    if(attribute.value != null){
        const p1 = attribute.value.indexOf(`"`) == -1;
        const p2 = attribute.value.indexOf(`'`) == -1;
        
        if(p1){
            return `${attribute.name}="${attribute.value}"`;
        }else if(p2){
            return `${attribute.name}='${attribute.value}'`;
        }else{
            const sanitizedValue = attribute.value.replace(/'/g, "&#39;")
            return `${attribute.name}='${sanitizedValue}'`;
        }
    }else{
        return "";
    }

}

export async function getAllAttributes(page: Locator): Promise<NodeAttribute[]> {
    const el_attrs = await page.evaluate(el => el.getAttributeNames())

    const r: NodeAttribute[] = new Array();
    for(let i = 0;i<el_attrs.length;i++){
        const name = el_attrs[i];
        const value = await page.getAttribute(name);
        r.push({ name: name, value: value })

    }
    return r;
}
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

export async function convertFromPageToLines(root: Page, xpath : string | null): Promise<string[]> {

    const r : string[] = new Array();

    const childrenXPathCodes = await getXPathCodeOfChildren(root, xpath);
    for (let i = 0; i < childrenXPathCodes.length; i++) {
        const nextNodePath = xpath == null ? `/${childrenXPathCodes[i]}` : `${xpath}/${childrenXPathCodes[i]}`;
        const lines = await toHTMLLines(root, nextNodePath, "")
        lines.forEach((v) =>{
            r.push(v);
        })
    }

    return r;
}
export async function getXPathCodeOfChildren(root: Page, xpath : string | null): Promise<string[]> {
    const nodes = await root.locator(`xpath=${xpath == null ? "" : xpath}/*`);
    const count = await nodes.count();

    const dic : Map<string, number> = new Map();
    const r : string[] = new Array(0);

    for (let i = 0; i < count; i++) {
        const upperName = await nodes.nth(i).evaluate(el => el.nodeName); 

        const name = HTMLCaptialNodeToProperName(upperName);
        if(!dic.has(name)){
            dic.set(name, 1);
        }else{
            dic.set(name, dic.get(name)! + 1);
        }
        const nextNodeCount = dic.get(name)!;
        let nextNodePath ="";
        if(isSpecialNode(name)){
            nextNodePath = `*[name()="${name}"][${nextNodeCount}]`
        }else{
            nextNodePath = `${name}[${nextNodeCount}]`;
    
        }
        r.push(nextNodePath);
    
    }    

    return r;
}


export async function toHTMLLines(root: Page, xpath : string, indent : string): Promise<string[]> {
    const nodeCandidates = await root.locator(`xpath=${xpath}`); 
    const nodeCandidatesCount = await nodeCandidates.count(); 

    if(nodeCandidatesCount == 0){
        throw new Error(`XPATH Not Found: ${xpath}`);
    }

    const node = await nodeCandidates.nth(0);
    const attributes = await getAllAttributes(node);

    const attributeLine = attributes.map((v) => sanityze(v)).join(" ")
    const nodeCapitalName = (await node.evaluate(el => el.nodeName));

    const nodeName = HTMLCaptialNodeToProperName(nodeCapitalName);

    const r : string[] = new Array();

    const childrenXPathCodes = await getXPathCodeOfChildren(root, xpath);
    let nodeInfo = "";
    if(attributes.length == 0){
        nodeInfo = `${nodeName}`;
    }else{
        nodeInfo = `${nodeName} ${attributeLine}`;
    }

    if(childrenXPathCodes.length >= 1){
        r.push(`${indent}<${nodeInfo}>`)

        for (let i = 0; i < childrenXPathCodes.length; i++) {
            const nextNodePath = `${xpath}/${childrenXPathCodes[i]}`;
            const lines = await toHTMLLines(root, nextNodePath, "    " + indent)
            lines.forEach((v) =>{
                r.push(v);
            })
        }    
        r.push(`${indent}</${nodeName}>`)

    }else {
        const text : string | null = await node.textContent();
        if(text == null || text.length == 0){
            r.push(`${indent}<${nodeInfo}/>`)
        }else{
            r.push(`${indent}<${nodeInfo}>${text}</${nodeName}>`)
        }
    }

    return r;
}


/*
export async function getChildren(node : Locator) : void  {
    const children = await node.locator("xpath=//")
    children.
    return children;
}
*/


export async function getVisibleHTML(page: Page, browserName: BrowserNameType): Promise<string> {

    const lines = await convertFromPageToLines(page, "/html/body");
    const svgPart = lines.join("\n");

    //const bodyInnerHTML = await page.innerHTML('xpath=//body');
    //const bodyLocator = await page.locator('xpath=//body');




    const output_html = `<!DOCTYPE html>
<html>
        
<head>
    <meta charset="utf-8" />
    <title>Test ${browserName}</title>
</head>
<body>
${svgPart}
</body>
</html>`
    return output_html;
}

export async function saveOutputHTMLAndPNG(page: Page, browserName: BrowserNameType, htmlPath: string, pngPath: string, overwrite: boolean): Promise<void> {
    const outputHTML = await getVisibleHTML(page, browserName);

    const b1 = !overwrite && fs.existsSync(htmlPath);

    if (!b1) {
        await fs.writeFile(htmlPath, outputHTML, (err) => {
            if (err) throw err;
            console.log(`Saved: ${htmlPath}`);
        });
    }

    const b2 = !overwrite && fs.existsSync(pngPath);

    if (!b2) {
        await page.screenshot({ path: pngPath })
        console.log(`Saved: ${pngPath}`);
    }


}
