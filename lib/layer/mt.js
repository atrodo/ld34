var mt      = require('state/mt').tree;
var layer   = runtime.add_layer('game.mt', { });
var edges = require('state/land').edges

var perlin = new Gfx()
perlin.preload('flame_perlin.png').then(function(img) { perlin = img })

var parts = {
  0: 'dirt.jpg',
  1: 'forest.jpg',
  2: 'canopy.jpg',
  3: 'treeline.jpg',
  4: 'clouds.jpg',
};

_.each(parts, function(v, k)
{
  var result = new Gfx;
  result.preload(v);
  parts[k] = result
});

//console.log(parts)

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

    var fades = require('state/mt').fades
    if (fades.fadeou != null)
      c.globalAlpha = 1 - fades.fadeou.get_pctdone()
    if (fades.fadein != null)
      c.globalAlpha = fades.fadein.get_pctdone()

    var level_edges = edges[mt.level];
    var ovc = make_between((mt.ovc + 50) / 100, 0, 1)

    /*
    c.fillStyle = gfx.color_linear(
      [207, 130, 130],
      [186, 212, 232],
      ovc
    );
    c.fillRect(0, 0, gfx.xw(), gfx.yh());
    */

    if (parts[mt.level])
    {
      c.drawImage(
        parts[mt.level].canvas,
        0,
        0,
        gfx.xw(),
        gfx.yh()
      )
    }

    c.globalAlpha = 1
    var width = ( mt.hp < 3 ? 3 : mt.hp ) * 3;
    /*
    c.drawImage(
      perlin.canvas,
      (gfx.xw() / 3) - (width / 2) + (level_edges.x[1] / 1.7 - cou.x),
      0,
      width,
      gfx.yh(),

      (gfx.xw() / 3) - (width / 2) + (level_edges.x[1] / 1.7 - cou.x),
      0,
      width,
      gfx.yh()
    )
    */

    c.fillStyle = gfx.color_linear(
      [97, 61, 32],
      [191, 121, 64],
      ovc
    );

    //c.globalCompositeOperation = 'hue';

    c.fillRect(
      (gfx.xw() / 3) - (width / 2) + (level_edges.x[1] / 1.7 - cou.x),
      0,
      width,
      gfx.yh()
    );

    return gfx;
  },
})

layer.add_animation(anim);

exports.layer = layer;
exports.anim  = anim;

