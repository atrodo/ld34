var mc = { x: 0, y: 24 }
engine.events.on('runtime.cou_source', function () { return mc } );
exports.mc = mc;

var mc_layer = require('layer/mc').mc_layer

console.log(require('layer/mc'), mc_layer)
var input = new Input({ layer: mc_layer });
input.add_action(new Action(function() { mc.x += 0.1 }, "up"));
input.add_action(new Action(function() { mc.y -= 0.1 }, "down"));
input.add_action(new Action(function() { mc.x += 0.1 }, "right"));
input.add_action(new Action(function() { mc.x -= 0.1 }, "left"));

