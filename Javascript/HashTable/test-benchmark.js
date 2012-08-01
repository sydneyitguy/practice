/**
 * Unit Tests
 * -------------------------------------------------- */
var list = new HashTable(4);

test( "Hash table test", function() {
  equal(list.set(1, 'a'), true, 'set');
  equal(list.get(1), 'a', 'get');

  list.set(5, 'b');
  equal(list.get(5), 'b', 'linear probing');

  list.set(6, 'c');
  list.set(7, 'd');
  equal(list.set(8, 'e'), false, 'should be false if full');
  equal(list.length, 4, 'length should be 4');
});

/**
 * Benchmarks
 * FIXME: Benchmark need to be redesigned!
 * -------------------------------------------------- */
Benchmark.STDOUT = document.getElementById('benchmark');

var COUNT = 1000;

function testWith(bucket) {
  var list = new HashTable(bucket);
  for(var i = COUNT; i--; ) {
    var random = Math.floor(Math.random() * 256);
    list.set(random, random);
    list.get(random);
  }
}

// Benchmark!
Benchmark.benchmark({
  CustomHashTable_Bucket_100 : function() {
    testWith(128);
  },
  CustomHashTable_Bucket_1000 : function() {
    testWith(1024);
  },
  CustomHashTable_Bucket_32767 : function() {
    testWith(32767);
  },
  NativeHashTable : function() {
    var list = new NativeHash();
    for(var i = COUNT; i--; ) {
      var random = Math.floor(Math.random() * 32767);
      list.set(random, random);
      list.get(random);
    }
  }
});

