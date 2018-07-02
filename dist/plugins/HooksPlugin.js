'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _hooks = require('../hooks');

var hooks = _interopRequireWildcard(_hooks);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HooksPlugin = function () {
  function HooksPlugin() {
    (0, _classCallCheck3.default)(this, HooksPlugin);
    this._hooks = {
      'pre': hooks.PreHook,
      'init': hooks.InitHook,
      'create': hooks.CreateHook,
      'insert': hooks.InsertHook,
      'prepatch': hooks.PrePatchHook,
      'update': hooks.UpdateHook,
      'postpatch': hooks.PostPatchHook,
      'destroy': hooks.Destroy,
      'remove': hooks.RemoveHook,
      'post': hooks.PostHook
    };
  }

  (0, _createClass3.default)(HooksPlugin, [{
    key: 'consumeAttributes',
    value: function consumeAttributes(data, attributes) {
      data.hook = {};

      for (var a in attributes) {
        if (a === 'hook') {
          for (var hookName in attributes[a]) {
            data.hook[hookName] = this._wrapHook(hookName, attributes[a][hookName]);
          }
          delete attributes[a];
          continue;
        }
        if (a.slice(0, 5) === 'hook-') {
          var _hookName = a.slice(5);
          data.hook[_hookName] = this._wrapHook(_hookName, attributes[a]);
          delete attributes[a];
        }
      }
    }
  }, {
    key: '_wrapHook',
    value: function _wrapHook(hookName, listener) {
      var _this = this;

      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return listener(new (Function.prototype.bind.apply(_this._hooks[hookName], [null].concat(args)))());
      };
    }
  }]);
  return HooksPlugin;
}();

exports.default = HooksPlugin;