"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const macroup_1 = require("macroup");
const path = require("path");
const pack = new macroup_1.Macroup.MacroPackage("tutorial");
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
function createLoadCode(e, dir) {
    const filePath = e.attr("path").value();
    const ext = path.extname(filePath);
    const typeAttr = e.attr("type");
    const type = typeAttr == null ? null : typeAttr.value();
    if (type == "code") {
        if (e.attr("id") != null) {
            const id = e.attr("id").value();
            const node = macroup_1.TextLoader.loadTextByID(filePath, dir, id);
            const nodeText = node.toString();
            return macroup_1.HTMLLib.createCodeTag(nodeText, e.doc()).createReferenceCodeTag({ title: filePath });
        }
        else {
            return macroup_1.HTMLLib.createReferenceCodeTag(filePath, dir, e.doc());
        }
    }
    else {
        if (ext == ".png") {
            const img = new macroup_1.libxmljs.Element(e.doc(), "img", "");
            img.attr({ src: filePath, "style": "max-width:100%" });
            //img.attr({src:v });        
            return img;
        }
        else if (e.attr("id") != null) {
            const id = e.attr("id").value();
            const node = macroup_1.TextLoader.loadTextByID(filePath, dir, id);
            node.attr({ "ignore-format": "true" });
            return node;
            //throw Error("error");
        }
        else {
            return macroup_1.HTMLLib.createReferenceCodeTag(filePath, dir, e.doc());
        }
    }
}
function moveChildren(oldNode, newNode) {
    oldNode.childNodes().forEach((v) => newNode.addChild(v));
}
function clearChildren(e) {
    e.childNodes().forEach((v) => v.remove());
}
function parseXML(str) {
    const doc = macroup_1.libxmljs.parseXmlString(str);
    return doc.root();
}
/*
pack.midMacros.elements["p"] = (e : libxmljs.Element, info : Macroup.Setting) =>{
    MacroupLib.insertFirst(e, "　");
    //const text = e.text();
    //(<any>e).text("　" + text);
}
*/
function tempora(lines, e) {
    const sectionNode = new macroup_1.libxmljs.Element(e.doc(), "section", undefined);
    sectionNode.attr({ "ignore-format": "true", class: "sample-commentary" });
    lines.forEach((w) => {
        sectionNode.addChild(w);
    });
    sectionNode.maddFirstChild(sectionNode.mcreateTextNode("　"));
    //MacroupLib.insertFirst(sectionNode, "　");
    lines.splice(0, lines.length);
    return sectionNode;
}
const hrefDic = {};
function setXMLText(e, text) {
    const result = macroup_1.libxmljs.parseXml(text);
    clearChildren(e);
    e.addChild(result.root());
    //result.root().childNodes().forEach((v)=>e.addChild(v));
}
function replaceXMLText(e, text) {
    const result = macroup_1.libxmljs.parseXml(text);
    clearChildren(e);
    e.addPrevSibling(result.root());
    e.remove();
    //e.addChild(result.root());
}
function toChars(str) {
    const r = [];
    for (let i = 0; i < str.length; i++) {
        r.push(str.charCodeAt(i));
    }
    return r;
}
function toString(str) {
    let r = "";
    for (let i = 0; i < str.length; i++) {
        r += String.fromCharCode(str[i]);
    }
    return r;
}
function removeSpace(str) {
    let spaces = [9, 10];
    const r = toChars(str).filter((v) => {
        const c = String.fromCharCode(v);
        const b = spaces.some((w) => w == v);
        return !b;
    });
    return toString(r);
}
let increment = 1;
pack.preMacros.elements["incr"] = (e) => {
    e.isTagErased = true;
    e.content = `${increment++}`;
};
pack.midMacros.elements["ahref"] = (e, info) => {
    const name1 = e.attr("key");
    if (name1 == null) {
        const name = e.text();
        if (name in hrefDic) {
            replaceXMLText(e, `<a href="${hrefDic[name]}" target="_blank">${name}</a>`);
        }
        else {
            replaceXMLText(e, `<p style="color:red;font-size:24pt">${name} : No Exist Link!</p>`);
            //(<any>e).text("No Dic!");
        }
    }
    else {
        const url = e.attr("url");
        hrefDic[name1.value()] = url.value();
    }
};
pack.midMacros.elements["rhref"] = (e, info) => {
    const isMethod = e.attr("method") != null;
    const isModule = e.attr("module") != null;
    const isInterface = e.attr("interface") != null;
    const text = removeSpace(e.text());
    let prefix = "";
    let className = "";
    if (isModule) {
        prefix = "modules/graphtablesvg.";
    }
    else if (isInterface) {
        prefix = "interfaces/";
    }
    else {
        prefix = "classes/graphtablesvg.";
    }
    if (isMethod) {
        const texts = text.split(".");
        const methodName = removeSpace(texts[texts.length - 1]).toLowerCase();
        if (texts.length == 2) {
            className = texts[0].toLowerCase();
            replaceXMLText(e, `<a href="./typedoc/${prefix}${className}.html#${methodName}" target="_blank">${text}</a>`);
        }
        else if (texts.length == 1) {
            replaceXMLText(e, `<a href="./typedoc/modules/graphtablesvg.html#${methodName}" target="_blank">${text}</a>`);
        }
    }
    else {
        className = text.toLowerCase();
        replaceXMLText(e, `<a href="./typedoc/${prefix}${className}.html" target="_blank">${text}</a>`);
    }
};
pack.midMacros.elements["xarticle"] = (e, info) => {
    e.attr({ after: "article" });
    e.attr({ class: "sample-article" });
    const dir = path.dirname(info.inputPath);
    const nodes = e.childNodes();
    const newNodes = [];
    const title = new macroup_1.libxmljs.Element(e.doc(), "h2", e.attr("title").value());
    newNodes.push(title);
    const tmp = [];
    nodes.forEach((v) => {
        if (v.name() == "comment") {
            if (tmp.length > 0)
                newNodes.push(tempora(tmp, e));
            v.maddFirstChild(e.mcreateTextNode("　"));
            const sectionNode = new macroup_1.libxmljs.Element(e.doc(), "section", undefined);
            sectionNode.attr({ "ignore-format": "true", class: "sample-commentary" });
            moveChildren(v, sectionNode);
            newNodes.push(sectionNode);
        }
        else if (v.name() == "load") {
            if (tmp.length > 0)
                newNodes.push(tempora(tmp, e));
            newNodes.push(createLoadCode(v, dir));
            const br = new macroup_1.libxmljs.Element(info.document, "br");
            newNodes.push(br);
        }
        else if (v.name() == "dbr") {
            //if(title.text() == "はじめに")console.log(v.text());
            if (tmp.length > 0)
                newNodes.push(tempora(tmp, e));
        }
        else {
            if (v.text() != "\n") {
                tmp.push(v);
            }
        }
    });
    if (tmp.length > 0)
        newNodes.push(tempora(tmp, e));
    clearChildren(e);
    newNodes.forEach((v) => {
        e.addChild(v);
    });
};
pack.midMacros.elements["table_of_contents"] = (e, info) => {
    e.attr({ after: "div" });
    const title = new macroup_1.libxmljs.Element(e.doc(), "h2", "目次");
    e.addChild(title);
    const xarticleNodes = e.doc().find("//xarticle");
    const listNode = new macroup_1.libxmljs.Element(e.doc(), "ol", undefined);
    let idCounter = 0;
    xarticleNodes.forEach((v) => {
        const titleName = v.attr("title").value();
        const idValue = `xarticle-${idCounter++}`;
        v.attr({ id: idValue });
        listNode.addChild(macroup_1.libxmljs.parseXmlString(`<li><a href="#${idValue}">${titleName}</a></li>`).root());
    });
    e.addChild(listNode);
    e.attr({ class: "sample-table-of-contents" });
};
pack.midMacros.elements["load"] = (e, info) => {
    const parent = e.parent();
    if (parent.name() == "xarticle")
        return;
    const dir = path.dirname(info.inputPath);
    const newNode = createLoadCode(e, dir);
    const br = new macroup_1.libxmljs.Element(info.document, "br");
    e.addNextSibling(br);
    e.addNextSibling(newNode);
    e.remove();
};
pack.midMacros.elements["yarticle"] = (e, info) => {
    const dir = path.dirname(info.inputPath);
    const title = new macroup_1.libxmljs.Element(e.doc(), "h2", e.attr("title").value());
    e.attr({ after: "article" });
    e.attr({ class: "sample-article" });
    e.maddFirstChild(title);
    /*
    const fst = e.child(0);
    if (fst !== undefined && fst !== null) {
        fst.addPrevSibling(title);
    } else {
        e.addChild(title);
    }
    */
};
pack.midMacros.elements["comment"] = (e, info) => {
    const parent = e.parent();
    if (parent.name() == "xarticle")
        return;
    const textNode = e.mcreateTextNode("　");
    e.mrename("section").maddAttr("ignore-format", "true").maddAttr("class", "sample-commentary").maddFirstChild(textNode);
    /*
    const sectionNode = new libxmljs.Element(e.doc(), "section", undefined);
    sectionNode.attr({ "ignore-format": "true", class: "sample-commentary" });
    moveChildren(e, sectionNode);
    e.addNextSibling(sectionNode);
    e.remove();
    */
};
const fs = require("fs");
let bTab = false;
let tabCounter = 0;
pack.midMacros.elements["tab"] = (e, info) => {
    //console.log(e.hasBRChild());
    const pages = e.childNodes().filter((v) => v.name() == "page");
    const tab = new macroup_1.libxmljs.Element(e.doc(), "div");
    tab.attr({ class: "tabs" });
    pages.forEach((v, i) => {
        const tabInput = new macroup_1.libxmljs.Element(e.doc(), "input");
        const tabLabel = new macroup_1.libxmljs.Element(e.doc(), "label");
        const title = v.attr("title");
        if (title != null) {
            macroup_1.MacroupLib.setText(tabLabel, title.value());
        }
        else {
            macroup_1.MacroupLib.setText(tabLabel, `page${i}`);
        }
        tabInput.attr({ id: `tab-${tabCounter}-${i}`, type: "radio", name: `tab-radio${tabCounter}` });
        const checkAttr = v.attr("checked");
        if (checkAttr != null) {
            const p = {};
            p[checkAttr.name()] = checkAttr.value();
            tabInput.attr(p);
        }
        tabLabel.attr({ class: `tab-label`, for: `tab-${tabCounter}-${i}` });
        tab.addChild(tabInput);
        tab.addChild(tabLabel);
    });
    pages.forEach((v, i) => {
        const tabDiv = new macroup_1.libxmljs.Element(e.doc(), "div");
        tabDiv.attr({ class: `tab-content tab-${tabCounter}-${i}-content` });
        v.childNodes().forEach((w) => tabDiv.addChild(w));
        tab.addChild(tabDiv);
    });
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
    });
    if (cssStrs.length > 0) {
        let data = cssStrs.join(",\n") + "{display: block;}";
        data += `\n .tabs input[name="tab-radio${tabCounter}"] {display: none;} \n`;
        fs.appendFile(cssPath, data, function (err) {
            if (err) {
                throw err;
            }
        });
    }
    tabCounter++;
};
macroup_1.SET.addPackage(pack);
