function transform(array) {
    var toReturn = [];

    l = array.length;
  for(var i = 0; i < l; i++) {
     toReturn[i] = (function() {
       return array[i];
     })()
  }

    return toReturn;
}

var a = ["a", 24, { foo: "bar" }];
var b = transform(a);
console.log(b[1]());
