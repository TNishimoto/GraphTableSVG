module TreeFunctions {
    class TreeNode {
        private static counter: number = 0;

        children: TreeNode[] = [];
        edgeText: string = "";
        nodeText: string = "";
        parent: TreeNode | null = null;
        _id: number = TreeNode.counter++;
        get id(): number {
            return this._id;
        }

        /*
        public locus(pattern: string): TreeNode {
            if (pattern.length == 0) return this;
            var edges = this.children.map(function (x, i, arr) { return x.edgeText; });
            var i = getFirstPrefixIndex(edges, pattern);
            if (i == -1) {
                return this;
            } else {
                return this.children[i].locus(pattern.substr(1));
            }
        }
        */
        get path(): string {
            if (this.parent == null) {
                return this.edgeText;
            } else {
                return this.parent.path + this.edgeText;
            }
        }
        public addString(pattern: string): TreeNode {
            if (pattern.length == 0) return this;
            var edges = this.children.map(function (x, i, arr) { return x.edgeText; });
            var [i, isMatch] = getInsertIndex(edges, pattern[0]);
            if (!isMatch) {
                var newNode = new TreeNode();
                newNode.parent = this;
                newNode.edgeText = pattern[0];
                this.children.splice(i, 0, newNode);
            }

            return this.children[i].addString(pattern.substr(1));
        }

        public get isRoot() {
            return this.parent == null;
        }
        public get isLeaf() {
            return this.children.length == 0;
        }
        public getNodes(): TreeNode[] {
            var r: TreeNode[] = [this];
            if (this.isLeaf) {
                return r;
            } else {
                this.children.forEach(function (x, i, arr) {
                    x.getNodes().forEach(function (y, j, arr2) {
                        r.push(y);
                    });
                });
                return r;
            }
        }
        public setID() {

        }
        
    }

    export function createTrie(text: string): TreeNode {
        var root = new TreeNode();
        for (var i = 0; i < text.length; i++) {
            root.addString(text.substr(i));
        }
        return root;
    }
    function getFirstPrefixIndex(texts: string[], pattern: string): number {
        for (var i = 0; i < texts.length; i++) {
            if (texts[i].indexOf(pattern) == 0) {
                return i;
            }
        }
        return -1;
    }
    function getInsertIndex(texts: string[], pattern: string): [number, boolean] {
        for (var i = 0; i < texts.length; i++) {
            var p = StringModule.compare(pattern, texts[i]);
            if (p < 0) {

            } else if (p == 0) {
                return [i, true];
            } else {
                return [i, false];
            }
            
        }
        return [texts.length, false];
    }
    export function translate(root: TreeNode, graph: GraphTableSVG.OrderedOutcomingEdgesGraph) {
        root.getNodes().forEach(function(x, i, arr) {
            var node = translate2(x, graph);
            graph.outcomingEdgesDic[node.id] = [];
            x.children.forEach(function(y, j, arr2) {
                var child = translate2(y, graph);
                var edge = GraphTableSVG.LineEdge.create(graph, node, child);
                graph.edges.push(edge);
                graph.outcomingEdgesDic[node.id].push(edge);
            });
        });

    }
    function translate2(treeNode: TreeNode, graph: GraphTableSVG.OrderedOutcomingEdgesGraph) {
        var p = graph.nodes.filter(function(x) { x.id == treeNode.id });
        if (p.length == 0) {
            var node = GraphTableSVG.CircleVertex.create(graph);
            node.svgText.textContent = treeNode.id.toString();
            node.id = treeNode.id;
            graph.nodes.push(node);
            return node;
        } else {
            return p[0];
        }
    }

    /*
    class TreeSVG {
        root: TreeNode;
        graph: GraphTableSVG.Graph;
        nodeDic: { [key: number]: GraphTableSVG.Vertex; } = [];
        edgeDic: { [key: number]: GraphTableSVG.Edge; } = [];

        public static create(_root: TreeNode, _graph: GraphTableSVG.Graph): TreeSVG {
            var p = new TreeSVG();
            p.root = _root;
            p.graph = _graph;

            p.root.getNodes().forEach(function (x, i, arr) {
                var node = GraphTableSVG.CircleVertex.create(p.graph);
                node.svgText.textContent = x.id.toString();
                p.nodeDic[x.id] = node;

                if (!x.isRoot) {
                    var parent = p.nodeDic[x.parent.id];
                    var edge = GraphTableSVG.LineEdge.create(p.graph, parent, node);
                    p.edgeDic[x.id] = edge;
                }

            });
            return p;
        }
    }
    */

}