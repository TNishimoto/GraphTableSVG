namespace GraphTableSVG {
    /*
    export class BaseLogicTree {
        public edgeLabel: string | null = null;
        public nodeText: string | null = null;
    }
    */

    export class LogicTree<T> {
        public nodeText: string | null = null
        public edgeLabel: string | null = null
        public nodeClass: string | null = null
        public edgeClass: string | null = null

        constructor(public item: T, public children: (LogicTree<T> | null)[] = [], nodeText: string | null = null, edgeLabel: string | null = null) {
            this.nodeText = nodeText;
            this.edgeLabel = edgeLabel;
        }
        public getOrderedNodes(order: NodeOrder): LogicTree<T>[] {
            const r: LogicTree<T>[] = [];
            const edges = this.children;
            if (order == NodeOrder.Preorder) {
                r.push(this);
                edges.forEach((v) => {
                    if (v != null) {
                        v.getOrderedNodes(order).forEach((w) => {
                            r.push(w);
                        });
                    }
                });

            } else if (order == NodeOrder.Postorder) {
                edges.forEach((v) => {
                    if (v != null) {
                        v.getOrderedNodes(order).forEach((w) => {
                            r.push(w);
                        });
                    }
                });
                r.push(this);
            }
            return r;
        }
    }
    export class BinaryLogicTree<T> extends LogicTree<T> {
        public get left(): BinaryLogicTree<T> | null {
            const left = this.children[0];
            if (left == null) {
                return null;
            } else {
                return <BinaryLogicTree<T>>left;
            }
        }
        public set left(value: BinaryLogicTree<T> | null) {
            this.children[0] = value;
        }
        public get right(): BinaryLogicTree<T> | null {
            const right = this.children[1];
            if (right == null) {
                return null;
            } else {
                return <BinaryLogicTree<T>>right;
            }

        }
        public set right(value: BinaryLogicTree<T> | null) {
            this.children[1] = value;
        }
        constructor(public item: T, left: BinaryLogicTree<T> | null = null, right: BinaryLogicTree<T> | null = null, nodeText: string | null = null, edgeLabel: string | null = null) {
            super(item, [left, right], nodeText, edgeLabel);
        }
        /*
        public toLogicTree(): LogicTree<T> {
            var r = new LogicTree<T>(this.item);
            if (this.left != null) {
                r.children.push(this.left.toLogicTree());
            }
            if (this.right != null) {
                r.children.push(this.right.toLogicTree());
            }
            return r;
        }
        */
    }
}