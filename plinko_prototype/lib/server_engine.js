'use strict';

var _gameEngine = require('./constants/gameEngine.js');

var _generateWorld = require('./generateWorld');

var _generateWorld2 = _interopRequireDefault(_generateWorld);

var _Chip = require('./bodies/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _matterJs = require('matter-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.serverEngine = true;

var path = require('path');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var localtunnel = require('localtunnel');

// create an engine
var engine = _matterJs.Engine.create();

_matterJs.World.add(engine.world, _generateWorld2.default.map(function (b) {
  return b.body;
}));

var currentFrame = 0;
var time = void 0;

// run the engine
var run = function run() {
  console.log('running...');
  time = new Date();

  return setInterval(function () {
    if (chipQueue[currentFrame]) {
      chipQueue[currentFrame].forEach(function (body) {
        _matterJs.World.add(engine.world, body);
      });
    }
    chipQueue[currentFrame] = undefined;

    _matterJs.Engine.update(engine, _gameEngine.TIMESTEP);
    currentFrame++;
    if (currentFrame % 240 === 0) {
      console.log("Time elapsed for 240 frames: ", (new Date() - time) / 1000);
      time = new Date();
    }
  }, _gameEngine.TIMESTEP);
};

run();

// I wonder if this setInterval is expensive enough
// to account for the lost frames?
setInterval(function () {
  var bodies = engine.world.bodies.filter(function (b) {
    return b.label === 'chip';
  }).map(function (body) {
    return {
      id: body.id,
      label: body.label,
      x: Math.floor(body.position.x),
      y: Math.floor(body.position.y),
      linearVelocity: body.velocity
    };
  });

  io.emit('snapshot', { frame: currentFrame, bodies: bodies });
}, _gameEngine.SNAPSHOT_INTERVAL);

_matterJs.Events.on(engine, 'collisionStart', function (event) {
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

var chipQueue = {};

io.on('connection', function (socket) {
  console.log("Emitted: ", currentFrame);
  socket.emit('connection established', currentFrame);

  socket.on('new chip', function (chipInfo) {
    var chip = new _Chip2.default(chipInfo);

    chip.body.id = chipInfo.id;

    if (currentFrame >= chipInfo.frame) {
      _matterJs.World.add(engine.world, chip.body);
    } else {
      chipQueue[chipInfo.frame] = chipQueue[chipInfo.frame] || [];
      chipQueue[chipInfo.frame].push(chip.body);
    }
  });
});

tunnel.on('close', function () {
  console.log('tunnel closed :(');
});

server.listen(3000);
//# sourceMappingURL=server_engine.js.map