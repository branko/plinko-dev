import { Bodies } from 'matter-js'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants/canvas';


export function Wall(x, y, w, h) {
  this.body = Matter.Bodies.rectangle(x, y, w, h, { isStatic: true })
}

export function Ground() {
  return new Wall(CANVAS_WIDTH / 2, CANVAS_HEIGHT , CANVAS_WIDTH, 60)
}
