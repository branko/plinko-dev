import * as PIXI from 'pixi.js'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants/gameEngine'

let renderer = new PIXI.CanvasRenderer({
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT
})

document.body.appendChild(renderer.view)

export default renderer
