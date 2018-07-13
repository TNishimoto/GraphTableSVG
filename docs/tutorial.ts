
import { SET, Macroup, MacroupLib, HTMLLib, libxmljs } from 'macroup';
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
    //MacroupLib.insertFirst(v, "　");
    const sectionNode = new libxmljs.Element(e.doc(), "section", undefined);
    sectionNode.attr({ "ignore-format": "true", class: "sample-commentary" });
    lines.forEach((w) => {
        //console.log(w.text());

        sectionNode.addChild(w);
        //moveChildren(w, sectionNode);

    })
    MacroupLib.insertFirst(sectionNode, "　");
    //console.log("//");
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
pack.midMacros.elements["rhref"] = (e: libxmljs.Element, info: Macroup.Setting) =>{
    const isMethod = e.attr("method") != null;
    const isModule = e.attr("module") != null;
    const isInterface = e.attr("interface") != null;

    const text = e.text();
    let prefix = "";
    let className = "";
    if(isModule){
        prefix = "modules/graphtablesvg.";
    } else if(isInterface){
        prefix = "interfaces/";
    }
    else{
        prefix = "classes/graphtablesvg.";
    }

    if(isMethod){
        const texts = text.split(".");
        const methodName = texts[texts.length-1].toLowerCase();
        if(texts.length == 2){
            className = texts[0].toLowerCase();
        }
        replaceXMLText(e, `<a href="./typedoc/${prefix}${className}.html#${methodName}" target="_blank">${text}</a>`);
    }else{
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
        //if(title.text() == "はじめに")console.log(v.text());
        e.addChild(v)
    });
    //if(title.text() == "はじめに")console.log(e.toString());

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

SET.addPackage(pack);