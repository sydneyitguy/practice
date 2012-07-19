/**
 * QuickSort Javascript implementation
 *
 * @author: Sebastian Kim
 */

Array.prototype.swap = function(i, j) {
  var tmp = this[i];
  this[i] = this[j];
  this[j] = tmp;
}

function partition(A, p, q) {
  var pivot = A[p];
  var i = p;
  for (j = p + 1; j <= q; j++) {
    if(A[j] <= pivot) {
      ++i;
      A.swap(i, j);
    }
  }
  A.swap(p, i);

  return i;
}

function quicksort(A, p, q) {
  if (p < q) {
    r = partition(A, p, q);
    quicksort(A, p, r - 1);
    quicksort(A, r + 1, q);
  }

  return A;
}

Array.prototype.quicksort = function() {
  return quicksort(this, 0, this.length);
}