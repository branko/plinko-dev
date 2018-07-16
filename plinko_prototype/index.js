import * as PIXI from 'pixi.js'
import io from 'socket.io-client';
import { Engine, World, Body, Events } from 'matter-js';
import engine from './src/engine';
import Chip from './src/bodies/Chip';
import Peg from './src/bodies/Peg'
import runParallelSimulation from './src/parallel_engine.js'
import { TIMESTEP, FPS } from './src/constants/gameEngine.js';
import backgroundBodies from './src/generateWorld'
import renderer from './src/renderer'

World.add(engine.world, backgroundBodies.map(b => b.body));
const stage = new PIXI.Container();



// stage.addChild(...backgroundBodies.map(b => b.sprite.sprite))
// stage.addChild(new PIXI.Circle(50, 50, 10))

var socket = io.connect('http://radioactive-kittens.localtunnel.me/');

let currentFrame;
let runner;

/////////////////////////////
let frame = 0
let nextTick = Date.now();
let time = Date.now()

// function updateDisplay(stage) {
//   requestAnimationFrame(animate)
// }
//
// function animate() {
//
// }

let peg = new Peg({x: 100, y: 100})
stage.addChild(peg.sprite)

function gameLoop() {
  while (Date.now() > nextTick) {

    nextTick += TIMESTEP;
    Engine.update(engine, TIMESTEP)
    currentFrame++;
    frame++;
  }

  renderer.render(stage)
}


function startRunner() {
  return setInterval(gameLoop, 0);
}
////////////////////////


socket.on('connection established', (frameNumber) => {
  console.log('ESTABLISHED! CURRENT FRAME: ', frameNumber)
  currentFrame = frameNumber

  runner = startRunner()
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
      currentBodies[body.id] = body
    }
  })

})


let lastChipCreated;

document.addEventListener('DOMContentLoaded', function(e) {
  var canvas = document.querySelector('canvas')

  canvas.addEventListener('click', function(e) {
    e.stopPropagation()

    const yCoordinate = Math.min(e.clientY, 200)

    let chip = new Chip({ x: e.clientX, y: yCoordinate })

    currentBodies[chip.body.id] = chip.body
    lastChipCreated = chip.body.id
    World.add(engine.world, chip.body)
    stage.addChild(chip.sprite)

    console.log("You created: ", chip.body.id)

    socket.emit('new chip', { id: chip.body.id, frame: currentFrame, x: e.clientX, y: yCoordinate })
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
          pair.bodyB.shrink(engine, currentBodies)
          // World.remove(engine.world, pair.bodyB)
        } else if (pair.bodyB.label === 'ground') {
          pair.bodyA.shrink(engine, currentBodies)
          // World.remove(engine.world, pair.bodyA)
        }
    }
});
