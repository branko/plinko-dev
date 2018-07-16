import * as PIXI from 'pixi.js'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants/gameEngine'

let renderer = new PIXI.autoDetectRenderer(
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  { backgroundColor: 0x1099bb }
)

document.body.appendChild(renderer.view)

export default renderer
