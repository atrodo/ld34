var layer = require('layer/mc').layer
var anim  = require('layer/souls').anim
var edges = require('layer/land').edges

for (var i=0; i < 10; i++)
{
  var soul = new Physics({
    x: 8+i*8,
    xw: 2,
    yh: 3,
    y: 3+i,
    max_momentum_x:  6,
    min_momentum_y: -6,
    max_momentum_y: -6,
    flags: { gravity: false },

    animation: anim(),
    ai: new AI(function()
    {
      var rng = new lprng(null)
      return function()
      {
        var m_dir = this.get_m_dir();

        if (this.x <= edges.x[0] + 4)
        {
          this.add_momentum('r');
          return
        }
        if (this.x >= edges.x[1] - 4)
        {
          this.add_momentum('l');
          return
        }
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

  soul.events.on('hit_wall', function(soul)
  {
    console.log('hit_wall');
    soul.set_layer(null);
  });

  soul.events.on('hit_floor', function(soul)
  {
    console.log('hit_floor');
    soul.set_layer(null);
  });

  soul.events.on('hit_ceiling', function(soul)
  {
    console.log('hit_ceiling');
    soul.set_layer(null);
  });

  layer.add_physics(soul);
  console.log(soul);
}
