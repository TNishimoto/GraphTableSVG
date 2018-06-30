
import { SET, Macroup, MacroupLib,HTMLLib,libxmljs } from 'macroup';
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
function createLoadCode(e : libxmljs.Element, dir : string) : libxmljs.Element {
    const filePath = e.attr("path").value();
    const ext = path.extname(filePath);
    if(ext == ".png"){
        const img = new libxmljs.Element(e.doc(), "img", "");
        img.attr({src:filePath, "style":"max-width:100%" });
        //img.attr({src:v });        
        return img;
    }else{
        return HTMLLib.createReferenceCodeTag(filePath, dir, e.doc());
    }
}


function moveChildren(oldNode : libxmljs.Element, newNode : libxmljs.Element){
    oldNode.childNodes().forEach((v)=>newNode.addChild(v));
}
function clearChildren(e : libxmljs.Element){
    e.childNodes().forEach((v)=>v.remove());
}
function parseXML(str : string) : libxmljs.Element {
    const doc = libxmljs.parseXmlString(str);
    return doc.root();
}


pack.midMacros.elements["xarticle"] = (e : libxmljs.Element, info : Macroup.Setting) =>{
    e.attr({after : "article"});
    e.attr({class:"sample-article"})

    const dir = path.dirname(info.inputPath);
    const nodes = e.childNodes();
    const newNodes : libxmljs.Element[] = [];
    const title = new libxmljs.Element(e.doc(), "h2", e.attr("title")!.value());
    newNodes.push(title);


    nodes.forEach((v)=>{
        if(v.name() == "comment"){
            const sectionNode = new libxmljs.Element(e.doc(), "section", undefined); 
            sectionNode.attr({"ignore-format" : "true", class : "sample-commentary"});
            moveChildren(v, sectionNode);
            newNodes.push(sectionNode);
        }else if(v.name() == "load"){
            newNodes.push(createLoadCode(v, dir));
        }
    })

    clearChildren(e);
    newNodes.forEach((v)=>e.addChild(v));

}
pack.midMacros.elements["table_of_contents"]= (e : libxmljs.Element, info : Macroup.Setting) =>{
    e.attr({after : "div"});

    const title = new libxmljs.Element(e.doc(), "h2", "目次");
    e.addChild(title);
    
    const xarticleNodes = e.doc().find("//xarticle");

    const listNode = new libxmljs.Element(e.doc(), "ol", undefined);
    let idCounter = 0;
    xarticleNodes.forEach((v)=> {
        const titleName = v.attr("title").value();
        const idValue = `xarticle-${idCounter++}`;
        v.attr({id : idValue });
        listNode.addChild(libxmljs.parseXmlString(`<li><a href="#${idValue}">${titleName}</a></li>`).root());
    });
    e.addChild(listNode);
    e.attr({class:"sample-table-of-contents"});
}

SET.addPackage(pack);