/*
module GraphTableSVG {
    export class OrderedOutcomingEdgesGraph extends Graph {

        constructor() {
            super();
        }


    }
    export class OrderedForest extends OrderedOutcomingEdgesGraph {
        
        
        public addVertex(vertex: Vertex) {
            super.addVertex(vertex);
            //this.outcomingEdgesDic[vertex.id] = [];
        }
        constructor() {
            super();
            //this.arrangementFunction = GraphArrangement.createStandardTreeArrangementFunction(50);
        }

        

        
        
        
    }
    export class OrderedTree extends OrderedForest {
        //_rootVertex: Vertex | null = null;

        

        constructor() {
            super();
            //this.arrangementFunction = GraphArrangement.createStandardTreeArrangementFunction(50);
        }
        get tree(): VirtualTree {
            if (this.rootVertex == null) {
                throw new Error();
            } else {
                return new VirtualTree(this, this.rootVertex);
            }
        }
        public getSubTree(node: Vertex): VirtualTree {
            return new VirtualTree(this, node);
        }
    }
}
*/