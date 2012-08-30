String.prototype.swap = function(a, b) {
    var array = this.split('');
    var tmp = array[a];
    array[a] = array[b];
    array[b] = tmp;
    return array.join('');
}

function permutation(str, start) {
    if (start == str.length - 1) {
        console.log(str);
    } else {
        for (var i = start; i < str.length; i++) {
          permutation(str.swap(start, i), start+1);
       }
   }
}

permutation('abc', 0);