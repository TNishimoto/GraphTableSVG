//namespace GraphTableSVG {
import { ZGraph } from "../z_graph"
import { ZVertex } from "../z_vertex"

import { VirtualTree } from "./virtual_tree"

import * as TreeArrangement from "./old_tree_arrangement"
import { Direction, ConnectorType } from "../../common/enums"
import * as SVGTextBox from "../../interfaces/svg_textbox"
import { ZAbstractTextEdge } from "../z_abstract_text_edge"
import { getVirtualRegion } from "../../interfaces/virtual_text"
import { createForestInLevelOrder } from "./virtual_tree_constructor"

export namespace GraphArrangement {
    export function standardTreeWidthArrangement(graph: ZGraph): void {
        const [xi, yi] = TreeArrangement.getXYIntervals(graph);
        const direction = graph.direction == null ? "down" : graph.direction;

        const trees = createForestInLevelOrder(graph);


        let [x, y] = [0, 0]
        trees.forEach((tree => {
            standardTreeWidthArrangementSub(tree, xi, yi, direction);
            tree.setRegionXYLocation(x, y);

            x += tree.region().width;
        }))


    }

    function computeChildBInterval(tree: VirtualTree, xInterval: number, yInterval: number, direction: Direction): number {
        const children = tree.virtualTreeChildren;
        let interval = (direction == "up" || direction == "down") ? yInterval : xInterval;
        //let childYInterval = yInterval;


        children.forEach((v) => {
            const edge = v.parentEdge!;
            if (edge instanceof ZAbstractTextEdge) {
                const path = edge.svgTextPath;
                const textElement = edge.svgText;

                if (path.textContent == null || path.textContent.length == 0) {
                }
                else if (path.textContent.length == 1) {
                    const padding = SVGTextBox.getRepresentativeFontSize(path);
                    const textVRegion = getVirtualRegion(textElement);
                    const edgeLen = Math.max(textVRegion.width, textVRegion.height) + (padding);
                    if (edgeLen > interval) interval = edgeLen;
                }
                else {
                    const padding = SVGTextBox.getRepresentativeFontSize(path);
                    const textVRegion = getVirtualRegion(textElement);

                    const edgeLen = Math.max(textVRegion.width, textVRegion.height) + (padding * 4);

                    //const edgeLen = (SVGTextExtensions.getWidth(path)) + (padding * 4);
                    if (edgeLen > interval) interval = edgeLen;
                }

            }
        })
        return interval;
    }

    function preprocessParentWithSingleLeaf(parent: ZVertex, leaf: ZVertex, direction: Direction) {
        if (direction == "down" || direction == "up") {
            parent.cx = leaf.cx;
        } else {
            parent.cy = leaf.cy;
        }
    }
    function processSingleLeaf(parent: ZVertex, leafSubTree: VirtualTree, width: number, direction: Direction) {
        if (direction == "down") {
            leafSubTree.setRootLocation(parent.cx, width);
        } else if (direction == "up") {
            leafSubTree.setRootLocation(parent.cx, -width);
        } else if (direction == "right") {
            leafSubTree.setRootLocation(width, parent.cy);
        } else {
            leafSubTree.setRootLocation(-width, parent.cy);
        }

    }
    function processIthChild(children: VirtualTree[], i : number, centerA : number, _a: number, aInterval: number, bInterval: number, childBInterval : number, direction: Direction) : [number, number]{
        const ithChildrenRect = children[i].region();
        if(direction == "down" || direction == "up"){
            const diffX = children[i].root.cx - ithChildrenRect.x;
            let _x = _a;
            let _centerX = centerA;
            
            if(direction == "down"){
                children[i].setRootLocation(_x + diffX, childBInterval);
            }else{
                children[i].setRootLocation(_x + diffX, -childBInterval);
            }
            _x += ithChildrenRect.width + aInterval;
            if (i < children.length - 1) {
                _centerX += _x - (aInterval / 2);
            }
            return [_centerX, _x];    
        } else{
            const diffY = children[i].root.cy - ithChildrenRect.y;
            let _y = _a;
            let _centerY = centerA;
            
            if(direction == "right"){
                children[i].setRootLocation(childBInterval, _y + diffY);
            }else{
                children[i].setRootLocation(-childBInterval, _y + diffY);
            }
            _y += ithChildrenRect.height + bInterval;
            if (i < children.length - 1) {
                _centerY += _y - (bInterval / 2);
            }
            return [_centerY, _y];    

        }
    }
    function processChildren(subtreeRoot : ZVertex, children: VirtualTree[], centerA : number, direction : Direction) : number{
        if(direction == "down" || direction == "up"){
            centerA = centerA / (children.length - 1);

            subtreeRoot.cx = centerA;
            return centerA;
    
        }else{
            centerA = centerA / (children.length - 1);

            subtreeRoot.cy = centerA;
            return centerA;
        }


    }

    function standardTreeWidthArrangementSub(tree: VirtualTree, xInterval: number, yInterval: number, direction: Direction): void {
        tree.subTreeRoot.cx = 0;
        tree.subTreeRoot.cy = 0;
        const children = tree.virtualTreeChildren;
        const childBInterval = computeChildBInterval(tree, xInterval, yInterval, direction);




        if (children.length == 1) {
            preprocessParentWithSingleLeaf(tree.subTreeRoot, children[0].root, direction);
            standardTreeWidthArrangementSub(children[0], xInterval, yInterval, direction);
            processSingleLeaf(tree.root, children[0], childBInterval, direction);

        } else if (children.length == 0) {
        } else {
            let centerA = 0;
            let _a = 0;


            for (let i = 0; i < children.length; i++) {
                standardTreeWidthArrangementSub(children[i], xInterval, yInterval, direction);
                [centerA, _a] = processIthChild(children, i, centerA, _a, xInterval, yInterval, childBInterval, direction);
            }

            centerA = processChildren(tree.subTreeRoot, children, centerA, direction); 
            //= centerA / (children.length - 1);
            //tree.subTreeRoot.cx = centerA;
        }
    }


}
//}