
import * as PIXI from 'pixi.js'
import { Engine, Events, RenderPixi, World } from 'matter-js';
import backgroundBodies from './generateWorld'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants/canvas'


// create a renderer
const engine = Engine.create()

Events.on(engine, 'collisionStart', function(event) {
  var pairs = event.pairs;

  if (pairs[0].bodyA.label === 'temp' || pairs[0].bodyB.label === 'temp') {
    return
  }

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];

    if (pair.bodyA.label === 'temp' || pair.bodyB.label === 'temp') {
      continue;
    }

    if (pair.bodyA.label === 'peg') {
      pair.bodyA.render.fillStyle = pair.bodyB.render.fillStyle;
    } else if (pair.bodyB.label === 'peg') {
      pair.bodyB.render.fillStyle = pair.bodyA.render.fillStyle;
    }
  }
});

export default engine
