/**
 * Hash table Javascript implementation
 * Just naive and simple versionn (don't use it in real life!)
 *
 * @author Sebastian Kim
 */

var HashTable = function(NUM_BUCKET) {
  this.length = 0;
  var table = new Array(NUM_BUCKET);

  this.set = function(key, val) {
    if(this.length >= NUM_BUCKET) {
      return false;
    }

    var hash = key % NUM_BUCKET;

    // Just linear probing
    while(table[hash] && table[hash].key != key) {
      hash = ++hash % NUM_BUCKET;
    }
    table[hash] = {key: key, val: val};
    this.length++;

    return true;
  }

  this.get = function(key) {
    var hash = key % NUM_BUCKET;

    while(table[hash] && table[hash].key != key) {
      hash = ++hash % NUM_BUCKET;
    }

    if(table[hash]) {
      return table[hash].val
    }

    return undefined;
  }
}

// Just a wrapper of native Object
var NativeHash = function() {
  this.length = 0;
  var table = {};

  this.set = function(key, val) {
    table[key] = val;
    this.length++;

    return true;
  }

  this.get = function(key, val) {
    return table[key];
  }
}