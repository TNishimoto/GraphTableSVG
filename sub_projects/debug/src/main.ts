import { getFiles, createDirectories, tryCreateSaveFolders } from "./file_manager"
import { playwrightTest } from "./playwright_test"
import { diffTestAll } from "./html_test";







//console.log(__filename)

tryCreateSaveFolders();

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

  const b = true;
  if(b){
    const results = playwrightTest(files);
    results.then((v) =>{
      console.log("END");
      diffTestAll(files).then((w) =>{
         w.forEach((x) =>{
          console.log(x.getTestResult());
         })
      })
    })  
  }else{
    diffTestAll(files).then((w) =>{
      w.forEach((x) =>{
       console.log(x.getTestResult());
      })
   })
  
  }




}




