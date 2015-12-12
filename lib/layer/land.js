runtime.tiles.add_tile_info({
  80: { solid: true },
  81: { solid: true },
  82: { solid: true },
  83: { solid: true },
  84: { solid: true },
  85: { solid: true },
  86: { solid: true },
});

var edges = { x: [0, 356], y: [0, 20] }
exports.edges = edges

var chunk_generate = function(seed)
{
  var rng = new lprng()
  rng.seed(seed)

  var chunks = runtime.chunks
  for (var x = 0; x < chunk_xw * 9; x++)
  {
    for (var y = 0; y < chunk_yh * 1; y++)
    {
      if (  y <= edges.y[0] || y >= edges.y[1]
         || x <= edges.x[0] || x >= edges.x[1])
      {
        chunks.set(x, y, rng.choose(80, 81, 82, 83, 84, 85, 86));
        continue;
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
