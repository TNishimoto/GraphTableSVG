import { webkit, firefox, chromium, ElementHandle, Locator } from 'playwright'
import * as fs from 'fs';
import * as path from 'path';

const pathPrefix = 'D:/github/GraphTableSVG/docs/_debug_examples';
//const urlPathPrefix = 'file:///D:/github/GraphTableSVG/docs/_debug_examples';

const outputPathPrefix = './output';
const correctOutputPathPrefix = './correct_output';

type BrowserNameType = 'webkit' | 'firefox' | 'chromium';


function test(browserName: BrowserNameType, relativeDirPath: string | null, fileName: string) {
  const debugDirPath = relativeDirPath == null ? pathPrefix : pathPrefix + "/" + relativeDirPath;
  const outputDirPath = relativeDirPath == null ? outputPathPrefix : outputPathPrefix + "/" + relativeDirPath;
  const correctOutputDirPath = relativeDirPath == null ? correctOutputPathPrefix : correctOutputPathPrefix + "/" + relativeDirPath;

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
      await page.goto(`file:///${debugDirPath}/${fileName}`)
      await page.waitForTimeout(1000);

      while (true) {
        const arrayOfUnstableObjects = page.locator('xpath=//*[name()="g" and @data-unstable-counter]')
        const counter = await arrayOfUnstableObjects.count();
        console.log(`counter: ${counter}`)
        if (counter == 0) {
          break;
        } else {
          await page.waitForTimeout(1000);
        }
      }


      /*
      const svgObj = page.locator('xpath=//*[name()="svg"]')
      const sbgObjOuterHTML = outerHtml(svgObj);
      */
      const bodyInnerHTML = await page.innerHTML('xpath=//body');


      //const dom2 = await page.innerHTML('data-test-id=main');

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

      const outputHTMLPath = `${outputDirPath}/${browserName}_${fileName}`
      fs.writeFile(outputHTMLPath, output_html, (err) => {
        if (err) throw err;
        console.log(`Wrote: ${outputHTMLPath}`);
      });

      const outputPNGPath = `${outputDirPath}/${browserName}_${fileName}.png`

      await page.screenshot({ path: outputPNGPath })
      console.log(`Wrote: ${outputPNGPath}`);

      const correctHTMLPath = `${correctOutputDirPath}/${browserName}_${fileName}`
      const correctPNGPath = `${correctOutputDirPath}/${browserName}_${fileName}.png`

      if (fs.existsSync(correctHTMLPath)) {
        const correctHTML = fs.readFileSync(correctHTMLPath, 'utf-8');
        if (correctHTML == output_html) {
          console.log(`OK: ${fileName}`)
        } else {
          console.log(`NO: ${fileName}`)

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

function checkDirectory(relativePath: string | null) {
  const dirPath = relativePath == null ? pathPrefix : pathPrefix + "/" + relativePath;
  const files = fs.readdirSync(dirPath);
  const fileList = files.filter((file) => {
    const filePath = dirPath + "/" + file;
    return fs.statSync(filePath).isFile() && /.*\.html$/.test(file);
  })
  console.log(fileList);
  fileList.forEach((v) => {
    test("firefox", relativePath, v);
    test("chromium", relativePath, v);
  })

  const dirList = files.filter((file) => {
    const subDirPath = dirPath + "/" + file;

    return fs.statSync(subDirPath).isDirectory()
  })
  dirList.forEach((v) => {
    const subDirPath = relativePath == null ? v : `${relativePath}/${v}`;
    checkDirectory(subDirPath);
  })
  console.log(dirList);
}

checkDirectory(null);

//test("webkit");



