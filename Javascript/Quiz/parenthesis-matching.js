/**
 * Parenthesis Matching
 * @author Sebastian Kim
 */

function isValid(str) {
  var open = ['(', '{', '[']
    , close = [')', '}', ']']
    , stack = [[], [], []]
    , index = -1;

  for(var i = 0; i < str.length; i++) {
    if((index = open.indexOf(str[i])) > -1) {
      stack[index].push(1);
    }

    if((index = close.indexOf(str[i])) > -1) {
      if(stack[index].pop() == null) {
        return false;
      }
    }
  }

  for(var i = 0; i < stack.length; i++) {
    if(stack[i].length > 0) {
      return false;
    }
  }
  return true;
}

console.log(isValid('(')); // should false
console.log(isValid('[(hello)][')); // should false
console.log(isValid('({)(my)((test))}')); // should true
console.log(isValid('{(([)[](hello)})()]{}')); // should true
console.log(isValid('{([abcd()((asdf))(])}')); // should false