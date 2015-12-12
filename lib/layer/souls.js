var soul_layer = runtime.add_layer('game.souls', { });

var rng = new lprng(null)

exports.layer = soul_layer;
exports.anim  = function()
{
  var good = rng.choose(true, false);
  return new Animation({
    xw: 30,
    yh: 50,
    get_gfx: function()
    {
      var self = this;
      var gfx = this.gfx

      gfx.reset()

      var c = gfx.context

      c.fillStyle = good ? '#83beff' : '#a90019'
      c.fillRect(0, 0, gfx.xw(), gfx.yh());

      return gfx;
    },
  });
}
