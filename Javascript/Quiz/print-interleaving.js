/**
 * Print all interleaving strings
 * e.g)
 *  inputs: AB, CD
 *  outputs:
 *    ABCD
 *    ACBD
 *    ACDB
 *    CABD
 *    CADB
 *    CDAB
 * @author Sebastian Kim
 */

function printInterleavings(s1, s2, soFar) {
  if(s1.length == 0 && s2.length == 0) {
    return;
  }
  if(s1.length == 0) {
    console.log(soFar + s2);
    return;
  }
  if(s2.length == 0) {
    console.log(soFar + s1);
    return;
  }
  printInterleavings(s1.substring(1), s2, soFar + s1[0]);
  printInterleavings(s1, s2.substring(1), soFar + s2[0]);
}

printInterleavings('AB', 'CD', '');