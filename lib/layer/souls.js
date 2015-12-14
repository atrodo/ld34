require('layer/mt');
var soul_layer = runtime.add_layer('game.souls', { });

var perlin = new Gfx()
perlin.preload('flame_perlin.png').then(function(img) { perlin = img })

var soul_img = new Gfx()
soul_img.preload('soul.png').then(function(img) { soul_img = img })

var rng = new lprng(null)

exports.layer = soul_layer;
exports.anim  = function(soul_data)
{
  return new Animation({
    xw: 40,
    yh: 60,
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
        soul_img.canvas,
        0,
        0,
        40,
        60
      )

      /*
      c.globalCompositeOperation = 'multiply';
      c.globalAlpha = 0.4

      c.drawImage(
        perlin.canvas,
        0,
        0,
        30,
        45
      )
      */

      c.globalCompositeOperation = 'hue';

      var ovc =  2 * (soul_data.good - 0.5)
      if (ovc >= 0)
      {
        c.fillStyle = gfx.color_linear(
          [191, 191, 191],
          [120, 184, 232],
          ovc
        );
      }
      else
      {
        c.fillStyle = gfx.color_linear(
          [191, 191, 191],
          [169, 0, 25],
          abs(ovc)
        );
      }

      c.fillRect(0, 0, gfx.xw(), gfx.yh());

      return gfx;
    },
  });
}
