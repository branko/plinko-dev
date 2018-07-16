import { Bodies } from 'matter-js'
import GameObject from './GameObject'

export default class Peg extends GameObject {
  constructor({ x, y }) {
    super({ type: 'peg', x, y });
  }
}
