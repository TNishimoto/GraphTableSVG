

  import { LogicGraph, LogicGraphNode, LogicTree, BinaryLogicTree } from "../logics/logic_tree"
    //export namespace Debug {
        function randomTreeArray(node_num : number, max_degree : number) : LogicTree[] {
            const nodes : LogicTree[] = new Array(0);
            const root = new LogicTree();
            nodes.push(root);

            while(nodes.length < node_num){
                var random = Math.floor( Math.random()*nodes.length );

                const parent = nodes[random];
                if(parent.children.length < max_degree){
                    const child = new LogicTree();
                    parent.children.push(child);
                    nodes.push(child);    
                }

            }
            return nodes;
        }
        /*
        function randomBinaryTreeArray(node_num : number) : BinaryLogicTree[] {
            const nodes : BinaryLogicTree[] = new Array(0);
            const root = new BinaryLogicTree();
            nodes.push(root);

            while(nodes.length < node_num){
                var random = Math.floor( Math.random()*nodes.length );
                var leftOrRight = Math.floor( Math.random()*2 );

                const parent = nodes[random];

                if(leftOrRight == 0 && parent.left == null){
                    const child = new BinaryLogicTree();
                    parent.left = child;
                    nodes.push(child);
                }else if(leftOrRight == 1 && parent.right == null){
                    const child = new BinaryLogicTree();
                    parent.right = child;
                    nodes.push(child);

                }
            }
            return nodes;
        }
        */
       export function randomTree(node_num : number, max_degree : number) : LogicTree {
        return randomTreeArray(node_num, max_degree)[0];
        }
        export function randomBinaryTree(node_num : number) : LogicTree {
            return randomTree(node_num, 2);

        }
        const labels = ["a", "b", "c", "あ", "e", "f", "g"];
        export function randomTrie(node_num : number, max_degree : number) : LogicTree {
            const nodes = randomTreeArray(node_num, max_degree);
            for(let i=1;i<nodes.length;i++){
                var randomLabelNumber = Math.floor( Math.random()* labels.length );
                nodes[i].edgeOption.text = labels[randomLabelNumber]; 
                
            }
            return nodes[0];
        }
        export function randomLabeledTree(node_num : number, max_degree : number, max_string_length : number) : LogicTree {
            const nodes = randomTreeArray(node_num, max_degree);
            for(let i=1;i<nodes.length;i++){
                var strLen = Math.floor( Math.random()*max_string_length );
                let s = "";
                for(let x=0;x<strLen;x++){
                    var randomLabelNumber = Math.floor( Math.random()* labels.length );
                    if(randomLabelNumber < 4){
                        s += labels[randomLabelNumber];
                    }

                }
                nodes[i].edgeOption.text = s; 
                
            }
            
            return nodes[0];
        }

        export function randomBinaryTrie(node_num : number) : LogicTree {
            const node = randomTrie(node_num, 2);            
            return node;
        }
        /*
        export function randomTrie(node_num : number, max_degree : number) : LogicTree {
            const nodes = randomTreeArray(node_num, max_degree);
            for(let i=1;i<nodes.length;i++){
                var randomLabelNumber = Math.floor( Math.random()* labels.length );
                nodes[i].parentEdgeText = labels[randomLabelNumber]; 
                
            }
            return nodes[0];
        }
        */

    //}