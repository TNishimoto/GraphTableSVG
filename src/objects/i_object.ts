export interface IObject {
    get svgGroup() : SVGGElement;
    get objectID() : string;
    get stableFlag() : boolean;
    get childrenStableFlag() : boolean;
    updateSurfaceWithoutSVGText() : boolean;
    //get id() : string | null;

}
export interface ITextBox {
    get svgGroup() : SVGGElement;
    get objectID() : string;
    get stableFlag() : boolean;
    get childrenStableFlag() : boolean;
    updateSurfaceWithoutSVGText() : boolean;

    get svgText() : SVGTextElement;
}
export interface IEdge {
    get svgGroup() : SVGGElement;
    get objectID() : string;
    get stableFlag() : boolean;
    get childrenStableFlag() : boolean;
    updateSurfaceWithoutSVGText() : boolean;
    get beginVertexID() : string | null;
    get endVertexID() : string | null;
    get svgPath() : SVGPathElement;

}
