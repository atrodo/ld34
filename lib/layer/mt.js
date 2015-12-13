var mt      = require('state/mt').tree;
var layer   = runtime.add_layer('game.mt', { });
var edges = require('state/land').edges

var anim = new Animation({
  frame_x: 0,
  frame_y: 0,
  xw: runtime.width,
  yh: runtime.height,

  get_gfx: function(cou)
  {
    var self = this;
    var gfx = this.gfx

    gfx.reset()

    var c = gfx.context

    var level_edges = edges[mt.level];
    var ovc = make_between((mt.ovc + 50) / 100, 0, 1)
    c.fillStyle = gfx.color_linear(
      [207, 130, 130],
      [186, 212, 232],
      ovc
    );
    c.fillRect(0, 0, gfx.xw(), gfx.yh());

    c.fillStyle = gfx.color_linear(
      [97, 61, 32],
      [191, 121, 64],
      ovc
    );
    c.fillRect(
      gfx.xw() / 3 + (level_edges.x[1] / 1.7 - cou.x), 0,
      gfx.xw() / 3, gfx.yh()
    );

    return gfx;
  },
})

layer.add_animation(anim);

exports.layer = layer;
exports.anim  = anim;

