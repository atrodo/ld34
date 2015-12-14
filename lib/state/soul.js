var layer = require('layer/mc').layer
var anim  = require('layer/souls').anim
var edges = require('state/land').edges
var mc    = require('state/mc').mc;
var mt    = require('state/mt').tree;

var all_lvl_souls = {}
var create_soul = function(level)
{
  var lvl_souls = all_lvl_souls[level];
  var lvl_edges = edges[level];
  var x_span    = lvl_edges.x[1] - lvl_edges.x[0] - 20;
  var i         = lvl_souls.length

  var rng = new lprng(null)
  var soul_data = {
    good: rng.choose(_.range(0, 1.25, 0.25)),
  }

  var soul = new Physics({
    x: lvl_edges.x[0] + 20 + rng.choose(_.range(x_span)),
    y: lvl_edges.y[0] +  3 + rng.choose(_.range(16)),
    xw: 1,
    yh: 2,
    max_momentum_x:  6,
    min_momentum_y: -6,
    max_momentum_y: -6,
    flags: { gravity: false },

    animation: anim(soul_data),
    ai: new AI(function()
    {
      return function()
      {
        if (mt.level != level)
          return;

        var m_dir = this.get_m_dir();

        if (this.x <= lvl_edges.x[0] + 4)
        {
          this.add_momentum('r');
          return
        }
        if (this.x >= lvl_edges.x[1] - 4)
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

  //console.log(soul.x, soul.y)

  soul.events.on('hit_side', function(soul, other)
  {
    if (other === true)
      return;

    if (other == mc)
    {
      var ogood = soul_data.good
      soul_data.good += (0.5 - soul_data.good) / 2
      //console.log('hit_mc', ogood, soul_data.good)
      return new Cooldown('1s')
    }
  });

  soul.events.on('hit_wall', function(soul)
  {
    /*
    console.log('hit_wall');
    if (mt.give_soul('wall', soul_data))
    {
      soul.set_layer(null);
      delete lvl_souls[i];
    }
    */
  });

  soul.events.on('hit_floor', function(soul)
  {
    //console.log('hit_floor');
    if (mt.give_soul('floor', soul_data))
    {
      soul.set_layer(null);
      delete lvl_souls[i];
    }
  });

  soul.events.on('hit_ceiling', function(soul)
  {
    //console.log('hit_ceiling');
    if (mt.give_soul('ceiling', soul_data))
    {
      soul.set_layer(null);
      delete lvl_souls[i];
    }
  });

  layer.add_physics(soul);
  lvl_souls.push(soul);
}
_.each(edges, function(lvl_edges, level)
{
  all_lvl_souls[level] = []
  _.each(_.range(50), function(i) { create_soul(level) })
})

var soul_generator = new Cooldown('5s', function()
{
  //create_soul(mt.level);
  soul_generator.reset()
  //console.log(soul_generator);
  layer.events.once('frame_logic', soul_generator)
})
layer.events.once('frame_logic', soul_generator)
