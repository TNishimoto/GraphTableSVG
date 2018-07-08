
namespace GraphTableSVG {
    
    export class Tree extends Graph{
        
        
    }
    export namespace Parse{
        export function parseTree(str : string) : GraphTableSVG.LogicTree {
            const [tree, pos] = parseTreeSub(str, 0);
            return tree;
        }
        function parseTreeSub(str : string, pos : number) : [GraphTableSVG.LogicTree, number] {
            
            const node : GraphTableSVG.LogicTree | null = new GraphTableSVG.LogicTree({ item : "" });
            const c = str[pos];
            if(c != '('){
                throw Error("Parse Error");
            }else{
                pos++;
                while (true) {
                    const c2 = str[pos];
                    if (c2 == ')') {
                        break;
                    } else if (c2 == '(') {
                        const [child, newPos] = parseTreeSub(str, pos++);
                        node.children.push(child);
                        pos = newPos + 1;
                    } else {
                        pos++;
                    }
                }
                return [node, pos];
            }
        
        
        }
        
        export function getParseString(tree : GraphTableSVG.Vertex) : string {
            let str = "";
            str += "(";
            tree.outcomingEdges.forEach((v)=>{
                if(v.endVertex != null){
                    str += getParseString(v.endVertex);
                }
            }
            )
            str += ")";
            return str;
        }
    }
}