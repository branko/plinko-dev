'use strict';

var _generateWorld = require('./generateWorld');

var _generateWorld2 = _interopRequireDefault(_generateWorld);

var _Chip = require('./bodies/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _matterJs = require('matter-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CANVAS_WIDTH = 682;
var CANVAS_HEIGHT = 660;

var path = require('path');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var localtunnel = require('localtunnel');

// create an engine
var engine = _matterJs.Engine.create();

_matterJs.World.add(engine.world, _generateWorld2.default);

var currentFrame = 0;

// run the engine
var run = function run() {
  return setInterval(function () {
    _matterJs.Engine.update(engine, 1000 / 60);
    currentFrame++;
  }, 1000 / 60);
};

run();

setInterval(function () {
  var bodies = engine.world.bodies.map(function (body) {
    return {
      id: body.id,
      label: body.label,
      x: Math.floor(body.position.x),
      y: Math.floor(body.position.y),
      linearVelocity: body.velocity
    };
  }).filter(function (b) {
    return b.label === 'chip';
  });

  io.emit('snapshot', { frame: currentFrame, bodies: bodies });
}, 1000);

_matterJs.Events.on(engine, 'collisionStart', function (event) {
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

var tunnel = localtunnel(3000, { subdomain: 'radioactive-kittens' }, function (err, tunnel) {
  console.log(tunnel.url);
});

app.get('/', function (req, res) {
  console.log(__dirname + '/../dist/index.html');
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

app.get('/main.js', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../dist/main.js'));
});

io.on('connection', function (socket) {
  console.log("Emitted: ", currentFrame);
  socket.emit('connection established', currentFrame);

  socket.on('new chip', function (coords) {
    console.log('new chip received by server');
    var chip = (0, _Chip2.default)(coords.x, coords.y);
    _matterJs.World.add(engine.world, chip.body);
  });
});

tunnel.on('close', function () {
  console.log('tunnel closed :(');
});

server.listen(3000);
//# sourceMappingURL=server_engine.js.map