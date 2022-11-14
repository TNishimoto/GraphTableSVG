//namespace GraphTableSVG {
import { ZGraph } from "../z_graph"
import { ZVertex } from "../z_vertex"

import { VirtualTree } from "./virtual_tree"

import { ZAbstractEdge } from "../z_abstract_edge"



export function createForestInLevelOrder(graph: ZGraph): VirtualTree[] {
    const roots = graph.roots.length == 0 ? [graph.vertices[0]] : graph.roots;
    const externalEdges = createExternalEdgeDicInLevelOrder(graph);
    return roots.map((v) => v.createVirtualTree(externalEdges));
}
function createExternalEdgeDicInLevelOrder(graph: ZGraph): Set<ZAbstractEdge> {
    const externalEdges: Set<ZAbstractEdge> = new Set();
    const touchedVertexes: Set<ZVertex> = new Set();
    const inputEdges: ZAbstractEdge[] = new Array(0);

    if (graph.vertices.length > 0) {
        const roots = graph.roots.length == 0 ? [graph.vertices[0]] : graph.roots;

        roots.forEach((v => {
            touchedVertexes.add(v);
            v.outgoingEdges.forEach((w) => inputEdges.push(w));
        }))
        createExternalEdgeDicInLevelOrderSub(inputEdges, externalEdges, touchedVertexes, 0);
    }
    return externalEdges;
}
function createExternalEdgeDicInLevelOrderSub(inputEdges: ZAbstractEdge[], externalEdges: Set<ZAbstractEdge>, touchedVertexes: Set<ZVertex>, level: number) {
    //const edges = inputEdges.filter((v) => v.endVertex != null);
    const nextEdges: ZAbstractEdge[] = new Array(0);
    inputEdges.forEach((v) => {
        if (v.endVertex != null) {
            const node = v.endVertex!;
            if (!touchedVertexes.has(node)) {
                touchedVertexes.add(node)
                node.outgoingEdges.forEach((w) => nextEdges.push(w));
            } else {
                externalEdges.add(v);
            }
        }
    })
    if (nextEdges.length > 0) {
        createExternalEdgeDicInLevelOrderSub(nextEdges, externalEdges, touchedVertexes, level + 1);
    }
}
function createExternalEdgeDicInPreorder(node: ZVertex, incomingEdge: ZAbstractEdge | null, externalEdges: Set<ZAbstractEdge>, touchedVertexes: Set<ZVertex>) {
    if (incomingEdge == null) {
        node.outgoingEdges.forEach((v) => {
            const child = v.endVertex;
            if (child != null) {
                createExternalEdgeDicInPreorder(child, v, externalEdges, touchedVertexes);
            }
        })
    } else {
        if (!touchedVertexes.has(node)) {
            touchedVertexes.add(node);



            node.outgoingEdges.forEach((v) => {
                const child = v.endVertex;
                if (child != null) {
                    createExternalEdgeDicInPreorder(child, v, externalEdges, touchedVertexes);
                }
            })
        } else {
            if (incomingEdge != null) {
                externalEdges.add(incomingEdge);
            }
        }
    }
}

