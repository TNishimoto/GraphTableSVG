
namespace GraphTableSVG {
    
    export class Tree extends Graph{
        //public roots : LogicTree<string>[] = [];
        //public graph : Graph;


        public construct(roots: LogicTree<string>[], isLatexMode: boolean = false){
            //this.roots = roots;
            this.clear();
            roots.forEach((v) => this.createChild(null, v, isLatexMode));
            this.relocate(this);
        }
        private createChild(parent: Vertex | null = null, tree: LogicTree<string>, isLatexMode: boolean = false) : Vertex {    
            
            const node = GraphTableSVG.Vertex.create(this);
            node.svgText.setTextContent(tree.item, isLatexMode);
            if(parent != null){
                const edge = GraphTableSVG.Edge.create(this);
                this.connect(parent, edge, node, null, null, "bottom", "top");
            }else{
                this.roots.push(node);
            }
            tree.children.forEach((v) => {
                this.createChild(node, v, isLatexMode);
            });
            this.createdNodeCallback(node);
            return node;
        }
        public createdNodeCallback = (node: GraphTableSVG.Vertex) => { }
        public relocate = (tree: Tree = this) => {
            this.vertices.forEach((v)=>{v.x = 0 ; v.y = 0});
            const xi = this.vertexXInterval != null ? this.vertexXInterval : 30;
            const yi = this.vertexYInterval != null ? this.vertexYInterval : 30;
            GraphTableSVG.GraphArrangement.leaveBasedArrangement(this, xi, yi);
            GraphTableSVG.GraphArrangement.reverse(this, false, true);
            const region = this.getRegion();
            if (region.x < 0) this.svgGroup.setX(-region.x);
            if (region.y < 0) this.svgGroup.setY(-region.y);
            //this.svgGroup.setY(180);
            //this.svgGroup.setX(30);
        }
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