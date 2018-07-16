'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pixi = require('pixi.js');

var PIXI = _interopRequireWildcard(_pixi);

var _matterJs = require('matter-js');

var _generateWorld = require('./generateWorld');

var _generateWorld2 = _interopRequireDefault(_generateWorld);

var _canvas = require('./constants/canvas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// create a renderer
var engine = _matterJs.Engine.create();

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