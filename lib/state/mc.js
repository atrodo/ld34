var layer   = require('layer/mc').layer
var mc_anim = require('layer/mc').mc_anim

var input = new Input({ layer: layer });
var mc = new Physics({
  x: 5,
  y: 12,
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
    if (d > sphere_oi)
    {
      return;
    }
    result.push({ phys: phys, center: phys_cen, xd: xd, yd: yd, d: d });
  });

  return result;
}

input.add_action(
  new Action(
    function()
    {
      console.log("PUSH!!")
      var center = mc.center();
      $.each(find_phys(), function(i, info)
      {
        info.phys.set_momentum(center.x > info.center.x ? 'l' : 'r', 9 );
        info.phys.set_momentum(center.y > info.center.y ? 'd' : 'u', 9 );
      });
      return new Cooldown('1s');
    },
    "x"
  )
);

input.add_action(
  new Action(
    function()
    {
      console.log("PULL!!")
      var center = mc.center();
      $.each(find_phys(), function(i, info)
      {
        info.phys.set_momentum(center.x < info.center.x ? 'l' : 'r', 9 );
        info.phys.set_momentum(center.y < info.center.y ? 'd' : 'u', 9 );
      });
      return new Cooldown('1s');
    },
    "z"
  )
);
