var layer   = require('layer/mc').layer
var mc_anim = require('layer/mc').mc_anim
var edges = require('state/land').edges

var input = new Input({ layer: layer });
var mc = new Physics({
  xw: 2,
  yh: 3,
  x: ( edges[0].x[1] - edges[0].x[0] ) / 2,
  y:   edges[0].y[0] + 5,
  input: input,
  animation: mc_anim,
});

var sphere_oi = 15;

layer.add_physics(mc);

engine.events.on('runtime.cou_source', function () { return mc } );
exports.mc = mc;

input.add_action(new Action(function() { mc.add_momentum('j') }, "up"));
input.add_action(new Action(function() { mc.add_momentum('r') }, "right"));
input.add_action(new Action(function() { mc.add_momentum('l') }, "left"));

var find_phys = function()
{
  var result = [];
  var center = mc.center();
  $.each(mc.collidables(), function(i, phys)
  {
    var phys_cen = phys.center();
    var xd = center.x - phys_cen.x;
    var yd = center.y - phys_cen.y;
    var d  = Math.sqrt(xd * xd + yd * yd);
    if (d > abs(exports.radius))
    {
      return;
    }
    result.push({ phys: phys, center: phys_cen, xd: xd, yd: yd, d: d });
  });

  return result;
}

exports.radius = 0;
exports.pulse_cooldown = new Cooldown(0.25 * runtime.fps, function()
{
  //console.log('PULSE')
  layer.events.off('frame_logic', exports.pulse_cooldown.result);
  var center = mc.center();
  if (exports.radius > 0)
  {
    $.each(find_phys(), function(i, info)
    {
      info.phys.set_momentum(center.x > info.center.x ? 'l' : 'r', 9 );
      info.phys.set_momentum(center.y > info.center.y ? 'd' : 'u', 9 );
    });
  }
  else
  {
      $.each(find_phys(), function(i, info)
      {
        info.phys.set_momentum(center.x < info.center.x ? 'l' : 'r', 9 );
        info.phys.set_momentum(center.y < info.center.y ? 'd' : 'u', 9 );
      });
  }

  exports.radius = 0;
});

input.add_action(
  new Action(
    function()
    {
      //console.log("PUSH!!", exports.radius)
      if (exports.radius < 0)
        return;

      if (exports.radius == 0)
      {
        exports.radius = 3;
      }

      if (exports.radius < 15)
      {
        exports.radius++
      }

      exports.pulse_cooldown.reset();
      layer.events.on('frame_logic', exports.pulse_cooldown);
      return new Cooldown(0.1 * runtime.fps);
    },
    "x"
  )
);

input.add_action(
  new Action(
    function()
    {
      //console.log("PULL!!", exports.radius)
      if (exports.radius > 0)
        return;

      if (exports.radius == 0)
      {
        exports.radius = -3;
      }

      if (exports.radius > -15)
      {
        exports.radius--
      }

      exports.pulse_cooldown.reset();
      layer.events.on('frame_logic', exports.pulse_cooldown);
      return new Cooldown(0.1 * runtime.fps);
    },
    "z"
  )
);
