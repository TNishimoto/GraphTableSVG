"use strict";
exports.__esModule = true;
var macroup_1 = require("macroup");
var path = require("path");
var pack = new macroup_1.Macroup.MacroPackage("tutorial");
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
    var filePath = e.attr("path").value();
    var ext = path.extname(filePath);
    var typeAttr = e.attr("type");
    var type = typeAttr == null ? null : typeAttr.value();
    if (type == "code") {
        if (e.attr("id") != null) {
            var id = e.attr("id").value();
            var node = macroup_1.TextLoader.loadTextByID(filePath, dir, id);
            var nodeText = node.toString();
            return macroup_1.HTMLLib.createCodeTag(nodeText, e.doc()).createReferenceCodeTag({ title: filePath });
        }
        else {
            return macroup_1.HTMLLib.createReferenceCodeTag(filePath, dir, e.doc());
        }
    }
    else {
        if (ext == ".png") {
            var img = new macroup_1.libxmljs.Element(e.doc(), "img", "");
            img.attr({ src: filePath, "style": "max-width:100%" });
            //img.attr({src:v });        
            return img;
        }
        else if (e.attr("id") != null) {
            var id = e.attr("id").value();
            var node = macroup_1.TextLoader.loadTextByID(filePath, dir, id);
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
    oldNode.childNodes().forEach(function (v) { return newNode.addChild(v); });
}
function clearChildren(e) {
    e.childNodes().forEach(function (v) { return v.remove(); });
}
function parseXML(str) {
    var doc = macroup_1.libxmljs.parseXmlString(str);
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
    var sectionNode = new macroup_1.libxmljs.Element(e.doc(), "section", undefined);
    sectionNode.attr({ "ignore-format": "true", "class": "sample-commentary" });
    lines.forEach(function (w) {
        sectionNode.addChild(w);
    });
    sectionNode.maddFirstChild(sectionNode.mcreateTextNode("　"));
    //MacroupLib.insertFirst(sectionNode, "　");
    lines.splice(0, lines.length);
    return sectionNode;
}
var hrefDic = {};
function setXMLText(e, text) {
    var result = macroup_1.libxmljs.parseXml(text);
    clearChildren(e);
    e.addChild(result.root());
    //result.root().childNodes().forEach((v)=>e.addChild(v));
}
function replaceXMLText(e, text) {
    var result = macroup_1.libxmljs.parseXml(text);
    clearChildren(e);
    e.addPrevSibling(result.root());
    e.remove();
    //e.addChild(result.root());
}
function toChars(str) {
    var r = [];
    for (var i = 0; i < str.length; i++) {
        r.push(str.charCodeAt(i));
    }
    return r;
}
function toString(str) {
    var r = "";
    for (var i = 0; i < str.length; i++) {
        r += String.fromCharCode(str[i]);
    }
    return r;
}
function removeSpace(str) {
    var spaces = [9, 10];
    var r = toChars(str).filter(function (v) {
        var c = String.fromCharCode(v);
        var b = spaces.some(function (w) { return w == v; });
        return !b;
    });
    return toString(r);
}
var increment = 1;
pack.preMacros.elements["incr"] = function (e) {
    e.isTagErased = true;
    e.content = "" + increment++;
};
pack.midMacros.elements["ahref"] = function (e, info) {
    var name1 = e.attr("key");
    if (name1 == null) {
        var name_1 = e.text();
        if (name_1 in hrefDic) {
            replaceXMLText(e, "<a href=\"" + hrefDic[name_1] + "\" target=\"_blank\">" + name_1 + "</a>");
        }
        else {
            replaceXMLText(e, "<p style=\"color:red;font-size:24pt\">" + name_1 + " : No Exist Link!</p>");
            //(<any>e).text("No Dic!");
        }
    }
    else {
        var url = e.attr("url");
        hrefDic[name1.value()] = url.value();
    }
};
pack.midMacros.elements["rhref"] = function (e, info) {
    var isMethod = e.attr("method") != null;
    var isModule = e.attr("module") != null;
    var isInterface = e.attr("interface") != null;
    var text = removeSpace(e.text());
    var prefix = "";
    var className = "";
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
        var texts = text.split(".");
        var methodName = removeSpace(texts[texts.length - 1]).toLowerCase();
        if (texts.length == 2) {
            className = texts[0].toLowerCase();
            replaceXMLText(e, "<a href=\"./typedoc/" + prefix + className + ".html#" + methodName + "\" target=\"_blank\">" + text + "</a>");
        }
        else if (texts.length == 1) {
            replaceXMLText(e, "<a href=\"./typedoc/modules/graphtablesvg.html#" + methodName + "\" target=\"_blank\">" + text + "</a>");
        }
    }
    else {
        className = text.toLowerCase();
        replaceXMLText(e, "<a href=\"./typedoc/" + prefix + className + ".html\" target=\"_blank\">" + text + "</a>");
    }
};
pack.midMacros.elements["xarticle"] = function (e, info) {
    e.attr({ after: "article" });
    e.attr({ "class": "sample-article" });
    var dir = path.dirname(info.inputPath);
    var nodes = e.childNodes();
    var newNodes = [];
    var title = new macroup_1.libxmljs.Element(e.doc(), "h2", e.attr("title").value());
    newNodes.push(title);
    var tmp = [];
    nodes.forEach(function (v) {
        if (v.name() == "comment") {
            if (tmp.length > 0)
                newNodes.push(tempora(tmp, e));
            v.maddFirstChild(e.mcreateTextNode("　"));
            var sectionNode = new macroup_1.libxmljs.Element(e.doc(), "section", undefined);
            sectionNode.attr({ "ignore-format": "true", "class": "sample-commentary" });
            moveChildren(v, sectionNode);
            newNodes.push(sectionNode);
        }
        else if (v.name() == "load") {
            if (tmp.length > 0)
                newNodes.push(tempora(tmp, e));
            newNodes.push(createLoadCode(v, dir));
            var br = new macroup_1.libxmljs.Element(info.document, "br");
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
    newNodes.forEach(function (v) {
        e.addChild(v);
    });
};
pack.midMacros.elements["table_of_contents"] = function (e, info) {
    e.attr({ after: "div" });
    var title = new macroup_1.libxmljs.Element(e.doc(), "h2", "目次");
    e.addChild(title);
    var xarticleNodes = e.doc().find("//xarticle");
    var listNode = new macroup_1.libxmljs.Element(e.doc(), "ol", undefined);
    var idCounter = 0;
    xarticleNodes.forEach(function (v) {
        var titleName = v.attr("title").value();
        var idValue = "xarticle-" + idCounter++;
        v.attr({ id: idValue });
        listNode.addChild(macroup_1.libxmljs.parseXmlString("<li><a href=\"#" + idValue + "\">" + titleName + "</a></li>").root());
    });
    e.addChild(listNode);
    e.attr({ "class": "sample-table-of-contents" });
};
pack.midMacros.elements["load"] = function (e, info) {
    var parent = e.parent();
    if (parent.name() == "xarticle")
        return;
    var dir = path.dirname(info.inputPath);
    var newNode = createLoadCode(e, dir);
    var br = new macroup_1.libxmljs.Element(info.document, "br");
    e.addNextSibling(br);
    e.addNextSibling(newNode);
    e.remove();
};
pack.midMacros.elements["yarticle"] = function (e, info) {
    var dir = path.dirname(info.inputPath);
    var title = new macroup_1.libxmljs.Element(e.doc(), "h2", e.attr("title").value());
    e.attr({ after: "article" });
    e.attr({ "class": "sample-article" });
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
pack.midMacros.elements["comment"] = function (e, info) {
    var parent = e.parent();
    if (parent.name() == "xarticle")
        return;
    var textNode = e.mcreateTextNode("　");
    e.mrename("section").maddAttr("ignore-format", "true").maddAttr("class", "sample-commentary").maddFirstChild(textNode);
    /*
    const sectionNode = new libxmljs.Element(e.doc(), "section", undefined);
    sectionNode.attr({ "ignore-format": "true", class: "sample-commentary" });
    moveChildren(e, sectionNode);
    e.addNextSibling(sectionNode);
    e.remove();
    */
};
var fs = require("fs");
var bTab = false;
var tabCounter = 0;
pack.midMacros.elements["tab2"] = function (e, info) {
    e.attr("data_is_processed").remove();
    var path = e.attr("path").value();
    var html = path + ".html";
    var js = path + ".js";
    e.mrename("tab")
        .addChild(new macroup_1.libxmljs.Element(e.doc(), "page", undefined).maddAttr("title", "js")
        .addChild(new macroup_1.libxmljs.Element(e.doc(), "a", "実行結果").maddAttr("href", html))
        .addChild(new macroup_1.libxmljs.Element(e.doc(), "load", undefined).maddAttr("path", js)))
        .addChild(new macroup_1.libxmljs.Element(e.doc(), "page", undefined).maddAttr("title", "html")
        .addChild(new macroup_1.libxmljs.Element(e.doc(), "load", undefined).maddAttr("path", html)))
        .addChild(new macroup_1.libxmljs.Element(e.doc(), "page", undefined).maddAttr("title", "preview").maddAttr("checked", "1")
        .addChild(new macroup_1.libxmljs.Element(e.doc(), "iframe", undefined)
        .maddAttr("g-src", html).maddAttr("width", "800px").maddAttr("height", "500px")));
};
pack.midMacros.elements["tab"] = function (e, info) {
    //console.log(e.hasBRChild());
    var pages = e.childNodes().filter(function (v) { return v.name() == "page"; });
    var tab = new macroup_1.libxmljs.Element(e.doc(), "div");
    tab.attr({ "class": "tabs" });
    pages.forEach(function (v, i) {
        var tabInput = new macroup_1.libxmljs.Element(e.doc(), "input");
        var tabLabel = new macroup_1.libxmljs.Element(e.doc(), "label");
        var title = v.attr("title");
        if (title != null) {
            macroup_1.MacroupLib.setText(tabLabel, title.value());
        }
        else {
            macroup_1.MacroupLib.setText(tabLabel, "page" + i);
        }
        tabInput.attr({ id: "tab-" + tabCounter + "-" + i, type: "radio", name: "tab-radio" + tabCounter });
        var checkAttr = v.attr("checked");
        if (checkAttr != null) {
            var p = {};
            p[checkAttr.name()] = checkAttr.value();
            tabInput.attr(p);
        }
        tabLabel.attr({ "class": "tab-label", "for": "tab-" + tabCounter + "-" + i });
        tab.addChild(tabInput);
        tab.addChild(tabLabel);
    });
    pages.forEach(function (v, i) {
        var tabDiv = new macroup_1.libxmljs.Element(e.doc(), "div");
        tabDiv.attr({ "class": "tab-content tab-" + tabCounter + "-" + i + "-content" });
        v.childNodes().forEach(function (w) { return tabDiv.addChild(w); });
        tab.addChild(tabDiv);
    });
    e.addPrevSibling(tab);
    e.remove();
    var cssPath = path.basename(info.outputPath, ".html") + "_tab.css";
    if (!bTab) {
        var prevCSS = "\n.tabs {\n    margin-top: 12px;\n}\n       \n      .tabs .tab-label {\n        display: inline-block;\n        border-top-left-radius: 3px;\n        border-top-right-radius: 3px;\n        border: 1px solid #999;\n        background-color: #f3f3f3;\n        margin-left: 1px;\n        margin-right: 1px;\n        padding: 3px 6px;\n        border-bottom: none;\n        font-size: 0.9em;\n      }\n       \n      .tabs .tab-label:hover {\n        opacity: 0.7;\n      }\n       \n      .tabs input[name=\"tab-radio\"],\n      .tabs .tab-content {\n        display: none;\n      }\n       \n      .tabs .tab-content{\n        border: 1px solid #999;\n        padding: 10px;\n        min-height: 200px;\n      }\n          \n      .tabs input:checked + .tab-label {\n        background-color: yellow;\n      }\n        ";
        fs.writeFile(cssPath, prevCSS, function (err) {
            if (err) {
                throw err;
            }
        });
        bTab = true;
    }
    var tabStr = "";
    var cssStrs = pages.map(function (v, i) {
        return ".tabs #tab-" + tabCounter + "-" + i + ":checked ~ .tab-" + tabCounter + "-" + i + "-content";
    });
    if (cssStrs.length > 0) {
        var data = cssStrs.join(",\n") + "{display: block;}";
        data += "\n .tabs input[name=\"tab-radio" + tabCounter + "\"] {display: none;} \n";
        fs.appendFile(cssPath, data, function (err) {
            if (err) {
                throw err;
            }
        });
    }
    tabCounter++;
};
macroup_1.SET.addPackage(pack);
