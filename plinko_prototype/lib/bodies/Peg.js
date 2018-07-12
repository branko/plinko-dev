'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Peg = Peg;
exports.generatePeg = generatePeg;

var _matterJs = require('matter-js');

function Peg(x, y) {
  var options = {
    restitution: .5,
    friction: 0,
    isStatic: true
  };

  this.body = _matterJs.Bodies.circle(x, y, 5, options);
  this.body.label = 'peg';
}

function generatePeg(x, y) {
  return new Peg(x, y);
}
//# sourceMappingURL=Peg.js.map