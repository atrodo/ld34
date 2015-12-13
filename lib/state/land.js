var lvlht = chunk_yh*2;
var edges = [
  { x: [ 20, 340], y: [20 + lvlht * 0, 40 + lvlht * 0] },
  { x: [ 40, 320], y: [20 + lvlht * 1, 40 + lvlht * 1] },
  { x: [ 60, 300], y: [20 + lvlht * 2, 40 + lvlht * 2] },
  { x: [ 80, 280], y: [20 + lvlht * 3, 40 + lvlht * 3] },
  { x: [100, 260], y: [20 + lvlht * 4, 40 + lvlht * 4] },
]
console.log(edges)
exports.edges = edges
exports.lvlht = lvlht
exports.center_x = edges[0].x[0] + ( edges[0].x[1] - edges[0].x[0] ) / 2
