/**
 * Binary Search Tree Javascript Implementation
 *
 * @author Sebastian Kim
 */

function TreeNode(key) {
  this.key = key;
  this.left = null;
  this.right = null;

  this.isLeaf = function() {
    return this.left == null && this.right == null;
  }
}

function BinaryTree(root) {
  this.root = root;

  this.empty = function() {
    this.root = null;
  }

  this.toString = function() {
    if(this.root == null) {
      return '';
    }
    return toString(this.root);
  }

  var toString = function(node) {
    var s = node.key;

    if(node.left != null) {
      s += "(L:" + toString(node.left) + ")";
    }
    if(node.right != null) {
      s += "(R:" + toString(node.right) + ")";
    }
    return s;
  }
}

BinaraySearchTree.prototype = new BinaryTree();
BinaraySearchTree.prototype.constructor = BinaraySearchTree;
function BinaraySearchTree(root){
  BinaraySearchTree.prototype.root = root;

  this.insert = function(key) {
    root = insertItem(root, key);
  }

  this.delete = function(key) {
    // TODO
  }

  var insertItem = function(node, key) {
    if(node == null) {
      return new TreeNode(key);
    }

    if(key < node.key) {
      node.left = insertItem(node.left, key);
      return node;
    }

    node.right = insertItem(node.right, key);
    return node;
  }
}