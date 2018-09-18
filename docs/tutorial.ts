
import { SET, Macroup, MacroupLib, HTMLLib, libxmljs, TextLoader } from 'macroup';
import path = require('path');

const pack = new Macroup.MacroPackage("tutorial");

/*
function addNextSiblingCode(e : libxmljs.Element, codepaths : string[], dir : string){
    const arr : libxmljs.Element[] = codepaths.map((v)=>{
        const ext = path.extname(v);
        if(ext == ".png"){
            const img = new libxmljs.Element(e.doc(), "img", "");
            img.attr({src:v, "style":"max-width:100%" });
            //img.attr({src:v });
            
            return img;
        }else{
            return HTMLLib.createReferenceCodeTag(v, dir, e.doc());
        }
    })
    for(let i=arr.length-1;i>=0;i--){
        e.addNextSibling(arr[i]);
    }
}
*/

function createLoadCode(e: libxmljs.Element, dir: string): libxmljs.Element {
    const filePath = e.attr("path").value();
    const ext = path.extname(filePath);
    if (ext == ".png") {
        const img = new libxmljs.Element(e.doc(), "img", "");
        img.attr({ src: filePath, "style": "max-width:100%" });
        //img.attr({src:v });        
        return img;
    } else if (e.attr("id") != null) {
        const id: string = e.attr("id").value()!;
        const node = TextLoader.loadTextByID(filePath, dir, id);
        node.attr({ "ignore-format": "true" });
        return node;
        //throw Error("error");
    } else {
        return HTMLLib.createReferenceCodeTag(filePath, dir, e.doc());
    }
}


function moveChildren(oldNode: libxmljs.Element, newNode: libxmljs.Element) {
    oldNode.childNodes().forEach((v) => newNode.addChild(v));
}
function clearChildren(e: libxmljs.Element) {
    e.childNodes().forEach((v) => v.remove());
}
function parseXML(str: string): libxmljs.Element {
    const doc = libxmljs.parseXmlString(str);
    return doc.root();
}
/*
pack.midMacros.elements["p"] = (e : libxmljs.Element, info : Macroup.Setting) =>{
    MacroupLib.insertFirst(e, "　");
    //const text = e.text();
    //(<any>e).text("　" + text);
}
*/
function tempora(lines: libxmljs.Element[], e: libxmljs.Element): libxmljs.Element {
    const sectionNode = new libxmljs.Element(e.doc(), "section", undefined);
    sectionNode.attr({ "ignore-format": "true", class: "sample-commentary" });
    lines.forEach((w) => {
        sectionNode.addChild(w);
    })
    MacroupLib.insertFirst(sectionNode, "　");
    lines.splice(0, lines.length);
    return sectionNode;

}
const hrefDic: { [key: string]: string; } = {}
function setXMLText(e: libxmljs.Element, text: string) {
    const result = libxmljs.parseXml(text);
    clearChildren(e);
    e.addChild(result.root());
    //result.root().childNodes().forEach((v)=>e.addChild(v));
}
function replaceXMLText(e: libxmljs.Element, text: string) {
    const result = libxmljs.parseXml(text);
    clearChildren(e);
    e.addPrevSibling(result.root());
    e.remove();
    //e.addChild(result.root());
}
let increment = 1;
pack.preMacros.elements["incr"] = (e: Macroup.PremacroArg) => {
    e.isTagErased = true;
    e.content = `${increment++}`;
}
pack.midMacros.elements["ahref"] = (e: libxmljs.Element, info: Macroup.Setting) => {
    const name1 = e.attr("key");
    if (name1 == null) {
        const name = e.text();
        if (name in hrefDic) {
            replaceXMLText(e, `<a href="${hrefDic[name]}" target="_blank">${name}</a>`);

        } else {
            replaceXMLText(e, `<p style="color:red;font-size:24pt">${name} : No Exist Link!</p>`);

            //(<any>e).text("No Dic!");
        }
    } else {
        const url = e.attr("url");
        hrefDic[name1.value()] = url.value();
    }
}
pack.midMacros.elements["rhref"] = (e: libxmljs.Element, info: Macroup.Setting) => {
    const isMethod = e.attr("method") != null;
    const isModule = e.attr("module") != null;
    const isInterface = e.attr("interface") != null;

    const text = e.text();
    let prefix = "";
    let className = "";
    if (isModule) {
        prefix = "modules/graphtablesvg.";
    } else if (isInterface) {
        prefix = "interfaces/";
    }
    else {
        prefix = "classes/graphtablesvg.";
    }

    if (isMethod) {
        const texts = text.split(".");
        const methodName = texts[texts.length - 1].toLowerCase();
        if (texts.length == 2) {
            className = texts[0].toLowerCase();
            replaceXMLText(e, `<a href="./typedoc/${prefix}${className}.html#${methodName}" target="_blank">${text}</a>`);
        } else if (texts.length == 1) {
            replaceXMLText(e, `<a href="./typedoc/modules/graphtablesvg.html#${methodName}" target="_blank">${text}</a>`);
        }
    } else {
        className = text.toLowerCase();

        replaceXMLText(e, `<a href="./typedoc/${prefix}${className}.html" target="_blank">${text}</a>`);
    }

}

