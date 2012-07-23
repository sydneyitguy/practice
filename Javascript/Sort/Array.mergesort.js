/**
 * MergeSort Javascript implementation
 *
 * @author: Sebastian Kim
 */


function merge(left, right) {
  var result = [];

  while(left.length > 0 || right.length > 0) {
    if(left.length > 0 && right.length > 0) {
      if(left[0] <= right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    } else if(left.length > 0) {
      result.push(left.shift());
    } else if(right.length > 0) {
      result.push(right.shift());
    }
  }

  return result;
}

function mergesort(A) {
  if(A.length < 2) {
    return A;
  }

  var middle = Math.ceil(A.length / 2);
  var left = A.splice(0, middle);
  var right = A;

  left = mergesort(left);
  right = mergesort(right);

  return merge(left, right);
}

Array.prototype.mergesort = function() {
  return mergesort(this);
}