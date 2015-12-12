var layer   = require('layer/mc').layer
var mc_anim = require('layer/mc').mc_anim

var input = new Input({ layer: layer });
var mc = new Physics({
  x: 5,
  y: 24,
  input: input,
  animation: mc_anim,
});

layer.add_physics(mc);

engine.events.on('runtime.cou_source', function () { return mc } );
exports.mc = mc;

input.add_action(new Action(function() { mc.add_momentum('j') }, "up"));
input.add_action(new Action(function() { mc.add_momentum('r') }, "right"));
input.add_action(new Action(function() { mc.add_momentum('l') }, "left"));

