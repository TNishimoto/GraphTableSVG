import { diffXML, DiffXMLResult } from "./diff_xml";
import { BrowserNameType, BrowserHTMLTestInfo, rightPadding } from "./file_manager"
import { ErrorType } from "./playwright_test";




export class TestResult {
    public parentDirectoryName: string = "";
    public filename: string = "";
    public browserName: BrowserNameType = "firefox";
    public success: boolean | null = null;
    public diffXMLResult: DiffXMLResult | null = null;

    public errorType: ErrorType | null = null;

    public getMessage() : string {
        if(this.diffXMLResult == null){
            return `NONE`
        }else{
            if (this.diffXMLResult.diffType == null) {
                return `NONE`;
            } else {
                return `DiffXMLError: xpath = ${this.diffXMLResult.xpath}, type=${this.diffXMLResult.diffType} \n Content1 = "${this.diffXMLResult.content1}", \n Content2 = "${this.diffXMLResult.content2}"(${this.diffXMLResult.content1==this.diffXMLResult.content2})`;
    
            }
    
        }
    }
}

export class TestResultForFile {
    public fileID: string = "";
    public arr: TestResult[] = new Array(3);

    public getTestResult(): string {
        let s = `${rightPadding(this.fileID, 40)} \t Browsers = { `;
        this.arr.forEach((v) => {
            const type: string = v.errorType == null ? "null" : v.errorType;
            const msg = v.success ? `\x1b[42mOK\x1b[49m` : `\x1b[41m${rightPadding(type, 13)}\x1b[49m`;
            s += `${v.browserName}: ${msg}\t`;
        })
        s += " }";
        return s;
    }

    public getDetailMessages(): string | null {
        let s = `${rightPadding(this.fileID, 40)} \n Browsers = { \n`;
        const b = this.arr.every((v) => v.success)
        if (b) {
            return null;
        } else {
            this.arr.forEach((v) => {
                //const type: string = v.errorType == null ? "null" : v.errorType;
                const msg = v.getMessage();

                s += `${v.browserName}:\t ${msg}\n`;
            })
            s += " }\n";
            return s;
        }
    }

}

export async function testHTML(file: BrowserHTMLTestInfo): Promise<TestResult> {
    const result = new TestResult();
    result.parentDirectoryName = file.dirPath;
    result.filename = file.filename;
    result.browserName = file.browserName;

    const outputHTML = await file.loadOutputHTML();
    if (outputHTML == null) throw new Error("Load Error");
    const correctHTML = await file.loadcorrectHTML();
    if (correctHTML == null) {
        file.saveToCorrectHTML(outputHTML);
        file.copyToCorrectPNG(file.outputPNGPath);
        return result;
    } else {
        result.diffXMLResult = diffXML(correctHTML, outputHTML);
        if (result.diffXMLResult.diffType == null) {
            console.log(`\x1b[42mOK: ${file.filename} \x1b[49m`)
            result.success = true;
        } else {
            console.log(`\x1b[41mNO: ${file.filename} \x1b[49m`)
            result.success = false;
            result.errorType = `TextMismatch`;

        }
        return result;

    }

}
export async function diffTestAll(files: BrowserHTMLTestInfo[]) : Promise<TestResultForFile[]> {
    const dic : Map<string, TestResultForFile> = new Map();
    files.forEach((v) =>{
        if(!dic.has(`${v.dirPath}/${v.filename}`)){
            const p = new TestResultForFile();
            p.fileID = `${v.dirPath}/${v.filename}`;
            dic.set(`${v.dirPath}/${v.filename}`, p);
        }
    })

    const results : TestResult[] = await Promise.all( files.map((v) =>{
        return testHTML(v);
    }) )
    results.forEach((v) =>{
        const p = dic.get(`${v.parentDirectoryName}/${v.filename}`)!
        if(v.browserName == "firefox"){
            p.arr[0] = v;
        }else if(v.browserName == 'chromium'){
            p.arr[1] = v;
        }else{
            p.arr[2] = v;
        }

    })

    const r : TestResultForFile[] = new Array();
    dic.forEach((value, key) =>{
        r.push(value);
    })
    return r;
}