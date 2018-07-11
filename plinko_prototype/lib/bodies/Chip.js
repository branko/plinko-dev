'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateChip;

var _matterJs = require('matter-js');

function Chip(x, y) {
  if (!this instanceof Chip) {
    return new Chip(x, y);
  }
  var options = {
    restitution: .5,
    friction: 0
  };

  var radius = 15;
  this.body = _matterJs.Bodies.circle(x, y, radius, options);
  this.body.label = 'chip';
}

function generateChip(x, y) {
  return new Chip(x, y);
}
//# sourceMappingURL=Chip.js.map