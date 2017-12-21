var GraphTableSVG;
(function (GraphTableSVG) {
    class Edge {
        constructor(className = null) {
            this._graph = null;
            this.text = null;
            this.svgGroup = GraphTableSVG.createGroup(className);
            this.svgGroup.setAttribute(GraphTableSVG.Graph.objectIDName, (GraphTableSVG.Graph.id++).toString());
            this.svgGroup.setAttribute(GraphTableSVG.Graph.typeName, "edge");
            var t1 = GraphTableSVG.CSSFunctions.getPropertyValue(this.svgGroup, Edge.beginConnectorTypeName);
            var t2 = GraphTableSVG.CSSFunctions.getPropertyValue(this.svgGroup, Edge.endConnectorTypeName);
            this.beginConnectorType = GraphTableSVG.ToConnectorPosition(t1);
            this.endConnectorType = GraphTableSVG.ToConnectorPosition(t2);
            //this._parent = graph;
            /*
            this._beginNode = _beginNode;
            this._endNode = _endNode;
            */
        }
        get beginConnectorType() {
            var p = GraphTableSVG.CSSFunctions.getPropertyValue(this.svgGroup, Edge.beginConnectorTypeName);
            if (p == null) {
                return GraphTableSVG.ConnectorPosition.Auto;
            }
            else {
                return GraphTableSVG.ToConnectorPosition(p);
            }
        }
        set beginConnectorType(value) {
            GraphTableSVG.CSSFunctions.setPropertyValue(this.svgGroup, Edge.beginConnectorTypeName, GraphTableSVG.ToStrFromConnectorPosition(value));
            //this.svgGroup.setAttribute(Edge.beginConnectorTypeName, GraphTableSVG.ToStrFromConnectorPosition(value));
        }
        get endConnectorType() {
            var p = GraphTableSVG.CSSFunctions.getPropertyValue(this.svgGroup, Edge.endConnectorTypeName);
            if (p == null) {
                return GraphTableSVG.ConnectorPosition.Auto;
            }
            else {
                return GraphTableSVG.ToConnectorPosition(p);
            }
        }
        set endConnectorType(value) {
            GraphTableSVG.CSSFunctions.setPropertyValue(this.svgGroup, Edge.endConnectorTypeName, GraphTableSVG.ToStrFromConnectorPosition(value));
        }
        get beginVertex() {
            return this._beginVertex;
        }
        set beginVertex(value) {
            this._beginVertex = value;
            this.svgGroup.setAttribute(Edge.beginNodeName, value.objectID);
            if (this.graph != null) {
                this.graph.update();
            }
        }
        get endVertex() {
            return this._endVertex;
        }
        set endVertex(value) {
            this._endVertex = value;
            this.svgGroup.setAttribute(Edge.endNodeName, value.objectID);
            if (this.graph != null) {
                this.graph.update();
            }
        }
        get graph() {
            return this._graph;
        }
        setGraph(value) {
            this._graph = value;
        }
        get x1() {
            var [x1, y1] = this._beginVertex.getLocation(this.beginConnectorType, this.endVertex.x, this.endVertex.y);
            return x1;
        }
        get y1() {
            var [x1, y1] = this._beginVertex.getLocation(this.beginConnectorType, this.endVertex.x, this.endVertex.y);
            return y1;
        }
        get x2() {
            var [x2, y2] = this._endVertex.getLocation(this.endConnectorType, this.beginVertex.x, this.beginVertex.y);
            return x2;
        }
        get y2() {
            var [x2, y2] = this._endVertex.getLocation(this.endConnectorType, this.beginVertex.x, this.beginVertex.y);
            return y2;
        }
        update() {
            return false;
        }
        get objectID() {
            var r = this.svgGroup.getAttribute(GraphTableSVG.Graph.objectIDName);
            if (r == null) {
                return null;
            }
            else {
                return Number(r);
            }
        }
        /*
        public set objectID(value: number | null) {
            if (value == null) {
                this.group.setAttribute("objectID", "");
            } else {
                this.group.setAttribute("objectID", value.toString());
            }
        }
        */
        save() {
        }
        static create(graph, className = null, lineType = null) {
            var g = GraphTableSVG.createGroup(className);
            var textClass = g.getActiveStyle().getPropertyValue(Edge.defaultTextClass).trim();
            var line = new LineEdge(className);
            return line;
        }
    }
    //public static defaultBeginConnectorPosition: string = "--default-begin-connector-position";
    //public static defaultEndConnectorPosition: string = "--default-end-connector-position";
    Edge.beginConnectorTypeName = "--begin-connector-type";
    Edge.endConnectorTypeName = "--end-connector-type";
    Edge.defaultLineClass = "--default-line-class";
    Edge.beginNodeName = "data-begin-node";
    Edge.endNodeName = "data-end-node";
    Edge.defaultTextClass = "--default-text-class";
    GraphTableSVG.Edge = Edge;
    class LineEdge extends Edge {
        constructor(className = null) {
            super(className);
            var p = this.svgGroup.getActiveStyle().getPropertyValue(Edge.defaultLineClass).trim();
            this._svgLine = GraphTableSVG.createLine(0, 0, 0, 0, p.length > 0 ? p : null);
            this.svgGroup.appendChild(this._svgLine);
            //this.graph.svgGroup.appendChild(this._svg);
        }
        //svgText: SVGTextElement;
        get svg() {
            return this._svgLine;
        }
        setGraph(value) {
            super.setGraph(value);
            if (this.graph != null) {
                this.graph.svgGroup.appendChild(this.svgGroup);
            }
        }
        /*
        public static create(className: string | null = null): LineEdge {
            var line = new LineEdge(className);
            
            return line;
        }
        */
        update() {
            this._svgLine.x1.baseVal.value = this.x1;
            this._svgLine.y1.baseVal.value = this.y1;
            this._svgLine.x2.baseVal.value = this.x2;
            this._svgLine.y2.baseVal.value = this.y2;
            if (this.text != null) {
                this.text.update();
            }
            return false;
        }
    }
    GraphTableSVG.LineEdge = LineEdge;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class Graph {
        constructor(className = null) {
            this._vertices = new Array(0);
            this._edges = new Array(0);
            this._roots = [];
            this._svgGroup = GraphTableSVG.createGroup(className);
            this._svgGroup.setAttribute(Graph.typeName, "graph");
            /*
            if(className != null){
                this._svgGroup.setAttribute("class", className);
                var nodeClass = this._svgGroup.getActiveStyle().getPropertyValue(Graph.defaultVertexClass).trim();
                if (nodeClass.length > 0) {
                    this.defaultVertexClass = nodeClass;
                }

                var edgeClass = this._svgGroup.getActiveStyle().getPropertyValue(Graph.defaultEdgeClass).trim();
                if (edgeClass.length > 0) {
                    this.defaultEdgeClass = edgeClass;
                }
            }
            */
            //svg.appendChild(this._svgGroup);
        }
        get defaultVertexClass() {
            return this.svgGroup.getPropertyValue(Graph.defaultVertexClass);
        }
        set defaultVertexClass(value) {
            this.svgGroup.setPropertyValue(Graph.defaultVertexClass, value);
        }
        get defaultEdgeClass() {
            return this.svgGroup.getPropertyValue(Graph.defaultEdgeClass);
        }
        set defaultEdgeClass(value) {
            this.svgGroup.setPropertyValue(Graph.defaultEdgeClass, value);
        }
        //public arrangementFunction: (Graph) => void | null = null;
        get roots() {
            return this._roots;
        }
        get svgGroup() {
            return this._svgGroup;
        }
        get vertices() {
            return this._vertices;
        }
        get edges() {
            return this._edges;
        }
        addVertex(vertex) {
            this.svgGroup.appendChild(vertex.svgGroup);
            vertex.setGraph(this);
            this._vertices.push(vertex);
        }
        addEdge(edge) {
            edge.setGraph(this);
            var i = this._edges.indexOf(edge);
            if (i == -1) {
                this._edges.push(edge);
            }
        }
        /*
        relocation(): void {
            this.arrangementFunction(this);
        }
        resize() : void {

        }
        */
        updateVertices() {
            this._vertices.forEach(function (x) { x.update(); });
        }
        updateEdges() {
            this._edges.forEach(function (x) { x.update(); });
        }
        update() {
            this.updateVertices();
            this.updateEdges();
        }
        /*
        clear(svg: HTMLElement) {
            this._nodes.forEach(function (x) { x.setGraph(null) });
            this._edges.forEach(function (x) { x.setGraph(null) });
            this._nodes = [];
            this._edges = [];
        }
        */
        removeGraph(svg) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        }
        /*
        public static create(svg: HTMLElement): Graph {
            //var g = GraphTableSVG.createGroup();
            var graph = new Graph();
            //graph.svgGroup = g;
        }
        */
        getRegion() {
            var rects = this.vertices.map((v) => v.region);
            var rect = GraphTableSVG.Rectangle.merge(rects);
            rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
            //rect.x += this.svgGroup.getX();
            //rect.y += this.svgGroup.getY();
            return rect;
        }
        getObjectBySVGID(id) {
            for (var i = 0; i < this.vertices.length; i++) {
                if (this.vertices[i].containsSVGID(id)) {
                    return this.vertices[i];
                }
            }
            return null;
        }
        _connect(node1, edge, node2) {
            edge.beginVertex = node1;
            edge.endVertex = node2;
            //edge.beginConnectorType = _beginConnectType;
            //edge.endConnectorType = _endConnectType;
            this.addEdge(edge);
        }
        connect(node1, edge, node2, insertIndex = 0) {
            this._connect(node1, edge, node2);
            var i = this.roots.indexOf(node1);
            var j = this.roots.indexOf(node2);
            if (j != -1) {
                if (i == -1) {
                    this.roots[j] = node1;
                }
                else {
                    this.roots.splice(j, 1);
                }
            }
            /*
            if (!(node1.id in this.outcomingEdgesDic)) {
                this.outcomingEdgesDic[node1.id] = [];
            }
            */
            node1.outcomingEdges.splice(insertIndex, 0, edge);
            node2.incomingEdges.push(edge);
        }
        getOrderedVertices(order, node = null) {
            var r = [];
            if (node == null) {
                this.roots.forEach((v) => {
                    this.getOrderedVertices(order, v).forEach((w) => {
                        r.push(w);
                    });
                });
            }
            else {
                var edges = node.outcomingEdges;
                if (order == GraphTableSVG.NodeOrder.Preorder) {
                    r.push(node);
                    edges.forEach((v) => {
                        this.getOrderedVertices(order, v.endVertex).forEach((w) => {
                            r.push(w);
                        });
                    });
                }
                else if (order == GraphTableSVG.NodeOrder.Postorder) {
                    edges.forEach((v) => {
                        this.getOrderedVertices(order, v.endVertex).forEach((w) => {
                            r.push(w);
                        });
                    });
                    r.push(node);
                }
            }
            return r;
        }
        get rootVertex() {
            if (this.roots.length == 0) {
                return null;
            }
            else {
                return this.roots[0];
            }
        }
        set rootVertex(value) {
            this._roots = [];
            if (value != null) {
                this.roots.push(value);
            }
        }
        save() {
            var id = 0;
            //this.nodes.forEach((v) => v.objectID = id++);
            //this.edges.forEach((v) => v.objectID = id++);
            var ids = this.vertices.map((v) => v.objectID);
            this.svgGroup.setAttribute("node", JSON.stringify(ids));
        }
    }
    Graph.id = 0;
    Graph.defaultVertexClass = "--default-vertex-class";
    Graph.defaultEdgeClass = "--default-edge-class";
    //public static defaultVertexClassName: string = "data-default-vertex-class";
    //public static defaultEdgeClassName: string = "data-default-edge-class";
    Graph.objectIDName = "data-objectID";
    Graph.typeName = "data-type";
    GraphTableSVG.Graph = Graph;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var GraphArrangement;
    (function (GraphArrangement) {
        function leaveBasedArrangement(forest, xInterval, yInterval) {
            var leafCounter = 0;
            forest.getOrderedVertices(GraphTableSVG.NodeOrder.Postorder).forEach((v) => {
                var x = 0;
                var y = 0;
                if (v.isLeaf) {
                    x = leafCounter * xInterval;
                    leafCounter++;
                }
                else {
                    v.children.forEach((w) => {
                        x += w.endVertex.x;
                        if (y < w.endVertex.y)
                            y = w.endVertex.y;
                    });
                    x = x / v.children.length;
                    y += yInterval;
                }
                v.x = x;
                v.y = y;
            });
        }
        GraphArrangement.leaveBasedArrangement = leaveBasedArrangement;
        function reverse(graph, isX, isY) {
            if (graph.vertices.length > 0) {
                if (isY) {
                    var midY = middle(graph.vertices.map((v) => v.y));
                    graph.vertices.forEach((v) => {
                        if (v.y < midY) {
                            v.y += 2 * (midY - v.y);
                        }
                        else {
                            v.y -= 2 * (v.y - midY);
                        }
                    });
                }
                if (isX) {
                    var midX = middle(graph.vertices.map((v) => v.x));
                    graph.vertices.forEach((v) => {
                        if (v.x < midX) {
                            v.x += 2 * (midX - v.x);
                        }
                        else {
                            v.x -= 2 * (v.x - midX);
                        }
                    });
                }
            }
        }
        GraphArrangement.reverse = reverse;
        function average(items) {
            if (items.length > 0) {
                var y = 0;
                items.forEach((v) => {
                    y += v;
                });
                return y / items.length;
            }
            else {
                throw new Error();
            }
        }
        GraphArrangement.average = average;
        function middle(items) {
            if (items.length > 0) {
                var min = items[0];
                var max = items[0];
                items.forEach((w) => {
                    if (min > w)
                        min = w;
                    if (max < w)
                        max = w;
                });
                return (min + max) / 2;
            }
            else {
                throw new Error();
            }
        }
        GraphArrangement.middle = middle;
        function standardTreeArrangement(graph, xInterval, yInterval) {
            if (graph.rootVertex != null) {
                var rootTree = new GraphTableSVG.VirtualTree(graph, graph.rootVertex);
                var [x, y] = [rootTree.root.x, rootTree.root.y];
                standardTreeArrangementSub(rootTree, xInterval, yInterval);
                rootTree.setRootLocation(x, y);
                graph.update();
            }
        }
        GraphArrangement.standardTreeArrangement = standardTreeArrangement;
        function standardTreeArrangementSub(tree, xInterval, yInterval) {
            tree.root.x = 0;
            tree.root.y = 0;
            var leaves = 0;
            var edges = tree.getChildren();
            var leaveSize = tree.getLeaves().length;
            var leaveSizeWidthHalf = (leaveSize * xInterval) / 2;
            var __x = -leaveSizeWidthHalf;
            for (var i = 0; i < edges.length; i++) {
                standardTreeArrangementSub(edges[i], xInterval, yInterval);
                var w = (edges[i].getLeaves().length * xInterval) / 2;
                edges[i].setRootLocation(__x + w, yInterval);
                __x += edges[i].getLeaves().length * xInterval;
            }
        }
    })(GraphArrangement = GraphTableSVG.GraphArrangement || (GraphTableSVG.GraphArrangement = {}));
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class EdgeText {
        //private isReverse: boolean = false;
        get x() {
            return this.svg.getX();
        }
        get y() {
            return this.svg.getY();
        }
        getCenterPosition() {
            var x = (this.parentEdge.x1 + this.parentEdge.x2) / 2;
            var y = (this.parentEdge.y1 + this.parentEdge.y2) / 2;
            return [x, y];
        }
        static create(graph, edge, text) {
            var p = new EdgeText();
            p.svg = GraphTableSVG.createText();
            p.svg.textContent = text;
            edge.svgGroup.appendChild(p.svg);
            p.parentEdge = edge;
            edge.text = p;
            return p;
        }
        update() {
            var [x, y] = this.getCenterPosition();
            this.svg.setX(x);
            this.svg.setY(y);
            var [x1, y1] = [this.parentEdge.x1, this.parentEdge.y1];
            var [x2, y2] = [this.parentEdge.x2, this.parentEdge.y2];
            var rad = Math.atan2(y2 - y1, x2 - x1);
            var rar = rad * (180 / Math.PI);
            if (rar > 90) {
                rar = rar - 180;
                if (this.svg.textContent != null) {
                    this.svg.textContent = EdgeText.reverse(this.svg.textContent);
                }
            }
            this.svg.setAttribute('transform', `rotate(${rar}, ${this.svg.getX()}, ${this.svg.getY()})`);
        }
        static reverse(str) {
            var rv = [];
            for (var i = 0, n = str.length; i < n; i++) {
                rv[i] = str.charAt(n - i - 1);
            }
            return rv.join("");
        }
    }
    GraphTableSVG.EdgeText = EdgeText;
})(GraphTableSVG || (GraphTableSVG = {}));
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
var GraphTableSVG;
(function (GraphTableSVG) {
    class Vertex {
        /*
        public set objectID(value: number | null) {
            if (value == null) {
                this.svgGroup.setAttribute("objectID", "");
            } else {
                this.svgGroup.setAttribute("objectID", value.toString());
            }
        }
        */
        constructor(className = null, text) {
            this.symbol = Symbol();
            this._outcomingEdges = [];
            this._incomingEdges = [];
            this.observerFunc = (x) => {
                for (var i = 0; i < x.length; i++) {
                    var p = x[i];
                    if (p.attributeName == "transform") {
                        if (this.graph != null) {
                            this.graph.update();
                        }
                    }
                }
            };
            this.textObserverFunc = (x) => {
                for (var i = 0; i < x.length; i++) {
                    var p = x[i];
                    if (this.isLocated) {
                        var vAnchor = this.svgGroup.getActiveStyle().getVerticalAnchor();
                        if (vAnchor == null)
                            vAnchor = GraphTableSVG.VerticalAnchor.Middle;
                        var hAnchor = this.svgGroup.getActiveStyle().getHorizontalAnchor();
                        if (hAnchor == null)
                            hAnchor = GraphTableSVG.HorizontalAnchor.Center;
                        setXY(this.svgText, this.innerRectangle, vAnchor, hAnchor);
                    }
                }
            };
            this.svgGroup = GraphTableSVG.createGroup(className);
            this.svgGroup.setAttribute(GraphTableSVG.Graph.objectIDName, (GraphTableSVG.Graph.id++).toString());
            this.svgGroup.setAttribute(GraphTableSVG.Graph.typeName, "vertex");
            this.svgText = GraphTableSVG.createText(this.svgGroup.getActiveStyle().tryGetPropertyValue(Vertex.defaultTextClass));
            this.svgText.textContent = text;
            this.svgGroup.appendChild(this.svgText);
            this._observer = new MutationObserver(this.observerFunc);
            var option = { attributes: true };
            this._observer.observe(this.svgGroup, option);
            this._textObserver = new MutationObserver(this.textObserverFunc);
            var option = { childList: true };
            this._textObserver.observe(this.svgText, option);
            /*
            this.parent = parent;

            this.parent.svgGroup.appendChild(this.svgGroup);
            */
        }
        get outcomingEdges() {
            return this._outcomingEdges;
        }
        get incomingEdges() {
            return this._incomingEdges;
        }
        get innerRectangle() {
            var rect = new GraphTableSVG.Rectangle();
            rect.width = 0;
            rect.height = 0;
            rect.x = 0;
            rect.y = 0;
            return rect;
            //setXY(this.svgText, rect, VerticalAnchor.Middle, HorizontalAnchor.Center);
        }
        get isLocated() {
            return IsDescendantOfBody(this.svgGroup);
        }
        get graph() {
            return this._graph;
        }
        setGraph(value) {
            if (value == null && this._graph != null) {
                this._graph.svgGroup.removeChild(this.svgGroup);
            }
            this._graph = value;
            if (this.graph != null) {
                //this.svgGroup.id = `${this.graph.name}_${this.id}_group`;
            }
        }
        get objectID() {
            var r = this.svgGroup.getAttribute(GraphTableSVG.Graph.objectIDName);
            if (r == null) {
                throw new Error();
            }
            else {
                return r;
            }
        }
        get x() {
            return this.svgGroup.getX();
        }
        set x(value) {
            if (this.svgGroup.getX() != value) {
                this.svgGroup.setX(value);
            }
            /*
            if (this.graph != null) {
                this.graph.update();
            }
            */
        }
        get y() {
            return this.svgGroup.getY();
        }
        set y(value) {
            if (this.svgGroup.getY() != value) {
                this.svgGroup.setY(value);
            }
            /*
            if (this.graph != null) {
                this.graph.update();
            }
            */
        }
        get width() {
            return 0;
        }
        get height() {
            return 0;
        }
        getLocation(type, x, y) {
            return [this.x, this.y];
        }
        update() {
            return false;
        }
        get region() {
            var p = new GraphTableSVG.Rectangle();
            p.x = this.x - (this.width / 2);
            p.y = this.y - (this.height / 2);
            p.width = this.width;
            p.height = this.height;
            return p;
        }
        containsSVGID(id) {
            return this.svgGroup.getAttribute(GraphTableSVG.Graph.objectIDName) == id;
        }
        get surface() {
            return null;
        }
        getParents() {
            if (this.graph == null) {
                throw new Error();
            }
            else {
                return this.graph.edges.filter((v) => v.endVertex == this).map((v) => v.beginVertex);
            }
        }
        get parentEdge() {
            if (this.incomingEdges.length == 0) {
                return null;
            }
            else {
                return this.incomingEdges[0];
            }
        }
        get parent() {
            if (this.parentEdge == null) {
                return null;
            }
            else {
                return this.parentEdge.beginVertex;
            }
        }
        get isRoot() {
            return this.parent == null;
        }
        get children() {
            return this.outcomingEdges;
        }
        get isLeaf() {
            return this.outcomingEdges.length == 0;
        }
        /*
        successor(order: NodeOrder): Vertex | null {
            if (order == NodeOrder.Preorder) {

            } else {
                return null;
            }
        }
        */
        get root() {
            var p = this;
            var parent = p.parent;
            while (parent != null) {
                p = parent;
                parent = p.parent;
            }
            return p;
        }
        get index() {
            if (this.isRoot && this.graph != null) {
                return this.graph.roots.indexOf(this);
            }
            else {
                return -1;
            }
        }
        save() {
            var p = this.outcomingEdges.map((v) => v.x1);
            var out = JSON.stringify(p);
            this.svgGroup.setAttribute("outcomingEdges", out);
        }
        static create(graph, className = null, defaultSurfaceType = "circle") {
            var g = GraphTableSVG.createGroup(className);
            className = className != null ? className : graph.defaultVertexClass;
            var type1 = g.getPropertyValue(Vertex.defaultSurfaceType);
            var type = type1 != null ? type1 : defaultSurfaceType;
            var p;
            if (type == "circle") {
                p = new GraphTableSVG.CircleVertex(className, "");
            }
            else if (type == "rectangle") {
                p = new GraphTableSVG.RectangleVertex(className, "");
            }
            else {
                p = new Vertex(className, "");
            }
            graph.addVertex(p);
            return p;
        }
    }
    Vertex.defaultSurfaceType = "--default-surface-type";
    Vertex.defaultTextClass = "--default-text-class";
    Vertex.defaultSurfaceClass = "--default-surface-class";
    Vertex.id_counter = 0;
    GraphTableSVG.Vertex = Vertex;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class CircleVertex extends GraphTableSVG.Vertex {
        constructor(className = null, text = "") {
            super(className, text);
            this.svgCircle = GraphTableSVG.createCircle(this.svgGroup.getActiveStyle().tryGetPropertyValue(GraphTableSVG.Vertex.defaultSurfaceClass));
            //this.svgGroup.appendChild(this.svgCircle);
            this.svgGroup.insertBefore(this.svgCircle, this.svgText);
            //this.svgCircle.setAttribute("objectID", this.objectID);
            //this.svgText.setAttribute("objectID", this.objectID);
        }
        get width() {
            return this.svgCircle.r.baseVal.value * 2;
        }
        get height() {
            return this.svgCircle.r.baseVal.value * 2;
        }
        get innerRectangle() {
            var r = this.svgCircle.r.baseVal.value;
            var rect = new GraphTableSVG.Rectangle();
            rect.width = r * 2;
            rect.height = r * 2;
            rect.x = -r;
            rect.y = -r;
            return rect;
            //setXY(this.svgText, rect, VerticalAnchor.Middle, HorizontalAnchor.Center);
        }
        static create(_parent, nodeClassName = null) {
            var p = new CircleVertex(nodeClassName, "");
            p.x = 0;
            p.y = 0;
            _parent.addVertex(p);
            return p;
        }
        get radius() {
            return this.svgCircle.r.baseVal.value;
        }
        getLocation(type, x, y) {
            var r = (Math.sqrt(2) / 2) * this.radius;
            switch (type) {
                case GraphTableSVG.ConnectorPosition.Top:
                    return [this.x, this.y - this.radius];
                case GraphTableSVG.ConnectorPosition.RightUp:
                    return [this.x + r, this.y - r];
                case GraphTableSVG.ConnectorPosition.Right:
                    return [this.x + this.radius, this.y];
                case GraphTableSVG.ConnectorPosition.RightDown:
                    return [this.x + r, this.y + r];
                case GraphTableSVG.ConnectorPosition.Bottom:
                    return [this.x, this.y + this.radius];
                case GraphTableSVG.ConnectorPosition.LeftDown:
                    return [this.x - r, this.y + r];
                case GraphTableSVG.ConnectorPosition.Left:
                    return [this.x - this.radius, this.y];
                case GraphTableSVG.ConnectorPosition.LeftUp:
                    return [this.x - r, this.y - r];
                default:
                    var autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        }
        get surface() {
            return this.svgCircle;
        }
        getRadian(x, y) {
            var [x2, y2] = [x - this.x, y - this.y];
            if (x2 < 0) {
                if (y2 < 0) {
                    return GraphTableSVG.ConnectorPosition.LeftUp;
                }
                else if (y2 > 0) {
                    return GraphTableSVG.ConnectorPosition.LeftDown;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Left;
                }
            }
            else if (x2 > 0) {
                if (y2 < 0) {
                    return GraphTableSVG.ConnectorPosition.RightUp;
                }
                else if (y2 > 0) {
                    return GraphTableSVG.ConnectorPosition.RightDown;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Right;
                }
            }
            else {
                if (y2 < 0) {
                    return GraphTableSVG.ConnectorPosition.Top;
                }
                else if (y2 > 0) {
                    return GraphTableSVG.ConnectorPosition.Bottom;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Top;
                }
            }
        }
        getAutoPosition(x, y) {
            var r = (Math.sqrt(2) / 2) * this.radius;
            var line1 = new GraphTableSVG.VLine(this.x, this.y, this.x + r, this.y + r);
            var line2 = new GraphTableSVG.VLine(this.x, this.y, this.x + r, this.y - r);
            var b1 = line1.contains(x, y);
            var b2 = line2.contains(x, y);
            if (b1) {
                if (b2) {
                    return GraphTableSVG.ConnectorPosition.Top;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Right;
                }
            }
            else {
                if (b2) {
                    return GraphTableSVG.ConnectorPosition.Left;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Bottom;
                }
            }
        }
    }
    GraphTableSVG.CircleVertex = CircleVertex;
    class RectangleVertex extends GraphTableSVG.Vertex {
        constructor(className = null, text = "") {
            super(className, text);
            this.svgRectangle = GraphTableSVG.createRectangle(this.svgGroup.getActiveStyle().tryGetPropertyValue(GraphTableSVG.Vertex.defaultSurfaceClass));
            this.svgGroup.insertBefore(this.svgRectangle, this.svgText);
            this.svgRectangle.x.baseVal.value = -this.width / 2;
            this.svgRectangle.y.baseVal.value = -this.height / 2;
        }
        get width() {
            return this.svgRectangle.width.baseVal.value;
        }
        get height() {
            return this.svgRectangle.height.baseVal.value;
        }
        get innerRectangle() {
            var rect = new GraphTableSVG.Rectangle();
            rect.width = this.width;
            rect.height = this.height;
            rect.x = -this.width / 2;
            rect.y = -this.height / 2;
            ;
            return rect;
            //setXY(this.svgText, rect, VerticalAnchor.Middle, HorizontalAnchor.Center);
        }
        getLocation(type, x, y) {
            var wr = this.width / 2;
            var hr = this.height / 2;
            switch (type) {
                case GraphTableSVG.ConnectorPosition.Top:
                    return [this.x, this.y - hr];
                case GraphTableSVG.ConnectorPosition.RightUp:
                case GraphTableSVG.ConnectorPosition.Right:
                case GraphTableSVG.ConnectorPosition.RightDown:
                    return [this.x + wr, this.y];
                case GraphTableSVG.ConnectorPosition.Bottom:
                    return [this.x, this.y + hr];
                case GraphTableSVG.ConnectorPosition.LeftDown:
                case GraphTableSVG.ConnectorPosition.Left:
                case GraphTableSVG.ConnectorPosition.LeftUp:
                    return [this.x - wr, this.y];
                default:
                    var autoType = this.getAutoPosition(x, y);
                    return this.getLocation(autoType, x, y);
            }
        }
        getAutoPosition(x, y) {
            var wr = this.width / 2;
            var hr = this.height / 2;
            var line1 = new GraphTableSVG.VLine(this.x, this.y, this.x + wr, this.y + hr);
            var line2 = new GraphTableSVG.VLine(this.x, this.y, this.x + wr, this.y - hr);
            var b1 = line1.contains(x, y);
            var b2 = line2.contains(x, y);
            if (b1) {
                if (b2) {
                    return GraphTableSVG.ConnectorPosition.Top;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Right;
                }
            }
            else {
                if (b2) {
                    return GraphTableSVG.ConnectorPosition.Left;
                }
                else {
                    return GraphTableSVG.ConnectorPosition.Bottom;
                }
            }
        }
    }
    GraphTableSVG.RectangleVertex = RectangleVertex;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class VirtualTree {
        constructor(_graph, _root) {
            this.graph = _graph;
            this.root = _root;
        }
        getChildren() {
            var p = this;
            return this.root.outcomingEdges.map(function (x, i, arr) {
                return new VirtualTree(p.graph, x.endVertex);
            });
        }
        get parentEdge() {
            return this.root.parentEdge;
        }
        getSubtree(result = []) {
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
        }
        getLeaves() {
            var p = this;
            return this.getSubtree().filter(function (x, i, arr) {
                return x.outcomingEdges.length == 0;
            });
        }
        getHeight() {
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
        }
        region() {
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
        }
        getMostLeftLeave() {
            var children = this.getChildren();
            if (children.length == 0) {
                return this;
            }
            else {
                return children[0].getMostLeftLeave();
            }
        }
        addOffset(_x, _y) {
            this.getSubtree().forEach(function (x, i, arr) {
                x.x += _x;
                x.y += _y;
            });
        }
        setRectangleLocation(_x, _y) {
            var x = this.getMostLeftLeave().root.region.x;
            var y = this.root.region.y;
            var diffX = _x - x;
            var diffY = _y - y;
            this.addOffset(diffX, diffY);
            this.graph.updateEdges();
        }
        setRootLocation(_x, _y) {
            var x = this.root.x;
            var y = this.root.y;
            var diffX = _x - x;
            var diffY = _y - y;
            this.addOffset(diffX, diffY);
            this.graph.updateEdges();
        }
    }
    GraphTableSVG.VirtualTree = VirtualTree;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class Padding {
        constructor() {
            this.top = 0;
            this.left = 0;
            this.right = 0;
            this.bottom = 0;
        }
    }
    GraphTableSVG.Padding = Padding;
    var VerticalAnchor;
    (function (VerticalAnchor) {
        VerticalAnchor[VerticalAnchor["Bottom"] = 0] = "Bottom";
        VerticalAnchor[VerticalAnchor["Middle"] = 1] = "Middle";
        VerticalAnchor[VerticalAnchor["Top"] = 2] = "Top";
    })(VerticalAnchor = GraphTableSVG.VerticalAnchor || (GraphTableSVG.VerticalAnchor = {}));
    var HorizontalAnchor;
    (function (HorizontalAnchor) {
        HorizontalAnchor[HorizontalAnchor["Left"] = 0] = "Left";
        HorizontalAnchor[HorizontalAnchor["Center"] = 1] = "Center";
        HorizontalAnchor[HorizontalAnchor["Right"] = 2] = "Right";
    })(HorizontalAnchor = GraphTableSVG.HorizontalAnchor || (GraphTableSVG.HorizontalAnchor = {}));
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
    class Cell {
        constructor(parent, _px, _py, cellClass = null) {
            this.observerFunc = (x) => {
                for (var i = 0; i < x.length; i++) {
                    var p = x[i];
                    for (var i = 0; i < p.addedNodes.length; i++) {
                        var item = p.addedNodes.item(i);
                        if (item.nodeName == "#text") {
                            this.parent.resize();
                        }
                    }
                }
            };
            this.svgGroup = GraphTableSVG.createGroup();
            if (cellClass != null)
                this.svgGroup.setAttribute("class", cellClass);
            this.padding = new Padding();
            this.cellX = _px;
            this.cellY = _py;
            this.parent = parent;
            this.masterID = this.ID;
            this.svgBackground = GraphTableSVG.createRectangle(this.defaultBackgroundClass);
            this.svgText = GraphTableSVG.createText(this.defaultTextClass);
            this.svgGroup.appendChild(this.svgBackground);
            /*
            var circle = createRectangle();
            circle.style.fill = "blue";
            this.rect = circle;
            this.svgGroup.appendChild(circle);
            */
            this.svgGroup.appendChild(this.svgText);
            this.parent.svgGroup.appendChild(this.svgGroup);
            this.upLine = GraphTableSVG.createLine(0, 0, 0, 0);
            this.leftLine = GraphTableSVG.createLine(0, 0, 0, 0);
            this.rightLine = GraphTableSVG.createLine(0, 0, 0, 0);
            this.bottomLine = GraphTableSVG.createLine(0, 0, 0, 0);
            this.parent.svgGroup.appendChild(this.upLine);
            this.parent.svgGroup.appendChild(this.leftLine);
            this.parent.svgGroup.appendChild(this.rightLine);
            this.parent.svgGroup.appendChild(this.bottomLine);
            this.svgGroup.parentNode;
            this._observer = new MutationObserver(this.observerFunc);
            var option = { childList: true };
            this._observer.observe(this.svgText, option);
            /*
            this.verticalAnchor = VerticalAnchor.Middle;
            this.horizontalAnchor = HorizontalAnchor.Left;
            */
        }
        //rect: SVGRectElement;
        //private _horizontalAnchor: HorizontalAnchor;
        get horizontalAnchor() {
            return this.svgGroup.getActiveStyle().getHorizontalAnchor();
        }
        set horizontalAnchor(value) {
            this.svgGroup.getActiveStyle().setHorizontalAnchor(value);
            this.relocation();
        }
        get cellX() {
            return Number(this.svgGroup.getAttribute("cellX"));
        }
        set cellX(value) {
            this.svgGroup.setAttribute("cellX", value.toString());
        }
        get cellY() {
            return Number(this.svgGroup.getAttribute("cellY"));
        }
        set cellY(value) {
            this.svgGroup.setAttribute("cellY", value.toString());
        }
        get verticalAnchor() {
            return this.svgGroup.getActiveStyle().getVerticalAnchor();
        }
        set verticalAnchor(value) {
            this.svgGroup.getActiveStyle().setVerticalAnchor(value);
            this.relocation();
        }
        get upLine() {
            return this._upLine;
        }
        set upLine(line) {
            this._upLine = line;
        }
        get leftLine() {
            return this._leftLine;
        }
        set leftLine(line) {
            this._leftLine = line;
        }
        get rightLine() {
            return this._rightLine;
        }
        set rightLine(line) {
            this._rightLine = line;
        }
        get bottomLine() {
            return this._bottomLine;
        }
        set bottomLine(line) {
            this._bottomLine = line;
        }
        get defaultTextClass() {
            var r = this.svgGroup.getActiveStyle().getPropertyValue("--default-text-class").trim();
            if (r.length == 0) {
                return null;
            }
            else {
                return r;
            }
        }
        get defaultBackgroundClass() {
            var r = this.svgGroup.getActiveStyle().getPropertyValue("--default-background-class").trim();
            if (r.length == 0) {
                return null;
            }
            else {
                return r;
            }
        }
        get logicalWidth() {
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
        }
        get logicalHeight() {
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
        }
        get isLocated() {
            return IsDescendantOfBody(this.svgGroup);
        }
        get textBoxWidth() {
            if (this.isLocated) {
                return this.svgText.getBBox().width + this.padding.left + this.padding.right;
            }
            else {
                return 0;
            }
        }
        get textBoxHeight() {
            if (this.isLocated) {
                return this.svgText.getBBox().height + this.padding.top + this.padding.bottom;
            }
            else {
                return 0;
            }
        }
        resize() {
            if (this.width < this.textBoxWidth) {
                this.width = this.textBoxWidth;
            }
            if (this.height < this.textBoxHeight) {
                this.height = this.textBoxHeight;
            }
        }
        relocation() {
            if (!IsDescendantOfBody(this.svgGroup))
                return;
            this.upLine.x1.baseVal.value = this.x;
            this.upLine.x2.baseVal.value = this.x + this.width;
            this.upLine.y1.baseVal.value = this.y;
            this.upLine.y2.baseVal.value = this.upLine.y1.baseVal.value;
            this.leftLine.x1.baseVal.value = this.x;
            this.leftLine.x2.baseVal.value = this.leftLine.x1.baseVal.value;
            this.leftLine.y1.baseVal.value = this.y;
            this.leftLine.y2.baseVal.value = this.y + this.height;
            this.rightLine.x1.baseVal.value = this.x + this.width;
            this.rightLine.x2.baseVal.value = this.rightLine.x1.baseVal.value;
            this.rightLine.y1.baseVal.value = this.y;
            this.rightLine.y2.baseVal.value = this.y + this.height;
            this.bottomLine.x1.baseVal.value = this.x;
            this.bottomLine.x2.baseVal.value = this.x + this.width;
            this.bottomLine.y1.baseVal.value = this.y + this.height;
            this.bottomLine.y2.baseVal.value = this.bottomLine.y1.baseVal.value;
            //this.textSVG.x.baseVal.getItem(0).value = 0;
            var text_x = 0;
            var text_y = 0;
            var innerRect = new GraphTableSVG.Rectangle();
            innerRect.x = this.padding.left;
            innerRect.y = this.padding.top;
            innerRect.height = this.height - this.padding.top - this.padding.bottom;
            innerRect.width = this.width - this.padding.left - this.padding.right;
            setXY(this.svgText, innerRect, this.verticalAnchor, this.horizontalAnchor);
            //var style = getComputedStyle(this.svgText, "");
            //var anchor = style.textAnchor;
            /*
            var innerHeight = this.height - this.padding.top - this.padding.bottom;
            var innerWidth = this.width - this.padding.left - this.padding.right;

            var box = this.svgText.getBBox();
            //console.log(box);

            //this.svgText.style.dominantBaseline = "middle";

            text_y = this.padding.top;
            */
            /*
            if (this.verticalAnchor == VerticalAnchor.Top) {
                //this.svgText.style.dominantBaseline = "text-before-edge";
                text_y = this.padding.top + (box.height / 2);
            } else if (this.verticalAnchor == VerticalAnchor.Middle) {
                //this.svgText.style.dominantBaseline = "middle";
                text_y = innerHeight / 2 + this.padding.top;
            } else if (this.verticalAnchor == VerticalAnchor.Bottom) {
                //this.svgText.style.dominantBaseline = "text-after-edge";
                text_y = this.padding.top + innerHeight - (box.height / 2);
            } else {
                //this.svgText.style.dominantBaseline = "text-before-edge";
                text_y = this.padding.top + (box.height / 2);
            }
            */
            //this.svgText.style.alignmentBaseline = "middle";
            //this.svgText.style.textAnchor = "start";
            /*
            if (this.horizontalAnchor == HorizontalAnchor.Center) {
                //this.svgText.style.textAnchor = "middle";
                text_x = this.padding.left + ((innerWidth - box.width) / 2);
            } else if (this.horizontalAnchor == HorizontalAnchor.Left) {
                //this.svgText.style.textAnchor = "start";
                text_x = this.padding.left;
            } else if (this.horizontalAnchor == HorizontalAnchor.Right) {
                //this.svgText.style.textAnchor = "end";
                text_x = this.padding.left + innerWidth - box.width;
            } else {
                //this.svgText.style.textAnchor = "middle";
                text_x = this.padding.left;
            }
            */
            /*
            this.svgText.setAttribute('x', text_x.toString());
            this.svgText.setAttribute('y', text_y.toString());

            
            var b2 = this.svgText.getBBox();

            var dy = b2.y - this.padding.top;

            
            if (this.verticalAnchor == VerticalAnchor.Top) {
                text_y -= dy;
            } else if (this.verticalAnchor == VerticalAnchor.Middle) {
                text_y -= dy;
                text_y += (innerHeight - box.height)/2
            } else if (this.verticalAnchor == VerticalAnchor.Bottom) {
                text_y -= dy;
                text_y += innerHeight - box.height;
            } else {
                text_y -= dy;
            }
            this.svgText.setAttribute('y', text_y.toString());
            */
            /*
            var b3 = this.svgText.getBBox();

            this.rect.x.baseVal.value = b3.x;
            this.rect.y.baseVal.value = b3.y;
            this.rect.width.baseVal.value = b3.width;
            this.rect.height.baseVal.value = b3.height;
            */
            //this.svgText.setAttribute('x', '20');
            //this.svgText.setAttribute('y', this.svgText.getBoundingClientRect().height.toString());
        }
        get isMaster() {
            return this.ID == this.masterID;
        }
        get isSlave() {
            return !this.isMaster;
        }
        get ID() {
            return this.cellX + (this.cellY * this.parent.width);
        }
        get upCell() {
            return this.cellY != 0 ? this.parent.cells[this.cellY - 1][this.cellX] : null;
        }
        get leftCell() {
            return this.cellX != 0 ? this.parent.cells[this.cellY][this.cellX - 1] : null;
        }
        get rightCell() {
            return this.cellX + 1 != this.parent.width ? this.parent.cells[this.cellY][this.cellX + 1] : null;
        }
        get bottomCell() {
            return this.cellY + 1 != this.parent.height ? this.parent.cells[this.cellY + 1][this.cellX] : null;
        }
        get upperGroupCells() {
            if (this.isMaster) {
                var w = [];
                var now = this;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.upCell;
                }
                return w;
            }
            else {
                return [];
            }
        }
        get leftGroupCells() {
            if (this.isMaster) {
                var w = [];
                var now = this;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.leftCell;
                }
                return w;
            }
            else {
                return [];
            }
        }
        get leftBottomGroupCell() {
            if (this.isMaster) {
                return this.parent.cells[this.cellY + this.logicalHeight - 1][this.cellX];
            }
            else {
                return null;
            }
        }
        get rightUpGroupCell() {
            if (this.isMaster) {
                return this.parent.cells[this.cellY][this.cellX + this.logicalWidth - 1];
            }
            else {
                return null;
            }
        }
        get bottomGroupCells() {
            if (this.isMaster) {
                var w = [];
                var now = this.leftBottomGroupCell;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.bottomCell;
                }
                return w;
            }
            else {
                return [];
            }
        }
        get rightGroupCells() {
            if (this.isMaster) {
                var w = [];
                var now = this.rightUpGroupCell;
                while (now != null && this.ID == now.masterID) {
                    w.push(now);
                    now = this.rightCell;
                }
                return w;
            }
            else {
                return [];
            }
        }
        /*
        get upVirtualCells(): Cell[] {
            if (this.isMaster && this.cellY != 0) {
                var upperGroupCells = this.upperGroupCells;
                var r1 = upperGroupCells.map(function (x, i, self) {
                    return upperGroupCells[i].upCell;
                });
                var r2 = r1.filter(function (x, i, self) {
                    return r1.indexOf(x) === i;
                });
                return r2;
            } else {
                return [];
            }
        }
        */
        get x() {
            return this.svgGroup.getX();
        }
        set x(value) {
            this.svgGroup.setX(value);
        }
        get y() {
            return this.svgGroup.getY();
        }
        set y(value) {
            this.svgGroup.setY(value);
        }
        get width() {
            return this.svgBackground.width.baseVal.value;
        }
        set width(value) {
            this.svgBackground.width.baseVal.value = value;
        }
        get height() {
            return this.svgBackground.height.baseVal.value;
        }
        set height(value) {
            this.svgBackground.height.baseVal.value = value;
        }
        get region() {
            var p = new GraphTableSVG.Rectangle(this.x, this.y, this.width, this.height);
            return p;
        }
    }
    GraphTableSVG.Cell = Cell;
})(GraphTableSVG || (GraphTableSVG = {}));
SVGGElement.prototype.getX = function () {
    var p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "translate(0,0)");
    }
    return p.transform.baseVal.getItem(0).matrix.e;
};
SVGGElement.prototype.setX = function (value) {
    var p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "translate(0,0)");
    }
    return this.transform.baseVal.getItem(0).matrix.e = value;
};
SVGGElement.prototype.getY = function () {
    var p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "translate(0,0)");
    }
    return this.transform.baseVal.getItem(0).matrix.f;
};
SVGGElement.prototype.setY = function (value) {
    var p = this;
    if (p.transform.baseVal.numberOfItems == 0) {
        p.setAttribute('transform', "translate(0,0)");
    }
    return this.transform.baseVal.getItem(0).matrix.f = value;
};
CSSStyleDeclaration.prototype.tryGetPropertyValue = function (name) {
    var p = this;
    var r = p.getPropertyValue(name).trim();
    if (r.length == 0) {
        return null;
    }
    else {
        return r;
    }
};
CSSStyleDeclaration.prototype.getHorizontalAnchor = function () {
    var p = this;
    var r = p.getPropertyValue("--horizontal-anchor").trim();
    if (r == "left") {
        return GraphTableSVG.HorizontalAnchor.Left;
    }
    else if (r == "right") {
        return GraphTableSVG.HorizontalAnchor.Right;
    }
    else if (r == "center") {
        return GraphTableSVG.HorizontalAnchor.Center;
    }
    else {
        return null;
    }
};
CSSStyleDeclaration.prototype.setHorizontalAnchor = function (value) {
    var p = this;
    if (value == GraphTableSVG.HorizontalAnchor.Left) {
        p.setProperty("--horizontal-anchor", "left");
    }
    else if (value == GraphTableSVG.HorizontalAnchor.Right) {
        p.setProperty("--horizontal-anchor", "right");
    }
    else if (value == GraphTableSVG.HorizontalAnchor.Center) {
        p.setProperty("--horizontal-anchor", "center");
    }
    else {
        p.setProperty("--horizontal-anchor", null);
    }
};
CSSStyleDeclaration.prototype.getVerticalAnchor = function () {
    var p = this;
    var r = p.getPropertyValue("--vertical-anchor").trim();
    if (r == "bottom") {
        return GraphTableSVG.VerticalAnchor.Bottom;
    }
    else if (r == "middle") {
        return GraphTableSVG.VerticalAnchor.Middle;
    }
    else if (r == "top") {
        return GraphTableSVG.VerticalAnchor.Top;
    }
    else {
        return null;
    }
};
CSSStyleDeclaration.prototype.setVerticalAnchor = function (value) {
    var p = this;
    if (value == GraphTableSVG.VerticalAnchor.Bottom) {
        p.setProperty("--vertical-anchor", "bottom");
    }
    else if (value == GraphTableSVG.VerticalAnchor.Middle) {
        p.setProperty("--vertical-anchor", "middle");
    }
    else if (value == GraphTableSVG.VerticalAnchor.Top) {
        p.setProperty("--vertical-anchor", "top");
    }
    else {
        p.setProperty("--vertical-anchor", null);
    }
};
SVGElement.prototype.getActiveStyle = function () {
    var p = this;
    var r = p.getAttribute("class");
    if (r == null) {
        return p.style;
    }
    else {
        return getComputedStyle(p);
    }
};
SVGElement.prototype.getPropertyValue = function (name) {
    var item = this;
    var p = item.style.getPropertyValue(name).trim();
    if (p.length == 0) {
        var r = item.getAttribute("class");
        if (r == null) {
            return null;
        }
        else {
            var p2 = getComputedStyle(item).getPropertyValue(name).trim();
            if (p2.length == 0) {
                return null;
            }
            else {
                return p2;
            }
        }
    }
    else {
        return p;
    }
};
SVGElement.prototype.setPropertyValue = function (name, value) {
    var item = this;
    item.style.setProperty(name, value);
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
function IsDescendantOfBody(node) {
    var parent = node.parentNode;
    if (parent == null) {
        return false;
    }
    else if (parent == document.body) {
        return true;
    }
    else {
        return IsDescendantOfBody(parent);
    }
}
function setXY(text, rect, vAnchor, hAnchor) {
    var x = rect.x;
    var y = rect.y;
    text.setAttribute('x', x.toString());
    text.setAttribute('y', y.toString());
    var b2 = text.getBBox();
    var dy = b2.y - y;
    var dx = b2.x - x;
    y -= dy;
    if (vAnchor == GraphTableSVG.VerticalAnchor.Middle) {
        y += (rect.height - b2.height) / 2;
    }
    else if (vAnchor == GraphTableSVG.VerticalAnchor.Bottom) {
        y += rect.height - b2.height;
    }
    x -= dx;
    if (hAnchor == GraphTableSVG.HorizontalAnchor.Center) {
        x += (rect.width - b2.width) / 2;
    }
    else if (hAnchor == GraphTableSVG.HorizontalAnchor.Right) {
        x += rect.width - b2.width;
    }
    text.setAttribute('y', y.toString());
    text.setAttribute('x', x.toString());
}
var GraphTableSVG;
(function (GraphTableSVG) {
    class Row {
        constructor(_table, _y) {
            this.table = _table;
            this.y = _y;
        }
        getMaxHeight() {
            var height = 0;
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                if (height < cell.textBoxHeight)
                    height = cell.textBoxHeight;
                if (height < cell.height)
                    height = cell.height;
            }
            return height;
        }
        setHeight(height) {
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                cell.height = height;
            }
        }
        resize() {
            this.setHeight(this.getMaxHeight());
        }
        setY(posY) {
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                cell.y = posY;
            }
        }
        get height() {
            return this.getMaxHeight();
        }
        set height(value) {
            for (var x = 0; x < this.table.width; x++) {
                var cell = this.table.cells[this.y][x];
                cell.height = value;
            }
        }
    }
    GraphTableSVG.Row = Row;
    class Column {
        constructor(_table, _x) {
            this.table = _table;
            this.x = _x;
        }
        getMaxWidth() {
            var width = 0;
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.x];
                if (width < cell.textBoxWidth)
                    width = cell.textBoxWidth;
                if (width < cell.width)
                    width = cell.width;
            }
            return width;
        }
        setWidth(width) {
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.x];
                cell.width = width;
            }
        }
        resize() {
            this.setWidth(this.getMaxWidth());
        }
        setX(posX) {
            for (var y = 0; y < this.table.height; y++) {
                var cell = this.table.cells[y][this.x];
                cell.x = posX;
            }
        }
        get width() {
            return this.getMaxWidth();
        }
        set width(value) {
            this.setWidth(value);
        }
    }
    GraphTableSVG.Column = Column;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class SVGToVBA {
        static createTable(table) {
            var lines = new Array(0);
            lines.push(`Sub createMyTable()`);
            lines.push(` Dim createdSlide As slide`);
            lines.push(` Set createdSlide = ActivePresentation.Slides.Add(1, ppLayoutBlank)`);
            var [main, sub] = table.createVBAMainCode("createdSlide");
            lines.push(main);
            lines.push(`MsgBox "created"`);
            lines.push(`End Sub`);
            lines.push(sub);
            lines.push(SVGToVBA.cellFunctionCode);
            return VBATranslateFunctions.joinLines(lines);
        }
    }
    SVGToVBA.cellFunctionCode = `
Sub EditTable(table_ As table, cellInfo_() As Variant)
    Dim x As Integer
    Dim y As Integer
    
    For x = 1 To UBound(cellInfo_, 1)
        For y = 1 To UBound(cellInfo_, 2)
         Call EditCell(table_.cell(x, y), CStr(cellInfo_(x, y)(0)))
        Next
    Next
End Sub

Sub EditCell(cell_ As cell, text_ As String, backColor As Variant)
    cell_.Shape.TextFrame.TextRange.text = text_
    cell_.Shape.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))
End Sub
Sub EditCellFont(frame_ As TextFrame, fontSize As Double, fontName As String, color As Variant)
    frame_.TextRange.Font.Size = fontSize
    frame_.TextRange.Font.name = fontName
    frame_.TextRange.Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))
End Sub




Sub EditRow(row_ As Row, height As Integer)
    row_.height = height
End Sub
Sub EditColumn(column_ As Column, width As Integer)
    column_.width = width
End Sub

Sub EditCellTextFrame(frame_ As TextFrame, marginTop As Double, marginBottom As Double, marginLeft As Double, marginRight As Double)
    frame_.marginLeft = marginLeft
    frame_.marginRight = marginRight
    frame_.marginTop = marginTop
    frame_.marginBottom = marginBottom
End Sub

Sub EditTextRange(range_ As TextRange, text As String, subBeg As Integer, subLen As Integer, color As Variant)
    range_.text = text
    range_.Font.color.RGB = RGB(CInt(color(0)), CInt(color(1)), CInt(color(2)))
    If subLen > 0 Then
    range_.Characters(subBeg, subLen).Font.Subscript = True
    End If
End Sub

Sub EditShape(shape_ As Shape, name As String, visible As Integer, backColor As Variant)
    shape_.name = name
    shape_.Fill.visible = visible
    shape_.Fill.ForeColor.RGB = RGB(CInt(backColor(0)), CInt(backColor(1)), CInt(backColor(2)))
End Sub
Sub EditCellBorder(line_ As LineFormat, foreColor As Variant, weight As Integer, transparent As Double)
    line_.foreColor.RGB = RGB(CInt(foreColor(0)), CInt(foreColor(1)), CInt(foreColor(2)))
    line_.weight = weight
    line_.Transparency = transparent
End Sub

`;
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
    class VBATranslateFunctions {
        static createStringFunction(item) {
            return item.length == 0 ? `""` : `"` + item + `"`;
        }
        static createArrayFunction(items) {
            var s = ``;
            for (var i = 0; i < items.length; i++) {
                s += items[i];
                if (i + 1 != items.length) {
                    s += `, `;
                }
            }
            return `Array(${s})`;
        }
        static createStringArrayFunction(items) {
            var s = ``;
            for (var i = 0; i < items.length; i++) {
                s += `"${items[i]}"`;
                if (i + 1 != items.length) {
                    s += `, `;
                }
            }
            return `Array(${s})`;
        }
        static createJagArrayFunction(items) {
            var s = ``;
            for (var i = 0; i < items.length; i++) {
                s += VBATranslateFunctions.createArrayFunction(items[i]);
                if (i + 1 != items.length)
                    s += `, `;
            }
            return `Array(${s})`;
        }
        static joinLines(lines) {
            var s = ``;
            for (var i = 0; i < lines.length; i++) {
                s += lines[i];
                if (i + 1 != lines.length)
                    s += `\n`;
            }
            return s;
        }
        static colorToVBA(color) {
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
        }
    }
    GraphTableSVG.VBATranslateFunctions = VBATranslateFunctions;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class SVGTable {
        constructor(width, height, _tableClassName = null) {
            /*
            this._textClassName = _textClassName;
            this.borderClassName = _borderClassName;
            this.backgroundClassName = _backgroundClassName;
            */
            this._cells = [];
            this.observerFunc = (x) => {
                for (var i = 0; i < x.length; i++) {
                    var p = x[i];
                    //console.log(p.attributeName);
                }
            };
            //this._cells = new Array(height);
            var svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            this.svgGroup = svgGroup;
            if (_tableClassName != null)
                this.svgGroup.setAttribute("class", _tableClassName);
            //svgGroup.setAttributeNS(null, 'transform', "translate(160,0)");
            //_svg.appendChild(this.group);
            //this.verticalLines = new Array(width + 1);
            //this.horizontalLines = new Array(height + 1);
            for (var y = 0; y < height; y++) {
                this.insertRowFunction(y, width);
            }
            this._observer = new MutationObserver(this.observerFunc);
            var option = { characterData: true, attributes: true, subtree: true };
            this._observer.observe(this.svgGroup, option);
            this.resize();
        }
        //private _textClassName: string | null = "table_text";
        get defaultCellClass() {
            var r = this.svgGroup.getActiveStyle().getPropertyValue("--default-cell-class").trim();
            if (r.length == 0) {
                return null;
            }
            else {
                return r;
            }
        }
        /*
        set textClassName(value: string | null) {
            this._textClassName = value;
            if (value != null) {
                this.cellArray.forEach((v) => {
                    GraphTableSVG.resetStyle(v.svgText);
                    v.svgText.setAttribute("class", value);
                });
            } else {
                //this.cellArray.forEach((v) => { GraphTableSVG.resetStyle(v.svgText) });
            }
        }
        */
        //private borderClassName: string | null = null;
        //private backgroundClassName: string | null = null;
        get cells() {
            return this._cells;
        }
        get width() {
            if (this.cells.length == 0) {
                return 0;
            }
            else {
                return this.cells[0].length;
            }
        }
        get height() {
            return this.cells.length;
        }
        get rows() {
            var arr = new Array(0);
            for (var y = 0; y < this.height; y++) {
                arr.push(new GraphTableSVG.Row(this, y));
            }
            return arr;
        }
        get columns() {
            var arr = new Array(0);
            for (var x = 0; x < this.width; x++) {
                arr.push(new GraphTableSVG.Column(this, x));
            }
            return arr;
        }
        get cellArray() {
            var arr = new Array(0);
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    arr.push(this.cells[y][x]);
                }
            }
            return arr;
        }
        get borders() {
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
        }
        insertRowFunction(i, width = this.width) {
            var cell = [];
            for (var x = 0; x < width; x++) {
                cell[x] = this.createCell();
            }
            if (i < this.height) {
                for (var x = 0; x < width; x++) {
                    this.cells[i][x].upLine = GraphTableSVG.createLine(0, 0, 0, 0);
                    this.svgGroup.appendChild(this.cells[i][x].upLine);
                }
            }
            this.cells.splice(i, 0, cell);
            this.renumbering();
            for (var x = 0; x < width; x++) {
                this.updateBorder(this.cells[i][x]);
            }
        }
        insertRow(i) {
            this.insertRowFunction(i, this.width == 0 ? 1 : this.width);
        }
        appendRow() {
            this.insertRow(this.height);
        }
        createCell() {
            return new GraphTableSVG.Cell(this, 0, 0, this.defaultCellClass);
        }
        insertColumn(i) {
            if (this.height > 0) {
                for (var y = 0; y < this.height; y++) {
                    var cell = this.createCell();
                    this.cells[y].splice(i, 0, cell);
                }
                if (i < this.height) {
                    for (var y = 0; y < this.height; y++) {
                        this.cells[y][i].leftLine = GraphTableSVG.createLine(0, 0, 0, 0);
                        this.svgGroup.appendChild(this.cells[y][i].leftLine);
                    }
                }
                this.renumbering();
                for (var y = 0; y < this.height; y++) {
                    this.updateBorder(this.cells[y][i]);
                }
            }
            else {
                this.insertRow(0);
            }
        }
        appendColumn() {
            this.insertColumn(this.width);
        }
        updateBorder(cell) {
            if (cell.leftCell != null && cell.leftCell.rightLine != cell.leftLine) {
                this.svgGroup.removeChild(cell.leftLine);
                cell.leftLine = cell.leftCell.rightLine;
            }
            if (cell.upCell != null && cell.upCell.bottomLine != cell.upLine) {
                this.svgGroup.removeChild(cell.upLine);
                cell.upLine = cell.upCell.bottomLine;
            }
            if (cell.rightCell != null && cell.rightCell.leftLine != cell.rightLine) {
                this.svgGroup.removeChild(cell.rightCell.leftLine);
                cell.rightCell.leftLine = cell.rightLine;
            }
            if (cell.bottomCell != null && cell.bottomCell.upLine != cell.bottomLine) {
                this.svgGroup.removeChild(cell.bottomCell.upLine);
                cell.bottomCell.upLine = cell.bottomLine;
            }
        }
        renumbering() {
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    this.cells[y][x].cellX = x;
                    this.cells[y][x].cellY = y;
                }
            }
            this.borders.forEach((v, i) => { v.setAttribute("borderID", i.toString()); });
            /*
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    this.setLine(this.cells[y][x]);
                }
            }
            */
        }
        resize() {
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
        }
        getRegion() {
            var regions = this.cellArray.map((v) => v.region);
            var rect = GraphTableSVG.Rectangle.merge(regions);
            rect.addOffset(this.svgGroup.getX(), this.svgGroup.getY());
            return rect;
            /*
            var [minX, minY] = [0, 0];
            var [maxX, maxY] = [0, 0];
            this.cellArray.forEach((v) => {
                if (minX > v.x) minX = v.x;
                if (minY > v.y) minY = v.y;
                if (maxX < v.x + v.width) maxX = v.x + v.width;
                if (maxY < v.y + v.height) maxY = v.y + v.height;
            });
            var p = new Rectangle();
            p.width = maxX - minX;
            p.height = maxY - minY;
            p.x = this.group.getX();
            p.y = this.group.getY();
            return p;
            */
        }
        getCellFromID(id) {
            var y = Math.floor(id / this.height);
            var x = id % this.width;
            return this.cells[y][x];
        }
        createVBAMainCode(slideName) {
            var fstLines = [];
            var lines = new Array(0);
            fstLines.push(` Dim tableS As shape`);
            fstLines.push(` Dim table_ As table`);
            //lines.push(` Set tableS = CreateTable(createdSlide, ${table.height}, ${table.width})`);
            fstLines.push(` Set tableS = ${slideName}.Shapes.AddTable(${this.height}, ${this.width})`);
            //page.Shapes.AddTable(row_, column_)
            fstLines.push(` Set table_ = tableS.table`);
            var tableName = "table_";
            for (var y = 0; y < this.height; y++) {
                lines.push(` Call EditRow(${tableName}.Rows(${y + 1}), ${this.rows[y].height})`);
            }
            for (var x = 0; x < this.width; x++) {
                lines.push(` Call EditColumn(${tableName}.Columns(${x + 1}), ${this.columns[x].width})`);
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    var style = cell.svgBackground.style.fill != null ? GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.svgBackground.style.fill) : "";
                    lines.push(` Call EditCell(${tableName}.cell(${y + 1},${x + 1}), "${cell.svgText.textContent}", ${style})`);
                }
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    var fontSize = cell.svgText.style.fontSize != null ? parseInt(cell.svgText.style.fontSize) : "";
                    var color = cell.svgText.style.fill != null ? GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.svgText.style.fill) : "";
                    lines.push(` Call EditCellFont(${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame, ${fontSize}, "${cell.svgText.style.fontFamily}", ${color})`);
                }
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    lines.push(` Call EditCellTextFrame(${tableName}.cell(${y + 1},${x + 1}).Shape.TextFrame, ${cell.padding.top}, ${cell.padding.bottom}, ${cell.padding.left}, ${cell.padding.right})`);
                }
            }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var cell = this.cells[y][x];
                    var upLineStyle = cell.upLine.style.fill != null ? GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.upLine.style.fill) : "";
                    var upLineStrokeWidth = cell.upLine.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.upLine.style.strokeWidth) : "";
                    var upLineVisibility = cell.upLine.style.visibility != null ? GraphTableSVG.visible(cell.upLine.style.visibility) : "";
                    lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderTop), ${upLineStyle}, ${upLineStrokeWidth}, ${upLineVisibility})`);
                    var leftLineStyle = cell.leftLine.style.fill != null ? GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.leftLine.style.fill) : "";
                    var leftLineStrokeWidth = cell.leftLine.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.leftLine.style.strokeWidth) : "";
                    var leftLineVisibility = cell.leftLine.style.visibility != null ? GraphTableSVG.visible(cell.leftLine.style.visibility) : "";
                    lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderLeft), ${leftLineStyle}, ${leftLineStrokeWidth}, ${leftLineVisibility})`);
                    if (x + 1 == this.width) {
                        var rightLineStyle = cell.rightLine.style.fill != null ? GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.rightLine.style.fill) : "";
                        var rightLineStrokeWidth = cell.rightLine.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.rightLine.style.strokeWidth) : "";
                        var rightLineVisibility = cell.rightLine.style.visibility != null ? GraphTableSVG.visible(cell.rightLine.style.visibility) : "";
                        lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderRight), ${rightLineStyle}, ${rightLineStrokeWidth}, ${rightLineVisibility})`);
                    }
                    if (y + 1 == this.height) {
                        var bottomLineStyle = cell.bottomLine.style.fill != null ? GraphTableSVG.VBATranslateFunctions.colorToVBA(cell.bottomLine.style.fill) : "";
                        var bottomLineStrokeWidth = cell.bottomLine.style.strokeWidth != null ? GraphTableSVG.parseInteger(cell.bottomLine.style.strokeWidth) : "";
                        var bottomLineVisibility = cell.bottomLine.style.visibility != null ? GraphTableSVG.visible(cell.bottomLine.style.visibility) : "";
                        lines.push(` Call EditCellBorder(${tableName}.cell(${y + 1},${x + 1}).Borders(ppBorderBottom), ${bottomLineStyle}, ${bottomLineStrokeWidth}, ${bottomLineVisibility})`);
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
            var [x1, y1] = this.splitCode(tableName, lines);
            return [GraphTableSVG.VBATranslateFunctions.joinLines([x0, x1]), y1];
        }
        splitCode(tableName, codes) {
            var functions = [];
            var p = this.splitCode1(codes);
            p.forEach(function (x, i, arr) {
                functions.push(`Call SubFunction${i}(${tableName})`);
                var begin = `Sub SubFunction${i}(${tableName} As Table)`;
                var end = `End Sub`;
                p[i] = GraphTableSVG.VBATranslateFunctions.joinLines([begin, x, end]);
            });
            return [GraphTableSVG.VBATranslateFunctions.joinLines(functions), GraphTableSVG.VBATranslateFunctions.joinLines(p)];
        }
        splitCode1(codes) {
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
        }
        removeTable(svg) {
            if (svg.contains(this.svgGroup)) {
                svg.removeChild(this.svgGroup);
            }
        }
    }
    GraphTableSVG.SVGTable = SVGTable;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    var CSSFunctions;
    (function (CSSFunctions) {
        function getPropertyValue(item, name) {
            var p = item.style.getPropertyValue(name).trim();
            if (p.length == 0) {
                var r = item.getAttribute("class");
                if (r == null) {
                    return null;
                }
                else {
                    var p2 = getComputedStyle(item).getPropertyValue(name).trim();
                    if (p2.length == 0) {
                        return null;
                    }
                    else {
                        return p2;
                    }
                }
            }
            else {
                return p;
            }
        }
        CSSFunctions.getPropertyValue = getPropertyValue;
        function setPropertyValue(item, name, value) {
            item.style.setProperty(name, value);
        }
        CSSFunctions.setPropertyValue = setPropertyValue;
    })(CSSFunctions = GraphTableSVG.CSSFunctions || (GraphTableSVG.CSSFunctions = {}));
    class Rectangle {
        /*
        x: number = 0;
        y: number = 0;
        width: number = 0;
        height: number = 0;
        */
        constructor(x = 0, y = 0, width = 0, height = 0) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        get right() {
            return this.x + this.width;
        }
        get bottom() {
            return this.y + this.height;
        }
        addOffset(x, y) {
            this.x += x;
            this.y += y;
        }
        static merge(rects) {
            var x1 = rects[0].x;
            var y1 = rects[0].y;
            var x2 = rects[0].right;
            var y2 = rects[0].bottom;
            rects.forEach((v) => {
                if (x1 > v.x)
                    x1 = v.x;
                if (y1 > v.y)
                    y1 = v.y;
                if (x2 < v.right)
                    x2 = v.right;
                if (y2 < v.bottom)
                    y2 = v.bottom;
            });
            var rect = new Rectangle();
            rect.x = x1;
            rect.y = y1;
            rect.width = x2 - x1;
            rect.height = y2 - y1;
            return rect;
        }
    }
    GraphTableSVG.Rectangle = Rectangle;
    var NodeOrder;
    (function (NodeOrder) {
        NodeOrder[NodeOrder["Preorder"] = 0] = "Preorder";
        NodeOrder[NodeOrder["Postorder"] = 1] = "Postorder";
    })(NodeOrder = GraphTableSVG.NodeOrder || (GraphTableSVG.NodeOrder = {}));
    var ConnectorPosition;
    (function (ConnectorPosition) {
        ConnectorPosition[ConnectorPosition["Top"] = 1] = "Top";
        ConnectorPosition[ConnectorPosition["LeftUp"] = 2] = "LeftUp";
        ConnectorPosition[ConnectorPosition["Left"] = 3] = "Left";
        ConnectorPosition[ConnectorPosition["LeftDown"] = 4] = "LeftDown";
        ConnectorPosition[ConnectorPosition["Bottom"] = 5] = "Bottom";
        ConnectorPosition[ConnectorPosition["RightDown"] = 6] = "RightDown";
        ConnectorPosition[ConnectorPosition["Right"] = 7] = "Right";
        ConnectorPosition[ConnectorPosition["RightUp"] = 8] = "RightUp";
        ConnectorPosition[ConnectorPosition["Auto"] = 9] = "Auto";
    })(ConnectorPosition = GraphTableSVG.ConnectorPosition || (GraphTableSVG.ConnectorPosition = {}));
    function ToConnectorPosition(str) {
        if (str == null) {
            return ConnectorPosition.Auto;
        }
        else {
            switch (str) {
                case "top": return ConnectorPosition.Top;
                case "leftup": return ConnectorPosition.LeftUp;
                case "left": return ConnectorPosition.Left;
                case "leftdown": return ConnectorPosition.LeftDown;
                case "bottom": return ConnectorPosition.Bottom;
                case "rightdown": return ConnectorPosition.RightDown;
                case "right": return ConnectorPosition.Right;
                case "rightup": return ConnectorPosition.RightUp;
                case "auto": return ConnectorPosition.Auto;
                default: return ConnectorPosition.Auto;
            }
        }
    }
    GraphTableSVG.ToConnectorPosition = ToConnectorPosition;
    function ToStrFromConnectorPosition(position) {
        switch (position) {
            case ConnectorPosition.Top: return "top";
            case ConnectorPosition.LeftUp: return "leftup";
            case ConnectorPosition.Left: return "left";
            case ConnectorPosition.LeftDown: return "leftdown";
            case ConnectorPosition.Bottom: return "bottom";
            case ConnectorPosition.RightUp: return "rightup";
            case ConnectorPosition.Right: return "right";
            case ConnectorPosition.RightDown: return "rightdown";
            case ConnectorPosition.Auto: return "auto";
            default: return "auto";
        }
    }
    GraphTableSVG.ToStrFromConnectorPosition = ToStrFromConnectorPosition;
    function createLine(x, y, x2, y2, className = null) {
        var line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.x1.baseVal.value = x;
        line1.x2.baseVal.value = x2;
        line1.y1.baseVal.value = y;
        line1.y2.baseVal.value = y2;
        //line1.style.color = "black";
        if (className != null) {
            line1.setAttribute("class", className);
        }
        else {
            line1.style.stroke = "black";
        }
        //line1.style.visibility = "hidden";
        //line1.style.strokeWidth = `${5}`
        //line1.setAttribute('stroke', 'black');
        return line1;
    }
    GraphTableSVG.createLine = createLine;
    function createText(className = null) {
        var _svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        //_svgText.style.textAnchor = "middle";
        if (className == null) {
            _svgText.style.fill = "black";
            _svgText.style.fontSize = "14px";
            _svgText.style.fontWeight = "bold";
        }
        else {
            _svgText.setAttribute("class", className);
            //_svgText.className = className;
        }
        return _svgText;
    }
    GraphTableSVG.createText = createText;
    function createRectangle(className = null) {
        var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.width.baseVal.value = 30;
        rect.height.baseVal.value = 30;
        if (className == null) {
            rect.style.fill = "#ffffff";
            rect.style.stroke = "#000000";
        }
        else {
            rect.setAttribute("class", className);
            var s1 = rect.getActiveStyle().getPropertyValue(defaultWidthName).trim();
            if (s1.length > 0) {
                rect.width.baseVal.value = Number(s1);
            }
            var s2 = rect.getActiveStyle().getPropertyValue(defaultHeightName).trim();
            if (s2.length > 0) {
                rect.height.baseVal.value = Number(s2);
            }
        }
        return rect;
    }
    GraphTableSVG.createRectangle = createRectangle;
    function createGroup(className = null) {
        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        if (className != null) {
            g.setAttribute("class", className);
        }
        return g;
    }
    GraphTableSVG.createGroup = createGroup;
    function resetStyle(style) {
        style.stroke = null;
        style.strokeWidth = null;
        style.fill = null;
        style.fontSize = null;
        style.fontWeight = null;
    }
    GraphTableSVG.resetStyle = resetStyle;
    var defaultRadiusName = "--default-radius";
    var defaultWidthName = "--default-width";
    var defaultHeightName = "--default-height";
    function createCircle(className = null) {
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.r.baseVal.value = 30;
        if (className == null) {
            circle.style.stroke = "black";
            circle.style.strokeWidth = "1pt";
            circle.style.fill = "#ffffff";
        }
        else {
            circle.setAttribute("class", className);
            var s = circle.getActiveStyle().getPropertyValue(defaultRadiusName).trim();
            circle.r.baseVal.value = Number(s);
            //circle.className = className
            //console.log("d : " + circle.setAttribute("class", className));
        }
        //circle.style.fill = "#ffffff";
        circle.cx.baseVal.value = 0;
        circle.cy.baseVal.value = 0;
        //circle.r.baseVal.value = r;
        return circle;
    }
    GraphTableSVG.createCircle = createCircle;
})(GraphTableSVG || (GraphTableSVG = {}));
var GraphTableSVG;
(function (GraphTableSVG) {
    class VLine {
        constructor(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        }
        get smallPoint() {
            if (this.x1 < this.x2) {
                return [this.x1, this.y1];
            }
            else {
                return [this.x2, this.y2];
            }
        }
        get largePoint() {
            if (this.x1 < this.x2) {
                return [this.x2, this.y2];
            }
            else {
                return [this.x1, this.y1];
            }
        }
        contains(x, y) {
            var lineY = this.getY(x);
            if (lineY == null) {
                return x < this.x1;
            }
            else {
                return y < lineY;
            }
        }
        getY(x) {
            var intercept = this.intercept;
            if (intercept == null) {
                return null;
            }
            else {
                if (this.slope == null) {
                    return null;
                }
                else {
                    return (this.slope * x) + intercept;
                }
            }
        }
        get slope() {
            var [x1, y1] = this.smallPoint;
            var [x2, y2] = this.largePoint;
            if (x2 - x1 == 0) {
                return null;
            }
            else {
                return (y2 - y1) / (x2 - x1);
            }
        }
        get intercept() {
            var [x1, y1] = this.smallPoint;
            var [x2, y2] = this.largePoint;
            if (this.slope == null) {
                return null;
            }
            else {
                return y1 - x1 * this.slope;
            }
        }
        get inverseSlope() {
            if (this.slope == 0) {
                return null;
            }
            else {
                if (this.slope == null) {
                    return null;
                }
                else {
                    return -1 / this.slope;
                }
            }
        }
        inverseIntercept(x, y) {
            if (this.slope == 0) {
                return null;
            }
            else {
                if (this.inverseSlope == null) {
                    return null;
                }
                else {
                    return y - (this.inverseSlope * x);
                }
            }
        }
    }
    GraphTableSVG.VLine = VLine;
})(GraphTableSVG || (GraphTableSVG = {}));
//# sourceMappingURL=graph_table_svg.js.map