pack.midMacros.elements["xarticle"] = (e: libxmljs.Element, info: Macroup.Setting) => {
    e.attr({ after: "article" });
    e.attr({ class: "sample-article" })

    const dir = path.dirname(info.inputPath);
    const nodes = e.childNodes();
    const newNodes: libxmljs.Element[] = [];
    const title = new libxmljs.Element(e.doc(), "h2", e.attr("title")!.value());
    newNodes.push(title);

    const tmp: libxmljs.Element[] = [];
    nodes.forEach((v) => {
        if (v.name() == "comment") {
            if (tmp.length > 0) newNodes.push(tempora(tmp, e));
            MacroupLib.insertFirst(v, "　");
            const sectionNode = new libxmljs.Element(e.doc(), "section", undefined);
            sectionNode.attr({ "ignore-format": "true", class: "sample-commentary" });
            moveChildren(v, sectionNode);
            newNodes.push(sectionNode);
        } else if (v.name() == "load") {
            if (tmp.length > 0) newNodes.push(tempora(tmp, e));
            newNodes.push(createLoadCode(v, dir));
            const br = new libxmljs.Element(info.document, "br");
            newNodes.push(br);
        }
        else if (v.name() == "dbr") {
            //if(title.text() == "はじめに")console.log(v.text());

            if (tmp.length > 0) newNodes.push(tempora(tmp, e));
        }
        else {
            if (v.text() != "\n") {
                tmp.push(v);
            }
        }
    })
    if (tmp.length > 0) newNodes.push(tempora(tmp, e));

    clearChildren(e);
    newNodes.forEach((v) => {
        e.addChild(v)
    });
}

pack.midMacros.elements["table_of_contents"] = (e: libxmljs.Element, info: Macroup.Setting) => {
    e.attr({ after: "div" });

    const title = new libxmljs.Element(e.doc(), "h2", "目次");
    e.addChild(title);

    const xarticleNodes = e.doc().find("//xarticle");

    const listNode = new libxmljs.Element(e.doc(), "ol", undefined);
    let idCounter = 0;
    xarticleNodes.forEach((v) => {
        const titleName = v.attr("title").value();
        const idValue = `xarticle-${idCounter++}`;
        v.attr({ id: idValue });
        listNode.addChild(libxmljs.parseXmlString(`<li><a href="#${idValue}">${titleName}</a></li>`).root());
    });
    e.addChild(listNode);
    e.attr({ class: "sample-table-of-contents" });
}


pack.midMacros.elements["load"] = (e: libxmljs.Element, info: Macroup.Setting) => {
    const parent = e.parent();
    if (parent.name() == "xarticle") return;
    const dir = path.dirname(info.inputPath);

    const newNode = createLoadCode(e, dir);
    const br = new libxmljs.Element(info.document, "br");
    e.addNextSibling(br);
    e.addNextSibling(newNode);
    e.remove();
}

