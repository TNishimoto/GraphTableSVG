import { webkit, firefox, chromium, ElementHandle, Locator } from 'playwright'
import * as fs from 'fs';
import * as path from 'path';

const exampleRelativeDirPath = 'docs/_debug_examples';
const outputRelativeDirPath = 'sub_projects/debug/output';
const correctOutputRelativeDirPath = 'sub_projects/debug/correct_output';

type BrowserNameType = 'webkit' | 'firefox' | 'chromium';

/*
function getAbsoluteFilePath(relativeDirPath: string, fileName: string) : string {
    const name =  "GraphTableSVG";
    const p = __filename.indexOf(name);
    const baseDirPath = __filename.substring(0, p + name.length);
    if(relativeDirPath == ""){
      return `${baseDirPath}/${fileName}`
    }else{
      return `${baseDirPath}/${relativeDirPath}/${fileName}`
    }
}
*/
function getAbsoluteDirectoryPath(relativeDirPath: string) : string {
  const name =  "GraphTableSVG";
  const p = __filename.indexOf(name);
  const baseDirPath = __filename.substring(0, p + name.length);
  if(relativeDirPath == ""){
    return `${baseDirPath}`
  }else{
    return `${baseDirPath}/${relativeDirPath}`
  }
}
function concatenatePaths(relativeDirPath1: string, relativeDirPath2: string) : string {
  if(relativeDirPath1 == ""){
    return relativeDirPath2;
  }else{
    if(relativeDirPath2 == ""){
      return relativeDirPath1;
    }else{
      return `${relativeDirPath1}/${relativeDirPath2}`;
    }
  
  }
}



function test(browserName: BrowserNameType, currentRelativeDirPath: string, fileName: string) {
  const exampleDirPath = concatenatePaths(getAbsoluteDirectoryPath(exampleRelativeDirPath), currentRelativeDirPath);
  const outputDirPath = concatenatePaths(getAbsoluteDirectoryPath(outputRelativeDirPath), currentRelativeDirPath);
  const correctOutputDirPath = concatenatePaths(getAbsoluteDirectoryPath(correctOutputRelativeDirPath), currentRelativeDirPath);
  const absoluteFilePath = concatenatePaths(exampleDirPath, fileName);
  const outputHTMLPath = concatenatePaths(outputDirPath, `${browserName}_${fileName}`)
  const outputPNGPath = concatenatePaths(outputDirPath, `${browserName}_${fileName}.png`)

  const correctHTMLPath = concatenatePaths(correctOutputDirPath, `${browserName}_${fileName}`)
  const correctPNGPath = concatenatePaths(correctOutputDirPath, `${browserName}_${fileName}.png`)
  if (!fs.existsSync(outputDirPath)) {
    fs.mkdir(outputDirPath, (err) => {
      if (err) { throw err; }
      console.log(`Created folder: ${outputDirPath}`);
    });
  }

  if (!fs.existsSync(correctOutputDirPath)) {
    fs.mkdir(correctOutputDirPath, (err) => {
      if (err) { throw err; }
      console.log(`Created folder: ${correctOutputDirPath}`);
    });
  }

  (async () => {
    let browser = null;
    if (browserName == 'webkit') {
      browser = await webkit.launch()
    } else if (browserName == 'firefox') {
      browser = await firefox.launch()

    } else if (browserName == 'chromium') {
      browser = await chromium.launch()
    }

    if (browser != null) {
      const page = await browser.newPage()
      await page.goto(`file:///${absoluteFilePath}`)
      await page.waitForTimeout(1000);

      while (true) {
        const arrayOfUnstableObjects = page.locator('xpath=//*[name()="g" and @data-unstable-counter]')
        const counter = await arrayOfUnstableObjects.count();
        //console.log(`counter: ${counter}`)
        if (counter == 0) {
          break;
        } else {
          await page.waitForTimeout(1000);
        }
      }

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
        if (correctHTML == output_html) {
          console.log(`\x1b[42mOK: ${fileName} \x1b[49m`)
        } else {
          console.log(`\x1b[41mNO: ${fileName} \x1b[49m`)

        }
      } else {
        fs.writeFile(correctHTMLPath, output_html, (err) => {
          if (err) throw err;
          console.log(`Wrote as the correct HTML: ${correctHTMLPath}`);
        });
        await page.screenshot({ path: correctPNGPath })
        console.log(`Wrote as the correct PNG: ${correctPNGPath}`);

      }



      await browser.close()

    }


  })()

}

function checkDirectory(currentRelativePath: string) {
  const fPath = concatenatePaths(exampleRelativeDirPath, currentRelativePath);
  const exampleCurrentAbsolutePath = getAbsoluteDirectoryPath(fPath);
  const files = fs.readdirSync(exampleCurrentAbsolutePath);
  const fileList = files.filter((file) => {
    const filePath = exampleCurrentAbsolutePath + "/" + file;
    return fs.statSync(filePath).isFile() && /.*\.html$/.test(file);
  })
  fileList.forEach((v) => {
    test("firefox", currentRelativePath, v);
    test("chromium", currentRelativePath, v);
  })

  const dirList = files.filter((file) => {
    const subDirPath = exampleCurrentAbsolutePath + "/" + file;

    return fs.statSync(subDirPath).isDirectory()
  })
  dirList.forEach((v) => {
    const subDirPath = concatenatePaths(currentRelativePath, v);
    checkDirectory(subDirPath);
  })
}

//console.log(__filename)

checkDirectory("");

//test("webkit");



