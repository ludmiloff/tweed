'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _class, _temp;

var _EngineCollection = require('./EngineCollection');

var _EngineCollection2 = _interopRequireDefault(_EngineCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENGINE_INSTANCE_ID = -1;

var Engine = (_temp = _class = function () {
  function Engine(renderer) {
    (0, _classCallCheck3.default)(this, Engine);

    this._renderer = renderer;

    if (process.env.NODE_ENV !== 'production') {
      this.__id = ++ENGINE_INSTANCE_ID;
    }

    _EngineCollection2.default.instance.connectEngine(this);
  }

  (0, _createClass3.default)(Engine, [{
    key: 'render',
    value: function render(factory) {
      this.rerender = this.render.bind(this, factory);

      var vdom = typeof factory.render === 'function' ? factory.render() : factory.render;

      this._renderer.render(vdom);

      if (process.env.NODE_ENV !== 'production') {
        require('./dev/introspection/onRender').default(this, factory, vdom);
      }
    }
  }], [{
    key: 'snabbdomModules',
    get: function get() {
      var getModules = function getModules(p) {
        return p.snabbdomModules;
      };

      return this.plugins.filter(getModules).map(getModules).reduce(function (a, b) {
        return a.concat(b);
      });
    }
  }]);
  return Engine;
}(), _class.plugins = [], _temp);
exports.default = Engine;