var width = 960,
    height = 500

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .gravity(.05)
    .distance(100)
    .charge(-100)
    .size([width, height]);

d3.json("graph.json", function(json) {
  force
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg.selectAll(".link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link");

  var node = svg.selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

  node.append("image")
      .attr("xlink:href", "https://github.com/favicon.ico")
      .attr("x", -8)
      .attr("y", -8)
      .attr("width", 16)
      .attr("height", 16);

  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.name });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});

/*
var w = 800,
    h = 600,
    root = {id: 0, name: 'root'},
    data = [root],
    diagonal = d3.svg.diagonal(),
    duration = 500,
    timer = setInterval(update, duration);

function nodeId(d) {
  return d.data.id;
}

function nodeName(d) {
  return d.data.name;
}


var vis = d3.select("#tree").append("svg")
    .attr("width", w)
    .attr("height", h)
  .append("g")
    .attr("transform", "translate(10, 10)");

var tree = d3.layout.tree().size([w - 20, h - 20]);

var node = vis.selectAll("g.node")
    .data(tree(root))
  .enter().append("g")
    .attr("class", "node")
    .attr("transform", "translate(400, 10)");

node.append("circle")
  .attr("r", 15);

node.append("text")
  .attr("x", function(d) { return -2 * d.data.name.length; })
  .attr("dy", ".35em")
  .attr("text-anchor", "start")
  .text(nodeName)
  .style("fill-opacity", 1);


function update() {
  if (data.length >= 20) return clearInterval(timer);

  // Add a new datum to a random parent.
  var d = {id: data.length, name: 'node'},
      parent = data[~~(Math.random() * data.length)];

  if (parent.children) {
    parent.children.push(d); 
  } else {
    parent.children = [d];
  }
  data.push(d);

  // Compute the new tree layout. We'll stash the old layout in the data.
  var nodes = tree(root);

  // Update the nodes…
  var node = vis.selectAll("g.node")
      .data(nodes, nodeId)
    .enter().append("g")
      .attr("class", "node");

  // Enter any new nodes at the parent's previous position.
  node.append("circle")
      .attr("r", 15)
      .attr("cx", function(d) { return d.parent.data.x0; })
      .attr("cy", function(d) { return d.parent.data.y0; })
    .transition()
      .duration(duration)
      .attr("cx", function(d) { return d.data.x0 = d.x; })
      .attr("cy", function(d) { return d.data.y0 = d.y; });

  node.append("text")
    .attr("x", function(d) { return -2 * d.data.name.length; })
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .text(nodeName)
    .style("fill-opacity", 1);

  // Transition nodes to their new position.
  // node.transition()
  //   .duration(duration)
  //   .attr("cx", x)
  //   .attr("cy", y);

  // Update the links…
  var link = vis.selectAll("path.link")
    .data(tree.links(nodes), function(d) {
      return d.source.data.id + "-" + d.target.data.id;
    });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: d.source.x0, y: d.source.y0};
        return diagonal({source: o, target: o});
      })
    .transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);
}
*/