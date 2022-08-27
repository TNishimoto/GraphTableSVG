import { webkit, firefox, chromium, ElementHandle, Locator, Page } from 'playwright'
import * as fs from 'fs';
import * as path from 'path';

import {BrowserNameType, ErrorType, rightPadding, concatenatePaths, getAbsoluteDirectoryPath, outerHtml, getVisibleHTML, saveOutputHTMLAndPNG, createDirectoryIfNotExist} from "./browser"

//import * as libxmljs from 'libxmljs';
import { diffXML, DiffXMLResult } from './diff_xml';

const exampleRelativeDirPath = 'docs/_debug_examples';
const outputRelativeDirPath = 'sub_projects/debug/output';
const correctOutputRelativeDirPath = 'sub_projects/debug/correct_output';



class TestResult {
  public filename: string = "";
  public browserName: BrowserNameType = "firefox";
  public message: string = "";
  public success: boolean | null = null;
  public diffXMLResult: DiffXMLResult | null = null;

  public errorType: ErrorType | null = null;
  /*
  public constructor(_filename: string, _browserName: BrowserNameType, _message: string, _success: boolean | null, _errorType : ErrorType) {
    
    this.filename = _filename;
    this.browserName = _browserName;
    this.message = _message;
    this.success = _success;
    this.errorType = _errorType;
    
  }
  */
}

class TestResultForFile {
  public filename: string = "";
  public arr: TestResult[] = new Array();

  public getTestResult(): string {
    let s = `${rightPadding(this.filename, 40)} \t Browsers = { `;
    this.arr.forEach((v) => {
      const type: string = v.errorType == null ? "null" : v.errorType;
      const msg = v.success ? `\x1b[42mOK\x1b[49m` : `\x1b[41m${rightPadding(type, 13)}\x1b[49m`;
      s += `${v.browserName}: ${msg}\t`;
    })
    s += " }";
    return s;
  }

  public getDetailMessages(): string | null {
    let s = `${rightPadding(this.filename, 40)} \n Browsers = { `;
    const b = this.arr.every((v) => v.success)
    if (b) {
      return null;
    } else {
      this.arr.forEach((v) => {
        const type: string = v.errorType == null ? "null" : v.errorType;
        const msg = v.message;
        s += `${v.browserName}: ${msg}\n`;
      })
      s += " }\n";
      return s;
    }
  }

}




async function test(browserName: BrowserNameType, currentRelativeDirPath: string, fileName: string): Promise<TestResult> {
  console.log(`Processing...: ${fileName}, browser: ${browserName}`)
  const exe = path.extname(fileName)
  const filenameWithoutExe = fileName.substring(0, fileName.length - exe.length);

  const exampleDirPath = concatenatePaths(getAbsoluteDirectoryPath(exampleRelativeDirPath), currentRelativeDirPath);
  const outputDirPath = concatenatePaths(getAbsoluteDirectoryPath(outputRelativeDirPath), currentRelativeDirPath);
  const correctOutputDirPath = concatenatePaths(getAbsoluteDirectoryPath(correctOutputRelativeDirPath), currentRelativeDirPath);
  const absoluteFilePath = concatenatePaths(exampleDirPath, fileName);
  const outputHTMLPath = concatenatePaths(`${outputDirPath}/${filenameWithoutExe}`, `${browserName}_${fileName}`)
  const outputPNGPath = concatenatePaths(`${outputDirPath}/${filenameWithoutExe}`, `${browserName}_${fileName}.png`)


  const correctHTMLPath = concatenatePaths(`${correctOutputDirPath}/${filenameWithoutExe}`, `${filenameWithoutExe}_${browserName}.html`)
  const correctPNGPath = concatenatePaths(`${correctOutputDirPath}/${filenameWithoutExe}`, `${filenameWithoutExe}_${browserName}.png`)

  /*
  createDirectoryIfNotExist(outputDirPath);
  createDirectoryIfNotExist(correctOutputDirPath);
  createDirectoryIfNotExist(`${correctOutputDirPath}/${filenameWithoutExe}`);
  */


  const brres = async () => {
    let result = new TestResult();
    result.filename = fileName;
    result.browserName = browserName;


    //let success: boolean | null = null;
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
      await page.goto(`file:///${absoluteFilePath}`)
      await page.on('console', msg => console.log(`\u001b[33m ${msg.text()} \u001b[0m`))
      // Listen for all console events and handle errors
      await page.on('console', msg => {
        if (msg.type() === 'error')
          console.log(`\u001b[31m Error text: "${msg.text()}" \u001b[0m`);
      });


      await page.waitForTimeout(1000);

      while (timeoutCounter < 10) {

        const arrayOfUnstableObjects = page.locator('xpath=//*[name()="g" and @data-unstable-counter]')
        const counter = await arrayOfUnstableObjects.count();
        //console.log(`counter: ${counter}`)
        if (counter == 0) {
          break;
        } else {
          //const fst = await arrayOfUnstableObjects.first();
          //const html = await outerHtml(fst);
          //console.log(html);

          await page.waitForTimeout(1000);
          timeoutCounter++;
        }
      }

      await saveOutputHTMLAndPNG(page, browserName, outputHTMLPath, outputPNGPath, true);


      if (timeoutCounter < 10) {



        const output_html = await getVisibleHTML(page, browserName);

        if (fs.existsSync(correctHTMLPath)) {
          const correctHTML = await fs.readFileSync(correctHTMLPath, 'utf-8');
          result.diffXMLResult = diffXML(correctHTML, output_html);
          if (result.diffXMLResult.diffType == null) {
            console.log(`\x1b[42mOK: ${fileName} \x1b[49m`)
            result.success = true;
          } else {
            console.log(`\x1b[41mNO: ${fileName} \x1b[49m`)
            result.success = false;
            result.message = `DiffXMLError: xpath = ${result.diffXMLResult.xpath}, type=${result.diffXMLResult.diffType}`
            result.errorType = `TextMismatch`;

          }
        }
        await saveOutputHTMLAndPNG(page, browserName, correctHTMLPath, correctPNGPath, false);


      } else {
        console.log(`\x1b[41mFailed (Timeout): ${fileName}, ${browserName} \x1b[49m`)
        result.errorType = "TimeoutError";
        result.success = false;

      }
      await browser.close()

      return result;


    } else {
      throw new Error("No name Browser");
    }


  }
  //let r : Promise<TestResult> | null = null;
  try {
    return brres();
  } catch {

    let result = new TestResult();
    result.filename = fileName;
    result.browserName = browserName;
    result.success = false;
    result.errorType = 'UnexpectedError';

    return result;
  }
  /*
  if(r != null){
    return r;
  }else{
    throw new Error("Super Error");    
  }
  */

}

