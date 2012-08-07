/**
 * Just tried simple tree drawer using canvas,
 * Too much hassle on deciding nodes' positions 
 *
 * @author Sebastian
 */
var TreeOnCanvas = function(canvasId) {
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext("2d");
  var radius = 20;
  var lineWidth = 2;
  var fillColor = "#8ED6FF";
  var strokeColor = "#000000";
  var font = "10pt Calibri";

  var Node = function(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.level = 0;

    this.draw = function() {
      context.beginPath();
      context.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
      context.fillStyle = fillColor;
      context.fill();
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeColor;
      context.stroke();

      context.font = font;
      context.fillStyle = strokeColor;
      var length = (this.value.toString().length) * 3;
      context.fillText(this.value, this.x - length, this.y + 3);

      return this;
    }

    this.append = function(direction, value) {
      var level = this.level + 1;
      var xDistance = radius * (11 - level*3);
      var yDistance = radius * 3;
      xDistance = direction == 'left' ? xDistance * -1 : xDistance;

      var node = new Node(this.x + xDistance, this.y + yDistance, value);
      node.level = level;
      link(this, node);

      return node;
    }

    var link = function(Node1, Node2) {
      context.beginPath();
      context.moveTo(Node1.x, Node1.y);
      context.lineTo(Node2.x, Node2.y);
      context.stroke();
      Node1.draw();
      Node2.draw();
    }

    return this.draw();
  }

  this.createRoot = function(value) {
    return new Node(canvas.width / 2, 50, value);
  }
}

window.onload = function() {
  var Tree = new TreeOnCanvas("myCanvas");
  var root = Tree.createRoot(10);
  var left = root.append('left', 5);
  var right = root.append('right', 20);
  r = left.append('right', 15);
  l = right.append('left', 17);
};

