import { webkit, firefox, chromium,  ElementHandle, Locator} from 'playwright'
import * as fs from 'fs';

const pathPrefix = 'file:///D:/github/GraphTableSVG/docs/examples';

type BrowserNameType = 'webkit' | 'firefox' | 'chromium';

async function outerHtml(elem: Locator) {
  if(!elem) {
      return undefined;
  }

  //@ts-ignore
  return await elem.evaluate(elem => elem.outerHTML);
}

function test(browserName : BrowserNameType){
  (async () => {
    let browser = null;
    if(browserName == 'webkit'){
      browser = await webkit.launch()  
    }else if(browserName == 'firefox'){
      browser = await firefox.launch()  

    }else if(browserName == 'chromium'){
      browser = await chromium.launch()  
    }

    if(browser != null){
      const page = await browser.newPage()
      await page.goto(`${pathPrefix}/text/hello_world.html`)      
      await page.waitForTimeout(1000);

      while(true){
        const arrayOfUnstableObjects = page.locator('xpath=//*[name()="g" and @data-unstable-counter]')
        const counter = await arrayOfUnstableObjects.count();
        console.log(`counter: ${counter}`)
        if(counter == 0){
          break;
        }else{
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

      fs.writeFile(`./output/text/hello_world/hello_world_${browserName}.html`, output_html, (err) => {
        if (err) throw err;
        console.log('正常に書き込みが完了しました');
      });
    
      await page.screenshot({ path: `./output/text/hello_world/screenshot_${browserName}.png` })
    
      await browser.close()
  
    }


  })()
  
}

test("firefox");
test("chromium");
//test("webkit");



