'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matterJs = require('matter-js');

var _Peg = require('./bodies/Peg');

var _Peg2 = _interopRequireDefault(_Peg);

var _Wall = require('./bodies/Wall');

var _canvas = require('./constants/canvas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Array to hold bodies to add to world later
var bodies = [];

// Generate pegs
for (var row = 0; row < _canvas.ROWS; row++) {
  for (var col = 0; col < _canvas.COLS + 1; col++) {
    var rowSpace = col * _canvas.SPACING;
    if (row % 2 == 0) {
      rowSpace += _canvas.SPACING / 2;
    }
    var colSpace = _canvas.SPACING + row * _canvas.SPACING;
    var peg = new _Peg2.default(rowSpace, colSpace, 3);
    bodies.push(peg);
  }
}

// Generate bucket walls
for (var i = 1; i < _canvas.COLS; i++) {
  var wall = new _Wall.Wall(_canvas.SPACING * i, _canvas.CANVAS_HEIGHT - 80, 5, 200);
  bodies.push(wall);
}

// Generate left and right walls
var leftWall = new _Wall.Wall(0, _canvas.CANVAS_HEIGHT / 2, 5, _canvas.CANVAS_HEIGHT);
var rightWall = new _Wall.Wall(_canvas.CANVAS_WIDTH, _canvas.CANVAS_HEIGHT / 2, 5, _canvas.CANVAS_HEIGHT);

bodies.push(leftWall);
bodies.push(rightWall);

// Generate ground
var ground = new _Wall.Ground();
bodies.push(ground);

exports.default = bodies;
//# sourceMappingURL=generateWorld.js.map