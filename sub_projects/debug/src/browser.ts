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

export async function getVisibleHTML(page: Page, browserName: BrowserNameType): Promise<string> {
    const bodyInnerHTML = await page.innerHTML('xpath=//body');
    const output_html = `<!DOCTYPE html>
        <html>
        
        <head>
            <meta charset="utf-8" />
            <title>Test ${browserName}</title>
        </head>
        <body>
        ${bodyInnerHTML}
        </body>
        `
    return bodyInnerHTML;
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
