'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _matterJs = require('matter-js');

var _gameEngine = require('../constants/gameEngine');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import * as PIXI from '../vendor/pixi.min.js'
var PIXI = void 0;
var loader = void 0;
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
  PIXI = require('pixi.js');
}

var GameObject = function () {
  function GameObject(_ref) {
    var type = _ref.type,
        x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height;

    _classCallCheck(this, GameObject);

    this.x = x;
    this.y = y;
    this.type = type;
    this.createPhysics({ width: width, height: height });
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
      this.createSprite();
    };
  }

  _createClass(GameObject, [{
    key: 'createPhysics',
    value: function createPhysics(_ref2) {
      var width = _ref2.width,
          height = _ref2.height;

      var options = {
        restitution: .5,
        friction: 0
      };

      if (this.type === 'chip') {
        this.body = _matterJs.Bodies.circle(this.x, this.y, _gameEngine.CHIP_RADIUS, options);
      } else if (this.type === 'peg') {
        this.body = _matterJs.Bodies.circle(this.x, this.y, _gameEngine.PEG_RADIUS, options);
        this.body.isStatic = true;
      } else {
        this.body = _matterJs.Bodies.rectangle(this.x, this.y, width, height, options);
        this.body.isStatic = true;
      }

      this.body.position.x = this.x;
      this.body.position.y = this.y;
      this.body.label = this.type;
      this.body.isShrinking = false;
    }
  }, {
    key: 'createSprite',
    value: function createSprite() {

      this.sprite = PIXI.Sprite.fromImage('../../sprites/cat.png');
      this.sprite.anchor.set(0.5, 0.5);
      this.sprite.x = this.x;
      this.sprite.y = this.y;
    }
  }]);

  return GameObject;
}();

exports.default = GameObject;
//# sourceMappingURL=GameObject.js.map