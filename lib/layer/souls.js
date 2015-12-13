require('layer/mt');
var soul_layer = runtime.add_layer('game.souls', { });

var rng = new lprng(null)

exports.layer = soul_layer;
exports.anim  = function(soul_data)
{
  return new Animation({
    xw: 30,
    yh: 50,
    get_gfx: function()
    {
      var self = this;
      var gfx = this.gfx

      gfx.reset()

      var c = gfx.context

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
