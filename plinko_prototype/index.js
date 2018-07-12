import io from 'socket.io-client';
import { Engine, World, Body } from 'matter-js';
import engine from './src/engine';
import generateChip from './src/bodies/Chip';
import { generatePeg } from './src/bodies/Peg'
import runParallelSimulation from './src/parallel_engine.js'

var socket = io.connect('http://radioactive-kittens.localtunnel.me/');

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
    console.log('click event')
    const yCoordinate = Math.min(e.clientY, 200)

    socket.emit('new chip', { x: e.clientX, y: yCoordinate })

  })
})

// socket.on('pongResponse', function(msg) {
//   console.log(msg)
// })
//
// setInterval(function() {
//   socket.emit('pingRequest', {})
// }, 1000)
