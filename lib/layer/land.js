require('layer/mt');
runtime.tiles.add_tile_info({
  80: { solid: true },
  81: { solid: true },
  82: { solid: true },
  83: { solid: true },
  84: { solid: true },
  85: { solid: true },
  86: { solid: true },
});

var edges = require('state/land').edges;
var lvlht = require('state/land').lvlht;

var chunk_generate = function(seed)
{
  var rng = new lprng()
  rng.seed(seed)

  var chunks = runtime.chunks
  for (var level in _.range(5))
  {
    level = parseInt(level);
    var rng_x = _.range(10 * chunk_xw);
    for ( var x in rng_x )
    {
      x = rng_x[x];
      var rng_y = _.range(level * lvlht, (level+1) * lvlht);
      for ( var y in rng_y )
      {
        y = rng_y[y];
        if (  y <= edges[level].y[0] || y >= edges[level].y[1]
           || x <= edges[level].x[0] || x >= edges[level].x[1])
        {
          chunks.set(x, y, rng.choose(80, 81, 82, 83, 84, 85, 86));
          continue;
        }
      }
    }
  }

  console.log(chunks);

  chunks.flush();

}

$(function()
{
  if (localStorage["seed"] == undefined || localStorage["v"] < 3)
  {
    localStorage.clear()
    chunk_generate(Math.floor(Math.random() * Math.pow(2, 32)));
  }
})
