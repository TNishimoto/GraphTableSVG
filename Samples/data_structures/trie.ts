module TreeFunctions {
    export class TreeNode {
        private static counter: number = 0;

        children: TreeNode[] = [];
        edgeText: string = "";
        nodeText: string = "";
        parent: TreeNode | null = null;
        _id: number = TreeNode.counter++;
        get id(): number {
            return this._id;
        }
        
        get path(): string {
            if (this.parent == null) {
                return this.edgeText;
            } else {
                return this.parent.path + this.edgeText;
            }
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

        public addLeaf(insertIndex: number, str: string): TreeNode {
            var newNode = new TreeNode();
            newNode.parent = this;
            newNode.edgeText = str;
            this.children.splice(insertIndex, 0, newNode);
            return newNode;
        }
        public split(splitPosition: number): TreeNode {
            var pref = this.edgeText.substr(0, splitPosition);
            var suf = this.edgeText.substr(splitPosition);

            if (this.parent != null) {

                var newNode = new TreeNode();

                var i = this.parent.children.indexOf(this);
                this.parent.children[i] = newNode;
                newNode.children.push(this);
                this.parent = newNode;

                newNode.edgeText = pref;
                this.edgeText = suf;

                return newNode;
            } else {
                return this;
            }
        }
        public locus(pattern: string): [TreeNode, number] {
            //var matchLen = 0;
            if (pattern.length == 0) return [this, 0];

            var [matchLen, comp] = StringModule.compare(this.edgeText, pattern);
            if (matchLen == this.edgeText.length && this.edgeText.length < pattern.length) {
                var edges = this.children.map(function (x, i, arr) { return x.edgeText.charCodeAt(0); });
                var suf = pattern.substr(matchLen);
                var [i, b] = getInsertIndex(edges, suf.charCodeAt(0));
                if (b) {
                    return this.children[i].locus(suf);
                } else {
                    return [this, matchLen];
                }

            } else {
                return [this, matchLen];
            }
        }
        
    }
    /*
    class LocusResult {
        node: TreeNode;
        matchLen: number;

    }
    */
    /*
    function getFirstPrefixIndex(texts: string[], pattern: string): number {
        for (var i = 0; i < texts.length; i++) {
            if (texts[i].indexOf(pattern) == 0) {
                return i;
            }
        }
        return -1;
    }
    */
    export function addString(node: TreeNode, pattern: string): TreeNode {
        if (pattern.length == 0) return node;
        var edges = node.children.map(function (x, i, arr) { return x.edgeText.charCodeAt(0); });
        var [i, isMatch] = getInsertIndex(edges, pattern.charCodeAt(0));
        if (!isMatch) {
            node.addLeaf(i, pattern[0]);
        }

        return addString(node.children[i], pattern.substr(1));
    }

    /*
    function getInsertIndex(texts: string[], pattern: string): [number, boolean] {
        for (var i = 0; i < texts.length; i++) {
            var [matchLen, p] = StringModule.compare(pattern, texts[i]);
            if (p < 0) {

            } else if (p == 0) {
                return [i, true];
            } else {
                return [i, false];
            }
            
        }
        return [texts.length, false];
    }
    */
    export function getInsertIndex(texts: number[], pattern: number): [number, boolean] {
        for (var i = 0; i < texts.length; i++) {
            if (pattern < texts[i]) {

            } else if (pattern == texts[i]) {
                return [i, true];
            } else {
                return [i, false];
            }

        }
        return [texts.length, false];
    }
    export function translate(root: TreeNode, graph: GraphTableSVG.OrderedTree) {
        var dic: { [key: number]: GraphTableSVG.Vertex; } = [];
        root.getNodes().forEach(function(x) {
            var node = createNode(x, graph, dic);
            graph.outcomingEdgesDic[node.id] = [];
            x.children.forEach(function(y) {
                var child = createNode(y, graph, dic);
                var edge = GraphTableSVG.LineEdge.create();
                graph.connect(node, edge, child);

                edge.beginConnecterType = GraphTableSVG.ConnecterPosition.Bottom;
                edge.endConnecterType = GraphTableSVG.ConnecterPosition.Top;

                var edgeText = GraphTableSVG.EdgeText.create(graph,edge, y.edgeText);
                edge.text = edgeText;

                //graph.edges.push(edge);
                graph.outcomingEdgesDic[node.id].push(edge);
            });
        });
        graph.rootVertex = graph.getFirstNoParentVertex();
    }
    export function shrink(root: TreeNode) {
        if (root.parent != null) {
            if (root.children.length == 1) {
                var child = root.children[0];

                var i = root.parent.children.indexOf(root);
                
                root.parent.children[i] = child;
                child.parent = root.parent;
                child.edgeText = root.edgeText + child.edgeText;
                shrink(child);
            } else {
                root.children.forEach(function (x) { shrink(x) });
            }
        } else {
            root.children.forEach(function (x) { shrink(x) });
        }
    }


    function createNode(treeNode: TreeNode, graph: GraphTableSVG.OrderedOutcomingEdgesGraph, dic: { [key: number]: GraphTableSVG.Vertex; }): GraphTableSVG.Vertex {
        if (treeNode.id in dic) {
            return dic[treeNode.id];
        } else {
            var node = GraphTableSVG.CircleVertex.create(graph);
            node.svgText.textContent = treeNode.id.toString();
            //graph.nodes.push(node);
            dic[treeNode.id] = node;
            return node;

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