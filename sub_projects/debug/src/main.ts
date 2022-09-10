import { webkit, firefox, chromium, ElementHandle, Locator, Page, Browser } from 'playwright'

import * as path from 'path';
import { BrowserNameType, rightPadding, getFiles,createDirectoryIfNotExist, createDirectories,FilePathManager, getAbusoluteOutputHTMLFolderPath, getAbusoluteOutputScreenShotFolderPath } from "./file_manager"

import { ErrorType, BroswerExecutionResult } from "./playwright_test"

//import * as libxmljs from 'libxmljs';
import { diffXML, DiffXMLResult } from './diff_xml';


class TestResult {
  public filename: string = "";
  public browserName: BrowserNameType = "firefox";
  public message: string = "";
  public success: boolean | null = null;
  public diffXMLResult: DiffXMLResult | null = null;

  public errorType: ErrorType | null = null;
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
        //const type: string = v.errorType == null ? "null" : v.errorType;
        const msg = v.message;

        s += `${v.browserName}: ${msg}\n`;
      })
      s += " }\n";
      return s;
    }
  }

}
/*
class FilePathManager{
  info : DirectoryInfo;
  constructor(_info : DirectoryInfo){
    this.info = _info;
  }
}
*/





/*
async function test(browserName: BrowserNameType, currentRelativeDirPath: string, fileName: string, printMessage: boolean): Promise<BroswerExecutionResult> {
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

  const executionResult = BroswerExecutionResult.emulateHTML(absoluteFilePath, browserName, printMessage);
  return executionResult;

  */


  /*
  createDirectoryIfNotExist(outputDirPath);
  createDirectoryIfNotExist(correctOutputDirPath);
  createDirectoryIfNotExist(`${correctOutputDirPath}/${filenameWithoutExe}`);
  */



  /*
  const brres = async () => {



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
  */
  //let r : Promise<TestResult> | null = null;
  /*
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
  */
  /*
  if(r != null){
    return r;
  }else{
    throw new Error("Super Error");    
  }
  */

//}


/*
async function testAll(currentRelativeDirPath: string, fileName: string, printMessage: boolean): Promise<TestResultForFile> {
  const r = new TestResultForFile();
  r.filename = fileName;

  //let tr1 : TestResult | null = null;
  const result1 = await test("firefox", currentRelativeDirPath, fileName, printMessage);
  console.log(`Finished: ${result1.filename}, Browswer = ${result1.browserName}`)
  r.arr.push(result1);

  const result2 = await test("chromium", currentRelativeDirPath, fileName, printMessage);
  console.log(`Finished: ${result2.filename}, Browswer = ${result2.browserName}`)
  const result3 = await test("edge", currentRelativeDirPath, fileName, printMessage);
  console.log(`Finished: ${result3.filename}, Browswer = ${result3.browserName}`)
  r.arr.push(result2);
  r.arr.push(result3);
  return r;
}
*/



async function processor2(items : FilePathManager[]){
  const results = await Promise.all(items.map(async (w) =>{
    const dummy = BroswerExecutionResult.emulateHTML(w.absoluteFilePath, w.browserName, false, w.outputHTMLPath, w.outputPNGPath);
    dummy.then((x) =>{
     console.log(`${w.absoluteFilePath}: ${x.success}`)  
    })
    return dummy;  
  }))
  return results;

}

async function processor(items : FilePathManager[]){
  const r2 : FilePathManager[][] = new Array();
  r2.push(new Array(0));
  items.forEach((v) =>{
    const p = r2.length-1;
    if(r2[p].length < 8){
      r2[p].push(v);
    }else{
      r2.push(new Array(0));
      r2[p+1].push(v);
    }
  })

  const xxx : BroswerExecutionResult[] = new Array();

  for(let i=0;i<r2.length;i++){
    console.log(`Process: ${i}`)
    const result = await processor2(r2[i]);
    result.forEach((v) =>{
      xxx.push(v);
    })
  }
  return xxx;
}



//console.log(__filename)


createDirectoryIfNotExist(getAbusoluteOutputHTMLFolderPath());
createDirectoryIfNotExist(getAbusoluteOutputScreenShotFolderPath());

if (process.argv.length == 4) {

  const relativePath = process.argv[2];
  const fileName = process.argv[3];
  const files = getFiles("");
  files.forEach((v) => createDirectories({dirPath : v.dirPath, fileName : v.filename}));

  /*
  const result = testAll(relativePath, fileName, true);
  result.then((v) => {
    const s = v.getTestResult();

    console.log(s);
    console.log(v.getDetailMessages());
  })
  */

} else {
  const files = getFiles("");
  //files.forEach((v) => createDirectories({dirPath : v.dirPath, fileName : v.filename}));

  const results = processor(files);
  results.then((v) =>{
    console.log("END");
  })

  //result.then((v) => {
    /*
    const s1 = v.map((w) => {
      return w.getTestResult();
    }).join("\n")

    const s2 = v.map((w) => {
      return w.getDetailMessages();
    }).filter((w) => w != null).join("\n")

    console.log(s1);
    console.log(s2);
    */

  //})
  


  //files.forEach((v) => console.log(v.dirPath + "   " + v.fileName))
  /*
  const result = Promise.all(files.map(async (v) => {
    const dummy = await testAll(v.dirPath, v.fileName, false);
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
  */


}

/*
for(var i = 0;i < process.argv.length; i++){
  console.log("argv[" + i + "] = " + process.argv[i]);
}
*/



//test("webkit");



