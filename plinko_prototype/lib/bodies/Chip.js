'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _matterJs = require('matter-js');

var _gameEngine = require('../constants/gameEngine');

var _GameObject2 = require('./GameObject');

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chip = function (_GameObject) {
  _inherits(Chip, _GameObject);

  function Chip(x, y) {
    _classCallCheck(this, Chip);

    var _this = _possibleConstructorReturn(this, (Chip.__proto__ || Object.getPrototypeOf(Chip)).call(this, { type: 'chip', x: x, y: y }));

    _this.body.shrink = _this.shrink.bind(_this)();
    return _this;
  }

  _createClass(Chip, [{
    key: 'shrink',
    value: function shrink() {
      return function () {
        var _this2 = this;

        var counter = 0;
        var interval = void 0;

        return function (engine, currentBodies) {
          interval = setInterval(function () {
            if (counter++ === shrinkAfter) {
              currentBodies[_this2.body.id] = undefined;
              _matterJs.World.remove(engine.world, _this2.body);
              clearInterval(interval);
              return;
            }

            _matterJs.Body.scale(_this2.body, 0.99, 0.99);
            _this2.body.circleRadius *= 0.99;
          }, _gameEngine.TIMESTEP);
        };
      }();
    }
  }]);

  return Chip;
}(_GameObject3.default);

exports.default = Chip;
//# sourceMappingURL=Chip.js.map