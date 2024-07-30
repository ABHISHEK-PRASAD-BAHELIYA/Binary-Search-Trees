class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildtree([...new set(array)].sort((a, b) => a - b));
    }

    buildtree(array) {
        if(array.length === 0);
        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);
        root.left = this.buildtree(array.slice(0, mid));
        root.right = this.buildtree(array.slice(mid + 1));
        return root;
    }

    insert(value, node = this.root) {
        if(!node) return new node(value);
        if(value < node.data) {
            node.left = this.insert(value, node.left);
        } else if(value > node.data) {
            node.right = this.insert(value, node.right);
        }
        return node;
    }

    deleteItem(value, node = this.node) {
        if(!node) return null;
        if(value < node.data) {
            node.left = this.deleteItem(value, node.left);
        } else if(value > node.data) {
            node.right = this.deleteItem(value, node.right);
        } else {
            if(!node.left) return node.right;
            if(!node.right) return node.left;
            node.data = this.minValue(node.right);
            node.right = this.deleteItem(node.data, node.right);
        }
        return node;
    }

    minValue(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }

    
}