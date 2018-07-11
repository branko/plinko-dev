import { Bodies } from 'matter-js'

function Chip(x, y) {
  if (!this instanceof Chip) { return new Chip(x, y) }
  var options = {
    restitution: .5,
    friction: 0,
    isStatic: true,
  }

  var radius = 15
  this.body = Bodies.circle(x, y, radius, options)
  this.body.label = 'chip'
}

export default function generateChip(x, y) {
  return new Chip(x, y)
}
