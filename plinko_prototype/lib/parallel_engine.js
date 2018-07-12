'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matterJs = require('matter-js');

var _generateWorld = require('./generateWorld');

var _generateWorld2 = _interopRequireDefault(_generateWorld);

var _Chip = require('./bodies/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runParallelSimulation(currentFrame, targetFrame, bodies) {
  var engine = _matterJs.Engine.create();

  // add all of the bodies to the world
  _matterJs.World.add(engine.world, _generateWorld2.default);

  var actualBodies = bodies.map(function (body) {
    var chip = (0, _Chip2.default)(body.x, body.y);
    _matterJs.Body.setVelocity(chip.body, body.linearVelocity);
    chip.body.id = body.id;
    return chip.body;
  });

  _matterJs.World.add(engine.world, actualBodies);

  while (currentFrame < targetFrame) {
    _matterJs.Engine.update(engine, 1000 / 60);
    currentFrame++;
  }

  var simulatedWorld = _matterJs.Composite.allBodies(engine.world);
  return simulatedWorld;
}

exports.default = runParallelSimulation;
//# sourceMappingURL=parallel_engine.js.map