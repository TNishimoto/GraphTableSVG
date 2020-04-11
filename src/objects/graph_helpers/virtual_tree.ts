//namespace GraphTableSVG {

    import { GVertex } from "../g_vertex"    
    import { GEdge } from "../g_edge"    
    import {Rectangle} from "../../common/vline"
import { GAbstractEdge } from "../g_abstract_edge";

    export class VirtualTree {
        subTreeRoot: GVertex;
        externalEdges : Set<GAbstractEdge>;

        constructor(_root: GVertex, _externalEdgeDic? : Set<GAbstractEdge>) {
            this.subTreeRoot = _root;
            if(_externalEdgeDic !== undefined){
                this.externalEdges = _externalEdgeDic;
            }else{
                this.externalEdges = new Set();
            }
        }
        get root(){
            return this.subTreeRoot;
        }
        /**
         * 根の子ノードの配列を返します。
         */
        get children(): GVertex[] {
            //const p = this;
            return this.subTreeRoot.outcomingEdges.filter((v) => !this.externalEdges.has(v) && v.endVertex != null).map((v) => v.endVertex!)
            /*
            return this.subTreeRoot.children.map(function (x, i, arr) {
                return x;
            });
            */
        }
        get virtualTreeChildren() : VirtualTree[]{
            return this.children.map((v) => v.createVirtualTree(this.externalEdges))
            //const child = this.children[nth];
            //return child.createVirtualTree(this.externalEdges);
        }
        
        /**
         * 根の親との間の辺を返します。
         */
        get parentEdge(): GAbstractEdge | null {
            const p = this.subTreeRoot.incomingEdges.filter((v) => !this.externalEdges.has(v) && v.beginVertex != null);
            if(p.length != 0){
                return p[0];
            }else{
                return null;
            }
            //return this.subTreeRoot.parentEdge;
        }
        
        /**
         * この木の中の全てのVertexを返します。
         * @param result 
         */
        public getSubtree(result: GVertex[] = []): GVertex[] {
            result.push(this.subTreeRoot);

            const children = this.virtualTreeChildren;
            if (children.length == 0) {
                return result;
            } else {
                children.forEach(function (x, i, arr) {
                    x.getSubtree(result);
                });
                return result;
            }
        }
        /*
        public getLeaves(): Vertex[] {
            const p = this;
            return this.getSubtree().filter(function (x, i, arr) {
                return x.outcomingEdges.length == 0;
            });
        }
        */
        public getHeight(): number {
            const children = this.virtualTreeChildren;
            if (children.length == 0) {
                return 1;
            } else {
                let max = 0;
                children.forEach(function (x, i, arr) {
                    if (max < x.getHeight()) max = x.getHeight();
                })
                return max + 1;
            }
        }
        /**
         * この木を内包する最小の四角形を返します。
         */
        public region(): Rectangle {
            const p = this.getSubtree();
            let minX = this.subTreeRoot.x;
            let maxX = this.subTreeRoot.x;
            let minY = this.subTreeRoot.y;
            let maxY = this.subTreeRoot.y;
            p.forEach(function (x, i, arr) {
                const rect = x.region;
                if (minX > rect.x) minX = rect.x;
                if (maxX < rect.right) maxX = rect.right;
                if (minY > rect.y) minY = rect.y;
                if (maxY < rect.bottom) maxY = rect.bottom;
            });
            const result = new Rectangle();
            result.x = minX;
            result.y = minY;
            result.width = maxX - minX;
            result.height = maxY - minY;
            return result;
        }
        /**
         * 一番左の葉を返します。
         */
        public get mostLeftLeave(): GVertex {
            return this.leaves[0];
        }

        public addOffset(_x: number, _y: number) {
            this.getSubtree().forEach(function (x, i, arr) {
                x.cx += _x;
                x.cy += _y;
            });
        }
        public setRectangleLocation(_x: number, _y: number) {
            const x = this.mostLeftLeave.region.x;
            const y = this.subTreeRoot.region.y;
            const diffX = _x - x;
            const diffY = _y - y;
            this.addOffset(diffX, diffY);
            //this.graph.updateEdges();
        }
        /**
         * 根を入力位置に移動させます。木も同様に移動します。
         * @param _x 
         * @param _y 
         */
        public setRootLocation(_x: number, _y: number) {
            const x = this.subTreeRoot.cx;
            const y = this.subTreeRoot.cy;
            const diffX = _x - x;
            const diffY = _y - y;
            this.addOffset(diffX, diffY);
            //this.graph.updateEdges();
        }
        public setRegionXYLocation(_x: number, _y: number) {
            const region = this.region();
            const newX = _x - region.x;
            const newY = _y - region.y;

            this.addOffset(newX,newY);
            //this.graph.updateEdges();
        }
        /**
         * 葉の配列を返します。
         */
        get leaves(): GVertex[] {
            //const p = this;
            return this.getSubtree().filter( (x) =>{
                const r = x.outcomingEdges.filter((v) => !this.externalEdges.has(v) && v.endVertex != null).length;
                return r == 0;
            })

            //return this.getSubtree().filter(function (x, i, arr) {
            //
            //    return x.outcomingEdges.length == 0;
            //});
        }

        
    }

//}