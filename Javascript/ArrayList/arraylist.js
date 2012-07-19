/**
 * Javascrip ArrayList
 * 
 * @author: Sebastian Kim
 */
var ArrayList = function() {
  var list = [];
  this.contains = function(elem) {
    return (list.indexOf(elem) !== -1);
  };
  
  this.add = function(elem) {
    list.push(elem);
  };
  
  this.remove = function(elem) {
    var i = list.indexOf(elem)
    if(i == -1) {
    	return null;
    }
    return list.splice(i, 1);
  };
  
  this.get = function() {
    return list;
  };
};
