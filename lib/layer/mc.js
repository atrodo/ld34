var mc_layer = runtime.add_layer('game.mc', { });
var mc_anim = new Animation({
  img: 'mc.png',
  frame_x: 240,
  frame_y: 240,
})

mc_layer.add_animation(mc_anim);

exports.mc_layer = mc_layer;
