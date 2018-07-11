'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wall = Wall;
exports.Ground = Ground;

var _matterJs = require('matter-js');

var _canvas = require('../constants/canvas');

function Wall(x, y, w, h) {
  this.body = _matterJs.Bodies.rectangle(x, y, w, h, { isStatic: true });
}

function Ground() {
  return new Wall(_canvas.CANVAS_WIDTH / 2, _canvas.CANVAS_HEIGHT, _canvas.CANVAS_WIDTH, 60);
}
//# sourceMappingURL=Wall.js.map