
var mt = {
  level: 0,
  goal:  1,
  total: 0,
  count: 0,
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
      mt.ovc -= soul_data.good ? 0.5 : 3
      result = true;
    }

    if (dir == 'ceiling')
    {
      mt.ovc += soul_data.good ? 3 : 0.5
      result = true;
    }

    if (result)
    {
      mt.count++;
      mt.total++;
    }

    console.log(mt.count, mt)
    if (mt.count >= (mt.level+1) * mt.goal)
    {
      console.log('change level')
      var mc    = require('state/mc').mc;
      var edges = require('state/land').edges

      if (edges[mt.level + 1] == null)
      {
        console.log('end game');
        return result;
      }

      mt.level++;
      mt.count = 0;

      console.log(require('state/land').center_x)
      mc.move_to(
        require('state/land').center_x,
        edges[mt.level].y[0] + 5
      )
    }

    return result;
  },
}

exports.tree = mt
