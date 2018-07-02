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

var EventsPlugin = function () {
  function EventsPlugin(snabbdomModules) {
    (0, _classCallCheck3.default)(this, EventsPlugin);

    this.snabbdomModules = snabbdomModules;
  }

  (0, _createClass3.default)(EventsPlugin, [{
    key: 'consumeAttributes',
    value: function consumeAttributes(data, attributes) {
      data.on = {};

      for (var a in attributes) {
        if (a === 'on') {
          for (var eventName in attributes[a]) {
            data.on[eventName] = attributes[a][eventName];
          }
          delete attributes[a];
          continue;
        }
        if (a.slice(0, 3) === 'on-') {
          var _eventName = a.slice(3);
          data.on[_eventName] = attributes[a];
          delete attributes[a];
        }
      }
    }
  }]);
  return EventsPlugin;
}();

exports.default = EventsPlugin;