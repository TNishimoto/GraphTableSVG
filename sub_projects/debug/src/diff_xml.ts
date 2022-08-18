import * as libxmljs from 'libxmljs';
import * as libxmlts from './libxmlts';


function diffAttrs(e1 : libxmlts.libxmlts.Element, e2 : libxmlts.libxmlts.Element) : boolean{
    const attr1 = e1.attrs();
    const map1 : Map<string, string> = new Map();
    attr1.forEach((v) => map1.set(v.name, v.value));

    const attr2 = e2.attrs();
    const map2 : Map<string, string> = new Map();
    attr2.forEach((v) => map2.set(v.name, v.value));

    for(let kv1 of attr1){
        //console.log(`${kv1.name}: ${kv1.value}`);
        const value2 = map2.get(kv1.name); 
        if(value2 === undefined ){
            return false;
        }else{
            if(kv1.value != value2){
                return false;
            }
        }
    }

    for(let kv2 of attr2){
        const value1 = map1.get(kv2.name); 
        if(value1 === undefined ){
            return false;
        }else{
            if(kv2.value != value1){
                return false;
            }
        }
    }
    //console.log(attr1);
    //console.log(attr2);

    return true;
}
function diffNode(e1 : libxmlts.libxmlts.InnerNode, e2 : libxmlts.libxmlts.InnerNode) : boolean{
    if(e1.type != e2.type){
        return false;
    }else{
        if(e1 instanceof libxmlts.libxmlts.Element && e2 instanceof libxmlts.libxmlts.Element){
            const b1 = diffAttrs(e1, e2);
            if(b1){
                const children1 = e1.childNodes();
                const children2 = e2.childNodes();
                if(children1.length != children2.length){
                    return false;
                  }else{
                    
                    for(let i=0;i<children1.length;i++){
                        const b2 = diffNode(children1[i], children2[i]);
                        if(!b2){
                            return false;
                        }
                    }
                  }
                return true;                  
            }else{
                return false;
            }
    
        }
        else if(e1 instanceof libxmlts.libxmlts.CDATA && e2 instanceof libxmlts.libxmlts.CDATA){
            if(e1.text != e2.text){
                return false;
            }else{
                return true;
            }
        }else if(e1 instanceof libxmlts.libxmlts.Comment && e2 instanceof libxmlts.libxmlts.Comment){
            if(e1.text != e2.text){
                return false;
            }else{
                return true;
            }
        }else if(e1 instanceof libxmlts.libxmlts.ProcessingInstruction && e2 instanceof libxmlts.libxmlts.ProcessingInstruction){
            return true;
        }else if(e1 instanceof libxmlts.libxmlts.Text && e2 instanceof libxmlts.libxmlts.Text){            
            if(e1.text != e2.text){
                return false;
            }else{
                return true;
            }
        }else{
            throw new Error("TypeError");
        }

    }
}


export function diffXML(xml1 : string, xml2 : string) : boolean{
    const xmlDoc1 = new libxmlts.libxmlts.Document(libxmljs.parseHtmlString(xml1));
    const xmlDoc2 = new libxmlts.libxmlts.Document(libxmljs.parseHtmlString(xml2));
    const b = diffNode(xmlDoc1.root, xmlDoc2.root);
        /*
    const elementStack1 : libxmlts.libxmlts.Element[] = new Array(xmlDoc1.root);
    const elementStack2 : libxmlts.libxmlts.Element[] = new Array(xmlDoc2.root);
  
    while(elementStack1.length > 0){
      const e1 = elementStack1[elementStack1.length-1];
      const e2 = elementStack2[elementStack2.length-1];
      elementStack1.pop();
      elementStack2.pop();

      const b1 = diffAttrs(e1, e2);
      const children1 = e1.childNodes();
      const children2 = e2.childNodes();

      
  
    }
    */
  
    return b;
  
  }