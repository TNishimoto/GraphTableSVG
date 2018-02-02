namespace GraphTableSVG {
    export class BinaryLogicTree<T> {
        constructor(public item: T, public left: BinaryLogicTree<T> | null = null, public right: BinaryLogicTree<T> | null = null) {
        }
    }
    export class LogicTree<T> {
        constructor(public item: T, public children: LogicTree<T>[] = []) {
        }
    }
    export class LogicForest<T> {
        constructor(public roots : LogicTree<T>[] = []) {
        }
    }
}