import { Bodies } from 'matter-js'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants/canvas';
import GameObject from './GameObject'

export class Wall extends GameObject {
  constructor({ x, y, width, height }) {
    super({ type: 'wall', x, y, width, height })
  }
}

export class Ground extends GameObject {
  constructor() {
    super({ type: 'ground',
                        x: CANVAS_WIDTH / 2,
                        y: CANVAS_HEIGHT,
                        width: CANVAS_WIDTH,
                        height: 60 })
  }
}
