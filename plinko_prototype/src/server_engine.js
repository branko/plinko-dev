var CANVAS_WIDTH = 682
var CANVAS_HEIGHT = 660

var path = require('path');
let app = require('express')()
let server = require('http').Server(app)
let io = require('socket.io')(server)
let localtunnel = require('localtunnel')

import bodies from './generateWorld';
import generateChip from './bodies/Chip';
import { Engine, World, Bodies, Body, Events } from 'matter-js';

// create an engine
var engine = Engine.create();

World.add(engine.world, bodies)

// run the engine
var run = function() {
  return setInterval(function() {
      Engine.update(engine, 1000 / 60);
  }, 1000 / 60);
}

run()

console.log('running engine')

setInterval(() => {

  var bodies = engine.world.bodies.map(body => {
    return {
      id: body.id,
      label: body.label,
      x: Math.floor(body.position.x),
      y: Math.floor(body.position.y),
    }
  }).filter(b => b.label === 'chip')

  io.emit('snapshot', bodies)

}, 1000/30)


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


let tunnel = localtunnel(3000, {subdomain: 'radioactive-kittens'},(err, tunnel) => {
  console.log(tunnel.url)
})

app.get('/', (req, res) => {
  console.log(__dirname + '/../dist/index.html')
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
})

app.get('/main.js', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../dist/main.js'))
})


io.on('connection', (socket) => {
  socket.emit('connection established', { message: 'you made it!' })

  socket.on('new chip' , function(coords) {
    console.log('new chip received by server')
    let chip = generateChip(coords.x, coords.y)
    World.add(engine.world, chip.body)
  })

  // socket.on('pingRequest', () => {
  //   socket.emit('pongResponse', 'pong')
  // })
});

tunnel.on('close', function() {
  console.log('tunnel closed :(')
});

server.listen(3000)
