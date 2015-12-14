require('layer/mt');
var layer   = runtime.add_layer('game.mc', { });

var parts = {};
new Gfx().preload('flame_perlin.png').then(function(img) { parts.n = img })
new Gfx().preload('skull.png').then(function(img) { parts.head = img })
new Gfx().preload('wheel_f.png').then(function(img) { parts.w_f = img })
new Gfx().preload('wheel_r.png').then(function(img) { parts.w_r = img })

var mc_anim = new Animation({
  xw: 80,
  yh: 90,
  get_gfx: function()
  {
    var self = this;
    var gfx = this.gfx

    gfx.reset()

    var c = gfx.context

    var fades = require('state/mt').fades
    if (fades.fadeou != null)
      c.globalAlpha = 1 - fades.fadeou.get_pctdone()
    if (fades.fadein != null)
      c.globalAlpha = fades.fadein.get_pctdone()

    c.drawImage(
      parts.w_r.canvas,
      20,
      0,
      40,
      40
    )

    c.drawImage(
      parts.head.canvas,
      0,
      10,
      70,
      70
    )

    c.drawImage(
      parts.w_r.canvas,
      0,
      0,
      40,
      40
    )

    return gfx;
  },
})

var pulse_anim = new Animation({
  xw: 32 * runtime.tiles.tiles_xw,
  yh: 32 * runtime.tiles.tiles_yh,
  get_gfx: function()
  {
    var self = this;
    var gfx = this.gfx

    gfx.reset()

    self.tile_x = mc_anim.tile_x - 8;
    self.tile_y = mc_anim.tile_y - 8;

    var c = gfx.context

    var fades = require('state/mt').fades
    if (fades.fadeou != null)
      c.globalAlpha = 1 - fades.fadeou.get_pctdone()
    if (fades.fadein != null)
      c.globalAlpha = fades.fadein.get_pctdone()

    c.fillStyle = gfx.color_linear(
      [191, 191, 191],
      [120, 184, 232],
      1
    );

    var grad = c.createRadialGradient(0, 0, 0, 0, 0, 60)
    grad.addColorStop(0, '#6cb46c');
    grad.addColorStop(1, '#446b44');
    c.fillStyle = grad
    c.beginPath();
    var t = require('state/mc').radius * runtime.tiles.tiles_xw || 150;
    c.arc(t, t, t, 0, 2*pi);
    //c.fill();
    //c.fillRect(0, 0, gfx.xw(), gfx.yh());

    return gfx;
  }
})
layer.add_animation(pulse_anim)

exports.layer   = layer;
exports.mc_anim = mc_anim;
