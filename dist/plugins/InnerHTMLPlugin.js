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

var InnerHTMLPlugin = function () {
  function InnerHTMLPlugin(snabbdomModules) {
    (0, _classCallCheck3.default)(this, InnerHTMLPlugin);

    this.snabbdomModules = snabbdomModules;
  }

  (0, _createClass3.default)(InnerHTMLPlugin, [{
    key: 'consumeAttributes',
    value: function consumeAttributes(data, attributes) {
      if ('innerHTML' in attributes) {
        if (process.env.NODE_ENV !== 'production') {
          require('../dev/messages/innerHTMLCanBeDangerous');
        }
        var html = attributes.innerHTML;
        data.innerHTML = html;
        delete attributes.innerHTML;
      }
    }
  }]);
  return InnerHTMLPlugin;
}();

exports.default = InnerHTMLPlugin;