import { Bodies } from 'matter-js'

export function Peg(x, y) {
  var options = {
    restitution: .5,
    friction: 0,
    isStatic: true,
  }

  this.body = Bodies.circle(x, y, 5, options)
  this.body.label = 'peg'
}

export function generatePeg(x, y) {
  return new Peg(x, y)
}
