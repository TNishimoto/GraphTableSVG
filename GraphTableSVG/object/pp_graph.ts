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

        
        public get vertices() : PPVertexBase[]{
            const r : PPVertexBase[] = [];
            HTMLFunctions.getChildren(this.svgGroup).filter((v) => v.hasAttribute(GraphTableSVG.SVG.objectIDName)).forEach((v)=>{
                const item = SVGGroupBase.getObjectFromObjectID(this.svgGroup.getAttribute(GraphTableSVG.SVG.objectIDName))
                if(item instanceof PPVertexBase){
                    r.push(item);
                }
            })
            return r;
        }
        public get edges() : PPEdge[]{
            const r : PPEdge[] = [];
            HTMLFunctions.getChildren(this.svgGroup).filter((v) => v.hasAttribute(GraphTableSVG.SVG.objectIDName)).forEach((v)=>{
                const item = SVGGroupBase.getObjectFromObjectID(this.svgGroup.getAttribute(GraphTableSVG.SVG.objectIDName))
                if(item instanceof PPEdge){
                    r.push(item);
                }
            })
            return r;
        }
        
        protected _roots: PPVertexBase[] = [];
        constructor(box: SVGElement, option: TextBoxShapeAttributes = {}) {
            super(box, option)

        }



    }





}