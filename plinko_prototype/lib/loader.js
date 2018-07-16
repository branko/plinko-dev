'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pixi = require('pixi.js');

var PIXI = _interopRequireWildcard(_pixi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var loader = PIXI.loader;

loader.add('cat', './sprites/cat.png');

exports.default = loader;
//# sourceMappingURL=loader.js.map