'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ground = exports.Wall = undefined;

var _matterJs = require('matter-js');

var _canvas = require('../constants/canvas');

var _GameObject3 = require('./GameObject');

var _GameObject4 = _interopRequireDefault(_GameObject3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wall = exports.Wall = function (_GameObject) {
  _inherits(Wall, _GameObject);

  function Wall(_ref) {
    var x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height;

    _classCallCheck(this, Wall);

    return _possibleConstructorReturn(this, (Wall.__proto__ || Object.getPrototypeOf(Wall)).call(this, { type: 'wall', x: x, y: y, width: width, height: height }));
  }

  return Wall;
}(_GameObject4.default);

var Ground = exports.Ground = function (_GameObject2) {
  _inherits(Ground, _GameObject2);

  function Ground() {
    _classCallCheck(this, Ground);

    return _possibleConstructorReturn(this, (Ground.__proto__ || Object.getPrototypeOf(Ground)).call(this, { type: 'ground',
      x: _canvas.CANVAS_WIDTH / 2,
      y: _canvas.CANVAS_HEIGHT,
      width: _canvas.CANVAS_WIDTH,
      height: 60 }));
  }

  return Ground;
}(_GameObject4.default);
//# sourceMappingURL=Wall.js.map