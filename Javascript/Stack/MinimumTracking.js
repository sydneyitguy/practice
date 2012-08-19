/**
 * Algorithm practice
 *
 * Given a few numbers, how will you push them into a stack such that
 * whenever I pop the top most element from that stack, I get the minimum number from the bunch.
 *  - Insertion and popping should be O(1).
 *
 * @author Sebastian Kim
 */

var MinimumTrackigStack = function() {
  var stack = [];
  var minimum = [];

  Array.prototype.peek = function() {
    return this[this.length - 1];
  }

  this.size = function() {
    return stack.length;
  }

  this.push = function(elem) {
    if(this.size() == 0 || elem < minimum.peek()) {
      minimum.push(elem)
    } else {
      minimum.push(minimum.peek());
    }
    stack.push(elem);
  }

  this.pop = function() {
    stack.pop();
    return minimum.pop();
  }

  this.inspect = function() {
    console.log('stack:' + stack);
    console.log('minimum:' + minimum);
  }
}