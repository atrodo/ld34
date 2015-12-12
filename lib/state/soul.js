var layer = require('layer/mc').layer
var anim  = require('layer/souls').anim

for (var i=0; i < 10; i++)
{
  var soul = new Physics({
    x: 8+i*8,
    xw: 2,
    yh: 3,
    y: 8+i,
    max_momentum_x: 4,
    min_momentum_y: 0,
    max_momentum_y: 0,

    animation: anim(),
    ai: new AI(function()
    {
      var rng = new lprng(null)
      return function()
      {
        var m_dir = this.get_m_dir();
        var choice = rng.choose(
          null,
          'l',
          'r',
          m_dir, m_dir, m_dir,
          m_dir, m_dir, m_dir,
          null, null, null, null
        )

        if (choice)
        {
          this.add_momentum(choice)
        }
      }
    }),
  });

  layer.add_physics(soul);
  console.log(soul);
}
