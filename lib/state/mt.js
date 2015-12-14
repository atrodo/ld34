
var fades = {
  fadein: null,
  fadeou: null
}

var mt = {
  level: 0,
  goal:  20,
  lose:  0,
  total: 0,
  hp:    10,
  ovc:   0,
  give_soul: function(dir, soul_data)
  {
    var result = false;

    if (dir == 'wall')
    {
      mt.ovc += soul_data.good ? 0.5 : -0.5
      result = true;
    }

    if (dir == 'floor')
    {
      if (soul_data.good > 0.6)
      {
        mt.ovc -= 0.5
        mt.hp--;
      }
      else if ( soul_data.good < 0.4 )
      {
        mt.ovc -= 3
        mt.hp++;
      }
      result = true;
    }

    if (dir == 'ceiling')
    {
      if (soul_data.good < 0.4)
      {
        mt.ovc += 0.5
        mt.hp--;
      }
      else if ( soul_data.good > 0.6 )
      {
        mt.ovc += 3
        mt.hp++;
      }
      result = true;
    }

    if (result)
    {
      mt.total++;
    }

    //console.log(mt.hp, mt)
    if (mt.hp >= mt.goal)
    {
      console.log('change level')
      var mc    = require('state/mc').mc;
      var edges = require('state/land').edges

      var layer = require('layer/mc').layer
      layer.deactivate_input()
      fades.fadeou = new Cooldown('1s', function()
      {
        if (edges[mt.level + 1] == null)
        {
          console.log('end game');
          return result;
        }

        fades.fadeou = null
        layer.activate_input()

        mt.level++;
        mt.lose = mt.goal;
        mt.goal += 10;

        mc.move_to(
          require('state/land').center_x,
          edges[mt.level].y[0] + 5
        )

        fades.fadein = new Cooldown('1s', function()
        {
          fades.fadein = null
        });
        layer.events.once('frame_logic', fades.fadein)
      })
      layer.events.once('frame_logic', fades.fadeou)

    }

    if (mt.hp < mt.lose)
    {
      var layer = require('layer/mc').layer
      layer.deactivate_input()
      fades.fadeou = new Cooldown('1s', function()
      {
        console.log('game over');
      })
      layer.events.once('frame_logic', fades.fadeou)
    }

    return result;
  },
}

exports.fades = fades;
exports.tree = mt
