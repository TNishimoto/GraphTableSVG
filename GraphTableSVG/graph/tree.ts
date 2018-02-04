
namespace GraphTableSVG {
    
    export class Tree extends Graph{
        //public roots : LogicTree<string>[] = [];
        //public graph : Graph;

        /*
        public constructFromStringLogicTree(roots: LogicTree<string>[], isLatexMode: boolean = false) {
            this.constructFromLogicTree(roots, (v) => v, isLatexMode);
        }
        */
        public constructFromLogicTree<T>(roots: LogicTree<T>[], isLatexMode: boolean = false) {
            //this.roots = roots;
            this.clear();
            roots.forEach((v) => { if (v != null) this.createChild(null, v, isLatexMode) });
            this.relocate(this);
        }

        private createChild<T>(parent: Vertex | null = null, tree: LogicTree<T>, isLatexMode: boolean = false) : Vertex {    
            
            const node = GraphTableSVG.Vertex.create(this);
            //node.svgText.setTextContent(displayFunction(tree.item), isLatexMode);
            if (tree.nodeText != null) GraphTableSVG.SVG.setTextToSVGText(node.svgText, tree.nodeText, isLatexMode);
            if(parent != null){
                const edge = GraphTableSVG.Edge.create(this);
                this.connect(parent, edge, node, null, null, "bottom", "top");
            }else{
                this.roots.push(node);
            }
            tree.children.forEach((v) => {
                if(v != null)this.createChild(node, v, isLatexMode);
            });
            this.createdNodeCallback(node);
            return node;
        }



        public createdNodeCallback = (node: GraphTableSVG.Vertex) => { }
        public relocate: (Tree) => void = TreeArrangement.Arrangement1;
        public appendChild(parent : Vertex, str : string, insertIndex : number){
            const node = GraphTableSVG.Vertex.create(this);  
            const edge = GraphTableSVG.Edge.create(this);
            
            this.connect(parent, edge, node, null, null, "bottom", "top");
            this.createdNodeCallback(node);
            this.relocate(this);
        }
    }
    export namespace Parse{
        export function parseTree(str : string) : GraphTableSVG.LogicTree<string> {
            const [tree, pos] = parseTreeSub(str, 0);
            return tree;
        }
        function parseTreeSub(str : string, pos : number) : [GraphTableSVG.LogicTree<string>, number] {
            
            const node : GraphTableSVG.LogicTree<string> | null = new GraphTableSVG.LogicTree<string>("");
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