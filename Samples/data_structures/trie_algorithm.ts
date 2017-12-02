module TreeFunctions {
    export function createTrie(text: string): TreeNode {
        var root = new TreeNode();
        for (var i = 0; i < text.length; i++) {
            addString(root, text.substr(i));
            //root.addString(text.substr(i));
        }
        return root;
    }

    export function createSuffixTree(text: string): TreeNode {
        var root = new TreeNode();
        for (var i = 0; i < text.length; i++) {
            addString(root, text.substr(i));
            //root.addString(text.substr(i));
        }
        shrink(root);
        return root;
    }
    /*
    function addString1(node: TreeNode, pattern: string): TreeNode {
        if (pattern.length == 0) return node;
        var edges = node.children.map(function (x, i, arr) { return x.edgeText.charCodeAt(0); });
        var [i, isMatch] = getInsertIndex(edges, pattern.charCodeAt(0));
        if (!isMatch) {
            return node.addLeaf(i, pattern[0]);
        } else {
            return addString1(node.children[i], pattern.substr(1));
        }

    }
    */
}