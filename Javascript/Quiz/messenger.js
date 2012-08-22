function initiateMadness() {
  var sparta = {
        name : "Sparta"
  };

  function madness() {
      alert("THIS. IS. " + this.name.toUpperCase() + ".");
  }

  document.onclick = makeAMessenger(madness, sparta);
}

function makeAMessenger(func, context) {
  this.name = context.name;
  this.hijack = func;

  return function() {
    hijack();
  }
}

initiateMadness();