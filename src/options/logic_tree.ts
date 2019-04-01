namespace GraphTableSVG {
    /*
    export class BaseLogicTree {
        public edgeLabel: string | null = null;
        public nodeText: string | null = null;
    }
    */
    /**
     * 木構造を表現するクラスです。
     */
    export class LogicTree {
        public vertexText: string | null = null
        public parentEdgeText: string | null = null
        public vertexClass: string | null = null
        public parentEdgeClass: string | null = null
        public children : (LogicTree | null)[] = [];
        public item: any = null;
        constructor(option : {item?: any, children?: (LogicTree | null)[], 
            vertexText?: string, parentEdgeText?: string} = {} ) {
            if(option.item != undefined) this.item = option.item;
            if(option.vertexText != undefined) this.vertexText = option.vertexText;
            if(option.parentEdgeText != undefined) this.parentEdgeText = option.parentEdgeText;
            if(option.children != undefined) this.children = option.children;
        }
        public getOrderedNodes(order: VertexOrder): LogicTree[] {
            const r: LogicTree[] = [];
            const edges = this.children;
            if (order == VertexOrder.Preorder) {
                r.push(this);
                edges.forEach((v) => {
                    if (v != null) {
                        v.getOrderedNodes(order).forEach((w) => {
                            r.push(w);
                        });
                    }
                });

            } else if (order == VertexOrder.Postorder) {
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
    /**
     * 二分木を表現するクラスです。
     */
    export class BinaryLogicTree extends LogicTree {
        public get left(): BinaryLogicTree | null {
            const left = this.children[0];
            if (left == null) {
                return null;
            } else {
                return <BinaryLogicTree>left;
            }
        }
        public set left(value: BinaryLogicTree | null) {
            this.children[0] = value;
        }
        public get right(): BinaryLogicTree | null {
            const right = this.children[1];
            if (right == null) {
                return null;
            } else {
                return <BinaryLogicTree>right;
            }

        }
        public set right(value: BinaryLogicTree | null) {
            this.children[1] = value;
        }
        constructor(public item: any = null, left: BinaryLogicTree | null = null, right: BinaryLogicTree | null = null, nodeText: string | null = null, edgeLabel: string | null = null) {
            super({item : item == null ? undefined : item, children : [left, right], vertexText : nodeText == null ? undefined : nodeText, parentEdgeText : edgeLabel == null ? undefined : edgeLabel });
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