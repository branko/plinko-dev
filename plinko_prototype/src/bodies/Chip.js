import { Bodies, Body, World } from 'matter-js';
import { TIMESTEP, CHIP_RADIUS, SHRINKING_FACTOR, SHRINKING_AFTER } from '../constants/gameEngine';
import GameObject from './GameObject'


export default class Chip extends GameObject {
  constructor({ x, y }) {
    super({ type: 'chip', x, y })
    this.body.shrink = this.shrink.bind(this)()
  }

  shrink() {
    return (function() {
      let counter = 0
      let interval;

      return (engine, currentBodies) => {
        interval = setInterval(() => {
          if (counter++ === shrinkAfter) {
            currentBodies[this.body.id] = undefined
            World.remove(engine.world, this.body)
            clearInterval(interval)
            return
          }

          Body.scale(this.body, 0.99, 0.99)
          this.body.circleRadius *= 0.99

        }, TIMESTEP)
      }
    }
    )()
  }
}
