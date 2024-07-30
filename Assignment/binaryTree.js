class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }
  
  class Tree {
    constructor(array) {
      this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
    }
  
    buildTree(array) {
      if (array.length === 0) return null;
      const mid = Math.floor(array.length / 2);
      const root = new Node(array[mid]);
      root.left = this.buildTree(array.slice(0, mid));
      root.right = this.buildTree(array.slice(mid + 1));
      return root;
    }
  
    insert(value, node = this.root) {
      if (!node) return new Node(value);
      if (value < node.data) {
        node.left = this.insert(value, node.left);
      } else if (value > node.data) {
        node.right = this.insert(value, node.right);
      }
      return node;
    }
  
    deleteItem(value, node = this.root) {
      if (!node) return null;
      if (value < node.data) {
        node.left = this.deleteItem(value, node.left);
      } else if (value > node.data) {
        node.right = this.deleteItem(value, node.right);
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;
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
  
    find(value, node = this.root) {
      if (!node || node.data === value) return node;
      if (value < node.data) {
        return this.find(value, node.left);
      } else {
        return this.find(value, node.right);
      }
    }
  
    levelOrder(callback) {
      if (!callback) throw new Error('Callback is required');
      const queue = [this.root];
      while (queue.length > 0) {
        const node = queue.shift();
        callback(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  
    inOrder(callback, node = this.root) {
      if (!callback) throw new Error('Callback is required');
      if (node !== null) {
        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
      }
    }
  
    preOrder(callback, node = this.root) {
      if (!callback) throw new Error('Callback is required');
      if (node !== null) {
        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
      }
    }
  
    postOrder(callback, node = this.root) {
      if (!callback) throw new Error('Callback is required');
      if (node !== null) {
        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
      }
    }
  
    height(node) {
      if (!node) return -1;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    depth(node, current = this.root, depth = 0) {
      if (!current) return 0;
      if (current === node) return depth;
      if (node.data < current.data) {
        return this.depth(node, current.left, depth + 1);
      } else {
        return this.depth(node, current.right, depth + 1);
      }
    }
  
    isBalanced(node = this.root) {
      if (!node) return true;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      return (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        this.isBalanced(node.left) &&
        this.isBalanced(node.right)
      );
    }
  
    rebalance() {
      const values = [];
      this.inOrder(node => values.push(node.data));
      this.root = this.buildTree(values);
    }
  }
  
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  
  const generateRandomArray = (size, max = 100) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
  };
  
  const tree = new Tree(generateRandomArray(15));
  console.log("Tree is balanced:", tree.isBalanced());
  
  console.log("Level order traversal:");
  tree.levelOrder(node => console.log(node.data));
  
  console.log("Pre-order traversal:");
  tree.preOrder(node => console.log(node.data));
  
  console.log("Post-order traversal:");
  tree.postOrder(node => console.log(node.data));
  
  console.log("In-order traversal:");
  tree.inOrder(node => console.log(node.data));
  
  tree.insert(150);
  tree.insert(200);
  tree.insert(250);
  
  console.log("Tree is balanced after inserting >100 values:", tree.isBalanced());
  
  tree.rebalance();
  
  console.log("Tree is balanced after rebalancing:", tree.isBalanced());
  
  console.log("Level order traversal after rebalancing:");
  tree.levelOrder(node => console.log(node.data));
  
  console.log("Pre-order traversal after rebalancing:");
  tree.preOrder(node => console.log(node.data));
  
  console.log("Post-order traversal after rebalancing:");
  tree.postOrder(node => console.log(node.data));
  
  console.log("In-order traversal after rebalancing:");
  tree.inOrder(node => console.log(node.data));
  
  console.log("Pretty print of the tree:");
  prettyPrint(tree.root);
  