const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  data  = null;
  parent = null;
  right = null;
  left = null;

  constructor(parent) {
    this.parent = parent;
  }

  root() {
    if (this.data == null) return null;
    return this;
  }

  add(value) {
    if (this.data === null) {
      this.data = value;
      return null;
    }
    if (this.data > value) {
      if (this.left === null) this.left = new BinarySearchTree(this);
      this.left.add(value);
      return null;
    }
    if (this.right === null) this.right = new BinarySearchTree(this);
    this.right.add(value);
  }

  has(value) {
    if (this.data === null) return false;
    if (this.data === value) return true;
    if (this.data > value) {
      return this.left !== null && this.left.has(value);
    }

    return this.right !== null && this.right.has(value);
  }

  find(value) {
    if (this.data === null) return null;
    if (this.data === value) return this;
    if (this.data > value) {
      if (this.left === null) return null;
      return this.left.find(value);
    }

    if (this.right === null) return null;
    return this.right.find(value);
  }

  remove(value) {
    if (this.data === null) return null;
    if (this.data === value) {
      if (this.left !== null && this.right !== null) {
        const min = this.right.min();
        this.data = min;
        const minEl = this.right.find(min);
        if (minEl !== null) {
          const parent = minEl.parent;
          if (parent !== null) {
            if (this === parent) {
              this.right = parent.right;
            } else {
              parent.left = minEl.right;
            }
          }
        }
        return null;
      }
      if (this.left !== null) {
        this.data = this.left.data;
        this.right = this.left.right;
        this.parent = this.left.parent;
        this.left = this.left.left;
        return null;
      }
      if (this.right !== null) {
        this.data = this.right.data;
        this.left = this.right.left;
        this.parent = this.right.parent;
        this.right = this.right.right;
        return null;
      }
      this.data = null;
      return null;
    }

    if (this.data > value) {
      if (this.left === null) return null;
      return this.left.remove(value);
    }

    if (this.right === null) return null;
    return this.right.remove(value);
  }

  min() {
    if (this.left === null) return this.data;
    return this.left.min();
  }

  max() {
    if (this.right === null) return this.data;
    return this.right.max();
  }
}

module.exports = {
  BinarySearchTree
};
