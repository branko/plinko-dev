'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pixi = require('pixi.js');

var PIXI = _interopRequireWildcard(_pixi);

var _gameEngine = require('./constants/gameEngine');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var renderer = new PIXI.CanvasRenderer({
  width: _gameEngine.CANVAS_WIDTH,
  height: _gameEngine.CANVAS_HEIGHT
});

document.body.appendChild(renderer.view);

exports.default = renderer;
//# sourceMappingURL=renderer.js.map