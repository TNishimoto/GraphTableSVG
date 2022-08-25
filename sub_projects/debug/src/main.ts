import { webkit, firefox, chromium, ElementHandle, Locator } from 'playwright'
import * as fs from 'fs';
import * as path from 'path';

//import * as libxmljs from 'libxmljs';
import { diffXML, DiffXMLResult } from './diff_xml';

const exampleRelativeDirPath = 'docs/_debug_examples';
const outputRelativeDirPath = 'sub_projects/debug/output';
const correctOutputRelativeDirPath = 'sub_projects/debug/correct_output';

type BrowserNameType = 'webkit' | 'firefox' | 'chromium' | 'edge';
type ErrorType = 'TextMismatch' | 'TimeoutError' | 'UnexpectedError';


function createDirectoryIfNotExist(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, (err) => {
      if (err) { throw err; }
      console.log(`Created folder: ${dirPath}`);
    });
  }

}
function rightPadding(text : string, maxLen : number){
  let s = text;
  while(s.length < maxLen){
    s+= " ";
  }
  return s;
}

function getAbsoluteDirectoryPath(relativeDirPath: string): string {
  const name = "GraphTableSVG";
  const p = __filename.indexOf(name);
  const baseDirPath = __filename.substring(0, p + name.length);
  if (relativeDirPath == "") {
    return `${baseDirPath}`
  } else {
    return `${baseDirPath}/${relativeDirPath}`
  }
}
function concatenatePaths(relativeDirPath1: string, relativeDirPath2: string): string {
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



class TestResult {
  public filename: string = "";
  public browserName: BrowserNameType = "firefox";
  public message: string = "";
  public success: boolean | null = null;
  public diffXMLResult: DiffXMLResult | null = null;

  public errorType : ErrorType | null = null;
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
      const type : string = v.errorType == null ? "null" : v.errorType;
      const msg = v.success ? `\x1b[42mOK\x1b[49m` : `\x1b[41m${rightPadding(type, 13)}\x1b[49m`;
      s += `${v.browserName}: ${msg}\t`;
    })
    s += " }";
    return s;
  }

  public getDetailMessages(): string | null {
    let s = `${rightPadding(this.filename, 40)} \n Browsers = { `;
    const b = this.arr.every((v) => v.success)
    if(b){
      return null;
    }else{
      this.arr.forEach((v) => {
        const type : string = v.errorType == null ? "null" : v.errorType;
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
      await page.waitForTimeout(1000);



      while (timeoutCounter < 10) {

        const arrayOfUnstableObjects = page.locator('xpath=//*[name()="g" and @data-unstable-counter]')
        const counter = await arrayOfUnstableObjects.count();
        //console.log(`counter: ${counter}`)
        if (counter == 0) {
          break;
        } else {
          await page.waitForTimeout(1000);
          timeoutCounter++;
        }
      }

      if (timeoutCounter < 10) {



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

        fs.writeFile(outputHTMLPath, output_html, (err) => {
          if (err) throw err;
          console.log(`Wrote: ${outputHTMLPath}`);
        });


        await page.screenshot({ path: outputPNGPath })
        console.log(`Wrote: ${outputPNGPath}`);


        if (fs.existsSync(correctHTMLPath)) {
          const correctHTML = fs.readFileSync(correctHTMLPath, 'utf-8');
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
        } else {
          fs.writeFile(correctHTMLPath, output_html, (err) => {
            if (err) throw err;
            console.log(`Wrote as the correct HTML: ${correctHTMLPath}`);
          });
          await page.screenshot({ path: correctPNGPath })
          console.log(`Wrote as the correct PNG: ${correctPNGPath}`);

        }


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
  result.then((v) =>{
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
  result.then((v) =>{
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



