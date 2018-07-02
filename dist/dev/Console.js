'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Console = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Console = exports.Console = function () {
  function Console(native) {
    (0, _classCallCheck3.default)(this, Console);
    this._styles = {
      'b': {
        enterBrowser: {
          'font-weight': 'bold'
        },
        exitBrowser: {
          'font-weight': 'normal'
        },
        enterTerminal: [1],
        exitTerminal: null
      },

      'code': {
        enterBrowser: {
          'font-weight': 'bold',
          'border': '1px solid rgba(0,0,0,0.06)',
          'padding': '1px 3px 0px',
          'border-radius': '2px',
          'background': 'rgba(0,0,0,0.05)'
        },
        exitBrowser: {
          'font-weight': 'normal'
        },
        enterTerminal: [1],
        exitTerminal: null
      },

      'danger': {
        enterBrowser: {
          'font-weight': 'bold',
          'color': '#d64747'
        },
        exitBrowser: {
          'font-weight': 'normal',
          'color': 'initial'
        },
        enterTerminal: [31],
        exitTerminal: null
      }
    };
    this._tagPattern = new RegExp('<(\\/?)(' + (0, _keys2.default)(this._styles).join('|') + ')>', 'g');

    this._native = native;

    this._native.info = this._native.info || this._native.log;
    this._native.warn = this._native.warn || this._native.log;
    this._native.error = this._native.error || this._native.log;
  }

  (0, _createClass3.default)(Console, [{
    key: '_compile',
    value: function _compile(markup, terminalRestoreCode) {
      if (typeof window === 'undefined') {
        return this._compileTerminal(markup, terminalRestoreCode);
      }
      if (process.env.NODE_ENV !== 'production') {
        // If we're in a test
        if (typeof expect !== 'undefined') {
          return this._compileTerminal(markup, terminalRestoreCode);
        }
      }
      return this._compileBrowser(markup);
    }
  }, {
    key: '_compileBrowser',
    value: function _compileBrowser(markup) {
      var _this = this;

      var activeStyleRules = {};
      var styles = [];

      var template = markup.replace(this._tagPattern, function (_, closingSlash, tagName) {
        var isClosing = closingSlash === '/';
        var style = isClosing ? _this._styles[tagName].exitBrowser : _this._styles[tagName].enterBrowser;

        activeStyleRules = style;

        styles.push((0, _keys2.default)(activeStyleRules).map(function (k) {
          return k + ': ' + activeStyleRules[k];
        }).join(';'));

        return '%c';
      });

      return [template].concat(styles);
    }
  }, {
    key: '_compileTerminal',
    value: function _compileTerminal(markup, restoreCode) {
      var _this2 = this;

      return [markup.replace(this._tagPattern, function (_, closingSlash, tagName) {
        var isClosing = closingSlash === '/';
        var style = _this2._styles[tagName];

        var codes = isClosing ? style.exitTerminal == null ? restoreCode : style.exitTerminal : style.enterTerminal;

        return codes.map(function (code) {
          return '\x1B[' + code + 'm';
        }).join('');
      })];
    }
  }, {
    key: '_compileArgs',
    value: function _compileArgs(args, terminalRestoreCode) {
      if (typeof args[0] === 'string') {
        args = [].concat((0, _toConsumableArray3.default)(this._compile(args[0], terminalRestoreCode)), (0, _toConsumableArray3.default)(args.slice(1)));
      }

      return args;
    }
  }, {
    key: 'log',
    value: function log() {
      var _native;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_native = this._native).log.apply(_native, (0, _toConsumableArray3.default)(this._compileArgs(args, [0])));
    }
  }, {
    key: 'info',
    value: function info() {
      var _native2;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      (_native2 = this._native).info.apply(_native2, (0, _toConsumableArray3.default)(this._compileArgs(args, [0])));
    }
  }, {
    key: 'warn',
    value: function warn() {
      var _native3;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      (_native3 = this._native).warn.apply(_native3, (0, _toConsumableArray3.default)(this._compileArgs(args, [0, 33])));
    }
  }, {
    key: 'error',
    value: function error() {
      var _native4;

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      (_native4 = this._native).error.apply(_native4, (0, _toConsumableArray3.default)(this._compileArgs(args, [0, 31])));
    }
  }]);
  return Console;
}();

exports.default = new Console(console);