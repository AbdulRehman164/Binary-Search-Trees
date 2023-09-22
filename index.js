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
console.log(builtTree([...new Set([1, 2, 3, 3, 4, 4])]));
