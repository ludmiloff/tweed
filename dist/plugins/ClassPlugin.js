'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClassPlugin = function () {
  function ClassPlugin(snabbdomModules) {
    (0, _classCallCheck3.default)(this, ClassPlugin);

    this.snabbdomModules = snabbdomModules;
  }

  (0, _createClass3.default)(ClassPlugin, [{
    key: 'consumeAttributes',
    value: function consumeAttributes(data, attributes) {
      data.class = {};

      for (var a in attributes) {
        if (process.env.NODE_ENV !== 'production') {
          if (a === 'className') {
            require('../dev/messages/classNameIsDeprecated');
          }
        }

        if (a === 'class' || a === 'className') {
          var classNames = attributes[a];
          delete attributes[a];

          if (typeof classNames === 'string') {
            classNames.split(' ').forEach(function (c) {
              if (c) {
                data.class[c] = true;
              }
            });
          } else if (classNames != null && (typeof classNames === 'undefined' ? 'undefined' : (0, _typeof3.default)(classNames)) === 'object') {
            for (var name in classNames) {
              if (classNames[name]) {
                data.class[name] = classNames[name];
              }
            }
          } else if (typeof classNames === 'undefined') {
            // Skip undefined
          } else {
            if (process.env.NODE_ENV !== 'production') {
              var message = 'Invalid <code>' + a + '</code> attribute. Must be object or string, but was <code>' + classNames + '</code>.';
              var stack = new Error().stack;
              var unique = stack + message;
              this.__informedAboutInvalid = this.__informedAboutInvalid || [];

              if (this.__informedAboutInvalid.indexOf(unique) > -1) {
                continue;
              }

              this.__informedAboutInvalid.push(unique);

              require('../dev/Console').default.error(message);
            }
          }

          continue;
        }

        if (a.slice(0, 6) === 'class-') {
          var className = a.slice(6);
          var active = attributes[a];
          delete attributes[a];

          if (className) {
            data.class[className] = !!active;
          }
        }
      }
    }
  }]);
  return ClassPlugin;
}();

exports.default = ClassPlugin;