import { getFiles, createDirectories, tryCreateSaveFolders, FilePathManager } from "./file_manager"
import { playwrightTest } from "./playwright_test"
import { diffTestAll } from "./html_test";



async function ptest(files: FilePathManager[]) {
  const results = playwrightTest(files);
  results.then((v) => {
    console.log("END");
    diffTestAll(files).then((w) => {
      w.forEach((x) => {
        console.log(x.getTestResult());
      })
      w.forEach((x) => {
        if (!(x.arr.every((v) => v.success))) {
          console.log(x.fileID);
          console.log(x.getDetailMessages())
        }
      })

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

  const firefox = new FilePathManager(relativePath, fileName, "firefox");
  const chromium = new FilePathManager(relativePath, fileName, "chromium");
  const edge = new FilePathManager(relativePath, fileName, "edge");
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




