import io from 'socket.io-client';
import { Engine, World, Body, Events } from 'matter-js';
import engine from './src/engine';
import generateChip from './src/bodies/Chip';
import { generatePeg } from './src/bodies/Peg'
import runParallelSimulation from './src/parallel_engine.js'
import { TIMESTEP } from './src/constants/gameEngine.js';


var socket = io.connect('http://radioactive-kittens.localtunnel.me/');

let tempChips = []

let currentFrame;
let runnerSpeed = 1000 / 60;
let runner;
let time;

function startRunner(speed) {
  return setInterval(() => {
    Engine.update(engine, TIMESTEP)
    currentFrame++
  }, speed)
}

socket.on('connection established', (frameNumber) => {
  console.log('ESTABLISHED! CURRENT FRAME: ', frameNumber)
  currentFrame = frameNumber

  // run the engine
  runner = startRunner(runnerSpeed)
})

var currentBodies = {}

socket.on('snapshot', ({ frame, bodies }) => {
  // console.log(`Frames => Server: ${frame}, Client: ${currentFrame}, Client ahead by ${currentFrame - frame} frames`)

  // let simulationStart = new Date()
  let simulatedBodies = runParallelSimulation(currentFrame, frame, bodies)
  // console.log('Simulation took: ' + (new Date() - simulationStart) + 'ms')

  simulatedBodies.forEach(body => {
    if (!currentBodies[body.id]) {
      World.add(engine.world, body)
      currentBodies[body.id] = body
    } else {
      // currentBodies[body.id].position.x = body.position.x
      // currentBodies[body.id].position.y = body.position.y
      // Body.setVelocity(currentBodies[body.id], body.velocity)
      currentBodies[body.id] = body
    }
  })


  let diff = currentFrame - frame

  if (diff > 100 || diff < -100) {
    runnerSpeed = 1000 / 60
    currentFrame = frame
    console.log("=========== Emergency =============")
  } else if (diff <= 20 && diff >= -20) {
    runnerSpeed = 1000 / 60
    // console.log('=====> regular speed, diff:' + diff)
  } else if (diff < -20) {
    runnerSpeed = runnerSpeed * 0.8
    // console.log(`=====> speeding up, diff: ${diff}, speed: ${runnerSpeed}`)
  } else if (diff > 20) {
    runnerSpeed = runnerSpeed * 1.2
    // console.log(`=====> slowing down, diff: ${diff}, speed: ${runnerSpeed}`)
  }

  if (currentFrame % 120 === 0) {
    console.log(`diff: ${diff}, speed: ${runnerSpeed}`)
  }

  clearInterval(runner)
  runner = startRunner(runnerSpeed)
})
let lastChipCreated;

document.addEventListener('DOMContentLoaded', function(e) {
  var canvas = document.querySelector('canvas')

  canvas.addEventListener('click', function(e) {
    e.stopPropagation()

    const yCoordinate = Math.min(e.clientY, 200)

    let chip = generateChip(e.clientX, yCoordinate).body
    chip.render.fillStyle = '#ffffff'
    currentBodies[chip.id] = chip
    lastChipCreated = chip.id
    World.add(engine.world, chip)

    console.log("You created: ", chip.id)

    socket.emit('new chip', { id: chip.id, frame: currentFrame, x: e.clientX, y: yCoordinate })
  })
})

Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;

    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];

        if (pair.bodyA.label === 'peg') {
          pair.bodyA.render.fillStyle = pair.bodyB.render.fillStyle;
        } else if (pair.bodyB.label === 'peg') {
          pair.bodyB.render.fillStyle = pair.bodyA.render.fillStyle;
        } else if (pair.bodyA.label === 'ground') {
          World.remove(engine.world, pair.bodyB)
        } else if (pair.bodyB.label === 'ground') {
          World.remove(engine.world, pair.bodyA)
        }
    }
});
