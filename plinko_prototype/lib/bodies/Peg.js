'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matterJs = require('matter-js');

var _GameObject2 = require('./GameObject');

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Peg = function (_GameObject) {
  _inherits(Peg, _GameObject);

  function Peg(_ref) {
    var x = _ref.x,
        y = _ref.y;

    _classCallCheck(this, Peg);

    return _possibleConstructorReturn(this, (Peg.__proto__ || Object.getPrototypeOf(Peg)).call(this, { type: 'peg', x: x, y: y }));
  }

  return Peg;
}(_GameObject3.default);

exports.default = Peg;
//# sourceMappingURL=Peg.js.map