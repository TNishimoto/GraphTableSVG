namespace GraphTableSVG {

    /**
    グラフを表します。
    */
    export class PPGraph extends SVGGroupBase {
        public static readonly defaultVertexClass: string = "--default-vertex-class";
        public static readonly defaultEdgeClass: string = "--default-edge-class";
        public static readonly vertexXIntervalName: string = "--vertex-x-interval";
        public static readonly vertexYIntervalName: string = "--vertex-y-interval";

        //public static readonly objectIDName: string = "data-objectID";
        public static readonly typeName: string = "data-type";

        protected _vertices: PPVertexBase[] = new Array(0);
        protected _edges: PPEdge[] = new Array(0);
        protected _roots: PPVertexBase[] = [];
        constructor(box: SVGElement, option: TextBoxShapeAttributes = {}) {
            super(box, option)

        }

    }





}