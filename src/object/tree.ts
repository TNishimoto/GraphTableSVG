
//namespace GraphTableSVG {
    import {LogicTree} from "../options/logic_tree"
    import {GVertex} from "./g_vertex"

    export namespace Parse{
        /**
         * 入力文字列をパースしてLogicTreeを構築します。
         * @param parseText 
         */
        export function parseTree(parseText : string) : LogicTree {
            const [tree, pos] = parseTreeSub(parseText, 0);
            return tree;
        }
        function parseTreeSub(str : string, pos : number) : [LogicTree, number] {
            
            const node : LogicTree | null = new LogicTree({ item : "" });
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
        /**
         * 入力木構造を表現する文字列を出力します。
         * @param tree 文字列に変換する木構造
         */
        export function getParseString(tree : GVertex) : string {
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
//}