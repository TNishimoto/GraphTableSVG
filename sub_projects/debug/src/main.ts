import { getFiles, createDirectories, tryCreateSaveFolders, BrowserHTMLTestInfo, outputLog } from "./file_manager"
import { processBrowserHTMLTestSequences, divideBrowserHTMLTestSequence } from "./playwright_test"
import { diffTestAll } from "./html_test";
const fs = require("fs");


async function ptest(files: BrowserHTMLTestInfo[]) {

  const browserHTMLTestSequences: BrowserHTMLTestInfo[][] = divideBrowserHTMLTestSequence(files);

  const results = processBrowserHTMLTestSequences(browserHTMLTestSequences);
  results.then((v) => {
    console.log("END");

    let detailLog = "";
    diffTestAll(files).then((w) => {
      const resultLog = w.map((x) => {
        x.getTestResult();
      })
      const resultLogStr = resultLog.join("\n");
      console.log(resultLogStr)

      w.forEach((x) => {
        if (!(x.arr.every((v) => v.success))) {
          detailLog += x.fileID + "\n";
          detailLog += x.getDetailMessages() + "\n";
        }
      })
      console.log(detailLog);
      const outputTxt = resultLog + "\n" + detailLog;
      outputLog(outputTxt);
    })
  })
}



//console.log(__filename)

tryCreateSaveFolders();

if (process.argv.length == 4) {

  const relativePath = process.argv[2];
  const fileName = process.argv[3];
  //const files = getFiles("");
  //files.forEach((v) => createDirectories({dirPath : v.dirPath, fileName : v.filename}));

  const firefox = new BrowserHTMLTestInfo(relativePath, fileName, "firefox");
  const chromium = new BrowserHTMLTestInfo(relativePath, fileName, "chromium");
  const edge = new BrowserHTMLTestInfo(relativePath, fileName, "edge");
  ptest([firefox, chromium, edge]);



} else {
  const files = getFiles("");
  //files.forEach((v) => createDirectories({dirPath : v.dirPath, fileName : v.filename}));

  const b = true;
  if (b) {
    ptest(files)
  } else {
    diffTestAll(files).then((w) => {
      w.forEach((x) => {
        console.log(x.getTestResult());
      })
    })

  }




}




