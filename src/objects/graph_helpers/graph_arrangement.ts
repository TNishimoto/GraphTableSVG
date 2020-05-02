//namespace GraphTableSVG {
import {GEdge} from "../g_edge"
import {GGraph} from "../g_graph"
import {GVertex} from "../g_vertex"

import {VirtualTree} from "./virtual_tree"

import * as TreeArrangement from "./tree_arangement"
import { Direction, ConnectorType } from "../../common/enums"
import * as SVGTextBox from "../../interfaces/svg_textbox"
import * as SVGTextExtensions from "../../interfaces/svg_text_extension"
import { GAbstractEdge } from "../g_abstract_edge"
import { GAbstractTextEdge } from "../g_abstract_text_edge"

    export namespace GraphArrangement {
        export function standardTreeWidthArrangement(graph: GGraph): void {
            const [xi, yi] = TreeArrangement.getXYIntervals(graph);
            const direction = graph.direction;

            

            
            const roots = graph.roots.length == 0? [graph.vertices[0]] : graph.roots; 

            /*
            const isTrie = graph.edges.every((v)=>{
                return v.svgTextPath.textContent == null || v.svgTextPath.textContent.length <= 1;
            })
            */
            
            const externalEdges = createExternalEdgeDicInlevelorder(graph);
           
            
            let [x, y] = [0, 0]
            roots.forEach((v=>{
                const tree = v.createVirtualTree(externalEdges);
                standardTreeWidthArrangementSub(tree, xi, yi, direction);
                tree.setRegionXYLocation(x, y);

                x += tree.region().width;
            }))
            

        }
        function standardTreeWidthArrangementSub(tree: VirtualTree, xInterval: number, yInterval: number, direction : Direction | null): void {
            tree.subTreeRoot.cx = 0;
            tree.subTreeRoot.cy = 0;
            let centerX = 0;
            const children = tree.virtualTreeChildren;

            let x = 0;

            //tree.root.svgText.textContent = tree.getHeight().toString();
            if(direction == "down"){
                const edge = tree.subTreeRoot.parentEdge;
                if(edge != null){
                    edge.endConnectorType = ConnectorType.Top;
                    edge.beginConnectorType = ConnectorType.Bottom;

                }
            }
            let childYInterval = yInterval;
            children.forEach((v)=>{
                const edge = v.parentEdge!;
                if(edge instanceof GAbstractTextEdge){
                    const path = edge.svgTextPath;
                    if(path.textContent == null || path.textContent.length == 0){
                    }
                    else if(path.textContent.length == 1){
                        const padding = SVGTextBox.getRepresentativeFontSize(path);
                        const edgeLen = (SVGTextExtensions.getWidth(path)) + (padding);
                        if(edgeLen > childYInterval) childYInterval = edgeLen;    
                    }
                    else{
                        const padding = SVGTextBox.getRepresentativeFontSize(path);
                        const edgeLen = (SVGTextExtensions.getWidth(path)) + (padding * 4);
                        if(edgeLen > childYInterval) childYInterval = edgeLen;    
                    }
    
                }
            })

            if (children.length == 1) {
                tree.subTreeRoot.cx = children[0].root.cx;
                standardTreeWidthArrangementSub(children[0], xInterval, yInterval, direction);

                children[0].setRootLocation(tree.root.cx, childYInterval);
            } else if (children.length == 0) {
            } else {
                for (let i = 0; i < children.length; i++) {
                    standardTreeWidthArrangementSub(children[i], xInterval, yInterval, direction);
                    const rect = children[i].region();
                    const diffX = children[i].root.cx - rect.x;

                    children[i].setRootLocation(x + diffX, childYInterval);
                    x += rect.width + xInterval;
                    if (i < children.length - 1) {
                        centerX += x - (xInterval / 2);
                    }
                }

                centerX = centerX / (children.length - 1);

                tree.subTreeRoot.cx = centerX;
            }
        }
        function createExternalEdgeDicInPreorder(node : GVertex, incomingEdge : GAbstractEdge | null, externalEdges : Set<GAbstractEdge>, touchedVertexes : Set<GVertex>){
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
        function createExternalEdgeDicInlevelorder(graph :GGraph) : Set<GAbstractEdge>{
            const externalEdges : Set<GAbstractEdge> = new Set();
            const touchedVertexes : Set<GVertex> = new Set();
            const inputEdges : GAbstractEdge[] = new Array(0);

            if(graph.vertices.length > 0){
                const roots = graph.roots.length == 0? [graph.vertices[0]] : graph.roots; 
            
                roots.forEach((v=>{
                    touchedVertexes.add(v);
                    v.outcomingEdges.forEach((w) => inputEdges.push(w));
                }))
                createExternalEdgeDicInlevelorderSub(inputEdges, externalEdges, touchedVertexes, 0);    
            }
            return externalEdges;
        }
        function createExternalEdgeDicInlevelorderSub(inputEdges : GAbstractEdge[], externalEdges : Set<GAbstractEdge>, touchedVertexes : Set<GVertex>, level : number){
            //const edges = inputEdges.filter((v) => v.endVertex != null);
            const nextEdges : GAbstractEdge[] = new Array(0);
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