import * as GOptions from "../objects/g_options"
export class LogicGraphEdge {
    public text: string | null = null;
    public endNodeIndex: number = -1;
}


export class LogicGraphNode {
    public text: string | null = null;
    public outputEdges: LogicGraphEdge[] = [];

    public addEdge(e: LogicGraphEdge) {
        this.outputEdges.push(e);
    }
}
export class LogicGraph {
    public nodes: LogicGraphNode[] = [];
    public edges: LogicGraphEdge[] = [];
    public graphOption: GOptions.GGraphAttributes = { relocateStyle: "standard", direction: "down" };
    private className : string = "LogicGraph";

    construct(iten: any) {

    }
    addNode(): LogicGraphNode {
        const node = new LogicGraphNode();
        this.nodes.push(node);
        return node;
    }
    createEdge(): LogicGraphEdge {
        const edge = new LogicGraphEdge();
        this.edges.push(edge);
        return edge;
    }
    getIndex(node: LogicGraphNode) {
        return this.nodes.indexOf(node);
    }
}
