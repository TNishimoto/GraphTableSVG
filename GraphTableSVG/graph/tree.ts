
namespace GraphTableSVG {
    
    export class Tree extends Graph{
        //public roots : LogicTree<string>[] = [];
        //public graph : Graph;

        /*
        public constructFromStringLogicTree(roots: LogicTree<string>[], isLatexMode: boolean = false) {
            this.constructFromLogicTree(roots, (v) => v, isLatexMode);
        }
        */
        public constructFromLogicTree(roots: LogicTree[] | LogicTree, isLatexMode: boolean = false) {
            if (roots instanceof Array){
                this.clear();
                roots.forEach((v) => { if (v != null) this.createChild(null, v, isLatexMode) });
                this.relocate();            
            } else {
                this.constructFromLogicTree([roots], isLatexMode);
            }
            //this.roots = roots;
        }

        private createChild<T>(parent: Vertex | null = null, logicNode: LogicTree, isLatexMode: boolean = false) : Vertex {    

            const node = GraphTableSVG.Vertex.create(this, {className : logicNode.nodeClass});
            //node.svgText.setTextContent(displayFunction(tree.item), isLatexMode);
            if (logicNode.nodeText != null) GraphTableSVG.SVG.setTextToSVGText(node.svgText, logicNode.nodeText, isLatexMode);
            if (parent != null) {
                const edge = GraphTableSVG.Edge.create(this, {className : logicNode.edgeClass});
                if (logicNode.edgeLabel != null) {
                    edge.svgTextPath.setTextContent(logicNode.edgeLabel, isLatexMode);
                    edge.isMaximalRegularInterval = true;
                    //edge.svgText.setTextContent(tree.edgeLabel, isLatexMode);
                }
                this.connect(parent, edge, node, null, null, "bottom", "top");
            }else{
                this.roots.push(node);
            }
            logicNode.children.forEach((v) => {
                if(v != null)this.createChild(node, v, isLatexMode);
            });
            this.createdNodeCallback(node);
            return node;
        }



        public createdNodeCallback = (node: GraphTableSVG.Vertex) => { }
        public relocateFunction: (Tree : Graph) => void = TreeArrangement.Arrangement1;
        public relocate() {
            this.relocateFunction(this);
        }

        public appendChild(parent : Vertex, str : string, insertIndex : number){
            const node = GraphTableSVG.Vertex.create(this);  
            const edge = GraphTableSVG.Edge.create(this);
            
            this.connect(parent, edge, node, null, null, "bottom", "top");
            this.createdNodeCallback(node);
            this.relocate();
        }
    }
    export namespace Parse{
        export function parseTree(str : string) : GraphTableSVG.LogicTree {
            const [tree, pos] = parseTreeSub(str, 0);
            return tree;
        }
        function parseTreeSub(str : string, pos : number) : [GraphTableSVG.LogicTree, number] {
            
            const node : GraphTableSVG.LogicTree | null = new GraphTableSVG.LogicTree("");
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