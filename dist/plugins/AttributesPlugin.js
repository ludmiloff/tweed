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

var SHOULD_BE_PROPS = ['value'];

var AttributesPlugin = function () {
  function AttributesPlugin(snabbdomModules) {
    (0, _classCallCheck3.default)(this, AttributesPlugin);

    this.snabbdomModules = snabbdomModules;
  }

  (0, _createClass3.default)(AttributesPlugin, [{
    key: 'consumeAttributes',
    value: function consumeAttributes(data, attributes) {
      data.attrs = {};
      data.props = {};

      for (var p in attributes) {
        if (SHOULD_BE_PROPS.indexOf(p) > -1) {
          data.props[p] = attributes[p];
        } else {
          data.attrs[p] = attributes[p];
        }
        delete attributes[p];
      }
    }
  }]);
  return AttributesPlugin;
}();

exports.default = AttributesPlugin;