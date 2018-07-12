import { Engine, Events, World, Composite, Body } from 'matter-js';
import backgroundBodies from './generateWorld'
import generateChip from './bodies/Chip'

function runParallelSimulation(clientFrame, serverFrame, bodies) {
  let simulationFrame = serverFrame

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

  // Server frame needs to catch up to client frame
  // (server is in the past)
  while (simulationFrame < clientFrame) {
    Engine.update(engine, 1000 / 60)
    simulationFrame++
  }


  let simulatedWorld = Composite.allBodies(engine.world)
  return simulatedWorld
}

export default runParallelSimulation
