'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matterJs = require('matter-js');

var _Peg = require('./bodies/Peg');

var _Wall = require('./bodies/Wall');

var _canvas = require('./constants/canvas');

// Array to hold bodies to add to world later
var backgroundBodies = [];

// Generate pegs
for (var row = 0; row < _canvas.ROWS; row++) {
  for (var col = 0; col < _canvas.COLS + 1; col++) {
    var rowSpace = col * _canvas.SPACING;
    if (row % 2 == 0) {
      rowSpace += _canvas.SPACING / 2;
    }
    var colSpace = _canvas.SPACING + row * _canvas.SPACING;
    var peg = (0, _Peg.generatePeg)(rowSpace, colSpace);
    backgroundBodies.push(peg.body);
  }
}

// Generate bucket walls
for (var i = 1; i < _canvas.COLS; i++) {
  var wall = new _Wall.Wall(_canvas.SPACING * i, _canvas.CANVAS_HEIGHT - 80, 5, 200);
  backgroundBodies.push(wall.body);
}

// Generate left and right walls
var leftWall = new _Wall.Wall(0, _canvas.CANVAS_HEIGHT / 2, 5, _canvas.CANVAS_HEIGHT);
var rightWall = new _Wall.Wall(_canvas.CANVAS_WIDTH, _canvas.CANVAS_HEIGHT / 2, 5, _canvas.CANVAS_HEIGHT);

backgroundBodies.push(leftWall.body);
backgroundBodies.push(rightWall.body);

// Generate ground
var ground = new _Wall.Ground();
ground.body.label = 'ground';
backgroundBodies.push(ground.body);

exports.default = backgroundBodies;
//# sourceMappingURL=generateWorld.js.map