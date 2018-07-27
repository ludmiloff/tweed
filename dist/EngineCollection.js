'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INSTANCE = void 0;

var EngineCollection = function () {
  function EngineCollection() {
    (0, _classCallCheck3.default)(this, EngineCollection);
    this._engines = [];
    this._isDirty = false;
  }

  (0, _createClass3.default)(EngineCollection, [{
    key: 'connectEngine',
    value: function connectEngine(engine) {
      this._engines.push(engine);
    }
  }, {
    key: 'notify',
    value: function notify(obj, prop, sync, newValue, oldValue) {
      var _this = this;

      if (sync) {
        this._notify();
        return;
      }

      if (this._isDirty) {
        return;
      }
      this._isDirty = true;

      this._tick(function () {
        _this._isDirty = false;
        _this._notify();
      });
    }
  }, {
    key: '_notify',
    value: function _notify() {
      for (var i = 0; i < this._engines.length; i++) {
        this._engines[i].rerender();
      }
    }
  }, {
    key: '_tick',
    value: function _tick(callback) {
      if (typeof requestIdleCallback !== 'undefined') {
        /* global requestIdleCallback */
        return requestIdleCallback(callback, { timeout: 100 });
      }

      if (typeof requestAnimationFrame !== 'undefined') {
        /* global requestAnimationFrame */
        return requestAnimationFrame(callback);
      }

      setTimeout(callback);
    }
  }], [{
    key: 'instance',
    get: function get() {
      return INSTANCE || (INSTANCE = new EngineCollection());
    }
  }]);
  return EngineCollection;
}();

exports.default = EngineCollection;