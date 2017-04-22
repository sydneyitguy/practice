var class_name = (function() {
  var private_vars;

  // Privates
  var a_private = function() {
    console.log('from private')
  };

  return {
    a_public: function() {
      a_private();
    }
  };
})();

$(function() {
  class_name.a_public();
});
