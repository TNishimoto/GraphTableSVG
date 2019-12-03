//namespace GraphTableSVG {
import {GEdge} from "./g_edge"
import {GGraph} from "./g_graph"
import {GVertex} from "./g_vertex"

import {VirtualTree} from "./virtual_tree"

import {TreeArrangement} from "./tree_arangement"

    export namespace GraphArrangement {
        export function standardTreeWidthArrangement(graph: GGraph): void {
            const [xi, yi] = TreeArrangement.getXYIntervals(graph);

            
            const roots = graph.roots.length == 0? [graph.vertices[0]] : graph.roots; 
            
            const externalEdges = createExternalEdgeDicInlevelorder(graph);
           
            
            let [x, y] = [0, 0]
            roots.forEach((v=>{
                const tree = v.createVirtualTree(externalEdges);
                standardTreeWidthArrangementSub(tree, xi, yi);
                tree.setRegionXYLocation(x, y);

                x += tree.region().width;
            }))
            

        }
        function standardTreeWidthArrangementSub(tree: VirtualTree, xInterval: number, yInterval: number): void {
            tree.subTreeRoot.cx = 0;
            tree.subTreeRoot.cy = 0;
            let centerX = 0;
            const children = tree.virtualTreeChildren;

            let x = 0;

            //tree.root.svgText.textContent = tree.getHeight().toString();

            if (children.length == 1) {
                tree.subTreeRoot.cx = children[0].root.cx;
                standardTreeWidthArrangementSub(children[0], xInterval, yInterval);

                children[0].setRootLocation(tree.root.cx, yInterval);
            } else if (children.length == 0) {
            } else {
                for (let i = 0; i < children.length; i++) {
                    standardTreeWidthArrangementSub(children[i], xInterval, yInterval);
                    const rect = children[i].region();
                    const diffX = children[i].root.cx - rect.x;

                    children[i].setRootLocation(x + diffX, yInterval);
                    x += rect.width + xInterval;
                    if (i < children.length - 1) {
                        centerX += x - (xInterval / 2);
                    }
                }

                centerX = centerX / (children.length - 1);

                tree.subTreeRoot.cx = centerX;
            }
        }
        function createExternalEdgeDicInPreorder(node : GVertex, incomingEdge : GEdge | null, externalEdges : Set<GEdge>, touchedVertexes : Set<GVertex>){
            if(incomingEdge == null){
                node.outcomingEdges.forEach((v)=>{
                    const child = v.endVertex;
                    if(child != null){
                        createExternalEdgeDicInPreorder(child, v, externalEdges, touchedVertexes);
                    }
                })
            }else{
                if(!touchedVertexes.has(node)){
                    touchedVertexes.add(node);
                    
        

                    node.outcomingEdges.forEach((v)=>{
                        const child = v.endVertex;
                        if(child != null){
                            createExternalEdgeDicInPreorder(child, v, externalEdges, touchedVertexes);
                        }
                    })
                }else{
                    if(incomingEdge != null){
                        externalEdges.add(incomingEdge);
                    }
                }    
            }
        }
        function createExternalEdgeDicInlevelorder(graph :GGraph) : Set<GEdge>{
            const externalEdges : Set<GEdge> = new Set();
            const touchedVertexes : Set<GVertex> = new Set();
            const inputEdges : GEdge[] = new Array(0);

            const roots = graph.roots.length == 0? [graph.vertices[0]] : graph.roots; 
            
            roots.forEach((v=>{
                touchedVertexes.add(v);
                v.outcomingEdges.forEach((w) => inputEdges.push(w));
            }))
            createExternalEdgeDicInlevelorderSub(inputEdges, externalEdges, touchedVertexes, 0);
            return externalEdges;
        }
        function createExternalEdgeDicInlevelorderSub(inputEdges : GEdge[], externalEdges : Set<GEdge>, touchedVertexes : Set<GVertex>, level : number){
            //const edges = inputEdges.filter((v) => v.endVertex != null);
            const nextEdges : GEdge[] = new Array(0);
            inputEdges.forEach((v) =>{
                if(v.endVertex != null){
                    const node = v.endVertex!;
                    if(!touchedVertexes.has(node)){
                        touchedVertexes.add(node)
                        node.outcomingEdges.forEach((w) => nextEdges.push(w));
                    }else{
                        externalEdges.add(v);
                    }
                }
            })
            if(nextEdges.length > 0){
                createExternalEdgeDicInlevelorderSub(nextEdges, externalEdges, touchedVertexes, level+1);
            }
        }


        
    }
//}