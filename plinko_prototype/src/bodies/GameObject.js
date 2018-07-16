// import * as PIXI from '../vendor/pixi.min.js'
let PIXI;
if (typeof window === 'object') {
  PIXI = require('pixi.js')
}
import { Bodies } from 'matter-js'
import { CHIP_RADIUS, PEG_RADIUS } from '../constants/gameEngine'

export default class GameObject {
  constructor({ type, x, y, width, height }) {
    this.x = y;
    this.y = y;
    this.type = type;
    this.createPhysics({ width, height });
    if (typeof window === 'object') { this.createSprite() };
  }

  createPhysics({ width, height }) {
    var options = {
      restitution: .5,
      friction: 0,
    }

    if (this.type === 'chip') {
      this.body = Bodies.circle(this.x, this.y, CHIP_RADIUS, options)
    } else if (this.type === 'peg') {
      this.body = Bodies.circle(this.x, this.y, PEG_RADIUS, options)
      this.body.isStatic = true
    } else {
      this.body = Bodies.rectangle(this.x, this.y, width, height, options)
      this.body.isStatic = true
    }

    this.body.position.x = this.x
    this.body.position.y = this.y
    this.body.label = this.type
    this.body.isShrinking = false
  }

  createSprite() {
    this.sprite = new PIXI.Circle(this.x, this.y, CHIP_RADIUS)
  }
}
