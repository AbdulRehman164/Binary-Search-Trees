class Node {
  constructor(d) {
    this.value = d;
    this.left = null;
    this.right = null;
  }
}

function builtTree(arr, start = 0, end = arr.length - 1) {
  const mid = Math.ceil((start + end) / 2);
  if (start > end) return null;
  const node = new Node(arr[mid]);
  node.left = builtTree(arr, start, mid - 1);
  node.right = builtTree(arr, mid + 1, end);
  return node;
}

class Tree {
  constructor(arr) {
    this.root = builtTree([...new Set(arr.sort((a, b) => a - b))]);
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  find(value, root = this.root) {
    if (!root) {
      console.log('value not found');
      return;
    }
    if (root.value === value) return root;
    if (value > root.value) return this.find(value, root.right);
    return this.find(value, root.left);
  }

  insert(value, root = this.root) {
    if (!root) {
      console.log('There is no root, cannot insert');
      return;
    }
    if (root.right?.value === value || root.left?.value === value) return;
    else if (root.right === null && value > root.value)
      root.right = new Node(value);
    else if (root.left === null && value < root.value)
      root.left = new Node(value);
    else if (value > root.value) this.insert(value, root.right);
    else this.insert(value, root.left);
  }
  height(node, num = 0, arr = []) {
    if (!node) return;
    if (node.left === null || node.right === null) {
      arr.push(num);
    }
    if (node.left !== null) this.height(node.left, num + 1, arr);
    if (node.right !== null) this.height(node.right, num + 1, arr);
    return Math.max(...arr);
  }
  levelOrder(cb) {
    const root = this.root,
      Q = [],
      arr = [];
    if (!root) return;
    Q.push(root);
    while (Q.length !== 0) {
      const current = Q.shift();
      arr.push(current.value);
      if (current.left) Q.push(current.left);
      if (current.right) Q.push(current.right);
    }
    if (cb) {
      arr.forEach((value) => {
        cb(value);
      });
    } else {
      return arr;
    }
  }
}

const tree = new Tree([1, 2, 3, 4, 5]);
tree.prettyPrint();
tree.levelOrder((value) => {
  console.log(value);
});
