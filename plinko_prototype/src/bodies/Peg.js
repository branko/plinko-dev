import { Bodies } from 'matter-js'

export default function Peg(x, y, r) {
  var options = {
    restitution: .5,
    friction: 0,
    isStatic: true,
  }

  this.body = Bodies.circle(x, y, 5, options)
  this.body.label = 'peg'
}
