'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

exports.default = MutatingDecorator;

var _Symbols = require('./Symbols');

var _EngineCollection = require('./EngineCollection');

var _EngineCollection2 = _interopRequireDefault(_EngineCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MutatingDecorator(sync, prototype, name, desc) {
  if (!prototype[_Symbols.STATEFUL]) {
    prototype[_Symbols.STATEFUL] = true;
  }

  if (prototype[_Symbols.MUTATING_FIELDS] == null) {
    prototype[_Symbols.MUTATING_FIELDS] = [];
  }

  prototype[_Symbols.MUTATING_FIELDS].push(name);

  var VALUE = (0, _Symbols.createSymbol)('[[actual ' + name + ']]');

  if (desc && desc.initializer) {
    var initialValue = desc.initializer();

    if (Array.isArray(initialValue)) {
      wrapArray(sync, initialValue);
    }

    prototype[VALUE] = initialValue;
  }

  var descriptor = {
    enumerable: true,
    configurable: false,
    get: function get() {
      return this[VALUE];
    },
    set: function set(newValue) {
      var oldValue = this[VALUE];

      if (Array.isArray(newValue)) {
        wrapArray(sync, newValue, name);
      }

      this[VALUE] = newValue;

      _EngineCollection2.default.instance.notify(this, name, sync, newValue, oldValue);
    }
  };

  (0, _defineProperty2.default)(prototype, name, descriptor);

  return {};
}

var MUTATOR_METHODS = ['copyWithin', 'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];

function wrapArray(sync, subject, arrayPropName) {
  MUTATOR_METHODS.forEach(function (name) {
    if (typeof subject[name] === 'function') {
      var method = subject[name];
      subject[name] = function () {
        var oldValue = process.env.NODE_ENV === 'production' ? this : this.slice();
        var returnValue = method.apply(this, arguments);
        var newValue = this;
        ensureSetters(sync, this);
        _EngineCollection2.default.instance.notify(subject, arrayPropName, sync, newValue, oldValue);
        return returnValue;
      };
    }
  });
}

function ensureSetters(sync, array) {
  if (!array[_Symbols.STATEFUL]) {
    array[_Symbols.STATEFUL] = true;
  }

  if (array[_Symbols.MUTATING_FIELDS] == null) {
    array[_Symbols.MUTATING_FIELDS] = [];
  }

  var _loop = function _loop(i) {
    if (array[_Symbols.MUTATING_FIELDS].indexOf(i) !== -1) {
      return 'continue';
    }

    array[_Symbols.MUTATING_FIELDS].push(i);

    var INDEX = (0, _Symbols.createSymbol)('[[actual ' + i + ']]');

    array[INDEX] = array[i];

    (0, _defineProperty2.default)(array, i, {
      enumerable: true,
      configurable: false,
      get: function get() {
        return this[INDEX];
      },
      set: function set(newValue) {
        var oldValue = this[INDEX];
        this[INDEX] = newValue;
        _EngineCollection2.default.instance.notify(this, INDEX, sync, newValue, oldValue);
      }
    });
  };

  for (var i = 0; i < array.length; i++) {
    var _ret = _loop(i);

    if (_ret === 'continue') continue;
  }
}