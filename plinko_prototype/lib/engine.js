'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matterJs = require('matter-js');

var _generateWorld = require('./generateWorld');

var _generateWorld2 = _interopRequireDefault(_generateWorld);

var _canvas = require('./constants/canvas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var engine = _matterJs.Engine.create();

// create a renderer
var render = _matterJs.Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width: _canvas.CANVAS_WIDTH,
    height: _canvas.CANVAS_HEIGHT
  }
});

// add all of the bodies to the world
_matterJs.World.add(engine.world, _generateWorld2.default);

// run the renderer
_matterJs.Render.run(render);

_matterJs.Events.on(engine, 'collisionStart', function (event) {
  var pairs = event.pairs;

  if (pairs[0].bodyA.label === 'temp' || pairs[0].bodyB.label === 'temp') {
    return;
  }

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];

    if (pair.bodyA.label === 'temp' || pair.bodyB.label === 'temp') {
      continue;
    }

    if (pair.bodyA.label === 'peg') {
      pair.bodyA.render.fillStyle = pair.bodyB.render.fillStyle;
    } else if (pair.bodyB.label === 'peg') {
      pair.bodyB.render.fillStyle = pair.bodyA.render.fillStyle;
    }
  }
});

exports.default = engine;
//# sourceMappingURL=engine.js.map