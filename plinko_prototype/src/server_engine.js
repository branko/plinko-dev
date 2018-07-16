process.env.serverEngine = true

var path = require('path');
let app = require('express')()
let server = require('http').Server(app)
let io = require('socket.io')(server)
let localtunnel = require('localtunnel')

import { TIMESTEP, SNAPSHOT_INTERVAL, CANVAS_HEIGHT, CANVAS_WIDTH } from './constants/gameEngine.js';
import backgroundBodies from './generateWorld';
import Chip from './bodies/Chip';
import { Engine, World, Bodies, Body, Events } from 'matter-js';


// create an engine
var engine = Engine.create();

World.add(engine.world, backgroundBodies.map(b => b.body))

let currentFrame = 0;

let time;

// run the engine
var run = function() {
  console.log('running...')
  time = new Date()

  return setInterval(() => {
      if (chipQueue[currentFrame]) {
        chipQueue[currentFrame].forEach(body => {
          World.add(engine.world, body)
        })
      }
      chipQueue[currentFrame] = undefined

      Engine.update(engine, TIMESTEP);
      currentFrame++
      if (currentFrame % 240 === 0) {
        console.log("Time elapsed for 240 frames: ", (new Date() - time) / 1000)
        time = new Date()
      }
  }, TIMESTEP);
}

run()

// I wonder if this setInterval is expensive enough
// to account for the lost frames?
setInterval(() => {
  var bodies = engine.world.bodies
    .filter(b => b.label === 'chip')
    .map(body => {
      return {
        id: body.id,
        label: body.label,
        x: Math.floor(body.position.x),
        y: Math.floor(body.position.y),
        linearVelocity: body.velocity
      }
    })

  io.emit('snapshot', { frame: currentFrame, bodies })

}, SNAPSHOT_INTERVAL)


Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;

    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];

        if (pair.bodyA.label === 'peg') {
          pair.bodyA.render.fillStyle = pair.bodyB.render.fillStyle;
        } else if (pair.bodyB.label === 'peg') {
          pair.bodyB.render.fillStyle = pair.bodyA.render.fillStyle;
        } else if (pair.bodyA.label === 'ground') {
          // World.remove(engine.world, pair.bodyB)
        } else if (pair.bodyB.label === 'ground') {
          // World.remove(engine.world, pair.bodyA)
        }
    }
});


let tunnel = localtunnel(3000, {subdomain: 'radioactive-kittens'}, (err, tunnel) => {
  console.log(tunnel.url)
})

app.get('/', (req, res) => {
  console.log(__dirname + '/../dist/index.html')
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
})

app.get('/main.js', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../dist/main.js'))
})

let chipQueue = {

}

io.on('connection', (socket) => {
  console.log("Emitted: ", currentFrame)
  socket.emit('connection established', currentFrame)

  socket.on('new chip' , function(chipInfo) {
    let chip = new Chip(chipInfo)

    chip.body.id = chipInfo.id

    if (currentFrame >= chipInfo.frame) {
      World.add(engine.world, chip.body)
    } else {
      chipQueue[chipInfo.frame] = chipQueue[chipInfo.frame] || []
      chipQueue[chipInfo.frame].push(chip.body)
    }
  })

});

tunnel.on('close', function() {
  console.log('tunnel closed :(')
});

server.listen(3000)
