import { Engine, Events, World, Composite, Body } from 'matter-js';
import backgroundBodies from './generateWorld'
import generateChip from './bodies/Chip'

function runParallelSimulation(currentFrame, targetFrame, bodies) {
  var engine = Engine.create();

  // add all of the bodies to the world
  World.add(engine.world, backgroundBodies);

  let actualBodies = bodies.map(body => {
    let chip = generateChip(body.x, body.y)
    Body.setVelocity(chip.body, body.linearVelocity)
    chip.body.id = body.id
    return chip.body
  })

  World.add(engine.world, actualBodies);

  while (currentFrame < targetFrame) {
    Engine.update(engine, 1000 / 60)
    currentFrame++
  }

  let simulatedWorld = Composite.allBodies(engine.world)
  return simulatedWorld
}

export default runParallelSimulation
