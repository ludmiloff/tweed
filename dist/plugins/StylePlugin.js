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

var StylePlugin = function () {
  function StylePlugin(snabbdomModules) {
    (0, _classCallCheck3.default)(this, StylePlugin);

    this.snabbdomModules = snabbdomModules;
  }

  (0, _createClass3.default)(StylePlugin, [{
    key: 'consumeAttributes',
    value: function consumeAttributes(data, attributes) {
      data.style = {};

      for (var a in attributes) {
        if (a === 'style') {
          for (var styleProp in attributes[a]) {
            data.style[styleProp] = attributes[a][styleProp];
          }
          delete attributes[a];
          continue;
        }
        if (a.slice(0, 6) === 'style-') {
          var _styleProp = a.slice(6);
          data.style[_styleProp] = attributes[a];
          delete attributes[a];
        }
      }
    }
  }]);
  return StylePlugin;
}();

exports.default = StylePlugin;