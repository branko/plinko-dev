'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Peg;

var _matterJs = require('matter-js');

function Peg(x, y, r) {
  var options = {
    restitution: .5,
    friction: 0,
    isStatic: true
  };

  this.body = _matterJs.Bodies.circle(x, y, 5, options);
  this.body.label = 'peg';
}
//# sourceMappingURL=Peg.js.map