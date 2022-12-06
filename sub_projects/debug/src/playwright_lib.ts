import { webkit, firefox, chromium, ElementHandle, Locator, Page } from 'playwright'
import { BrowserNameType, BrowserHTMLPair } from "./file_manager"
import { normalize } from "./diff_xml"

import * as fs from 'fs';

export type ErrorType = 'TextMismatch' | 'TimeoutError' | 'UnexpectedError';
function isSpecialNode(nodeName: string): boolean {
    const dic: Set<string> = new Set();
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
    dic.add("foreignObject")

    return dic.has(nodeName);
}
function HTMLCaptialNodeToProperName(nodeName: string): string {
    const p = nodeName.toLowerCase();
    if (p == "textpath") {
        return "textPath";
    } else if (p == "foreignobject") {
        return "foreignObject";
    }
    else {
        return p;
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
function sanityze(attribute: NodeAttribute): string {
    if (attribute.value != null) {
        const p1 = attribute.value.indexOf(`"`) == -1;
        const p2 = attribute.value.indexOf(`'`) == -1;

        if (p1) {
            return `${attribute.name}="${attribute.value}"`;
        } else if (p2) {
            return `${attribute.name}='${attribute.value}'`;
        } else {
            const sanitizedValue = attribute.value.replace(/'/g, "&#39;")
            return `${attribute.name}='${sanitizedValue}'`;
        }
    } else {
        return "";
    }

}

export async function getAllAttributes(page: Locator): Promise<NodeAttribute[]> {
    const el_attrs = await page.evaluate(el => el.getAttributeNames())

    const r: NodeAttribute[] = new Array();
    for (let i = 0; i < el_attrs.length; i++) {
        const name = el_attrs[i];
        const value = await page.getAttribute(name);
        r.push({ name: name, value: value })

    }
    return r;
}


export async function convertFromPageToLines(root: Page, xpath: string | null): Promise<string[]> {

    const r: string[] = new Array();

    const childrenXPathCodes = await getXPathCodeOfChildren(root, xpath);
    for (let i = 0; i < childrenXPathCodes.length; i++) {
        const nextNodePath = xpath == null ? `/${childrenXPathCodes[i]}` : `${xpath}/${childrenXPathCodes[i]}`;
        const lines = await toHTMLLines(root, nextNodePath, "")
        lines.forEach((v) => {
            r.push(v);
        })
    }

    return r;
}
export async function getXPathCodeOfChildren(root: Page, xpath: string | null): Promise<string[]> {
    const nodes = await root.locator(`xpath=${xpath == null ? "" : xpath}/*`);
    const count = await nodes.count();

    const dic: Map<string, number> = new Map();
    const r: string[] = new Array(0);

    for (let i = 0; i < count; i++) {
        const upperName = await nodes.nth(i).evaluate(el => el.nodeName);

        const name = HTMLCaptialNodeToProperName(upperName);
        if (!dic.has(name)) {
            dic.set(name, 1);
        } else {
            dic.set(name, dic.get(name)! + 1);
        }
        const nextNodeCount = dic.get(name)!;
        let nextNodePath = "";
        if (isSpecialNode(name)) {
            nextNodePath = `*[name()="${name}"][${nextNodeCount}]`
        } else {
            nextNodePath = `${name}[${nextNodeCount}]`;

        }
        r.push(nextNodePath);

    }

    return r;
}


export async function toHTMLLines(root: Page, xpath: string, indent: string): Promise<string[]> {
    const nodeCandidates = await root.locator(`xpath=${xpath}`);
    const nodeCandidatesCount = await nodeCandidates.count();

    if (nodeCandidatesCount == 0) {
        throw new Error(`XPATH Not Found: ${xpath}`);
    }

    const node = await nodeCandidates.nth(0);
    const attributes = await getAllAttributes(node);
    attributes.sort((a, b) => (a.name < b.name) ? -1 : 1)

    const attributeLine = attributes.map((v) => sanityze(v)).join(" ")
    const nodeCapitalName = (await node.evaluate(el => el.nodeName));

    const nodeName = HTMLCaptialNodeToProperName(nodeCapitalName);

    const r: string[] = new Array();

    const childrenXPathCodes = await getXPathCodeOfChildren(root, xpath);
    let nodeInfo = "";
    if (attributes.length == 0) {
        nodeInfo = `${nodeName}`;
    } else {
        nodeInfo = `${nodeName} ${attributeLine}`;
    }

    if (childrenXPathCodes.length >= 1) {
        r.push(`${indent}<${nodeInfo}>`)

        for (let i = 0; i < childrenXPathCodes.length; i++) {
            const nextNodePath = `${xpath}/${childrenXPathCodes[i]}`;

            const lines = await toHTMLLines(root, nextNodePath, "    " + indent)
            lines.forEach((v) => {
                r.push(v);
            })
        }
        r.push(`${indent}</${nodeName}>`)

    } else {
        const text: string | null = await node.textContent();
        if (text == null || text.length == 0) {
            r.push(`${indent}<${nodeInfo}/>`)
        } else {
            r.push(`${indent}<${nodeInfo}>${text}</${nodeName}>`)
        }
    }

    return r;
}



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

export async function saveOutputHTMLAndPNG(page: Page, browserName: BrowserNameType, htmlPath: string, pngPath: string, normalizedHTMLPath : string, overwrite: boolean): Promise<void> {
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

    const b3 = !overwrite && fs.existsSync(normalizedHTMLPath);
    if(!b3){
        const lines = normalize(outputHTML);
        const normalizedHTML = lines.join("\n");
        await fs.writeFile(normalizedHTMLPath, normalizedHTML, (err) => {
            if (err) throw err;
            console.log(`Saved: ${normalizedHTMLPath}`);
        });

    }


}

export class BrowserExecutionResult {
    success: boolean = false;
    errorType: ErrorType | null = null
    browserName: BrowserNameType = "firefox";
    constructor() {
    }



    static async emulateHTML(filepath: string, browserName: BrowserNameType, printMessage: boolean, outputHTMLPath: string, outputPNGPath: string, outputNormalizedHTMLPath: string): Promise<BrowserExecutionResult> {
        console.log(`Processing...: ${filepath}, browser: ${browserName}`)

        let browser = null;
        if (browserName == 'webkit') {
            browser = await webkit.launch()
        } else if (browserName == 'firefox') {
            browser = await firefox.launch()

        } else if (browserName == 'chromium') {
            browser = await chromium.launch()
        } else if (browserName == 'edge') {
            browser = await chromium.launch({
                channel: 'msedge',
            });

        }
        let timeoutCounter = 0;

        if (browser != null) {
            const page = await browser.newPage()
            await page.goto(`file:///${filepath}`)
            if (printMessage) {
                await page.on('console', msg => console.log(`\u001b[33m ${msg.text()} \u001b[0m`))
                // Listen for all console events and handle errors
                await page.on('console', msg => {
                    if (msg.type() === 'error')
                        console.log(`\u001b[31m Error text: "${msg.text()}" \u001b[0m`);
                });
            }


            await page.waitForTimeout(1000);

            while (timeoutCounter < 10) {

                const arrayOfUnstableObjects = page.locator('xpath=//*[name()="g" and @data-stable-flag="false"]')
                const counter = await arrayOfUnstableObjects.count();
                if (counter == 0) {
                    break;
                } else {
                    await page.waitForTimeout(1000);
                    timeoutCounter++;
                }
            }
            const r = new BrowserExecutionResult();

            if (timeoutCounter >= 10) {
                r.success = false;
                r.errorType = "TimeoutError";
                console.log(`\x1b[41mFailed (Timeout): ${filepath}, ${browserName} \x1b[49m`)
            } else {
                r.success = true;
            }
            await saveOutputHTMLAndPNG(page, browserName, outputHTMLPath, outputPNGPath, outputNormalizedHTMLPath, true);
            browser.close();

            return r;
        } else {
            throw new Error("Error");
        }

    }

}
async function executeBrowserHTMLPairSequence(items: BrowserHTMLPair[]) : Promise<BrowserExecutionResult[]> {
    const results = await Promise.all(items.map(async (w) => {
        const dummy = BrowserExecutionResult.emulateHTML(w.absoluteFilePath, w.browserName, false, w.outputHTMLPath, w.outputPNGPath, w.outputNormalizedHTMLPath);
        dummy.then((x) => {
            console.log(`${w.absoluteFilePath}: ${x.success}`)
        })
        return dummy;
    }))
    return results;

}
export function divideBrowserHTMLTestSequence(items: BrowserHTMLPair[]) : BrowserHTMLPair[][]{
    const filePathManagers: BrowserHTMLPair[][] = new Array();
    filePathManagers.push(new Array(0));
    items.forEach((v) => {
        const p = filePathManagers.length - 1;
        if (filePathManagers[p].length < 8) {
            filePathManagers[p].push(v);
        } else {
            filePathManagers.push(new Array(0));
            filePathManagers[p + 1].push(v);
        }
    })
    return filePathManagers;
}

export async function executeBrowserHTMLPairSequences(items: BrowserHTMLPair[][]) {

    const browserExecutionResults: BrowserExecutionResult[] = new Array();

    for (let i = 0; i < items.length; i++) {
        console.log(`Process: ${i}`)
        const result = await executeBrowserHTMLPairSequence(items[i]);
        result.forEach((v) => {
            browserExecutionResults.push(v);
        })
    }
    return browserExecutionResults;
}

