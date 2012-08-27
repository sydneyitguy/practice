/**
 * Three strings say A,B,C are given to you.
 * Check weather 3rd string is interleaved from string A and B.
 * Ex) A="abcd" B="xyz" C="axybczd". answer is yes. o(n)
 *
 * @author Sebastian Kim
 */

function to_a(s) {
  if(typeof s == 'string') {
    return s.split('');
  }
  return s;
}

function isInterleaved(a, b, c) {
  a = to_a(a), b = to_a(b), c = to_a(c);
  for(var i = 0; i < c.length; i++) {
    if(c[i] == a[0]) {
      a.shift();
    } else if(c[i] == b[0]) {
      b.shift();
    } else {
      return false;
    }
  }
  return true;
}

console.log(isInterleaved('abcd', 'xyz', 'axybczd'));
console.log(isInterleaved('bac', 'acd', 'bacadc'));


// not an O(n) solution though..
function isInterleavedIter(a, b, c, branch) {
  for(var i = 0; i < c.length; i++) {
    if(a[0] == b[0] && !branch) {
      if(isInterleavedIter(b, a, c.slice(i), true)) {
        return true;
      }
    }
    if(c[i] == a[0]) {
      a.shift();
    } else if(c[i] == b[0]) {
      b.shift();
    } else {
      return false;
    }
  }
  return true;
}

function isInterleaved(a, b, c) {
  a = to_a(a), b = to_a(b), c = to_a(c);
  return isInterleavedIter(a, b, c, false);
}

console.log(isInterleaved('abcd', 'xyz', 'axybczd'));
console.log(isInterleaved('bac', 'acd', 'bacadc'));