async function testAll(currentRelativeDirPath: string, fileName: string): Promise<TestResultForFile> {
  const r = new TestResultForFile();
  r.filename = fileName;

  //let tr1 : TestResult | null = null;
  const result1 = await test("firefox", currentRelativeDirPath, fileName);
  console.log(`Finished: ${result1.filename}, Browswer = ${result1.browserName}`)
  r.arr.push(result1);

  const result2 = await test("chromium", currentRelativeDirPath, fileName);
  console.log(`Finished: ${result2.filename}, Browswer = ${result2.browserName}`)
  const result3 = await test("edge", currentRelativeDirPath, fileName);
  console.log(`Finished: ${result3.filename}, Browswer = ${result3.browserName}`)
  r.arr.push(result2);
  r.arr.push(result3);
  return r;

}

type DirectoryInfo = { dirPath: string, fileName: string };

function createDirectories(info: DirectoryInfo) {
  const currentRelativeDirPath = info.dirPath;
  const fileName = info.fileName;
  const outputDirPath = concatenatePaths(getAbsoluteDirectoryPath(outputRelativeDirPath), currentRelativeDirPath);
  const correctOutputDirPath = concatenatePaths(getAbsoluteDirectoryPath(correctOutputRelativeDirPath), currentRelativeDirPath);
  const exe = path.extname(fileName)
  const filenameWithoutExe = fileName.substring(0, fileName.length - exe.length);


  createDirectoryIfNotExist(outputDirPath);
  createDirectoryIfNotExist(`${outputDirPath}/${filenameWithoutExe}`);

  createDirectoryIfNotExist(correctOutputDirPath);
  createDirectoryIfNotExist(`${correctOutputDirPath}/${filenameWithoutExe}`);

}

function getFiles(currentRelativePath: string): DirectoryInfo[] {
  const r: DirectoryInfo[] = new Array();
  const fPath = concatenatePaths(exampleRelativeDirPath, currentRelativePath);
  const exampleCurrentAbsolutePath = getAbsoluteDirectoryPath(fPath);
  const files = fs.readdirSync(exampleCurrentAbsolutePath);
  const fileList = files.filter((file) => {
    const filePath = exampleCurrentAbsolutePath + "/" + file;
    return fs.statSync(filePath).isFile() && /.*\.html$/.test(file);
  })
  for (const vFileName of fileList) {
    r.push({ dirPath: currentRelativePath, fileName: vFileName });
  }


  const dirList = files.filter((file) => {
    const subDirPath = exampleCurrentAbsolutePath + "/" + file;

    return fs.statSync(subDirPath).isDirectory()
  })
  for (const vDirName of dirList) {
    const subDirPath = concatenatePaths(currentRelativePath, vDirName);
    const resultArr = getFiles(subDirPath);
    resultArr.forEach((v) => {
      r.push(v);
    })

  }
  return r;
}





//console.log(__filename)

if (process.argv.length == 4) {

  const relativePath = process.argv[2];
  const fileName = process.argv[3];
  const result = testAll(relativePath, fileName);
  result.then((v) => {
    const s = v.getTestResult();
    console.log(s);
  })

} else {
  const files = getFiles("");
  files.forEach((v) => createDirectories(v));
  const result = Promise.all(files.map(async (v) => {
    const dummy = await testAll(v.dirPath, v.fileName);
    return dummy;
  }));
  result.then((v) => {
    const s1 = v.map((w) => {
      return w.getTestResult();
    }).join("\n")

    const s2 = v.map((w) => {
      return w.getDetailMessages();
    }).filter((w) => w != null).join("\n")

    console.log(s1);
    console.log(s2);

  })


}

/*
for(var i = 0;i < process.argv.length; i++){
  console.log("argv[" + i + "] = " + process.argv[i]);
}
*/



//test("webkit");



