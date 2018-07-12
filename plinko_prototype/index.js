import io from 'socket.io-client';
import { Engine, World, Body } from 'matter-js';
import engine from './src/engine';
import generateChip from './src/bodies/Chip';
import { generatePeg } from './src/bodies/Peg'
import runParallelSimulation from './src/parallel_engine.js'

var socket = io.connect('http://radioactive-kittens.localtunnel.me/');

let tempChips = []

let currentFrame;

socket.on('connection established', (frameNumber) => {
  console.log('ESTABLISHED! CURRENT FRAME: ', frameNumber)
  currentFrame = frameNumber

  // run the engine
  setInterval(() => {
    Engine.update(engine, 1000 / 60)
    currentFrame++
  }, 1000 / 60)

})

var currentBodies = {}

socket.on('snapshot', ({ frame, bodies }) => {
  console.log(`Frames => Server: ${frame}, Client: ${currentFrame}, Client ahead by ${currentFrame - frame} frames`)

  tempChips.forEach(chip => {
    World.remove(engine.world, chip)
  })

  let simulatedBodies = runParallelSimulation(currentFrame, frame, bodies)

  simulatedBodies.forEach(body => {
    if (!currentBodies[body.id]) {
      World.add(engine.world, body)
    }
    currentBodies[body.id] = body
  })
})


document.addEventListener('DOMContentLoaded', function(e) {
  var canvas = document.querySelector('canvas')

  canvas.addEventListener('click', function(e) {
    e.stopPropagation()

    const yCoordinate = Math.min(e.clientY, 200)

    let chip = generateChip(e.clientX, yCoordinate).body
    chip.label = 'temp'
    chip.render.fillStyle = '#ffffff'
    tempChips.push(chip)
    World.add(engine.world, chip)

    socket.emit('new chip', { x: e.clientX, y: yCoordinate })
  })
})
