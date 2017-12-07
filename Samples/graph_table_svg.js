var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GraphTableSVG;
(function (GraphTableSVG) {
    var Edge = (function () {
        function Edge(_beginNode, _endNode) {
            this.beginConnecterType = GraphTableSVG.ConnecterPosition.Top;
            this.endConnecterType = GraphTableSVG.ConnecterPosition.Bottom;
            this._graph = null;
            this.text = null;
            //this._parent = graph;
            this._beginNode = _beginNode;
            this._endNode = _endNode;
        }
        Object.defineProperty(Edge.prototype, "beginNode", {
            get: function () {
                return this._beginNode;
            },
            set: function (value) {
                this._beginNode = value;
                if (this.graph != null) {
                    this.graph.update();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "endNode", {
            get: function () {
                return this._endNode;
            },
            set: function (value) {
                this._endNode = value;
                if (this.graph != null) {
                    this.graph.update();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "graph", {
            get: function () {
                return this._graph;
            },
            enumerable: true,
            configurable: true
        });
        Edge.prototype.setGraph = function (value) {
            this._graph = value;
        };
        Object.defineProperty(Edge.prototype, "x1", {
            get: function () {
                var _a = this._beginNode.getLocation(this.beginConnecterType), x1 = _a[0], y1 = _a[1];
                return x1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "y1", {
            get: function () {
                var _a = this._beginNode.getLocation(this.beginConnecterType), x1 = _a[0], y1 = _a[1];
                return y1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "x2", {
            get: function () {
                var _a = this._endNode.getLocation(this.endConnecterType), x2 = _a[0], y2 = _a[1];
                return x2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "y2", {
            get: function () {
                var _a = this._endNode.getLocation(this.endConnecterType), x2 = _a[0], y2 = _a[1];
                return y2;
            },
            enumerable: true,
            configurable: true
        });
        Edge.prototype.update = function () {
            return false;
        };
        return Edge;
    }());
    GraphTableSVG.Edge = Edge;
    var LineEdge = (function (_super) {
        __extends(LineEdge, _super);
        function LineEdge(_begin, _end, line) {
            var _this = _super.call(this, _begin, _end) || this;
            _this._svg = line;
            return _this;
            //this.graph.svgGroup.appendChild(this._svg);
        }
        Object.defineProperty(LineEdge.prototype, "svg", {
            //svgText: SVGTextElement;
            get: function () {
                return this._svg;
            },
            enumerable: true,
            configurable: true
        });
        LineEdge.prototype.setGraph = function (value) {
            _super.prototype.setGraph.call(this, value);
            if (this.graph != null) {
                this.graph.svgGroup.appendChild(this.svg);
            }
        };
        LineEdge.create = function (_parent, _begin, _end, _beginConnectType, _endConnectType) {
            if (_beginConnectType === void 0) { _beginConnectType = GraphTableSVG.ConnecterPosition.Top; }
            if (_endConnectType === void 0) { _endConnectType = GraphTableSVG.ConnecterPosition.Bottom; }
            var svg = GraphTableSVG.createLine(0, 0, 100, 100);
            var line = new LineEdge(_begin, _end, svg);
            line.beginConnecterType = _beginConnectType;
            line.endConnecterType = _endConnectType;
            _parent.addEdge(line);
            /*
            p.svgText = GraphTableSVG.createText();
            p.svgText.textContent = "hogehoge";
            p.parent.svgGroup.appendChild(p.svgText);
            */
            return line;
        };
        LineEdge.prototype.update = function () {
            this._svg.x1.baseVal.value = this.x1;
            this._svg.y1.baseVal.value = this.y1;
            this._svg.x2.baseVal.value = this.x2;
            this._svg.y2.baseVal.value = this.y2;
            if (this.text != null) {
                this.text.update();
            }
            return false;
            /*
            this.svgText.setAttribute('x', "0");
            this.svgText.setAttribute('y', "0");
            console.log(this.svgText.x.baseVal.numberOfItems);
            console.log(this.svgText.x.baseVal.getItem(0));
            */
        };
        return LineEdge;
    }(Edge));
    GraphTableSVG.LineEdge = LineEdge;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var Rectangle = (function () {
        function Rectangle() {
        }
        Object.defineProperty(Rectangle.prototype, "right", {
            get: function () {
                return this.x + this.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "bottom", {
            get: function () {
                return this.y + this.height;
            },
            enumerable: true,
            configurable: true
        });
        return Rectangle;
    }());
    GraphTableSVG.Rectangle = Rectangle;
    var NodeOrder;
    (function (NodeOrder) {
        NodeOrder[NodeOrder["Preorder"] = 0] = "Preorder";
        NodeOrder[NodeOrder["Inorder"] = 1] = "Inorder";
        NodeOrder[NodeOrder["Postorder"] = 2] = "Postorder";
    })(NodeOrder = GraphTableSVG.NodeOrder || (GraphTableSVG.NodeOrder = {}));
    var ConnecterPosition;
    (function (ConnecterPosition) {
        ConnecterPosition[ConnecterPosition["Top"] = 1] = "Top";
        ConnecterPosition[ConnecterPosition["LeftUp"] = 2] = "LeftUp";
        ConnecterPosition[ConnecterPosition["Left"] = 3] = "Left";
        ConnecterPosition[ConnecterPosition["LeftDown"] = 4] = "LeftDown";
        ConnecterPosition[ConnecterPosition["Bottom"] = 5] = "Bottom";
        ConnecterPosition[ConnecterPosition["RightDown"] = 6] = "RightDown";
        ConnecterPosition[ConnecterPosition["Right"] = 7] = "Right";
        ConnecterPosition[ConnecterPosition["RightUp"] = 8] = "RightUp";
    })(ConnecterPosition = GraphTableSVG.ConnecterPosition || (GraphTableSVG.ConnecterPosition = {}));
    var Graph = (function () {
        function Graph(svg) {
            this._nodes = new Array(0);
            this._edges = new Array(0);
            this.name = (Graph.id++).toString();
            this._svgGroup = GraphTableSVG.createGroup();
            svg.appendChild(this._svgGroup);
        }
        Object.defineProperty(Graph.prototype, "svgGroup", {
            //public arrangementFunction: (Graph) => void | null = null;
            get: function () {
                return this._svgGroup;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graph.prototype, "nodes", {
            get: function () {
                return this._nodes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graph.prototype, "edges", {
            get: function () {
                return this._edges;
            },
            enumerable: true,
            configurable: true
        });
        Graph.prototype.addVertex = function (vertex) {
            this.svgGroup.appendChild(vertex.svgGroup);
            vertex.setGraph(this);
            this._nodes.push(vertex);
        };
        Graph.prototype.addEdge = function (edge) {
            edge.setGraph(this);
            this._edges.push(edge);
        };
        /*
        relocation(): void {
            this.arrangementFunction(this);
        }
        resize() : void {

        }
        */
        Graph.prototype.updateNodes = function () {
            this._nodes.forEach(function (x) { x.update(); });
        };
        Graph.prototype.updateEdges = function () {
            this._edges.forEach(function (x) { x.update(); });
        };
        Graph.prototype.update = function () {
            this.updateNodes();
            this.updateEdges();
        };
        /*
        clear(svg: HTMLElement) {
            this._nodes.forEach(function (x) { x.setGraph(null) });
            this._edges.forEach(function (x) { x.setGraph(null) });
            this._nodes = [];
            this._edges = [];
        }
        */
        Graph.prototype.removeGraph = function (svg) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        };
        /*
        public static create(svg: HTMLElement): Graph {
            //var g = GraphTableSVG.createGroup();
            var graph = new Graph();
            //graph.svgGroup = g;
        }
        */
        Graph.prototype.getRegion = function () {
            var rect = GraphTableSVG.Vertex.getRegion(this._nodes);
            rect.x += this.svgGroup.getX();
            rect.y += this.svgGroup.getY();
            return rect;
        };
        Graph.prototype.getObjectBySVGID = function (id) {
            for (var i = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].containsSVGID(id)) {
                    return this.nodes[i];
                }
            }
            return null;
        };
        return Graph;
    }());
    Graph.id = 0;
    GraphTableSVG.Graph = Graph;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GraphArrangement;
    (function (GraphArrangement) {
        /*
        export function relocate(graph: OrderedOutcomingEdgesGraph, root: Vertex, width: number, height: number) {

        }
        function getSubtreeSize(graph: OrderedOutcomingEdgesGraph, subtreeRoot: Vertex): number {
            var children = graph.outcomingEdgesDic[subtreeRoot.id];
            if (children.length == 0) {
                return 1;
            } else {
                var width = 0;
                children.forEach(function (x, i, arr) {
                    width += getSubtreeSize(graph, x.endNode);
                });
                return width;
            }
        }

        

        function locate(graph: OrderedOutcomingEdgesGraph, root: Vertex, width: number, height: number) {

        }
        */
        /*
        export function standardLocateSub(tree: VirtualTree, y: number = 0, edgeLength: number): void {
            tree.root.x = 0;
            tree.root.y = y;
            var leaves = 0;
            var edges = tree.getChildren();

            var centerIndex = Math.floor(edges.length / 2) - 1;
            var IsEven = edges.length % 2 == 0;
            for (var i = 0; i < edges.length; i++) {
                var next = edges[i];
                if (next != null) {
                    standardLocateSub(next, tree.root.y + edgeLength, edgeLength);
                    next.addOffset(leaves * edgeLength, 0);
                    var rect = next.getTreeRegion();
                    leaves += rect.width;
                    if (IsEven && i == centerIndex) {
                        leaves += 1;
                    }
                }
            }
            tree.root.x = Math.floor(leaves * edgeLength / 2);
            console.log(tree.root.id + "/" + tree.root.x);

        }
        */
        function standardTreeArrangement(graph, edgeLength) {
            if (graph.rootVertex != null) {
                var rootTree = graph.tree;
                var _a = [rootTree.root.x, rootTree.root.y], x = _a[0], y = _a[1];
                standardTreeArrangementSub(rootTree, edgeLength);
                rootTree.setRootLocation(x, y);
                graph.update();
            }
        }
        GraphArrangement.standardTreeArrangement = standardTreeArrangement;
        function standardTreeArrangementSub(tree, edgeLength) {
            tree.root.x = 0;
            tree.root.y = 0;
            var leaves = 0;
            var edges = tree.getChildren();
            var leaveSize = tree.getLeaves().length;
            var leaveSizeWidthHalf = (leaveSize * edgeLength) / 2;
            var __x = -leaveSizeWidthHalf;
            for (var i = 0; i < edges.length; i++) {
                standardTreeArrangementSub(edges[i], edgeLength);
                var w = (edges[i].getLeaves().length * edgeLength) / 2;
                edges[i].setRootLocation(__x + w, edgeLength);
                __x += edges[i].getLeaves().length * edgeLength;
            }
        }
    })(GraphArrangement = GraphTableSVG.GraphArrangement || (GraphTableSVG.GraphArrangement = {}));
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var EdgeText = (function () {
        function EdgeText() {
        }
        Object.defineProperty(EdgeText.prototype, "x", {
            //private isReverse: boolean = false;
            get: function () {
                return this.svg.getX();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EdgeText.prototype, "y", {
            get: function () {
                return this.svg.getY();
            },
            enumerable: true,
            configurable: true
        });
        EdgeText.prototype.getCenterPosition = function () {
            var x = (this.parentEdge.x1 + this.parentEdge.x2) / 2;
            var y = (this.parentEdge.y1 + this.parentEdge.y2) / 2;
            return [x, y];
        };
        EdgeText.create = function (graph, edge, text) {
            var p = new EdgeText();
            p.svg = GraphTableSVG.createText();
            p.svg.textContent = text;
            graph.svgGroup.appendChild(p.svg);
            p.parentEdge = edge;
            edge.text = p;
            return p;
        };
        EdgeText.prototype.update = function () {
            var _a = this.getCenterPosition(), x = _a[0], y = _a[1];
            this.svg.setX(x);
            this.svg.setY(y);
            var _b = [this.parentEdge.x1, this.parentEdge.y1], x1 = _b[0], y1 = _b[1];
            var _c = [this.parentEdge.x2, this.parentEdge.y2], x2 = _c[0], y2 = _c[1];
            var rad = Math.atan2(y2 - y1, x2 - x1);
            var rar = rad * (180 / Math.PI);
            if (rar > 90) {
                rar = rar - 180;
                this.svg.textContent = EdgeText.reverse(this.svg.textContent);
            }
            this.svg.setAttribute('transform', "rotate(" + rar + ", " + this.svg.getX() + ", " + this.svg.getY() + ")");
        };
        EdgeText.reverse = function (str) {
            var rv = [];
            for (var i = 0, n = str.length; i < n; i++) {
                rv[i] = str.charAt(n - i - 1);
            }
            return rv.join("");
        };
        return EdgeText;
    }());
    GraphTableSVG.EdgeText = EdgeText;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var OrderedOutcomingEdgesGraph = (function (_super) {
        __extends(OrderedOutcomingEdgesGraph, _super);
        function OrderedOutcomingEdgesGraph(svg) {
            var _this = _super.call(this, svg) || this;
            _this._outcomingEdgesDic = [];
            return _this;
        }
        Object.defineProperty(OrderedOutcomingEdgesGraph.prototype, "outcomingEdgesDic", {
            //parentEdgeDic: { [key: number]: Edge; } = [];
            get: function () {
                return this._outcomingEdgesDic;
            },
            enumerable: true,
            configurable: true
        });
        return OrderedOutcomingEdgesGraph;
    }(GraphTableSVG.Graph));
    GraphTableSVG.OrderedOutcomingEdgesGraph = OrderedOutcomingEdgesGraph;
    var OrderedForest = (function (_super) {
        __extends(OrderedForest, _super);
        function OrderedForest(svg) {
            var _this = _super.call(this, svg) || this;
            _this.roots = [];
            return _this;
            //this.arrangementFunction = GraphArrangement.createStandardTreeArrangementFunction(50);
        }
        return OrderedForest;
    }(OrderedOutcomingEdgesGraph));
    GraphTableSVG.OrderedForest = OrderedForest;
    var OrderedTree = (function (_super) {
        __extends(OrderedTree, _super);
        function OrderedTree(svg) {
            var _this = _super.call(this, svg) || this;
            _this.rootVertex = null;
            return _this;
            //this.arrangementFunction = GraphArrangement.createStandardTreeArrangementFunction(50);
        }
        Object.defineProperty(OrderedTree.prototype, "tree", {
            get: function () {
                return new GraphTableSVG.VirtualTree(this, this.rootVertex);
            },
            enumerable: true,
            configurable: true
        });
        OrderedTree.prototype.getFirstNoParentVertex = function () {
            var p = this;
            var r = this.nodes.filter(function (x) {
                return p.getParentEdge(x) == null;
            });
            return r[0];
        };
        OrderedTree.prototype.getParentEdge = function (node) {
            for (var i = 0; i < this.edges.length; i++) {
                if (this.edges[i].endNode.id == node.id) {
                    return this.edges[i];
                }
            }
            return null;
        };
        OrderedTree.prototype.getSubTree = function (node) {
            return new GraphTableSVG.VirtualTree(this, node);
        };
        return OrderedTree;
    }(OrderedOutcomingEdgesGraph));
    GraphTableSVG.OrderedTree = OrderedTree;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var Vertex = (function () {
        function Vertex(group) {
            this._id = Vertex.id_counter++;
            this.svgGroup = group;
            this._observer = new MutationObserver(this.createObserveFunction());
            var option = { attributes: true };
            this._observer.observe(this.svgGroup, option);
            /*
            this.parent = parent;

            this.parent.svgGroup.appendChild(this.svgGroup);
            */
        }
        Vertex.prototype.createObserveFunction = function () {
            var th = this;
            var ret = function (x) {
                for (var i = 0; i < x.length; i++) {
                    var p = x[i];
                    if (p.attributeName == "transform") {
                        if (th.graph != null) {
                            th.graph.update();
                        }
                    }
                }
            };
            return ret;
        };
        ;
        Object.defineProperty(Vertex.prototype, "graph", {
            get: function () {
                return this._graph;
            },
            enumerable: true,
            configurable: true
        });
        Vertex.prototype.setGraph = function (value) {
            if (value == null) {
                this._graph.svgGroup.removeChild(this.svgGroup);
            }
            this._graph = value;
            this.svgGroup.id = this.graph.name + "_" + this.id + "_group";
        };
        Object.defineProperty(Vertex.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "x", {
            get: function () {
                return this.svgGroup.getX();
            },
            set: function (value) {
                if (this.svgGroup.getX() != value) {
                    this.svgGroup.setX(value);
                }
                /*
                if (this.graph != null) {
                    this.graph.update();
                }
                */
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "y", {
            get: function () {
                return this.svgGroup.getY();
            },
            set: function (value) {
                if (this.svgGroup.getY() != value) {
                    this.svgGroup.setY(value);
                }
                /*
                if (this.graph != null) {
                    this.graph.update();
                }
                */
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "width", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "height", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Vertex.prototype.getLocation = function (type) {
            return [this.x, this.y];
        };
        Vertex.prototype.update = function () {
            return false;
        };
        Object.defineProperty(Vertex.prototype, "region", {
            get: function () {
                var p = new GraphTableSVG.Rectangle();
                p.x = this.x - (this.width / 2);
                p.y = this.y - (this.height / 2);
                p.width = this.width;
                p.height = this.height;
                return p;
            },
            enumerable: true,
            configurable: true
        });
        Vertex.getRegion = function (vertexes) {
            //var p = this.getSubtree();
            if (vertexes.length > 0) {
                var fstVertex = vertexes[0];
                var minX = fstVertex.x;
                var maxX = fstVertex.x;
                var minY = fstVertex.y;
                var maxY = fstVertex.y;
                vertexes.forEach(function (x, i, arr) {
                    var rect = x.region;
                    if (minX > rect.x)
                        minX = rect.x;
                    if (maxX < rect.right)
                        maxX = rect.right;
                    if (minY > rect.y)
                        minY = rect.y;
                    if (maxY < rect.bottom)
                        maxY = rect.bottom;
                });
                var result = new GraphTableSVG.Rectangle();
                result.x = minX;
                result.y = minY;
                result.width = maxX - minX;
                result.height = maxY - minY;
                return result;
            }
            else {
                return new GraphTableSVG.Rectangle();
            }
        };
        Vertex.prototype.containsSVGID = function (id) {
            return this.svgGroup.id == id;
        };
        Object.defineProperty(Vertex.prototype, "surface", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Vertex.prototype.getParents = function () {
            var _this = this;
            return this.graph.edges.filter(function (v) { return v.endNode == _this; }).map(function (v) { return v.beginNode; });
        };
        Vertex.prototype.getParent = function () {
            var r = this.getParents();
            if (r.length == 0) {
                return null;
            }
            else {
                return r[0];
            }
        };
        Object.defineProperty(Vertex.prototype, "isRoot", {
            get: function () {
                return this.getParent() == null;
            },
            enumerable: true,
            configurable: true
        });
        Vertex.prototype.getChildren = function () {
            if (this.graph instanceof GraphTableSVG.OrderedOutcomingEdgesGraph) {
                return this.graph.outcomingEdgesDic[this.id];
            }
            else {
                return [];
            }
        };
        Object.defineProperty(Vertex.prototype, "root", {
            /*
            successor(order: NodeOrder): Vertex | null {
                if (order == NodeOrder.Preorder) {
    
                } else {
                    return null;
                }
            }
            */
            get: function () {
                var p = this;
                while (p.getParent() != null) {
                    p = p.getParent();
                }
                return p;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "index", {
            get: function () {
                if (this.graph instanceof GraphTableSVG.OrderedForest) {
                    if (this.isRoot) {
                        return this.graph.roots.indexOf(this);
                    }
                    else {
                        return -1;
                    }
                }
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        return Vertex;
    }());
    Vertex.id_counter = 0;
    GraphTableSVG.Vertex = Vertex;
    var CircleVertex = (function (_super) {
        __extends(CircleVertex, _super);
        function CircleVertex(group, circle, text) {
            var _this = _super.call(this, group) || this;
            _this.svgCircle = circle;
            _this.svgText = text;
            _this.svgGroup.appendChild(_this.svgCircle);
            _this.svgGroup.appendChild(_this.svgText);
            return _this;
        }
        CircleVertex.prototype.setGraph = function (value) {
            _super.prototype.setGraph.call(this, value);
            if (this.graph != null) {
                this.svgCircle.id = this.graph.name + "_" + this.id + "_circle";
                this.svgText.id = this.graph.name + "_" + this.id + "_text";
            }
        };
        Object.defineProperty(CircleVertex.prototype, "width", {
            get: function () {
                return this.svgCircle.r.baseVal.value * 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CircleVertex.prototype, "height", {
            get: function () {
                return this.svgCircle.r.baseVal.value * 2;
            },
            enumerable: true,
            configurable: true
        });
        CircleVertex.create = function (_parent, x, y, r, circleClassName) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (r === void 0) { r = 20; }
            if (circleClassName === void 0) { circleClassName = null; }
            var circle = GraphTableSVG.createCircle(r, circleClassName);
            var text = GraphTableSVG.createText();
            var group = GraphTableSVG.createGroup();
            var p = new CircleVertex(group, circle, text);
            p.x = x;
            p.y = y;
            _parent.addVertex(p);
            return p;
        };
        Object.defineProperty(CircleVertex.prototype, "radius", {
            get: function () {
                return this.svgCircle.r.baseVal.value;
            },
            enumerable: true,
            configurable: true
        });
        CircleVertex.prototype.getLocation = function (type) {
            var r = (Math.sqrt(2) / 2) * this.radius;
            switch (type) {
                case GraphTableSVG.ConnecterPosition.Top:
                    return [this.x, this.y - this.radius];
                case GraphTableSVG.ConnecterPosition.RightUp:
                    return [this.x + r, this.y - r];
                case GraphTableSVG.ConnecterPosition.Right:
                    return [this.x + this.radius, this.y];
                case GraphTableSVG.ConnecterPosition.RightDown:
                    return [this.x + r, this.y + r];
                case GraphTableSVG.ConnecterPosition.Bottom:
                    return [this.x, this.y + this.radius];
                case GraphTableSVG.ConnecterPosition.LeftDown:
                    return [this.x - r, this.y + r];
                case GraphTableSVG.ConnecterPosition.Left:
                    return [this.x - this.radius, this.y];
                case GraphTableSVG.ConnecterPosition.LeftUp:
                    return [this.x - r, this.y - r];
                default:
                    return [this.x, this.y];
            }
        };
        Object.defineProperty(CircleVertex.prototype, "surface", {
            get: function () {
                return this.svgCircle;
            },
            enumerable: true,
            configurable: true
        });
        CircleVertex.prototype.containsSVGID = function (id) {
            var b = this.svgCircle.id == id || this.svgText.id == id;
            return _super.prototype.containsSVGID.call(this, id) || b;
        };
        return CircleVertex;
    }(Vertex));
    GraphTableSVG.CircleVertex = CircleVertex;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var VirtualTree = (function () {
        function VirtualTree(_graph, _root) {
            this.graph = _graph;
            this.root = _root;
        }
        VirtualTree.prototype.getChildren = function () {
            var p = this;
            return this.graph.outcomingEdgesDic[this.root.id].map(function (x, i, arr) {
                return new VirtualTree(p.graph, x.endNode);
            });
        };
        Object.defineProperty(VirtualTree.prototype, "parentEdge", {
            get: function () {
                return this.graph.getParentEdge(this.root);
            },
            enumerable: true,
            configurable: true
        });
        VirtualTree.prototype.getSubtree = function (result) {
            if (result === void 0) { result = []; }
            var p = this;
            result.push(this.root);
            var children = this.getChildren();
            if (children.length == 0) {
                return result;
            }
            else {
                var width = 0;
                children.forEach(function (x, i, arr) {
                    x.getSubtree(result);
                });
                return result;
            }
        };
        VirtualTree.prototype.getLeaves = function () {
            var p = this;
            return this.getSubtree().filter(function (x, i, arr) {
                return p.graph.outcomingEdgesDic[x.id].length == 0;
            });
        };
        VirtualTree.prototype.getHeight = function () {
            var children = this.getChildren();
            if (children.length == 0) {
                return 1;
            }
            else {
                var max = 0;
                children.forEach(function (x, i, arr) {
                    if (max < x.getHeight())
                        max = x.getHeight();
                });
                return max + 1;
            }
        };
        VirtualTree.prototype.region = function () {
            var p = this.getSubtree();
            var minX = this.root.x;
            var maxX = this.root.x;
            var minY = this.root.y;
            var maxY = this.root.y;
            p.forEach(function (x, i, arr) {
                var rect = x.region;
                if (minX > rect.x)
                    minX = rect.x;
                if (maxX < rect.right)
                    maxX = rect.right;
                if (minY > rect.y)
                    minY = rect.y;
                if (maxY < rect.bottom)
                    maxY = rect.bottom;
            });
            var result = new GraphTableSVG.Rectangle();
            result.x = minX;
            result.y = minY;
            result.width = maxX - minX;
            result.height = maxY - minY;
            return result;
        };
        VirtualTree.prototype.getMostLeftLeave = function () {
            var children = this.getChildren();
            if (children.length == 0) {
                return this;
            }
            else {
                return children[0].getMostLeftLeave();
            }
        };
        VirtualTree.prototype.addOffset = function (_x, _y) {
            this.getSubtree().forEach(function (x, i, arr) {
                x.x += _x;
                x.y += _y;
            });
        };
        VirtualTree.prototype.setRectangleLocation = function (_x, _y) {
            var x = this.getMostLeftLeave().root.region.x;
            var y = this.root.region.y;
            var diffX = _x - x;
            var diffY = _y - y;
            this.addOffset(diffX, diffY);
            this.graph.updateEdges();
        };
        VirtualTree.prototype.setRootLocation = function (_x, _y) {
            var x = this.root.x;
            var y = this.root.y;
            var diffX = _x - x;
            var diffY = _y - y;
            this.addOffset(diffX, diffY);
            this.graph.updateEdges();
        };
        return VirtualTree;
    }());
    GraphTableSVG.VirtualTree = VirtualTree;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var Padding = (function () {
        function Padding() {
            this.top = 0;
            this.left = 0;
            this.right = 0;
            this.bottom = 0;
        }
        return Padding;
    }());
    GraphTableSVG.Padding = Padding;
    /*
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    enum VerticalAnchor {
        msoAnchorBottom, msoAnchorMiddle, msoAnchorTop
    }
    */
    var Cell = (function () {
        function Cell(parent, _px, _py, _rect, _text) {
            this.padding = new Padding();
            this.cellX = _px;
            this.cellY = _py;
            this.parent = parent;
            this.masterID = this.ID;
            this.svgBackground = _rect;
            this.parent.group.appendChild(this.svgBackground);
            this.svgText = _text;
            this.parent.group.appendChild(this.svgText);
        }
        Object.defineProperty(Cell.prototype, "logicalWidth", {
            //verticalAnchor: VerticalAnchor = VerticalAnchor.msoAnchorTop;
            get: function () {
                if (this.isMaster) {
                    var w = 0;
                    var now = this;
                    while (now != null && this.ID == now.masterID) {
                        now = this.rightCell;
                        w++;
                    }
                    return w;
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "logicalHeight", {
            get: function () {
                if (this.isMaster) {
                    var h = 0;
                    var now = this;
                    while (now != null && this.ID == now.masterID) {
                        now = this.bottomCell;
                        h++;
                    }
                    return h;
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "textBoxWidth", {
            get: function () {
                return this.svgText.getBoundingClientRect().width + this.padding.left + this.padding.right;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "textBoxHeight", {
            get: function () {
                return this.svgText.getBoundingClientRect().height + this.padding.top + this.padding.bottom;
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.resize = function () {
            if (this.svgBackground.width.baseVal.value < this.textBoxWidth) {
                this.svgBackground.width.baseVal.value = this.textBoxWidth;
            }
            if (this.svgBackground.height.baseVal.value < this.textBoxHeight) {
                this.svgBackground.height.baseVal.value = this.textBoxHeight;
            }
        };
        Cell.prototype.relocation = function () {
            this.upLine.x1.baseVal.value = this.svgBackground.x.baseVal.value;
            this.upLine.x2.baseVal.value = this.svgBackground.x.baseVal.value + this.svgBackground.width.baseVal.value;
            this.upLine.y1.baseVal.value = this.svgBackground.y.baseVal.value;
            this.upLine.y2.baseVal.value = this.upLine.y1.baseVal.value;
            this.leftLine.x1.baseVal.value = this.svgBackground.x.baseVal.value;
            this.leftLine.x2.baseVal.value = this.leftLine.x1.baseVal.value;
            this.leftLine.y1.baseVal.value = this.svgBackground.y.baseVal.value;
            this.leftLine.y2.baseVal.value = this.svgBackground.y.baseVal.value + this.svgBackground.height.baseVal.value;
            this.rightLine.x1.baseVal.value = this.svgBackground.x.baseVal.value + this.svgBackground.width.baseVal.value;
            this.rightLine.x2.baseVal.value = this.rightLine.x1.baseVal.value;
            this.rightLine.y1.baseVal.value = this.svgBackground.y.baseVal.value;
            this.rightLine.y2.baseVal.value = this.svgBackground.y.baseVal.value + this.svgBackground.height.baseVal.value;
            this.bottomLine.x1.baseVal.value = this.svgBackground.x.baseVal.value;
            this.bottomLine.x2.baseVal.value = this.svgBackground.x.baseVal.value + this.svgBackground.width.baseVal.value;
            this.bottomLine.y1.baseVal.value = this.svgBackground.y.baseVal.value + this.svgBackground.height.baseVal.value;
            this.bottomLine.y2.baseVal.value = this.bottomLine.y1.baseVal.value;
            //this.textSVG.x.baseVal.getItem(0).value = 0;
            var text_x = this.svgBackground.x.baseVal.value;
            var text_y = this.svgBackground.y.baseVal.value;
            if (this.svgText.style.textAnchor == "middle") {
                text_x += (this.textBoxWidth / 2);
                text_y += (this.textBoxHeight / 2);
            }
            else if (this.svgText.style.textAnchor == "left") {
                text_x += this.padding.left;
                text_y += this.padding.top;
            }
            else {
            }
            this.svgText.setAttribute('x', text_x.toString());
            this.svgText.setAttribute('y', text_y.toString());
        };
        Object.defineProperty(Cell.prototype, "isMaster", {
            get: function () {
                return this.ID == this.masterID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "isSlave", {
            get: function () {
                return !this.isMaster;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "ID", {
            get: function () {
                return this.cellX + (this.cellY * this.parent.width);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "upCell", {
            get: function () {
                return this.cellY != 0 ? this.parent.cells[this.cellY - 1][this.cellX] : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "leftCell", {
            get: function () {
                return this.cellX != 0 ? this.parent.cells[this.cellY][this.cellX - 1] : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "rightCell", {
            get: function () {
                return this.cellX + 1 != this.parent.width ? this.parent.cells[this.cellY][this.cellX + 1] : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "bottomCell", {
            get: function () {
                return this.cellY + 1 != this.parent.height ? this.parent.cells[this.cellY + 1][this.cellX] : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "upperGroupCells", {
            get: function () {
                if (this.isMaster) {
                    var w = [];
                    var now = this;
                    while (now != null && this.ID == now.masterID) {
                        w.push(now);
                        now = this.rightCell;
                    }
                    return w;
                }
                else {
                    return [];
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "leftGroupCells", {
            get: function () {
                if (this.isMaster) {
                    var w = [];
                    var now = this;
                    while (now != null && this.ID == now.masterID) {
                        w.push(now);
                        now = this.bottomCell;
                    }
                    return w;
                }
                else {
                    return [];
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "leftBottomGroupCell", {
            get: function () {
                if (this.isMaster) {
                    return this.parent.cells[this.cellY + this.logicalHeight - 1][this.cellX];
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "rightUpGroupCell", {
            get: function () {
                if (this.isMaster) {
                    return this.parent.cells[this.cellY][this.cellX + this.logicalWidth - 1];
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "bottomGroupCells", {
            get: function () {
                if (this.isMaster) {
                    var w = [];
                    var now = this.leftBottomGroupCell;
                    while (now != null && this.ID == now.masterID) {
                        w.push(now);
                        now = this.rightCell;
                    }
                    return w;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "rightGroupCells", {
            get: function () {
                if (this.isMaster) {
                    var w = [];
                    var now = this.rightUpGroupCell;
                    while (now != null && this.ID == now.masterID) {
                        w.push(now);
                        now = this.bottomCell;
                    }
                    return w;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "upVirtualCells", {
            get: function () {
                if (this.isMaster && this.cellY != 0) {
                    var upperGroupCells = this.upperGroupCells;
                    var r1 = upperGroupCells.map(function (x, i, self) {
                        return upperGroupCells[i].upCell;
                    });
                    var r2 = r1.filter(function (x, i, self) {
                        return r1.indexOf(x) === i;
                    });
                    return r2;
                }
                else {
                    return [];
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "x", {
            get: function () {
                return this.svgBackground.x.baseVal.value;
            },
            set: function (value) {
                this.svgBackground.x.baseVal.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "y", {
            get: function () {
                return this.svgBackground.y.baseVal.value;
            },
            set: function (value) {
                this.svgBackground.y.baseVal.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "width", {
            get: function () {
                return this.svgBackground.width.baseVal.value;
            },
            set: function (value) {
                this.svgBackground.width.baseVal.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "height", {
            get: function () {
                return this.svgBackground.height.baseVal.value;
            },
            set: function (value) {
                this.svgBackground.height.baseVal.value = value;
            },
            enumerable: true,
            configurable: true
        });
        return Cell;
    }());
    GraphTableSVG.Cell = Cell;
})(GraphTableSVG || (GraphTableSVG = {}));
SVGGElement.prototype.getX = function () {
    var p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttributeNS(null, 'transform', "translate(0,0)");
    }
    return p.transform.baseVal.getItem(0).matrix.e;
};
SVGGElement.prototype.setX = function (value) {
    var p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttributeNS(null, 'transform', "translate(0,0)");
    }
    return this.transform.baseVal.getItem(0).matrix.e = value;
};
SVGGElement.prototype.getY = function () {
    var p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttributeNS(null, 'transform', "translate(0,0)");
    }
    return this.transform.baseVal.getItem(0).matrix.f;
};
SVGGElement.prototype.setY = function (value) {
    var p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttributeNS(null, 'transform', "translate(0,0)");
    }
    return this.transform.baseVal.getItem(0).matrix.f = value;
};
SVGTextElement.prototype.getX = function () {
    var p = this;
    if (p.x.baseVal.numberOfItems == 0) {
        p.setAttribute('x', "0");
    }
    return p.x.baseVal.getItem(0).value;
};
SVGTextElement.prototype.setX = function (value) {
    var p = this;
    if (p.x.baseVal.numberOfItems == 0) {
        p.setAttribute('x', "0");
    }
    return p.x.baseVal.getItem(0).value = value;
};
SVGTextElement.prototype.getY = function () {
    var p = this;
    if (p.y.baseVal.numberOfItems == 0) {
        p.setAttribute('y', "0");
    }
    return p.y.baseVal.getItem(0).value;
};
SVGTextElement.prototype.setY = function (value) {
    var p = this;
    if (p.y.baseVal.numberOfItems == 0) {
        p.setAttribute('y', "0");
    }
    return p.y.baseVal.getItem(0).value = value;
};
var GraphTableSVG;
(function (GraphTableSVG) {
    var SVGToVBA = (function () {
        function SVGToVBA() {
        }
        SVGToVBA.createTable = function (table) {
            var lines = new Array(0);
            lines.push("Sub createMyTable()");
            lines.push(" Dim createdSlide As slide");
            lines.push(" Set createdSlide = ActivePresentation.Slides.Add(1, ppLayoutBlank)");
            var _a = table.createVBAMainCode("createdSlide"), main = _a[0], sub = _a[1];
            lines.push(main);
            lines.push("MsgBox \"created\"");
            lines.push("End Sub");
            lines.push(sub);
            lines.push(SVGToVBA.cellFunctionCode);
            return VBATranslateFunctions.joinLines(lines);
        };
        return SVGToVBA;
    }());
    SVGToVBA.cellFunctionCode = "\nSub EditTable(table_ As table, cellInfo_() As Variant)\n    Dim x As Integer\n    Dim y As Integer\n    \n    For x = 1 To UBound(cellInfo_, 1)\n        For y = 1 To UBound(cellInfo_, 2)\n         Call EditCell(table_.cell(x, y), CStr(cellInfo_(x, y)(0)))\n        Next\n    Next\nEnd Sub\n\nSub EditCell(cell_ As cell, text_ As String, backColor As Variant)\n    cell_.Shape.TextFrame.TextRange.text = text_\n    cell_.Shape.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))\nEnd Sub\nSub EditCellFont(frame_ As TextFrame, fontSize As Double, fontName As String, color As Variant)\n    frame_.TextRange.Font.Size = fontSize\n    frame_.TextRange.Font.name = fontName\n    frame_.TextRange.Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))\nEnd Sub\n\n\n\n\nSub EditRow(row_ As Row, height As Integer)\n    row_.height = height\nEnd Sub\nSub EditColumn(column_ As Column, width As Integer)\n    column_.width = width\nEnd Sub\n\nSub EditCellTextFrame(frame_ As TextFrame, marginTop As Double, marginBottom As Double, marginLeft As Double, marginRight As Double)\n    frame_.marginLeft = marginLeft\n    frame_.marginRight = marginRight\n    frame_.marginTop = marginTop\n    frame_.marginBottom = marginBottom\nEnd Sub\n\nSub EditTextRange(range_ As TextRange, text As String, subBeg As Integer, subLen As Integer, color As Variant)\n    range_.text = text\n    range_.Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))\n    If subLen > 0 Then\n    range_.Characters(subBeg, subLen).Font.Subscript = True\n    End If\nEnd Sub\n\nSub EditShape(shape_ As Shape, name As String, visible As Integer, backColor As Variant)\n    shape_.name = name\n    shape_.Fill.visible = visible\n    shape_.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))\nEnd Sub\nSub EditCellBorder(line_ As LineFormat, foreColor As Variant, weight As Integer, transparent As Double)\n    line_.foreColor.RGB = RGB(CInt(foreColor(0)), CInt(foreColor(1)), CInt(foreColor(2)))\n    line_.weight = weight\n    line_.Transparency = transparent\nEnd Sub\n\n";
    GraphTableSVG.SVGToVBA = SVGToVBA;
    function parseInteger(value) {
        if (value == "") {
            return 1;
        }
        else {
            return parseInt(value);
        }
    }
    GraphTableSVG.parseInteger = parseInteger;
    function visible(value) {
        if (value == "hidden") {
            return 1.0;
        }
        else {
            return 0;
        }
    }
    GraphTableSVG.visible = visible;
    var VBATranslateFunctions = (function () {
        function VBATranslateFunctions() {
        }
        VBATranslateFunctions.createStringFunction = function (item) {
            return item.length == 0 ? "\"\"" : "\"" + item + "\"";
        };
        VBATranslateFunctions.createArrayFunction = function (items) {
            var s = "";
            for (var i = 0; i < items.length; i++) {
                s += items[i];
                if (i + 1 != items.length) {
                    s += ", ";
                }
            }
            return "Array(" + s + ")";
        };
        VBATranslateFunctions.createStringArrayFunction = function (items) {
            var s = "";
            for (var i = 0; i < items.length; i++) {
                s += "\"" + items[i] + "\"";
                if (i + 1 != items.length) {
                    s += ", ";
                }
            }
            return "Array(" + s + ")";
        };
        VBATranslateFunctions.createJagArrayFunction = function (items) {
            var s = "";
            for (var i = 0; i < items.length; i++) {
                s += VBATranslateFunctions.createArrayFunction(items[i]);
                if (i + 1 != items.length)
                    s += ", ";
            }
            return "Array(" + s + ")";
        };
        VBATranslateFunctions.joinLines = function (lines) {
            var s = "";
            for (var i = 0; i < lines.length; i++) {
                s += lines[i];
                if (i + 1 != lines.length)
                    s += "\n";
            }
            return s;
        };
        VBATranslateFunctions.colorToVBA = function (color) {
            if (color.indexOf("rgb") != -1) {
                return color.replace("rgb", "Array");
            }
            else {
                if (color == "black") {
                    return VBATranslateFunctions.colorToVBA("rgb(0,0,0)");
                }
                else {
                    return VBATranslateFunctions.colorToVBA("rgb(0,255,0)");
                }
            }
        };
        return VBATranslateFunctions;
    }());
    GraphTableSVG.VBATranslateFunctions = VBATranslateFunctions;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var Row = (function () {
        function Row(_table, _y) {
            this.table = _table;
            this.y = _y;
        }
        Row.prototype.getMaxHeight = function () {
            var height = 0;
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                if (height < cell.textBoxHeight)
                    height = cell.textBoxHeight;
                if (height < cell.svgBackground.height.baseVal.value)
                    height = cell.svgBackground.height.baseVal.value;
            }
            return height;
        };
        Row.prototype.setHeight = function (height) {
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                cell.svgBackground.height.baseVal.value = height;
            }
        };
        Row.prototype.resize = function () {
            this.setHeight(this.getMaxHeight());
        };
        Row.prototype.setY = function (posY) {
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                cell.svgBackground.y.baseVal.value = posY;
            }
        };
        Object.defineProperty(Row.prototype, "height", {
            get: function () {
                return this.getMaxHeight();
            },
            set: function (value) {
                for (var x = 0; x < this.table.width; x++) {
                    var cell = this.table.cells[this.y][x];
                    cell.svgBackground.height.baseVal.value = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        return Row;
    }());
    GraphTableSVG.Row = Row;
    var Column = (function () {
        function Column(_table, _x) {
            this.table = _table;
            this.x = _x;
        }
        Column.prototype.getMaxWidth = function () {
            var width = 0;
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.x];
                if (width < cell.textBoxWidth)
                    width = cell.textBoxWidth;
                if (width < cell.svgBackground.width.baseVal.value)
                    width = cell.svgBackground.width.baseVal.value;
            }
            return width;
        };
        Column.prototype.setWidth = function (width) {
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.x];
                cell.svgBackground.width.baseVal.value = width;
            }
        };
        Column.prototype.resize = function () {
            this.setWidth(this.getMaxWidth());
        };
        Column.prototype.setX = function (posX) {
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.x];
                cell.svgBackground.x.baseVal.value = posX;
            }
        };
        Object.defineProperty(Column.prototype, "width", {
            get: function () {
                return this.getMaxWidth();
            },
            set: function (value) {
                this.setWidth(value);
            },
            enumerable: true,
            configurable: true
        });
        return Column;
    }());
    GraphTableSVG.Column = Column;
    var SVGTable = (function () {
        function SVGTable(_svg, width, height) {
            this.svg = _svg;
            this._cells = new Array(height);
            var svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            this.group = svgGroup;
            svgGroup.setAttributeNS(null, 'transform', "translate(160,0)");
            this.svg.appendChild(this.group);
            //this.verticalLines = new Array(width + 1);
            //this.horizontalLines = new Array(height + 1);
            for (var y = 0; y < height; y++) {
                this.cells[y] = new Array(width);
                for (var x = 0; x < width; x++) {
                    this.cells[y][x] = new GraphTableSVG.Cell(this, x, y, GraphTableSVG.createRectangle(), GraphTableSVG.createText());
                }
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    this.setLine(this.cells[y][x]);
                }
            }
            this.resize();
        }
        Object.defineProperty(SVGTable.prototype, "cells", {
            get: function () {
                return this._cells;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SVGTable.prototype, "width", {
            get: function () {
                return this.cells[0].length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SVGTable.prototype, "height", {
            get: function () {
                return this.cells.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SVGTable.prototype, "rows", {
            get: function () {
                var arr = new Array(0);
                for (var y = 0; y < this.height; y++) {
                    arr.push(new Row(this, y));
                }
                return arr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SVGTable.prototype, "columns", {
            get: function () {
                var arr = new Array(0);
                for (var x = 0; x < this.width; x++) {
                    arr.push(new Column(this, x));
                }
                return arr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SVGTable.prototype, "cellArray", {
            get: function () {
                var arr = new Array(0);
                for (var y = 0; y < this.height; y++) {
                    for (var x = 0; x < this.width; x++) {
                        arr.push(this.cells[y][x]);
                    }
                }
                return arr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SVGTable.prototype, "borders", {
            get: function () {
                var arr = new Array(0);
                for (var y = 0; y < this.height; y++) {
                    for (var x = 0; x < this.width; x++) {
                        if (arr.indexOf(this.cells[y][x].upLine) == -1) {
                            arr.push(this.cells[y][x].upLine);
                        }
                        if (arr.indexOf(this.cells[y][x].leftLine) == -1) {
                            arr.push(this.cells[y][x].leftLine);
                        }
                        if (arr.indexOf(this.cells[y][x].rightLine) == -1) {
                            arr.push(this.cells[y][x].rightLine);
                        }
                        if (arr.indexOf(this.cells[y][x].bottomLine) == -1) {
                            arr.push(this.cells[y][x].bottomLine);
                        }
                    }
                }
                return arr;
            },
            enumerable: true,
            configurable: true
        });
        SVGTable.prototype.resize = function () {
            var rows = this.rows;
            var columns = this.columns;
            rows.forEach(function (x, i, arr) { x.resize(); });
            columns.forEach(function (x, i, arr) { x.resize(); });
            var height = 0;
            rows.forEach(function (x, i, arr) {
                x.setY(height);
                height += x.getMaxHeight();
            });
            var width = 0;
            columns.forEach(function (x, i, arr) {
                x.setX(width);
                width += x.getMaxWidth();
            });
            this.cellArray.forEach(function (x, i, arr) { x.relocation(); });
        };
        SVGTable.prototype.getCellFromID = function (id) {
            var y = Math.floor(id / this.height);
            var x = id % this.width;
            return this.cells[y][x];
        };
        SVGTable.prototype.setLine = function (cell) {
            if (cell.leftCell != null) {
                cell.leftLine = cell.leftCell.rightLine;
            }
            else {
                cell.leftLine = GraphTableSVG.createLine(cell.x, cell.y, cell.x, cell.y + cell.height);
                this.group.appendChild(cell.leftLine);
            }
            if (cell.upCell != null) {
                cell.upLine = cell.upCell.bottomLine;
            }
            else {
                cell.upLine = GraphTableSVG.createLine(cell.x, cell.y, cell.x + cell.width, cell.y);
                this.group.appendChild(cell.upLine);
            }
            cell.rightLine = GraphTableSVG.createLine(cell.x + cell.width, cell.y, cell.x + cell.width, cell.y + cell.height);
            this.group.appendChild(cell.rightLine);
            cell.bottomLine = GraphTableSVG.createLine(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height);
            this.group.appendChild(cell.bottomLine);
        };
        SVGTable.prototype.createVBAMainCode = function (slideName) {
            var fstLines = [];
            var lines = new Array(0);
            fstLines.push(" Dim tableS As shape");
            fstLines.push(" Dim table_ As table");
            //lines.push(` Set tableS = CreateTable(createdSlide, ${table.height}, ${table.width})`);
            fstLines.push(" Set tableS = " + slideName + ".Shapes.AddTable(" + this.height + ", " + this.width + ")");
            //page.Shapes.AddTable(row_, column_)
            fstLines.push(" Set table_ = tableS.table");
            var tableName = "table_";
            for (var y = 0; y < this.height; y++) {
                lines.push(" Call EditRow(" + tableName + ".Rows(" + (y + 1) + "), " + this.rows[y].height + ")");
            }
            for (var x = 0; x < this.width; x++) {
                lines.push(" Call EditColumn(" + tableName + ".Columns(" + (x + 1) + "), " + this.columns[x].width + ")");
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    lines.push(" Call EditCell(" + tableName + ".cell(" + (y + 1) + "," + (x + 1) + "), \"" + cell.svgText.textContent + "\", " + GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.svgBackground.style.fill) + ")");
                }
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    lines.push(" Call EditCellFont(" + tableName + ".cell(" + (y + 1) + "," + (x + 1) + ").Shape.TextFrame, " + parseInt(cell.svgText.style.fontSize) + ", \"" + cell.svgText.style.fontFamily + "\", " + GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.svgText.style.fill) + ")");
                }
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    lines.push(" Call EditCellTextFrame(" + tableName + ".cell(" + (y + 1) + "," + (x + 1) + ").Shape.TextFrame, " + cell.padding.top + ", " + cell.padding.bottom + ", " + cell.padding.left + ", " + cell.padding.right + ")");
                }
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    lines.push(" Call EditCellBorder(" + tableName + ".cell(" + (y + 1) + "," + (x + 1) + ").Borders(ppBorderTop), " + GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.upLine.style.fill) + ", " + GraphTableSVG.parseInteger(cell.upLine.style.strokeWidth) + ", " + GraphTableSVG.visible(cell.upLine.style.visibility) + ")");
                    lines.push(" Call EditCellBorder(" + tableName + ".cell(" + (y + 1) + "," + (x + 1) + ").Borders(ppBorderLeft), " + GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.leftLine.style.fill) + ", " + GraphTableSVG.parseInteger(cell.leftLine.style.strokeWidth) + ", " + GraphTableSVG.visible(cell.leftLine.style.visibility) + ")");
                    if (x + 1 == this.width) {
                        lines.push(" Call EditCellBorder(" + tableName + ".cell(" + (y + 1) + "," + (x + 1) + ").Borders(ppBorderRight), " + GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.rightLine.style.fill) + ", " + GraphTableSVG.parseInteger(cell.rightLine.style.strokeWidth) + ", " + GraphTableSVG.visible(cell.rightLine.style.visibility) + ")");
                    }
                    if (y + 1 == this.height) {
                        lines.push(" Call EditCellBorder(" + tableName + ".cell(" + (y + 1) + "," + (x + 1) + ").Borders(ppBorderBottom), " + GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.bottomLine.style.fill) + ", " + GraphTableSVG.parseInteger(cell.bottomLine.style.strokeWidth) + ", " + GraphTableSVG.visible(cell.bottomLine.style.visibility) + ")");
                    }
                }
            }
            /*
            lines.push(`Call EditCellFonts(table_)`);
            lines.push(`Call EditCellTextFrames(table_)`);
            lines.push(`Call EditBorders(table_)`);
            */
            //lines.push(`End Sub`);
            /*
            lines.push(`Sub EditCellFonts(table_ As Table)`);
            
            lines.push(`End Sub`);

            lines.push(`Sub EditCellTextFrames(table_ As Table)`);
            
            lines.push(`End Sub`);


            lines.push(`Sub EditBorders(table_ As Table)`);
            */
            //return [VBATranslateFunctions.joinLines(lines),""];
            var x0 = GraphTableSVG.VBATranslateFunctions.joinLines(fstLines);
            var _a = this.splitCode(tableName, lines), x1 = _a[0], y1 = _a[1];
            return [GraphTableSVG.VBATranslateFunctions.joinLines([x0, x1]), y1];
        };
        SVGTable.prototype.splitCode = function (tableName, codes) {
            var functions = [];
            var p = this.splitCode1(codes);
            p.forEach(function (x, i, arr) {
                functions.push("Call SubFunction" + i + "(" + tableName + ")");
                var begin = "Sub SubFunction" + i + "(" + tableName + " As Table)";
                var end = "End Sub";
                p[i] = GraphTableSVG.VBATranslateFunctions.joinLines([begin, x, end]);
            });
            return [GraphTableSVG.VBATranslateFunctions.joinLines(functions), GraphTableSVG.VBATranslateFunctions.joinLines(p)];
        };
        SVGTable.prototype.splitCode1 = function (codes) {
            var r = [];
            var r1 = [];
            codes.forEach(function (x, i, arr) {
                r.push(x);
                if (r.length == 80) {
                    r1.push(GraphTableSVG.VBATranslateFunctions.joinLines(r));
                    r = [];
                }
            });
            if (r.length > 0) {
                r1.push(GraphTableSVG.VBATranslateFunctions.joinLines(r));
                r = [];
            }
            return r1;
        };
        SVGTable.prototype.removeTable = function (svg) {
            if (svg.contains(this.group)) {
                svg.removeChild(this.group);
            }
        };
        return SVGTable;
    }());
    GraphTableSVG.SVGTable = SVGTable;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    function createLine(x, y, x2, y2) {
        var line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.x1.baseVal.value = x;
        line1.x2.baseVal.value = x2;
        line1.y1.baseVal.value = y;
        line1.y2.baseVal.value = y2;
        //line1.style.color = "black";
        line1.style.stroke = "black";
        //line1.style.visibility = "hidden";
        //line1.style.strokeWidth = `${5}`
        //line1.setAttribute('stroke', 'black');
        return line1;
    }
    GraphTableSVG.createLine = createLine;
    function createText() {
        var _svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        _svgText.style.fill = "black";
        _svgText.style.fontSize = "14px";
        _svgText.style.fontWeight = "bold";
        _svgText.style.textAnchor = "middle";
        return _svgText;
    }
    GraphTableSVG.createText = createText;
    function createRectangle() {
        var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.width.baseVal.value = 30;
        rect.height.baseVal.value = 30;
        rect.style.fill = "#ffffff";
        return rect;
    }
    GraphTableSVG.createRectangle = createRectangle;
    function createGroup() {
        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        return g;
    }
    GraphTableSVG.createGroup = createGroup;
    function createCircle(r, className) {
        if (r === void 0) { r = 20; }
        if (className === void 0) { className = null; }
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        if (className == null) {
            circle.style.stroke = "black";
            circle.style.strokeWidth = "1pt";
        }
        else {
            circle.setAttribute("class", className);
            //circle.className = className
            //console.log("d : " + circle.setAttribute("class", className));
        }
        //circle.style.fill = "#ffffff";
        circle.cx.baseVal.value = 0;
        circle.cy.baseVal.value = 0;
        circle.r.baseVal.value = r;
        return circle;
    }
    GraphTableSVG.createCircle = createCircle;
})(GraphTableSVG || (GraphTableSVG = {}));
//# sourceMappingURL=graph_table_svg.js.map