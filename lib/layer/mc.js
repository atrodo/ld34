require('layer/mt');
var layer   = runtime.add_layer('game.mc', { });
var mc_anim = new Animation({
  img: 'mc.png',
})

exports.layer   = layer;
exports.mc_anim = mc_anim;
