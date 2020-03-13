/*
namespace GraphTableSVG {
    export namespace GraphManager {
        export function createRandomObject(size: number) : { [key: number]: any; }[] {
            const adjacencyMatrix: boolean[][] = new Array(size);
            const nodes: { [key: number]: any; }[] = new Array(size);
            for (let y = 0; y < size; y++) {
                nodes[y] = {};
                adjacencyMatrix[y] = new Array(size);
                for (let x = 0; x < size; x++) {
                    if (x == y) {
                        adjacencyMatrix[y][x] = false;
                    } else {
                        const random = Math.floor(Math.random() * 2);
                        adjacencyMatrix[y][x] = random == 1;
                    }
                }
            }

            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    if (adjacencyMatrix[y][x]) {
                        nodes[y][x] = nodes[x];
                    }
                }
            }
            return nodes;

        }
    }
}
*/