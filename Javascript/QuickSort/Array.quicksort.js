/**
 * QuickSort Javascript implementation
 *
 * @author: Sebastian Kim
 */

/**
 * Algorith1: Easier to understand
 * -------------------------------------------------- */
Array.prototype.swap = function(i, j) {
  var tmp = this[i];
  this[i] = this[j];
  this[j] = tmp;
}

function partition(A, p, q) {
  var pivot = A[p];
  var i = p;
  for(j = p + 1; j <= q; ++j) {
    if(A[j] <= pivot) {
      A.swap(++i, j);
    }
  }
  A.swap(p, i);

  return i;
}

function quicksort(A, p, q) {
  if(p < q) {
    var r = partition(A, p, q);
    quicksort(A, p, r - 1);
    quicksort(A, r + 1, q);
  }

  return A;
}

Array.prototype.quicksort = function() {
  return quicksort(this, 0, this.length - 1);
}

/**
 * Algorithm2: Faster average time
 * -------------------------------------------------- */
function partition2(A, p, q, r) {
  var pivot = A[r];
  A.swap(r, p);
  var i = p;

  for(var j = p + 1; j <= q; ++j) {
    if(A[j] <= pivot) {
      A.swap(++i, j);
    }
  }
  A.swap(p, i);

  return i;
}


function quicksort2(A, p, q)
{
  if(p < q) {
    var r = Math.floor((p + q) / 2);
    r = partition2(A, p, q, r);
    quicksort2(A, p, r - 1);
    quicksort2(A, r + 1, q);
  }

  return A;
}

Array.prototype.quicksort2 = function() {
  return quicksort2(this, 0, this.length - 1);
}
