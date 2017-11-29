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
        function Edge() {
        }
        Object.defineProperty(Edge.prototype, "x1", {
            get: function () {
                var _a = this.beginNode.getLocation(this.beginConnectType), x1 = _a[0], y1 = _a[1];
                return x1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "y1", {
            get: function () {
                var _a = this.beginNode.getLocation(this.beginConnectType), x1 = _a[0], y1 = _a[1];
                return y1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "x2", {
            get: function () {
                var _a = this.endNode.getLocation(this.endConnectType), x2 = _a[0], y2 = _a[1];
                return x2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Edge.prototype, "y2", {
            get: function () {
                var _a = this.endNode.getLocation(this.endConnectType), x2 = _a[0], y2 = _a[1];
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
        function LineEdge() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //svgText: SVGTextElement;
        LineEdge.create = function (_parent, _begin, _end) {
            var p = new LineEdge();
            p.beginNode = _begin;
            p.endNode = _end;
            p.svgLine = GraphTableSVG.createLine(0, 0, 100, 100);
            p.parent = _parent;
            p.parent.svgGroup.appendChild(p.svgLine);
            /*
            p.svgText = GraphTableSVG.createText();
            p.svgText.textContent = "hogehoge";
            p.parent.svgGroup.appendChild(p.svgText);
            */
            return p;
        };
        LineEdge.prototype.update = function () {
            this.svgLine.x1.baseVal.value = this.x1;
            this.svgLine.y1.baseVal.value = this.y1;
            this.svgLine.x2.baseVal.value = this.x2;
            this.svgLine.y2.baseVal.value = this.y2;
            /*
            this.svgText.setX((this.x1 + this.x2) / 2);
            this.svgText.setY((this.y1 + this.y2) / 2);
            var rad = Math.atan2(this.y2 - this.y1, this.x2 - this.x1);
            var rar = rad * (180 / Math.PI);
            this.svgText.setAttribute('transform', `rotate(${rar}, ${this.svgText.getX()}, ${this.svgText.getY()})`);
            */
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
        return Rectangle;
    }());
    GraphTableSVG.Rectangle = Rectangle;
    var ConnecterPositionType;
    (function (ConnecterPositionType) {
        ConnecterPositionType[ConnecterPositionType["Top"] = 1] = "Top";
        ConnecterPositionType[ConnecterPositionType["LeftUp"] = 2] = "LeftUp";
        ConnecterPositionType[ConnecterPositionType["Left"] = 3] = "Left";
        ConnecterPositionType[ConnecterPositionType["LeftDown"] = 4] = "LeftDown";
        ConnecterPositionType[ConnecterPositionType["Bottom"] = 5] = "Bottom";
        ConnecterPositionType[ConnecterPositionType["RightDown"] = 6] = "RightDown";
        ConnecterPositionType[ConnecterPositionType["Right"] = 7] = "Right";
        ConnecterPositionType[ConnecterPositionType["RightUp"] = 8] = "RightUp";
    })(ConnecterPositionType = GraphTableSVG.ConnecterPositionType || (GraphTableSVG.ConnecterPositionType = {}));
    var Graph = (function () {
        function Graph() {
            this.nodes = new Array(0);
            this.edges = new Array(0);
            this.svgGroup = null;
        }
        Graph.prototype.relocation = function () {
            this.edges.forEach(function (x, i, arr) { x.update(); });
        };
        Graph.prototype.resize = function () {
        };
        Graph.prototype.update = function () {
            this.resize();
            this.relocation();
        };
        Graph.create = function (svg) {
            var g = GraphTableSVG.createGroup();
            var graph = new Graph();
            graph.svgGroup = g;
            svg.appendChild(graph.svgGroup);
            return graph;
        };
        return Graph;
    }());
    GraphTableSVG.Graph = Graph;
    var OrderedOutcomingEdgesGraph = (function (_super) {
        __extends(OrderedOutcomingEdgesGraph, _super);
        function OrderedOutcomingEdgesGraph() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.outcomingEdgesDic = [];
            return _this;
        }
        return OrderedOutcomingEdgesGraph;
    }(Graph));
    GraphTableSVG.OrderedOutcomingEdgesGraph = OrderedOutcomingEdgesGraph;
    var TextPath = (function () {
        function TextPath() {
        }
        TextPath.prototype.update = function () {
            return false;
        };
        return TextPath;
    }());
    GraphTableSVG.TextPath = TextPath;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var relocation;
    (function (relocation) {
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
        function standardLocateSub(tree, y, edgeLength) {
            if (y === void 0) { y = 0; }
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
        }
    })(relocation = GraphTableSVG.relocation || (GraphTableSVG.relocation = {}));
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var Vertex = (function () {
        function Vertex() {
        }
        Object.defineProperty(Vertex.prototype, "x", {
            get: function () {
                return this.svgGroup.getX();
            },
            set: function (value) {
                this.svgGroup.setX(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vertex.prototype, "y", {
            get: function () {
                return this.svgGroup.getY();
            },
            set: function (value) {
                this.svgGroup.setY(value);
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
        return Vertex;
    }());
    GraphTableSVG.Vertex = Vertex;
    var CircleVertex = (function (_super) {
        __extends(CircleVertex, _super);
        function CircleVertex() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CircleVertex.create = function (_parent) {
            var p = new CircleVertex();
            p.svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            p.svgCircle.style.stroke = "black";
            p.svgCircle.style.strokeWidth = "5pt";
            p.svgCircle.cx.baseVal.value = 0;
            p.svgCircle.cy.baseVal.value = 0;
            p.svgCircle.r.baseVal.value = 30;
            p.svgText = GraphTableSVG.createText();
            p.svgText.textContent = "hogehoge";
            p.svgGroup = GraphTableSVG.createGroup();
            p.svgGroup.appendChild(p.svgCircle);
            p.svgGroup.appendChild(p.svgText);
            p.parent = _parent;
            p.parent.svgGroup.appendChild(p.svgGroup);
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
                case GraphTableSVG.ConnecterPositionType.Top:
                    return [this.x, this.y - this.radius];
                case GraphTableSVG.ConnecterPositionType.RightUp:
                    return [this.x + r, this.y - r];
                case GraphTableSVG.ConnecterPositionType.Right:
                    return [this.x + this.radius, this.y];
                case GraphTableSVG.ConnecterPositionType.RightDown:
                    return [this.x + r, this.y + r];
                case GraphTableSVG.ConnecterPositionType.Bottom:
                    return [this.x, this.y + this.radius];
                case GraphTableSVG.ConnecterPositionType.LeftDown:
                    return [this.x - r, this.y + r];
                case GraphTableSVG.ConnecterPositionType.Left:
                    return [this.x - this.radius, this.y];
                case GraphTableSVG.ConnecterPositionType.LeftUp:
                    return [this.x - r, this.y - r];
                default:
                    return [this.x, this.y];
            }
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
        VirtualTree.prototype.getTreeRegion = function () {
            var p = this.getSubtree();
            var minX = this.root.x;
            var maxX = this.root.x;
            var minY = this.root.y;
            var maxY = this.root.y;
            p.forEach(function (x, i, arr) {
                if (minX > x.x)
                    minX = x.x;
                if (maxX < x.x)
                    maxX = x.x;
                if (minY > x.y)
                    minY = x.y;
                if (maxY < x.y)
                    maxY = x.y;
            });
            var result = new GraphTableSVG.Rectangle();
            result.x = minX;
            result.y = minY;
            result.width = maxX - minX;
            result.height = maxY - minY;
            return result;
        };
        VirtualTree.prototype.addOffset = function (_x, _y) {
            this.getSubtree().forEach(function (x, i, arr) {
                x.x += _x;
                x.y += _y;
            });
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
})(GraphTableSVG || (GraphTableSVG = {}));
//# sourceMappingURL=graph_table_svg.js.map