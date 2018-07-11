import { Engine, Events, Render, World } from 'matter-js';
import bodies from './generateWorld'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants/canvas'

var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      wireframes: false,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    }
});


// add all of the bodies to the world
World.add(engine.world, bodies);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

Events.on(engine, 'collisionStart', function(event) {
  var pairs = event.pairs;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];

    if (pair.bodyA.label === 'peg') {
      pair.bodyA.render.fillStyle = pair.bodyB.render.fillStyle;
    } else if (pair.bodyB.label === 'peg') {
      pair.bodyB.render.fillStyle = pair.bodyA.render.fillStyle;
    }
  }
});

export default engine