pack.midMacros.elements["yarticle"] = (e: libxmljs.Element, info: Macroup.Setting) => {
    e.attr({ after: "article" });
    e.attr({ class: "sample-article" })

    const dir = path.dirname(info.inputPath);
    const title = new libxmljs.Element(e.doc(), "h2", e.attr("title")!.value());
    const fst = e.child(0);
    if (fst !== undefined) {
        fst.addPrevSibling(title);
    } else {
        e.addChild(title);
    }

}
pack.midMacros.elements["comment"] = (e: libxmljs.Element, info: Macroup.Setting) => {
    const parent = e.parent();
    if (parent.name() == "xarticle") return;

    MacroupLib.insertFirst(e, "　");
    const sectionNode = new libxmljs.Element(e.doc(), "section", undefined);
    sectionNode.attr({ "ignore-format": "true", class: "sample-commentary" });
    const prev = e.nextSibling();
    moveChildren(e, sectionNode);
    if (prev == null) {
        parent.addChild(sectionNode);
    } else {
        prev.addPrevSibling(sectionNode);
    }
    e.remove();
}
import fs = require('fs');

let bTab = false;
let tabCounter = 0;

pack.midMacros.elements["tab"] = (e: libxmljs.Element, info: Macroup.Setting) => {

    const pages = e.childNodes().filter((v) => v.name() == "page");
    const tab = new libxmljs.Element(e.doc(), "div");
    tab.attr({ class: "tabs" })
    pages.forEach((v, i) => {
        const tabInput = new libxmljs.Element(e.doc(), "input");
        const tabLabel = new libxmljs.Element(e.doc(), "label");
        const title = v.attr("title");
        if(title != null){
            MacroupLib.setText(tabLabel, title.value());
        }else{
            MacroupLib.setText(tabLabel, `page${i}`);
        }

        tabInput.attr({ id: `tab-${tabCounter}-${i}`, type: "radio", name: `tab-radio${tabCounter}` })
        const checkAttr = v.attr("checked");
        if(checkAttr != null){
            const p = {};
            p[checkAttr.name()] = checkAttr.value();
            tabInput.attr(p);
        }
        tabLabel.attr({ class: `tab-label`, for: `tab-${tabCounter}-${i}` })

        tab.addChild(tabInput);
        tab.addChild(tabLabel);

    })
    pages.forEach((v, i) => {
        const tabDiv = new libxmljs.Element(e.doc(), "div");
        tabDiv.attr({ class: `tab-content tab-${tabCounter}-${i}-content` })
        v.childNodes().forEach((w) => tabDiv.addChild(w));
        tab.addChild(tabDiv);
    })
    e.addPrevSibling(tab);
    e.remove();
    
    let cssPath = path.basename(info.outputPath, ".html") + "_tab.css";

    if (!bTab) {
        const prevCSS = `
.tabs {
    margin-top: 12px;
}
       
      .tabs .tab-label {
        display: inline-block;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid #999;
        background-color: #f3f3f3;
        margin-left: 1px;
        margin-right: 1px;
        padding: 3px 6px;
        border-bottom: none;
        font-size: 0.9em;
      }
       
      .tabs .tab-label:hover {
        opacity: 0.7;
      }
       
      .tabs input[name="tab-radio"],
      .tabs .tab-content {
        display: none;
      }
       
      .tabs .tab-content{
        border: 1px solid #999;
        padding: 10px;
        min-height: 200px;
      }
          
      .tabs input:checked + .tab-label {
        background-color: yellow;
      }
        `;
        fs.writeFile(cssPath, prevCSS, function (err) {
            if (err) {
                throw err;
            }
        });
        bTab = true;
    }
    let tabStr = "";
    const cssStrs = pages.map((v, i) => {
        return `.tabs #tab-${tabCounter}-${i}:checked ~ .tab-${tabCounter}-${i}-content`;
    })
    if (cssStrs.length > 0) {
        let data = cssStrs.join(",\n") + "{display: block;}"
        data += `\n .tabs input[name="tab-radio${tabCounter}"] {display: none;} \n`
        fs.appendFile(cssPath, data, function (err) {
            if (err) {
                throw err;
            }
        });
    }
    
    tabCounter++;
}


SET.addPackage(pack);