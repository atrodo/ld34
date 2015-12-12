var layer   = runtime.add_layer('game.mc', { });
var mc_anim = new Animation({
  img: 'mc.png',
})
console.log(mc_anim);

exports.layer   = layer;
exports.mc_anim = mc_anim;
