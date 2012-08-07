/**
 * B+ Tree
 *
 * Reference: http://www.conquex.com/b-tree-javascript-implementation/
 */

var LeafNode = new Class({
 
  initialize: function(order){
    this.order = order;
    this.isLeafNode = true;
    this.isInternalNode = false;
 
    this.parentNode = null;
    this.nextNode = null;
    this.prevNode = null;
 
    this.data = [];
  },
 
  split: function(){
    var tmp = new LeafNode(this.order);
    var m = Math.ceil(this.data.length / 2);
    var k = this.data[m-1].key;
 
    // Copy & shift data
    for(var i=0; i<m; i++){
      tmp.data[i] = this.data.shift();
    }
    tmp.parentNode = this.parentNode;
    tmp.nextNode = this;
    tmp.prevNode = this.prevNode;
    if(tmp.prevNode) tmp.prevNode.nextNode = tmp;
    this.prevNode = tmp;
 
    if(!this.parentNode){
      var p = new InternalNode(this.order);
      this.parentNode = tmp.parentNode = p;
    }
 
    return this.parentNode.insert(k, tmp, this);
  },
 
  insert: function(key, value){
    var pos = 0;
    for(; pos<this.data.length; pos++){
      if(this.data[pos].key == key) {
        this.data[pos].value = value;
        return null;
      }
      if(this.data[pos].key > key) break;
    }
 
    if(this.data[pos]) this.data.splice(pos, 0, {"key": key, "value": value});
    else this.data.push({"key": key, "value": value});
 
    // Split
    if(this.data.length > this.order) return this.split();
    return null;
  }
 
});
 
var InternalNode = new Class({
 
  initialize: function(order){
    this.order = order;
    this.isLeafNode = false;
    this.isInternalNode = true;
 
    this.parentNode = null;
 
    this.data = [];
  },
 
  split: function(){
    var m = null;
    if(this.order % 2){
      var m = (this.data.length-1)/2 - 1;
    }else{
      var m = (this.data.length-1)/2;
    }
 
    var tmp = new InternalNode(this.order);
    tmp.parentNode = this.parentNode;
    for(var i=0; i<m; i++){
      tmp.data[i] = this.data.shift();
    }
    for(var i=0; i<tmp.data.length; i+=2){
      tmp.data[i].parentNode = tmp;
    }
    var key = this.data.shift();
 
    if(!this.parentNode){
      this.parentNode = tmp.parentNode = new InternalNode(this.order);
    }
 
    return this.parentNode.insert(key, tmp, this);
  },
 
  insert: function(key, node1, node2){
    if(this.data.length){
      var pos = 1;
      for(; pos < this.data.length; pos+=2){
        if(this.data[pos] > key) break;
      }
 
      if(this.data[pos]) {
        pos--;
        this.data.splice(pos, 0, key);
        this.data.splice(pos, 0, node1);
      }else{
        this.data[pos-1] = node1;
        this.data.push(key);
        this.data.push(node2);
      }
 
      if(this.data.length > (this.order*2+1)){
        return this.split();
      }
      return null;
    }else{
      this.data[0] = node1;
      this.data[1] = key;
      this.data[2] = node2;
      return this;
    }
  }
 
});
 
 
var BPlusTree = new Class({
 
  Implements: [Options],
 
  options: {
    order: 2 // Min 1
  },
 
  initialize: function(options){
    this.setOptions(options);
    this.root = new LeafNode(this.options.order);
  },
 
  set: function(key, value){
    var node = this._search(key);
    var ret = node.insert(key, value);
    if(ret) this.root = ret;
  },
 
  get: function(key){
    var node = this._search(key);
    for(var i=0; i<node.data.length; i++){
      if(node.data[i].key == key) return node.data[i].value;
    }
    return null;
  },
 
  getNode: function(key){
    return this._search(key);
  },
 
  _search: function(key){
    var current = this.root;
    var found = false;
 
    while(current.isInternalNode){
      found = false;
      var len = current.data.length;
      for(var i=1; i<len; i+=2){
        if( key <= current.data[i]) {
          current = current.data[i-1];
          found = true;
          break;
        }
      }
 
      // Follow infinity pointer
      if(!found) current = current.data[len - 1];
    }
 
    return current;
  },
 
  // B+ tree dump routines
  walk: function(node, level, arr){
    var current = node;
    if(!arr[level]) arr[level] = [];
 
    if(current.isLeafNode){
      for(var i=0; i<current.data.length; i++){
        arr[level].push("<"+current.data[i].key+">");
      }
      arr[level].push(" -> ");
    }else{
 
      for(var i=1; i<node.data.length; i+=2){
        arr[level].push("<"+node.data[i]+">");
      }
      arr[level].push(" -> ");
      for(var i=0; i<node.data.length; i+=2) {
        this.walk(node.data[i], level+1, arr);
      }
 
    }
    return arr;
  },
 
  dump: function(){
    var arr = [];
    this.walk(this.root, 0, arr);
    for(var i=0; i<arr.length; i++){
      var s = "";
      for(var j=0; j<arr[i].length; j++){
        s += arr[i][j];
      }
      console.log(s);
    }
  }
});